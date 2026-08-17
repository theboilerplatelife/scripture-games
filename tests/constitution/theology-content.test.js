import { describe, test, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { CHAPTERS } from "../../src/data/chapters.js";
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

  test("Article 1.4: Every level in a chapter must feature a unique character icon (0 duplicates per chapter)", () => {
    CHAPTERS.forEach((chapter) => {
      const seen = new Set();
      const duplicates = [];
      
      chapter.verses.forEach((verse, idx) => {
        if (seen.has(verse.character)) {
          duplicates.push(`Level ${idx + 1}: ${verse.character}`);
        }
        seen.add(verse.character);
      });

      expect(duplicates.length, `Chapter ${chapter.id} (${chapter.title}) has duplicate characters: ${duplicates.join(", ")}`).toBe(0);
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
