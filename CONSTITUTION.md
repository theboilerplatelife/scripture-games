# Project Constitution — Bible Games

This document defines the architectural principles, theological guidelines, and engineering rules that govern all code in this repository. Every change — feature, fix, or refactor — must conform to these rules. When in doubt, the constitution wins.

---

## 1. Theological & Content Integrity

### Article 1.1: Scriptural Fidelity & Translation Accuracy
1. **Word-for-Word Authenticity**: Bible verses presented in all games must strictly reflect authentic, accurate translations (ESV, NET, NKJV, WEB) without paraphrasing, omission, or unauthorized alterations.
2. **Translation Support**: The application shall maintain support for major reputable translations, defaulting to the English Standard Version (ESV).
3. **Punctuation & Splitting Integrity**: Word-scraps in puzzle games must preserve clean punctuation and proper nouns so verses read naturally upon assembly.

### Article 1.2: Visual & Depiction Ethics
1. **Reverence for Christ**: In honoring our Lord, the application shall **never generate or display visual/cartoon depictions of the person of Jesus Christ**. Avatars and illustrations are strictly reserved for prophets, apostles, and historical biblical figures (e.g., Paul, John, David, Moses, Ruth, Esther, Samuel).
2. **Character Uniqueness**: Within any given chapter, each level (1–8) must feature a **unique biblical character icon** (0 duplicates per chapter) to celebrate the diversity of scripture heroes.
3. **Encouraging Tone**: Player feedback must be uplifting, patient, and celebratory. No punitive sound effects or negative messaging upon incorrect attempts.

### Article 1.3: Child-Safe & Family-First Experience
1. **Zero Tracking & Privacy**: No personal data collection, zero third-party tracking beacons, zero advertising, and zero dark patterns.
2. **100% Client-Side & Offline-First**: All core gameplay, procedural audio synthesis, and character graphics execute entirely in the browser without mandatory network requests or streaming assets.

---

## 2. Layered Architecture

The codebase follows a modular architecture separating data, presentation, game orchestration, and infrastructure:

```
┌─────────────────────────────────────┐
│  Presentation Layer                 │  Scrapbook UI, Board, WinCards, Hub, SVG Avatars
├─────────────────────────────────────┤
│  Game Coordination Layer            │  App.jsx, VerseBuilder.jsx, screen navigation
├─────────────────────────────────────┤
│  Domain & Scripture Layer           │  chapters.js (120 verses), translations.js
├─────────────────────────────────────┤
│  Infrastructure & Audio Layer       │  SoundEngine.js (Web Audio API), localStorage
└─────────────────────────────────────┘
```

### Layer Dependency Rules

| Layer | May Import From | Lives In |
|---|---|---|
| **Presentation** | Domain, Game Coordination, Common Components | `src/components/`, `src/games/` |
| **Game Coordination** | Domain, Infrastructure, Presentation | `src/App.jsx`, `src/games/verse-builder/` |
| **Domain** | Self-contained (zero framework dependencies) | `src/data/` |
| **Infrastructure** | Domain, Browser APIs (Web Audio, Storage) | `src/audio/` |

---

## 3. Design System & Aesthetics

1. **Tactile Scrapbook Charm**: All UI components adhere to the handcrafted paper-craft scrapbook aesthetic:
   - Warm kraft paper background (`#c9a06b`, `#b88d57`)
   - Torn paper scraps with slight randomized rotation and drop shadows
   - Masking tape accents (`.vb-tape`)
   - Handwritten typography (`Schoolbell`, `Patrick Hand`)
2. **CSS Conventions**:
   - Class names use the `.vb-*` prefix (Verse Builder namespace).
   - Component styles are cohesive and avoid ad-hoc inline styles for core layouts.
   - Interactive elements must include distinct hover, focus, and disabled states with smooth transitions (`0.15s ease`).

---

## 4. Procedural Audio & Web Audio Framework

1. **Zero External Audio Files**: All music tracks and sound effects are generated procedurally in real time via the Web Audio API (`SoundEngine.js`).
2. **BGM & SFX Gain Separation**:
   - Master Music Bus (`masterGain`): Scaled to `bgmVol * 0.38` (Default: **25%**).
   - Master Sound Effects Bus (`sfxGain`): Scaled to `sfxVol * 0.55` (Default: **50%**).
3. **Acoustic Sound Quality**:
   - Celebratory claps (`playLightApplause`): Broad-spectrum acoustic handclaps ($Q \le 0.85$), free of resonant whistling or electronic sine beeps.
   - Word placement (`playPlaceScrap`): Melodic wooden marimba plucks layered with tactile graphite pencil sketching.
4. **Master Mute & User Controls**: All audio respect the master mute toggle and continuous volume sliders, persisted in `localStorage`.

---

## 5. Coding Principles & Quality Standards

1. **Pure Functions & Immutability**: State updates in React must always produce new object/array copies without mutating existing state.
2. **Single Source of Truth**: Progress data (`stars`), active translation, audio mute, and volume levels reside in `App.jsx` and persist to designated `localStorage` keys.
3. **Strict 100% Universal Test Coverage Standard**:
   * Every single source file in the repository (across data, utilities, common UI, procedural Web Audio, gameplay screens, and application orchestrator) must maintain **100.00% test coverage** (lines, functions, branches, statements).
   * **Automated Quality Gate**: Run `npm run check` before any production deployment (which strictly enforces ESLint with zero errors, 100% universal test coverage threshold enforcement, and all constitutional invariants).
4. **Clean Code & No Dead Code**: Remove unused imports, abandoned variables, and debug leftovers immediately. Code must pass `npm run lint` cleanly.
5. **Clean Builds**: The application must build cleanly via `npm run build` with 0 warnings and 0 runtime errors.

---

## 6. Living Documentation

`CLAUDE.md` and `CONSTITUTION.md` are living documents that must stay synchronized with the codebase.

- Update `CLAUDE.md` whenever commands, file structures, or key conventions change.
- Update `CONSTITUTION.md` whenever architectural rules, theological guidelines, or core standards are modified.
