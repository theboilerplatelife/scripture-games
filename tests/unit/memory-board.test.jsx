import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryBoard } from "../../src/games/memory-match/MemoryBoard.jsx";
import { buildDeck, MODES, DECKS, starsForMisses } from "../../src/games/memory-match/matchData.js";

const deckObj = DECKS[0];
const HALVES = 2; // Torn Verses: 4 pairs / 8 cards

// The deck is deterministic, so tests can precompute the layout
const cardDeck = buildDeck(deckObj, HALVES, "ESV");

function cardIndexesOfPair(pairId) {
  return cardDeck
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => c.pairId === pairId)
    .map(({ i }) => i);
}

function getCards(container) {
  return container.querySelectorAll(".mm-card");
}

// Flip a full pair and advance past the match beat
function matchPair(container, pairId) {
  const [a, b] = cardIndexesOfPair(pairId);
  fireEvent.click(getCards(container)[a]);
  fireEvent.click(getCards(container)[b]);
  act(() => vi.advanceTimersByTime(500));
}

// Flip two cards from different pairs and advance past the miss beat
function missOnce(container) {
  const [a] = cardIndexesOfPair(0);
  const [b] = cardIndexesOfPair(1);
  fireEvent.click(getCards(container)[a]);
  fireEvent.click(getCards(container)[b]);
  act(() => vi.advanceTimersByTime(1000));
}

describe("MemoryBoard", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  test("flips cards, matches a pair, and keeps it revealed and disabled", () => {
    const { container } = render(
      <MemoryBoard deck={deckObj} modeIdx={HALVES} translation="ESV" onBackToModes={vi.fn()} onComplete={vi.fn()} />
    );

    const [a, b] = cardIndexesOfPair(0);
    const cards = getCards(container);

    expect(cards[a].getAttribute("aria-label")).toBe(`Card ${a + 1}: hidden`);
    fireEvent.click(cards[a]);
    expect(cards[a].getAttribute("aria-label")).toBe(`Card ${a + 1}: ${cardDeck[a].text}`);
    expect(cards[a].className).toContain("flipped");

    fireEvent.click(cards[b]);
    act(() => vi.advanceTimersByTime(500));

    expect(cards[a].className).toContain("matched");
    expect(cards[b].className).toContain("matched");
    expect(cards[a].disabled).toBe(true);
    // Matched pairs get a numbered sticker (match order) on both cards
    expect(cards[a].querySelector(".mm-card-match-badge").textContent).toBe("1");
    expect(cards[b].querySelector(".mm-card-match-badge").textContent).toBe("1");
    expect(cards[a].getAttribute("aria-label")).toBe(`Card ${a + 1}: ${cardDeck[a].text} (matched)`);

    // The second found pair is stickered "2" on both its cards
    const [c, d] = cardIndexesOfPair(1);
    fireEvent.click(cards[c]);
    fireEvent.click(cards[d]);
    act(() => vi.advanceTimersByTime(500));
    expect(cards[c].querySelector(".mm-card-match-badge").textContent).toBe("2");
    expect(cards[d].querySelector(".mm-card-match-badge").textContent).toBe("2");
    // Clicking a matched card is a no-op
    fireEvent.click(cards[a]);
    expect(cards[a].className).toContain("matched");
  });

  test("a wrong pair lingers face-up for reading and clears on the next flip", () => {
    const { container } = render(
      <MemoryBoard deck={deckObj} modeIdx={HALVES} translation="ESV" onBackToModes={vi.fn()} onComplete={vi.fn()} />
    );

    const [a] = cardIndexesOfPair(0);
    const [b] = cardIndexesOfPair(1);
    const cards = getCards(container);

    fireEvent.click(cards[a]);
    fireEvent.click(cards[b]);

    // Input is locked while the pair is being judged
    const [c] = cardIndexesOfPair(2);
    fireEvent.click(cards[c]);
    expect(cards[c].className).not.toContain("flipped");

    act(() => vi.advanceTimersByTime(600));
    // The wrong pair STAYS face-up, marked and announced as not a match
    expect(screen.getByText("oops ×1")).toBeTruthy();
    expect(cards[a].className).toContain("miss");
    expect(cards[b].className).toContain("miss");
    expect(cards[a].getAttribute("aria-label")).toContain("(not a match)");

    // The next flip dismisses the stale pair and starts a fresh attempt
    fireEvent.click(cards[c]);
    expect(cards[a].className).not.toContain("flipped");
    expect(cards[b].className).not.toContain("flipped");
    expect(cards[c].className).toContain("flipped");
    expect(cards[c].className).not.toContain("miss");
  });

  test("tapping a card of the lingering wrong pair keeps that card up as the new first pick", () => {
    const { container } = render(
      <MemoryBoard deck={deckObj} modeIdx={HALVES} translation="ESV" onBackToModes={vi.fn()} onComplete={vi.fn()} />
    );
    const [a] = cardIndexesOfPair(0);
    const [b] = cardIndexesOfPair(1);
    const cards = getCards(container);

    fireEvent.click(cards[a]);
    fireEvent.click(cards[b]);
    act(() => vi.advanceTimersByTime(600));

    fireEvent.click(cards[b]);
    expect(cards[b].className).toContain("flipped");
    expect(cards[a].className).not.toContain("flipped");
  });

  test("re-clicking the single flipped card is a no-op", () => {
    const { container } = render(
      <MemoryBoard deck={deckObj} modeIdx={HALVES} translation="ESV" onBackToModes={vi.fn()} onComplete={vi.fn()} />
    );
    const [a] = cardIndexesOfPair(0);
    const cards = getCards(container);
    fireEvent.click(cards[a]);
    fireEvent.click(cards[a]);
    // Still just one flipped card, no evaluation started
    expect(container.querySelectorAll(".mm-card.flipped").length).toBe(1);
  });

  test("completing the board reports 3 stars on a flawless run", () => {
    const onComplete = vi.fn();
    const { container } = render(
      <MemoryBoard deck={deckObj} modeIdx={HALVES} translation="ESV" onBackToModes={vi.fn()} onComplete={onComplete} />
    );
    [0, 1, 2, 3].forEach((p) => matchPair(container, p));
    act(() => vi.advanceTimersByTime(700));
    expect(onComplete).toHaveBeenCalledWith(3, 0);
  });

  test("misses lower the star tiers (2 stars, then 1 star)", () => {
    const pairs = MODES[HALVES].pairs;

    // 4 misses on a 4-pair board → 2 stars
    const onComplete2 = vi.fn();
    const two = render(
      <MemoryBoard deck={deckObj} modeIdx={HALVES} translation="ESV" onBackToModes={vi.fn()} onComplete={onComplete2} />
    );
    for (let i = 0; i < 4; i++) missOnce(two.container);
    [0, 1, 2, 3].forEach((p) => matchPair(two.container, p));
    act(() => vi.advanceTimersByTime(700));
    expect(starsForMisses(4, pairs)).toBe(2);
    expect(onComplete2).toHaveBeenCalledWith(2, 4);
    two.unmount();

    // 9 misses → 1 star
    const onComplete1 = vi.fn();
    const one = render(
      <MemoryBoard deck={deckObj} modeIdx={HALVES} translation="ESV" onBackToModes={vi.fn()} onComplete={onComplete1} />
    );
    for (let i = 0; i < 9; i++) missOnce(one.container);
    [0, 1, 2, 3].forEach((p) => matchPair(one.container, p));
    act(() => vi.advanceTimersByTime(700));
    expect(onComplete1).toHaveBeenCalledWith(1, 9);
  });

  test("renders Hint Hunt mode and fires the back callback", () => {
    const onBackToModes = vi.fn();
    const { container } = render(
      <MemoryBoard deck={deckObj} modeIdx={0} translation="ESV" onBackToModes={onBackToModes} onComplete={vi.fn()} />
    );
    // 10 cards (5 pairs)
    expect(getCards(container).length).toBe(10);

    fireEvent.click(screen.getByLabelText("Back to Match Modes"));
    expect(onBackToModes).toHaveBeenCalled();
  });

  test("hint and reference boards tag card faces so kids know what pairs with what", () => {
    const hints = render(
      <MemoryBoard deck={deckObj} modeIdx={0} translation="ESV" onBackToModes={vi.fn()} onComplete={vi.fn()} />
    );
    expect(screen.getAllByText("Hint").length).toBe(5);
    expect(screen.getAllByText("Verse").length).toBe(5);
    // Revealed cards announce their tag
    const hintDeck = buildDeck(deckObj, 0, "ESV");
    const cards = hints.container.querySelectorAll(".mm-card");
    fireEvent.click(cards[0]);
    const tagLabel = hintDeck[0].kind === "hint" ? "Hint" : "Verse";
    expect(cards[0].getAttribute("aria-label")).toBe(`Card 1: ${tagLabel} — ${hintDeck[0].text}`);
    hints.unmount();

    const refs = render(
      <MemoryBoard deck={deckObj} modeIdx={1} translation="ESV" onBackToModes={vi.fn()} onComplete={vi.fn()} />
    );
    expect(screen.getAllByText("Reference").length).toBe(5);
    expect(screen.getAllByText("Verse").length).toBe(5);
    refs.unmount();

    // Torn Verses stays untagged — both faces are verse pieces
    const halves = render(
      <MemoryBoard deck={deckObj} modeIdx={2} translation="ESV" onBackToModes={vi.fn()} onComplete={vi.fn()} />
    );
    expect(halves.container.querySelector(".mm-card-tag")).toBeNull();
    halves.unmount();
  });
});
