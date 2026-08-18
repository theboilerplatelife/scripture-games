import { useLayoutEffect } from "react";

/* Screens here are conditional renders rather than routed pages, so the window
   keeps whatever scroll position the previous screen had — pick a game from
   halfway down the hub and its first screen opens already scrolled. Reset on
   every screen change, before paint, so the new screen is never seen adrift. */
export function useScrollToTop(screenKey) {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [screenKey]);
}
