const http = require('http');

http.get('http://localhost:3005/sell', res => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    console.log('HTML status:', res.statusCode);
    const regex = /href="([^"]+\.css[^"]*)"/g;
    let match;
    const links = [];
    while ((match = regex.exec(html)) !== null) {
      links.push(match[1]);
    }
    console.log('Found CSS links:', links);

    links.forEach(l => {
      http.get('http://localhost:3005' + l, cssRes => {
        let css = '';
        cssRes.on('data', c => css += c);
        cssRes.on('end', () => {
          console.log(`CSS link: ${l} | Status: ${cssRes.statusCode} | Length: ${css.length} | Has bg-slate: ${css.includes('bg-slate-950')}`);
        });
      });
    });
  });
});
