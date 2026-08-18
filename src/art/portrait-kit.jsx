/* ============================================================
   PORTRAIT KIT

   The face beside a verse belongs to the person who wrote it
   (Constitution Article 1.5). A person is drawn the same way every
   time — same face, hair, beard and robe colour — so a child learns
   to recognise them; what changes between their books is the setting
   they are drawn in. Paul in chains writing to Philippi and Paul
   dictating Romans are the same man, differently occupied.

   Drawn on a 100x100 square and shown as small as 48px, so props are
   big simple shapes beside the head, never fine detail.

   No depiction of Jesus, per Article 1.2.
   ============================================================ */

/* Portrait colours. Skins and hair span the range of people the Bible
   actually describes, from Egypt to Asia Minor. */
export const P = {
  paper: "#fdfaf1",
  ink: "#33241a",
  smile: "#8a4b2f",
  cheek: "#e88b6a",
  linen: "#f3e3c8",
  linenDeep: "#d9c39c",
  wood: "#c98a4b",
  woodDeep: "#a06a33",
  gold: "#f0c04a",
  bronze: "#c08a3e",
  iron: "#8d99ae",
  ironDeep: "#5c6577",
  stone: "#cfc4b0",
  stoneDeep: "#a2957e",
  leaf: "#5f9c52",
  sky: "#9fd4ef",
  sea: "#5aa7cf",
  night: "#2f3350",
  flame: "#ffb347",
  crimson: "#c05a5a",
  purple: "#8a6ba8",
  scroll: "#f5ead3",
};

/* Who each writer is, held constant across every book they wrote. */
export const PEOPLE = {
  paul:      { skin: "#e2ab7d", bald: true,  hair: "#6b4a33", beard: "#6b4a33", brow: "#4a3221", robe: "#8a6bbf" },
  david:     { skin: "#e8bd93", hair: "#a1552e", curly: true,  beard: null,      brow: "#7c3f21", robe: "#c14953" },
  solomon:   { skin: "#dfae7c", hair: "#3a2e2b", beard: "#3a2e2b", brow: "#241e1c", robe: "#7b2cbf", crown: true },
  john:      { skin: "#e3ac7e", hair: "#cfcac0", beard: "#e8e4dc", brow: "#8f887b", robe: "#3e7cb1" },
  peter:     { skin: "#d99a68", hair: "#c2bcaf", curly: true, beard: "#d6d0c4", brow: "#787267", robe: "#1d3557" },
  matthew:   { skin: "#c98d5c", hair: "#2e1e14", curly: true, beard: "#432f21", brow: "#221610", robe: "#457b9d" },
  mark:      { skin: "#e6ba94", hair: "#6b4226", beard: null,      brow: "#472813", robe: "#e76f51" },
  luke:      { skin: "#eac59c", hair: "#593d2b", beard: null,      brow: "#42281a", robe: "#2a9d8f" },
  james:     { skin: "#d59254", hair: "#533e2d", curly: true, beard: "#533e2d", brow: "#38271a", robe: "#606c38" },
  moses:     { skin: "#c98a54", hair: "#efece4", beard: "#f4f1ea", brow: "#b8b2a5", robe: "#946b3d" },
  joshua:    { skin: "#c88a56", hair: "#4b382a", curly: true, beard: "#4b382a", brow: "#33241a", robe: "#b08d57" },
  isaiah:    { skin: "#dfb088", hair: "#e0ded9", beard: "#edeae3", brow: "#8a857b", robe: "#2b593f" },
  jeremiah:  { skin: "#e3ad81", hair: "#d3cec4", beard: "#ded9cf", brow: "#706a5f", robe: "#588157" },
  job:       { skin: "#d5a173", hair: "#f0ede6", beard: "#f8f5ee", brow: "#999285", robe: "#6c757d" },
  micah:     { skin: "#c9854e", hair: "#4e3524", curly: true, beard: "#4e3524", brow: "#362114", robe: "#9c6644" },
  nehemiah:  { skin: "#daa06d", hair: "#3d2b1f", curly: true, beard: "#3d2b1f", brow: "#291a11", robe: "#bc6c25" },
  /* Writers scripture leaves unnamed. They are drawn as what they are —
     a singer at the temple, a voice from the sons of Korah, a teacher
     whose name the letter never gives — and never handed a borrowed one. */
  psalmist:  { skin: "#e0b184", hair: "#4a3524", curly: true, beard: "#4a3524", brow: "#33241a", robe: "#5c8a3a" },
  sons_of_korah: { skin: "#cf9560", hair: "#382315", beard: null, brow: "#21130a", band: "#ffd166", robe: "#2a9d8f" },
  hebrews_writer: { skin: "#dfb088", hood: "#adb5bd", hair: "#3b281c", beard: "#5a4636", brow: "#26180e", robe: "#6c757d" },
};

/* The bust: robe, head, hair, beard and face. Identical for a given
   person in every book, which is what makes them recognisable — a gate
   compares this markup across their portraits. */
export function Bust({ person }) {
  const who = PEOPLE[person];
  return (
    <g data-bust="true">
      <path d="M18 100 Q18 70 50 70 Q82 70 82 100 Z" fill={who.robe} />
      <path d="M42 72 L50 84 L58 72 Z" fill={P.paper} opacity="0.85" />
      <circle cx="50" cy="44" r="24" fill={who.skin} />

      {who.hood && (
        <path d="M24 46 Q22 16 50 16 Q78 16 76 46 Q78 70 72 76 Q50 70 28 76 Q22 70 24 46 Z" fill={who.hood} />
      )}
      {!who.hood && who.curly && (
        <g fill={who.hair}>
          <circle cx="32" cy="32" r="8" /><circle cx="42" cy="26" r="8" />
          <circle cx="52" cy="24" r="8" /><circle cx="62" cy="27" r="8" />
          <circle cx="70" cy="34" r="7" />
        </g>
      )}
      {!who.hood && !who.curly && !who.bald && (
        <path d="M26 44 Q24 20 50 20 Q76 20 74 44 Q74 32 66 28 Q60 36 34 34 Q28 36 26 44 Z" fill={who.hair} />
      )}
      {who.bald && (
        <path d="M27 46 Q26 34 32 28 Q30 40 34 44 Z M73 46 Q74 34 68 28 Q70 40 66 44 Z" fill={who.hair} />
      )}
      {who.band && <path d="M27 36 Q50 27 73 36" stroke={who.band} strokeWidth="5" fill="none" strokeLinecap="round" />}
      {who.crown && (
        <g>
          <polygon points="30,28 35,16 43,24 50,14 57,24 65,16 70,28" fill={P.gold} stroke="#d49b10" strokeWidth="1.5" />
          <circle cx="50" cy="18" r="2.2" fill={P.crimson} />
        </g>
      )}
      {who.beard && (
        <path d="M30 48 Q30 74 50 76 Q70 74 70 48 Q66 58 50 58 Q34 58 30 48 Z" fill={who.beard} />
      )}

      <circle cx="41" cy="43" r="2.8" fill={P.ink} />
      <circle cx="59" cy="43" r="2.8" fill={P.ink} />
      <path d="M35 36 q6 -4 10 -1" stroke={who.brow} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M55 35 q6 -3 10 1" stroke={who.brow} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path
        d={who.beard ? "M43 54 q7 5 14 0" : "M42 54 q8 7 16 0"}
        stroke={P.smile}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="35" cy="50" r="3.4" fill={P.cheek} opacity="0.45" />
      <circle cx="65" cy="50" r="3.4" fill={P.cheek} opacity="0.45" />
    </g>
  );
}

/* ---- Props. Big shapes that survive being shown at 48px. ---- */

/* An open scroll held at the shoulder — the letter being written. */
export function HeldScroll({ x, y, scale, flip }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale * flip},${scale})`}>
      <rect x="0" y="0" width="26" height="18" rx="2" fill={P.scroll} />
      <rect x="-4" y="-2" width="6" height="22" rx="3" fill={P.wood} />
      <rect x="24" y="-2" width="6" height="22" rx="3" fill={P.wood} />
      <g stroke={P.stoneDeep} strokeWidth="1.4" strokeLinecap="round" opacity="0.7">
        <path d="M5 6 h16 M5 10 h16 M5 14 h10" />
      </g>
    </g>
  );
}

/* A lyre — David's, and the temple singers'. */
export function Lyre({ x, y, scale }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M0 26 Q-6 6 4 0 M22 26 Q28 6 18 0" stroke={P.wood} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M2 2 L20 2" stroke={P.woodDeep} strokeWidth="4" strokeLinecap="round" />
      <g stroke={P.gold} strokeWidth="1.6">
        <path d="M6 4 L7 24 M11 3 L11 25 M16 4 L15 24" />
      </g>
    </g>
  );
}

/* A prison chain across the chest. */
export function Chains({ x, y, scale }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} fill="none" stroke={P.iron} strokeWidth="3">
      <circle cx="0" cy="0" r="5" /><circle cx="9" cy="5" r="5" />
      <circle cx="18" cy="9" r="5" /><circle cx="27" cy="12" r="5" />
    </g>
  );
}

/* A barred window: the cell Philippians was written from. */
export function Window({ x, y, scale }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x="0" y="0" width="26" height="30" rx="3" fill={P.night} />
      <rect x="3" y="3" width="20" height="24" rx="2" fill={P.sky} opacity="0.8" />
      <g stroke={P.ironDeep} strokeWidth="2.4">
        <path d="M9 2 L9 28 M17 2 L17 28" />
      </g>
    </g>
  );
}

/* One piece of the armour of God, named by which piece it is. */
export function ArmourPiece({ x, y, scale, piece }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      {piece === "shield" && (
        <>
          <path d="M0 -14 L15 -9 L15 4 Q15 16 0 24 Q-15 16 -15 4 L-15 -9 Z" fill={P.bronze} />
          <path d="M0 -9 L10 -5 L10 3 Q10 12 0 18 Q-10 12 -10 3 L-10 -5 Z" fill={P.gold} />
        </>
      )}
      {piece === "helmet" && (
        <>
          <path d="M-14 8 Q-16 -14 0 -14 Q16 -14 14 8 Z" fill={P.bronze} />
          <path d="M-14 8 Q0 2 14 8" fill={P.gold} />
          <path d="M0 -14 q-3 -8 0 -11 q3 5 0 11 Z" fill={P.crimson} />
        </>
      )}
      {piece === "sword" && (
        <>
          <path d="M-2 -16 L2 -16 L2 16 L-2 16 Z" fill={P.stone} />
          <path d="M-8 16 L8 16 L8 20 L-8 20 Z" fill={P.gold} />
          <path d="M-2 -16 L0 -24 L2 -16 Z" fill={P.stone} />
        </>
      )}
      {piece === "belt" && (
        <>
          <rect x="-20" y="-4" width="40" height="9" rx="3" fill={P.woodDeep} />
          <rect x="-6" y="-7" width="13" height="15" rx="2" fill={P.gold} />
        </>
      )}
      {piece === "breastplate" && (
        <>
          <path d="M-16 -10 L16 -10 L13 16 L-13 16 Z" fill={P.bronze} />
          <path d="M-16 -10 Q0 -18 16 -10" fill={P.gold} />
          <path d="M0 -6 L0 12" stroke={P.gold} strokeWidth="2" />
        </>
      )}
      {piece === "shoes" && (
        <>
          <path d="M-18 10 q-2 -8 8 -8 h20 q6 0 6 5 q0 5 -6 5 Z" fill={P.woodDeep} />
          <path d="M-14 2 q6 -12 14 -12 q9 0 10 8" stroke={P.wood} strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M-6 2 L2 -8 M2 2 L9 -6" stroke={P.wood} strokeWidth="2.6" strokeLinecap="round" />
        </>
      )}
    </g>
  );
}

/* A quill, for the writers caught mid-letter. */
export function Quill({ x, y, scale, flip }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale * flip},${scale})`}>
      <path d="M0 20 L14 -2 q4 -6 6 -10 q-6 4 -10 8 L-2 18 Z" fill={P.paper} stroke={P.stoneDeep} strokeWidth="1.2" />
      <path d="M0 20 L-4 26" stroke={P.ink} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/* A tablet of stone, for the law. */
export function Tablets({ x, y, scale }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M-13 4 q0 -6 7 -6 q7 0 7 6 L1 30 L-13 30 Z" fill={P.stone} />
      <path d="M3 4 q0 -6 7 -6 q7 0 7 6 L17 30 L3 30 Z" fill={P.stone} />
      <g stroke={P.stoneDeep} strokeWidth="1.4" strokeLinecap="round" opacity="0.8">
        <path d="M-10 12 h8 M-10 17 h8 M-10 22 h8 M6 12 h8 M6 17 h8 M6 22 h8" />
      </g>
    </g>
  );
}
