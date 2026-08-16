import { describe, test, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

/*
 * Constitution Gate: UI, UX & Visual Aesthetics (Article 4)
 * Enforces the mechanical parts of the design system: single-source
 * tokens, no cross-stylesheet class redefinition, and honest typography
 * on the single-weight handwriting faces.
 */

const ROOT = path.resolve(__dirname, "../..");

function cssSources() {
  const appCode = fs.readFileSync(path.join(ROOT, "src/App.jsx"), "utf8");
  const globalCss = appCode.slice(appCode.indexOf("const globalCss = `"));
  const files = [
    "src/games/hub/hub.css",
    "src/games/verse-builder/verse-builder.css",
    "src/components/common/welcome-splash.css",
  ];
  return [
    { name: "globalCss (App.jsx)", css: globalCss },
    ...files.map((f) => ({ name: f, css: fs.readFileSync(path.join(ROOT, f), "utf8") })),
  ];
}

describe("Constitution Gate: Design System (Article 4)", () => {
  test("Article 4.4: the :root token block defines the shared scrapbook palette", () => {
    const appCode = fs.readFileSync(path.join(ROOT, "src/App.jsx"), "utf8");
    ["--paper:", "--kraft:", "--vermilion:", "--leaf:", "--slate:", "--ink:", "--sand:", "--tape:"].forEach(
      (token) => {
        expect(appCode, `globalCss :root block must define ${token}`).toContain(token);
      }
    );
  });

  test("Article 4.4: no class is defined in more than one stylesheet", () => {
    const definedIn = {};
    cssSources().forEach(({ name, css }) => {
      const seen = new Set();
      for (const m of css.matchAll(/^\.([a-zA-Z0-9_-]+)\s*\{/gm)) seen.add(m[1]);
      seen.forEach((cls) => {
        (definedIn[cls] ||= []).push(name);
      });
    });
    const duplicates = Object.entries(definedIn).filter(([, files]) => files.length > 1);
    expect(
      duplicates.map(([cls, files]) => `.${cls} in ${files.join(" + ")}`),
      "duplicate class definitions make rendering depend on stylesheet injection order"
    ).toEqual([]);
  });

  test("Article 4.5: no synthetic bold on the single-weight handwriting faces", () => {
    cssSources().forEach(({ name, css }) => {
      const badWeights = css.match(/font-weight:\s*(bold|[6-9]00)/g) || [];
      expect(badWeights, `${name} requests a font weight the bundled fonts cannot render`).toEqual([]);
    });
  });

  test("Article 4.5: minimum text size is 13px", () => {
    cssSources().forEach(({ name, css }) => {
      for (const m of css.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)) {
        expect(
          Number(m[1]),
          `${name} declares font-size ${m[1]}px, below the 13px floor`
        ).toBeGreaterThanOrEqual(13);
      }
    });
  });
});
