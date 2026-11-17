// Runs each v2 board's logic and reports unresolved holes or unbalanced tags.
//   node tools/kit2/check.js [folder]
const fs = require('fs');
const dir = process.argv[2] || 'design/project/';
const get = (p, c) => p.split('.').reduce((o, k) => (o == null ? undefined : o[k]), c);
let bad = 0;
for (const file of fs.readdirSync(dir).filter((f) => /^(Kit2|BeforeAfter).*\.dc\.html$/.test(f))) {
  const src = fs.readFileSync(dir + file, 'utf8');
  const js = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
  const props = JSON.parse(src.match(/data-props='([^']*)'/)[1]);
  const C = new Function('DCLogic', js + '\nreturn Component;')(class { constructor(p) { this.props = p || {}; } });
  const tpl = src.slice(src.indexOf('<x-dc>'), src.indexOf('</x-dc>'));
  const holes = [...new Set([...tpl.matchAll(/\{\{([^}]+)\}\}/g)].map((x) => x[1].trim()))];
  const sets = [{}, { accent: '#3BE083' }, { columns: 40, rows: 10, days: 4 }, { columns: 8, rows: 3, days: 1 }, { columns: 'x', rows: null, days: 9 }];
  const problems = [];
  for (const p of sets) {
    const v = new C(p).renderVals();
    const miss = holes.filter((h) => get(h, v) === undefined);
    if (miss.length || /NaN|Infinity|undefined/.test(JSON.stringify(v))) problems.push(JSON.stringify(p) + ' ' + miss.join(','));
  }
  const count = (re) => (tpl.match(re) || []).length;
  const tags = ['div', 'svg', 'path', 'g', 'a', 'span', 'nav', 'text', 'circle'].filter((t) => count(new RegExp('<' + t + '[\\s>]', 'g')) !== count(new RegExp('</' + t + '>', 'g')));
  if (tags.length) problems.push('unbalanced: ' + tags.join(','));
  if (/\$\{|undefined|NaN|\[object/.test(tpl)) problems.push('template leak');
  if (problems.length) bad++;
  console.log(file, Object.keys(props).filter((k) => k !== '$preview').join(','), holes.length + ' holes', problems.length ? 'PROBLEM ' + problems.join(' | ') : 'ok');
}
process.exit(bad ? 1 : 0);
