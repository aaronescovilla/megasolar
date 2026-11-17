// 06 Digital: website, product dashboard, phone app.
const L = require('./lib.js');
const { A, INK, WHITE, PAPER, MIST, SLATE, LINE, GRAPHITE, SX, MONO, TEXT2, TEXT2_DARK, TEXT3_DARK, LINE_DARK, HEAT, f } = L;

// Website hero backdrop: two days of output in panel cells.
const hero = L.arrayPaths(18, 8, 20, 26, 5, L.humpKey(18, 8, 2));

// Dashboard chart: one day of generation.
const pts = [];
for (let i = 0; i <= 48; i++) { const t = i / 48; pts.push([60 + 380 * t, 140 - 118 * Math.pow(Math.sin(Math.PI * t), 1.4)]); }
const top = pts.map((p, i) => (i ? 'L' : 'M') + f(p[0]) + ' ' + f(p[1])).join('');
const chart = `<svg viewBox="0 0 500 150" preserveAspectRatio="none" role="img" aria-label="Generation rises from sunrise to a midday peak and falls to zero by dusk" style="width: 100%; height: 150px; display: block">
<path d="M0 30H500M0 67H500M0 104H500" fill="none" stroke="${MIST}" stroke-width="1" vector-effect="non-scaling-stroke"></path>
<path d="${top}L440 140L60 140Z" fill="${A}"></path>
<path d="M0 140H500" fill="none" stroke="#A9B1BA" stroke-width="1" vector-effect="non-scaling-stroke"></path>
<path d="${top}" fill="none" stroke="${INK}" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"></path>
</svg>`;

// Phone panel map: output per panel, with one weak string.
const map = L.arrayPaths(11, 6, 15, 20, 3, (c, r) => {
  const weak = r === 3 && c >= 5 && c <= 8;
  return 'h' + (weak ? 1 : 3 + Math.floor(L.noise(c + 3, r + 7) * 2.99));
});
const heatFills = Object.fromEntries(HEAT.map((hex, i) => ['h' + i, hex]));

const navLink = (t) => `<a href="#" style="height: 44px; display: inline-flex; align-items: center">${t}</a>`;
const side = (t, active) => `<a href="#" style="height: 44px; box-sizing: border-box; padding: 0 10px; border-radius: 8px; display: flex; align-items: center; gap: 10px; font-size: 14px; ${active ? `background: ${WHITE}; border: 1px solid ${MIST}; font-weight: 600; color: ${INK}` : `border: 1px solid transparent; color: ${TEXT2}`}"><span style="width: 7px; height: 14px; border-radius: 2px; background: ${active ? A : 'transparent'}; transform: skewX(-18.4deg)"></span>${t}</a>`;
const kpi = (label, value, unit) => `<div style="border-radius: 12px; background: ${PAPER}; padding: 12px 14px; display: flex; flex-direction: column; gap: 4px">
<div style="font-size: 12px; color: ${SLATE}">${label}</div>
<div style="${MONO}; font-size: 22px; font-weight: 500; line-height: 28px">${value} <span style="font-size: 12px; color: ${SLATE}">${unit}</span></div>
</div>`;
const site = (name, kind, label) => `<div style="height: 37px; box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid ${MIST}; font-size: 13px">
<span>${name}</span>
<span style="display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: ${TEXT2}">${L.statusIcon(kind, 12)}${label}</span>
</div>`;
const alert = (kind, text, time) => `<a href="#" style="height: 52px; box-sizing: border-box; display: flex; align-items: center; gap: 10px; border-top: 1px solid ${LINE_DARK}; font-size: 13px; color: ${WHITE}">${L.statusIcon(kind, 12)}<span style="flex: 1; min-width: 0">${text}</span><span style="${MONO}; font-size: 11px; color: ${TEXT3_DARK}">${time}</span></a>`;
const tab = (label, d, active) => `<a href="#" style="flex: 1; height: 60px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; font-size: 11px; color: ${active ? WHITE : TEXT3_DARK}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${active ? A : TEXT3_DARK}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"></path></svg>${label}</a>`;

module.exports = () => L.doc({
  title: 'Megasolar · Digital applications', w: 1600, h: 1000,
  body: L.page({
    num: '07', label: 'Digital', foot: 'Megasolar brand guidelines · Product screens show sample data',
    body: `<div style="flex: 1; min-height: 0; display: flex; gap: 16px">
<div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 16px">

<div style="position: relative; overflow: hidden; height: 384px; flex: none; border-radius: 20px; background: ${INK}; color: ${WHITE}; display: flex; flex-direction: column">
${L.arraySvg(hero, { dim: '#161C23', lit: A }, { style: 'position: absolute; right: -40px; bottom: 24px' })}
<div style="position: relative; height: 64px; flex: none; padding: 0 32px; display: flex; align-items: center; gap: 36px">
${L.lockup(17, A, WHITE)}
<nav style="display: flex; gap: 24px; font-size: 14px; color: ${TEXT2_DARK}">${['Platform', 'Solutions', 'Customers', 'Pricing'].map(navLink).join('')}</nav>
<a href="#" style="margin-left: auto; height: 44px; padding: 0 18px; display: inline-flex; align-items: center; border-radius: 10px; background: ${A}; color: ${INK}; font-size: 14px; font-weight: 600">Book a demo</a>
</div>
<div style="position: relative; flex: 1; min-height: 0; max-width: 500px; padding: 0 32px 12px; display: flex; flex-direction: column; justify-content: center; gap: 16px">
<div style="${SX}; font-size: 46px; line-height: 50px; letter-spacing: -0.02em">Solar, run like<br>software.</div>
<div style="font-size: 16px; line-height: 25px; color: ${TEXT2_DARK}">[One sentence on what Megasolar does, and who it is for.]</div>
<div style="display: flex; gap: 10px; padding-top: 4px">
<a href="#" style="height: 44px; padding: 0 18px; display: inline-flex; align-items: center; border-radius: 10px; background: ${A}; color: ${INK}; font-size: 14px; font-weight: 600">Book a demo</a>
<a href="#" style="height: 44px; box-sizing: border-box; padding: 0 18px; display: inline-flex; align-items: center; border-radius: 10px; border: 1px solid #3A424B; color: ${WHITE}; font-size: 14px; font-weight: 500">See how it works</a>
</div>
</div>
</div>

<div style="height: 384px; flex: none; box-sizing: border-box; border-radius: 20px; background: ${WHITE}; border: 1px solid ${LINE}; overflow: hidden; display: flex; color: ${INK}">
<div style="width: 196px; flex: none; box-sizing: border-box; padding: 20px 14px; background: ${PAPER}; border-right: 1px solid ${MIST}; display: flex; flex-direction: column; gap: 4px">
<div style="padding: 4px 2px 16px">${L.lockup(13, A, INK, { pulse: INK })}</div>
${side('Overview', true)}
${side('Sites')}
${side('Alerts')}
${side('Reports')}
</div>
<div style="flex: 1; min-width: 0; padding: 20px 24px; display: flex; flex-direction: column; gap: 14px">
<div style="display: flex; align-items: center; justify-content: space-between">
<div style="${SX}; font-size: 20px; line-height: 28px">Overview</div>
<div style="${MONO}; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: ${SLATE}; border: 1px solid ${LINE}; border-radius: 6px; padding: 3px 8px">Sample data</div>
</div>
<div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px">
${kpi('Output today', '4.82', 'MWh')}
${kpi('Sites online', '128', 'of 130')}
${kpi('Performance ratio', '86.4', '%')}
</div>
<div style="flex: 1; min-height: 0; display: flex; gap: 24px">
<div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px">
<div style="font-size: 12px; color: ${SLATE}">Generation, today</div>
${chart}
<div style="display: flex; justify-content: space-between; padding: 0 12%; ${MONO}; font-size: 10px; color: ${SLATE}"><span>06:00</span><span>12:00</span><span>18:00</span></div>
</div>
<div style="width: 250px; flex: none; display: flex; flex-direction: column">
<div style="font-size: 12px; color: ${SLATE}; padding-bottom: 6px">Sites</div>
${site('Carport North', 'online', 'Online')}
${site('Rooftop 01', 'online', 'Online')}
${site('Warehouse 3', 'degraded', 'Degraded')}
${site('Plant B', 'fault', 'Fault')}
</div>
</div>
</div>
</div>

</div>
<div style="width: 416px; flex: none; border-radius: 24px; background: ${A}; display: flex; align-items: center; justify-content: center">
<div style="width: 300px; height: 640px; box-sizing: border-box; border-radius: 44px; background: ${INK}; border: 8px solid ${GRAPHITE}; padding: 30px 20px 0; display: flex; flex-direction: column; color: ${WHITE}">
<div style="height: 28px; display: flex; align-items: center; gap: 10px">
${L.symbol(15, A, { small: true })}
<div style="flex: 1; min-width: 0; font-size: 16px; font-weight: 600">Carport North</div>
<span style="display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: ${TEXT2_DARK}">${L.statusIcon('online', 12)}Online</span>
</div>
<div style="margin-top: 22px; display: flex; flex-direction: column; gap: 4px">
<div style="font-size: 12px; color: ${TEXT3_DARK}">Performance ratio, today</div>
<div style="${MONO}; font-size: 44px; font-weight: 500; line-height: 48px">86.4<span style="font-size: 22px; color: ${TEXT2_DARK}">%</span></div>
</div>
<div style="margin-top: 22px; display: flex; flex-direction: column; gap: 10px">
${L.cap('Panel map', TEXT3_DARK)}
${L.arraySvg(map, heatFills)}
</div>
<div style="margin-top: 18px; display: flex; flex-direction: column; border-bottom: 1px solid ${LINE_DARK}">
${alert('degraded', 'String 4 output is low', '11:42')}
${alert('online', 'Inverter 2 is back online', '09:15')}
</div>
<div style="margin-top: auto; display: flex">
${tab('Sites', 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z', true)}
${tab('Alerts', 'M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21a2 2 0 0 0 4 0')}
${tab('Reports', 'M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6')}
</div>
</div>
</div>
</div>`
  })
});
