import { describe, test, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const SRC_DIR = path.resolve(__dirname, "../../src");

const ALLOWED_KEYS = [
  "scripture_games_stars_v1",
  "scripture_games_translation_v1",
  "scripture_games_audio_muted_v1",
  "scripture_games_bgm_vol_v1",
  "scripture_games_sfx_vol_v1",
];

function listSourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listSourceFiles(full);
    return /\.(js|jsx)$/.test(entry.name) ? [full] : [];
  });
}

describe("Constitution Gate: Privacy & Offline-First Architecture (Article 2)", () => {
  test("Article 2.3: App.jsx defines all five designated scripture_games_* storage keys", () => {
    const appCode = fs.readFileSync(path.join(SRC_DIR, "App.jsx"), "utf8");
    ALLOWED_KEYS.forEach((key) => {
      expect(appCode, `App.jsx must define storage key "${key}"`).toContain(`"${key}"`);
    });
  });

  test("Article 2.4: every localStorage call site in src/ uses only the designated keys", () => {
    const callRegex = /localStorage\s*\.\s*(getItem|setItem|removeItem|clear|key)\s*\(\s*([A-Za-z_$][\w$]*|"[^"]*"|'[^']*'|`[^`]*`)?/g;
    const constRegex = /const\s+([A-Za-z_$][\w$]*)\s*=\s*"([^"]+)"/g;

    listSourceFiles(SRC_DIR).forEach((file) => {
      const code = fs.readFileSync(file, "utf8");
      const rel = path.relative(SRC_DIR, file);

      const constants = {};
      for (const m of code.matchAll(constRegex)) constants[m[1]] = m[2];

      for (const m of code.matchAll(callRegex)) {
        const [, method, arg] = m;
        expect(method, `${rel}: localStorage.${method} is not permitted (would wipe or scan beyond designated keys)`).not.toBe("clear");
        expect(method, `${rel}: localStorage.${method} is not permitted (would wipe or scan beyond designated keys)`).not.toBe("key");

        const literal = /^["'`]/.test(arg || "") ? arg.slice(1, -1) : constants[arg];
        expect(
          ALLOWED_KEYS.includes(literal),
          `${rel}: localStorage.${method}(${arg}) must use one of the designated scripture_games_* keys`
        ).toBe(true);
      }
    });
  });

  test("Article 2.5: zero external runtime origins referenced anywhere in src/", () => {
    const urlRegex = /https?:\/\/[^\s"'`)]+/g;
    const allowedNamespaces = [/^https?:\/\/www\.w3\.org\//];

    listSourceFiles(SRC_DIR).forEach((file) => {
      const code = fs.readFileSync(file, "utf8");
      const rel = path.relative(SRC_DIR, file);
      for (const m of code.matchAll(urlRegex)) {
        const isNamespace = allowedNamespaces.some((ns) => ns.test(m[0]));
        expect(isNamespace, `${rel}: external URL "${m[0]}" violates the zero-external-dependency rule`).toBe(true);
      }
    });
  });
});
