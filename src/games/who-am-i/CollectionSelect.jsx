import { audio } from "../../audio/SoundEngine.js";
import { jitter } from "../../utils/random.js";
import { COLLECTIONS } from "./whoAmIData.js";
import { isStarred, sumStars, groupStars } from "../../utils/stars.js";

/* The front door. Verse Builder opens on chapters, Memory Match on decks,
   Story Sequencer on volumes — this opens on collections, in the same
   card language, so a child arriving from the hub meets the same shape
   whichever game they picked. */
export function CollectionSelect({ collections = COLLECTIONS, stars, onSelectCollection, onBackToHub, onOpenSettings }) {
  const keysOf = (collection) => collection.characterIds.map((id) => `wai-${id}`);

  const isUnlocked = (idx) =>
    idx === 0 || keysOf(collections[idx - 1]).some((key) => isStarred(stars, key));

  const totalEarned = sumStars(stars, { prefix: "wai-" });
  const maxStars = collections.reduce((a, c) => a + c.characterIds.length * 3, 0);

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
          {onOpenSettings && (
            <button
              className="vb-music-toggle"
              onClick={() => {
                audio.playButtonClick();
                onOpenSettings();
              }}
              aria-label="Settings"
              title="Settings (Audio)"
            >
              <span className="vb-tape vb-tape-mini" />
              <span>⚙️ Settings</span>
            </button>
          )}
        </div>
      </div>

      <div className="vb-title-card">
        <span className="vb-tape vb-tape-top" />
        <h1>Who Am I?</h1>
        <p className="vb-sub">Pick a collection, then work out who is speaking from their clues!</p>
      </div>

      <p className="vb-note">
        6 Character Collections &bull; 36 Bible People &bull; Clue by Clue
      </p>

      <div className="vb-chapters-grid">
        {collections.map((collection, idx) => {
          const unlocked = isUnlocked(idx);
          const keys = keysOf(collection);
          const earned = groupStars(stars, keys);
          const max = keys.length * 3;
          const solved = keys.filter((key) => isStarred(stars, key)).length;
          const complete = solved === keys.length;

          return (
            <button
              key={collection.id}
              className={`vb-chapter-card ${unlocked ? "" : "locked"}`}
              style={{
                "--rot": `${jitter(collection.id + 140, 1, -2, 2)}deg`,
                "--chap": collection.color,
                "--chap-tape": `${collection.color}8c`,
              }}
              disabled={!unlocked}
              onClick={() => {
                audio.playButtonClick();
                onSelectCollection(collection.id);
              }}
              aria-label={`Collection ${collection.id}: ${unlocked ? collection.title : "Locked"}`}
            >
              <span className="vb-tape vb-tape-top" />
              <div className="vb-chapter-header">
                <span className="vb-chapter-num">Collection {collection.id}</span>
                <span className="vb-chapter-stars">⭐ {earned}/{max}</span>
              </div>
              <h2 className="vb-chapter-title">
                {collection.icon} {unlocked ? collection.title : "Locked Collection"}
              </h2>
              <p className="vb-chapter-sub">
                {unlocked
                  ? collection.subtitle
                  : "Solve one mystery in the collection before this to unlock."}
              </p>
              <div className="vb-chapter-meta">
                {/* Solved, not stars: a child wants to know who is left to meet */}
                <span>
                  {unlocked && solved > 0
                    ? `${solved} of ${keys.length} met`
                    : `${keys.length} Mystery People`}
                </span>
                <span>
                  {!unlocked ? "🔒 Locked" : complete ? "✅ All Met — Replay →" : "Start Round →"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="vb-total">
        ⭐ {totalEarned} of {maxStars} mystery stars collected
      </p>
    </div>
  );
}
