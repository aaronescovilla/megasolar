// Builds the agreement as one standalone page that can be shared on its own, without the brand canvas.
// Run from the repository root:  node tools/docs/share.js
// Writes documents/MS-AGR-2026-001_installation-contractor-agreement.html (published as its own artifact).
const fs = require('fs');
const agreement = require('./agreement.js');
const L = require('../kit2/lib.js');

const sheets = [agreement.first, agreement.second, agreement.third].map((make) => {
  const src = make();
  return src.slice(src.indexOf('</helmet>') + 9, src.indexOf('</x-dc>')).replace(/\{\{accent\}\}/g, L.SOLAR).trim();
});
const note = agreement.blanks
  ? `Draft for review. Text in [square brackets] is still to be filled in.`
  : `Final text. Print on A4, one side only; both parties initial each page and sign the last.`;

const html = `<title>Installation Contractor Agreement</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&amp;family=Saira:wdth,wght@50..125,100..900&amp;display=swap">
<style>
/* Layout: three A4 sheets in a single column on a quiet ground, scaled down to fit narrow screens. */
:root { --ground: #E3E6E0; --fg: #2A3138; --line: #C9CED4; --paper: #FFFFFF; --s: 1 }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --ground: #12171D; --fg: #A9B1BA; --line: #222A33; --paper: #FFFFFF; color-scheme: dark } }
:root[data-theme="dark"] { --ground: #12171D; --fg: #A9B1BA; --line: #222A33; --paper: #FFFFFF; color-scheme: dark }
body { background: var(--ground); color: var(--fg); font-family: 'Geist', ui-sans-serif, system-ui, sans-serif }
.wrap { box-sizing: border-box; max-width: 826px; margin: 0 auto; padding-block: 24px 40px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); display: flex; flex-direction: column; gap: 20px }
.note { margin: 0; font-size: 14px; line-height: 20px }
.page { width: calc(794px * var(--s)); height: calc(1123px * var(--s)); overflow: hidden; background: var(--paper); outline: 1px solid var(--line) }
.page > div { transform: scale(var(--s)); transform-origin: 0 0 }
</style>
<div class="wrap" id="wrap">
<p class="note">${note}</p>
${sheets.map((s, i) => `<section class="page" aria-label="Page ${i + 1} of ${sheets.length}">\n${s}\n</section>`).join('\n')}
</div>
<script>
(function () {
  var wrap = document.getElementById('wrap');
  function fit() {
    var cs = getComputedStyle(wrap);
    var w = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    document.documentElement.style.setProperty('--s', String(Math.min(1, w / 794)));
  }
  fit();
  window.addEventListener('resize', fit);
})();
</script>
`;
fs.mkdirSync('documents', { recursive: true });
const out = 'documents/MS-AGR-2026-001_installation-contractor-agreement.html';
fs.writeFileSync(out, html);
console.log(out, Buffer.byteLength(html));
