import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { Portrait } from "../../src/art/Portrait.jsx";
import { PORTRAITS, ARMOUR_POSES } from "../../src/art/portraits.jsx";
import { PEOPLE } from "../../src/art/portrait-kit.jsx";
import { CHAPTERS } from "../../src/data/chapters.js";
import { authorOf, portraitOf } from "../../src/data/authorship.js";

const ALL_VERSES = CHAPTERS.flatMap((chapter) => chapter.verses);

function draw(verseRef) {
  const { container, unmount } = render(<Portrait verseRef={verseRef} />);
  const markup = container.querySelector("svg").innerHTML;
  unmount();
  return markup;
}

describe("verse portraits", () => {
  test("every verse draws the face of the person who wrote it", () => {
    ALL_VERSES.forEach((verse) => {
      const key = portraitOf(verse.ref);
      const entry = PORTRAITS[`${key}#${verse.ref}`] || PORTRAITS[key];
      expect(entry, `${verse.ref} has no portrait for "${key}"`).toBeTypeOf("function");
      expect(draw(verse.ref).length, `${verse.ref} draws almost nothing`).toBeGreaterThan(300);
    });
  });

  test("a person looks the same in every book they wrote", () => {
    // This is what lets a child learn a face: Paul in chains and Paul
    // dictating Romans differ only in what surrounds him
    const bustByPerson = new Map();
    Object.keys(PORTRAITS).forEach((key) => {
      const person = key.split("/")[0];
      const { container, unmount } = render(<svg>{PORTRAITS[key]()}</svg>);
      const bust = container.querySelector("[data-bust]").outerHTML;
      unmount();
      if (!bustByPerson.has(person)) bustByPerson.set(person, { key, bust });
      const first = bustByPerson.get(person);
      expect(
        bust,
        `${key} draws ${person} differently from ${first.key}`
      ).toBe(first.bust);
    });
  });

  test("no two portraits are the same picture", () => {
    const seen = new Map();
    Object.entries(PORTRAITS).forEach(([key, drawIt]) => {
      const { container, unmount } = render(<svg>{drawIt()}</svg>);
      const markup = container.innerHTML;
      unmount();
      const twin = seen.get(markup);
      expect(twin, `portraits "${key}" and "${twin}" are identical`).toBe(undefined);
      seen.set(markup, key);
    });
  });

  test("the armour chapter shows the piece each verse names", () => {
    // Eight levels of one letter: the variety comes from the armour, not
    // from putting a stranger's face on Paul's words
    Object.entries(ARMOUR_POSES).forEach(([ref, piece]) => {
      expect(authorOf(ref)).toBe("paul");
      expect(PORTRAITS[`paul/Ephesians#${ref}`], `${ref} has no ${piece} pose`).toBeTypeOf("function");
      expect(draw(ref)).not.toBe(draw("Ephesians 4:32"));
    });
  });

  test("every person drawn is a writer some verse actually has", () => {
    // An unused person in the kit is a face nobody will ever see
    const needed = new Set(ALL_VERSES.map((verse) => authorOf(verse.ref)));
    Object.keys(PEOPLE).forEach((person) => {
      expect(needed.has(person), `${person} is drawn but writes nothing in the app`).toBe(true);
    });
    needed.forEach((person) => {
      expect(PEOPLE[person], `${person} writes verses but has no face`).toBeTruthy();
    });
  });

  test("an unknown reference draws a bare scroll rather than a stranger", () => {
    // Unreachable in the app — a gate requires every verse to resolve —
    // but a typo must not put the words in some innocent person's mouth
    const markup = draw("Nowhere 1:1");
    expect(markup).toMatch(/<rect/);
    expect(markup).not.toMatch(/data-bust/);
  });

  test("a verse with no pose of its own falls back to the writer's portrait for that book", () => {
    // Ephesians 4:32 has no pose, so it shows the base Ephesians portrait
    expect(draw("Ephesians 4:32")).toBe(draw("Ephesians 5:8"));
    // …while two books by the same man differ
    expect(draw("Romans 12:10")).not.toBe(draw("Philippians 4:4"));
  });
});
