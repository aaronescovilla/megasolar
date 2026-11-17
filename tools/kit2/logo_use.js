// 03 Logo use: approved colorways and what not to do.
const L = require('./lib.js');
const { A, INK, WHITE, SLATE, LINE, TEXT2, MONO } = L;

const way = (bg, border, logo, name, use) => `<div style="display: flex; flex-direction: column; gap: 12px">
<div style="height: 280px; box-sizing: border-box; border-radius: 16px; background: ${bg}; border: 1px solid ${border}; display: flex; align-items: center; justify-content: center">${logo}</div>
<div style="display: flex; flex-direction: column; gap: 2px">
<div style="font-size: 15px; font-weight: 600">${name}</div>
<div style="font-size: 13px; line-height: 18px; color: ${SLATE}">${use}</div>
</div>
</div>`;

const NO = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#B42318" stroke-width="2" stroke-linecap="round" aria-hidden="true" style="position: absolute; top: 12px; right: 12px"><circle cx="10" cy="10" r="8"></circle><path d="M4.5 15.5L15.5 4.5"></path></svg>`;
const dont = (content, text, bg = WHITE) => `<div style="display: flex; flex-direction: column; gap: 10px">
<div style="position: relative; height: 200px; box-sizing: border-box; border-radius: 14px; background: ${bg}; border: 1px solid ${LINE}; display: flex; align-items: center; justify-content: center; overflow: hidden">${NO}${content}</div>
<div style="font-size: 13px; line-height: 18px; color: ${TEXT2}">${text}</div>
</div>`;
const rule = (lead, text) => `<div style="display: flex; flex-direction: column; gap: 4px"><div style="${MONO}; font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: ${SLATE}">${lead}</div><div style="font-size: 14px; line-height: 20px; color: ${TEXT2}">${text}</div></div>`;

const M = 13; // cap height in the small examples

module.exports = () => L.doc({
  title: 'Megasolar · Logo use', w: 1600, h: 1000,
  body: L.page({
    num: '03', label: 'Logo use',
    body: `<div style="flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 14px">
${L.cap('Colorways', SLATE)}
<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px">
${way(WHITE, LINE, L.lockup(25, A, INK, { pulse: INK }), 'Primary', 'On white and Paper. The pulse is drawn in Ink so the M stays visible.')}
${way(INK, INK, L.lockup(25, A, WHITE), 'Reversed', 'On Ink and dark photos. The home of the brand.')}
${way(A, A, L.lockup(25, INK, INK), 'One color, Ink', 'On Solar Yellow, and for one-color print.')}
${way('#3A424B', '#3A424B', L.lockup(25, WHITE, WHITE), 'One color, white', 'On mid-tone color and busy photos.')}
</div>
${L.cap('Don’t', SLATE, 'margin-top: 18px')}
<div style="display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 16px">
${dont(L.lockup(M, A, INK, { w: M * L.LOCK_RATIO, h: 38, stretch: true, decor: true, pulse: INK }), 'Don’t stretch or squeeze it.')}
${dont(L.lockup(M, '#2A78D6', '#7A3FB5', { decor: true, pulse: '#7A3FB5' }), 'Don’t change the colors.')}
${dont(L.lockup(M, A, INK, { decor: true, pulse: INK, style: 'transform: rotate(-12deg)' }), 'Don’t rotate it.')}
${dont(L.lockup(M, null, null, { decor: true, outline: INK, sw: 56 }), 'Don’t outline it.')}
${dont(L.lockup(M, WHITE, WHITE, { decor: true }), 'Don’t put white on Solar Yellow.', A)}
${dont(L.lockupSwapped(M, A, INK, INK), 'Don’t rearrange the parts.')}
</div>
<div style="margin-top: auto; padding-top: 18px; border-top: 1px solid ${LINE}; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px">
${rule('Clear space', 'Keep one symbol height clear on every side.')}
${rule('Minimum size', 'Logo: letters at least 10 px tall. Symbol on its own: 16 px.')}
${rule('Small sizes', 'At 24 px and below, use the small-size symbol with the heavier pulse.')}
</div>
</div>`
  })
});
