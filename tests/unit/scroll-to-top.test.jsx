import { describe, test, expect, vi, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { useScrollToTop } from "../../src/components/common/useScrollToTop.js";

function Screen({ name }) {
  useScrollToTop(name);
  return <div>{name}</div>;
}

describe("useScrollToTop", () => {
  afterEach(() => vi.restoreAllMocks());

  test("starts a screen at the top, and again whenever the screen changes", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    const { rerender } = render(<Screen name="hub" />);
    expect(scrollTo).toHaveBeenCalledWith(0, 0);

    // Re-rendering the same screen must not yank the player back to the top
    scrollTo.mockClear();
    rerender(<Screen name="hub" />);
    expect(scrollTo).not.toHaveBeenCalled();

    rerender(<Screen name="play" />);
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
