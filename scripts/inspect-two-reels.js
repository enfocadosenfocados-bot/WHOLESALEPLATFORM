const fs = require('fs');

const files = [
  { name: 'Reel 1 (DdXgpZgifRc)', path: 'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1247/content.md' },
  { name: 'Reel 2 (DeDFblQjNUI)', path: 'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1248/content.md' }
];

files.forEach(f => {
  console.log('====================================');
  console.log('FILE:', f.name);
  const text = fs.readFileSync(f.path, 'utf8');
  const ogTitle = text.match(/<meta property="og:title" content="([^"]+)"/i);
  const ogDesc = text.match(/<meta property="og:description" content="([^"]+)"/i) || text.match(/<meta name="description" content="([^"]+)"/i);
  const keywords = text.match(/<meta name="keywords" content="([^"]+)"/i);

  if (ogTitle) console.log('OG Title:', ogTitle[1].replace(/&quot;/g, '"').replace(/&#x2019;/g, "'"));
  if (ogDesc) console.log('OG Desc:', ogDesc[1].replace(/&quot;/g, '"').replace(/&#x2019;/g, "'"));
  if (keywords) console.log('Keywords:', keywords[1]);

  const lines = text.split('\n');
  lines.slice(0, 50).forEach((l, i) => {
    if (l.includes('og:') || l.includes('title') || l.includes('caption') || l.includes('author') || l.includes('description')) {
      console.log(`L${i+1}: ${l.trim().substring(0, 200)}`);
    }
  });
});
