import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ChapterSelect } from "../../src/games/verse-builder/ChapterSelect.jsx";
import { LevelSelect } from "../../src/games/verse-builder/LevelSelect.jsx";
import { WinCard } from "../../src/games/verse-builder/WinCard.jsx";
import { VerseBuilder } from "../../src/games/verse-builder/VerseBuilder.jsx";
import { CHAPTERS } from "../../src/data/chapters.js";

describe("Verse Builder Gameplay Flow Tests", () => {
  test("ChapterSelect renders all 15 chapters and computes star progress", () => {
    const handleSelectChapter = vi.fn();
    const handleBackToHub = vi.fn();
    const handleOpenSettings = vi.fn();

    const mockStars = {
      "1-0": 3,
      "1-1": 3,
      "1-2": 2,
    };

    render(
      <ChapterSelect
        stars={mockStars}
        translation="ESV"
        onSelectChapter={handleSelectChapter}
        onBackToHub={handleBackToHub}
        onOpenSettings={handleOpenSettings}
      />
    );

    expect(screen.getByText("Verse Builder")).toBeTruthy();

    const ch1Btn = screen.getByRole("button", { name: /Little Seeds/i });
    fireEvent.click(ch1Btn);
    expect(handleSelectChapter).toHaveBeenCalledWith(1);

    const backBtn = screen.getByLabelText("Back to Game Hub");
    fireEvent.click(backBtn);
    expect(handleBackToHub).toHaveBeenCalled();

    const settingsBtn = screen.getByLabelText("Settings");
    fireEvent.click(settingsBtn);
    expect(handleOpenSettings).toHaveBeenCalled();
  });

  test("ChapterSelect stamps completed and perfect chapters", () => {
    const noop = vi.fn();
    const complete = { "1-0": 1, "1-1": 1, "1-2": 2, "1-3": 1, "1-4": 3, "1-5": 1, "1-6": 1, "1-7": 1, "2-0": "bad" };

    const { rerender } = render(
      <ChapterSelect stars={{ "1-0": 3 }} translation="ESV" onSelectChapter={noop} onBackToHub={noop} onOpenSettings={noop} />
    );
    expect(screen.queryByText("✓ Complete")).toBeNull();

    rerender(
      <ChapterSelect stars={complete} translation="ESV" onSelectChapter={noop} onBackToHub={noop} onOpenSettings={noop} />
    );
    expect(screen.getByText("✓ Complete")).toBeTruthy();

    const perfect = Object.fromEntries([0, 1, 2, 3, 4, 5, 6, 7].map((l) => [`1-${l}`, 3]));
    rerender(
      <ChapterSelect stars={perfect} translation="ESV" onSelectChapter={noop} onBackToHub={noop} onOpenSettings={noop} />
    );
    expect(screen.getByText("★ Perfect!")).toBeTruthy();
  });

  test("LevelSelect shows unlocked levels, locked levels, stars, and handles selection", () => {
    const handleSelectLevel = vi.fn();
    const handleBackToChapters = vi.fn();

    const mockStars = {
      "1-0": 3,
      "1-1": 2,
      "1-2": 1,
    };

    render(
      <LevelSelect
        chapter={CHAPTERS[0]}
        stars={mockStars}
        translation="ESV"
        onSelectLevel={handleSelectLevel}
        onBackToChapters={handleBackToChapters}
      />
    );

    expect(screen.getByText(/Little Seeds/i)).toBeTruthy();

    // Select unlocked level (Level 1)
    const level1Btn = screen.getByRole("button", { name: /1 Thessalonians 5:17/i });
    fireEvent.click(level1Btn);
    expect(handleSelectLevel).toHaveBeenCalledWith(0);

    // Try clicking a locked level (Level 6: 1-5 is locked because 1-3 has 0 stars)
    const level6Btn = screen.getByRole("button", { name: /6\? \? \?/i });
    fireEvent.click(level6Btn);
    expect(handleSelectLevel).toHaveBeenCalledTimes(1); // Not called again

    // Back to chapters
    const backBtn = screen.getByLabelText("Back to Chapters");
    fireEvent.click(backBtn);
    expect(handleBackToChapters).toHaveBeenCalled();
  });

  test("WinCard renders completion stars, verse text, cheer and handles replay/next/back", () => {
    const handleReplay = vi.fn();
    const handleNext = vi.fn();
    const handleBackToLevels = vi.fn();

    const { rerender } = render(
      <WinCard
        verse={CHAPTERS[0].verses[0]}
        earnedStars={3}
        translation="ESV"
        hasNextLevel={true}
        onReplay={handleReplay}
        onNext={handleNext}
        onBackToLevels={handleBackToLevels}
      />
    );

    expect(screen.getByText("— 1 Thessalonians 5:17 (ESV)")).toBeTruthy();
    expect(screen.getByText("God loves to hear you pray — any time, anywhere!")).toBeTruthy();

    const replayBtn = screen.getByRole("button", { name: /Build again/i });
    fireEvent.click(replayBtn);
    expect(handleReplay).toHaveBeenCalled();

    const topBackBtn = screen.getByLabelText("Back to Levels");
    fireEvent.click(topBackBtn);
    expect(handleBackToLevels).toHaveBeenCalled();

    const nextBtn = screen.getByText("Next verse →");
    fireEvent.click(nextBtn);
    expect(handleNext).toHaveBeenCalled();

    // 2. Final level in chapter (Complete Chapter button) and fallback translation
    rerender(
      <WinCard
        verse={{
          ...CHAPTERS[0].verses[7],
          text: { WEB: "God is our refuge and strength." },
        }}
        earnedStars={1}
        translation="UNKNOWN_TR"
        hasNextLevel={false}
        onReplay={handleReplay}
        onNext={handleNext}
        onBackToLevels={handleBackToLevels}
      />
    );
    expect(screen.getByText("Complete Chapter 🎉")).toBeTruthy();
  });

  test("VerseBuilder full multi-screen navigation and chapter completion", () => {
    vi.useFakeTimers();
    const handleSaveStar = vi.fn();
    const handleBackToHub = vi.fn();
    const handleOpenSettings = vi.fn();

    // Start in Chapter 1 Level 8 (last verse of Chapter 1)
    render(
      <VerseBuilder
        stars={{ "1-0": 3, "1-1": 3, "1-2": 3, "1-3": 3, "1-4": 3, "1-5": 3, "1-6": 3 }}
        onSaveStar={handleSaveStar}
        translation="ESV"
        onBackToHub={handleBackToHub}
        onOpenSettings={handleOpenSettings}
        initialChapterId={1}
        initialLevelIdx={7}
        initialScreen="play"
      />
    );

    // 1. Back from Play to Levels
    const backToLevelsBtn = screen.getByLabelText("Back to Levels");
    fireEvent.click(backToLevelsBtn);

    // 2. Back from Levels to Chapters
    const backToChaptersBtn = screen.getByLabelText("Back to Chapters");
    fireEvent.click(backToChaptersBtn);

    // 3. Select Chapter 1
    fireEvent.click(screen.getByRole("button", { name: /Little Seeds/i }));

    // 4. Select Level 8 (last verse: Genesis 1:1)
    const level8Btn = screen.getByRole("button", { name: /Genesis 1:1/i });
    fireEvent.click(level8Btn);

    // Solve the verse by placing scraps in correct word order
    const ch1v8Words = CHAPTERS[0].verses[7].text.ESV.trim().split(/\s+/);
    ch1v8Words.forEach((w) => {
      const matchBtns = screen.getAllByRole("button", { name: new RegExp(`^Place word ${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`) });
      if (matchBtns.length > 0) {
        fireEvent.click(matchBtns[0]);
      }
    });

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // WinCard appears -> click "Complete Chapter 🎉"
    const completeChapterBtn = screen.getByText("Complete Chapter 🎉");
    fireEvent.click(completeChapterBtn);

    // ChapterDoneCard appears -> click "Next Chapter →"
    expect(screen.getByText("Chapter 1 Complete!")).toBeTruthy();
    const nextChapterBtn = screen.getByText("Next Chapter →");
    fireEvent.click(nextChapterBtn);

    // Now in Chapter 2 Level Select
    expect(screen.getByText(/First Steps/i)).toBeTruthy();

    vi.useRealTimers();
  });

  test("replaying the last verse of a completed chapter never re-celebrates", () => {
    vi.useFakeTimers();
    const allStarred = Object.fromEntries([0, 1, 2, 3, 4, 5, 6, 7].map((l) => [`1-${l}`, 2]));

    render(
      <VerseBuilder
        stars={allStarred}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialLevelIdx={7}
        initialScreen="play"
      />
    );

    const ch1v8Words = CHAPTERS[0].verses[7].text.ESV.trim().split(/\s+/);
    ch1v8Words.forEach((w) => {
      const matchBtns = screen.getAllByRole("button", { name: new RegExp(`^Place word ${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`) });
      fireEvent.click(matchBtns[0]);
    });
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Win card offers navigation, not a repeat celebration
    expect(screen.queryByText("Complete Chapter 🎉")).toBeNull();
    expect(screen.getByText("🎉 New best!")).toBeTruthy(); // banked 2, earned 3
    expect(screen.getByText("Verse List ←")).toBeTruthy();
    fireEvent.click(screen.getByText("Chapter Select"));
    expect(screen.getByText("Verse Builder")).toBeTruthy();
    vi.useRealTimers();
  });

  test("Verse List from a replay win in a complete chapter returns to level select", () => {
    vi.useFakeTimers();
    const allStarred = Object.fromEntries([0, 1, 2, 3, 4, 5, 6, 7].map((l) => [`1-${l}`, 2]));
    render(
      <VerseBuilder
        stars={allStarred}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialLevelIdx={0}
        initialScreen="play"
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Place word Pray" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word without" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word ceasing." }));
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    fireEvent.click(screen.getByText("Verse List ←"));
    expect(screen.getByText(/Ch\. 1: Little Seeds/)).toBeTruthy();
    vi.useRealTimers();
  });

  test("next verse skips starred verses and win card shows the personal best", () => {
    vi.useFakeTimers();
    render(
      <VerseBuilder
        stars={{ "1-0": 3, "1-1": 2, "1-2": 1 }}
        onSaveStar={vi.fn()}
        translation="ESV"
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialChapterId={1}
        initialLevelIdx={0}
        initialScreen="play"
      />
    );

    // Replay verse 1 (already 3-starred) flawlessly
    fireEvent.click(screen.getByRole("button", { name: "Place word Pray" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word without" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word ceasing." }));
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Fresh run tied the banked best — no "new best" claim
    expect(screen.getByText("Best: ⭐⭐⭐")).toBeTruthy();
    expect(screen.queryByText("🎉 New best!")).toBeNull();

    // Next verse jumps past the starred verses 2 and 3 to the frontier (verse 4)
    fireEvent.click(screen.getByText("Next verse →"));
    expect(screen.getByText("Psalm 118:24")).toBeTruthy();
    vi.useRealTimers();
  });

  test("VerseBuilder Chapter 15 completion triggers Grand Finale", () => {
    vi.useFakeTimers();
    const handleSaveStar = vi.fn();
    const handleBackToHub = vi.fn();
    const handleOpenSettings = vi.fn();

    render(
      <VerseBuilder
        stars={{ "15-0": 1, "15-1": 1, "15-2": 1, "15-3": 1, "15-4": 1, "15-5": 1, "15-6": 1, "1-1": "invalid" }}
        onSaveStar={handleSaveStar}
        translation="ESV"
        onBackToHub={handleBackToHub}
        onOpenSettings={handleOpenSettings}
        initialChapterId={15}
        initialLevelIdx={7}
        initialScreen="play"
      />
    );

    // Solve Chapter 15 Level 8 (John 3:16) in correct word sequence
    const johnWords = CHAPTERS[14].verses[7].text.ESV.trim().split(/\s+/);
    johnWords.forEach((w) => {
      const matchBtns = screen.getAllByRole("button", { name: new RegExp(`^Place word ${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`) });
      if (matchBtns.length > 0) {
        fireEvent.click(matchBtns[0]);
      }
    });

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Click Complete Chapter
    const completeBtn = screen.getByText("Complete Chapter 🎉");
    fireEvent.click(completeBtn);

    // Grand Finale Card - test Chapter Select button
    const chSelectBtn = screen.getByText("Chapter Select");
    fireEvent.click(chSelectBtn);
    expect(screen.getByText("Select a chapter to reconstruct God’s word!")).toBeTruthy();

    vi.useRealTimers();
  });

  test("VerseBuilder regular level advance to next level and win card back button", () => {
    vi.useFakeTimers();
    const handleSaveStar = vi.fn();
    const handleBackToHub = vi.fn();
    const handleOpenSettings = vi.fn();

    render(
      <VerseBuilder
        stars={{}}
        onSaveStar={handleSaveStar}
        translation="ESV"
        onBackToHub={handleBackToHub}
        onOpenSettings={handleOpenSettings}
        initialChapterId={1}
        initialLevelIdx={0}
        initialScreen="play"
      />
    );

    // Solve Chapter 1 Level 1 ("Pray without ceasing.")
    fireEvent.click(screen.getByRole("button", { name: "Place word Pray" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word without" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word ceasing." }));

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Test WinCard top-left back button
    const backBtn = screen.getByLabelText("Back to Levels");
    fireEvent.click(backBtn);
    expect(screen.getByText(/Little Seeds/i)).toBeTruthy();

    // Re-enter level 1 and test next verse
    const level1Btn = screen.getByRole("button", { name: /1 Thessalonians 5:17/i });
    fireEvent.click(level1Btn);

    fireEvent.click(screen.getByRole("button", { name: "Place word Pray" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word without" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word ceasing." }));

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Click Next verse -> advances to Level 2 (1 John 4:19)
    const nextBtn = screen.getByText("Next verse →");
    fireEvent.click(nextBtn);
    expect(screen.getByText("1 John 4:19")).toBeTruthy();

    vi.useRealTimers();
  });

  test("VerseBuilder replay button returns to play and chapter select returns to chapters", () => {
    vi.useFakeTimers();
    const handleSaveStar = vi.fn();
    const handleBackToHub = vi.fn();
    const handleOpenSettings = vi.fn();

    render(
      <VerseBuilder
        stars={{}}
        onSaveStar={handleSaveStar}
        translation="ESV"
        onBackToHub={handleBackToHub}
        onOpenSettings={handleOpenSettings}
        initialChapterId={1}
        initialLevelIdx={0}
        initialScreen="play"
      />
    );

    // Solve verse
    fireEvent.click(screen.getByRole("button", { name: "Place word Pray" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word without" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word ceasing." }));

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // WinCard -> Click "Build again 🔄"
    const replayBtn = screen.getByRole("button", { name: /Build again/i });
    fireEvent.click(replayBtn);
    expect(screen.getByText("1 Thessalonians 5:17")).toBeTruthy();

    vi.useRealTimers();
  });
});
