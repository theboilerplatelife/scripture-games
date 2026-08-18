import { useLayoutEffect } from "react";

/* Freeze the page behind a modal. Without this, a wheel or touchpad gesture
   over the backdrop scrolls the game underneath while the dialog sits still.
   The scrollbar's width is added back as padding so the page does not jump
   sideways as it is hidden. */
export function useScrollLock(active = true) {
  useLayoutEffect(() => {
    if (!active) return undefined;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [active]);
}
