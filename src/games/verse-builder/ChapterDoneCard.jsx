import { Confetti } from "../../components/common/Confetti.jsx";

export function ChapterDoneCard({
  chapter,
  isAllGameDone,
  totalStars,
  maxStars,
  onNextChapter,
  onBackToChapters,
  onBackToHub,
}) {
  return (
    <div className="vb-win-container">
      <Confetti />
      <div className="vb-win-card">
        <span className="vb-tape vb-tape-top" />
        
        <div style={{ fontSize: "56px", margin: "4px 0" }}>
          {isAllGameDone ? "👑" : chapter.icon}
        </div>

        <h2 className="vb-done-title" style={{ fontSize: "32px", margin: "6px 0 10px" }}>
          {isAllGameDone
            ? "You Built All 15 Chapters!"
            : `Chapter ${chapter.id} Complete!`}
        </h2>

        <p className="vb-win-cheer" style={{ fontSize: "18px", padding: "10px 18px", lineHeight: "1.4" }}>
          {isAllGameDone ? (
            <>
              ⭐ <strong>{totalStars} of {maxStars} Stars Collected!</strong>
              <br />
              &ldquo;I have hidden your word in my heart that I might not sin against you.&rdquo; (Psalm 119:11)
            </>
          ) : (
            <>
              Fantastic job completing <strong>{chapter.title}</strong>!
              <br />
              Keep hiding God&rsquo;s word in your heart!
            </>
          )}
        </p>

        <div className="vb-win-btns">
          {!isAllGameDone && onNextChapter && (
            <button className="vb-btn" onClick={onNextChapter}>
              Next Chapter →
            </button>
          )}
          <button className="vb-btn ghost" onClick={onBackToChapters}>
            Chapter Select
          </button>
          <button className="vb-btn" onClick={onBackToHub}>
            Game Hub 🏠
          </button>
        </div>
      </div>
    </div>
  );
}
