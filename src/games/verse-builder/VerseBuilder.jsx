import { useState, useEffect } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { CHAPTERS } from "../../data/chapters.js";
import { ChapterSelect } from "./ChapterSelect.jsx";
import { LevelSelect } from "./LevelSelect.jsx";
import { PlayBoard } from "./PlayBoard.jsx";
import { WinCard } from "./WinCard.jsx";
import { CompletionCard } from "../../components/common/CompletionCard.jsx";
import { isStarred, sumStars, nextUnfinished } from "../../utils/stars.js";
import "./verse-builder.css";

export function VerseBuilder({
  stars, // { "chapId-lvlIdx": number }
  onSaveStar,
  translation,
  onBackToHub,
  onOpenSettings,
  initialChapterId = 1,
  initialLevelIdx = 0,
  initialScreen = "chapters",
}) {
  // Screen state: "chapters" | "levels" | "play" | "win" | "chapter-done"
  const [screen, setScreen] = useState(initialScreen);
  const [selectedChapterId, setSelectedChapterId] = useState(initialChapterId);
  const [selectedLevelIdx, setSelectedLevelIdx] = useState(initialLevelIdx);
  // Whether the chapter was already complete (every verse ≥1 star) BEFORE the
  // latest win — replaying the last verse must not re-celebrate the chapter
  const [wasChapterComplete, setWasChapterComplete] = useState(false);
  // The just-finished run and the best banked before it, so the win card can
  // show the fresh result honestly alongside the personal best
  const [lastResult, setLastResult] = useState({ earned: 0, prevBest: 0 });

  const currentChapter = CHAPTERS[selectedChapterId - 1];
  const currentVerse = currentChapter.verses[selectedLevelIdx];
  const starKey = `${selectedChapterId}-${selectedLevelIdx}`;
  const currentEarnedStars = stars[starKey] || 0;

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

  const isVerseStarred = (i) => isStarred(stars, `${selectedChapterId}-${i}`);

  function handleCompleteVerse(earned) {
    setWasChapterComplete(currentChapter.verses.every((_, i) => isVerseStarred(i)));
    setLastResult({ earned, prevBest: currentEarnedStars || 0 });
    onSaveStar(starKey, Math.max(currentEarnedStars, earned));
    audio.playLightApplause();
    setScreen("win");
  }

  // Complete counting the verse just won (the stars prop may not have the
  // fresh save yet at render time)
  const isChapterComplete = currentChapter.verses.every(
    (_, i) => i === selectedLevelIdx || isVerseStarred(i)
  );
  const justCompletedChapter = isChapterComplete && !wasChapterComplete;

  function handleNextFromWin() {
    audio.playButtonClick();
    if (justCompletedChapter) {
      // This win completed all 8 verses in the chapter!
      if (selectedChapterId === 15) {
        audio.playAllDoneFanfare();
      } else {
        audio.playChapterFanfare();
      }
      setScreen("chapter-done");
    } else if (isChapterComplete) {
      // Replay in an already-complete chapter
      setScreen("levels");
    } else {
      // Nearest verse still missing a star, scanning forward with wraparound
      // (a replay of an early verse must not walk through finished ones)
      setSelectedLevelIdx(
        nextUnfinished(currentChapter.verses.length, selectedLevelIdx, isVerseStarred)
      );
      setScreen("play");
    }
  }

  function handleNextChapter() {
    audio.playButtonClick();
    setSelectedChapterId((prev) => prev + 1);
    setSelectedLevelIdx(0);
    setScreen("levels");
  }

  const totalPossibleStars = CHAPTERS.length * 8 * 3;
  // Exclude other games' namespaced keys (e.g. Memory Match "mm-") from VB totals
  const totalEarnedStars = sumStars(stars, { excludePrefix: "mm-" });

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
          earnedStars={lastResult.earned}
          bestStars={Math.max(lastResult.prevBest, lastResult.earned)}
          isNewBest={lastResult.earned > lastResult.prevBest}
          translation={translation}
          hasNextLevel={!isChapterComplete}
          alreadyCompleted={wasChapterComplete}
          onReplay={() => setScreen("play")}
          onNext={handleNextFromWin}
          onBackToLevels={() => setScreen("levels")}
          onBackToChapters={() => setScreen("chapters")}
        />
      )}

      {/* Screen 5: Chapter Complete / Grand Finale */}
      {screen === "chapter-done" && (
        <CompletionCard
          icon={selectedChapterId === 15 ? "👑" : currentChapter.icon}
          title={
            selectedChapterId === 15
              ? "You Built All 15 Chapters!"
              : `Chapter ${selectedChapterId} Complete!`
          }
          cheer={
            selectedChapterId === 15 ? (
              <>
                ⭐ <strong>{totalEarnedStars} of {totalPossibleStars} Stars Collected!</strong>
                <br />
                &ldquo;I have hidden your word in my heart that I might not sin against you.&rdquo; (Psalm 119:11)
              </>
            ) : (
              <>
                Fantastic job completing <strong>{currentChapter.title}</strong>!
                <br />
                Keep hiding God&rsquo;s word in your heart!
              </>
            )
          }
          nextLabel="Next Chapter →"
          onNext={selectedChapterId === 15 ? null : handleNextChapter}
          selectLabel="Chapter Select"
          onSelect={() => setScreen("chapters")}
          onBackToHub={handleGoToHub}
        />
      )}
    </div>
  );
}
