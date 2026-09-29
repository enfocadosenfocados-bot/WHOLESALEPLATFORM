import fs from 'fs';
import path from 'path';
import { SkillDatabase, SkillModule } from '@/types/skill';
import { INITIAL_DATABASE } from './seedWholesaleSkills';
import {
  INITIAL_CASH_BUYERS,
  INITIAL_IG_CREATORS,
  INITIAL_SELLER_LEADS,
} from './seedPhase2Data';
import {
  exportAllSkillsToAntigravity,
  exportSkillToAntigravity,
} from './exporters/antigravityExporter';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'skills-db.json');

export function getDatabase(): SkillDatabase {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const initialDb: SkillDatabase = {
      ...structuredClone(INITIAL_DATABASE),
      cashBuyers: structuredClone(INITIAL_CASH_BUYERS),
      sellerLeads: structuredClone(INITIAL_SELLER_LEADS),
      igCreators: structuredClone(INITIAL_IG_CREATORS),
    };
    exportAllSkillsToAntigravity(initialDb.skills);
    initialDb.skills = initialDb.skills.map((s) => ({
      ...s,
      agyExportedPath: `.agents/skills/${s.slug}/SKILL.md`,
    }));
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf-8');
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as SkillDatabase;
    let modified = false;

    if (!parsed.cashBuyers || parsed.cashBuyers.length === 0) {
      parsed.cashBuyers = structuredClone(INITIAL_CASH_BUYERS);
      modified = true;
    }
    if (!parsed.sellerLeads || parsed.sellerLeads.length === 0) {
      parsed.sellerLeads = structuredClone(INITIAL_SELLER_LEADS);
      modified = true;
    }
    if (!parsed.igCreators || parsed.igCreators.length === 0) {
      parsed.igCreators = structuredClone(INITIAL_IG_CREATORS);
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(DB_PATH, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch {
    return {
      ...structuredClone(INITIAL_DATABASE),
      cashBuyers: structuredClone(INITIAL_CASH_BUYERS),
      sellerLeads: structuredClone(INITIAL_SELLER_LEADS),
      igCreators: structuredClone(INITIAL_IG_CREATORS),
    };
  }
}

export function saveDatabase(db: SkillDatabase): SkillDatabase {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  return db;
}

export function updateSingleSkill(updatedSkill: SkillModule): SkillDatabase {
  const db = getDatabase();
  const idx = db.skills.findIndex(
    (s) => s.id === updatedSkill.id || s.slug === updatedSkill.slug
  );
  if (idx >= 0) {
    db.skills[idx] = updatedSkill;
  } else {
    db.skills.unshift(updatedSkill);
  }

  if (db.settings.autoExportToAntigravity) {
    exportSkillToAntigravity(updatedSkill, true);
    updatedSkill.agyExportedPath = `.agents/skills/${updatedSkill.slug}/SKILL.md`;
  }

  return saveDatabase(db);
}
