import { describe, test, expect } from "vitest";
import { TRANSLATIONS } from "../../src/data/translations.js";
import {
  DECKS,
  MODES,
  getVerseText,
  clipWords,
  splitHalves,
  starsForMisses,
  buildDeck,
} from "../../src/games/memory-match/matchData.js";

describe("Memory Match deck building & scoring", () => {
  test("getVerseText returns the active translation and falls back to ESV", () => {
    const verse = { text: { ESV: "esv text", NET: "net text" } };
    expect(getVerseText(verse, "NET")).toBe("net text");
    expect(getVerseText(verse, "NKJV")).toBe("esv text");
  });

  test("clipWords keeps short text intact and clips long text with an ellipsis", () => {
    expect(clipWords("Rejoice always", 8)).toBe("Rejoice always");
    expect(clipWords("  spaced   out   words  ", 8)).toBe("spaced out words");
    expect(clipWords("one two three four five", 3)).toBe("one two three …");
  });

  test("splitHalves splits at the word midpoint with continuation markers", () => {
    expect(splitHalves("one two three four")).toEqual(["one two …", "… three four"]);
    // Odd word count: first half gets the extra word
    expect(splitHalves("a b c d e")).toEqual(["a b c …", "… d e"]);
    // Long halves are capped at 10 words and keep a single ellipsis
    const long = Array.from({ length: 30 }, (_, i) => `w${i}`).join(" ");
    const [first, second] = splitHalves(long);
    expect(first).toBe("w0 w1 w2 w3 w4 w5 w6 w7 w8 w9 …");
    expect(second).toBe("… w15 w16 w17 w18 w19 w20 w21 w22 w23 w24 …");
  });

  test("starsForMisses tiers scale with pair count", () => {
    // 4 pairs: 3★ ≤3 misses, 2★ ≤8, else 1★
    expect(starsForMisses(0, 4)).toBe(3);
    expect(starsForMisses(3, 4)).toBe(3);
    expect(starsForMisses(4, 4)).toBe(2);
    expect(starsForMisses(8, 4)).toBe(2);
    expect(starsForMisses(9, 4)).toBe(1);
    // 5 pairs: 3★ ≤4 misses
    expect(starsForMisses(4, 5)).toBe(3);
    expect(starsForMisses(5, 5)).toBe(2);
    expect(starsForMisses(11, 5)).toBe(1);
  });

  test("buildDeck produces a valid deterministic deck for every mode", () => {
    const deckObj = DECKS[0];
    MODES.forEach((mode, modeIdx) => {
      const cardDeck = buildDeck(deckObj, modeIdx, "ESV");
      expect(cardDeck.length).toBe(mode.pairs * 2);

      // Every pairId appears exactly twice, with two distinct kinds
      const byPair = {};
      cardDeck.forEach((card) => {
        (byPair[card.pairId] ||= []).push(card.kind);
        expect(card.text).toBeTruthy();
      });
      expect(Object.keys(byPair).length).toBe(mode.pairs);
      Object.values(byPair).forEach((kinds) => {
        expect(kinds.length).toBe(2);
        expect(kinds[0]).not.toBe(kinds[1]);
      });

      // Unique card keys
      expect(new Set(cardDeck.map((c) => c.key)).size).toBe(cardDeck.length);

      // Deterministic: same inputs, same deck
      expect(buildDeck(deckObj, modeIdx, "ESV")).toEqual(cardDeck);
    });
  });

  test("every deck and translation has enough splittable verses for halves mode", () => {
    const halvesPairs = MODES[2].pairs; // 4 pairs
    DECKS.forEach((deckObj) => {
      TRANSLATIONS.forEach((tr) => {
        const eligible = deckObj.verses.filter(
          (v) => getVerseText(v, tr.id).trim().split(/\s+/).length >= 4
        );
        expect(
          eligible.length,
          `Deck ${deckObj.id} has too few splittable verses in ${tr.id}`
        ).toBeGreaterThanOrEqual(halvesPairs);
        const cardDeck = buildDeck(deckObj, 2, tr.id);
        expect(cardDeck.length).toBe(halvesPairs * 2);
      });
    });
  });
});
