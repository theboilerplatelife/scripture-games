import { useRef } from "react";
import { Portrait } from "../../art/Portrait.jsx";
import { Confetti } from "../../components/common/Confetti.jsx";
import { WinStars, BestLine } from "../../components/common/WinParts.jsx";
import { useFocusOnAppear } from "../../components/common/useFocusOnAppear.js";

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
  const cardRef = useRef(null);
  useFocusOnAppear(cardRef);
  const verseText = verse.text[translation] || verse.text.ESV || verse.text.WEB;

  return (
    <div className="vb-win-container">
      <Confetti />
      <div ref={cardRef} className="vb-win-card">
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
          <Portrait verseRef={verse.ref} size={84} />
        </div>

        <WinStars earned={earnedStars} />
        <BestLine best={bestStars} isNew={isNewBest} />

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
