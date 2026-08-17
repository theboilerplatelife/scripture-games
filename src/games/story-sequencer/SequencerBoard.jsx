import { useState, useRef, useLayoutEffect } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { jitter } from "../../utils/random.js";
import { shuffleEvents, evaluateOrder, starsForAttempts, getStoryEventArts } from "./storyData.js";
import { PairIllustration } from "../memory-match/PairIllustration.jsx";

export function SequencerBoard({
  story,
  seed = 0,
  onBackToStories,
  onComplete, // (earnedStars, attempts, solvedEvents)
}) {
  const [events, setEvents] = useState(() => shuffleEvents(story, seed));
  const eventArts = getStoryEventArts(story);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const slotRefs = useRef([]);
  // Last painted position of each card, keyed by its step, for the swap animation
  const prevRects = useRef(new Map());
  const [attempts, setAttempts] = useState(0);
  const [lastCheck, setLastCheck] = useState(null); // { results, correctCount, isComplete, total }
  const [hintActive, setHintActive] = useState(false);
  const lockRef = useRef(false);

  // Two cards trade places — the whole interaction is tapping one card and
  // then the card it should swap with
  function swapEvents(a, b) {
    audio.playCardSnap(b);
    setEvents((prev) => {
      const next = [...prev];
      [next[a], next[b]] = [next[b], next[a]];
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
      // Trade places with the selected card
      swapEvents(selectedIdx, idx);
    }
  }

  // After a swap, slide both cards from where they were to where they now
  // are, so they visibly glide past each other instead of blinking
  useLayoutEffect(() => {
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    slotRefs.current.forEach((el, i) => {
      const key = events[i].step;
      const rect = el.getBoundingClientRect();
      const prev = prevRects.current.get(key);
      const dx = prev ? prev.left - rect.left : 0;
      const dy = prev ? prev.top - rect.top : 0;

      if (!reduceMotion && (dx || dy)) {
        el.style.transition = "none";
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        requestAnimationFrame(() => {
          el.style.transition = "transform 0.22s cubic-bezier(0.2, 0.9, 0.3, 1)";
          el.style.transform = "";
        });
      }
      prevRects.current.set(key, rect);
    });
  }, [events]);

  // Move card up/down via the keyboard and the shift buttons
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
          Put the {events.length} cards in order from <strong>First (1)</strong> to <strong>Last ({events.length})</strong> — tap a card, then tap the one it should trade places with.
        </p>
        {lastCheck && !lastCheck.isComplete && (
          <div className="ss-check-banner">
            ✨ {lastCheck.correctCount} of {lastCheck.total} events in correct order! Keep going!
          </div>
        )}
        {hintActive && (
          <div className="ss-hint-banner">
            💡 Tap the glowing card, then tap the card sitting in its step!
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
              className={`ss-timeline-slot ${isCorrect ? "correct" : ""} ${isIncorrect ? "incorrect" : ""} ${
                isSelected ? "holding" : ""
              }`}
            >
              <div className="ss-slot-badge">
                <span className="ss-slot-num">Step {i + 1}</span>
                {isCorrect && <span className="ss-slot-check" aria-label="Correctly placed">✓</span>}
                {isIncorrect && (
                  <span className="ss-slot-cross" aria-label="Not in the right place yet">✗</span>
                )}
              </div>

              <div
                className={`ss-event-card ${isSelected ? "selected" : ""} ${isHintTarget ? "hint-glow" : ""}`}
                style={{ "--rot": `${jitter(story.id * 10 + ev.step, i, -2, 2)}deg` }}
                onClick={() => handleCardClick(i)}
                role="button"
                tabIndex={0}
                aria-label={`Position ${i + 1}: ${ev.title}. ${ev.text}. ${isCorrect ? "(Correct)" : ""}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(i);
                  } else if (e.key === "ArrowUp" && i > 0) {
                    e.preventDefault();
                    moveCard(i, -1);
                  } else if (e.key === "ArrowDown" && i < events.length - 1) {
                    e.preventDefault();
                    moveCard(i, 1);
                  }
                }}
              >
                <span className="vb-tape vb-tape-top" />
                <span className="ss-card-art" aria-hidden="true">
                  <PairIllustration art={eventArts[ev.step]} />
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
                  <span className="ss-card-action-slot">
                  {i > 0 && (
                    <button
                      className="ss-shift-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveCard(i, -1);
                      }}
                      aria-label={`Move ${ev.title} up`}
                      title="Move card up"
                    >
                      ↑
                    </button>
                  )}
                  </span>
                  <span className="ss-card-status">
                    {isSelected ? "Selected (tap another to swap)" : "Tap to select"}
                  </span>
                  <span className="ss-card-action-slot ss-card-action-end">
                  {i < events.length - 1 && (
                    <button
                      className="ss-shift-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveCard(i, 1);
                      }}
                      aria-label={`Move ${ev.title} down`}
                      title="Move card down"
                    >
                      ↓
                    </button>
                  )}
                  </span>
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
