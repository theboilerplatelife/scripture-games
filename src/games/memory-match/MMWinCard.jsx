import { Star } from "../../components/common/Star.jsx";
import { Confetti } from "../../components/common/Confetti.jsx";
import { MODES } from "./matchData.js";

export function MMWinCard({
  deck: deckObj,
  modeIdx,
  earnedStars,
  misses,
  isDeckComplete = false,
  hasNextMode = false,
  onReplay,
  onNext,
  onBackToModes,
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
          <button className="vb-btn" onClick={onNext}>
            {isDeckComplete ? "Complete Deck 🎉" : (hasNextMode ? "Next match →" : "Deck Modes ←")}
          </button>
        </div>
      </div>
    </div>
  );
}
