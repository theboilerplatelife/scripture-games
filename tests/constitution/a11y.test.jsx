import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
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
import { CHAPTERS } from "../../src/data/chapters.js";
import { DECKS } from "../../src/games/memory-match/matchData.js";

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

async function expectAccessible(ui) {
  const { container, unmount } = render(ui);
  expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  unmount();
}

describe("Constitution Gate: Accessibility (Article 4.3)", () => {
  test("welcome splash and game hub", async () => {
    await expectAccessible(<WelcomeSplash onStart={noop} />);
    await expectAccessible(
      <GameHub onSelectGame={noop} onOpenSettings={noop} translation="ESV" allStars={{ "1-0": 3, "mm-1-0": 2 }} />
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
