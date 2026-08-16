import { Buddy } from "../../components/common/Buddy.jsx";
import { Star } from "../../components/common/Star.jsx";
import { Confetti } from "../../components/common/Confetti.jsx";

export function WinCard({
  verse,
  earnedStars,
  bestStars = 0,
  isNewBest = false,
  translation,
  hasNextLevel,
  alreadyCompleted = false,
  onReplay,
  onNext,
  onBackToLevels,
  onBackToChapters,
}) {
  const verseText = verse.text[translation] || verse.text.ESV || verse.text.WEB;

  return (
    <div className="vb-win-container">
      <Confetti />
      <div className="vb-win-card">
        <span className="vb-tape vb-tape-top" />
        
        <div className="vb-win-topbar">
          <button
            className="vb-back"
            onClick={onBackToLevels}
            aria-label="Back to Levels"
            title="Back to Verse List"
          >
            ←
          </button>
        </div>

        <div className="vb-win-buddy">
          <Buddy who={verse.character} size={84} />
        </div>

        <div className="vb-win-stars">
          {[1, 2, 3].map((n) => (
            <Star key={n} filled={earnedStars >= n} size={34} />
          ))}
        </div>

        {bestStars > 0 && (
          <p className="vb-win-best">
            {isNewBest ? "🎉 New best!" : `Best: ${"⭐".repeat(bestStars)}`}
          </p>
        )}

        <p className="vb-win-verse">&ldquo;{verseText}&rdquo;</p>
        <p className="vb-win-ref">— {verse.ref} ({translation})</p>
        <p className="vb-win-cheer">{verse.cheer}</p>

        <div className="vb-win-btns">
          <button className="vb-btn ghost" onClick={onReplay}>
            Build again 🔄
          </button>
          {onBackToChapters && (
            <button className="vb-btn ghost" onClick={onBackToChapters}>
              Chapter Select
            </button>
          )}
          <button className="vb-btn" onClick={onNext}>
            {hasNextLevel ? "Next verse →" : alreadyCompleted ? "Verse List ←" : "Complete Chapter 🎉"}
          </button>
        </div>
      </div>
    </div>
  );
}
