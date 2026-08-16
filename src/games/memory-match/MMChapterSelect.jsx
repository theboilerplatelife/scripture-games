import { audio } from "../../audio/SoundEngine.js";
import { CHAPTERS } from "../../data/chapters.js";
import { jitter } from "../../utils/random.js";
import { MODES } from "./matchData.js";

export function MMChapterSelect({
  onSelectChapter,
  onBackToHub,
  onOpenSettings,
  stars, // shared stars object; Memory Match keys are "mm-{chapId}-{modeIdx}"
  translation,
}) {
  const getChapterStars = (chapId) =>
    MODES.reduce((acc, _, m) => {
      const v = stars[`mm-${chapId}-${m}`];
      return acc + (typeof v === "number" ? v : 0);
    }, 0);

  const isChapterUnlocked = (idx) => {
    if (idx === 0) return true;
    return getChapterStars(CHAPTERS[idx - 1].id) > 0;
  };

  const totalEarned = Object.entries(stars).reduce(
    (a, [k, v]) => a + (k.startsWith("mm-") && typeof v === "number" ? v : 0),
    0
  );
  const maxStars = CHAPTERS.length * MODES.length * 3; // 180

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
            title="Settings (Translation & Audio)"
          >
            <span className="vb-tape vb-tape-mini" />
            <span>⚙️ Settings</span>
          </button>
        </div>
      </div>

      <div className="vb-title-card">
        <span className="vb-tape vb-tape-top" />
        <h1>Memory Match</h1>
        <p className="vb-sub">Pick a chapter and flip the cards to find pairs!</p>
      </div>

      <p className="vb-note">
        15 chapters &bull; 4 match modes each &bull; Verses in <strong>{translation}</strong>
      </p>

      <div className="vb-chapters-grid">
        {CHAPTERS.map((chap, idx) => {
          const unlocked = isChapterUnlocked(idx);
          const chapStars = getChapterStars(chap.id);

          return (
            <button
              key={chap.id}
              className={`vb-chapter-card ${unlocked ? "" : "locked"}`}
              style={{ "--rot": `${jitter(chap.id + 50, 1, -2, 2)}deg`, "--chap": chap.color, "--chap-tape": `${chap.color}8c` }}
              disabled={!unlocked}
              onClick={() => {
                audio.playButtonClick();
                onSelectChapter(chap.id);
              }}
              aria-label={`Memory Match Chapter ${chap.id}: ${unlocked ? chap.title : "Locked"}`}
            >
              <span className="vb-tape vb-tape-top" />
              <div className="vb-chapter-header">
                <span className="vb-chapter-num">Chapter {chap.id}</span>
                <span className="vb-chapter-stars">⭐ {chapStars}/{MODES.length * 3}</span>
              </div>
              <h2 className="vb-chapter-title">
                {chap.icon} {unlocked ? chap.title : "Locked Chapter"}
              </h2>
              <p className="vb-chapter-sub">
                {unlocked ? chap.subtitle : "Earn at least 1 star in the previous chapter to unlock."}
              </p>
              <div className="vb-chapter-meta">
                <span>4 Match Modes</span>
                <span>{unlocked ? "Play →" : "🔒 Locked"}</span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="vb-total">
        ⭐ {totalEarned} of {maxStars} memory stars collected
      </p>
    </div>
  );
}
