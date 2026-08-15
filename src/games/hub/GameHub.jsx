import { useEffect } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { CHAPTERS } from "../../data/chapters.js";
import "./hub.css";

export function GameHub({
  onSelectGame,
  onOpenSettings,
  translation,
  allStars,
}) {
  useEffect(() => {
    audio.setTrack("hub");
  }, []);

  const totalPossibleStars = CHAPTERS.length * 8 * 3; // 15 chapters * 8 verses * 3 stars = 360
  const earnedStarsCount = Object.values(allStars).reduce((acc, curr) => acc + (typeof curr === "number" ? curr : 0), 0);

  return (
    <div className="hub-root">
      <div className="hub-topbar">
        <button
          className="vb-music-toggle"
          onClick={() => {
            audio.playButtonClick();
            onOpenSettings();
          }}
          aria-label="Open Game Settings"
          title="Settings (Translation & Audio)"
        >
          <span className="vb-tape vb-tape-mini" />
          <span>⚙️ Settings</span>
        </button>
      </div>

      <div className="hub-hero">
        <span className="vb-tape vb-tape-top" />
        <h1>Bible Games</h1>
        <p className="hub-subtitle">Fun scripture adventures for curious minds!</p>
        <div className="hub-trans-pill">
          <span>📖 Active: <strong>{translation}</strong> translation</span>
        </div>
      </div>

      <div className="hub-stats-bar">
        <div className="hub-stat-chip">
          ⭐ <strong>{earnedStarsCount}</strong> / {totalPossibleStars} Total Stars
        </div>
        <div className="hub-stat-chip">
          📚 <strong>15 Chapters</strong> Available
        </div>
      </div>

      <div className="hub-games-grid">
        {/* Game 1: Verse Builder */}
        <button
          className="hub-game-card"
          onClick={() => {
            audio.playButtonClick();
            onSelectGame("verse-builder");
          }}
          style={{ transform: "rotate(-1deg)" }}
        >
          <span className="vb-tape vb-tape-top" />
          <div className="hub-card-header">
            <span className="hub-game-icon">✂️</span>
            <span className="hub-game-badge">Ready to Play</span>
          </div>
          <h2 className="hub-game-title">Verse Builder</h2>
          <p className="hub-game-desc">
            Piece God&rsquo;s words back together with hand-torn paper scraps, fun characters, and pencil handwriting!
          </p>
          <div className="hub-game-meta">
            <span>15 Chapters • 120 Verses</span>
            <span className="hub-play-btn">Play Now →</span>
          </div>
        </button>

        {/* Game 2: Bible Trivia (Teaser) */}
        <div
          className="hub-game-card disabled"
          style={{ transform: "rotate(1.5deg)" }}
        >
          <span className="vb-tape vb-tape-top" />
          <div className="hub-card-header">
            <span className="hub-game-icon">💡</span>
            <span className="hub-game-badge coming-soon">Coming Soon</span>
          </div>
          <h2 className="hub-game-title">Bible Trivia Quest</h2>
          <p className="hub-game-desc">
            Test your knowledge of Bible heroes, exciting miracles, and timeless wisdom!
          </p>
          <div className="hub-game-meta">
            <span>Multiple Choice & Timed</span>
            <span className="hub-play-btn">In Development</span>
          </div>
        </div>

        {/* Game 3: Memory Match (Teaser) */}
        <div
          className="hub-game-card disabled"
          style={{ transform: "rotate(-0.5deg)" }}
        >
          <span className="vb-tape vb-tape-top" />
          <div className="hub-card-header">
            <span className="hub-game-icon">🎴</span>
            <span className="hub-game-badge coming-soon">Coming Soon</span>
          </div>
          <h2 className="hub-game-title">Scripture Match</h2>
          <p className="hub-game-desc">
            Flip over cards to match Bible characters, books of the Bible, and key verses.
          </p>
          <div className="hub-game-meta">
            <span>Card Memory Game</span>
            <span className="hub-play-btn">In Development</span>
          </div>
        </div>
      </div>
    </div>
  );
}
