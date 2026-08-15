# CLAUDE.md — Bible Games Developer Guide

This file provides guidance to AI coding assistants and developers working with code in this repository.

## What This Is

A child-friendly suite of Christian educational web games built with **React 19**, **Vite**, and procedural **Web Audio API**. The flagship game, **Verse Builder**, features 120 key Bible verses across 15 thematic chapters in 4 translations (ESV, NET, NKJV, WEB) using a tactile torn-paper scrapbook aesthetic.

---

## Development Commands

```bash
npm run dev            # Start local development server (Vite on port 5173)
npm run lint           # Run ESLint across all source and test files
npm run lint:fix       # Automatically fix lint issues
npm run build          # Type/bundle check + Vite build → dist/
npm run preview        # Preview production build locally
npm test               # Run all unit and constitutional test suites (Vitest)
npm run test:watch     # Run tests in interactive watch mode
npm run test:coverage  # Run tests with v8 coverage (enforces coverage thresholds)
npm run check          # Full gate: ESLint + Test coverage enforcement + Vite build
```

---

## Architecture — Layered

```
src/
  data/                → Domain Layer: 15 chapters (120 verses), translation definitions (zero deps)
  audio/               → Infrastructure Layer: SoundEngine.js procedural Web Audio synthesizer
  components/common/   → Presentation Layer: Buddy.jsx (avatars), SettingsModal.jsx, Star.jsx, Confetti.jsx
  components/hub/      → Presentation Layer: GameHub.jsx title screen & game launcher
  games/verse-builder/ → Game Layer: VerseBuilder.jsx, PlayBoard.jsx, WinCard.jsx, ChapterDoneCard.jsx
  App.jsx              → Root Orchestrator: Screen routing, settings state, global CSS & audio sync
```

---

## Constitution & Core Rules

All code changes must conform to [CONSTITUTION.md](file:///Users/uberx/workspace/bible-games/CONSTITUTION.md). Key rules:

- **No Depictions of Christ**: Under no circumstances should visual/cartoon depictions of Jesus Christ be added to `Buddy.jsx`. Avatars represent prophets, apostles, and historical biblical figures only.
- **Unique Avatars per Chapter**: Every chapter features 8 distinct character buddy icons (0 duplicate icons within the same chapter).
- **100% Procedural Audio**: No external audio files. Sound effects and BGM are synthesized in `SoundEngine.js`. Defaults: **BGM: 25%**, **SFX: 50%**.
- **Scriptural Accuracy**: All 120 verses in `src/data/chapters.js` must match authentic biblical text word-for-word across ESV, NET, NKJV, and WEB.
- **Tactile Scrapbook Aesthetic**: Maintain `.vb-*` CSS namespace, warm kraft paper palette, and `Schoolbell`/`Patrick Hand` typography.
- **LocalStorage Keys**:
  - Stars Progress: `bible_games_stars_v1`
  - Active Translation: `bible_games_translation_v1`
  - Audio Mute: `bible_games_audio_muted_v1`
  - BGM Volume: `bible_games_bgm_vol_v1`
  - SFX Volume: `bible_games_sfx_vol_v1`
- **Developer QA Tool**: `SettingsModal.jsx` provides `⚡ Jump to Ch.15 Ending` for testing end-game flows.

Read [CONSTITUTION.md](file:///Users/uberx/workspace/bible-games/CONSTITUTION.md) before making architectural decisions.
