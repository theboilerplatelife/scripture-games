import { describe, test, expect, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { useScrollLock } from "../../src/components/common/useScrollLock.js";

function Modal({ active }) {
  useScrollLock(active);
  return <div>dialog</div>;
}

describe("useScrollLock", () => {
  afterEach(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  });

  test("freezes the page while mounted and restores it afterwards", () => {
    document.body.style.overflow = "auto";
    const { unmount } = render(<Modal active={true} />);
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });

  test("does nothing while inactive, and locks when it becomes active", () => {
    const { rerender } = render(<Modal active={false} />);
    expect(document.body.style.overflow).toBe("");

    rerender(<Modal active={true} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  test("swaps the scrollbar's width for padding, and adds none when there is no scrollbar", () => {
    const setClientWidth = (value) =>
      Object.defineProperty(document.documentElement, "clientWidth", {
        configurable: true,
        value,
      });

    // No scrollbar: the page is already full width, so nothing is added
    setClientWidth(window.innerWidth);
    const noBar = render(<Modal active={true} />);
    expect(document.body.style.paddingRight).toBe("");
    noBar.unmount();

    // A 15px scrollbar is replaced by padding so the page does not jump
    setClientWidth(window.innerWidth - 15);
    const withBar = render(<Modal active={true} />);
    expect(document.body.style.paddingRight).toBe("15px");
    withBar.unmount();
    expect(document.body.style.paddingRight).toBe("");

    delete document.documentElement.clientWidth;
  });
});
