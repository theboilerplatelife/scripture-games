import { describe, test, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Constitution Gate: Storage Keys & Architecture (Article 5)", () => {
  test("Article 5.2: LocalStorage keys must match constitutional standards", () => {
    const appPath = path.resolve(process.cwd(), "src/App.jsx");
    const appCode = fs.readFileSync(appPath, "utf8");

    const requiredKeys = [
      'STORAGE_STARS_KEY = "bible_games_stars_v1"',
      'STORAGE_TRANS_KEY = "bible_games_translation_v1"',
      'STORAGE_AUDIO_KEY = "bible_games_audio_muted_v1"',
      'STORAGE_BGM_VOL_KEY = "bible_games_bgm_vol_v1"',
      'STORAGE_SFX_VOL_KEY = "bible_games_sfx_vol_v1"',
    ];

    requiredKeys.forEach((keyDeclaration) => {
      expect(appCode.includes(keyDeclaration), `App.jsx missing ${keyDeclaration}`).toBe(true);
    });
  });
});
