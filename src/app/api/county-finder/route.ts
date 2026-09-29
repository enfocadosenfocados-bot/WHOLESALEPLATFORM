import { NextRequest, NextResponse } from 'next/server';
import { discoverCountyGovernmentPortals } from '@/lib/agents/researchAgent';

export async function POST(req: NextRequest) {
  try {
    const { state, county, listType } = await req.json();
    if (!state || !county || !listType) {
      return NextResponse.json(
        { error: 'Por favor indica Estado, Condado y Tipo de Lista.' },
        { status: 400 }
      );
    }

    const result = await discoverCountyGovernmentPortals(state, county, listType);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al buscar portales del condado';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
