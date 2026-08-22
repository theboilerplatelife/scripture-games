import { useEffect, useRef, useState } from "react";
import {
  getCollection,
  getCollectionCharacters,
  getRandomChoices,
  starsForHintsUsed,
} from "./whoAmIData.js";
import { audio } from "../../audio/SoundEngine.js";
import { Bust } from "../../art/portrait-kit.jsx";
import { WinStars } from "../../components/common/WinParts.jsx";
import { Confetti } from "../../components/common/Confetti.jsx";
import { CollectionSelect } from "./CollectionSelect.jsx";
import { useScrollToTop } from "../../components/common/useScrollToTop.js";
import { useFocusOnAppear } from "../../components/common/useFocusOnAppear.js";
import { useRouteSync } from "../../components/common/useRouteSync.js";
import { sumStars, groupStars } from "../../utils/stars.js";
import "./who-am-i.css";

/* The seed picks the three wrong faces in each line-up, so a collection
   played again puts the same people up against different neighbours. */
export function randomRoundSeed() {
  return Math.floor(Math.random() * 100000) + 1;
}

export function WhoAmI({
  stars = {},
  onSaveStar,
  onBackToHub,
  onOpenSettings,
  route,
  onNavigate,
  initialSeed,
  initialScreen = "collections",
  initialCollectionId = 1,
}) {
  const [screen, setScreen] = useState(initialScreen); // "collections" | "play"
  const [collectionId, setCollectionId] = useState(initialCollectionId);
  const [seed, setSeed] = useState(() => initialSeed ?? randomRoundSeed());
  const [index, setIndex] = useState(0);
  const [hintsShown, setHintsShown] = useState(1);
  const [solved, setSolved] = useState(false);
  const [wrongId, setWrongId] = useState(null);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [lastEarned, setLastEarned] = useState(0);
  const timers = useRef([]);
  const revealRef = useRef(null);

  /* Move to a mystery. The seed is left alone: this runs when the address
     bar moves, and a Back into the mystery before should not deal that
     person a different line-up than the one they just left. */
  function goTo(id, i) {
    setCollectionId(id);
    setIndex(i);
    setHintsShown(1);
    setSolved(false);
    setWrongId(null);
    setIsRoundOver(false);
    setScreen("play");
  }

  // Starting a round is the one move that reshuffles the line-ups
  function openCollection(id) {
    setSeed(randomRoundSeed());
    goTo(id, 0);
  }

  /* The collection list and each mystery earn a URL — "#/who-am-i/1/4" is
     the fourth person in the first collection, and stays that person, so a
     refresh mid-round comes back to where it left off. The round-over card
     does not, so a refresh returns to the round rather than to a
     celebration the player has already had. */
  useRouteSync({
    game: "who-am-i",
    route,
    navigate: onNavigate,
    place:
      screen === "collections"
        ? { a: null, b: null }
        : isRoundOver
          ? null
          : { a: collectionId, b: index + 1 },
    apply: ({ a, b }) => {
      if (a === null || !getCollection(a)) {
        setScreen("collections");
        return;
      }
      // A hand-typed mystery number outside the collection starts at its first
      const count = getCollectionCharacters(a).length;
      goTo(a, Number.isInteger(b) && b >= 1 && b <= count ? b - 1 : 0);
    },
  });

  useEffect(() => {
    audio.setTrack("memory");
  }, []);

  useScrollToTop(`${screen}-${collectionId}-${index}-${solved}-${isRoundOver}`);
  useFocusOnAppear(revealRef);

  /* A wrong guess schedules the next clue. Without this, leaving the game
     mid-timer sets state on a component that is already gone. */
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function later(fn, ms) {
    timers.current.push(setTimeout(fn, ms));
  }

  if (screen === "collections") {
    return (
      <CollectionSelect
        stars={stars}
        onSelectCollection={openCollection}
        onBackToHub={onBackToHub}
        onOpenSettings={onOpenSettings}
      />
    );
  }

  const collection = getCollection(collectionId);
  /* The roster is the collection in the order it lists its people, not a
     shuffle: it is what makes the number in the address bar name the same
     person on every visit. */
  const roster = getCollectionCharacters(collectionId);
  const character = roster[index];
  const choices = getRandomChoices(character.id, 4, seed + index, roster);
  const maxHints = character.hints.length;
  const bestSoFar = stars[`wai-${character.id}`] || 0;

  function backToCollections() {
    audio.playButtonClick();
    setScreen("collections");
    setIsRoundOver(false);
  }

  function replayRound() {
    audio.playButtonClick();
    openCollection(collectionId);
  }

  function revealNextHint() {
    audio.playButtonClick();
    setHintsShown((shown) => Math.min(shown + 1, maxHints));
  }

  function handleNext() {
    audio.playButtonClick();
    if (index + 1 >= roster.length) {
      setIsRoundOver(true);
      audio.playChapterFanfare();
      return;
    }
    goTo(collectionId, index + 1);
  }

  /* No "already solved" guard: the reveal replaces the line-up in the same
     commit, so there is no button left to press. A guard here would be a
     branch no player could ever reach. */
  function handleGuess(choiceId) {
    if (choiceId === character.id) {
      const earned = starsForHintsUsed(hintsShown);
      setSolved(true);
      setWrongId(null);
      setLastEarned(earned);
      audio.playStarChime(earned - 1);
      if (onSaveStar && earned > bestSoFar) onSaveStar(`wai-${character.id}`, earned);
      return;
    }

    audio.playWrongAnswer();
    setWrongId(choiceId);
    // A wrong guess costs a clue, which is what keeps the stars honest
    if (hintsShown < maxHints) {
      later(() => {
        setHintsShown((shown) => Math.min(shown + 1, maxHints));
        setWrongId(null);
      }, 500);
    } else {
      later(() => setWrongId(null), 800);
    }
  }

  /* The card at the end of a round stands on its own, like every other
     game's win card — no topbar over a celebration, and no play container
     around it. Nesting it inside .wai-screen left it sitting against that
     column's left edge: .vb-win-container is a 500px box that the page
     root centres, so anything narrower wrapped around it pulls the
     celebration off-centre. */
  if (isRoundOver) {
    const collectionKeys = collection.characterIds.map((id) => `wai-${id}`);
    return (
      <div className="vb-win-container">
        <Confetti />
        <div className="vb-win-card" ref={revealRef}>
          <span className="vb-tape vb-tape-top" />
          <div className="wai-win-icon" aria-hidden="true">{collection.icon}</div>
          <h2 className="wai-win-title">{collection.title} — all met!</h2>
          <p className="vb-win-cheer">
            You worked out every one of the {roster.length} people in this collection.
          </p>
          <p className="wai-win-count">
            ⭐ {groupStars(stars, collectionKeys)} of {collectionKeys.length * 3} stars here ·{" "}
            {sumStars(stars, { prefix: "wai-" })} in all
          </p>
          <div className="vb-win-btns">
            <button className="vb-btn" onClick={backToCollections}>
              Another Collection →
            </button>
            <button className="vb-btn ghost" onClick={replayRound}>
              Play These Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wai-screen">
      <Topbar
        collection={collection}
        position={index + 1}
        total={roster.length}
        cluesSpent={hintsShown - 1}
        onBack={backToCollections}
      />

      {solved ? (
        <div className="wai-reveal" ref={revealRef}>
          <span className="vb-tape vb-tape-top" />
          <div className="wai-reveal-portrait">
            <svg width="120" height="120" viewBox="0 0 100 100" aria-hidden="true">
              <g className="art-breathe">
                <Bust person={character.id} />
              </g>
            </svg>
          </div>

          <h2 className="wai-reveal-name">{character.name}</h2>
          <WinStars earned={lastEarned} />
          <p className="wai-reveal-earned">
            {lastEarned === 3
              ? "Knew it from the very first clue!"
              : `Solved after ${hintsShown} clues.`}
          </p>

          <blockquote className="wai-scripture">
            <p className="wai-scripture-text">&ldquo;{character.scriptureText}&rdquo;</p>
            <footer className="wai-scripture-ref">
              — {character.scriptureRef} <span className="wai-translation">(ESV)</span>
            </footer>
          </blockquote>

          <button className="vb-btn" onClick={handleNext}>
            {index + 1 >= roster.length ? "Finish Collection →" : "Next Mystery →"}
          </button>
        </div>
      ) : (
        <div className="wai-board">
          <p className="wai-lead">Read the clues, then choose who is speaking.</p>

          <ol className="wai-clues">
            {character.hints.slice(0, hintsShown).map((hint, i) => (
              <li key={hint} className="wai-clue">
                <span className="wai-clue-num">Clue {i + 1}</span>
                {hint}
              </li>
            ))}
          </ol>

          {hintsShown < maxHints ? (
            <button className="vb-btn ghost wai-more" onClick={revealNextHint}>
              Another clue ({hintsShown} of {maxHints})
            </button>
          ) : (
            <p className="wai-more-none">That&rsquo;s every clue — take your best guess!</p>
          )}

          <div className="wai-choices">
            {choices.map((choice) => (
              <button
                key={choice.id}
                className={`wai-choice ${wrongId === choice.id ? "wrong" : ""}`}
                onClick={() => handleGuess(choice.id)}
                aria-label={`Guess ${choice.name}`}
              >
                <svg width="52" height="52" viewBox="0 0 100 100" aria-hidden="true">
                  <Bust person={choice.id} />
                </svg>
                <span className="wai-choice-name">{choice.name}</span>
              </button>
            ))}
          </div>

          {/* Spoken feedback: a colour change tells a screen reader nothing,
              and the clue that follows a wrong guess arrives unannounced */}
          <p className="wai-feedback" role="status" aria-live="polite">
            {wrongId ? `Not ${choices.find((c) => c.id === wrongId)?.name}. Here is another clue.` : ""}
          </p>
        </div>
      )}
    </div>
  );
}

/* The same three-slot board header the other games use: back on the left,
   a taped chip naming where you are in the middle, and what is costing you
   stars on the right — clues here, "oops" there. */
function Topbar({ collection, position, total, cluesSpent, onBack }) {
  return (
    <div className="vb-topbar">
      <div className="vb-topbar-left">
        <button className="vb-back" onClick={onBack} aria-label="Back to Collections">
          ←
        </button>
      </div>

      <div className="vb-topbar-center">
        <div className="vb-ref-chip">
          <span className="vb-tape vb-tape-top" />
          <span>{collection.icon} {collection.title}</span>
          <span className="vb-ref-trans-badge">({position} of {total})</span>
        </div>
      </div>

      <div className="vb-topbar-right">
        <div className={`vb-mist ${cluesSpent === 0 ? "hidden" : ""}`} title="clues used">
          {cluesSpent > 0 ? `clues ×${cluesSpent}` : ""}
        </div>
      </div>
    </div>
  );
}
