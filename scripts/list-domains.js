const fs = require('fs');

const files = [
  'data/skills-db.json',
  'src/components/CountyGovFinder.tsx',
  'src/components/IngestCenter.tsx',
  'src/components/DealsPipeline.tsx',
  'src/app/api/platform-chat/route.ts'
];

const found = new Set();
const regex = /https?:\/\/[a-zA-Z0-9.\-_]+(?:\.[a-zA-Z]{2,})(?:\/[^\s"'()>]*)?/g;

files.forEach(f => {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const matches = text.match(regex) || [];
    matches.forEach(m => {
      if (!m.includes('localhost') && !m.includes('instagram.com') && !m.includes('github.com')) {
        try {
          const u = new URL(m);
          found.add(u.origin);
        } catch(e) {}
      }
    });
  }
});

console.log(JSON.stringify(Array.from(found).sort(), null, 2));
