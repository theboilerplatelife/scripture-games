/* Renders every verse portrait at the two sizes the app uses, so the
   faces can be looked at rather than only tested.

   node scripts/portrait-sheet.mjs -> scratch/portraits.html */
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import fs from "node:fs";
import { Portrait } from "../src/art/Portrait.jsx";
import { CHAPTERS } from "../src/data/chapters.js";
import { portraitOf } from "../src/data/authorship.js";
// one sample verse per portrait key (including per-verse poses)
const seen = new Map();
CHAPTERS.forEach((c) => c.verses.forEach((v) => {
  const k = `${portraitOf(v.ref)}#${v.ref}`;
  const base = portraitOf(v.ref);
  if (!seen.has(k) && /Ephesians 6:1[4-7]/.test(v.ref)) seen.set(k, v.ref);
  else if (!seen.has(base)) seen.set(base, v.ref);
}));
const sheet = renderToStaticMarkup(createElement("div", { className: "grid" },
  [...seen].map(([k, ref]) => createElement("figure", { key: k },
    createElement("div", { className: "card" },
      createElement(Portrait, { verseRef: ref, size: 84 }),
      createElement("span", { className: "sm" }, createElement(Portrait, { verseRef: ref, size: 48 }))),
    createElement("figcaption", null, k.replace("#", " · "))))));
fs.writeFileSync("scratch/portraits.html", `<!doctype html><meta charset="utf-8"><style>
 body{background:#f3e3c8;font:12px system-ui;margin:20px;color:#4a403a}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px}
 figure{margin:0;text-align:center}
 .card{background:#fdfaf1;border-radius:10px;padding:8px;display:flex;align-items:flex-end;justify-content:center;gap:6px}
 figcaption{margin-top:5px;opacity:.7;font-size:11px}
</style><h1>${seen.size} portraits — shown at 84px and 48px</h1>${sheet}`);
console.log(seen.size, "portraits");
