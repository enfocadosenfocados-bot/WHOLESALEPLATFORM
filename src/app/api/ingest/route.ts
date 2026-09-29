import { NextRequest, NextResponse } from 'next/server';
import {
  detectSourceType,
  ExtractedMediaPayload,
  ingestVideoOrReel,
} from '@/lib/ingestors/videoIngestor';
import { ingestPdfBuffer, ingestWebPage } from '@/lib/ingestors/docIngestor';
import { analyzeAndMergeIntoSkillTree } from '@/lib/agents/skillMerger';
import { getDatabase, saveDatabase } from '@/lib/db';
import { exportSkillToAntigravity } from '@/lib/exporters/antigravityExporter';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let payload: ExtractedMediaPayload;
    let userNotes = '';
    let apiKey = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      userNotes = (formData.get('userNotes') as string) || '';
      apiKey = (formData.get('apiKey') as string) || '';

      if (!file) {
        return NextResponse.json(
          { error: 'No se recibió ningún archivo PDF.' },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      payload = await ingestPdfBuffer(buffer, file.name, userNotes);
    } else {
      const body = await req.json();
      const url = (body.url || '').trim();
      userNotes = (body.userNotes || '').trim();
      apiKey = (body.apiKey || '').trim();

      if (!url && !userNotes) {
        return NextResponse.json(
          { error: 'Debes proporcionar un link (Reel, TikTok, YouTube, Web) o una nota/transcripción.' },
          { status: 400 }
        );
      }

      if (!url && userNotes) {
        payload = {
          sourceType: 'instagram_reel',
          title: userNotes.slice(0, 80),
          creator: 'Nota / Reel Manual',
          url: 'manual://reel-notes',
          descriptionOrCaption: userNotes,
          transcriptOrText: userNotes,
          extractedLinksFromSource: [],
          keyframesBase64: [],
        };
      } else {
        const type = detectSourceType(url);
        if (
          type === 'instagram_reel' ||
          type === 'tiktok' ||
          type === 'facebook_reel' ||
          type === 'youtube'
        ) {
          payload = await ingestVideoOrReel(url, userNotes);
        } else {
          payload = await ingestWebPage(url, userNotes);
        }
      }
    }

    const db = getDatabase();
    const result = await analyzeAndMergeIntoSkillTree(
      payload,
      db,
      userNotes,
      apiKey
    );

    // Export evolved skill to Antigravity (.agents/skills/<slug>/SKILL.md + global)
    const exported = exportSkillToAntigravity(result.evolvedSkill, true);
    result.evolvedSkill.agyExportedPath = `.agents/skills/${result.evolvedSkill.slug}/SKILL.md`;

    // If source is an Instagram Reel, automatically add/update the creator in db.igCreators
    if (payload.sourceType === 'instagram_reel' && payload.creator) {
      if (!result.updatedDb.igCreators) result.updatedDb.igCreators = [];
      const cleanHandle = payload.creator.startsWith('@')
        ? payload.creator
        : `@${payload.creator.replace(/\s+/g, '').toLowerCase()}`;
      const existingCreator = result.updatedDb.igCreators.find(
        (c) =>
          c.handle.toLowerCase() === cleanHandle.toLowerCase() ||
          c.fullName.toLowerCase().includes(payload.creator.toLowerCase())
      );

      if (existingCreator) {
        if (!existingCreator.reelUrls.includes(payload.url)) {
          existingCreator.reelUrls.push(payload.url);
          existingCreator.reelsCount = existingCreator.reelUrls.length;
        }
      } else {
        const handleSlug = cleanHandle.replace('@', '');
        result.updatedDb.igCreators.unshift({
          id: `ig-${Date.now()}`,
          handle: cleanHandle,
          fullName: payload.creator,
          profileUrl: `https://www.instagram.com/${handleSlug}/`,
          reelsCount: 1,
          reelUrls: [payload.url],
          role: `Creador & Inversionista (${result.evolvedSkill.category})`,
          marketsTheyBuy: 'Mercados de EE.UU. (Consultar Buy Box por DM)',
          whatTheyLookFor: result.summary.slice(0, 180),
          dealStructurePreference:
            'Preguntar si prefiere propiedad ya bajo contrato (PSA firmado) para JV o asignación.',
          customDmEnglish: `Hey ${payload.creator}! I’ve been following your content for a while now and loved your recent Reel on ${result.evolvedSkill.title}.\n\nI’d love to work with you and bring you deals. Quick question:\n1. What specific properties and markets are you looking to buy right now (your exact Buy Box)?\n2. How do you structure deals with partners — do you need me to already have the seller signed under contract (Purchase & Sale Agreement) before sending it over, or how can I best help you?`,
          customDmSpanish: `¡Hola ${payload.creator}! Te vengo siguiendo desde hace tiempo y me encantó tu Reel sobre ${result.evolvedSkill.title}.\n\nQuiero saber cómo podría trabajar contigo llevándote tratos:\n1. ¿Qué propiedades y en qué mercados andas buscando ahora mismo (tu Buy Box)?\n2. ¿Cómo haces los deals: necesitas que ya tenga el trato cerrado bajo contrato con el vendedor antes de enviártelo, o cómo te puedo ayudar?`,
          outreachStatus: 'pending',
        });
      }
    }

    saveDatabase(result.updatedDb);

    return NextResponse.json({
      success: true,
      db: result.updatedDb,
      evolvedSkill: result.evolvedSkill,
      summary: result.summary,
      screenOcrDetected: result.screenOcrDetected,
      webResearchAdded: result.webResearchAdded,
      keyframesCount: payload.keyframesBase64.length,
      exportedPaths: exported,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al procesar contenido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
