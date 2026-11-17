// 02 Logo: the suite. Primary and reversed logos, symbol, stacked logo, icons, clear space and minimum size.
const L = require('./lib.js');
const { A, INK, WHITE, PAPER, SLATE, LINE, TEXT2, TEXT3_DARK, TEXT2_DARK, MONO } = L;

const tag = (text, color) => `<div style="position: absolute; top: 18px; left: 20px">${L.cap(text, color)}</div>`;
const note = (text, color) => `<div style="position: absolute; bottom: 18px; left: 20px; right: 20px; font-size: 13px; line-height: 18px; color: ${color}">${text}</div>`;
const tile = (bg, border, inner, extra = '') => `<div style="position: relative; box-sizing: border-box; border-radius: 20px; background: ${bg}; border: 1px solid ${border}; display: flex; align-items: center; justify-content: center; ${extra}">${inner}</div>`;

// Clear space: one symbol height (x) on every side.
const CS = 17; // cap height of the logo in the diagram
const xMark = `<div style="${MONO}; font-size: 11px; color: ${SLATE}">x</div>`;
const clear = `<div style="display: flex; flex-direction: column; align-items: center; gap: 4px">
${xMark}
<div style="display: flex; align-items: center; gap: 6px">
${xMark}
<div style="border: 1px dashed #8B949E; padding: ${CS}px; background: #EEF0EB"><div style="display: flex; background: ${WHITE}">${L.lockup(CS, A, INK, { pulse: INK })}</div></div>
${xMark}
</div>
${xMark}
</div>`;
const fav = (size, radius, sym) => `<div style="display: flex; flex-direction: column; align-items: center; gap: 8px"><div style="width: ${size}px; height: ${size}px; border-radius: ${radius}px; background: ${INK}; display: flex; align-items: center; justify-content: center">${sym}</div><div style="${MONO}; font-size: 11px; color: ${SLATE}">${size}</div></div>`;

module.exports = () => L.doc({
  title: 'Megasolar · Logo', w: 1600, h: 1000,
  body: L.page({
    num: '02', label: 'Logo',
    body: `<div style="flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 16px">
<div style="flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px">
${tile(WHITE, LINE, tag('Primary logo', SLATE) + L.lockup(44, A, INK, { pulse: INK }) + note('Solar Yellow panels, with the pulse and wordmark in Ink.', SLATE))}
${tile(INK, INK, tag('Reversed', TEXT3_DARK) + L.lockup(44, A, WHITE) + note('Solar Yellow symbol, white wordmark. Use on Ink and dark photos.', TEXT2_DARK))}
</div>
<div style="flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px">
${tile(WHITE, LINE, tag('Symbol', SLATE) + L.symbol(112, A, { pulse: INK }) + note('Two leaning panels and a pulse that draws an M.', SLATE))}
${tile(WHITE, LINE, tag('Stacked', SLATE) + L.stackedLockup(236, A, INK, { pulse: INK }) + note('For square and narrow spaces.', SLATE))}
${tile(PAPER, LINE, tag('App icon · avatar · favicon', SLATE) + `<div style="display: flex; flex-direction: column; align-items: center; gap: 22px; padding-top: 8px">
<div style="display: flex; align-items: center; gap: 18px">
<div style="width: 104px; height: 104px; border-radius: 24px; background: ${INK}; display: flex; align-items: center; justify-content: center">${L.symbol(46, A)}</div>
<div style="width: 80px; height: 80px; border-radius: 50%; background: ${A}; display: flex; align-items: center; justify-content: center">${L.symbol(32, INK)}</div>
</div>
<div style="display: flex; align-items: flex-end; gap: 20px">
${fav(48, 11, L.symbol(21, A, { small: true }))}
${fav(32, 8, L.symbol(14, A, { small: true }))}
${fav(16, 4, L.symbol(7, A, { small: true }))}
</div>
</div>`)}
${tile(WHITE, LINE, tag('Clear space · minimum size', SLATE) + `<div style="display: flex; flex-direction: column; align-items: center; gap: 30px; padding-top: 14px">
${clear}
<div style="display: flex; align-items: flex-end; gap: 28px">
<div style="display: flex; flex-direction: column; gap: 8px">${L.lockup(10, A, INK, { pulse: INK })}<div style="font-size: 12px; color: ${TEXT2}">Logo: letters 10 px tall</div></div>
<div style="display: flex; flex-direction: column; gap: 8px">${L.symbol(16, INK, { small: true })}<div style="font-size: 12px; color: ${TEXT2}">Symbol: 16 px</div></div>
</div>
</div>`)}
</div>
</div>`
  })
});
