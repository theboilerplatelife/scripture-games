import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StorySequencer } from "../../src/games/story-sequencer/StorySequencer.jsx";
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
    fireEvent.click(screen.getByLabelText("Get a hint"));
    expect(screen.getByText(/Tap the glowing card/i)).toBeTruthy();

    // Tap-to-select and tap-to-swap
    const cards = container.querySelectorAll(".ss-event-card");
    expect(cards.length).toBe(5);

    // Click card 0, click card 0 again to deselect
    fireEvent.click(cards[0]);
    expect(cards[0].classList.contains("selected")).toBe(true);
    fireEvent.click(cards[0]);
    expect(cards[0].classList.contains("selected")).toBe(false);

    // Select card 0 and card 1 to swap
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    // Keyboard navigation: Enter/Space to select/swap, ArrowLeft, ArrowRight
    fireEvent.keyDown(cards[0], { key: " " });
    fireEvent.keyDown(cards[1], { key: "Enter" });
    fireEvent.keyDown(cards[1], { key: "ArrowLeft" });
    fireEvent.keyDown(cards[0], { key: "ArrowRight" });
    fireEvent.keyDown(cards[0], { key: "ArrowLeft" }); // boundary check (i === 0)
    fireEvent.keyDown(cards[4], { key: "ArrowRight" }); // boundary check (i === 4)

    // Shift buttons
    const shiftLeftBtns = container.querySelectorAll(".ss-shift-btn[aria-label*='left']");
    if (shiftLeftBtns.length > 0) {
      fireEvent.click(shiftLeftBtns[0]);
    }
    const shiftRightBtns = container.querySelectorAll(".ss-shift-btn[aria-label*='right']");
    if (shiftRightBtns.length > 0) {
      fireEvent.click(shiftRightBtns[0]);
    }

    // Drag-and-drop simulation
    fireEvent.dragStart(cards[0]);
    fireEvent.dragOver(cards[1]);
    fireEvent.drop(cards[1]);

    // Drop without dragStart (draggedIdx === null)
    fireEvent.drop(cards[0]);

    // Check Order with incorrect sequence
    fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));
    expect(screen.getByText(/in correct order! Keep going!/i)).toBeTruthy();

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
        fireEvent.click(currentCards[i]);
        const updated = container.querySelectorAll(".ss-event-card");
        fireEvent.click(updated[foundIdx]);
      }
    }

    // Click Check Order on correct sequence
    fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));

    // Clicks while locked are no-ops
    const updatedCards = container.querySelectorAll(".ss-event-card");
    fireEvent.click(updatedCards[0]);
    fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    });
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
        fireEvent.click(cards[i]);
        const updatedCards = container.querySelectorAll(".ss-event-card");
        fireEvent.click(updatedCards[foundIdx]);
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
    expect(screen.getByText(/Arrange the 5 event cards/i)).toBeTruthy();

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
        fireEvent.click(cards[i]);
        const updatedCards = container.querySelectorAll(".ss-event-card");
        fireEvent.click(updatedCards[foundIdx]);
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
        fireEvent.click(cards[i]);
        const updatedCards = container.querySelectorAll(".ss-event-card");
        fireEvent.click(updatedCards[foundIdx]);
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
        fireEvent.click(cards[i]);
        const updatedCards = container.querySelectorAll(".ss-event-card");
        fireEvent.click(updatedCards[foundIdx]);
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
