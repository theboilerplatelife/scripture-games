/* Verse scenes, chapters 1-5: Little Seeds, First Steps, Joyful
   Hearts, God the Creator, Kindness & Caring.

   A verse is not an event, so these are drawn as pictures of what the
   words are about — a lamp on a night path, a shield against a low
   sun, two people sharing one loaf. Keyed by reference, because that
   is what a Memory Match card carries. */
import {
  C, Sky, Glow, Ridge, Peaks, Sun, Moon, Stars, Clouds, Birds, Water,
  Rain, Tuft, Bloom, Tree, Sheep, Jar, Scroll, Person,
} from "../staging.jsx";

export const VERSES_1_5 = {
  // Chapter 1 — Little Seeds
  "1 Thessalonians 5:17": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.dawn} />
      <Stars seed={5} count={12} size={1.3} />
      <Ridge y={100} sway={5} fill={C.night} />
      <Glow id={`b${uid}`} x={136} y={102} r={70} color={C.flame} />
      <g transform="translate(136,102)">
        <path d="M -14 0 q -5 -16 14 -16 q 19 0 14 16 Z" fill={C.bronze} />
        <path d="M 0 -18 q -5 -11 0 -16 q 5 6 0 16 Z" fill={C.flameBright} />
      </g>
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.7">
        <path d="M 118 62 q 18 -14 36 0" /><path d="M 106 46 q 30 -24 60 0" />
        <path d="M 94 30 q 42 -32 84 0" />
      </g>
    </>
  ),
  "1 John 4:19": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.blossom} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={80} y={34} r={78} color={C.cloud} />
      <g fill={C.crimson}>
        <path d="M 80 56 q -26 -30 4 -42 q 18 -6 22 8 q 5 -14 22 -8 q 30 12 4 42 q -26 26 -52 0 Z" />
      </g>
      <g fill={C.blossom}>
        <path d="M 200 40 q -14 -16 2 -22 q 10 -4 12 4 q 3 -8 12 -4 q 16 6 2 22 q -14 14 -28 0 Z" />
      </g>
      <g stroke={C.gold} strokeWidth="2" opacity="0.6" strokeLinecap="round">
        <path d="M 122 34 h 56" />
      </g>
      <Ridge y={96} sway={8} fill={C.grass} />
      <Bloom x={40} y={108} r={2.8} petal={C.cloud} heart={C.gold} />
      <Bloom x={224} y={112} r={2.6} petal={C.blossom} heart={C.gold} />
    </>
  ),
  "Psalm 56:3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.storm} />
      <Rain seed={7} count={20} color={C.foam} />
      <Ridge y={104} sway={4} fill={C.deepNight} />
      <g fill={C.night}>
        <rect x="96" y="66" width="80" height="42" />
        <path d="M 88 66 L 136 40 L 184 66 Z" fill={C.deepNight} />
      </g>
      <rect x="122" y="82" width="28" height="26" rx="2" fill={C.flameBright} />
      <Glow id={`b${uid}`} x={136} y={94} r={54} color={C.flame} />
      <g fill={C.storm} opacity="0.5">
        <ellipse cx="60" cy="16" rx="46" ry="12" />
        <ellipse cx="216" cy="14" rx="42" ry="11" />
      </g>
    </>
  ),
  "Psalm 118:24": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={92} r={104} color={C.flameBright} />
      <Sun x={136} y={90} r={26} color={C.sun} ray={C.sunRay} />
      <Ridge y={98} sway={10} fill={C.grassLight} />
      <Ridge y={112} sway={6} fill={C.grass} />
      <Birds x={40} y={22} scale={1.1} color={C.stoneShade} />
      <Birds x={196} y={30} scale={0.9} color={C.stoneShade} />
      <Tuft x={70} y={116} scale={1.2} color={C.leaf} />
    </>
  ),
  "Psalm 23:1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.grassLight} />
      <Clouds x={210} y={20} scale={0.9} color={C.cloud} />
      <Ridge y={74} sway={12} fill={C.grassLight} />
      <Ridge y={92} sway={8} fill={C.grass} />
      <Ridge y={108} sway={5} fill={C.grassDeep} />
      <Sheep x={28} y={98} scale={0.8} />
      <Sheep x={96} y={110} scale={0.62} />
      <Sheep x={158} y={102} scale={0.5} />
      <path d="M 228 116 q -3 -34 2 -44 q 8 -13 16 -4" stroke={C.earth} strokeWidth="4.4" fill="none" strokeLinecap="round" />
    </>
  ),
  "Proverbs 3:5a": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Glow id={`b${uid}`} x={228} y={40} r={80} color={C.flameBright} />
      <Ridge y={86} sway={10} fill={C.grassLight} />
      <Ridge y={104} sway={6} fill={C.grass} />
      <path d="M 10 120 Q 70 106 110 96 Q 160 84 216 78" stroke={C.sand} strokeWidth="9" fill="none" strokeLinecap="round" />
      <g fill={C.crimson} opacity="0.9">
        <path d="M 60 106 q -10 -12 2 -16 q 7 -3 8 3 q 2 -6 8 -3 q 12 4 2 16 q -10 10 -20 0 Z" />
      </g>
      <Tuft x={168} y={112} scale={1.1} color={C.leaf} />
    </>
  ),
  "Luke 6:31": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Ridge y={98} sway={6} fill={C.sand} />
      <Person x={80} y={118} scale={0.85} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Person x={192} y={118} scale={0.85} robe={C.leafDeep} scarf={C.cloth} skin={C.clothDeep} />
      <g fill={C.sunRay}>
        <ellipse cx="136" cy="96" rx="16" ry="8" />
        <path d="M 122 94 q 14 -8 28 0" stroke={C.wood} strokeWidth="1.6" fill="none" />
      </g>
      <g stroke={C.gold} strokeWidth="2" fill="none" opacity="0.6">
        <path d="M 104 88 q 16 -8 24 2" /><path d="M 168 88 q -16 -8 -24 2" />
      </g>
    </>
  ),
  "Genesis 1:1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Stars seed={2} count={34} size={1.8} />
      <Glow id={`b${uid}`} x={136} y={92} r={100} color={C.deepWater} />
      <circle cx="136" cy="102" r="44" fill={C.deepWater} />
      <g fill={C.grassDeep} opacity="0.9">
        <path d="M 110 76 q 20 -6 34 4 q -8 12 -24 10 q -14 -6 -10 -14 Z" />
        <path d="M 150 96 q 20 4 24 20 q -18 8 -30 -4 q -4 -10 6 -16 Z" />
      </g>
      <g stroke={C.foam} strokeWidth="1.4" fill="none" opacity="0.45">
        <ellipse cx="136" cy="102" rx="44" ry="16" />
      </g>
    </>
  ),

  // Chapter 2 — First Steps
  "Psalm 119:105": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Stars seed={13} count={10} size={1.2} />
      <Ridge y={96} sway={4} fill={C.night} />
      <Glow id={`b${uid}`} x={96} y={96} r={72} color={C.flame} />
      <g transform="translate(96,96)">
        <path d="M -18 0 q 18 -12 36 0 q -8 8 -18 8 q -10 0 -18 -8 Z" fill={C.wood} />
        <ellipse cx="0" cy="-1" rx="14" ry="3.5" fill={C.bronze} />
        <path d="M 18 -4 q 4 -8 0 -12 q 7 3 5 12 Z" fill={C.flameBright} />
      </g>
      <g fill={C.stone} opacity="0.85">
        <ellipse cx="140" cy="110" rx="18" ry="5" /><ellipse cx="180" cy="116" rx="17" ry="5" />
        <ellipse cx="220" cy="110" rx="18" ry="5" /><ellipse cx="256" cy="116" rx="15" ry="4" />
      </g>
    </>
  ),
  "Philippians 4:4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.blossom} bottom={C.dawn} />
      <Sun x={44} y={22} r={15} color={C.sun} ray={C.sunRay} />
      <Ridge y={98} sway={8} fill={C.grass} />
      <g transform="translate(136,100)">
        <circle cx="0" cy="0" r="17" fill="none" stroke={C.wood} strokeWidth="4.4" />
        <circle cx="0" cy="0" r="10" fill={C.clothDeep} />
        <g fill={C.gold}>
          <circle cx="-17" cy="-6" r="3.4" /><circle cx="17" cy="-6" r="3.4" />
          <circle cx="-10" cy="15" r="3.4" /><circle cx="10" cy="15" r="3.4" />
        </g>
      </g>
      <g fill={C.blossom} opacity="0.9">
        <circle cx="60" cy="76" r="3" /><circle cx="200" cy="70" r="2.6" /><circle cx="228" cy="88" r="2.4" />
        <circle cx="88" cy="94" r="2.2" />
      </g>
      <Bloom x={40} y={112} r={2.6} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "1 John 4:8b": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.blossom} />
      <Glow id={`b${uid}`} x={136} y={34} r={110} color={C.crimson} />
      <g fill={C.crimson}>
        <path d="M 136 62 q -32 -34 4 -48 q 22 -8 26 8 q 6 -16 26 -8 q 36 14 4 48 q -30 30 -60 0 Z" />
      </g>
      <g fill={C.blossom} opacity="0.8">
        <path d="M 136 46 q -12 -14 2 -20 q 9 -3 10 4 q 2 -7 10 -4 q 14 6 2 20 q -12 12 -24 0 Z" />
      </g>
      <Ridge y={106} sway={6} fill={C.grass} />
      <Bloom x={54} y={112} r={2.8} petal={C.cloud} heart={C.gold} />
      <Bloom x={216} y={116} r={2.4} petal={C.blossom} heart={C.gold} />
    </>
  ),
  "Proverbs 15:1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.dawn} />
      <g opacity="0.9">
        <path d="M 26 40 q 22 -18 42 0 q -6 16 -22 15 l -11 11 l 0 -12 q -14 -3 -9 -14 Z" fill={C.crimson} />
        <path d="M 156 32 q 24 -20 46 0 q -6 18 -24 17 l -12 12 l 0 -13 q -15 -3 -10 -16 Z" fill={C.water} />
      </g>
      <g stroke={C.deepWater} strokeWidth="2.4" fill="none" opacity="0.7" strokeLinecap="round">
        <path d="M 92 34 q 20 -8 42 0" /><path d="M 96 44 q 18 -6 36 0" />
      </g>
      <Ridge y={96} sway={8} fill={C.grass} />
      <Tuft x={60} y={112} scale={1.1} color={C.leaf} />
      <Bloom x={196} y={110} r={2.6} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "Psalm 136:1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.dawn} />
      <Sun x={230} y={26} r={15} color={C.sun} ray={C.sunRay} />
      <Ridge y={92} sway={6} fill={C.sand} />
      <g fill={C.wood}>
        <rect x="30" y="98" width="212" height="8" rx="2" />
        <rect x="44" y="106" width="8" height="14" /><rect x="220" y="106" width="8" height="14" />
      </g>
      <g fill={C.sunRay}>
        <ellipse cx="76" cy="94" rx="15" ry="6" /><ellipse cx="112" cy="92" rx="13" ry="5" />
      </g>
      <g fill={C.crimson}>
        <circle cx="156" cy="92" r="5" /><circle cx="170" cy="94" r="4.4" /><circle cx="184" cy="92" r="5" />
      </g>
      <Jar x={216} y={98} scale={0.7} body={C.earth} rim={C.earthDeep} />
    </>
  ),
  "Hebrews 13:8": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <g fill="none" stroke={C.sunRay} strokeWidth="2" opacity="0.5" strokeDasharray="5 6">
        <path d="M 30 96 a 106 106 0 0 1 212 0" />
      </g>
      <Sun x={36} y={82} r={12} color={C.sun} ray={C.sunRay} />
      <Sun x={136} y={26} r={15} color={C.sun} ray={C.sunRay} />
      <Sun x={236} y={82} r={12} color={C.sun} ray={C.sunRay} />
      <Ridge y={100} sway={4} fill={C.sandDeep} />
      <g fill={C.stone}>
        <path d="M 108 116 L 116 92 L 156 92 L 164 116 Z" />
        <path d="M 116 92 q 20 -8 40 0" stroke={C.stoneShade} strokeWidth="2" fill="none" />
      </g>
    </>
  ),
  "Psalm 107:1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Glow id={`b${uid}`} x={136} y={30} r={84} color={C.flameBright} />
      <Ridge y={94} sway={8} fill={C.grass} />
      <g transform="translate(136,96)">
        <path d="M -36 0 q 5 24 36 24 q 31 0 36 -24 Z" fill={C.wood} />
        <path d="M -36 0 h 72" stroke={C.woodDeep} strokeWidth="4.4" strokeLinecap="round" />
        <g fill={C.sunRay}>
          <ellipse cx="-20" cy="-6" rx="10" ry="6" /><ellipse cx="0" cy="-10" rx="10" ry="6" />
          <ellipse cx="20" cy="-6" rx="10" ry="6" />
        </g>
        <g fill={C.crimson}>
          <circle cx="-8" cy="-16" r="4" /><circle cx="9" cy="-16" r="4" />
        </g>
      </g>
      <Birds x={40} y={24} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "Philippians 4:13": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Peaks points="L 46 88 L 108 40 L 150 66 L 196 30 L 272 92" fill={C.stoneShade} />
      <Peaks points="L 70 110 L 130 78 L 190 112 L 272 116" fill={C.stoneDeep} />
      <path d="M 196 30 L 196 4" stroke={C.wood} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M 197 6 q 22 6 20 14 l -20 4 Z" fill={C.crimson} />
      <path
        d="M 20 118 q 44 -18 62 -34 q 20 -18 48 -20"
        stroke={C.sand}
        strokeWidth="3.4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="7 6"
        opacity="0.9"
      />
      <Sun x={44} y={22} r={13} color={C.sun} ray={C.sunRay} />
    </>
  ),

  // Chapter 3 — Joyful Hearts
  "Psalm 100:1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.dawn} />
      <Ridge y={100} sway={6} fill={C.sand} />
      <g transform="translate(80,96)">
        <path d="M 0 0 q 24 -8 38 -28 q 9 -13 15 -3 q -9 24 -34 37 Z" fill={C.gold} />
        <path d="M 5 -2 q 22 -9 34 -26" stroke={C.sunRay} strokeWidth="2.4" fill="none" opacity="0.9" />
      </g>
      <g fill="none" stroke={C.gold} strokeWidth="2.4" opacity="0.75">
        <path d="M 150 40 q 14 -12 28 0" /><path d="M 142 26 q 22 -18 44 0" />
        <path d="M 134 12 q 30 -24 60 0" />
      </g>
      <g fill={C.gold}>
        <circle cx="220" cy="96" r="4" /><path d="M 224 96 L 224 76 L 236 72 L 236 92" />
        <circle cx="232" cy="92" r="4" />
      </g>
    </>
  ),
  "Colossians 3:2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.grassLight} />
      <Clouds x={60} y={22} scale={0.9} color={C.cloud} />
      <Clouds x={214} y={16} scale={0.75} color={C.cloud} />
      <g transform="translate(136,30) rotate(12)">
        <path d="M 0 -20 L 16 0 L 0 20 L -16 0 Z" fill={C.crimson} />
        <path d="M 0 -20 L 0 20 M -16 0 L 16 0" stroke={C.cloth} strokeWidth="1.6" />
        <path d="M 0 20 q 8 12 -2 20 q -8 8 0 18" stroke={C.clothDeep} strokeWidth="2" fill="none" />
      </g>
      <Ridge y={98} sway={10} fill={C.grass} />
      <Ridge y={112} sway={6} fill={C.grassDeep} />
      <Tuft x={40} y={116} scale={1.1} color={C.leaf} />
      <Birds x={200} y={44} scale={0.8} color={C.stoneShade} />
    </>
  ),
  "Psalm 147:1a": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={96} r={86} color={C.gold} />
      <Ridge y={104} sway={5} fill={C.sand} />
      <g transform="translate(136,104)">
        <path d="M -22 0 q -6 -46 24 -50 q 26 -2 20 20" stroke={C.wood} strokeWidth="5" fill="none" strokeLinecap="round" />
        <g stroke={C.gold} strokeWidth="1.6" opacity="0.9">
          <path d="M -14 -8 L 16 -20 M -12 -18 L 16 -28 M -8 -28 L 16 -36 M -4 -38 L 15 -43" />
        </g>
      </g>
      <g fill={C.gold} opacity="0.8">
        <circle cx="58" cy="46" r="3" /><circle cx="212" cy="40" r="2.6" /><circle cx="80" cy="28" r="2.2" />
      </g>
    </>
  ),
  "1 Chronicles 16:34": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.sand} />
      <Sun x={40} y={24} r={14} color={C.sun} ray={C.sunRay} />
      <Ridge y={96} sway={6} fill={C.sand} />
      <g transform="translate(136,92)">
        <path d="M -18 0 q -4 22 18 22 q 22 0 18 -22 Z" fill={C.bronze} />
        <rect x="-21" y="-5" width="42" height="6" rx="3" fill={C.gold} />
        <path d="M -8 -8 q 8 -14 16 0 Z" fill={C.crimson} opacity="0.7" />
      </g>
      <g stroke={C.gold} strokeWidth="2" fill="none" opacity="0.65">
        <path d="M 70 88 q 14 -12 28 0" /><path d="M 176 88 q 14 -12 28 0" />
      </g>
      <Tuft x={230} y={112} scale={1.1} color={C.leaf} />
    </>
  ),
  "Psalm 28:7a": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Glow id={`b${uid}`} x={136} y={40} r={92} color={C.gold} />
      <g transform="translate(136,38)">
        <path d="M 0 -30 L 30 -19 L 30 6 Q 30 30 0 44 Q -30 30 -30 6 L -30 -19 Z" fill={C.bronze} />
        <path d="M 0 -23 L 23 -14 L 23 5 Q 23 24 0 36 Q -23 24 -23 5 L -23 -14 Z" fill={C.gold} />
        <path d="M 0 -14 q -10 14 0 30 q 10 -16 0 -30 Z" fill={C.crimson} opacity="0.75" />
      </g>
      <Ridge y={104} sway={5} fill={C.sandDeep} />
      <Tuft x={44} y={116} scale={1.1} color={C.leaf} />
      <Tuft x={226} y={114} scale={1} color={C.leaf} />
    </>
  ),
  "Psalm 9:1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.dusk} />
      <Stars seed={23} count={20} size={1.5} />
      <Glow id={`b${uid}`} x={136} y={98} r={76} color={C.gold} />
      <Scroll x={104} y={92} scale={1.5} sheet={C.cloth} rod={C.wood} />
      <g fill={C.crimson} opacity="0.9">
        <path d="M 136 24 q -12 -14 2 -20 q 9 -3 10 4 q 2 -7 10 -4 q 14 6 2 20 q -12 12 -24 0 Z" />
      </g>
    </>
  ),
  "Psalm 150:6": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.grassLight} />
      <Birds x={30} y={16} scale={1.2} color={C.stoneShade} />
      <Birds x={150} y={10} scale={1} color={C.stoneShade} />
      <Birds x={214} y={26} scale={0.8} color={C.stoneShade} />
      <Ridge y={92} sway={8} fill={C.grass} />
      <Ridge y={110} sway={5} fill={C.grassDeep} />
      <Sheep x={22} y={110} scale={0.55} />
      <g fill={C.earthDeep}>
        <ellipse cx="118" cy="110" rx="11" ry="7" />
        <circle cx="128" cy="104" r="4.6" />
        <path d="M 126 100 q 1 -6 4 -2 M 131 100 q 1 -5 3 -1" stroke={C.earthDeep} strokeWidth="1.8" fill="none" />
      </g>
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.65">
        <path d="M 186 92 q 12 -10 24 0" /><path d="M 178 80 q 20 -16 40 0" />
      </g>
    </>
  ),
  "Nehemiah 8:10c": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.ember} />
      <Sun x={136} y={22} r={16} color={C.sun} ray={C.sunRay} />
      <g fill={C.stone}>
        <rect x="0" y="88" width="272" height="32" />
      </g>
      <g fill={C.stoneDeep}>
        <rect x="0" y="80" width="22" height="9" /><rect x="52" y="80" width="22" height="9" />
        <rect x="104" y="80" width="22" height="9" /><rect x="156" y="80" width="22" height="9" />
        <rect x="208" y="80" width="22" height="9" /><rect x="250" y="80" width="22" height="9" />
      </g>
      <Person x={70} y={80} scale={0.66} robe={C.crimson} scarf={C.gold} skin={C.earth} />
      <Person x={196} y={80} scale={0.66} robe={C.purple} scarf={C.cloth} skin={C.clothDeep} />
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.7">
        <path d="M 118 56 q 14 -12 28 0" /><path d="M 110 44 q 22 -18 44 0" />
      </g>
    </>
  ),

  // Chapter 4 — God the Creator
  "Psalm 19:1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.purple} />
      <Stars seed={29} count={48} size={2} />
      <g fill={C.star} opacity="0.3">
        <ellipse cx="136" cy="46" rx="118" ry="16" transform="rotate(-10 136 46)" />
      </g>
      <Moon x={44} y={26} r={12} />
      <Peaks points="L 60 104 L 130 82 L 196 106 L 272 96" fill={C.deepNight} />
    </>
  ),
  "Psalm 24:1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.grassLight} />
      <Sun x={228} y={22} r={15} color={C.sun} ray={C.sunRay} />
      <Ridge y={78} sway={12} fill={C.grassLight} />
      <Ridge y={96} sway={8} fill={C.grass} />
      <Ridge y={112} sway={5} fill={C.grassDeep} />
      <Tree x={44} y={104} scale={1.1} canopy={C.grassDeep} shade={C.leaf} trunk={C.earth} />
      <Tree x={188} y={112} scale={0.85} canopy={C.leaf} shade={C.leafDeep} trunk={C.earthDeep} />
      <g fill={C.sunRay}>
        <rect x="98" y="98" width="6" height="14" rx="3" /><rect x="112" y="94" width="6" height="18" rx="3" />
        <rect x="126" y="98" width="6" height="14" rx="3" /><rect x="140" y="92" width="6" height="20" rx="3" />
      </g>
      <Birds x={72} y={24} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "Psalm 139:14": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.blossom} bottom={C.grassLight} />
      <Ridge y={100} sway={8} fill={C.grass} />
      <g transform="translate(136,90)">
        <path d="M -4 0 L -4 -26" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M -6 -24 q -30 -18 -34 4 q -4 20 30 12 Z" fill={C.purple} />
        <path d="M -2 -24 q 30 -18 34 4 q 4 20 -30 12 Z" fill={C.blossom} />
        <path d="M -8 -8 q -20 -6 -22 8 q 12 12 24 -2 Z" fill={C.crimson} opacity="0.8" />
        <path d="M 0 -8 q 20 -6 22 8 q -12 12 -24 -2 Z" fill={C.gold} opacity="0.85" />
        <path d="M -6 -28 q -6 -8 -10 -8 M -2 -28 q 6 -8 10 -8" stroke={C.ink} strokeWidth="1.6" fill="none" />
      </g>
      <Bloom x={44} y={110} r={2.8} petal={C.cloud} heart={C.gold} />
      <Bloom x={228} y={112} r={2.6} petal={C.blossom} heart={C.gold} />
      <Tuft x={90} y={116} scale={1} color={C.leaf} />
    </>
  ),
  "Jeremiah 10:12": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.ember} />
      <g fill={C.storm} opacity="0.8">
        <ellipse cx="90" cy="16" rx="56" ry="14" />
        <ellipse cx="206" cy="14" rx="46" ry="12" />
      </g>
      <path d="M 120 26 L 106 60 L 124 58 L 112 96 L 150 52 L 130 54 L 144 26 Z" fill={C.gold} />
      <Peaks points="L 40 96 L 96 46 L 152 100 L 210 56 L 272 104" fill={C.night} />
      <Peaks points="L 70 116 L 130 96 L 196 118 L 272 112" fill={C.deepNight} />
      <g fill={C.foam} opacity="0.4">
        <circle cx="34" cy="60" r="2" /><circle cx="244" cy="52" r="2.4" />
      </g>
    </>
  ),
  "Psalm 104:24": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.grassLight} />
      <Birds x={186} y={16} scale={0.9} color={C.stoneShade} />
      <Ridge y={72} sway={10} fill={C.grass} />
      <Water y={86} fill={C.deepWater} />
      <g fill={C.foam} opacity="0.9">
        <path d="M 30 106 q 14 -9 26 0 q -12 8 -26 0 Z" />
        <path d="M 56 106 l 10 -6 l 0 12 Z" />
      </g>
      <Tree x={216} y={84} scale={0.9} canopy={C.grassDeep} shade={C.leaf} trunk={C.earth} />
      <g fill={C.gold}>
        <ellipse cx="150" cy="98" rx="5" ry="4" />
        <path d="M 146 96 h 8 M 146 100 h 8" stroke={C.ink} strokeWidth="1" />
        <path d="M 148 92 q 6 -6 10 0 q -6 4 -10 0 Z" fill={C.cloud} opacity="0.8" />
      </g>
      <Bloom x={110} y={100} r={2.6} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "Psalm 8:1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={54} r={116} color={C.flameBright} />
      <Peaks points="L 44 90 L 100 36 L 152 74 L 208 30 L 272 88" fill={C.stoneShade} />
      <Peaks points="L 66 112 L 128 84 L 190 114 L 272 104" fill={C.stoneDeep} />
      <g stroke={C.gold} strokeWidth="2.4" strokeLinecap="round" opacity="0.5">
        <path d="M 40 20 L 66 6" /><path d="M 232 20 L 206 6" /><path d="M 136 14 L 136 0" />
      </g>
      <Birds x={54} y={30} scale={0.8} color={C.stoneShade} />
    </>
  ),
  "Job 12:10": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Ridge y={96} sway={8} fill={C.grass} />
      <g transform="translate(136,98)">
        <path d="M -34 0 q 6 -18 34 -18 q 28 0 34 18 Z" fill={C.earthDeep} />
        <path d="M -26 -2 q 26 -14 52 0" stroke={C.earth} strokeWidth="2.4" fill="none" />
        <g fill={C.cloth}>
          <ellipse cx="-10" cy="-4" rx="7" ry="5.4" /><ellipse cx="2" cy="-6" rx="7" ry="5.4" />
          <ellipse cx="14" cy="-4" rx="7" ry="5.4" />
        </g>
      </g>
      <g fill={C.leaf}>
        <path d="M 60 96 q -18 -8 -24 4 q 16 8 24 -4 Z" />
        <path d="M 212 92 q 18 -8 24 4 q -16 8 -24 -4 Z" />
      </g>
      <Birds x={60} y={26} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "Psalm 33:6": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Stars seed={41} count={30} size={1.7} />
      <g stroke={C.foam} strokeWidth="2.4" fill="none" opacity="0.55" strokeLinecap="round">
        <path d="M 10 34 q 50 -20 100 0 q 50 20 100 0 q 30 -12 52 -4" />
        <path d="M 10 58 q 50 -20 100 0 q 50 20 100 0 q 30 -12 52 -4" />
        <path d="M 30 84 q 44 -18 88 0 q 44 18 88 0" />
      </g>
      <g fill={C.star} opacity="0.95">
        <circle cx="76" cy="30" r="2.6" /><circle cx="196" cy="56" r="2.4" /><circle cx="132" cy="82" r="2.2" />
      </g>
      <Ridge y={114} sway={4} fill={C.deepNight} />
    </>
  ),

  // Chapter 5 — Kindness & Caring
  "Ephesians 4:32": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Ridge y={98} sway={8} fill={C.grass} />
      <Person x={86} y={118} scale={0.85} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Person x={186} y={118} scale={0.8} robe={C.clothDeep} scarf={C.crimson} skin={C.clothDeep} />
      <g fill={C.crimson} opacity="0.9">
        <path d="M 136 94 q 20 -10 40 -2 q -20 10 -40 2 Z" />
      </g>
      <g fill={C.crimson}>
        <path d="M 136 30 q -12 -14 2 -20 q 9 -3 10 4 q 2 -7 10 -4 q 14 6 2 20 q -12 12 -24 0 Z" />
      </g>
      <Bloom x={40} y={110} r={2.6} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "1 John 3:18": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.sand} />
      <Ridge y={100} sway={5} fill={C.sand} />
      <Person x={70} y={118} scale={0.8} robe={C.leafDeep} scarf={C.cloth} skin={C.earth} />
      <Person x={200} y={118} scale={0.76} robe={C.crimson} scarf={C.gold} skin={C.clothDeep} />
      <g fill={C.sunRay}>
        <ellipse cx="120" cy="96" rx="14" ry="7" />
        <ellipse cx="152" cy="98" rx="12" ry="6" />
        <path d="M 108 94 q 12 -7 24 0" stroke={C.wood} strokeWidth="1.6" fill="none" />
      </g>
      <g stroke={C.gold} strokeWidth="2" fill="none" opacity="0.6">
        <path d="M 92 88 q 14 -8 22 0" /><path d="M 180 90 q -14 -8 -22 0" />
      </g>
    </>
  ),
  "Romans 12:10": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.blossom} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={100} r={84} color={C.dawn} />
      <Ridge y={104} sway={6} fill={C.grass} />
      <Person x={116} y={118} scale={0.82} robe={C.purple} scarf={C.cloth} skin={C.earth} />
      <Person x={156} y={118} scale={0.82} robe={C.crimson} scarf={C.gold} skin={C.clothDeep} />
      <g fill={C.clothDeep} opacity="0.9">
        <path d="M 100 92 q 36 -16 72 0 q -36 10 -72 0 Z" />
      </g>
      <Bloom x={50} y={112} r={2.8} petal={C.cloud} heart={C.gold} />
      <Bloom x={222} y={110} r={2.6} petal={C.blossom} heart={C.gold} />
    </>
  ),
  "Proverbs 17:17a": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Ridge y={100} sway={8} fill={C.grass} />
      <g transform="translate(104,112)">
        <path d="M 0 0 q -4 -26 8 -34" stroke={C.earth} strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="10" cy="-40" r="16" fill={C.grassDeep} />
        <circle cx="0" cy="-32" r="10" fill={C.leaf} />
      </g>
      <g transform="translate(172,112)">
        <path d="M 0 0 q 4 -24 -8 -32" stroke={C.earth} strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="-10" cy="-38" r="15" fill={C.leaf} />
        <circle cx="0" cy="-30" r="9" fill={C.grassDeep} />
      </g>
      <g fill={C.crimson} opacity="0.85">
        <path d="M 136 34 q -11 -13 2 -18 q 8 -3 9 4 q 2 -6 9 -4 q 13 5 2 18 q -11 11 -22 0 Z" />
      </g>
      <Tuft x={44} y={114} scale={1.1} color={C.leaf} />
    </>
  ),
  "Galatians 6:2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.sand} bottom={C.dawn} />
      <Ridge y={102} sway={5} fill={C.sandDeep} />
      <path d="M 0 116 q 70 -10 140 -12 q 70 -2 132 -4" stroke={C.sand} strokeWidth="8" fill="none" opacity="0.85" strokeLinecap="round" />
      <Person x={96} y={116} scale={0.85} robe={C.leafDeep} scarf={C.cloth} skin={C.earth} />
      <Person x={150} y={116} scale={0.8} robe={C.clothDeep} scarf={C.crimson} skin={C.clothDeep} />
      <g fill={C.wood}>
        <path d="M 104 84 q 20 -14 40 -2 q -20 10 -40 2 Z" />
        <path d="M 112 80 q 16 -10 30 -2" stroke={C.woodDeep} strokeWidth="1.6" fill="none" />
      </g>
      <Sun x={232} y={24} r={13} color={C.sun} ray={C.sunRay} />
    </>
  ),
  "1 Thessalonians 5:15": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Glow id={`b${uid}`} x={136} y={96} r={80} color={C.dawn} />
      <Ridge y={100} sway={6} fill={C.grass} />
      <Person x={106} y={118} scale={0.85} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <g transform="translate(166,118)">
        <path d="M -20 0 q 3 -14 20 -14 q 17 0 20 14 Z" fill={C.clothDeep} />
        <circle cx="0" cy="-20" r="6.5" fill={C.earth} />
      </g>
      <path d="M 120 92 q 20 -10 38 6" stroke={C.earth} strokeWidth="4" fill="none" strokeLinecap="round" />
      <g fill={C.gold} opacity="0.7">
        <circle cx="60" cy="92" r="2.8" /><circle cx="216" cy="94" r="2.4" />
      </g>
    </>
  ),
  "Colossians 3:13": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.dawn} />
      <Ridge y={104} sway={6} fill={C.grass} />
      <Person x={80} y={118} scale={0.8} robe={C.crimson} scarf={C.cloth} skin={C.earth} />
      <Person x={192} y={118} scale={0.8} robe={C.purple} scarf={C.gold} skin={C.clothDeep} />
      <g stroke={C.clothDeep} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M 96 96 q 18 -8 30 -2" /><path d="M 176 96 q -18 -8 -30 -2" />
      </g>
      <g fill={C.crimson} opacity="0.9">
        <path d="M 136 32 q -13 -15 2 -21 q 9 -3 10 4 q 3 -7 10 -4 q 15 6 2 21 q -13 12 -24 0 Z" />
      </g>
      <Glow id={`b${uid}`} x={136} y={30} r={54} color={C.blossom} />
    </>
  ),
  "Hebrews 13:16": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.sand} />
      <Ridge y={94} sway={5} fill={C.sand} />
      <g fill={C.wood}>
        <rect x="40" y="96" width="192" height="8" rx="2" />
        <rect x="52" y="104" width="8" height="16" /><rect x="212" y="104" width="8" height="16" />
      </g>
      <g fill={C.sunRay}>
        <ellipse cx="90" cy="92" rx="15" ry="6" /><ellipse cx="136" cy="90" rx="14" ry="6" />
        <ellipse cx="182" cy="92" rx="15" ry="6" />
      </g>
      <Person x={26} y={92} scale={0.6} robe={C.leafDeep} scarf={C.cloth} skin={C.earth} />
      <Person x={246} y={92} scale={0.6} robe={C.purple} scarf={C.crimson} skin={C.clothDeep} />
      <g stroke={C.gold} strokeWidth="2" fill="none" opacity="0.6">
        <path d="M 108 82 q 14 -8 22 0" /><path d="M 164 82 q -14 -8 -22 0" />
      </g>
    </>
  ),
};
