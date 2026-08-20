import { useEffect } from "react";

/* A dialog that says aria-modal="true" is promising three things to
   anyone using a keyboard or a screen reader: focus moves into it when
   it opens, Tab stays inside it while it is open, and focus goes back
   where it came from when it closes.

   Saying it in the markup does not make it happen — the attribute is a
   claim, not a behaviour. Without this, Tab walked straight out of the
   settings dialog onto the game cards hidden behind it, and closing the
   dialog dropped focus on <body>. */
export function useDialogFocus(dialogRef, isOpen = true) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const opener = document.activeElement;
    // Filtered on attributes, not on layout: offsetParent is null for
    // everything in jsdom, which would make this behave one way in tests
    // and another in a browser
    const focusable = () =>
      [...dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
        .filter((el) => !el.disabled && !el.hidden && el.getAttribute("aria-hidden") !== "true");

    // Move in: the first control, or the dialog itself if it has none
    const first = focusable()[0];
    if (first) first.focus();
    else {
      dialog.setAttribute("tabindex", "-1");
      dialog.focus();
    }

    // Keep Tab inside: wrap at both ends
    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const edge = e.shiftKey ? items[0] : items[items.length - 1];
      if (document.activeElement === edge || !dialog.contains(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? items[items.length - 1] : items[0]).focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Put the player back on the control they opened this from
      if (opener && typeof opener.focus === "function") opener.focus();
    };
  }, [dialogRef, isOpen]);
}
