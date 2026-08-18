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
npm run build          # Vite production build → dist/
npm run preview        # Preview production build locally
npm test               # Run all unit and constitutional test suites (Vitest)
npm run test:watch     # Run tests in interactive watch mode
npm run test:coverage  # Run tests with v8 coverage (enforces coverage thresholds)
npm run check          # Full gate — run before every deploy (see below)
npm run test:constitution  # Run only the constitutional gates
npm run test:a11y      # Browser accessibility gate (Playwright + axe, real Chromium)
```

---

### What `npm run check` enforces

`npm run check` = **ESLint → Vitest (all tests + 100% coverage) → Vite build**, and is also the Netlify build command and the CI job, so every gate below runs on every push and deploy:

| Gate | Where | Enforces |
|---|---|---|
| ESLint + `jsx-a11y` (strict) | `eslint.config.js` | Code quality and static accessibility |
| 100% coverage, 4 metrics | `vitest.config.js` thresholds | Article 5.3 |
| Theology & content | `tests/constitution/theology-content.test.js` | Article 1 (verse structure, no forbidden avatars, every story character has an avatar) |
| Storage & privacy | `tests/constitution/storage-architecture.test.js` | Article 2 (only the 5 keys, no external URLs) |
| Audio | `tests/constitution/audio-offline.test.js` | Article 3 (no audio files, default volumes) |
| Design system | `tests/constitution/design-system.test.js` | Article 4 (tokens, no cross-stylesheet duplicates, **no undefined classNames**, **no raw hex colors**, no synthetic bold, 13px floor, WCAG contrast) |
| Accessibility (jsdom) | `tests/constitution/a11y.test.jsx` | Article 4.3 — axe over every screen **and every interactive state**, plus contrast measured on the rendered DOM (ancestors and alpha composited). Meta-gates fail if a game module or a design-system state is never audited |
| Accessibility (browser) | `tests/browser/a11y.spec.js`, run by `npm run test:a11y` | Article 4.3 in real Chromium at desktop and tablet sizes, with axe's own colour-contrast rule enabled — it sees opacity, filters and compositing that jsdom cannot. Runs as its own CI job (needs a browser download), not part of `npm run check` |

---

## 3. Architecture & Tech Stack

* **Frontend Framework**: React 19 (Hooks-only, pure functional components)
* **Build Tool**: Vite 6
* **Styling**: Vanilla CSS with torn-paper clip paths and responsive layout. The palette is defined once as CSS custom properties in the `:root` block of `globalCss` (`src/App.jsx`) — always use `var(--token)` for shared colors, and never define the same class in two stylesheets (see CONSTITUTION.md Article 4)
* **Audio Engine**: Pure procedural Web Audio synthesizer (`SoundEngine.js`) — zero external MP3s or network dependencies
* **Testing & Gates**: Vitest 4 + `@vitest/coverage-v8` + ESLint 9

---

## 4. Constitutional Invariants & Compliance

All code changes must conform to [CONSTITUTION.md](CONSTITUTION.md). Key rules:

* **Scripture Invariance**: Verses in `src/data/chapters.js` must accurately match official text across ESV, NET, NKJV, and WEB.
* **Depiction Rule**: Absolute prohibition against cartoon or visual avatars of Jesus Christ.
* **Audio Rule**: 100% synthesized Web Audio for all sound effects and background music.
* **Offline Storage Rule**: Pure client-side `localStorage`:
  - Stars Progress: `scripture_games_stars_v1` — one flat map shared by all games: Verse Builder keys are `"{chapterId}-{levelIdx}"`, Memory Match keys are `"mm-{deckId}-{modeIdx}"`, Story Sequencer keys are `"ss-{storyId}"`. New games must namespace their keys; totals are computed by prefix-filtering.
  - Active Translation: `scripture_games_translation_v1`
  - Audio Mute: `scripture_games_audio_muted_v1`
  - BGM Volume: `scripture_games_bgm_vol_v1`
  - SFX Volume: `scripture_games_sfx_vol_v1`
* **Test Coverage Standard**: Strict 100% coverage on all metrics (statements, branches, functions, lines) enforced via `npm run check`.

Read [CONSTITUTION.md](CONSTITUTION.md) before making architectural decisions.

---

## 5. Test Layout

* `tests/unit/` — behavioral unit tests for components, gameplay, audio engine, and app orchestration.
* `tests/constitution/` — self-enforcing checks of [CONSTITUTION.md](CONSTITUTION.md) invariants (content structure, storage keys, offline audio, external-dependency bans). These tests encode constitutional articles by number; **never delete or weaken one to make a change pass** — if an invariant must change, amend CONSTITUTION.md first and keep the two in sync.

---

## 6. Deployment

Hosted on **Netlify** (see `netlify.toml`). The deploy build command is `npm run check`, so every deploy re-runs the full quality gate (ESLint, 100% coverage, constitutional tests, Vite build). Security headers, including a strict same-origin Content-Security-Policy, are set in `netlify.toml`. A GitHub Actions workflow (`.github/workflows/check.yml`) runs the same gate on every push and pull request.
