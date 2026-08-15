import { describe, test, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Constitution Gate: Audio & Offline Architecture (Article 4)", () => {
  test("Article 4.1: Zero external audio files or network audio streaming", () => {
    const soundEnginePath = path.resolve(process.cwd(), "src/audio/SoundEngine.js");
    const soundEngineCode = fs.readFileSync(soundEnginePath, "utf8");
    
    // Must not import or reference .mp3, .wav, .ogg, or .aac audio files
    const mediaRegex = /\.(mp3|wav|ogg|aac|m4a)/i;
    expect(mediaRegex.test(soundEngineCode)).toBe(false);

    // Must use native Web Audio API AudioContext
    expect(soundEngineCode.includes("AudioContext")).toBe(true);
  });

  test("Article 4.2: Default volume levels must strictly match 25% BGM and 50% SFX", () => {
    const soundEnginePath = path.resolve(process.cwd(), "src/audio/SoundEngine.js");
    const soundEngineCode = fs.readFileSync(soundEnginePath, "utf8");
    
    const appPath = path.resolve(process.cwd(), "src/App.jsx");
    const appCode = fs.readFileSync(appPath, "utf8");

    // SoundEngine.js defaults
    expect(soundEngineCode.includes("this.bgmVol = 0.25")).toBe(true);
    expect(soundEngineCode.includes("this.sfxVol = 0.50") || soundEngineCode.includes("this.sfxVol = 0.5")).toBe(true);

    // App.jsx initial state defaults
    expect(appCode.includes(": 25")).toBe(true);
    expect(appCode.includes(": 50")).toBe(true);
  });
});
