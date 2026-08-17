import { useState, useRef } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { jitter } from "../../utils/random.js";
import { shuffleEvents, evaluateOrder, starsForAttempts, slotIndexAtPoint } from "./storyData.js";
import { PairIllustration } from "../memory-match/PairIllustration.jsx";

export function SequencerBoard({
  story,
  seed = 0,
  onBackToStories,
  onComplete, // (earnedStars, attempts, solvedEvents)
}) {
  const [events, setEvents] = useState(() => shuffleEvents(story, seed));
  const [selectedIdx, setSelectedIdx] = useState(null);
  // Pointer-based drag: HTML5 drag events never fire on touch devices, and
  // this game is mostly played on tablets
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const slotRefs = useRef([]);
  const dragMovedRef = useRef(false);
  const [attempts, setAttempts] = useState(0);
  const [lastCheck, setLastCheck] = useState(null); // { results, correctCount, isComplete, total }
  const [hintActive, setHintActive] = useState(false);
  const lockRef = useRef(false);

  // Swap two cards in the timeline
  function swapEvents(idxA, idxB) {
    audio.playCardSnap(idxB);
    setEvents((prev) => {
      const next = [...prev];
      const temp = next[idxA];
      next[idxA] = next[idxB];
      next[idxB] = temp;
      return next;
    });
    setLastCheck(null);
    setHintActive(false);
    setSelectedIdx(null);
  }

  // Handle card click (tap-to-select / tap-to-swap)
  function handleCardClick(idx) {
    if (lockRef.current) return;
    if (selectedIdx === null) {
      audio.playPlaceScrap(idx);
      setSelectedIdx(idx);
    } else if (selectedIdx === idx) {
      // Deselect
      audio.playButtonClick();
      setSelectedIdx(null);
    } else {
      // Swap selected card with this card
      swapEvents(selectedIdx, idx);
    }
  }

  function slotRects() {
    return slotRefs.current.map((el) => el.getBoundingClientRect());
  }

  function handlePointerDown(i, e) {
    if (lockRef.current) return;
    dragMovedRef.current = false;
    setDragIdx(i);
    if (e.currentTarget.setPointerCapture) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  }

  function handlePointerMove(e) {
    if (dragIdx === null) return;
    dragMovedRef.current = true;
    setDragOverIdx(slotIndexAtPoint(slotRects(), e.clientX, e.clientY));
  }

  function handlePointerUp(i) {
    if (dragIdx === null) return;
    const target = dragOverIdx;
    // A drag that never moved is a tap — fall through to select/place
    if (dragMovedRef.current && target !== null && target !== dragIdx) {
      swapEvents(dragIdx, target);
      setSelectedIdx(null);
    } else if (!dragMovedRef.current) {
      handleCardClick(i);
    }
    setDragIdx(null);
    setDragOverIdx(null);
  }

  // Move card left/right via keyboard accessibility buttons
  function moveCard(idx, direction) {
    swapEvents(idx, idx + direction);
  }

  // Check current timeline sequence
  function handleCheckOrder() {
    if (lockRef.current) return;
    const check = evaluateOrder(events);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setLastCheck(check);

    if (check.isComplete) {
      lockRef.current = true;
      audio.playChapterFanfare();
      setTimeout(() => {
        const earnedStars = starsForAttempts(newAttempts);
        onComplete(earnedStars, newAttempts, events);
      }, 750);
    } else {
      audio.playWrongAnswer();
    }
  }

  // Activate helpful hint (highlights earliest misplaced card)
  function handleShowHint() {
    audio.playButtonClick();
    setHintActive(true);
  }

  return (
    <div className="ss-play-container">
      {/* Topbar */}
      <div className="vb-topbar">
        <div className="vb-topbar-left">
          <button
            className="vb-back"
            onClick={() => {
              audio.playButtonClick();
              onBackToStories();
            }}
            aria-label="Back to Stories"
          >
            ←
          </button>
        </div>

        <div className="vb-topbar-center">
          <div className="vb-ref-chip">
            <span className="vb-tape vb-tape-top" />
            <span>{story.icon} {story.title}</span>
            <span className="vb-ref-trans-badge">({story.scripture})</span>
          </div>
        </div>

        <div className="vb-topbar-right">
          <button
            className="ss-hint-btn"
            onClick={handleShowHint}
            aria-label="Get a hint"
            title="Hint: Show which card goes where"
          >
            💡 Hint
          </button>
        </div>
      </div>

      <div className="ss-timeline-header">
        <p className="ss-instruction">
          Arrange the {events.length} event cards from <strong>First (1)</strong> to <strong>Last ({events.length})</strong>:
        </p>
        {lastCheck && !lastCheck.isComplete && (
          <div className="ss-check-banner">
            ✨ {lastCheck.correctCount} of {lastCheck.total} events in correct order! Keep going!
          </div>
        )}
        {hintActive && (
          <div className="ss-hint-banner">
            💡 Tap the glowing card and place it into its matching step slot!
          </div>
        )}
      </div>

      {/* Interactive Timeline Track */}
      <div className="ss-timeline-track" role="region" aria-label="Story Timeline">
        {events.map((ev, i) => {
          const isSelected = selectedIdx === i;
          const isCorrect = lastCheck?.results[i] === true;
          const isIncorrect = lastCheck && !lastCheck.results[i];
          const isHintTarget = hintActive && ev.step !== i + 1;

          return (
            <div
              key={ev.step}
              ref={(el) => {
                slotRefs.current[i] = el;
              }}
              className={`ss-timeline-slot ${isCorrect ? "correct" : ""} ${isIncorrect ? "incorrect" : ""}`}
            >
              <div className="ss-slot-badge">
                <span className="ss-slot-num">Step {i + 1}</span>
                {isCorrect && <span className="ss-slot-check" aria-label="Correctly placed">✓</span>}
              </div>

              <div
                className={`ss-event-card ${isSelected ? "selected" : ""} ${isHintTarget ? "hint-glow" : ""} ${
                  dragIdx === i ? "dragging" : ""
                } ${dragIdx !== null && dragOverIdx === i && dragOverIdx !== dragIdx ? "drop-target" : ""}`}
                style={{ "--rot": `${jitter(story.id * 10 + ev.step, i, -2, 2)}deg` }}
                onPointerDown={(e) => handlePointerDown(i, e)}
                onPointerMove={handlePointerMove}
                onPointerUp={() => handlePointerUp(i)}
                onPointerCancel={() => {
                  setDragIdx(null);
                  setDragOverIdx(null);
                }}
                role="button"
                tabIndex={0}
                aria-label={`Position ${i + 1}: ${ev.title}. ${ev.text}. ${isCorrect ? "(Correct)" : ""}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(i);
                  } else if (e.key === "ArrowLeft" && i > 0) {
                    e.preventDefault();
                    moveCard(i, -1);
                  } else if (e.key === "ArrowRight" && i < events.length - 1) {
                    e.preventDefault();
                    moveCard(i, 1);
                  }
                }}
              >
                <span className="vb-tape vb-tape-top" />
                <span className="ss-card-art" aria-hidden="true">
                  <PairIllustration art={story.art} />
                </span>
                <div className="ss-card-content">
                  {/* No verse reference here — chapter/verse numbers would
                      hand children the answer instead of the story doing it.
                      Refs appear in the story reader after the win. */}
                  <h3 className="ss-card-title">{ev.title}</h3>
                  <p className="ss-card-text">{ev.text}</p>
                </div>

                {/* Keyboard Reordering Controls for Screen Readers and Touch Accessibility */}
                <div className="ss-card-actions">
                  {i > 0 && (
                    <button
                      className="ss-shift-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveCard(i, -1);
                      }}
                      aria-label={`Move ${ev.title} left`}
                      title="Move card left"
                    >
                      ←
                    </button>
                  )}
                  <span className="ss-card-status">
                    {isSelected ? "Selected (tap another to swap)" : "Tap to select"}
                  </span>
                  {i < events.length - 1 && (
                    <button
                      className="ss-shift-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveCard(i, 1);
                      }}
                      aria-label={`Move ${ev.title} right`}
                      title="Move card right"
                    >
                      →
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Check Order Button */}
      <div className="ss-board-footer">
        <button
          className="vb-btn ss-check-btn"
          onClick={handleCheckOrder}
          aria-label="Check timeline order"
        >
          Check Order ✨
        </button>
      </div>
    </div>
  );
}
