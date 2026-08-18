/* Verse scenes, chapters 6-10: The Good Shepherd, Strong & Brave,
   Fruit of the Spirit, Light of the World, Wisdom's Treasure.

   Two chapters here circle one idea each — shepherding and light — so
   the drawings deliberately change hour and vantage from card to card:
   a flock at noon, a flock at dusk, a lamb carried home, a hillside
   town after dark. */
import {
  C, Sky, Glow, Ridge, Peaks, Sun, Moon, Stars, Clouds, Birds, Water,
  Rain, Tuft, Bloom, House, Sheep, Scroll, Dove, Person,
} from "../staging.jsx";

export const VERSES_6_10 = {
  // Chapter 6 — The Good Shepherd
  "Psalm 23:2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.grassLight} />
      <Clouds x={64} y={18} scale={0.9} color={C.cloud} />
      <Ridge y={70} sway={12} fill={C.grassLight} />
      <Ridge y={88} sway={8} fill={C.grass} />
      <Water y={100} fill={C.water} />
      <Sheep x={30} y={98} scale={0.7} />
      <Sheep x={96} y={96} scale={0.6} />
      <g stroke={C.foam} strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M 176 110 q 12 -5 24 0" /><path d="M 212 116 q 12 -5 24 0" />
      </g>
      <Tuft x={150} y={98} scale={1.1} color={C.leaf} />
    </>
  ),
  "Psalm 23:3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Glow id={`b${uid}`} x={228} y={34} r={82} color={C.flameBright} />
      <Ridge y={84} sway={10} fill={C.grassLight} />
      <Ridge y={104} sway={6} fill={C.grass} />
      <path d="M 6 118 Q 66 106 108 96 Q 158 84 220 76" stroke={C.sand} strokeWidth="8" fill="none" strokeLinecap="round" />
      <Sheep x={40} y={112} scale={0.55} />
      <path d="M 176 100 q -3 -30 2 -38 q 7 -11 14 -3" stroke={C.earth} strokeWidth="4" fill="none" strokeLinecap="round" />
      <Tuft x={92} y={112} scale={1.1} color={C.leaf} />
    </>
  ),
  "John 10:11": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.ember} />
      <Ridge y={92} sway={8} fill={C.night} />
      <Ridge y={110} sway={5} fill={C.deepNight} />
      <Glow id={`b${uid}`} x={136} y={100} r={80} color={C.flame} />
      <Sheep x={60} y={110} scale={0.7} />
      <Sheep x={140} y={116} scale={0.6} />
      <Sheep x={198} y={110} scale={0.5} />
      <path d="M 40 116 q -4 -36 2 -46 q 9 -13 17 -4" stroke={C.earth} strokeWidth="4.4" fill="none" strokeLinecap="round" />
      <g fill={C.gold} opacity="0.7">
        <circle cx="228" cy="86" r="2.6" /><circle cx="244" cy="98" r="2.2" />
      </g>
    </>
  ),
  "Psalm 121:1–2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Glow id={`b${uid}`} x={136} y={40} r={104} color={C.flameBright} />
      <Peaks points="L 40 92 L 96 40 L 150 78 L 204 34 L 272 92" fill={C.stoneShade} />
      <Peaks points="L 66 112 L 128 86 L 190 114 L 272 106" fill={C.stoneDeep} />
      <Person x={40} y={118} scale={0.78} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Birds x={186} y={26} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "Psalm 121:7": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.dusk} />
      <Stars seed={17} count={16} size={1.4} />
      <Moon x={44} y={26} r={13} />
      <Ridge y={98} sway={6} fill={C.night} />
      <g fill={C.deepNight}>
        <House x={104} y={104} w={64} h={40} wall={C.deepNight} roof={C.night} />
      </g>
      <rect x="126" y="86" width="20" height="18" rx="2" fill={C.flameBright} opacity="0.9" />
      <Glow id={`b${uid}`} x={136} y={92} r={58} color={C.flame} />
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.45">
        <path d="M 60 104 q 76 -46 152 0" />
      </g>
    </>
  ),
  "Isaiah 40:11": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Ridge y={92} sway={10} fill={C.grass} />
      <Ridge y={110} sway={5} fill={C.grassDeep} />
      <Person x={110} y={116} scale={0.85} robe={C.clothDeep} scarf={C.earthDeep} skin={C.earth} />
      <g transform="translate(132,92)">
        <g fill={C.wool} stroke={C.woolShade} strokeWidth="1.2">
          <circle cx="0" cy="0" r="7" /><circle cx="9" cy="-3" r="6" /><circle cx="16" cy="1" r="6" />
        </g>
        <circle cx="22" cy="0" r="4" fill={C.ink} />
      </g>
      <Sheep x={188} y={116} scale={0.5} />
      <Sun x={40} y={22} r={14} color={C.sun} ray={C.sunRay} />
      <Bloom x={236} y={110} r={2.4} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "Psalm 100:3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.grassLight} />
      <Ridge y={80} sway={12} fill={C.grassLight} />
      <Ridge y={98} sway={7} fill={C.grass} />
      <g fill={C.wool} stroke={C.woolShade} strokeWidth="1.2">
        <circle cx="34" cy="106" r="8" /><circle cx="46" cy="102" r="7" /><circle cx="58" cy="106" r="8" />
        <circle cx="104" cy="110" r="7" /><circle cx="115" cy="106" r="6" /><circle cx="126" cy="110" r="7" />
        <circle cx="180" cy="106" r="8" /><circle cx="192" cy="102" r="7" /><circle cx="204" cy="106" r="8" />
      </g>
      <g fill={C.ink}>
        <circle cx="66" cy="104" r="4" /><circle cx="133" cy="108" r="3.4" /><circle cx="212" cy="104" r="4" />
      </g>
      <Clouds x={220} y={20} scale={0.8} color={C.cloud} />
    </>
  ),
  "Psalm 23:6": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={196} y={80} r={92} color={C.flameBright} />
      <Ridge y={98} sway={8} fill={C.grass} />
      <g fill={C.stone}>
        <rect x="164" y="72" width="76" height="40" />
        <path d="M 156 72 L 202 44 L 250 72 Z" fill={C.stoneDeep} />
        <rect x="192" y="90" width="22" height="22" rx="2" fill={C.gold} />
      </g>
      <path d="M 0 118 q 60 -12 120 -16 q 30 -2 46 -6" stroke={C.sand} strokeWidth="7" fill="none" opacity="0.9" strokeLinecap="round" />
      <Sheep x={40} y={112} scale={0.55} />
      <Bloom x={104} y={110} r={2.6} petal={C.cloud} heart={C.gold} />
    </>
  ),

  // Chapter 7 — Strong & Brave
  "Joshua 1:9": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Peaks points="L 54 78 L 118 44 L 180 80 L 240 50 L 272 74" fill={C.sandDeep} />
      <Ridge y={100} sway={5} fill={C.sand} />
      <Person x={96} y={118} scale={0.85} robe={C.bronze} scarf={C.crimson} skin={C.earth} />
      <path d="M 118 118 L 118 74" stroke={C.wood} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M 119 76 q 20 6 18 14 l -18 4 Z" fill={C.crimson} />
      <Sun x={218} y={24} r={14} color={C.sun} ray={C.sunRay} />
      <Tuft x={40} y={114} scale={1.1} color={C.leaf} />
    </>
  ),
  "Deuteronomy 31:6": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.sand} />
      <Ridge y={92} sway={6} fill={C.sandDeep} />
      <path d="M 0 116 q 70 -14 140 -16 q 70 -2 132 -8" stroke={C.sand} strokeWidth="8" fill="none" opacity="0.9" strokeLinecap="round" />
      <Person x={104} y={116} scale={0.8} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <g fill={C.gold} opacity="0.45">
        <path d="M 140 118 L 140 82 Q 140 66 160 66 Q 180 66 180 82 L 180 118 Z" />
      </g>
      <g stroke={C.gold} strokeWidth="2" fill="none" opacity="0.6">
        <path d="M 128 92 q 20 -10 40 0" />
      </g>
      <Birds x={200} y={22} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "Psalm 27:1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={98} r={110} color={C.flameBright} />
      <Ridge y={104} sway={5} fill={C.night} />
      <g transform="translate(136,102)">
        <path d="M -16 0 q -6 -18 16 -18 q 22 0 16 18 Z" fill={C.bronze} />
        <path d="M 0 -20 q -6 -13 0 -19 q 6 7 0 19 Z" fill={C.flameBright} />
      </g>
      <g stroke={C.flame} strokeWidth="2" strokeLinecap="round" opacity="0.5">
        <path d="M 60 92 L 40 78" /><path d="M 212 92 L 232 78" /><path d="M 136 62 L 136 44" />
      </g>
      <Stars seed={31} count={8} size={1.2} />
    </>
  ),
  "2 Timothy 1:7": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.dawn} />
      <Ridge y={100} sway={6} fill={C.sand} />
      <g transform="translate(60,96)">
        <path d="M 0 -20 L 22 -11 L 22 6 Q 22 22 0 32 Q -22 22 -22 6 L -22 -11 Z" fill={C.bronze} />
        <path d="M 0 -14 L 15 -8 L 15 5 Q 15 17 0 24 Q -15 17 -15 5 L -15 -8 Z" fill={C.gold} />
      </g>
      <g fill={C.crimson}>
        <path d="M 136 92 q -13 -15 2 -21 q 9 -3 10 4 q 3 -7 10 -4 q 15 6 2 21 q -13 12 -24 0 Z" />
      </g>
      <g transform="translate(216,96)">
        <circle cx="0" cy="0" r="17" fill="none" stroke={C.stoneShade} strokeWidth="4" />
        <path d="M 0 -12 L 0 0 L 9 6" stroke={C.stoneShade} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </>
  ),
  "Isaiah 41:10": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.dawn} />
      <Rain seed={23} count={14} color={C.foam} />
      <Glow id={`b${uid}`} x={136} y={96} r={92} color={C.dawn} />
      <Ridge y={102} sway={5} fill={C.night} />
      <Person x={136} y={118} scale={0.85} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <g fill="none" stroke={C.gold} strokeWidth="2.4" opacity="0.6">
        <path d="M 96 96 q 40 -22 80 0" />
        <path d="M 84 84 q 52 -30 104 0" />
      </g>
      <g fill={C.storm} opacity="0.5">
        <ellipse cx="50" cy="16" rx="44" ry="12" />
        <ellipse cx="224" cy="14" rx="40" ry="11" />
      </g>
    </>
  ),
  "Psalm 46:1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.sand} />
      <Peaks points="L 60 70 L 136 26 L 212 72 L 272 96" fill={C.stoneDeep} />
      <Ridge y={104} sway={4} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="112" y="80" width="48" height="34" rx="2" />
        <rect x="120" y="70" width="32" height="12" rx="2" fill={C.stoneShade} />
        <rect x="128" y="94" width="16" height="20" rx="2" fill={C.woodDeep} />
      </g>
      <Glow id={`b${uid}`} x={136} y={92} r={60} color={C.gold} />
      <Rain seed={29} count={12} color={C.foam} />
    </>
  ),
  "1 Corinthians 16:13": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.stone} />
      <g fill={C.stone}>
        <rect x="0" y="76" width="272" height="44" />
      </g>
      <g fill={C.stoneDeep}>
        <rect x="0" y="68" width="22" height="9" /><rect x="54" y="68" width="22" height="9" />
        <rect x="108" y="68" width="22" height="9" /><rect x="162" y="68" width="22" height="9" />
        <rect x="216" y="68" width="22" height="9" /><rect x="250" y="68" width="22" height="9" />
      </g>
      <Person x={104} y={68} scale={0.68} robe={C.bronze} scarf={C.crimson} skin={C.earth} />
      <Person x={172} y={68} scale={0.68} robe={C.bronze} scarf={C.clothDeep} skin={C.clothDeep} />
      <g fill={C.gold} opacity="0.6">
        <circle cx="46" cy="46" r="2.6" /><circle cx="228" cy="42" r="2.4" />
      </g>
    </>
  ),
  "Romans 8:31": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={30} r={110} color={C.flameBright} />
      <g stroke={C.gold} strokeWidth="3" strokeLinecap="round" opacity="0.55">
        <path d="M 136 30 L 30 6" /><path d="M 136 30 L 242 6" />
        <path d="M 136 30 L 46 92" /><path d="M 136 30 L 226 92" /><path d="M 136 30 L 136 96" />
      </g>
      <Ridge y={104} sway={5} fill={C.sand} />
      <Person x={110} y={118} scale={0.8} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Person x={164} y={118} scale={0.8} robe={C.crimson} scarf={C.cloth} skin={C.clothDeep} />
    </>
  ),

  // Chapter 8 — Fruit of the Spirit
  "Galatians 5:22–23a": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.grassLight} />
      <Ridge y={100} sway={8} fill={C.grass} />
      <path d="M 20 108 q 60 -28 120 -10 q 60 18 112 -10" stroke={C.leafDeep} strokeWidth="4" fill="none" strokeLinecap="round" />
      <g fill={C.crimson}>
        <circle cx="44" cy="96" r="6" /><circle cx="92" cy="88" r="6" /><circle cx="140" cy="96" r="6" />
      </g>
      <g fill={C.purple}>
        <circle cx="188" cy="94" r="6" /><circle cx="228" cy="86" r="6" />
      </g>
      <g fill={C.leaf}>
        <path d="M 66 92 q -12 -8 -18 0 q 10 8 18 0 Z" />
        <path d="M 116 84 q 12 -8 18 0 q -10 8 -18 0 Z" />
        <path d="M 164 92 q -12 -8 -18 0 q 10 8 18 0 Z" />
        <path d="M 208 84 q 12 -8 18 0 q -10 8 -18 0 Z" />
      </g>
      <Tuft x={252} y={116} scale={1.1} color={C.leaf} />
    </>
  ),
  "John 15:5a": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Ridge y={104} sway={6} fill={C.grass} />
      <path d="M 136 120 L 136 84" stroke={C.earthDeep} strokeWidth="9" strokeLinecap="round" />
      <g stroke={C.earth} strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M 136 92 q -40 -6 -60 -26" /><path d="M 136 88 q 40 -6 60 -26" />
        <path d="M 136 96 q -24 8 -48 6" /><path d="M 136 94 q 24 8 48 6" />
      </g>
      <g fill={C.purple}>
        <circle cx="70" cy="66" r="5" /><circle cx="80" cy="74" r="5" /><circle cx="62" cy="76" r="5" />
        <circle cx="200" cy="64" r="5" /><circle cx="190" cy="72" r="5" /><circle cx="208" cy="74" r="5" />
      </g>
      <g fill={C.leaf}>
        <path d="M 100 84 q -14 -10 -20 0 q 12 10 20 0 Z" />
        <path d="M 172 82 q 14 -10 20 0 q -12 10 -20 0 Z" />
      </g>
    </>
  ),
  "Colossians 3:12": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.blossom} bottom={C.dawn} />
      <Ridge y={104} sway={6} fill={C.grass} />
      <g transform="translate(136,86)">
        <path d="M -44 30 q -6 -30 44 -30 q 50 0 44 30 Z" fill={C.purple} />
        <path d="M -30 8 q 30 -18 60 0" stroke={C.gold} strokeWidth="2.6" fill="none" />
        <path d="M -44 30 q 44 -12 88 0" stroke={C.clothDeep} strokeWidth="2" fill="none" opacity="0.6" />
      </g>
      <g fill={C.crimson} opacity="0.9">
        <path d="M 136 34 q -12 -14 2 -20 q 9 -3 10 4 q 2 -7 10 -4 q 14 6 2 20 q -12 12 -24 0 Z" />
      </g>
      <Bloom x={40} y={112} r={2.6} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "James 1:19": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.grassLight} />
      <Ridge y={100} sway={6} fill={C.grass} />
      <Person x={100} y={118} scale={0.85} robe={C.leafDeep} scarf={C.cloth} skin={C.earth} />
      <g fill="none" stroke={C.deepWater} strokeWidth="2.4" opacity="0.8">
        <path d="M 128 76 q 12 -10 24 0" /><path d="M 122 64 q 18 -16 36 0" />
      </g>
      <g fill={C.water} opacity="0.85">
        <path d="M 178 88 q 22 -18 44 0 q -6 16 -22 15 l -11 11 l 0 -12 q -14 -3 -11 -14 Z" />
      </g>
      <Tuft x={40} y={114} scale={1.1} color={C.leaf} />
    </>
  ),
  "Matthew 5:9": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Glow id={`b${uid}`} x={136} y={30} r={90} color={C.cloud} />
      <Dove x={104} y={22} scale={1.15} flip={1} />
      <g fill={C.leaf}>
        <path d="M 96 34 q -16 -8 -26 0 q 14 8 26 0 Z" />
      </g>
      <Ridge y={98} sway={8} fill={C.grass} />
      <Ridge y={112} sway={5} fill={C.grassDeep} />
      <Person x={80} y={118} scale={0.7} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Person x={196} y={118} scale={0.7} robe={C.crimson} scarf={C.cloth} skin={C.clothDeep} />
    </>
  ),
  "Philippians 2:4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.sand} />
      <Ridge y={102} sway={5} fill={C.sand} />
      <Person x={82} y={118} scale={0.85} robe={C.clothDeep} scarf={C.crimson} skin={C.earth} />
      <Person x={190} y={118} scale={0.8} robe={C.purple} scarf={C.gold} skin={C.clothDeep} />
      <g transform="translate(136,92)">
        <path d="M -18 12 q -4 -20 18 -20 q 22 0 18 20 Z" fill={C.wood} />
        <rect x="-20" y="8" width="40" height="5" rx="2" fill={C.woodDeep} />
      </g>
      <g stroke={C.gold} strokeWidth="2" fill="none" opacity="0.6">
        <path d="M 106 84 q 16 -8 24 2" /><path d="M 166 84 q -16 -8 -24 2" />
      </g>
    </>
  ),
  "1 Peter 3:8": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.blossom} bottom={C.grassLight} />
      <Glow id={`b${uid}`} x={136} y={102} r={86} color={C.dawn} />
      <Ridge y={106} sway={6} fill={C.grass} />
      <Person x={72} y={118} scale={0.72} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Person x={110} y={118} scale={0.72} robe={C.crimson} scarf={C.cloth} skin={C.clothDeep} />
      <Person x={148} y={118} scale={0.72} robe={C.leafDeep} scarf={C.clothDeep} skin={C.earth} />
      <Person x={186} y={118} scale={0.72} robe={C.clothDeep} scarf={C.crimson} skin={C.clothDeep} />
      <g fill={C.crimson} opacity="0.85">
        <path d="M 136 30 q -11 -13 2 -18 q 8 -3 9 4 q 2 -6 9 -4 q 13 5 2 18 q -11 11 -22 0 Z" />
      </g>
    </>
  ),
  "Romans 12:21": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={196} y={72} r={104} color={C.flameBright} />
      <g fill={C.deepNight} opacity="0.75">
        <ellipse cx="50" cy="40" rx="52" ry="26" />
        <ellipse cx="20" cy="66" rx="34" ry="18" />
      </g>
      <Ridge y={102} sway={6} fill={C.grass} />
      <g fill={C.gold}>
        <path d="M 196 40 L 203 22 L 210 40 L 229 40 L 214 51 L 220 70 L 203 59 L 186 70 L 192 51 L 177 40 Z" />
      </g>
      <Bloom x={100} y={110} r={2.8} petal={C.cloud} heart={C.gold} />
      <Bloom x={150} y={116} r={2.4} petal={C.blossom} heart={C.gold} />
      <Tuft x={60} y={114} scale={1.1} color={C.leaf} />
    </>
  ),

  // Chapter 9 — Light of the World
  "Matthew 5:14": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Stars seed={37} count={18} size={1.4} />
      <Ridge y={92} sway={10} fill={C.night} />
      <g fill={C.deepNight}>
        <House x={106} y={82} w={24} h={20} wall={C.deepNight} roof={C.night} />
        <House x={136} y={82} w={20} h={16} wall={C.deepNight} roof={C.night} />
        <House x={162} y={82} w={22} h={18} wall={C.deepNight} roof={C.night} />
        <House x={122} y={62} w={20} h={16} wall={C.deepNight} roof={C.night} />
      </g>
      <g fill={C.flameBright} opacity="0.95">
        <rect x="112" y="72" width="5" height="6" /><rect x="142" y="74" width="5" height="6" />
        <rect x="168" y="72" width="5" height="6" /><rect x="128" y="52" width="5" height="6" />
      </g>
      <Glow id={`b${uid}`} x={140} y={70} r={80} color={C.flame} />
    </>
  ),
  "Matthew 5:16": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.dusk} />
      <Ridge y={104} sway={5} fill={C.deepNight} />
      <Glow id={`b${uid}`} x={136} y={98} r={92} color={C.flame} />
      <g transform="translate(136,98)">
        <path d="M -10 0 q -4 -14 10 -14 q 14 0 10 14 Z" fill={C.bronze} />
        <path d="M 0 -16 q -4 -10 0 -14 q 4 5 0 14 Z" fill={C.flameBright} />
      </g>
      <g transform="translate(70,102)">
        <path d="M -8 0 q -3 -11 8 -11 q 11 0 8 11 Z" fill={C.bronze} />
        <path d="M 0 -13 q -3 -8 0 -11 q 3 4 0 11 Z" fill={C.flame} />
      </g>
      <g transform="translate(202,102)">
        <path d="M -8 0 q -3 -11 8 -11 q 11 0 8 11 Z" fill={C.bronze} />
        <path d="M 0 -13 q -3 -8 0 -11 q 3 4 0 11 Z" fill={C.flame} />
      </g>
      <Stars seed={41} count={8} size={1.2} />
    </>
  ),
  "John 8:12": (uid) => (
    <>
      <defs>
        <linearGradient id={`a${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.deepNight} />
          <stop offset="0.5" stopColor={C.night} />
          <stop offset="1" stopColor={C.dawn} />
        </linearGradient>
      </defs>
      <rect width="272" height="120" fill={`url(#a${uid})`} />
      <g fill={C.star} opacity="0.8">
        <circle cx="24" cy="26" r="1.8" /><circle cx="56" cy="60" r="1.4" /><circle cx="34" cy="92" r="1.5" />
      </g>
      <Glow id={`b${uid}`} x={232} y={60} r={96} color={C.flameBright} />
      <path
        d="M 20 118 Q 90 108 140 92 Q 196 74 244 62"
        stroke={C.sand}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        opacity="0.75"
      />
      <Person x={92} y={116} scale={0.75} robe={C.purple} scarf={C.gold} skin={C.earth} />
    </>
  ),
  "Ephesians 5:8": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={110} r={116} color={C.flameBright} />
      <Ridge y={100} sway={8} fill={C.night} />
      <Ridge y={114} sway={5} fill={C.grass} />
      <Person x={100} y={118} scale={0.78} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Person x={168} y={118} scale={0.74} robe={C.cloth} scarf={C.crimson} skin={C.clothDeep} />
      <Stars seed={43} count={9} size={1.2} />
      <g fill={C.gold} opacity="0.7">
        <circle cx="52" cy="98" r="2.6" /><circle cx="220" cy="96" r="2.4" />
      </g>
    </>
  ),
  "Philippians 2:15b": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Stars seed={47} count={26} size={1.6} />
      <g fill={C.gold}>
        <path d="M 60 44 L 65 30 L 70 44 L 84 44 L 72 53 L 77 68 L 65 59 L 53 68 L 58 53 L 46 44 Z" />
        <path d="M 200 34 L 204 22 L 208 34 L 220 34 L 210 42 L 214 55 L 204 47 L 194 55 L 198 42 L 188 34 Z" />
        <path d="M 136 74 L 139 64 L 142 74 L 152 74 L 144 80 L 147 90 L 139 84 L 131 90 L 134 80 L 126 74 Z" />
      </g>
      <Ridge y={110} sway={5} fill={C.deepNight} />
      <Scroll x={26} y={112} scale={0.6} sheet={C.cloth} rod={C.wood} />
    </>
  ),
  "1 John 1:5b": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.cloud} />
      <Glow id={`b${uid}`} x={136} y={60} r={150} color={C.cloud} />
      <circle cx="136" cy="60" r="34" fill={C.cloud} />
      <g stroke={C.flameBright} strokeWidth="3" strokeLinecap="round" opacity="0.8">
        <path d="M 136 12 L 136 0" /><path d="M 136 108 L 136 120" />
        <path d="M 88 60 L 62 60" /><path d="M 184 60 L 210 60" />
        <path d="M 102 26 L 84 8" /><path d="M 170 26 L 188 8" />
        <path d="M 102 94 L 84 112" /><path d="M 170 94 L 188 112" />
      </g>
    </>
  ),
  "Psalm 27:1b": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.ember} />
      <Stars seed={53} count={10} size={1.2} />
      <Peaks points="L 50 96 L 110 62 L 168 98 L 226 66 L 272 100" fill={C.night} />
      <Glow id={`b${uid}`} x={110} y={62} r={68} color={C.flameBright} />
      <Sun x={110} y={60} r={15} color={C.sun} ray={C.sunRay} />
      <Ridge y={112} sway={4} fill={C.deepNight} />
      <Person x={196} y={118} scale={0.7} robe={C.purple} scarf={C.gold} skin={C.earth} />
    </>
  ),
  "Proverbs 4:18": (uid) => (
    <>
      <defs>
        <linearGradient id={`a${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.dusk} />
          <stop offset="0.55" stopColor={C.ember} />
          <stop offset="1" stopColor={C.dawn} />
        </linearGradient>
      </defs>
      <rect width="272" height="120" fill={`url(#a${uid})`} />
      <Glow id={`b${uid}`} x={244} y={54} r={92} color={C.flameBright} />
      <Ridge y={96} sway={10} fill={C.grass} />
      <Ridge y={112} sway={6} fill={C.grassDeep} />
      <path d="M 6 118 Q 70 108 118 98 Q 176 86 240 76" stroke={C.sand} strokeWidth="8" fill="none" strokeLinecap="round" />
      <Birds x={80} y={26} scale={0.9} color={C.stoneShade} />
    </>
  ),

  // Chapter 10 — Wisdom's Treasure
  "Proverbs 3:5–6": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Ridge y={88} sway={10} fill={C.grassLight} />
      <Ridge y={106} sway={6} fill={C.grass} />
      <path d="M 10 118 Q 60 104 96 96 Q 140 86 196 84" stroke={C.sand} strokeWidth="8" fill="none" strokeLinecap="round" />
      <g transform="translate(200,80)">
        <rect x="-3" y="-30" width="6" height="34" rx="2" fill={C.wood} />
        <rect x="-24" y="-30" width="48" height="6" rx="2" fill={C.wood} />
        <path d="M -24 -24 L -34 -14" stroke={C.woodDeep} strokeWidth="3" strokeLinecap="round" />
        <path d="M 24 -24 L 34 -14" stroke={C.woodDeep} strokeWidth="3" strokeLinecap="round" />
      </g>
      <Tuft x={60} y={114} scale={1.1} color={C.leaf} />
    </>
  ),
  "James 1:5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={26} r={94} color={C.flameBright} />
      <g stroke={C.gold} strokeWidth="2.6" strokeLinecap="round" opacity="0.6">
        <path d="M 136 26 L 84 90" /><path d="M 136 26 L 136 92" /><path d="M 136 26 L 188 90" />
      </g>
      <Ridge y={98} sway={6} fill={C.sand} />
      <g transform="translate(136,102)">
        <path d="M -26 12 q -6 -22 26 -22 q 32 0 26 22 Z" fill={C.wood} />
        <rect x="-30" y="8" width="60" height="6" rx="3" fill={C.woodDeep} />
        <g fill={C.gold}>
          <circle cx="-10" cy="-2" r="4" /><circle cx="2" cy="-6" r="4" /><circle cx="12" cy="-2" r="4" />
        </g>
      </g>
    </>
  ),
  "Proverbs 1:7": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.dusk} />
      <Stars seed={59} count={14} size={1.3} />
      <Ridge y={104} sway={5} fill={C.deepNight} />
      <Glow id={`b${uid}`} x={136} y={98} r={78} color={C.gold} />
      <g transform="translate(136,98)">
        <rect x="-30" y="-14" width="60" height="26" rx="3" fill={C.wood} />
        <path d="M -30 -14 q 30 -12 60 0" fill={C.woodDeep} />
        <path d="M 0 -14 L 0 12" stroke={C.woodDeep} strokeWidth="2" />
        <circle cx="0" cy="0" r="5" fill={C.gold} />
      </g>
      <g fill={C.gold} opacity="0.8">
        <circle cx="66" cy="96" r="3" /><circle cx="212" cy="98" r="2.6" />
      </g>
    </>
  ),
  "Proverbs 16:3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.sand} />
      <Ridge y={104} sway={4} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="60" y="90" width="34" height="14" /><rect x="98" y="90" width="34" height="14" />
        <rect x="136" y="90" width="34" height="14" /><rect x="174" y="90" width="34" height="14" />
        <rect x="80" y="74" width="34" height="14" /><rect x="118" y="74" width="34" height="14" />
        <rect x="156" y="74" width="34" height="14" />
      </g>
      <g transform="translate(224,60)">
        <path d="M 0 0 L 20 -8 L 24 2 L 4 10 Z" fill={C.stoneShade} />
        <path d="M 0 2 l -12 8" stroke={C.wood} strokeWidth="4" strokeLinecap="round" />
      </g>
      <Sun x={44} y={22} r={14} color={C.sun} ray={C.sunRay} />
    </>
  ),
  "Proverbs 4:23": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.blossom} bottom={C.grassLight} />
      <Ridge y={98} sway={8} fill={C.grass} />
      <g fill={C.crimson}>
        <path d="M 136 34 q -22 -26 4 -34 q 15 -5 18 6 q 4 -11 18 -6 q 26 8 4 34 q -22 22 -44 0 Z" />
      </g>
      <g fill={C.water} opacity="0.9">
        <path d="M 136 44 q -6 20 0 34 q 6 -16 0 -34 Z" />
      </g>
      <g stroke={C.deepWater} strokeWidth="2.4" fill="none" opacity="0.75" strokeLinecap="round">
        <path d="M 96 104 q 20 -10 40 0 q 20 10 40 0" />
      </g>
      <Bloom x={48} y={110} r={2.6} petal={C.cloud} heart={C.gold} />
      <Bloom x={222} y={112} r={2.4} petal={C.blossom} heart={C.gold} />
    </>
  ),
  "Proverbs 18:10": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.sand} />
      <Ridge y={104} sway={4} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="110" y="24" width="52" height="88" />
        <rect x="102" y="16" width="68" height="10" rx="2" fill={C.stoneDeep} />
        <rect x="126" y="86" width="20" height="26" rx="2" fill={C.woodDeep} />
      </g>
      <g fill={C.stoneDeep}>
        <rect x="102" y="8" width="14" height="9" /><rect x="128" y="8" width="14" height="9" />
        <rect x="154" y="8" width="16" height="9" />
      </g>
      <Person x={72} y={116} scale={0.78} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Glow id={`b${uid}`} x={136} y={98} r={60} color={C.gold} />
    </>
  ),
  "Psalm 111:10": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Glow id={`b${uid}`} x={136} y={96} r={82} color={C.gold} />
      <Ridge y={100} sway={5} fill={C.sandDeep} />
      <Scroll x={104} y={88} scale={1.4} sheet={C.cloth} rod={C.wood} />
      <g fill={C.gold}>
        <path d="M 42 84 L 46 72 L 50 84 L 62 84 L 52 92 L 56 104 L 46 96 L 36 104 L 40 92 L 30 84 Z" opacity="0.85" />
      </g>
      <g fill={C.leaf}>
        <path d="M 226 108 q -4 -22 4 -30 q 8 10 4 30 Z" />
        <path d="M 240 112 q -3 -18 4 -24 q 7 8 3 24 Z" />
      </g>
    </>
  ),
  "Proverbs 2:6": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.dusk} />
      <Glow id={`b${uid}`} x={136} y={22} r={104} color={C.flameBright} />
      <g fill="none" stroke={C.gold} strokeWidth="2.6" opacity="0.7">
        <path d="M 100 50 q 36 -22 72 0" />
        <path d="M 84 36 q 52 -32 104 0" />
      </g>
      <Ridge y={102} sway={5} fill={C.night} />
      <g transform="translate(136,102)">
        <path d="M -30 10 q -4 -20 30 -20 q 34 0 30 20 Z" fill={C.wood} />
        <g fill={C.gold}>
          <circle cx="-12" cy="-2" r="4.4" /><circle cx="0" cy="-6" r="4.4" /><circle cx="12" cy="-2" r="4.4" />
        </g>
      </g>
      <Stars seed={61} count={8} size={1.2} />
    </>
  ),
};
