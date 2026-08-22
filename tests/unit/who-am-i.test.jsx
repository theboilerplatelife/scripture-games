import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { WhoAmI, randomRoundSeed } from "../../src/games/who-am-i/WhoAmI.jsx";
import {
  CHARACTERS,
  COLLECTIONS,
  getCollection,
  getCollectionCharacters,
  getRandomChoices,
  starsForHintsUsed,
} from "../../src/games/who-am-i/whoAmIData.js";
import { PEOPLE } from "../../src/art/portrait-kit.jsx";

/* The play tests start on the board; the game itself opens on the
   collection list, which has its own describe block below. */
const props = (over = {}) => ({
  stars: {},
  onSaveStar: vi.fn(),
  onBackToHub: vi.fn(),
  onOpenSettings: vi.fn(),
  initialSeed: 3,
  initialScreen: "play",
  initialCollectionId: 1,
  ...over,
});

/* The character the seeded round opens on, so the tests can name the
   right answer without hard-coding a person. */
const firstOf = (collectionId = 1) => getCollectionCharacters(collectionId)[0];

afterEach(() => {
  vi.useRealTimers();
});

describe("Who Am I? content", () => {
  test("every character has clues, a scripture, and a face to show", () => {
    expect(CHARACTERS.length).toBe(36);
    CHARACTERS.forEach((c) => {
      expect(c.hints.length, `${c.name} has too few clues`).toBeGreaterThanOrEqual(3);
      expect(c.scriptureRef).toBeTruthy();
      expect(c.scriptureText).toBeTruthy();
      expect(PEOPLE[c.id], `${c.name} has no portrait`).toBeTruthy();
    });
  });

  test("no scripture is quoted with a gap in the middle", () => {
    // Article 1.1 forbids omission. A partial verse is quoted as a
    // contiguous span and marked a/b/c, never elided with an ellipsis.
    CHARACTERS.forEach((c) => {
      expect(c.scriptureText, `${c.scriptureRef} elides text`).not.toMatch(/\.\.\.|…/);
    });
  });

  test("stars fall as clues are spent", () => {
    expect(starsForHintsUsed(1)).toBe(3);
    expect(starsForHintsUsed(2)).toBe(2);
    expect(starsForHintsUsed(3)).toBe(1);
    expect(starsForHintsUsed(4)).toBe(1);
  });

  test("every character carries traits, from a fixed vocabulary", () => {
    /* The line-up is built from these. The gender trait is load-bearing:
       getRandomChoices has no give-up branch because every character is a
       man or a woman, so the cast can always fill four places. */
    const VOCABULARY = [
      "man", "woman", "patriarch", "matriarch", "prophet", "priest", "judge",
      "king", "queen", "leader", "soldier", "apostle", "writer", "outsider",
      "exile", "miracle", "mother", "martyr", "sufferer", "fisherman",
    ];
    CHARACTERS.forEach((c) => {
      expect(Array.isArray(c.traits), `${c.name} has no traits`).toBe(true);
      expect(
        c.traits.filter((t) => t === "man" || t === "woman").length,
        `${c.name} must be exactly one of man/woman`
      ).toBe(1);
      c.traits.forEach((t) => {
        expect(VOCABULARY, `${c.name} has an unknown trait "${t}"`).toContain(t);
      });
    });
  });

  test("every wrong answer has something in common with the right one", () => {
    /* Otherwise the clue goes unread: "I was the first woman" beside three
       patriarchs answers itself. A decoy has to be worth considering. */
    COLLECTIONS.forEach((collection) => {
      const pool = getCollectionCharacters(collection.id);
      pool.forEach((c, i) => {
        const choices = getRandomChoices(c.id, 4, i + 1, pool);
        expect(choices.length, `${collection.title} cannot fill a line-up`).toBe(4);
        choices
          .filter((choice) => choice.id !== c.id)
          .forEach((choice) => {
            const shared = choice.traits.filter((t) => c.traits.includes(t));
            expect(
              shared.length,
              `${choice.name} shares nothing with ${c.name} — nothing to weigh up`
            ).toBeGreaterThan(0);
          });
      });
    });
  });

  test("the collection is preferred, and only widened when it cannot fill the line-up", () => {
    // Prophets and Miracles holds seven people who are alike, so it never
    // needs to borrow; In the Beginning has one other woman, so Eve must
    const prophets = getCollectionCharacters(4);
    prophets.forEach((c, i) => {
      getRandomChoices(c.id, 4, i + 1, prophets).forEach((choice) => {
        expect(
          COLLECTIONS[3].characterIds,
          `${choice.name} was borrowed although the prophets could fill the line-up`
        ).toContain(choice.id);
      });
    });

    const genesis = getCollectionCharacters(1);
    const eve = genesis.find((c) => c.id === "eve");
    const forEve = getRandomChoices(eve.id, 4, 5, genesis);
    expect(forEve.every((c) => c.traits.includes("woman"))).toBe(true);
    expect(forEve.some((c) => !COLLECTIONS[0].characterIds.includes(c.id))).toBe(true);
  });

  test("a line-up is four real people, including the right one", () => {
    // The seed is what makes this true: without it every index computes
    // NaN and the last choice comes back undefined
    CHARACTERS.slice(0, 12).forEach((c, i) => {
      const choices = getRandomChoices(c.id, 4, i + 1);
      expect(choices.length).toBe(4);
      expect(choices.every(Boolean), `${c.name}'s line-up has an empty slot`).toBe(true);
      expect(choices.filter((x) => x.id === c.id).length).toBe(1);
      expect(new Set(choices.map((x) => x.id)).size).toBe(4);
    });
  });

  test("a round is one whole collection, in the order it lists them", () => {
    /* Fixed, not shuffled: it is what lets "#/who-am-i/4/3" name the same
       person on every visit. Freshness comes from the line-ups instead. */
    const roster = getCollectionCharacters(4);
    expect(roster.map((c) => c.id)).toEqual(COLLECTIONS[3].characterIds);
    expect(roster.every(Boolean)).toBe(true);
  });

  test("round seeds vary", () => {
    const seeds = new Set(Array.from({ length: 20 }, randomRoundSeed));
    expect(seeds.size).toBeGreaterThan(1);
  });
});

describe("Who Am I? play", () => {
  test("opens on one clue and four faces", () => {
    render(<WhoAmI {...props()} />);
    expect(screen.getByText("Clue 1")).toBeTruthy();
    expect(screen.queryByText("Clue 2")).toBeNull();
    expect(screen.getAllByRole("button", { name: /^Guess / }).length).toBe(4);
  });

  test("asking for another clue shows it, until there are none left", () => {
    render(<WhoAmI {...props()} />);
    const character = firstOf();
    for (let i = 2; i <= character.hints.length; i += 1) {
      fireEvent.click(screen.getByRole("button", { name: /Another clue/ }));
      expect(screen.getByText(`Clue ${i}`)).toBeTruthy();
    }
    expect(screen.queryByRole("button", { name: /Another clue/ })).toBeNull();
    expect(screen.getByText(/every clue/)).toBeTruthy();
  });

  test("a right answer reveals the person, the scripture, and three stars", () => {
    const p = props();
    render(<WhoAmI {...p} />);
    const character = firstOf();

    fireEvent.click(screen.getByRole("button", { name: `Guess ${character.name}` }));

    expect(screen.getByRole("heading", { name: character.name })).toBeTruthy();
    expect(screen.getByText(new RegExp(character.scriptureRef.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))).toBeTruthy();
    expect(screen.getByText(/first clue/)).toBeTruthy();
    expect(p.onSaveStar).toHaveBeenCalledWith(`wai-${character.id}`, 3);
  });

  test("a wrong answer says so out loud, and the message waits to be read", () => {
    /* It used to clear itself after half a second — not long enough for a
       child to read it, and the clue list changed underneath them with no
       explanation left on screen. */
    vi.useFakeTimers();
    const p = props();
    render(<WhoAmI {...p} />);
    const character = firstOf();
    const wrong = screen
      .getAllByRole("button", { name: /^Guess / })
      .find((b) => b.getAttribute("aria-label") !== `Guess ${character.name}`);

    fireEvent.click(wrong);
    // Spoken, not just coloured
    expect(screen.getByRole("status").textContent).toMatch(/^Not .*Here is another clue\./);

    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText("Clue 2")).toBeTruthy();
    expect(
      screen.getByRole("status").textContent,
      "the message left before it could be read"
    ).toMatch(/^Not /);
    expect(p.onSaveStar).not.toHaveBeenCalled();
  });

  test("asking for the next clue clears the last guess's message", () => {
    vi.useFakeTimers();
    render(<WhoAmI {...props()} />);
    const character = firstOf();
    const wrong = screen
      .getAllByRole("button", { name: /^Guess / })
      .find((b) => b.getAttribute("aria-label") !== `Guess ${character.name}`);

    fireEvent.click(wrong);
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole("status").textContent).toMatch(/^Not /);

    fireEvent.click(screen.getByRole("button", { name: /Another clue/ }));
    expect(screen.getByRole("status").textContent).toBe("");
  });

  test("a wrong answer on the last clue does not promise a clue that never comes", () => {
    // The message said "Here is another clue" whether or not one followed
    vi.useFakeTimers();
    render(<WhoAmI {...props()} />);
    const character = firstOf();
    for (let i = 1; i < character.hints.length; i += 1) {
      fireEvent.click(screen.getByRole("button", { name: /Another clue/ }));
    }
    const wrong = screen
      .getAllByRole("button", { name: /^Guess / })
      .find((b) => b.getAttribute("aria-label") !== `Guess ${character.name}`);

    fireEvent.click(wrong);
    const said = screen.getByRole("status").textContent;
    expect(said).toMatch(/^Not /);
    expect(said, "promised a clue with none left to give").not.toMatch(/another clue/);
    expect(said).toMatch(/last clue/);
  });

  test("a face already guessed stays marked for the rest of the mystery", () => {
    vi.useFakeTimers();
    const { container } = render(<WhoAmI {...props()} />);
    const character = firstOf();
    const wrong = screen
      .getAllByRole("button", { name: /^Guess / })
      .find((b) => b.getAttribute("aria-label") !== `Guess ${character.name}`);

    fireEvent.click(wrong);
    expect(wrong.className).toContain("wrong"); // shaking
    act(() => vi.advanceTimersByTime(2000));
    expect(wrong.className, "the shake outlived its welcome").not.toContain("wrong");
    expect(wrong.className, "nothing shows this face was already tried").toContain("tried");
    expect(wrong.getAttribute("aria-label")).toMatch(/already tried/);

    // …and the marks go with the mystery
    fireEvent.click(screen.getByRole("button", { name: `Guess ${character.name}` }));
    fireEvent.click(screen.getByRole("button", { name: /Next Mystery/ }));
    expect(container.querySelectorAll(".wai-choice.tried").length).toBe(0);
  });

  test("stars drop by one for each clue spent", () => {
    const p = props();
    render(<WhoAmI {...p} />);
    const character = firstOf();
    fireEvent.click(screen.getByRole("button", { name: /Another clue/ }));
    fireEvent.click(screen.getByRole("button", { name: `Guess ${character.name}` }));
    expect(p.onSaveStar).toHaveBeenCalledWith(`wai-${character.id}`, 2);
    expect(screen.getByText(/Solved after 2 clues/)).toBeTruthy();
  });

  test("a worse run never overwrites a better one", () => {
    const character = firstOf();
    const p = props({ stars: { [`wai-${character.id}`]: 3 } });
    render(<WhoAmI {...p} />);
    fireEvent.click(screen.getByRole("button", { name: /Another clue/ }));
    fireEvent.click(screen.getByRole("button", { name: `Guess ${character.name}` }));
    expect(p.onSaveStar).not.toHaveBeenCalled();
  });

  test("the header shows where you are and what the clues have cost", () => {
    // The same three slots every other board has: back, a taped chip
    // naming the place, and the running cost on the right
    const { container } = render(<WhoAmI {...props()} />);
    expect(container.querySelector(".vb-topbar")).toBeTruthy();
    expect(screen.getByText(`(1 of ${getCollectionCharacters(1).length})`)).toBeTruthy();
    expect(container.querySelector(".vb-mist").className).toContain("hidden");

    fireEvent.click(screen.getByRole("button", { name: /Another clue/ }));
    expect(screen.getByText("clues ×1")).toBeTruthy();
    expect(container.querySelector(".vb-mist").className).not.toContain("hidden");
  });

  test("plays without anywhere to save", () => {
    render(<WhoAmI {...props({ onSaveStar: undefined })} />);
    const character = firstOf();
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: `Guess ${character.name}` }))
    ).not.toThrow();
  });

  test("the line-up disappears the moment the answer is known", () => {
    // What stops a second guess landing: there is no button to press. If a
    // refactor ever leaves the choices mounted, this is where it shows up.
    const p = props();
    const { container } = render(<WhoAmI {...p} />);
    const character = firstOf();
    const button = screen.getByRole("button", { name: `Guess ${character.name}` });

    fireEvent.click(button);
    expect(p.onSaveStar).toHaveBeenCalledTimes(1);
    // The line-up is gone; the reveal is showing
    expect(container.querySelectorAll(".wai-choice").length).toBe(0);

    expect(screen.queryAllByRole("button", { name: /^Guess / }).length).toBe(0);
  });

  test("works through the whole collection to the finish card, then replays it", () => {
    render(<WhoAmI {...props()} />);
    const round = getCollectionCharacters(1);

    round.forEach((character, i) => {
      fireEvent.click(screen.getByRole("button", { name: `Guess ${character.name}` }));
      fireEvent.click(
        screen.getByRole("button", {
          name: i === round.length - 1 ? /Finish Collection/ : /Next Mystery/,
        })
      );
    });

    expect(screen.getByRole("heading", { name: /In the Beginning — all met/ })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Play These Again/ }));
    expect(screen.getByText("Clue 1")).toBeTruthy();
  });

  test("the finish card leads back to the collections", () => {
    render(<WhoAmI {...props()} />);
    getCollectionCharacters(1).forEach((character, i, all) => {
      fireEvent.click(screen.getByRole("button", { name: `Guess ${character.name}` }));
      fireEvent.click(
        screen.getByRole("button", {
          name: i === all.length - 1 ? /Finish Collection/ : /Next Mystery/,
        })
      );
    });

    fireEvent.click(screen.getByRole("button", { name: /Another Collection/ }));
    expect(screen.getByRole("heading", { name: "Who Am I?" })).toBeTruthy();
  });

  test("the back control walks out the way the other games do", () => {
    const p = props();
    render(<WhoAmI {...p} />);

    /* No settings on a board: like Verse Builder, Memory Match and Story
       Sequencer, the gear lives on the list screen. */
    expect(screen.queryByLabelText(/Settings/)).toBeNull();

    // Back from a round goes to the collections, the way every other
    // game's board returns to its list — not straight out to the hub
    fireEvent.click(screen.getByLabelText("Back to Collections"));
    expect(p.onBackToHub).not.toHaveBeenCalled();
    expect(screen.getByRole("heading", { name: "Who Am I?" })).toBeTruthy();

    fireEvent.click(screen.getByLabelText("Back to Game Hub"));
    expect(p.onBackToHub).toHaveBeenCalled();
  });

  test("drops its pending timers when the player leaves", () => {
    vi.useFakeTimers();
    const p = props();
    const { unmount } = render(<WhoAmI {...p} />);
    const character = firstOf();
    const wrong = screen
      .getAllByRole("button", { name: /^Guess / })
      .find((b) => b.getAttribute("aria-label") !== `Guess ${character.name}`);

    fireEvent.click(wrong);
    unmount();
    // A timer left running here would set state on a component that is gone
    expect(() => act(() => vi.advanceTimersByTime(2000))).not.toThrow();
  });

  test("starts somewhere random when the app does not pick a seed", () => {
    render(<WhoAmI {...props({ initialSeed: undefined })} />);
    expect(screen.getAllByRole("button", { name: /^Guess / }).length).toBe(4);
  });
});

describe("Who Am I? collections", () => {
  test("every character belongs to exactly one collection", () => {
    const ids = COLLECTIONS.flatMap((c) => c.characterIds);
    expect(ids.length).toBe(CHARACTERS.length);
    expect(new Set(ids).size).toBe(CHARACTERS.length);
    ids.forEach((id) => {
      expect(CHARACTERS.some((c) => c.id === id), `${id} is in no collection`).toBe(true);
    });
  });

  test("every collection has a title, a blurb, and enough people for a round", () => {
    COLLECTIONS.forEach((c) => {
      expect(c.title).toBeTruthy();
      expect(c.subtitle).toBeTruthy();
      expect(c.icon).toBeTruthy();
      // Four faces are shown per question, so a round needs at least four
      expect(c.characterIds.length).toBeGreaterThanOrEqual(4);
    });
  });

  test("an unknown collection has no people rather than throwing", () => {
    expect(getCollection(99)).toBeUndefined();
    expect(getCollectionCharacters(99)).toEqual([]);
    expect(getCollectionCharacters(1).length).toBe(COLLECTIONS[0].characterIds.length);
  });

  test("the game opens on the collections, not on a question", () => {
    render(<WhoAmI {...props({ initialScreen: undefined })} />);
    expect(screen.getByRole("heading", { name: "Who Am I?" })).toBeTruthy();
    expect(screen.queryByText("Clue 1")).toBeNull();
    expect(screen.getAllByRole("button", { name: /^Collection \d/ }).length).toBe(COLLECTIONS.length);
  });

  test("only the first collection is open until a mystery is solved", () => {
    const { unmount } = render(<WhoAmI {...props({ initialScreen: undefined })} />);
    expect(screen.getByRole("button", { name: "Collection 1: In the Beginning" }).disabled).toBe(false);
    expect(screen.getByRole("button", { name: "Collection 2: Locked" }).disabled).toBe(true);
    unmount();

    // One star anywhere in collection 1 opens collection 2
    render(<WhoAmI {...props({ initialScreen: undefined, stars: { "wai-noah": 2 } })} />);
    expect(screen.getByRole("button", { name: "Collection 2: Out of Egypt" }).disabled).toBe(false);
    expect(screen.getByRole("button", { name: "Collection 3: Locked" }).disabled).toBe(true);
  });

  test("a corrupt star value neither unlocks nor counts", () => {
    render(<WhoAmI {...props({ initialScreen: undefined, stars: { "wai-noah": "three" } })} />);
    expect(screen.getByRole("button", { name: "Collection 2: Locked" }).disabled).toBe(true);
    expect(screen.getByText(/⭐ 0 of 108 mystery stars collected/)).toBeTruthy();
  });

  test("a finished collection is stamped the way every other card is", () => {
    /* Verse Builder and Memory Match mark a finished card with the shared
       rubber stamp — "✓ Complete", or "★ Perfect!" for every star — and
       leave the call to action alone. This card used to say "✅ All Met —
       Replay →" in the action slot, a third vocabulary that also lost the
       difference between meeting everyone and knowing them all at once. */
    const first = COLLECTIONS[0];
    const partial = { [`wai-${first.characterIds[0]}`]: 3, [`wai-${first.characterIds[1]}`]: 1 };
    const { unmount } = render(<WhoAmI {...props({ initialScreen: undefined, stars: partial })} />);
    expect(screen.queryByText(/Complete|Perfect/)).toBeNull();
    expect(screen.getAllByText("Start a round →").length).toBeGreaterThan(0);
    unmount();

    // Every one met, but not from the first clue
    const met = Object.fromEntries(first.characterIds.map((id) => [`wai-${id}`, 1]));
    const complete = render(<WhoAmI {...props({ initialScreen: undefined, stars: met })} />);
    expect(screen.getByText("✓ Complete")).toBeTruthy();
    expect(screen.getAllByText("Start a round →").length).toBeGreaterThan(0);
    complete.unmount();

    const all = Object.fromEntries(first.characterIds.map((id) => [`wai-${id}`, 3]));
    render(<WhoAmI {...props({ initialScreen: undefined, stars: all })} />);
    expect(screen.getByText("★ Perfect!")).toBeTruthy();
  });

  test("picking a collection starts a round of exactly those people", () => {
    render(<WhoAmI {...props({ initialScreen: undefined, stars: { "wai-noah": 3 } })} />);
    fireEvent.click(screen.getByRole("button", { name: "Collection 2: Out of Egypt" }));

    expect(screen.getByText("Clue 1")).toBeTruthy();
    expect(screen.getByText(`(1 of ${COLLECTIONS[1].characterIds.length})`)).toBeTruthy();
    expect(screen.getByText(/Out of Egypt/)).toBeTruthy();
  });

  test("the hub settings control is hidden when the app offers none", () => {
    render(<WhoAmI {...props({ initialScreen: undefined, onOpenSettings: undefined })} />);
    expect(screen.queryByLabelText("Settings")).toBeNull();
  });
});

describe("Who Am I? deep links", () => {
  const routed = (route) => {
    const navigate = vi.fn();
    render(<WhoAmI {...props({ initialScreen: undefined, route, onNavigate: navigate })} />);
    return navigate;
  };

  test("a collection in the address bar opens that round at its first mystery", () => {
    routed({ game: "who-am-i", a: 3, b: null });
    expect(screen.getByText(/Judges and Kings/)).toBeTruthy();
    expect(screen.getByText("Clue 1")).toBeTruthy();
    expect(screen.getByText(`(1 of ${COLLECTIONS[2].characterIds.length})`)).toBeTruthy();
  });

  test("a mystery number opens that same person every time", () => {
    /* The whole reason the round is dealt in a fixed order: "#/who-am-i/3/4"
       has to be the person it was yesterday, or the link is a lie. */
    const fourth = getCollectionCharacters(3)[3];
    routed({ game: "who-am-i", a: 3, b: 4 });
    expect(screen.getByText(`(4 of ${COLLECTIONS[2].characterIds.length})`)).toBeTruthy();
    expect(screen.getByText(fourth.hints[0])).toBeTruthy();
  });

  test("a mystery number past the end of the collection starts at the first", () => {
    routed({ game: "who-am-i", a: 3, b: 99 });
    expect(screen.getByText(`(1 of ${COLLECTIONS[2].characterIds.length})`)).toBeTruthy();
    expect(screen.getByText(getCollectionCharacters(3)[0].hints[0])).toBeTruthy();
  });

  test("no collection in the address bar shows the list", () => {
    routed({ game: "who-am-i", a: null, b: null });
    expect(screen.getByRole("heading", { name: "Who Am I?" })).toBeTruthy();
  });

  test("a hand-typed collection that does not exist falls back to the list", () => {
    routed({ game: "who-am-i", a: 42, b: null });
    expect(screen.getByRole("heading", { name: "Who Am I?" })).toBeTruthy();
  });

  test("choosing a collection, and moving through it, is announced", () => {
    const navigate = routed({ game: "who-am-i", a: null, b: null });
    fireEvent.click(screen.getByRole("button", { name: "Collection 1: In the Beginning" }));
    expect(navigate).toHaveBeenCalledWith({ game: "who-am-i", a: 1, b: 1 });

    // Each mystery gets its own entry, so Back steps through them
    const first = getCollectionCharacters(1)[0];
    fireEvent.click(screen.getByRole("button", { name: `Guess ${first.name}` }));
    fireEvent.click(screen.getByRole("button", { name: /Next Mystery/ }));
    expect(navigate).toHaveBeenCalledWith({ game: "who-am-i", a: 1, b: 2 });
  });

  test("another game's route is left alone", () => {
    const navigate = routed({ game: "verse-builder", a: 2, b: 1 });
    expect(screen.getByRole("heading", { name: "Who Am I?" })).toBeTruthy();
    expect(navigate).not.toHaveBeenCalled();
  });
});
