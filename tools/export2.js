// Exports the polished logo. Run from the repository root: node tools/export2.js
// Reads tools/symbol2_data.json and tools/wordmark2_data.json, writes brand/logo-v2/*.svg
const fs = require('fs');
const OUT = 'brand/logo-v2/';
const sym = JSON.parse(fs.readFileSync('tools/symbol2_data.json', 'utf8'));
const word = JSON.parse(fs.readFileSync('tools/wordmark2_data.json', 'utf8')).word;
const INK = '#0C1014', SUN = '#FFD12E', WHITE = '#FFFFFF';
const CAP = 688, n = (x) => String(Math.round(x * 100) / 100);
// pulse = a colour draws the pulse; null cuts it out so the background shows through
const symBody = (m, fill, pulse) => (pulse ? `<path fill="${fill}" d="${m.panels}"/><path fill="${pulse}" d="${m.pulse}"/>` : `<path fill="${fill}" d="${m.d}"/>`);
const svg = (vb, body, title) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><title>${title}</title>${body}</svg>\n`;
const M = sym.master, ratio = M.w / M.h;
const files = {};

// Horizontal logo: symbol one cap height tall on the baseline, gap 0.35 of the cap height.
const mw = CAP * ratio, gap = 0.35 * CAP, W = mw + gap + word.w, vh = word.y1 - word.y0;
const hz = (fill, pulse, wf) => `<g transform="scale(${n(CAP / M.h)})">${symBody(M, fill, pulse)}</g><path fill="${wf}" transform="translate(${n(mw + gap)} 0)" d="${word.d}"/>`;
const hzVb = `0 ${word.y0} ${n(W)} ${vh}`;
files['megasolar-logo.svg'] = svg(hzVb, hz(SUN, INK, INK), 'Megasolar');
files['megasolar-logo-reversed.svg'] = svg(hzVb, hz(SUN, null, WHITE), 'Megasolar');
files['megasolar-logo-black.svg'] = svg(hzVb, hz(INK, null, INK), 'Megasolar');
files['megasolar-logo-white.svg'] = svg(hzVb, hz(WHITE, null, WHITE), 'Megasolar');

// Stacked logo: symbol 2.2 caps tall, centred, 0.7 of a cap above the wordmark.
const sh = 2.2 * CAP, sw = sh * ratio, sg = 0.7 * CAP, SW = Math.max(word.w, sw), SH = sh + sg + word.y1;
const st = (fill, pulse, wf) => `<g transform="translate(${n((SW - sw) / 2)} 0) scale(${n(sh / M.h)})">${symBody(M, fill, pulse)}</g><path fill="${wf}" transform="translate(${n((SW - word.w) / 2)} ${n(sh + sg)})" d="${word.d}"/>`;
files['megasolar-logo-stacked.svg'] = svg(`0 0 ${n(SW)} ${n(SH)}`, st(SUN, INK, INK), 'Megasolar');
files['megasolar-logo-stacked-reversed.svg'] = svg(`0 0 ${n(SW)} ${n(SH)}`, st(SUN, null, WHITE), 'Megasolar');

// Symbol
const symVb = (m) => `0 0 ${m.w} ${m.h}`;
files['megasolar-symbol.svg'] = svg(symVb(M), symBody(M, SUN, INK), 'Megasolar symbol');
files['megasolar-symbol-reversed.svg'] = svg(symVb(M), symBody(M, SUN, null), 'Megasolar symbol, for dark backgrounds');
files['megasolar-symbol-black.svg'] = svg(symVb(M), symBody(M, INK, null), 'Megasolar symbol');
files['megasolar-symbol-white.svg'] = svg(symVb(M), symBody(M, WHITE, null), 'Megasolar symbol');
files['megasolar-symbol-small.svg'] = svg(symVb(sym.small), symBody(sym.small, SUN, INK), 'Megasolar symbol, for 24 px and below');
files['megasolar-symbol-small-black.svg'] = svg(symVb(sym.small), symBody(sym.small, INK, null), 'Megasolar symbol, for 24 px and below');

// Wordmark
const wmVb = `0 ${word.y0} ${word.w} ${vh}`;
files['megasolar-wordmark.svg'] = svg(wmVb, `<path fill="${INK}" d="${word.d}"/>`, 'Megasolar');
files['megasolar-wordmark-white.svg'] = svg(wmVb, `<path fill="${WHITE}" d="${word.d}"/>`, 'Megasolar');

// App icon (1024 square, Ink) and avatar (1024 circle, Solar Yellow)
const place = (m, size, widthShare, fill, pulse) => { const w = size * widthShare, h = w * m.h / m.w; return `<g transform="translate(${n((size - w) / 2)} ${n((size - h) / 2)}) scale(${n(w / m.w)})">${symBody(m, fill, pulse)}</g>`; };
files['megasolar-app-icon.svg'] = svg('0 0 1024 1024', `<rect width="1024" height="1024" rx="230" fill="${INK}"/>` + place(M, 1024, 0.7, SUN, null), 'Megasolar');
files['megasolar-app-icon-small.svg'] = svg('0 0 1024 1024', `<rect width="1024" height="1024" rx="230" fill="${INK}"/>` + place(sym.small, 1024, 0.76, SUN, null), 'Megasolar, for 32 px and below');
files['megasolar-avatar.svg'] = svg('0 0 1024 1024', `<circle cx="512" cy="512" r="512" fill="${SUN}"/>` + place(M, 1024, 0.62, INK, null), 'Megasolar');

fs.mkdirSync(OUT, { recursive: true });
for (const [k, v] of Object.entries(files)) fs.writeFileSync(OUT + k, v);
console.log(Object.keys(files).length, 'svgs written to', OUT);
