import { audio } from "../../audio/SoundEngine.js";
import { CHAPTERS } from "../../data/chapters.js";
import { jitter } from "../../utils/random.js";

export function ChapterSelect({
  onSelectChapter,
  onBackToHub,
  onOpenSettings,
  stars, // { "chapId-lvlIdx": number }
  translation,
}) {
  // Chapter unlock logic: Chapter 1 is always unlocked.
  // Subsequent chapters unlocked if previous chapter has >= 1 star or if any level in that chapter is played.
  const isChapterUnlocked = (idx) => {
    if (idx === 0) return true;
    const prevChap = CHAPTERS[idx - 1];
    // Check if at least 1 star earned in prev chapter
    for (let l = 0; l < prevChap.verses.length; l++) {
      if (stars[`${prevChap.id}-${l}`]) return true;
    }
    return false;
  };

  const getChapterStars = (chap) => {
    let count = 0;
    for (let l = 0; l < chap.verses.length; l++) {
      count += stars[`${chap.id}-${l}`] || 0;
    }
    return count;
  };

  const totalEarnedStars = Object.values(stars).reduce((a, b) => a + (typeof b === "number" ? b : 0), 0);
  const maxPossibleStars = CHAPTERS.length * 8 * 3; // 360

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
        <h1>Verse Builder</h1>
        <p className="vb-sub">Select a chapter to reconstruct God&rsquo;s word!</p>
      </div>

      <p className="vb-note">
        15 progressive chapters &bull; Quoted word-for-word in <strong>{translation}</strong>
      </p>

      <div className="vb-chapters-grid">
        {CHAPTERS.map((chap, idx) => {
          const unlocked = isChapterUnlocked(idx);
          const chapStars = getChapterStars(chap);
          const maxChapStars = chap.verses.length * 3; // 24

          return (
            <button
              key={chap.id}
              className={`vb-chapter-card ${unlocked ? "" : "locked"}`}
              style={{ "--rot": `${jitter(chap.id, 1, -2, 2)}deg` }}
              disabled={!unlocked}
              onClick={() => {
                audio.playButtonClick();
                onSelectChapter(chap.id);
              }}
            >
              <span className="vb-tape vb-tape-top" />
              <div className="vb-chapter-header">
                <span className="vb-chapter-num">Chapter {chap.id}</span>
                <span className="vb-chapter-stars">⭐ {chapStars}/{maxChapStars}</span>
              </div>
              <h2 className="vb-chapter-title">
                {chap.icon} {unlocked ? chap.title : "Locked Chapter"}
              </h2>
              <p className="vb-chapter-sub">
                {unlocked ? chap.subtitle : "Earn at least 1 star in the previous chapter to unlock."}
              </p>
              <div className="vb-chapter-meta">
                <span>8 Verses</span>
                <span>{unlocked ? "Explore →" : "🔒 Locked"}</span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="vb-total">
        ⭐ {totalEarnedStars} of {maxPossibleStars} total stars collected
      </p>
    </div>
  );
}
