import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { ChapterSelect } from "../../src/games/verse-builder/ChapterSelect.jsx";
import { MMChapterSelect } from "../../src/games/memory-match/MMChapterSelect.jsx";
import { VolumeSelect } from "../../src/games/story-sequencer/VolumeSelect.jsx";
import { CollectionSelect } from "../../src/games/who-am-i/CollectionSelect.jsx";
import { progressCardLabel } from "../../src/components/common/progressCardLabel.js";
import { CHAPTERS } from "../../src/data/chapters.js";
import { DECKS, MODES } from "../../src/games/memory-match/matchData.js";
import { VOLUMES, getVolumeStories } from "../../src/games/story-sequencer/storyData.js";
import { COLLECTIONS } from "../../src/games/who-am-i/whoAmIData.js";

/*
 * Constitution Gate: One Progress Card (Article 4.7)
 *
 * Four games open on a list of cards, and they drifted apart one small
 * decision at a time: Story Sequencer never stamped a finished volume,
 * two games spelled their counts as literals, Who Am I rewrote the unlock
 * sentence and put its completion state in the slot the others reserve
 * for the way in, and only Memory Match told a screen reader that a card
 * was finished. None of it was visible from inside any one game.
 *
 * Every screen below is rendered twice — untouched, and fully starred —
 * because the rules worth keeping are about what changes between those
 * two states and what must not.
 */

const noop = () => {};

const starsFor = (entries) => Object.fromEntries(entries.map((k) => [k, 3]));

const SCREENS = [
  {
    game: "Verse Builder",
    noun: "Chapter",
    action: "Choose a verse →",
    itemsIn: (i) => CHAPTERS[i].verses.length,
    render: (stars) => (
      <ChapterSelect
        stars={stars}
        translation="ESV"
        onSelectChapter={noop}
        onBackToHub={noop}
        onOpenSettings={noop}
      />
    ),
    full: starsFor(CHAPTERS.flatMap((c) => c.verses.map((_, i) => `${c.id}-${i}`))),
  },
  {
    game: "Memory Match",
    noun: "Deck",
    action: "Choose a mode →",
    itemsIn: () => MODES.length,
    render: (stars) => (
      <MMChapterSelect
        stars={stars}
        translation="ESV"
        onSelectChapter={noop}
        onBackToHub={noop}
        onOpenSettings={noop}
      />
    ),
    full: starsFor(DECKS.flatMap((d) => MODES.map((_, m) => `mm-${d.id}-${m}`))),
  },
  {
    game: "Story Sequencer",
    noun: "Volume",
    action: "Choose a story →",
    itemsIn: (i) => getVolumeStories(VOLUMES[i].id).length,
    render: (stars) => (
      <VolumeSelect stars={stars} onSelectVolume={noop} onBackToHub={noop} onOpenSettings={noop} />
    ),
    full: starsFor(VOLUMES.flatMap((v) => getVolumeStories(v.id).map((s) => `ss-${s.id}`))),
  },
  {
    game: "Who Am I?",
    noun: "Collection",
    action: "Start a round →",
    itemsIn: (i) => COLLECTIONS[i].characterIds.length,
    render: (stars) => (
      <CollectionSelect
        stars={stars}
        onSelectCollection={noop}
        onBackToHub={noop}
        onOpenSettings={noop}
      />
    ),
    full: starsFor(COLLECTIONS.flatMap((c) => c.characterIds.map((id) => `wai-${id}`))),
  },
];

const cardsOf = (container) => [...container.querySelectorAll(".vb-chapter-card")];
const meta = (card) => [...card.querySelector(".vb-chapter-meta").children].map((el) => el.textContent);

describe("Constitution Gate: One Progress Card (Article 4.7)", () => {
  test.each(SCREENS)("$game's cards carry the same slots, in the same order", (screen) => {
    const { container, unmount } = render(screen.render({}));
    cardsOf(container).forEach((card, i) => {
      const where = `${screen.game} card ${i + 1}`;
      expect(card.querySelector(".vb-tape"), `${where} has no tape`).toBeTruthy();
      expect(
        card.querySelector(".vb-chapter-num").textContent,
        `${where}'s eyebrow is not "{Noun} {id}"`
      ).toMatch(new RegExp(`^${screen.noun} \\d+$`));
      expect(card.querySelector(".vb-chapter-stars").textContent).toMatch(/^⭐ \d+\/\d+$/);
      expect(card.querySelector(".vb-chapter-title").textContent.trim(), where).toBeTruthy();
      expect(card.querySelector(".vb-chapter-sub").textContent.trim(), where).toBeTruthy();
      expect(meta(card).length, `${where}'s meta row is not two slots`).toBe(2);
    });
    unmount();
  });

  test.each(SCREENS)("$game counts what is inside rather than spelling it", (screen) => {
    // A literal cannot drift out of step with the data; a count cannot
    const { container, unmount } = render(screen.render({}));
    cardsOf(container).forEach((card, i) => {
      expect(
        meta(card)[0],
        `${screen.game} card ${i + 1} does not open with its true count`
      ).toMatch(new RegExp(`^${screen.itemsIn(i)} `));
    });
    unmount();
  });

  test.each(SCREENS)("$game's way in never becomes a status line", (screen) => {
    /* The action slot is a constant call to action: a finished card reads
       the same as an untouched one. Completion is the stamp's job. */
    const untouched = render(screen.render({}));
    const first = cardsOf(untouched.container)[0];
    expect(meta(first)[1], `${screen.game}'s first card is not its action`).toBe(screen.action);
    untouched.unmount();

    const finished = render(screen.render(screen.full));
    cardsOf(finished.container).forEach((card, i) => {
      expect(
        meta(card)[1],
        `${screen.game} card ${i + 1} changed its call to action once completed`
      ).toBe(screen.action);
    });
    finished.unmount();
  });

  test.each(SCREENS)("$game locks with the shared sentence", (screen) => {
    const { container, unmount } = render(screen.render({}));
    const locked = cardsOf(container).filter((c) => c.disabled);
    expect(locked.length, `${screen.game} locks nothing at all`).toBeGreaterThan(0);
    locked.forEach((card) => {
      expect(card.querySelector(".vb-chapter-title").textContent).toContain(`Locked ${screen.noun}`);
      expect(card.querySelector(".vb-chapter-sub").textContent).toBe(
        `Earn at least 1 star in the previous ${screen.noun.toLowerCase()} to unlock.`
      );
      expect(meta(card)[1]).toBe("🔒 Locked");
    });
    unmount();
  });

  test.each(SCREENS)("$game stamps a finished card, and says so out loud", (screen) => {
    const untouched = render(screen.render({}));
    expect(
      untouched.container.querySelector(".vb-stamp"),
      `${screen.game} stamps a card nobody has played`
    ).toBeNull();
    untouched.unmount();

    const finished = render(screen.render(screen.full));
    cardsOf(finished.container).forEach((card, i) => {
      const stamp = card.querySelector(".vb-stamp");
      expect(stamp, `${screen.game} card ${i + 1} is finished but unstamped`).toBeTruthy();
      expect(stamp.textContent).toBe("★ Perfect!");
      /* The stamp is aria-hidden, so the card's own name has to carry it
         or a screen-reader user never learns the card is finished */
      expect(stamp.getAttribute("aria-hidden")).toBe("true");
      expect(
        card.getAttribute("aria-label"),
        `${screen.game} card ${i + 1} does not speak its completion`
      ).toMatch(/\(completed with every star\)$/);
    });
    finished.unmount();
  });

  test("the shared card label speaks every state", () => {
    const base = { noun: "Chapter", id: 3, title: "Little Seeds" };
    expect(progressCardLabel({ ...base, unlocked: true })).toBe("Chapter 3: Little Seeds");
    expect(progressCardLabel({ ...base, unlocked: false })).toBe("Chapter 3: Locked");
    expect(progressCardLabel({ ...base, unlocked: true, complete: true })).toBe(
      "Chapter 3: Little Seeds (completed)"
    );
    expect(progressCardLabel({ ...base, unlocked: true, complete: true, perfect: true })).toBe(
      "Chapter 3: Little Seeds (completed with every star)"
    );
  });
});
