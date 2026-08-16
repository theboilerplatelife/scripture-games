/* ============================================================
   MEMORY MATCH — Deck building & scoring (pure helpers)
   Independent Themed Scripture Decks with 3 clean match modes:
   1. Hint Hunt (🔍 Clue ↔ Verse)
   2. Verse Finder (📖 Reference ↔ Verse)
   3. Torn Verses (✂️ Half 1 ↔ Half 2)
   ============================================================ */
import { shuffle } from "../../utils/random.js";
import { CHAPTERS } from "../../data/chapters.js";

// The three high-integrity scripture match modes:
export const MODES = [
  { id: "hints", title: "Hint Hunt", icon: "🔍", pairs: 5, blurb: "Match each clue to its verse" },
  { id: "refs", title: "Verse Finder", icon: "📖", pairs: 5, blurb: "Match each reference to its verse" },
  { id: "halves", title: "Torn Verses", icon: "✂️", pairs: 4, blurb: "Match the two halves of each verse" },
];

// Helper to grab all verses from a chapter by id
const chVerses = (id) => CHAPTERS[id - 1].verses;

// 8 Themed Scripture Decks for Memory Match:
export const DECKS = [
  {
    id: 1,
    title: "Little Seeds",
    subtitle: "Simple, foundational truths to start your journey",
    icon: "🌱",
    color: "#e88b6a",
    verses: [
      ...chVerses(1).slice(0, 8),
      chVerses(2)[0], // Psalm 119:105
      chVerses(2)[1], // Philippians 4:4
    ],
  },
  {
    id: 2,
    title: "Creation & Wonder",
    subtitle: "The heavens, the earth, and all living things",
    icon: "🌍",
    color: "#5c8a3a",
    verses: [
      ...chVerses(4).slice(0, 8),
      chVerses(1)[7], // Genesis 1:1
      chVerses(2)[0], // Psalm 119:105
    ],
  },
  {
    id: 3,
    title: "Joy & Praise",
    subtitle: "Singing, thanksgiving, and gladness in God",
    icon: "🎶",
    color: "#d94f30",
    verses: [
      ...chVerses(3).slice(0, 8),
      chVerses(2)[4], // Psalm 136:1
      chVerses(2)[6], // Psalm 107:1
    ],
  },
  {
    id: 4,
    title: "The Good Shepherd",
    subtitle: "Resting in the loving care of our Shepherd",
    icon: "🐑",
    color: "#8a6bbf",
    verses: [
      ...chVerses(6).slice(0, 8),
      chVerses(1)[4], // Psalm 23:1
      chVerses(11)[6], // Psalm 4:8
    ],
  },
  {
    id: 5,
    title: "Courage & The Armor",
    subtitle: "Standing tall, brave, and strong in the Lord",
    icon: "🦁",
    color: "#b08d57",
    verses: [
      ...chVerses(7).slice(0, 8),
      ...chVerses(12).slice(0, 4),
    ],
  },
  {
    id: 6,
    title: "Wisdom & Kindness",
    subtitle: "Gentle words, guarding your heart, and loving others",
    icon: "💎",
    color: "#3a86ff",
    verses: [
      ...chVerses(5).slice(0, 5),
      ...chVerses(10).slice(0, 5),
    ],
  },
  {
    id: 7,
    title: "Prayer & Peace",
    subtitle: "Casting all your worries onto the Lord in prayer",
    icon: "🕊️",
    color: "#588157",
    verses: [
      ...chVerses(11).slice(0, 8),
      chVerses(1)[0], // 1 Thessalonians 5:17
      chVerses(2)[7], // Philippians 4:13
    ],
  },
  {
    id: 8,
    title: "Hope & Eternal Life",
    subtitle: "God's love for the world and eternal promises",
    icon: "👑",
    color: "#e63946",
    verses: [
      ...chVerses(13).slice(0, 4),
      ...chVerses(14).slice(0, 2),
      ...chVerses(15).slice(0, 6),
    ],
  },
];

export function getVerseText(verse, translation) {
  return verse.text[translation] || verse.text.ESV;
}

export function clipWords(text, maxWords) {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return words.join(" ");
  return words.slice(0, maxWords).join(" ") + " …";
}

// Split at the word midpoint; each half is capped so cards stay readable,
// with "…" continuation markers joining the tear.
export function splitHalves(text) {
  const words = text.trim().split(/\s+/);
  const mid = Math.ceil(words.length / 2);
  const first = clipWords(words.slice(0, mid).join(" "), 10);
  const second = clipWords(words.slice(mid).join(" "), 10);
  return [first.endsWith("…") ? first : `${first} …`, `… ${second}`];
}

// Miss-based scoring, scaled to board size. Generous: these are kids.
export function starsForMisses(misses, pairCount) {
  if (misses <= Math.ceil(pairCount * 0.75)) return 3;
  if (misses <= pairCount * 2) return 2;
  return 1;
}

// The two card faces a verse shows in a given mode
function cardFaces(verse, mode, translation) {
  const text = getVerseText(verse, translation);
  if (mode.id === "hints") {
    return [
      { kind: "hint", text: verse.hint },
      { kind: "verse", text: clipWords(text, 10) },
    ];
  }
  if (mode.id === "refs") {
    return [
      { kind: "ref", text: verse.ref },
      { kind: "verse", text: clipWords(text, 10) },
    ];
  }
  const [firstHalf, secondHalf] = splitHalves(text);
  return [
    { kind: "half1", text: firstHalf },
    { kind: "half2", text: secondHalf },
  ];
}

// Build the shuffled card deck for one deck + mode + translation.
// Cards: { key, pairId, kind, ref, text }
export function buildDeck(deckObj, modeIdx, translation) {
  const mode = MODES[modeIdx];

  let candidates = deckObj.verses;
  if (mode.id === "halves") {
    // A verse must have enough words to tear in two.
    candidates = candidates.filter(
      (verse) => getVerseText(verse, translation).trim().split(/\s+/).length >= 4
    );
  }

  // Skip candidates whose card faces read identically to an already-picked
  // pair (some verses are word-for-word alike across books, e.g. Psalm 136:1
  // and Psalm 107:1) — two look-alike cards that refuse to match is unfair.
  const shuffled = shuffle(candidates, deckObj.id * 101 + modeIdx * 17 + 5);
  const picked = [];
  const usedTexts = new Set();
  shuffled.forEach((verse) => {
    if (picked.length === mode.pairs) return;
    const faces = cardFaces(verse, mode, translation);
    if (faces.some((face) => usedTexts.has(face.text))) return;
    faces.forEach((face) => usedTexts.add(face.text));
    picked.push({ verse, faces });
  });

  const cards = [];
  picked.forEach(({ verse, faces }, pairId) => {
    faces.forEach((face) => cards.push({ pairId, kind: face.kind, ref: verse.ref, text: face.text }));
  });

  return shuffle(cards, deckObj.id * 100 + modeIdx).map((card, i) => ({ ...card, key: `c${i}` }));
}
