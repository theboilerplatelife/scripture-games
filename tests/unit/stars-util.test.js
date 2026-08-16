import { describe, test, expect } from "vitest";
import { isStarred, starValue, sumStars, groupStars, nextUnfinished } from "../../src/utils/stars.js";

describe("Shared star/progress math", () => {
  const stars = { "1-0": 3, "1-1": 0, "1-2": "corrupt", "mm-1-0": 2, "mm-1-1": 1 };

  test("isStarred requires a positive numeric value", () => {
    expect(isStarred(stars, "1-0")).toBe(true);
    expect(isStarred(stars, "1-1")).toBe(false); // zero
    expect(isStarred(stars, "1-2")).toBe(false); // corrupt string
    expect(isStarred(stars, "missing")).toBe(false);
  });

  test("starValue coerces anything non-numeric to zero", () => {
    expect(starValue(stars, "1-0")).toBe(3);
    expect(starValue(stars, "1-2")).toBe(0);
    expect(starValue(stars, "missing")).toBe(0);
  });

  test("sumStars filters by prefix, exclusion, or nothing, skipping corrupt values", () => {
    expect(sumStars(stars)).toBe(6); // everything numeric
    expect(sumStars(stars, { prefix: "mm-" })).toBe(3);
    expect(sumStars(stars, { excludePrefix: "mm-" })).toBe(3);
  });

  test("groupStars sums an explicit key list", () => {
    expect(groupStars(stars, ["1-0", "1-2", "mm-1-1"])).toBe(4);
  });

  test("nextUnfinished scans forward with wraparound and never returns the current index", () => {
    const done = (finished) => (i) => finished.includes(i);
    // From 1 with only 0 unfinished: wraps past 2
    expect(nextUnfinished(3, 1, done([1, 2]))).toBe(0);
    // Straightforward forward hit
    expect(nextUnfinished(3, 0, done([0]))).toBe(1);
    // Skips a finished item between current and the target
    expect(nextUnfinished(3, 0, done([1]))).toBe(2);
    // Everything else finished: current index is never offered back
    expect(nextUnfinished(2, 0, done([1]))).toBeUndefined();
  });
});
