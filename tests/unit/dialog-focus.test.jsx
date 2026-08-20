import { describe, test, expect } from "vitest";
import { useRef } from "react";
import { render, fireEvent } from "@testing-library/react";
import { useDialogFocus } from "../../src/components/common/useDialogFocus.js";

/* The behaviour aria-modal="true" claims: focus moves in, Tab stays in,
   and focus goes back where it came from. */

function Dialog({ open = true, empty = false }) {
  const ref = useRef(null);
  useDialogFocus(ref, open);
  return (
    <div ref={ref} role="dialog">
      {!empty && (
        <>
          <button type="button">first</button>
          <button type="button">middle</button>
          <button type="button" disabled>
            skipped
          </button>
          <button type="button">last</button>
        </>
      )}
    </div>
  );
}

describe("useDialogFocus", () => {
  test("moves focus to the first control when the dialog opens", () => {
    const { getByText } = render(<Dialog />);
    expect(document.activeElement).toBe(getByText("first"));
  });

  test("focuses the dialog itself when it holds no controls", () => {
    const { container } = render(<Dialog empty={true} />);
    const dialog = container.querySelector('[role="dialog"]');
    expect(document.activeElement).toBe(dialog);
    expect(dialog.getAttribute("tabindex")).toBe("-1");
  });

  test("does nothing when the ref was never attached", () => {
    function Unattached() {
      const ref = useRef(null);
      useDialogFocus(ref, true);
      return <div role="dialog" />;
    }
    expect(() => render(<Unattached />)).not.toThrow();
    expect(document.activeElement).toBe(document.body);
  });

  test("does nothing while the dialog is closed", () => {
    render(<Dialog open={false} />);
    expect(document.activeElement).toBe(document.body);
  });

  test("wraps Tab from the last control back to the first", () => {
    const { getByText } = render(<Dialog />);
    getByText("last").focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(getByText("first"));
  });

  test("wraps Shift+Tab from the first control back to the last", () => {
    const { getByText } = render(<Dialog />);
    getByText("first").focus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(getByText("last"));
  });

  test("pulls focus back in if it has escaped the dialog", () => {
    const outside = document.createElement("button");
    document.body.appendChild(outside);
    const { getByText } = render(<Dialog />);
    outside.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(getByText("first"));
    outside.remove();
  });

  test("leaves other keys alone", () => {
    const { getByText } = render(<Dialog />);
    getByText("middle").focus();
    fireEvent.keyDown(document, { key: "ArrowDown" });
    expect(document.activeElement).toBe(getByText("middle"));
  });

  test("ignores Tab when the dialog has nothing to focus", () => {
    const { container } = render(<Dialog empty={true} />);
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(container.querySelector('[role="dialog"]'));
  });

  test("hands focus back to whatever opened it", () => {
    const opener = document.createElement("button");
    document.body.appendChild(opener);
    opener.focus();

    const { unmount } = render(<Dialog />);
    expect(document.activeElement).not.toBe(opener);

    unmount();
    expect(document.activeElement).toBe(opener);
    opener.remove();
  });

  test("survives an opener that cannot take focus back", () => {
    // document.body is the active element on a fresh page and has no focus()
    // worth calling — closing must not throw
    const naked = { focus: undefined };
    Object.defineProperty(document, "activeElement", { value: naked, configurable: true });
    const { unmount } = render(<Dialog />);
    delete document.activeElement;
    expect(() => unmount()).not.toThrow();
  });
});
