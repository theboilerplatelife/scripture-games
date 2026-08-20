import { useState, useEffect } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { VolumeSelect } from "./VolumeSelect.jsx";
import { StorySelect } from "./StorySelect.jsx";
import { SequencerBoard } from "./SequencerBoard.jsx";
import { StoryWinCard } from "./StoryWinCard.jsx";
import { StoryReaderModal } from "./StoryReaderModal.jsx";
import { VOLUMES, STORIES, getStoryById, getVolumeStories } from "./storyData.js";
import { CompletionCard } from "../../components/common/CompletionCard.jsx";
import { useScrollToTop } from "../../components/common/useScrollToTop.js";
import { useRouteSync } from "../../components/common/useRouteSync.js";
import { isStarred, sumStars, nextUnfinished } from "../../utils/stars.js";
import "./story-sequencer.css";

const STORY_STARS = STORIES.length * 3; // 108

function randomBoardSeed() {
  return Math.floor(Math.random() * 1_000_000);
}

export function StorySequencer({
  onBackToHub,
  onOpenSettings,
  route,
  onNavigate,
  stars = {},
  onSaveStars,
  initialSeed = null, // tests pin the deal; players get a fresh one per board
}) {
  const [screen, setScreen] = useState("volumes"); // "volumes" | "stories" | "play" | "volume-done"
  const [volumeId, setVolumeId] = useState(1);
  const [storyId, setStoryId] = useState(1);
  const [playSeed, setPlaySeed] = useState(() => initialSeed ?? randomBoardSeed());
  const [winState, setWinState] = useState(null); // { earnedStars, attempts, story }
  // Whether the volume was already finished before the latest win, so a
  // replay cannot re-run the celebration
  const [wasVolumeComplete, setWasVolumeComplete] = useState(false);
  const [readerStory, setReaderStory] = useState(null);

  /* Volumes, stories and the board earn a URL; the win and volume-done
     cards do not. */
  useRouteSync({
    game: "story-sequencer",
    route,
    navigate: onNavigate,
    place:
      screen === "volumes"
        ? { a: null, b: null }
        : screen === "stories"
          ? { a: volumeId, b: null }
          : screen === "play"
            ? { a: volumeId, b: storyId }
            : null,
    apply: ({ a, b }) => {
      if (a === null) {
        setScreen("volumes");
        return;
      }
      setVolumeId(a);
      if (b === null) {
        setScreen("stories");
        return;
      }
      setStoryId(b);
      setScreen("play");
    },
  });

  useEffect(() => {
    audio.setTrack("sequencer");
  }, []);

  useScrollToTop(screen);

  const currentStory = getStoryById(storyId);
  const volumeStories = getVolumeStories(volumeId);
  const currentStoryIndex = volumeStories.findIndex((s) => s.id === storyId);
  const hasNextStory = currentStoryIndex >= 0 && currentStoryIndex < volumeStories.length - 1;
  const isVolumeComplete = volumeStories.every(
    (story) => story.id === storyId || isStarred(stars, `ss-${story.id}`)
  );
  const justCompletedVolume = isVolumeComplete && !wasVolumeComplete;
  const isLastVolume = volumeId === VOLUMES.length;
  const currentVolume = VOLUMES[volumeId - 1];

  function handleSelectVolume(volId) {
    setVolumeId(volId);
    setScreen("stories");
  }

  function handleSelectStory(sId) {
    setStoryId(sId);
    setPlaySeed(randomBoardSeed());
    setWinState(null);
    setScreen("play");
  }

  const isStoryDone = (story) => isStarred(stars, `ss-${story.id}`);

  function handleCompleteStory(earnedStars, attempts, hintsUsed) {
    const key = `ss-${storyId}`;
    const prev = stars[key] || 0;
    setWasVolumeComplete(volumeStories.every(isStoryDone));
    if (earnedStars > prev && onSaveStars) {
      onSaveStars(key, earnedStars);
    }
    setWinState({ earnedStars, attempts, hintsUsed, story: currentStory });
  }

  function handlePlayAgain() {
    setWinState(null);
    setPlaySeed(randomBoardSeed());
  }

  function handleNextStory() {
    setWinState(null);
    if (justCompletedVolume) {
      if (isLastVolume) {
        audio.playAllDoneFanfare();
      } else {
        audio.playChapterFanfare();
      }
      setScreen("volume-done");
      return;
    }
    // The nearest story still unfinished, wrapping around — stories can be
    // played in any order
    const nextIdx = nextUnfinished(volumeStories.length, currentStoryIndex, (i) =>
      isStoryDone(volumeStories[i])
    );
    if (nextIdx === undefined) {
      // Replaying inside a volume that was already finished — nothing to move
      // on to, so hand the player back the list
      setScreen("stories");
      return;
    }
    setStoryId(volumeStories[nextIdx].id);
    setPlaySeed(randomBoardSeed());
  }

  function handleNextVolume() {
    audio.playButtonClick();
    setVolumeId((id) => id + 1);
    setScreen("stories");
  }

  return (
    <div className="story-sequencer-app">
      {screen === "volumes" && (
        <VolumeSelect
          stars={stars}
          onSelectVolume={handleSelectVolume}
          onBackToHub={() => {
            audio.setTrack("hub");
            onBackToHub();
          }}
          onOpenSettings={onOpenSettings}
        />
      )}

      {screen === "stories" && (
        <StorySelect
          volumeId={volumeId}
          stars={stars}
          onSelectStory={handleSelectStory}
          onBackToVolumes={() => setScreen("volumes")}
        />
      )}

      {screen === "play" && (
        <SequencerBoard
          key={`${storyId}-${playSeed}`}
          story={currentStory}
          seed={playSeed}
          onBackToStories={() => {
            setWinState(null);
            setScreen("stories");
          }}
          onComplete={handleCompleteStory}
        />
      )}

      {/* Win Celebration Modal */}
      {winState && (
        <StoryWinCard
          story={winState.story}
          earnedStars={winState.earnedStars}
          attempts={winState.attempts}
          hintsUsed={winState.hintsUsed}
          hasNextStory={hasNextStory}
          completesVolume={justCompletedVolume}
          onPlayAgain={handlePlayAgain}
          onReadStory={() => setReaderStory(winState.story)}
          onNextStory={handleNextStory}
          onBackToStories={() => {
            setWinState(null);
            setScreen("stories");
          }}
          onBackToVolumes={() => {
            setWinState(null);
            setScreen("volumes");
          }}
        />
      )}

      {screen === "volume-done" && (
        <CompletionCard
          icon={isLastVolume ? "📚" : currentVolume.icon}
          title={
            isLastVolume
              ? "You Ordered Every Story!"
              : `${currentVolume.title} Complete!`
          }
          cheer={
            isLastVolume ? (
              <>
                ⭐ <strong>{sumStars(stars, { prefix: "ss-" })} of {STORY_STARS} Story Stars Collected!</strong>
                <br />
                &ldquo;Tell the next generation the glorious deeds of the LORD.&rdquo; (Psalm 78:4)
              </>
            ) : (
              <>
                You put every story in <strong>{currentVolume.title}</strong> in order!
                <br />
                The next volume is waiting for you.
              </>
            )
          }
          nextLabel="Next Volume →"
          onNext={isLastVolume ? null : handleNextVolume}
          selectLabel="Story Volumes"
          onSelect={() => setScreen("volumes")}
          onBackToHub={() => {
            audio.setTrack("hub");
            onBackToHub();
          }}
        />
      )}

      {/* Full Illustrated Storybook Reader */}
      {readerStory && (
        <StoryReaderModal
          story={readerStory}
          onClose={() => setReaderStory(null)}
        />
      )}
    </div>
  );
}
