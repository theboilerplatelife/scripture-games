import { describe, test, expect, vi } from "vitest";
import { SoundEngine, NOTES } from "../../src/audio/SoundEngine.js";

const makeParam = () => ({
  setValueAtTime: () => {},
  exponentialRampToValueAtTime: () => {},
  linearRampToValueAtTime: () => {},
  setTargetAtTime: () => {},
});

class MockAudioContext {
  constructor() {
    this.currentTime = 0;
    this.state = "suspended";
    this.sampleRate = 44100;
    this.destination = {};
  }
  createGain() {
    return {
      gain: makeParam(),
      connect: () => {},
    };
  }
  createOscillator() {
    return {
      type: "sine",
      frequency: makeParam(),
      detune: makeParam(),
      connect: () => {},
      start: () => {},
      stop: () => {},
    };
  }
  createBiquadFilter() {
    return {
      type: "bandpass",
      frequency: makeParam(),
      Q: makeParam(),
      gain: makeParam(),
      connect: () => {},
    };
  }
  createBuffer(_channels, length, _sampleRate) {
    return {
      getChannelData: () => new Float32Array(length),
    };
  }
  createBufferSource() {
    return {
      buffer: null,
      connect: () => {},
      start: () => {},
      stop: () => {},
    };
  }
  resume() {
    this.state = "running";
    return Promise.resolve();
  }
  suspend() {
    this.state = "suspended";
    return Promise.resolve();
  }
}

globalThis.AudioContext = MockAudioContext;
globalThis.webkitAudioContext = MockAudioContext;
if (typeof window !== "undefined") {
  window.AudioContext = MockAudioContext;
  window.webkitAudioContext = MockAudioContext;
}

describe("SoundEngine Comprehensive Unit Tests", () => {
  test("initializes audio context and gain nodes and updates volumes", () => {
    const engine = new SoundEngine();
    engine.init();
    expect(engine.ctx).toBeTruthy();
    expect(engine.masterGain).toBeTruthy();
    expect(engine.sfxGain).toBeTruthy();

    // Context was suspended, resume called
    expect(engine.ctx.state).toBe("running");

    // Volume updates when context is initialized
    engine.setMuted(true);
    expect(engine.muted).toBe(true);

    engine.setMuted(false);
    expect(engine.muted).toBe(false);

    engine.setBgmVolume(0.4);
    expect(engine.bgmVol).toBe(0.4);

    engine.setSfxVolume(0.7);
    expect(engine.sfxVol).toBe(0.7);

    // Clamping
    engine.setBgmVolume(-1);
    expect(engine.bgmVol).toBe(0);
    engine.setBgmVolume(2);
    expect(engine.bgmVol).toBe(1);

    engine.setSfxVolume(-1);
    expect(engine.sfxVol).toBe(0);
    engine.setSfxVolume(2);
    expect(engine.sfxVol).toBe(1);
  });

  test("synthesizes sound effects safely without errors", () => {
    const engine = new SoundEngine();
    engine.init();

    // Muted initialization & null gain handling
    const mutedEngine = new SoundEngine();
    mutedEngine.muted = true;
    mutedEngine.init();
    expect(mutedEngine.sfxGain).toBeTruthy();

    const emptyEngine = new SoundEngine();
    emptyEngine.ctx = new MockAudioContext();
    expect(() => emptyEngine.setMuted(true)).not.toThrow();
    expect(() => emptyEngine.setMuted(false)).not.toThrow();

    expect(() => engine.playStarChime(99)).not.toThrow();
    expect(() => engine.playButtonClick()).not.toThrow();
    expect(() => engine.playPencilScratch()).not.toThrow();
    expect(() => engine.playPlaceScrap(0)).not.toThrow();
    expect(() => engine.playPlaceScrap(3)).not.toThrow();
    expect(() => engine.playRemoveScrap()).not.toThrow();
    expect(() => engine.playWrongAnswer()).not.toThrow();
    expect(() => engine.playStarChime(0)).not.toThrow();
    expect(() => engine.playStarChime(2)).not.toThrow();
    expect(() => engine.playLightApplause()).not.toThrow();
    expect(() => engine.playWinFanfare()).not.toThrow();
    expect(() => engine.playChapterFanfare()).not.toThrow();
    expect(() => engine.playAllDoneFanfare()).not.toThrow();
    expect(() => engine.playSettingsChime()).not.toThrow();
    expect(() => engine.playCardSnap(0)).not.toThrow();
    expect(() => engine.playTimelineWhoosh()).not.toThrow();
    expect(() => engine.playStepSuccess(0)).not.toThrow();
    expect(() => engine.playPluck(NOTES.C4, 0.4, 0.3, "sine")).not.toThrow();
    expect(() => engine.playPluck(NOTES.C6, 0.4, 0.3, "triangle")).not.toThrow();
    expect(() => engine.playBass(NOTES.C3, 0.5, 0.2)).not.toThrow();
    expect(() => engine.playHorn(440, 0, 0.4, 0.3)).not.toThrow();

    // With muted engine
    engine.setMuted(true);
    expect(() => engine.playPluck(NOTES.C4)).not.toThrow();
    expect(() => engine.playBass(NOTES.C3)).not.toThrow();
    expect(() => engine.playHorn(440)).not.toThrow();
    expect(() => engine.playPencilScratch()).not.toThrow();
    expect(() => engine.playPlaceScrap(0)).not.toThrow();
    expect(() => engine.playRemoveScrap()).not.toThrow();
    expect(() => engine.playCardSnap(0)).not.toThrow();
    expect(() => engine.playTimelineWhoosh()).not.toThrow();
    expect(() => engine.playStepSuccess(0)).not.toThrow();
    expect(() => engine.playStarChime(0)).not.toThrow();
    expect(() => engine.playLightApplause()).not.toThrow();
    expect(() => engine.playWinFanfare()).not.toThrow();
    expect(() => engine.playChapterFanfare()).not.toThrow();
    expect(() => engine.playAllDoneFanfare()).not.toThrow();
  });

  test("runs all tracks through sequencer timer cycles", () => {
    vi.useFakeTimers();
    const engine = new SoundEngine();
    engine.init();

    const tracks = [
      "hub",
      "main",
      "title",
      "verse-builder-title",
      "verse",
      "verse-builder-play",
      "trivia",
      "trivia-title",
      "who-am-i",
      "whoami",
      "wai",
      "memory",
      "memory-title",
      "sequencer",
      "story-sequencer",
      "story",
      "unknown-fallback",
    ];

    tracks.forEach((track) => {
      engine.setTrack(track);
      expect(engine.isPlaying).toBe(true);

      // Advance sequencer steps
      vi.advanceTimersByTime(2000);
    });

    // A long main-thread stall: the scheduler skips past steps instead of
    // replaying them in a burst
    engine.setTrack("hub");
    engine.ctx.currentTime = 30;
    vi.advanceTimersByTime(100);
    expect(engine.isPlaying).toBe(true);

    // Run while muted
    engine.setMuted(true);
    engine.setTrack("verse");
    vi.advanceTimersByTime(1000);

    // Stop playback
    engine.setTrack(null);
    expect(engine.isPlaying).toBe(false);

    vi.useRealTimers();
  });

  test("handles page visibility and mobile app switching gracefully", () => {
    vi.useFakeTimers();
    const engine = new SoundEngine();
    engine.init();
    expect(engine.ctx.state).toBe("running");

    engine.setTrack("hub");

    // 1. App switching / tab hidden (visibilitychange to hidden)
    Object.defineProperty(document, "hidden", { value: true, configurable: true });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(engine.isBackgrounded).toBe(true);
    expect(engine.ctx.state).toBe("suspended");

    // Sequencer advances without playing notes while backgrounded
    vi.advanceTimersByTime(1000);

    // Calling init while backgrounded does not resume context
    engine.init();
    expect(engine.ctx.state).toBe("suspended");

    // 2. Returning to app (pageshow / visibilitychange to visible)
    Object.defineProperty(document, "hidden", { value: false, configurable: true });
    window.dispatchEvent(new Event("pageshow"));
    expect(engine.isBackgrounded).toBe(false);
    expect(engine.ctx.state).toBe("running");

    // 3. Pagehide event (e.g. mobile Safari app switch)
    window.dispatchEvent(new Event("pagehide"));
    expect(engine.isBackgrounded).toBe(true);
    expect(engine.ctx.state).toBe("suspended");

    // 4. If muted, returning does not resume context
    engine.setMuted(true);
    engine.handleVisibility(false);
    expect(engine.ctx.state).toBe("suspended");

    // 5. If suspend or resume throws, it is caught safely
    const faultyEngine = new SoundEngine();
    faultyEngine.ctx = {
      state: "running",
      suspend: () => {
        throw new Error("suspend failed");
      },
      resume: () => {
        throw new Error("resume failed");
      },
    };
    expect(() => faultyEngine.handleVisibility(true)).not.toThrow();
    faultyEngine.ctx.state = "suspended";
    expect(() => faultyEngine.handleVisibility(false)).not.toThrow();

    vi.useRealTimers();
  });
});
