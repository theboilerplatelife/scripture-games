# CLAUDE.md — Scripture Games Developer Guide

This document provides guidelines and commands for developing **Scripture Games**.

---

## 1. Project Overview

A child-friendly suite of Christian educational web games built with **React 19**, **Vite**, and procedural **Web Audio API**. The flagship game, **Verse Builder**, features 120 key Bible verses across 15 thematic chapters in 4 translations (ESV, NET, NKJV, WEB) using a tactile torn-paper scrapbook aesthetic.

---

## 2. Developer Commands

```bash
npm run dev            # Start local development server (Vite on port 5173)
npm run lint           # Run ESLint across all source and test files
npm run lint:fix       # Automatically fix lint issues
npm run build          # Type/bundle check + Vite build → dist/
npm run preview        # Preview production build locally
npm test               # Run all unit and constitutional test suites (Vitest)
npm run test:watch     # Run tests in interactive watch mode
npm run test:coverage  # Run tests with v8 coverage (enforces coverage thresholds)
npm run check          # Full gate: ESLint + 100% Test coverage enforcement + Vite build
```

---

## 3. Architecture & Tech Stack

* **Frontend Framework**: React 19 (Hooks-only, pure functional components)
* **Build Tool**: Vite 6
* **Styling**: Vanilla CSS with torn-paper clip paths and responsive layout
* **Audio Engine**: Pure procedural Web Audio synthesizer (`SoundEngine.js`) — zero external MP3s or network dependencies
* **Testing & Gates**: Vitest 4 + `@vitest/coverage-v8` + ESLint 9

---

## 4. Constitutional Invariants & Compliance

All code changes must conform to [CONSTITUTION.md](file:///Users/uberx/workspace/bible-games/CONSTITUTION.md). Key rules:

* **Scripture Invariance**: Verses in `src/data/chapters.js` must accurately match official text across ESV, NET, NKJV, and WEB.
* **Depiction Rule**: Absolute prohibition against cartoon or visual avatars of Jesus Christ.
* **Audio Rule**: 100% synthesized Web Audio for all sound effects and background music.
* **Offline Storage Rule**: Pure client-side `localStorage`:
  - Stars Progress: `scripture_games_stars_v1`
  - Active Translation: `scripture_games_translation_v1`
  - Audio Mute: `scripture_games_audio_muted_v1`
  - BGM Volume: `scripture_games_bgm_vol_v1`
  - SFX Volume: `scripture_games_sfx_vol_v1`
* **Test Coverage Standard**: Strict 100% coverage on all metrics (statements, branches, functions, lines) enforced via `npm run check`.

Read [CONSTITUTION.md](file:///Users/uberx/workspace/bible-games/CONSTITUTION.md) before making architectural decisions.
