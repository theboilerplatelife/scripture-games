import { Buddy } from "./Buddy.jsx";
import { audio } from "../../audio/SoundEngine.js";
import "./welcome-splash.css";

export function WelcomeSplash({ onStart, translation = "ESV" }) {
  const handleStart = () => {
    audio.playButtonClick();
    onStart();
  };

  return (
    <div className="splash-overlay">
      <div className="splash-card">
        <span className="vb-tape vb-tape-top" />

        <div className="splash-buddy-row">
          <div className="splash-buddy-wrap">
            <Buddy who="david" size={56} />
          </div>
          <div className="splash-buddy-wrap">
            <Buddy who="esther" size={56} />
          </div>
          <div className="splash-buddy-wrap">
            <Buddy who="solomon" size={56} />
          </div>
          <div className="splash-buddy-wrap">
            <Buddy who="ruth" size={56} />
          </div>
        </div>

        <h1 className="splash-title">Bible Games</h1>
        <p className="splash-sub">Fun scripture adventures for curious minds!</p>

        <div className="splash-features">
          <span className="splash-chip">✂️ Verse Builder</span>
          <span className="splash-chip">⭐ 15 Chapters</span>
          <span className="splash-chip">📖 {translation}</span>
        </div>

        <button
          className="splash-start-btn"
          onClick={handleStart}
          aria-label="Tap to Play and Start Game"
        >
          <span>Tap to Play</span>
          <span>🎮</span>
        </button>

        <div className="splash-audio-note">
          <span>🎵</span>
          <span>Tap to enable acoustic music & sound effects</span>
        </div>
      </div>
    </div>
  );
}
