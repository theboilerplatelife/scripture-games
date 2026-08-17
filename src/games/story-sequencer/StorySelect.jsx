import { audio } from "../../audio/SoundEngine.js";
import { Star } from "../../components/common/Star.jsx";
import { jitter } from "../../utils/random.js";
import { VOLUMES, getVolumeStories } from "./storyData.js";

export function StorySelect({
  volumeId,
  stars,
  onSelectStory,
  onBackToVolumes,
}) {
  const volume = VOLUMES.find((v) => v.id === volumeId);
  const stories = getVolumeStories(volume.id);

  const getStoryStars = (storyId) => stars[`ss-${storyId}`] || 0;
  const volTotal = stories.reduce((acc, s) => acc + getStoryStars(s.id), 0);

  return (
    <div className="vb-levels-container">
      <div className="vb-topbar" style={{ width: "100%", maxWidth: "680px" }}>
        <div className="vb-topbar-left">
          <button
            className="vb-back"
            onClick={() => {
              audio.playButtonClick();
              onBackToVolumes();
            }}
            aria-label="Back to Story Volumes"
            title="Back to Volume Select"
          >
            ←
          </button>
        </div>

        <div className="vb-topbar-center">
          <div className="vb-ref-chip">
            <span className="vb-tape vb-tape-top" />
            {volume.icon} Vol {volume.id}: {volume.title}
          </div>
        </div>

        <div className="vb-topbar-right">
          <div className="vb-stars-pill">
            ⭐ {volTotal} / {stories.length * 3}
          </div>
        </div>
      </div>

      <p className="vb-note" style={{ marginTop: "14px" }}>
        {volume.subtitle} &bull; <strong>Pick a Bible Story</strong>
      </p>

      <div className="ss-stories-grid">
        {stories.map((story) => {
          const earned = getStoryStars(story.id);
          return (
            <button
              key={story.id}
              className="ss-story-card"
              style={{ "--rot": `${jitter(story.id * 3, 2, -1.8, 1.8)}deg` }}
              onClick={() => {
                audio.playButtonClick();
                onSelectStory(story.id);
              }}
              aria-label={`Play story ${story.id}: ${story.title}`}
            >
              <span className="vb-tape vb-tape-top" />
              <div className="ss-story-header">
                <span className="ss-story-icon" aria-hidden="true">{story.icon}</span>
                <span className="ss-story-ref">{story.scripture}</span>
              </div>
              <h2 className="ss-story-title">{story.title}</h2>
              <p className="ss-story-sub">{story.subtitle}</p>
              <div className="ss-story-meta">
                <span className="ss-story-steps">{story.events.length} Events</span>
                <span className="ss-story-stars">
                  {[1, 2, 3].map((n) => (
                    <Star key={n} filled={earned >= n} size={18} />
                  ))}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
