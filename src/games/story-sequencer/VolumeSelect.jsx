import { audio } from "../../audio/SoundEngine.js";
import { jitter } from "../../utils/random.js";
import { VOLUMES, getVolumeStories } from "./storyData.js";
import { isStarred } from "../../utils/stars.js";
import { CompletionStamp } from "../../components/common/CompletionStamp.jsx";

export function VolumeSelect({
  onSelectVolume,
  onBackToHub,
  onOpenSettings,
  stars, // shared stars object; Story Sequencer keys are "ss-{storyId}"
}) {
  const getVolumeStars = (vol) => {
    const stories = getVolumeStories(vol.id);
    return stories.reduce((acc, s) => {
      const v = stars[`ss-${s.id}`];
      return acc + (typeof v === "number" ? v : 0);
    }, 0);
  };

  const isVolumeUnlocked = (idx) => {
    if (idx === 0) return true;
    return getVolumeStars(VOLUMES[idx - 1]) > 0;
  };

  const totalEarned = Object.entries(stars).reduce(
    (a, [k, v]) => a + (k.startsWith("ss-") && typeof v === "number" ? v : 0),
    0
  );
  const maxStars = VOLUMES.length * 6 * 3; // 108

  return (
    <div className="vb-chapters-container">
      <div className="vb-header-row">
        <button
          className="vb-back"
          onClick={() => {
            audio.playButtonClick();
            onBackToHub();
          }}
          aria-label="Back to Game Hub"
          title="Back to Game Selection Hub"
        >
          ←
        </button>

        <div className="vb-header-actions">
          <button
            className="vb-music-toggle"
            onClick={() => {
              audio.playButtonClick();
              onOpenSettings();
            }}
            aria-label="Settings"
            title="Settings (Audio)"
          >
            <span className="vb-tape vb-tape-mini" />
            <span>⚙️ Settings</span>
          </button>
        </div>
      </div>

      <div className="vb-title-card">
        <span className="vb-tape vb-tape-top" />
        <h1>Story Sequencer</h1>
        <p className="vb-sub">Choose a volume and arrange biblical events into chronological order!</p>
      </div>

      <p className="vb-note">
        6 Scripture Volumes &bull; 36 Historic Stories &bull; Interactive Timelines
      </p>

      <div className="vb-chapters-grid">
        {VOLUMES.map((vol, idx) => {
          const unlocked = isVolumeUnlocked(idx);
          const stories = getVolumeStories(vol.id);
          const volStars = getVolumeStars(vol);
          const maxVolStars = stories.length * 3; // 18
          // The same rubber stamp the other games' cards carry
          const isComplete = stories.every((s) => isStarred(stars, `ss-${s.id}`));
          const isPerfect = volStars === maxVolStars;

          return (
            <button
              key={vol.id}
              className={`vb-chapter-card ${unlocked ? "" : "locked"}`}
              style={{
                "--rot": `${jitter(vol.id + 80, 1, -2, 2)}deg`,
                "--chap": vol.color,
                "--chap-tape": `${vol.color}8c`,
              }}
              disabled={!unlocked}
              onClick={() => {
                audio.playButtonClick();
                onSelectVolume(vol.id);
              }}
              aria-label={`Volume ${vol.id}: ${unlocked ? vol.title : "Locked"}`}
            >
              <span className="vb-tape vb-tape-top" />
              <CompletionStamp complete={isComplete} perfect={isPerfect} />
              <div className="vb-chapter-header">
                <span className="vb-chapter-num">Volume {vol.id}</span>
                <span className="vb-chapter-stars">⭐ {volStars}/{maxVolStars}</span>
              </div>
              <h2 className="vb-chapter-title">
                {vol.icon} {unlocked ? vol.title : "Locked Volume"}
              </h2>
              <p className="vb-chapter-sub">
                {unlocked ? vol.subtitle : "Earn at least 1 star in the previous volume to unlock."}
              </p>
              <div className="vb-chapter-meta">
                <span>{stories.length} Bible Stories</span>
                <span>{unlocked ? "Open Volume →" : "🔒 Locked"}</span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="vb-total">
        ⭐ {totalEarned} of {maxStars} timeline stars collected
      </p>
    </div>
  );
}
