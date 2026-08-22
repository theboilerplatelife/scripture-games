import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { WhoAmI, buildRound, randomRoundSeed } from "../../src/games/who-am-i/WhoAmI.jsx";
import {
  CHARACTERS,
  getRandomChoices,
  starsForHintsUsed,
} from "../../src/games/who-am-i/whoAmIData.js";
import { PEOPLE } from "../../src/art/portrait-kit.jsx";

const props = (over = {}) => ({
  stars: {},
  onSaveStar: vi.fn(),
  onBackToHub: vi.fn(),
  onOpenSettings: vi.fn(),
  initialSeed: 3,
  ...over,
});

/* The character the seeded round opens on, so the tests can name the
   right answer without hard-coding a person. */
const firstOf = (seed) => buildRound(seed)[0];

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

  test("a round is ten different people, and a different ten per seed", () => {
    const a = buildRound(11);
    const b = buildRound(12);
    expect(a.length).toBe(10);
    expect(a.every(Boolean)).toBe(true);
    expect(new Set(a.map((c) => c.id)).size).toBe(10);
    expect(a.map((c) => c.id)).not.toEqual(b.map((c) => c.id));
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
    const character = firstOf(3);
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
    const character = firstOf(3);

    fireEvent.click(screen.getByRole("button", { name: `Guess ${character.name}` }));

    expect(screen.getByRole("heading", { name: character.name })).toBeTruthy();
    expect(screen.getByText(new RegExp(character.scriptureRef.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))).toBeTruthy();
    expect(screen.getByText(/first clue/)).toBeTruthy();
    expect(p.onSaveStar).toHaveBeenCalledWith(`wai-${character.id}`, 3);
  });

  test("a wrong answer says so out loud and hands over another clue", () => {
    vi.useFakeTimers();
    const p = props();
    render(<WhoAmI {...p} />);
    const character = firstOf(3);
    const wrong = screen
      .getAllByRole("button", { name: /^Guess / })
      .find((b) => b.getAttribute("aria-label") !== `Guess ${character.name}`);

    fireEvent.click(wrong);
    // Spoken, not just coloured
    expect(screen.getByRole("status").textContent).toMatch(/^Not /);

    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByText("Clue 2")).toBeTruthy();
    expect(screen.getByRole("status").textContent).toBe("");
    expect(p.onSaveStar).not.toHaveBeenCalled();
  });

  test("a wrong answer on the last clue just clears itself", () => {
    vi.useFakeTimers();
    render(<WhoAmI {...props()} />);
    const character = firstOf(3);
    for (let i = 1; i < character.hints.length; i += 1) {
      fireEvent.click(screen.getByRole("button", { name: /Another clue/ }));
    }
    const wrong = screen
      .getAllByRole("button", { name: /^Guess / })
      .find((b) => b.getAttribute("aria-label") !== `Guess ${character.name}`);

    fireEvent.click(wrong);
    expect(screen.getByRole("status").textContent).toMatch(/^Not /);
    act(() => vi.advanceTimersByTime(800));
    expect(screen.getByRole("status").textContent).toBe("");
  });

  test("stars drop by one for each clue spent", () => {
    const p = props();
    render(<WhoAmI {...p} />);
    const character = firstOf(3);
    fireEvent.click(screen.getByRole("button", { name: /Another clue/ }));
    fireEvent.click(screen.getByRole("button", { name: `Guess ${character.name}` }));
    expect(p.onSaveStar).toHaveBeenCalledWith(`wai-${character.id}`, 2);
    expect(screen.getByText(/Solved after 2 clues/)).toBeTruthy();
  });

  test("a worse run never overwrites a better one", () => {
    const character = firstOf(3);
    const p = props({ stars: { [`wai-${character.id}`]: 3 } });
    render(<WhoAmI {...p} />);
    fireEvent.click(screen.getByRole("button", { name: /Another clue/ }));
    fireEvent.click(screen.getByRole("button", { name: `Guess ${character.name}` }));
    expect(p.onSaveStar).not.toHaveBeenCalled();
  });

  test("counts how many of this round are already solved", () => {
    const round = buildRound(3);
    const p = props({ stars: { [`wai-${round[1].id}`]: 2, [`wai-${round[2].id}`]: 1 } });
    render(<WhoAmI {...p} />);
    expect(screen.getByText("2 solved")).toBeTruthy();
  });

  test("plays without anywhere to save", () => {
    render(<WhoAmI {...props({ onSaveStar: undefined })} />);
    const character = firstOf(3);
    expect(() =>
      fireEvent.click(screen.getByRole("button", { name: `Guess ${character.name}` }))
    ).not.toThrow();
  });

  test("the line-up disappears the moment the answer is known", () => {
    // What stops a second guess landing: there is no button to press. If a
    // refactor ever leaves the choices mounted, this is where it shows up.
    const p = props();
    const { container } = render(<WhoAmI {...p} />);
    const character = firstOf(3);
    const button = screen.getByRole("button", { name: `Guess ${character.name}` });

    fireEvent.click(button);
    expect(p.onSaveStar).toHaveBeenCalledTimes(1);
    // The line-up is gone; the reveal is showing
    expect(container.querySelectorAll(".wai-choice").length).toBe(0);

    expect(screen.queryAllByRole("button", { name: /^Guess / }).length).toBe(0);
  });

  test("works through ten mysteries to the round card, then starts a new ten", () => {
    render(<WhoAmI {...props()} />);
    const round = buildRound(3);

    round.forEach((character, i) => {
      fireEvent.click(screen.getByRole("button", { name: `Guess ${character.name}` }));
      fireEvent.click(
        screen.getByRole("button", { name: i === round.length - 1 ? /Finish Round/ : /Next Mystery/ })
      );
    });

    expect(screen.getByRole("heading", { name: /Ten mysteries solved/ })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /New Ten/ }));
    expect(screen.getByText("Clue 1")).toBeTruthy();
  });

  test("the back and settings controls are wired", () => {
    const p = props();
    render(<WhoAmI {...p} />);
    fireEvent.click(screen.getByLabelText("Open Game Settings"));
    expect(p.onOpenSettings).toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText("Back to Games"));
    expect(p.onBackToHub).toHaveBeenCalled();
  });

  test("hides the settings control when the app does not offer one", () => {
    render(<WhoAmI {...props({ onOpenSettings: undefined })} />);
    expect(screen.queryByLabelText("Open Game Settings")).toBeNull();
  });

  test("drops its pending timers when the player leaves", () => {
    vi.useFakeTimers();
    const p = props();
    const { unmount } = render(<WhoAmI {...p} />);
    const character = firstOf(3);
    const wrong = screen
      .getAllByRole("button", { name: /^Guess / })
      .find((b) => b.getAttribute("aria-label") !== `Guess ${character.name}`);

    fireEvent.click(wrong);
    unmount();
    // A timer left running here would set state on a component that is gone
    expect(() => act(() => vi.advanceTimersByTime(2000))).not.toThrow();
  });

  test("starts somewhere random when the app does not pick a seed", () => {
    // Ten characters, four choices, and no seed handed in
    render(<WhoAmI {...props({ initialSeed: undefined })} />);
    expect(screen.getAllByRole("button", { name: /^Guess / }).length).toBe(4);
  });
});
