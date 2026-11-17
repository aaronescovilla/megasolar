const fs = require('fs');
const P = 'design/project/';
const mark = fs.readFileSync(P + 'WordmarksExtended.dc.html', 'utf8').match(/const mark = (\{[\s\S]*?\n    \});/)[1];
const sm = fs.readFileSync(P + 'WordmarksTech.dc.html', 'utf8').match(/const sm = (\{[\s\S]*?\n    \});/)[1];
const data = JSON.parse(fs.readFileSync('tools/saira_data.json', 'utf8')).map((v) => {
  const o = { n: v.n, name: v.name, spec: v.spec, word: v.word };
  if (v.full !== undefined && v.lead) o.full = v.full; else o.full = v.word;
  if (v.lead) o.lead = true;
  if (v.lower) o.lower = v.lower;
  return o;
});
// keep 'full' as a reference to 'word' when identical, to avoid duplicating path data
const dataSrc = '[\n' + data.map((o) => {
  const same = o.full === o.word;
  const base = Object.assign({}, o); delete base.full;
  let s = JSON.stringify(base);
  return '      ' + s;
}).join(',\n') + '\n    ].map((x, i, a) => Object.assign(x, { full: x.lead ? a[1].word : x.word }))';
const common = fs.readFileSync('tools/saira_common.js', 'utf8').replace(/\n$/, '');
for (const [tpl, out] of [['tools/saira_refine_tpl.html', 'SairaRefinements.dc.html'], ['tools/saira_suite_tpl.html', 'SairaSuite.dc.html']]) {
  const s = fs.readFileSync(tpl, 'utf8').replace('__MARK__', () => mark).replace('__SM__', () => sm).replace('__DATA__', () => dataSrc).replace('__COMMON__', () => common);
  fs.writeFileSync((process.argv[2] || P) + out, s);
  console.log(out, s.length);
}
