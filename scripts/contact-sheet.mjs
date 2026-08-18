/* Renders every drawn card scene onto one page so the artwork can be
   looked at, not just tested. Not part of the app or the gate.

   node scripts/contact-sheet.mjs [filter] -> scratch/contact-sheet.html */
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import fs from "node:fs";
import { SCENES } from "../src/art/scenes.js";
import { CardScene } from "../src/art/CardScene.jsx";

const filter = process.argv[2] || "";
const band = process.argv[3] === "band";
const keys = Object.keys(SCENES).filter((k) => k.includes(filter));

// One tree, so React's ids stay unique and each scene keeps its own
// gradients — rendering the cards separately makes them all share the first
const sheet = renderToStaticMarkup(
  createElement(
    "div",
    { className: "grid" },
    keys.map((key) =>
      createElement(
        "figure",
        { key },
        createElement(
          "div",
          { className: "card" },
          createElement(CardScene, { scene: key, anchor: band ? "bottom" : undefined }),
          createElement("span", { className: "cap" }, "caption strip sits here")
        ),
        createElement("figcaption", null, key)
      )
    )
  )
);

const html = `<!doctype html><meta charset="utf-8"><title>Card scenes</title>
<style>
  body { background:#2b2b33; color:#eee; font:13px system-ui; margin:24px; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(272px,1fr)); gap:18px; }
  figure { margin:0; }
  .card { position:relative; width:100%; aspect-ratio:${band ? "640/104" : "272/120"}; overflow:hidden; border-radius:4px; }
  .card svg { position:absolute; inset:0; width:100%; height:100%; }
  .cap { display:${band ? "none" : "block"}; position:absolute; left:5%; right:5%; top:50%; transform:translateY(-50%) rotate(-1.2deg);
         background:#fdf6e6; color:#4a403a; padding:6px 8px; font-size:12px; text-align:center;
         box-shadow:0 1px 3px rgba(0,0,0,.3); }
  figcaption { margin-top:6px; opacity:.65; }
</style>
<h1>${keys.length} scenes</h1>
${sheet}`;

fs.mkdirSync("scratch", { recursive: true });
fs.writeFileSync("scratch/contact-sheet.html", html);
console.log(`scratch/contact-sheet.html — ${keys.length} scenes`);
