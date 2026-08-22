/* ---------- Shared star/progress math ----------
   One home for the expressions both games kept re-writing: what counts
   as "starred", how totals are summed per game namespace, and how the
   next unfinished item is found. */

// Star keys are namespaced per game inside one storage map: Verse Builder
// uses bare "{chapter}-{level}" keys, so every OTHER game's prefix must be
// excluded from its totals. Add new games' prefixes here.
/* Verse Builder has no prefix of its own, so it counts by exclusion: every
   other game's keys must be listed here or its totals quietly inflate. */
export const OTHER_GAME_PREFIXES = ["mm-", "ss-", "wai-"];

// A key counts as starred only for a positive numeric value — corrupt
// or foreign values must never unlock or count anything.
export function isStarred(stars, key) {
  const v = stars[key];
  return typeof v === "number" && v > 0;
}

export function starValue(stars, key) {
  const v = stars[key];
  return typeof v === "number" ? v : 0;
}

// Total stars, optionally limited to (or excluding) a key prefix — the
// games share one storage map, namespaced by prefix (e.g. "mm-").
export function sumStars(stars, { prefix, excludePrefix } = {}) {
  const excludeList = Array.isArray(excludePrefix)
    ? excludePrefix
    : excludePrefix
    ? [excludePrefix]
    : [];

  return Object.entries(stars).reduce((acc, [k, v]) => {
    if (typeof v !== "number") return acc;
    if (prefix && !k.startsWith(prefix)) return acc;
    if (excludeList.some((p) => k.startsWith(p))) return acc;
    return acc + v;
  }, 0);
}

// Sum an explicit group of keys (one chapter's levels, one deck's modes)
export function groupStars(stars, keys) {
  return keys.reduce((acc, k) => acc + starValue(stars, k), 0);
}

// Index of the nearest item still unfinished, scanning forward from
// currentIdx with wraparound and never returning currentIdx itself
// (the caller just finished it; the stars prop may not reflect that yet).
export function nextUnfinished(count, currentIdx, isDone) {
  return Array.from({ length: count }, (_, k) => (currentIdx + 1 + k) % count).find(
    (i) => i !== currentIdx && !isDone(i)
  );
}
