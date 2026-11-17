// Builds the document standard boards (draft, awaiting approval). Run from the repository root:
//   node tools/docs/build.js            writes into design/project/
//   node tools/docs/build.js /tmp/out/  writes somewhere else
const fs = require('fs');
const out = process.argv[2] || 'design/project/';
const letter = require('./letter.js'), agreement = require('./agreement.js')(); // the template, blanks unfilled
const boards = {
  DocStandard: require('./standard.js'),
  DocLetter1: letter.first,
  DocLetter2: letter.next,
  DocAgreement1: agreement.pages[0],
  DocAgreement2: agreement.pages[1],
  DocAgreement3: agreement.pages[2],
  DocAgreement4: agreement.pages[3],
  DocForm: require('./form.js')
};
fs.mkdirSync(out, { recursive: true });
for (const [name, make] of Object.entries(boards)) {
  const html = make();
  fs.writeFileSync(out + name + '.dc.html', html);
  console.log(name, Buffer.byteLength(html));
}
