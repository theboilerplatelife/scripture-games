/* ============================================================
   MEMORY MATCH — Deck building & scoring (pure helpers)
   Levels are derived at runtime from the shared CHAPTERS data;
   all randomness is seeded so boards are deterministic per
   chapter + mode (and therefore testable).
   ============================================================ */
import { shuffle } from "../../utils/random.js";

// The four match modes. `pairs` balances card size against text length:
// face cards can be small, verse-text cards need room to stay readable.
export const MODES = [
  { id: "buddies", title: "Buddy Faces", icon: "🙂", pairs: 8, blurb: "Match each face to its name" },
  { id: "quotes", title: "Who Said It?", icon: "💬", pairs: 6, blurb: "Match each speaker to their words" },
  { id: "refs", title: "Verse Finder", icon: "📖", pairs: 5, blurb: "Match each reference to its verse" },
  { id: "halves", title: "Torn Verses", icon: "✂️", pairs: 4, blurb: "Match the two halves of each verse" },
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

// Build the shuffled card deck for one chapter + mode + translation.
// Cards: { key, pairId, kind, character, text }
export function buildDeck(chapter, modeIdx, translation) {
  const mode = MODES[modeIdx];

  let candidates = chapter.verses;
  if (mode.id === "halves") {
    // A verse must have enough words to tear in two.
    candidates = candidates.filter(
      (verse) => getVerseText(verse, translation).trim().split(/\s+/).length >= 4
    );
  }

  const picked = shuffle(candidates, chapter.id * 101 + modeIdx * 17 + 5).slice(0, mode.pairs);

  const cards = [];
  picked.forEach((verse, pairId) => {
    const text = getVerseText(verse, translation);
    if (mode.id === "buddies") {
      cards.push({ pairId, kind: "buddy", character: verse.character, text: verse.name });
      cards.push({ pairId, kind: "name", character: verse.character, text: verse.name });
    } else if (mode.id === "quotes") {
      cards.push({ pairId, kind: "speaker", character: verse.character, text: verse.name });
      cards.push({ pairId, kind: "quote", character: verse.character, text: clipWords(text, 8) });
    } else if (mode.id === "refs") {
      cards.push({ pairId, kind: "ref", character: verse.character, text: verse.ref });
      cards.push({ pairId, kind: "verse", character: verse.character, text: clipWords(text, 12) });
    } else {
      const [firstHalf, secondHalf] = splitHalves(text);
      cards.push({ pairId, kind: "half1", character: verse.character, text: firstHalf });
      cards.push({ pairId, kind: "half2", character: verse.character, text: secondHalf });
    }
  });

  return shuffle(cards, chapter.id * 100 + modeIdx).map((card, i) => ({ ...card, key: `c${i}` }));
}
