import { useEffect, useRef } from "react";
import { toHash } from "./useHashRoute.js";

/* Keeps one game's screen and the address bar in step, both ways.

   Each game says which of its screens are worth a URL — the lists and the
   board, not the transient win cards — and how to read a route back into
   its own state. Everything else stays where it is, so a win card sits on
   the board's URL and a refresh puts the player back on the board rather
   than on a celebration they already had.

   `place` is the game's current { a, b } (chapter and level, deck and
   mode, volume and story), or null while the screen should not own a URL.

   The awkward part is that both directions run as effects in the same
   commit. When Back changes the route, the game's state has not caught up
   yet, so a naive "state moved, announce it" writes the *old* place over
   the new URL — which pushes another entry, which applies again. That loop
   put fifty entries in the history in under a second. `expected` is how
   this hook tells its own echo apart from the player moving. */
export function useRouteSync({ game, route, navigate, place, apply }) {
  const applyRef = useRef(apply);
  useEffect(() => {
    applyRef.current = apply;
  }, [apply]);

  // The hash we are currently applying, until the game's state catches up
  const expected = useRef(null);
  const hydrated = useRef(false);

  /* Compared by value, not identity. The browser delivers hashchange after
     our own navigate has already updated the route, so the same place
     arrives twice — and re-applying it would push the player off a win
     card, back onto the board underneath it. */
  const lastApplied = useRef(null);

  // Declared first so it runs before the writer below in the same commit
  useEffect(() => {
    if (!route || route.game !== game) return;
    const hash = toHash(route);
    hydrated.current = true;
    if (hash === lastApplied.current) return;
    lastApplied.current = hash;
    expected.current = hash;
    applyRef.current(route);
  }, [game, route]);

  // The screen moved: tell the address bar
  useEffect(() => {
    if (!hydrated.current || !navigate || !place) return;
    const next = toHash({ game, a: place.a ?? null, b: place.b ?? null });

    if (expected.current) {
      // Still mid-apply: either this render is the stale one (skip it), or
      // the state has landed and the URL already says so (nothing to do)
      if (next === expected.current) expected.current = null;
      return;
    }
    navigate({ game, a: place.a ?? null, b: place.b ?? null });
  }, [game, navigate, place, place?.a, place?.b]);
}
