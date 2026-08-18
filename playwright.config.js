import { defineConfig, devices } from "@playwright/test";

/* Browser-level accessibility gate. jsdom has no rendering engine, so the
   Vitest suite cannot see overlap, clipping, focus visibility, or axe's own
   colour-contrast rule — this runs the built app in real Chromium instead. */
export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? "list" : [["list"]],
  use: {
    baseURL: "http://localhost:4173",
    trace: "retain-on-failure",
    // Audit settled states: the app honours this, and axe would otherwise
    // sample colours mid-transition
    reducedMotion: "reduce",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    // The audience plays on tablets, where layout and touch targets differ.
    // A Chromium tablet viewport keeps CI to one browser download.
    {
      name: "tablet",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 820, height: 1180 },
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
