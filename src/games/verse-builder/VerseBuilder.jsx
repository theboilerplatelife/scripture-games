import { useState, useEffect } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { CHAPTERS } from "../../data/chapters.js";
import { ChapterSelect } from "./ChapterSelect.jsx";
import { LevelSelect } from "./LevelSelect.jsx";
import { PlayBoard } from "./PlayBoard.jsx";
import { WinCard } from "./WinCard.jsx";
import { ChapterDoneCard } from "./ChapterDoneCard.jsx";
import "./verse-builder.css";

export function VerseBuilder({
  stars, // { "chapId-lvlIdx": number }
  onSaveStar,
  translation,
  onBackToHub,
  onOpenSettings,
  jumpToVerse,
  onClearJump,
}) {
  // Screen state: "chapters" | "levels" | "play" | "win" | "chapter-done"
  const [screen, setScreen] = useState(() => (jumpToVerse ? "play" : "chapters"));
  const [selectedChapterId, setSelectedChapterId] = useState(() => (jumpToVerse ? jumpToVerse.chapterId : 1));
  const [selectedLevelIdx, setSelectedLevelIdx] = useState(() => (jumpToVerse ? jumpToVerse.levelIdx : 0));

  const currentChapter = CHAPTERS[selectedChapterId - 1];
  const currentVerse = currentChapter.verses[selectedLevelIdx];
  const starKey = `${selectedChapterId}-${selectedLevelIdx}`;
  const currentEarnedStars = stars[starKey] || 0;

  // Consume jumpToVerse once received
  useEffect(() => {
    if (jumpToVerse && onClearJump) {
      onClearJump();
    }
  }, [jumpToVerse, onClearJump]);

  function handleGoToHub() {
    setScreen("chapters");
    onBackToHub();
  }

  // Audio track switcher based on current screen
  useEffect(() => {
    if (screen === "chapters" || screen === "levels") {
      audio.setTrack("title");
    } else if (screen === "play") {
      audio.setTrack("verse");
    }
  }, [screen]);

  function handleSelectChapter(chapId) {
    setSelectedChapterId(chapId);
    setScreen("levels");
  }

  function handleSelectLevel(lvlIdx) {
    setSelectedLevelIdx(lvlIdx);
    setScreen("play");
  }

  function handleCompleteVerse(earned) {
    onSaveStar(starKey, Math.max(currentEarnedStars, earned));
    audio.playLightApplause();
    setScreen("win");
  }

  function handleNextFromWin() {
    audio.playButtonClick();
    if (selectedLevelIdx + 1 < currentChapter.verses.length) {
      setSelectedLevelIdx((prev) => prev + 1);
      setScreen("play");
    } else {
      // Completed all 8 verses in this chapter!
      if (selectedChapterId === 15) {
        audio.playAllDoneFanfare();
      } else {
        audio.playChapterFanfare();
      }
      setScreen("chapter-done");
    }
  }

  function handleNextChapter() {
    audio.playButtonClick();
    setSelectedChapterId((prev) => prev + 1);
    setSelectedLevelIdx(0);
    setScreen("levels");
  }

  const totalPossibleStars = CHAPTERS.length * 8 * 3;
  const totalEarnedStars = Object.values(stars).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0);

  return (
    <div className="vb-wrapper">
      {/* Screen 1: Chapter Selection */}
      {screen === "chapters" && (
        <ChapterSelect
          stars={stars}
          translation={translation}
          onSelectChapter={handleSelectChapter}
          onBackToHub={handleGoToHub}
          onOpenSettings={onOpenSettings}
        />
      )}

      {/* Screen 2: Level Selection */}
      {screen === "levels" && (
        <LevelSelect
          chapter={currentChapter}
          stars={stars}
          translation={translation}
          onSelectLevel={handleSelectLevel}
          onBackToChapters={() => setScreen("chapters")}
        />
      )}

      {/* Screen 3: Gameplay Board */}
      {screen === "play" && (
        <PlayBoard
          key={`${selectedChapterId}-${selectedLevelIdx}-${translation}`}
          chapterId={selectedChapterId}
          levelIndex={selectedLevelIdx}
          verse={currentVerse}
          translation={translation}
          onBackToLevels={() => setScreen("levels")}
          onCompleteVerse={handleCompleteVerse}
        />
      )}

      {/* Screen 4: Level Win Card */}
      {screen === "win" && (
        <WinCard
          verse={currentVerse}
          earnedStars={currentEarnedStars || 3}
          translation={translation}
          hasNextLevel={selectedLevelIdx + 1 < currentChapter.verses.length}
          onReplay={() => setScreen("play")}
          onNext={handleNextFromWin}
          onBackToLevels={() => setScreen("levels")}
        />
      )}

      {/* Screen 5: Chapter Complete / Grand Finale */}
      {screen === "chapter-done" && (
        <ChapterDoneCard
          chapter={currentChapter}
          isAllGameDone={selectedChapterId === 15}
          totalStars={totalEarnedStars}
          maxStars={totalPossibleStars}
          onNextChapter={handleNextChapter}
          onBackToChapters={() => setScreen("chapters")}
          onBackToHub={handleGoToHub}
        />
      )}
    </div>
  );
}
