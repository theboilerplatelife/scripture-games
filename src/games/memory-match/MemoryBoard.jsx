import { useState, useMemo, useRef } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { jitter } from "../../utils/random.js";
import { MODES, buildDeck, starsForMisses } from "./matchData.js";

// Each found pair gets its own sticker color, cycling in match order
const PAIR_COLORS = ["#d94f30", "#3e7cb1", "#5c8a3a", "#c98a1b", "#7b2cbf"];

// Kid-friendly card-face tags so players know what they're pairing
// (halves mode needs none — both faces are verse pieces)
const KIND_TAGS = {
  hint: { label: "Hint", cls: "hint" },
  ref: { label: "Reference", cls: "ref" },
  verse: { label: "Verse", cls: "verse" },
};

export function MemoryBoard({
  deck: deckObj,
  modeIdx,
  translation,
  seed = 0, // varies the deal per play
  onBackToModes,
  onComplete, // (earnedStars, misses)
}) {
  const mode = MODES[modeIdx];
  const cardDeck = useMemo(
    () => buildDeck(deckObj, modeIdx, translation, seed),
    [deckObj, modeIdx, translation, seed]
  );

  const [flipped, setFlipped] = useState([]); // up to 2 card keys under evaluation
  const [matched, setMatched] = useState(() => new Set()); // pairIds locked in
  const [misses, setMisses] = useState(0);
  const lockRef = useRef(false); // blocks input while a pair is being judged

  function flipCard(card) {
    if (lockRef.current || flipped.includes(card.key) || matched.has(card.pairId)) return;

    audio.playPlaceScrap(flipped.length);
    const next = [...flipped, card.key];
    setFlipped(next);
    if (next.length < 2) return;

    lockRef.current = true;
    const [first, second] = next.map((k) => cardDeck.find((c) => c.key === k));

    if (first.pairId === second.pairId) {
      // Give the flip animation a beat, then lock the pair in
      setTimeout(() => {
        audio.playStarChime(first.pairId % 3);
        const nowMatched = new Set(matched);
        nowMatched.add(first.pairId);
        setMatched(nowMatched);
        setFlipped([]);
        if (nowMatched.size === mode.pairs) {
          // Board complete — brief beat before the win screen
          setTimeout(() => onComplete(starsForMisses(misses, mode.pairs), misses), 600);
        } else {
          lockRef.current = false;
        }
      }, 450);
    } else {
      // Let kids see both cards before they flip back
      setTimeout(() => {
        audio.playWrongAnswer();
        setMisses((m) => m + 1);
        setFlipped([]);
        lockRef.current = false;
      }, 900);
    }
  }

  return (
    <div className="mm-play-container">
      <div className="vb-topbar">
        <div className="vb-topbar-left">
          <button
            className="vb-back"
            onClick={() => {
              audio.playButtonClick();
              onBackToModes();
            }}
            aria-label="Back to Match Modes"
          >
            ←
          </button>
        </div>

        <div className="vb-topbar-center">
          <div className="vb-ref-chip">
            <span className="vb-tape vb-tape-top" />
            <span>{deckObj.icon} {mode.title}</span>
            <span className="vb-ref-trans-badge">({translation})</span>
          </div>
        </div>

        <div className="vb-topbar-right">
          <div className={`vb-mist ${misses === 0 ? "hidden" : ""}`} title="misses">
            {misses > 0 ? `oops ×${misses}` : ""}
          </div>
        </div>
      </div>

      <p className="mm-board-hint">{mode.blurb} — find all {mode.pairs} pairs!</p>

      <div className={`mm-grid mm-grid-${mode.id}`}>
        {cardDeck.map((card, i) => {
          const isMatched = matched.has(card.pairId);
          const isRevealed = isMatched || flipped.includes(card.key);
          // Position of this pair in match order (Set preserves insertion order)
          const matchNum = isMatched ? [...matched].indexOf(card.pairId) + 1 : 0;
          const tag = KIND_TAGS[card.kind];
          const spokenTag = tag ? `${tag.label} — ` : "";
          return (
            <button
              key={card.key}
              className={`mm-card ${isRevealed ? "flipped" : ""} ${isMatched ? "matched" : ""}`}
              style={{ "--rot": `${jitter(deckObj.id * 20 + modeIdx, i, -2.5, 2.5)}deg` }}
              onClick={() => flipCard(card)}
              disabled={isMatched}
              aria-label={
                isMatched
                  ? `Card ${i + 1}: ${spokenTag}${card.text} (matched)`
                  : isRevealed
                    ? `Card ${i + 1}: ${spokenTag}${card.text}`
                    : `Card ${i + 1}: hidden`
              }
            >
              {isMatched && (
                <span
                  className="mm-card-match-badge"
                  style={{ background: PAIR_COLORS[(matchNum - 1) % PAIR_COLORS.length] }}
                  aria-hidden="true"
                >
                  {matchNum}
                </span>
              )}
              <span className="mm-card-inner">
                <span className="mm-card-back" aria-hidden="true">{mode.icon}</span>
                <span className="mm-card-front">
                  {tag && (
                    <span className={`mm-card-tag mm-card-tag-${tag.cls}`} aria-hidden="true">
                      {tag.label}
                    </span>
                  )}
                  <span className="mm-card-text">{card.text}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
