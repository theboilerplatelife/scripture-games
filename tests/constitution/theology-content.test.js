import { describe, test, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { CHAPTERS } from "../../src/data/chapters.js";
import { authorOf } from "../../src/data/authorship.js";
import { TRANSLATIONS } from "../../src/data/translations.js";
import { STORIES } from "../../src/games/story-sequencer/storyData.js";

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

    const buddyPath = path.resolve(process.cwd(), "src/components/common/Buddy.jsx");
    const buddyCode = fs.readFileSync(buddyPath, "utf8");
    forbiddenKeywords.forEach((forbidden) => {
      const regex = new RegExp(`\\b${forbidden}:\\s*\\{`, "i");
      expect(regex.test(buddyCode), `Buddy.jsx must not define avatar config for "${forbidden}"`).toBe(false);
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

  test("Article 1.4: Every Story Sequencer character key has a Buddy.jsx avatar", () => {
    const buddyPath = path.resolve(process.cwd(), "src/components/common/Buddy.jsx");
    const buddyCode = fs.readFileSync(buddyPath, "utf8");

    new Set(STORIES.map((story) => story.character)).forEach((charKey) => {
      const regex = new RegExp(`\\b${charKey}:\\s*\\{`, "i");
      expect(
        regex.test(buddyCode),
        `Story character "${charKey}" has no avatar in Buddy.jsx and would render the default face`
      ).toBe(true);
    });
  });

  test("Article 1.4: All character keys must be defined in Buddy.jsx config", () => {
    const buddyPath = path.resolve(process.cwd(), "src/components/common/Buddy.jsx");
    const buddyCode = fs.readFileSync(buddyPath, "utf8");
    
    const distinctCharacters = new Set();
    CHAPTERS.forEach((c) => c.verses.forEach((v) => distinctCharacters.add(v.character)));

    distinctCharacters.forEach((charKey) => {
      const regex = new RegExp(`\\b${charKey}:\\s*\\{`, "i");
      expect(regex.test(buddyCode), `Missing avatar configuration in Buddy.jsx for character "${charKey}"`).toBe(true);
    });
  });
});
