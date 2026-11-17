// 01 Overview: the kit on one sheet.
const L = require('./lib.js');
const { A, INK, WHITE, PAPER, SX, MONO, UI, TEXT2_DARK, TEXT3_DARK, LINE_DARK, SURFACE_DARK } = L;

const cell = (label, content, note) => `<div style="height: 190px; box-sizing: border-box; border-radius: 14px; border: 1px solid ${LINE_DARK}; background: ${SURFACE_DARK}; padding: 16px; display: flex; flex-direction: column; justify-content: space-between">
${L.cap(label, TEXT3_DARK)}
<div style="height: 84px; display: flex; align-items: center">${content}</div>
<div style="font-size: 12px; line-height: 16px; color: ${TEXT2_DARK}">${note}</div>
</div>`;
const mini = (bg, border) => `<div style="width: 30px; height: 72px; box-sizing: border-box; border-radius: 6px; background: ${bg}; border: 1px solid ${border}; transform: skewX(-19deg)"></div>`;

module.exports = () => L.doc({
  title: 'Megasolar · Brand kit overview', w: 1600, h: 1000,
  body: `<div style="position: relative; overflow: hidden; width: 1600px; height: 1000px; box-sizing: border-box; padding: 52px 64px 44px; display: flex; flex-direction: column; background: ${INK}; ${UI}; color: ${WHITE}">
${L.symbol(940, A, { style: 'position: absolute; left: 880px; top: 130px' })}
<div style="position: relative; height: 40px; flex: none; display: flex; align-items: center; justify-content: space-between">
${L.lockup(30, A, WHITE)}
${L.cap('Brand kit · v2', TEXT3_DARK)}
</div>
<div style="position: relative; margin-top: 72px; width: 760px; display: flex; flex-direction: column; gap: 22px">
<div style="${SX}; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: ${A}">The short version</div>
<div style="${SX}; font-size: 88px; line-height: 92px; letter-spacing: -0.02em">One shape.<br>One curve.<br>One color.</div>
<div style="max-width: 560px; font-size: 19px; line-height: 30px; color: ${TEXT2_DARK}">The identity is built from the slanted panel, the daily output curve and Solar Yellow on Ink. Everything in this kit comes from those three.</div>
</div>
<div style="position: relative; margin-top: auto; width: 760px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px">
${cell('Symbol', L.symbol(72, A), 'Two panels, one wave')}
${cell('Color', `<div style="display: flex; gap: 8px; padding-left: 14px">${mini(INK, '#3A424B')}${mini(A, A)}${mini(PAPER, PAPER)}</div>`, 'Ink, Solar Yellow, Paper')}
${cell('Type', `<div style="${SX}; font-size: 60px; line-height: 1">Aa</div>`, 'Saira Expanded, Geist')}
${cell('Angle', `<div style="${MONO}; font-size: 44px; font-weight: 500; line-height: 1">19°</div>`, 'One angle for every slant')}
</div>
<div style="position: relative; margin-top: 32px; height: 16px; flex: none; display: flex; align-items: center; ${MONO}; font-size: 11px; letter-spacing: 0.04em; color: ${TEXT3_DARK}">01 / 07 · Megasolar brand kit v2</div>
</div>`
});
