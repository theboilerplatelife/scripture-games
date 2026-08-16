import { Star } from "../../components/common/Star.jsx";
import { Confetti } from "../../components/common/Confetti.jsx";
import { MODES } from "./matchData.js";

export function MMWinCard({
  deck: deckObj,
  modeIdx,
  earnedStars,
  bestStars = 0,
  isNewBest = false,
  misses,
  isDeckComplete = false,
  returnsToModes = false,
  onReplay,
  onNext,
  onBackToModes,
  onBackToDecks,
}) {
  const mode = MODES[modeIdx];

  return (
    <div className="vb-win-container">
      <Confetti />
      <div className="vb-win-card">
        <span className="vb-tape vb-tape-top" />

        <div className="vb-win-topbar">
          <button
            className="vb-back"
            onClick={onBackToModes}
            aria-label="Back to Match Modes"
            title="Back to Mode Select"
          >
            ←
          </button>
        </div>

        <div className="mm-win-icon" aria-hidden="true">{mode.icon}</div>

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

        <p className="vb-win-verse">All {mode.pairs} pairs found!</p>
        <p className="vb-win-ref">
          {mode.title} — {deckObj.icon} Deck {deckObj.id}: {deckObj.title}
        </p>
        <p className="vb-win-cheer">
          {misses === 0 ? "Perfect memory — not a single miss!" : `You got there with ${misses} ${misses === 1 ? "miss" : "misses"}. Great sticking with it!`}
        </p>

        <div className="vb-win-btns">
          <button className="vb-btn ghost" onClick={onReplay}>
            Match again 🔄
          </button>
          <button className="vb-btn ghost" onClick={onBackToDecks}>
            Deck Select
          </button>
          <button className="vb-btn" onClick={onNext}>
            {isDeckComplete ? "Complete Deck 🎉" : (returnsToModes ? "Back to Modes ←" : "Next match →")}
          </button>
        </div>
      </div>
    </div>
  );
}
