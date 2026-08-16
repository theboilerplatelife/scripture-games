import { Confetti } from "./Confetti.jsx";

/* The celebration card shown when a chapter (Verse Builder) or deck
   (Memory Match) is fully completed — content varies, frame doesn't. */
export function CompletionCard({
  icon,
  title,
  cheer,
  nextLabel,
  onNext, // omit on the grand finale
  selectLabel,
  onSelect,
  onBackToHub,
}) {
  return (
    <div className="vb-win-container">
      <Confetti />
      <div className="vb-win-card">
        <span className="vb-tape vb-tape-top" />

        <div style={{ fontSize: "56px", margin: "4px 0" }}>{icon}</div>

        <h2 style={{ fontSize: "32px", margin: "6px 0 10px", fontFamily: "'Schoolbell', cursive", color: "var(--vermilion)" }}>
          {title}
        </h2>

        <p className="vb-win-cheer" style={{ fontSize: "18px", padding: "10px 18px", lineHeight: "1.4" }}>
          {cheer}
        </p>

        <div className="vb-win-btns">
          {onNext && (
            <button className="vb-btn" onClick={onNext}>
              {nextLabel}
            </button>
          )}
          <button className="vb-btn ghost" onClick={onSelect}>
            {selectLabel}
          </button>
          <button className="vb-btn" onClick={onBackToHub}>
            Game Hub 🏠
          </button>
        </div>
      </div>
    </div>
  );
}
