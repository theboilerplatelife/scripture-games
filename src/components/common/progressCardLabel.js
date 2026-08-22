/* The accessible name of a progress card — a chapter, deck, volume or
   collection on a game's list screen.

   It lives here because the completion stamp is decorative
   (`aria-hidden`), so whatever it shows has to be spoken by the card
   itself or a screen-reader user never learns the card is finished. Three
   of the four games had no such mention at all, and Verse Builder's card
   carried no label of its own, so its name was whatever its text happened
   to concatenate to. */
export function progressCardLabel({ noun, id, title, unlocked, complete, perfect }) {
  const name = `${noun} ${id}: ${unlocked ? title : "Locked"}`;
  if (perfect) return `${name} (completed with every star)`;
  if (complete) return `${name} (completed)`;
  return name;
}
