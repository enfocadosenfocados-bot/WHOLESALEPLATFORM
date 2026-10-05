const fs = require('fs');

const files = [
  { id: '1 (Ddmekg-JyxX)', path: 'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1166/content.md' },
  { id: '2 (Dd6tPg6imii)', path: 'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1167/content.md' },
  { id: '3 (DW-cpNYAimV)', path: 'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1168/content.md' },
  { id: '4 (DeGJC56FtMz)', path: 'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1169/content.md' }
];

files.forEach(f => {
  console.log('====================================');
  console.log('ANALYZING LINK ' + f.id);
  const text = fs.readFileSync(f.path, 'utf8');

  // Find meta tags
  const ogTitle = text.match(/<meta property="og:title" content="([^"]+)"/i);
  const ogDesc = text.match(/<meta property="og:description" content="([^"]+)"/i) || text.match(/<meta name="description" content="([^"]+)"/i);
  const keywords = text.match(/<meta name="keywords" content="([^"]+)"/i);

  if (ogTitle) console.log('OG Title:', ogTitle[1].replace(/&quot;/g, '"').replace(/&#x2019;/g, "'").replace(/&#x1f[0-9a-f]{3};/g, ''));
  if (ogDesc) console.log('OG Description:', ogDesc[1].replace(/&quot;/g, '"').replace(/&#x2019;/g, "'"));
  if (keywords) console.log('Keywords:', keywords[1]);
});
