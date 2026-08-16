import { audio } from "../../audio/SoundEngine.js";
import { jitter } from "../../utils/random.js";
import { DECKS, MODES } from "./matchData.js";
import { isStarred, groupStars, sumStars } from "../../utils/stars.js";
import { CompletionStamp } from "../../components/common/CompletionStamp.jsx";

export function MMChapterSelect({
  onSelectChapter, // or onSelectDeck
  onBackToHub,
  onOpenSettings,
  stars, // shared stars object; Memory Match keys are "mm-{deckId}-{modeIdx}"
  translation,
}) {
  const deckKeys = (deckId) => MODES.map((_, m) => `mm-${deckId}-${m}`);
  const getDeckStars = (deckId) => groupStars(stars, deckKeys(deckId));

  const isDeckUnlocked = (idx) => {
    if (idx === 0) return true;
    return getDeckStars(DECKS[idx - 1].id) > 0;
  };

  const totalEarned = sumStars(stars, { prefix: "mm-" });
  const maxStars = DECKS.length * MODES.length * 3; // 72

  return (
    <div className="vb-chapters-container">
      <div className="vb-header-row">
        <button
          className="vb-back"
          onClick={() => {
            audio.playButtonClick();
            onBackToHub();
          }}
          aria-label="Back to Game Hub"
          title="Back to Game Selection Hub"
        >
          ←
        </button>

        <div className="vb-header-actions">
          <button
            className="vb-music-toggle"
            onClick={() => {
              audio.playButtonClick();
              onOpenSettings();
            }}
            aria-label="Settings"
            title="Settings (Translation & Audio)"
          >
            <span className="vb-tape vb-tape-mini" />
            <span>⚙️ Settings</span>
          </button>
        </div>
      </div>

      <div className="vb-title-card">
        <span className="vb-tape vb-tape-top" />
        <h1>Memory Match</h1>
        <p className="vb-sub">Pick a scripture deck and flip cards to find pairs!</p>
      </div>

      <p className="vb-note">
        8 Scripture Decks &bull; 3 match modes each &bull; Verses in <strong>{translation}</strong>
      </p>

      <div className="vb-chapters-grid">
        {DECKS.map((deckObj, idx) => {
          const unlocked = isDeckUnlocked(idx);
          const deckStars = getDeckStars(deckObj.id);
          const isComplete = deckKeys(deckObj.id).every((k) => isStarred(stars, k));
          const isPerfect = deckStars === MODES.length * 3;

          return (
            <button
              key={deckObj.id}
              className={`vb-chapter-card ${unlocked ? "" : "locked"}`}
              style={{
                "--rot": `${jitter(deckObj.id + 50, 1, -2, 2)}deg`,
                "--chap": deckObj.color,
                "--chap-tape": `${deckObj.color}8c`,
              }}
              disabled={!unlocked}
              onClick={() => {
                audio.playButtonClick();
                onSelectChapter(deckObj.id);
              }}
              aria-label={`Memory Match Deck ${deckObj.id}: ${unlocked ? deckObj.title : "Locked"}${isComplete ? " (completed)" : ""}`}
            >
              <span className="vb-tape vb-tape-top" />
              <CompletionStamp complete={isComplete} perfect={isPerfect} />
              <div className="vb-chapter-header">
                <span className="vb-chapter-num">Deck {deckObj.id}</span>
                <span className="vb-chapter-stars">⭐ {deckStars}/{MODES.length * 3}</span>
              </div>
              <h2 className="vb-chapter-title">
                {deckObj.icon} {unlocked ? deckObj.title : "Locked Deck"}
              </h2>
              <p className="vb-chapter-sub">
                {unlocked ? deckObj.subtitle : "Earn at least 1 star in the previous deck to unlock."}
              </p>
              <div className="vb-chapter-meta">
                <span>3 Match Modes</span>
                <span>{unlocked ? "Play →" : "🔒 Locked"}</span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="vb-total">
        ⭐ {totalEarned} of {maxStars} memory stars collected
      </p>
    </div>
  );
}
