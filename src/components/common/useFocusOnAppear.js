import { useEffect } from "react";

/* When a screen replaces what the player was working on — a win card
   arriving over a finished board — focus has to come with it. Otherwise
   the board's controls are gone, focus falls back to <body>, and a
   player using a keyboard has to tab from the top of the page to reach
   "Next Level".

   Unlike a dialog this does not trap anything: the win card is the page
   now, so focus only needs to start there. */
export function useFocusOnAppear(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }, [ref]);
}
