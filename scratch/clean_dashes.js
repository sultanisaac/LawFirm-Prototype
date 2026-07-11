const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  for (const [search, replace] of replacements) {
    content = content.replace(search, replace);
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + filePath);
  }
}

const basePath = 'c:\\Users\\Sultan\\Documents\\TRW\\GitHub (sultan.isaac26@gmail.com)\\LawFirm-Prototype';

replaceInFile(path.join(basePath, 'lib', 'copy.ts'), [
  [/Indonesia—without/g, "Indonesia without"],
  [/lifecycle — from/g, "lifecycle from"],
  [/IP — Trademark/g, "IP, Trademark"],
  [/Retainer — General/g, "Retainer, General"],
  [/fee — fixed/g, "fee, fixed"],
  [/upfront — fixed/g, "upfront, fixed"],
  [/seriously — attorney-client/g, "seriously. Attorney-client"],
  [/have — a contract/g, "have: a contract"],
  [/counsel — fast/g, "counsel, fast"],
  [/pressure — just/g, "pressure, just"],
  [/Indonesia—tanpa/g, "Indonesia tanpa"],
  [/bisnis — dari/g, "bisnis dari"],
  [/KI — Merek/g, "KI, Merek"],
  [/Bulanan — Kuasa/g, "Bulanan, Kuasa"],
  [/jelas — tetap/g, "jelas, tetap"],
  [/awal — tetap/g, "awal, tetap"],
  [/kerahasiaan — privilese/g, "kerahasiaan. Privilese"],
  [/miliki — draf/g, "miliki: draf"],
  [/tekanan — hanya/g, "tekanan, hanya"],
]);

replaceInFile(path.join(basePath, 'lib', 'cta-links.ts'), [
  [/Inquiry — /g, "Inquiry: "],
  [/Hukum — /g, "Hukum: "],
]);

replaceInFile(path.join(basePath, 'components', 'PrototypeBanner.tsx'), [
  [/mx-2">—<\/span>/g, 'mx-2"> </span>']
]);

replaceInFile(path.join(basePath, 'components', 'FloatingWhatsApp.tsx'), [
  [/—/g, '-']
]);

console.log("Cleanup complete!");
