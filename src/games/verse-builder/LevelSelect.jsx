import { audio } from "../../audio/SoundEngine.js";
import { Buddy } from "../../components/common/Buddy.jsx";
import { Star } from "../../components/common/Star.jsx";
import { jitter } from "../../utils/random.js";

export function LevelSelect({
  chapter,
  onSelectLevel,
  onBackToChapters,
  stars, // { "chapId-lvlIdx": number }
  translation,
}) {
  const getLevelStars = (lvlIdx) => stars[`${chapter.id}-${lvlIdx}`] || 0;

  const isLevelUnlocked = (lvlIdx) => {
    if (lvlIdx === 0) return true;
    return getLevelStars(lvlIdx - 1) > 0 || getLevelStars(lvlIdx) > 0;
  };

  const chapterTotalStars = chapter.verses.reduce((acc, _, i) => acc + getLevelStars(i), 0);

  return (
    <div className="vb-levels-container">
      <div className="vb-topbar" style={{ width: "100%", maxWidth: "560px" }}>
        <div className="vb-topbar-left">
          <button
            className="vb-back"
            onClick={() => {
              audio.playButtonClick();
              onBackToChapters();
            }}
            aria-label="Back to Chapters"
            title="Back to Chapter Select"
          >
            ←
          </button>
        </div>

        <div className="vb-topbar-center">
          <div className="vb-ref-chip">
            <span className="vb-tape vb-tape-top" />
            {chapter.icon} Ch. {chapter.id}: {chapter.title}
          </div>
        </div>

        <div className="vb-topbar-right">
          <div className="vb-stars-pill">
            ⭐ {chapterTotalStars} / {chapter.verses.length * 3}
          </div>
        </div>
      </div>

      <p className="vb-note" style={{ marginTop: "14px" }}>
        {chapter.subtitle} &bull; <strong>{translation}</strong>
      </p>

      <div className="vb-levels-grid" style={{ maxWidth: "560px" }}>
        {chapter.verses.map((v, i) => {
          const unlocked = isLevelUnlocked(i);
          const earned = getLevelStars(i);

          return (
            <button
              key={v.ref}
              className={`vb-level-card ${unlocked ? "" : "locked"}`}
              style={{ transform: `rotate(${jitter(chapter.id * 10 + i, 3, -3, 3)}deg)` }}
              disabled={!unlocked}
              onClick={() => {
                audio.playButtonClick();
                onSelectLevel(i);
              }}
            >
              <span className="vb-tape vb-tape-top" />
              <span className="vb-level-num">{i + 1}</span>
              <span className="vb-level-buddy">
                <Buddy who={v.character} size={48} />
              </span>
              <span className="vb-level-ref">
                {unlocked ? v.ref : "? ? ?"}
              </span>
              <span className="vb-level-stars">
                {[1, 2, 3].map((n) => (
                  <Star key={n} filled={earned >= n} size={16} />
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
