// 03 Color: core panels, working scales, status, data series, heat ramp.
const L = require('./lib.js');
const { INK, WHITE, PAPER, MIST, SLATE, SOLAR, LINE, TEXT2, MONO, GRAPHITE, S, STATUS, SERIES, HEAT } = L;
const rgb = (hex) => L.hexRgb(hex).join(' ');
const ratio = (a, b) => L.contrast(a, b).toFixed(1) + ' : 1';

const panel = (bg, border, name, hex, fg, sub) => `<div style="width: 150px; height: 400px; box-sizing: border-box; border-radius: 16px; background: ${bg}; border: 1px solid ${border}; transform: skewX(-19deg); display: flex; align-items: flex-end; padding: 20px 18px">
<div style="transform: skewX(19deg); display: flex; flex-direction: column; gap: 4px">
<div style="font-size: 16px; font-weight: 600; color: ${fg}">${name}</div>
<div style="${MONO}; font-size: 12px; color: ${sub}">${hex}</div>
</div>
</div>`;
const coreRow = (hex, border, name, use) => `<div style="height: 30px; display: grid; grid-template-columns: 14px 112px 76px 108px minmax(0, 1fr); align-items: center; gap: 12px; border-top: 1px solid ${LINE}; font-size: 13px">
<div style="width: 14px; height: 14px; box-sizing: border-box; border-radius: 4px; background: ${hex}; border: 1px solid ${border}"></div>
<div style="font-weight: 600">${name}</div>
<div style="${MONO}; font-size: 12px">${hex}</div>
<div style="${MONO}; font-size: 12px; color: ${SLATE}">${rgb(hex)}</div>
<div style="color: ${TEXT2}">${use}</div>
</div>`;
const pair = (bg, border, fg, label) => `<div style="height: 56px; box-sizing: border-box; border-radius: 10px; background: ${bg}; border: 1px solid ${border}; padding: 0 12px; display: flex; align-items: center; justify-content: space-between; color: ${fg}">
<div style="font-size: 13px; font-weight: 600">${label}</div>
<div style="${MONO}; font-size: 12px">${ratio(fg, bg)}</div>
</div>`;
const chip = (hex, step, name, border) => `<div style="display: flex; flex-direction: column; gap: 6px; min-width: 0">
<div style="height: 64px; box-sizing: border-box; border-radius: 8px; background: ${hex}; border: 1px solid ${border || hex}"></div>
<div style="display: flex; flex-direction: column; gap: 1px; ${MONO}; font-size: 11px; line-height: 14px">
<div style="font-weight: 500">${step}</div>
<div style="color: ${SLATE}">${hex}</div>
${name === undefined ? '' : `<div style="font-family: 'Geist', ui-sans-serif, system-ui, sans-serif; font-weight: 500; height: 14px">${name}</div>`}
</div>
</div>`;
const sq = (hex) => `<div style="width: 22px; height: 22px; border-radius: 6px; background: ${hex}"></div>`;
const tableRow = (icon, name, hex, use) => `<div style="height: 36px; display: grid; grid-template-columns: 22px 92px 68px minmax(0, 1fr); align-items: center; gap: 12px; border-top: 1px solid ${LINE}; font-size: 13px">
${icon}
<div style="font-weight: 600">${name}</div>
<div style="${MONO}; font-size: 12px">${hex}</div>
<div style="color: ${TEXT2}">${use}</div>
</div>`;
const iconTile = (kind) => `<div style="width: 22px; height: 22px; border-radius: 6px; background: ${INK}; display: flex; align-items: center; justify-content: center">${L.statusIcon(kind, 12)}</div>`;

// Panel map coloured with the heat ramp: mostly strong output, one weak string.
const heat = L.arrayPaths(26, 4, 13, 20, 3, (c, r) => {
  const weak = c >= 15 && c <= 18 && r >= 1 && r <= 2;
  const v = weak ? 1 + Math.round(L.noise(c, r)) : 3 + Math.floor(L.noise(c, r) * 2.99);
  return 'h' + v;
});
const heatFills = Object.fromEntries(HEAT.map((hex, i) => ['h' + i, hex]));

module.exports = () => L.doc({
  title: 'Megasolar · Color', w: 1600, h: 1000,
  body: L.page({
    num: '03', label: 'Color',
    body: `<div style="flex: 1; min-height: 0; display: flex; gap: 56px">
<div style="width: 600px; flex: none; display: flex; flex-direction: column; gap: 22px">
${L.cap('Core', SLATE)}
<div style="height: 400px; display: flex; gap: 22px; padding-left: 72px">
${panel(INK, INK, 'Ink', INK, WHITE, '#A9B1BA')}
${panel(SOLAR, SOLAR, 'Solar Yellow', SOLAR, INK, INK)}
${panel(PAPER, LINE, 'Paper', PAPER, INK, SLATE)}
</div>
<div style="display: flex; flex-direction: column; border-bottom: 1px solid ${LINE}">
${coreRow(INK, INK, 'Ink', 'Grounds, wordmark, text')}
${coreRow(SOLAR, SOLAR, 'Solar Yellow', 'Symbol, main actions, lit data')}
${coreRow(PAPER, LINE, 'Paper', 'Light grounds, documents')}
</div>
<div style="display: flex; flex-direction: column; gap: 10px">
${L.cap('Balance', SLATE)}
<div style="height: 18px; display: flex; gap: 5px; padding: 0 4px">
<div style="flex: 60; border-radius: 4px; background: ${INK}; transform: skewX(-19deg)"></div>
<div style="flex: 30; box-sizing: border-box; border-radius: 4px; background: ${WHITE}; border: 1px solid ${LINE}; transform: skewX(-19deg)"></div>
<div style="flex: 10; border-radius: 4px; background: ${SOLAR}; transform: skewX(-19deg)"></div>
</div>
<div style="font-size: 13px; color: ${TEXT2}">About 60% Ink, 30% Paper, 10% Solar Yellow. Yellow is a signal, so keep it scarce.</div>
</div>
<div style="display: flex; flex-direction: column; gap: 10px">
${L.cap('Text pairs', SLATE)}
<div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px">
${pair(INK, INK, SOLAR, 'Solar')}
${pair(SOLAR, SOLAR, INK, 'Ink')}
${pair(PAPER, LINE, INK, 'Ink')}
${pair(WHITE, LINE, SLATE, 'Slate')}
</div>
</div>
</div>
<div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 22px">
<div style="display: flex; flex-direction: column; gap: 10px">
${L.cap('Solar scale', SLATE)}
<div style="display: grid; grid-template-columns: repeat(10, minmax(0, 1fr)); gap: 6px">
${L.SOLAR_SCALE.map((s) => chip(s.hex, s.n === 400 ? '400 brand' : s.n, undefined, s.n < 300 ? LINE : null)).join('\n')}
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 10px">
${L.cap('Neutral scale', SLATE)}
<div style="display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 6px">
${L.NEUTRAL_SCALE.map((s) => chip(s.hex, s.n, s.name, s.n < 300 ? LINE : null)).join('\n')}
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px">
<div style="display: flex; flex-direction: column; gap: 10px">
${L.cap('Status', SLATE)}
<div style="display: flex; flex-direction: column; border-bottom: 1px solid ${LINE}">
${tableRow(iconTile('online'), 'Online', STATUS.online, 'Working as expected')}
${tableRow(iconTile('degraded'), 'Degraded', STATUS.degraded, 'Output below target')}
${tableRow(iconTile('fault'), 'Fault', STATUS.fault, 'Needs action')}
${tableRow(iconTile('offline'), 'Offline', STATUS.offline, 'No data')}
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 10px">
${L.cap('Data series', SLATE)}
<div style="display: flex; flex-direction: column; border-bottom: 1px solid ${LINE}">
${tableRow(sq(SERIES.generation), 'Generation', SERIES.generation, 'Solar 600 on light')}
${tableRow(sq(SERIES.grid), 'Grid', SERIES.grid, 'Import and export')}
${tableRow(sq(SERIES.battery), 'Battery', SERIES.battery, 'Charge and discharge')}
${tableRow(sq(SERIES.load), 'Load', SERIES.load, 'Site consumption')}
</div>
</div>
</div>
<div style="display: flex; flex-direction: column; gap: 10px">
${L.cap('Heat ramp for panel maps', SLATE)}
<div style="display: flex; align-items: center; gap: 28px">
<div style="display: flex; gap: 4px">
${HEAT.map((hex) => `<div style="width: 44px; height: 64px; border-radius: 6px; background: ${hex}; transform: skewX(-19deg)"></div>`).join('\n')}
</div>
<div style="height: 108px; box-sizing: border-box; flex: 1; min-width: 0; border-radius: 12px; background: ${INK}; display: flex; align-items: center; justify-content: center">
${L.arraySvg(heat, heatFills)}
</div>
</div>
<div style="font-size: 13px; color: ${TEXT2}">Low output is Graphite, full output is Solar 200. The dark patch reads as a weak string at a glance.</div>
</div>
</div>
</div>`
  }),
  props: { accent: { editor: 'color', default: SOLAR, options: [SOLAR, '#EDBD1E', '#3BE083', '#C4F24A'] } }
});
