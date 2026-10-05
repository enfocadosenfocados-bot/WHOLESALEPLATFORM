const fs = require('fs');

const path = 'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1224/content.md';
const text = fs.readFileSync(path, 'utf8');

const ogTitle = text.match(/<meta property="og:title" content="([^"]+)"/i);
const ogDesc = text.match(/<meta property="og:description" content="([^"]+)"/i) || text.match(/<meta name="description" content="([^"]+)"/i);
const keywords = text.match(/<meta name="keywords" content="([^"]+)"/i);

console.log('OG Title:', ogTitle ? ogTitle[1].replace(/&quot;/g, '"').replace(/&#x2019;/g, "'") : 'None');
console.log('OG Desc:', ogDesc ? ogDesc[1].replace(/&quot;/g, '"').replace(/&#x2019;/g, "'") : 'None');
console.log('Keywords:', keywords ? keywords[1] : 'None');

const lines = text.split('\n');
lines.slice(0, 60).forEach((l, i) => {
  if (l.includes('og:') || l.includes('title') || l.includes('caption') || l.includes('author') || l.includes('description')) {
    console.log(`L${i+1}: ${l.trim().substring(0, 200)}`);
  }
});
