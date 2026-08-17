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
    "src/games/memory-match/memory-match.css",
    "src/games/story-sequencer/story-sequencer.css",
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

  test("Article 4.4: every className used by a component is defined in a stylesheet", () => {
    // Undefined classes fail silently in the browser: a "modal overlay" with no
    // rules renders in normal flow, an unstyled heading gets synthetic bold.
    const defined = new Set();
    cssSources().forEach(({ css }) => {
      for (const m of css.matchAll(/\.([A-Za-z][\w-]*)/g)) defined.add(m[1]);
    });

    const componentFiles = [];
    const walk = (dir) => {
      fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.name.endsWith(".jsx")) componentFiles.push(full);
      });
    };
    walk(path.join(ROOT, "src"));

    const undefinedUses = [];
    componentFiles.forEach((file) => {
      const code = fs.readFileSync(file, "utf8");
      const rel = path.relative(ROOT, file);

      // Plain string classNames plus the literal segments of template
      // literals (interpolations are dropped, quoted strings inside them kept)
      const candidates = [];
      for (const m of code.matchAll(/className="([^"]*)"/g)) candidates.push(m[1]);
      for (const m of code.matchAll(/className=\{`([^`]*)`\}/g)) {
        const tpl = m[1];
        for (const q of tpl.matchAll(/["']([^"']*)["']/g)) candidates.push(q[1]);
        candidates.push(tpl.replace(/\$\{[^}]*\}/g, " "));
      }

      candidates
        .flatMap((c) => c.split(/\s+/))
        // Trailing "-" means the name was completed by an interpolation
        .filter((c) => /^[A-Za-z][\w-]*$/.test(c) && !c.endsWith("-"))
        .forEach((cls) => {
          if (!defined.has(cls)) undefinedUses.push(`${rel}: .${cls}`);
        });
    });

    expect([...new Set(undefinedUses)]).toEqual([]);
  });

  test("Article 4.5: no synthetic bold on the single-weight handwriting faces", () => {
    cssSources().forEach(({ name, css }) => {
      const badWeights = css.match(/font-weight:\s*(bold|[6-9]00)/g) || [];
      expect(badWeights, `${name} requests a font weight the bundled fonts cannot render`).toEqual([]);
    });
  });

  test("Article 4.3: text color pairs meet WCAG contrast ratios", () => {
    const appCode = fs.readFileSync(path.join(ROOT, "src/App.jsx"), "utf8");
    const tokens = {};
    for (const m of appCode.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{6})/g)) tokens[m[1]] = m[2];

    const luminance = (hex) => {
      const channel = (c) => {
        const v = c / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      };
      const n = parseInt(hex.slice(1), 16);
      return (
        0.2126 * channel((n >> 16) & 255) +
        0.7152 * channel((n >> 8) & 255) +
        0.0722 * channel(n & 255)
      );
    };
    const ratio = (a, b) => {
      const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };
    const t = (name) => {
      expect(tokens[name], `token ${name} must exist`).toBeTruthy();
      return tokens[name];
    };

    // Body/small text on cardstock: WCAG AA 4.5:1
    const smallText = [
      [t("--ink"), t("--paper")],
      [t("--ink-soft"), t("--paper")],
      [t("--vermilion-deep"), t("--paper")],
      [t("--slate-deep"), t("--paper")],
      ["#46702c", t("--paper")], // stamp/badge green
      ["#635b50", t("--paper")], // muted notes
    ];
    smallText.forEach(([fg, bg]) => {
      expect(ratio(fg, bg), `${fg} on ${bg} must reach 4.5:1`).toBeGreaterThanOrEqual(4.5);
    });

    // Display/large text (Schoolbell titles, 20px+ buttons): WCAG AA 3:1
    const largeText = [
      [t("--vermilion"), t("--paper")],
      [t("--slate"), t("--paper")],
      [t("--paper"), t("--leaf")], // button text on leaf green
    ];
    largeText.forEach(([fg, bg]) => {
      expect(ratio(fg, bg), `${fg} on ${bg} must reach 3:1`).toBeGreaterThanOrEqual(3);
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
