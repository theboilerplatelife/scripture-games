import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Buddy } from "../../src/components/common/Buddy.jsx";
import { Star } from "../../src/components/common/Star.jsx";
import { Confetti } from "../../src/components/common/Confetti.jsx";
import { Pencil } from "../../src/components/common/Pencil.jsx";
import { WelcomeSplash } from "../../src/components/common/WelcomeSplash.jsx";

describe("Common Components Tests", () => {
  test("Buddy renders every hair style and accessory variant", () => {
    // 1. Crown + beard
    const { container: solomon } = render(<Buddy who="solomon" size={64} />);
    expect(solomon.querySelector("polygon")).toBeTruthy();

    // 2. Wrap / veil (no beard)
    const { container: esther } = render(<Buddy who="esther" size={64} />);
    expect(esther.querySelector("svg")).toBeTruthy();

    // 3. Headband (explicit band and default)
    const { container: timothy } = render(<Buddy who="timothy" size={64} />);
    expect(timothy.querySelector("svg")).toBeTruthy();
    const { container: deborah } = render(<Buddy who="deborah" size={64} />);
    expect(deborah.querySelector("svg")).toBeTruthy();

    // 4. Curly hair
    const { container: samuel } = render(<Buddy who="samuel" size={64} />);
    expect(samuel.querySelector("svg")).toBeTruthy();

    // 5. Side hair + beard
    const { container: paul } = render(<Buddy who="paul" size={64} />);
    expect(paul.querySelector("svg")).toBeTruthy();

    // 6. Wrap with default and custom wrap
    const { container: hannah } = render(<Buddy who="hannah" size={64} />);
    expect(hannah.querySelector("svg")).toBeTruthy();

    // 6. Unknown / fallback character
    const { container: unknown } = render(<Buddy who="unknown_character" size={48} />);
    expect(unknown.querySelector("svg")).toBeTruthy();

    // 7. Default size prop
    const { container: defaultSize } = render(<Buddy who="ruth" />);
    expect(defaultSize.querySelector("svg")).toBeTruthy();
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
    const { rerender } = render(<WelcomeSplash onStart={handleStart} translation="ESV" />);

    expect(screen.getByText("Scripture Games")).toBeTruthy();
    expect(screen.getByText("Tap to Play")).toBeTruthy();
    expect(screen.getByText("📖 ESV")).toBeTruthy();

    const playBtn = screen.getByRole("button", { name: "Tap to Play and Start Game" });
    fireEvent.click(playBtn);
    expect(handleStart).toHaveBeenCalled();

    // Default translation prop fallback
    rerender(<WelcomeSplash onStart={handleStart} />);
    expect(screen.getByText("📖 ESV")).toBeTruthy();
  });
});
