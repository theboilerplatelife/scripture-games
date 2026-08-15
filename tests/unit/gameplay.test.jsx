import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { GameHub } from "../../src/games/hub/GameHub.jsx";
import { ChapterSelect } from "../../src/games/verse-builder/ChapterSelect.jsx";
import { LevelSelect } from "../../src/games/verse-builder/LevelSelect.jsx";
import { WinCard } from "../../src/games/verse-builder/WinCard.jsx";
import { ChapterDoneCard } from "../../src/games/verse-builder/ChapterDoneCard.jsx";
import { VerseBuilder } from "../../src/games/verse-builder/VerseBuilder.jsx";
import { CHAPTERS } from "../../src/data/chapters.js";

describe("Gameplay & Full UI Flow Tests", () => {
  test("GameHub renders title, stats with mixed values and handles game selection", () => {
    const handleSelectGame = vi.fn();
    const handleOpenSettings = vi.fn();

    render(
      <GameHub
        onSelectGame={handleSelectGame}
        onOpenSettings={handleOpenSettings}
        translation="ESV"
        allStars={{ "1-0": 3, "1-1": "invalid_value", "1-2": null }}
      />
    );

    expect(screen.getByText("Scripture Games")).toBeTruthy();

    const playBtn = screen.getByRole("button", { name: /Verse Builder/i });
    fireEvent.click(playBtn);
    expect(handleSelectGame).toHaveBeenCalledWith("verse-builder");

    const settingsBtn = screen.getByLabelText("Open Game Settings");
    fireEvent.click(settingsBtn);
    expect(handleOpenSettings).toHaveBeenCalled();
  });

  test("ChapterSelect renders chapters, unlocks, stars, and controls", () => {
    const handleSelectChapter = vi.fn();
    const handleBackToHub = vi.fn();
    const handleOpenSettings = vi.fn();

    // Chapter 1 has 1 star, unlocking Chapter 2
    render(
      <ChapterSelect
        stars={{ "1-0": 3, "1-1": "invalid" }}
        translation="ESV"
        onSelectChapter={handleSelectChapter}
        onBackToHub={handleBackToHub}
        onOpenSettings={handleOpenSettings}
      />
    );

    const backBtn = screen.getByLabelText("Back to Game Hub");
    fireEvent.click(backBtn);
    expect(handleBackToHub).toHaveBeenCalled();

    const settingsBtn = screen.getByLabelText("Settings");
    fireEvent.click(settingsBtn);
    expect(handleOpenSettings).toHaveBeenCalled();

    const ch1Btn = screen.getByRole("button", { name: /Little Seeds/i });
    fireEvent.click(ch1Btn);
    expect(handleSelectChapter).toHaveBeenCalledWith(1);
  });

  test("LevelSelect renders 8 levels and handles back and selection", () => {
    const handleSelectLevel = vi.fn();
    const handleBackToChapters = vi.fn();

    render(
      <LevelSelect
        chapter={CHAPTERS[0]}
        stars={{ "1-0": 3 }}
        translation="ESV"
        onSelectLevel={handleSelectLevel}
        onBackToChapters={handleBackToChapters}
      />
    );

    const backBtn = screen.getByLabelText("Back to Chapters");
    fireEvent.click(backBtn);
    expect(handleBackToChapters).toHaveBeenCalled();

    const level1Btn = screen.getByRole("button", { name: /1 Thessalonians/i });
    fireEvent.click(level1Btn);
    expect(handleSelectLevel).toHaveBeenCalledWith(0);
  });

  test("WinCard renders victory verse, cheer, next and chapter complete buttons", () => {
    const handleReplay = vi.fn();
    const handleNext = vi.fn();

    // 1. Regular next level
    const { rerender } = render(
      <WinCard
        verse={CHAPTERS[0].verses[0]}
        earnedStars={3}
        translation="ESV"
        hasNextLevel={true}
        onReplay={handleReplay}
        onNext={handleNext}
      />
    );

    expect(screen.getByText("— 1 Thessalonians 5:17 (ESV)")).toBeTruthy();
    expect(screen.getByText("God loves to hear you pray — any time, anywhere!")).toBeTruthy();

    const replayBtn = screen.getByText("Build it again");
    fireEvent.click(replayBtn);
    expect(handleReplay).toHaveBeenCalled();

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
      />
    );
    expect(screen.getByText("Complete Chapter 🎉")).toBeTruthy();
  });

  test("ChapterDoneCard renders chapter completion and handles next/back", () => {
    const handleNextChapter = vi.fn();
    const handleBackToChapters = vi.fn();
    const handleBackToHub = vi.fn();

    const { rerender } = render(
      <ChapterDoneCard
        chapter={CHAPTERS[0]}
        isAllGameDone={false}
        totalStars={24}
        maxStars={360}
        onNextChapter={handleNextChapter}
        onBackToChapters={handleBackToChapters}
        onBackToHub={handleBackToHub}
      />
    );

    expect(screen.getByText("Chapter 1 Complete!")).toBeTruthy();
    const nextChBtn = screen.getByText("Next Chapter →");
    fireEvent.click(nextChBtn);
    expect(handleNextChapter).toHaveBeenCalled();

    const chSelectBtn = screen.getByText("Chapter Select");
    fireEvent.click(chSelectBtn);
    expect(handleBackToChapters).toHaveBeenCalled();

    const hubBtn = screen.getByText(/Game Hub/i);
    fireEvent.click(hubBtn);
    expect(handleBackToHub).toHaveBeenCalled();

    // Rerender as all game completed (Chapter 15 finale)
    rerender(
      <ChapterDoneCard
        chapter={CHAPTERS[14]}
        isAllGameDone={true}
        totalStars={360}
        maxStars={360}
        onNextChapter={null}
        onBackToChapters={handleBackToChapters}
        onBackToHub={handleBackToHub}
      />
    );
    expect(screen.getByText("You Built All 15 Chapters!")).toBeTruthy();
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
        jumpToVerse={{ chapterId: 1, levelIdx: 7 }}
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

  test("VerseBuilder Chapter 15 completion triggers Grand Finale", () => {
    vi.useFakeTimers();
    const handleSaveStar = vi.fn();
    const handleBackToHub = vi.fn();
    const handleOpenSettings = vi.fn();

    render(
      <VerseBuilder
        stars={{ "1-0": 3, "1-1": "invalid" }}
        onSaveStar={handleSaveStar}
        translation="ESV"
        onBackToHub={handleBackToHub}
        onOpenSettings={handleOpenSettings}
        jumpToVerse={{ chapterId: 15, levelIdx: 7 }}
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

  test("VerseBuilder regular level advance to next level", () => {
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
        jumpToVerse={{ chapterId: 1, levelIdx: 0 }}
      />
    );

    // Solve Chapter 1 Level 1 ("Pray without ceasing.")
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
        jumpToVerse={{ chapterId: 1, levelIdx: 0 }}
      />
    );

    // Solve verse
    fireEvent.click(screen.getByRole("button", { name: "Place word Pray" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word without" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word ceasing." }));

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // WinCard -> Click "Build it again"
    const replayBtn = screen.getByText("Build it again");
    fireEvent.click(replayBtn);
    expect(screen.getByText("1 Thessalonians 5:17")).toBeTruthy();

    vi.useRealTimers();
  });
});
