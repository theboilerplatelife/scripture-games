import { useState, useEffect } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { DECKS, MODES } from "./matchData.js";
import { MMChapterSelect } from "./MMChapterSelect.jsx";
import { ModeSelect } from "./ModeSelect.jsx";
import { MemoryBoard } from "./MemoryBoard.jsx";
import { MMWinCard } from "./MMWinCard.jsx";
import { CompletionCard } from "../../components/common/CompletionCard.jsx";
import { useScrollToTop } from "../../components/common/useScrollToTop.js";
import { isStarred, starValue, sumStars, nextUnfinished } from "../../utils/stars.js";
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
  // Result of the just-finished board, including whether the deck was
  // already complete BEFORE this board (replays to improve a star count
  // must not re-trigger the deck-completion celebration)
  const [lastResult, setLastResult] = useState({ earned: 0, misses: 0, prevBest: 0, wasAlreadyComplete: false });
  // A fresh seed per board entry so replays deal different cards
  const [playSeed, setPlaySeed] = useState(() => initialSeed ?? randomBoardSeed());

  useScrollToTop(screen);

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

  const isModeStarred = (m) => isStarred(stars, `mm-${selectedChapterId}-${m}`);

  function handleCompleteBoard(earned, misses) {
    const wasAlreadyComplete = MODES.every((_, m) => isModeStarred(m));
    const prevBest = starValue(stars, starKey);
    onSaveStar(starKey, Math.max(prevBest, earned));
    setLastResult({ earned, misses, prevBest, wasAlreadyComplete });
    audio.playLightApplause();
    setScreen("win");
  }

  // Complete counting the mode just won (the stars prop may not have the
  // fresh save yet at render time)
  const isDeckComplete = MODES.every((_, m) => m === selectedModeIdx || isModeStarred(m));

  // Celebrate only the win that completed the deck, not later replays
  const justCompletedDeck = isDeckComplete && !lastResult.wasAlreadyComplete;

  function handleNextFromWin() {
    audio.playButtonClick();
    if (justCompletedDeck) {
      if (selectedChapterId === DECKS.length) {
        audio.playAllDoneFanfare();
      } else {
        audio.playChapterFanfare();
      }
      setScreen("chapter-done");
    } else if (isDeckComplete) {
      // Deck was already complete — back to mode select
      setScreen("modes");
    } else {
      // Nearest mode still missing a star, scanning forward with wraparound
      setSelectedModeIdx(nextUnfinished(MODES.length, selectedModeIdx, isModeStarred));
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
  const totalEarned = sumStars(stars, { prefix: "mm-" });

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
          bestStars={Math.max(lastResult.prevBest, lastResult.earned)}
          isNewBest={lastResult.earned > lastResult.prevBest}
          misses={lastResult.misses}
          isDeckComplete={justCompletedDeck}
          returnsToModes={!justCompletedDeck && isDeckComplete}
          onReplay={dealNewBoard}
          onNext={handleNextFromWin}
          onBackToModes={() => setScreen("modes")}
          onBackToDecks={() => setScreen("chapters")}
        />
      )}

      {screen === "chapter-done" && (
        <CompletionCard
          icon={selectedChapterId === DECKS.length ? "🏆" : currentDeck.icon}
          title={
            selectedChapterId === DECKS.length
              ? `You Matched All ${DECKS.length} Decks!`
              : `Deck ${selectedChapterId} Matched!`
          }
          cheer={
            selectedChapterId === DECKS.length ? (
              <>
                ⭐ <strong>{totalEarned} of {maxStars} Memory Stars Collected!</strong>
                <br />
                &ldquo;I will remember the deeds of the LORD.&rdquo; (Psalm 77:11)
              </>
            ) : (
              <>
                You found every pair in <strong>{currentDeck.title}</strong>!
                <br />
                What a memory — keep it up!
              </>
            )
          }
          nextLabel="Next Deck →"
          onNext={selectedChapterId === DECKS.length ? null : handleNextChapter}
          selectLabel="Deck Select"
          onSelect={() => setScreen("chapters")}
          onBackToHub={handleGoToHub}
        />
      )}
    </div>
  );
}
