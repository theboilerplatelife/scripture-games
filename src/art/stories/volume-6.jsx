/* Volume 6 — Passion to Pentecost and the road out: the palm entry,
   the empty tomb, the commission, the upper room, the Beautiful Gate,
   the Damascus road.

   Constitution Article 1.2: Jesus is never drawn. The commission and
   the ascension are drawn as the mountain, the light, and the cloud
   the disciples are left looking at. */
import {
  C, Sky, Glow, Ridge, Peaks, Sun, Birds,
  Tuft, Bloom, Palm, Jar, Scroll, Flame, Dove, Person, Horse,
} from "../staging.jsx";

export const VOLUME_6 = {
  // 31 — The Triumphal Palm Entry
  "31-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.sand} />
      <Ridge y={92} sway={5} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="176" y="52" width="96" height="48" />
        <rect x="206" y="76" width="24" height="24" rx="2" fill={C.woodDeep} />
      </g>
      <g fill={C.clothDeep}>
        <path d="M 60 112 q 3 -18 16 -18 q 5 -10 13 -2 q 11 0 11 12 q 0 8 -4 8 Z" />
        <path d="M 100 94 q 9 -3 10 -14 q 1 -7 6 -6 q 4 1 1 8 q -2 12 -9 16 Z" />
        <rect x="66" y="110" width="3.4" height="9" rx="1.6" />
        <rect x="94" y="110" width="3.4" height="9" rx="1.6" />
      </g>
      <path d="M 112 96 L 150 100" stroke={C.wood} strokeWidth="2.4" strokeLinecap="round" />
      <Palm x={30} y={96} scale={0.8} frond={C.leaf} trunk={C.earth} />
      <Tuft x={150} y={114} scale={1} color={C.leaf} />
    </>
  ),
  "31-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Ridge y={84} sway={5} fill={C.sandDeep} />
      <path d="M 0 100 q 70 -12 140 -12 q 70 0 132 -6" stroke={C.sand} strokeWidth="14" fill="none" opacity="0.9" strokeLinecap="round" />
      <g fill={C.crimson} opacity="0.85">
        <path d="M 16 104 q 18 -10 36 -2 q -18 8 -36 2 Z" />
        <path d="M 108 100 q 20 -11 40 -2 q -20 9 -40 2 Z" fill={C.purple} />
        <path d="M 200 98 q 18 -10 36 -2 q -18 8 -36 2 Z" fill={C.leafDeep} />
      </g>
      <g fill={C.clothDeep}>
        <path d="M 60 116 q 20 -12 40 -2 q -20 9 -40 2 Z" />
        <path d="M 156 118 q 18 -11 36 -2 q -18 8 -36 2 Z" fill={C.cloth} />
      </g>
      <Palm x={250} y={90} scale={0.7} frond={C.leaf} trunk={C.earth} />
    </>
  ),
  "31-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.grassLight} />
      <Ridge y={96} sway={6} fill={C.grass} />
      <g fill={C.leaf}>
        <path d="M 30 118 q -18 -30 -2 -44 q 10 16 8 44 Z" />
        <path d="M 34 118 q 18 -32 4 -46 q -12 18 -10 46 Z" />
        <path d="M 100 116 q -20 -34 -2 -48 q 11 18 9 48 Z" />
        <path d="M 104 116 q 20 -36 4 -50 q -13 20 -11 50 Z" />
        <path d="M 176 118 q -18 -30 -2 -44 q 10 16 8 44 Z" />
        <path d="M 180 118 q 18 -32 4 -46 q -12 18 -10 46 Z" />
        <path d="M 246 116 q -20 -34 -2 -48 q 11 18 9 48 Z" />
        <path d="M 250 116 q 20 -36 4 -50 q -13 20 -11 50 Z" />
      </g>
      <g fill={C.leafDeep} opacity="0.6">
        <path d="M 66 120 q -14 -24 -2 -34 q 8 12 6 34 Z" />
        <path d="M 212 120 q -14 -24 -2 -34 q 8 12 6 34 Z" />
      </g>
      <Sun x={136} y={22} r={16} color={C.sun} ray={C.sunRay} />
    </>
  ),
  "31-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={26} r={92} color={C.flameBright} />
      <g fill="none" stroke={C.gold} strokeWidth="2.4" opacity="0.8">
        <path d="M 40 34 q 14 -12 28 0" /><path d="M 30 22 q 24 -20 48 0" />
        <path d="M 204 34 q 14 -12 28 0" /><path d="M 194 22 q 24 -20 48 0" />
        <path d="M 120 20 q 16 -14 32 0" />
      </g>
      <Ridge y={98} sway={5} fill={C.sand} />
      <Person x={40} y={118} scale={0.72} robe={C.crimson} scarf={C.gold} skin={C.earth} />
      <Person x={86} y={118} scale={0.68} robe={C.purple} scarf={C.clothDeep} skin={C.clothDeep} />
      <Person x={186} y={118} scale={0.7} robe={C.leafDeep} scarf={C.cloth} skin={C.earth} />
      <Person x={232} y={118} scale={0.66} robe={C.clothDeep} scarf={C.crimson} skin={C.earth} />
      <g fill={C.leaf}>
        <path d="M 130 112 q -14 -22 -2 -32 q 8 12 6 32 Z" />
        <path d="M 134 112 q 14 -24 2 -34 q -9 14 -7 34 Z" />
      </g>
    </>
  ),
  "31-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.dawn} />
      <Sun x={40} y={22} r={15} color={C.sun} ray={C.sunRay} />
      <g fill={C.stone}>
        <rect x="0" y="66" width="272" height="40" />
      </g>
      <g fill={C.stoneDeep}>
        <rect x="0" y="58" width="22" height="9" /><rect x="46" y="58" width="22" height="9" />
        <rect x="92" y="58" width="22" height="9" /><rect x="160" y="58" width="22" height="9" />
        <rect x="206" y="58" width="22" height="9" /><rect x="250" y="58" width="22" height="9" />
      </g>
      <path d="M 118 106 L 118 84 Q 136 66 154 84 L 154 106 Z" fill={C.woodDeep} />
      <Ridge y={110} sway={4} fill={C.sandDeep} />
      <g fill={C.leaf}>
        <path d="M 60 118 q -12 -18 -2 -26 q 7 10 5 26 Z" />
        <path d="M 210 118 q 12 -20 2 -28 q -8 12 -6 28 Z" />
      </g>
      <g fill={C.gold} opacity="0.7">
        <circle cx="96" cy="46" r="2.6" /><circle cx="178" cy="42" r="2.4" /><circle cx="136" cy="38" r="2.2" />
      </g>
    </>
  ),

  // 32 — Resurrection & The Empty Tomb
  "32-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={228} y={94} r={72} color={C.flameBright} />
      <Ridge y={92} sway={8} fill={C.grass} />
      <Ridge y={110} sway={5} fill={C.grassDeep} />
      <Person x={72} y={118} scale={0.78} robe={C.purple} scarf={C.clothDeep} skin={C.earth} />
      <Person x={116} y={118} scale={0.74} robe={C.crimson} scarf={C.gold} skin={C.clothDeep} />
      <Jar x={152} y={116} scale={0.7} body={C.wood} rim={C.gold} />
      <Bloom x={30} y={106} r={2.6} petal={C.cloud} heart={C.gold} />
      <Bloom x={196} y={112} r={2.4} petal={C.blossom} heart={C.gold} />
      <Tuft x={244} y={116} scale={1.1} color={C.leaf} />
    </>
  ),
  "32-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Ridge y={98} sway={5} fill={C.grass} />
      <g fill={C.stoneDeep}>
        <path d="M 96 104 L 96 62 Q 96 34 148 34 Q 200 34 200 62 L 200 104 Z" />
      </g>
      <path d="M 118 104 L 118 70 Q 118 52 148 52 Q 178 52 178 70 L 178 104 Z" fill={C.deepNight} />
      <g>
        <circle cx="56" cy="94" r="26" fill={C.stone} />
        <circle cx="50" cy="88" r="9" fill={C.stoneShade} opacity="0.6" />
        <path d="M 30 108 q 26 10 52 0" stroke={C.sandDeep} strokeWidth="4" fill="none" opacity="0.7" />
      </g>
      <Glow id={`b${uid}`} x={148} y={92} r={54} color={C.dawn} />
      <Sun x={236} y={24} r={14} color={C.sun} ray={C.sunRay} />
    </>
  ),
  "32-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <g fill={C.stoneDeep}>
        <rect x="0" y="0" width="272" height="120" />
      </g>
      <g fill={C.night}>
        <path d="M 36 120 L 36 46 Q 36 18 136 18 Q 236 18 236 46 L 236 120 Z" />
      </g>
      <g fill={C.stone}>
        <rect x="82" y="96" width="108" height="14" rx="3" />
        <rect x="88" y="88" width="96" height="8" rx="3" fill={C.stoneShade} />
      </g>
      <g fill={C.cloth} opacity="0.9">
        <path d="M 96 88 q 20 -12 42 -2 q -20 8 -42 2 Z" />
        <path d="M 140 86 q 18 -10 36 -2 q -18 8 -36 2 Z" />
      </g>
      <Glow id={`b${uid}`} x={136} y={54} r={70} color={C.dawn} />
      <g stroke={C.dawn} strokeWidth="2" opacity="0.4" strokeLinecap="round">
        <path d="M 100 30 L 88 76" /><path d="M 172 30 L 184 76" />
      </g>
    </>
  ),
  "32-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.deepNight} />
      <g fill={C.stoneDeep}>
        <path d="M 20 120 L 20 44 Q 20 14 136 14 Q 252 14 252 44 L 252 120 Z" />
      </g>
      <path d="M 44 120 L 44 52 Q 44 28 136 28 Q 228 28 228 52 L 228 120 Z" fill={C.deepNight} />
      <Glow id={`b${uid}`} x={136} y={70} r={116} color={C.flameBright} />
      <g fill={C.cloud} opacity="0.95">
        <path d="M 66 118 L 66 84 Q 66 66 88 66 Q 110 66 110 84 L 110 118 Z" />
        <path d="M 162 118 L 162 84 Q 162 66 184 66 Q 206 66 206 84 L 206 118 Z" />
        <circle cx="88" cy="56" r="10" /><circle cx="184" cy="56" r="10" />
      </g>
      <g fill={C.gold} opacity="0.8">
        <circle cx="88" cy="40" r="10" fill="none" stroke={C.gold} strokeWidth="2.4" />
        <circle cx="184" cy="40" r="10" fill="none" stroke={C.gold} strokeWidth="2.4" />
      </g>
      <g fill={C.stoneShade} opacity="0.5">
        <rect x="118" y="102" width="36" height="18" rx="3" />
      </g>
    </>
  ),
  "32-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Sun x={222} y={22} r={17} color={C.sun} ray={C.sunRay} />
      <Ridge y={88} sway={10} fill={C.grassLight} />
      <Ridge y={106} sway={6} fill={C.grass} />
      <Person x={80} y={118} scale={0.8} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Person x={124} y={116} scale={0.76} robe={C.crimson} scarf={C.cloth} skin={C.clothDeep} />
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.7">
        <path d="M 150 88 q 12 -10 24 0" /><path d="M 144 76 q 18 -14 36 0" />
      </g>
      <Bloom x={40} y={110} r={2.8} petal={C.cloud} heart={C.gold} />
      <Bloom x={196} y={112} r={2.4} petal={C.blossom} heart={C.gold} />
      <Birds x={40} y={24} scale={0.9} color={C.stoneShade} />
    </>
  ),

  // 33 — The Great Commission & Ascension
  "33-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.dawn} />
      <Peaks points="L 54 66 L 118 30 L 182 68 L 244 40 L 272 62" fill={C.stoneShade} />
      <Ridge y={96} sway={6} fill={C.grass} />
      <Person x={44} y={118} scale={0.7} robe={C.clothDeep} scarf={C.earthDeep} skin={C.earth} />
      <Person x={80} y={118} scale={0.68} robe={C.purple} scarf={C.cloth} skin={C.clothDeep} />
      <Person x={116} y={118} scale={0.72} robe={C.crimson} scarf={C.gold} skin={C.earth} />
      <Person x={152} y={118} scale={0.68} robe={C.leafDeep} scarf={C.clothDeep} skin={C.earth} />
      <Person x={188} y={118} scale={0.7} robe={C.cloth} scarf={C.crimson} skin={C.clothDeep} />
      <Tuft x={240} y={112} scale={1.1} color={C.leaf} />
    </>
  ),
  "33-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Glow id={`b${uid}`} x={136} y={16} r={116} color={C.flameBright} />
      <g stroke={C.gold} strokeWidth="3" strokeLinecap="round" opacity="0.55">
        <path d="M 136 16 L 20 40" /><path d="M 136 16 L 62 4" /><path d="M 136 16 L 210 4" />
        <path d="M 136 16 L 252 40" /><path d="M 136 16 L 96 96" /><path d="M 136 16 L 176 96" />
      </g>
      <Peaks points="L 60 98 L 136 60 L 212 100 L 272 112" fill={C.stoneShade} />
      <Ridge y={112} sway={4} fill={C.grass} />
      <g fill={C.gold} opacity="0.75">
        <circle cx="46" cy="60" r="3" /><circle cx="226" cy="58" r="2.6" />
      </g>
    </>
  ),
  "33-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Glow id={`b${uid}`} x={136} y={72} r={104} color={C.deepWater} />
      <circle cx="136" cy="72" r="46" fill={C.deepWater} opacity="0.85" />
      <g fill={C.grassDeep} opacity="0.9">
        <path d="M 112 44 q 18 -6 32 4 q -8 12 -24 10 q -12 -6 -8 -14 Z" />
        <path d="M 150 62 q 20 4 24 20 q -16 8 -28 -4 q -4 -10 4 -16 Z" />
        <path d="M 100 76 q 6 16 -2 26 q -14 -6 -16 -20 q 6 -8 18 -6 Z" />
      </g>
      <g stroke={C.foam} strokeWidth="1.4" fill="none" opacity="0.5">
        <ellipse cx="136" cy="72" rx="46" ry="18" />
        <path d="M 90 72 h 92" />
      </g>
      <g fill={C.star} opacity="0.85">
        <circle cx="30" cy="26" r="2" /><circle cx="238" cy="30" r="2.2" /><circle cx="60" cy="102" r="1.8" />
        <circle cx="216" cy="104" r="2" />
      </g>
    </>
  ),
  "33-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={98} r={98} color={C.gold} />
      <Ridge y={102} sway={6} fill={C.grass} />
      <g fill={C.crimson} opacity="0.85">
        <path d="M 136 30 q -14 -16 2 -22 q 10 -3 12 5 q 3 -8 12 -5 q 16 6 2 22 q -14 14 -28 0 Z" />
      </g>
      <Person x={100} y={118} scale={0.72} robe={C.purple} scarf={C.cloth} skin={C.earth} />
      <Person x={172} y={118} scale={0.72} robe={C.clothDeep} scarf={C.crimson} skin={C.clothDeep} />
      <g fill={C.gold} opacity="0.7">
        <circle cx="52" cy="96" r="3" /><circle cx="222" cy="94" r="2.6" /><circle cx="136" cy="106" r="2.4" />
      </g>
      <Tuft x={30} y={114} scale={1.1} color={C.leaf} />
    </>
  ),
  "33-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={22} r={110} color={C.cloud} />
      <g fill={C.cloud}>
        <ellipse cx="136" cy="24" rx="62" ry="20" />
        <ellipse cx="92" cy="32" rx="34" ry="13" />
        <ellipse cx="182" cy="30" rx="36" ry="13" />
      </g>
      <g stroke={C.dawn} strokeWidth="2.6" strokeLinecap="round" opacity="0.5">
        <path d="M 108 44 L 92 98" /><path d="M 136 46 L 136 98" /><path d="M 164 44 L 180 98" />
      </g>
      <Ridge y={104} sway={5} fill={C.grass} />
      <Person x={92} y={118} scale={0.68} robe={C.clothDeep} scarf={C.earthDeep} skin={C.earth} />
      <Person x={136} y={118} scale={0.7} robe={C.purple} scarf={C.gold} skin={C.clothDeep} />
      <Person x={180} y={118} scale={0.68} robe={C.crimson} scarf={C.cloth} skin={C.earth} />
    </>
  ),

  // 34 — Pentecost & The Rush of Wind
  "34-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.earthDeep} />
      <g fill={C.stoneDeep}>
        <rect x="0" y="0" width="272" height="16" />
        <rect x="0" y="104" width="272" height="16" />
      </g>
      <g fill={C.stone} opacity="0.4">
        <rect x="0" y="16" width="272" height="88" />
      </g>
      <Person x={40} y={102} scale={0.72} robe={C.clothDeep} scarf={C.earthDeep} skin={C.earth} />
      <Person x={80} y={102} scale={0.7} robe={C.purple} scarf={C.cloth} skin={C.clothDeep} />
      <Person x={120} y={102} scale={0.74} robe={C.crimson} scarf={C.gold} skin={C.earth} />
      <Person x={160} y={102} scale={0.7} robe={C.leafDeep} scarf={C.clothDeep} skin={C.earth} />
      <Person x={200} y={102} scale={0.72} robe={C.cloth} scarf={C.crimson} skin={C.clothDeep} />
      <g transform="translate(240,96)">
        <path d="M 0 0 q -5 -14 7 -14 q 12 0 7 14 Z" fill={C.bronze} />
        <path d="M 7 -16 q -4 -9 0 -13 q 4 5 0 13 Z" fill={C.flame} />
      </g>
      <Glow id={`b${uid}`} x={246} y={96} r={44} color={C.flame} />
    </>
  ),
  "34-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.sand} />
      <g fill={C.stoneDeep}>
        <rect x="0" y="0" width="272" height="14" />
        <rect x="0" y="106" width="272" height="14" />
      </g>
      <g stroke={C.cloud} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M 6 32 q 50 -16 100 0 q 50 16 100 0 q 30 -10 60 -2" />
        <path d="M 6 54 q 50 -16 100 0 q 50 16 100 0 q 30 -10 60 -2" />
        <path d="M 6 78 q 50 -16 100 0 q 50 16 100 0 q 30 -10 60 -2" />
        <path d="M 6 96 q 40 -12 80 0 q 40 12 80 0" />
      </g>
      <g stroke={C.foam} strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M 20 44 q 30 -10 60 0" /><path d="M 180 68 q 30 -10 60 0" />
      </g>
    </>
  ),
  "34-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={94} r={116} color={C.flame} />
      <g fill={C.stoneDeep}>
        <rect x="0" y="108" width="272" height="12" />
      </g>
      <Person x={40} y={106} scale={0.7} robe={C.clothDeep} scarf={C.earthDeep} skin={C.earth} />
      <Person x={88} y={106} scale={0.68} robe={C.purple} scarf={C.cloth} skin={C.clothDeep} />
      <Person x={136} y={106} scale={0.72} robe={C.crimson} scarf={C.gold} skin={C.earth} />
      <Person x={184} y={106} scale={0.68} robe={C.leafDeep} scarf={C.clothDeep} skin={C.earth} />
      <Person x={232} y={106} scale={0.7} robe={C.cloth} scarf={C.crimson} skin={C.clothDeep} />
      <g>
        <Flame x={40} y={70} scale={0.5} />
        <Flame x={88} y={70} scale={0.48} />
        <Flame x={136} y={68} scale={0.52} />
        <Flame x={184} y={70} scale={0.48} />
        <Flame x={232} y={70} scale={0.5} />
      </g>
    </>
  ),
  "34-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Ridge y={102} sway={5} fill={C.sandDeep} />
      <g opacity="0.9">
        <path d="M 20 30 q 16 -14 30 0 q -4 12 -16 11 l -8 8 l 0 -9 q -10 -2 -6 -10 Z" fill={C.crimson} />
        <path d="M 78 20 q 16 -14 30 0 q -4 12 -16 11 l -8 8 l 0 -9 q -10 -2 -6 -10 Z" fill={C.deepWater} />
        <path d="M 140 28 q 16 -14 30 0 q -4 12 -16 11 l -8 8 l 0 -9 q -10 -2 -6 -10 Z" fill={C.leaf} />
        <path d="M 200 18 q 16 -14 30 0 q -4 12 -16 11 l -8 8 l 0 -9 q -10 -2 -6 -10 Z" fill={C.purple} />
        <path d="M 236 36 q 14 -12 26 0 q -3 10 -14 9 l -7 7 l 0 -8 q -9 -2 -5 -8 Z" fill={C.gold} />
      </g>
      <Person x={60} y={118} scale={0.72} robe={C.clothDeep} scarf={C.earthDeep} skin={C.earth} />
      <Person x={136} y={118} scale={0.74} robe={C.purple} scarf={C.gold} skin={C.clothDeep} />
      <Person x={212} y={118} scale={0.72} robe={C.crimson} scarf={C.cloth} skin={C.earth} />
    </>
  ),
  "34-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={96} r={92} color={C.gold} />
      <Ridge y={100} sway={4} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="108" y="96" width="56" height="10" rx="2" />
      </g>
      <Person x={136} y={96} scale={0.85} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <g fill={C.clothDeep}>
        <circle cx="30" cy="112" r="5" /><circle cx="54" cy="116" r="5" /><circle cx="78" cy="112" r="5" />
        <circle cx="194" cy="112" r="5" /><circle cx="218" cy="116" r="5" /><circle cx="242" cy="112" r="5" />
        <circle cx="42" cy="102" r="4.4" /><circle cx="230" cy="102" r="4.4" />
      </g>
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.6">
        <path d="M 100 40 q 14 -12 28 0" /><path d="M 152 40 q 14 -12 28 0" />
      </g>
    </>
  ),

  // 35 — Peter & John at the Beautiful Gate
  "35-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.sand} />
      <g fill={C.stone}>
        <rect x="160" y="46" width="112" height="60" />
        <path d="M 152 46 L 216 22 L 272 46 Z" fill={C.stoneDeep} />
      </g>
      <g fill={C.cloth}>
        <rect x="180" y="62" width="12" height="44" /><rect x="212" y="62" width="12" height="44" />
        <rect x="244" y="62" width="12" height="44" />
      </g>
      <Ridge y={106} sway={4} fill={C.sandDeep} />
      <path d="M 0 118 q 60 -12 120 -14" stroke={C.sand} strokeWidth="8" fill="none" opacity="0.85" strokeLinecap="round" />
      <Person x={54} y={116} scale={0.82} robe={C.clothDeep} scarf={C.earthDeep} skin={C.earth} />
      <Person x={100} y={116} scale={0.78} robe={C.purple} scarf={C.cloth} skin={C.clothDeep} />
    </>
  ),
  "35-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <g fill={C.stone}>
        <rect x="0" y="30" width="272" height="76" />
      </g>
      <path d="M 96 106 L 96 60 Q 136 24 176 60 L 176 106 Z" fill={C.deepNight} opacity="0.6" />
      <g fill={C.gold} opacity="0.85">
        <path d="M 90 106 L 90 58 Q 136 20 182 58 L 182 106 L 176 106 L 176 60 Q 136 28 96 60 L 96 106 Z" />
      </g>
      <Ridge y={108} sway={3} fill={C.sandDeep} />
      <g transform="translate(46,116)">
        <path d="M -20 2 q 3 -14 20 -14 q 17 0 20 14 Z" fill={C.clothDeep} />
        <circle cx="0" cy="-18" r="6.5" fill={C.earth} />
        <path d="M -7 -20 q 7 -9 14 0 q -7 4 -14 0 Z" fill={C.earthDeep} />
      </g>
      <g fill={C.bronze}>
        <circle cx="86" cy="114" r="4" /><circle cx="98" cy="117" r="3.4" />
      </g>
    </>
  ),
  "35-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.sand} bottom={C.dawn} />
      <g fill={C.stone}>
        <rect x="0" y="24" width="272" height="70" />
      </g>
      <g stroke={C.stoneShade} strokeWidth="1.6" opacity="0.6">
        <path d="M 0 46 h 272 M 0 70 h 272" />
      </g>
      <Ridge y={98} sway={3} fill={C.sandDeep} />
      <Person x={78} y={116} scale={0.85} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Person x={116} y={116} scale={0.8} robe={C.clothDeep} scarf={C.cloth} skin={C.clothDeep} />
      <g transform="translate(198,116)">
        <path d="M -20 2 q 3 -14 20 -14 q 17 0 20 14 Z" fill={C.clothDeep} />
        <circle cx="0" cy="-18" r="6.5" fill={C.earth} />
      </g>
      <g fill={C.bronze} opacity="0.5">
        <circle cx="160" cy="116" r="4" /><circle cx="172" cy="118" r="3.4" />
      </g>
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.7">
        <path d="M 136 96 q 14 -8 28 0" />
      </g>
    </>
  ),
  "35-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Glow id={`b${uid}`} x={136} y={98} r={90} color={C.flameBright} />
      <g fill={C.stone} opacity="0.8">
        <rect x="0" y="20" width="272" height="60" />
      </g>
      <Ridge y={100} sway={3} fill={C.sandDeep} />
      <Person x={106} y={118} scale={0.85} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Person x={166} y={118} scale={0.85} robe={C.clothDeep} scarf={C.crimson} skin={C.earth} />
      <path d="M 118 90 q 18 -8 36 0" stroke={C.earth} strokeWidth="4" fill="none" strokeLinecap="round" />
      <g fill={C.gold} opacity="0.8">
        <circle cx="70" cy="94" r="3" /><circle cx="206" cy="92" r="2.8" /><circle cx="136" cy="86" r="2.4" />
      </g>
    </>
  ),
  "35-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Sun x={44} y={20} r={15} color={C.sun} ray={C.sunRay} />
      <g fill={C.stone} opacity="0.75">
        <rect x="176" y="34" width="96" height="72" />
        <rect x="196" y="50" width="12" height="56" fill={C.cloth} />
        <rect x="228" y="50" width="12" height="56" fill={C.cloth} />
      </g>
      <Ridge y={106} sway={4} fill={C.sandDeep} />
      <g transform="translate(96,104) rotate(-12)">
        <Person x={0} y={0} scale={0.85} robe={C.crimson} scarf={C.gold} skin={C.earth} />
      </g>
      <g fill="none" stroke={C.gold} strokeWidth="2.4" opacity="0.75">
        <path d="M 128 62 q 14 -12 28 0" /><path d="M 120 50 q 22 -18 44 0" />
      </g>
      <g fill={C.gold} opacity="0.7">
        <circle cx="52" cy="92" r="2.6" /><circle cx="150" cy="96" r="2.4" />
      </g>
    </>
  ),

  // 36 — Paul on the Damascus Road
  "36-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.sand} bottom={C.dawn} />
      <Peaks points="L 60 74 L 130 92 L 196 70 L 272 92" fill={C.sandDeep} />
      <Ridge y={100} sway={5} fill={C.sand} />
      <path d="M 0 118 q 70 -12 140 -14 q 70 -2 132 -6" stroke={C.clothDeep} strokeWidth="7" fill="none" opacity="0.75" strokeLinecap="round" />
      <Horse x={30} y={116} scale={0.8} coat={C.earthDeep} mane={C.ink} />
      <Person x={140} y={116} scale={0.78} robe={C.storm} scarf={C.stoneShade} skin={C.earth} />
      <Scroll x={182} y={104} scale={0.62} sheet={C.cloth} rod={C.wood} />
      <Person x={230} y={116} scale={0.72} robe={C.clothDeep} scarf={C.earthDeep} skin={C.earth} />
    </>
  ),
  "36-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.cloud} />
      <Glow id={`b${uid}`} x={136} y={34} r={150} color={C.cloud} />
      <g stroke={C.flameBright} strokeWidth="4" strokeLinecap="round" opacity="0.8">
        <path d="M 136 34 L 8 6" /><path d="M 136 34 L 70 -6" /><path d="M 136 34 L 202 -6" />
        <path d="M 136 34 L 264 6" /><path d="M 136 34 L 20 92" /><path d="M 136 34 L 252 92" />
        <path d="M 136 34 L 96 108" /><path d="M 136 34 L 176 108" />
      </g>
      <circle cx="136" cy="34" r="26" fill={C.cloud} />
      <Ridge y={112} sway={4} fill={C.sandDeep} />
      <g fill={C.storm} opacity="0.7">
        <path d="M 100 118 q 22 -14 48 -2 q -22 10 -48 2 Z" />
      </g>
    </>
  ),
  "36-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.sand} />
      <Glow id={`b${uid}`} x={136} y={20} r={104} color={C.flameBright} />
      <g fill="none" stroke={C.gold} strokeWidth="2.6" opacity="0.7">
        <path d="M 100 44 q 36 -22 72 0" />
        <path d="M 84 30 q 52 -32 104 0" />
        <path d="M 68 16 q 68 -40 136 0" />
      </g>
      <Ridge y={104} sway={4} fill={C.sandDeep} />
      <g fill={C.storm}>
        <path d="M 92 116 q 26 -16 56 -2 q -26 12 -56 2 Z" />
        <circle cx="86" cy="110" r="7" fill={C.earth} />
      </g>
      <Horse x={196} y={114} scale={0.7} coat={C.earthDeep} mane={C.ink} />
    </>
  ),
  "36-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.sand} />
      <g fill={C.stone} opacity="0.8">
        <rect x="0" y="40" width="88" height="64" />
        <rect x="24" y="66" width="24" height="38" rx="2" fill={C.woodDeep} />
        <rect x="196" y="34" width="76" height="70" />
        <rect x="222" y="60" width="22" height="44" rx="2" fill={C.woodDeep} />
      </g>
      <Ridge y={104} sway={3} fill={C.sandDeep} />
      <Person x={112} y={118} scale={0.82} robe={C.cloth} scarf={C.leafDeep} skin={C.earth} />
      <Person x={160} y={118} scale={0.82} robe={C.storm} scarf={C.stoneShade} skin={C.earth} />
      <Glow id={`b${uid}`} x={136} y={92} r={64} color={C.gold} />
      <g fill={C.gold} opacity="0.85">
        <circle cx="136" cy="34" r="3" /><circle cx="120" cy="26" r="2.4" /><circle cx="152" cy="26" r="2.4" />
      </g>
    </>
  ),
  "36-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Sun x={228} y={22} r={16} color={C.sun} ray={C.sunRay} />
      <Ridge y={98} sway={5} fill={C.sand} />
      <g fill={C.stone} opacity="0.7">
        <rect x="0" y="56" width="70" height="46" />
        <path d="M -6 56 L 34 34 L 76 56 Z" fill={C.stoneDeep} />
      </g>
      <Person x={116} y={118} scale={0.88} robe={C.cloth} scarf={C.crimson} skin={C.earth} />
      <Scroll x={148} y={92} scale={0.72} sheet={C.cloth} rod={C.wood} />
      <g fill={C.clothDeep}>
        <circle cx="192" cy="112" r="5" /><circle cx="214" cy="116" r="5" /><circle cx="236" cy="112" r="5" />
      </g>
      <Dove x={44} y={20} scale={0.62} flip={1} />
      <g fill={C.gold} opacity="0.7">
        <circle cx="96" cy="86" r="2.6" /><circle cx="170" cy="80" r="2.4" />
      </g>
    </>
  ),
};
