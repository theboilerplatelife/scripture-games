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
  // A judged-wrong pair stays face-up (self-paced reading) until the next flip
  const [isMismatch, setIsMismatch] = useState(false);
  // Board solved: stay on the revealed board until the child moves on
  const [isDone, setIsDone] = useState(false);
  const lockRef = useRef(false); // blocks input while a pair is being judged

  function flipCard(card) {
    if (lockRef.current || matched.has(card.pairId)) return;

    // A lingering wrong pair turns down the moment the next attempt starts —
    // tapping one of its own cards keeps that card up as the new first pick
    if (isMismatch) {
      setIsMismatch(false);
      setFlipped([card.key]);
      audio.playPlaceScrap(0);
      return;
    }

    if (flipped.includes(card.key)) return;

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
          // Board complete — stay revealed so kids can study all the pairs;
          // the banner button advances whenever they're ready
          setIsDone(true);
        } else {
          lockRef.current = false;
        }
      }, 450);
    } else {
      // Mark the pair wrong but leave it face-up: kids read at their own pace
      setTimeout(() => {
        audio.playWrongAnswer();
        setMisses((m) => m + 1);
        setIsMismatch(true);
        lockRef.current = false;
      }, 500);
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

      {!isDone && (
        <p className="mm-board-hint">{mode.blurb} — find all {mode.pairs} pairs!</p>
      )}

      <div className={`mm-grid mm-grid-${mode.id}`}>
        {cardDeck.map((card, i) => {
          const isMatched = matched.has(card.pairId);
          const isRevealed = isMatched || flipped.includes(card.key);
          const isMissed = isMismatch && flipped.includes(card.key);
          // Position of this pair in match order (Set preserves insertion order)
          const matchNum = isMatched ? [...matched].indexOf(card.pairId) + 1 : 0;
          const tag = KIND_TAGS[card.kind];
          const spokenTag = tag ? `${tag.label} — ` : "";
          return (
            <button
              key={card.key}
              className={`mm-card ${isRevealed ? "flipped" : ""} ${isMatched ? "matched" : ""} ${isMissed ? "miss" : ""}`}
              style={{ "--rot": `${jitter(deckObj.id * 20 + modeIdx, i, -2.5, 2.5)}deg` }}
              onClick={() => flipCard(card)}
              disabled={isMatched}
              aria-label={
                isMatched
                  ? `Card ${i + 1}: ${spokenTag}${card.text} (matched)`
                  : isMissed
                    ? `Card ${i + 1}: ${spokenTag}${card.text} (not a match)`
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

      {isDone && (
        <div className="mm-board-done">
          <span className="mm-board-done-text">🎉 All {mode.pairs} pairs found! Take a look…</span>
          <button
            className="vb-btn"
            onClick={() => onComplete(starsForMisses(misses, mode.pairs), misses)}
          >
            See your stars →
          </button>
        </div>
      )}
    </div>
  );
}
