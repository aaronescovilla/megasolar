const { chromium } = require('playwright');
const fs = require('fs');
const D = 'brand/logo/';
const jobs = [
  ['megasolar-app-icon.svg', 1024, 1024, 'megasolar-app-icon-1024.png'],
  ['megasolar-app-icon.svg', 512, 512, 'megasolar-app-icon-512.png'],
  ['megasolar-app-icon.svg', 180, 180, 'apple-touch-icon-180.png'],
  ['megasolar-app-icon.svg', 32, 32, 'favicon-32.png'],
  ['megasolar-app-icon.svg', 16, 16, 'favicon-16.png'],
  ['megasolar-avatar.svg', 800, 800, 'megasolar-avatar-800.png'],
  ['megasolar-logo.svg', 1600, 0, 'megasolar-logo-1600.png'],
  ['megasolar-logo-reversed.svg', 1600, 0, 'megasolar-logo-reversed-1600.png'],
  ['megasolar-logo-stacked.svg', 1200, 0, 'megasolar-logo-stacked-1200.png'],
  ['megasolar-symbol.svg', 800, 0, 'megasolar-symbol-800.png'],
];
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  for (const [src, w, h0, out] of jobs) {
    const s = fs.readFileSync(D + src, 'utf8');
    const vb = s.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
    const h = h0 || Math.round(w * vb[3] / vb[2]);
    await p.setViewportSize({ width: w, height: h });
    await p.setContent(`<html><body style="margin:0;background:transparent"><img style="display:block;width:${w}px;height:${h}px" src="data:image/svg+xml;base64,${Buffer.from(s).toString('base64')}"></body></html>`);
    await p.screenshot({ path: D + 'png/' + out, omitBackground: true, clip: { x: 0, y: 0, width: w, height: h } });
  }
  await b.close();
  console.log('png done');
})();
