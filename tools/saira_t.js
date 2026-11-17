const fs = require('fs');
for (const file of ['SairaRefinements.dc.html', 'SairaSuite.dc.html']) {
  const src = fs.readFileSync('design/project/' + file, 'utf8');
  const js = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
  const props = JSON.parse(src.match(/data-props='([^']*)'/)[1]);
  const C = new Function('DCLogic', js + '\nreturn Component;')(class { constructor(p) { this.props = p || {}; } });
  const tpl = src.split('<script type="text/x-dc"')[0];
  const holes = [...new Set([...tpl.matchAll(/\{\{([^}]+)\}\}/g)].map((x) => x[1].trim()))];
  const get = (p, c) => p.split('.').reduce((o, k) => (o == null ? undefined : o[k]), c);
  const versions = props.version ? props.version.options : [undefined];
  let bad = 0;
  for (const version of versions) for (const markSize of props.markSize.options.concat([undefined])) {
    const v = new C({ version, markSize }).renderVals();
    const miss = holes.filter((h) => h !== 'opts' && !h.startsWith('o.') && get(h, v) === undefined)
      .concat(holes.filter((h) => h.startsWith('o.')).filter((h) => v.opts.some((o) => get(h.slice(2), o) === undefined)));
    const s = JSON.stringify(v);
    if (miss.length || /NaN|Infinity|undefined/.test(s)) { bad++; console.log(file, version, markSize, 'missing', miss, /NaN/.test(s)); }
  }
  const v = new C({}).renderVals();
  if (v.opts) v.opts.forEach((o) => console.log(o.n, o.name, 'a', o.a.w + 'x' + o.a.h, 'b', o.b.w + 'x' + o.b.h));
  else ['L1', 'L2', 'L3', 'L4', 'L5', 'P1', 'P2', 'stk', 'wm'].forEach((key) => console.log(key, v[key].w + 'x' + v[key].h, v[key].mhPx || ''));
  const v49 = v.opts ? null : new C({ version: '49 Symbol as the M' }).renderVals();
  if (v49) console.log('49 L1', v49.L1.w + 'x' + v49.L1.h, 'stk', v49.stk.w + 'x' + v49.stk.h, 'full==tuned', v49.full === new C({}).renderVals().word);
  console.log(file, bad ? 'PROBLEMS ' + bad : 'all combos ok');
}
