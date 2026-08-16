import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { buildDeck } from "../../src/games/memory-match/matchData.js";
import { MemoryMatch } from "../../src/games/memory-match/MemoryMatch.jsx";
import { MMChapterSelect } from "../../src/games/memory-match/MMChapterSelect.jsx";
import { ModeSelect } from "../../src/games/memory-match/ModeSelect.jsx";
import { MMWinCard } from "../../src/games/memory-match/MMWinCard.jsx";
import { MMChapterDoneCard } from "../../src/games/memory-match/MMChapterDoneCard.jsx";
import { CHAPTERS } from "../../src/data/chapters.js";

describe("Memory Match screens", () => {
  test("MMChapterSelect: unlock logic, totals, back and settings", () => {
    const onSelectChapter = vi.fn();
    const onBackToHub = vi.fn();
    const onOpenSettings = vi.fn();

    const { rerender } = render(
      <MMChapterSelect
        stars={{}}
        translation="ESV"
        onSelectChapter={onSelectChapter}
        onBackToHub={onBackToHub}
        onOpenSettings={onOpenSettings}
      />
    );

    // Chapter 1 open, chapter 2 locked
    fireEvent.click(screen.getByLabelText(/Memory Match Chapter 1:/));
    expect(onSelectChapter).toHaveBeenCalledWith(1);
    expect(screen.getByLabelText("Memory Match Chapter 2: Locked").disabled).toBe(true);

    fireEvent.click(screen.getByLabelText("Back to Game Hub"));
    expect(onBackToHub).toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText("Settings"));
    expect(onOpenSettings).toHaveBeenCalled();

    // A star in chapter 1 unlocks chapter 2; non-numeric and foreign keys ignored in totals
    rerender(
      <MMChapterSelect
        stars={{ "mm-1-2": 3, "mm-1-0": "bad", "1-0": 3 }}
        translation="ESV"
        onSelectChapter={onSelectChapter}
        onBackToHub={onBackToHub}
        onOpenSettings={onOpenSettings}
      />
    );
    expect(screen.getByLabelText(/Memory Match Chapter 2: (?!Locked)/).disabled).toBe(false);
    expect(screen.getByText(/3 of 180 memory stars collected/)).toBeTruthy();
  });

  test("ModeSelect: renders 4 modes with stars and handles selection/back", () => {
    const onSelectMode = vi.fn();
    const onBackToChapters = vi.fn();

    render(
      <ModeSelect
        chapter={CHAPTERS[0]}
        stars={{ "mm-1-0": 2 }}
        translation="NET"
        onSelectMode={onSelectMode}
        onBackToChapters={onBackToChapters}
      />
    );

    expect(screen.getByText("⭐ 2 / 12")).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Play Who Said It?"));
    expect(onSelectMode).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByLabelText("Back to Chapters"));
    expect(onBackToChapters).toHaveBeenCalled();
  });

  test("MMWinCard: perfect and with-misses copy, all buttons", () => {
    const onReplay = vi.fn();
    const onNext = vi.fn();
    const onBackToModes = vi.fn();

    const { rerender } = render(
      <MMWinCard
        chapter={CHAPTERS[0]}
        modeIdx={0}
        earnedStars={3}
        misses={0}
        hasNextMode={true}
        onReplay={onReplay}
        onNext={onNext}
        onBackToModes={onBackToModes}
      />
    );
    expect(screen.getByText(/Perfect memory/)).toBeTruthy();
    fireEvent.click(screen.getByText("Match again 🔄"));
    expect(onReplay).toHaveBeenCalled();
    fireEvent.click(screen.getByText("Next match →"));
    expect(onNext).toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText("Back to Match Modes"));
    expect(onBackToModes).toHaveBeenCalled();

    rerender(
      <MMWinCard
        chapter={CHAPTERS[0]}
        modeIdx={3}
        earnedStars={2}
        misses={1}
        hasNextMode={false}
        onReplay={onReplay}
        onNext={onNext}
        onBackToModes={onBackToModes}
      />
    );
    expect(screen.getByText(/with 1 miss\./)).toBeTruthy();
    expect(screen.getByText("Complete Chapter 🎉")).toBeTruthy();

    rerender(
      <MMWinCard
        chapter={CHAPTERS[0]}
        modeIdx={3}
        earnedStars={1}
        misses={9}
        hasNextMode={false}
        onReplay={onReplay}
        onNext={onNext}
        onBackToModes={onBackToModes}
      />
    );
    expect(screen.getByText(/with 9 misses\./)).toBeTruthy();
  });

  test("MMChapterDoneCard: mid-game and finale variants", () => {
    const onNextChapter = vi.fn();
    const onBackToChapters = vi.fn();
    const onBackToHub = vi.fn();

    const { rerender } = render(
      <MMChapterDoneCard
        chapter={CHAPTERS[0]}
        isAllGameDone={false}
        totalStars={12}
        maxStars={180}
        onNextChapter={onNextChapter}
        onBackToChapters={onBackToChapters}
        onBackToHub={onBackToHub}
      />
    );
    expect(screen.getByText("Chapter 1 Matched!")).toBeTruthy();
    fireEvent.click(screen.getByText("Next Chapter →"));
    expect(onNextChapter).toHaveBeenCalled();
    fireEvent.click(screen.getByText("Chapter Select"));
    expect(onBackToChapters).toHaveBeenCalled();
    fireEvent.click(screen.getByText("Game Hub 🏠"));
    expect(onBackToHub).toHaveBeenCalled();

    rerender(
      <MMChapterDoneCard
        chapter={CHAPTERS[14]}
        isAllGameDone={true}
        totalStars={180}
        maxStars={180}
        onNextChapter={onNextChapter}
        onBackToChapters={onBackToChapters}
        onBackToHub={onBackToHub}
      />
    );
    expect(screen.getByText("You Matched All 15 Chapters!")).toBeTruthy();
    expect(screen.queryByText("Next Chapter →")).toBeNull();
  });
});

describe("MemoryMatch orchestrator", () => {
  test("navigates chapters → modes → play and back", () => {
    render(
      <MemoryMatch
        stars={{}}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
      />
    );

    fireEvent.click(screen.getByLabelText(/Memory Match Chapter 1:/));
    fireEvent.click(screen.getByLabelText("Play Buddy Faces"));
    expect(screen.getByLabelText("Back to Match Modes")).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Back to Match Modes"));
    fireEvent.click(screen.getByLabelText("Back to Chapters"));
    expect(screen.getByText("Memory Match")).toBeTruthy();
  });

  test("win screen: replay, next mode, and chapter-done after the last mode", () => {
    render(
      <MemoryMatch
        stars={{ "mm-1-3": 2 }}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialModeIdx={2}
        initialScreen="win"
      />
    );

    // Replay returns to the board, back-to-modes from the board
    fireEvent.click(screen.getByText("Match again 🔄"));
    expect(screen.getByText(/find all 5 pairs/)).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Back to Match Modes"));
    expect(screen.getByLabelText("Play Torn Verses")).toBeTruthy();
  });

  test("win card's own back button returns to mode select", () => {
    render(
      <MemoryMatch
        stars={{}}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialModeIdx={0}
        initialScreen="win"
      />
    );
    fireEvent.click(screen.getByLabelText("Back to Match Modes"));
    expect(screen.getByLabelText("Play Buddy Faces")).toBeTruthy();
  });

  test("next from win advances mode; after mode 3 it completes the chapter", () => {
    const { unmount } = render(
      <MemoryMatch
        stars={{}}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialModeIdx={0}
        initialScreen="win"
      />
    );
    fireEvent.click(screen.getByText("Next match →"));
    expect(screen.getByText(/Who Said It\?/)).toBeTruthy(); // now playing mode 1
    unmount();

    // Last mode → chapter-done → next chapter
    render(
      <MemoryMatch
        stars={{}}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialModeIdx={3}
        initialScreen="win"
      />
    );
    fireEvent.click(screen.getByText("Complete Chapter 🎉"));
    expect(screen.getByText("Chapter 1 Matched!")).toBeTruthy();
    fireEvent.click(screen.getByText("Next Chapter →"));
    expect(screen.getByText(/Ch\. 2:/)).toBeTruthy();
  });

  test("completing a board saves a namespaced star and shows the fresh result", () => {
    vi.useFakeTimers();
    const deck = buildDeck(CHAPTERS[0], 3, "ESV");
    const completeBoard = (container) => {
      const cards = () => container.querySelectorAll(".mm-card");
      [0, 1, 2, 3].forEach((pairId) => {
        const [a, b] = deck
          .map((c, i) => ({ c, i }))
          .filter(({ c }) => c.pairId === pairId)
          .map(({ i }) => i);
        fireEvent.click(cards()[a]);
        fireEvent.click(cards()[b]);
        act(() => vi.advanceTimersByTime(500));
      });
      act(() => vi.advanceTimersByTime(700));
    };

    // No prior star banked
    const onSaveStar = vi.fn();
    const first = render(
      <MemoryMatch
        stars={{}}
        onSaveStar={onSaveStar}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialModeIdx={3}
        initialScreen="play"
      />
    );
    completeBoard(first.container);
    expect(onSaveStar).toHaveBeenCalledWith("mm-1-3", 3);
    expect(screen.getByText(/Perfect memory/)).toBeTruthy();
    first.unmount();

    // A banked star is never lowered (Math.max path with existing value)
    const onSaveStar2 = vi.fn();
    const second = render(
      <MemoryMatch
        stars={{ "mm-1-3": 1 }}
        onSaveStar={onSaveStar2}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialModeIdx={3}
        initialScreen="play"
      />
    );
    completeBoard(second.container);
    expect(onSaveStar2).toHaveBeenCalledWith("mm-1-3", 3);
    second.unmount();
    vi.useRealTimers();
  });

  test("finale: completing chapter 15's last mode shows the all-done card; hub return works", () => {
    const onBackToHub = vi.fn();
    render(
      <MemoryMatch
        stars={{ "1-0": 3, "mm-15-0": "corrupt" }}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={onBackToHub}
        onOpenSettings={vi.fn()}
        initialChapterId={15}
        initialModeIdx={3}
        initialScreen="win"
      />
    );
    fireEvent.click(screen.getByText("Complete Chapter 🎉"));
    expect(screen.getByText("You Matched All 15 Chapters!")).toBeTruthy();
    fireEvent.click(screen.getByText("Chapter Select"));
    expect(screen.getByText("Memory Match")).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Back to Game Hub"));
    expect(onBackToHub).toHaveBeenCalled();
  });
});
