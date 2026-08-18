import { useEffect } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { PairIllustration } from "../memory-match/PairIllustration.jsx";
import { getStoryEventArts } from "./storyData.js";
import { useScrollLock } from "../../components/common/useScrollLock.js";

export function StoryReaderModal({ story, onClose }) {
  const eventArts = getStoryEventArts(story);
  useScrollLock();
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- pointer-only backdrop dismiss; keyboard users have Escape and the Done button
    <div className="ss-modal-overlay" onClick={onClose}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- stops backdrop dismissal when clicking inside the dialog */}
      <div
        className="ss-reader-card"
        role="dialog"
        aria-modal="true"
        aria-label="Storybook Reader"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="vb-tape vb-tape-top" />
        <div className="ss-reader-header">
          <div className="ss-reader-title-group">
            <span className="ss-reader-icon">{story.icon}</span>
            <div>
              <h2 className="ss-reader-title">{story.title}</h2>
              <p className="ss-reader-scripture">{story.scripture}</p>
            </div>
          </div>
          <button
            className="ss-close-btn"
            onClick={() => {
              audio.playButtonClick();
              onClose();
            }}
            aria-label="Close story reader"
          >
            ✕
          </button>
        </div>

        <div className="ss-reader-body">
          {story.events.map((ev) => (
            <div key={ev.step} className="ss-reader-step">
              <div className="ss-reader-step-badge">
                <span>Step {ev.step}</span>
              </div>
              <div className="ss-reader-step-content">
                {/* Banner above the words, never behind them */}
                <span className="ss-reader-step-art" aria-hidden="true">
                  <PairIllustration scene={`${story.id}-${ev.step}`} art={eventArts[ev.step]} />
                </span>
                <div className="ss-reader-text-wrapper">
                  <h3 className="ss-reader-step-title">{ev.title}</h3>
                  <p className="ss-reader-step-text">{ev.text}</p>
                  <span className="ss-reader-step-ref">{ev.ref}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="ss-reader-footer">
          <button
            className="vb-btn"
            onClick={() => {
              audio.playButtonClick();
              onClose();
            }}
          >
            Done Reading ✨
          </button>
        </div>
      </div>
    </div>
  );
}
