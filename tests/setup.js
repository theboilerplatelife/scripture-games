/* jsdom has no layout engine, so the scrolling APIs the app legitimately
   calls are unimplemented and each call prints a "Not implemented: Window's
   scrollTo() method" error. That is 124 lines of noise per run, which buries
   real failures.

   Stub them here as plain functions: tests that care still spy on them with
   vi.spyOn, and whether scrolling actually works is checked where it can be —
   the real-browser gate in tests/browser/a11y.spec.js. */
window.scrollTo = () => {};
