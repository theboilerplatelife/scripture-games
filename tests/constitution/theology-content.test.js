import { describe, test, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { CHAPTERS } from "../../src/data/chapters.js";
import { authorOf } from "../../src/data/authorship.js";
import { TRANSLATIONS } from "../../src/data/translations.js";
import { STORIES } from "../../src/games/story-sequencer/storyData.js";
import { CHARACTERS } from "../../src/games/who-am-i/whoAmIData.js";

// The 66 books, in order, used to check that the tables in this file name
// real scripture rather than a plausible-looking typo
const BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
  "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah",
  "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians",
  "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians",
  "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James",
  "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation",
];

describe("Constitution Gate: Theological & Content Integrity (Article 1)", () => {
  test("Article 1.4: Must contain exactly 15 chapters with 8 verses each (120 total)", () => {
    expect(CHAPTERS.length).toBe(15);
    
    let totalVerses = 0;
    CHAPTERS.forEach((chapter) => {
      expect(chapter.verses.length).toBe(8);
      totalVerses += chapter.verses.length;
    });
    expect(totalVerses).toBe(120);
  });

  test("Article 1.4: Every verse must provide valid non-empty text for all 4 translations (ESV, NET, NKJV, WEB)", () => {
    const requiredTranslations = ["ESV", "NET", "NKJV", "WEB"];
    
    CHAPTERS.forEach((chapter) => {
      chapter.verses.forEach((verse, idx) => {
        expect(verse.ref, `Chapter ${chapter.id} Level ${idx + 1} missing scripture reference`).toBeTruthy();
        expect(verse.cheer, `Chapter ${chapter.id} Level ${idx + 1} missing cheer`).toBeTruthy();
        expect(verse.hint, `Chapter ${chapter.id} Level ${idx + 1} missing hint`).toBeTruthy();
        
        requiredTranslations.forEach((tr) => {
          expect(verse.text[tr], `Chapter ${chapter.id} Level ${idx + 1} (${verse.ref}) missing ${tr} text`).toBeTruthy();
          expect(verse.text[tr].trim().length).toBeGreaterThan(3);
        });
      });
    });
  });

  test("Article 1.1: Translation metadata must define ESV, NET, NKJV, and WEB", () => {
    expect(TRANSLATIONS.length).toBe(4);
    const ids = TRANSLATIONS.map((t) => t.id);
    expect(ids).toEqual(["ESV", "NET", "NKJV", "WEB"]);
  });

  test("Article 1.2: Strict prohibition against visual depictions of Jesus Christ", () => {
    const forbiddenKeywords = ["jesus", "christ", "god", "yahweh", "lord_avatar"];
    
    CHAPTERS.forEach((chapter) => {
      chapter.verses.forEach((verse, idx) => {
        const charKey = (verse.character || "").toLowerCase();
        forbiddenKeywords.forEach((forbidden) => {
          expect(charKey, `Chapter ${chapter.id} Level ${idx + 1} assigns forbidden key "${charKey}"`).not.toBe(forbidden);
        });
      });
    });

    const buddyPath = path.resolve(process.cwd(), "src/art/portrait-kit.jsx");
    const portraitCode = fs.readFileSync(buddyPath, "utf8");
    forbiddenKeywords.forEach((forbidden) => {
      const regex = new RegExp(`\\b${forbidden}:\\s*\\{`, "i");
      expect(regex.test(portraitCode), `portrait-kit.jsx must not define a person for "${forbidden}"`).toBe(false);
    });

    STORIES.forEach((story) => {
      const charKey = (story.character || "").toLowerCase();
      forbiddenKeywords.forEach((forbidden) => {
        expect(charKey, `Story ${story.id} assigns forbidden character "${charKey}"`).not.toBe(forbidden);
      });
    });
  });

  test("Article 1.5: The buddy beside a verse is the person who wrote or spoke it", () => {
    // This replaces the old per-chapter uniqueness rule, which had forced
    // 88 of 120 verses to name someone who did not write them. Variety is
    // the artwork's job; the face has to be true.
    const wrong = [];
    CHAPTERS.forEach((chapter) => {
      chapter.verses.forEach((verse) => {
        const author = authorOf(verse.ref);
        expect(author, `${verse.ref} has no entry in authorship.js`).toBeTruthy();
        if (verse.character !== author) {
          wrong.push(`${verse.ref}: shows ${verse.character}, written by ${author}`);
        }
      });
    });
    expect(wrong, `misattributed verses:\n${wrong.join("\n")}`).toEqual([]);
  });

  test("Article 1.5: A verse never names someone other than the buddy shown", () => {
    // A hint that says "Paul wrote this" beside Timothy's face teaches the
    // child the opposite of what the picture says
    const NAMES = {
      Paul: "paul", David: "david", John: "john", Solomon: "solomon", Matthew: "matthew",
      Peter: "peter", James: "james", Luke: "luke", Mark: "mark", Moses: "moses",
      Joshua: "joshua", Isaiah: "isaiah", Jeremiah: "jeremiah", Job: "job",
      Micah: "micah", Nehemiah: "nehemiah",
    };
    const clashes = [];
    CHAPTERS.forEach((chapter) => {
      chapter.verses.forEach((verse) => {
        const words = `${verse.hint} ${verse.cheer}`;
        Object.entries(NAMES).forEach(([name, key]) => {
          if (new RegExp(`\\b${name}\\b`).test(words) && key !== verse.character) {
            clashes.push(`${verse.ref}: shows ${verse.character}, text says ${name}`);
          }
        });
      });
    });
    expect(clashes, clashes.join("\n")).toEqual([]);
  });

  test("Article 1.5: Anonymous scripture is not given a borrowed name", () => {
    // The unnamed psalms and Hebrews get a portrait like anyone else, but
    // they must not be attributed to a person scripture does not name
    const anonymous = CHAPTERS.flatMap((c) => c.verses).filter((v) =>
      ["psalmist", "hebrews_writer", "chronicler", "sons_of_korah"].includes(v.character)
    );
    expect(anonymous.length).toBeGreaterThan(0);
    anonymous.forEach((verse) => {
      expect(
        /^(The Psalmist|The Writer of Hebrews|The Chronicler|The Sons of Korah)$/.test(verse.name),
        `${verse.ref} labels an anonymous writer as "${verse.name}"`
      ).toBe(true);
    });
  });

  /* ----------------------------------------------------------------
     Who Am I?'s reveal verses (Article 1.5)

     Solving a mystery shows a verse under the face. All 36 were checked
     by hand once and every one came from that person's own passage — but
     a one-time reading is not a gate. Nothing stopped a later edit from
     leaving Rahab with Micah's words, or a new character arriving with a
     verse picked for how it sounds.

     Below is where scripture records each of these people. A reveal verse
     must come from one of their books. This catches the wrong *person*,
     which is the error that teaches a child something false; it cannot
     catch a wrong verse inside the right book, and it says nothing about
     whether the quoted words match the ESV the reveal claims — that needs
     a trustworthy copy of the text to compare against, which this repo
     does not have.
     ---------------------------------------------------------------- */
  const SCRIPTURAL_HOME = {
    adam: ["Genesis", "1 Chronicles", "Luke", "Romans", "1 Corinthians", "1 Timothy"],
    eve: ["Genesis", "2 Corinthians", "1 Timothy"],
    noah: ["Genesis", "1 Chronicles", "Isaiah", "Ezekiel", "Matthew", "Luke", "Hebrews", "1 Peter", "2 Peter"],
    abraham: ["Genesis", "Exodus", "Joshua", "Isaiah", "Matthew", "Luke", "John", "Acts", "Romans", "Galatians", "Hebrews", "James"],
    sarah: ["Genesis", "Isaiah", "Romans", "Hebrews", "1 Peter"],
    jacob: ["Genesis", "Hosea", "Malachi", "Matthew", "Romans", "Hebrews"],
    joseph: ["Genesis", "Exodus", "Acts", "Hebrews"],
    moses: ["Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Psalms", "Matthew", "Mark", "Luke", "John", "Acts", "Hebrews"],
    miriam: ["Exodus", "Numbers", "Deuteronomy", "Micah"],
    joshua: ["Exodus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Hebrews"],
    rahab: ["Joshua", "Matthew", "Hebrews", "James"],
    gideon: ["Judges", "Hebrews"],
    samson: ["Judges", "Hebrews"],
    ruth: ["Ruth", "Matthew"],
    samuel: ["1 Samuel", "2 Samuel", "1 Chronicles", "Psalms", "Jeremiah", "Acts", "Hebrews"],
    david: ["1 Samuel", "2 Samuel", "1 Kings", "1 Chronicles", "2 Chronicles", "Psalms", "Isaiah", "Matthew", "Mark", "Luke", "Acts", "Romans", "Hebrews"],
    solomon: ["2 Samuel", "1 Kings", "1 Chronicles", "2 Chronicles", "Proverbs", "Ecclesiastes", "Song of Solomon", "Matthew", "Luke", "Acts"],
    elijah: ["1 Kings", "2 Kings", "2 Chronicles", "Malachi", "Matthew", "Mark", "Luke", "John", "Romans", "James"],
    elisha: ["1 Kings", "2 Kings", "Luke"],
    naaman: ["2 Kings", "Luke"],
    esther: ["Esther"],
    job: ["Job", "Ezekiel", "James"],
    isaiah: ["2 Kings", "2 Chronicles", "Isaiah", "Matthew", "Mark", "Luke", "John", "Acts", "Romans"],
    jeremiah: ["2 Chronicles", "Jeremiah", "Lamentations", "Daniel", "Matthew"],
    daniel: ["Daniel", "Ezekiel", "Matthew", "Mark"],
    jonah: ["2 Kings", "Jonah", "Matthew", "Luke"],
    mary: ["Matthew", "Mark", "Luke", "John", "Acts"],
    john_baptist: ["Matthew", "Mark", "Luke", "John", "Acts"],
    peter: ["Matthew", "Mark", "Luke", "John", "Acts", "1 Corinthians", "Galatians", "1 Peter", "2 Peter"],
    john: ["Matthew", "Mark", "Luke", "John", "Acts", "Galatians", "1 John", "2 John", "3 John", "Revelation"],
    matthew: ["Matthew", "Mark", "Luke", "Acts"],
    // Luke names himself nowhere in his own two books; Paul names him three times
    luke: ["Luke", "Acts", "Colossians", "2 Timothy", "Philemon"],
    paul: ["Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "2 Peter"],
    stephen: ["Acts"],
    nehemiah: ["Ezra", "Nehemiah"],
    micah: ["Jeremiah", "Micah"],
  };

  // "1 Samuel 3:10" and "Revelation 1:9a" both parse; the letter marks a
  // verse quoted in part, which Article 1.1 requires be contiguous
  const REF = /^(.+?)\s+(\d+):(\d+)([a-c])?$/;

  test("Article 1.5: A Who Am I reveal verse comes from that person's own scripture", () => {
    const wrong = [];
    CHARACTERS.forEach((character) => {
      const match = REF.exec(character.scriptureRef);
      expect(match, `${character.name}'s reference "${character.scriptureRef}" is not a Book C:V`).toBeTruthy();
      const [, book] = match;
      const home = SCRIPTURAL_HOME[character.id];
      if (!home.includes(book)) {
        wrong.push(`${character.name}: shown ${character.scriptureRef}, but scripture records them in ${home.join(", ")}`);
      }
    });
    expect(wrong, `reveal verses belonging to someone else:\n${wrong.join("\n")}`).toEqual([]);
  });

  test("Article 1.5: Every mystery character is covered by the reveal-verse gate", () => {
    // Without this a new character skips the check above simply by not
    // being listed — the gate would pass by having nothing to say
    const listed = Object.keys(SCRIPTURAL_HOME).sort();
    const playable = CHARACTERS.map((c) => c.id).sort();
    expect(listed, "a character is missing from, or stale in, SCRIPTURAL_HOME").toEqual(playable);
  });

  test("Article 1.5: The reveal-verse gate names only real books", () => {
    // A typo in the table above ("Nehemia") would silently allow anything
    // from the real book, so the guard is guarded
    const unknown = [...new Set(Object.values(SCRIPTURAL_HOME).flat())].filter((b) => !BOOKS.includes(b));
    expect(unknown, `not books of the Bible: ${unknown.join(", ")}`).toEqual([]);
  });

  test("Article 1.5: No two mysteries reveal the same verse", () => {
    const refs = CHARACTERS.map((c) => c.scriptureRef);
    const repeated = refs.filter((ref, i) => refs.indexOf(ref) !== i);
    expect(repeated, `the same verse reveals more than one person: ${repeated.join(", ")}`).toEqual([]);
  });

  test("Article 1.4: Every verse resolves to a portrait", () => {
    // The face beside a verse is looked up from the verse itself, so a
    // missing portrait means a level renders a stranger
    const portraits = fs.readFileSync(path.resolve(process.cwd(), "src/art/portraits.jsx"), "utf8");
    const missing = [];
    CHAPTERS.forEach((chapter) => {
      chapter.verses.forEach((verse) => {
        const key = `${authorOf(verse.ref)}/${verse.ref.replace(/\s+\d+[:\d–\-a-c]*$/, "").trim()}`;
        if (!portraits.includes(`"${key}"`)) missing.push(`${verse.ref} -> ${key}`);
      });
    });
    expect(missing, `verses with no portrait:\n${missing.join("\n")}`).toEqual([]);
  });
});
