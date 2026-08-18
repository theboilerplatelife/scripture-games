/* Volume 3 — Judges and kings: Gideon's torches, Ruth's harvest,
   Samuel's night, David's sling, Solomon's dream, Elijah's fire.
   Barley gold and lamplight run through the whole volume, against the
   green hill country these stories are actually set in. */
import {
  C, Sky, Glow, Ridge, Peaks, Sun, Moon, Stars, Clouds, Birds, Water,
  Tuft, Bloom, Tree, Tent, Sheep, Jar, Scroll, Flame,
} from "../staging.jsx";

export const VOLUME_3 = {
  // 13 — Gideon's 300 Brave Men
  "13-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.sand} />
      <Ridge y={70} sway={8} fill={C.stoneShade} />
      <Ridge y={84} sway={5} fill={C.sandDeep} />
      <g fill={C.clothDeep}>
        <path d="M 6 104 l 11 -17 l 11 17 Z" /><path d="M 32 104 l 11 -17 l 11 17 Z" />
        <path d="M 58 104 l 11 -17 l 11 17 Z" /><path d="M 84 104 l 11 -17 l 11 17 Z" />
        <path d="M 110 104 l 11 -17 l 11 17 Z" /><path d="M 136 104 l 11 -17 l 11 17 Z" />
        <path d="M 162 104 l 11 -17 l 11 17 Z" /><path d="M 188 104 l 11 -17 l 11 17 Z" />
        <path d="M 214 104 l 11 -17 l 11 17 Z" /><path d="M 240 104 l 11 -17 l 11 17 Z" />
      </g>
      <g fill={C.cloth}>
        <path d="M 18 118 l 11 -16 l 11 16 Z" /><path d="M 46 118 l 11 -16 l 11 16 Z" />
        <path d="M 74 118 l 11 -16 l 11 16 Z" /><path d="M 102 118 l 11 -16 l 11 16 Z" />
        <path d="M 130 118 l 11 -16 l 11 16 Z" /><path d="M 158 118 l 11 -16 l 11 16 Z" />
        <path d="M 186 118 l 11 -16 l 11 16 Z" /><path d="M 214 118 l 11 -16 l 11 16 Z" />
        <path d="M 242 118 l 11 -16 l 11 16 Z" />
      </g>
      <g fill={C.gold} opacity="0.7">
        <circle cx="60" cy="112" r="2" /><circle cx="144" cy="110" r="2" /><circle cx="228" cy="113" r="2" />
      </g>
    </>
  ),
  "13-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.grassLight} />
      <Clouds x={214} y={18} scale={0.8} color={C.cloud} />
      <Ridge y={72} sway={10} fill={C.grass} />
      <Water y={86} fill={C.deepWater} />
      <g fill={C.sand}>
        <path d="M 0 86 q 50 -12 96 -2 L 96 120 L 0 120 Z" opacity="0.35" />
      </g>
      <g transform="translate(70,92)">
        <path d="M 0 0 q 10 14 26 14 q 16 0 26 -14 q -26 -8 -52 0 Z" fill={C.earth} />
        <path d="M 8 2 q 18 -5 36 0" stroke={C.foam} strokeWidth="2" fill="none" opacity="0.8" />
      </g>
      <g fill={C.foam} opacity="0.85">
        <circle cx="152" cy="96" r="3" /><circle cx="164" cy="102" r="2.4" /><circle cx="176" cy="94" r="2" />
      </g>
      <g stroke={C.foam} strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M 196 106 q 12 -6 24 0" /><path d="M 226 96 q 12 -6 24 0" />
      </g>
      <Tuft x={22} y={80} scale={1.1} color={C.leaf} />
    </>
  ),
  "13-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.dusk} />
      <Stars seed={13} count={12} size={1.3} />
      <Ridge y={94} sway={5} fill={C.deepNight} />
      <g transform="translate(52,96)">
        <path d="M -14 0 q -4 20 14 20 q 18 0 14 -20 Z" fill={C.wood} />
        <rect x="-16" y="-4" width="32" height="5" rx="2" fill={C.woodDeep} />
        <path d="M 0 -4 q -5 -12 0 -18 q 5 6 0 18 Z" fill={C.flame} opacity="0.9" />
      </g>
      <g transform="translate(136,98)">
        <path d="M -14 0 q -4 20 14 20 q 18 0 14 -20 Z" fill={C.wood} />
        <rect x="-16" y="-4" width="32" height="5" rx="2" fill={C.woodDeep} />
        <path d="M 0 -4 q -5 -12 0 -18 q 5 6 0 18 Z" fill={C.flame} opacity="0.9" />
      </g>
      <g transform="translate(216,94)">
        <path d="M 0 0 q 18 -6 30 -20 q 7 -9 12 -2 q -8 18 -26 26 Z" fill={C.bronze} />
        <path d="M 4 -2 q 18 -8 28 -20" stroke={C.gold} strokeWidth="2" fill="none" opacity="0.8" />
      </g>
      <Glow id={`b${uid}`} x={94} y={92} r={54} color={C.flame} />
    </>
  ),
  "13-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Stars seed={17} count={16} size={1.4} />
      <Glow id={`b${uid}`} x={136} y={96} r={116} color={C.flame} />
      <Ridge y={100} sway={5} fill={C.deepNight} />
      <g>
        <Flame x={40} y={100} scale={1.1} />
        <Flame x={92} y={106} scale={0.9} />
        <Flame x={140} y={98} scale={1.2} />
        <Flame x={192} y={106} scale={0.9} />
        <Flame x={240} y={100} scale={1.05} />
      </g>
      <g fill={C.wood} opacity="0.9">
        <path d="M 62 116 l 12 -5 l 3 6 Z" /><path d="M 116 118 l 11 -6 l 4 6 Z" />
        <path d="M 168 116 l 12 -5 l 3 6 Z" /><path d="M 216 118 l 11 -6 l 4 6 Z" />
      </g>
      <g stroke={C.gold} strokeWidth="1.8" fill="none" opacity="0.5">
        <path d="M 20 30 q 12 -10 24 0" /><path d="M 228 26 q 12 -10 24 0" />
      </g>
    </>
  ),
  "13-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.ember} />
      <Stars seed={29} count={10} size={1.2} />
      <Ridge y={88} sway={8} fill={C.night} />
      <Ridge y={104} sway={5} fill={C.deepNight} />
      <g fill={C.clothDeep} opacity="0.55">
        <path d="M 12 96 l 9 -14 l 9 14 Z" /><path d="M 40 100 l 8 -12 l 8 12 Z" />
        <path d="M 214 98 l 9 -13 l 9 13 Z" />
      </g>
      <g stroke={C.stoneShade} strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round">
        <path d="M 76 114 q 30 -12 56 -22" /><path d="M 108 118 q 34 -14 62 -26" />
        <path d="M 148 118 q 30 -10 54 -18" />
      </g>
      <Glow id={`b${uid}`} x={30} y={92} r={40} color={C.flame} />
      <Flame x={30} y={96} scale={0.7} />
    </>
  ),

  // 14 — Ruth & Naomi's Faithful Harvest
  "14-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Sun x={216} y={24} r={15} color={C.sun} ray={C.sunRay} />
      <Ridge y={86} sway={10} fill={C.grassLight} />
      <Ridge y={104} sway={6} fill={C.grass} />
      <path d="M 0 118 q 70 -18 140 -22 q 70 -4 132 -14" stroke={C.sandDeep} strokeWidth="7" fill="none" opacity="0.85" strokeLinecap="round" />
      <g fill={C.crimson} opacity="0.85">
        <path d="M 96 96 q -10 -12 2 -17 q 7 -3 9 3 q 2 -6 9 -3 q 12 5 2 17 q -11 10 -22 0 Z" />
      </g>
      <g fill={C.purple} opacity="0.7">
        <path d="M 150 100 q -8 -10 2 -14 q 6 -2 7 2 q 2 -5 8 -2 q 10 4 2 14 q -10 8 -19 0 Z" />
      </g>
      <Tuft x={40} y={112} scale={1.2} color={C.leaf} />
      <Bloom x={230} y={110} r={2.6} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "14-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Sun x={40} y={20} r={13} color={C.sun} ray={C.sunRay} />
      <Ridge y={80} sway={5} fill={C.sandDeep} />
      <g stroke={C.gold} strokeWidth="2.4" strokeLinecap="round">
        <path d="M 10 118 l 0 -30 M 26 116 l 0 -28 M 42 118 l 0 -32 M 58 116 l 0 -28" />
        <path d="M 74 118 l 0 -30 M 90 116 l 0 -26 M 106 118 l 0 -30 M 122 116 l 0 -28" />
        <path d="M 214 118 l 0 -30 M 230 116 l 0 -28 M 246 118 l 0 -32 M 262 116 l 0 -26" />
      </g>
      <g fill={C.gold}>
        <ellipse cx="10" cy="86" rx="3.4" ry="7" /><ellipse cx="26" cy="86" rx="3.4" ry="6" />
        <ellipse cx="42" cy="84" rx="3.4" ry="7" /><ellipse cx="58" cy="86" rx="3.4" ry="6" />
        <ellipse cx="74" cy="86" rx="3.4" ry="7" /><ellipse cx="90" cy="88" rx="3.4" ry="6" />
        <ellipse cx="106" cy="86" rx="3.4" ry="7" /><ellipse cx="122" cy="86" rx="3.4" ry="6" />
        <ellipse cx="214" cy="86" rx="3.4" ry="7" /><ellipse cx="230" cy="86" rx="3.4" ry="6" />
        <ellipse cx="246" cy="84" rx="3.4" ry="7" /><ellipse cx="262" cy="88" rx="3.4" ry="6" />
      </g>
      <g fill={C.sunRay} transform="translate(150,100) rotate(-12)">
        <path d="M 0 0 q 14 -6 30 0 q -14 8 -30 0 Z" />
        <path d="M 6 -4 q 12 -5 24 0" stroke={C.gold} strokeWidth="1.6" fill="none" />
      </g>
    </>
  ),
  "14-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.dawn} />
      <Ridge y={84} sway={6} fill={C.sand} />
      <g stroke={C.gold} strokeWidth="2.2" strokeLinecap="round" opacity="0.9">
        <path d="M 18 112 l 0 -24 M 34 110 l 0 -22 M 232 112 l 0 -24 M 248 110 l 0 -22" />
      </g>
      <g transform="translate(136,94)">
        <path d="M -34 0 q 4 22 34 22 q 30 0 34 -22 Z" fill={C.wood} />
        <path d="M -34 0 h 68" stroke={C.woodDeep} strokeWidth="4" strokeLinecap="round" />
        <g fill={C.gold}>
          <ellipse cx="-16" cy="-4" rx="4" ry="8" /><ellipse cx="-4" cy="-8" rx="4" ry="8" />
          <ellipse cx="8" cy="-6" rx="4" ry="8" /><ellipse cx="20" cy="-3" rx="4" ry="8" />
        </g>
      </g>
      <g fill={C.gold} opacity="0.9">
        <ellipse cx="70" cy="112" rx="3.6" ry="7" transform="rotate(-24 70 112)" />
        <ellipse cx="86" cy="116" rx="3.6" ry="7" transform="rotate(18 86 116)" />
        <ellipse cx="196" cy="114" rx="3.6" ry="7" transform="rotate(-14 196 114)" />
      </g>
      <Jar x={44} y={116} scale={0.8} body={C.earth} rim={C.earthDeep} />
    </>
  ),
  "14-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.dawn} />
      <Sun x={136} y={22} r={16} color={C.sun} ray={C.sunRay} />
      <Ridge y={88} sway={8} fill={C.sandDeep} />
      <g fill={C.stone}>
        <path d="M 24 110 L 24 92 L 40 84 L 56 92 L 56 110 Z" />
        <path d="M 68 112 L 68 96 L 82 88 L 96 96 L 96 112 Z" />
        <path d="M 190 110 L 190 92 L 206 84 L 222 92 L 222 110 Z" />
      </g>
      <g fill={C.stoneDeep}>
        <rect x="34" y="98" width="12" height="12" rx="1" />
        <rect x="76" y="102" width="10" height="10" rx="1" />
        <rect x="200" y="98" width="12" height="12" rx="1" />
      </g>
      <g transform="translate(136,96)">
        <path d="M -18 8 q -8 -18 6 -22 q 8 -2 12 5 q 4 -7 12 -5 q 14 4 6 22 q -18 14 -36 0 Z" fill={C.crimson} />
        <path d="M -6 -6 q 8 -4 12 4" stroke={C.cloth} strokeWidth="1.6" fill="none" opacity="0.6" />
      </g>
      <Tuft x={250} y={116} scale={1} color={C.leaf} />
    </>
  ),
  "14-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Glow id={`b${uid}`} x={136} y={100} r={80} color={C.dawn} />
      <Ridge y={98} sway={8} fill={C.grass} />
      <g transform="translate(136,104)">
        <ellipse cx="0" cy="4" rx="26" ry="12" fill={C.cloth} />
        <path d="M -20 4 q 20 -14 40 0 q -20 10 -40 0 Z" fill={C.clothDeep} />
        <circle cx="0" cy="-4" r="9" fill={C.cloth} />
        <path d="M -9 -6 q 9 -10 18 0" fill={C.clothDeep} />
      </g>
      <g fill={C.gold}>
        <path d="M 60 92 L 66 78 L 72 92 L 86 92 L 74 100 L 78 114 L 66 106 L 54 114 L 58 100 L 46 92 Z" opacity="0.85" />
      </g>
      <g fill={C.gold} opacity="0.7">
        <circle cx="212" cy="90" r="3.4" /><circle cx="230" cy="98" r="2.8" /><circle cx="222" cy="108" r="2.4" />
      </g>
      <Tuft x={30} y={116} scale={1.1} color={C.leaf} />
    </>
  ),

  // 15 — Young Samuel Hears God's Call
  "15-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Ridge y={92} sway={4} fill={C.sandDeep} />
      <g transform="translate(136,30)">
        <path d="M -72 64 L -72 20 L 0 -2 L 72 20 L 72 64 Z" fill={C.clothDeep} />
        <path d="M -72 20 L 0 -2 L 72 20 Z" fill={C.cloth} />
        <path d="M 0 -2 L 0 -14" stroke={C.wood} strokeWidth="3" strokeLinecap="round" />
        <rect x="-14" y="30" width="28" height="34" rx="2" fill={C.purple} opacity="0.85" />
        <g stroke={C.gold} strokeWidth="2" opacity="0.8">
          <path d="M -46 30 v 34 M -30 30 v 34 M 30 30 v 34 M 46 30 v 34" />
        </g>
      </g>
      <g transform="translate(50,104)">
        <path d="M 0 0 q -4 -12 6 -12 q 10 0 6 12 Z" fill={C.bronze} />
        <path d="M 6 -14 q -4 -8 0 -12 q 4 5 0 12 Z" fill={C.flame} />
      </g>
      <Tuft x={228} y={114} scale={1} color={C.leaf} />
    </>
  ),
  "15-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Stars seed={37} count={8} size={1.2} />
      <Glow id={`b${uid}`} x={136} y={98} r={70} color={C.gold} />
      <Ridge y={104} sway={4} fill={C.deepNight} />
      <g transform="translate(136,96)">
        <rect x="-28" y="-16" width="56" height="24" rx="2" fill={C.gold} />
        <rect x="-32" y="-21" width="64" height="6" rx="2" fill={C.bronze} />
        <path d="M -46 -4 h 92" stroke={C.wood} strokeWidth="3" strokeLinecap="round" />
        <path d="M -20 -21 q 10 -16 20 -2 q 10 -14 20 2 Z" fill={C.flameBright} opacity="0.9" />
      </g>
      <g transform="translate(40,108)">
        <path d="M 0 0 q -3 -10 5 -10 q 8 0 5 10 Z" fill={C.bronze} />
        <path d="M 5 -11 q -3 -7 0 -10 q 3 4 0 10 Z" fill={C.flame} />
      </g>
      <g stroke={C.star} strokeWidth="1.6" fill="none" opacity="0.5">
        <path d="M 214 74 q 10 -8 20 0" /><path d="M 206 62 q 18 -14 36 0" />
      </g>
    </>
  ),
  "15-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.purple} />
      <Stars seed={43} count={10} size={1.2} />
      <Ridge y={100} sway={4} fill={C.deepNight} />
      <g fill="none" stroke={C.gold} strokeWidth="2.4" opacity="0.85">
        <path d="M 44 96 q 14 -12 28 0" />
        <path d="M 34 86 q 24 -20 48 0" />
        <path d="M 24 76 q 34 -28 68 0" />
      </g>
      <g fill={C.clothDeep}>
        <path d="M 150 116 q 20 -14 44 -2 q -20 10 -44 2 Z" />
        <path d="M 158 110 q 18 -12 36 -1 q -18 8 -36 1 Z" fill={C.cloth} opacity="0.8" />
      </g>
      <g fill={C.bronze}>
        <path d="M 230 108 q -4 -12 6 -12 q 10 0 6 12 Z" />
        <path d="M 236 94 q -4 -8 0 -12 q 4 5 0 12 Z" fill={C.flame} />
      </g>
      <Glow id={`b${uid}`} x={236} y={100} r={44} color={C.flame} />
    </>
  ),
  "15-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={26} r={92} color={C.dawn} />
      <g stroke={C.dawn} strokeWidth="3" strokeLinecap="round" opacity="0.5">
        <path d="M 136 26 L 88 96" /><path d="M 136 26 L 122 100" />
        <path d="M 136 26 L 152 100" /><path d="M 136 26 L 186 96" />
      </g>
      <Ridge y={102} sway={4} fill={C.night} />
      <g transform="translate(136,110)">
        <path d="M -30 0 q 26 -16 60 -2 q -26 12 -60 2 Z" fill={C.clothDeep} />
        <path d="M -20 -4 q 22 -12 44 -2 q -22 9 -44 2 Z" fill={C.cloth} opacity="0.8" />
      </g>
      <Stars seed={47} count={8} size={1.1} />
    </>
  ),
  "15-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Sun x={48} y={22} r={15} color={C.sun} ray={C.sunRay} />
      <Ridge y={90} sway={10} fill={C.grassLight} />
      <Ridge y={106} sway={6} fill={C.grass} />
      <Scroll x={112} y={92} scale={1.1} sheet={C.cloth} rod={C.wood} />
      <g fill={C.bronze}>
        <path d="M 44 116 q -5 -16 8 -16 q 13 0 8 16 Z" />
        <path d="M 52 98 q -5 -10 0 -15 q 5 6 0 15 Z" fill={C.flame} />
      </g>
      <Birds x={196} y={22} scale={0.9} color={C.stoneShade} />
      <Tuft x={240} y={114} scale={1.1} color={C.leaf} />
    </>
  ),

  // 16 — David & Goliath in the Valley
  "16-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.sand} />
      <Peaks points="L 50 74 L 110 96 L 170 72 L 230 98 L 272 84" fill={C.stoneShade} />
      <Ridge y={104} sway={4} fill={C.sandDeep} />
      <g transform="translate(196,36)">
        <path d="M 0 0 q 16 0 16 18 L 16 74 L -16 74 L -16 18 Q -16 0 0 0 Z" fill={C.storm} />
        <path d="M -16 26 L 16 26" stroke={C.ink} strokeWidth="3" />
        <path d="M 16 34 L 40 60" stroke={C.stoneDeep} strokeWidth="6" strokeLinecap="round" />
        <path d="M -16 40 L -34 52 L -34 76 L -16 68 Z" fill={C.bronze} />
      </g>
      <g fill={C.ink} opacity="0.7">
        <path d="M 34 116 q 6 -14 12 0 Z" /><path d="M 54 118 q 5 -12 10 0 Z" />
        <path d="M 74 116 q 6 -14 12 0 Z" />
      </g>
    </>
  ),
  "16-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.dawn} />
      <Ridge y={86} sway={8} fill={C.grassLight} />
      <Ridge y={102} sway={6} fill={C.grass} />
      <g transform="translate(70,104)">
        <ellipse cx="0" cy="0" rx="24" ry="12" fill={C.wood} />
        <ellipse cx="0" cy="-4" rx="20" ry="9" fill={C.sunRay} />
        <path d="M -12 -6 q 12 -6 24 0" stroke={C.woodDeep} strokeWidth="1.6" fill="none" />
      </g>
      <g fill={C.wood}>
        <ellipse cx="130" cy="110" rx="17" ry="9" />
        <ellipse cx="130" cy="106" rx="14" ry="7" fill={C.sunRay} />
      </g>
      <path d="M 226 116 q -4 -34 2 -46 q 8 -12 14 -4" stroke={C.earth} strokeWidth="4" fill="none" strokeLinecap="round" />
      <Sheep x={182} y={110} scale={0.5} />
      <Tent x={20} y={90} scale={0.6} cloth={C.cloth} shade={C.clothDeep} />
    </>
  ),
  "16-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.grassLight} />
      <Ridge y={78} sway={8} fill={C.grass} />
      <Water y={90} fill={C.deepWater} />
      <g fill={C.stone}>
        <ellipse cx="60" cy="106" rx="9" ry="7" />
        <ellipse cx="84" cy="112" rx="8" ry="6" />
        <ellipse cx="108" cy="104" rx="9" ry="7" />
        <ellipse cx="132" cy="112" rx="8" ry="6" />
        <ellipse cx="156" cy="106" rx="9" ry="7" />
      </g>
      <g fill={C.stoneDeep} opacity="0.5">
        <ellipse cx="60" cy="110" rx="9" ry="3" /><ellipse cx="108" cy="108" rx="9" ry="3" />
        <ellipse cx="156" cy="110" rx="9" ry="3" />
      </g>
      <g transform="translate(216,88)">
        <path d="M 0 0 q -14 8 -18 22" stroke={C.clothDeep} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 0 0 q 14 8 18 22" stroke={C.clothDeep} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M -6 0 q 6 -8 12 0 q -6 6 -12 0 Z" fill={C.earth} />
      </g>
      <g stroke={C.foam} strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M 20 100 q 10 -5 20 0" /><path d="M 186 98 q 10 -5 20 0" />
      </g>
    </>
  ),
  "16-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.sand} />
      <Glow id={`b${uid}`} x={90} y={100} r={70} color={C.gold} />
      <Ridge y={98} sway={5} fill={C.sandDeep} />
      <g transform="translate(196,66)">
        <path d="M 0 0 q 14 0 14 16 L 14 54 L -14 54 L -14 16 Q -14 0 0 0 Z" fill={C.storm} opacity="0.85" />
        <path d="M 14 20 L 36 40" stroke={C.stoneDeep} strokeWidth="5" strokeLinecap="round" />
      </g>
      <g transform="translate(84,84)">
        <path d="M 0 34 L 0 -16" stroke={C.earth} strokeWidth="5" strokeLinecap="round" />
        <path d="M 0 -14 q -12 -10 -2 -16" stroke={C.earth} strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
      <g fill={C.gold} opacity="0.8">
        <circle cx="52" cy="86" r="3" /><circle cx="118" cy="92" r="2.6" /><circle cx="70" cy="106" r="2.2" />
      </g>
    </>
  ),
  "16-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Sun x={44} y={20} r={14} color={C.sun} ray={C.sunRay} />
      <Ridge y={96} sway={6} fill={C.sandDeep} />
      <g fill="none" stroke={C.cloth} strokeWidth="2.4" strokeDasharray="6 6" opacity="0.9">
        <path d="M 30 106 q 70 -66 150 -32" />
      </g>
      <circle cx="188" cy="76" r="6" fill={C.stone} />
      <g transform="translate(220,88)">
        <path d="M 0 0 q 14 6 14 22 L -14 30 L -14 8 Q -12 2 0 0 Z" fill={C.storm} opacity="0.8" transform="rotate(24)" />
      </g>
      <g fill={C.stone} opacity="0.9">
        <ellipse cx="60" cy="114" rx="9" ry="6" /><ellipse cx="86" cy="118" rx="8" ry="5" />
      </g>
      <g stroke={C.sandDeep} strokeWidth="2" opacity="0.6" strokeLinecap="round">
        <path d="M 236 108 l 8 -8 M 248 114 l 9 -7" />
      </g>
    </>
  ),

  // 17 — Solomon Prays for Wisdom
  "17-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Sun x={220} y={22} r={15} color={C.sun} ray={C.sunRay} />
      <Ridge y={84} sway={8} fill={C.grassLight} />
      <Ridge y={102} sway={5} fill={C.grass} />
      <g fill={C.stoneDeep}>
        <rect x="96" y="96" width="80" height="12" rx="2" />
        <rect x="104" y="86" width="64" height="10" rx="2" fill={C.stone} />
      </g>
      <g transform="translate(136,66)">
        <path d="M -20 20 L -20 4 L -12 4 L -12 -6 L -4 -6 L -4 4 L 4 4 L 4 -6 L 12 -6 L 12 4 L 20 4 L 20 20 Z" fill={C.gold} />
      </g>
      <Flame x={136} y={86} scale={0.7} />
      <Tuft x={40} y={112} scale={1.2} color={C.leaf} />
      <Tree x={244} y={100} scale={0.8} canopy={C.grassDeep} shade={C.leaf} trunk={C.earth} />
    </>
  ),
  "17-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.purple} />
      <Stars seed={53} count={22} size={1.5} />
      <Moon x={214} y={26} r={14} />
      <Glow id={`b${uid}`} x={100} y={96} r={78} color={C.gold} />
      <Ridge y={106} sway={4} fill={C.deepNight} />
      <g transform="translate(100,102)">
        <path d="M -30 12 q -6 -26 30 -26 q 36 0 30 26 Z" fill={C.night} />
        <path d="M -18 4 q 18 -14 36 0" stroke={C.gold} strokeWidth="2" fill="none" opacity="0.7" />
      </g>
      <g fill={C.star} opacity="0.8">
        <circle cx="176" cy="88" r="2.4" /><circle cx="192" cy="98" r="2" /><circle cx="164" cy="104" r="1.8" />
      </g>
    </>
  ),
  "17-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.dusk} />
      <Stars seed={59} count={12} size={1.3} />
      <Ridge y={102} sway={4} fill={C.deepNight} />
      <g opacity="0.45">
        <g fill={C.gold}>
          <circle cx="46" cy="98" r="9" /><circle cx="66" cy="104" r="7" /><circle cx="30" cy="106" r="6" />
        </g>
        <path d="M 30 112 h 46" stroke={C.gold} strokeWidth="2" opacity="0.6" />
      </g>
      <Glow id={`b${uid}`} x={186} y={96} r={62} color={C.gold} />
      <Scroll x={162} y={88} scale={1.2} sheet={C.cloth} rod={C.wood} />
      <g stroke={C.gold} strokeWidth="2" fill="none" opacity="0.75">
        <path d="M 156 76 q 30 -14 58 0" />
      </g>
    </>
  ),
  "17-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={92} r={100} color={C.gold} />
      <Ridge y={104} sway={4} fill={C.night} />
      <g transform="translate(136,88)">
        <path d="M -30 18 L -30 -4 L -18 6 L -6 -12 L 6 6 L 18 -4 L 18 18 Z" fill={C.gold} />
        <g fill={C.crimson}>
          <circle cx="-18" cy="10" r="2.6" /><circle cx="0" cy="10" r="2.6" /><circle cx="14" cy="10" r="2.6" />
        </g>
      </g>
      <g fill={C.gold} opacity="0.8">
        <circle cx="52" cy="100" r="4" /><circle cx="70" cy="108" r="3.4" /><circle cx="212" cy="102" r="4" />
        <circle cx="228" cy="110" r="3" />
      </g>
      <Scroll x={30} y={98} scale={0.7} sheet={C.cloth} rod={C.wood} />
    </>
  ),
  "17-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Sun x={136} y={22} r={17} color={C.sun} ray={C.sunRay} />
      <Ridge y={92} sway={6} fill={C.sandDeep} />
      <g fill={C.stone}>
        <path d="M 96 116 L 96 88 L 136 68 L 176 88 L 176 116 Z" />
        <rect x="126" y="98" width="20" height="18" rx="2" fill={C.woodDeep} />
      </g>
      <g fill={C.gold} opacity="0.9">
        <path d="M 108 88 h 56 v -6 h -56 Z" />
      </g>
      <path d="M 0 116 q 44 -12 92 -18" stroke={C.sandDeep} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.8" />
      <path d="M 272 114 q -44 -12 -92 -16" stroke={C.sandDeep} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.8" />
      <g fill={C.clothDeep}>
        <path d="M 30 108 q 6 -14 12 0 Z" /><path d="M 226 106 q 6 -14 12 0 Z" />
      </g>
    </>
  ),

  // 18 — Elijah on Mount Carmel
  "18-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.sand} />
      <Peaks points="L 60 66 L 136 26 L 212 68 L 272 92" fill={C.stoneShade} />
      <Ridge y={98} sway={5} fill={C.sandDeep} />
      <g fill={C.stoneDeep}>
        <rect x="104" y="86" width="64" height="12" rx="2" />
      </g>
      <g fill={C.clothDeep} opacity="0.85">
        <path d="M 20 116 q 5 -14 10 0 Z" /><path d="M 40 118 q 5 -12 10 0 Z" />
        <path d="M 60 116 q 5 -14 10 0 Z" /><path d="M 200 116 q 5 -14 10 0 Z" />
        <path d="M 220 118 q 5 -12 10 0 Z" /><path d="M 240 116 q 5 -14 10 0 Z" />
      </g>
      <Birds x={196} y={20} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "18-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.sand} />
      <Sun x={230} y={30} r={16} color={C.sun} ray={C.sunRay} />
      <Ridge y={96} sway={5} fill={C.sandDeep} />
      <g transform="translate(70,84)">
        <rect x="-12" y="0" width="24" height="32" rx="2" fill={C.stoneShade} />
        <circle cx="0" cy="-8" r="11" fill={C.stoneShade} />
        <path d="M -14 -14 l -10 -8 M 14 -14 l 10 -8" stroke={C.stoneShade} strokeWidth="4" strokeLinecap="round" />
        <g fill={C.stoneDeep}><circle cx="-4" cy="-9" r="2" /><circle cx="4" cy="-9" r="2" /></g>
      </g>
      <g fill="none" stroke={C.stoneShade} strokeWidth="2" opacity="0.5" strokeDasharray="4 5">
        <path d="M 120 78 q 18 -10 36 0" /><path d="M 112 66 q 26 -16 52 0" />
      </g>
      <g fill={C.clothDeep}>
        <path d="M 176 116 q 6 -18 12 0 Z" /><path d="M 200 118 q 6 -16 12 0 Z" />
      </g>
    </>
  ),
  "18-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.sand} />
      <Ridge y={96} sway={4} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="86" y="100" width="20" height="14" rx="2" /><rect x="110" y="100" width="20" height="14" rx="2" />
        <rect x="134" y="100" width="20" height="14" rx="2" /><rect x="158" y="100" width="20" height="14" rx="2" />
        <rect x="98" y="86" width="20" height="13" rx="2" /><rect x="122" y="86" width="20" height="13" rx="2" />
        <rect x="146" y="86" width="20" height="13" rx="2" />
      </g>
      <g fill={C.stoneDeep}>
        <rect x="110" y="74" width="20" height="11" rx="2" /><rect x="134" y="74" width="20" height="11" rx="2" />
      </g>
      <Jar x={40} y={110} scale={1} body={C.earth} rim={C.earthDeep} />
      <Jar x={222} y={112} scale={1} body={C.earth} rim={C.earthDeep} />
      <g stroke={C.water} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9">
        <path d="M 56 96 q 10 8 14 20" /><path d="M 224 98 q -10 8 -14 18" />
      </g>
    </>
  ),
  "18-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.dusk} />
      <Stars seed={61} count={9} size={1.2} />
      <Ridge y={100} sway={4} fill={C.deepNight} />
      <g fill={C.stoneDeep}>
        <rect x="98" y="102" width="76" height="12" rx="2" />
        <rect x="108" y="92" width="56" height="10" rx="2" fill={C.stoneShade} />
      </g>
      <g stroke={C.gold} strokeWidth="2" fill="none" opacity="0.65">
        <path d="M 118 84 q 18 -12 36 0" /><path d="M 108 72 q 28 -20 56 0" />
        <path d="M 100 58 q 36 -26 72 0" />
      </g>
      <g fill={C.gold} opacity="0.8">
        <circle cx="136" cy="44" r="2.6" /><circle cx="112" cy="52" r="2" /><circle cx="162" cy="50" r="2" />
      </g>
    </>
  ),
  "18-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.flame} />
      <Glow id={`b${uid}`} x={136} y={96} r={128} color={C.flameBright} />
      <path d="M 128 0 L 118 40 L 134 38 L 122 78 L 158 34 L 140 36 L 154 0 Z" fill={C.flameBright} opacity="0.95" />
      <Ridge y={104} sway={4} fill={C.night} />
      <g fill={C.stoneDeep} opacity="0.7">
        <rect x="104" y="106" width="64" height="10" rx="2" />
      </g>
      <Flame x={112} y={106} scale={1} />
      <Flame x={136} y={104} scale={1.3} />
      <Flame x={162} y={106} scale={1} />
      <g stroke={C.flameBright} strokeWidth="2" opacity="0.5" strokeLinecap="round">
        <path d="M 40 108 l 4 -12 M 232 106 l 5 -12 M 66 116 l 3 -9" />
      </g>
    </>
  ),
};
