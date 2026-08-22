import { audio } from "../../audio/SoundEngine.js";
import { CHAPTERS } from "../../data/chapters.js";
import { jitter } from "../../utils/random.js";
import { isStarred, groupStars, sumStars, OTHER_GAME_PREFIXES } from "../../utils/stars.js";
import { CompletionStamp } from "../../components/common/CompletionStamp.jsx";

export function ChapterSelect({
  onSelectChapter,
  onBackToHub,
  onOpenSettings,
  stars, // { "chapId-lvlIdx": number }
  translation,
}) {
  // Chapter unlock logic: Chapter 1 is always unlocked.
  // Subsequent chapters unlocked if previous chapter has >= 1 star or if any level in that chapter is played.
  const chapterKeys = (chap) => chap.verses.map((_, l) => `${chap.id}-${l}`);

  const isChapterUnlocked = (idx) => {
    if (idx === 0) return true;
    // At least 1 star earned anywhere in the previous chapter
    return chapterKeys(CHAPTERS[idx - 1]).some((k) => isStarred(stars, k));
  };

  const getChapterStars = (chap) => groupStars(stars, chapterKeys(chap));

  const totalEarnedStars = sumStars(stars, { excludePrefix: OTHER_GAME_PREFIXES });
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
          const isComplete = chapterKeys(chap).every((k) => isStarred(stars, k));
          const isPerfect = chapStars === maxChapStars;

          return (
            <button
              key={chap.id}
              className={`vb-chapter-card ${unlocked ? "" : "locked"}`}
              style={{ "--rot": `${jitter(chap.id, 1, -2, 2)}deg`, "--chap": chap.color, "--chap-tape": `${chap.color}8c` }}
              disabled={!unlocked}
              onClick={() => {
                audio.playButtonClick();
                onSelectChapter(chap.id);
              }}
            >
              <span className="vb-tape vb-tape-top" />
              <CompletionStamp complete={isComplete} perfect={isPerfect} />
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
                <span>{chap.verses.length} Verses</span>
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
