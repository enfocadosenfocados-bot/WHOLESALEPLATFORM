import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'skills-db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

const seedFilePath = path.join(process.cwd(), 'src', 'lib', 'seedPhase2Data.ts');
let seedContent = fs.readFileSync(seedFilePath, 'utf-8');

const regex = /export const INITIAL_CASH_BUYERS: VerifiedCashBuyer\[\] = \[[\s\S]*?\];/;
const replacement = `export const INITIAL_CASH_BUYERS: VerifiedCashBuyer[] = ${JSON.stringify(db.cashBuyers, null, 2)};`;

if (regex.test(seedContent)) {
  seedContent = seedContent.replace(regex, replacement);
  fs.writeFileSync(seedFilePath, seedContent, 'utf-8');
  console.log(`Successfully synchronized ${db.cashBuyers.length} buyers into src/lib/seedPhase2Data.ts!`);
} else {
  console.log('Regex did not match in seedPhase2Data.ts');
}
