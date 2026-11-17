const fs = require('fs');
const src = fs.readFileSync('design/project/WordmarksTesla.dc.html', 'utf8');
const js = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];
const Component = new Function('DCLogic', js + '\nreturn Component;')(class { constructor(p) { this.props = p || {}; } });
const tplPart = src.split('<script type="text/x-dc"')[0];
const holes = [...new Set([...tplPart.matchAll(/\{\{([^}]+)\}\}/g)].map(x => x[1].trim()))];
for (const props of [{}, { hero: '38 Rounded' }, { hero: '39 Slanted', accent: '#3BE083' }, { hero: 'bogus' }]) {
  const v = new Component(props).renderVals();
  const get = (path, ctx) => path.split('.').reduce((o, k) => o == null ? undefined : o[k], ctx);
  const missing = holes.filter(h => h !== 'opts' && !h.startsWith('o.') && get(h, v) === undefined);
  const missO = holes.filter(h => h.startsWith('o.')).filter(h => v.opts.some(o => get(h.slice(2), o) === undefined));
  const s = JSON.stringify(v);
  console.log(JSON.stringify(props), /NaN|Infinity|undefined/.test(s) ? 'BAD' : 'ok', 'missing:', [...missing, ...missO].join(',') || 'none', 'hero:', v.hero.label, v.hero.nav.w + 'x' + v.hero.nav.h);
  if (!props.hero) v.opts.forEach(o => {
    const nums = (o.ds + ' ' + o.df).replace(/A[\d.\s]+? 0 0 [01] /g, 'L').match(/-?[\d.]+/g).map(Number);
    let xs = [], ys = []; for (let i = 0; i + 1 < nums.length; i += 2) { xs.push(nums[i]); ys.push(nums[i + 1]); }
    console.log(o.n, o.name, 'W', o.wm.vb, 'wm', o.wm.w + 'x' + o.wm.h, 'lk', o.lk.w + 'x' + o.lk.h, 'x', Math.min(...xs), Math.max(...xs), 'y', Math.min(...ys), Math.max(...ys));
  });
}
