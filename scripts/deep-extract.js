const fs = require('fs');

const files = [
  { name: 'Richard Taylor Reel 1 (Ddmekg-JyxX)', path: 'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1166/content.md' },
  { name: 'Richard Taylor Reel 2 (Dd6tPg6imii)', path: 'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1167/content.md' },
  { name: 'Olivia Schremmer Post 3 (DW-cpNYAimV)', path: 'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1168/content.md' },
  { name: 'Olivia Schremmer Post 4 (DeGJC56FtMz)', path: 'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1169/content.md' }
];

files.forEach(f => {
  console.log('==================================================');
  console.log('FILE:', f.name);
  const text = fs.readFileSync(f.path, 'utf8');

  // Regex for any video transcript, accessibility_caption, caption, or video text
  const matches = text.matchAll(/"(accessibility_caption|text|caption|description|video_transcription|subtitle)"\s*:\s*"([^"]{20,})"/gi);
  for (const m of matches) {
    console.log(`[${m[1]}]:`, m[2].substring(0, 300));
  }
});
