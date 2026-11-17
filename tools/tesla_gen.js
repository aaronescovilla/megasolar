const fs = require('fs');
const P = 'design/project/';
const ext = fs.readFileSync(P + 'WordmarksExtended.dc.html', 'utf8');
const m = ext.match(/const mark = (\{[\s\S]*?\n    \});/);
const tpl = fs.readFileSync('tools/tesla_template.html', 'utf8');
fs.writeFileSync((process.argv[2] || P) + 'WordmarksTesla.dc.html', tpl.replace('__MARK__', m[1]));
console.log('written');
