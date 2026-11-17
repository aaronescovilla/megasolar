// Before and after: the six changes made to the logo, each shown at detail size.
const L = require('./lib.js');
const { A, INK, WHITE, PAPER, SLATE, LINE, MONO, SX, TEXT2, S, f } = L;

const mini = (text) => `<div style="${MONO}; font-size: 10px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: ${SLATE}">${text}</div>`;
const box = (inner, bg = PAPER, extra = '') => `<div style="position: relative; overflow: hidden; flex: 1; min-height: 0; box-sizing: border-box; border-radius: 12px; background: ${bg}; border: 1px solid ${bg === WHITE ? LINE : bg}; display: flex; align-items: center; justify-content: center; ${extra}">${inner}</div>`;
const pair = (before, after, bg) => `<div style="flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px">
<div style="display: flex; flex-direction: column; gap: 6px; min-height: 0">${mini('Before')}${box(before, bg)}</div>
<div style="display: flex; flex-direction: column; gap: 6px; min-height: 0">${mini('After')}${box(after, bg)}</div>
</div>`;
const rows = (before, after, bg) => `<div style="flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 10px">
<div style="flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 6px">${mini('Before')}${box(before, bg)}</div>
<div style="flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 6px">${mini('After')}${box(after, bg)}</div>
</div>`;
const card = (n, title, text, visual) => `<div style="box-sizing: border-box; border-radius: 20px; background: ${WHITE}; border: 1px solid ${LINE}; padding: 24px; display: flex; flex-direction: column; gap: 14px; min-height: 0">
<div style="display: flex; flex-direction: column; gap: 8px">
<div style="display: flex; align-items: center; gap: 12px">
<div style="width: 34px; height: 22px; border-radius: 5px; background: ${A}; transform: skewX(-18.4deg); display: flex; align-items: center; justify-content: center"><div style="transform: skewX(18.4deg); ${MONO}; font-size: 12px; font-weight: 500">${n}</div></div>
<div style="${SX}; font-size: 19px; line-height: 26px">${title}</div>
</div>
<div style="height: 42px; font-size: 14px; line-height: 21px; color: ${TEXT2}">${text}</div>
</div>
${visual}
</div>`;
const at = (svg, left, top) => svg.replace('<svg ', `<svg style="position: absolute; left: ${left}px; top: ${top}px" `);

// One module: the symbol on its ten-row grid.
const GH = 150, GW = GH * L.SYM_RATIO, m = GH / 10;
const grid = `<svg width="${f(GW + 120)}" height="${GH + 2}" viewBox="-60 -1 ${f(GW + 120)} ${GH + 2}" role="img" aria-label="The symbol on a grid of ten equal rows">
${Array.from({ length: 11 }, (_, i) => `<path d="M-60 ${f(i * m)}H${f(GW + 60)}" fill="none" stroke="#C9CED4" stroke-width="1"></path>`).join('')}
<g transform="scale(${(GH / L.sym2.master.h).toFixed(4)})"><path d="${L.sym2.master.d}" fill="${INK}"></path></g>
<path d="M${f(GW + 22)} ${f(9 * m)}V${f(10 * m)}" fill="none" stroke="${S[600]}" stroke-width="3"></path>
<text x="${f(GW + 30)}" y="${f(9.5 * m + 4)}" fill="${INK}" style="${MONO}; font-size: 11px">1</text>
<path d="M-22 0V${GH}" fill="none" stroke="${S[600]}" stroke-width="3"></path>
<text x="-48" y="${f(GH / 2 + 4)}" fill="${INK}" style="${MONO}; font-size: 11px">10</text>
</svg>`;

// Lockup with cap line and baseline guides.
const guide = (y) => `<div style="position: absolute; left: 0; right: 0; top: ${f(y)}px; height: 1px; background: ${S[600]}"></div>`;
const OW = 41.5, oldCap = (0 - L.OLD_TOP) / L.OLD_MH * OW, oldBase = (L.CAP - L.OLD_TOP) / L.OLD_MH * OW;
const NC = 32, k = NC / L.CAP;
const guided = (logo, top, base) => `<div style="position: relative; display: flex; padding: 0 16px">${guide(top)}${guide(base)}${logo}</div>`;

module.exports = () => L.doc({
  title: 'Megasolar · What changed in the logo', w: 1600, h: 1000,
  body: L.sheet({
    label: 'Logo · what changed',
    body: `<div style="flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 16px">
${card(1, 'A bolder pulse', 'The line through the panels is now one tenth of the height, up from 7%. It holds at favicon size.', pair(L.oldSymbol(96, INK), L.symbol(96, INK)))}
${card(2, 'Clean joins', 'The hooks and thin slivers where the line met the panel edges are gone. Every join is a true arc.', pair(at(L.oldSymbol(260, INK), 10, -49), at(L.symbol(260, INK), 10, -49)))}
${card(3, 'One module', 'The gap, the pulse and the corner radius are each one tenth of the height. Every edge leans 1 in 3.', `<div style="flex: 1; min-height: 0; display: flex">${box(grid)}</div>`)}
${card(4, 'Clearer on white', 'The thicker pulse reads more clearly as a white line on Solar Yellow, most of all at small sizes.', pair(L.oldSymbol(96, A), L.symbol(96, A), WHITE))}
${card(5, 'Even letter spacing', 'Each pair was re-spaced by eye. E–G, A–S and L–A open up; M–E and O–L close in.', rows(L.oldWordmark(37, INK), L.wordmark(37, INK)))}
${card(6, 'A tighter logo', 'The symbol is now exactly as tall as the letters and sits on their baseline, with one fixed gap.', rows(guided(L.oldLockup(OW, A, INK), oldCap, oldBase), guided(L.lockup(NC, A, INK), 8 * k, 696 * k), WHITE))}
</div>`
  })
});
