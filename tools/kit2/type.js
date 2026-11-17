// 04 Type: the display face in use, the three families, the working scale.
const L = require('./lib.js');
const { A, INK, WHITE, SLATE, LINE, TEXT2, MONO, SX, TEXT2_DARK } = L;
const GEIST = "font-family: 'Geist', ui-sans-serif, system-ui, sans-serif";

const family = (name, role, sample) => `<div style="display: grid; grid-template-columns: 150px minmax(0, 1fr); align-items: center; gap: 20px; padding: 22px 0; border-top: 1px solid ${LINE}">
<div style="display: flex; flex-direction: column; gap: 4px">
<div style="font-size: 15px; font-weight: 600">${name}</div>
<div style="font-size: 13px; line-height: 18px; color: ${SLATE}">${role}</div>
</div>
${sample}
</div>`;
const row = (name, sample, spec) => `<div style="display: grid; grid-template-columns: 108px minmax(0, 1fr) 236px; align-items: center; gap: 24px; padding: 14px 0; border-top: 1px solid ${LINE}">
<div style="font-size: 13px; font-weight: 600">${name}</div>
${sample}
<div style="${MONO}; font-size: 12px; line-height: 17px; color: ${SLATE}">${spec}</div>
</div>`;
const rule = (lead, text) => `<div style="display: flex; flex-direction: column; gap: 6px">
<div style="font-size: 15px; font-weight: 600">${lead}</div>
<div style="font-size: 14px; line-height: 21px; color: ${TEXT2}">${text}</div>
</div>`;

module.exports = () => L.doc({
  title: 'Megasolar · Type', w: 1600, h: 1000,
  body: L.page({
    num: '05', label: 'Type',
    body: `<div style="flex: 1; min-height: 0; display: flex; gap: 64px">
<div style="width: 560px; flex: none; display: flex; flex-direction: column; gap: 24px">
<div style="height: 460px; box-sizing: border-box; border-radius: 20px; background: ${INK}; padding: 36px; display: flex; flex-direction: column; justify-content: space-between; color: ${WHITE}">
<div style="${SX}; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: ${A}">Display · Saira Expanded</div>
<div style="${SX}; font-size: 64px; line-height: 68px; letter-spacing: -0.02em">Solar,<br>run like<br>software.</div>
<div style="${MONO}; font-size: 12px; color: ${TEXT2_DARK}">SemiBold 600 · width 125% · tracking −2%</div>
</div>
<div style="display: flex; flex-direction: column; border-bottom: 1px solid ${LINE}">
${family('Saira Expanded', 'Display, headlines, caps labels', `<div style="${SX}; font-size: 30px; line-height: 36px">Megawatt 0123</div>`)}
${family('Geist', 'Interface and body text', `<div style="${GEIST}; font-size: 30px; font-weight: 500; line-height: 36px; letter-spacing: -0.02em">Megawatt 0123</div>`)}
${family('Geist Mono', 'Readings, units, IDs', `<div style="${MONO}; font-size: 28px; font-weight: 500; line-height: 36px">Megawatt 0123</div>`)}
</div>
</div>
<div style="flex: 1; min-width: 0; display: flex; flex-direction: column">
${L.cap('Scale', SLATE, 'padding-bottom: 12px')}
${row('Display XL', `<div style="${SX}; font-size: 56px; line-height: 60px; letter-spacing: -0.02em">Megawatts</div>`, 'Saira 600 · 56/60 · −2%')}
${row('Display', `<div style="${SX}; font-size: 38px; line-height: 44px; letter-spacing: -0.02em">Fleet overview</div>`, 'Saira 600 · 38/44 · −2%')}
${row('Heading', `<div style="${SX}; font-size: 24px; line-height: 30px; letter-spacing: -0.01em">Panel-level monitoring</div>`, 'Saira 600 · 24/30 · −1%')}
${row('Eyebrow', `<div style="${SX}; font-size: 12px; line-height: 16px; letter-spacing: 0.12em; text-transform: uppercase">Commercial solar</div>`, 'Saira 600 caps · 12/16 · +12%')}
${row('Title', `<div style="font-size: 18px; font-weight: 600; line-height: 24px; letter-spacing: -0.01em">Inverter 4 needs attention</div>`, 'Geist 600 · 18/24 · −1%')}
${row('Body', `<div style="font-size: 16px; line-height: 25px; color: ${TEXT2}">Say what happened, then what to do about it.</div>`, 'Geist 400 · 16/25 · 0')}
${row('Caption', `<div style="font-size: 13px; line-height: 18px; color: ${SLATE}">Updated 2 minutes ago</div>`, 'Geist 400 · 13/18 · 0')}
${row('Data XL', `<div style="${MONO}; font-size: 36px; font-weight: 500; line-height: 40px">1,284.6 <span style="font-size: 18px; color: ${SLATE}">kWh</span></div>`, 'Geist Mono 500 · 36/40 · unit at half size')}
${row('Data', `<div style="${MONO}; font-size: 14px; line-height: 20px">INV-04 · 48.2 kW · 97.1%</div>`, 'Geist Mono 400 · 14/20 · tabular')}
<div style="margin-top: auto; padding-top: 22px; border-top: 1px solid ${INK}; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px">
${rule('Caps are for labels', 'Set eyebrows and tags in Saira caps, tracked 12%. Never set a sentence in caps.')}
${rule('Numbers go in Mono', 'Readings, units and IDs use Geist Mono, so columns of figures line up.')}
${rule('Tight when big', 'Display sizes track −2%. Body text stays at 0. Caps labels open up to +12%.')}
</div>
</div>
</div>`
  })
});
