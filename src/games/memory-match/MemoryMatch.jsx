import { useState, useEffect } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { CHAPTERS } from "../../data/chapters.js";
import { MODES } from "./matchData.js";
import { MMChapterSelect } from "./MMChapterSelect.jsx";
import { ModeSelect } from "./ModeSelect.jsx";
import { MemoryBoard } from "./MemoryBoard.jsx";
import { MMWinCard } from "./MMWinCard.jsx";
import { MMChapterDoneCard } from "./MMChapterDoneCard.jsx";
import "./memory-match.css";

export function MemoryMatch({
  stars, // shared stars object; this game's keys are "mm-{chapId}-{modeIdx}"
  onSaveStar,
  translation,
  onBackToHub,
  onOpenSettings,
  initialChapterId = 1,
  initialModeIdx = 0,
  initialScreen = "chapters",
}) {
  // Screen state: "chapters" | "modes" | "play" | "win" | "chapter-done"
  const [screen, setScreen] = useState(initialScreen);
  const [selectedChapterId, setSelectedChapterId] = useState(initialChapterId);
  const [selectedModeIdx, setSelectedModeIdx] = useState(initialModeIdx);
  // Star count from the just-finished board (win screen shows the fresh
  // result, not the previously banked best)
  const [lastResult, setLastResult] = useState({ earned: 0, misses: 0 });

  const currentChapter = CHAPTERS[selectedChapterId - 1];
  const starKey = `mm-${selectedChapterId}-${selectedModeIdx}`;

  useEffect(() => {
    // One music-box track for the whole game (already mapped in SoundEngine)
    audio.setTrack("memory");
  }, []);

  function handleGoToHub() {
    setScreen("chapters");
    onBackToHub();
  }

  function handleSelectChapter(chapId) {
    setSelectedChapterId(chapId);
    setScreen("modes");
  }

  function handleSelectMode(modeIdx) {
    setSelectedModeIdx(modeIdx);
    setScreen("play");
  }

  function handleCompleteBoard(earned, misses) {
    onSaveStar(starKey, Math.max(stars[starKey] || 0, earned));
    setLastResult({ earned, misses });
    audio.playLightApplause();
    setScreen("win");
  }

  function handleNextFromWin() {
    audio.playButtonClick();
    if (selectedModeIdx + 1 < MODES.length) {
      setSelectedModeIdx((prev) => prev + 1);
      setScreen("play");
    } else {
      if (selectedChapterId === CHAPTERS.length) {
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
    setSelectedModeIdx(0);
    setScreen("modes");
  }

  const maxStars = CHAPTERS.length * MODES.length * 3; // 180
  const totalEarned = Object.entries(stars).reduce(
    (a, [k, v]) => a + (k.startsWith("mm-") && typeof v === "number" ? v : 0),
    0
  );

  return (
    <div className="vb-wrapper">
      {screen === "chapters" && (
        <MMChapterSelect
          stars={stars}
          translation={translation}
          onSelectChapter={handleSelectChapter}
          onBackToHub={handleGoToHub}
          onOpenSettings={onOpenSettings}
        />
      )}

      {screen === "modes" && (
        <ModeSelect
          chapter={currentChapter}
          stars={stars}
          translation={translation}
          onSelectMode={handleSelectMode}
          onBackToChapters={() => setScreen("chapters")}
        />
      )}

      {screen === "play" && (
        <MemoryBoard
          key={`${selectedChapterId}-${selectedModeIdx}-${translation}`}
          chapter={currentChapter}
          modeIdx={selectedModeIdx}
          translation={translation}
          onBackToModes={() => setScreen("modes")}
          onComplete={handleCompleteBoard}
        />
      )}

      {screen === "win" && (
        <MMWinCard
          chapter={currentChapter}
          modeIdx={selectedModeIdx}
          earnedStars={lastResult.earned}
          misses={lastResult.misses}
          hasNextMode={selectedModeIdx + 1 < MODES.length}
          onReplay={() => setScreen("play")}
          onNext={handleNextFromWin}
          onBackToModes={() => setScreen("modes")}
        />
      )}

      {screen === "chapter-done" && (
        <MMChapterDoneCard
          chapter={currentChapter}
          isAllGameDone={selectedChapterId === CHAPTERS.length}
          totalStars={totalEarned}
          maxStars={maxStars}
          onNextChapter={handleNextChapter}
          onBackToChapters={() => setScreen("chapters")}
          onBackToHub={handleGoToHub}
        />
      )}
    </div>
  );
}
