/* ============================================================
   SOUND ENGINE — Procedural Web Audio Synthesizer & Sequencer
   Dedicated procedural title tunes for Main Hub & each Game mode
   ============================================================ */

export const NOTES = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  C6: 1046.50, D6: 1174.66, E6: 1318.51, F6: 1396.91, G6: 1567.98, A6: 1760.00, B6: 1975.53, C7: 2093.00,
};

// 1. Main Hub Theme: Warm, welcoming, grand acoustic kalimba & harp groove (100 BPM - 64 steps)
export const MAIN_HUB_SONG = {
  bpm: 100,
  steps: 64,
  melody: [
    // Phrase 1 (0-31)
    { s: 0, n: "G4", d: 1.5, v: 0.35 },
    { s: 2, n: "E4", d: 1.5, v: 0.30 },
    { s: 4, n: "G4", d: 1.5, v: 0.35 },
    { s: 6, n: "C5", d: 2.0, v: 0.40 },
    { s: 8, n: "B4", d: 1.5, v: 0.35 },
    { s: 10, n: "A4", d: 1.5, v: 0.30 },
    { s: 12, n: "G4", d: 3.0, v: 0.35 },

    { s: 16, n: "A4", d: 1.5, v: 0.35 },
    { s: 18, n: "F4", d: 1.5, v: 0.30 },
    { s: 20, n: "A4", d: 1.5, v: 0.35 },
    { s: 22, n: "C5", d: 2.0, v: 0.40 },
    { s: 24, n: "G4", d: 1.5, v: 0.35 },
    { s: 26, n: "E4", d: 1.5, v: 0.30 },
    { s: 28, n: "D4", d: 3.0, v: 0.32 },

    // Phrase 2 Variation & Resolution (32-63)
    { s: 32, n: "E5", d: 1.5, v: 0.38 },
    { s: 34, n: "D5", d: 1.0, v: 0.32 },
    { s: 36, n: "C5", d: 1.5, v: 0.35 },
    { s: 38, n: "G4", d: 2.0, v: 0.35 },
    { s: 40, n: "A4", d: 1.5, v: 0.35 },
    { s: 42, n: "C5", d: 1.5, v: 0.38 },
    { s: 44, n: "E5", d: 3.0, v: 0.40 },

    { s: 48, n: "D5", d: 1.5, v: 0.35 },
    { s: 50, n: "B4", d: 1.5, v: 0.32 },
    { s: 52, n: "G4", d: 1.5, v: 0.35 },
    { s: 54, n: "A4", d: 2.0, v: 0.36 },
    { s: 56, n: "B4", d: 1.5, v: 0.35 },
    { s: 58, n: "D5", d: 1.5, v: 0.36 },
    { s: 60, n: "C5", d: 3.5, v: 0.42 },
  ],
  bass: [
    // Phrase 1 (0-31)
    { s: 0, n: "C3", d: 3.5, v: 0.22 },
    { s: 4, n: "E3", d: 3.5, v: 0.18 },
    { s: 8, n: "G3", d: 3.5, v: 0.20 },
    { s: 12, n: "C3", d: 3.5, v: 0.22 },
    { s: 16, n: "F3", d: 3.5, v: 0.22 },
    { s: 20, n: "A3", d: 3.5, v: 0.18 },
    { s: 24, n: "C3", d: 3.5, v: 0.22 },
    { s: 28, n: "G3", d: 3.5, v: 0.20 },

    // Phrase 2 (32-63)
    { s: 32, n: "C3", d: 3.5, v: 0.22 },
    { s: 36, n: "G3", d: 3.5, v: 0.20 },
    { s: 40, n: "F3", d: 3.5, v: 0.22 },
    { s: 44, n: "A3", d: 3.5, v: 0.20 },
    { s: 48, n: "G3", d: 3.5, v: 0.22 },
    { s: 52, n: "E3", d: 3.5, v: 0.18 },
    { s: 56, n: "G3", d: 3.5, v: 0.22 },
    { s: 60, n: "C3", d: 3.5, v: 0.24 },
  ],
};

// 2. Verse Builder Title Theme: Gentle, tactile paper-craft chime & woodblock (92 BPM - 64 steps)
export const VERSE_BUILDER_TITLE_SONG = {
  bpm: 92,
  steps: 64,
  melody: [
    // Phrase 1 (0-31)
    { s: 0, n: "C5", d: 1.2, v: 0.32 },
    { s: 2, n: "D5", d: 1.0, v: 0.30 },
    { s: 4, n: "E5", d: 1.8, v: 0.35 },
    { s: 7, n: "G5", d: 1.0, v: 0.32 },
    { s: 8, n: "E5", d: 1.5, v: 0.30 },
    { s: 11, n: "D5", d: 1.2, v: 0.28 },
    { s: 12, n: "C5", d: 2.5, v: 0.34 },

    { s: 16, n: "D5", d: 1.2, v: 0.30 },
    { s: 18, n: "E5", d: 1.0, v: 0.32 },
    { s: 20, n: "F5", d: 1.8, v: 0.36 },
    { s: 23, n: "A5", d: 1.0, v: 0.34 },
    { s: 24, n: "G5", d: 1.5, v: 0.32 },
    { s: 27, n: "E5", d: 1.2, v: 0.30 },
    { s: 28, n: "C5", d: 3.0, v: 0.35 },

    // Phrase 2 Variation (32-63)
    { s: 32, n: "E5", d: 1.2, v: 0.34 },
    { s: 34, n: "G5", d: 1.0, v: 0.35 },
    { s: 36, n: "A5", d: 1.8, v: 0.38 },
    { s: 39, n: "C6", d: 1.0, v: 0.36 },
    { s: 40, n: "G5", d: 1.5, v: 0.34 },
    { s: 43, n: "E5", d: 1.2, v: 0.30 },
    { s: 44, n: "D5", d: 2.5, v: 0.32 },

    { s: 48, n: "F5", d: 1.2, v: 0.32 },
    { s: 50, n: "A5", d: 1.0, v: 0.34 },
    { s: 52, n: "G5", d: 1.8, v: 0.36 },
    { s: 55, n: "E5", d: 1.0, v: 0.32 },
    { s: 56, n: "D5", d: 1.5, v: 0.30 },
    { s: 59, n: "B4", d: 1.2, v: 0.28 },
    { s: 60, n: "C5", d: 3.5, v: 0.36 },
  ],
  bass: [
    // Phrase 1 (0-31)
    { s: 0, n: "C3", d: 3.5, v: 0.20 },
    { s: 4, n: "G3", d: 3.5, v: 0.18 },
    { s: 8, n: "A3", d: 3.5, v: 0.18 },
    { s: 12, n: "E3", d: 3.5, v: 0.16 },
    { s: 16, n: "F3", d: 3.5, v: 0.20 },
    { s: 20, n: "C3", d: 3.5, v: 0.18 },
    { s: 24, n: "G3", d: 3.5, v: 0.18 },
    { s: 28, n: "C3", d: 3.5, v: 0.22 },

    // Phrase 2 (32-63)
    { s: 32, n: "A3", d: 3.5, v: 0.20 },
    { s: 36, n: "F3", d: 3.5, v: 0.20 },
    { s: 40, n: "C3", d: 3.5, v: 0.18 },
    { s: 44, n: "G3", d: 3.5, v: 0.20 },
    { s: 48, n: "F3", d: 3.5, v: 0.20 },
    { s: 52, n: "C3", d: 3.5, v: 0.18 },
    { s: 56, n: "G3", d: 3.5, v: 0.20 },
    { s: 60, n: "C3", d: 3.5, v: 0.22 },
  ],
};

// 3. Verse Builder Gameplay Theme: Cheerful, rhythmic marimba & acoustic pluck (114 BPM - 64 steps)
export const VERSE_BUILDER_PLAY_SONG = {
  bpm: 114,
  steps: 64,
  melody: [
    // Phrase 1 (0-31)
    { s: 0, n: "E5", d: 0.8, v: 0.30 },
    { s: 1, n: "G5", d: 0.8, v: 0.35 },
    { s: 2, n: "A5", d: 1.2, v: 0.38 },
    { s: 4, n: "G5", d: 0.8, v: 0.32 },
    { s: 6, n: "E5", d: 1.5, v: 0.30 },
    { s: 8, n: "C5", d: 0.8, v: 0.32 },
    { s: 10, n: "D5", d: 0.8, v: 0.32 },
    { s: 12, n: "E5", d: 2.0, v: 0.35 },

    { s: 16, n: "F5", d: 0.8, v: 0.30 },
    { s: 17, n: "A5", d: 0.8, v: 0.35 },
    { s: 18, n: "C6", d: 1.2, v: 0.38 },
    { s: 20, n: "B5", d: 0.8, v: 0.32 },
    { s: 22, n: "G5", d: 1.5, v: 0.35 },
    { s: 24, n: "E5", d: 0.8, v: 0.30 },
    { s: 26, n: "D5", d: 0.8, v: 0.30 },
    { s: 28, n: "C5", d: 2.5, v: 0.36 },

    // Phrase 2 Variation & Uplift (32-63)
    { s: 32, n: "G5", d: 0.8, v: 0.34 },
    { s: 33, n: "A5", d: 0.8, v: 0.36 },
    { s: 34, n: "C6", d: 1.2, v: 0.40 },
    { s: 36, n: "D6", d: 0.8, v: 0.38 },
    { s: 38, n: "C6", d: 1.5, v: 0.35 },
    { s: 40, n: "A5", d: 0.8, v: 0.32 },
    { s: 42, n: "G5", d: 0.8, v: 0.32 },
    { s: 44, n: "E5", d: 2.0, v: 0.35 },

    { s: 48, n: "A5", d: 0.8, v: 0.34 },
    { s: 49, n: "G5", d: 0.8, v: 0.32 },
    { s: 50, n: "E5", d: 1.2, v: 0.34 },
    { s: 52, n: "D5", d: 0.8, v: 0.30 },
    { s: 54, n: "C5", d: 1.5, v: 0.32 },
    { s: 56, n: "D5", d: 0.8, v: 0.32 },
    { s: 58, n: "E5", d: 0.8, v: 0.34 },
    { s: 60, n: "C5", d: 2.5, v: 0.38 },
  ],
  bass: [
    // Phrase 1 (0-31)
    { s: 0, n: "C4", d: 0.9, v: 0.22 },
    { s: 2, n: "G3", d: 0.9, v: 0.18 },
    { s: 4, n: "C4", d: 0.9, v: 0.22 },
    { s: 6, n: "G3", d: 0.9, v: 0.18 },
    { s: 8, n: "A3", d: 0.9, v: 0.20 },
    { s: 10, n: "E3", d: 0.9, v: 0.18 },
    { s: 12, n: "A3", d: 0.9, v: 0.20 },
    { s: 14, n: "G3", d: 0.9, v: 0.18 },
    { s: 16, n: "F3", d: 0.9, v: 0.22 },
    { s: 18, n: "C3", d: 0.9, v: 0.18 },
    { s: 20, n: "F3", d: 0.9, v: 0.22 },
    { s: 22, n: "C3", d: 0.9, v: 0.18 },
    { s: 24, n: "G3", d: 0.9, v: 0.22 },
    { s: 26, n: "D3", d: 0.9, v: 0.18 },
    { s: 28, n: "G3", d: 0.9, v: 0.22 },
    { s: 30, n: "B3", d: 0.9, v: 0.18 },

    // Phrase 2 (32-63)
    { s: 32, n: "A3", d: 0.9, v: 0.22 },
    { s: 34, n: "E3", d: 0.9, v: 0.18 },
    { s: 36, n: "A3", d: 0.9, v: 0.22 },
    { s: 38, n: "E3", d: 0.9, v: 0.18 },
    { s: 40, n: "F3", d: 0.9, v: 0.22 },
    { s: 42, n: "C3", d: 0.9, v: 0.18 },
    { s: 44, n: "F3", d: 0.9, v: 0.22 },
    { s: 46, n: "C3", d: 0.9, v: 0.18 },
    { s: 48, n: "D3", d: 0.9, v: 0.20 },
    { s: 50, n: "A3", d: 0.9, v: 0.18 },
    { s: 52, n: "D3", d: 0.9, v: 0.20 },
    { s: 54, n: "F3", d: 0.9, v: 0.18 },
    { s: 56, n: "G3", d: 0.9, v: 0.22 },
    { s: 58, n: "D3", d: 0.9, v: 0.18 },
    { s: 60, n: "C3", d: 0.9, v: 0.24 },
    { s: 62, n: "G3", d: 0.9, v: 0.18 },
  ],
};

// 4. Trivia Game Title Theme: Inquisitive, upbeat staccato melody (122 BPM - 64 steps)
export const TRIVIA_TITLE_SONG = {
  bpm: 122,
  steps: 64,
  melody: [
    // Phrase 1 (0-31)
    { s: 0, n: "D5", d: 0.6, v: 0.34 },
    { s: 2, n: "F5", d: 0.6, v: 0.34 },
    { s: 4, n: "A5", d: 1.0, v: 0.38 },
    { s: 6, n: "G5", d: 0.6, v: 0.32 },
    { s: 8, n: "F5", d: 0.6, v: 0.30 },
    { s: 10, n: "E5", d: 0.6, v: 0.30 },
    { s: 12, n: "D5", d: 1.8, v: 0.35 },

    { s: 16, n: "E5", d: 0.6, v: 0.32 },
    { s: 18, n: "G5", d: 0.6, v: 0.34 },
    { s: 20, n: "B5", d: 1.0, v: 0.38 },
    { s: 22, n: "A5", d: 0.6, v: 0.34 },
    { s: 24, n: "F5", d: 0.6, v: 0.32 },
    { s: 26, n: "E5", d: 0.6, v: 0.30 },
    { s: 28, n: "D5", d: 2.0, v: 0.36 },

    // Phrase 2 Variation (32-63)
    { s: 32, n: "F5", d: 0.6, v: 0.35 },
    { s: 34, n: "A5", d: 0.6, v: 0.36 },
    { s: 36, n: "C6", d: 1.0, v: 0.40 },
    { s: 38, n: "B5", d: 0.6, v: 0.35 },
    { s: 40, n: "A5", d: 0.6, v: 0.32 },
    { s: 42, n: "G5", d: 0.6, v: 0.32 },
    { s: 44, n: "F5", d: 1.8, v: 0.36 },

    { s: 48, n: "G5", d: 0.6, v: 0.34 },
    { s: 50, n: "A5", d: 0.6, v: 0.36 },
    { s: 52, n: "F5", d: 1.0, v: 0.34 },
    { s: 54, n: "E5", d: 0.6, v: 0.32 },
    { s: 56, n: "D5", d: 0.6, v: 0.34 },
    { s: 58, n: "C5", d: 0.6, v: 0.30 },
    { s: 60, n: "D5", d: 2.2, v: 0.38 },
  ],
  bass: [
    // Phrase 1 (0-31)
    { s: 0, n: "D3", d: 1.8, v: 0.22 },
    { s: 4, n: "A3", d: 1.8, v: 0.20 },
    { s: 8, n: "D3", d: 1.8, v: 0.22 },
    { s: 12, n: "A3", d: 1.8, v: 0.20 },
    { s: 16, n: "G3", d: 1.8, v: 0.22 },
    { s: 20, n: "B3", d: 1.8, v: 0.20 },
    { s: 24, n: "A3", d: 1.8, v: 0.22 },
    { s: 28, n: "D3", d: 1.8, v: 0.24 },

    // Phrase 2 (32-63)
    { s: 32, n: "F3", d: 1.8, v: 0.22 },
    { s: 36, n: "C3", d: 1.8, v: 0.20 },
    { s: 40, n: "F3", d: 1.8, v: 0.22 },
    { s: 44, n: "A3", d: 1.8, v: 0.20 },
    { s: 48, n: "G3", d: 1.8, v: 0.22 },
    { s: 52, n: "A3", d: 1.8, v: 0.20 },
    { s: 56, n: "A3", d: 1.8, v: 0.22 },
    { s: 60, n: "D3", d: 1.8, v: 0.24 },
  ],
};

// 5. Memory Match Game Title Theme: Whimsical music-box & glockenspiel (88 BPM - 64 steps)
export const MEMORY_TITLE_SONG = {
  bpm: 88,
  steps: 64,
  melody: [
    // Phrase 1 (0-31)
    { s: 0, n: "G5", d: 1.2, v: 0.35 },
    { s: 2, n: "B5", d: 1.0, v: 0.32 },
    { s: 4, n: "D6", d: 1.8, v: 0.38 },
    { s: 7, n: "B5", d: 1.0, v: 0.32 },
    { s: 8, n: "C6", d: 1.2, v: 0.34 },
    { s: 10, n: "A5", d: 1.0, v: 0.30 },
    { s: 12, n: "G5", d: 2.5, v: 0.35 },

    { s: 16, n: "E5", d: 1.2, v: 0.30 },
    { s: 18, n: "G5", d: 1.0, v: 0.32 },
    { s: 20, n: "C6", d: 1.8, v: 0.38 },
    { s: 23, n: "A5", d: 1.0, v: 0.32 },
    { s: 24, n: "F5", d: 1.2, v: 0.30 },
    { s: 26, n: "D5", d: 1.0, v: 0.28 },
    { s: 28, n: "G5", d: 3.0, v: 0.35 },

    // Phrase 2 Variation & Resolution (32-63)
    { s: 32, n: "B5", d: 1.2, v: 0.36 },
    { s: 34, n: "D6", d: 1.0, v: 0.38 },
    { s: 36, n: "E6", d: 1.8, v: 0.40 },
    { s: 39, n: "D6", d: 1.0, v: 0.34 },
    { s: 40, n: "B5", d: 1.2, v: 0.34 },
    { s: 42, n: "G5", d: 1.0, v: 0.32 },
    { s: 44, n: "A5", d: 2.5, v: 0.35 },

    { s: 48, n: "C6", d: 1.2, v: 0.34 },
    { s: 50, n: "B5", d: 1.0, v: 0.32 },
    { s: 52, n: "A5", d: 1.8, v: 0.34 },
    { s: 55, n: "G5", d: 1.0, v: 0.32 },
    { s: 56, n: "E5", d: 1.2, v: 0.30 },
    { s: 58, n: "A5", d: 1.0, v: 0.32 },
    { s: 60, n: "G5", d: 3.5, v: 0.38 },
  ],
  bass: [
    // Phrase 1 (0-31)
    { s: 0, n: "G3", d: 3.5, v: 0.18 },
    { s: 4, n: "D3", d: 3.5, v: 0.16 },
    { s: 8, n: "C3", d: 3.5, v: 0.18 },
    { s: 12, n: "G3", d: 3.5, v: 0.18 },
    { s: 16, n: "C3", d: 3.5, v: 0.18 },
    { s: 20, n: "E3", d: 3.5, v: 0.16 },
    { s: 24, n: "D3", d: 3.5, v: 0.18 },
    { s: 28, n: "G3", d: 3.5, v: 0.20 },

    // Phrase 2 (32-63)
    { s: 32, n: "E3", d: 3.5, v: 0.18 },
    { s: 36, n: "C3", d: 3.5, v: 0.18 },
    { s: 40, n: "G3", d: 3.5, v: 0.18 },
    { s: 44, n: "D3", d: 3.5, v: 0.20 },
    { s: 48, n: "C3", d: 3.5, v: 0.18 },
    { s: 52, n: "D3", d: 3.5, v: 0.18 },
    { s: 56, n: "C3", d: 3.5, v: 0.18 },
    { s: 60, n: "G3", d: 3.5, v: 0.22 },
  ],
};

// 6. Story Sequencer Theme: Adventurous acoustic lute & harp progression (100 BPM - 64 steps)
export const SEQUENCER_TITLE_SONG = {
  bpm: 100,
  steps: 64,
  melody: [
    // Phrase 1 (0-31)
    { s: 0, n: "D5", d: 1.5, v: 0.36 },
    { s: 2, n: "F5", d: 1.5, v: 0.38 },
    { s: 4, n: "A5", d: 2.0, v: 0.40 },
    { s: 7, n: "G5", d: 1.0, v: 0.32 },
    { s: 8, n: "F5", d: 1.5, v: 0.35 },
    { s: 10, n: "E5", d: 1.5, v: 0.32 },
    { s: 12, n: "D5", d: 3.0, v: 0.38 },

    { s: 16, n: "F5", d: 1.5, v: 0.35 },
    { s: 18, n: "G5", d: 1.5, v: 0.36 },
    { s: 20, n: "A5", d: 2.0, v: 0.40 },
    { s: 23, n: "C6", d: 1.0, v: 0.38 },
    { s: 24, n: "B5", d: 1.5, v: 0.35 },
    { s: 26, n: "G5", d: 1.5, v: 0.32 },
    { s: 28, n: "A5", d: 3.0, v: 0.38 },

    // Phrase 2 Variation & Resolution (32-63)
    { s: 32, n: "A5", d: 1.5, v: 0.38 },
    { s: 34, n: "C6", d: 1.5, v: 0.40 },
    { s: 36, n: "D6", d: 2.0, v: 0.42 },
    { s: 39, n: "C6", d: 1.0, v: 0.35 },
    { s: 40, n: "A5", d: 1.5, v: 0.36 },
    { s: 42, n: "F5", d: 1.5, v: 0.32 },
    { s: 44, n: "G5", d: 3.0, v: 0.38 },

    { s: 48, n: "E5", d: 1.5, v: 0.34 },
    { s: 50, n: "F5", d: 1.5, v: 0.35 },
    { s: 52, n: "G5", d: 1.5, v: 0.36 },
    { s: 54, n: "E5", d: 1.5, v: 0.32 },
    { s: 56, n: "C5", d: 1.5, v: 0.30 },
    { s: 58, n: "E5", d: 1.5, v: 0.34 },
    { s: 60, n: "D5", d: 3.5, v: 0.40 },
  ],
  bass: [
    // Phrase 1 (0-31)
    { s: 0, n: "D3", d: 3.5, v: 0.20 },
    { s: 4, n: "F3", d: 3.5, v: 0.18 },
    { s: 8, n: "A3", d: 3.5, v: 0.18 },
    { s: 12, n: "D3", d: 3.5, v: 0.20 },
    { s: 16, n: "F3", d: 3.5, v: 0.20 },
    { s: 20, n: "A3", d: 3.5, v: 0.18 },
    { s: 24, n: "G3", d: 3.5, v: 0.20 },
    { s: 28, n: "A3", d: 3.5, v: 0.22 },

    // Phrase 2 (32-63)
    { s: 32, n: "F3", d: 3.5, v: 0.20 },
    { s: 36, n: "A3", d: 3.5, v: 0.18 },
    { s: 40, n: "D3", d: 3.5, v: 0.20 },
    { s: 44, n: "G3", d: 3.5, v: 0.20 },
    { s: 48, n: "C3", d: 3.5, v: 0.18 },
    { s: 52, n: "A3", d: 3.5, v: 0.18 },
    { s: 56, n: "C3", d: 3.5, v: 0.18 },
    { s: 60, n: "D3", d: 3.5, v: 0.24 },
  ],
};

// Constitution Article 3.5: default volume levels (0..100 scale, as shown on the settings sliders)
export const DEFAULT_BGM_VOL = 50;
export const DEFAULT_SFX_VOL = 75;

export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.currentTrack = null;
    this.isPlaying = false;
    this.stepIndex = 0;
    this.timerId = null;
    this.muted = false;
    this.bgmVol = DEFAULT_BGM_VOL / 100;
    this.sfxVol = DEFAULT_SFX_VOL / 100;
    this.isBackgrounded = false;
    this.listenersAttached = false;
    this.bindVisibilityListeners();
  }

  bindVisibilityListeners() {
    if (typeof document !== "undefined" && typeof window !== "undefined" && !this.listenersAttached) {
      this.listenersAttached = true;
      document.addEventListener("visibilitychange", () => {
        this.handleVisibility(document.hidden);
      });
      window.addEventListener("pagehide", () => {
        this.handleVisibility(true);
      });
      window.addEventListener("pageshow", () => {
        this.handleVisibility(false);
      });
    }
  }

  handleVisibility(hidden) {
    this.isBackgrounded = Boolean(hidden);
    if (this.isBackgrounded) {
      if (this.ctx && this.ctx.state === "running") {
        try {
          this.ctx.suspend();
        } catch (_) {}
      }
    } else {
      if (this.ctx && this.ctx.state === "suspended" && !this.muted) {
        try {
          this.ctx.resume();
        } catch (_) {}
      }
    }
  }

  init() {
    this.bindVisibilityListeners();
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        // Master gain for BGM music
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.muted ? 0 : this.bgmVol * 0.38, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // SFX gain node
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(this.muted ? 0 : this.sfxVol * 0.55, this.ctx.currentTime);
        this.sfxGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended" && !this.isBackgrounded) {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.ctx) {
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(muted ? 0 : this.bgmVol * 0.38, this.ctx.currentTime, 0.05);
      }
      if (this.sfxGain) {
        this.sfxGain.gain.setTargetAtTime(muted ? 0 : this.sfxVol * 0.55, this.ctx.currentTime, 0.05);
      }
    }
  }

  setBgmVolume(volume) {
    this.bgmVol = Math.max(0, Math.min(1, volume));
    if (this.ctx && this.masterGain && !this.muted) {
      this.masterGain.gain.setTargetAtTime(this.bgmVol * 0.38, this.ctx.currentTime, 0.04);
    }
  }

  setSfxVolume(volume) {
    this.sfxVol = Math.max(0, Math.min(1, volume));
    if (this.ctx && this.sfxGain && !this.muted) {
      this.sfxGain.gain.setTargetAtTime(this.sfxVol * 0.55, this.ctx.currentTime, 0.04);
    }
  }

  // --- Core Synthesis Helpers ---
  playPluck(freq, duration = 0.5, vol = 0.3, type = "sine", when = null) {
    if (!this.ctx || this.ctx.state !== "running" || this.muted) return;
    const now = when ?? this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);

    if (type === "sine" && freq < 1000) {
      const harmOsc = this.ctx.createOscillator();
      const harmGain = this.ctx.createGain();
      harmOsc.type = "triangle";
      harmOsc.frequency.setValueAtTime(freq * 2, now);
      harmGain.gain.setValueAtTime(vol * 0.28, now);
      harmGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.4);
      harmOsc.connect(harmGain);
      harmGain.connect(this.masterGain);
      harmOsc.start(now);
      harmOsc.stop(now + duration * 0.4);
    }
  }

  playBass(freq, duration = 0.6, vol = 0.2, when = null) {
    if (!this.ctx || this.ctx.state !== "running" || this.muted) return;
    const now = when ?? this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Celebratory Brass / Horn Synthesizer
  playHorn(freq, delay = 0, duration = 0.4, vol = 0.32) {
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime + delay;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = "sawtooth";
    osc2.type = "sawtooth";

    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq, now);
    osc1.detune.setValueAtTime(-7, now);
    osc2.detune.setValueAtTime(7, now);

    filter.type = "lowpass";
    filter.Q.setValueAtTime(3.2, now);
    filter.frequency.setValueAtTime(420, now);
    filter.frequency.exponentialRampToValueAtTime(4200, now + 0.045);
    filter.frequency.exponentialRampToValueAtTime(2100, now + duration);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.035);
    gain.gain.setValueAtTime(vol * 0.88, now + duration * 0.75);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.06);
    osc2.stop(now + duration + 0.06);
  }

  // --- Interactive Action SFX ---

  // 1. Pencil Scratch noise burst (tactile handwriting on paper)
  playPencilScratch() {
    if (!this.ctx || this.ctx.state !== "running" || this.muted) return;
    const now = this.ctx.currentTime;
    try {
      const dur = 0.68;
      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const env = Math.sin((i / bufferSize) * Math.PI * 6) * 0.3 + 0.7;
        output[i] = (Math.random() * 2 - 1) * 0.45 * env;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(3400, now);
      filter.frequency.linearRampToValueAtTime(4200, now + 0.3);
      filter.frequency.linearRampToValueAtTime(3100, now + dur);
      filter.Q.setValueAtTime(3.8, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.06);
      gain.gain.setValueAtTime(0.14, now + dur * 0.75);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(now);
      noise.stop(now + dur);
    } catch (_) {}
  }

  // 2. Placing a word scrap: Wooden marimba chime + tactile pencil scratch
  playPlaceScrap(slotIndex = 0) {
    this.init();
    if (!this.ctx || this.ctx.state !== "running" || this.muted) return;
    const now = this.ctx.currentTime;

    this.playPencilScratch();

    const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51, 1567.98];
    const freq = scale[slotIndex % scale.length];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + 0.08);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  // 3. Removing a word scrap: Descending "unstick" pop
  playRemoveScrap() {
    this.init();
    if (!this.ctx || this.ctx.state !== "running" || this.muted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // 4. Gentle cartoon bounce for wrong order
  playWrongAnswer() {
    this.init();
    if (!this.ctx || this.ctx.state !== "running" || this.muted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.15);
    osc.frequency.linearRampToValueAtTime(220, now + 0.25);
    osc.frequency.linearRampToValueAtTime(160, now + 0.38);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // 4b. Card snap into timeline slot
  playCardSnap(slotIndex = 0) {
    this.init();
    if (!this.ctx || this.ctx.state !== "running" || this.muted) return;
    const now = this.ctx.currentTime;
    const scale = [440, 493.88, 554.37, 659.25, 739.99, 880];
    const freq = scale[slotIndex % scale.length];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq * 1.2, now);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.06);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  // 4c. Timeline swipe / whoosh sound
  playTimelineWhoosh() {
    this.init();
    if (!this.ctx || this.ctx.state !== "running" || this.muted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.18);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  // 4d. Individual correct step lock-in chime
  playStepSuccess(stepIdx = 0) {
    this.init();
    if (!this.ctx || this.ctx.state !== "running" || this.muted) return;
    const now = this.ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    const freq = chord[stepIdx % chord.length];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.12);

    gain.gain.setValueAtTime(0.32, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  // 5. Button tap
  playButtonClick() {
    this.init();
    if (!this.ctx || this.ctx.state !== "running" || this.muted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // 6. Star reveal chime
  playStarChime(starIdx = 0) {
    this.init();
    if (!this.ctx || this.ctx.state !== "running" || this.muted) return;
    const now = this.ctx.currentTime;
    const freqs = [1046.50, 1318.51, 1567.98]; // C6, E6, G6
    const freq = freqs[starIdx] || 1567.98;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  // 7. Cheerful, natural applause for verse completion (100% pure acoustic noise, zero tonal beeps)
  playLightApplause() {
    this.init();
    if (!this.ctx || this.ctx.state !== "running" || this.muted) return;
    const now = this.ctx.currentTime;
    try {
      const clapCount = 42;
      for (let i = 0; i < clapCount; i++) {
        const normalizedTime = Math.pow(i / clapCount, 0.9);
        const clapDelay = normalizedTime * 1.55 + (Math.random() * 0.08 - 0.04);
        const clapTime = now + Math.max(0, clapDelay);
        const dur = 0.048;
        const bufferSize = Math.floor(this.ctx.sampleRate * dur);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let j = 0; j < bufferSize; j++) {
          // Sharp acoustic handclap burst with exponential decay
          data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.20));
        }

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;

        // Wide bandpass (Q: 0.85) to eliminate all tonal whistling/ringing
        const filter = this.ctx.createBiquadFilter();
        filter.type = "bandpass";
        const centerFreq = 1000 + (i % 6) * 110 + Math.random() * 80;
        filter.frequency.setValueAtTime(centerFreq, clapTime);
        filter.Q.setValueAtTime(0.85, clapTime);

        // Natural crescendo & fade
        const progress = i / clapCount;
        const envelope = progress < 0.3 ? progress / 0.3 : Math.pow(1 - (progress - 0.3) / 0.7, 1.3);
        const clapVol = (0.15 + envelope * 0.35) * (0.85 + Math.random() * 0.3);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.001, clapTime);
        gain.gain.linearRampToValueAtTime(clapVol, clapTime + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.0001, clapTime + dur);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);

        source.start(clapTime);
        source.stop(clapTime + dur);
      }
    } catch (_) {}
  }

  // 8. Level Complete Victory Fanfare
  playWinFanfare() {
    this.init();
    if (!this.ctx || this.muted) return;

    const fanfareNotes = [
      { n: NOTES.G4, t: 0.00, d: 0.14, v: 0.32 },
      { n: NOTES.C5, t: 0.14, d: 0.14, v: 0.34 },
      { n: NOTES.E5, t: 0.28, d: 0.16, v: 0.36 },
      { n: NOTES.G5, t: 0.44, d: 0.38, v: 0.40 },
      { n: NOTES.C5, t: 0.78, d: 1.05, v: 0.28 },
      { n: NOTES.E5, t: 0.78, d: 1.05, v: 0.32 },
      { n: NOTES.G5, t: 0.78, d: 1.05, v: 0.38 },
      { n: NOTES.C6, t: 0.78, d: 1.05, v: 0.32 },
    ];

    fanfareNotes.forEach((fn) => {
      this.playHorn(fn.n, fn.t, fn.d, fn.v);
    });
  }

  // 8. Chapter Complete Fanfare
  playChapterFanfare() {
    this.init();
    if (!this.ctx || this.muted) return;

    const notes = [
      { n: NOTES.C5, t: 0.00, d: 0.12, v: 0.34 },
      { n: NOTES.E5, t: 0.12, d: 0.12, v: 0.36 },
      { n: NOTES.G5, t: 0.24, d: 0.15, v: 0.38 },
      { n: NOTES.C6, t: 0.40, d: 0.40, v: 0.42 },
      { n: NOTES.G5, t: 0.75, d: 0.14, v: 0.36 },
      { n: NOTES.C6, t: 0.90, d: 0.95, v: 0.44 },
    ];
    notes.forEach((fn) => {
      this.playHorn(fn.n, fn.t, fn.d, fn.v);
    });
  }

  // 9. Grand Royal Fanfare (All 15 Chapters Completed!)
  playAllDoneFanfare() {
    this.init();
    if (!this.ctx || this.muted) return;

    const royalNotes = [
      { n: NOTES.G4, t: 0.00, d: 0.10, v: 0.34 },
      { n: NOTES.G4, t: 0.12, d: 0.10, v: 0.34 },
      { n: NOTES.G4, t: 0.24, d: 0.10, v: 0.34 },
      { n: NOTES.C5, t: 0.36, d: 0.35, v: 0.40 },

      { n: NOTES.G4, t: 0.72, d: 0.10, v: 0.34 },
      { n: NOTES.C5, t: 0.84, d: 0.10, v: 0.36 },
      { n: NOTES.E5, t: 0.96, d: 0.38, v: 0.42 },

      { n: NOTES.G5, t: 1.35, d: 0.12, v: 0.38 },
      { n: NOTES.E5, t: 1.48, d: 0.12, v: 0.38 },
      { n: NOTES.G5, t: 1.60, d: 0.14, v: 0.40 },
      { n: NOTES.C6, t: 1.76, d: 0.45, v: 0.46 },

      { n: NOTES.C4, t: 2.22, d: 2.0, v: 0.35 },
      { n: NOTES.G4, t: 2.22, d: 2.0, v: 0.32 },
      { n: NOTES.C5, t: 2.22, d: 2.0, v: 0.36 },
      { n: NOTES.E5, t: 2.22, d: 2.0, v: 0.36 },
      { n: NOTES.G5, t: 2.22, d: 2.0, v: 0.42 },
      { n: NOTES.C6, t: 2.22, d: 2.0, v: 0.38 },
    ];

    royalNotes.forEach((rn) => {
      this.playHorn(rn.n, rn.t, rn.d, rn.v);
    });
  }

  // 10. Settings open chime
  playSettingsChime() {
    this.init();
    if (!this.ctx || this.ctx.state !== "running" || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.15);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  setTrack(trackName) {
    if (this.currentTrack === trackName && this.isPlaying) return;
    this.currentTrack = trackName;
    this.stepIndex = 0;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    if (!trackName) {
      this.isPlaying = false;
      return;
    }

    this.init();

    let song = MAIN_HUB_SONG;
    if (trackName === "verse-builder-title" || trackName === "title") {
      song = VERSE_BUILDER_TITLE_SONG;
    } else if (trackName === "verse-builder-play" || trackName === "verse" || trackName === "gameplay") {
      song = VERSE_BUILDER_PLAY_SONG;
    } else if (
      trackName === "trivia-title" ||
      trackName === "trivia" ||
      trackName === "who-am-i" ||
      trackName === "whoami" ||
      trackName === "wai"
    ) {
      song = TRIVIA_TITLE_SONG;
    } else if (trackName === "memory-title" || trackName === "memory") {
      song = MEMORY_TITLE_SONG;
    } else if (trackName === "sequencer" || trackName === "story-sequencer" || trackName === "story") {
      song = SEQUENCER_TITLE_SONG;
    } else if (trackName === "hub" || trackName === "main") {
      song = MAIN_HUB_SONG;
    }

    // Lookahead scheduling ("a tale of two clocks"): a coarse JS timer only
    // QUEUES notes ahead of time; the Web Audio clock plays them
    // sample-accurately. Main-thread jank must exceed the whole lookahead
    // window before it can be heard, and timer drift never accumulates.
    const stepDuration = 60 / song.bpm / 2;
    const LOOKAHEAD = 0.12; // seconds of audio queued ahead
    const TICK_MS = 25;

    this.isPlaying = true;
    this.nextStepTime = this.ctx ? this.ctx.currentTime + 0.06 : 0;
    this.timerId = setInterval(() => {
      if (!this.ctx || this.ctx.state !== "running") return;

      while (this.nextStepTime < this.ctx.currentTime + LOOKAHEAD) {
        const when = this.nextStepTime;
        // Skip (not replay) steps the clock has already passed — e.g. after a
        // long main-thread stall — instead of splatting them all at once
        const playable = when >= this.ctx.currentTime - 0.05 && !this.muted && !this.isBackgrounded;

        if (playable) {
          song.melody.forEach((m) => {
            if (m.s === this.stepIndex && NOTES[m.n]) {
              this.playPluck(NOTES[m.n], m.d * (60 / song.bpm), m.v, "sine", when);
            }
          });
          song.bass.forEach((b) => {
            if (b.s === this.stepIndex && NOTES[b.n]) {
              this.playBass(NOTES[b.n], b.d * (60 / song.bpm), b.v, when);
            }
          });
        }

        this.stepIndex = (this.stepIndex + 1) % song.steps;
        this.nextStepTime += stepDuration;
      }
    }, TICK_MS);
  }
}

export const audio = new SoundEngine();
