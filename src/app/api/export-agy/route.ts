import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import {
  exportAllSkillsToAntigravity,
  exportSkillToAntigravity,
  generateAntigravitySkillMarkdown,
} from '@/lib/exporters/antigravityExporter';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const db = getDatabase();

    if (body.skillSlug) {
      const skill = db.skills.find((s) => s.slug === body.skillSlug);
      if (!skill) {
        return NextResponse.json({ error: 'Skill no encontrada' }, { status: 404 });
      }
      const paths = exportSkillToAntigravity(skill, true);
      const markdown = generateAntigravitySkillMarkdown(skill);
      return NextResponse.json({
        success: true,
        exported: [{ slug: skill.slug, ...paths }],
        markdownPreview: markdown,
      });
    }

    const exported = exportAllSkillsToAntigravity(db.skills);
    return NextResponse.json({
      success: true,
      exported,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al exportar a Antigravity';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
