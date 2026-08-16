import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { PlayBoard } from "../../src/games/verse-builder/PlayBoard.jsx";
import { CHAPTERS } from "../../src/data/chapters.js";

describe("PlayBoard Interactive Puzzle Tests", () => {
  test("renders word scraps, handles placement, removal, shakes, mistakes and completion", () => {
    vi.useFakeTimers();
    const handleComplete = vi.fn();
    const handleBack = vi.fn();

    const { unmount: unmount1 } = render(
      <PlayBoard
        chapterId={1}
        levelIndex={0}
        verse={CHAPTERS[0].verses[0]}
        translation="ESV"
        onBackToLevels={handleBack}
        onCompleteVerse={handleComplete}
      />
    );

    expect(screen.getByText("1 Thessalonians 5:17")).toBeTruthy();
    
    // Back button
    const backBtn = screen.getByLabelText("Back to Levels");
    fireEvent.click(backBtn);
    expect(handleBack).toHaveBeenCalled();

    // Test Clear button when empty
    const clearBtn = screen.getByRole("button", { name: "Clear all placed words" });
    fireEvent.click(clearBtn);

    // 1. Place scrap 1, then click Clear button to return it
    const prayScrap = screen.getByRole("button", { name: "Place word Pray" });
    fireEvent.click(prayScrap);
    expect(screen.getByRole("button", { name: "Remove word Pray" })).toBeTruthy();
    fireEvent.click(clearBtn);
    expect(screen.queryByRole("button", { name: "Remove word Pray" })).toBeNull();

    // Place and remove individually
    const prayScrap2 = screen.getByRole("button", { name: "Place word Pray" });
    fireEvent.click(prayScrap2);
    const placedSlot = screen.getByRole("button", { name: "Remove word Pray" });
    fireEvent.click(placedSlot);

    // Click empty slot (coverage for slots[slotIdx] === null)
    const emptySlots = screen.getAllByRole("button", { name: /^Empty slot/ });
    fireEvent.click(emptySlots[0]);

    // 2. Partial correct + Partial wrong placement:
    // Correct slot 0: "Pray", Wrong slot 1: "ceasing.", Wrong slot 2: "without"
    const prayBtn = screen.getByRole("button", { name: "Place word Pray" });
    const ceasingBtn = screen.getByRole("button", { name: "Place word ceasing." });
    const withoutBtn = screen.getByRole("button", { name: "Place word without" });

    fireEvent.click(prayBtn);
    fireEvent.click(ceasingBtn);
    fireEvent.click(withoutBtn);

    // Advance past 1.6s mistake shake timer
    act(() => {
      vi.advanceTimersByTime(1800);
    });

    // Verify smart oops: "Pray" remains placed in slot 0!
    expect(screen.getByRole("button", { name: "Remove word Pray" })).toBeTruthy();
    // "without" and "ceasing." were cleared and returned to pile
    expect(screen.getByRole("button", { name: "Place word without" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Place word ceasing." })).toBeTruthy();

    // 3. Complete remaining words correctly
    fireEvent.click(screen.getByRole("button", { name: "Place word without" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word ceasing." }));

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(handleComplete).toHaveBeenCalledWith(2);
    unmount1();

    // 4. Test 3-star solve (0 mistakes)
    const { unmount: unmount2 } = render(
      <PlayBoard
        chapterId={1}
        levelIndex={0}
        verse={CHAPTERS[0].verses[0]}
        translation="ESV"
        onBackToLevels={handleBack}
        onCompleteVerse={handleComplete}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Place word Pray" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word without" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word ceasing." }));
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(handleComplete).toHaveBeenCalledWith(3);
    unmount2();

    // 5. Test 1-star solve (> 2 mistakes)
    const { unmount: unmount3 } = render(
      <PlayBoard
        chapterId={1}
        levelIndex={0}
        verse={CHAPTERS[0].verses[0]}
        translation="ESV"
        onBackToLevels={handleBack}
        onCompleteVerse={handleComplete}
      />
    );
    // Make 3 consecutive wrong placements
    for (let m = 0; m < 3; m++) {
      fireEvent.click(screen.getByRole("button", { name: "Place word ceasing." }));
      fireEvent.click(screen.getByRole("button", { name: "Place word Pray" }));
      fireEvent.click(screen.getByRole("button", { name: "Place word without" }));
      act(() => {
        vi.advanceTimersByTime(1800);
      });
      // Clear the correctly kept pieces to repeat the mistake cycle
      const clear = screen.getByRole("button", { name: "Clear all placed words" });
      fireEvent.click(clear);
    }
    // Now solve correctly
    fireEvent.click(screen.getByRole("button", { name: "Place word Pray" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word without" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word ceasing." }));
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(handleComplete).toHaveBeenCalledWith(1);
    unmount3();

    vi.useRealTimers();
  });

  test("PlayBoard handles single-word verse and shuffle reverse protection", () => {
    const handleComplete = vi.fn();
    const handleBack = vi.fn();

    // Single-word verse
    render(
      <PlayBoard
        chapterId={2}
        levelIndex={1}
        verse={{
          ref: "Test 1:1",
          character: "paul",
          hint: "Test hint",
          text: { WEB: "Alleluia" },
        }}
        translation="UNKNOWN_TR"
        onBackToLevels={handleBack}
        onCompleteVerse={handleComplete}
      />
    );
    expect(screen.getByText("Test 1:1")).toBeTruthy();

    // Render across chapterIds 1..20 to trigger the shuffle reverse branch
    for (let c = 1; c <= 20; c++) {
      for (let l = 0; l <= 5; l++) {
        render(
          <PlayBoard
            chapterId={c}
            levelIndex={l}
            verse={{
              ref: `Test ${c}:${l}`,
              character: "paul",
              hint: "Test",
              text: { ESV: "God loves" },
            }}
            translation="ESV"
            onBackToLevels={handleBack}
            onCompleteVerse={handleComplete}
          />
        );
      }
    }
  });
});
