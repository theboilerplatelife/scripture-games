import { useEffect } from "react";
import { audio } from "../../audio/SoundEngine.js";
import { CHAPTERS } from "../../data/chapters.js";
import { DECKS, MODES } from "../memory-match/matchData.js";
import { GameIcon } from "./GameIcon.jsx";
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

  // Per-game star pools share one storage object; Memory Match keys are "mm-" prefixed
  const vbMaxStars = CHAPTERS.length * 8 * 3; // 360
  const mmMaxStars = DECKS.length * MODES.length * 3; // 72
  const sumStars = (entries) => entries.reduce((acc, [, v]) => acc + (typeof v === "number" ? v : 0), 0);
  const starEntries = Object.entries(allStars);
  const vbStars = sumStars(starEntries.filter(([k]) => !k.startsWith("mm-")));
  const mmStars = sumStars(starEntries.filter(([k]) => k.startsWith("mm-")));

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
        <h1>Scripture Games</h1>
        <p className="hub-subtitle">Fun scripture adventures for curious minds!</p>
        <div className="hub-trans-pill">
          <span>📖 Active: <strong>{translation}</strong> translation</span>
        </div>
      </div>

      <div className="hub-stats-bar">
        <div className="hub-stat-chip">
          ✂️ <strong>2 games ready</strong> · 4 on the way
        </div>
        <div className="hub-stat-chip">
          ⭐ <strong>{vbStars + mmStars}</strong> / {vbMaxStars + mmMaxStars} Total Stars Earned
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
          style={{ "--rot": "-1deg" }}
        >
          <span className="vb-tape vb-tape-top" />
          <div className="hub-card-header">
            <span className="hub-game-icon"><GameIcon kind="scissors" /></span>
            <span className="hub-game-badge">Ready to Play</span>
          </div>
          <h2 className="hub-game-title">Verse Builder</h2>
          <div className="hub-card-pills">
            <span className="hub-pill highlight">⭐ {vbStars} / {vbMaxStars} Stars</span>
            <span className="hub-pill">📚 15 Chapters</span>
            <span className="hub-pill">🧩 Word Puzzle</span>
          </div>
          <p className="hub-game-desc">
            Piece God&rsquo;s words back together with hand-torn paper scraps, character buddies, and pencil handwriting!
          </p>
          <div className="hub-game-meta">
            <span>120 Verses Across 4 Translations</span>
            <span className="hub-play-btn">Play Now →</span>
          </div>
        </button>

        {/* Game 2: Memory Match */}
        <button
          className="hub-game-card"
          onClick={() => {
            audio.playButtonClick();
            onSelectGame("memory-match");
          }}
          style={{ "--rot": "-1.4deg" }}
        >
          <span className="vb-tape vb-tape-top" />
          <div className="hub-card-header">
            <span className="hub-game-icon"><GameIcon kind="cards" /></span>
            <span className="hub-game-badge">Ready to Play</span>
          </div>
          <h2 className="hub-game-title">Memory Match</h2>
          <div className="hub-card-pills">
            <span className="hub-pill highlight">⭐ {mmStars} / {mmMaxStars} Stars</span>
            <span className="hub-pill">🧠 Card Pairs</span>
            <span className="hub-pill">🎴 8 Themed Decks</span>
          </div>
          <p className="hub-game-desc">
            Flip kraft-paper cards to match hint clues, scripture references, and torn verse halves!
          </p>
          <div className="hub-game-meta">
            <span>24 Boards Across 3 Match Modes</span>
            <span className="hub-play-btn">Play Now →</span>
          </div>
        </button>

        {/* Game 3: Who Am I? */}
        <div
          className="hub-game-card disabled"
          style={{ "--rot": "1.2deg" }}
        >
          <span className="vb-tape vb-tape-top" />
          <div className="hub-card-header">
            <span className="hub-game-icon"><GameIcon kind="magnifier" /></span>
            <span className="hub-game-badge coming-soon">Coming Soon</span>
          </div>
          <h2 className="hub-game-title">Who Am I?</h2>
          <div className="hub-card-pills">
            <span className="hub-pill">🔍 Clue Deduction</span>
            <span className="hub-pill">👑 Bible Heroes</span>
          </div>
          <p className="hub-game-desc">
            Solve progressive scripture clues one at a time to uncover Bible heroes and unlock their full story!
          </p>
          <div className="hub-game-meta">
            <span>Character Mysteries</span>
            <span className="hub-dev-note">In Development</span>
          </div>
        </div>

        {/* Game 4: Story Sequencer */}
        <div
          className="hub-game-card disabled"
          style={{ "--rot": "-0.8deg" }}
        >
          <span className="vb-tape vb-tape-top" />
          <div className="hub-card-header">
            <span className="hub-game-icon"><GameIcon kind="scroll" /></span>
            <span className="hub-game-badge coming-soon">Coming Soon</span>
          </div>
          <h2 className="hub-game-title">Story Sequencer</h2>
          <div className="hub-card-pills">
            <span className="hub-pill">⏳ Timelines</span>
            <span className="hub-pill">📖 Scripture Stories</span>
          </div>
          <p className="hub-game-desc">
            Arrange narrative event cards into chronological order and check them against the biblical account.
          </p>
          <div className="hub-game-meta">
            <span>Chronological Order</span>
            <span className="hub-dev-note">In Development</span>
          </div>
        </div>

        {/* Game 5: Sword Drill */}
        <div
          className="hub-game-card disabled"
          style={{ "--rot": "0.9deg" }}
        >
          <span className="vb-tape vb-tape-top" />
          <div className="hub-card-header">
            <span className="hub-game-icon"><GameIcon kind="bible" /></span>
            <span className="hub-game-badge coming-soon">Coming Soon</span>
          </div>
          <h2 className="hub-game-title">Sword Drill</h2>
          <div className="hub-card-pills">
            <span className="hub-pill">⚡ Speed Race</span>
            <span className="hub-pill">🎯 Books & Verses</span>
          </div>
          <p className="hub-game-desc">
            A digital version of the classic race to navigate Testaments, books, chapters, and verses!
          </p>
          <div className="hub-game-meta">
            <span>Scripture Navigation</span>
            <span className="hub-dev-note">In Development</span>
          </div>
        </div>

        {/* Game 6: Journey Maps */}
        <div
          className="hub-game-card disabled"
          style={{ "--rot": "1.5deg" }}
        >
          <span className="vb-tape vb-tape-top" />
          <div className="hub-card-header">
            <span className="hub-game-icon"><GameIcon kind="map" /></span>
            <span className="hub-game-badge coming-soon">Coming Soon</span>
          </div>
          <h2 className="hub-game-title">Journey Maps</h2>
          <div className="hub-card-pills">
            <span className="hub-pill">🧭 Interactive Maps</span>
            <span className="hub-pill">⛵ Biblical Travels</span>
          </div>
          <p className="hub-game-desc">
            Trace biblical journeys like the Exodus and Paul&rsquo;s travels across tactile vintage maps and journals!
          </p>
          <div className="hub-game-meta">
            <span>Biblical Geography</span>
            <span className="hub-dev-note">In Development</span>
          </div>
        </div>
      </div>
    </div>
  );
}
