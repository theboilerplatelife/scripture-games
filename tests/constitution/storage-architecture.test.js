import { describe, test, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Constitution Check: Storage & Privacy Architecture", () => {
  test("App.jsx persists state exclusively to designated scripture_games_* keys", () => {
    const appPath = path.resolve(__dirname, "../../src/App.jsx");
    const appCode = fs.readFileSync(appPath, "utf-8");

    const expectedKeys = [
      'STORAGE_STARS_KEY = "scripture_games_stars_v1"',
      'STORAGE_TRANS_KEY = "scripture_games_translation_v1"',
      'STORAGE_AUDIO_KEY = "scripture_games_audio_muted_v1"',
      'STORAGE_BGM_VOL_KEY = "scripture_games_bgm_vol_v1"',
      'STORAGE_SFX_VOL_KEY = "scripture_games_sfx_vol_v1"',
    ];

    expectedKeys.forEach((key) => {
      expect(appCode).toContain(key);
    });
  });
});
