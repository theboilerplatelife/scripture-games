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

// Content-unique artwork theme mapping for each verse
export function getVerseArt(verse) {
  const ref = verse.ref || "";
  // Specific verse exceptions for maximum visual variety within decks:
  if (ref.startsWith("Psalm 23:2")) return "calm_waters";
  if (ref.startsWith("Psalm 23:3")) return "lamp";
  if (ref.startsWith("Psalm 23:6")) return "hope_heaven";
  if (ref.startsWith("Psalm 121:1")) return "eagle_wings";
  if (ref.startsWith("Psalm 121:7")) return "armor_shield";
  if (ref.startsWith("Psalm 100:3")) return "praise_harp";
  if (ref.startsWith("Philippians 4:4")) return "praise_harp";
  if (ref.startsWith("Psalm 118:24")) return "light_city";
  if (ref.startsWith("Luke 6:31")) return "gospel_world";
  if (ref.startsWith("Psalm 56:3")) return "armor_shield";

  // General theme groupings:
  if (ref.startsWith("Psalm 23") || ref.startsWith("John 10:11") || ref.startsWith("Isaiah 40:11")) {
    return "shepherd";
  }
  if (ref.startsWith("Psalm 119:105") || ref.startsWith("Proverbs 4:18") || ref.startsWith("Proverbs 6:23")) {
    return "lamp";
  }
  if (ref.startsWith("Genesis 1:1") || ref.startsWith("Psalm 19:1") || ref.startsWith("Psalm 104:24") || ref.startsWith("Psalm 24:1") || ref.startsWith("Job 12:10") || ref.startsWith("Jeremiah 10:12") || ref.startsWith("Psalm 33:6")) {
    return "creation";
  }
  if (ref.startsWith("1 Thessalonians 5:17") || ref.startsWith("Philippians 4:6") || ref.startsWith("Philippians 4:7") || ref.startsWith("John 14:27") || ref.startsWith("1 Peter 5:7") || ref.startsWith("Matthew 11:28") || ref.startsWith("Isaiah 26:3") || ref.startsWith("Colossians 3:15")) {
    return "dove_peace";
  }
  if (ref.startsWith("Ephesians 6") || ref.startsWith("Joshua 1:9") || ref.startsWith("Deuteronomy 31:6") || ref.startsWith("Psalm 27:1") || ref.startsWith("2 Timothy 1:7") || ref.startsWith("1 Corinthians 16:13") || ref.startsWith("2 Corinthians 10:4") || ref.startsWith("1 Thessalonians 5:8") || ref.startsWith("Romans 8:31")) {
    return "armor_shield";
  }
  if (ref.startsWith("Psalm 100") || ref.startsWith("Psalm 147") || ref.startsWith("Psalm 150") || ref.startsWith("1 Chronicles 16:34") || ref.startsWith("Psalm 9:1") || ref.startsWith("Psalm 28:7") || ref.startsWith("Nehemiah 8:10")) {
    return "praise_harp";
  }
  if (ref.startsWith("1 John 4:19") || ref.startsWith("1 John 4:8") || ref.startsWith("1 John 4:11") || ref.startsWith("1 Corinthians 13") || ref.startsWith("John 13:34") || ref.startsWith("1 John 3:18") || ref.startsWith("Ephesians 4:32") || ref.startsWith("Romans 12:10") || ref.startsWith("Galatians 6:2")) {
    return "love_heart";
  }
  if (ref.startsWith("Proverbs") || ref.startsWith("James 1:5") || ref.startsWith("Psalm 111:10")) {
    return "wisdom_scroll";
  }
  if (ref.startsWith("Matthew 5:14") || ref.startsWith("Matthew 5:16") || ref.startsWith("John 8:12") || ref.startsWith("1 John 1:5") || ref.startsWith("Philippians 2:15")) {
    return "light_city";
  }
  if (ref.startsWith("Psalm 136:1") || ref.startsWith("Psalm 107:1") || ref.startsWith("Hebrews 13:8")) {
    return "rainbow";
  }
  if (ref.startsWith("Galatians 5:22") || ref.startsWith("John 15:5") || ref.startsWith("Colossians 3:12") || ref.startsWith("James 1:19") || ref.startsWith("Matthew 5:9") || ref.startsWith("Philippians 2:4") || ref.startsWith("1 Peter 3:8") || ref.startsWith("Romans 12:21")) {
    return "fruit_vine";
  }
  if (ref.startsWith("Psalm 4:8") || ref.startsWith("Psalm 46:1") || ref.startsWith("Isaiah 41:10")) {
    return "calm_waters";
  }
  if (ref.startsWith("Isaiah 40:31")) {
    return "eagle_wings";
  }
  if (ref.startsWith("Matthew 28") || ref.startsWith("Mark 16:15") || ref.startsWith("Acts 1:8") || ref.startsWith("Romans 10:14") || ref.startsWith("Romans 1:16") || ref.startsWith("2 Timothy 4:2") || ref.startsWith("Micah 6:8")) {
    return "gospel_world";
  }
  if (ref.startsWith("Revelation 21:4") || ref.startsWith("John 14:1") || ref.startsWith("John 14:2") || ref.startsWith("John 3:16") || ref.startsWith("2 Corinthians 5:17") || ref.startsWith("John 11:25") || ref.startsWith("Philippians 4:13") || ref.startsWith("Romans 8:28") || ref.startsWith("Romans 8:38")) {
    return "hope_heaven";
  }
  if (ref.startsWith("Psalm 139:14") || ref.startsWith("Psalm 8:1")) {
    return "starry_sky";
  }
  return "creation";
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

const ALL_THEMES = [
  "shepherd", "lamp", "creation", "dove_peace", "armor_shield",
  "praise_harp", "love_heart", "wisdom_scroll", "light_city", "rainbow",
  "fruit_vine", "calm_waters", "eagle_wings", "gospel_world", "hope_heaven", "starry_sky"
];

// When a deck leans heavily on one theme, overflow pairs borrow a
// thematically-adjacent scene instead of an arbitrary unused one
const RELATED_THEMES = {
  shepherd: ["calm_waters", "creation", "eagle_wings"],
  lamp: ["light_city", "starry_sky", "wisdom_scroll"],
  creation: ["starry_sky", "rainbow", "eagle_wings"],
  dove_peace: ["calm_waters", "rainbow", "starry_sky"],
  armor_shield: ["eagle_wings", "light_city", "shepherd"],
  praise_harp: ["rainbow", "light_city", "creation"],
  love_heart: ["fruit_vine", "dove_peace", "rainbow"],
  wisdom_scroll: ["lamp", "light_city", "starry_sky"],
  light_city: ["lamp", "starry_sky", "creation"],
  rainbow: ["creation", "dove_peace", "calm_waters"],
  fruit_vine: ["love_heart", "creation", "shepherd"],
  calm_waters: ["dove_peace", "shepherd", "starry_sky"],
  eagle_wings: ["armor_shield", "creation", "starry_sky"],
  gospel_world: ["light_city", "dove_peace", "creation"],
  hope_heaven: ["starry_sky", "rainbow", "light_city"],
  starry_sky: ["creation", "hope_heaven", "lamp"],
};

// Build the shuffled card deck for one deck + mode + translation.
// `seed` varies the verse pick and layout per play (0 = the base deal,
// used as the deterministic default in tests).
// Guarantees that every pair on the board has a unique background illustration.
// Cards: { key, pairId, kind, ref, text, art }
export function buildDeck(deckObj, modeIdx, translation, seed = 0) {
  const mode = MODES[modeIdx];

  let candidates = deckObj.verses;
  if (mode.id === "halves") {
    // A verse must have enough words to tear in two.
    candidates = candidates.filter(
      (verse) => getVerseText(verse, translation).trim().split(/\s+/).length >= 4
    );
  }

  // Skip candidates whose card faces read identically to an already-picked pair
  // and prioritize pairs with unique background artwork on the same board.
  const shuffled = shuffle(candidates, deckObj.id * 101 + modeIdx * 17 + 5 + seed);
  const picked = [];
  const usedTexts = new Set();
  const usedArts = new Set();

  // First pass: pick verses with unique text AND unique art on this board
  shuffled.forEach((verse) => {
    if (picked.length === mode.pairs) return;
    const faces = cardFaces(verse, mode, translation);
    if (faces.some((face) => usedTexts.has(face.text))) return;
    const art = getVerseArt(verse);
    if (usedArts.has(art)) return;

    faces.forEach((face) => usedTexts.add(face.text));
    usedArts.add(art);
    picked.push({ verse, faces, art });
  });

  // Second pass: if needed, fill any remaining slots with an unused distinct art theme
  if (picked.length < mode.pairs) {
    shuffled.forEach((verse) => {
      if (picked.length === mode.pairs) return;
      if (picked.some((p) => p.verse.ref === verse.ref)) return;
      const faces = cardFaces(verse, mode, translation);
      if (faces.some((face) => usedTexts.has(face.text))) return;

      const fallbackArt = [...RELATED_THEMES[getVerseArt(verse)], ...ALL_THEMES].find(
        (t) => !usedArts.has(t)
      );
      faces.forEach((face) => usedTexts.add(face.text));
      usedArts.add(fallbackArt);
      picked.push({ verse, faces, art: fallbackArt });
    });
  }

  const cards = [];
  picked.forEach(({ verse, faces, art }, pairId) => {
    faces.forEach((face) => cards.push({ pairId, kind: face.kind, ref: verse.ref, text: face.text, art }));
  });

  return shuffle(cards, deckObj.id * 100 + modeIdx + seed * 7).map((card, i) => ({ ...card, key: `c${i}` }));
}
