import { useState, useMemo, useRef } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { Portrait } from "../../art/Portrait.jsx";
import { Pencil } from "../../components/common/Pencil.jsx";
import { jitter, tornEdge, shuffle } from "../../utils/random.js";

export function PlayBoard({
  verse,
  levelIndex,
  chapterId,
  translation,
  onBackToLevels,
  onCompleteVerse,
}) {
  const verseText = verse.text[translation] || verse.text.ESV || verse.text.WEB;
  const words = useMemo(() => verseText.trim().split(/\s+/), [verseText]);
  const tiles = useMemo(() => words.map((w, i) => ({ id: i, word: w })), [words]);

  const seed = 1;
  const [slots, setSlots] = useState(() => Array(words.length).fill(null));
  const [mistakes, setMistakes] = useState(0);
  const [shakeIds, setShakeIds] = useState([]);
  const [justPlaced, setJustPlaced] = useState(null);
  const checkingRef = useRef(false);

  // Generate scrambled pile
  const pileOrder = useMemo(() => {
    let order = shuffle(tiles.map((t) => t.id), seed * 7 + (chapterId * 8 + levelIndex) * 13 + 3);
    // Never hand children the pre-solved sequence by accident
    if (order.length > 1 && order.every((id, i) => tiles[id].word === words[i])) {
      order = [...order].reverse();
    }
    return order;
  }, [tiles, words, seed, chapterId, levelIndex]);

  const placed = new Set(slots.filter((s) => s !== null));
  const pile = pileOrder.filter((id) => !placed.has(id));

  function placeTile(id) {
    const idx = slots.indexOf(null);

    const next = [...slots];
    next[idx] = id;
    setSlots(next);
    setJustPlaced(id);

    // Auto-clear pencil after stroke completes (~950ms)
    setTimeout(() => {
      setJustPlaced((prev) => (prev === id ? null : prev));
    }, 950);

    audio.playPlaceScrap(idx);

    if (!next.includes(null)) {
      checkAnswer(next);
    }
  }

  function removeTile(slotIdx) {
    if (slots[slotIdx] === null) return;

    const next = [...slots];
    next[slotIdx] = null;
    setSlots(next);
    audio.playRemoveScrap();
  }

  function handleClearAll() {
    setSlots(Array(words.length).fill(null));
    setShakeIds([]);
    audio.playRemoveScrap();
  }

  function checkAnswer(filled) {
    checkingRef.current = true;
    const wrong = [];
    filled.forEach((id, i) => {
      if (tiles[id].word !== words[i]) wrong.push(id);
    });

    if (wrong.length === 0) {
      const earned = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
      // Allow full handwriting animation to finish before victory transition
      setTimeout(() => {
        onCompleteVerse(earned);
        checkingRef.current = false;
      }, 950);
    } else {
      audio.playWrongAnswer();
      setShakeIds(wrong);
      setMistakes((m) => m + 1);

      // Extended 1.6s oops feedback: clear ONLY the wrong words, keeping correct words in place
      setTimeout(() => {
        setSlots((cur) => cur.map((id) => (wrong.includes(id) ? null : id)));
        setShakeIds([]);
        checkingRef.current = false;
      }, 1600);
    }
  }

  return (
    <div className="vb-play-container">
      {/* Balanced 3-part topbar */}
      <div className="vb-topbar">
        <div className="vb-topbar-left">
          <button
            className="vb-back"
            onClick={() => {
              audio.playButtonClick();
              onBackToLevels();
            }}
            aria-label="Back to Levels"
          >
            ←
          </button>
        </div>

        <div className="vb-topbar-center">
          <div className="vb-ref-chip">
            <span className="vb-tape vb-tape-top" />
            <span>{verse.ref}</span>
            <span className="vb-ref-trans-badge">({translation})</span>
          </div>
        </div>

        <div className="vb-topbar-right">
          <div className={`vb-mist ${mistakes === 0 ? "hidden" : ""}`} title="tries">
            {mistakes > 0 ? `oops ×${mistakes}` : ""}
          </div>
        </div>
      </div>

      {/* The writer, and what they say about the verse */}
      <div className="vb-buddy-row">
        <Portrait verseRef={verse.ref} size={64} />
        <div className="vb-bubble">{verse.hint}</div>
      </div>

      {/* Notebook lined strip */}
      <div className="vb-strip">
        {slots.map((id, i) => {
          const tile = id !== null ? tiles[id] : null;
          return (
            <button
              key={i}
              className={`vb-slot ${
                id !== null && shakeIds.includes(id) ? "shake" : ""
              } ${justPlaced === id ? "pop" : ""}`}
              onClick={() => removeTile(i)}
              aria-label={tile ? `Remove word ${tile.word}` : `Empty slot ${i + 1}`}
            >
              {tile ? (
                <span className="vb-placed-wrap">
                  <span
                    className={`vb-scrap placed ${justPlaced === id ? "writing" : ""}`}
                    style={{
                      clipPath: tornEdge(id + (chapterId * 8 + levelIndex) * 40 + 1),
                      transform: `rotate(${jitter(5, id, -2, 2)}deg)`,
                    }}
                  >
                    <span className={`vb-word-text ${justPlaced === id ? "writing" : ""}`}>
                      {tile.word}
                    </span>
                  </span>
                  {justPlaced === id && (
                    <span className="vb-pencil-writer" aria-hidden="true">
                      <Pencil size={38} />
                    </span>
                  )}
                </span>
              ) : (
                <span className="vb-dash" />
              )}
            </button>
          );
        })}
      </div>

      {/* Word scraps pile header with Clear button */}
      <div className="vb-pile-header">
        <span className="vb-pile-label">✂️ word scraps — tap in order to place</span>
        <button
          className="vb-clear-btn"
          onClick={handleClearAll}
          disabled={placed.size === 0}
          aria-label="Clear all placed words"
          title="Return all placed words back to the pile"
        >
          🔄 Clear
        </button>
      </div>

      <div className="vb-pile">
        {pile.map((id) => {
          const tile = tiles[id];
          return (
            <button
              key={id}
              className="vb-scrap-btn"
              onClick={() => placeTile(id)}
              aria-label={`Place word ${tile.word}`}
            >
              <span
                className="vb-scrap"
                style={{
                  clipPath: tornEdge(id + (chapterId * 8 + levelIndex) * 40 + 1),
                  transform: `rotate(${jitter(4, id, -6, 6)}deg)`,
                }}
              >
                <span className="vb-tape vb-tape-mini" />
                {tile.word}
              </span>
            </button>
          );
        })}
        {pile.length === 0 && <span className="vb-pile-empty">checking answer…</span>}
      </div>
    </div>
  );
}
