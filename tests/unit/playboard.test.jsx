import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { PlayBoard } from "../../src/games/verse-builder/PlayBoard.jsx";
import { CHAPTERS } from "../../src/data/chapters.js";

describe("PlayBoard Interactive Puzzle Tests", () => {
  test("renders word scraps, handles placement, removal, shakes, mistakes and completion", () => {
    vi.useFakeTimers();
    const handleComplete = vi.fn();
    const handleBack = vi.fn();

    render(
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

    // 1. Place scrap 1, then click slot to remove it
    const prayScrap = screen.getByRole("button", { name: "Place word Pray" });
    fireEvent.click(prayScrap);

    const placedSlot = screen.getByRole("button", { name: "Remove word Pray" });
    fireEvent.click(placedSlot);

    // Click empty slot (coverage for slots[slotIdx] === null)
    const emptySlots = screen.getAllByRole("button", { name: /^Empty slot/ });
    fireEvent.click(emptySlots[0]);

    // 2. Wrong placement: Place scrap index 2 first ("ceasing.")
    const ceasingBtn = screen.getByRole("button", { name: "Place word ceasing." });
    const prayBtn = screen.getByRole("button", { name: "Place word Pray" });
    const withoutBtn = screen.getByRole("button", { name: "Place word without" });

    fireEvent.click(ceasingBtn);
    fireEvent.click(prayBtn);
    fireEvent.click(withoutBtn);

    // Try placing while full/checking (coverage for checkingRef.current guard and idx === -1)
    fireEvent.click(prayBtn);

    // While checking is active, click slot and scrap (coverage for checkingRef.current === true)
    const removeSlot = screen.queryByRole("button", { name: "Remove word Pray" });
    if (removeSlot) fireEvent.click(removeSlot);

    // Advance past 1.6s mistake shake timer to return scraps to pile
    act(() => {
      vi.advanceTimersByTime(1800);
    });

    // 3. Now solve correctly (with 1 mistake -> earned 2 stars)
    const prayFinal = screen.getByRole("button", { name: "Place word Pray" });
    const withoutFinal = screen.getByRole("button", { name: "Place word without" });
    const ceasingFinal = screen.getByRole("button", { name: "Place word ceasing." });

    fireEvent.click(prayFinal);
    fireEvent.click(withoutFinal);
    fireEvent.click(ceasingFinal);

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(handleComplete).toHaveBeenCalledWith(2);

    // 4. Test 3-star solve (0 mistakes)
    const { unmount } = render(
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
    unmount();

    // 5. Test 1-star solve (> 2 mistakes)
    render(
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
    }
    // Now solve correctly
    fireEvent.click(screen.getByRole("button", { name: "Place word Pray" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word without" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word ceasing." }));
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(handleComplete).toHaveBeenCalledWith(1);

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
