import { describe, test, expect } from "vitest";
import { TRANSLATIONS } from "../../src/data/translations.js";
import {
  DECKS,
  MODES,
  getVerseText,
  clipWords,
  splitHalves,
  starsForMisses,
  getVerseArt,
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

  test("getVerseArt maps biblical themes to accurate artwork keys", () => {
    expect(getVerseArt({ ref: "Psalm 23:1" })).toBe("shepherd");
    expect(getVerseArt({ ref: "Psalm 119:105" })).toBe("lamp");
    expect(getVerseArt({ ref: "Genesis 1:1" })).toBe("creation");
    expect(getVerseArt({ ref: "1 Thessalonians 5:17" })).toBe("dove_peace");
    expect(getVerseArt({ ref: "Ephesians 6:11" })).toBe("armor_shield");
    expect(getVerseArt({ ref: "Psalm 100:1" })).toBe("praise_harp");
    expect(getVerseArt({ ref: "1 John 4:19" })).toBe("love_heart");
    expect(getVerseArt({ ref: "Proverbs 3:5" })).toBe("wisdom_scroll");
    expect(getVerseArt({ ref: "Matthew 5:14" })).toBe("light_city");
    expect(getVerseArt({ ref: "Psalm 136:1" })).toBe("rainbow");
    expect(getVerseArt({ ref: "Galatians 5:22" })).toBe("fruit_vine");
    expect(getVerseArt({ ref: "Psalm 4:8" })).toBe("calm_waters");
    expect(getVerseArt({ ref: "Isaiah 40:31" })).toBe("eagle_wings");
    expect(getVerseArt({ ref: "Matthew 28:19" })).toBe("gospel_world");
    expect(getVerseArt({ ref: "Revelation 21:4" })).toBe("hope_heaven");
    expect(getVerseArt({ ref: "Psalm 139:14" })).toBe("starry_sky");
    expect(getVerseArt({})).toBe("creation");
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
        expect(card.art).toBeTruthy();
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

      // A different play seed deals a different arrangement of valid cards
      const reshuffled = buildDeck(deckObj, modeIdx, "ESV", 1);
      expect(reshuffled.length).toBe(mode.pairs * 2);
      expect(reshuffled.map((c) => c.text)).not.toEqual(cardDeck.map((c) => c.text));
    });
  });

  test("no board ever shows identical card text from different pairs (any deck, mode, translation)", () => {
    DECKS.forEach((deckObj) => {
      MODES.forEach((mode, modeIdx) => {
        TRANSLATIONS.forEach((tr) => {
          const cardDeck = buildDeck(deckObj, modeIdx, tr.id);
          expect(
            cardDeck.length,
            `Deck ${deckObj.id} ${mode.id} ${tr.id} came up short after collision filtering`
          ).toBe(mode.pairs * 2);

          const textToPair = {};
          cardDeck.forEach((card) => {
            expect(
              textToPair[card.text] === undefined || textToPair[card.text] === card.pairId,
              `Deck ${deckObj.id} ${mode.id} ${tr.id} deals ambiguous card "${card.text}"`
            ).toBe(true);
            textToPair[card.text] = card.pairId;
          });
        });
      });
    });
  });

  test("every board has 100% unique background artwork across different pairs", () => {
    DECKS.forEach((deckObj) => {
      MODES.forEach((mode, modeIdx) => {
        TRANSLATIONS.forEach((tr) => {
          [0, 1, 2].forEach((seed) => {
            const cardDeck = buildDeck(deckObj, modeIdx, tr.id, seed);
            const pairArts = {};
            cardDeck.forEach((card) => {
              pairArts[card.pairId] = card.art;
            });
            const uniqueArts = new Set(Object.values(pairArts));
            expect(
              uniqueArts.size,
              `Deck ${deckObj.id} ${mode.id} ${tr.id} seed ${seed} has duplicate artwork across pairs: ${Object.values(pairArts).join(", ")}`
            ).toBe(mode.pairs);
          });
        });
      });
    });
  });
});
