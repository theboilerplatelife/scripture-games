import { Confetti } from "../../components/common/Confetti.jsx";

export function MMChapterDoneCard({
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
          {isAllGameDone ? "🏆" : chapter.icon}
        </div>

        <h2 style={{ fontSize: "32px", margin: "6px 0 10px", fontFamily: "'Schoolbell', cursive", color: "var(--vermilion)" }}>
          {isAllGameDone
            ? "You Matched All 15 Chapters!"
            : `Chapter ${chapter.id} Matched!`}
        </h2>

        <p className="vb-win-cheer" style={{ fontSize: "18px", padding: "10px 18px", lineHeight: "1.4" }}>
          {isAllGameDone ? (
            <>
              ⭐ <strong>{totalStars} of {maxStars} Memory Stars Collected!</strong>
              <br />
              &ldquo;I will remember the deeds of the LORD.&rdquo; (Psalm 77:11)
            </>
          ) : (
            <>
              You found every pair in <strong>{chapter.title}</strong>!
              <br />
              What a memory — keep it up!
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
