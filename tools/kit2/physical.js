// 07 Print and social: slides, business cards, report cover, site nameplate, social post.
const L = require('./lib.js');
const { A, INK, WHITE, PAPER, MIST, SLATE, SX, MONO, TEXT2, TEXT2_DARK } = L;
const SHADOW = 'box-shadow: 0 12px 28px rgba(12, 16, 20, 0.16)';
const at = (h, fill, left, top) => L.symbol(h, fill, { style: `position: absolute; left: ${left}px; top: ${top}px` });

// Content slide chart: output by month, in panel cells.
const months = [3, 3, 4, 5, 6, 6, 6, 5, 5, 4, 3, 3];
const byMonth = L.arrayPaths(12, 6, 24, 16, 4, (c, r) => (6 - r <= months[c] ? 'lit' : 'dim'));
// Report cover: one day of output.
const day = L.arrayPaths(10, 5, 16, 20, 4, L.humpKey(10, 5, 1));

const screw = (pos) => `<div style="position: absolute; ${pos}; width: 7px; height: 7px; border-radius: 50%; background: rgba(12, 16, 20, 0.4)"></div>`;
const plateRow = (k, v) => `<span style="color: ${TEXT2}">${k}</span><span>${v}</span>`;

module.exports = () => L.doc({
  title: 'Megasolar · Print and social applications', w: 1600, h: 1000,
  body: L.page({
    num: '07', label: 'Print + social',
    body: `<div style="flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 16px">

<div style="grid-column: 1 / 3; border-radius: 20px; background: ${MIST}; display: flex; align-items: center; justify-content: center; gap: 16px">
<div style="position: relative; overflow: hidden; width: 464px; height: 261px; box-sizing: border-box; border-radius: 8px; background: ${INK}; padding: 24px 26px; display: flex; flex-direction: column; justify-content: space-between; color: ${WHITE}; ${SHADOW}">
${at(420, A, 250, 40)}
<div style="position: relative">${L.lockup(16, A, WHITE)}</div>
<div style="position: relative; display: flex; flex-direction: column; gap: 10px">
<div style="${SX}; font-size: 26px; line-height: 30px; letter-spacing: -0.01em">Portfolio<br>review</div>
<div style="${MONO}; font-size: 11px; color: ${TEXT2_DARK}">[Client name] · [Quarter]</div>
</div>
</div>
<div style="width: 464px; height: 261px; box-sizing: border-box; border-radius: 8px; background: ${WHITE}; padding: 22px 26px; display: flex; flex-direction: column; color: ${INK}; ${SHADOW}">
<div style="${SX}; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: ${SLATE}">Generation</div>
<div style="${SX}; font-size: 18px; line-height: 24px; margin-top: 4px">Output by month</div>
<div style="flex: 1; min-height: 0; display: flex; align-items: center">${L.arraySvg(byMonth, { dim: MIST, lit: A })}</div>
<div style="display: flex; align-items: center; justify-content: space-between">${L.symbol(11, A, { small: true })}<span style="${MONO}; font-size: 10px; color: ${SLATE}">02</span></div>
</div>
</div>

<div style="position: relative; overflow: hidden; border-radius: 20px; background: ${MIST}">
<div style="position: absolute; left: 40px; top: 44px; width: 300px; height: 172px; box-sizing: border-box; border-radius: 10px; background: ${WHITE}; padding: 22px 24px; display: flex; flex-direction: column; justify-content: space-between; color: ${INK}; ${SHADOW}">
${L.symbol(20, A)}
<div style="display: flex; flex-direction: column; gap: 2px">
<div style="font-size: 16px; font-weight: 600">[Full name]</div>
<div style="font-size: 13px; color: ${SLATE}">[Role]</div>
<div style="${MONO}; font-size: 11px; color: ${TEXT2}; margin-top: 10px">[email] · [phone]</div>
</div>
</div>
<div style="position: absolute; left: 140px; top: 168px; width: 300px; height: 172px; overflow: hidden; border-radius: 10px; background: ${INK}; display: flex; align-items: center; justify-content: center; ${SHADOW}">
${at(300, '#161C23', 96, -40)}
<div style="position: relative; display: flex">${L.lockup(20, A, WHITE)}</div>
</div>
</div>

<div style="border-radius: 20px; background: ${MIST}; display: flex; align-items: center; justify-content: center">
<div style="position: relative; overflow: hidden; width: 238px; height: 336px; box-sizing: border-box; background: ${WHITE}; padding: 22px 20px; display: flex; flex-direction: column; gap: 44px; color: ${INK}; ${SHADOW}">
${L.lockup(13, A, INK)}
<div style="display: flex; flex-direction: column; gap: 12px">
<div style="${SX}; font-size: 22px; line-height: 26px; letter-spacing: -0.01em">Monthly<br>performance<br>report</div>
<div style="${MONO}; font-size: 10px; color: ${SLATE}">[Client name] · [Month Year]</div>
</div>
${L.arraySvg(day, { dim: MIST, lit: A }, { w: 198, style: 'position: absolute; left: 20px; bottom: 22px' })}
</div>
</div>

<div style="border-radius: 20px; background: #3A424B; display: flex; align-items: center; justify-content: center">
<div style="position: relative; width: 320px; box-sizing: border-box; border-radius: 10px; background: ${A}; padding: 30px 28px 24px; color: ${INK}; box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35)">
${screw('left: 9px; top: 9px')}${screw('right: 9px; top: 9px')}${screw('left: 9px; bottom: 9px')}${screw('right: 9px; bottom: 9px')}
${L.lockup(27, INK, INK)}
<div style="margin: 18px 0 14px; height: 2px; background: ${INK}"></div>
<div style="display: grid; grid-template-columns: auto minmax(0, 1fr); column-gap: 18px; row-gap: 5px; ${MONO}; font-size: 11px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase">
${plateRow('Site ID', '[Site ID]')}
${plateRow('Capacity', '[kWp]')}
${plateRow('Commissioned', '[Date]')}
</div>
</div>
</div>

<div style="border-radius: 20px; background: ${MIST}; display: flex; align-items: center; justify-content: center">
<div style="position: relative; overflow: hidden; width: 320px; height: 320px; box-sizing: border-box; background: ${A}; padding: 26px; display: flex; flex-direction: column; justify-content: space-between; color: ${INK}; ${SHADOW}">
${at(380, INK, 118, 150)}
<div style="position: relative; ${SX}; font-size: 30px; line-height: 34px; letter-spacing: -0.02em">[Site name]<br>is live.</div>
<div style="position: relative; display: flex">${L.lockup(14, INK, INK)}</div>
</div>
</div>

</div>`
  })
});
