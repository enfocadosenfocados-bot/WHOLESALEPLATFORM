import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';

export async function PATCH(req: NextRequest) {
  try {
    const { creatorId, outreachStatus, customDmEnglish, customDmSpanish } =
      await req.json();
    const db = getDatabase();
    const creator = db.igCreators?.find((c) => c.id === creatorId);
    if (!creator) {
      return NextResponse.json({ error: 'Creador no encontrado' }, { status: 404 });
    }

    if (outreachStatus) creator.outreachStatus = outreachStatus;
    if (customDmEnglish) creator.customDmEnglish = customDmEnglish;
    if (customDmSpanish) creator.customDmSpanish = customDmSpanish;

    saveDatabase(db);
    return NextResponse.json({ success: true, db });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Error al actualizar creador IG';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
