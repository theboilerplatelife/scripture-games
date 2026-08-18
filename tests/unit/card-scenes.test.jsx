import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { SCENES } from "../../src/art/scenes.js";
import { PairIllustration } from "../../src/games/memory-match/PairIllustration.jsx";
import { STORIES } from "../../src/games/story-sequencer/storyData.js";
import { CHAPTERS } from "../../src/data/chapters.js";
import * as Staging from "../../src/art/staging.jsx";

/* Every card in the app carries its own hand-drawn scene. These checks
   keep the drawings honest: each one must actually draw something, no
   two may be the same picture, and none may be left orphaned in the
   registry with no card to sit behind. */

function draw(scene) {
  const { container, unmount } = render(<PairIllustration scene={scene} />);
  const svg = container.querySelector("svg");
  const markup = svg ? svg.innerHTML : "";
  unmount();
  return markup;
}

describe("hand-drawn card scenes", () => {
  test("every registered scene draws a real picture", () => {
    Object.keys(SCENES).forEach((key) => {
      const markup = draw(key);
      // A scene that renders a sky and nothing else is a placeholder
      expect(markup.length, `scene "${key}" draws almost nothing`).toBeGreaterThan(400);
      expect(markup, `scene "${key}" has no shapes`).toMatch(/<(path|circle|rect|ellipse|g)\b/);
    });
  });

  test("no two scenes are the same picture", () => {
    const seen = new Map();
    Object.keys(SCENES).forEach((key) => {
      // Gradient ids differ per instance; the shapes are what must differ
      const shape = draw(key).replace(/id="[^"]*"/g, "").replace(/url\(#[^)]*\)/g, "");
      const twin = seen.get(shape);
      expect(twin, `scenes "${key}" and "${twin}" are the same drawing`).toBe(undefined);
      seen.set(shape, key);
    });
  });

  test("every drawn scene belongs to a card that exists", () => {
    // An orphan key is a drawing nobody will ever see — usually a typo
    // in a story id or a verse reference
    const cardKeys = new Set([
      ...STORIES.flatMap((story) => story.events.map((event) => `${story.id}-${event.step}`)),
      ...CHAPTERS.flatMap((chapter) => chapter.verses.map((verse) => verse.ref)),
    ]);
    Object.keys(SCENES).forEach((key) => {
      expect(cardKeys.has(key), `scene "${key}" has no card`).toBe(true);
    });
  });

  test("every staging piece draws something on its own", () => {
    // The kit is shared by all three hundred scenes: a piece that renders
    // nothing would quietly empty every card that reaches for it. One
    // superset of props covers the lot — each piece takes what it needs.
    const props = {
      id: "t", x: 40, y: 40, r: 12, w: 20, h: 16, scale: 1, flip: 1,
      seed: 2, count: 4, size: 1.5, sway: 8, points: "L 40 40 L 80 80",
      top: Staging.C.dawn, bottom: Staging.C.noon, color: Staging.C.sun,
      ray: Staging.C.sunRay, fill: Staging.C.grass, crest: Staging.C.foam,
      petal: Staging.C.blossom, heart: Staging.C.gold, canopy: Staging.C.leaf,
      shade: Staging.C.leafDeep, trunk: Staging.C.earth, frond: Staging.C.leaf,
      wall: Staging.C.stone, roof: Staging.C.stoneDeep, cloth: Staging.C.cloth,
      body: Staging.C.wood, rim: Staging.C.woodDeep, sheet: Staging.C.cloth,
      rod: Staging.C.wood, hull: Staging.C.wood, sail: Staging.C.cloth,
      coat: Staging.C.sandDeep, hide: Staging.C.earthDeep,
    };
    Object.entries(Staging)
      .filter(([, piece]) => typeof piece === "function")
      .forEach(([name, Piece]) => {
        const { container, unmount } = render(
          <svg>
            <Piece {...props}>
              <circle cx="1" cy="1" r="1" />
            </Piece>
          </svg>
        );
        expect(container.innerHTML, `staging piece ${name} drew nothing`).toMatch(
          /<(path|circle|rect|ellipse|line|g|svg)\b/
        );
        unmount();
      });
  });

  test("a card with no drawing yet still gets themed artwork", () => {
    const markup = draw("not-drawn-yet");
    expect(markup).toMatch(/<(path|circle|rect)\b/);
  });
});
