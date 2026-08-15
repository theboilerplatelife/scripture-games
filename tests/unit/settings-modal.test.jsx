import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SettingsModal } from "../../src/components/common/SettingsModal.jsx";

describe("SettingsModal Component Tests", () => {
  test("returns null when isOpen is false", () => {
    const { container } = render(<SettingsModal isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  test("renders modal and handles actions when isOpen is true", () => {
    const handleClose = vi.fn();
    const handleSelectTranslation = vi.fn();
    const handleToggleMusic = vi.fn();
    const handleChangeBgmVol = vi.fn();
    const handleChangeSfxVol = vi.fn();
    const handleResetProgress = vi.fn();
    const handleTestEnding = vi.fn();

    // 1. Initial render with audio ON
    const { rerender } = render(
      <SettingsModal
        isOpen={true}
        onClose={handleClose}
        translation="ESV"
        onSelectTranslation={handleSelectTranslation}
        musicOn={true}
        onToggleMusic={handleToggleMusic}
        bgmVol={25}
        onChangeBgmVol={handleChangeBgmVol}
        sfxVol={50}
        onChangeSfxVol={handleChangeSfxVol}
        onResetProgress={handleResetProgress}
        onTestEnding={handleTestEnding}
      />
    );

    expect(screen.getByText("⚙️ Game Settings")).toBeTruthy();

    // Select translation
    const netButton = screen.getByText("NET");
    fireEvent.click(netButton);
    expect(handleSelectTranslation).toHaveBeenCalledWith("NET");

    // Toggle master audio
    const audioToggle = screen.getByText("🔊 Audio On");
    fireEvent.click(audioToggle);
    expect(handleToggleMusic).toHaveBeenCalled();

    // Change volume sliders
    const sliders = screen.getAllByRole("slider");
    fireEvent.change(sliders[0], { target: { value: "35" } });
    expect(handleChangeBgmVol).toHaveBeenCalledWith(35);

    fireEvent.change(sliders[1], { target: { value: "60" } });
    expect(handleChangeSfxVol).toHaveBeenCalledWith(60);

    // Reset Progress - user cancels
    window.confirm = () => false;
    const resetBtn = screen.getByText("Reset Stars");
    fireEvent.click(resetBtn);
    expect(handleResetProgress).not.toHaveBeenCalled();

    // Reset Progress - user confirms
    window.confirm = () => true;
    fireEvent.click(resetBtn);
    expect(handleResetProgress).toHaveBeenCalled();

    // Test ending jump button
    const testEndingBtn = screen.getByText("⚡ Jump to Ch.15 Ending");
    fireEvent.click(testEndingBtn);
    expect(handleTestEnding).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();

    // 2. Rerender with audio MUTED and optional props omitted
    rerender(
      <SettingsModal
        isOpen={true}
        onClose={handleClose}
        translation="WEB"
        onSelectTranslation={handleSelectTranslation}
        musicOn={false}
        onToggleMusic={handleToggleMusic}
        bgmVol={0}
        onChangeBgmVol={handleChangeBgmVol}
        sfxVol={0}
        onChangeSfxVol={handleChangeSfxVol}
      />
    );

    expect(screen.getByText("🔇 Muted")).toBeTruthy();
  });
});
