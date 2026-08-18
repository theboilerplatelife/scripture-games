/* ============================================================
   THE THIRTY-TWO PORTRAITS

   One per writer-and-book. The person never changes — same face, hair,
   beard and robe wherever they appear — so a child learns to recognise
   Paul. What changes is what he is doing: chained in Philippi, holding
   the armour for Ephesus, a cracked clay jar for Corinth.

   Props sit beside or across the shoulders, big enough to read at the
   48px used on the level select.
   ============================================================ */
import {
  P, Bust, HeldScroll, Lyre, Chains, Window, ArmourPiece, Quill, Tablets,
} from "./portrait-kit.jsx";

export const PORTRAITS = {
  /* ---- David: the harp for the psalms, the ark for the Chronicles ---- */
  "david/Psalm": () => (
    <>
      <Lyre x={4} y={56} scale={1.3} />
      <Bust person="david" />
    </>
  ),
  "david/1 Chronicles": () => (
    <>
      <g transform="translate(4,58)">
        <rect x="0" y="8" width="30" height="15" rx="2" fill={P.gold} />
        <rect x="-3" y="4" width="36" height="5" rx="2" fill={P.bronze} />
        <path d="M-8 16 h46" stroke={P.wood} strokeWidth="3" strokeLinecap="round" />
      </g>
      <Bust person="david" />
    </>
  ),

  /* ---- The unnamed singers of the temple ---- */
  "psalmist/Psalm": () => (
    <>
      <g transform="translate(6,40)">
        <rect x="0" y="0" width="11" height="60" fill={P.stone} />
        <rect x="-3" y="-5" width="16" height="6" rx="2" fill={P.stoneDeep} />
      </g>
      <g transform="translate(72,50)">
        <path d="M0 0 q10 -10 20 0 q-3 12 -14 11 l-8 8 l0 -9 q-9 -2 -5 -10 Z" fill={P.gold} opacity="0.9" />
      </g>
      <Bust person="psalmist" />
    </>
  ),
  "sons_of_korah/Psalm": () => (
    <>
      <Lyre x={74} y={54} scale={1.15} />
      <g transform="translate(6,58)">
        <path d="M0 0 q9 -9 18 0 q-3 10 -12 10 l-7 7 l0 -8 q-8 -2 -4 -9 Z" fill={P.sky} />
      </g>
      <Bust person="sons_of_korah" />
    </>
  ),

  /* ---- Solomon: crowned, with the proverbs he collected ---- */
  "solomon/Proverbs": () => (
    <>
      <HeldScroll x={68} y={62} scale={1.1} flip={1} />
      <Bust person="solomon" />
    </>
  ),

  /* ---- Paul, one letter at a time ---- */
  "paul/Romans": () => (
    <>
      <HeldScroll x={68} y={60} scale={1.1} flip={1} />
      <Quill x={20} y={52} scale={1.1} flip={-1} />
      <Bust person="paul" />
    </>
  ),
  "paul/1 Corinthians": () => (
    <>
      <g transform="translate(70,58)">
        <path d="M-4 4 q-11 -9 0 -13 q11 -4 15 4 q3 8 -5 11 Z" fill={P.linenDeep} />
        <path d="M-2 2 q-7 -6 0 -8 q7 -2 9 3" stroke={P.linen} strokeWidth="2" fill="none" />
        <path d="M2 12 q13 -4 22 0 q-2 12 -11 13 q-9 -1 -11 -13 Z" fill={P.crimson} />
        <path d="M13 25 L13 32" stroke={P.bronze} strokeWidth="3.4" strokeLinecap="round" />
        <ellipse cx="13" cy="33" rx="9" ry="3" fill={P.bronze} />
      </g>
      <Bust person="paul" />
    </>
  ),
  "paul/2 Corinthians": () => (
    <>
      <g transform="translate(78,60)">
        {/* Treasure in jars of clay: the crack is the point */}
        <circle cx="0" cy="8" r="19" fill={P.gold} opacity="0.2" />
        <path d="M-13 -6 q-9 16 -5 30 h36 q4 -14 -5 -30 Z" fill={P.wood} />
        <rect x="-16" y="-11" width="42" height="6" rx="3" fill={P.woodDeep} />
        <path d="M2 -4 l-6 11 l9 5 l-6 12" stroke={P.gold} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <Bust person="paul" />
    </>
  ),
  "paul/Galatians": () => (
    <>
      <g transform="translate(66,54)">
        <path d="M0 34 q4 -20 18 -28" stroke={P.leaf} strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <g fill={P.purple}>
          <circle cx="20" cy="6" r="5" /><circle cx="28" cy="12" r="5" /><circle cx="17" cy="16" r="5" />
        </g>
        <path d="M4 20 q-12 -8 -16 2 q12 8 16 -2 Z" fill={P.leaf} />
      </g>
      <Bust person="paul" />
    </>
  ),
  "paul/Ephesians": () => (
    <>
      <g transform="translate(66,58)">
        <rect x="0" y="0" width="30" height="22" rx="2" fill={P.scroll} />
        <path d="M0 0 L15 13 L30 0" stroke={P.linenDeep} strokeWidth="2" fill="none" />
        <path d="M4 26 h22" stroke={P.linenDeep} strokeWidth="3" strokeLinecap="round" />
      </g>
      <Bust person="paul" />
    </>
  ),
  "paul/Philippians": () => (
    <>
      <Window x={70} y={40} scale={1.05} />
      <Bust person="paul" />
      <Chains x={28} y={86} scale={1.2} />
    </>
  ),
  "paul/Colossians": () => (
    <>
      <g transform="translate(64,62)">
        <rect x="0" y="0" width="30" height="20" rx="2" fill={P.scroll} />
        <path d="M0 0 L15 12 L30 0" stroke={P.linenDeep} strokeWidth="2" fill="none" />
        <circle cx="15" cy="14" r="6" fill={P.crimson} />
      </g>
      <Bust person="paul" />
    </>
  ),
  "paul/1 Thessalonians": () => (
    <>
      <g transform="translate(76,62)">
        <circle cx="0" cy="0" r="20" fill={P.flame} opacity="0.22" />
        <path d="M-17 8 q17 -13 34 0 q-7 9 -17 9 q-10 0 -17 -9 Z" fill={P.wood} />
        <ellipse cx="0" cy="7" rx="14" ry="4" fill={P.bronze} />
        <path d="M0 3 q-7 -13 0 -20 q7 9 0 20 Z" fill={P.flame} />
        <path d="M0 0 q-3 -7 0 -11 q3 5 0 11 Z" fill={P.gold} />
      </g>
      <Bust person="paul" />
    </>
  ),
  "paul/2 Timothy": () => (
    <>
      <g transform="translate(72,56)" fill="none" stroke={P.gold} strokeWidth="4">
        {/* The crown at the end of the race */}
        <path d="M0 24 q-12 -14 0 -22 q12 -8 22 4 q8 12 -4 20" />
      </g>
      <g fill={P.leaf}>
        <path d="M68 82 q-8 -6 -12 0 q7 6 12 0 Z" />
      </g>
      <Bust person="paul" />
    </>
  ),

  /* ---- John: the gospel, the letters, the revelation ---- */
  "john/John": () => (
    <>
      <g transform="translate(64,60)">
        <path d="M0 0 q16 -6 32 0 L32 24 q-16 -6 -32 0 Z" fill={P.scroll} />
        <path d="M16 2 L16 22" stroke={P.linenDeep} strokeWidth="2" />
      </g>
      <Bust person="john" />
    </>
  ),
  "john/1 John": () => (
    <>
      <g transform="translate(72,62)">
        <path d="M0 16 q-13 -15 2 -21 q9 -3 10 4 q3 -7 10 -4 q15 6 2 21 q-13 12 -24 0 Z" fill={P.crimson} />
      </g>
      <Bust person="john" />
    </>
  ),
  "john/Revelation": () => (
    <>
      <g transform="translate(78,52)">
        <circle cx="0" cy="0" r="13" fill={P.gold} opacity="0.85" />
        <g stroke={P.gold} strokeWidth="2.4" strokeLinecap="round">
          <path d="M0 -20 L0 -16 M0 16 L0 20 M-20 0 L-16 0 M16 0 L20 0" />
        </g>
      </g>
      <Bust person="john" />
    </>
  ),

  /* ---- The other gospel writers ---- */
  "matthew/Matthew": () => (
    <>
      <g transform="translate(66,62)">
        <ellipse cx="12" cy="18" rx="17" ry="5" fill={P.wood} />
        <g fill={P.gold}>
          <circle cx="4" cy="12" r="6" /><circle cx="16" cy="10" r="6" /><circle cx="24" cy="14" r="6" />
        </g>
      </g>
      <Bust person="matthew" />
    </>
  ),
  "mark/Mark": () => (
    <>
      <g transform="translate(72,62)">
        <path d="M-14 2 q14 -6 28 0 l3 26 q-17 5 -34 0 Z" fill={P.woodDeep} />
        <path d="M-14 2 q14 -10 28 0 q-14 7 -28 0 Z" fill={P.wood} />
        <path d="M-9 0 q9 -16 18 0" stroke={P.wood} strokeWidth="3" fill="none" />
        <rect x="-4" y="12" width="9" height="7" rx="2" fill={P.gold} />
      </g>
      <Bust person="mark" />
    </>
  ),
  "luke/Luke": () => (
    <>
      <g transform="translate(72,60)">
        {/* The physician's jar */}
        <path d="M-6 -4 q-6 10 -3 18 h22 q3 -8 -3 -18 Z" fill={P.sea} />
        <rect x="-8" y="-8" width="26" height="5" rx="2" fill={P.ironDeep} />
      </g>
      <Bust person="luke" />
    </>
  ),
  "luke/Acts": () => (
    <>
      <g transform="translate(60,52)">
        {/* The road the good news travelled */}
        <path d="M0 34 q14 -18 34 -26" stroke={P.linenDeep} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M22 4 q10 -8 18 0 q-3 10 -12 10 l-7 7 l0 -8 q-8 -2 -4 -9 Z" fill={P.flame} />
      </g>
      <Bust person="luke" />
    </>
  ),

  /* ---- The letter writers of the young church ---- */
  "james/James": () => (
    <>
      <g transform="translate(70,56)">
        <path d="M0 36 q2 -18 12 -26" stroke={P.leaf} strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <path d="M12 10 q-12 -6 -16 2 q11 7 16 -2 Z" fill={P.leaf} />
        <path d="M14 4 q12 -8 18 0 q-11 8 -18 0 Z" fill={P.leaf} />
        <circle cx="14" cy="0" r="5" fill={P.gold} />
      </g>
      <Bust person="james" />
    </>
  ),
  "peter/1 Peter": () => (
    <>
      <g transform="translate(62,66)">
        <path d="M0 12 q14 -10 26 0 q-12 9 -26 0 Z" fill={P.sea} />
        <path d="M26 12 l10 -6 l0 12 Z" fill={P.sea} />
        <circle cx="8" cy="10" r="1.6" fill={P.paper} />
      </g>
      <Bust person="peter" />
    </>
  ),
  "hebrews_writer/Hebrews": () => (
    <>
      <HeldScroll x={70} y={64} scale={1.05} flip={1} />
      <Bust person="hebrews_writer" />
    </>
  ),

  /* ---- Moses: the beginning, and the law ---- */
  "moses/Genesis": () => (
    <>
      <g transform="translate(72,50)" fill={P.gold}>
        <path d="M6 0 L9 8 L17 8 L11 13 L13 21 L6 16 L-1 21 L1 13 L-5 8 L3 8 Z" />
        <circle cx="22" cy="24" r="4" /><circle cx="6" cy="32" r="3" />
      </g>
      <Bust person="moses" />
    </>
  ),
  "moses/Deuteronomy": () => (
    <>
      <Tablets x={74} y={56} scale={1.15} />
      <Bust person="moses" />
    </>
  ),

  /* ---- Prophets and leaders ---- */
  "joshua/Joshua": () => (
    <>
      <ArmourPiece x={82} y={62} scale={1.15} piece="sword" />
      <Bust person="joshua" />
    </>
  ),
  "isaiah/Isaiah": () => (
    <>
      <HeldScroll x={70} y={66} scale={1.05} flip={1} />
      <g transform="translate(26,58)">
        {/* The coal from the altar */}
        <path d="M0 0 q-5 -9 0 -14 q5 6 0 14 Z" fill={P.flame} />
      </g>
      <Bust person="isaiah" />
    </>
  ),
  "jeremiah/Jeremiah": () => (
    <>
      <g transform="translate(66,54)">
        <ellipse cx="14" cy="24" rx="18" ry="6" fill={P.wood} />
        <path d="M2 24 q-4 -18 12 -18 q16 0 12 18 Z" fill={P.linen} />
        <path d="M14 6 L14 -6" stroke={P.woodDeep} strokeWidth="3" strokeLinecap="round" />
      </g>
      <Bust person="jeremiah" />
    </>
  ),
  "micah/Micah": () => (
    <>
      <g transform="translate(68,50)">
        {/* Do justice: the scales */}
        <path d="M14 0 L14 26" stroke={P.bronze} strokeWidth="3" strokeLinecap="round" />
        <path d="M0 4 L28 4" stroke={P.bronze} strokeWidth="3" strokeLinecap="round" />
        <path d="M0 4 q-6 10 0 12 q6 -2 0 -12 Z" fill={P.gold} />
        <path d="M28 4 q-6 10 0 12 q6 -2 0 -12 Z" fill={P.gold} />
      </g>
      <Bust person="micah" />
    </>
  ),
  "nehemiah/Nehemiah": () => (
    <>
      <g transform="translate(66,60)">
        <rect x="0" y="10" width="16" height="9" fill={P.stone} />
        <rect x="18" y="10" width="16" height="9" fill={P.stone} />
        <rect x="9" y="0" width="16" height="9" fill={P.stone} />
        <g stroke={P.stoneDeep} strokeWidth="1.2" opacity="0.7">
          <path d="M0 10 h34 M9 0 h16" />
        </g>
      </g>
      <Bust person="nehemiah" />
    </>
  ),
  "job/Job": () => (
    <>
      <g transform="translate(78,58)">
        {/* Out of the whirlwind, and after it the morning */}
        <circle cx="0" cy="6" r="15" fill={P.gold} />
        <g stroke={P.gold} strokeWidth="2.6" strokeLinecap="round">
          <path d="M0 -18 L0 -23 M-18 6 L-23 6 M18 6 L23 6 M-13 -8 L-17 -12 M13 -8 L17 -12" />
        </g>
        <g fill="none" stroke={P.iron} strokeWidth="2.6" opacity="0.65">
          <path d="M-16 26 q16 -9 32 0" />
        </g>
      </g>
      <Bust person="job" />
    </>
  ),
};

/* Paul's Ephesians portrait is the base for the armour chapter; the
   pieces each verse names are drawn as their own poses. */
export const ARMOUR_POSES = {
  "Ephesians 6:10–11": "breastplate",
  "Ephesians 6:14": "belt",
  "Ephesians 6:15": "shoes",
  "Ephesians 6:16": "shield",
  "Ephesians 6:17": "helmet",
};

Object.entries(ARMOUR_POSES).forEach(([ref, piece]) => {
  PORTRAITS[`paul/Ephesians#${ref}`] = () => (
    <>
      <ArmourPiece x={80} y={66} scale={1.25} piece={piece} />
      <Bust person="paul" />
    </>
  );
});
