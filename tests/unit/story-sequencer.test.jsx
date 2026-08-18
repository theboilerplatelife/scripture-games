import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { StorySequencer } from "../../src/games/story-sequencer/StorySequencer.jsx";

// Cards are tapped, never dragged
function tapCard(card) {
  fireEvent.click(card);
}
import { VolumeSelect } from "../../src/games/story-sequencer/VolumeSelect.jsx";
import { StorySelect } from "../../src/games/story-sequencer/StorySelect.jsx";
import { SequencerBoard } from "../../src/games/story-sequencer/SequencerBoard.jsx";
import { StoryWinCard } from "../../src/games/story-sequencer/StoryWinCard.jsx";
import { StoryReaderModal } from "../../src/games/story-sequencer/StoryReaderModal.jsx";
import { STORIES } from "../../src/games/story-sequencer/storyData.js";

describe("Story Sequencer Components & Gameplay Loop", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("VolumeSelect renders all 6 volumes and calculates unlocked state", () => {
    const onSelectVolume = vi.fn();
    const onBackToHub = vi.fn();
    const onOpenSettings = vi.fn();

    render(
      <VolumeSelect
        stars={{ "ss-1": 3, "ss-invalid": "corrupt" }}
        onSelectVolume={onSelectVolume}
        onBackToHub={onBackToHub}
        onOpenSettings={onOpenSettings}
      />
    );

    expect(screen.getByText("Story Sequencer")).toBeTruthy();
    expect(screen.getAllByRole("button", { name: /Volume/i }).length).toBe(6);

    // Click first unlocked volume
    const vol1Btn = screen.getByRole("button", { name: /Volume 1:/i });
    fireEvent.click(vol1Btn);
    expect(onSelectVolume).toHaveBeenCalledWith(1);

    // Settings button
    fireEvent.click(screen.getByLabelText("Settings"));
    expect(onOpenSettings).toHaveBeenCalled();

    // Back to Hub
    fireEvent.click(screen.getByLabelText("Back to Game Hub"));
    expect(onBackToHub).toHaveBeenCalled();
  });

  test("StorySelect renders stories within selected volume and navigates", () => {
    const onSelectStory = vi.fn();
    const onBackToVolumes = vi.fn();

    render(
      <StorySelect
        volumeId={1}
        stars={{ "ss-1": 3 }}
        onSelectStory={onSelectStory}
        onBackToVolumes={onBackToVolumes}
      />
    );

    expect(screen.getByText("The Days of Creation")).toBeTruthy();
    expect(screen.getByText("The Garden of Eden")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Play story 1:/i }));
    expect(onSelectStory).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByLabelText("Back to Story Volumes"));
    expect(onBackToVolumes).toHaveBeenCalled();
  });

  test("SequencerBoard supports card swapping, keyboard arrows, shift buttons, drag-drop, hint, and check validation", async () => {
    const onComplete = vi.fn();
    const onBackToStories = vi.fn();
    const story = STORIES[0]; // 5 events

    const { container } = render(
      <SequencerBoard
        story={story}
        seed={0}
        onBackToStories={onBackToStories}
        onComplete={onComplete}
      />
    );

    // Back button
    fireEvent.click(screen.getByLabelText("Back to Stories"));
    expect(onBackToStories).toHaveBeenCalled();

    // Hint button
    fireEvent.click(screen.getByLabelText(/Get a hint/));
    expect(screen.getByText(/belongs in Step/i)).toBeTruthy();

    // Tap-to-select and tap-to-swap
    const cards = container.querySelectorAll(".ss-event-card");
    expect(cards.length).toBe(5);

    // Click card 0, click card 0 again to deselect
    tapCard(cards[0]);
    expect(cards[0].classList.contains("selected")).toBe(true);
    tapCard(cards[0]);
    expect(cards[0].classList.contains("selected")).toBe(false);

    // Select card 0 and card 1 to swap
    tapCard(cards[0]);
    tapCard(cards[1]);

    // Keyboard navigation: Enter/Space to select/swap, ArrowLeft, ArrowRight
    fireEvent.keyDown(cards[0], { key: " " });
    fireEvent.keyDown(cards[1], { key: "Enter" });
    fireEvent.keyDown(cards[1], { key: "ArrowUp" });
    fireEvent.keyDown(cards[0], { key: "ArrowDown" });
    fireEvent.keyDown(cards[0], { key: "ArrowUp" }); // boundary check (i === 0)
    fireEvent.keyDown(cards[4], { key: "ArrowDown" }); // boundary check (i === 4)

    // Shift buttons
    const shiftUpBtns = container.querySelectorAll(".ss-shift-btn[aria-label*='up']");
    if (shiftUpBtns.length > 0) {
      fireEvent.click(shiftUpBtns[0]);
    }
    const shiftDownBtns = container.querySelectorAll(".ss-shift-btn[aria-label*='down']");
    if (shiftDownBtns.length > 0) {
      fireEvent.click(shiftDownBtns[0]);
    }

    // Drag-and-drop simulation
    // Tapping two cards trades their places
    const live = () => [...document.querySelectorAll(".ss-event-card")];
    const before = [...document.querySelectorAll(".ss-card-title")].map((n) => n.textContent);
    tapCard(live()[0]);
    expect(live()[0].className).toContain("selected");
    tapCard(live()[1]);
    const after = [...document.querySelectorAll(".ss-card-title")].map((n) => n.textContent);
    expect(after[0]).toBe(before[1]);
    expect(after[1]).toBe(before[0]);
    expect(after.slice(2)).toEqual(before.slice(2));
    // Selection clears once the swap happens
    expect(document.querySelectorAll(".ss-event-card.selected").length).toBe(0);

    // Check Order with incorrect sequence: the result lands on the cards above
    // the button, so the first card to fix is brought into view
    const checkScroll = vi.fn();
    container.querySelectorAll(".ss-timeline-slot").forEach((slot) => {
      slot.scrollIntoView = checkScroll;
    });
    fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));
    expect(screen.getByText(/in correct order! Keep going!/i)).toBeTruthy();
    expect(checkScroll).toHaveBeenCalledWith({ block: "center" });

    // Drop anything still held from the interactions above, so the solve
    // loop starts from a clean slate
    const held = document.querySelector(".ss-event-card.selected");
    if (held) tapCard(held);

    // Reorder correctly to trigger lockRef and completion
    for (let i = 0; i < 5; i++) {
      const currentCards = container.querySelectorAll(".ss-event-card");
      const targetStep = story.events[i];
      let foundIdx = -1;
      currentCards.forEach((c, idx) => {
        if (c.textContent.includes(targetStep.title)) {
          foundIdx = idx;
        }
      });
      if (foundIdx !== -1 && foundIdx !== i) {
        tapCard(currentCards[i]);
        const updated = container.querySelectorAll(".ss-event-card");
        tapCard(updated[foundIdx]);
      }
    }

    // Click Check Order on correct sequence
    fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));

    // Every input is inert while the board is locked for the win transition
    const updatedCards = container.querySelectorAll(".ss-event-card");
    tapCard(updatedCards[0]);
    const selectedBefore = document.querySelectorAll(".ss-event-card.selected").length;
    fireEvent.keyDown(updatedCards[0], { key: "Enter" });
    expect(document.querySelectorAll(".ss-event-card.selected").length).toBe(selectedBefore);
    fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    });
  });

  test("the hint marks one card and its step, and says so when nothing is out of place", () => {
    const story = STORIES[0];
    const { container } = render(
      <SequencerBoard story={story} seed={3} onBackToStories={vi.fn()} onComplete={vi.fn()} />
    );

    // The screen snaps to the first step the hint names, and that step is the
    // one highlighted
    const scrollIntoView = vi.fn();
    container.querySelectorAll(".ss-timeline-slot").forEach((slot) => {
      slot.scrollIntoView = scrollIntoView;
    });

    fireEvent.click(screen.getByLabelText(/Get a hint/));
    expect(screen.getByText(/belongs in Step/i)).toBeTruthy();
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "center" });
    expect(container.querySelectorAll(".ss-timeline-slot.hint-from").length).toBe(1);
    // Exactly one card is called out, with the step it belongs in marked
    expect(container.querySelectorAll(".ss-event-card.hint-glow").length).toBe(1);
    expect(container.querySelectorAll(".ss-timeline-slot.hint-target").length).toBe(1);

    // Put the story in order, then ask for a hint with nothing left to fix
    for (let i = 0; i < story.events.length; i++) {
      const cards = container.querySelectorAll(".ss-event-card");
      let foundIdx = -1;
      cards.forEach((c, idx) => {
        if (c.textContent.includes(story.events[i].title)) foundIdx = idx;
      });
      if (foundIdx !== -1 && foundIdx !== i) {
        tapCard(cards[i]);
        tapCard(container.querySelectorAll(".ss-event-card")[foundIdx]);
      }
    }

    fireEvent.click(screen.getByLabelText(/Get a hint/));
    expect(screen.getByText(/already in order/i)).toBeTruthy();
    expect(container.querySelectorAll(".ss-event-card.hint-glow").length).toBe(0);
  });

  test("the win card counts hints as tries and says help was used", () => {
    const props = {
      story: STORIES[0],
      earnedStars: 2,
      onPlayAgain: vi.fn(),
      onReadStory: vi.fn(),
      onNextStory: vi.fn(),
      onBackToStories: vi.fn(),
      hasNextStory: true,
    };
    // Hints fold into the try count, with a note that help was used
    const one = render(<StoryWinCard {...props} attempts={1} hintsUsed={1} />);
    expect(screen.getByText(/2 tries with hints/)).toBeTruthy();
    one.unmount();

    const many = render(<StoryWinCard {...props} attempts={2} hintsUsed={3} />);
    expect(screen.getByText(/5 tries with hints/)).toBeTruthy();
    many.unmount();

    const none = render(<StoryWinCard {...props} attempts={2} hintsUsed={0} />);
    expect(screen.getByText(/2 tries/)).toBeTruthy();
    expect(screen.queryByText(/with hints/)).toBeNull();
    none.unmount();
  });

  test("finishing a volume celebrates, and the last volume ends the game", () => {
    // Five of the six stories in volume 1 are already done
    const nearlyDone = { "ss-1": 3, "ss-2": 3, "ss-3": 3, "ss-4": 3, "ss-5": 3 };
    const { unmount } = render(
      <StorySequencer
        stars={nearlyDone}
        onSaveStars={vi.fn()}
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialSeed={1}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Foundations/ }));
    fireEvent.click(screen.getByRole("button", { name: /Play story 6/ }));

    const story = STORIES[5];
    const solve = () => {
      for (let i = 0; i < story.events.length; i++) {
        const cards = document.querySelectorAll(".ss-event-card");
        let foundIdx = -1;
        cards.forEach((c, idx) => {
          if (c.textContent.includes(story.events[i].title)) foundIdx = idx;
        });
        if (foundIdx !== -1 && foundIdx !== i) {
          tapCard(cards[i]);
          tapCard(document.querySelectorAll(".ss-event-card")[foundIdx]);
        }
      }
    };
    solve();

    vi.useFakeTimers();
    fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));
    act(() => vi.advanceTimersByTime(1000));
    vi.useRealTimers();

    // The win card offers the volume finish rather than another story
    fireEvent.click(screen.getByText("Complete Volume 🎉"));
    expect(screen.getByText(/Complete!/)).toBeTruthy();
    fireEvent.click(screen.getByText("Next Volume →"));
    expect(screen.getByRole("button", { name: /Play story 7/ })).toBeTruthy();
    unmount();
  });

  test("the last volume ends the game, and replays in a finished volume return to the list", () => {
    const solveCurrent = (story) => {
      for (let i = 0; i < story.events.length; i++) {
        const cards = document.querySelectorAll(".ss-event-card");
        let foundIdx = -1;
        cards.forEach((c, idx) => {
          if (c.textContent.includes(story.events[i].title)) foundIdx = idx;
        });
        if (foundIdx !== -1 && foundIdx !== i) {
          tapCard(cards[i]);
          tapCard(document.querySelectorAll(".ss-event-card")[foundIdx]);
        }
      }
      vi.useFakeTimers();
      fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));
      act(() => vi.advanceTimersByTime(1000));
      vi.useRealTimers();
    };

    // Everything done but the very last story
    const almostAll = Object.fromEntries(
      STORIES.slice(0, STORIES.length - 1).map((s) => [`ss-${s.id}`, 3])
    );
    const onBackToHubFinale = vi.fn();
    const finale = render(
      <StorySequencer
        stars={almostAll}
        onSaveStars={vi.fn()}
        onBackToHub={onBackToHubFinale}
        onOpenSettings={vi.fn()}
        initialSeed={1}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Resurrection/ }));
    fireEvent.click(screen.getByRole("button", { name: /Play story 36/ }));
    solveCurrent(STORIES[35]);

    // The win card can jump straight to the volume list, matching the chapter
    // and deck shortcuts the other games' win cards offer
    fireEvent.click(screen.getByText("Story Volumes"));
    expect(screen.getByRole("button", { name: /Resurrection/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Resurrection/ }));
    fireEvent.click(screen.getByRole("button", { name: /Play story 36/ }));
    solveCurrent(STORIES[35]);

    fireEvent.click(screen.getByText("Complete Volume 🎉"));
    expect(screen.getByText("You Ordered Every Story!")).toBeTruthy();
    // The game is over — there is no next volume
    expect(screen.queryByText("Next Volume →")).toBeNull();
    // The hub button on the finale card leaves the game and stops its music
    fireEvent.click(screen.getByText("Game Hub 🏠"));
    expect(onBackToHubFinale).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Story Volumes"));
    expect(screen.getByRole("button", { name: /Foundations/ })).toBeTruthy();
    finale.unmount();

    // Replaying a story in a volume that is already finished hands back the list
    const done = render(
      <StorySequencer
        stars={Object.fromEntries(STORIES.map((s) => [`ss-${s.id}`, 3]))}
        onSaveStars={vi.fn()}
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
        initialSeed={1}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Foundations/ }));
    fireEvent.click(screen.getByRole("button", { name: /Play story 1/ }));
    solveCurrent(STORIES[0]);
    expect(screen.queryByText("Complete Volume 🎉")).toBeNull();
    fireEvent.click(screen.getByText(/Next Story|Back to Stories/));
    expect(screen.getByRole("button", { name: /Play story 2/ })).toBeTruthy();
    done.unmount();
  });

  test("hints count against the score, so they cannot buy three stars", () => {
    const story = STORIES[0];
    const onComplete = vi.fn();
    const { container } = render(
      <SequencerBoard story={story} seed={3} onBackToStories={vi.fn()} onComplete={onComplete} />
    );

    // Lean on the hint three times before solving
    for (let n = 0; n < 3; n++) {
      fireEvent.click(screen.getByLabelText(/Get a hint/));
    }

    for (let i = 0; i < story.events.length; i++) {
      const cards = container.querySelectorAll(".ss-event-card");
      let foundIdx = -1;
      cards.forEach((c, idx) => {
        if (c.textContent.includes(story.events[i].title)) foundIdx = idx;
      });
      if (foundIdx !== -1 && foundIdx !== i) {
        tapCard(cards[i]);
        tapCard(container.querySelectorAll(".ss-event-card")[foundIdx]);
      }
    }

    vi.useFakeTimers();
    fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));
    act(() => vi.advanceTimersByTime(1000));
    vi.useRealTimers();

    // Solved on the first check, but three hints cap it at a single star
    expect(onComplete).toHaveBeenCalledWith(1, 1, 3);
  });

  test("a swap leaves the page scrolled exactly where it was", () => {
    const story = STORIES[0];
    const { container, unmount } = render(
      <SequencerBoard story={story} seed={3} onBackToStories={vi.fn()} onComplete={vi.fn()} />
    );
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const cards = () => [...container.querySelectorAll(".ss-event-card")];

    // The reader scrolled to 480 to find the partner card. The swap records
    // that, then the browser shifts the view to 120 while the order changes —
    // the board must put it back.
    let read = 0;
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      get: () => (read++ === 0 ? 480 : 120),
    });
    tapCard(cards()[0]);
    tapCard(cards()[1]);
    expect(scrollTo).toHaveBeenCalledWith(0, 480);

    // A swap the browser leaves alone must not scroll anything
    scrollTo.mockClear();
    Object.defineProperty(window, "scrollY", { configurable: true, value: 480 });
    tapCard(cards()[2]);
    tapCard(cards()[3]);
    expect(scrollTo).not.toHaveBeenCalled();

    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
    scrollTo.mockRestore();
    unmount();
  });

  test("swapped cards animate from their old positions, and hold still under reduced motion", () => {
    const story = STORIES[0];

    // jsdom has no layout, so give each slot a rect that follows the card
    // currently inside it — then a reorder produces real deltas to animate
    const rowFor = (slot) => {
      const title = slot.querySelector(".ss-card-title")?.textContent ?? "";
      return story.events.findIndex((ev) => ev.title === title);
    };
    const stubRects = (root) => {
      root.querySelectorAll(".ss-timeline-slot").forEach((slot) => {
        slot.getBoundingClientRect = () => {
          const row = rowFor(slot);
          return { left: 0, right: 300, top: row * 100, bottom: row * 100 + 100, width: 300, height: 100 };
        };
      });
    };

    const rafSpy = vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 1;
    });

    const { container, unmount } = render(
      <SequencerBoard story={story} seed={3} onBackToStories={vi.fn()} onComplete={vi.fn()} />
    );
    stubRects(container);

    // Swap two cards: both slots get a settling transition
    const cards = () => [...container.querySelectorAll(".ss-event-card")];
    tapCard(cards()[1]);
    tapCard(cards()[0]);

    const animated = [...container.querySelectorAll(".ss-timeline-slot")].filter((slot) =>
      slot.style.transition.includes("transform")
    );
    expect(animated.length).toBeGreaterThan(0);
    // requestAnimationFrame ran inline above, so the cards have settled home
    expect(animated[0].style.transform).toBe("");
    unmount();

    // With reduced motion the same swap moves nothing
    // jsdom ships no matchMedia at all, which is why the component guards for it
    const realMatchMedia = window.matchMedia;
    window.matchMedia = () => ({ matches: true });
    const still = render(
      <SequencerBoard story={story} seed={3} onBackToStories={vi.fn()} onComplete={vi.fn()} />
    );
    stubRects(still.container);
    const stillCards = () => [...still.container.querySelectorAll(".ss-event-card")];
    tapCard(stillCards()[1]);
    tapCard(stillCards()[0]);
    expect(
      [...still.container.querySelectorAll(".ss-timeline-slot")].every((slot) => !slot.style.transition)
    ).toBe(true);

    still.unmount();
    window.matchMedia = realMatchMedia;
    rafSpy.mockRestore();
  });

  test("StoryWinCard renders congratulatory stars, story reader button, and next story", () => {
    const onPlayAgain = vi.fn();
    const onReadStory = vi.fn();
    const onNextStory = vi.fn();
    const onBackToStories = vi.fn();

    // 3 Stars win with next story
    const { unmount } = render(
      <StoryWinCard
        story={STORIES[0]}
        earnedStars={3}
        attempts={1}
        hasNextStory={true}
        onPlayAgain={onPlayAgain}
        onReadStory={onReadStory}
        onNextStory={onNextStory}
        onBackToStories={onBackToStories}
      />
    );

    expect(screen.getByText("Brilliant Timeline Mastery!")).toBeTruthy();
    fireEvent.click(screen.getByText("Read Full Story 📖"));
    expect(onReadStory).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Play Again 🔄"));
    expect(onPlayAgain).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Next Story →"));
    expect(onNextStory).toHaveBeenCalled();
    unmount();

    // 2 Stars win without next story (last story of volume)
    const card2 = render(
      <StoryWinCard
        story={STORIES[5]}
        earnedStars={2}
        attempts={3}
        hasNextStory={false}
        onPlayAgain={onPlayAgain}
        onReadStory={onReadStory}
        onNextStory={onNextStory}
        onBackToStories={onBackToStories}
      />
    );

    expect(screen.getByText("Great Story Ordering!")).toBeTruthy();
    fireEvent.click(screen.getByText("All Volume Stories →"));
    expect(onBackToStories).toHaveBeenCalled();
    card2.unmount();

    // 1 Star win
    const card1 = render(
      <StoryWinCard
        story={STORIES[0]}
        earnedStars={1}
        attempts={6}
        hasNextStory={true}
        onPlayAgain={onPlayAgain}
        onReadStory={onReadStory}
        onNextStory={onNextStory}
        onBackToStories={onBackToStories}
      />
    );
    expect(screen.getByText("You Put the Story in Order!")).toBeTruthy();
    card1.unmount();
  });

  test("StoryReaderModal displays all narrative steps in order and closes", () => {
    const onClose = vi.fn();
    render(<StoryReaderModal story={STORIES[0]} onClose={onClose} />);

    expect(screen.getByText("The Days of Creation")).toBeTruthy();
    expect(screen.getByText("Light in Darkness")).toBeTruthy();
    expect(screen.getByText("Animals, Mankind & Rest")).toBeTruthy();

    fireEvent.click(screen.getByLabelText("Close story reader"));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Done Reading ✨"));
    expect(onClose).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(document, { key: "Enter" });
    expect(onClose).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  test("StorySequencer full integration flow: volume -> story -> solve -> win -> reader -> next -> play again", async () => {
    const onSaveStars = vi.fn();
    const onBackToHub = vi.fn();
    const onOpenSettings = vi.fn();

    const { container } = render(
      <StorySequencer
        initialSeed={1}
        stars={{ "ss-1": 1 }}
        onSaveStars={onSaveStars}
        onBackToHub={onBackToHub}
        onOpenSettings={onOpenSettings}
      />
    );

    // 1. Select Volume 1
    fireEvent.click(screen.getByRole("button", { name: /Volume 1:/i }));

    // 2. Select Story 6 (last story in volume) to test end-of-volume next action
    fireEvent.click(screen.getByRole("button", { name: /Play story 6:/i }));

    // Back to stories from board
    fireEvent.click(screen.getByLabelText("Back to Stories"));
    expect(screen.getByText(/Jacob's Ladder at Bethel/)).toBeTruthy();

    // Re-open Story 1
    fireEvent.click(screen.getByRole("button", { name: /Play story 1:/i }));

    // 3. Reorder cards into correct order
    for (let i = 0; i < 5; i++) {
      const cards = container.querySelectorAll(".ss-event-card");
      const targetStep = STORIES[0].events[i];
      let foundIdx = -1;
      cards.forEach((c, idx) => {
        if (c.textContent.includes(targetStep.title)) {
          foundIdx = idx;
        }
      });
      if (foundIdx !== -1 && foundIdx !== i) {
        tapCard(cards[i]);
        const updatedCards = container.querySelectorAll(".ss-event-card");
        tapCard(updatedCards[foundIdx]);
      }
    }

    // 4. Click Check Order
    fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));

    // 5. Wait for win card celebration
    await waitFor(() => {
      expect(screen.getByText(/You sequenced/i)).toBeTruthy();
    });
    expect(onSaveStars).toHaveBeenCalledWith("ss-1", 3);

    // 6. Open Story Reader
    fireEvent.click(screen.getByText("Read Full Story 📖"));
    expect(screen.getByText("Done Reading ✨")).toBeTruthy();
    fireEvent.click(screen.getByText("Done Reading ✨"));

    // 7. Click Play Again
    fireEvent.click(screen.getByText("Play Again 🔄"));
    expect(screen.getByText(/Put the 5 cards in order/i)).toBeTruthy();

    // 8. Solve again and click Next Story
    for (let i = 0; i < 5; i++) {
      const cards = container.querySelectorAll(".ss-event-card");
      const targetStep = STORIES[0].events[i];
      let foundIdx = -1;
      cards.forEach((c, idx) => {
        if (c.textContent.includes(targetStep.title)) {
          foundIdx = idx;
        }
      });
      if (foundIdx !== -1 && foundIdx !== i) {
        tapCard(cards[i]);
        const updatedCards = container.querySelectorAll(".ss-event-card");
        tapCard(updatedCards[foundIdx]);
      }
    }
    fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));
    await waitFor(() => {
      expect(screen.getByText(/You sequenced/i)).toBeTruthy();
    });
    fireEvent.click(screen.getByText("Next Story →"));
    expect(screen.getByText(/The Garden of Eden/)).toBeTruthy();

    // Back to stories and test back to volumes
    fireEvent.click(screen.getByLabelText("Back to Stories"));
    fireEvent.click(screen.getByLabelText("Back to Story Volumes"));
    expect(screen.getByText("Story Sequencer")).toBeTruthy();
  });

  test("StorySequencer handles replay with lower score without overwriting stars", async () => {
    const onSaveStars = vi.fn();
    const { container } = render(
      <StorySequencer
        initialSeed={1}
        stars={{ "ss-1": 3 }}
        onSaveStars={onSaveStars}
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
      />
    );

    // Select Volume 1 -> Story 1
    fireEvent.click(screen.getByRole("button", { name: /Volume 1:/i }));
    fireEvent.click(screen.getByRole("button", { name: /Play story 1:/i }));

    // Wrong check multiple times to earn 1 star
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));
    }

    // Now arrange correctly
    for (let i = 0; i < 5; i++) {
      const cards = container.querySelectorAll(".ss-event-card");
      const targetStep = STORIES[0].events[i];
      let foundIdx = -1;
      cards.forEach((c, idx) => {
        if (c.textContent.includes(targetStep.title)) {
          foundIdx = idx;
        }
      });
      if (foundIdx !== -1 && foundIdx !== i) {
        tapCard(cards[i]);
        const updatedCards = container.querySelectorAll(".ss-event-card");
        tapCard(updatedCards[foundIdx]);
      }
    }
    fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));

    await waitFor(() => {
      expect(screen.getByText(/You Put the Story in Order!/)).toBeTruthy();
    });
    // Since prev was 3 stars and we got 1 star, onSaveStars should not have been called
    expect(onSaveStars).not.toHaveBeenCalled();
  });

  test("StorySequencer handles last story completion transitioning back to story select", async () => {
    const onSaveStars = vi.fn();
    const { container } = render(
      <StorySequencer
        initialSeed={1}
        stars={{}}
        onSaveStars={onSaveStars}
        onBackToHub={vi.fn()}
        onOpenSettings={vi.fn()}
      />
    );

    // Select Volume 1 -> Story 6 (last story of volume 1)
    fireEvent.click(screen.getByRole("button", { name: /Volume 1:/i }));
    fireEvent.click(screen.getByRole("button", { name: /Play story 6:/i }));

    // Solve Story 6
    for (let i = 0; i < 5; i++) {
      const cards = container.querySelectorAll(".ss-event-card");
      const targetStep = STORIES[5].events[i];
      let foundIdx = -1;
      cards.forEach((c, idx) => {
        if (c.textContent.includes(targetStep.title)) {
          foundIdx = idx;
        }
      });
      if (foundIdx !== -1 && foundIdx !== i) {
        tapCard(cards[i]);
        const updatedCards = container.querySelectorAll(".ss-event-card");
        tapCard(updatedCards[foundIdx]);
      }
    }

    fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));
    await waitFor(() => {
      expect(screen.getByText(/You Put the Story in Order!|Great Story Ordering!|Brilliant Timeline Mastery!/)).toBeTruthy();
    });

    // All Volume Stories button
    fireEvent.click(screen.getByText("All Volume Stories →"));
    expect(screen.getByText(/Jacob's Ladder at Bethel/)).toBeTruthy();
  });
});
