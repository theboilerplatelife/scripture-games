import { Confetti } from "../../components/common/Confetti.jsx";
import { Star } from "../../components/common/Star.jsx";
import { audio } from "../../audio/SoundEngine.js";
import { useScrollLock } from "../../components/common/useScrollLock.js";

export function StoryWinCard({
  story,
  earnedStars,
  attempts,
  hintsUsed = 0,
  onPlayAgain,
  onReadStory,
  onNextStory,
  onBackToStories,
  hasNextStory,
  completesVolume = false,
}) {
  useScrollLock();

  // Hints and checks both count as tries in the tally the player sees
  const totalTries = attempts + hintsUsed;

  const getCheer = () => {
    if (earnedStars === 3) return "Brilliant Timeline Mastery!";
    if (earnedStars === 2) return "Great Story Ordering!";
    return "You Put the Story in Order!";
  };

  return (
    <div className="vb-win-overlay">
      <Confetti />
      <div className="vb-win-card" role="dialog" aria-label="Story Completed">
        <span className="vb-tape vb-tape-top" />
        <div className="vb-win-icon" aria-hidden="true">{story.icon}</div>
        <h2 className="vb-win-title">{getCheer()}</h2>
        <p className="vb-win-sub">
          You sequenced <strong>{story.title}</strong> in {totalTries}{" "}
          {totalTries === 1 ? "try" : "tries"}
          {hintsUsed > 0 ? " with hints" : ""}!
        </p>

        <div className="vb-win-stars">
          {[1, 2, 3].map((n) => (
            <Star key={n} filled={earnedStars >= n} size={36} />
          ))}
        </div>

        <div className="ss-win-actions">
          <button
            className="vb-btn ss-read-btn"
            onClick={() => {
              audio.playButtonClick();
              onReadStory();
            }}
          >
            Read Full Story 📖
          </button>

          <div className="ss-win-secondary-btns">
            <button
              className="vb-btn ghost"
              onClick={() => {
                audio.playButtonClick();
                onPlayAgain();
              }}
            >
              Play Again 🔄
            </button>

            {completesVolume ? (
              <button
                className="vb-btn"
                onClick={() => {
                  audio.playButtonClick();
                  onNextStory();
                }}
              >
                Complete Volume 🎉
              </button>
            ) : hasNextStory ? (
              <button
                className="vb-btn"
                onClick={() => {
                  audio.playButtonClick();
                  onNextStory();
                }}
              >
                Next Story →
              </button>
            ) : (
              <button
                className="vb-btn"
                onClick={() => {
                  audio.playButtonClick();
                  onBackToStories();
                }}
              >
                All Volume Stories →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
