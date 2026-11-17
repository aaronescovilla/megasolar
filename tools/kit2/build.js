// Builds the seven v2 brand kit boards. Run from the repository root:
//   node tools/kit2/build.js            writes into design/project/
//   node tools/kit2/build.js /tmp/out/  writes somewhere else
const fs = require('fs');
const out = process.argv[2] || 'design/project/';
const boards = {
  Kit2Overview: require('./overview.js'),
  Kit2Logo: require('./logo.js'),
  Kit2Color: require('./color_board.js'),
  Kit2Type: require('./type.js'),
  Kit2Language: require('./language.js'),
  Kit2Digital: require('./digital.js'),
  Kit2Physical: require('./physical.js')
};
fs.mkdirSync(out, { recursive: true });
for (const [name, make] of Object.entries(boards)) {
  const html = make();
  fs.writeFileSync(out + name + '.dc.html', html);
  console.log(name, Buffer.byteLength(html));
}
