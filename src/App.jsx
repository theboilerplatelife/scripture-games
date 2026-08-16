import { useState, useEffect } from "react";
import { audio, DEFAULT_BGM_VOL, DEFAULT_SFX_VOL } from "./audio/SoundEngine.js";
import { DEFAULT_TRANSLATION } from "./data/translations.js";
import { GameHub } from "./games/hub/GameHub.jsx";
import { VerseBuilder } from "./games/verse-builder/VerseBuilder.jsx";
import { SettingsModal } from "./components/common/SettingsModal.jsx";
import { WelcomeSplash } from "./components/common/WelcomeSplash.jsx";

const STORAGE_STARS_KEY = "scripture_games_stars_v1";
const STORAGE_TRANS_KEY = "scripture_games_translation_v1";
const STORAGE_AUDIO_KEY = "scripture_games_audio_muted_v1";
const STORAGE_BGM_VOL_KEY = "scripture_games_bgm_vol_v1";
const STORAGE_SFX_VOL_KEY = "scripture_games_sfx_vol_v1";

export default function App() {
  // Global Navigation: "hub" | "verse-builder"
  const [activeGame, setActiveGame] = useState("hub");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

  const handleUserInteract = () => {
    audio.init();
  };

  const handleToggleMusic = () => {
    setMusicOn((prev) => !prev);
  };

  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div className="vb-root" onClick={handleUserInteract}>
      <style>{globalCss}</style>

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
  --slate: #3e7cb1;        /* pencil blue: references & counts */
  --ink: #2b2621;          /* heavy pencil ink */
  --ink-soft: #4a4238;     /* body ink */
  --sand: #d5c8b2;         /* dashed rules & borders */
  --tape: rgba(250, 228, 158, 0.75); /* washi tape */
}

*, *::before, *::after {
  box-sizing: border-box;
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
  background: var(--leaf);
  border: none;
  padding: 10px 22px 8px;
  cursor: pointer;
  clip-path: polygon(2% 10%, 50% 0%, 98% 8%, 100% 85%, 55% 100%, 0% 92%);
  box-shadow: 0 3px 7px rgba(0,0,0,0.2);
  transition: transform 0.12s ease, background 0.15s ease;
}
.vb-btn:hover {
  background: var(--leaf-bright);
  transform: scale(1.03);
}
.vb-btn.ghost {
  background: #b08d57;
}
.vb-btn.ghost:hover {
  background: #be9b65;
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
  color: #7a7065;
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
  color: #635b50;
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
  background: #f8f4e6;
  border-color: var(--vermilion);
}
.vb-trans-card.active {
  border-color: var(--leaf);
  background: #f2f7ee;
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
  font-weight: bold;
  color: var(--ink);
}
.vb-trans-badge {
  font-size: 12px;
  color: var(--leaf);
}
.vb-trans-name {
  font-size: 14px;
  font-weight: bold;
  color: var(--ink-soft);
  margin-top: 2px;
}
.vb-trans-tagline {
  font-size: 12px;
  color: #7a7065;
  margin-top: 2px;
}
.vb-trans-check {
  display: inline-block;
  font-size: 12px;
  color: var(--leaf);
  font-weight: bold;
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
  background: var(--leaf);
  color: var(--paper);
  transition: all 0.15s ease;
}
.vb-toggle-switch.off {
  background: #888;
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
  background: #fbe5e0;
  border: 1px dashed var(--vermilion);
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.vb-reset-btn:hover {
  background: #fad5ce;
}

/* ---- Victory Card Listen Button ---- */
.vb-listen-btn {
  font-family: 'Schoolbell', cursive;
  font-size: 16px;
  color: #2b593f;
  background: #e5f4e3;
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
  background: #d4edd0;
  transform: scale(1.04);
}
.vb-listen-btn.active {
  background: #c3e5bd;
  box-shadow: 0 0 0 2px rgba(92, 138, 58, 0.4);
}
.vb-listen-btn:disabled,
.vb-listen-btn.disabled {
  opacity: 0.55;
  cursor: not-allowed;
  background: #ece8df;
  border-color: #beb6a6;
  color: #7b7264;
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
  color: var(--vermilion);
  font-weight: bold;
}
.vb-range-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #e4dbc9;
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
}
`;
