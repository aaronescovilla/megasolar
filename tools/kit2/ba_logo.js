// Before and after: the logo side by side at the same width.
const L = require('./lib.js');
const { A, INK, WHITE, SLATE, LINE, MONO, TEXT2 } = L;

const sizes = (make) => [48, 32, 24, 16].map((h) => `<div style="display: flex; flex-direction: column; align-items: center; gap: 8px">${make(h)}<div style="${MONO}; font-size: 11px; color: ${SLATE}">${h}</div></div>`).join('');
const column = (name, onWhite, onInk, bigSymbol, small, whiteSample, mark) => `<div style="display: flex; flex-direction: column; gap: 16px; min-width: 0">
<div style="height: 16px; display: flex; align-items: center; gap: 10px">${mark}${L.cap(name, INK)}</div>
<div style="height: 220px; box-sizing: border-box; border-radius: 20px; background: ${WHITE}; border: 1px solid ${LINE}; display: flex; align-items: center; justify-content: center">${onWhite}</div>
<div style="height: 220px; border-radius: 20px; background: ${INK}; display: flex; align-items: center; justify-content: center">${onInk}</div>
<div style="height: 264px; display: grid; grid-template-columns: 250px minmax(0, 1fr); gap: 16px">
<div style="border-radius: 20px; background: ${INK}; display: flex; align-items: center; justify-content: center">${bigSymbol}</div>
<div style="box-sizing: border-box; border-radius: 20px; background: ${WHITE}; border: 1px solid ${LINE}; padding: 28px 28px 22px; display: flex; flex-direction: column; justify-content: space-between">
<div style="display: flex; align-items: flex-end; justify-content: space-between">
<div style="display: flex; align-items: flex-end; gap: 22px">${small}</div>
${whiteSample}
</div>
<div style="font-size: 13px; line-height: 18px; color: ${TEXT2}">Small sizes in one color, and the symbol in color on white.</div>
</div>
</div>
</div>`;
const dot = (bg) => `<div style="width: 18px; height: 11px; border-radius: 3px; background: ${bg}; transform: skewX(-18.4deg)"></div>`;

module.exports = () => L.doc({
  title: 'Megasolar · Logo before and after', w: 1600, h: 1000,
  body: L.sheet({
    label: 'Logo · before and after',
    body: `<div style="flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px">
${column('Before',
    L.oldLockup(52, A, INK), L.oldLockup(52, A, WHITE), L.oldSymbol(124, A),
    sizes((h) => L.oldSymbol(h, INK)), L.oldSymbol(60, A), dot('#C9CED4'))}
${column('After',
    L.lockup(40, A, INK, { pulse: INK }), L.lockup(40, A, WHITE), L.symbol(124, A),
    sizes((h) => L.symbol(h, INK, { small: h <= 24 })), L.symbol(60, A, { pulse: INK }), dot(A))}
</div>`
  })
});
