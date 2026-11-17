// Shared pieces for the v2 brand kit boards. Run the build from the repository root.
const fs = require('fs');
const { oklch, contrast, hexRgb } = require('./color.js');

const P = 'design/project/';
const ev = (src) => new Function('return (' + src + ')')();
const mk = ev(fs.readFileSync(P + 'WordmarksExtended.dc.html', 'utf8').match(/const mark = (\{[\s\S]*?\n    \});/)[1]);
const sm = ev(fs.readFileSync(P + 'WordmarksTech.dc.html', 'utf8').match(/const sm = (\{[\s\S]*?\n    \});/)[1]);
const w42 = JSON.parse(fs.readFileSync('tools/saira_data.json', 'utf8')).find((v) => v.n === 42).word;

// Tokens
const INK = '#0C1014', GRAPHITE = '#1B2127', PAPER = '#F7F8F5', MIST = '#E3E6E0', WHITE = '#FFFFFF', SLATE = '#5B6570', SOLAR = '#FFD12E';
const LINE = '#D5D9D2', LINE_DARK = '#222A33', SURFACE_DARK = '#12171D', TEXT2_DARK = '#A9B1BA', TEXT3_DARK = '#8B949E', TEXT2 = '#2A3138';
const A = '{{accent}}';
const UI = "font-family: 'Geist', ui-sans-serif, system-ui, sans-serif";
const SX = "font-family: 'Saira', ui-sans-serif, system-ui, sans-serif; font-stretch: 125%; font-weight: 600";
const MONO = "font-family: 'Geist Mono', ui-monospace, monospace";
const FONTS = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&amp;family=Geist+Mono:wght@400;500&amp;family=Saira:wdth,wght@50..125,100..900&amp;display=swap';
const TAN = Math.tan(19 * Math.PI / 180);
const f = (n) => String(Math.round(n * 10) / 10);

// Scales
const SOLAR_SCALE = [[50, 0.985, 0.035, 100], [100, 0.965, 0.07, 99], [200, 0.94, 0.11, 97], [300, 0.91, 0.15, 95], [400], [500, 0.8, 0.16, 88], [600, 0.7, 0.142, 83], [700, 0.585, 0.12, 78], [800, 0.46, 0.095, 74], [900, 0.34, 0.07, 72]]
  .map(([n, L, C, h]) => ({ n, hex: n === 400 ? SOLAR : oklch(L, C, h) }));
const S = Object.fromEntries(SOLAR_SCALE.map((s) => [s.n, s.hex]));
const NEUTRAL_SCALE = [[0, '#FFFFFF', 'White'], [50, PAPER, 'Paper'], [100, '#EEF0EB', ''], [200, MIST, 'Mist'], [300, '#C9CED4', ''], [400, '#A9B1BA', ''], [500, '#8B949E', ''], [600, SLATE, 'Slate'], [700, '#3A424B', ''], [800, '#2A3138', ''], [900, GRAPHITE, 'Graphite'], [950, INK, 'Ink']]
  .map(([n, hex, name]) => ({ n, hex, name }));
const STATUS = { online: oklch(0.8, 0.17, 152), degraded: oklch(0.74, 0.16, 58), fault: oklch(0.62, 0.21, 27), offline: '#8B949E' };
const SERIES = { generation: SOLAR, grid: oklch(0.68, 0.14, 252), battery: oklch(0.78, 0.11, 190), load: '#C9CED4' };
const HEAT = [GRAPHITE, S[900], S[800], S[600], S[400], S[200]];

// Logo geometry, in the wordmark's font units (cap height 688, y down from the cap top).
const CAP = 688, R = 663.34 / 400;
const MH = 1.35 * CAP, MW = MH * R, TOP = CAP / 2 - MH / 2, GAP = 0.42 * CAP, LW = MW + GAP + w42.w;
const LOCK_RATIO = LW / MH;
const markPaths = (m) => `<path d="${m.p1}"></path><path d="${m.p2}"></path><path d="${m.p3}"></path><path d="${m.p4}"></path>`;

// Horizontal lockup. markPx = symbol height in px.
const lockup = (markPx, markFill, wordFill, o = {}) => {
  const w = o.w ?? markPx * LOCK_RATIO, h = o.h ?? markPx;
  const paint = o.outline
    ? [`fill="none" stroke="${o.outline}" stroke-width="${f(o.sw / (MH / 400))}"`, `fill="none" stroke="${o.outline}" stroke-width="${o.sw}"`]
    : [`fill="${markFill}"`, `fill="${wordFill}"`];
  const a11y = o.decor ? 'aria-hidden="true"' : 'role="img" aria-label="Megasolar"';
  return `<svg width="${f(w)}" height="${f(h)}" viewBox="0 ${f(TOP)} ${f(LW)} ${f(MH)}"${o.stretch ? ' preserveAspectRatio="none"' : ''} ${a11y}${o.style ? ` style="${o.style}"` : ''}><g transform="translate(0 ${f(TOP)}) scale(${(MH / 400).toFixed(4)})" ${paint[0]}>${markPaths(mk)}</g><path transform="translate(${f(MW + GAP)} 0)" d="${w42.d}" ${paint[1]}></path></svg>`;
};
// Wordmark first, symbol second: only for the "don't rearrange" example.
const lockupSwapped = (markPx, markFill, wordFill) => `<svg width="${f(markPx * LOCK_RATIO)}" height="${f(markPx)}" viewBox="0 ${f(TOP)} ${f(LW)} ${f(MH)}" aria-hidden="true"><path d="${w42.d}" fill="${wordFill}"></path><g transform="translate(${f(w42.w + GAP)} ${f(TOP)}) scale(${(MH / 400).toFixed(4)})" fill="${markFill}">${markPaths(mk)}</g></svg>`;
const stackedLockup = (wPx, markFill, wordFill) => {
  const sh = 2.4 * CAP, sw = sh * R, sg = 0.62 * CAP, W = Math.max(w42.w, sw), H = sh + sg + w42.y1;
  return `<svg width="${f(wPx)}" height="${f(wPx * H / W)}" viewBox="0 0 ${f(W)} ${f(H)}" role="img" aria-label="Megasolar"><g transform="translate(${f((W - sw) / 2)} 0) scale(${(sh / 400).toFixed(4)})" fill="${markFill}">${markPaths(mk)}</g><path transform="translate(${f((W - w42.w) / 2)} ${f(sh + sg)})" d="${w42.d}" fill="${wordFill}"></path></svg>`;
};
// Symbol alone. hPx = height in px. small = the wider-cut version for 32 px and below.
const symbol = (hPx, fill, o = {}) => {
  const m = o.small ? sm : mk, ratio = (o.small ? 676.04 : 663.34) / 400;
  return `<svg width="${f(hPx * ratio)}" height="${f(hPx)}" viewBox="${m.vb}" aria-hidden="true"${o.style ? ` style="${o.style}"` : ''}><g fill="${fill}">${markPaths(m)}</g></svg>`;
};
const wordmark = (hPx, fill) => `<svg width="${f(hPx * w42.w / (w42.y1 - w42.y0))}" height="${f(hPx)}" viewBox="0 ${w42.y0} ${w42.w} ${w42.y1 - w42.y0}" role="img" aria-label="Megasolar"><path d="${w42.d}" fill="${fill}"></path></svg>`;

// Grid of panel cells leaning 19°. keyFn(col, row) names the group a cell belongs to; row 0 is the top.
const arrayPaths = (cols, rows, cw, ch, gap, keyFn) => {
  const out = {}, py = ch + gap, px = cw + gap, H = rows * py - gap;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const yT = r * py, yB = yT + ch, xb = c * px + (H - yB) * TAN, xt = c * px + (H - yT) * TAN, key = keyFn(c, r);
    if (key == null) continue;
    out[key] = (out[key] || '') + `M${f(xb)} ${f(yB)}L${f(xb + cw)} ${f(yB)}L${f(xt + cw)} ${f(yT)}L${f(xt)} ${f(yT)}Z`;
  }
  return { w: cols * px - gap + H * TAN, h: H, paths: out };
};
// Lit when the cell sits under a run of daily output humps.
const humpKey = (cols, rows, days) => (c, r) => {
  const per = cols / days, t = ((c % per) + 0.5) / per;
  return rows - r <= Math.round(Math.pow(Math.sin(Math.PI * t), 1.5) * rows) ? 'lit' : 'dim';
};
const arraySvg = (arr, fills, o = {}) => `<svg width="${f(o.w ?? arr.w)}" height="${f((o.w ?? arr.w) * arr.h / arr.w)}" viewBox="-1 -1 ${f(arr.w + 2)} ${f(arr.h + 2)}" aria-hidden="true"${o.style ? ` style="${o.style}"` : ''}>${Object.keys(fills).filter((k) => arr.paths[k]).map((k) => `<path d="${arr.paths[k]}" fill="${fills[k]}" stroke="${fills[k]}" stroke-width="1.6" stroke-linejoin="round"></path>`).join('')}</svg>`;
// Deterministic pseudo-random 0..1 from two integers.
const noise = (a, b) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };

const cap = (text, color, extra = '') => `<div style="${MONO}; font-size: 12px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: ${color}${extra ? '; ' + extra : ''}">${text}</div>`;

// Status glyphs: each state has its own shape, so color is never the only signal.
const statusIcon = (kind, size = 14) => {
  const c = STATUS[kind];
  const shape = {
    online: `<circle cx="8" cy="8" r="6" fill="${c}"></circle>`,
    degraded: `<path d="M8 1.5L15 14H1Z" fill="${c}"></path>`,
    fault: `<path d="M8 1L15 8L8 15L1 8Z" fill="${c}"></path>`,
    offline: `<circle cx="8" cy="8" r="5" fill="none" stroke="${c}" stroke-width="2"></circle>`
  }[kind];
  return `<svg width="${size}" height="${size}" viewBox="0 0 16 16" aria-hidden="true" style="flex: none">${shape}</svg>`;
};

// One page of the kit: 1600 x 1000, header with section chip, footer with page number.
const TOTAL = '07';
const page = ({ num, label, dark, body, foot }) => {
  const fg = dark ? WHITE : INK, sub = dark ? TEXT3_DARK : SLATE, bg = dark ? INK : PAPER;
  return `<div style="position: relative; overflow: hidden; width: 1600px; height: 1000px; box-sizing: border-box; padding: 52px 64px 44px; display: flex; flex-direction: column; gap: 32px; background: ${bg}; ${UI}; color: ${fg}">
<div style="height: 40px; flex: none; display: flex; align-items: center; justify-content: space-between">
<div style="display: flex; align-items: center; gap: 16px">
<div style="width: 46px; height: 28px; border-radius: 6px; background: ${A}; transform: skewX(-19deg); display: flex; align-items: center; justify-content: center"><div style="transform: skewX(19deg); ${MONO}; font-size: 13px; font-weight: 500; color: ${INK}">${num}</div></div>
<div style="${SX}; font-size: 15px; letter-spacing: 0.12em; text-transform: uppercase">${label}</div>
</div>
${lockup(24, A, fg)}
</div>
${body}
<div style="height: 16px; flex: none; display: flex; align-items: center; justify-content: space-between; ${MONO}; font-size: 11px; letter-spacing: 0.04em; color: ${sub}"><span>${foot || 'Megasolar brand kit v2'}</span><span>${num} / ${TOTAL}</span></div>
</div>`;
};

const doc = ({ title, w, h, body, props = {}, logic }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="${FONTS}">
<style>
body{margin:0}
a{color:inherit;text-decoration:none}a:hover{color:inherit}
</style>
</helmet>
${body}
</x-dc>
<script type="text/x-dc" data-dc-script data-props='${JSON.stringify(Object.assign({ accent: { editor: 'color', default: SOLAR, options: [SOLAR, '#EDBD1E', '#3BE083', '#C4F24A'] } }, props, { $preview: { width: w, height: h } }))}'>
${logic || `class Component extends DCLogic {
  renderVals() {
    return { accent: this.props.accent ?? '${SOLAR}' };
  }
}`}
</script>
</body>
</html>
`;

module.exports = {
  mk, sm, w42, INK, GRAPHITE, PAPER, MIST, WHITE, SLATE, SOLAR, LINE, LINE_DARK, SURFACE_DARK, TEXT2_DARK, TEXT3_DARK, TEXT2, A, UI, SX, MONO, TAN, f,
  SOLAR_SCALE, S, NEUTRAL_SCALE, STATUS, SERIES, HEAT, contrast, hexRgb, CAP, R, LOCK_RATIO,
  lockup, lockupSwapped, stackedLockup, symbol, wordmark, markPaths, arrayPaths, humpKey, arraySvg, noise, cap, statusIcon, page, doc
};
