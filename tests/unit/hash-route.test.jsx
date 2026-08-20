import { describe, test, expect, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";
import { useState } from "react";
import { parseHash, toHash, useHashRoute } from "../../src/components/common/useHashRoute.js";
import { useRouteSync } from "../../src/components/common/useRouteSync.js";

describe("hash routes", () => {
  beforeEach(() => {
    window.location.hash = "";
  });

  test("reads a game and its place out of the hash", () => {
    expect(parseHash("#/verse-builder/3/5")).toEqual({ game: "verse-builder", a: 3, b: 5 });
    expect(parseHash("#/memory-match/2")).toEqual({ game: "memory-match", a: 2, b: null });
    expect(parseHash("#/story-sequencer")).toEqual({ game: "story-sequencer", a: null, b: null });
  });

  test("treats anything it does not recognise as the hub", () => {
    // A stale link or a hand-typed URL must not render a blank screen
    expect(parseHash("#/")).toEqual({ game: "hub", a: null, b: null });
    expect(parseHash("")).toEqual({ game: "hub", a: null, b: null });
    expect(parseHash("#/not-a-game/9")).toEqual({ game: "hub", a: null, b: null });
    expect(parseHash("#/verse-builder/frog")).toEqual({ game: "verse-builder", a: null, b: null });
  });

  test("writes only the parts that are set", () => {
    expect(toHash({ game: "hub" })).toBe("#/");
    expect(toHash()).toBe("#/");
    expect(toHash({ game: "verse-builder" })).toBe("#/verse-builder");
    expect(toHash({ game: "verse-builder", a: 3 })).toBe("#/verse-builder/3");
    expect(toHash({ game: "verse-builder", a: 3, b: 5 })).toBe("#/verse-builder/3/5");
  });

  test("navigating updates the address bar, and the browser updates the route", () => {
    let api;
    function Probe() {
      api = useHashRoute();
      return null;
    }
    render(<Probe />);
    expect(api[0].game).toBe("hub");

    act(() => api[1]({ game: "verse-builder", a: 2 }));
    expect(window.location.hash).toBe("#/verse-builder/2");
    expect(api[0]).toEqual({ game: "verse-builder", a: 2, b: null });

    // Navigating to where we already are must not touch history
    act(() => api[1]({ game: "verse-builder", a: 2 }));
    expect(window.location.hash).toBe("#/verse-builder/2");

    // The Back button: the browser changes the hash, we follow
    act(() => {
      window.location.hash = "#/memory-match/1/1";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(api[0]).toEqual({ game: "memory-match", a: 1, b: 1 });
  });

  test("replace moves without leaving a step to press Back through", () => {
    let api;
    function Probe() {
      api = useHashRoute();
      return null;
    }
    render(<Probe />);
    act(() => api[1]({ game: "story-sequencer", a: 4 }, { replace: true }));
    expect(window.location.hash).toBe("#/story-sequencer/4");
    expect(api[0].a).toBe(4);
  });
});

describe("useRouteSync", () => {
  /* A game in miniature: two screens, one selection, and the same
     two-way sync the real games use. */
  function Game({ route, navigate, hidePlace = false }) {
    const [screen, setScreen] = useState("list");
    const [id, setId] = useState(null);
    useRouteSync({
      game: "verse-builder",
      route,
      navigate,
      place: hidePlace ? null : screen === "list" ? { a: null, b: null } : { a: id, b: null },
      apply: ({ a }) => {
        if (a === null) {
          setScreen("list");
          return;
        }
        setId(a);
        setScreen("detail");
      },
    });
    return (
      <button type="button" onClick={() => { setId(7); setScreen("detail"); }}>
        {screen}:{String(id)}
      </button>
    );
  }

  beforeEach(() => {
    window.location.hash = "";
  });

  test("takes the URL as the truth on arrival, rather than announcing its defaults", () => {
    // The bug this prevents: the game announced "list" as it mounted and
    // overwrote the deep link that had just opened it
    const seen = [];
    const { getByRole } = render(
      <Game route={{ game: "verse-builder", a: 4, b: null }} navigate={(r) => seen.push(toHash(r))} />
    );
    expect(getByRole("button").textContent).toBe("detail:4");
    expect(seen, "the game overwrote the route it was opened with").toEqual([]);
  });

  test("announces the screen once the player moves", () => {
    const seen = [];
    const { getByRole } = render(
      <Game route={{ game: "verse-builder", a: null, b: null }} navigate={(r) => seen.push(toHash(r))} />
    );
    act(() => getByRole("button").click());
    expect(seen).toEqual(["#/verse-builder/7"]);
  });

  test("follows the route without echoing it back", () => {
    // The echo is what put fifty entries in the history: the route changed,
    // the state had not caught up, and the stale place was written back
    const seen = [];
    const navigate = (r) => seen.push(toHash(r));
    const { rerender, getByRole } = render(
      <Game route={{ game: "verse-builder", a: null, b: null }} navigate={navigate} />
    );
    rerender(<Game route={{ game: "verse-builder", a: 9, b: null }} navigate={navigate} />);
    expect(getByRole("button").textContent).toBe("detail:9");
    expect(seen, "following a route wrote it straight back").toEqual([]);
  });

  test("ignores routes belonging to another game", () => {
    const seen = [];
    const { getByRole } = render(
      <Game route={{ game: "memory-match", a: 3, b: 1 }} navigate={(r) => seen.push(toHash(r))} />
    );
    expect(getByRole("button").textContent).toBe("list:null");
    expect(seen).toEqual([]);
  });

  test("stays quiet on screens that do not own a URL", () => {
    // Win cards are transient: the URL keeps pointing at the board
    const seen = [];
    const { getByRole } = render(
      <Game
        route={{ game: "verse-builder", a: null, b: null }}
        navigate={(r) => seen.push(toHash(r))}
        hidePlace={true}
      />
    );
    act(() => getByRole("button").click());
    expect(seen).toEqual([]);
  });

  test("does nothing without a navigate to call", () => {
    const { getByRole } = render(<Game route={{ game: "verse-builder", a: null, b: null }} />);
    act(() => getByRole("button").click());
    expect(getByRole("button").textContent).toBe("detail:7");
  });
});
