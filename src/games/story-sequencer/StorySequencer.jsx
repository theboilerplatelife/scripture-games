import { useState, useEffect } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { VolumeSelect } from "./VolumeSelect.jsx";
import { StorySelect } from "./StorySelect.jsx";
import { SequencerBoard } from "./SequencerBoard.jsx";
import { StoryWinCard } from "./StoryWinCard.jsx";
import { StoryReaderModal } from "./StoryReaderModal.jsx";
import { getStoryById, getVolumeStories } from "./storyData.js";
import "./story-sequencer.css";

export function StorySequencer({
  onBackToHub,
  onOpenSettings,
  stars = {},
  onSaveStars,
}) {
  const [screen, setScreen] = useState("volumes"); // "volumes" | "stories" | "play"
  const [volumeId, setVolumeId] = useState(1);
  const [storyId, setStoryId] = useState(1);
  const [playSeed, setPlaySeed] = useState(0);
  const [winState, setWinState] = useState(null); // { earnedStars, attempts, story }
  const [readerStory, setReaderStory] = useState(null);

  useEffect(() => {
    audio.setTrack("sequencer");
  }, []);

  const currentStory = getStoryById(storyId);
  const volumeStories = getVolumeStories(volumeId);
  const currentStoryIndex = volumeStories.findIndex((s) => s.id === storyId);
  const hasNextStory = currentStoryIndex >= 0 && currentStoryIndex < volumeStories.length - 1;

  function handleSelectVolume(volId) {
    setVolumeId(volId);
    setScreen("stories");
  }

  function handleSelectStory(sId) {
    setStoryId(sId);
    setPlaySeed((s) => s + 1);
    setWinState(null);
    setScreen("play");
  }

  function handleCompleteStory(earnedStars, attempts) {
    const key = `ss-${storyId}`;
    const prev = stars[key] || 0;
    if (earnedStars > prev && onSaveStars) {
      onSaveStars(key, earnedStars);
    }
    setWinState({ earnedStars, attempts, story: currentStory });
  }

  function handlePlayAgain() {
    setWinState(null);
    setPlaySeed((s) => s + 1);
  }

  function handleNextStory() {
    const nextStory = volumeStories[currentStoryIndex + 1];
    setStoryId(nextStory.id);
    setPlaySeed((s) => s + 1);
    setWinState(null);
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
          hasNextStory={hasNextStory}
          onPlayAgain={handlePlayAgain}
          onReadStory={() => setReaderStory(winState.story)}
          onNextStory={handleNextStory}
          onBackToStories={() => {
            setWinState(null);
            setScreen("stories");
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
