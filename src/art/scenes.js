/* The scene registry: every card in the app looks itself up here.

   Story cards are keyed "{storyId}-{step}", verses by their reference,
   so one map answers for both games. A key with no drawing yet falls
   back to the shared themed artwork in PairIllustration; once every
   card has its own scene that fallback goes away. */
import { VOLUME_1 } from "./stories/volume-1.jsx";
import { VOLUME_2 } from "./stories/volume-2.jsx";

export const SCENES = {
  ...VOLUME_1,
  ...VOLUME_2,
};
