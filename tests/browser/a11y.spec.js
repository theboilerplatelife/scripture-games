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
