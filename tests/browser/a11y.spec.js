import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/*
 * Constitution Gate: Accessibility (Article 4.3) — in a real browser.
 *
 * The Vitest suite audits structure and computes contrast by hand because
 * jsdom cannot paint. This one runs the built app in Chromium with every axe
 * rule enabled, including colour-contrast, which is the check that repeatedly
 * caught nothing while unreadable text shipped.
 */

// Transitions make colour sampling non-deterministic — a button caught
// halfway through its hover fade reads as a contrast failure that no user
// ever sees. Freeze them before anything is measured.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const freeze = document.createElement("style");
    freeze.textContent = "*, *::before, *::after { transition: none !important; animation: none !important; }";
    document.addEventListener("DOMContentLoaded", () => document.head.appendChild(freeze));
  });
});

async function audit(page, label) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const summary = results.violations.map((v) => ({
    where: label,
    rule: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.slice(0, 3).map((n) => `${n.target.join(" ")} — ${n.failureSummary?.split("\n")[1]?.trim()}`),
  }));

  expect(summary, `accessibility violations on ${label}`).toEqual([]);
}

// Past the splash and into the hub
async function openHub(page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Tap to Play and Start Game" }).click();
  await expect(page.getByRole("button", { name: /Verse Builder/ })).toBeVisible();
}

test("welcome splash", async ({ page }) => {
  await page.goto("/");
  await audit(page, "welcome splash");
});

test("game hub and settings dialog", async ({ page }) => {
  await openHub(page);
  await audit(page, "game hub");

  await page.getByLabel("Open Game Settings").click();
  await expect(page.getByText("⚙️ Game Settings")).toBeVisible();
  await audit(page, "settings dialog");
});

test("verse builder, through to a placed word", async ({ page }) => {
  await openHub(page);
  await page.getByRole("button", { name: /Verse Builder/ }).click();
  await audit(page, "verse builder — chapters");

  await page.getByRole("button", { name: /Little Seeds/ }).click();
  await audit(page, "verse builder — levels");

  await page.getByRole("button", { name: /1 Thessalonians/ }).first().click();
  await audit(page, "verse builder — play board");

  await page.getByRole("button", { name: "Place word Pray" }).click();
  await audit(page, "verse builder — word placed");
});

test("memory match, through a flipped pair", async ({ page }) => {
  await openHub(page);
  await page.getByRole("button", { name: /Memory Match/ }).click();
  await audit(page, "memory match — decks");

  await page.getByRole("button", { name: /Memory Match Deck 1/ }).click();
  await audit(page, "memory match — modes");

  await page.getByRole("button", { name: /Play Hint Hunt/ }).click();
  await audit(page, "memory match — board");

  const cards = page.locator(".mm-card");
  await cards.nth(0).click();
  await cards.nth(1).click();
  await page.waitForTimeout(1200);
  await audit(page, "memory match — two cards face up");
});

test("story sequencer, through selection, hint and a checked order", async ({ page }) => {
  await openHub(page);
  await page.getByRole("button", { name: /Story Sequencer/ }).click();
  await audit(page, "story sequencer — volumes");

  await page.getByRole("button", { name: /Foundations/ }).first().click();
  await audit(page, "story sequencer — stories");

  await page.getByRole("button", { name: /Play story 1/ }).click();
  await audit(page, "story sequencer — board");

  await page.locator(".ss-event-card").first().click();
  await audit(page, "story sequencer — card picked up");

  await page.getByLabel(/Get a hint/).click();
  await audit(page, "story sequencer — hint showing");

  await page.getByRole("button", { name: "Check timeline order" }).click();
  await audit(page, "story sequencer — order checked");
});

test("a face-down card keeps its face hidden", async ({ page }) => {
  // jsdom has no 3D engine, so only a real browser can catch the flip
  // collapsing: if both faces point at the viewer the whole board sits open
  await openHub(page);
  await page.getByRole("button", { name: /Memory Match/ }).click();
  await page.getByRole("button", { name: /Memory Match Deck 1/ }).click();
  await page.getByRole("button", { name: /Play Verse Finder/ }).click();

  const card = page.locator(".mm-card").first();
  await expect(card).not.toHaveClass(/flipped/);

  const faces = await card.evaluate((el) => ({
    back: getComputedStyle(el.querySelector(".mm-card-back")).transform,
    front: getComputedStyle(el.querySelector(".mm-card-front")).transform,
  }));
  expect(faces.front, "the face must be turned away until the card is flipped").not.toBe(faces.back);
});

test("the artwork stops moving when the player asks it to", async ({ page }) => {
  // The CSS gate checks every art class is listed in the reduced-motion
  // block; only a real browser can confirm the animations actually stop —
  // and that nothing is left invisible when they do.
  const reduced = await page.context().browser().newContext({ reducedMotion: "reduce" });
  const rm = await reduced.newPage();
  await rm.goto("/");
  await rm.getByRole("button", { name: "Tap to Play and Start Game" }).click();
  await rm.getByRole("button", { name: /Memory Match/ }).click();
  await rm.getByRole("button", { name: /Memory Match Deck 1/ }).click();
  await rm.getByRole("button", { name: /Play Hint Hunt/ }).click();

  const state = await rm.evaluate(() => {
    const art = [...document.querySelectorAll('[class*="art-"]')];
    return {
      total: art.length,
      moving: art.filter((el) => getComputedStyle(el).animationName !== "none").length,
      invisible: art.filter((el) => Number(getComputedStyle(el).opacity) === 0).length,
    };
  });

  expect(state.total, "no artwork on the board to check").toBeGreaterThan(10);
  expect(state.moving, "artwork still animating under prefers-reduced-motion").toBe(0);
  expect(state.invisible, "artwork left invisible once its animation was disabled").toBe(0);
  await reduced.close();
});

test("card artwork is visible even if its entrance animation never runs", async ({ page }) => {
  // A scene that starts at opacity 0 renders nothing wherever the animation
  // does not run. Kill the animations outright and the cards must still show.
  await page.addInitScript(() => {
    const stop = document.createElement("style");
    stop.textContent = "*, *::before, *::after { animation: none !important; }";
    document.addEventListener("DOMContentLoaded", () => document.head.appendChild(stop));
  });
  await openHub(page);
  await page.getByRole("button", { name: /Story Sequencer/ }).click();
  await page.getByRole("button", { name: /Foundations/ }).first().click();
  await page.getByRole("button", { name: /Play story 1/ }).click();

  const faded = await page.evaluate(() =>
    [...document.querySelectorAll('.mm-card-bg-ill [class*="art-"]')].filter(
      (el) => Number(getComputedStyle(el).opacity) === 0
    ).length
  );
  expect(faded, "card scenes render blank without their entrance animation").toBe(0);
});

test("a dialog keeps the keyboard inside it and hands it back", async ({ page }) => {
  // aria-modal="true" is a promise about behaviour, and axe can only see the
  // attribute. Before this was enforced, Tab walked out of the settings
  // dialog onto the game cards hidden behind it, and closing dropped focus
  // on <body>.
  await openHub(page);
  await page.getByLabel("Open Game Settings").click();
  await expect(page.getByText("⚙️ Game Settings")).toBeVisible();

  const inDialog = () =>
    page.evaluate(() => document.querySelector('[role="dialog"]').contains(document.activeElement));

  expect(await inDialog(), "focus did not move into the dialog").toBe(true);

  // Walk far enough to wrap around the whole dialog twice
  for (let i = 0; i < 14; i += 1) {
    await page.keyboard.press("Tab");
    expect(await inDialog(), `Tab left the dialog after ${i + 1} presses`).toBe(true);
  }
  await page.keyboard.press("Shift+Tab");
  expect(await inDialog(), "Shift+Tab left the dialog").toBe(true);

  await page.keyboard.press("Escape");
  const returned = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
  expect(returned, "focus was not handed back to the control that opened the dialog").toBe(
    "Open Game Settings"
  );
});

test("the win card, where the player actually ends up", async ({ page }) => {
  // Every audit stopped at the play board, so the celebration screens —
  // stars, best score, stamp, confetti — had never been checked at all.
  await openHub(page);
  await page.getByRole("button", { name: /Verse Builder/ }).click();
  await page.getByRole("button", { name: /Little Seeds/ }).click();
  await page.getByRole("button", { name: /1 Thessalonians/ }).first().click();

  // "Pray without ceasing." — tapped in order, which wins the level
  for (const word of ["Pray", "without", "ceasing."]) {
    await page.getByRole("button", { name: `Place word ${word}` }).click();
  }
  // The win card shows the verse's own cheer line
  await expect(page.locator(".vb-win-cheer")).toBeVisible({ timeout: 5000 });
  await audit(page, "verse builder — win card");
});

test("a level can be finished with the keyboard alone, and focus follows the win", async ({ page }) => {
  // A keyboard trap or an unreachable control is invisible to axe: the
  // markup is fine, the operation is not.
  await openHub(page);
  await page.getByRole("button", { name: /Verse Builder/ }).click();
  await page.getByRole("button", { name: /Little Seeds/ }).click();
  await page.getByRole("button", { name: /1 Thessalonians/ }).first().click();

  const label = () =>
    page.evaluate(() => document.activeElement?.getAttribute("aria-label") || "");

  // "Pray without ceasing." — reached by Tab, placed with Enter
  let placed = 0;
  for (const word of ["Pray", "without", "ceasing."]) {
    let found = false;
    for (let i = 0; i < 30 && !found; i += 1) {
      await page.keyboard.press("Tab");
      if ((await label()) === `Place word ${word}`) {
        await page.keyboard.press("Enter");
        found = true;
        placed += 1;
      }
    }
    expect(found, `"${word}" could not be reached or placed with the keyboard`).toBe(true);
  }
  expect(placed).toBe(3);

  await expect(page.locator(".vb-win-cheer")).toBeVisible({ timeout: 5000 });
  const focusInWin = await page.evaluate(() =>
    document.querySelector(".vb-win-card")?.contains(document.activeElement)
  );
  expect(focusInWin, "the win card arrived but focus was left behind on the board").toBe(true);
});

test("story cards can be reordered with the arrow keys", async ({ page }) => {
  await openHub(page);
  await page.getByRole("button", { name: /Story Sequencer/ }).click();
  await page.getByRole("button", { name: /Foundations/ }).first().click();
  await page.getByRole("button", { name: /Play story 1/ }).click();

  // Reach the first card by Tab alone
  let reached = false;
  for (let i = 0; i < 25 && !reached; i += 1) {
    await page.keyboard.press("Tab");
    reached = await page.evaluate(() =>
      (document.activeElement?.getAttribute("aria-label") || "").startsWith("Position")
    );
  }
  expect(reached, "no story card is reachable with the keyboard").toBe(true);

  // The label carries the card's place in the timeline; moving it down
  // should raise that number by one, with focus riding along
  const read = () =>
    page.evaluate(() => {
      const label = document.activeElement?.getAttribute("aria-label") || "";
      const [, position] = label.match(/^Position (\d+)/) || [];
      return { position: Number(position), card: label.slice(label.indexOf(":") + 1, 40) };
    });

  const before = await read();
  await page.keyboard.press("ArrowDown");
  const after = await read();

  expect(after.position, "ArrowDown did not move the focused card down the timeline").toBe(
    before.position + 1
  );
  expect(after.card, "focus did not travel with the card it moved").toBe(before.card);
});

test("memory match cards flip from the keyboard", async ({ page }) => {
  await openHub(page);
  await page.getByRole("button", { name: /Memory Match/ }).click();
  await page.getByRole("button", { name: /Memory Match Deck 1/ }).click();
  await page.getByRole("button", { name: /Play Hint Hunt/ }).click();

  let flipped = false;
  for (let i = 0; i < 25 && !flipped; i += 1) {
    await page.keyboard.press("Tab");
    const isCard = await page.evaluate(() =>
      /^Card \d+: hidden/.test(document.activeElement?.getAttribute("aria-label") || "")
    );
    if (isCard) {
      await page.keyboard.press("Enter");
      flipped = true;
    }
  }
  expect(flipped, "no face-down card could be reached and flipped with the keyboard").toBe(true);

  // The label has to say what turned up, or the flip means nothing to a
  // player who cannot see it
  const revealed = await page.evaluate(() =>
    document.activeElement?.getAttribute("aria-label") || ""
  );
  expect(revealed).not.toMatch(/hidden/);
});

test("high contrast mode keeps the interface readable", async ({ page }) => {
  // Windows High Contrast replaces the palette wholesale. Text that relied
  // on a custom background loses it, and a focus ring drawn with filters is
  // not part of the system palette at all.
  const hc = await page.context().browser().newContext({ forcedColors: "active" });
  const hcPage = await hc.newPage();
  await hcPage.goto("/");
  await hcPage.getByRole("button", { name: "Tap to Play and Start Game" }).click();

  const results = await new AxeBuilder({ page: hcPage })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map((v) => `${v.id} (${v.nodes.length})`),
    "accessibility violations under forced colors"
  ).toEqual([]);

  await hcPage.keyboard.press("Tab");
  const outline = await hcPage.evaluate(() => {
    const s = getComputedStyle(document.activeElement);
    return { style: s.outlineStyle, width: parseFloat(s.outlineWidth) };
  });
  expect(outline.style, "focus ring is not drawn with a real outline under forced colors").not.toBe(
    "none"
  );
  expect(outline.width).toBeGreaterThanOrEqual(2);
  await hc.close();
});

test("no screen scrolls sideways on a tablet", async ({ page }) => {
  // Wide artwork, long references and four translations all push at the
  // page width. Sideways scroll is invisible in jsdom, which has no layout.
  await page.setViewportSize({ width: 820, height: 1180 });
  const screens = [
    ["hub", async () => {}],
    ["verse builder chapters", async () => page.getByRole("button", { name: /Verse Builder/ }).click()],
    ["levels", async () => page.getByRole("button", { name: /Little Seeds/ }).click()],
    ["play board", async () => page.getByRole("button", { name: /1 Thessalonians/ }).first().click()],
  ];
  await openHub(page);
  for (const [name, go] of screens) {
    await go();
    const overflow = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      win: window.innerWidth,
      widest: [...document.querySelectorAll("*")]
        .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
        .map((el) => `${el.tagName.toLowerCase()}.${el.className?.baseVal ?? el.className}`)
        .slice(0, 3),
    }));
    expect(
      overflow.doc,
      `${name} is ${overflow.doc - overflow.win}px wider than the screen: ${overflow.widest.join(", ")}`
    ).toBeLessThanOrEqual(overflow.win + 1);
  }
});

test("controls are big enough for a child's finger", async ({ page }) => {
  // WCAG 2.5.8 asks for 24px; a game for small children on a tablet wants
  // the 44px touch target. Only a laid-out page can tell us.
  await page.setViewportSize({ width: 820, height: 1180 });
  await openHub(page);
  await page.getByRole("button", { name: /Verse Builder/ }).click();
  await page.getByRole("button", { name: /Little Seeds/ }).click();

  const tooSmall = await page.evaluate(() =>
    [...document.querySelectorAll("button")]
      .filter((el) => el.offsetParent !== null)
      .map((el) => ({ label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 30), r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.width < 44 || r.height < 44)
      .map(({ label, r }) => `${label} (${Math.round(r.width)}x${Math.round(r.height)})`)
  );
  expect(tooSmall, `controls under 44px:\n${tooSmall.join("\n")}`).toEqual([]);
});

test("the address bar follows the player, and brings them back", async ({ page }) => {
  // Refreshing used to drop everyone on the splash screen. jsdom has no
  // history and no reload, so this can only be checked in a browser.
  await openHub(page);
  await page.getByRole("button", { name: /Verse Builder/ }).click();
  await page.getByRole("button", { name: /Little Seeds/ }).click();
  await page.getByRole("button", { name: /1 Thessalonians/ }).first().click();
  await expect(page).toHaveURL(/#\/verse-builder\/1\/1$/);

  const historyLength = await page.evaluate(() => history.length);

  await page.reload();
  await expect(page.locator(".vb-strip")).toBeVisible();
  await expect(page.getByRole("button", { name: "Tap to Play and Start Game" })).toHaveCount(0);

  // Back walks the screens the player came through, one press each
  await page.goBack();
  await expect(page).toHaveURL(/#\/verse-builder\/1$/);
  await expect(page.getByRole("button", { name: /1 Thessalonians/ }).first()).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/#\/verse-builder$/);
  await expect(page.getByRole("button", { name: /Little Seeds/ })).toBeVisible();

  await page.goForward();
  await expect(page.getByRole("button", { name: /1 Thessalonians/ }).first()).toBeVisible();

  // No echo: following a route must not push entries of its own
  const after = await page.evaluate(() => history.length);
  expect(
    after - historyLength,
    "navigating back and forward left extra history entries behind"
  ).toBeLessThanOrEqual(1);
});

test("a deep link into each game opens where it points", async ({ page }) => {
  for (const [url, marker] of [
    ["/#/verse-builder/2/3", ".vb-strip"],
    ["/#/memory-match/1/1", ".mm-grid"],
    ["/#/story-sequencer/1/3", ".ss-timeline-track"],
  ]) {
    await page.goto(url);
    await expect(page.locator(marker), `${url} did not open its board`).toBeVisible();
  }

  // A link to a game that no longer exists lands on the hub, not a blank page
  await page.goto("/#/not-a-game/9");
  await expect(page.getByRole("button", { name: /Verse Builder/ })).toBeVisible();
});

test("nothing scrolls the page behind an open dialog", async ({ page }) => {
  await openHub(page);
  await page.getByLabel("Open Game Settings").click();
  await expect(page.getByText("⚙️ Game Settings")).toBeVisible();

  const overflow = await page.evaluate(() => getComputedStyle(document.body).overflow);
  expect(overflow).toBe("hidden");
});

test("keyboard focus is always visible", async ({ page }) => {
  await openHub(page);

  // Walk the hub with the keyboard; every stop must show a focus treatment
  for (let stop = 0; stop < 6; stop += 1) {
    await page.keyboard.press("Tab");
    const visible = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return true;
      const styles = getComputedStyle(el);
      const outline = styles.outlineStyle !== "none" && parseFloat(styles.outlineWidth) > 0;
      // Torn-paper controls draw their ring with drop-shadow filters instead
      const filtered = styles.filter && styles.filter !== "none";
      const shadowed = styles.boxShadow && styles.boxShadow !== "none";
      return outline || filtered || shadowed;
    });
    expect(visible, "focused element has no visible focus treatment").toBe(true);
  }
});
