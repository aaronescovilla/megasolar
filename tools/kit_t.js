const fs = require('fs');
for (const file of ['KitColor', 'KitType', 'KitApplications']) {
  const src = fs.readFileSync('design/project/' + file + '.dc.html', 'utf8');
  const js = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
  const props = JSON.parse(src.match(/data-props='([^']*)'/)[1]);
  const C = new Function('DCLogic', js + '\nreturn Component;')(class { constructor(p) { this.props = p || {}; } });
  const tpl = src.split('<script type="text/x-dc"')[0];
  const lists = [...tpl.matchAll(/<sc-for list="\{\{(\w+)\}\}" as="(\w+)"/g)].map((m) => [m[1], m[2]]);
  const holes = [...new Set([...tpl.matchAll(/\{\{([^}]+)\}\}/g)].map((x) => x[1].trim()))];
  const get = (p, c) => p.split('.').reduce((o, k) => (o == null ? undefined : o[k]), c);
  for (const accent of props.accent.options.concat([undefined, 'red'])) {
    const v = new C({ accent }).renderVals();
    const miss = holes.filter((h) => {
      const l = lists.find(([, as]) => h.startsWith(as + '.'));
      if (l) return v[l[0]].some((it) => get(h.slice(l[1].length + 1), it) === undefined);
      return !lists.some(([name]) => name === h) && get(h, v) === undefined;
    });
    const s = JSON.stringify(v);
    if (miss.length || /NaN|Infinity|undefined/.test(s)) console.log(file, accent, 'PROBLEM', miss);
  }
  const v = new C({}).renderVals();
  console.log(file, 'ok', Object.entries(v).filter(([, x]) => x && x.w).map(([k, x]) => k + ' ' + x.w + 'x' + x.h).join(' | '), v.pairs ? v.pairs.map((p) => p.label + ' ' + p.ratio + ' ' + p.grade).join(' | ') : '');
}
