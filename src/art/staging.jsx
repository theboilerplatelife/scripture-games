/* ============================================================
   CARD SCENES — shared staging
   Every card in the app carries its own hand-drawn scene. These
   pieces are the parts each scene has in common — the frame, the
   sky, the ground planes, the weather — so three hundred drawings
   still read as one book. Everything distinctive about a scene is
   drawn in the scene itself.

   The frame is the card's real 272x120. Cards print their words on
   a taped strip across the middle, which covers roughly y=43 to y=77
   — anything drawn in that band is invisible in the game. Keep the
   subject above y=40 or below y=80, or make it tall enough to cross
   the strip and read at both ends.

   No depictions of Jesus, per Constitution Article 1.2: scenes are
   scenery, animals, and objects.
   ============================================================ */

export const FRAME = { W: 272, H: 120 };

/* One warm palette shared by every drawing. Named for what they are
   in a scene, not for their hue, so a scene reads as a description. */
export const C = {
  dawn: "#ffeec9",
  daySky: "#dff0f7",
  noon: "#cfe9f5",
  dusk: "#b07a86",
  ember: "#e8a76c",
  night: "#2f3350",
  deepNight: "#1d2138",
  storm: "#5b6478",
  sun: "#ffdb70",
  sunRay: "#f3c95f",
  moon: "#fff0c4",
  star: "#fff3d9",
  cloud: "#ffffff",
  water: "#9fd4ef",
  deepWater: "#5aa7cf",
  darkWater: "#33607e",
  foam: "#eaf7ff",
  grassLight: "#cde7bd",
  grass: "#a9d59b",
  grassDeep: "#7fbd72",
  leaf: "#5f9c52",
  leafDeep: "#3f6f3a",
  sand: "#e8d3a9",
  sandDeep: "#cbaf80",
  earth: "#a07855",
  earthDeep: "#7a5a3f",
  stone: "#cfc4b0",
  stoneDeep: "#a2957e",
  stoneShade: "#8a7f6c",
  wood: "#c98a4b",
  woodDeep: "#a06a33",
  cloth: "#f3e3c8",
  clothDeep: "#d9c39c",
  flame: "#ffb347",
  flameBright: "#ffd97a",
  gold: "#f0c04a",
  bronze: "#c08a3e",
  wool: "#ffffff",
  woolShade: "#c8d6c2",
  ink: "#4a403a",
  crimson: "#c05a5a",
  purple: "#8a6ba8",
  blossom: "#e88bb1",
};

/* The card frame. Scenes are drawn edge to edge and cropped by the
   card's torn clip path, so the artwork always fills its paper. */
export function Frame({ children }) {
  return (
    <svg
      className="mm-card-bg-ill"
      viewBox="0 0 272 120"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* A vertical sky wash. Every scene opens with one, which is what
   keeps the light consistent from card to card. */
export function Sky({ id, top, bottom }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect width="272" height="120" fill={`url(#${id})`} />
    </>
  );
}

/* A soft pool of light — lamps, fire, glory, a furnace door. */
export function Glow({ id, x, y, r, color }) {
  return (
    <>
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={color} stopOpacity="0.85" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
    </>
  );
}

/* A land plane. Stacking two or three with rising y and deepening
   fill is what gives every scene its depth. */
export function Ridge({ y, sway, fill }) {
  return (
    <path
      d={`M 0 ${y} Q 68 ${y - sway} 136 ${y} T 272 ${y - sway / 2} L 272 120 L 0 120 Z`}
      fill={fill}
    />
  );
}

/* Angular land: cliffs, mountains, the walls of a valley. */
export function Peaks({ points, fill }) {
  return <path d={`M 0 120 ${points} L 272 120 Z`} fill={fill} />;
}

export function Sun({ x, y, r, color, ray }) {
  return (
    <>
      <g opacity="0.6" stroke={ray} strokeWidth="2.5" strokeLinecap="round">
        <line x1={x} y1={y - r - 4} x2={x} y2={y - r - 12} />
        <line x1={x - r - 4} y1={y - 4} x2={x - r - 11} y2={y - 11} />
        <line x1={x + r + 4} y1={y - 4} x2={x + r + 11} y2={y - 11} />
      </g>
      <circle cx={x} cy={y} r={r} fill={color} />
    </>
  );
}

export function Moon({ x, y, r }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={C.moon} opacity="0.95" />
      <circle cx={x - r * 0.3} cy={y - r * 0.2} r={r * 0.18} fill={C.cloud} opacity="0.5" />
    </g>
  );
}

/* Scattered stars. The seed shifts the field so no two night skies
   in the app share the same constellation. */
export function Stars({ seed, count, size }) {
  const dots = [];
  for (let i = 0; i < count; i += 1) {
    const n = (seed + i * 37) % 100;
    const m = (seed * 7 + i * 53) % 100;
    dots.push(
      <circle
        key={i}
        cx={6 + (n * 260) / 100}
        cy={4 + (m * 52) / 100}
        r={size * (0.6 + ((n + m) % 5) / 10)}
        opacity={0.55 + ((n * 3) % 40) / 100}
      />
    );
  }
  return <g fill={C.star}>{dots}</g>;
}

export function Clouds({ x, y, scale, color }) {
  return (
    <g fill={color} opacity="0.85" transform={`translate(${x},${y}) scale(${scale})`}>
      <ellipse cx="0" cy="0" rx="18" ry="6" />
      <ellipse cx="13" cy="-4" rx="12" ry="5" />
      <ellipse cx="-12" cy="-2" rx="9" ry="4" />
    </g>
  );
}

/* Distant birds: two strokes each, the oldest trick in the book. */
export function Birds({ x, y, scale, color }) {
  return (
    <g
      stroke={color}
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      opacity="0.75"
      transform={`translate(${x},${y}) scale(${scale})`}
    >
      <path d="M 0 0 q 4 -4 8 0 q 4 -4 8 0" />
      <path d="M 20 8 q 3 -3 6 0 q 3 -3 6 0" />
    </g>
  );
}

/* Still water with a couple of ripple strokes. */
export function Water({ y, fill }) {
  return (
    <>
      <rect x="0" y={y} width="272" height={120 - y} fill={fill} />
      <g stroke={C.foam} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7">
        <path d={`M 14 ${y + 10} q 10 -5 20 0 q 10 5 20 0`} />
        <path d={`M 150 ${y + 18} q 10 -5 20 0 q 10 5 20 0`} />
        <path d={`M 96 ${y + 26} q 10 -5 20 0 q 10 5 20 0`} />
      </g>
    </>
  );
}

/* Rough water: the same band whipped into peaks. */
export function Waves({ y, fill, crest }) {
  return (
    <>
      <path
        d={`M 0 ${y} q 24 -12 48 0 t 48 0 t 48 0 t 48 0 t 48 0 t 48 0 L 272 120 L 0 120 Z`}
        fill={fill}
      />
      <path
        d={`M 0 ${y + 14} q 24 -12 48 0 t 48 0 t 48 0 t 48 0 t 48 0 t 48 0`}
        fill="none"
        stroke={crest}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.8"
      />
    </>
  );
}

/* Falling weather — rain, or with a paler colour, snow and ash. */
export function Rain({ seed, count, color }) {
  const drops = [];
  for (let i = 0; i < count; i += 1) {
    const x = 8 + ((seed + i * 41) % 100) * 2.6;
    const y = 6 + ((seed * 3 + i * 29) % 70);
    drops.push(<path key={i} d={`M ${x} ${y} l -2 7`} />);
  }
  return (
    <g stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.65">
      {drops}
    </g>
  );
}

/* A tuft of grass or a small plant, for foreground corners. */
export function Tuft({ x, y, scale, color }) {
  return (
    <g
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.9"
      transform={`translate(${x},${y}) scale(${scale})`}
    >
      <path d="M 0 0 l 0 -7 M -3 0 l -2 -5 M 3 0 l 2 -5" />
    </g>
  );
}

/* A single small flower — five petals round a heart. */
export function Bloom({ x, y, r, petal, heart }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx="0" cy="0" r={r} fill={heart} />
      <g fill={petal}>
        <circle cx="0" cy={-r * 1.6} r={r * 0.72} />
        <circle cx={r * 1.6} cy="0" r={r * 0.72} />
        <circle cx="0" cy={r * 1.6} r={r * 0.72} />
        <circle cx={-r * 1.6} cy="0" r={r * 0.72} />
      </g>
    </g>
  );
}

/* A rounded tree: trunk, canopy, and a highlight side. */
export function Tree({ x, y, scale, canopy, shade, trunk }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M -2 0 L -2 -14 L 2 -14 L 2 0 Z" fill={trunk} />
      <circle cx="0" cy="-20" r="11" fill={canopy} />
      <circle cx="-6" cy="-16" r="7" fill={shade} />
      <circle cx="6" cy="-17" r="7" fill={shade} />
    </g>
  );
}

/* A palm, for the roads and rivers of the south. */
export function Palm({ x, y, scale, frond, trunk }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M 0 0 q -3 -16 1 -28" stroke={trunk} strokeWidth="3" fill="none" strokeLinecap="round" />
      <g fill={frond}>
        <path d="M 1 -28 q -14 -4 -18 4 q 12 2 18 -1 Z" />
        <path d="M 1 -28 q 14 -6 19 2 q -13 3 -19 0 Z" />
        <path d="M 1 -28 q -8 -12 -2 -16 q 7 6 4 16 Z" />
        <path d="M 1 -28 q 10 -10 15 -6 q -8 8 -15 8 Z" />
      </g>
    </g>
  );
}

/* A flat-roofed house of mud brick, the ordinary building of the
   whole Bible — clustered, it becomes a village or a city. */
export function House({ x, y, w, h, wall, roof }) {
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} fill={wall} />
      <rect x={x - 2} y={y - h - 3} width={w + 4} height="3" fill={roof} />
    </g>
  );
}

/* A tent: the home of shepherds, patriarchs and pilgrims. */
export function Tent({ x, y, scale, cloth, shade }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M 0 0 L 16 -26 L 32 0 Z" fill={cloth} />
      <path d="M 16 -26 L 32 0 L 22 0 Z" fill={shade} />
      <path d="M 12 0 L 16 -12 L 20 0 Z" fill={C.earthDeep} opacity="0.55" />
    </g>
  );
}

/* A sheep, seen from the side: four clouds of wool and a dark face. */
export function Sheep({ x, y, scale }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <g fill={C.wool} stroke={C.woolShade} strokeWidth="1.4">
        <circle cx="10" cy="10" r="8" />
        <circle cx="18" cy="6" r="7" />
        <circle cx="25" cy="10" r="8" />
        <circle cx="17" cy="13" r="7" />
      </g>
      <circle cx="32" cy="9" r="5" fill={C.ink} />
      <circle cx="33.5" cy="8" r="0.9" fill={C.cloud} />
      <rect x="13" y="17" width="2.2" height="7" rx="1" fill={C.ink} />
      <rect x="22" y="17" width="2.2" height="7" rx="1" fill={C.ink} />
    </g>
  );
}

/* A clay jar — water, oil, grain, the ordinary vessel of a house. */
export function Jar({ x, y, scale, body, rim }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M -7 -14 q -5 8 -3 14 h 20 q 2 -6 -3 -14 Z" fill={body} />
      <rect x="-8" y="-17" width="22" height="4" rx="2" fill={rim} />
    </g>
  );
}

/* A scroll, rolled at both ends. */
export function Scroll({ x, y, scale, sheet, rod }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x="0" y="0" width="34" height="20" rx="2" fill={sheet} />
      <rect x="-4" y="-2" width="6" height="24" rx="3" fill={rod} />
      <rect x="32" y="-2" width="6" height="24" rx="3" fill={rod} />
      <g stroke={C.stoneShade} strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
        <path d="M 6 6 h 22 M 6 10 h 22 M 6 14 h 14" />
      </g>
    </g>
  );
}

/* A flame, in three tongues. */
export function Flame({ x, y, scale }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M 0 0 q -7 -10 -1 -18 q 2 6 6 8 q 3 -5 1 -11 q 9 8 6 21 Z" fill={C.flame} />
      <path d="M 1 -1 q -4 -6 0 -11 q 4 5 2 11 Z" fill={C.flameBright} />
    </g>
  );
}

/* A dove in flight: body, near wing, tail, beak. Used wherever peace,
   the Spirit, or Noah's messenger appears, so it always reads the same. */
export function Dove({ x, y, scale, flip }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale * flip},${scale})`}>
      <path d="M 0 0 q 15 -11 30 -4 q 10 5 3 11 q -12 7 -25 3 Z" fill={C.cloud} />
      <path d="M 8 -1 q 11 -14 23 -7 q -7 12 -23 7 Z" fill={C.foam} />
      <path d="M 32 5 l 15 5 l -15 5 Z" fill={C.cloud} />
      <circle cx="6" cy="1" r="1.3" fill={C.ink} />
      <path d="M 0 3 l -7 2 l 7 3 Z" fill={C.gold} />
    </g>
  );
}

/* Noah's ark: one boat, drawn the same in every card of the story so
   the five cards read as one journey. */
export function Ark({ x, y, scale }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M -46 0 q 8 -20 46 -20 q 38 0 46 20 Z" fill={C.wood} />
      <path d="M -40 -8 h 80" stroke={C.woodDeep} strokeWidth="2.4" />
      <rect x="-22" y="-42" width="44" height="22" rx="2" fill={C.clothDeep} />
      <path d="M -28 -42 L 0 -54 L 28 -42 Z" fill={C.woodDeep} />
      <rect x="-6" y="-36" width="12" height="16" rx="2" fill={C.earthDeep} />
    </g>
  );
}

/* A camel: the pack animal of every journey in the book. */
export function Camel({ x, y, scale, coat }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} fill={coat}>
      <path d="M 0 0 q 2 -12 10 -12 q 5 -9 11 0 q 5 -9 10 0 q 8 2 7 12 Z" />
      <path d="M 33 -10 q 9 -3 10 -14 q 1 -8 6 -8 q 4 0 3 6 q -1 12 -8 18 Z" />
      <rect x="2" y="-2" width="3.4" height="14" rx="1.6" />
      <rect x="12" y="-2" width="3.4" height="14" rx="1.6" />
      <rect x="24" y="-2" width="3.4" height="14" rx="1.6" />
      <rect x="32" y="-2" width="3.4" height="12" rx="1.6" />
    </g>
  );
}

/* An ox or cow, seen from the side — the plough and herd animal. */
export function Ox({ x, y, scale, hide }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} fill={hide}>
      <ellipse cx="14" cy="0" rx="16" ry="9" />
      <path d="M 28 -2 q 8 -2 9 -8 q 4 -1 4 3 q 0 8 -8 11 Z" />
      <path d="M 34 -12 q -3 -6 2 -6 q 3 0 2 5 M 40 -11 q 2 -6 5 -4 q 2 2 -1 5" stroke={hide} strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="4" y="6" width="3.4" height="12" rx="1.6" />
      <rect x="22" y="6" width="3.4" height="12" rx="1.6" />
      <path d="M -2 -2 q -8 4 -6 12" stroke={hide} strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

/* A fishing boat with a furled sail — Galilee, and the coast roads. */
export function Boat({ x, y, scale, hull, sail }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M -26 0 q 6 12 26 12 q 20 0 26 -12 Z" fill={hull} />
      <path d="M 0 0 L 0 -34" stroke={C.woodDeep} strokeWidth="3" strokeLinecap="round" />
      <path d="M 2 -32 q 20 10 18 26 l -18 0 Z" fill={sail} />
    </g>
  );
}

/* A person, drawn plainly: robe, head, and a headscarf that marks the
   people of these stories. About 43 units tall at scale 1, so a figure
   standing on the ground line wants scale 0.8-0.9 — any larger and the
   head disappears behind the caption strip. Never used for Jesus, per Article 1.2 —
   scenes that touch his life are drawn through objects and light. */
export function Person({ x, y, scale, robe, scarf, skin }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M -9 0 L -9 -24 Q -9 -32 0 -32 Q 9 -32 9 -24 L 9 0 Z" fill={robe} />
      <circle cx="0" cy="-36" r="7" fill={skin} />
      <path d="M -8 -38 q 8 -10 16 0 q -3 -8 -8 -8 q -5 0 -8 8 Z" fill={scarf} />
      <path d="M -8 -38 q -3 8 0 14 M 8 -38 q 3 8 0 14" stroke={scarf} strokeWidth="2.4" fill="none" />
    </g>
  );
}

/* A horse: the messenger and the war animal of the later books. */
export function Horse({ x, y, scale, coat, mane }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path d="M 0 0 q 0 -16 14 -18 q 12 -2 20 0 q 12 2 12 18 Z" fill={coat} />
      <path d="M 42 -16 q 10 -4 12 -16 q 2 -8 8 -6 q 5 2 2 9 q -3 11 -10 17 Z" fill={coat} />
      <path d="M 52 -32 q 2 -7 5 -4 q 2 3 -1 6 Z" fill={coat} />
      <path d="M 40 -18 q 10 -6 16 -14 q 2 8 -4 16 Z" fill={mane} />
      <rect x="4" y="-2" width="3.4" height="16" rx="1.6" fill={coat} />
      <rect x="14" y="-2" width="3.4" height="16" rx="1.6" fill={coat} />
      <rect x="30" y="-2" width="3.4" height="16" rx="1.6" fill={coat} />
      <rect x="40" y="-2" width="3.4" height="14" rx="1.6" fill={coat} />
      <path d="M 0 -8 q -8 6 -6 16" stroke={mane} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  );
}
