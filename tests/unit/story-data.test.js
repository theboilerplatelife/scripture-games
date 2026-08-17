import { describe, test, expect, vi } from "vitest";
import {
  VOLUMES,
  STORIES,
  starsForAttempts,
  getVolumeStories,
  getStoryById,
  shuffleEvents,
  evaluateOrder,
} from "../../src/games/story-sequencer/storyData.js";
import * as randomUtils from "../../src/utils/random.js";

describe("Story Sequencer data & helper functions", () => {
  test("defines 6 volumes containing exactly 36 stories in total", () => {
    expect(VOLUMES.length).toBe(6);
    expect(STORIES.length).toBe(36);

    const allStoryIds = VOLUMES.flatMap((v) => v.storyIds);
    expect(allStoryIds.length).toBe(36);
    expect(new Set(allStoryIds).size).toBe(36);

    VOLUMES.forEach((vol) => {
      expect(vol.id).toBeGreaterThanOrEqual(1);
      expect(vol.title).toBeTruthy();
      expect(vol.icon).toBeTruthy();
      expect(vol.color).toBeTruthy();
      const volStories = getVolumeStories(vol.id);
      expect(volStories.length).toBe(6);
    });
  });

  test("every story has valid scripture references and 4 to 5 chronological events", () => {
    STORIES.forEach((story) => {
      expect(story.id).toBeGreaterThanOrEqual(1);
      expect(story.title).toBeTruthy();
      expect(story.scripture).toBeTruthy();
      expect(story.events.length).toBeGreaterThanOrEqual(4);
      expect(story.events.length).toBeLessThanOrEqual(5);

      story.events.forEach((ev, idx) => {
        expect(ev.step).toBe(idx + 1);
        expect(ev.title).toBeTruthy();
        expect(ev.text).toBeTruthy();
        expect(ev.ref).toBeTruthy();
      });
    });
  });

  test("getStoryById finds story by ID or falls back to first story", () => {
    expect(getStoryById(1).title).toBe("The Days of Creation");
    expect(getStoryById(16).title).toBe("David & Goliath in the Valley");
    expect(getStoryById(999)).toBe(STORIES[0]);
  });

  test("starsForAttempts calculates generous star awards for children", () => {
    expect(starsForAttempts(1)).toBe(3);
    expect(starsForAttempts(2)).toBe(3);
    expect(starsForAttempts(3)).toBe(2);
    expect(starsForAttempts(4)).toBe(2);
    expect(starsForAttempts(5)).toBe(1);
    expect(starsForAttempts(10)).toBe(1);
  });

  test("shuffleEvents produces a valid shuffled array that is not pre-solved", () => {
    const story = STORIES[0];
    const shuffled = shuffleEvents(story, 0);
    expect(shuffled.length).toBe(story.events.length);
    // Guarantees starting state is not completely pre-solved
    const isSolved = shuffled.every((ev, i) => ev.step === i + 1);
    expect(isSolved).toBe(false);

    // Deterministic shuffle with same seed
    expect(shuffleEvents(story, 0)).toEqual(shuffled);

    // When random shuffle returns an already-solved array, it swaps the first two items
    const spy = vi.spyOn(randomUtils, "shuffle").mockImplementation((arr) => [...arr]);
    const guarded = shuffleEvents(story, 999);
    expect(guarded[0].step).toBe(2);
    expect(guarded[1].step).toBe(1);
    spy.mockRestore();
  });

  test("evaluateOrder checks placement accuracy and completion state", () => {
    const events = [
      { step: 1, title: "A" },
      { step: 3, title: "C" },
      { step: 2, title: "B" },
    ];
    const check1 = evaluateOrder(events);
    expect(check1.isComplete).toBe(false);
    expect(check1.correctCount).toBe(1); // Only step 1 is in index 0
    expect(check1.results).toEqual([true, false, false]);

    const solvedEvents = [
      { step: 1, title: "A" },
      { step: 2, title: "B" },
      { step: 3, title: "C" },
    ];
    const check2 = evaluateOrder(solvedEvents);
    expect(check2.isComplete).toBe(true);
    expect(check2.correctCount).toBe(3);
    expect(check2.results).toEqual([true, true, true]);
  });

});
