const fs = require('fs');

const files = [
  'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1166/content.md',
  'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1167/content.md',
  'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1168/content.md',
  'C:/Users/Usuario/.gemini/antigravity/brain/6913929f-48e4-4e30-8bf3-25551cdc0e16/.system_generated/steps/1169/content.md'
];

files.forEach((f, idx) => {
  console.log('==============================');
  console.log('FILE ' + (idx + 1) + ': ' + f);
  if (!fs.existsSync(f)) {
    console.log('DOES NOT EXIST');
    return;
  }
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, lineNum) => {
    if (line.includes('og:title') || line.includes('og:description') || line.includes('description') || line.includes('"caption"') || line.includes('"text"') || line.includes('name="keywords"')) {
      console.log(`L${lineNum + 1}: ${line.trim().substring(0, 300)}`);
    }
  });
});
