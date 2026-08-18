import { PORTRAITS } from "./portraits.jsx";
import { HeldScroll } from "./portrait-kit.jsx";
import { portraitOf } from "../data/authorship.js";

/* The face beside a verse: the person who wrote or spoke it, drawn in
   the setting of the book it comes from (Constitution Article 1.5).

   A few verses have a pose of their own — the armour chapter draws Paul
   holding the piece each verse names — so the lookup tries the verse
   first and falls back to the writer's portrait for that book. */
export function Portrait({ verseRef, size = 64 }) {
  const key = portraitOf(verseRef);
  const draw = PORTRAITS[`${key}#${verseRef}`] || PORTRAITS[key] || unknownWriter;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      {draw()}
    </svg>
  );
}

/* A reference the authorship table does not know. A gate forbids this for
   real verses; it draws a bare scroll rather than putting the words in
   some innocent person's mouth. */
function unknownWriter() {
  return <HeldScroll x={30} y={40} scale={1.6} flip={1} />;
}
