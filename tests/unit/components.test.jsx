import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Star } from "../../src/components/common/Star.jsx";
import { Confetti } from "../../src/components/common/Confetti.jsx";
import { Pencil } from "../../src/components/common/Pencil.jsx";
import { WelcomeSplash } from "../../src/components/common/WelcomeSplash.jsx";
import { GameHub } from "../../src/games/hub/GameHub.jsx";
import { GameIcon } from "../../src/games/hub/GameIcon.jsx";
import { CompletionCard } from "../../src/components/common/CompletionCard.jsx";
import { CompletionStamp } from "../../src/components/common/CompletionStamp.jsx";

describe("Common Components Tests", () => {
  test("GameIcon renders every doodle kind and falls back to scissors for unknown kinds", () => {
    ["scissors", "magnifier", "scroll", "bible", "cards", "map"].forEach((kind) => {
      const { container } = render(<GameIcon kind={kind} />);
      expect(container.querySelector("svg.hub-game-icon-svg")).toBeTruthy();
    });

    const { container: fallback } = render(<GameIcon kind="unknown_kind" size={24} />);
    expect(fallback.querySelector("svg.hub-game-icon-svg")).toBeTruthy();
  });

  test("CompletionCard wires its buttons and hides Next on the finale", () => {
    const onNext = vi.fn();
    const onSelect = vi.fn();
    const onBackToHub = vi.fn();

    const { rerender } = render(
      <CompletionCard
        icon="🌱"
        title="Chapter 1 Complete!"
        cheer="Great job!"
        nextLabel="Next Chapter →"
        onNext={onNext}
        selectLabel="Chapter Select"
        onSelect={onSelect}
        onBackToHub={onBackToHub}
      />
    );
    fireEvent.click(screen.getByText("Next Chapter →"));
    expect(onNext).toHaveBeenCalled();
    fireEvent.click(screen.getByText("Chapter Select"));
    expect(onSelect).toHaveBeenCalled();
    fireEvent.click(screen.getByText("Game Hub 🏠"));
    expect(onBackToHub).toHaveBeenCalled();

    rerender(
      <CompletionCard
        icon="👑"
        title="All Done!"
        cheer="Amazing!"
        nextLabel="Next Chapter →"
        onNext={null}
        selectLabel="Chapter Select"
        onSelect={onSelect}
        onBackToHub={onBackToHub}
      />
    );
    expect(screen.queryByText("Next Chapter →")).toBeNull();
  });

  test("CompletionStamp renders nothing, Complete, or Perfect", () => {
    const { container: hidden } = render(<CompletionStamp complete={false} perfect={false} />);
    expect(hidden.querySelector(".vb-stamp")).toBeNull();

    render(<CompletionStamp complete={true} perfect={false} />);
    expect(screen.getByText("✓ Complete")).toBeTruthy();

    render(<CompletionStamp complete={true} perfect={true} />);
    expect(screen.getByText("★ Perfect!")).toBeTruthy();
  });

  test("Star renders filled and empty states with default size", () => {
    const { container: filled } = render(<Star filled={true} />);
    expect(filled.querySelector("path")).toBeTruthy();

    const { container: empty } = render(<Star filled={false} size={32} />);
    expect(empty.querySelector("path")).toBeTruthy();
  });

  test("Confetti renders confetti particles", () => {
    const { container } = render(<Confetti />);
    expect(container.querySelectorAll("span").length).toBe(32);
  });

  test("Pencil renders pencil svg with default and custom size", () => {
    const { container: def } = render(<Pencil />);
    expect(def.querySelector(".vb-pencil-svg")).toBeTruthy();

    const { container: custom } = render(<Pencil size={48} />);
    expect(custom.querySelector(".vb-pencil-svg")).toBeTruthy();
  });

  test("WelcomeSplash renders title, avatars, and triggers onStart", () => {
    const handleStart = vi.fn();
    render(<WelcomeSplash onStart={handleStart} />);

    expect(screen.getByText("Scripture Games")).toBeTruthy();
    expect(screen.getByText("Tap to Play")).toBeTruthy();
    expect(screen.getByText("✂️ Verse Puzzles & Games")).toBeTruthy();
    expect(screen.getByText("📖 Multiple Bible Translations")).toBeTruthy();
    expect(screen.getByText("🛡️ 100% Safe & Offline")).toBeTruthy();
    expect(screen.getByText("🎵 Fun Acoustic Audio")).toBeTruthy();

    const playBtn = screen.getByRole("button", { name: "Tap to Play and Start Game" });
    fireEvent.click(playBtn);
    expect(handleStart).toHaveBeenCalled();
  });

  test("GameHub renders 6-game lineup, splits per-game stars, and handles selection", () => {
    const handleSelectGame = vi.fn();
    const handleOpenSettings = vi.fn();

    render(
      <GameHub
        onSelectGame={handleSelectGame}
        onOpenSettings={handleOpenSettings}
        translation="ESV"
        allStars={{ "1-0": 3, "1-1": "invalid_star_value", "mm-1-0": 2 }}
      />
    );

    expect(screen.getByText("Scripture Games")).toBeTruthy();
    expect(screen.getByText(/3 games ready/)).toBeTruthy();
    expect(screen.getByText(/Total Stars/i)).toBeTruthy();

    // Per-game star pills are prefix-filtered from the shared stars map
    expect(screen.getByText("⭐ 3 / 360 Stars")).toBeTruthy();
    expect(screen.getByText("⭐ 2 / 72 Stars")).toBeTruthy();
    expect(screen.getByText("⭐ 0 / 108 Stars")).toBeTruthy();
    // Hub chip shows the combined figure
    expect(screen.getByText("5")).toBeTruthy();

    // Open settings
    const settingsBtn = screen.getByLabelText("Open Game Settings");
    fireEvent.click(settingsBtn);
    expect(handleOpenSettings).toHaveBeenCalled();

    // Select each live game
    fireEvent.click(screen.getByRole("button", { name: /Verse Builder/i }));
    expect(handleSelectGame).toHaveBeenCalledWith("verse-builder");
    fireEvent.click(screen.getByRole("button", { name: /Memory Match/i }));
    expect(handleSelectGame).toHaveBeenCalledWith("memory-match");
  });
});
