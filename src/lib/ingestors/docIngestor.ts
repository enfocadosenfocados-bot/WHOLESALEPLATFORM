import * as cheerio from 'cheerio';
import { ExtractedMediaPayload } from './videoIngestor';

export async function ingestWebPage(
  url: string,
  userNotes = ''
): Promise<ExtractedMediaPayload> {
  let title = url;
  let bodyText = '';
  const links = new Set<string>();

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
      signal: AbortSignal.timeout(15000),
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    title =
      $('meta[property="og:title"]').attr('content') ||
      $('title').first().text().trim() ||
      url;

    // Collect relevant links from page
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (href && href.startsWith('http') && !href.includes('facebook.com/sharer')) {
        links.add(href);
      }
    });

    $('script, style, nav, footer, noscript, iframe').remove();
    bodyText = $('body')
      .text()
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 14000);
  } catch {
    bodyText = `No se pudo leer directamente el HTML de ${url} (posible protección Cloudflare). Se utilizará investigación web profunda sobre el dominio y notas del usuario.`;
  }

  return {
    sourceType: 'web_page',
    title: title.slice(0, 160),
    creator: new URL(url).hostname.replace(/^www\./, ''),
    url,
    descriptionOrCaption: bodyText.slice(0, 500),
    transcriptOrText: [bodyText, userNotes].filter(Boolean).join('\n\n'),
    extractedLinksFromSource: Array.from(links).slice(0, 20),
    keyframesBase64: [],
  };
}

export async function ingestPdfBuffer(
  buffer: Buffer,
  fileName: string,
  userNotes = ''
): Promise<ExtractedMediaPayload> {
  let extractedText = '';
  try {
    const pdfParse = (await import('pdf-parse')).default;
    const data = await pdfParse(buffer);
    extractedText = (data.text || '').replace(/\s+/g, ' ').trim().slice(0, 18000);
  } catch {
    extractedText = buffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, ' ').slice(0, 10000);
  }

  const urlRegex = /https?:\/\/[^\s)"'<>]+/gi;
  const links = Array.from(new Set(extractedText.match(urlRegex) || []));

  return {
    sourceType: 'pdf',
    title: `PDF: ${fileName}`,
    creator: 'Documento PDF Subido',
    url: `file://${fileName}`,
    descriptionOrCaption: `Documento PDF (${fileName}) procesado.`,
    transcriptOrText: [extractedText, userNotes].filter(Boolean).join('\n\n'),
    extractedLinksFromSource: links.slice(0, 20),
    keyframesBase64: [],
  };
}
