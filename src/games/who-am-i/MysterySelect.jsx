import { audio } from "../../audio/SoundEngine.js";
import { Bust, P } from "../../art/portrait-kit.jsx";
import { Star } from "../../components/common/Star.jsx";
import { jitter } from "../../utils/random.js";
import { starValue, groupStars } from "../../utils/stars.js";
import { getCollection, getCollectionCharacters } from "./whoAmIData.js";

/* A face nobody has worked out yet: the same head and shoulders as a real
   portrait, in flat paper, so an unsolved card sits in the row without
   giving anything away. Drawn rather than an emoji, per Article 4.6. */
function HiddenBust() {
  return (
    <svg width="48" height="48" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M18 100 Q18 70 50 70 Q82 70 82 100 Z" fill={P.linenDeep} />
      <circle cx="50" cy="44" r="24" fill={P.linen} />
      <text
        x="50"
        y="56"
        textAnchor="middle"
        fontSize="30"
        fontFamily="Schoolbell, cursive"
        fill={P.ink}
      >
        ?
      </text>
    </svg>
  );
}

/* The people in one collection: who has been met, at how many stars, and
   who is still a mystery — the same album Verse Builder gives a chapter,
   which this game went without. Nothing here is locked; the name is the
   puzzle, so making a child work through them in order would add friction
   without adding any mystery. */
export function MysterySelect({ collectionId, stars, onSelectMystery, onBackToCollections }) {
  const collection = getCollection(collectionId);
  const roster = getCollectionCharacters(collectionId);
  const keys = roster.map((c) => `wai-${c.id}`);
  const earned = groupStars(stars, keys);
  const met = keys.filter((k) => starValue(stars, k) > 0).length;

  return (
    <div className="vb-levels-container">
      <div className="vb-topbar" style={{ width: "100%", maxWidth: "560px" }}>
        <div className="vb-topbar-left">
          <button
            className="vb-back"
            onClick={() => {
              audio.playButtonClick();
              onBackToCollections();
            }}
            aria-label="Back to Collections"
            title="Back to Collection Select"
          >
            ←
          </button>
        </div>

        <div className="vb-topbar-center">
          <div className="vb-ref-chip">
            <span className="vb-tape vb-tape-top" />
            {collection.icon} {collection.title}
          </div>
        </div>

        <div className="vb-topbar-right">
          <div className="vb-stars-pill">
            ⭐ {earned} / {keys.length * 3}
          </div>
        </div>
      </div>

      <p className="vb-note" style={{ marginTop: "14px" }}>
        {collection.subtitle} &bull; <strong>{met} of {roster.length} met</strong>
      </p>

      <div className="vb-levels-grid" style={{ maxWidth: "560px" }}>
        {roster.map((person, i) => {
          const solved = starValue(stars, `wai-${person.id}`) > 0;

          return (
            <button
              key={person.id}
              className="vb-level-card"
              style={{ "--rot": `${jitter(collectionId * 10 + i, 3, -3, 3)}deg` }}
              onClick={() => {
                audio.playButtonClick();
                onSelectMystery(i);
              }}
              /* Solved people are named; the rest must not be, in the
                 label any more than on the card — a screen reader would
                 otherwise read out every answer in the collection */
              aria-label={
                solved
                  ? `Mystery ${i + 1}: ${person.name}, solved`
                  : `Mystery ${i + 1}: not yet solved`
              }
            >
              <span className="vb-tape vb-tape-top" />
              <span className="vb-level-num">{i + 1}</span>
              <span>
                {solved ? (
                  <svg width="48" height="48" viewBox="0 0 100 100" aria-hidden="true">
                    <Bust person={person.id} />
                  </svg>
                ) : (
                  <HiddenBust />
                )}
              </span>
              <span className="vb-level-ref">{solved ? person.name : "? ? ?"}</span>
              <span className="vb-level-stars">
                {[1, 2, 3].map((n) => (
                  <Star key={n} filled={starValue(stars, `wai-${person.id}`) >= n} size={16} />
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
