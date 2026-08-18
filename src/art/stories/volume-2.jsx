/* Volume 2 — Egypt and the Exodus: Joseph, baby Moses, the burning
   bush, the Red Sea, Sinai, Jericho. Egypt is drawn in ochre and Nile
   green, Sinai in storm grey and fire, so the volume reads as a
   journey out of one country and into another. */
import {
  C, Sky, Glow, Ridge, Peaks, Sun, Moon, Stars, Birds, Water, Waves,
  Rain, Tuft, Tent, Sheep, Jar, Camel,
} from "../staging.jsx";

export const VOLUME_2 = {
  // 7 — Joseph: From Pit to Palace
  "7-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.daySky} bottom={C.dawn} />
      <Ridge y={96} sway={8} fill={C.sand} />
      <path d="M 30 96 L 30 30" stroke={C.earth} strokeWidth="4" strokeLinecap="round" />
      <path d="M 30 34 q 100 10 212 -2" stroke={C.earthDeep} strokeWidth="2" fill="none" />
      <g transform="translate(96,34)">
        <path d="M 0 0 L 76 0 L 68 52 L 8 52 Z" fill={C.crimson} />
        <path d="M 4 0 L 12 0 L 10 52 L 8 52 Z" fill={C.gold} />
        <path d="M 20 0 L 30 0 L 28 52 L 20 52 Z" fill={C.leaf} />
        <path d="M 38 0 L 48 0 L 46 52 L 38 52 Z" fill={C.deepWater} />
        <path d="M 56 0 L 66 0 L 62 52 L 56 52 Z" fill={C.purple} />
        <path d="M -14 2 L 0 0 L 4 14 Z" fill={C.crimson} />
        <path d="M 90 2 L 76 0 L 72 14 Z" fill={C.crimson} />
      </g>
      <Tuft x={228} y={110} scale={1.1} color={C.leaf} />
    </>
  ),
  "7-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.sand} />
      <Sun x={222} y={20} r={13} color={C.sun} ray={C.sunRay} />
      <Camel x={26} y={34} scale={0.5} coat={C.earthDeep} />
      <Camel x={64} y={36} scale={0.42} coat={C.earthDeep} />
      <Ridge y={62} sway={6} fill={C.sandDeep} />
      <ellipse cx="136" cy="98" rx="62" ry="22" fill={C.earthDeep} />
      <ellipse cx="136" cy="100" rx="52" ry="17" fill={C.deepNight} />
      <path d="M 136 84 q -4 20 0 34" stroke={C.cloth} strokeWidth="3" fill="none" strokeLinecap="round" />
      <g fill={C.stoneDeep}>
        <ellipse cx="62" cy="106" rx="14" ry="5" />
        <ellipse cx="212" cy="110" rx="16" ry="5" />
      </g>
    </>
  ),
  "7-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.purple} />
      <Stars seed={31} count={18} size={1.5} />
      <Moon x={40} y={24} r={12} />
      <Ridge y={98} sway={6} fill={C.night} />
      <g fill={C.gold}>
        <path d="M 96 98 q -6 -22 4 -30 q 10 8 4 30 Z" />
        <path d="M 116 98 q -7 -24 4 -32 q 11 8 5 32 Z" />
        <path d="M 136 98 q -6 -22 4 -30 q 10 8 4 30 Z" />
        <path d="M 156 98 q -7 -24 4 -32 q 11 8 5 32 Z" />
      </g>
      <g fill={C.stoneShade}>
        <path d="M 186 98 q -2 -18 2 -24 q 4 6 2 24 Z" />
        <path d="M 202 98 q -2 -16 2 -22 q 4 6 2 22 Z" />
        <path d="M 218 98 q -2 -18 2 -24 q 4 6 2 24 Z" />
      </g>
      <g stroke={C.gold} strokeWidth="1.4" opacity="0.6" fill="none">
        <path d="M 96 92 h 68 M 96 86 h 68" />
      </g>
    </>
  ),
  "7-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Sun x={44} y={20} r={14} color={C.sun} ray={C.sunRay} />
      <Ridge y={82} sway={4} fill={C.sandDeep} />
      <g fill={C.cloth}>
        <rect x="30" y="80" width="34" height="34" rx="2" />
        <rect x="80" y="76" width="38" height="38" rx="2" />
        <rect x="134" y="80" width="34" height="34" rx="2" />
      </g>
      <g fill={C.clothDeep}>
        <path d="M 26 80 L 47 62 L 68 80 Z" />
        <path d="M 76 76 L 99 56 L 122 76 Z" />
        <path d="M 130 80 L 151 62 L 172 80 Z" />
      </g>
      <g fill={C.earthDeep} opacity="0.8">
        <rect x="42" y="98" width="12" height="16" rx="1" />
        <rect x="93" y="94" width="14" height="20" rx="1" />
        <rect x="146" y="98" width="12" height="16" rx="1" />
      </g>
      <g fill={C.gold}>
        <path d="M 186 116 q 14 -30 30 -30 q 16 0 30 30 Z" />
        <path d="M 214 116 q 10 -20 22 -20 q 12 0 22 20 Z" fill={C.sun} />
      </g>
      <Birds x={198} y={16} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "7-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.grassLight} />
      <Glow id={`b${uid}`} x={136} y={22} r={72} color={C.dawn} />
      <Ridge y={88} sway={8} fill={C.sand} />
      <g fill={C.clothDeep}>
        <path d="M 26 118 q -8 -34 20 -36 q 28 2 20 36 Z" />
        <path d="M 76 120 q -7 -30 18 -32 q 25 2 18 32 Z" />
        <path d="M 200 118 q -8 -32 19 -34 q 27 2 19 34 Z" />
      </g>
      <g fill={C.cloth}>
        <path d="M 32 84 q 14 -8 28 0 q -14 6 -28 0 Z" />
        <path d="M 82 88 q 12 -7 24 0 q -12 5 -24 0 Z" />
        <path d="M 206 84 q 13 -8 26 0 q -13 6 -26 0 Z" />
      </g>
      <g fill={C.gold}>
        <ellipse cx="136" cy="112" rx="30" ry="9" />
        <ellipse cx="136" cy="106" rx="20" ry="7" fill={C.sun} />
      </g>
      <g fill={C.crimson} opacity="0.9">
        <path d="M 136 24 q -12 -14 2 -20 q 8 -3 10 4 q 3 -7 10 -4 q 14 6 2 20 q -12 12 -24 0 Z" />
      </g>
      <Birds x={56} y={22} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "8-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Ridge y={78} sway={4} fill={C.sandDeep} />
      <g fill={C.leaf}>
        <path d="M 24 80 q -4 -40 4 -52 q 8 14 4 52 Z" />
        <path d="M 40 80 q -3 -34 4 -44 q 7 12 3 44 Z" />
        <path d="M 234 80 q -4 -36 4 -48 q 8 14 4 48 Z" />
      </g>
      <g transform="translate(136,86)">
        <path d="M -40 0 q 5 30 40 30 q 35 0 40 -30 Z" fill={C.clothDeep} />
        <path d="M -40 0 h 80" stroke={C.wood} strokeWidth="6" strokeLinecap="round" />
        <g stroke={C.wood} strokeWidth="2.2" opacity="0.85">
          <path d="M -32 10 h 64 M -26 20 h 52" />
          <path d="M -24 0 l 5 28 M 0 0 l 0 30 M 24 0 l -5 28" />
        </g>
      </g>
      <Jar x={72} y={110} scale={0.9} body={C.deepNight} rim={C.ink} />
      <path d="M 72 96 q -4 -9 0 -13 q 4 5 0 13 Z" fill={C.storm} opacity="0.6" />
    </>
  ),
  "8-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <Water y={72} fill={C.deepWater} />
      <g fill={C.leafDeep}>
        <path d="M 18 100 q -6 -50 6 -64 q 12 16 6 64 Z" />
        <path d="M 40 106 q -5 -44 5 -56 q 11 14 5 56 Z" />
        <path d="M 236 104 q -6 -46 6 -60 q 12 16 6 60 Z" />
        <path d="M 256 110 q -4 -38 4 -48 q 10 12 4 48 Z" />
      </g>
      <g transform="translate(136,88)">
        <path d="M -24 0 q 3 15 24 15 q 21 0 24 -15 Z" fill={C.clothDeep} />
        <path d="M -24 0 h 48" stroke={C.wood} strokeWidth="4" strokeLinecap="round" />
        <path d="M -18 6 h 36" stroke={C.wood} strokeWidth="1.6" opacity="0.8" />
      </g>
      <g stroke={C.foam} strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M 90 104 q 10 -5 20 0" /><path d="M 178 100 q 10 -5 20 0" />
      </g>
    </>
  ),
  "8-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.dawn} />
      <Water y={80} fill={C.water} />
      <g fill={C.leafDeep} opacity="0.95">
        <path d="M 6 120 q -8 -70 6 -92 q 14 24 6 92 Z" />
        <path d="M 28 120 q -7 -62 5 -82 q 13 22 5 82 Z" />
        <path d="M 50 120 q -6 -52 4 -70 q 12 20 4 70 Z" />
        <path d="M 244 120 q -8 -66 6 -88 q 14 24 6 88 Z" />
        <path d="M 264 120 q -6 -56 4 -74 q 12 20 4 74 Z" />
      </g>
      <g transform="translate(150,96) scale(0.7)">
        <path d="M -24 0 q 3 15 24 15 q 21 0 24 -15 Z" fill={C.clothDeep} />
        <path d="M -24 0 h 48" stroke={C.wood} strokeWidth="4" strokeLinecap="round" />
      </g>
      <Birds x={180} y={20} scale={0.9} color={C.stoneShade} />
      <Birds x={80} y={30} scale={0.6} color={C.stoneShade} />
    </>
  ),
  "8-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <g fill={C.stone}>
        <rect x="0" y="34" width="86" height="60" />
        <rect x="8" y="26" width="70" height="8" rx="2" fill={C.stoneDeep} />
      </g>
      <g fill={C.gold} opacity="0.8">
        <rect x="14" y="40" width="8" height="54" />
        <rect x="34" y="40" width="8" height="54" />
        <rect x="54" y="40" width="8" height="54" />
      </g>
      <path d="M 86 94 L 122 94 L 122 102 L 78 102 Z" fill={C.stoneDeep} />
      <path d="M 78 102 L 122 102 L 122 110 L 70 110 Z" fill={C.stone} />
      <Water y={104} fill={C.deepWater} />
      <g transform="translate(200,104) scale(0.75)">
        <path d="M -24 0 q 3 15 24 15 q 21 0 24 -15 Z" fill={C.clothDeep} />
        <path d="M -24 0 h 48" stroke={C.wood} strokeWidth="4" strokeLinecap="round" />
      </g>
      <g fill={C.leafDeep}>
        <path d="M 244 106 q -5 -34 5 -44 q 11 12 5 44 Z" />
      </g>
      <Sun x={190} y={22} r={13} color={C.sun} ray={C.sunRay} />
    </>
  ),
  "8-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.sand} />
      <Sun x={136} y={26} r={17} color={C.sun} ray={C.sunRay} />
      <Ridge y={100} sway={3} fill={C.sandDeep} />
      <g fill={C.cloth}>
        <rect x="26" y="36" width="16" height="64" />
        <rect x="86" y="36" width="16" height="64" />
        <rect x="170" y="36" width="16" height="64" />
        <rect x="230" y="36" width="16" height="64" />
      </g>
      <g fill={C.gold}>
        <path d="M 20 36 q 14 -16 28 0 Z" /><path d="M 80 36 q 14 -16 28 0 Z" />
        <path d="M 164 36 q 14 -16 28 0 Z" /><path d="M 224 36 q 14 -16 28 0 Z" />
      </g>
      <g fill={C.clothDeep}>
        <rect x="26" y="88" width="16" height="4" /><rect x="86" y="88" width="16" height="4" />
        <rect x="170" y="88" width="16" height="4" /><rect x="230" y="88" width="16" height="4" />
      </g>
      <path d="M 0 26 h 272" stroke={C.stoneDeep} strokeWidth="7" />
    </>
  ),

  // 9 — The Burning Bush
  "9-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.dawn} />
      <Peaks points="L 34 62 L 74 92 L 120 48 L 168 90 L 214 58 L 272 96" fill={C.stoneDeep} />
      <Ridge y={98} sway={6} fill={C.sandDeep} />
      <Sheep x={30} y={104} scale={0.75} />
      <Sheep x={86} y={112} scale={0.6} />
      <Sheep x={140} y={106} scale={0.5} />
      <path d="M 222 108 q -2 -30 2 -40 q 8 -10 12 -2" stroke={C.earth} strokeWidth="4" fill="none" strokeLinecap="round" />
      <Tuft x={190} y={116} scale={1.1} color={C.leaf} />
    </>
  ),
  "9-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={92} r={96} color={C.flame} />
      <Ridge y={106} sway={5} fill={C.earthDeep} />
      <g fill={C.leaf}>
        <ellipse cx="112" cy="96" rx="20" ry="16" />
        <ellipse cx="160" cy="94" rx="20" ry="16" />
        <ellipse cx="136" cy="86" rx="22" ry="16" />
      </g>
      <g fill={C.flame}>
        <path d="M 112 92 q -8 -14 0 -22 q 3 8 8 10 q 3 -6 0 -12 q 12 12 4 24 Z" />
        <path d="M 140 84 q -9 -16 0 -26 q 4 9 9 12 q 3 -7 0 -14 q 14 14 5 28 Z" />
        <path d="M 166 92 q -8 -14 0 -22 q 3 8 8 10 q 3 -6 0 -12 q 12 12 4 24 Z" />
      </g>
      <g fill={C.flameBright}>
        <path d="M 141 82 q -5 -9 0 -15 q 5 7 2 15 Z" />
        <path d="M 114 90 q -4 -8 0 -13 q 5 6 2 13 Z" />
      </g>
    </>
  ),
  "9-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.dawn} />
      <Glow id={`b${uid}`} x={136} y={102} r={86} color={C.flameBright} />
      <Ridge y={90} sway={4} fill={C.sandDeep} />
      <g transform="translate(96,92)">
        <path d="M 0 0 q -6 16 4 22 q 12 4 14 -6 q 2 -12 -4 -16 Z" fill={C.wood} />
        <path d="M 2 4 q 8 -2 10 6" stroke={C.woodDeep} strokeWidth="2" fill="none" />
      </g>
      <g transform="translate(140,96)">
        <path d="M 0 0 q -6 16 4 22 q 12 4 14 -6 q 2 -12 -4 -16 Z" fill={C.wood} />
        <path d="M 2 4 q 8 -2 10 6" stroke={C.woodDeep} strokeWidth="2" fill="none" />
      </g>
      <g stroke={C.gold} strokeWidth="2" opacity="0.7" strokeLinecap="round">
        <path d="M 200 92 q 10 -8 22 -4" /><path d="M 44 96 q -10 -8 -22 -4" />
      </g>
      <g fill={C.stoneDeep}>
        <ellipse cx="216" cy="112" rx="18" ry="7" />
        <ellipse cx="40" cy="116" rx="14" ry="5" />
      </g>
    </>
  ),
  "9-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.ember} />
      <Ridge y={94} sway={5} fill={C.earthDeep} />
      <g fill={C.crimson} opacity="0.8">
        <rect x="16" y="96" width="26" height="8" rx="1" />
        <rect x="46" y="96" width="26" height="8" rx="1" />
        <rect x="30" y="106" width="26" height="8" rx="1" />
      </g>
      <g transform="translate(160,84)" stroke={C.gold} strokeWidth="5" fill="none">
        <circle cx="0" cy="0" r="12" />
        <circle cx="26" cy="6" r="12" />
        <path d="M 12 -6 l 6 -3" strokeWidth="4" strokeLinecap="round" />
      </g>
      <path d="M 196 74 l 22 -12 l 4 8 Z" fill={C.gold} opacity="0.9" />
      <Glow id={`b${uid}`} x={216} y={30} r={62} color={C.dawn} />
      <Birds x={54} y={22} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "9-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.dusk} />
      <Glow id={`b${uid}`} x={136} y={30} r={110} color={C.flameBright} />
      <g stroke={C.dawn} strokeWidth="3" strokeLinecap="round" opacity="0.55">
        <path d="M 136 30 L 40 4" /><path d="M 136 30 L 96 -8" /><path d="M 136 30 L 176 -8" />
        <path d="M 136 30 L 232 4" /><path d="M 136 30 L 20 40" /><path d="M 136 30 L 252 40" />
      </g>
      <circle cx="136" cy="30" r="18" fill={C.star} opacity="0.9" />
      <Peaks points="L 46 96 L 100 62 L 152 100 L 206 68 L 272 104" fill={C.night} />
      <Peaks points="L 70 116 L 130 96 L 190 118 L 272 110" fill={C.deepNight} />
    </>
  ),

  // 10 — The Exodus & Red Sea Crossing
  "10-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.ember} />
      <g fill={C.stoneShade} opacity="0.4">
        <ellipse cx="70" cy="34" rx="64" ry="16" />
      </g>
      <Ridge y={80} sway={4} fill={C.sandDeep} />
      <g transform="translate(54,102)" fill={C.ink}>
        <path d="M -22 0 L 14 0 L 20 -22 L -16 -22 Z" />
        <path d="M 20 -14 l 30 6" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
        <circle cx="-12" cy="2" r="12" fill="none" stroke={C.ink} strokeWidth="3.5" />
        <circle cx="12" cy="2" r="12" fill="none" stroke={C.ink} strokeWidth="3.5" />
        <path d="M -12 -10 l 0 24 M -24 2 l 24 0" stroke={C.ink} strokeWidth="2" />
      </g>
      <g fill={C.ink} opacity="0.85">
        <path d="M 96 100 q 10 -26 26 -26 q 8 12 6 26 Z" />
        <path d="M 118 88 q 12 -6 18 2 q -10 6 -18 -2 Z" />
      </g>
      <Waves y={100} fill={C.darkWater} crest={C.foam} />
    </>
  ),
  "10-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.dusk} />
      <Rain seed={9} count={12} color={C.foam} />
      <Glow id={`b${uid}`} x={136} y={18} r={64} color={C.dawn} />
      <path d="M 136 120 L 136 14" stroke={C.earth} strokeWidth="6" strokeLinecap="round" />
      <path d="M 136 18 q -14 -12 -2 -18" stroke={C.earth} strokeWidth="6" fill="none" strokeLinecap="round" />
      <Waves y={92} fill={C.darkWater} crest={C.foam} />
      <g fill={C.night} opacity="0.7">
        <ellipse cx="40" cy="112" rx="30" ry="10" />
        <ellipse cx="236" cy="114" rx="28" ry="9" />
      </g>
    </>
  ),
  "10-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.ember} />
      <g stroke={C.foam} strokeWidth="2.5" fill="none" opacity="0.7" strokeLinecap="round">
        <path d="M 10 26 q 40 -12 80 0 q 40 12 80 0" />
        <path d="M 30 40 q 40 -12 80 0 q 40 12 80 0" />
      </g>
      <path d="M 60 120 L 60 28" stroke={C.earth} strokeWidth="5" strokeLinecap="round" />
      <path d="M 60 30 q 90 -6 180 6" stroke={C.gold} strokeWidth="3" fill="none" opacity="0.8" strokeLinecap="round" />
      <path d="M 0 88 q 40 -18 78 -4 L 78 120 L 0 120 Z" fill={C.darkWater} />
      <path d="M 272 84 q -44 -18 -84 -2 L 188 120 L 272 120 Z" fill={C.darkWater} />
      <path d="M 96 104 q 40 -8 78 0 L 174 120 L 96 120 Z" fill={C.sandDeep} />
    </>
  ),
  "10-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.noon} />
      <path d="M 0 12 q 30 -6 46 8 q 12 12 10 100 L 0 120 Z" fill={C.deepWater} />
      <path d="M 272 10 q -32 -6 -50 10 q -12 12 -10 100 L 272 120 Z" fill={C.deepWater} />
      <g stroke={C.foam} strokeWidth="2.4" fill="none" opacity="0.75" strokeLinecap="round">
        <path d="M 12 40 q 20 8 34 4" /><path d="M 16 72 q 20 8 32 2" /><path d="M 10 100 q 22 8 36 2" />
        <path d="M 260 38 q -20 8 -34 4" /><path d="M 256 70 q -20 8 -32 2" /><path d="M 262 98 q -22 8 -36 2" />
      </g>
      <path d="M 56 120 q 24 -14 80 -14 q 56 0 80 14 Z" fill={C.sandDeep} />
      <g fill={C.sand} opacity="0.9">
        <ellipse cx="136" cy="116" rx="46" ry="5" />
      </g>
      <Birds x={112} y={16} scale={0.9} color={C.stoneShade} />
    </>
  ),
  "10-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.ember} />
      <Sun x={136} y={24} r={18} color={C.sun} ray={C.sunRay} />
      <Water y={96} fill={C.water} />
      <Ridge y={110} sway={4} fill={C.sand} />
      <g transform="translate(52,88)">
        <circle cx="0" cy="0" r="15" fill="none" stroke={C.wood} strokeWidth="4" />
        <circle cx="0" cy="0" r="9" fill={C.clothDeep} />
        <g fill={C.gold}>
          <circle cx="-15" cy="-5" r="3" /><circle cx="15" cy="-5" r="3" />
          <circle cx="-9" cy="13" r="3" /><circle cx="9" cy="13" r="3" />
        </g>
      </g>
      <g transform="translate(212,86)">
        <path d="M -12 20 q -4 -30 12 -30 q 16 0 12 30 Z" fill={C.wood} />
        <g stroke={C.gold} strokeWidth="1.5">
          <path d="M -6 -2 L -6 18 M 0 -4 L 0 18 M 6 -2 L 6 18" />
        </g>
      </g>
      <g fill={C.gold} opacity="0.8">
        <circle cx="106" cy="30" r="3" /><circle cx="164" cy="34" r="2.6" /><circle cx="132" cy="44" r="2.2" />
      </g>
    </>
  ),

  // 11 — The Ten Commandments at Sinai
  "11-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.noon} bottom={C.dawn} />
      <Peaks points="L 60 74 L 136 18 L 212 76 L 272 100" fill={C.stoneDeep} />
      <Peaks points="L 90 96 L 136 62 L 190 98 L 272 110" fill={C.stoneShade} />
      <Ridge y={104} sway={4} fill={C.sand} />
      <Tent x={18} y={112} scale={0.75} cloth={C.cloth} shade={C.clothDeep} />
      <Tent x={60} y={116} scale={0.65} cloth={C.cloth} shade={C.clothDeep} />
      <Tent x={196} y={114} scale={0.7} cloth={C.cloth} shade={C.clothDeep} />
      <Tent x={236} y={118} scale={0.6} cloth={C.cloth} shade={C.clothDeep} />
      <g stroke={C.foam} strokeWidth="2" opacity="0.7" fill="none">
        <path d="M 108 108 q 8 -6 16 0 q 8 6 16 0" />
      </g>
    </>
  ),
  "11-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.deepNight} bottom={C.storm} />
      <g fill={C.storm} opacity="0.9">
        <ellipse cx="136" cy="22" rx="86" ry="20" />
        <ellipse cx="70" cy="30" rx="44" ry="13" />
        <ellipse cx="208" cy="28" rx="46" ry="13" />
      </g>
      <Peaks points="L 66 104 L 136 48 L 206 106 L 272 116" fill={C.night} />
      <path d="M 150 40 L 132 78 L 152 76 L 138 116 L 178 70 L 158 72 L 172 40 Z" fill={C.gold} />
      <g transform="translate(38,104)">
        <path d="M 0 0 q 18 -6 30 -20 q 7 -9 12 -2 q -8 18 -26 26 Z" fill={C.bronze} />
        <path d="M 5 -2 q 20 -8 30 -22" stroke={C.gold} strokeWidth="2" fill="none" opacity="0.8" />
      </g>
      <g fill="none" stroke={C.gold} strokeWidth="2" opacity="0.6">
        <path d="M 84 96 q 10 -8 20 0" /><path d="M 78 106 q 16 -12 32 0" />
      </g>
    </>
  ),
  "11-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.storm} bottom={C.stone} />
      <g fill={C.cloud} opacity="0.85">
        <ellipse cx="136" cy="34" rx="76" ry="24" />
        <ellipse cx="80" cy="42" rx="38" ry="14" />
        <ellipse cx="196" cy="40" rx="40" ry="14" />
      </g>
      <Peaks points="L 40 108 L 100 56 L 136 30 L 176 60 L 232 106 L 272 116" fill={C.stoneDeep} />
      <path
        d="M 60 116 q 30 -10 44 -30 q 12 -18 30 -32"
        stroke={C.sand}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="7 6"
        opacity="0.9"
      />
      <Ridge y={116} sway={3} fill={C.stoneShade} />
    </>
  ),
  "11-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.ember} />
      <Glow id={`b${uid}`} x={136} y={92} r={92} color={C.gold} />
      <Ridge y={104} sway={4} fill={C.night} />
      <g fill={C.gold} opacity="0.95">
        <circle cx="52" cy="96" r="4" /><circle cx="74" cy="90" r="4" />
        <circle cx="96" cy="96" r="4" /><circle cx="118" cy="90" r="4" />
        <circle cx="140" cy="96" r="4" /><circle cx="162" cy="90" r="4" />
        <circle cx="184" cy="96" r="4" /><circle cx="206" cy="90" r="4" />
        <circle cx="228" cy="96" r="4" /><circle cx="250" cy="90" r="4" />
      </g>
      <g stroke={C.flameBright} strokeWidth="1.6" opacity="0.6" fill="none">
        <path d="M 52 84 q 100 -18 198 0" />
      </g>
      <g fill={C.crimson} opacity="0.85">
        <path d="M 136 34 q -12 -14 2 -20 q 8 -3 10 4 q 3 -7 10 -4 q 14 6 2 20 q -12 12 -24 0 Z" />
      </g>
    </>
  ),
  "11-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Glow id={`b${uid}`} x={136} y={70} r={78} color={C.flameBright} />
      <Ridge y={106} sway={4} fill={C.sandDeep} />
      <g transform="translate(136,24)">
        <path d="M -40 12 q 0 -12 16 -12 q 16 0 16 12 L -8 84 L -40 84 Z" fill={C.stone} />
        <path d="M 8 12 q 0 -12 16 -12 q 16 0 16 12 L 40 84 L 8 84 Z" fill={C.stone} />
        <g stroke={C.stoneShade} strokeWidth="2" strokeLinecap="round" opacity="0.85">
          <path d="M -34 26 h 20 M -34 36 h 20 M -34 46 h 20 M -34 56 h 20 M -34 66 h 20" />
          <path d="M 14 26 h 20 M 14 36 h 20 M 14 46 h 20 M 14 56 h 20 M 14 66 h 20" />
        </g>
      </g>
      <Tuft x={40} y={116} scale={1.1} color={C.leaf} />
    </>
  ),

  // 12 — The Walls of Jericho
  "12-1": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dusk} bottom={C.ember} />
      <Ridge y={104} sway={4} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="0" y="46" width="272" height="58" />
      </g>
      <g fill={C.stoneDeep}>
        <rect x="0" y="38" width="20" height="10" /><rect x="34" y="38" width="20" height="10" />
        <rect x="68" y="38" width="20" height="10" /><rect x="102" y="38" width="20" height="10" />
        <rect x="150" y="38" width="20" height="10" /><rect x="184" y="38" width="20" height="10" />
        <rect x="218" y="38" width="20" height="10" /><rect x="252" y="38" width="20" height="10" />
      </g>
      <g stroke={C.stoneShade} strokeWidth="1.4" opacity="0.7">
        <path d="M 0 62 h 272 M 0 78 h 272 M 0 94 h 272" />
        <path d="M 34 46 v 16 M 102 62 v 16 M 170 46 v 16 M 238 78 v 16 M 68 78 v 16" />
      </g>
      <rect x="118" y="76" width="36" height="28" rx="2" fill={C.woodDeep} />
      <g stroke={C.bronze} strokeWidth="2">
        <path d="M 118 84 h 36 M 118 94 h 36 M 136 76 v 28" />
      </g>
    </>
  ),
  "12-2": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.night} bottom={C.dusk} />
      <Stars seed={41} count={10} size={1.3} />
      <g fill={C.stoneDeep} opacity="0.8">
        <rect x="0" y="30" width="272" height="30" />
      </g>
      <Ridge y={96} sway={4} fill={C.night} />
      <g transform="translate(136,88)">
        <rect x="-26" y="-18" width="52" height="24" rx="2" fill={C.gold} />
        <rect x="-30" y="-22" width="60" height="6" rx="2" fill={C.bronze} />
        <path d="M -44 -6 h 88" stroke={C.wood} strokeWidth="3" strokeLinecap="round" />
        <path d="M -18 -22 q 8 -14 16 -2 q 8 -12 16 2 Z" fill={C.flameBright} />
      </g>
      <g fill={C.clothDeep} opacity="0.9">
        <path d="M 60 96 q 6 -16 14 0 Z" /><path d="M 84 98 q 6 -14 12 0 Z" />
        <path d="M 190 96 q 6 -16 14 0 Z" /><path d="M 214 98 q 6 -14 12 0 Z" />
      </g>
    </>
  ),
  "12-3": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.dawn} bottom={C.sand} />
      <Sun x={228} y={22} r={15} color={C.sun} ray={C.sunRay} />
      <Ridge y={92} sway={4} fill={C.sandDeep} />
      <g fill={C.stone}>
        <rect x="88" y="42" width="96" height="46" rx="2" />
      </g>
      <g fill={C.stoneDeep}>
        <rect x="88" y="34" width="16" height="9" /><rect x="120" y="34" width="16" height="9" />
        <rect x="152" y="34" width="16" height="9" /><rect x="168" y="34" width="16" height="9" />
      </g>
      <g fill="none" stroke={C.earthDeep} strokeWidth="2.5" strokeDasharray="6 7" opacity="0.85">
        <ellipse cx="136" cy="94" rx="112" ry="22" />
        <ellipse cx="136" cy="94" rx="94" ry="17" />
        <ellipse cx="136" cy="94" rx="76" ry="12" />
      </g>
      <g fill={C.gold}>
        <circle cx="24" cy="98" r="3" /><circle cx="44" cy="104" r="3" /><circle cx="240" cy="92" r="3" />
        <circle cx="220" cy="106" r="3" /><circle cx="136" cy="114" r="3" />
      </g>
    </>
  ),
  "12-4": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.ember} bottom={C.dawn} />
      <Ridge y={100} sway={4} fill={C.sandDeep} />
      <g transform="translate(74,86)">
        <path d="M 0 0 q 22 -8 34 -26 q 8 -12 14 -2 q -8 22 -30 34 Z" fill={C.bronze} />
        <path d="M 4 -2 q 18 -8 28 -22" stroke={C.gold} strokeWidth="2" fill="none" opacity="0.8" />
      </g>
      <g transform="translate(178,88) scale(-1,1)">
        <path d="M 0 0 q 22 -8 34 -26 q 8 -12 14 -2 q -8 22 -30 34 Z" fill={C.bronze} />
        <path d="M 4 -2 q 18 -8 28 -22" stroke={C.gold} strokeWidth="2" fill="none" opacity="0.8" />
      </g>
      <g fill="none" stroke={C.gold} strokeWidth="2.4" opacity="0.7">
        <path d="M 128 40 q 12 -10 24 0" /><path d="M 120 30 q 20 -16 40 0" /><path d="M 112 20 q 28 -22 56 0" />
      </g>
      <g fill={C.stoneShade} opacity="0.5">
        <rect x="0" y="100" width="272" height="6" />
      </g>
    </>
  ),
  "12-5": (uid) => (
    <>
      <Sky id={`a${uid}`} top={C.sand} bottom={C.dawn} />
      <g fill={C.stoneShade} opacity="0.5">
        <ellipse cx="136" cy="86" rx="120" ry="30" />
        <ellipse cx="60" cy="70" rx="42" ry="16" />
        <ellipse cx="212" cy="72" rx="40" ry="15" />
      </g>
      <g fill={C.stone}>
        <rect x="6" y="92" width="30" height="12" rx="2" transform="rotate(-12 21 98)" />
        <rect x="44" y="104" width="34" height="12" rx="2" transform="rotate(6 61 110)" />
        <rect x="94" y="98" width="30" height="12" rx="2" transform="rotate(-20 109 104)" />
        <rect x="150" y="106" width="36" height="12" rx="2" transform="rotate(9 168 112)" />
        <rect x="200" y="96" width="32" height="12" rx="2" transform="rotate(-8 216 102)" />
        <rect x="236" y="110" width="30" height="10" rx="2" transform="rotate(14 251 115)" />
      </g>
      <g fill={C.stoneDeep}>
        <rect x="70" y="88" width="24" height="9" rx="2" transform="rotate(22 82 92)" />
        <rect x="178" y="86" width="26" height="9" rx="2" transform="rotate(-16 191 90)" />
      </g>
      <g stroke={C.sandDeep} strokeWidth="2" opacity="0.6" strokeLinecap="round">
        <path d="M 30 76 l 6 -10 M 120 70 l 4 -12 M 226 78 l 7 -9" />
      </g>
    </>
  ),
};
