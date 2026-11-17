// 05 Graphic language: the angle, the array, the curve, and supergraphic crops.
const L = require('./lib.js');
const { A, INK, WHITE, PAPER, MIST, GRAPHITE, SX, MONO, TEXT2_DARK, TEXT3_DARK, LINE_DARK, SURFACE_DARK, TAN, f } = L;

const card = (title, text, art) => `<div style="height: 384px; box-sizing: border-box; border-radius: 20px; background: ${SURFACE_DARK}; border: 1px solid ${LINE_DARK}; padding: 28px; display: flex; flex-direction: column; gap: 18px">
<div style="display: flex; flex-direction: column; gap: 8px">
<div style="${SX}; font-size: 22px; line-height: 26px">${title}</div>
<div style="font-size: 14px; line-height: 21px; color: ${TEXT2_DARK}">${text}</div>
</div>
<div style="flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center">${art}</div>
</div>`;
const crop = (bg, border, sym, name, use) => `<div style="display: flex; flex-direction: column; gap: 10px">
<div style="position: relative; overflow: hidden; height: 290px; box-sizing: border-box; border-radius: 20px; background: ${bg}; border: 1px solid ${border}">${sym}</div>
<div style="font-size: 13px; line-height: 18px; color: ${TEXT2_DARK}"><span style="font-weight: 600; color: ${WHITE}">${name}</span> ${use}</div>
</div>`;
const at = (h, fill, left, top) => L.symbol(h, fill, { style: `position: absolute; left: ${left}px; top: ${top}px` });

// The angle: one panel, a plumb line, the 19° arc, and three things that lean the same way.
const para = (x, y, w, h) => `M${f(x)} ${f(y + h)}L${f(x + w)} ${f(y + h)}L${f(x + w + h * TAN)} ${f(y)}L${f(x + h * TAN)} ${f(y)}Z`;
const meter = [0, 1, 2, 3, 4].map((i) => `<path d="${para(262 + i * 26, 28, 20, 26)}" fill="${i < 3 ? A : '#2A3440'}"></path>`).join('');
const angleArt = `<svg width="400" height="220" viewBox="0 0 400 220" role="img" aria-label="A panel leaning 19 degrees from vertical">
<path d="${para(64, 24, 104, 172)}" fill="${A}" stroke="${A}" stroke-width="10" stroke-linejoin="round"></path>
<path d="M59 201V14" fill="none" stroke="${TEXT3_DARK}" stroke-width="1.5" stroke-dasharray="4 5"></path>
<path d="M59 121A80 80 0 0 1 ${f(59 + 80 * Math.sin(19 * Math.PI / 180))} ${f(201 - 80 * Math.cos(19 * Math.PI / 180))}" fill="none" stroke="${WHITE}" stroke-width="1.5"></path>
<text x="16" y="112" fill="${WHITE}" style="${MONO}; font-size: 15px; font-weight: 500">19°</text>
${meter}
<path d="${para(262, 84, 112, 34)}" fill="none" stroke="${TEXT3_DARK}" stroke-width="1.5" stroke-linejoin="round"></path>
<path d="M262 196H352L${f(352 + 50 * TAN)} 146H262Z" fill="#2A3440"></path>
</svg>`;

// The array: rows of cells used as meters.
const levels = [13, 11, 9, 12, 6, 10];
const meters = L.arrayPaths(14, 6, 20, 26, 5, (c, r) => (c < levels[r] ? 'lit' : 'dim'));

const LOGIC = `class Component extends DCLogic {
  renderVals() {
    const accent = this.props.accent ?? '#FFD12E';
    const int = (v, lo, hi, d) => { v = Math.round(Number(v)); return Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : d; };
    const cols = int(this.props.columns ?? 24, 8, 40, 24), rows = int(this.props.rows ?? 7, 3, 10, 7), days = int(this.props.days ?? 2, 1, 4, 2);
    const TAN = Math.tan(19 * Math.PI / 180), cw = 12, ch = 22, gap = 4, px = cw + gap, py = ch + gap;
    const H = rows * py - gap, W = cols * px - gap;
    const f = (n) => Math.round(n * 10) / 10;
    // One hump per day: output rises after sunrise, peaks at noon, falls to zero.
    const hump = (t) => Math.pow(Math.sin(Math.PI * ((t * days) % 1)), 1.5);
    let lit = '', dim = '';
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const yT = r * py, yB = yT + ch, xb = c * px + (H - yB) * TAN, xt = c * px + (H - yT) * TAN;
      const d = 'M' + f(xb) + ' ' + f(yB) + 'L' + f(xb + cw) + ' ' + f(yB) + 'L' + f(xt + cw) + ' ' + f(yT) + 'L' + f(xt) + ' ' + f(yT) + 'Z';
      if (rows - r <= Math.round(hump((c + 0.5) / cols) * rows)) lit += d; else dim += d;
    }
    let curve = '';
    for (let i = 0; i <= 120; i++) {
      const t = i / 120, lv = hump(t) * H;
      curve += (i ? 'L' : 'M') + f(t * W + lv * TAN) + ' ' + f(H - lv);
    }
    return { accent, arr: { vb: '-3 -8 ' + f(W + H * TAN + 6) + ' ' + f(H + 12), lit: lit || 'M0 0', dim: dim || 'M0 0', curve } };
  }
}`;

module.exports = () => L.doc({
  title: 'Megasolar · Graphic language', w: 1600, h: 1000,
  props: {
    columns: { editor: 'int', default: 24, min: 8, max: 40, step: 1, section: 'Array chart' },
    rows: { editor: 'int', default: 7, min: 3, max: 10, step: 1, section: 'Array chart' },
    days: { editor: 'int', default: 2, min: 1, max: 4, step: 1, section: 'Array chart' }
  },
  logic: LOGIC,
  body: L.page({
    num: '05', label: 'Graphic language', dark: true,
    body: `<div style="flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 28px">
<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px">
${card('The angle', 'Every slant leans 19°, the lean of the panels in the symbol. Meters, tags and photo crops all follow it.', angleArt)}
${card('The array', 'Repeat the panel on a grid to build patterns, meters and charts. Lit cells are Solar Yellow.', L.arraySvg(meters, { dim: '#222A33', lit: A }))}
${card('The curve', 'The wave in the symbol is a day of output: up after sunrise, down by dusk. Two days draw an M.', `<svg viewBox="{{arr.vb}}" role="img" aria-label="Daily output drawn with panel cells" style="width: 100%; height: 210px"><path d="{{arr.dim}}" fill="#222A33"></path><path d="{{arr.lit}}" fill="${A}"></path><path d="{{arr.curve}}" fill="none" stroke="${WHITE}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path></svg>`)}
</div>
<div style="display: flex; flex-direction: column; gap: 12px">
${L.cap('Supergraphic crops', TEXT3_DARK)}
<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px">
${crop(A, A, at(560, INK, -70, -60), 'Ink on Solar.', 'Covers, signage, launch moments.')}
${crop(GRAPHITE, GRAPHITE, at(900, A, -520, -380), 'Solar on Graphite.', 'Hero areas and section openers.')}
${crop(INK, LINE_DARK, at(420, '#161C23', -40, -30), 'Tone on tone.', 'Quiet texture behind text.')}
${crop(PAPER, PAPER, at(640, MIST, -420, -180), 'Mist on Paper.', 'Documents and light pages.')}
</div>
</div>
</div>`
  })
});
