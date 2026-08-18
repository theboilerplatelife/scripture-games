import { describe, test, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { beforeAll } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import * as matchers from "vitest-axe/matchers";
import { WelcomeSplash } from "../../src/components/common/WelcomeSplash.jsx";
import { SettingsModal } from "../../src/components/common/SettingsModal.jsx";
import { CompletionCard } from "../../src/components/common/CompletionCard.jsx";
import { GameHub } from "../../src/games/hub/GameHub.jsx";
import { VerseBuilder } from "../../src/games/verse-builder/VerseBuilder.jsx";
import { WinCard } from "../../src/games/verse-builder/WinCard.jsx";
import { MemoryMatch } from "../../src/games/memory-match/MemoryMatch.jsx";
import { MMWinCard } from "../../src/games/memory-match/MMWinCard.jsx";
import { StorySequencer } from "../../src/games/story-sequencer/StorySequencer.jsx";
import { StoryWinCard } from "../../src/games/story-sequencer/StoryWinCard.jsx";
import { StoryReaderModal } from "../../src/games/story-sequencer/StoryReaderModal.jsx";
import { CHAPTERS } from "../../src/data/chapters.js";
import { DECKS } from "../../src/games/memory-match/matchData.js";
import { STORIES } from "../../src/games/story-sequencer/storyData.js";
import { SequencerBoard } from "../../src/games/story-sequencer/SequencerBoard.jsx";
import { MemoryBoard } from "../../src/games/memory-match/MemoryBoard.jsx";
import { buildDeck } from "../../src/games/memory-match/matchData.js";

expect.extend(matchers);

/*
 * Constitution Gate: Accessibility (Article 4.3)
 * Runs axe-core over every major screen. color-contrast is checked
 * separately in design-system.test.js (jsdom cannot compute it reliably)
 * and `region` is off because screens are app fragments, not documents.
 */
const AXE_OPTIONS = {
  rules: {
    "color-contrast": { enabled: false },
    region: { enabled: false },
  },
};

const noop = () => {};

/* ------------------------------------------------------------------
   Rendered contrast: jsdom has no layout engine, so axe's colour-contrast
   rule cannot run — which is how a 2:1 hint button and 4.25:1 slot text
   shipped. jsdom does resolve the cascade though, so loading the real
   stylesheets lets every audited state be measured against the background
   it actually composites onto, ancestors and alpha included.
   ------------------------------------------------------------------ */
const CSS_FILES = [
  "src/games/hub/hub.css",
  "src/games/verse-builder/verse-builder.css",
  "src/games/memory-match/memory-match.css",
  "src/games/story-sequencer/story-sequencer.css",
  "src/components/common/welcome-splash.css",
];

let DESK = [201, 160, 107, 1];

beforeAll(() => {
  const root = path.resolve(__dirname, "../..");
  const appCode = fs.readFileSync(path.join(root, "src/App.jsx"), "utf8");
  const globalCss = appCode.slice(
    appCode.indexOf("const globalCss = `") + "const globalCss = `".length,
    appCode.lastIndexOf("`;")
  );

  const tokens = {};
  for (const m of globalCss.matchAll(/(--[\w-]+):\s*([^;]+);/g)) tokens[m[1]] = m[2].trim();

  let css = [globalCss, ...CSS_FILES.map((f) => fs.readFileSync(path.join(root, f), "utf8"))].join("\n");
  // jsdom does not resolve custom properties, so fold them in first
  for (let pass = 0; pass < 3; pass += 1) {
    css = css.replace(/var\((--[\w-]+)(?:,\s*([^)]+))?\)/g, (all, name, fallback) =>
      tokens[name] || fallback || all
    );
  }

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  DESK = parseColour(tokens["--kraft"]) || DESK;
});

function parseColour(value) {
  if (!value) return null;
  const hex = value.trim().match(/^#([0-9a-fA-F]{6})$/);
  if (hex) return [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16)).concat(1);
  const rgb = value.match(/rgba?\(([^)]+)\)/);
  if (!rgb) return null;
  const parts = rgb[1].split(",").map((n) => parseFloat(n));
  return [parts[0], parts[1], parts[2], parts.length > 3 ? parts[3] : 1];
}

function composite(top, bottom) {
  return [0, 1, 2].map((i) => Math.round(top[i] * top[3] + bottom[i] * (1 - top[3]))).concat(1);
}

function luminance([r, g, b]) {
  const [rr, gg, bb] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// The colour a piece of text is actually drawn on: every translucent layer
// between it and the desk, composited in order
function groundUnder(el) {
  const layers = [];
  let node = el;
  while (node && node.nodeType === 1) {
    const colour = parseColour(getComputedStyle(node).backgroundColor);
    if (colour && colour[3] > 0) {
      layers.push(colour);
      if (colour[3] === 1) break;
    }
    node = node.parentElement;
  }
  return layers.reduceRight((ground, layer) => composite(layer, ground), DESK);
}

function contrastFailures(container) {
  const failures = [];
  container.querySelectorAll("*").forEach((el) => {
    if (el.closest("[aria-hidden='true']") || el.tagName === "SVG") return;
    const text = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join("");
    // Emoji carry no meaning here and are exempt from contrast rules
    if (!text || !/[a-zA-Z0-9]/.test(text)) return;

    const styles = getComputedStyle(el);
    const colour = parseColour(styles.color);
    if (!colour) return;

    const size = parseFloat(styles.fontSize) || 16;
    const required = size >= 18 ? 3 : 4.5;
    const ground = groundUnder(el);
    const ratio = contrast(colour, ground);
    if (ratio < required) {
      const hex = (c) => "#" + c.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
      failures.push(
        `${el.className || el.tagName} "${text.slice(0, 32)}" — ${ratio.toFixed(2)}:1 (${hex(colour)} on ${hex(ground)}), needs ${required}:1`
      );
    }
  });
  return [...new Set(failures)];
}

// Every class this suite has actually put on screen. A screen audited only in
// its resting state hides whatever its interactions look like, so the last
// test in this file checks that each state in the design system appears here.
const auditedClasses = new Set();

function recordClasses(container) {
  container.querySelectorAll("[class]").forEach((el) => {
    el.classList.forEach((cls) => auditedClasses.add(cls));
  });
}

async function auditDom(container) {
  recordClasses(container);
  expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  expect(contrastFailures(container)).toEqual([]);
}

async function expectAccessible(ui) {
  const { container, unmount } = render(ui);
  await auditDom(container);
  unmount();
}

describe("Constitution Gate: Accessibility (Article 4.3)", () => {
  test("welcome splash and game hub", async () => {
    await expectAccessible(<WelcomeSplash onStart={noop} />);
    await expectAccessible(
      <GameHub onSelectGame={noop} onOpenSettings={noop} translation="ESV" allStars={{ "1-0": 3, "mm-1-0": 2, "ss-1": 3 }} />
    );
  });

  test("settings modal dialog", async () => {
    await expectAccessible(
      <SettingsModal
        isOpen={true}
        onClose={noop}
        translation="ESV"
        onSelectTranslation={noop}
        musicOn={true}
        onToggleMusic={noop}
        bgmVol={25}
        onChangeBgmVol={noop}
        sfxVol={50}
        onChangeSfxVol={noop}
        onResetProgress={noop}
      />
    );
  });

  test("verse builder screens", async () => {
    const props = {
      stars: { "1-0": 2 },
      onSaveStar: noop,
      translation: "ESV",
      onBackToHub: noop,
      onOpenSettings: noop,
    };
    await expectAccessible(<VerseBuilder {...props} initialScreen="chapters" />);
    await expectAccessible(<VerseBuilder {...props} initialScreen="levels" />);
    await expectAccessible(<VerseBuilder {...props} initialScreen="play" />);
    await expectAccessible(
      <WinCard
        verse={CHAPTERS[0].verses[0]}
        earnedStars={3}
        bestStars={3}
        isNewBest={true}
        translation="ESV"
        hasNextLevel={true}
        onReplay={noop}
        onNext={noop}
        onBackToLevels={noop}
        onBackToChapters={noop}
      />
    );
  });

  test("memory match screens", async () => {
    const props = {
      stars: { "mm-1-0": 2 },
      onSaveStar: noop,
      translation: "ESV",
      onBackToHub: noop,
      onOpenSettings: noop,
    };
    await expectAccessible(<MemoryMatch {...props} initialScreen="chapters" />);
    await expectAccessible(<MemoryMatch {...props} initialScreen="modes" />);
    await expectAccessible(<MemoryMatch {...props} initialScreen="play" initialModeIdx={0} initialSeed={0} />);
    await expectAccessible(
      <MMWinCard
        deck={DECKS[0]}
        modeIdx={0}
        earnedStars={2}
        bestStars={3}
        isNewBest={false}
        misses={2}
        isDeckComplete={false}
        returnsToModes={false}
        onReplay={noop}
        onNext={noop}
        onBackToModes={noop}
        onBackToDecks={noop}
      />
    );
  });

  test("story sequencer screens", async () => {
    const props = {
      stars: { "ss-1": 2 },
      onSaveStars: noop,
      onBackToHub: noop,
      onOpenSettings: noop,
    };
    await expectAccessible(<StorySequencer {...props} />);
    await expectAccessible(
      <StoryWinCard
        story={STORIES[0]}
        earnedStars={3}
        attempts={1}
        hasNextStory={true}
        onPlayAgain={noop}
        onReadStory={noop}
        onNextStory={noop}
        onBackToStories={noop}
      />
    );
    await expectAccessible(<StoryReaderModal story={STORIES[0]} onClose={noop} />);
  });

  test("story sequencer mid-play states", async () => {
    const story = STORIES[0];
    const { container, unmount } = render(
      <SequencerBoard story={story} seed={3} onBackToStories={noop} onComplete={noop} />
    );

    // A card picked up, and the slot holding it
    const cards = () => [...container.querySelectorAll(".ss-event-card")];
    fireEvent.click(cards()[0]);
    await auditDom(container);

    // The hint: one card called out, its destination marked
    fireEvent.click(screen.getByLabelText(/Get a hint/));
    await auditDom(container);

    // A checked order, with right and wrong placements marked
    fireEvent.click(screen.getByRole("button", { name: "Check timeline order" }));
    await auditDom(container);
    unmount();
  });

  test("memory match mid-play states", async () => {
    const deck = DECKS[0];
    const cardDeck = buildDeck(deck, 0, "ESV", 0);
    const { container, unmount } = render(
      <MemoryBoard deck={deck} modeIdx={0} translation="ESV" seed={0} onBackToModes={noop} onComplete={noop} />
    );
    const cards = () => [...container.querySelectorAll(".mm-card")];
    const indexesOf = (pairId) =>
      cardDeck.map((c, i) => ({ c, i })).filter(({ c }) => c.pairId === pairId).map(({ i }) => i);

    // Two cards face up that do not match
    fireEvent.click(cards()[indexesOf(0)[0]]);
    fireEvent.click(cards()[indexesOf(1)[0]]);
    await new Promise((resolve) => setTimeout(resolve, 700));
    await auditDom(container);

    // A matched pair, stickered and locked
    const [a, b] = indexesOf(2);
    fireEvent.click(cards()[a]);
    fireEvent.click(cards()[b]);
    await new Promise((resolve) => setTimeout(resolve, 700));
    await auditDom(container);
    unmount();
  });

  test("verse builder mid-play states", async () => {
    const { container, unmount } = render(
      <VerseBuilder
        stars={{}}
        onSaveStar={noop}
        translation="ESV"
        onBackToHub={noop}
        onOpenSettings={noop}
        initialScreen="play"
      />
    );
    // A word scrap placed on the notebook strip
    fireEvent.click(screen.getByRole("button", { name: "Place word Pray" }));
    await auditDom(container);
    unmount();
  });

  test("settings dialog with audio switched off", async () => {
    await expectAccessible(
      <SettingsModal
        isOpen={true}
        onClose={noop}
        translation="ESV"
        onSelectTranslation={noop}
        musicOn={false}
        onToggleMusic={noop}
        bgmVol={25}
        onChangeBgmVol={noop}
        sfxVol={50}
        onChangeSfxVol={noop}
        onResetProgress={noop}
      />
    );
  });

  test("completed and perfect progress marks", async () => {
    const perfect = Object.fromEntries([0, 1, 2, 3, 4, 5, 6, 7].map((l) => [`1-${l}`, 3]));
    await expectAccessible(
      <VerseBuilder
        stars={perfect}
        onSaveStar={noop}
        translation="ESV"
        onBackToHub={noop}
        onOpenSettings={noop}
        initialScreen="chapters"
      />
    );
  });

  test("every state in the design system gets audited, not just resting screens", () => {
    // A screen audited only at rest hides what its interactions look like —
    // the sequencer's play board was never audited, and had nested buttons.
    // Any state the stylesheets define must appear in a rendered DOM above.
    const cssFiles = [
      "src/games/hub/hub.css",
      "src/games/verse-builder/verse-builder.css",
      "src/games/memory-match/memory-match.css",
      "src/games/story-sequencer/story-sequencer.css",
      "src/components/common/welcome-splash.css",
    ].map((f) => fs.readFileSync(path.resolve(__dirname, "../..", f), "utf8"));

    const appCode = fs.readFileSync(path.resolve(__dirname, "../../src/App.jsx"), "utf8");
    cssFiles.push(appCode.slice(appCode.indexOf("const globalCss")));

    // States only reachable mid-animation, which a static render cannot hold
    const TRANSIENT = new Set(["pop", "shake", "writing"]);

    const states = new Set();
    cssFiles.forEach((css) => {
      for (const m of css.matchAll(/\.[\w-]+\.([\w-]+)/g)) {
        if (!TRANSIENT.has(m[1])) states.add(m[1]);
      }
    });

    const unaudited = [...states].filter((state) => !auditedClasses.has(state)).sort();
    expect(unaudited).toEqual([]);
  });

  test("every game module is covered by this suite", () => {
    // A new game must not ship without its screens being audited here
    const gamesDir = path.resolve(__dirname, "../../src/games");
    const suite = fs.readFileSync(__filename, "utf8");
    fs.readdirSync(gamesDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .forEach((entry) => {
        expect(
          suite.includes(`src/games/${entry.name}/`),
          `src/games/${entry.name} has no screens in the accessibility suite`
        ).toBe(true);
      });
  });

  test("completion celebration card", async () => {
    await expectAccessible(
      <CompletionCard
        icon="🌱"
        title="Chapter 1 Complete!"
        cheer="Great job!"
        nextLabel="Next Chapter →"
        onNext={noop}
        selectLabel="Chapter Select"
        onSelect={noop}
        onBackToHub={noop}
      />
    );
  });
});
