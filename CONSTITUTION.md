# Project Constitution — Scripture Games

This constitution establishes the foundational principles, invariants, and quality standards for **Scripture Games**. All current and future development must strictly adhere to these rules.

Rules are organized into numbered **Articles**. Automated checks in `tests/constitution/` cite these article numbers (e.g. "Article 3.5"); when amending this document, keep the numbering and those test names in sync.

---

## Article 1 — Theological Integrity & Content Standards

1. **Word-for-Word Authenticity**: Bible verses presented in all games must strictly reflect authentic, accurate translations (ESV, NET, NKJV, WEB) without paraphrasing, omission, or unauthorized alterations.
2. **Prohibition of Visual Depictions of Jesus**:
   * **Absolute Prohibition**: There shall be **NO visual, illustrated, cartoon, or avatar depictions of Jesus Christ** anywhere in the application (including buddy icons, win cards, victory fanfares, or teasers).
   * Visual avatars and characters are reserved strictly for biblical figures (e.g., David, Solomon, Moses, Paul, Peter, Esther, Ruth, etc.).
   * In levels where Jesus speaks or is referenced (e.g., John 3:16, Matthew 28:19), the buddy avatar must be the human author/narrator (e.g., John, Matthew) or a symbolic item (e.g., scroll, harp, crown).
3. **Thematic Appropriateness**: All verse selections, hints, and cheers must be uplifting, encouraging, child-friendly, and faithful to historic Christian orthodoxy.
4. **Content Structure**: Verse Builder content is exactly **15 chapters × 8 verses = 120 levels**, and every verse must supply reference, hint, cheer, and non-empty text in all 4 translations. Within a chapter, each level features a unique buddy character, and every character key must have an avatar configuration in `Buddy.jsx`.

---

## Article 2 — Privacy & Offline-First Architecture

1. **Zero Tracking / Zero Telemetry**: No third-party trackers, analytics, telemetry SDKs, or external advertising scripts shall be included.
2. **Zero External Backend / Database Requirement**: The application must run 100% client-side in the browser. No login, sign-up, or cloud database is required.
3. **Local Persistence**: Player progress, earned stars, active translation, and audio preferences must be stored exclusively in browser `localStorage`:
   * `scripture_games_stars_v1`: `{ [levelKey: string]: number }`
   * `scripture_games_translation_v1`: string (`"ESV"` | `"NET"` | `"NKJV"` | `"WEB"`)
   * `scripture_games_audio_muted_v1`: boolean string
   * `scripture_games_bgm_vol_v1`: number string (0..100)
   * `scripture_games_sfx_vol_v1`: number string (0..100)
4. **Data Isolation**: Any data migration or schema upgrade must maintain backwards compatibility and prevent data loss for existing players. `localStorage` writes are restricted to the designated keys above — no additional keys may be introduced without amending this article.
5. **Zero External Runtime Dependencies**: The application must load no resources from remote origins at runtime — no CDN scripts, remote fonts, remote images, or external stylesheets. All assets (including fonts) are bundled and self-hosted, and the production deployment enforces this with a same-origin Content-Security-Policy.
6. **True Offline Capability**: A service worker caches the application shell so the app remains fully functional offline after the first visit (installable as a PWA).

---

## Article 3 — Audio & Synthesis Standards

1. **Offline Procedural Audio**: All sound effects (button clicks, paper tearing, pencil scratches, applause, victory fanfares) and background music must be synthesized in real-time via the browser's **Web Audio API**.
2. **Zero External Audio Assets**: No remote MP3, WAV, OGG, or cloud TTS services may be downloaded at runtime. The app must work fully offline on an airplane or without internet.
3. **Child-Friendly Synthesis**: Audio frequencies must remain pleasant, warm, and harmonic (e.g. pentatonic marimba plucks, acoustic triangle/sine tones, and broadband bandpass noise bursts for claps). Harsh square waves, dissonant buzzes, and high-frequency sinusoidal pings are prohibited.
4. **Independent Volume Controls**: Users must have separate, persistent controls for Master Audio Mute, Background Music (BGM), and Sound Effects (SFX).
5. **Default Volume Levels**: For a gentle first-run experience, defaults are **BGM 25%** and **SFX 50%** (exported as `DEFAULT_BGM_VOL` / `DEFAULT_SFX_VOL` in `SoundEngine.js`).

---

## Article 4 — UI, UX & Visual Aesthetics

1. **Rich Papercraft & Tactile Aesthetic**: All game interfaces must maintain a cohesive handmade scrapbook visual language:
   * Torn-paper edges (`clip-path: polygon(...)`)
   * Subtle washi-tape decals
   * Soft, organic drop shadows and warm textured cardboards
   * Gentle micro-animations (paper floating, pencil writing strokes, celebratory confetti)
2. **No Placeholder Content**: No placeholder images, unstyled buttons, or generic default colors (e.g., browser-default red/blue). All components must use curated, harmonious color palettes.
3. **Accessibility & Clarity**:
   * Clear typography with high contrast (e.g. `'Schoolbell'`, `'Patrick Hand'`, system sans-serif fallbacks).
   * All interactive buttons must have distinct `aria-label`s for screen readers.
   * Responsive layout that scales gracefully on mobile phones, tablets, and desktop displays.

---

## Article 5 — Coding Principles & Quality Standards

1. **Pure Functions & Immutability**: State updates in React must always produce new object/array copies without mutating existing state.
2. **Single Source of Truth**: Progress data (`stars`), active translation, audio mute, and volume levels reside in `App.jsx` and persist to designated `localStorage` keys.
3. **Strict 100% Universal Test Coverage Standard**:
   * Every single source file in the repository (across data, utilities, common UI, procedural Web Audio, gameplay screens, and application orchestrator) must maintain **100.00% test coverage** (lines, functions, branches, statements).
   * **Automated Quality Gate**: Run `npm run check` before any production deployment (which strictly enforces ESLint with zero errors, 100% universal test coverage threshold enforcement, and all constitutional invariants).
4. **Clean Code & No Dead Code**: Remove unused imports, abandoned variables, and debug leftovers immediately. Code must pass `npm run lint` cleanly.
5. **Clean Builds**: The application must build cleanly via `npm run build` with 0 warnings and 0 runtime errors.

---

## Article 6 — Living Documentation

`CLAUDE.md` and `CONSTITUTION.md` are living documents that must stay synchronized with the codebase, including the article numbers cited by `tests/constitution/`.
