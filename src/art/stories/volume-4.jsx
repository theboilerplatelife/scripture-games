/* Volume 4 — Exile and courage: Naaman at the Jordan, Esther in Susa,
   Daniel's den, the furnace, Jonah's fish, Nehemiah's wall. Persia and
   Babylon are drawn in purple, lapis and gold, which sets the whole
   volume apart from the sand and green of the earlier books. */
import {
  C, Sky, Glow, Ridge, Sun, Moon, Stars, Clouds, Birds, Water, Waves,
  Rain, Tuft, Palm, Jar, Scroll, Flame, Boat, Person, Horse,
} from "../staging.jsx";

export const VOLUME_4 = {
  // 19 — Naaman & The River Jordan
  "19-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.sand} />
      <Ridge y={96} sway={4} fill={C.sandDeep} />
      <Person x={92} y={118} scale={0.85} robe={C.crimson} scarf={C.bronze} skin={C.clothDeep} />
      <g fill={C.bronze}>
        <path d="M 26 36 q -13 -13 0 -22 q 13 -9 24 0 q 9 9 0 22 Z" />
        <path d="M 26 36 h 24" stroke={C.woodDeep} strokeWidth="2" />
        <path d="M 38 12 q -3 -10 2 -14 q 4 5 1 14 Z" fill={C.crimson} />
      </g>
      <g transform="translate(186,96)">
        <path d="M 0 -18 L 20 -11 L 20 6 Q 20 20 0 28 Q -20 20 -20 6 L -20 -11 Z" fill={C.bronze} />
        <path d="M 0 -12 L 14 -7 L 14 5 Q 14 16 0 22 Q -14 16 -14 5 L -14 -7 Z" fill={C.stoneDeep} />
      </g>
      <g fill={C.crimson} opacity="0.55">
        <circle cx="46" cy="94" r="5" /><circle cx="34" cy="106" r="4" />
        <circle cx="232" cy="98" r="4.5" /><circle cx="244" cy="110" r="3.5" />
      </g>
    </>
  ),
  "19-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Ridge y={92} sway={5} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="168" y="56" width="104" height="52" />
        <path d="M 160 56 L 220 30 L 272 56 Z" fill={C.stoneDeep} />
        <rect x="204" y="80" width="26" height="28" rx="2" fill={C.woodDeep} />
      </g>
      <Person x={64} y={118} scale={0.72} robe={C.blossom} scarf={C.crimson} skin={C.clothDeep} />
      <Person x={110} y={118} scale={0.85} robe={C.purple} scarf={C.gold} skin={C.clothDeep} />
      <g fill="none" stroke={C.gold} strokeWidth="1.8" opacity="0.7">
        <path d="M 78 84 q 10 -8 20 0" /><path d="M 72 94 q 16 -12 32 0" />
      </g>
      <Tuft x={24} y={112} scale={1} color={C.leaf} />
    </>
  ),
  "19-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.dawn} />
      <Ridge y={76} sway={6} fill={C.grass} />
      <Water y={90} fill={C.deepWater} />
      <Horse x={16} y={116} scale={0.85} coat={C.earthDeep} mane={C.ink} />
      <Person x={116} y={118} scale={0.8} robe={C.cloth} scarf={C.clothDeep} skin={C.earth} />
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.7">
        <path d="M 132 88 q 12 -8 24 0" /><path d="M 126 98 q 20 -14 40 0" />
      </g>
      <g fill={C.gold} opacity="0.85">
        <circle cx="186" cy="30" r="2.6" /><circle cx="200" cy="24" r="2.6" /><circle cx="214" cy="30" r="2.6" />
        <circle cx="228" cy="24" r="2.6" /><circle cx="242" cy="30" r="2.6" /><circle cx="256" cy="24" r="2.6" />
        <circle cx="256" cy="38" r="2.6" />
      </g>
      <g stroke={C.foam} strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round">
        <path d="M 150 104 q 10 -5 20 0" /><path d="M 216 110 q 10 -5 20 0" />
      </g>
    </>
  ),
  "19-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Glow id={`b${uid}`} x={136} y={104} r={72} color={C.dawn} />
      <Ridge y={92} sway={8} fill={C.grass} />
      <Water y={106} fill={C.water} />
      <g transform="translate(136,86)">
        <path d="M -22 26 L -22 10 Q -22 0 0 0 Q 22 0 22 10 L 22 26 Z" fill={C.bronze} opacity="0.5" />
        <path d="M -30 30 q 30 -12 60 0" stroke={C.clothDeep} strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <g fill={C.stone} opacity="0.8">
        <ellipse cx="46" cy="100" rx="14" ry="6" /><ellipse cx="222" cy="98" rx="12" ry="5" />
      </g>
      <Palm x={30} y={94} scale={0.75} frond={C.leaf} trunk={C.earth} />
      <Tuft x={244} y={104} scale={1} color={C.leaf} />
    </>
  ),
  "19-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Sun x={44} y={22} r={15} color={C.sun} ray={C.sunRay} />
      <Ridge y={74} sway={8} fill={C.grass} />
      <Water y={84} fill={C.water} />
      <g fill="none" stroke={C.foam} strokeWidth="2.6" opacity="0.9" strokeLinecap="round">
        <path d="M 40 100 q 12 -8 24 0" /><path d="M 76 106 q 12 -8 24 0" />
        <path d="M 112 100 q 12 -8 24 0" /><path d="M 148 108 q 12 -8 24 0" />
        <path d="M 184 100 q 12 -8 24 0" /><path d="M 216 108 q 12 -8 24 0" />
        <path d="M 60 114 q 12 -8 24 0" />
      </g>
      <g fill={C.foam} opacity="0.8">
        <circle cx="136" cy="92" r="4" /><circle cx="152" cy="96" r="3" /><circle cx="120" cy="98" r="2.6" />
      </g>
      <Birds x={196} y={20} scale={0.9} color={C.stoneShade} />
    </>
  ),

  // 20 — Queen Esther's Brave Stand
  "20-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.purple} bottom={C.blossom} />
      <g fill={C.night} opacity="0.35">
        <rect x="0" y="70" width="272" height="50" />
      </g>
      <g fill={C.purple}>
        <rect x="10" y="76" width="18" height="44" /><rect x="60" y="76" width="18" height="44" />
        <rect x="194" y="76" width="18" height="44" /><rect x="244" y="76" width="18" height="44" />
      </g>
      <g fill={C.gold}>
        <rect x="6" y="70" width="26" height="7" rx="2" /><rect x="56" y="70" width="26" height="7" rx="2" />
        <rect x="190" y="70" width="26" height="7" rx="2" /><rect x="240" y="70" width="26" height="7" rx="2" />
      </g>
      <g transform="translate(136,22)">
        <path d="M -30 18 L -30 -4 L -18 8 L -6 -14 L 6 8 L 18 -4 L 18 18 Z" fill={C.gold} transform="translate(6,0)" />
        <g fill={C.crimson}>
          <circle cx="-6" cy="12" r="2.8" /><circle cx="10" cy="12" r="2.8" /><circle cx="24" cy="12" r="2.8" />
        </g>
      </g>
      <path d="M 0 116 h 272" stroke={C.gold} strokeWidth="4" opacity="0.6" />
    </>
  ),
  "20-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.storm} />
      <Ridge y={96} sway={4} fill={C.night} />
      <g transform="translate(136,86)">
        <rect x="-40" y="0" width="80" height="26" rx="2" fill={C.cloth} />
        <path d="M -46 -4 q 6 -6 12 0 L 46 -4 q -6 -6 -12 0 Z" fill={C.clothDeep} />
        <g stroke={C.stoneShade} strokeWidth="1.6" opacity="0.8">
          <path d="M -30 8 h 60 M -30 14 h 60 M -30 20 h 40" />
        </g>
        <circle cx="34" cy="22" r="7" fill={C.crimson} />
      </g>
      <g fill={C.storm} opacity="0.6">
        <path d="M 20 116 q 14 -34 34 -34 q 20 0 34 34 Z" />
      </g>
      <Stars seed={67} count={7} size={1.2} />
    </>
  ),
  "20-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.purple} />
      <Moon x={228} y={24} r={13} />
      <Stars seed={71} count={14} size={1.3} />
      <g fill={C.night} opacity="0.5">
        <rect x="0" y="82" width="272" height="38" />
      </g>
      <g fill={C.purple}>
        <rect x="0" y="40" width="56" height="80" />
        <rect x="14" y="56" width="18" height="34" rx="9" fill={C.dawn} opacity="0.5" />
      </g>
      <Person x={104} y={118} scale={0.82} robe={C.clothDeep} scarf={C.earthDeep} skin={C.earth} />
      <Person x={160} y={118} scale={0.82} robe={C.blossom} scarf={C.gold} skin={C.clothDeep} />
      <g fill="none" stroke={C.gold} strokeWidth="1.8" opacity="0.6">
        <path d="M 120 86 q 12 -10 24 0" /><path d="M 114 96 q 18 -14 36 0" />
      </g>
    </>
  ),
  "20-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.purple} bottom={C.ember} />
      <Glow id={`b${uid}`} x={196} y={92} r={78} color={C.gold} />
      <g fill={C.night} opacity="0.4">
        <rect x="0" y="86" width="272" height="34" />
      </g>
      <g transform="translate(196,74)">
        <path d="M -26 46 L -26 12 Q -26 0 0 0 Q 26 0 26 12 L 26 46 Z" fill={C.crimson} />
        <path d="M -16 12 q 16 -10 32 0" stroke={C.gold} strokeWidth="2.4" fill="none" />
      </g>
      <path d="M 60 96 L 168 78" stroke={C.gold} strokeWidth="5" strokeLinecap="round" />
      <circle cx="58" cy="97" r="6" fill={C.gold} />
      <g fill={C.cloth} opacity="0.9">
        <path d="M 26 118 q -6 -26 14 -28 q 20 2 14 28 Z" />
      </g>
    </>
  ),
  "20-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.blossom} />
      <Sun x={136} y={20} r={17} color={C.sun} ray={C.sunRay} />
      <Ridge y={96} sway={5} fill={C.sand} />
      <g fill={C.purple} opacity="0.8">
        <rect x="16" y="82" width="16" height="34" /><rect x="240" y="82" width="16" height="34" />
      </g>
      <g fill={C.gold}>
        <path d="M 66 104 L 72 88 L 78 104 L 94 104 L 81 113 L 86 120 L 72 112 L 58 120 L 63 113 L 50 104 Z" />
        <path d="M 190 104 L 196 90 L 202 104 L 216 104 L 205 112 L 209 120 L 196 112 L 183 120 L 187 112 L 176 104 Z" />
      </g>
      <g fill={C.crimson} opacity="0.85">
        <path d="M 136 92 q -10 -12 2 -16 q 7 -2 8 3 q 2 -5 8 -3 q 12 4 2 16 q -10 9 -20 0 Z" />
      </g>
      <g fill={C.blossom} opacity="0.9">
        <circle cx="106" cy="110" r="3" /><circle cx="166" cy="112" r="2.6" /><circle cx="136" cy="116" r="2.4" />
      </g>
    </>
  ),

  // 21 — Daniel in the Lions' Den
  "21-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.purple} bottom={C.sand} />
      <g fill={C.stoneDeep}>
        <rect x="0" y="72" width="272" height="12" />
      </g>
      <g fill={C.bronze}>
        <rect x="30" y="84" width="14" height="36" /><rect x="90" y="84" width="14" height="36" />
        <rect x="168" y="84" width="14" height="36" /><rect x="228" y="84" width="14" height="36" />
      </g>
      <g fill={C.gold} opacity="0.9">
        <path d="M 24 72 q 13 -14 26 0 Z" /><path d="M 84 72 q 13 -14 26 0 Z" />
        <path d="M 162 72 q 13 -14 26 0 Z" /><path d="M 222 72 q 13 -14 26 0 Z" />
      </g>
      <Scroll x={118} y={92} scale={1.1} sheet={C.cloth} rod={C.wood} />
      <g fill={C.gold}>
        <circle cx="136" cy="30" r="9" />
        <path d="M 136 12 L 141 24 L 154 24 L 144 32 L 148 44 L 136 36 L 124 44 L 128 32 L 118 24 L 131 24 Z" opacity="0.6" />
      </g>
    </>
  ),
  "21-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.stone} bottom={C.clothDeep} />
      <g stroke={C.stoneShade} strokeWidth="2" opacity="0.55">
        <path d="M 0 22 h 272 M 0 48 h 272 M 0 96 h 272" />
        <path d="M 60 22 v 26 M 200 48 v 48 M 30 96 v 24" />
      </g>
      <g transform="translate(136,8)">
        <rect x="-46" y="0" width="92" height="86" rx="4" fill={C.stoneDeep} />
        <rect x="-40" y="6" width="80" height="74" rx="3" fill={C.noon} />
        <path d="M -40 34 q 40 -30 80 0 L 40 34 Z" fill={C.dawn} />
        <g fill={C.sandDeep} opacity="0.9">
          <rect x="-30" y="46" width="14" height="16" /><rect x="-10" y="40" width="16" height="22" />
          <rect x="12" y="48" width="14" height="14" />
        </g>
        <rect x="-3" y="6" width="6" height="74" fill={C.stoneDeep} />
        <rect x="-40" y="40" width="80" height="6" fill={C.stoneDeep} />
      </g>
      <Person x={48} y={118} scale={0.8} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Jar x={232} y={116} scale={0.8} body={C.earth} rim={C.earthDeep} />
      <Glow id={`b${uid}`} x={136} y={30} r={54} color={C.flameBright} />
    </>
  ),
  "21-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.deepNight} />
      <g fill={C.stoneDeep}>
        <rect x="0" y="0" width="272" height="34" />
      </g>
      <path d="M 136 30 L 136 76" stroke={C.clothDeep} strokeWidth="3" strokeLinecap="round" />
      <g fill={C.earthDeep}>
        <path d="M 0 34 q 40 20 60 46 L 60 120 L 0 120 Z" />
        <path d="M 272 34 q -40 20 -60 46 L 212 120 L 272 120 Z" />
      </g>
      <g fill={C.sunRay}>
        <circle cx="96" cy="102" r="12" />
        <circle cx="96" cy="102" r="17" fill="none" stroke={C.gold} strokeWidth="5" opacity="0.7" />
        <circle cx="176" cy="108" r="11" />
        <circle cx="176" cy="108" r="16" fill="none" stroke={C.gold} strokeWidth="5" opacity="0.7" />
      </g>
      <g fill={C.ink}>
        <circle cx="92" cy="100" r="1.6" /><circle cx="101" cy="100" r="1.6" />
        <circle cx="172" cy="106" r="1.5" /><circle cx="181" cy="106" r="1.5" />
      </g>
    </>
  ),
  "21-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Glow id={`b${uid}`} x={136} y={30} r={104} color={C.dawn} />
      <g stroke={C.dawn} strokeWidth="3" strokeLinecap="round" opacity="0.55">
        <path d="M 136 30 L 76 104" /><path d="M 136 30 L 116 108" />
        <path d="M 136 30 L 156 108" /><path d="M 136 30 L 196 104" />
      </g>
      <g fill={C.star} opacity="0.9">
        <path d="M 136 12 q 16 6 16 20 q -16 8 -32 0 q 0 -14 16 -20 Z" />
      </g>
      <g fill={C.sunRay} opacity="0.85">
        <circle cx="72" cy="106" r="11" /><circle cx="200" cy="108" r="10" />
      </g>
      <g stroke={C.ink} strokeWidth="2" strokeLinecap="round">
        <path d="M 66 110 h 12" /><path d="M 194 112 h 11" />
      </g>
      <Ridge y={116} sway={3} fill={C.earthDeep} />
    </>
  ),
  "21-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.ember} />
      <Sun x={40} y={20} r={16} color={C.sun} ray={C.sunRay} />
      <g fill={C.earthDeep}>
        <path d="M 0 76 q 44 16 62 44 L 62 120 L 0 120 Z" />
        <path d="M 272 76 q -44 16 -62 44 L 210 120 L 272 120 Z" />
      </g>
      <path d="M 100 24 q 36 -8 72 0" stroke={C.wood} strokeWidth="4" fill="none" strokeLinecap="round" />
      <g stroke={C.clothDeep} strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M 112 26 L 112 74" /><path d="M 160 26 L 160 74" />
      </g>
      <Person x={136} y={118} scale={0.85} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Glow id={`b${uid}`} x={136} y={90} r={68} color={C.dawn} />
      <Birds x={206} y={26} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "22-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.sand} />
      <Ridge y={104} sway={4} fill={C.sandDeep} />
      <g transform="translate(136,4)">
        <rect x="-18" y="14" width="36" height="90" fill={C.gold} />
        <circle cx="0" cy="6" r="13" fill={C.gold} />
        <rect x="-30" y="104" width="60" height="10" rx="2" fill={C.bronze} />
        <path d="M -18 30 L 18 30 M -18 60 L 18 60" stroke={C.bronze} strokeWidth="2" opacity="0.7" />
      </g>
      <g fill={C.bronze} opacity="0.8">
        <path d="M 40 116 q 6 -18 12 0 Z" /><path d="M 62 118 q 5 -16 11 0 Z" />
        <path d="M 200 116 q 6 -18 12 0 Z" /><path d="M 222 118 q 5 -16 11 0 Z" />
      </g>
      <g fill="none" stroke={C.gold} strokeWidth="1.8" opacity="0.5">
        <path d="M 30 40 q 10 -8 20 0" /><path d="M 224 44 q 10 -8 20 0" />
      </g>
    </>
  ),
  "22-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.sand} />
      <Ridge y={100} sway={4} fill={C.sandDeep} />
      <g fill={C.gold} opacity="0.45">
        <rect x="180" y="24" width="26" height="76" />
        <circle cx="193" cy="18" r="10" />
      </g>
      <g fill={C.cloth}>
        <path d="M 46 116 L 46 82 Q 46 74 56 74 Q 66 74 66 82 L 66 116 Z" />
        <path d="M 78 116 L 78 80 Q 78 72 88 72 Q 98 72 98 80 L 98 116 Z" fill={C.clothDeep} />
        <path d="M 110 116 L 110 82 Q 110 74 120 74 Q 130 74 130 82 L 130 116 Z" />
      </g>
      <g fill={C.earthDeep}>
        <circle cx="56" cy="68" r="7" /><circle cx="88" cy="66" r="7" /><circle cx="120" cy="68" r="7" />
      </g>
      <g stroke={C.crimson} strokeWidth="2.5" opacity="0.7" strokeLinecap="round">
        <path d="M 148 60 l 18 18 M 166 60 l -18 18" />
      </g>
    </>
  ),
  "22-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={100} r={84} color={C.gold} />
      <Ridge y={106} sway={4} fill={C.night} />
      <g fill={C.cloth}>
        <path d="M 96 118 L 96 86 Q 96 78 106 78 Q 116 78 116 86 L 116 118 Z" />
        <path d="M 126 118 L 126 84 Q 126 76 136 76 Q 146 76 146 84 L 146 118 Z" fill={C.clothDeep} />
        <path d="M 156 118 L 156 86 Q 156 78 166 78 Q 176 78 176 86 L 176 118 Z" />
      </g>
      <g fill={C.earthDeep}>
        <circle cx="106" cy="72" r="7" /><circle cx="136" cy="70" r="7" /><circle cx="166" cy="72" r="7" />
      </g>
      <g stroke={C.gold} strokeWidth="2" fill="none" opacity="0.6">
        <path d="M 116 58 q 20 -14 40 0" /><path d="M 106 46 q 30 -22 60 0" />
      </g>
    </>
  ),
  "22-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.flame} />
      <Glow id={`b${uid}`} x={136} y={92} r={124} color={C.flameBright} />
      <g fill={C.stoneDeep}>
        <path d="M 40 120 L 40 46 Q 40 26 136 26 Q 232 26 232 46 L 232 120 Z" />
      </g>
      <path d="M 66 120 L 66 56 Q 66 42 136 42 Q 206 42 206 56 L 206 120 Z" fill={C.flame} />
      <g>
        <Flame x={92} y={116} scale={1} />
        <Flame x={126} y={118} scale={1.2} />
        <Flame x={162} y={116} scale={1} />
        <Flame x={190} y={118} scale={0.8} />
      </g>
      <g fill={C.star} opacity="0.75">
        <circle cx="136" cy="82" r="8" />
        <path d="M 136 68 q 12 6 12 16 q -12 6 -24 0 q 0 -10 12 -16 Z" />
      </g>
    </>
  ),
  "22-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Ridge y={104} sway={4} fill={C.sand} />
      <g fill={C.stoneDeep} opacity="0.5">
        <path d="M 196 116 L 196 60 Q 196 46 244 46 Q 272 46 272 56 L 272 116 Z" />
      </g>
      <g fill={C.cloth}>
        <path d="M 40 118 L 40 82 Q 40 74 50 74 Q 60 74 60 82 L 60 118 Z" />
        <path d="M 74 118 L 74 80 Q 74 72 84 72 Q 94 72 94 80 L 94 118 Z" fill={C.clothDeep} />
        <path d="M 108 118 L 108 82 Q 108 74 118 74 Q 128 74 128 82 L 128 118 Z" />
      </g>
      <g fill={C.earthDeep}>
        <circle cx="50" cy="68" r="7" /><circle cx="84" cy="66" r="7" /><circle cx="118" cy="68" r="7" />
      </g>
      <g fill={C.gold} opacity="0.8">
        <circle cx="152" cy="86" r="3" /><circle cx="168" cy="96" r="2.4" /><circle cx="146" cy="102" r="2" />
      </g>
      <Sun x={40} y={22} r={14} color={C.sun} ray={C.sunRay} />
    </>
  ),

  // 23 — Jonah & The Great Fish at Nineveh
  "23-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.dawn} />
      <Clouds x={54} y={16} scale={0.9} color={C.cloud} />
      <Water y={84} fill={C.deepWater} />
      <Boat x={186} y={96} scale={1.1} hull={C.wood} sail={C.cloth} />
      <g fill={C.stone} opacity="0.85">
        <rect x="0" y="66" width="70" height="18" />
        <rect x="10" y="56" width="14" height="10" /><rect x="34" y="56" width="14" height="10" />
      </g>
      <g stroke={C.foam} strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M 84 100 q 10 -5 20 0" /><path d="M 116 110 q 10 -5 20 0" />
      </g>
      <Birds x={110} y={22} scale={0.8} color={C.stoneShade} />
    </>
  ),
  "23-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.storm} />
      <g fill={C.storm} opacity="0.75">
        <ellipse cx="90" cy="18" rx="52" ry="14" />
        <ellipse cx="200" cy="14" rx="44" ry="12" />
      </g>
      <Rain seed={3} count={22} color={C.foam} />
      <path d="M 60 34 L 48 62 L 62 60 L 52 88 L 82 52 L 66 54 L 78 34 Z" fill={C.gold} opacity="0.9" />
      <Waves y={84} fill={C.darkWater} crest={C.foam} />
      <g transform="rotate(-14 186 96)">
        <Boat x={186} y={96} scale={1} hull={C.woodDeep} sail={C.clothDeep} />
      </g>
    </>
  ),
  "23-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.darkWater} />
      <Waves y={44} fill={C.darkWater} crest={C.foam} />
      <g transform="translate(140,88)">
        <path d="M -80 0 q 20 -34 60 -34 q 44 0 62 34 q -18 32 -62 32 q -40 0 -60 -32 Z" fill={C.deepWater} />
        <path d="M -80 0 q 20 -22 56 -24 q -30 12 -34 24 q 4 14 34 24 q -36 -2 -56 -24 Z" fill={C.water} opacity="0.7" />
        <path d="M 42 0 q 26 -22 40 -26 q -10 26 0 52 q -16 -6 -40 -26 Z" fill={C.deepWater} />
        <circle cx="-52" cy="-8" r="4.5" fill={C.cloud} />
        <circle cx="-53" cy="-8" r="2" fill={C.ink} />
        <path d="M -66 6 q 16 6 30 2" stroke={C.darkWater} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
      <g fill={C.foam} opacity="0.7">
        <circle cx="42" cy="30" r="3" /><circle cx="60" cy="20" r="2.2" /><circle cx="30" cy="16" r="1.8" />
      </g>
    </>
  ),
  "23-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.darkWater} bottom={C.deepNight} />
      <g fill={C.night} opacity="0.7">
        <path d="M 0 0 q 60 30 60 120 L 0 120 Z" />
        <path d="M 272 0 q -60 30 -60 120 L 272 120 Z" />
      </g>
      <Glow id={`b${uid}`} x={136} y={96} r={80} color={C.gold} />
      <g stroke={C.gold} strokeWidth="2.4" fill="none" opacity="0.8">
        <path d="M 112 96 q 24 -18 48 0" /><path d="M 100 84 q 36 -26 72 0" />
        <path d="M 88 70 q 48 -34 96 0" />
      </g>
      <g fill={C.gold} opacity="0.85">
        <circle cx="136" cy="106" r="4" />
      </g>
      <g fill={C.foam} opacity="0.5">
        <circle cx="44" cy="30" r="3" /><circle cx="60" cy="16" r="2" /><circle cx="222" cy="26" r="2.6" />
      </g>
    </>
  ),
  "23-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Sun x={42} y={22} r={15} color={C.sun} ray={C.sunRay} />
      <Ridge y={102} sway={4} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="76" y="62" width="120" height="42" />
        <rect x="84" y="46" width="24" height="16" /><rect x="124" y="40" width="24" height="22" />
        <rect x="164" y="46" width="24" height="16" />
        <rect x="126" y="80" width="22" height="24" rx="2" fill={C.woodDeep} />
      </g>
      <g stroke={C.stoneShade} strokeWidth="1.4" opacity="0.7">
        <path d="M 76 74 h 120 M 76 90 h 120" />
      </g>
      <g fill={C.clothDeep}>
        <path d="M 30 116 q 6 -18 12 0 Z" /><path d="M 50 118 q 5 -16 11 0 Z" />
        <path d="M 216 116 q 6 -18 12 0 Z" /><path d="M 236 118 q 5 -16 11 0 Z" />
      </g>
      <g fill={C.gold} opacity="0.7">
        <circle cx="212" cy="30" r="2.6" /><circle cx="228" cy="40" r="2" />
      </g>
    </>
  ),

  // 24 — Nehemiah Rebuilds the Walls
  "24-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.dusk} />
      <Ridge y={98} sway={4} fill={C.night} />
      <g fill={C.stoneShade}>
        <rect x="10" y="72" width="40" height="26" />
        <rect x="66" y="86" width="26" height="12" transform="rotate(-8 79 92)" />
        <rect x="112" y="80" width="34" height="18" transform="rotate(5 129 89)" />
        <rect x="182" y="88" width="24" height="10" transform="rotate(-12 194 93)" />
        <rect x="222" y="76" width="40" height="22" />
      </g>
      <g fill={C.stoneDeep} opacity="0.8">
        <rect x="60" y="104" width="22" height="9" transform="rotate(14 71 108)" />
        <rect x="150" y="104" width="26" height="9" transform="rotate(-9 163 108)" />
      </g>
      <g fill={C.water} opacity="0.9">
        <path d="M 96 34 q -5 8 0 11 q 5 -3 0 -11 Z" />
        <path d="M 112 42 q -4 7 0 10 q 4 -3 0 -10 Z" />
      </g>
      <Stars seed={73} count={6} size={1.1} />
    </>
  ),
  "24-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.purple} bottom={C.sand} />
      <g fill={C.night} opacity="0.35">
        <rect x="0" y="60" width="272" height="26" />
      </g>
      <g fill={C.purple}>
        <rect x="16" y="66" width="16" height="40" /><rect x="60" y="66" width="16" height="40" />
      </g>
      <g fill={C.gold}>
        <rect x="12" y="60" width="24" height="6" rx="2" /><rect x="56" y="60" width="24" height="6" rx="2" />
        <path d="M 116 44 L 122 28 L 128 44 L 144 44 L 131 54 L 136 70 L 122 60 L 108 70 L 113 54 L 100 44 Z" opacity="0.8" />
      </g>
      <g fill={C.wood}>
        <rect x="150" y="94" width="110" height="8" rx="2" />
        <rect x="160" y="104" width="100" height="8" rx="2" fill={C.woodDeep} />
        <rect x="176" y="84" width="84" height="8" rx="2" />
      </g>
      <Ridge y={116} sway={3} fill={C.sandDeep} />
    </>
  ),
  "24-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.sand} />
      <Ridge y={104} sway={4} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="0" y="88" width="34" height="14" /><rect x="38" y="88" width="34" height="14" />
        <rect x="76" y="88" width="34" height="14" /><rect x="114" y="88" width="34" height="14" />
        <rect x="152" y="88" width="34" height="14" /><rect x="190" y="88" width="34" height="14" />
        <rect x="228" y="88" width="34" height="14" />
        <rect x="20" y="72" width="34" height="14" /><rect x="58" y="72" width="34" height="14" />
        <rect x="96" y="72" width="34" height="14" /><rect x="172" y="72" width="34" height="14" />
      </g>
      <g transform="translate(146,60)">
        <path d="M 0 0 L 22 -8 L 26 2 L 4 10 Z" fill={C.stoneShade} />
        <path d="M 0 2 l -12 8" stroke={C.wood} strokeWidth="4" strokeLinecap="round" />
      </g>
      <g transform="translate(224,54)">
        <path d="M 0 0 L 0 26" stroke={C.wood} strokeWidth="3" strokeLinecap="round" />
        <path d="M 0 0 q 10 6 12 18 q -12 4 -12 -18 Z" fill={C.bronze} />
      </g>
      <g fill={C.gold} opacity="0.6">
        <circle cx="60" cy="112" r="2.4" /><circle cx="200" cy="114" r="2" />
      </g>
    </>
  ),
  "24-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Sun x={230} y={22} r={15} color={C.sun} ray={C.sunRay} />
      <Ridge y={106} sway={4} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="0" y="58" width="272" height="48" />
      </g>
      <g fill={C.stoneDeep}>
        <rect x="0" y="50" width="22" height="9" /><rect x="38" y="50" width="22" height="9" />
        <rect x="76" y="50" width="22" height="9" /><rect x="114" y="50" width="22" height="9" />
        <rect x="152" y="50" width="22" height="9" /><rect x="190" y="50" width="22" height="9" />
        <rect x="228" y="50" width="22" height="9" />
      </g>
      <g stroke={C.stoneShade} strokeWidth="1.4" opacity="0.7">
        <path d="M 0 72 h 272 M 0 88 h 272" />
        <path d="M 38 58 v 14 M 114 72 v 16 M 190 58 v 14 M 76 88 v 18 M 228 88 v 18" />
      </g>
      <rect x="118" y="80" width="34" height="26" rx="2" fill={C.woodDeep} />
      <g fill={C.gold} opacity="0.85">
        <path d="M 30 40 L 34 30 L 38 40 L 48 40 L 40 46 L 43 56 L 34 50 L 25 56 L 28 46 L 20 40 Z" />
      </g>
    </>
  ),
  "24-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.ember} />
      <Sun x={136} y={20} r={16} color={C.sun} ray={C.sunRay} />
      <g fill={C.stone}>
        <rect x="0" y="86" width="272" height="34" />
      </g>
      <g fill={C.stoneDeep}>
        <rect x="0" y="78" width="22" height="9" /><rect x="52" y="78" width="22" height="9" />
        <rect x="104" y="78" width="22" height="9" /><rect x="156" y="78" width="22" height="9" />
        <rect x="208" y="78" width="22" height="9" /><rect x="250" y="78" width="22" height="9" />
      </g>
      <g fill={C.clothDeep}>
        <path d="M 26 78 q 6 -20 12 0 Z" /><path d="M 46 78 q 6 -18 12 0 Z" />
        <path d="M 78 78 q 6 -20 12 0 Z" /><path d="M 186 78 q 6 -20 12 0 Z" />
        <path d="M 206 78 q 6 -18 12 0 Z" /><path d="M 238 78 q 6 -20 12 0 Z" />
      </g>
      <g transform="translate(96,52)">
        <circle cx="0" cy="0" r="11" fill="none" stroke={C.wood} strokeWidth="3" />
        <g fill={C.gold}><circle cx="-11" cy="-4" r="2.4" /><circle cx="11" cy="-4" r="2.4" /></g>
      </g>
      <g transform="translate(178,50)">
        <path d="M -9 16 q -3 -22 9 -22 q 12 0 9 22 Z" fill={C.wood} />
        <g stroke={C.gold} strokeWidth="1.4"><path d="M -4 -2 v 16 M 0 -4 v 18 M 4 -2 v 16" /></g>
      </g>
    </>
  ),
};
