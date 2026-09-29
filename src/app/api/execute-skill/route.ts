import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import { callMultimodalAI } from '@/lib/aiClient';
import { searchWebDuckDuckGo } from '@/lib/agents/researchAgent';

export async function POST(req: NextRequest) {
  try {
    const { skillSlug, userGoal, targetMarketOrCase, apiKey } = await req.json();
    const db = getDatabase();
    const skill = db.skills.find((s) => s.slug === skillSlug) || db.skills[0];

    // 1. Live web search to enrich the execution with real-time links for the target market/case
    const searchQuery = `${targetMarketOrCase || ''} ${userGoal || skill.title} wholesale real estate public records`;
    const webFindings = await searchWebDuckDuckGo(searchQuery);

    const systemPrompt = `Eres un Agente Ejecutor Autónomo de Wholesale Real Estate impulsado por la Skill "${skill.title}" (Versión v${skill.version}).
Tu trabajo NO es dar teoría genérica, sino EJECUTAR paso a paso la habilidad sobre el caso real o mercado que te pide el usuario, usando el procedimiento exacto aprendido de FreeWholesaling.com y los Reels cargados en el sistema.

Conocimiento acumulado de la Skill (${skill.version}):
- Pasos operativos: ${JSON.stringify(skill.steps.map((s) => ({ order: s.order, title: s.title, actions: s.exactCommandsOrClicks })))}
- Portales y Herramientas disponibles: ${JSON.stringify(skill.resources.map((r) => ({ name: r.name, url: r.url, howToUse: r.howToUse })))}
- Guiones y Plantillas: ${JSON.stringify(skill.scriptsAndTemplates.map((t) => ({ title: t.title, content: t.content })))}

Resultados de búsqueda en vivo para este caso:
${JSON.stringify(webFindings, null, 2)}

Entrega tu respuesta en formato Markdown estructurado con:
1. **Plan de Acción Inmediato para ${targetMarketOrCase || 'tu caso'}** (pasos exactos con links clicables reales).
2. **Portales Exactos / Filtros a Aplicar Ahora Mismo**.
3. **Guion / Mensaje / Plantilla Personalizada** lista para copiar y usar hoy en este caso.`;

    const userPrompt = `Ejecuta la habilidad "${skill.title}" para el siguiente objetivo:
- Mercado / Propiedad / Condado Objetivo: ${targetMarketOrCase || 'General US Market'}
- Instrucción Específica: ${userGoal || 'Ejecutar el flujo completo paso a paso y darme los links y guiones listos.'}`;

    let executionOutput = '';
    try {
      executionOutput = await callMultimodalAI({
        systemPrompt,
        userPrompt,
        model: db.settings.preferredModel || 'google/gemini-2.5-flash',
        apiKey,
      });
    } catch {
      // Fallback deterministic execution output
      const linksList = [
        ...webFindings.map((w) => `- **[${w.title}](${w.url})**: ${w.snippet}`),
        ...skill.resources.map((r) => `- **[${r.name}](${r.url})**: ${r.howToUse}`),
      ].join('\n');

      const stepsList = skill.steps
        .map(
          (st) =>
            `### Paso ${st.order}: ${st.title}\n${st.actionDescription}\n${st.exactCommandsOrClicks.map((c) => `- ${c}`).join('\n')}`
        )
        .join('\n\n');

      executionOutput = `## Ejecución Operativa: ${skill.title} (v${skill.version})\n**Objetivo:** ${userGoal || 'Ejecución completa'} | **Mercado/Caso:** ${targetMarketOrCase || 'General'}\n\n### 1. Enlaces y Portales Detectados en Vivo\n${linksList}\n\n### 2. Hoja de Ruta Ejecutable\n${stepsList}`;
    }

    return NextResponse.json({
      skillTitle: skill.title,
      skillVersion: skill.version,
      webFindings,
      executionOutput,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error al ejecutar la Skill';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
