import { useState, useEffect } from "react";
import { audio, DEFAULT_BGM_VOL, DEFAULT_SFX_VOL } from "./audio/SoundEngine.js";
import { DEFAULT_TRANSLATION } from "./data/translations.js";
import { GameHub } from "./games/hub/GameHub.jsx";
import { VerseBuilder } from "./games/verse-builder/VerseBuilder.jsx";
import { MemoryMatch } from "./games/memory-match/MemoryMatch.jsx";
import { StorySequencer } from "./games/story-sequencer/StorySequencer.jsx";
import { SettingsModal } from "./components/common/SettingsModal.jsx";
import { WelcomeSplash } from "./components/common/WelcomeSplash.jsx";
import { useScrollToTop } from "./components/common/useScrollToTop.js";

const STORAGE_STARS_KEY = "scripture_games_stars_v1";
const STORAGE_TRANS_KEY = "scripture_games_translation_v1";
const STORAGE_AUDIO_KEY = "scripture_games_audio_muted_v1";
const STORAGE_BGM_VOL_KEY = "scripture_games_bgm_vol_v1";
const STORAGE_SFX_VOL_KEY = "scripture_games_sfx_vol_v1";

export default function App() {
  // Global Navigation: "hub" | "verse-builder"
  const [activeGame, setActiveGame] = useState("hub");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useScrollToTop(activeGame);

  // Settings State: Default ESV
  const [translation, setTranslation] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_TRANS_KEY) || DEFAULT_TRANSLATION;
    } catch {
      return DEFAULT_TRANSLATION;
    }
  });

  const [musicOn, setMusicOn] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_AUDIO_KEY) !== "true";
    } catch {
      return true;
    }
  });

  // Volume Sliders (0 to 100)
  const [bgmVol, setBgmVol] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BGM_VOL_KEY);
      return saved !== null ? Number(saved) : DEFAULT_BGM_VOL;
    } catch {
      return DEFAULT_BGM_VOL;
    }
  });

  const [sfxVol, setSfxVol] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SFX_VOL_KEY);
      return saved !== null ? Number(saved) : DEFAULT_SFX_VOL;
    } catch {
      return DEFAULT_SFX_VOL;
    }
  });

  // Stars progress: { "chapId-lvlIdx": number }
  const [stars, setStars] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_STARS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist Stars
  const handleSaveStar = (key, starCount) => {
    setStars((prev) => {
      const next = { ...prev, [key]: Math.max(prev[key] || 0, starCount) };
      try {
        localStorage.setItem(STORAGE_STARS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const [resetCount, setResetCount] = useState(0);

  const handleResetProgress = () => {
    setStars({});
    setResetCount((c) => c + 1);
    try {
      localStorage.removeItem(STORAGE_STARS_KEY);
    } catch {}
  };

  // Persist Translation
  const handleSelectTranslation = (newTrans) => {
    setTranslation(newTrans);
    try {
      localStorage.setItem(STORAGE_TRANS_KEY, newTrans);
    } catch {}
  };

  // Sync Audio Mute & Volume
  useEffect(() => {
    audio.setMuted(!musicOn);
    try {
      localStorage.setItem(STORAGE_AUDIO_KEY, (!musicOn).toString());
    } catch {}
  }, [musicOn]);

  useEffect(() => {
    audio.setBgmVolume(bgmVol / 100);
    try {
      localStorage.setItem(STORAGE_BGM_VOL_KEY, bgmVol.toString());
    } catch {}
  }, [bgmVol]);

  useEffect(() => {
    audio.setSfxVolume(sfxVol / 100);
    try {
      localStorage.setItem(STORAGE_SFX_VOL_KEY, sfxVol.toString());
    } catch {}
  }, [sfxVol]);

  useEffect(() => {
    // Attempt auto-init immediately on mount in case browser allows autoplay
    audio.init();

    // Auto-resume AudioContext on first user interaction anywhere on the window
    const unlockAudio = () => {
      audio.init();
    };

    window.addEventListener("pointerdown", unlockAudio, { passive: true });
    window.addEventListener("keydown", unlockAudio, { passive: true });
    window.addEventListener("touchstart", unlockAudio, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  const handleToggleMusic = () => {
    setMusicOn((prev) => !prev);
  };

  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div className="vb-root">
      <style>{globalCss}</style>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="diorama-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#1d2138" floodOpacity="0.4" />
          </filter>
        </defs>
      </svg>

      {/* Screen 0: Tap to Play Welcome Screen */}
      {!hasStarted ? (
        <WelcomeSplash
          onStart={() => {
            audio.init();
            setHasStarted(true);
          }}
        />
      ) : (
        <>
          {/* Screen 1: Game Hub (Title Menu) */}
          {activeGame === "hub" && (
            <GameHub
              onSelectGame={(gameId) => {
                setActiveGame(gameId);
              }}
              onOpenSettings={() => {
                audio.playSettingsChime();
                setIsSettingsOpen(true);
              }}
              translation={translation}
              allStars={stars}
            />
          )}

          {/* Screen 2: Verse Builder Game */}
          {activeGame === "verse-builder" && (
            <VerseBuilder
              key={`vb-${resetCount}`}
              stars={stars}
              onSaveStar={handleSaveStar}
              translation={translation}
              onBackToHub={() => {
                setActiveGame("hub");
              }}
              onOpenSettings={() => {
                audio.playSettingsChime();
                setIsSettingsOpen(true);
              }}
            />
          )}

          {/* Screen 3: Memory Match Game */}
          {activeGame === "memory-match" && (
            <MemoryMatch
              key={`mm-${resetCount}`}
              stars={stars}
              onSaveStar={handleSaveStar}
              translation={translation}
              onBackToHub={() => {
                setActiveGame("hub");
              }}
              onOpenSettings={() => {
                audio.playSettingsChime();
                setIsSettingsOpen(true);
              }}
            />
          )}

          {/* Screen 4: Story Sequencer Game */}
          {activeGame === "story-sequencer" && (
            <StorySequencer
              key={`ss-${resetCount}`}
              stars={stars}
              onSaveStars={handleSaveStar}
              onBackToHub={() => {
                setActiveGame("hub");
              }}
              onOpenSettings={() => {
                audio.playSettingsChime();
                setIsSettingsOpen(true);
              }}
            />
          )}
        </>
      )}

      {/* Global Settings & Translation Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        translation={translation}
        onSelectTranslation={handleSelectTranslation}
        musicOn={musicOn}
        onToggleMusic={handleToggleMusic}
        bgmVol={bgmVol}
        onChangeBgmVol={setBgmVol}
        sfxVol={sfxVol}
        onChangeSfxVol={setSfxVol}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}

/* ============================================================
   GLOBAL STYLES & SCRAPBOOK DESIGN SYSTEM
   ============================================================ */
const globalCss = `
/* Self-hosted fonts (SIL OFL) — Constitution Article 2.5: zero external runtime dependencies */
@font-face {
  font-family: 'Patrick Hand';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/patrick-hand-latin.woff2') format('woff2');
}
@font-face {
  font-family: 'Schoolbell';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/schoolbell-latin.woff2') format('woff2');
}

/* ---- Design Tokens: the single source for the scrapbook palette ---- */
:root {
  --paper: #fdfaf1;        /* cream cardstock */
  --paper-bright: #fffef8; /* fresh scrap highlight */
  --kraft: #c9a06b;        /* kraft-paper desk */
  --vermilion: #d94f30;    /* marker red: titles & primary actions */
  --vermilion-deep: #a33520;
  --leaf: #5c8a3a;         /* leaf green: success & go */
  --leaf-bright: #689e42;
  --leaf-hover: #527d33;   /* still AA against paper text */
  --slate: #3e7cb1;        /* pencil blue: large text and rules only */
  --slate-deep: #2f6394;   /* slate at small-text contrast */
  --ink: #2b2621;          /* heavy pencil ink */
  --ink-soft: #4a4238;     /* body ink */
  --sand: #d5c8b2;         /* dashed rules & borders */
  --tape: rgba(250, 228, 158, 0.75); /* washi tape */

  /* Semantic states — every game draws feedback from this one set */
  --leaf-deep: #46702c;      /* success text on paper */
  --ink-muted: #635b50;      /* secondary/small text */
  --ink-soft-2: #5a5246;     /* card body copy */
  --ink-faint: #6b655d;      /* disabled badges */
  --slate-pencil: #aac4e0;   /* notebook rule lines */
  --sand-deep: #b9ac95;      /* dashed outlines */
  --clay: #6d6255;           /* muted captions */
  --amber: #c98a1b;          /* hints & highlights */
  --amber-deep: #8c6d1f;
  --amber-tint: #fff4d6;
  --highlighter: #ffe25c;    /* marker yellow for selection outlines */
  --rust: #8c4a32;           /* warm warning text */
  --rust-deep: #a34328;
  --moss: #385a24;           /* deep success text */

  /* Paper tints for state washes */
  --tint-leaf: #f2f7ee;
  --tint-vermilion: #fbe5e0;
  --tint-vermilion-strong: #fbd6ce;
  --tint-amber: #fff8e8;
  --tint-vermilion-deep: #682717;
  --tint-vermilion-hover: #fad5ce;
  --tint-leaf-soft: #e5f4e3;
  --tint-leaf-hover: #d4edd0;
  --tint-leaf-strong: #c3e5bd;

  /* Interface surfaces */
  --forest: #2b593f;         /* listen-button text */
  --gold-deep: #6d5312;      /* small text on amber washes */
  --kraft-2: #8a6a39;        /* ghost button */
  --kraft-2-hover: #7d5f33;
  --sand-2: #beb6a6;         /* disabled borders */
  --sand-light: #e4dbc9;     /* slider track */
  --paper-hover: #f8f4e6;
  --paper-disabled: #ece8df;
  --ink-disabled: #7b7264;
  --toggle-off: #6b6b6b;
}

*, *::before, *::after {
  box-sizing: border-box;
}

/* ---- Keyboard focus: a dashed marker ring, on theme with the notebook ---- */
button:focus-visible,
input:focus-visible,
[tabindex]:focus-visible {
  outline: 3px dashed var(--vermilion);
  outline-offset: 3px;
}

/* Clip-path clips outlines, so torn-paper controls get a vermilion halo
   that follows their torn edge instead. */
.vb-btn:focus-visible,
.vb-back:focus-visible,
.vb-music-toggle:focus-visible,
.hub-game-card:focus-visible,
.vb-chapter-card:focus-visible,
.vb-level-card:focus-visible,
.mm-card:focus-visible,
.mm-mode-card:focus-visible,
.splash-start-btn:focus-visible {
  outline: none;
  filter:
    drop-shadow(2px 0 0 var(--vermilion))
    drop-shadow(-2px 0 0 var(--vermilion))
    drop-shadow(0 2px 0 var(--vermilion))
    drop-shadow(0 -2px 0 var(--vermilion));
}

body {
  margin: 0;
  padding: 0;
  background: var(--kraft);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.vb-root {
  min-height: 100vh;
  font-family: 'Patrick Hand', 'Comic Sans MS', cursive;
  color: var(--ink-soft);
  background:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 40%),
    radial-gradient(circle at 80% 90%, rgba(0,0,0,0.08), transparent 40%),
    repeating-linear-gradient(87deg, rgba(0,0,0,0.025) 0 3px, transparent 3px 9px),
    var(--kraft);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 12px 48px;
  overflow-x: hidden;
  position: relative;
}

/* ---- Washi Tape Decor ---- */
.vb-tape {
  position: absolute;
  background: var(--tape);
  box-shadow: 0 1px 2px rgba(0,0,0,0.12);
  transform: rotate(-3deg);
  pointer-events: none;
}
.vb-tape-top {
  top: -9px;
  left: 50%;
  margin-left: -34px;
  width: 68px;
  height: 18px;
}
.vb-tape-mini {
  top: -7px;
  left: 50%;
  margin-left: -16px;
  width: 32px;
  height: 11px;
  transform: rotate(4deg);
}

/* ---- Buttons & Controls ---- */
.vb-music-toggle {
  background: var(--paper);
  border: none;
  font-family: 'Schoolbell', cursive;
  font-size: 15px;
  color: var(--ink-soft);
  cursor: pointer;
  padding: 7px 14px 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  clip-path: polygon(3% 6%, 97% 2%, 100% 92%, 2% 98%);
  box-shadow: 0 2px 6px rgba(0,0,0,0.18);
  transform: rotate(2deg);
  transition: transform 0.15s ease, background 0.15s ease;
  position: relative;
}
.vb-music-toggle:hover {
  transform: rotate(0deg) scale(1.04);
  background: var(--paper-bright);
}
.vb-music-toggle:active {
  transform: scale(0.95);
}

.vb-back {
  background: var(--paper);
  border: none;
  font-size: 22px;
  font-family: inherit;
  width: 42px;
  height: 42px;
  cursor: pointer;
  color: var(--ink-soft);
  clip-path: polygon(8% 2%, 95% 0%, 100% 90%, 4% 100%);
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.12s ease;
}
.vb-back:hover {
  transform: scale(1.06);
}
.vb-back:active {
  transform: scale(0.94);
}

.vb-btn {
  font-family: 'Schoolbell', cursive;
  font-size: 20px;
  color: var(--paper);
  background: var(--leaf-deep);
  border: none;
  padding: 10px 22px 8px;
  cursor: pointer;
  clip-path: polygon(2% 10%, 50% 0%, 98% 8%, 100% 85%, 55% 100%, 0% 92%);
  box-shadow: 0 3px 7px rgba(0,0,0,0.2);
  transition: transform 0.12s ease, background 0.15s ease;
}
.vb-btn:hover {
  background: var(--leaf-hover);
  transform: scale(1.03);
}
.vb-btn.ghost {
  background: var(--kraft-2);
}
.vb-btn.ghost:hover {
  background: var(--kraft-2-hover);
}
.vb-btn:active {
  transform: scale(0.95);
}

/* ---- Title Card & Shared Text ---- */
.vb-title-card {
  position: relative;
  background: var(--paper);
  padding: 22px 34px 16px;
  margin-top: 10px;
  transform: rotate(-1.5deg);
  clip-path: polygon(2% 4%, 30% 0%, 68% 3%, 98% 1%, 100% 30%, 97% 66%, 100% 96%, 60% 100%, 28% 97%, 0% 100%, 2% 60%);
  box-shadow: 0 4px 10px rgba(0,0,0,0.18);
  text-align: center;
  max-width: 480px;
  width: 100%;
}
.vb-title-card h1 {
  font-family: 'Schoolbell', cursive;
  font-size: 46px;
  line-height: 0.95;
  margin: 0;
  color: var(--vermilion);
  text-shadow: 1px 1px 0 rgba(0,0,0,0.08);
}
.vb-sub {
  margin: 8px 0 0;
  text-align: center;
  font-size: 18px;
}
.vb-note {
  margin: 16px 8px 4px;
  font-size: 16px;
  text-align: center;
  background: rgba(253,250,241,0.6);
  padding: 4px 12px;
  border-radius: 4px;
  transform: rotate(0.5deg);
}
.vb-total {
  margin-top: 24px;
  font-size: 17px;
  background: rgba(253,250,241,0.7);
  padding: 4px 16px;
  border-radius: 4px;
}

/* ---- Settings Modal ---- */
.vb-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}
.vb-modal-card {
  position: relative;
  background: var(--paper);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px 22px 20px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.3);
  clip-path: polygon(1% 2%, 99% 1%, 100% 98%, 1.5% 99%);
  transform: rotate(-0.5deg);
}
.vb-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px dashed var(--sand);
  padding-bottom: 8px;
  margin-bottom: 14px;
}
.vb-modal-title {
  font-family: 'Schoolbell', cursive;
  font-size: 26px;
  color: var(--vermilion);
  margin: 0;
}
.vb-modal-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--ink-muted);
  padding: 4px 8px;
}
.vb-settings-section {
  margin-bottom: 18px;
}
.vb-settings-heading {
  font-family: 'Schoolbell', cursive;
  font-size: 19px;
  color: var(--ink);
  margin: 0 0 4px;
}
.vb-settings-desc {
  font-size: 15px;
  color: var(--ink-muted);
  margin: 0 0 10px;
}
.vb-trans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
.vb-trans-card {
  background: var(--paper-bright);
  border: 1.5px solid var(--sand);
  padding: 10px 12px;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s ease;
  color: inherit;
  font-family: inherit;
}
.vb-trans-card:hover {
  background: var(--paper-hover);
  border-color: var(--vermilion);
}
.vb-trans-card.active {
  border-color: var(--leaf);
  background: var(--tint-leaf);
  box-shadow: 0 0 0 2px rgba(92, 138, 58, 0.35);
}
.vb-trans-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.vb-trans-tag {
  font-family: 'Schoolbell', cursive;
  font-size: 18px;
  color: var(--ink);
}
.vb-trans-badge {
  font-size: 13px;
  color: var(--leaf-deep);
}
.vb-trans-name {
  font-size: 15px;
  color: var(--ink-soft);
  margin-top: 2px;
}
.vb-trans-tagline {
  font-size: 13px;
  color: var(--ink-muted);
  margin-top: 2px;
}
.vb-trans-check {
  display: inline-block;
  font-size: 13px;
  color: var(--leaf-deep);
  margin-top: 4px;
}
.vb-setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  padding: 8px 0;
}
.vb-toggle-switch {
  font-family: 'Schoolbell', cursive;
  font-size: 15px;
  padding: 6px 14px;
  border: 1px solid var(--sand);
  border-radius: 20px;
  cursor: pointer;
  background: var(--leaf-deep);
  color: var(--paper);
  transition: all 0.15s ease;
}
.vb-toggle-switch.off {
  background: var(--toggle-off);
}
.vb-modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
  border-top: 1px dashed var(--sand);
  padding-top: 12px;
}
.vb-reset-btn {
  font-family: 'Schoolbell', cursive;
  font-size: 14px;
  color: var(--vermilion-deep);
  background: var(--tint-vermilion);
  border: 1px dashed var(--vermilion);
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.vb-reset-btn:hover {
  background: var(--tint-vermilion-hover);
}

/* ---- Victory Card Listen Button ---- */
.vb-listen-btn {
  font-family: 'Schoolbell', cursive;
  font-size: 16px;
  color: var(--forest);
  background: var(--tint-leaf-soft);
  border: 1.5px dashed var(--leaf);
  padding: 6px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin: 4px auto 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s ease;
}
.vb-listen-btn:hover:not(:disabled) {
  background: var(--tint-leaf-hover);
  transform: scale(1.04);
}
.vb-listen-btn.active {
  background: var(--tint-leaf-strong);
  box-shadow: 0 0 0 2px rgba(92, 138, 58, 0.4);
}
.vb-listen-btn:disabled,
.vb-listen-btn.disabled {
  opacity: 0.55;
  cursor: not-allowed;
  background: var(--paper-disabled);
  border-color: var(--sand-2);
  color: var(--ink-muted);
  transform: none !important;
  box-shadow: none !important;
}

.vb-setting-row.disabled-row {
  opacity: 0.5;
}
.vb-setting-row.disabled-row button,
.vb-setting-row.disabled-row input {
  cursor: not-allowed;
}

/* ---- Volume Range Sliders in Settings ---- */
.vb-setting-row.slider-row {
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
  padding: 10px 0 6px;
  border-top: 1px dashed rgba(213, 200, 178, 0.6);
}
.vb-slider-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
}
.vb-slider-val {
  font-family: 'Schoolbell', cursive;
  font-size: 16px;
  color: var(--vermilion-deep);
}
.vb-range-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: var(--sand-light);
  outline: none;
  margin: 4px 0;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.vb-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--leaf);
  border: 2px solid var(--paper);
  box-shadow: 0 2px 5px rgba(0,0,0,0.25);
  cursor: pointer;
  transition: transform 0.1s ease, background 0.15s ease;
}
.vb-range-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  background: var(--leaf-bright);
}
.vb-range-slider::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--leaf);
  border: 2px solid var(--paper);
  box-shadow: 0 2px 5px rgba(0,0,0,0.25);
  cursor: pointer;
}
.vb-range-slider:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* SVGs are inline by default, which leaves a baseline gap under them */
.vb-pencil-svg {
  display: block;
}

/* ---- Win card as a modal over the finished board (shared) ---- */
.vb-win-overlay {
  position: fixed;
  inset: 0;
  z-index: 900;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow-y: auto;
}

.vb-win-overlay .vb-win-card {
  max-width: 460px;
  width: 100%;
}

.vb-win-icon {
  font-size: 52px;
  line-height: 1;
  margin: 2px 0 4px;
}

.vb-win-title {
  font-family: 'Schoolbell', cursive;
  font-size: 28px;
  color: var(--vermilion);
  margin: 0 0 6px;
  line-height: 1.05;
}

.vb-win-sub {
  font-size: 17px;
  color: var(--ink-soft);
  margin: 0 0 12px;
}

/* ---- Personal best line on win cards ---- */
.vb-win-best {
  font-family: 'Schoolbell', cursive;
  font-size: 15px;
  color: var(--slate-deep);
  margin: -2px 0 10px;
}

/* ---- Completion Stamp (shared by chapter & deck select cards) ---- */
.vb-stamp {
  position: absolute;
  top: 34px;
  right: 8px;
  z-index: 3;
  font-family: 'Schoolbell', cursive;
  font-size: 13px;
  color: var(--leaf-deep);
  border: 2px dashed var(--leaf);
  border-radius: 6px;
  padding: 2px 8px;
  transform: rotate(6deg);
  background: rgba(242, 247, 238, 0.92);
  pointer-events: none;
}

.vb-stamp.perfect {
  color: var(--gold-deep);
  border-color: var(--amber);
  background: rgba(255, 244, 214, 0.94);
}

/* ---- Confetti ---- */
.vb-confetti {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}
.vb-confetti span {
  position: absolute;
  top: -30px;
  display: block;
  animation-name: vb-fall;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
@keyframes vb-fall {
  to { transform: translateY(110vh) rotate(var(--rot)); opacity: 0.9; }
}

@media (prefers-reduced-motion: reduce) {
  .vb-confetti span, .vb-slot.pop .vb-scrap, .vb-slot.shake .vb-scrap, .vb-scrap.writing, .vb-word-text.writing { animation: none !important; }
  .vb-pencil-writer { display: none !important; }
  .vb-scrap-btn, .vb-level-card, .vb-btn, .hub-game-card, .vb-chapter-card { transition: none !important; }
  .art-twinkle, .art-flicker, .art-drift, .art-ripple, .art-scene-mount, .art-spin-slow, .art-pulse, .art-bob, .art-fall, .art-sway, .art-breathe, .art-rock, .art-camera-drift { animation: none !important; opacity: 1 !important; transform: none !important; }
}

/* ---- SVG Art Enhancements ---- */
.art-twinkle {
  animation: art-twinkle-anim 3s infinite alternate ease-in-out;
}
@keyframes art-twinkle-anim {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}

.art-flicker {
  animation: art-flicker-anim 0.2s infinite alternate ease-in-out;
  transform-origin: center;
}
@keyframes art-flicker-anim {
  0% { opacity: 0.8; transform: scale(0.98); }
  100% { opacity: 1; transform: scale(1.02); }
}

.art-drift {
  animation: art-drift-anim 12s infinite alternate linear;
}
@keyframes art-drift-anim {
  0% { transform: translateX(-4px); }
  100% { transform: translateX(4px); }
}

.art-ripple {
  animation: art-ripple-anim 3s infinite alternate ease-in-out;
}
@keyframes art-ripple-anim {
  0% { transform: translateX(-2px); }
  100% { transform: translateX(2px); }
}

.art-scene-mount {
  animation: art-scene-mount-anim 0.6s ease-out forwards;
  opacity: 0;
}
@keyframes art-scene-mount-anim {
  0% { opacity: 0; transform: translateY(4px); }
  100% { opacity: 1; transform: translateY(0); }
}

.art-spin-slow {
  animation: art-spin-slow-anim 40s infinite linear;
  transform-origin: center;
}
@keyframes art-spin-slow-anim {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.art-pulse {
  animation: art-pulse-anim 4s infinite alternate ease-in-out;
}
@keyframes art-pulse-anim {
  0% { opacity: 0.3; }
  100% { opacity: 0.8; }
}

.art-bob {
  animation: art-bob-anim 3s infinite alternate ease-in-out;
}
@keyframes art-bob-anim {
  0% { transform: translateY(-2px); }
  100% { transform: translateY(2px); }
}

.art-fall {
  animation: art-fall-anim 0.8s infinite linear;
}
@keyframes art-fall-anim {
  0% { transform: translateY(-10px); opacity: 0; }
  20% { opacity: 0.6; }
  80% { opacity: 0.6; }
  100% { transform: translateY(15px); opacity: 0; }
}

.art-sway {
  animation: art-sway-anim 4s infinite alternate ease-in-out;
  transform-origin: 0 0;
}
@keyframes art-sway-anim {
  0% { transform: rotate(-3deg); }
  100% { transform: rotate(3deg); }
}

.art-breathe {
  animation: art-breathe-anim 3.5s infinite alternate ease-in-out;
  transform-origin: 0 0;
}
@keyframes art-breathe-anim {
  0% { transform: scaleY(0.97); }
  100% { transform: scaleY(1.02); }
}

.art-rock {
  animation: art-rock-anim 6s infinite alternate ease-in-out;
  transform-origin: 0 0;
}
@keyframes art-rock-anim {
  0% { transform: rotate(-2.5deg); }
  100% { transform: rotate(2.5deg); }
}

.art-camera-drift {
  animation: art-camera-drift-anim 12s infinite alternate ease-in-out;
  transform-origin: center;
}
@keyframes art-camera-drift-anim {
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.05) translate(-2px, 1px); }
}
`;
