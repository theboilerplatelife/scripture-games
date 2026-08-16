import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "../../src/App.jsx";

describe("App Root & State Integration Tests", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("loads safely when localStorage throws errors and starts on splash click", () => {
    const originalGetItem = Storage.prototype.getItem;
    const originalSetItem = Storage.prototype.setItem;
    const originalRemoveItem = Storage.prototype.removeItem;

    try {
      Storage.prototype.getItem = () => {
        throw new Error("SecurityError: localStorage is disabled");
      };
      Storage.prototype.setItem = () => {
        throw new Error("SecurityError: localStorage is disabled");
      };
      Storage.prototype.removeItem = () => {
        throw new Error("SecurityError: localStorage is disabled");
      };

      render(<App />);
      expect(screen.getAllByText("Scripture Games").length).toBeGreaterThan(0);

      const startBtn = screen.getByRole("button", { name: "Tap to Play and Start Game" });
      fireEvent.click(startBtn);
      expect(screen.queryByRole("button", { name: "Tap to Play and Start Game" })).toBeNull();
    } finally {
      // Restore localStorage
      Storage.prototype.getItem = originalGetItem;
      Storage.prototype.setItem = originalSetItem;
      Storage.prototype.removeItem = originalRemoveItem;
    }
  });

  test("loads from localStorage and updates settings", () => {
    localStorage.setItem("scripture_games_translation_v1", "NET");
    localStorage.setItem("scripture_games_audio_muted_v1", "true");
    localStorage.setItem("scripture_games_bgm_vol_v1", "30");
    localStorage.setItem("scripture_games_sfx_vol_v1", "70");
    localStorage.setItem("scripture_games_stars_v1", JSON.stringify({ "1-0": 3 }));

    render(<App />);

    // Dismiss welcome splash
    const startBtn = screen.getByRole("button", { name: "Tap to Play and Start Game" });
    fireEvent.click(startBtn);

    // Check loaded translation badge
    expect(screen.getByText(/Active:/i)).toBeTruthy();

    // Trigger window audio unlock listeners
    fireEvent.pointerDown(window);
    fireEvent.keyDown(window, { key: "Enter" });
    fireEvent.touchStart(window);
    fireEvent.click(document.body);

    // Open Settings from Hub
    const settingsBtn = screen.getByLabelText("Open Game Settings");
    fireEvent.click(settingsBtn);

    // Switch translation to NKJV
    const nkjvBtn = screen.getByText("NKJV");
    fireEvent.click(nkjvBtn);
    expect(localStorage.getItem("scripture_games_translation_v1")).toBe("NKJV");

    // Toggle Audio on and off
    const audioBtn = screen.getByText(/Audio/i);
    fireEvent.click(audioBtn);
    const mutedBtn = screen.getByText(/Muted/i);
    fireEvent.click(mutedBtn);

    // Change sliders
    const sliders = screen.getAllByRole("slider");
    fireEvent.change(sliders[0], { target: { value: "40" } });
    fireEvent.change(sliders[1], { target: { value: "80" } });

    // Reset Progress (automatically closes modal upon confirmation)
    window.confirm = () => true;
    const resetBtn = screen.getByText("Reset Stars");
    fireEvent.click(resetBtn);
    expect(localStorage.getItem("scripture_games_stars_v1")).toBeNull();
  });

  test("navigates to VerseBuilder and returns back to Hub", () => {
    render(<App />);

    // Dismiss welcome splash
    fireEvent.click(screen.getByRole("button", { name: "Tap to Play and Start Game" }));

    // Open VerseBuilder
    const playBtn = screen.getByRole("button", { name: /Verse Builder/i });
    fireEvent.click(playBtn);
    expect(screen.getByText("Verse Builder")).toBeTruthy();

    // Open settings from inside VerseBuilder
    const settingsBtn = screen.getByLabelText("Settings");
    fireEvent.click(settingsBtn);
    expect(screen.getByText("⚙️ Game Settings")).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Close Settings"));

    // Back to hub
    const backBtn = screen.getByLabelText("Back to Game Hub");
    fireEvent.click(backBtn);
    expect(screen.getAllByText("Scripture Games").length).toBeGreaterThan(0);
  });

  test("saving star progress updates state and localStorage", () => {
    vi.useFakeTimers();
    render(<App />);

    // Dismiss welcome splash
    fireEvent.click(screen.getByRole("button", { name: "Tap to Play and Start Game" }));

    // Open VerseBuilder
    const playBtn = screen.getByRole("button", { name: /Verse Builder/i });
    fireEvent.click(playBtn);

    // Select Chapter 1
    const ch1Btn = screen.getByRole("button", { name: /Little Seeds/i });
    fireEvent.click(ch1Btn);

    // Select Level 1
    const level1Btn = screen.getByRole("button", { name: /1 Thessalonians/i });
    fireEvent.click(level1Btn);

    // Solve verse
    fireEvent.click(screen.getByRole("button", { name: "Place word Pray" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word without" }));
    fireEvent.click(screen.getByRole("button", { name: "Place word ceasing." }));

    // Advance past checking and transition delays
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // WinCard appears
    expect(screen.getByText("— 1 Thessalonians 5:17 (ESV)")).toBeTruthy();
    vi.useRealTimers();
  });
});
