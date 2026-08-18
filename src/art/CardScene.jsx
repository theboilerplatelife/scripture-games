import { useId } from "react";
import { SCENES } from "./scenes.js";
import { Frame, Sky, Ridge, Tuft, C } from "./staging.jsx";

/* The picture behind a card. Every card in the app — 180 story cards
   and 120 verses — has its own drawing in the registry, looked up by
   the card's own key. */
export function CardScene({ scene, anchor }) {
  // Two cards of a pair draw the same scene, so gradient ids must be
  // unique per instance. React's id is punctuated, which a url(#...)
  // reference cannot carry.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const draw = SCENES[scene] || quietField;
  return <Frame anchor={anchor}>{draw(uid)}</Frame>;
}

/* Nothing should ever reach this — a gate fails if any card lacks a
   scene. It exists so a typo shows up as a plain field rather than a
   blank card or a crash. */
function quietField(uid) {
  return (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Ridge y={92} sway={8} fill={C.grass} />
      <Ridge y={110} sway={5} fill={C.grassDeep} />
      <Tuft x={60} y={116} scale={1.1} color={C.leaf} />
    </>
  );
}
