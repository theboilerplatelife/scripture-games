/* Verse scenes, chapters 11-15: Prayer & Peace, Armor of God,
   Unfailing Love, The Good News, Eternal Life & Hope.

   Two of these chapters are a single passage split across eight
   cards — the armour, and the love chapter — so each card takes one
   piece or one clause and gives it its own picture rather than
   redrawing the same soldier or the same heart eight times. */
import {
  C, Sky, Glow, Ridge, Peaks, Sun, Moon, Stars, Clouds, Birds, Water,
  Rain, Tuft, Bloom, Tree, Jar, Scroll, Flame, Dove, Person,
} from "../staging.jsx";

export const VERSES_11_15 = {
  // Chapter 11 — Prayer & Peace
  "Philippians 4:6": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.dawn} />
      <Ridge y={100} sway={6} fill={C.grass} />
      <Person x={100} y={118} scale={0.85} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <g fill="none" stroke={C.gold} strokeWidth="2.2" opacity="0.75">
        <path d="M 124 76 q 16 -12 32 0" /><path d="M 116 62 q 24 -20 48 0" />
        <path d="M 108 46 q 32 -26 64 0" />
      </g>
      <g fill={C.crimson} opacity="0.85">
        <path d="M 210 34 q -11 -13 2 -18 q 8 -3 9 4 q 2 -6 9 -4 q 13 5 2 18 q -11 11 -22 0 Z" />
      </g>
      <Bloom x={44} y={112} r={2.6} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "Philippians 4:7": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={46} r={96} color={C.cloud} />
      <g transform="translate(136,40)">
        <path d="M 0 -28 L 28 -18 L 28 6 Q 28 28 0 42 Q -28 28 -28 6 L -28 -18 Z" fill={C.water} opacity="0.85" />
        <path d="M 0 -20 L 20 -13 L 20 5 Q 20 20 0 30 Q -20 20 -20 5 L -20 -13 Z" fill={C.foam} opacity="0.9" />
        <path d="M 0 -8 q -10 12 0 24 q 10 -14 0 -24 Z" fill={C.crimson} opacity="0.65" />
      </g>
      <Ridge y={104} sway={6} fill={C.grass} />
      <Bloom x={54} y={112} r={2.6} petal={C.cloud} heart={C.gold} />
      <Bloom x={216} y={114} r={2.4} petal={C.blossom} heart={C.gold} />
    </>
  ),
  "1 Peter 5:7": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Ridge y={92} sway={8} fill={C.grass} />
      <Water y={104} fill={C.water} />
      <Person x={80} y={102} scale={0.8} robe={C.clothDeep} scarf={C.crimson} skin={C.earth} />
      <g fill={C.stoneShade} opacity="0.75">
        <path d="M 128 96 q 14 -12 28 -2 q -14 10 -28 2 Z" />
        <path d="M 158 104 q 12 -10 24 -2 q -12 9 -24 2 Z" />
      </g>
      <g stroke={C.foam} strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round">
        <path d="M 150 114 q 12 -6 24 0" /><path d="M 200 112 q 12 -6 24 0" />
      </g>
      <Birds x={210} y={22} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "Matthew 11:28": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.grassLight} />
      <Glow id={`b${uid}`} x={200} y={92} r={86} color={C.flameBright} />
      <Ridge y={96} sway={8} fill={C.grass} />
      <Tree x={200} y={110} scale={1.5} canopy={C.grassDeep} shade={C.leaf} trunk={C.earth} />
      <g fill={C.clothDeep}>
        <path d="M 70 116 q 22 -14 46 -2 q -22 10 -46 2 Z" />
        <path d="M 80 110 q 18 -11 34 -2 q -18 8 -34 2 Z" fill={C.cloth} />
      </g>
      <Jar x={140} y={116} scale={0.7} body={C.earth} rim={C.earthDeep} />
      <Tuft x={30} y={112} scale={1.1} color={C.leaf} />
    </>
  ),
  "John 14:27": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Glow id={`b${uid}`} x={120} y={28} r={92} color={C.cloud} />
      <Dove x={92} y={22} scale={1.2} flip={1} />
      <g fill={C.leaf}>
        <path d="M 84 34 q -18 -8 -28 0 q 16 9 28 0 Z" />
      </g>
      <Water y={94} fill={C.water} />
      <g stroke={C.foam} strokeWidth="1.8" fill="none" opacity="0.5">
        <path d="M 30 108 h 46" /><path d="M 150 114 h 54" /><path d="M 90 118 h 38" />
      </g>
    </>
  ),
  "Isaiah 26:3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.dawn} />
      <g fill={C.storm} opacity="0.6">
        <ellipse cx="46" cy="16" rx="46" ry="12" />
        <ellipse cx="230" cy="14" rx="42" ry="11" />
      </g>
      <Glow id={`b${uid}`} x={136} y={70} r={86} color={C.flameBright} />
      <Ridge y={104} sway={4} fill={C.sandDeep} />
      <g fill={C.stone}>
        <ellipse cx="136" cy="106" rx="44" ry="12" />
        <ellipse cx="136" cy="92" rx="30" ry="10" />
        <ellipse cx="136" cy="80" rx="18" ry="8" />
      </g>
      <Rain seed={31} count={10} color={C.foam} />
    </>
  ),
  "Psalm 4:8": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Stars seed={67} count={18} size={1.4} />
      <Moon x={220} y={24} r={14} />
      <g fill={C.deepNight}>
        <rect x="0" y="70" width="272" height="50" />
      </g>
      <g fill={C.night}>
        <rect x="52" y="86" width="140" height="24" rx="4" />
        <rect x="44" y="78" width="46" height="12" rx="6" fill={C.cloth} opacity="0.8" />
      </g>
      <path d="M 90 86 q 50 -14 100 0 L 192 110 L 90 110 Z" fill={C.clothDeep} opacity="0.9" />
      <Glow id={`b${uid}`} x={136} y={94} r={70} color={C.night} />
    </>
  ),
  "Colossians 3:15": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.blossom} bottom={C.grassLight} />
      <Glow id={`b${uid}`} x={136} y={40} r={90} color={C.dawn} />
      <g fill={C.crimson}>
        <path d="M 136 60 q -26 -30 4 -40 q 17 -6 21 6 q 4 -12 21 -6 q 30 10 4 40 q -25 24 -50 0 Z" />
      </g>
      <g fill={C.gold} opacity="0.85">
        <circle cx="136" cy="40" r="7" />
      </g>
      <Ridge y={104} sway={6} fill={C.grass} />
      <Person x={70} y={118} scale={0.68} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Person x={202} y={118} scale={0.68} robe={C.leafDeep} scarf={C.cloth} skin={C.clothDeep} />
    </>
  ),

  // Chapter 12 — Armor of God
  "Ephesians 6:10–11": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Glow id={`b${uid}`} x={136} y={62} r={94} color={C.gold} />
      <Ridge y={102} sway={5} fill={C.sandDeep} />
      <g transform="translate(136,58)">
        <path d="M -26 -18 L 26 -18 L 22 30 L -22 30 Z" fill={C.bronze} />
        <path d="M -26 -18 q 26 -12 52 0" fill={C.gold} />
        <path d="M -30 -14 L -40 6 L -30 8 Z" fill={C.bronze} />
        <path d="M 30 -14 L 40 6 L 30 8 Z" fill={C.bronze} />
        <path d="M 0 -12 L 0 26" stroke={C.gold} strokeWidth="2.4" />
      </g>
      <Tuft x={40} y={116} scale={1.1} color={C.leaf} />
    </>
  ),
  "Ephesians 6:14": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.sand} />
      <Ridge y={104} sway={4} fill={C.sandDeep} />
      <g transform="translate(136,86)">
        <rect x="-52" y="-6" width="104" height="14" rx="4" fill={C.earthDeep} />
        <rect x="-12" y="-10" width="24" height="22" rx="3" fill={C.gold} />
        <circle cx="0" cy="1" r="5" fill={C.bronze} />
      </g>
      <g fill={C.bronze}>
        <path d="M 96 40 L 176 40 L 168 74 L 104 74 Z" />
        <path d="M 96 40 q 40 -14 80 0" fill={C.gold} />
      </g>
      <Sun x={40} y={22} r={13} color={C.sun} ray={C.sunRay} />
    </>
  ),
  "Ephesians 6:15": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Ridge y={98} sway={6} fill={C.grass} />
      <path d="M 0 116 q 70 -14 140 -16 q 70 -2 132 -6" stroke={C.sand} strokeWidth="8" fill="none" opacity="0.85" strokeLinecap="round" />
      <g fill={C.earthDeep}>
        <path d="M 82 106 q -4 -16 12 -16 q 18 0 20 8 q 2 8 -6 8 Z" />
        <path d="M 146 110 q -4 -16 12 -16 q 18 0 20 8 q 2 8 -6 8 Z" />
      </g>
      <g stroke={C.wood} strokeWidth="2" opacity="0.8">
        <path d="M 86 98 h 20 M 150 102 h 20" />
      </g>
      <Dove x={196} y={22} scale={0.7} flip={1} />
      <Tuft x={44} y={112} scale={1.1} color={C.leaf} />
    </>
  ),
  "Ephesians 6:16": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.ember} />
      <g stroke={C.flame} strokeWidth="2.6" strokeLinecap="round" opacity="0.85">
        <path d="M 20 20 L 56 40" /><path d="M 12 52 L 50 62" /><path d="M 24 88 L 58 82" />
        <path d="M 252 20 L 216 40" /><path d="M 260 52 L 222 62" />
      </g>
      <g transform="translate(136,60)">
        <path d="M 0 -34 L 34 -21 L 34 8 Q 34 34 0 50 Q -34 34 -34 8 L -34 -21 Z" fill={C.bronze} />
        <path d="M 0 -26 L 25 -16 L 25 6 Q 25 26 0 40 Q -25 26 -25 6 L -25 -16 Z" fill={C.gold} />
        <path d="M 0 -16 q -12 16 0 34 q 12 -18 0 -34 Z" fill={C.cloth} opacity="0.8" />
      </g>
      <Ridge y={112} sway={4} fill={C.sandDeep} />
    </>
  ),
  "Ephesians 6:17": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.sand} />
      <Ridge y={106} sway={4} fill={C.sandDeep} />
      <g transform="translate(74,90)">
        <path d="M -22 8 q -6 -32 22 -32 q 28 0 22 32 Z" fill={C.bronze} />
        <path d="M -22 8 q 22 -8 44 0" fill={C.gold} />
        <path d="M 0 -24 q -4 -12 0 -16 q 4 5 0 16 Z" fill={C.crimson} />
      </g>
      <g transform="translate(190,60)">
        <path d="M 0 -6 L 6 -6 L 6 44 L 0 44 Z" fill={C.stone} />
        <path d="M -12 44 L 18 44 L 18 50 L -12 50 Z" fill={C.bronze} />
        <path d="M 0 50 L 6 50 L 6 62 L 0 62 Z" fill={C.woodDeep} />
        <path d="M 0 -6 L 3 -22 L 6 -6 Z" fill={C.stone} />
      </g>
      <Glow id={`b${uid}`} x={193} y={40} r={54} color={C.gold} />
    </>
  ),
  "Hebrews 4:12a": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.dusk} />
      <Glow id={`b${uid}`} x={136} y={70} r={100} color={C.flameBright} />
      <Scroll x={40} y={98} scale={0.9} sheet={C.cloth} rod={C.wood} />
      <g transform="translate(160,34) rotate(18)">
        <path d="M 0 0 L 8 0 L 8 56 L 0 56 Z" fill={C.stone} />
        <path d="M -14 56 L 22 56 L 22 62 L -14 62 Z" fill={C.gold} />
        <path d="M 0 62 L 8 62 L 8 76 L 0 76 Z" fill={C.woodDeep} />
        <path d="M 0 0 L 4 -18 L 8 0 Z" fill={C.foam} />
      </g>
      <Stars seed={71} count={8} size={1.2} />
    </>
  ),
  "2 Corinthians 10:4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={26} r={110} color={C.flameBright} />
      <g stroke={C.gold} strokeWidth="3" strokeLinecap="round" opacity="0.6">
        <path d="M 136 26 L 46 96" /><path d="M 136 26 L 136 96" /><path d="M 136 26 L 226 96" />
      </g>
      <Ridge y={106} sway={4} fill={C.sandDeep} />
      <g fill={C.stoneShade}>
        <rect x="60" y="94" width="30" height="12" rx="2" transform="rotate(-14 75 100)" />
        <rect x="106" y="102" width="34" height="12" rx="2" transform="rotate(8 123 108)" />
        <rect x="164" y="96" width="30" height="12" rx="2" transform="rotate(-18 179 102)" />
        <rect x="208" y="106" width="30" height="10" rx="2" transform="rotate(12 223 111)" />
      </g>
    </>
  ),
  "1 Thessalonians 5:8": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Ridge y={106} sway={5} fill={C.grass} />
      <g transform="translate(88,74)">
        <path d="M -26 -14 L 26 -14 L 22 30 L -22 30 Z" fill={C.bronze} />
        <path d="M -26 -14 q 26 -10 52 0" fill={C.gold} />
        <path d="M 0 4 q -10 -12 2 -16 q 7 -2 8 4 q 2 -6 8 -4 q 12 4 2 16 q -11 10 -20 0 Z" fill={C.crimson} />
      </g>
      <g transform="translate(200,86)">
        <path d="M -20 8 q -6 -30 20 -30 q 26 0 20 30 Z" fill={C.bronze} />
        <path d="M -20 8 q 20 -8 40 0" fill={C.gold} />
        <path d="M 0 -24 q -4 -12 0 -16 q 4 5 0 16 Z" fill={C.cloud} />
      </g>
      <Sun x={44} y={22} r={13} color={C.sun} ray={C.sunRay} />
    </>
  ),

  // Chapter 13 — Unfailing Love
  "1 Corinthians 13:4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.blossom} bottom={C.grassLight} />
      <Ridge y={100} sway={8} fill={C.grass} />
      <g transform="translate(70,100)">
        <path d="M 0 0 q -3 -18 6 -22" stroke={C.leaf} strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="8" cy="-26" r="7" fill={C.crimson} />
        <g fill={C.blossom}>
          <circle cx="8" cy="-38" r="5" /><circle cx="19" cy="-26" r="5" />
          <circle cx="8" cy="-14" r="5" /><circle cx="-3" cy="-26" r="5" />
        </g>
      </g>
      <g fill={C.water} opacity="0.85">
        <path d="M 150 78 q -5 12 0 16 q 5 -5 0 -16 Z" />
        <path d="M 174 88 q -4 10 0 14 q 4 -4 0 -14 Z" />
        <path d="M 198 78 q -5 12 0 16 q 5 -5 0 -16 Z" />
      </g>
      <Bloom x={230} y={110} r={2.6} petal={C.cloud} heart={C.gold} />
      <Tuft x={116} y={114} scale={1.1} color={C.leaf} />
    </>
  ),
  "1 Corinthians 13:5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Ridge y={100} sway={5} fill={C.sand} />
      <path d="M 0 112 q 70 -10 140 -10 q 70 0 132 -4" stroke={C.sandDeep} strokeWidth="8" fill="none" opacity="0.7" strokeLinecap="round" />
      <Person x={90} y={112} scale={0.8} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Person x={160} y={112} scale={0.8} robe={C.leafDeep} scarf={C.cloth} skin={C.clothDeep} />
      <g fill="none" stroke={C.gold} strokeWidth="2.4" opacity="0.7">
        <path d="M 110 84 q 16 -10 30 0" />
      </g>
      <g fill={C.gold} opacity="0.6">
        <circle cx="40" cy="92" r="2.6" /><circle cx="226" cy="94" r="2.4" />
      </g>
    </>
  ),
  "1 Corinthians 13:6": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={196} y={64} r={98} color={C.flameBright} />
      <g fill={C.deepNight} opacity="0.8">
        <ellipse cx="40" cy="46" rx="52" ry="28" />
      </g>
      <Ridge y={100} sway={6} fill={C.grass} />
      <Scroll x={116} y={92} scale={1.1} sheet={C.cloth} rod={C.wood} />
      <g fill={C.gold}>
        <path d="M 208 88 L 213 74 L 218 88 L 232 88 L 220 96 L 225 110 L 213 102 L 201 110 L 206 96 L 194 88 Z" opacity="0.85" />
      </g>
    </>
  ),
  "1 Corinthians 13:7": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.dawn} />
      <Rain seed={73} count={16} color={C.foam} />
      <Ridge y={104} sway={5} fill={C.grass} />
      <g transform="translate(136,90)">
        <path d="M -44 0 q 44 -34 88 0 Z" fill={C.crimson} opacity="0.85" />
        <path d="M 0 0 L 0 26" stroke={C.woodDeep} strokeWidth="3.4" strokeLinecap="round" />
        <path d="M -44 0 q 10 6 14 0 M 44 0 q -10 6 -14 0" stroke={C.woodDeep} strokeWidth="2" fill="none" />
      </g>
      <Person x={136} y={118} scale={0.5} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Bloom x={40} y={112} r={2.6} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "1 Corinthians 13:8a": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.blossom} />
      <Glow id={`b${uid}`} x={136} y={52} r={104} color={C.crimson} />
      <g fill="none" stroke={C.crimson} strokeWidth="7" strokeLinecap="round">
        <path d="M 84 66 q -22 -22 0 -34 q 22 -12 34 10 q 12 -22 34 -10 q 22 12 0 34 q -18 18 -34 6 q -16 12 -34 -6 Z" />
      </g>
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.6">
        <circle cx="136" cy="56" r="52" />
      </g>
      <Ridge y={108} sway={5} fill={C.grass} />
      <Bloom x={48} y={114} r={2.6} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "1 Corinthians 13:13": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Ridge y={102} sway={6} fill={C.grass} />
      <g transform="translate(56,86)">
        <path d="M 0 -16 L 20 -8 L 20 6 Q 20 20 0 30 Q -20 20 -20 6 L -20 -8 Z" fill={C.bronze} />
        <path d="M 0 -10 L 14 -5 L 14 5 Q 14 15 0 22 Q -14 15 -14 5 L -14 -5 Z" fill={C.gold} />
      </g>
      <g transform="translate(136,86)">
        <path d="M 0 22 q -18 -6 -18 -18 q 0 -10 10 -10 q 6 0 8 6 q 2 -6 8 -6 q 10 0 10 10 q 0 12 -18 18 Z" fill={C.water} />
        <path d="M 0 22 L 0 30" stroke={C.deepWater} strokeWidth="3" strokeLinecap="round" />
        <path d="M -12 26 q 12 8 24 0" stroke={C.deepWater} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g transform="translate(216,84)">
        <path d="M 0 26 q -30 -22 -22 -38 q 6 -12 16 -6 q 4 3 6 8 q 2 -5 6 -8 q 10 -6 16 6 q 8 16 -22 38 Z" fill={C.crimson} />
      </g>
    </>
  ),
  "1 John 4:11": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.blossom} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={26} r={92} color={C.cloud} />
      <g fill={C.crimson}>
        <path d="M 136 42 q -22 -24 2 -32 q 14 -5 17 5 q 3 -10 17 -5 q 24 8 2 32 q -20 20 -38 0 Z" />
      </g>
      <g stroke={C.gold} strokeWidth="2.4" strokeLinecap="round" opacity="0.6">
        <path d="M 116 58 L 92 88" /><path d="M 156 58 L 180 88" />
      </g>
      <Ridge y={104} sway={6} fill={C.grass} />
      <Person x={82} y={118} scale={0.72} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Person x={190} y={118} scale={0.72} robe={C.leafDeep} scarf={C.cloth} skin={C.clothDeep} />
    </>
  ),
  "John 13:34": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={100} r={96} color={C.flame} />
      <Ridge y={104} sway={4} fill={C.night} />
      <g fill={C.wood}>
        <rect x="46" y="100" width="180" height="8" rx="2" />
        <rect x="58" y="108" width="8" height="12" /><rect x="206" y="108" width="8" height="12" />
      </g>
      <g fill={C.sunRay}>
        <ellipse cx="96" cy="96" rx="13" ry="5" /><ellipse cx="136" cy="94" rx="12" ry="5" />
        <ellipse cx="176" cy="96" rx="13" ry="5" />
      </g>
      <g transform="translate(136,60)">
        <path d="M 0 12 q -14 -16 2 -22 q 9 -3 10 4 q 2 -7 10 -4 q 16 6 2 22 q -12 12 -24 0 Z" fill={C.crimson} />
      </g>
      <Stars seed={79} count={7} size={1.2} />
    </>
  ),

  // Chapter 14 — The Good News
  "Matthew 28:19": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Glow id={`b${uid}`} x={136} y={68} r={108} color={C.deepWater} />
      <circle cx="136" cy="68" r="44" fill={C.deepWater} />
      <g fill={C.grassDeep} opacity="0.9">
        <path d="M 112 42 q 20 -6 32 4 q -8 12 -22 10 q -14 -6 -10 -14 Z" />
        <path d="M 150 62 q 20 4 22 20 q -16 8 -28 -4 q -4 -10 6 -16 Z" />
        <path d="M 104 76 q 6 14 -2 24 q -14 -6 -14 -18 q 6 -8 16 -6 Z" />
      </g>
      <g stroke={C.gold} strokeWidth="2" fill="none" opacity="0.5">
        <ellipse cx="136" cy="68" rx="56" ry="20" />
      </g>
      <Stars seed={83} count={10} size={1.3} />
    </>
  ),
  "Matthew 28:20": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Glow id={`b${uid}`} x={136} y={96} r={98} color={C.gold} />
      <Ridge y={100} sway={6} fill={C.grass} />
      <Person x={82} y={118} scale={0.72} robe={C.clothDeep} scarf={C.earthDeep} skin={C.earth} />
      <Person x={124} y={118} scale={0.72} robe={C.purple} scarf={C.gold} skin={C.clothDeep} />
      <Person x={166} y={118} scale={0.72} robe={C.crimson} scarf={C.cloth} skin={C.earth} />
      <Scroll x={196} y={92} scale={0.66} sheet={C.cloth} rod={C.wood} />
      <g fill={C.gold} opacity="0.75">
        <circle cx="46" cy="30" r="2.8" /><circle cx="228" cy="26" r="2.4" /><circle cx="136" cy="20" r="2.6" />
      </g>
    </>
  ),
  "Mark 16:15": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Ridge y={80} sway={8} fill={C.grassLight} />
      <Water y={94} fill={C.deepWater} />
      <g fill={C.wood}>
        <path d="M 30 108 q 6 12 26 12 q 20 0 26 -12 Z" />
        <path d="M 56 108 L 56 76" stroke={C.woodDeep} strokeWidth="3" strokeLinecap="round" />
        <path d="M 58 78 q 20 10 18 26 l -18 0 Z" fill={C.cloth} />
      </g>
      <path d="M 100 96 q 60 -30 150 -18" stroke={C.sand} strokeWidth="4" fill="none" strokeDasharray="6 6" opacity="0.85" strokeLinecap="round" />
      <g fill={C.stone} opacity="0.85">
        <rect x="228" y="60" width="44" height="20" />
        <rect x="238" y="50" width="12" height="10" />
      </g>
      <Birds x={140} y={22} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "Romans 1:16a": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.sand} />
      <Glow id={`b${uid}`} x={136} y={96} r={100} color={C.flameBright} />
      <Ridge y={102} sway={5} fill={C.sandDeep} />
      <Person x={136} y={118} scale={0.9} robe={C.crimson} scarf={C.gold} skin={C.earth} />
      <Scroll x={168} y={96} scale={0.7} sheet={C.cloth} rod={C.wood} />
      <g stroke={C.gold} strokeWidth="2.4" strokeLinecap="round" opacity="0.55">
        <path d="M 60 88 L 34 74" /><path d="M 212 88 L 238 74" /><path d="M 136 62 L 136 40" />
      </g>
    </>
  ),
  "Romans 10:14b": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.sand} />
      <Ridge y={100} sway={5} fill={C.sand} />
      <Person x={62} y={118} scale={0.8} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <g fill="none" stroke={C.gold} strokeWidth="2.4" opacity="0.8">
        <path d="M 88 84 q 16 -12 32 0" /><path d="M 96 96 q 24 -18 48 0" />
        <path d="M 104 108 q 32 -24 64 0" />
      </g>
      <Person x={202} y={118} scale={0.78} robe={C.clothDeep} scarf={C.crimson} skin={C.clothDeep} />
      <Person x={240} y={118} scale={0.7} robe={C.leafDeep} scarf={C.cloth} skin={C.earth} />
      <Sun x={40} y={20} r={13} color={C.sun} ray={C.sunRay} />
    </>
  ),
  "Acts 1:8b": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={92} r={112} color={C.flame} />
      <Ridge y={106} sway={4} fill={C.night} />
      <Person x={72} y={116} scale={0.74} robe={C.clothDeep} scarf={C.earthDeep} skin={C.earth} />
      <Person x={136} y={116} scale={0.74} robe={C.purple} scarf={C.gold} skin={C.clothDeep} />
      <Person x={200} y={116} scale={0.74} robe={C.crimson} scarf={C.cloth} skin={C.earth} />
      <Flame x={72} y={82} scale={0.5} />
      <Flame x={136} y={80} scale={0.55} />
      <Flame x={200} y={82} scale={0.5} />
    </>
  ),
  "2 Timothy 4:2a": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.sand} />
      <Ridge y={104} sway={5} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="96" y="94" width="80" height="12" rx="2" />
        <rect x="106" y="106" width="60" height="14" rx="2" fill={C.stoneDeep} />
      </g>
      <Person x={136} y={94} scale={0.8} robe={C.leafDeep} scarf={C.gold} skin={C.earth} />
      <Scroll x={40} y={112} scale={0.7} sheet={C.cloth} rod={C.wood} />
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.65">
        <path d="M 190 76 q 14 -12 28 0" /><path d="M 200 90 q 18 -14 36 0" />
      </g>
      <Moon x={44} y={24} r={12} />
    </>
  ),
  "Micah 6:8": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Ridge y={102} sway={6} fill={C.grass} />
      <g transform="translate(56,80)">
        <path d="M 0 -14 L 0 26" stroke={C.bronze} strokeWidth="3" strokeLinecap="round" />
        <path d="M -22 -10 L 22 -10" stroke={C.bronze} strokeWidth="3" strokeLinecap="round" />
        <path d="M -22 -10 q -8 12 0 14 q 8 -2 0 -14 Z" fill={C.gold} />
        <path d="M 22 -10 q -8 12 0 14 q 8 -2 0 -14 Z" fill={C.gold} />
      </g>
      <g fill={C.crimson} opacity="0.9">
        <path d="M 136 92 q -12 -14 2 -20 q 9 -3 10 4 q 2 -7 10 -4 q 14 6 2 20 q -12 12 -24 0 Z" />
      </g>
      <Person x={218} y={118} scale={0.8} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <path d="M 200 88 q 18 -10 36 0" stroke={C.gold} strokeWidth="2" fill="none" opacity="0.6" />
    </>
  ),

  // Chapter 15 — Eternal Life & Hope
  "Romans 8:28": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={216} y={40} r={98} color={C.flameBright} />
      <g fill={C.storm} opacity="0.6">
        <ellipse cx="46" cy="20" rx="50" ry="14" />
      </g>
      <Ridge y={96} sway={10} fill={C.grass} />
      <Ridge y={112} sway={6} fill={C.grassDeep} />
      <g fill="none" stroke={C.gold} strokeWidth="3" opacity="0.6" strokeLinecap="round">
        <path d="M 20 108 q 50 -34 100 -10 q 50 24 130 -22" />
      </g>
      <Bloom x={80} y={112} r={2.8} petal={C.cloud} heart={C.gold} />
      <Tuft x={168} y={116} scale={1.1} color={C.leaf} />
    </>
  ),
  "Romans 8:38–39": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.purple} />
      <Stars seed={89} count={26} size={1.6} />
      <Glow id={`b${uid}`} x={136} y={62} r={110} color={C.crimson} />
      <g fill="none" stroke={C.crimson} strokeWidth="6" strokeLinecap="round">
        <path d="M 60 78 q -24 -26 0 -40 q 24 -14 38 10 q 14 -24 38 -10 q 24 14 0 40 q -20 20 -38 6 q -18 14 -38 -6 Z" />
      </g>
      <g stroke={C.gold} strokeWidth="2" fill="none" opacity="0.5">
        <path d="M 176 40 q 40 22 60 0" /><path d="M 176 78 q 40 -22 60 0" />
      </g>
      <Ridge y={114} sway={4} fill={C.deepNight} />
    </>
  ),
  "Isaiah 40:31": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Sun x={220} y={24} r={15} color={C.sun} ray={C.sunRay} />
      <g transform="translate(110,32)">
        <path d="M 0 0 q 22 -16 42 -4 q -18 14 -42 4 Z" fill={C.earthDeep} />
        <path d="M 0 0 q -22 -16 -42 -4 q 18 14 42 4 Z" fill={C.earthDeep} />
        <path d="M -6 0 q 6 14 6 22 q 6 -8 6 -22 Z" fill={C.earth} />
        <circle cx="0" cy="-4" r="7" fill={C.cloth} />
        <path d="M 6 -6 l 8 3 l -8 3 Z" fill={C.gold} />
      </g>
      <Peaks points="L 60 104 L 130 84 L 196 106 L 272 98" fill={C.stoneShade} />
      <Clouds x={54} y={72} scale={0.8} color={C.cloud} />
    </>
  ),
  "John 14:1–2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={70} r={104} color={C.flameBright} />
      <Ridge y={104} sway={5} fill={C.night} />
      <g fill={C.stone}>
        <rect x="88" y="66" width="96" height="46" />
        <path d="M 80 66 L 136 36 L 192 66 Z" fill={C.stoneDeep} />
        <rect x="124" y="86" width="24" height="26" rx="2" fill={C.gold} />
        <rect x="98" y="76" width="14" height="12" rx="2" fill={C.flameBright} opacity="0.8" />
        <rect x="160" y="76" width="14" height="12" rx="2" fill={C.flameBright} opacity="0.8" />
      </g>
      <path d="M 0 118 q 60 -8 120 -10" stroke={C.sand} strokeWidth="6" fill="none" opacity="0.8" strokeLinecap="round" />
    </>
  ),
  "Revelation 21:4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.blossom} />
      <Glow id={`b${uid}`} x={136} y={40} r={110} color={C.cloud} />
      <g fill="none" stroke={C.gold} strokeWidth="2.4" opacity="0.7">
        <path d="M 66 34 a 70 70 0 0 1 140 0" />
      </g>
      <g fill={C.water} opacity="0.5">
        <path d="M 60 62 q -5 10 0 13 q 5 -4 0 -13 Z" />
        <path d="M 214 66 q -4 9 0 12 q 4 -4 0 -12 Z" />
      </g>
      <Ridge y={98} sway={8} fill={C.grass} />
      <Ridge y={112} sway={5} fill={C.grassDeep} />
      <Bloom x={92} y={110} r={3} petal={C.cloud} heart={C.gold} />
      <Bloom x={180} y={114} r={2.6} petal={C.blossom} heart={C.gold} />
      <Tuft x={40} y={116} scale={1.1} color={C.leaf} />
    </>
  ),
  "2 Corinthians 5:17": (uid) => (
    <>
      <defs>
        <linearGradient id={`a${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.storm} />
          <stop offset="0.5" stopColor={C.dawn} />
          <stop offset="1" stopColor={C.grassLight} />
        </linearGradient>
      </defs>
      <rect width="272" height="120" fill={`url(#a${uid})`} />
      <Ridge y={98} sway={8} fill={C.grass} />
      <g fill={C.earthDeep} opacity="0.7">
        <path d="M 40 98 q -4 -22 2 -30 q 8 10 4 30 Z" />
      </g>
      <g transform="translate(190,96)">
        <path d="M 0 0 q -3 -16 2 -22" stroke={C.leaf} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 2 -20 q -12 -6 -14 -14 q 14 0 15 11 Z" fill={C.grassDeep} />
        <path d="M 3 -18 q 12 -8 16 -16 q -16 0 -17 13 Z" fill={C.leaf} />
      </g>
      <Bloom x={128} y={110} r={2.8} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "John 11:25": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Glow id={`b${uid}`} x={136} y={82} r={100} color={C.flameBright} />
      <Ridge y={100} sway={6} fill={C.grass} />
      <g fill={C.stoneDeep}>
        <path d="M 92 104 L 92 62 Q 92 34 144 34 Q 196 34 196 62 L 196 104 Z" />
      </g>
      <path d="M 114 104 L 114 70 Q 114 52 144 52 Q 174 52 174 70 L 174 104 Z" fill={C.dawn} />
      <circle cx="54" cy="92" r="24" fill={C.stone} />
      <Bloom x={228} y={106} r={2.8} petal={C.cloud} heart={C.gold} />
      <Tuft x={20} y={116} scale={1.1} color={C.leaf} />
    </>
  ),
  "John 3:16": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.dusk} />
      <Stars seed={97} count={20} size={1.5} />
      <Glow id={`b${uid}`} x={136} y={74} r={116} color={C.crimson} />
      <circle cx="136" cy="82" r="40" fill={C.deepWater} />
      <g fill={C.grassDeep} opacity="0.9">
        <path d="M 116 60 q 18 -6 28 4 q -8 10 -20 8 q -12 -6 -8 -12 Z" />
        <path d="M 150 78 q 18 4 20 18 q -14 6 -24 -4 q -4 -8 4 -14 Z" />
      </g>
      <g fill={C.crimson}>
        <path d="M 136 40 q -22 -24 2 -32 q 14 -5 17 5 q 3 -10 17 -5 q 24 8 2 32 q -20 20 -38 0 Z" />
      </g>
    </>
  ),
};
