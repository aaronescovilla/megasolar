// Writes the design system's index for a first publish. Run from the repository root: node tools/ds_index.js
// design-system/assets.json maps each logo file to the id its upload returned.
// After the first publish the page owns the index: read the live one before changing it.
const fs = require('fs');
const ids = JSON.parse(fs.readFileSync('design-system/assets.json', 'utf8'));
const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const files = {};
for (const [name, blob] of Object.entries(ids)) files[name] = { name, blob, size: fs.statSync('brand/logo/' + name).size, type: 'image/svg+xml' };
const index = {
  v: 3, layout: 'files', createdOnFiles: { v: 1, at: now }, title: 'Megasolar', namespace: 'Megasolar', libraries: [],
  sections: {}, groups: ['Logos'],
  assetGroups: { Logos: { name: 'Logos', tile: 'l', order: Object.keys(ids), files } },
  blobs: {}, docs: { sections: [] },
  lastChange: { by: 'Aaron', at: now, via: 'Claude Code', note: 'Saved the chosen brand kit as a design system.' }
};
fs.writeFileSync('design-system/project/design-system.json', JSON.stringify(index, null, 2) + '\n');
console.log('index written with', Object.keys(files).length, 'logo records at', now);
