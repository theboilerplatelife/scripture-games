import { useEffect, useRef, useState } from "react";
import {
  getCollection,
  getCollectionCharacters,
  getRandomChoices,
  starsForHintsUsed,
} from "./whoAmIData.js";
import { shuffle } from "../../utils/random.js";
import { audio } from "../../audio/SoundEngine.js";
import { Bust } from "../../art/portrait-kit.jsx";
import { Star } from "../../components/common/Star.jsx";
import { WinStars } from "../../components/common/WinParts.jsx";
import { Confetti } from "../../components/common/Confetti.jsx";
import { CollectionSelect } from "./CollectionSelect.jsx";
import { useScrollToTop } from "../../components/common/useScrollToTop.js";
import { useFocusOnAppear } from "../../components/common/useFocusOnAppear.js";
import { useRouteSync } from "../../components/common/useRouteSync.js";
import { isStarred, sumStars, groupStars } from "../../utils/stars.js";
import "./who-am-i.css";

export function randomRoundSeed() {
  return Math.floor(Math.random() * 100000) + 1;
}

/* One collection's characters, dealt in a different order each time.

   The seed matters: shuffle() drives its swaps through jitter(seed, …),
   so calling it without one makes every index NaN — the deck came back in
   its original order every session and one of the four answer choices
   came back undefined. */
export function buildRound(seed, collectionId) {
  return shuffle(getCollectionCharacters(collectionId), seed);
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
  const [deck, setDeck] = useState(() => buildRound(initialSeed ?? randomRoundSeed(), initialCollectionId));
  const [index, setIndex] = useState(0);
  const [hintsShown, setHintsShown] = useState(1);
  const [solved, setSolved] = useState(false);
  const [wrongId, setWrongId] = useState(null);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [lastEarned, setLastEarned] = useState(0);
  const timers = useRef([]);
  const revealRef = useRef(null);

  /* The collection list and the round earn a URL; the round-over card
     does not, so a refresh puts the player back on the round rather than
     on a celebration they have already had. */
  useRouteSync({
    game: "who-am-i",
    route,
    navigate: onNavigate,
    place: screen === "collections" ? { a: null, b: null } : isRoundOver ? null : { a: collectionId, b: null },
    apply: ({ a }) => {
      if (a === null || !getCollection(a)) {
        setScreen("collections");
        return;
      }
      openCollection(a);
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

  function openCollection(id, { seed: nextSeed = randomRoundSeed() } = {}) {
    setCollectionId(id);
    setSeed(nextSeed);
    setDeck(buildRound(nextSeed, id));
    setIndex(0);
    setHintsShown(1);
    setSolved(false);
    setWrongId(null);
    setIsRoundOver(false);
    setScreen("play");
  }

  if (screen === "collections") {
    return (
      <CollectionSelect
        stars={stars}
        onSelectCollection={(id) => openCollection(id)}
        onBackToHub={onBackToHub}
        onOpenSettings={onOpenSettings}
      />
    );
  }

  const collection = getCollection(collectionId);
  const character = deck[index];
  const choices = getRandomChoices(character.id, 4, seed + index, deck);
  const maxHints = character.hints.length;
  const bestSoFar = stars[`wai-${character.id}`] || 0;
  const alreadySolved = deck.filter((c) => isStarred(stars, `wai-${c.id}`)).length;

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
    if (index + 1 >= deck.length) {
      setIsRoundOver(true);
      audio.playChapterFanfare();
      return;
    }
    setIndex(index + 1);
    setHintsShown(1);
    setSolved(false);
    setWrongId(null);
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

  if (isRoundOver) {
    const collectionKeys = collection.characterIds.map((id) => `wai-${id}`);
    return (
      <div className="wai-screen">
        <Topbar collection={collection} onBack={backToCollections} onOpenSettings={onOpenSettings} />
        <div className="vb-win-container">
          <Confetti />
          <div className="vb-win-card" ref={revealRef}>
            <span className="vb-tape vb-tape-top" />
            <div className="wai-win-icon" aria-hidden="true">{collection.icon}</div>
            <h2 className="wai-win-title">{collection.title} — all met!</h2>
            <p className="vb-win-cheer">
              You worked out every one of the {deck.length} people in this collection.
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
      </div>
    );
  }

  return (
    <div className="wai-screen">
      <Topbar
        collection={collection}
        onBack={backToCollections}
        onOpenSettings={onOpenSettings}
        progress={`${index + 1} / ${deck.length}`}
        solved={alreadySolved}
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
            {index + 1 >= deck.length ? "Finish Collection →" : "Next Mystery →"}
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

function Topbar({ collection, onBack, onOpenSettings, progress, solved }) {
  return (
    <div className="wai-topbar">
      <button className="vb-back" onClick={onBack} aria-label="Back to Collections">
        ←
      </button>

      <div className="vb-title-card wai-title">
        <span aria-hidden="true">{collection.icon}</span> {collection.title}
      </div>

      <div className="wai-topbar-right">
        {progress && <span className="wai-progress">{progress}</span>}
        {solved > 0 && (
          <span className="wai-solved">
            <Star filled={true} size={16} />
            <span className="wai-solved-count">{solved} solved</span>
          </span>
        )}
        {onOpenSettings && (
          <button className="vb-music-toggle" onClick={onOpenSettings} aria-label="Open Game Settings">
            ⚙️
          </button>
        )}
      </div>
    </div>
  );
}
