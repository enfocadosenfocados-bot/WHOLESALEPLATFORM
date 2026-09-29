import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase, updateSingleSkill } from '@/lib/db';

export async function GET() {
  const db = getDatabase();
  return NextResponse.json(db);
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.action === 'toggle_step' && body.skillId && body.stepId) {
      const db = getDatabase();
      const skill = db.skills.find((s) => s.id === body.skillId);
      if (skill) {
        const step = skill.steps.find((st) => st.id === body.stepId);
        if (step) {
          step.completed = !step.completed;
          updateSingleSkill(skill);
        }
      }
      return NextResponse.json(getDatabase());
    }

    if (body.action === 'update_settings' && body.settings) {
      const db = getDatabase();
      db.settings = { ...db.settings, ...body.settings };
      saveDatabase(db);
      return NextResponse.json(db);
    }

    return NextResponse.json({ error: 'Acción no reconocida' }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error interno';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
