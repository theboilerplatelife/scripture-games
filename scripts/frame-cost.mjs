/* What it costs to draw, screen by screen.

   Idle frame rate says almost nothing: every screen sits at 61fps doing
   nothing. What matters is the frames where something moves — a card
   swapping places, a scrap landing in a slot — because a filtered element
   re-rasterises on every one of them. That is how an eight-shadow outline
   in Story Sequencer turned a tap into an 868ms frame while the idle
   measurement showed a perfect 61fps.

   Needs a preview server: npm run build && npx vite preview --port 4173
   Then: node scripts/frame-cost.mjs [cpuThrottle]

   Reports the worst single frame and how many exceeded 32ms (two dropped
   frames at 60Hz). Under about 20ms everywhere is healthy.
*/
import { chromium } from "@playwright/test";

const b = await chromium.launch();
const throttle = Number(process.argv[2] || 1);

async function measure(label, setup, interact) {
  const p = await b.newPage({ viewport: { width: 900, height: 1000 } });
  if (throttle > 1) {
    const cdp = await p.context().newCDPSession(p);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: throttle });
  }
  await setup(p);
  await p.waitForTimeout(600);
  await p.evaluate(() => {
    window.__f = [];
    let last = performance.now();
    (function tick(t) { window.__f.push(t - last); last = t; requestAnimationFrame(tick); })(performance.now());
  });
  const t0 = Date.now();
  await interact(p);
  const wall = Date.now() - t0;
  const s = await p.evaluate(() => {
    const f = window.__f.slice(5);
    return { slow: f.filter((d) => d > 32).length, worst: Math.round(Math.max(...f)) };
  });
  console.log(`${label.padEnd(30)} ${String(wall).padStart(5)}ms | slow frames ${String(s.slow).padStart(2)} | worst ${String(s.worst).padStart(3)}ms`);
  await p.close();
}

const go = (hash) => async (p) => { await p.goto("http://localhost:4173/" + hash); await p.waitForTimeout(300); };
const scroll = async (p) => {
  for (let i = 0; i < 10; i += 1) { await p.mouse.wheel(0, i % 2 ? -400 : 400); await p.waitForTimeout(90); }
};

await measure("hub — scrolling", go("#/"), scroll);
await measure("verse builder — chapters", go("#/verse-builder"), scroll);
await measure("verse builder — levels", go("#/verse-builder/1"), scroll);
// Place two words and take them back, repeatedly — never completing the
// verse, so the board keeps animating rather than winning
await measure("verse builder — placing words", go("#/verse-builder/1/1"), async (p) => {
  for (let round = 0; round < 5; round += 1) {
    for (const w of ["Pray", "without"]) {
      await p.getByRole("button", { name: `Place word ${w}` }).click({ timeout: 3000 }).catch(() => {});
      await p.waitForTimeout(110);
    }
    await p.getByRole("button", { name: /Clear/ }).click({ timeout: 3000 }).catch(() => {});
    await p.waitForTimeout(160);
  }
});
await measure("memory match — modes", go("#/memory-match/1"), scroll);
await measure("story sequencer — stories", go("#/story-sequencer/1"), scroll);
await measure("verse builder — win card", async (p) => {
  await p.goto("http://localhost:4173/#/verse-builder/1/1");
  await p.waitForSelector(".vb-scrap-btn");
  for (const w of ["Pray", "without", "ceasing."]) {
    await p.getByRole("button", { name: `Place word ${w}` }).click();
  }
  await p.waitForSelector(".vb-win-cheer");
}, async (p) => { await p.waitForTimeout(2500); });
await b.close();
