import { useCallback, useEffect, useState } from "react";

/* Where the player is, kept in the address bar.

   Refreshing used to drop everyone back on the splash screen, and the
   tablet back gesture left the app entirely. The hash carries game and
   place — "#/verse-builder/3/5" is chapter 3, level 5 — so a refresh
   lands where you were and Back walks the screens you came through.

   The hash, not the History API, because the app is a static bundle
   served offline from a service worker: "#/..." needs no server rewrite
   and no Netlify redirect rule to survive a hard refresh. */

const GAMES = ["hub", "verse-builder", "memory-match", "story-sequencer"];

/* "#/verse-builder/3/5" -> { game: "verse-builder", a: 3, b: 5 } */
export function parseHash(hash) {
  const parts = String(hash).replace(/^#\/?/, "").split("/").filter(Boolean);
  // An unknown game means a stale or hand-typed link: fall back to the hub
  // and drop the place with it, since the hub has nowhere to put one
  if (!GAMES.includes(parts[0]) || parts[0] === "hub") return { game: "hub", a: null, b: null };
  const number = (value) => (/^\d+$/.test(value || "") ? Number(value) : null);
  return { game: parts[0], a: number(parts[1]), b: number(parts[2]) };
}

/* The reverse: only the parts that are set end up in the address bar */
export function toHash({ game = "hub", a = null, b = null } = {}) {
  if (game === "hub") return "#/";
  return `#/${[game, a, b].filter((part) => part !== null && part !== undefined).join("/")}`;
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    /* Every hash change is followed, including our own. Filtering ours out
       looked tidy and broke the Back button: pressing Back lands on a hash
       this app wrote a moment ago, which the filter then ignored. Applying
       a route the screen is already on is a no-op, so following everything
       costs nothing. */
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  /* replace: true for moves within a screen the player did not choose —
     they should not have to press Back twice to leave. */
  const navigate = useCallback((next, { replace = false } = {}) => {
    const hash = toHash(next);
    if (hash === window.location.hash) return;
    if (replace) window.history.replaceState(null, "", hash);
    else window.location.hash = hash;
    setRoute(parseHash(hash));
  }, []);

  return [route, navigate];
}
