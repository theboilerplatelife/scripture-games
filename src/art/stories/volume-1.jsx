/* Volume 1 — Beginnings: creation, the garden, the flood, Babel,
   Abraham's call, Jacob at Bethel. One drawing per story card. */
import {
  C, Sky, Glow, Ridge, Sun, Moon, Stars, Clouds, Birds, Water, Waves,
  Rain, Tuft, Bloom, Tree, Palm, House, Tent, Sheep, Jar, Flame, Dove, Ark, Camel, Ox,
} from "../staging.jsx";

export const VOLUME_1 = {
  // 1 — The Days of Creation
  "1-1": (uid) => (
    <>
      <defs>
        <linearGradient id={`a${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.deepNight} />
          <stop offset="0.45" stopColor={C.night} />
          <stop offset="0.72" stopColor={C.ember} />
          <stop offset="1" stopColor={C.dawn} />
        </linearGradient>
      </defs>
      <rect width="272" height="120" fill={`url(#a${uid})`} />
      <g fill={C.star} opacity="0.9">
        <circle cx="18" cy="22" r="1.8" /><circle cx="44" cy="52" r="1.4" />
        <circle cx="30" cy="86" r="1.6" /><circle cx="62" cy="30" r="1.2" />
        <circle cx="74" cy="70" r="1.3" /><circle cx="12" cy="60" r="1.2" />
      </g>
      <Glow id={`b${uid}`} x={236} y={58} r={92} color={C.flameBright} />
      <circle cx="248" cy="58" r="26" fill={C.dawn} opacity="0.95" />
      <g stroke={C.flameBright} strokeWidth="2" strokeLinecap="round" opacity="0.75">
        <path d="M 214 24 L 196 12" /><path d="M 210 58 L 188 58" /><path d="M 214 92 L 196 104" />
      </g>
    </>
  ),
  "1-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.daySky} />
      <Clouds x={60} y={18} scale={1} color={C.cloud} />
      <Clouds x={196} y={28} scale={0.8} color={C.cloud} />
      <Water y={78} fill={C.water} />
      <path d="M 0 96 Q 60 70 130 84 Q 200 96 272 78 L 272 120 L 0 120 Z" fill={C.grassLight} />
      <path d="M 0 106 Q 70 90 150 100 T 272 96 L 272 120 L 0 120 Z" fill={C.grass} />
      <Tree x={44} y={104} scale={1} canopy={C.grassDeep} shade={C.leaf} trunk={C.earth} />
      <Tree x={216} y={110} scale={0.8} canopy={C.grassDeep} shade={C.leaf} trunk={C.earth} />
      <Tuft x={110} y={112} scale={1.2} color={C.leaf} />
      <Tuft x={168} y={116} scale={1} color={C.leaf} />
    </>
  ),
  "1-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.ember} />
      <Stars seed={3} count={26} size={1.7} />
      <Moon x={48} y={30} r={15} />
      <Sun x={218} y={74} r={20} color={C.sun} ray={C.sunRay} />
      <Ridge y={102} sway={10} fill={C.night} />
      <Ridge y={112} sway={6} fill={C.deepNight} />
    </>
  ),
  "1-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Birds x={40} y={16} scale={1.2} color={C.stoneShade} />
      <Birds x={168} y={10} scale={1} color={C.stoneShade} />
      <Birds x={120} y={30} scale={0.7} color={C.stoneShade} />
      <Water y={62} fill={C.deepWater} />
      <g fill={C.foam} opacity="0.9">
        <path d="M 42 92 q 14 -9 26 0 q -12 8 -26 0 Z" />
        <path d="M 68 92 l 10 -6 l 0 12 Z" />
        <path d="M 150 106 q 11 -7 20 0 q -9 6 -20 0 Z" />
        <path d="M 170 106 l 8 -5 l 0 10 Z" />
      </g>
      <g fill={C.water} opacity="0.8">
        <path d="M 208 80 q 12 -8 22 0 q -10 7 -22 0 Z" />
        <path d="M 230 80 l 9 -5 l 0 10 Z" />
      </g>
    </>
  ),
  "1-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Sun x={210} y={26} r={16} color={C.sun} ray={C.sunRay} />
      <Ridge y={70} sway={14} fill={C.grassLight} />
      <Ridge y={88} sway={10} fill={C.grass} />
      <Ridge y={104} sway={8} fill={C.grassDeep} />
      <Sheep x={26} y={92} scale={0.85} />
      <g fill={C.earthDeep}>
        <ellipse cx="150" cy="106" rx="11" ry="7" />
        <circle cx="161" cy="99" r="5" />
        <path d="M 159 95 q 1 -6 4 -2 M 164 95 q 1 -6 3 -1" stroke={C.earthDeep} strokeWidth="2" fill="none" />
        <rect x="144" y="110" width="2.4" height="7" rx="1" />
        <rect x="155" y="110" width="2.4" height="7" rx="1" />
      </g>
      <Bloom x={96} y={112} r={2.6} petal={C.cloud} heart={C.gold} />
      <Tuft x={200} y={116} scale={1.1} color={C.leaf} />
    </>
  ),

  // 2 — The Garden of Eden
  "2-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Sun x={40} y={20} r={13} color={C.sun} ray={C.sunRay} />
      <Ridge y={72} sway={12} fill={C.grassLight} />
      <Ridge y={92} sway={8} fill={C.grass} />
      <path d="M 0 108 Q 70 96 140 106 T 272 102 L 272 120 L 0 120 Z" fill={C.water} />
      <Tree x={62} y={100} scale={1.15} canopy={C.grassDeep} shade={C.leaf} trunk={C.earth} />
      <Tree x={196} y={96} scale={0.95} canopy={C.leaf} shade={C.leafDeep} trunk={C.earthDeep} />
      <g fill={C.crimson}>
        <circle cx="56" cy="80" r="2.6" /><circle cx="70" cy="76" r="2.4" /><circle cx="192" cy="78" r="2.4" />
      </g>
      <Bloom x={126} y={100} r={2.4} petal={C.blossom} heart={C.gold} />
      <Bloom x={240} y={110} r={2.2} petal={C.cloud} heart={C.gold} />
    </>
  ),
  "2-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.grassLight} />
      <Clouds x={210} y={20} scale={0.9} color={C.cloud} />
      <Ridge y={80} sway={12} fill={C.grass} />
      <Ridge y={100} sway={8} fill={C.grassDeep} />
      <g fill={C.earth}>
        <ellipse cx="52" cy="98" rx="12" ry="8" />
        <path d="M 62 94 q 8 -14 12 -2 q -2 4 -6 4 Z" />
        <rect x="46" y="104" width="2.6" height="8" rx="1" />
        <rect x="57" y="104" width="2.6" height="8" rx="1" />
      </g>
      <g fill={C.stoneDeep}>
        <ellipse cx="146" cy="108" rx="13" ry="7" />
        <circle cx="157" cy="103" r="4.5" />
        <path d="M 134 106 q -7 -3 -9 2 q 6 3 9 0 Z" />
      </g>
      <g transform="translate(206,86)">
        <path d="M 0 0 q -8 -8 -2 -13 q 5 3 6 9 Z" fill={C.blossom} />
        <path d="M 2 0 q 9 -7 4 -13 q -6 4 -6 10 Z" fill={C.purple} />
        <rect x="0" y="-2" width="2" height="8" rx="1" fill={C.ink} />
      </g>
      <Birds x={96} y={22} scale={0.9} color={C.stoneShade} />
      <Tuft x={244} y={116} scale={1} color={C.leaf} />
    </>
  ),
  "2-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.blossom} />
      <Glow id={`b${uid}`} x={136} y={40} r={78} color={C.dawn} />
      <Ridge y={96} sway={10} fill={C.grass} />
      <Ridge y={112} sway={6} fill={C.grassDeep} />
      <path d="M 272 40 q -60 -6 -104 4" stroke={C.earth} strokeWidth="5" fill="none" strokeLinecap="round" />
      <g fill={C.leaf}>
        <path d="M 214 38 q -10 -8 -18 -2 q 8 6 18 2 Z" />
        <path d="M 240 36 q 10 -8 18 -2 q -8 7 -18 2 Z" />
      </g>
      <Dove x={150} y={20} scale={0.7} flip={1} />
      <Dove x={228} y={16} scale={0.7} flip={-1} />
      <g fill={C.crimson} opacity="0.8">
        <path d="M 190 8 q 5 -6 10 0 q 5 -6 10 0 q 0 8 -10 12 q -10 -4 -10 -12 Z" />
      </g>
      <Bloom x={54} y={104} r={2.8} petal={C.cloud} heart={C.gold} />
      <Bloom x={86} y={112} r={2.4} petal={C.blossom} heart={C.gold} />
    </>
  ),
  "2-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.ember} />
      <Ridge y={98} sway={8} fill={C.leafDeep} />
      <path d="M 128 120 L 128 40 q -2 -10 6 -14" stroke={C.earthDeep} strokeWidth="9" fill="none" strokeLinecap="round" />
      <g fill={C.leafDeep}>
        <ellipse cx="104" cy="36" rx="30" ry="20" />
        <ellipse cx="164" cy="34" rx="28" ry="18" />
        <ellipse cx="134" cy="22" rx="26" ry="15" />
      </g>
      <g fill={C.crimson}>
        <circle cx="102" cy="52" r="5" /><circle cx="158" cy="48" r="4.5" /><circle cx="132" cy="40" r="4" />
      </g>
      <path
        d="M 128 62 q 22 -4 18 10 q -4 12 -18 8 q -12 -4 -4 -12"
        fill="none"
        stroke={C.leaf}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="146" cy="66" r="1.8" fill={C.gold} />
    </>
  ),
  "2-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.ember} />
      <Stars seed={11} count={12} size={1.4} />
      <g fill={C.star}>
        <circle cx="200" cy="26" r="4" />
        <path d="M 200 14 l 0 24 M 188 26 l 24 0" stroke={C.star} strokeWidth="1.6" opacity="0.7" />
      </g>
      <Ridge y={92} sway={10} fill={C.night} />
      <Ridge y={108} sway={6} fill={C.deepNight} />
      <Tree x={54} y={98} scale={1} canopy={C.leafDeep} shade={C.leafDeep} trunk={C.earthDeep} />
      <g transform="translate(132,96)">
        <path d="M 0 0 q 14 -10 28 0 q -14 6 -28 0 Z" fill={C.clothDeep} />
        <path d="M 4 -4 q 12 -9 22 0 q -11 5 -22 0 Z" fill={C.cloth} />
      </g>
      <Bloom x={228} y={110} r={2.2} petal={C.cloud} heart={C.gold} />
    </>
  ),

  // 3 — Noah's Ark & The Flood
  "3-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.dawn} />
      <Clouds x={54} y={16} scale={0.9} color={C.cloud} />
      <Ridge y={100} sway={8} fill={C.sandDeep} />
      <path d="M 44 100 q 14 -44 92 -44 q 78 0 92 44 Z" fill={C.wood} />
      <g stroke={C.woodDeep} strokeWidth="2" opacity="0.8">
        <path d="M 60 84 h 152 M 52 92 h 168 M 74 74 h 124" />
        <path d="M 96 58 l -8 42 M 136 56 l 0 44 M 176 58 l 8 42" />
      </g>
      <g fill={C.woodDeep}>
        <rect x="18" y="104" width="34" height="5" rx="2" />
        <rect x="24" y="111" width="34" height="5" rx="2" />
        <rect x="228" y="106" width="30" height="5" rx="2" />
      </g>
      <path d="M 214 84 l 14 -10 l 5 7 Z" fill={C.stoneDeep} />
    </>
  ),
  "3-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.dawn} />
      <Ridge y={102} sway={6} fill={C.grass} />
      <Ark x={218} y={104} scale={1.05} />
      <path d="M 96 118 L 186 88 L 190 96 L 100 120 Z" fill={C.clothDeep} />
      <Camel x={128} y={98} scale={0.7} coat={C.sandDeep} />
      <Ox x={60} y={104} scale={0.7} hide={C.earthDeep} />
      <Sheep x={22} y={104} scale={0.5} />
      <g fill={C.stoneDeep}>
        <ellipse cx="96" cy="112" rx="9" ry="5" />
        <circle cx="104" cy="107" r="4" />
        <path d="M 102 103 q 1 -5 4 -1 M 106 103 q 1 -5 3 -1" stroke={C.stoneDeep} strokeWidth="1.6" fill="none" />
      </g>
      <Birds x={54} y={18} scale={1} color={C.stoneShade} />
      <Birds x={150} y={26} scale={0.7} color={C.stoneShade} />
    </>
  ),
  "3-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.darkWater} />
      <g fill={C.stoneShade} opacity="0.6">
        <ellipse cx="60" cy="18" rx="34" ry="12" />
        <ellipse cx="180" cy="14" rx="42" ry="13" />
      </g>
      <Rain seed={5} count={26} color={C.foam} />
      <Waves y={80} fill={C.darkWater} crest={C.foam} />
      <Ark x={132} y={80} scale={0.85} />
      <path d="M 236 76 l 12 -18 l 14 18 Z" fill={C.stoneDeep} opacity="0.85" />
    </>
  ),
  "3-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Glow id={`b${uid}`} x={54} y={24} r={46} color={C.dawn} />
      <Water y={88} fill={C.deepWater} />
      <g opacity="0.55">
        <Ark x={228} y={88} scale={0.5} />
      </g>
      <Dove x={96} y={22} scale={1.15} flip={1} />
      <g fill={C.leaf}>
        <path d="M 86 32 q -14 -6 -24 0 q 12 7 24 0 Z" />
        <path d="M 74 32 l 0 8" stroke={C.leaf} strokeWidth="2" />
      </g>
      <Birds x={196} y={22} scale={0.8} color={C.stoneShade} />
    </>
  ),
  "3-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.dawn} />
      <g fill="none" strokeWidth="7" opacity="0.85">
        <path d="M 26 108 a 110 110 0 0 1 220 0" stroke={C.crimson} />
        <path d="M 40 108 a 96 96 0 0 1 192 0" stroke={C.flame} />
        <path d="M 54 108 a 82 82 0 0 1 164 0" stroke={C.gold} />
        <path d="M 68 108 a 68 68 0 0 1 136 0" stroke={C.grassDeep} />
        <path d="M 82 108 a 54 54 0 0 1 108 0" stroke={C.deepWater} />
        <path d="M 96 108 a 40 40 0 0 1 80 0" stroke={C.purple} />
      </g>
      <Ridge y={106} sway={8} fill={C.grass} />
      <Ark x={228} y={106} scale={0.62} />
      <Tuft x={44} y={116} scale={1.2} color={C.leaf} />
      <Bloom x={120} y={114} r={2.4} petal={C.cloud} heart={C.gold} />
    </>
  ),

  // 4 — The Tower of Babel
  "4-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Sun x={226} y={24} r={15} color={C.sun} ray={C.sunRay} />
      <Ridge y={84} sway={6} fill={C.sandDeep} />
      <Ridge y={100} sway={10} fill={C.sand} />
      <Tent x={30} y={104} scale={0.8} cloth={C.cloth} shade={C.clothDeep} />
      <Tent x={66} y={110} scale={0.7} cloth={C.cloth} shade={C.clothDeep} />
      <g fill={C.earthDeep}>
        <ellipse cx="150" cy="100" rx="14" ry="7" />
        <path d="M 160 96 q 4 -16 10 -4" stroke={C.earthDeep} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 142 96 q 6 -6 12 0" fill={C.earthDeep} />
      </g>
      <path d="M 176 112 q 40 -10 96 -16" stroke={C.sandDeep} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.8" />
      <Palm x={214} y={106} scale={0.8} frond={C.leaf} trunk={C.earth} />
    </>
  ),
  "4-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.sand} bottom={C.dawn} />
      <g fill={C.stoneShade} opacity="0.5">
        <ellipse cx="64" cy="22" rx="20" ry="9" />
        <ellipse cx="52" cy="12" rx="14" ry="7" />
      </g>
      <Ridge y={104} sway={4} fill={C.sandDeep} />
      <g fill={C.crimson} opacity="0.85">
        <rect x="150" y="88" width="30" height="9" rx="1" />
        <rect x="184" y="88" width="30" height="9" rx="1" />
        <rect x="158" y="98" width="30" height="9" rx="1" />
        <rect x="192" y="98" width="30" height="9" rx="1" />
        <rect x="166" y="78" width="30" height="9" rx="1" />
      </g>
      <g fill={C.earthDeep}>
        <rect x="30" y="86" width="44" height="22" rx="3" />
        <rect x="44" y="94" width="16" height="14" rx="2" fill={C.flame} />
      </g>
      <path d="M 52 84 q -6 -12 2 -18 q 4 8 0 18 Z" fill={C.flameBright} opacity="0.8" />
      <Jar x={112} y={110} scale={0.8} body={C.wood} rim={C.woodDeep} />
    </>
  ),
  "4-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.dusk} />
      <g fill={C.stoneShade} opacity="0.75">
        <ellipse cx="120" cy="16" rx="52" ry="14" />
        <ellipse cx="196" cy="22" rx="38" ry="11" />
      </g>
      <path d="M 108 30 L 164 30 L 152 120 L 120 120 Z" fill={C.stoneDeep} opacity="0.45" />
      <g fill={C.sandDeep}>
        <rect x="102" y="92" width="68" height="16" />
        <rect x="110" y="76" width="52" height="16" />
        <rect x="118" y="60" width="36" height="16" />
        <rect x="124" y="48" width="24" height="12" />
      </g>
      <g stroke={C.dawn} strokeWidth="2" opacity="0.55" strokeLinecap="round">
        <path d="M 120 26 L 128 46" /><path d="M 136 24 L 136 44" /><path d="M 152 26 L 144 46" />
      </g>
      <Ridge y={110} sway={4} fill={C.night} />
    </>
  ),
  "4-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.sand} />
      <g fill={C.sandDeep} opacity="0.9">
        <rect x="106" y="94" width="62" height="16" transform="rotate(-3 137 102)" />
        <rect x="114" y="78" width="46" height="16" transform="rotate(4 137 86)" />
        <rect x="122" y="62" width="30" height="16" transform="rotate(-6 137 70)" />
      </g>
      <g fill={C.stoneShade}>
        <rect x="128" y="50" width="14" height="8" transform="rotate(12 135 54)" />
        <rect x="148" y="46" width="12" height="7" transform="rotate(-20 154 49)" />
      </g>
      <g opacity="0.9">
        <path d="M 34 34 q 16 -14 30 0 q -4 12 -16 10 l -8 8 l 0 -9 q -10 -2 -6 -9 Z" fill={C.blossom} />
        <path d="M 200 26 q 14 -12 26 0 q -3 10 -14 9 l -7 7 l 0 -8 q -9 -2 -5 -8 Z" fill={C.deepWater} />
        <path d="M 224 62 q 12 -10 22 0 q -3 9 -12 8 l -6 6 l 0 -7 q -7 -2 -4 -7 Z" fill={C.purple} />
        <path d="M 22 76 q 12 -10 22 0 q -2 9 -11 8 l -6 6 l 0 -7 q -8 -2 -5 -7 Z" fill={C.leaf} />
      </g>
      <Ridge y={112} sway={4} fill={C.sandDeep} />
    </>
  ),
  "4-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.sand} />
      <Sun x={136} y={30} r={14} color={C.sun} ray={C.sunRay} />
      <Ridge y={86} sway={6} fill={C.sandDeep} />
      <g fill={C.stoneShade} opacity="0.7">
        <rect x="122" y="66" width="28" height="20" />
        <rect x="128" y="56" width="16" height="10" />
      </g>
      <Ridge y={104} sway={8} fill={C.sand} />
      <g stroke={C.sandDeep} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M 136 104 q -50 6 -136 16" />
        <path d="M 136 104 q 50 6 136 16" />
        <path d="M 136 104 q -20 8 -34 16" />
      </g>
      <Tent x={16} y={116} scale={0.5} cloth={C.cloth} shade={C.clothDeep} />
      <Tent x={224} y={118} scale={0.55} cloth={C.cloth} shade={C.clothDeep} />
      <Birds x={60} y={30} scale={0.8} color={C.stoneShade} />
    </>
  ),

  // 5 — The Call of Abraham
  "5-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Glow id={`b${uid}`} x={216} y={54} r={70} color={C.flameBright} />
      <Sun x={216} y={46} r={17} color={C.sun} ray={C.sunRay} />
      <Ridge y={92} sway={8} fill={C.sandDeep} />
      <Ridge y={108} sway={6} fill={C.sand} />
      <path d="M 40 120 Q 96 104 136 96 Q 180 88 208 84" stroke={C.clothDeep} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.9" />
      <g fill={C.stoneShade} opacity="0.8">
        <House x={16} y={96} w={18} h={16} wall={C.stoneShade} roof={C.stoneDeep} />
        <House x={38} y={96} w={14} h={12} wall={C.stoneShade} roof={C.stoneDeep} />
      </g>
      <Palm x={92} y={100} scale={0.7} frond={C.leaf} trunk={C.earth} />
    </>
  ),
  "5-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.dawn} />
      <Clouds x={210} y={18} scale={0.85} color={C.cloud} />
      <Ridge y={88} sway={10} fill={C.grassLight} />
      <Ridge y={104} sway={6} fill={C.grass} />
      <Tent x={26} y={110} scale={1.1} cloth={C.cloth} shade={C.clothDeep} />
      <Tent x={78} y={116} scale={0.9} cloth={C.cloth} shade={C.clothDeep} />
      <g fill={C.clothDeep}>
        <ellipse cx="176" cy="98" rx="16" ry="9" />
        <path d="M 188 92 q 6 -20 12 -5" stroke={C.clothDeep} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 168 92 q 4 -8 10 -4" fill={C.clothDeep} />
        <rect x="166" y="104" width="3" height="10" rx="1.5" />
        <rect x="182" y="104" width="3" height="10" rx="1.5" />
      </g>
      <Tree x={238} y={104} scale={0.9} canopy={C.grassDeep} shade={C.leaf} trunk={C.earth} />
      <Sheep x={120} y={106} scale={0.55} />
    </>
  ),
  "5-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={44} r={76} color={C.gold} />
      <Ridge y={100} sway={8} fill={C.sandDeep} />
      <g transform="translate(136,44)">
        <path d="M 0 -34 L 30 -22 L 30 8 Q 30 30 0 42 Q -30 30 -30 8 L -30 -22 Z" fill={C.bronze} />
        <path d="M 0 -28 L 24 -18 L 24 6 Q 24 24 0 34 Q -24 24 -24 6 L -24 -18 Z" fill={C.gold} />
        <path d="M 0 -18 L 0 24 M -16 2 L 16 2" stroke={C.bronze} strokeWidth="4" strokeLinecap="round" />
      </g>
      <Tuft x={40} y={112} scale={1.1} color={C.leaf} />
      <Tuft x={236} y={116} scale={1} color={C.leaf} />
    </>
  ),
  "5-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Stars seed={7} count={46} size={1.9} />
      <g fill={C.star} opacity="0.35">
        <ellipse cx="150" cy="34" rx="90" ry="12" transform="rotate(-8 150 34)" />
      </g>
      <Ridge y={106} sway={6} fill={C.deepNight} />
      <Tent x={20} y={116} scale={0.85} cloth={C.stoneShade} shade={C.stoneDeep} />
      <g>
        <path d="M 228 112 q -6 -10 0 -16 q 6 6 0 16 Z" fill={C.flame} opacity="0.9" />
        <ellipse cx="228" cy="114" rx="12" ry="3.5" fill={C.woodDeep} />
      </g>
    </>
  ),
  "5-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Sun x={52} y={24} r={14} color={C.sun} ray={C.sunRay} />
      <Ridge y={94} sway={10} fill={C.grassLight} />
      <Ridge y={108} sway={6} fill={C.grass} />
      <g fill={C.stoneDeep}>
        <rect x="168" y="98" width="52" height="10" rx="2" />
        <rect x="174" y="88" width="40" height="10" rx="2" fill={C.stone} />
        <rect x="180" y="78" width="28" height="10" rx="2" />
      </g>
      <Flame x={194} y={78} scale={0.8} />
      <g stroke={C.stoneShade} strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M 194 56 q -6 -10 2 -18 q 6 8 0 16" />
      </g>
      <Birds x={110} y={24} scale={0.9} color={C.stoneShade} />
      <Tuft x={62} y={116} scale={1.1} color={C.leaf} />
    </>
  ),

  // 6 — Jacob's Ladder at Bethel
  "6-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.night} />
      <Stars seed={19} count={22} size={1.6} />
      <Moon x={222} y={24} r={13} />
      <Ridge y={94} sway={8} fill={C.night} />
      <path d="M 0 118 q 80 -22 272 -30" stroke={C.stoneShade} strokeWidth="4" fill="none" opacity="0.45" />
      <Ridge y={112} sway={5} fill={C.deepNight} />
      <g transform="translate(104,100)">
        <path d="M -20 8 q -4 -18 8 -20 q 14 -4 20 6 q 6 10 -4 14 Z" fill={C.stone} />
        <path d="M 0 -10 q 10 -2 12 6" stroke={C.cloud} strokeWidth="1.6" fill="none" opacity="0.5" />
      </g>
      <g transform="translate(140,110)">
        <path d="M 0 0 q 24 -14 52 -2 q -24 10 -52 2 Z" fill={C.clothDeep} />
        <path d="M 8 -3 q 20 -10 40 -1 q -20 7 -40 1 Z" fill={C.cloth} opacity="0.8" />
      </g>
    </>
  ),
  "6-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.dusk} />
      <Stars seed={23} count={14} size={1.4} />
      <Glow id={`b${uid}`} x={136} y={6} r={80} color={C.flameBright} />
      <g stroke={C.gold} strokeWidth="4" strokeLinecap="round" opacity="0.95">
        <path d="M 106 120 L 126 4" /><path d="M 168 120 L 148 4" />
        <path d="M 110 100 L 164 100" /><path d="M 114 82 L 160 82" />
        <path d="M 118 64 L 156 64" /><path d="M 121 46 L 153 46" />
        <path d="M 124 28 L 150 28" /><path d="M 127 12 L 147 12" />
      </g>
      <g fill={C.star} opacity="0.95">
        <circle cx="94" cy="58" r="4" /><circle cx="180" cy="40" r="3.4" /><circle cx="88" cy="30" r="3" />
        <path d="M 94 58 q -10 -6 -14 0 q 8 5 14 0 Z" /><path d="M 180 40 q 10 -5 13 1 q -8 4 -13 -1 Z" />
      </g>
      <Ridge y={112} sway={4} fill={C.deepNight} />
    </>
  ),
  "6-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={20} r={92} color={C.dawn} />
      <g fill={C.cloud} opacity="0.9">
        <ellipse cx="136" cy="20" rx="48" ry="14" />
        <ellipse cx="104" cy="26" rx="26" ry="10" />
        <ellipse cx="172" cy="26" rx="28" ry="10" />
      </g>
      <g stroke={C.dawn} strokeWidth="3" strokeLinecap="round" opacity="0.6">
        <path d="M 96 34 L 74 92" /><path d="M 122 36 L 112 96" />
        <path d="M 150 36 L 160 96" /><path d="M 176 34 L 198 92" />
      </g>
      <Ridge y={102} sway={8} fill={C.night} />
      <Ridge y={114} sway={4} fill={C.deepNight} />
      <ellipse cx="112" cy="112" rx="16" ry="7" fill={C.stoneDeep} />
    </>
  ),
  "6-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Sun x={40} y={22} r={13} color={C.sun} ray={C.sunRay} />
      <Ridge y={98} sway={8} fill={C.sandDeep} />
      <g transform="translate(136,52)">
        <rect x="-34" y="0" width="68" height="56" rx="3" fill={C.stone} />
        <path d="M -40 2 L 0 -20 L 40 2 Z" fill={C.stoneDeep} />
        <rect x="-13" y="20" width="26" height="36" rx="13" fill={C.dawn} />
        <rect x="-9" y="26" width="18" height="30" rx="9" fill={C.flameBright} opacity="0.8" />
      </g>
      <g stroke={C.stoneShade} strokeWidth="1.6" opacity="0.6">
        <path d="M 102 74 h 68 M 102 90 h 68" />
      </g>
      <Tuft x={214} y={114} scale={1.1} color={C.leaf} />
      <Birds x={196} y={26} scale={0.8} color={C.stoneShade} />
    </>
  ),
  "6-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Glow id={`b${uid}`} x={130} y={52} r={56} color={C.gold} />
      <Ridge y={100} sway={8} fill={C.grass} />
      <g transform="translate(130,44)">
        <path d="M -13 62 L -9 6 L 9 6 L 13 62 Z" fill={C.stone} />
        <path d="M 4 62 L 8 6 L 9 6 L 13 62 Z" fill={C.stoneDeep} />
        <ellipse cx="0" cy="6" rx="11" ry="4" fill={C.stoneDeep} />
        <path d="M 0 10 q -5 12 0 22 q 5 -10 0 -22 Z" fill={C.gold} opacity="0.85" />
      </g>
      <Jar x={186} y={104} scale={1} body={C.wood} rim={C.woodDeep} />
      <Sun x={228} y={24} r={13} color={C.sun} ray={C.sunRay} />
      <Tuft x={70} y={114} scale={1.2} color={C.leaf} />
    </>
  ),
};
