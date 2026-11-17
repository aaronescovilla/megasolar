const fs = require('fs');
const P = 'design/project/';
const mark = fs.readFileSync(P + 'WordmarksExtended.dc.html', 'utf8').match(/const mark = (\{[\s\S]*?\n    \});/)[1];
const sm = fs.readFileSync(P + 'WordmarksTech.dc.html', 'utf8').match(/const sm = (\{[\s\S]*?\n    \});/)[1];
const w = JSON.parse(fs.readFileSync('tools/saira_data.json', 'utf8')).find((x) => x.n === 42).word;
const v42 = '(() => { const w = ' + JSON.stringify(w) + '; return { n: 42, word: w, full: w }; })()';
const common = fs.readFileSync('tools/saira_common.js', 'utf8').replace(/\n$/, '');
for (const [tpl, out] of [['kit_color_tpl', 'KitColor'], ['kit_type_tpl', 'KitType'], ['kit_apps_tpl', 'KitApplications']]) {
  const s = fs.readFileSync('tools/' + tpl + '.html', 'utf8').replace('__MARK__', () => mark).replace('__SM__', () => sm).replace('__V42__', () => v42).replace('__COMMON__', () => common);
  fs.writeFileSync((process.argv[2] || P) + out + '.dc.html', s); console.log(out, s.length);
}
