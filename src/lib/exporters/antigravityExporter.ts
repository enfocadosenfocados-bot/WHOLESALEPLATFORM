import fs from 'fs';
import path from 'path';
import os from 'os';
import { SkillModule } from '@/types/skill';

export function generateAntigravitySkillMarkdown(skill: SkillModule): string {
  const stepsMarkdown = skill.steps
    .sort((a, b) => a.order - b.order)
    .map((step) => {
      const subActions = step.exactCommandsOrClicks
        .map((cmd) => `   - ${cmd}`)
        .join('\n');
      return `### Paso ${step.order}: ${step.title}
${step.actionDescription}

**Acciones exactas / Clics / Filtros:**
${subActions}
${step.proTip ? `\n> **Pro-Tip (${step.sourceAttribution}):** ${step.proTip}` : ''}`;
    })
    .join('\n\n');

  const resourcesMarkdown =
    skill.resources.length > 0
      ? skill.resources
          .map(
            (r) =>
              `- **[${r.name}](${r.url})** (${r.isFree ? 'GRATIS' : 'PAGO'} | Categoría: \`${r.category}\` | Fuente: \`${r.discoveredVia}\`)\n  - *Cómo usarlo*: ${r.howToUse}`
          )
          .join('\n')
      : '- Sin recursos externos registrados aún.';

  const templatesMarkdown =
    skill.scriptsAndTemplates.length > 0
      ? skill.scriptsAndTemplates
          .map(
            (t) => `### ${t.title} (\`${t.type}\`)
*Cuándo usarlo*: ${t.whenToUse}

\`\`\`text
${t.content}
\`\`\``
          )
          .join('\n\n')
      : '';

  const changelogMarkdown = skill.changelog
    .map(
      (c) =>
        `- **v${c.version}** (${c.date}) — *${c.sourceTitle}* [\`${c.sourceType}\`]: ${c.summaryOfNewKnowledge}`
    )
    .join('\n');

  return `---
name: ${skill.slug}
description: >-
  ${skill.title} (v${skill.version}). ${skill.summary.replace(/\n/g, ' ')}
  Use this skill whenever the user asks to execute, research, or apply strategies related to ${skill.title} or ${skill.category}.
---

# ${skill.title} (Skill Evolutiva v${skill.version})

**Categoría:** ${skill.category} | **Nivel de Dominio Acumulado:** ${skill.masteryScore}% | **Última actualización:** ${skill.lastUpdated}

## Propósito y Fundamento Estratégico
${skill.summary}

**¿Por qué funciona esta estrategia?**
${skill.whyItWorks}

---

## Procedimiento Operativo Estándar (Paso a Paso)

Cuando el usuario pida ejecutar o aplicar esta habilidad, sigue y ejecuta rigurosamente estos pasos:

${stepsMarkdown}

---

## Portales de Gobierno, Herramientas y Links Verificados

${resourcesMarkdown}

${
  templatesMarkdown
    ? `---\n\n## Guiones, Plantillas FOIA y Cláusulas Operativas\n\n${templatesMarkdown}\n`
    : ''
}
---

## Historial de Evolución (Reels, PDFs y Webs Absorbidos)

${changelogMarkdown}
`;
}

export function exportSkillToAntigravity(
  skill: SkillModule,
  alsoExportGlobal = true
): { workspacePath: string; globalPath?: string } {
  const markdown = generateAntigravitySkillMarkdown(skill);

  // 1. Export to project workspace .agents/skills/<slug>/SKILL.md
  const workspaceSkillDir = path.join(
    process.cwd(),
    '.agents',
    'skills',
    skill.slug
  );
  fs.mkdirSync(workspaceSkillDir, { recursive: true });
  const workspacePath = path.join(workspaceSkillDir, 'SKILL.md');
  fs.writeFileSync(workspacePath, markdown, 'utf-8');

  let globalPath: string | undefined;
  if (alsoExportGlobal) {
    try {
      const globalSkillDir = path.join(
        os.homedir(),
        '.gemini',
        'config',
        'skills',
        skill.slug
      );
      fs.mkdirSync(globalSkillDir, { recursive: true });
      globalPath = path.join(globalSkillDir, 'SKILL.md');
      fs.writeFileSync(globalPath, markdown, 'utf-8');
    } catch {
      // Ignore if global config dir is restricted
    }
  }

  return { workspacePath, globalPath };
}

export function exportAllSkillsToAntigravity(skills: SkillModule[]) {
  return skills.map((skill) => ({
    slug: skill.slug,
    ...exportSkillToAntigravity(skill, true),
  }));
}
