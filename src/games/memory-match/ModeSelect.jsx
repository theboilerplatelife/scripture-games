import { audio } from "../../audio/SoundEngine.js";
import { Star } from "../../components/common/Star.jsx";
import { jitter } from "../../utils/random.js";
import { MODES } from "./matchData.js";
import { starValue } from "../../utils/stars.js";

export function ModeSelect({
  deck: deckObj,
  stars,
  translation,
  onSelectMode,
  onBackToDecks,
}) {
  const getModeStars = (modeIdx) => starValue(stars, `mm-${deckObj.id}-${modeIdx}`);
  const deckTotal = MODES.reduce((acc, _, m) => acc + getModeStars(m), 0);

  return (
    <div className="vb-levels-container">
      <div className="vb-topbar" style={{ width: "100%", maxWidth: "560px" }}>
        <div className="vb-topbar-left">
          <button
            className="vb-back"
            onClick={() => {
              audio.playButtonClick();
              onBackToDecks();
            }}
            aria-label="Back to Scripture Decks"
            title="Back to Deck Select"
          >
            ←
          </button>
        </div>

        <div className="vb-topbar-center">
          <div className="vb-ref-chip">
            <span className="vb-tape vb-tape-top" />
            {deckObj.icon} Deck {deckObj.id}: {deckObj.title}
          </div>
        </div>

        <div className="vb-topbar-right">
          <div className="vb-stars-pill">
            ⭐ {deckTotal} / {MODES.length * 3}
          </div>
        </div>
      </div>

      <p className="vb-note" style={{ marginTop: "14px" }}>
        {deckObj.subtitle} &bull; <strong>{translation}</strong>
      </p>

      <div className="mm-modes-grid">
        {MODES.map((mode, modeIdx) => {
          const earned = getModeStars(modeIdx);
          return (
            <button
              key={mode.id}
              className="mm-mode-card"
              style={{ "--rot": `${jitter(deckObj.id * 4 + modeIdx, 2, -2, 2)}deg` }}
              onClick={() => {
                audio.playButtonClick();
                onSelectMode(modeIdx);
              }}
              aria-label={`Play ${mode.title}`}
            >
              <span className="vb-tape vb-tape-top" />
              <span className="mm-mode-icon" aria-hidden="true">{mode.icon}</span>
              <span className="mm-mode-title">{mode.title}</span>
              <span className="mm-mode-blurb">{mode.blurb}</span>
              <span className="mm-mode-meta">
                <span className="mm-mode-count">{mode.pairs} pairs</span>
                <span className="mm-mode-stars">
                  {[1, 2, 3].map((n) => (
                    <Star key={n} filled={earned >= n} size={16} />
                  ))}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
