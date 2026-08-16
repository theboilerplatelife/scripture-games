import { useState, useEffect } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { DECKS, MODES } from "./matchData.js";
import { MMChapterSelect } from "./MMChapterSelect.jsx";
import { ModeSelect } from "./ModeSelect.jsx";
import { MemoryBoard } from "./MemoryBoard.jsx";
import { MMWinCard } from "./MMWinCard.jsx";
import { MMChapterDoneCard } from "./MMChapterDoneCard.jsx";
import "./memory-match.css";

function randomBoardSeed() {
  return Math.floor(Math.random() * 1_000_000);
}

export function MemoryMatch({
  stars, // shared stars object; Memory Match keys are "mm-{deckId}-{modeIdx}"
  onSaveStar,
  translation,
  onBackToHub,
  onOpenSettings,
  initialChapterId = 1,
  initialModeIdx = 0,
  initialScreen = "chapters",
  initialSeed = null, // tests pin the deal; players get a fresh one per board
}) {
  // Screen state: "chapters" | "modes" | "play" | "win" | "chapter-done"
  const [screen, setScreen] = useState(initialScreen);
  const [selectedChapterId, setSelectedChapterId] = useState(initialChapterId);
  const [selectedModeIdx, setSelectedModeIdx] = useState(initialModeIdx);
  // Star count from the just-finished board
  const [lastResult, setLastResult] = useState({ earned: 0, misses: 0 });
  // A fresh seed per board entry so replays deal different cards
  const [playSeed, setPlaySeed] = useState(() => initialSeed ?? randomBoardSeed());

  const currentDeck = DECKS[selectedChapterId - 1];
  const starKey = `mm-${selectedChapterId}-${selectedModeIdx}`;

  useEffect(() => {
    // One music-box track for the whole game
    audio.setTrack("memory");
  }, []);

  function handleGoToHub() {
    setScreen("chapters");
    onBackToHub();
  }

  function handleSelectChapter(deckId) {
    setSelectedChapterId(deckId);
    setScreen("modes");
  }

  function dealNewBoard() {
    setPlaySeed(randomBoardSeed());
    setScreen("play");
  }

  function handleSelectMode(modeIdx) {
    setSelectedModeIdx(modeIdx);
    dealNewBoard();
  }

  function handleCompleteBoard(earned, misses) {
    onSaveStar(starKey, Math.max(stars[starKey] || 0, earned));
    setLastResult({ earned, misses });
    audio.playLightApplause();
    setScreen("win");
  }

  // Check if all modes in current deck are completed (> 0 stars)
  const isDeckComplete = MODES.every((_, m) => {
    if (m === selectedModeIdx) return true; // current mode was just completed
    const v = stars[`mm-${selectedChapterId}-${m}`];
    return typeof v === "number" && v > 0;
  });

  const hasNextMode = selectedModeIdx + 1 < MODES.length;

  function handleNextFromWin() {
    audio.playButtonClick();
    if (isDeckComplete) {
      if (selectedChapterId === DECKS.length) {
        audio.playAllDoneFanfare();
      } else {
        audio.playChapterFanfare();
      }
      setScreen("chapter-done");
    } else if (hasNextMode) {
      setSelectedModeIdx((prev) => prev + 1);
      dealNewBoard();
    } else {
      // Jump to the unplayed mode
      const nextUnplayed = MODES.findIndex(
        (_, m) => !(stars[`mm-${selectedChapterId}-${m}`] > 0)
      );
      setSelectedModeIdx(nextUnplayed);
      dealNewBoard();
    }
  }

  function handleNextChapter() {
    audio.playButtonClick();
    setSelectedChapterId((prev) => prev + 1);
    setSelectedModeIdx(0);
    setScreen("modes");
  }

  const maxStars = DECKS.length * MODES.length * 3; // 72
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
          deck={currentDeck}
          stars={stars}
          translation={translation}
          onSelectMode={handleSelectMode}
          onBackToDecks={() => setScreen("chapters")}
        />
      )}

      {screen === "play" && (
        <MemoryBoard
          key={`${selectedChapterId}-${selectedModeIdx}-${translation}-${playSeed}`}
          deck={currentDeck}
          modeIdx={selectedModeIdx}
          translation={translation}
          seed={playSeed}
          onBackToModes={() => setScreen("modes")}
          onComplete={handleCompleteBoard}
        />
      )}

      {screen === "win" && (
        <MMWinCard
          deck={currentDeck}
          modeIdx={selectedModeIdx}
          earnedStars={lastResult.earned}
          misses={lastResult.misses}
          isDeckComplete={isDeckComplete}
          hasNextMode={hasNextMode}
          onReplay={dealNewBoard}
          onNext={handleNextFromWin}
          onBackToModes={() => setScreen("modes")}
        />
      )}

      {screen === "chapter-done" && (
        <MMChapterDoneCard
          deck={currentDeck}
          isAllGameDone={selectedChapterId === DECKS.length}
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
