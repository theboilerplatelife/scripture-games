import { describe, test, expect } from "vitest";
import {
  bookOf,
  authorOf,
  portraitOf,
  BOOK_AUTHORS,
  PSALM_AUTHORS,
  SPEAKER_OVERRIDES,
} from "../../src/data/authorship.js";
import { CHAPTERS } from "../../src/data/chapters.js";

/* This module decides whose face sits beside a verse, so its answers are
   content, not plumbing — a wrong entry here teaches a child that Isaiah
   wrote Jeremiah. */

describe("authorship", () => {
  test("reads the book out of a reference, including numbered books and part-verses", () => {
    expect(bookOf("1 Thessalonians 5:17")).toBe("1 Thessalonians");
    expect(bookOf("Psalm 23:1")).toBe("Psalm");
    expect(bookOf("Proverbs 3:5a")).toBe("Proverbs");
    expect(bookOf("Romans 8:38–39")).toBe("Romans");
    expect(bookOf("Nehemiah 8:10c")).toBe("Nehemiah");
  });

  test("names the writer of each book", () => {
    expect(authorOf("Philippians 4:13")).toBe("paul");
    expect(authorOf("Proverbs 15:1")).toBe("solomon");
    expect(authorOf("1 John 4:8b")).toBe("john");
    expect(authorOf("James 1:19")).toBe("james");
    expect(authorOf("Genesis 1:1")).toBe("moses");
    expect(authorOf("Acts 1:8b")).toBe("luke");
  });

  test("follows the psalms' own superscriptions rather than crediting David with all of them", () => {
    expect(authorOf("Psalm 23:1")).toBe("david");
    expect(authorOf("Psalm 139:14")).toBe("david");
    expect(authorOf("Psalm 46:1")).toBe("sons_of_korah");
    // No superscription names a writer for these
    expect(authorOf("Psalm 119:105")).toBe("psalmist");
    expect(authorOf("Psalm 100:1")).toBe("psalmist");
  });

  test("leaves anonymous scripture anonymous", () => {
    expect(authorOf("Hebrews 13:8")).toBe("hebrews_writer");
    expect(BOOK_AUTHORS.Hebrews).toBe("hebrews_writer");
  });

  test("gives a recorded song back to the one who sang it", () => {
    // The Chronicler writes the book; David sang the words
    expect(SPEAKER_OVERRIDES["1 Chronicles 16:34"]).toBe("david");
    expect(authorOf("1 Chronicles 16:34")).toBe("david");
    expect(authorOf("Nehemiah 8:10c")).toBe("nehemiah");
  });

  test("a portrait is a person in a particular book", () => {
    // The same man, drawn differently in each letter he wrote
    expect(portraitOf("Philippians 4:13")).toBe("paul/Philippians");
    expect(portraitOf("Ephesians 6:16")).toBe("paul/Ephesians");
    expect(portraitOf("Psalm 23:1")).toBe("david/Psalm");
  });

  test("covers every verse in the app, and yields fewer portraits than verses", () => {
    const refs = CHAPTERS.flatMap((chapter) => chapter.verses.map((verse) => verse.ref));
    refs.forEach((ref) => {
      expect(authorOf(ref), `${ref} has no author`).toBeTruthy();
    });
    const portraits = new Set(refs.map(portraitOf));
    expect(refs.length).toBe(120);
    // One face per person-and-book: fewer drawings than levels, and every
    // one of them true
    expect(portraits.size).toBeLessThan(refs.length);
    expect(portraits.size).toBeGreaterThan(20);
  });

  test("every psalm and book the app quotes has an entry", () => {
    const refs = CHAPTERS.flatMap((chapter) => chapter.verses.map((verse) => verse.ref));
    refs.forEach((ref) => {
      if (bookOf(ref) === "Psalm") {
        const number = Number(ref.match(/Psalm (\d+)/)[1]);
        expect(PSALM_AUTHORS[number], `Psalm ${number} is unmapped`).toBeTruthy();
      } else {
        expect(BOOK_AUTHORS[bookOf(ref)], `${bookOf(ref)} is unmapped`).toBeTruthy();
      }
    });
  });
});
