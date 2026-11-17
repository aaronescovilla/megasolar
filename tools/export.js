const fs = require('fs');
const P = 'design/project/';
const OUT = 'brand/logo/';
const ev = (src) => new Function('return (' + src + ')')();
const mk = ev(fs.readFileSync(P + 'WordmarksExtended.dc.html', 'utf8').match(/const mark = (\{[\s\S]*?\n    \});/)[1]);
const sm = ev(fs.readFileSync(P + 'WordmarksTech.dc.html', 'utf8').match(/const sm = (\{[\s\S]*?\n    \});/)[1]);
const V = JSON.parse(fs.readFileSync('tools/saira_data.json', 'utf8'));
const w42 = V.find((v) => v.n === 42).word;
const INK = '#0C1014', SUN = '#FFD12E', WHITE = '#FFFFFF';
const CAP = 688, R = 663.34 / 400;
const n = (x) => String(Math.round(x * 100) / 100);
const markG = (m, fill, x, y, h) => `<g fill="${fill}" transform="translate(${n(x)} ${n(y)}) scale(${n(h / 400)})"><path d="${m.p1}"/><path d="${m.p2}"/><path d="${m.p3}"/><path d="${m.p4}"/></g>`;
const svg = (vb, body, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><title>${title}</title>${body}</svg>\n`;
const files = {};
// horizontal lockup: symbol 1.35x cap, centred on caps, gap 0.42 cap
const mh = 1.35 * CAP, mw = mh * R, top = CAP / 2 - mh / 2, gap = 0.42 * CAP, W = mw + gap + w42.w;
const hzVb = `0 ${n(top)} ${n(W)} ${n(mh)}`;
const hz = (mf, wf) => markG(mk, mf, 0, top, mh) + `<path fill="${wf}" transform="translate(${n(mw + gap)} 0)" d="${w42.d}"/>`;
files['megasolar-logo.svg'] = svg(hzVb, hz(SUN, INK), 'Megasolar');
files['megasolar-logo-reversed.svg'] = svg(hzVb, hz(SUN, WHITE), 'Megasolar');
files['megasolar-logo-black.svg'] = svg(hzVb, hz(INK, INK), 'Megasolar');
files['megasolar-logo-white.svg'] = svg(hzVb, hz(WHITE, WHITE), 'Megasolar');
// stacked: symbol 2.4x cap, centred above, gap 0.62 cap
const sh = 2.4 * CAP, sw = sh * R, sg = 0.62 * CAP, SW = Math.max(w42.w, sw), SH = sh + sg + w42.y1;
const st = (mf, wf) => markG(mk, mf, (SW - sw) / 2, 0, sh) + `<path fill="${wf}" transform="translate(${n((SW - w42.w) / 2)} ${n(sh + sg)})" d="${w42.d}"/>`;
files['megasolar-logo-stacked.svg'] = svg(`0 0 ${n(SW)} ${n(SH)}`, st(SUN, INK), 'Megasolar');
files['megasolar-logo-stacked-reversed.svg'] = svg(`0 0 ${n(SW)} ${n(SH)}`, st(SUN, WHITE), 'Megasolar');
// symbol and wordmark
files['megasolar-symbol.svg'] = svg(mk.vb, markG(mk, SUN, 0, 0, 400), 'Megasolar symbol');
files['megasolar-symbol-black.svg'] = svg(mk.vb, markG(mk, INK, 0, 0, 400), 'Megasolar symbol');
files['megasolar-symbol-white.svg'] = svg(mk.vb, markG(mk, WHITE, 0, 0, 400), 'Megasolar symbol');
files['megasolar-symbol-small.svg'] = svg(sm.vb, markG(sm, SUN, 0, 0, 400), 'Megasolar symbol, for 32 px and below');
files['megasolar-wordmark.svg'] = svg(`0 ${w42.y0} ${w42.w} ${w42.y1 - w42.y0}`, `<path fill="${INK}" d="${w42.d}"/>`, 'Megasolar');
files['megasolar-wordmark-white.svg'] = svg(`0 ${w42.y0} ${w42.w} ${w42.y1 - w42.y0}`, `<path fill="${WHITE}" d="${w42.d}"/>`, 'Megasolar');
// app icon: 1024 square, radius 22.5%, small-cut symbol 76% wide
const iw = 1024 * 0.76, ih = iw * 400 / 676.04;
files['megasolar-app-icon.svg'] = svg('0 0 1024 1024', `<rect width="1024" height="1024" rx="230" fill="${INK}"/>` + markG(sm, SUN, (1024 - iw) / 2, (1024 - ih) / 2, ih), 'Megasolar');
files['megasolar-avatar.svg'] = svg('0 0 1024 1024', `<circle cx="512" cy="512" r="512" fill="${SUN}"/>` + markG(sm, INK, (1024 - 0.66 * 1024) / 2, (1024 - 0.66 * 1024 * 400 / 676.04) / 2, 0.66 * 1024 * 400 / 676.04), 'Megasolar');
for (const [k, v] of Object.entries(files)) fs.writeFileSync(OUT + k, v);
console.log(Object.keys(files).length, 'svgs', 'lockup ratio', (W / mh).toFixed(3));
