import { describe, test, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { SoundEngine, DEFAULT_BGM_VOL, DEFAULT_SFX_VOL } from "../../src/audio/SoundEngine.js";

describe("Constitution Gate: Audio & Synthesis Standards (Article 3)", () => {
  test("Article 3.1/3.2: zero external audio files, pure Web Audio synthesis", () => {
    const soundEnginePath = path.resolve(process.cwd(), "src/audio/SoundEngine.js");
    const soundEngineCode = fs.readFileSync(soundEnginePath, "utf8");

    // Must not import or reference .mp3, .wav, .ogg, or .aac audio files
    const mediaRegex = /\.(mp3|wav|ogg|aac|m4a)/i;
    expect(mediaRegex.test(soundEngineCode)).toBe(false);

    // Must use native Web Audio API AudioContext
    expect(soundEngineCode.includes("AudioContext")).toBe(true);
  });

  test("Article 3.5: default volume levels are 50% BGM and 75% SFX", () => {
    expect(DEFAULT_BGM_VOL).toBe(50);
    expect(DEFAULT_SFX_VOL).toBe(75);

    // A freshly constructed engine must honor the constitutional defaults (0..1 gain scale)
    const engine = new SoundEngine();
    expect(engine.bgmVol).toBeCloseTo(DEFAULT_BGM_VOL / 100, 10);
    expect(engine.sfxVol).toBeCloseTo(DEFAULT_SFX_VOL / 100, 10);
  });
});
