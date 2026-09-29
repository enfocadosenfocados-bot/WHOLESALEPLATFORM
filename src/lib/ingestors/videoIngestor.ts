import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { SkillSourceType } from '@/types/skill';

const execFileAsync = promisify(execFile);

export interface ExtractedMediaPayload {
  sourceType: SkillSourceType;
  title: string;
  creator: string;
  url: string;
  descriptionOrCaption: string;
  transcriptOrText: string;
  extractedLinksFromSource: string[];
  keyframesBase64: string[];
  audioBase64?: string;
}

export function detectSourceType(url: string): SkillSourceType {
  const lower = url.toLowerCase();
  if (
    lower.includes('instagram.com/reel') ||
    lower.includes('instagram.com/p/') ||
    lower.includes('instagr.am')
  ) {
    return 'instagram_reel';
  }
  if (lower.includes('tiktok.com')) {
    return 'tiktok';
  }
  if (
    lower.includes('facebook.com') ||
    lower.includes('fb.watch') ||
    lower.includes('fb.com')
  ) {
    return 'facebook_reel';
  }
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
    return 'youtube';
  }
  if (lower.endsWith('.pdf')) {
    return 'pdf';
  }
  return 'web_page';
}

function getYtDlpPath(): string {
  const localBin = path.join(process.cwd(), 'bin', 'yt-dlp.exe');
  if (fs.existsSync(localBin)) {
    return localBin;
  }
  return 'yt-dlp';
}

function getFfmpegPath(): string {
  const localFfmpeg = path.join(
    process.cwd(),
    'node_modules',
    'ffmpeg-static',
    'ffmpeg.exe'
  );
  if (fs.existsSync(localFfmpeg)) {
    return localFfmpeg;
  }
  return 'ffmpeg';
}

function extractUrlsFromText(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s)"'<>]+/gi;
  const domainRegex =
    /\b(?:[a-z0-9-]+\.)+(?:com|gov|org|net|io|us|edu)(?:\/[^\s)"'<>]*)?/gi;
  const matches = new Set<string>();

  for (const m of text.match(urlRegex) || []) {
    matches.add(m.replace(/[.,;!?]+$/, ''));
  }
  for (const d of text.match(domainRegex) || []) {
    const cleaned = d.replace(/[.,;!?]+$/, '');
    if (!cleaned.includes('@') && cleaned.length > 4) {
      matches.add(cleaned.startsWith('http') ? cleaned : `https://${cleaned}`);
    }
  }
  return Array.from(matches);
}

function cleanVttSubtitles(vttContent: string): string {
  const lines = vttContent
    .split(/\r?\n/)
    .filter(
      (line) =>
        line.trim() !== '' &&
        !line.startsWith('WEBVTT') &&
        !line.startsWith('Kind:') &&
        !line.startsWith('Language:') &&
        !line.includes('-->') &&
        !/^\d+$/.test(line.trim())
    )
    .map((line) => line.replace(/<[^>]+>/g, '').trim());

  const deduped: string[] = [];
  for (const l of lines) {
    if (deduped[deduped.length - 1] !== l) {
      deduped.push(l);
    }
  }
  return deduped.join(' ');
}

export async function ingestVideoOrReel(
  url: string,
  userNotes = ''
): Promise<ExtractedMediaPayload> {
  const sourceType = detectSourceType(url);
  const ytDlp = getYtDlpPath();
  const ffmpeg = getFfmpegPath();
  const workId = `job_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const tempDir = path.join(process.cwd(), 'data', 'uploads', workId);
  fs.mkdirSync(tempDir, { recursive: true });

  let title = `Contenido de ${sourceType.toUpperCase()}`;
  let creator = 'Creador Social';
  let description = '';
  let commentsContext = '';
  let transcript = '';
  let audioBase64: string | undefined;
  const keyframesBase64: string[] = [];

  try {
    // 1. Metadata & Comments Dump via yt-dlp
    const { stdout } = await execFileAsync(
      ytDlp,
      [
        '--dump-single-json',
        '--no-warnings',
        '--no-check-certificates',
        '--socket-timeout',
        '15',
        url,
      ],
      { timeout: 30000, maxBuffer: 20 * 1024 * 1024 }
    );

    const info = JSON.parse(stdout);
    title = info.title || info.fulltitle || title;
    creator =
      info.uploader || info.channel || info.uploader_id || info.creator || creator;
    description = info.description || '';

    if (Array.isArray(info.comments) && info.comments.length > 0) {
      commentsContext = info.comments
        .slice(0, 15)
        .map((c: { author?: string; text?: string }) => `@${c.author}: ${c.text}`)
        .join(' | ');
    }

    // 2. Try downloading subtitles if available
    try {
      await execFileAsync(
        ytDlp,
        [
          '--write-auto-sub',
          '--write-sub',
          '--sub-lang',
          'en,es,en-US,es-419',
          '--skip-download',
          '--output',
          path.join(tempDir, 'sub'),
          url,
        ],
        { timeout: 15000 }
      );

      const files = fs.readdirSync(tempDir);
      const subFile = files.find((f) => f.endsWith('.vtt') || f.endsWith('.srt'));
      if (subFile) {
        const rawSub = fs.readFileSync(path.join(tempDir, subFile), 'utf-8');
        transcript = cleanVttSubtitles(rawSub);
      }
    } catch {
      // Subtitles optional
    }

    // 3. Download video + audio to extract both Spoken Audio (MP3) and 6 Visual Keyframes (JPG)
    const duration = Number(info.duration || 60);
    if (duration <= 420) {
      const videoOut = path.join(tempDir, 'video.mp4');
      try {
        await execFileAsync(
          ytDlp,
          [
            '-f',
            'best[ext=mp4]/best',
            '--max-filesize',
            '25M',
            '-o',
            videoOut,
            url,
          ],
          { timeout: 35000 }
        );

        if (fs.existsSync(videoOut)) {
          // 3a. Extract compressed mono MP3 audio for AI Speech-to-Text analysis
          const audioOut = path.join(tempDir, 'audio.mp3');
          try {
            await execFileAsync(
              ffmpeg,
              [
                '-i',
                videoOut,
                '-vn',
                '-ac',
                '1',
                '-ar',
                '16000',
                '-b:a',
                '24k',
                audioOut,
              ],
              { timeout: 15000 }
            );
            if (fs.existsSync(audioOut)) {
              const audioBuf = fs.readFileSync(audioOut);
              if (audioBuf.length < 4 * 1024 * 1024) {
                audioBase64 = audioBuf.toString('base64');
              }
            }
          } catch {
            // Audio extraction optional if stream has no audio track
          }

          // 3b. Extract 6 evenly spaced keyframes for Vision OCR (reading screens, captions, URLs)
          const interval = Math.max(2, Math.floor((duration || 30) / 6));
          await execFileAsync(
            ffmpeg,
            [
              '-i',
              videoOut,
              '-vf',
              `fps=1/${interval},scale=720:-1`,
              '-frames:v',
              '6',
              '-q:v',
              '4',
              path.join(tempDir, 'frame_%02d.jpg'),
            ],
            { timeout: 18000 }
          );

          const frameFiles = fs
            .readdirSync(tempDir)
            .filter((f) => f.startsWith('frame_') && f.endsWith('.jpg'))
            .slice(0, 6);

          for (const ff of frameFiles) {
            const buf = fs.readFileSync(path.join(tempDir, ff));
            keyframesBase64.push(
              `data:image/jpeg;base64,${buf.toString('base64')}`
            );
          }
        }
      } catch {
        // Ignore if video download fails
      }
    }
  } catch {
    // Fallback: HTML OpenGraph & Meta Tag Scraping
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        },
      });
      const html = await res.text();
      const $ = cheerio.load(html);
      title =
        $('meta[property="og:title"]').attr('content') ||
        $('title').text() ||
        title;
      description =
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="description"]').attr('content') ||
        '';
    } catch {
      // Ignore fallback error
    }
  } finally {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  }

  const combinedText = [
    description ? `Caption/Descripción: ${description}` : '',
    transcript ? `Subtítulos: ${transcript}` : '',
    commentsContext ? `Comentarios relevantes de usuarios en el Reel: ${commentsContext}` : '',
    userNotes ? `Notas del usuario: ${userNotes}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  const extractedLinksFromSource = extractUrlsFromText(combinedText);

  return {
    sourceType,
    title: title.slice(0, 180),
    creator,
    url,
    descriptionOrCaption: description,
    transcriptOrText:
      combinedText || `Análisis multimodal de ${sourceType} (${url})`,
    extractedLinksFromSource,
    keyframesBase64,
    audioBase64,
  };
}
