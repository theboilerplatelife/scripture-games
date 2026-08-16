import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { buildDeck, DECKS } from "../../src/games/memory-match/matchData.js";
import { MemoryMatch } from "../../src/games/memory-match/MemoryMatch.jsx";
import { MMChapterSelect } from "../../src/games/memory-match/MMChapterSelect.jsx";
import { ModeSelect } from "../../src/games/memory-match/ModeSelect.jsx";
import { MMWinCard } from "../../src/games/memory-match/MMWinCard.jsx";
import { MMChapterDoneCard } from "../../src/games/memory-match/MMChapterDoneCard.jsx";

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

    // Deck 1 open, Deck 2 locked
    fireEvent.click(screen.getByLabelText(/Memory Match Deck 1:/));
    expect(onSelectChapter).toHaveBeenCalledWith(1);
    expect(screen.getByLabelText("Memory Match Deck 2: Locked").disabled).toBe(true);

    fireEvent.click(screen.getByLabelText("Back to Game Hub"));
    expect(onBackToHub).toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText("Settings"));
    expect(onOpenSettings).toHaveBeenCalled();

    // A star in Deck 1 unlocks Deck 2; non-numeric and foreign keys ignored in totals
    rerender(
      <MMChapterSelect
        stars={{ "mm-1-2": 3, "mm-1-0": "bad", "1-0": 3 }}
        translation="ESV"
        onSelectChapter={onSelectChapter}
        onBackToHub={onBackToHub}
        onOpenSettings={onOpenSettings}
      />
    );
    expect(screen.getByLabelText(/Memory Match Deck 2: (?!Locked)/).disabled).toBe(false);
    expect(screen.getByText(/3 of 72 memory stars collected/)).toBeTruthy();

    // No stamp until every mode of the deck has a star
    expect(screen.queryByText("✓ Complete")).toBeNull();

    // All three modes starred → Complete stamp and accessible "(completed)"
    rerender(
      <MMChapterSelect
        stars={{ "mm-1-0": 1, "mm-1-1": 2, "mm-1-2": 3 }}
        translation="ESV"
        onSelectChapter={onSelectChapter}
        onBackToHub={onBackToHub}
        onOpenSettings={onOpenSettings}
      />
    );
    expect(screen.getByText("✓ Complete")).toBeTruthy();
    expect(screen.getByLabelText(/Memory Match Deck 1: .*\(completed\)/)).toBeTruthy();

    // A flawless 9/9 deck upgrades to the Perfect stamp
    rerender(
      <MMChapterSelect
        stars={{ "mm-1-0": 3, "mm-1-1": 3, "mm-1-2": 3 }}
        translation="ESV"
        onSelectChapter={onSelectChapter}
        onBackToHub={onBackToHub}
        onOpenSettings={onOpenSettings}
      />
    );
    expect(screen.getByText("★ Perfect!")).toBeTruthy();
  });

  test("ModeSelect: renders 3 modes with stars and handles selection/back", () => {
    const onSelectMode = vi.fn();
    const onBackToDecks = vi.fn();

    render(
      <ModeSelect
        deck={DECKS[0]}
        stars={{ "mm-1-0": 2 }}
        translation="NET"
        onSelectMode={onSelectMode}
        onBackToDecks={onBackToDecks}
      />
    );

    expect(screen.getByText("⭐ 2 / 9")).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Play Verse Finder"));
    expect(onSelectMode).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByLabelText("Back to Scripture Decks"));
    expect(onBackToDecks).toHaveBeenCalled();
  });

  test("MMWinCard: perfect and with-misses copy, all buttons", () => {
    const onReplay = vi.fn();
    const onNext = vi.fn();
    const onBackToModes = vi.fn();
    const onBackToDecks = vi.fn();

    const { rerender } = render(
      <MMWinCard
        deck={DECKS[0]}
        modeIdx={0}
        earnedStars={3}
        misses={0}
        isDeckComplete={false}
        onReplay={onReplay}
        onNext={onNext}
        onBackToModes={onBackToModes}
        onBackToDecks={onBackToDecks}
      />
    );
    expect(screen.getByText(/Perfect memory/)).toBeTruthy();
    fireEvent.click(screen.getByText("Match again 🔄"));
    expect(onReplay).toHaveBeenCalled();
    fireEvent.click(screen.getByText("Deck Select"));
    expect(onBackToDecks).toHaveBeenCalled();
    fireEvent.click(screen.getByText("Next match →"));
    expect(onNext).toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText("Back to Match Modes"));
    expect(onBackToModes).toHaveBeenCalled();

    // Mode 2 with 1 miss, not complete yet
    rerender(
      <MMWinCard
        deck={DECKS[0]}
        modeIdx={2}
        earnedStars={2}
        misses={1}
        isDeckComplete={false}
        onReplay={onReplay}
        onNext={onNext}
        onBackToModes={onBackToModes}
      />
    );
    expect(screen.getByText(/with 1 miss\./)).toBeTruthy();
    // Deck not complete: the next action plays the unplayed mode, so it must
    // not claim to go back to the mode list
    expect(screen.getByText("Next match →")).toBeTruthy();

    // Deck already complete at the last mode: now it really returns to modes
    rerender(
      <MMWinCard
        deck={DECKS[0]}
        modeIdx={2}
        earnedStars={2}
        misses={1}
        isDeckComplete={false}
        returnsToModes={true}
        onReplay={onReplay}
        onNext={onNext}
        onBackToModes={onBackToModes}
        onBackToDecks={onBackToDecks}
      />
    );
    expect(screen.getByText("Back to Modes ←")).toBeTruthy();

    // Deck completely solved (all modes have stars)
    rerender(
      <MMWinCard
        deck={DECKS[0]}
        modeIdx={2}
        earnedStars={1}
        misses={9}
        isDeckComplete={true}
        onReplay={onReplay}
        onNext={onNext}
        onBackToModes={onBackToModes}
      />
    );
    expect(screen.getByText(/with 9 misses\./)).toBeTruthy();
    expect(screen.getByText("Complete Deck 🎉")).toBeTruthy();
  });

  test("MMChapterDoneCard: mid-game and finale variants", () => {
    const onNextChapter = vi.fn();
    const onBackToChapters = vi.fn();
    const onBackToHub = vi.fn();

    const { rerender } = render(
      <MMChapterDoneCard
        deck={DECKS[0]}
        isAllGameDone={false}
        totalStars={12}
        maxStars={72}
        onNextChapter={onNextChapter}
        onBackToChapters={onBackToChapters}
        onBackToHub={onBackToHub}
      />
    );
    expect(screen.getByText("Deck 1 Matched!")).toBeTruthy();
    fireEvent.click(screen.getByText("Next Deck →"));
    expect(onNextChapter).toHaveBeenCalled();
    fireEvent.click(screen.getByText("Deck Select"));
    expect(onBackToChapters).toHaveBeenCalled();
    fireEvent.click(screen.getByText("Game Hub 🏠"));
    expect(onBackToHub).toHaveBeenCalled();

    rerender(
      <MMChapterDoneCard
        deck={DECKS[7]}
        isAllGameDone={true}
        totalStars={72}
        maxStars={72}
        onNextChapter={onNextChapter}
        onBackToChapters={onBackToChapters}
        onBackToHub={onBackToHub}
      />
    );
    expect(screen.getByText("You Matched All 8 Decks!")).toBeTruthy();
    expect(screen.queryByText("Next Deck →")).toBeNull();
  });
});

describe("MemoryMatch orchestrator", () => {
  test("navigates decks → modes → play and back", () => {
    render(
      <MemoryMatch
        stars={{}}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
      />
    );

    fireEvent.click(screen.getByLabelText(/Memory Match Deck 1:/));
    fireEvent.click(screen.getByLabelText("Play Hint Hunt"));
    expect(screen.getByLabelText("Back to Match Modes")).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Back to Match Modes"));
    fireEvent.click(screen.getByLabelText("Back to Scripture Decks"));
    expect(screen.getByText("Memory Match")).toBeTruthy();
  });

  test("win screen: replay, next mode, and deck modes", () => {
    render(
      <MemoryMatch
        stars={{ "mm-1-2": 2 }}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialModeIdx={1}
        initialScreen="win"
      />
    );

    // Replay returns to the board, back-to-modes from the board
    fireEvent.click(screen.getByText("Match again 🔄"));
    expect(screen.getByText(/find all 5 pairs/)).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Back to Match Modes"));
    expect(screen.getByLabelText("Play Torn Verses")).toBeTruthy();
  });

  test("win card's Deck Select shortcut goes straight to the deck list", () => {
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
    fireEvent.click(screen.getByText("Deck Select"));
    expect(screen.getByText("Memory Match")).toBeTruthy();
    expect(screen.getByLabelText(/Memory Match Deck 1:/)).toBeTruthy();
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
    expect(screen.getByLabelText("Play Hint Hunt")).toBeTruthy();
  });

  test("next from win advances mode or jumps to unplayed mode", () => {
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
    expect(screen.getByText(/Verse Finder/)).toBeTruthy(); // now playing mode 1
    unmount();

    // If on mode 2 but mode 0 is unplayed, next jumps to mode 0
    const second = render(
      <MemoryMatch
        stars={{ "mm-1-1": 3 }}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialModeIdx={2}
        initialScreen="win"
      />
    );
    fireEvent.click(screen.getByText("Next match →"));
    expect(screen.getByText(/Hint Hunt/)).toBeTruthy(); // jumps to unplayed mode 0
    second.unmount();

    // Torn Verses already starred, Hint Hunt not: winning Verse Finder must
    // skip the played mode and land on Hint Hunt, not replay Torn Verses
    const third = render(
      <MemoryMatch
        stars={{ "mm-1-2": 2 }}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialModeIdx={1}
        initialScreen="win"
      />
    );
    fireEvent.click(screen.getByText("Next match →"));
    expect(screen.getByText(/Hint Hunt/)).toBeTruthy();
    third.unmount();
  });

  test("all modes solved in a deck triggers complete deck and next deck", () => {
    render(
      <MemoryMatch
        stars={{ "mm-1-0": 3, "mm-1-1": 3 }}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialModeIdx={2}
        initialScreen="win"
      />
    );
    fireEvent.click(screen.getByText("Complete Deck 🎉"));
    expect(screen.getByText("Deck 1 Matched!")).toBeTruthy();
    fireEvent.click(screen.getByText("Next Deck →"));
    expect(screen.getByText(/Deck 2:/)).toBeTruthy();
  });

  test("replaying a board in an already-completed deck never re-celebrates completion", () => {
    vi.useFakeTimers();
    const allStarred = { "mm-1-0": 2, "mm-1-1": 2, "mm-1-2": 2 };
    const completeBoardFor = (container, modeIdx) => {
      const cardDeck = buildDeck(DECKS[0], modeIdx, "ESV");
      const cards = () => container.querySelectorAll(".mm-card");
      const pairIds = [...new Set(cardDeck.map((c) => c.pairId))];
      pairIds.forEach((pairId) => {
        const [a, b] = cardDeck
          .map((c, i) => ({ c, i }))
          .filter(({ c }) => c.pairId === pairId)
          .map(({ i }) => i);
        fireEvent.click(cards()[a]);
        fireEvent.click(cards()[b]);
        act(() => vi.advanceTimersByTime(500));
      });
      act(() => vi.advanceTimersByTime(700));
    };

    // Replaying the LAST mode of a complete deck: no celebration, back to modes
    const last = render(
      <MemoryMatch
        stars={allStarred}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialModeIdx={2}
        initialScreen="play"
        initialSeed={0}
      />
    );
    completeBoardFor(last.container, 2);
    expect(screen.queryByText("Complete Deck 🎉")).toBeNull();
    fireEvent.click(screen.getByText("Back to Modes ←"));
    expect(screen.getByText(/Hint Hunt/)).toBeTruthy(); // mode select screen
    last.unmount();

    // Replaying an EARLIER mode of a complete deck: plain "Next match" flow
    const earlier = render(
      <MemoryMatch
        stars={allStarred}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialModeIdx={0}
        initialScreen="play"
        initialSeed={0}
      />
    );
    completeBoardFor(earlier.container, 0);
    expect(screen.queryByText("Complete Deck 🎉")).toBeNull();
    // Every mode is already done, so there is no "next match" to offer
    fireEvent.click(screen.getByText("Back to Modes ←"));
    expect(screen.getByLabelText("Play Verse Finder")).toBeTruthy(); // mode select
    earlier.unmount();
    vi.useRealTimers();
  });

  test("completing a board saves a namespaced star and shows the fresh result", () => {
    vi.useFakeTimers();
    const cardDeck = buildDeck(DECKS[0], 2, "ESV");
    const completeBoard = (container) => {
      const cards = () => container.querySelectorAll(".mm-card");
      [0, 1, 2, 3].forEach((pairId) => {
        const [a, b] = cardDeck
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
        initialModeIdx={2}
        initialScreen="play"
        initialSeed={0}
      />
    );
    completeBoard(first.container);
    expect(onSaveStar).toHaveBeenCalledWith("mm-1-2", 3);
    expect(screen.getByText(/Perfect memory/)).toBeTruthy();
    first.unmount();

    // A banked star is never lowered (Math.max path with existing value)
    const onSaveStar2 = vi.fn();
    const second = render(
      <MemoryMatch
        stars={{ "mm-1-2": 1 }}
        onSaveStar={onSaveStar2}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialModeIdx={2}
        initialScreen="play"
        initialSeed={0}
      />
    );
    completeBoard(second.container);
    expect(onSaveStar2).toHaveBeenCalledWith("mm-1-2", 3);
    second.unmount();
    vi.useRealTimers();
  });

  test("finale: completing Deck 8 shows the all-done card; hub return works", () => {
    const onBackToHub = vi.fn();
    render(
      <MemoryMatch
        stars={{ "1-0": 3, "mm-8-0": 3, "mm-8-1": 3, "mm-8-2": "corrupt" }}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={onBackToHub}
        onOpenSettings={vi.fn()}
        initialChapterId={8}
        initialModeIdx={2}
        initialScreen="win"
      />
    );
    fireEvent.click(screen.getByText("Complete Deck 🎉"));
    expect(screen.getByText("You Matched All 8 Decks!")).toBeTruthy();
    fireEvent.click(screen.getByText("Deck Select"));
    expect(screen.getByText("Memory Match")).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Back to Game Hub"));
    expect(onBackToHub).toHaveBeenCalled();
  });
});
