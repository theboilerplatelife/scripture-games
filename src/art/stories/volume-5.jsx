/* Volume 5 — the Gospels: Bethlehem, the Jordan, the storm on Galilee,
   the hillside meal, the road to Jericho, the road home.

   Constitution Article 1.2: Jesus is never drawn. The cards where he
   acts are carried by what is around him — light on the water, a
   cushion in the stern, bread already broken, a calm sea. */
import {
  C, Sky, Glow, Ridge, Peaks, Sun, Moon, Stars, Clouds, Birds, Water, Waves,
  Rain, Tuft, Bloom, Palm, House, Sheep, Jar, Dove, Camel, Boat, Person,
} from "../staging.jsx";

export const VOLUME_5 = {
  // 25 — The First Christmas in Bethlehem
  "25-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Stars seed={83} count={20} size={1.5} />
      <g fill={C.star}>
        <circle cx="204" cy="20" r="4" />
        <path d="M 204 6 l 0 28 M 190 20 l 28 0 M 194 10 l 20 20 M 214 10 l -20 20" stroke={C.star} strokeWidth="1.4" opacity="0.7" />
      </g>
      <Ridge y={86} sway={8} fill={C.night} />
      <g fill={C.deepNight}>
        <House x={188} y={86} w={22} h={18} wall={C.deepNight} roof={C.night} />
        <House x={216} y={86} w={18} h={14} wall={C.deepNight} roof={C.night} />
        <House x={238} y={86} w={20} h={16} wall={C.deepNight} roof={C.night} />
      </g>
      <g fill={C.gold} opacity="0.8">
        <rect x="196" y="76" width="5" height="6" /><rect x="244" y="78" width="5" height="6" />
      </g>
      <Ridge y={110} sway={5} fill={C.deepNight} />
      <g fill={C.earthDeep}>
        <path d="M 40 112 q 2 -14 12 -14 q 4 -8 10 -1 q 8 0 8 9 q 0 6 -3 6 Z" />
        <path d="M 70 106 q 8 -3 9 -12 q 1 -6 5 -5 q 3 1 1 7 q -2 10 -8 14 Z" />
        <rect x="44" y="110" width="3" height="9" rx="1.4" /><rect x="58" y="110" width="3" height="9" rx="1.4" />
      </g>
      <Person x={94} y={118} scale={0.7} robe={C.purple} scarf={C.clothDeep} skin={C.earth} />
    </>
  ),
  "25-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Stars seed={89} count={16} size={1.4} />
      <Glow id={`b${uid}`} x={136} y={18} r={104} color={C.dawn} />
      <g stroke={C.dawn} strokeWidth="2.6" strokeLinecap="round" opacity="0.5">
        <path d="M 136 18 L 70 92" /><path d="M 136 18 L 116 96" />
        <path d="M 136 18 L 158 96" /><path d="M 136 18 L 202 92" />
      </g>
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.75">
        <path d="M 46 40 q 12 -10 24 0" /><path d="M 210 44 q 12 -10 24 0" />
      </g>
      <Ridge y={98} sway={8} fill={C.night} />
      <Sheep x={36} y={110} scale={0.6} />
      <Sheep x={92} y={116} scale={0.5} />
      <Sheep x={196} y={112} scale={0.55} />
      <path d="M 240 118 q -2 -26 2 -34 q 6 -10 12 -3" stroke={C.earth} strokeWidth="3.4" fill="none" strokeLinecap="round" />
    </>
  ),
  "25-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.earthDeep} />
      <Glow id={`b${uid}`} x={136} y={96} r={92} color={C.flameBright} />
      <g fill={C.woodDeep}>
        <path d="M 92 118 L 104 84 L 168 84 L 180 118 Z" />
        <path d="M 84 84 L 188 84 L 188 90 L 84 90 Z" />
      </g>
      <g fill={C.sunRay}>
        <path d="M 100 84 q 36 -12 72 0 q -36 8 -72 0 Z" />
      </g>
      <g fill={C.cloth}>
        <path d="M 116 82 q 20 -12 40 0 q -20 8 -40 0 Z" />
      </g>
      <g stroke={C.gold} strokeWidth="1.6" opacity="0.5" fill="none">
        <path d="M 60 60 q 14 -12 28 0" /><path d="M 190 56 q 14 -12 28 0" />
      </g>
      <path d="M 42 118 q -2 -26 2 -34 q 6 -10 12 -3" stroke={C.earth} strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M 232 118 q -2 -24 2 -32 q 6 -9 11 -3" stroke={C.earth} strokeWidth="3.4" fill="none" strokeLinecap="round" />
    </>
  ),
  "25-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.purple} />
      <Stars seed={97} count={14} size={1.3} />
      <g fill={C.star}>
        <circle cx="52" cy="22" r="4.4" />
        <path d="M 52 6 l 0 32 M 36 22 l 32 0" stroke={C.star} strokeWidth="1.6" opacity="0.75" />
      </g>
      <Ridge y={92} sway={5} fill={C.night} />
      <g fill={C.deepNight}>
        <rect x="150" y="52" width="122" height="46" />
        <rect x="164" y="40" width="18" height="12" /><rect x="196" y="34" width="18" height="18" />
        <rect x="228" y="40" width="18" height="12" />
        <path d="M 190 98 L 190 76 Q 202 62 214 76 L 214 98 Z" fill={C.gold} opacity="0.7" />
      </g>
      <Camel x={26} y={112} scale={0.72} coat={C.clothDeep} />
      <Camel x={78} y={116} scale={0.6} coat={C.clothDeep} />
      <Camel x={120} y={118} scale={0.5} coat={C.clothDeep} />
    </>
  ),
  "25-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={104} r={84} color={C.gold} />
      <Ridge y={104} sway={4} fill={C.earthDeep} />
      <g transform="translate(56,96)">
        <rect x="-18" y="0" width="36" height="20" rx="2" fill={C.wood} />
        <path d="M -20 0 q 20 -14 40 0 Z" fill={C.gold} />
        <g fill={C.sun}><circle cx="-6" cy="-6" r="3" /><circle cx="2" cy="-9" r="3" /><circle cx="9" cy="-5" r="3" /></g>
      </g>
      <g transform="translate(136,100)">
        <path d="M -14 16 q -5 -18 14 -18 q 19 0 14 18 Z" fill={C.bronze} />
        <rect x="-17" y="-4" width="34" height="5" rx="2" fill={C.gold} />
        <path d="M 0 -6 q -6 -12 0 -18 q 6 8 0 18 Z" fill={C.cloud} opacity="0.55" />
      </g>
      <g transform="translate(214,98)">
        <path d="M -13 18 q -6 -20 13 -20 q 19 0 13 20 Z" fill={C.crimson} opacity="0.8" />
        <rect x="-15" y="-4" width="30" height="5" rx="2" fill={C.bronze} />
        <path d="M 0 -6 q -5 -10 0 -16 q 5 7 0 16 Z" fill={C.cloud} opacity="0.45" />
      </g>
    </>
  ),

  // 26 — Baptism in the Jordan River
  "26-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.sand} />
      <Peaks points="L 46 66 L 104 88 L 160 62 L 216 90 L 272 74" fill={C.sandDeep} />
      <Ridge y={96} sway={5} fill={C.sand} />
      <Water y={108} fill={C.water} />
      <Person x={70} y={106} scale={0.85} robe={C.earthDeep} scarf={C.clothDeep} skin={C.earth} />
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.65">
        <path d="M 92 82 q 14 -10 28 0" /><path d="M 84 70 q 22 -16 44 0" />
        <path d="M 76 58 q 30 -22 60 0" />
      </g>
      <Tuft x={220} y={104} scale={1.1} color={C.leaf} />
      <Birds x={200} y={20} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "26-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Ridge y={78} sway={6} fill={C.sand} />
      <Water y={92} fill={C.deepWater} />
      <Person x={26} y={90} scale={0.62} robe={C.clothDeep} scarf={C.earthDeep} skin={C.earth} />
      <Person x={58} y={92} scale={0.6} robe={C.cloth} scarf={C.clothDeep} skin={C.clothDeep} />
      <Person x={88} y={90} scale={0.64} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <Person x={120} y={92} scale={0.58} robe={C.crimson} scarf={C.clothDeep} skin={C.earth} />
      <Person x={150} y={90} scale={0.62} robe={C.clothDeep} scarf={C.earth} skin={C.clothDeep} />
      <g stroke={C.foam} strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round">
        <path d="M 190 104 q 12 -6 24 0" /><path d="M 224 112 q 12 -6 24 0" />
        <path d="M 200 116 q 12 -6 24 0" />
      </g>
    </>
  ),
  "26-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Glow id={`b${uid}`} x={136} y={100} r={94} color={C.flameBright} />
      <Ridge y={80} sway={6} fill={C.grass} />
      <Water y={90} fill={C.water} />
      <g stroke={C.foam} strokeWidth="2.4" fill="none" opacity="0.85" strokeLinecap="round">
        <path d="M 92 100 q 22 -10 44 0 q 22 10 44 0" />
        <path d="M 80 112 q 28 -12 56 0 q 28 12 56 0" />
      </g>
      <g stroke={C.flameBright} strokeWidth="3" strokeLinecap="round" opacity="0.5">
        <path d="M 108 6 L 120 84" /><path d="M 136 4 L 136 84" /><path d="M 164 6 L 152 84" />
      </g>
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.75">
        <ellipse cx="136" cy="104" rx="18" ry="4" />
        <ellipse cx="136" cy="104" rx="32" ry="7" />
        <ellipse cx="136" cy="104" rx="46" ry="10" />
      </g>
      <Palm x={24} y={88} scale={0.8} frond={C.leaf} trunk={C.earth} />
      <Tuft x={250} y={90} scale={1.1} color={C.leaf} />
    </>
  ),
  "26-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={16} r={96} color={C.cloud} />
      <g fill={C.cloud} opacity="0.85">
        <ellipse cx="90" cy="12" rx="40" ry="12" />
        <ellipse cx="188" cy="10" rx="42" ry="12" />
      </g>
      <g stroke={C.dawn} strokeWidth="2.4" strokeLinecap="round" opacity="0.55">
        <path d="M 110 22 L 96 96" /><path d="M 136 24 L 136 96" /><path d="M 162 22 L 176 96" />
      </g>
      <Dove x={116} y={26} scale={1.1} flip={1} />
      <Water y={100} fill={C.water} />
      <g stroke={C.foam} strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round">
        <path d="M 60 110 q 12 -6 24 0" /><path d="M 190 112 q 12 -6 24 0" />
      </g>
    </>
  ),
  "26-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Glow id={`b${uid}`} x={136} y={10} r={120} color={C.flameBright} />
      <g fill={C.cloud}>
        <path d="M 0 0 L 272 0 L 272 20 Q 200 44 136 26 Q 72 44 0 20 Z" opacity="0.9" />
      </g>
      <g stroke={C.gold} strokeWidth="3" strokeLinecap="round" opacity="0.6">
        <path d="M 40 34 L 20 96" /><path d="M 92 36 L 82 100" />
        <path d="M 180 36 L 190 100" /><path d="M 232 34 L 252 96" />
      </g>
      <Water y={104} fill={C.water} />
      <g fill={C.gold} opacity="0.5">
        <ellipse cx="136" cy="112" rx="52" ry="6" />
      </g>
    </>
  ),

  // 27 — Calming the Storm on Galilee
  "27-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.dawn} />
      <Sun x={220} y={82} r={16} color={C.sun} ray={C.sunRay} />
      <Ridge y={72} sway={6} fill={C.stoneShade} />
      <Water y={86} fill={C.deepWater} />
      <Boat x={100} y={104} scale={1.15} hull={C.wood} sail={C.cloth} />
      <g fill={C.gold} opacity="0.45">
        <ellipse cx="220" cy="104" rx="26" ry="7" />
      </g>
      <Birds x={40} y={20} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "27-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.storm} />
      <g fill={C.storm} opacity="0.8">
        <ellipse cx="80" cy="16" rx="56" ry="14" />
        <ellipse cx="206" cy="12" rx="48" ry="12" />
      </g>
      <Rain seed={11} count={24} color={C.foam} />
      <Waves y={72} fill={C.darkWater} crest={C.foam} />
      <g transform="rotate(-18 136 96)">
        <Boat x={136} y={96} scale={1.05} hull={C.woodDeep} sail={C.clothDeep} />
      </g>
      <g fill={C.foam} opacity="0.8">
        <path d="M 30 92 q 16 -18 32 0 q -16 8 -32 0 Z" />
        <path d="M 210 96 q 16 -18 32 0 q -16 8 -32 0 Z" />
      </g>
    </>
  ),
  "27-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Waves y={78} fill={C.darkWater} crest={C.foam} />
      <g transform="translate(136,104)">
        <path d="M -70 0 q 14 22 70 22 q 56 0 70 -22 Z" fill={C.woodDeep} />
        <path d="M -60 0 h 120" stroke={C.wood} strokeWidth="3" />
        <path d="M 24 -2 q 18 -14 34 -2 q -16 8 -34 2 Z" fill={C.clothDeep} />
        <path d="M -40 -2 L -40 -30" stroke={C.wood} strokeWidth="3" strokeLinecap="round" />
        <circle cx="-40" cy="-26" r="7" fill={C.flameBright} opacity="0.9" />
      </g>
      <Glow id={`b${uid}`} x={96} y={78} r={44} color={C.flame} />
      <Rain seed={19} count={14} color={C.foam} />
    </>
  ),
  "27-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={30} r={104} color={C.flameBright} />
      <g fill={C.storm} opacity="0.5">
        <ellipse cx="40" cy="14" rx="44" ry="12" />
        <ellipse cx="236" cy="12" rx="40" ry="11" />
      </g>
      <g stroke={C.foam} strokeWidth="2.4" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M 24 44 q 26 -12 52 0" /><path d="M 196 42 q 26 -12 52 0" />
      </g>
      <path d="M 0 96 q 34 -10 68 0 q 34 10 68 0 q 34 -10 68 0 q 34 10 68 0 L 272 120 L 0 120 Z" fill={C.deepWater} />
      <g stroke={C.foam} strokeWidth="2" fill="none" opacity="0.75" strokeLinecap="round">
        <path d="M 40 110 h 40" /><path d="M 150 114 h 46" />
      </g>
    </>
  ),
  "27-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.dusk} />
      <Stars seed={101} count={14} size={1.3} />
      <Moon x={210} y={24} r={13} />
      <Water y={84} fill={C.darkWater} />
      <g fill={C.moon} opacity="0.35">
        <ellipse cx="210" cy="102" rx="10" ry="18" />
      </g>
      <Boat x={92} y={100} scale={1} hull={C.night} sail={C.storm} />
      <g stroke={C.foam} strokeWidth="1.6" fill="none" opacity="0.4">
        <path d="M 30 108 h 44" /><path d="M 140 114 h 52" /><path d="M 60 118 h 36" />
      </g>
    </>
  ),

  // 28 — Feeding the Five Thousand
  "28-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.grassLight} />
      <Clouds x={214} y={18} scale={0.85} color={C.cloud} />
      <Ridge y={64} sway={12} fill={C.grassLight} />
      <Ridge y={84} sway={8} fill={C.grass} />
      <Ridge y={104} sway={6} fill={C.grassDeep} />
      <g fill={C.clothDeep}>
        <circle cx="20" cy="96" r="5" /><circle cx="40" cy="102" r="5" /><circle cx="62" cy="94" r="5" />
        <circle cx="86" cy="104" r="5" /><circle cx="110" cy="96" r="5" /><circle cx="134" cy="106" r="5" />
        <circle cx="158" cy="96" r="5" /><circle cx="182" cy="104" r="5" /><circle cx="206" cy="96" r="5" />
        <circle cx="230" cy="106" r="5" /><circle cx="252" cy="98" r="5" />
        <circle cx="32" cy="114" r="5" /><circle cx="74" cy="116" r="5" /><circle cx="120" cy="118" r="5" />
        <circle cx="168" cy="116" r="5" /><circle cx="216" cy="118" r="5" />
      </g>
      <g fill={C.cloth}>
        <circle cx="20" cy="90" r="3" /><circle cx="62" cy="88" r="3" /><circle cx="110" cy="90" r="3" />
        <circle cx="158" cy="90" r="3" /><circle cx="206" cy="90" r="3" /><circle cx="252" cy="92" r="3" />
      </g>
    </>
  ),
  "28-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Ridge y={92} sway={8} fill={C.grass} />
      <g transform="translate(96,96)">
        <path d="M -30 0 q 4 20 30 20 q 26 0 30 -20 Z" fill={C.wood} />
        <path d="M -30 0 h 60" stroke={C.woodDeep} strokeWidth="4" strokeLinecap="round" />
        <g fill={C.sunRay}>
          <ellipse cx="-18" cy="-6" rx="9" ry="6" /><ellipse cx="0" cy="-9" rx="9" ry="6" />
          <ellipse cx="18" cy="-6" rx="9" ry="6" /><ellipse cx="-9" cy="-14" rx="8" ry="5" />
          <ellipse cx="9" cy="-14" rx="8" ry="5" />
        </g>
      </g>
      <g fill={C.water}>
        <path d="M 176 104 q 16 -10 30 0 q -14 9 -30 0 Z" />
        <path d="M 206 104 l 12 -7 l 0 14 Z" />
        <path d="M 210 116 q 14 -8 26 0 q -12 8 -26 0 Z" />
        <path d="M 236 116 l 10 -6 l 0 12 Z" />
      </g>
      <g fill={C.foam}>
        <circle cx="184" cy="102" r="1.4" /><circle cx="216" cy="114" r="1.2" />
      </g>
    </>
  ),
  "28-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.grassLight} />
      <Water y={54} fill={C.water} />
      <Ridge y={70} sway={10} fill={C.grass} />
      <Ridge y={92} sway={6} fill={C.grassDeep} />
      <g fill={C.clothDeep}>
        <path d="M 20 116 q 10 -18 20 0 Z" /><path d="M 48 118 q 9 -16 18 0 Z" />
        <path d="M 76 114 q 10 -18 20 0 Z" /><path d="M 108 118 q 9 -16 18 0 Z" />
        <path d="M 140 114 q 10 -18 20 0 Z" /><path d="M 172 118 q 9 -16 18 0 Z" />
        <path d="M 200 114 q 10 -18 20 0 Z" /><path d="M 232 118 q 9 -16 18 0 Z" />
      </g>
      <g fill={C.cloth}>
        <path d="M 30 100 q 8 -14 16 0 Z" /><path d="M 118 100 q 8 -14 16 0 Z" />
        <path d="M 210 100 q 8 -14 16 0 Z" />
      </g>
      <Tuft x={60} y={104} scale={1} color={C.leaf} />
      <Bloom x={162} y={104} r={2.2} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "28-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Glow id={`b${uid}`} x={136} y={94} r={92} color={C.flameBright} />
      <Ridge y={96} sway={8} fill={C.grass} />
      <g fill={C.sunRay}>
        <path d="M 108 106 q -6 -18 12 -18 q 8 0 10 6 q -14 4 -10 12 Z" />
        <path d="M 152 106 q 6 -18 -12 -18 q -8 0 -10 6 q 14 4 10 12 Z" />
      </g>
      <g fill={C.wood}>
        <path d="M 32 118 q 3 -16 20 -16 q 17 0 20 16 Z" />
        <path d="M 200 118 q 3 -16 20 -16 q 17 0 20 16 Z" />
      </g>
      <g fill={C.sunRay} opacity="0.9">
        <ellipse cx="52" cy="102" rx="14" ry="5" /><ellipse cx="220" cy="102" rx="14" ry="5" />
      </g>
      <g fill={C.gold} opacity="0.65">
        <circle cx="88" cy="88" r="2.6" /><circle cx="184" cy="86" r="2.4" />
      </g>
    </>
  ),
  "28-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Ridge y={88} sway={8} fill={C.grass} />
      <g fill={C.wood}>
        <path d="M 8 116 q 2 -14 14 -14 q 12 0 14 14 Z" /><path d="M 46 116 q 2 -14 14 -14 q 12 0 14 14 Z" />
        <path d="M 84 116 q 2 -14 14 -14 q 12 0 14 14 Z" /><path d="M 122 116 q 2 -14 14 -14 q 12 0 14 14 Z" />
        <path d="M 160 116 q 2 -14 14 -14 q 12 0 14 14 Z" /><path d="M 198 116 q 2 -14 14 -14 q 12 0 14 14 Z" />
        <path d="M 236 116 q 2 -14 14 -14 q 12 0 14 14 Z" />
        <path d="M 28 98 q 2 -13 14 -13 q 12 0 14 13 Z" /><path d="M 66 98 q 2 -13 14 -13 q 12 0 14 13 Z" />
        <path d="M 104 98 q 2 -13 14 -13 q 12 0 14 13 Z" /><path d="M 180 98 q 2 -13 14 -13 q 12 0 14 13 Z" />
        <path d="M 218 98 q 2 -13 14 -13 q 12 0 14 13 Z" />
      </g>
      <g fill={C.sunRay} opacity="0.95">
        <ellipse cx="22" cy="102" rx="11" ry="4" /><ellipse cx="60" cy="102" rx="11" ry="4" />
        <ellipse cx="98" cy="102" rx="11" ry="4" /><ellipse cx="136" cy="102" rx="11" ry="4" />
        <ellipse cx="174" cy="102" rx="11" ry="4" /><ellipse cx="212" cy="102" rx="11" ry="4" />
        <ellipse cx="250" cy="102" rx="11" ry="4" />
      </g>
    </>
  ),

  // 29 — The Good Samaritan
  "29-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.sand} />
      <Peaks points="L 50 70 L 110 90 L 168 68 L 226 92 L 272 80" fill={C.stoneShade} />
      <Ridge y={98} sway={5} fill={C.sandDeep} />
      <path d="M 0 116 q 70 -14 140 -16 q 70 -2 132 -10" stroke={C.sand} strokeWidth="9" fill="none" opacity="0.9" strokeLinecap="round" />
      <g transform="translate(120,108)">
        <path d="M -30 4 q 4 -12 30 -12 q 26 0 30 12 Z" fill={C.clothDeep} />
        <circle cx="-34" cy="-2" r="6" fill={C.earth} />
        <path d="M -40 -6 q 6 -8 12 0 q -6 4 -12 0 Z" fill={C.earthDeep} />
      </g>
      <g fill={C.crimson} opacity="0.5">
        <circle cx="106" cy="96" r="3" /><circle cx="140" cy="100" r="2.4" />
      </g>
      <g fill={C.wood}>
        <path d="M 196 112 q 8 -10 16 0 q -8 6 -16 0 Z" />
      </g>
    </>
  ),
  "29-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.sand} bottom={C.dawn} />
      <Ridge y={92} sway={5} fill={C.sandDeep} />
      <path d="M 0 106 q 70 -8 140 -8 q 70 0 132 -4" stroke={C.sand} strokeWidth="10" fill="none" opacity="0.9" strokeLinecap="round" />
      <Person x={70} y={104} scale={0.66} robe={C.cloth} scarf={C.clothDeep} skin={C.earth} />
      <Person x={108} y={106} scale={0.62} robe={C.clothDeep} scarf={C.stoneShade} skin={C.earth} />
      <g transform="translate(200,118)">
        <path d="M -26 2 q 4 -10 26 -10 q 22 0 26 10 Z" fill={C.clothDeep} />
        <circle cx="-30" cy="-3" r="5" fill={C.earth} />
      </g>
      <g stroke={C.sandDeep} strokeWidth="2" opacity="0.6" strokeLinecap="round">
        <path d="M 40 116 l 6 -6 M 132 118 l 6 -6" />
      </g>
    </>
  ),
  "29-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.sand} />
      <Glow id={`b${uid}`} x={136} y={102} r={78} color={C.dawn} />
      <Ridge y={96} sway={5} fill={C.sandDeep} />
      <g transform="translate(96,116)">
        <path d="M -26 2 q 4 -10 26 -10 q 22 0 26 10 Z" fill={C.clothDeep} />
        <circle cx="-30" cy="-3" r="5.5" fill={C.earth} />
      </g>
      <Person x={166} y={118} scale={0.82} robe={C.leafDeep} scarf={C.gold} skin={C.earth} />
      <g fill={C.crimson} opacity="0.85">
        <path d="M 166 26 q -11 -13 2 -18 q 8 -2 9 4 q 2 -6 9 -4 q 13 5 2 18 q -11 10 -22 0 Z" />
      </g>
      <g fill={C.earthDeep}>
        <path d="M 226 108 q 2 -14 12 -14 q 4 -8 10 -1 q 8 0 8 9 q 0 6 -3 6 Z" />
        <rect x="230" y="108" width="3" height="9" rx="1.4" /><rect x="244" y="108" width="3" height="9" rx="1.4" />
      </g>
    </>
  ),
  "29-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.sand} />
      <Ridge y={94} sway={5} fill={C.sandDeep} />
      <g fill={C.earthDeep}>
        <path d="M 60 114 q 3 -20 18 -20 q 6 -11 15 -2 q 12 0 12 13 q 0 9 -4 9 Z" />
        <path d="M 105 92 q 11 -4 12 -16 q 1 -8 7 -7 q 4 1 1 9 q -2 14 -11 19 Z" />
        <rect x="66" y="112" width="4" height="8" rx="2" /><rect x="96" y="112" width="4" height="8" rx="2" />
      </g>
      <g fill={C.cloth}>
        <path d="M 66 92 q 20 -12 40 -2 q -20 8 -40 2 Z" />
      </g>
      <Jar x={26} y={116} scale={0.9} body={C.wood} rim={C.woodDeep} />
      <g fill={C.stone}>
        <rect x="196" y="70" width="76" height="42" />
        <path d="M 188 70 L 234 48 L 272 70 Z" fill={C.stoneDeep} />
        <rect x="222" y="88" width="22" height="24" rx="2" fill={C.woodDeep} />
      </g>
      <circle cx="212" cy="82" r="4" fill={C.flameBright} opacity="0.9" />
    </>
  ),
  "29-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Sun x={40} y={22} r={14} color={C.sun} ray={C.sunRay} />
      <Ridge y={96} sway={4} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="150" y="66" width="122" height="46" />
        <path d="M 142 66 L 210 42 L 272 66 Z" fill={C.stoneDeep} />
        <rect x="188" y="86" width="26" height="26" rx="2" fill={C.woodDeep} />
      </g>
      <g transform="translate(70,104)">
        <ellipse cx="0" cy="8" rx="30" ry="7" fill={C.wood} />
        <g fill={C.stone}>
          <circle cx="-14" cy="2" r="7" /><circle cx="0" cy="0" r="7" /><circle cx="14" cy="2" r="7" />
        </g>
        <g fill={C.stoneDeep} opacity="0.6">
          <circle cx="-14" cy="2" r="3" /><circle cx="0" cy="0" r="3" /><circle cx="14" cy="2" r="3" />
        </g>
      </g>
      <Tuft x={128} y={114} scale={1} color={C.leaf} />
    </>
  ),

  // 30 — The Prodigal Son Returns Home
  "30-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Ridge y={88} sway={6} fill={C.sandDeep} />
      <g fill={C.stone} opacity="0.75">
        <House x={10} y={88} w={22} h={18} wall={C.stone} roof={C.stoneDeep} />
        <House x={38} y={88} w={18} h={14} wall={C.stone} roof={C.stoneDeep} />
      </g>
      <path d="M 60 116 q 60 -14 120 -20 q 50 -6 92 -8" stroke={C.sand} strokeWidth="8" fill="none" opacity="0.9" strokeLinecap="round" />
      <Person x={168} y={112} scale={0.72} robe={C.purple} scarf={C.gold} skin={C.earth} />
      <g fill={C.gold}>
        <path d="M 190 108 q -6 -14 8 -14 q 14 0 8 14 Z" />
        <circle cx="198" cy="100" r="3" fill={C.sun} />
      </g>
      <Palm x={244} y={98} scale={0.7} frond={C.leaf} trunk={C.earth} />
    </>
  ),
  "30-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.sandDeep} />
      <Ridge y={94} sway={4} fill={C.earthDeep} />
      <g fill={C.blossom} opacity="0.8">
        <ellipse cx="70" cy="106" rx="18" ry="11" />
        <circle cx="86" cy="100" r="7" />
        <circle cx="92" cy="100" r="2.6" fill={C.crimson} />
        <rect x="60" y="114" width="4" height="6" rx="2" /><rect x="78" y="114" width="4" height="6" rx="2" />
        <path d="M 80 94 q 2 -6 6 -2" stroke={C.blossom} strokeWidth="3" fill="none" />
      </g>
      <g fill={C.blossom} opacity="0.6">
        <ellipse cx="176" cy="112" rx="14" ry="8" />
        <circle cx="188" cy="108" r="5.5" />
      </g>
      <Person x={230} y={118} scale={0.75} robe={C.stoneShade} scarf={C.storm} skin={C.earth} />
      <g fill={C.leafDeep} opacity="0.8">
        <ellipse cx="120" cy="112" rx="4" ry="2.4" transform="rotate(30 120 112)" />
        <ellipse cx="132" cy="116" rx="4" ry="2.4" transform="rotate(-20 132 116)" />
        <ellipse cx="144" cy="110" rx="4" ry="2.4" transform="rotate(12 144 110)" />
      </g>
    </>
  ),
  "30-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.ember} />
      <Stars seed={103} count={12} size={1.3} />
      <Ridge y={96} sway={6} fill={C.night} />
      <Person x={62} y={118} scale={0.8} robe={C.stoneShade} scarf={C.storm} skin={C.earth} />
      <g fill={C.deepNight}>
        <House x={196} y={96} w={30} h={22} wall={C.deepNight} roof={C.night} />
        <House x={232} y={96} w={22} h={16} wall={C.deepNight} roof={C.night} />
      </g>
      <g fill={C.flameBright} opacity="0.9">
        <rect x="206" y="82" width="7" height="8" rx="1" />
      </g>
      <Glow id={`b${uid}`} x={210} y={86} r={46} color={C.flame} />
      <path d="M 92 116 q 50 -10 100 -14" stroke={C.stoneShade} strokeWidth="4" fill="none" opacity="0.5" strokeLinecap="round" />
    </>
  ),
  "30-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Sun x={220} y={22} r={16} color={C.sun} ray={C.sunRay} />
      <Ridge y={90} sway={8} fill={C.grass} />
      <path d="M 0 114 q 70 -12 140 -14 q 70 -2 132 -6" stroke={C.sand} strokeWidth="8" fill="none" opacity="0.85" strokeLinecap="round" />
      <Person x={100} y={116} scale={0.85} robe={C.crimson} scarf={C.gold} skin={C.earth} />
      <Person x={158} y={116} scale={0.78} robe={C.stoneShade} scarf={C.clothDeep} skin={C.earth} />
      <g fill={C.crimson} opacity="0.85">
        <path d="M 130 30 q -12 -14 2 -20 q 9 -3 10 4 q 2 -7 10 -4 q 14 6 2 20 q -12 12 -24 0 Z" />
      </g>
      <Tuft x={40} y={110} scale={1.1} color={C.leaf} />
      <Bloom x={244} y={110} r={2.6} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "30-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={96} r={100} color={C.gold} />
      <Ridge y={94} sway={5} fill={C.sand} />
      <g transform="translate(52,96)">
        <path d="M -20 22 L -14 0 L 14 0 L 20 22 Z" fill={C.crimson} />
        <path d="M -14 0 q 14 -8 28 0" stroke={C.gold} strokeWidth="3" fill="none" />
      </g>
      <g transform="translate(120,100)">
        <circle cx="0" cy="0" r="9" fill="none" stroke={C.gold} strokeWidth="4" />
      </g>
      <g fill={C.wood}>
        <rect x="152" y="100" width="104" height="8" rx="2" />
        <rect x="160" y="108" width="8" height="12" /><rect x="240" y="108" width="8" height="12" />
      </g>
      <g fill={C.sunRay}>
        <ellipse cx="176" cy="96" rx="12" ry="5" /><ellipse cx="206" cy="94" rx="13" ry="5" />
        <ellipse cx="236" cy="96" rx="12" ry="5" />
      </g>
      <g fill="none" stroke={C.gold} strokeWidth="1.8" opacity="0.6">
        <path d="M 90 44 q 12 -10 24 0" /><path d="M 178 40 q 12 -10 24 0" />
      </g>
    </>
  ),
};
