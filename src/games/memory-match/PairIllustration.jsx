/* ============================================================
   MEMORY MATCH — Pair Illustrations
   Sixteen scenes drawn for the card's real 272x120 frame with one
   shared warm lighting family, layered ground planes, and a calm
   mid-band reserved for the taped caption strip. No depictions of
   Jesus per Constitution Article 1.2 — animals, objects, scenery.
   ============================================================ */
import { useId } from "react";

export function PairIllustration({ art = "creation" }) {
  // Both cards of a pair render the same scene, so gradient IDs must be
  // unique per component instance to keep the DOM valid
  const uid = useId();

  switch (art) {
    case "shepherd":
      // Dawn meadow: layered hills, brook, flock, planted crook
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`sh-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff3d2"/><stop offset="1" stopColor="#eef7e4"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#sh-sky-${uid})`} />
        <g opacity="0.55" stroke="#f3c95f" strokeWidth="2.5" strokeLinecap="round"><line x1="38" y1="2" x2="38" y2="-8"/><line x1="16" y1="10" x2="9" y2="3"/><line x1="60" y1="10" x2="67" y2="3"/></g>
        <circle cx="38" cy="14" r="15" fill="#ffdb70"/>
        <g fill="#ffffff" opacity="0.85"><ellipse cx="150" cy="16" rx="17" ry="6"/><ellipse cx="163" cy="12" rx="12" ry="5"/><ellipse cx="228" cy="26" rx="14" ry="5"/></g>
        <g stroke="#8a7355" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.75"><path d="M 196 18 q 4 -4 8 0 q 4 -4 8 0"/><path d="M 104 30 q 3 -3 6 0 q 3 -3 6 0"/></g>
        <path d="M 0 62 Q 70 44 140 58 T 272 52 L 272 120 L 0 120 Z" fill="#cde7bd"/>
        <path d="M 0 78 Q 90 60 180 74 T 272 70 L 272 120 L 0 120 Z" fill="#a9d59b"/>
        <path d="M 0 100 Q 68 86 136 96 T 272 92 L 272 120 L 0 120 Z" fill="#7fbd72"/>
        <path d="M 208 92 Q 224 100 216 120 L 244 120 Q 232 102 244 90 Z" fill="#9fd4ef" opacity="0.8"/>
        <path d="M 236 40 C 236 28 250 28 250 38 L 250 96" fill="none" stroke="#a07855" strokeWidth="4" strokeLinecap="round"/>
        <g><g fill="#ffffff" stroke="#c8d6c2" strokeWidth="1.4"><circle cx="34" cy="96" r="9"/><circle cx="43" cy="91" r="8"/><circle cx="52" cy="96" r="9"/><circle cx="43" cy="99" r="8"/></g><circle cx="60" cy="94" r="6" fill="#4a403a"/><ellipse cx="58" cy="89" rx="2.5" ry="4" fill="#4a403a" transform="rotate(-30 58 89)"/><circle cx="61.5" cy="93" r="1" fill="#fff"/><rect x="38" y="104" width="2.5" height="8" rx="1" fill="#4a403a"/><rect x="48" y="104" width="2.5" height="8" rx="1" fill="#4a403a"/></g>
        <g transform="translate(88,100) scale(0.62)"><g fill="#ffffff" stroke="#c8d6c2" strokeWidth="1.4"><circle cx="10" cy="10" r="8"/><circle cx="18" cy="6" r="7"/><circle cx="25" cy="10" r="8"/><circle cx="17" cy="13" r="7"/></g><circle cx="32" cy="9" r="5" fill="#4a403a"/><circle cx="33.5" cy="8" r="0.9" fill="#fff"/><rect x="13" y="17" width="2.2" height="7" rx="1" fill="#4a403a"/><rect x="22" y="17" width="2.2" height="7" rx="1" fill="#4a403a"/></g>
        <g stroke="#5f9c52" strokeWidth="1.6" strokeLinecap="round" opacity="0.9"><path d="M 150 112 l 0 -7 M 147 112 l -2 -5 M 153 112 l 2 -5"/><path d="M 186 108 l 0 -7 M 183 108 l -2 -5 M 189 108 l 2 -5"/><path d="M 12 110 l 0 -6 M 9 110 l -2 -4"/></g>
        <g><circle cx="167" cy="98" r="3" fill="#ffd166"/><g fill="#fffdf5"><circle cx="167" cy="93" r="2.2"/><circle cx="172" cy="98" r="2.2"/><circle cx="167" cy="103" r="2.2"/><circle cx="162" cy="98" r="2.2"/></g></g>
        <g><circle cx="207" cy="106" r="2.4" fill="#e88bb1"/><g fill="#fff"><circle cx="207" cy="102" r="1.7"/><circle cx="211" cy="106" r="1.7"/><circle cx="207" cy="110" r="1.7"/><circle cx="203" cy="106" r="1.7"/></g></g>
        </svg>
      );

    case "lamp":
      // Dusk path: glowing clay lamp on flagstones, moths in the warm light
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`lp-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6b5a90"/><stop offset="0.7" stopColor="#b07a86"/><stop offset="1" stopColor="#e8a76c"/></linearGradient>
          <radialGradient id={`lp-glow-${uid}`} cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#ffe9a3" stopOpacity="0.85"/><stop offset="1" stopColor="#ffe9a3" stopOpacity="0"/></radialGradient>
        </defs>
        <rect width="272" height="120" fill={`url(#lp-sky-${uid})`} />
        <g fill="#fff3d9" opacity="0.9"><circle cx="36" cy="14" r="1.8"/><circle cx="88" cy="24" r="1.4"/><circle cx="150" cy="10" r="2"/><circle cx="240" cy="18" r="1.6"/><circle cx="196" cy="30" r="1.3"/></g>
        <path d="M 0 92 Q 70 82 136 90 T 272 86 L 272 120 L 0 120 Z" fill="#59486e"/>
        <path d="M 0 104 Q 90 94 180 102 T 272 100 L 272 120 L 0 120 Z" fill="#6e5a82"/>
        <circle cx="196" cy="84" r="42" fill={`url(#lp-glow-${uid})`}/>
        <g><path d="M 178 88 q 18 -12 36 0 q -8 8 -18 8 q -10 0 -18 -8 Z" fill="#c98a4b" stroke="#a06a33" strokeWidth="1.6"/><ellipse cx="196" cy="87" rx="14" ry="3.5" fill="#e0a95f"/><path d="M 212 84 q 6 -1 8 3 q -5 2 -8 0 Z" fill="#c98a4b"/><path d="M 218 82 q 3 -7 0 -11 q 6 3 4 11 Z" fill="#ffb347"/><path d="M 218.5 76 q 1.5 -4 0.5 -6 q 3.5 2 2.5 6.5 Z" fill="#ffd97a"/></g>
        <g fill="#efe0c8" opacity="0.85"><ellipse cx="60" cy="112" rx="18" ry="4"/><ellipse cx="104" cy="116" rx="16" ry="4"/><ellipse cx="150" cy="112" rx="17" ry="4"/><ellipse cx="20" cy="116" rx="14" ry="4"/><ellipse cx="238" cy="114" rx="18" ry="4"/></g>
        <g stroke="#fff3c4" strokeWidth="1.3" strokeLinecap="round" opacity="0.9"><path d="M 168 62 l 0 6 M 165 65 l 6 0"/><path d="M 228 66 l 0 5 M 225.5 68.5 l 5 0"/></g>
        <g fill="#fde9bd" opacity="0.9"><circle cx="180" cy="58" r="1.4"/><circle cx="214" cy="60" r="1.2"/></g>
        </svg>
      );

    case "creation":
      // Fresh world: sun, sea swirl, young sprout on new earth
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`cr-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffeec9"/><stop offset="1" stopColor="#dff0f7"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#cr-sky-${uid})`} />
        <g opacity="0.6" stroke="#f3c95f" strokeWidth="2.5" strokeLinecap="round"><line x1="228" y1="4" x2="228" y2="-6"/><line x1="206" y1="12" x2="199" y2="5"/><line x1="250" y1="12" x2="257" y2="5"/></g>
        <circle cx="228" cy="16" r="14" fill="#ffdb70"/>
        <g fill="#ffffff" opacity="0.85"><ellipse cx="60" cy="18" rx="18" ry="6"/><ellipse cx="74" cy="14" rx="12" ry="5"/><ellipse cx="140" cy="28" rx="14" ry="5"/></g>
        <g stroke="#8a7355" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.75"><path d="M 100 14 q 4 -4 8 0 q 4 -4 8 0"/></g>
        <path d="M 0 74 Q 68 60 136 70 T 272 66 L 272 120 L 0 120 Z" fill="#b9dfae"/>
        <path d="M 0 98 Q 80 86 160 94 T 272 92 L 272 120 L 0 120 Z" fill="#8cc07d"/>
        <g stroke="#7db8d8" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9"><path d="M 10 86 q 10 -6 20 0 q 10 6 20 0"/><path d="M 220 84 q 10 -6 20 0 q 10 6 20 0"/></g>
        <g><path d="M 128 112 q -2 -12 0 -18" stroke="#5f9c52" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M 128 96 q -8 -4 -10 -10 q 10 0 11 8 Z" fill="#7fbd72"/><path d="M 128 98 q 8 -6 12 -12 q -12 0 -13 10 Z" fill="#5c8a3a"/></g>
        <g><circle cx="52" cy="108" r="2.6" fill="#ffd166"/><g fill="#fffdf5"><circle cx="52" cy="104" r="1.9"/><circle cx="56" cy="108" r="1.9"/><circle cx="52" cy="112" r="1.9"/><circle cx="48" cy="108" r="1.9"/></g></g>
        <g stroke="#5f9c52" strokeWidth="1.6" strokeLinecap="round" opacity="0.9"><path d="M 196 110 l 0 -7 M 193 110 l -2 -5 M 199 110 l 2 -5"/></g>
        </svg>
      );

    case "dove_peace":
      // Morning calm: dove with olive branch over a still sea
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`dv-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#dcecf7"/><stop offset="1" stopColor="#fdf3dd"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#dv-sky-${uid})`} />
        <circle cx="42" cy="18" r="12" fill="#ffe8a0" opacity="0.9"/>
        <g fill="#ffffff" opacity="0.9"><ellipse cx="180" cy="14" rx="19" ry="6"/><ellipse cx="196" cy="10" rx="12" ry="5"/><ellipse cx="90" cy="26" rx="15" ry="5"/><ellipse cx="244" cy="30" rx="13" ry="5"/></g>
        <g transform="translate(112,26)"><path d="M 25 25 C 20 8 36 0 50 4 C 39 14 32 20 25 25 Z" fill="#ffffff" stroke="#c9d4de" strokeWidth="1.2"/><path d="M 20 25 C 9 11 25 5 37 9 C 28 18 24 22 20 25 Z" fill="#f3f6f9" stroke="#c9d4de" strokeWidth="1.2"/><ellipse cx="25" cy="29" rx="15" ry="7.5" fill="#ffffff" stroke="#c9d4de" strokeWidth="1.2"/><circle cx="39" cy="24" r="5.5" fill="#ffffff" stroke="#c9d4de" strokeWidth="1.2"/><polygon points="44,23 50,25 44,27" fill="#f59e0b"/><path d="M 48 25 Q 55 29 62 24" fill="none" stroke="#15803d" strokeWidth="1.6"/><ellipse cx="56" cy="26" rx="3.2" ry="1.6" fill="#4ade80" transform="rotate(-15 56 26)"/><ellipse cx="60" cy="23.5" rx="2.6" ry="1.5" fill="#4ade80" transform="rotate(25 60 23.5)"/><path d="M 12 32 q -6 4 -10 3" stroke="#c9d4de" strokeWidth="1.6" fill="none" strokeLinecap="round"/></g>
        <path d="M 0 100 L 272 100 L 272 120 L 0 120 Z" fill="#9fcbe4"/>
        <path d="M 0 100 Q 68 96 136 100 T 272 100 L 272 104 Q 204 108 136 104 T 0 104 Z" fill="#bcdcee"/>
        <g stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.8"><line x1="36" y1="110" x2="58" y2="110"/><line x1="120" y1="114" x2="138" y2="114"/><line x1="210" y1="110" x2="230" y2="110"/></g>
        <g stroke="#8a9bb0" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7"><path d="M 60 40 q 3 -3 6 0 q 3 -3 6 0"/><path d="M 226 46 q 3 -3 6 0 q 3 -3 6 0"/></g>
        </svg>
      );

    case "armor_shield":
      // Golden fortress: sandstone towers, pennants, shield of faith
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`ar-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fdeecd"/><stop offset="1" stopColor="#f7d9a8"/></linearGradient><linearGradient id={`ar-sh-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6fa3d8"/><stop offset="1" stopColor="#3e7cb1"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#ar-sky-${uid})`} />
        <g stroke="#f3c95f" strokeWidth="2" strokeLinecap="round" opacity="0.5"><line x1="24" y1="14" x2="14" y2="6"/><line x1="52" y1="8" x2="48" y2="-2"/><line x1="80" y1="14" x2="88" y2="5"/></g>
        <circle cx="52" cy="20" r="13" fill="#ffe08a"/>
        <g stroke="#8a7355" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7"><path d="M 150 22 q 4 -4 8 0 q 4 -4 8 0"/><path d="M 190 34 q 3 -3 6 0 q 3 -3 6 0"/></g>
        <g><rect x="14" y="52" width="16" height="46" rx="2" fill="#d9c193" stroke="#b79b6b" strokeWidth="1.4"/><rect x="12" y="46" width="20" height="8" rx="1.5" fill="#c9ad7e"/><rect x="16" y="40" width="4" height="7" fill="#c9ad7e"/><rect x="26" y="40" width="4" height="7" fill="#c9ad7e"/><path d="M 22 40 L 22 28 L 36 33 L 22 37 Z" fill="#d94f30"/><line x1="22" y1="28" x2="22" y2="40" stroke="#8a6b45" strokeWidth="1.6"/></g>
        <g><rect x="242" y="58" width="16" height="40" rx="2" fill="#d9c193" stroke="#b79b6b" strokeWidth="1.4"/><rect x="240" y="52" width="20" height="8" rx="1.5" fill="#c9ad7e"/><rect x="244" y="46" width="4" height="7" fill="#c9ad7e"/><rect x="254" y="46" width="4" height="7" fill="#c9ad7e"/><path d="M 250 46 L 250 36 L 262 40 L 250 44 Z" fill="#5c8a3a"/><line x1="250" y1="36" x2="250" y2="46" stroke="#8a6b45" strokeWidth="1.6"/></g>
        <rect x="0" y="96" width="272" height="24" fill="#d9c193"/>
        <g stroke="#c2a677" strokeWidth="1.3"><line x1="0" y1="104" x2="272" y2="104"/><line x1="0" y1="112" x2="272" y2="112"/><line x1="34" y1="96" x2="34" y2="104"/><line x1="94" y1="96" x2="94" y2="104"/><line x1="154" y1="96" x2="154" y2="104"/><line x1="214" y1="96" x2="214" y2="104"/><line x1="64" y1="104" x2="64" y2="112"/><line x1="124" y1="104" x2="124" y2="112"/><line x1="184" y1="104" x2="184" y2="112"/><line x1="244" y1="104" x2="244" y2="112"/></g>
        <g transform="translate(112,34)"><path d="M 0 0 L 48 0 C 48 34 38 54 24 62 C 10 54 0 34 0 0 Z" fill={`url(#ar-sh-${uid})`} stroke="#2f6394" strokeWidth="3"/><path d="M 5 5 L 43 5 C 43 32 35 48 24 55 C 13 48 5 32 5 5 Z" fill="none" stroke="#bcd8f0" strokeWidth="1.6" opacity="0.8"/><rect x="20.5" y="12" width="7" height="32" rx="1.5" fill="#ffd166"/><rect x="11" y="20" width="26" height="7" rx="1.5" fill="#ffd166"/></g>
        <g stroke="#e9a13b" strokeWidth="1.4" strokeLinecap="round" opacity="0.85"><path d="M 96 40 l 0 7 M 92.5 43.5 l 7 0"/><path d="M 178 52 l 0 6 M 175 55 l 6 0"/></g>
        </svg>
      );

    case "praise_harp":
      // Festival gold: lyre, rising notes, banner flags over the hills
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`ph-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffedc2"/><stop offset="1" stopColor="#fbd9a5"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#ph-sky-${uid})`} />
        <g stroke="#c9a06b" strokeWidth="2" opacity="0.9"><line x1="0" y1="10" x2="90" y2="26"/><line x1="272" y1="8" x2="182" y2="26"/></g>
        <g><polygon points="18,12 34,15 18,24" fill="#d94f30"/><polygon points="52,18 68,21 52,30" fill="#5c8a3a"/><polygon points="236,16 220,19 236,28" fill="#3e7cb1"/><polygon points="256,10 244,13 256,20" fill="#e9a13b"/></g>
        <g fill="#8a5a3b" opacity="0.9"><path d="M 200 24 q 3 -6 9 -6 q -1 6 -6 8 Z"/><circle cx="209" cy="17" r="2.6"/><path d="M 152 38 q 2 -5 8 -5 q -1 5 -5 7 Z"/><circle cx="160" cy="32" r="2.2"/><path d="M 96 20 q 2 -5 8 -5 q -1 5 -5 7 Z"/><circle cx="104" cy="14" r="2.2"/></g>
        <path d="M 0 88 Q 70 74 140 84 T 272 80 L 272 120 L 0 120 Z" fill="#e3c07f"/>
        <path d="M 0 106 Q 90 94 180 102 T 272 100 L 272 120 L 0 120 Z" fill="#cfa45c"/>
        <g transform="translate(36,44)"><path d="M 6 44 C -4 28 0 8 12 2 C 8 14 8 30 16 40 Z" fill="#b07a3a" stroke="#8a5a26" strokeWidth="1.6"/><path d="M 46 44 C 56 28 52 8 40 2 C 44 14 44 30 36 40 Z" fill="#b07a3a" stroke="#8a5a26" strokeWidth="1.6"/><path d="M 6 44 Q 26 54 46 44" fill="none" stroke="#8a5a26" strokeWidth="3" strokeLinecap="round"/><g stroke="#ffd166" strokeWidth="1.6"><line x1="16" y1="8" x2="16" y2="42"/><line x1="22" y1="5" x2="22" y2="45"/><line x1="28" y1="4" x2="28" y2="46"/><line x1="34" y1="5" x2="34" y2="45"/></g></g>
        <g stroke="#e9a13b" strokeWidth="1.4" strokeLinecap="round" opacity="0.9"><path d="M 130 60 l 0 6 M 127 63 l 6 0"/><path d="M 238 56 l 0 6 M 235 59 l 6 0"/></g>
        </svg>
      );

    case "love_heart":
      // Stitched heart: quilted hearts, blossoms, warm rosy sky
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`lv-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe9e0"/><stop offset="1" stopColor="#fff6e6"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#lv-sky-${uid})`} />
        <g fill="#ffffff" opacity="0.9"><ellipse cx="70" cy="16" rx="17" ry="6"/><ellipse cx="84" cy="12" rx="11" ry="5"/><ellipse cx="210" cy="22" rx="15" ry="5"/></g>
        <g fill="#f2a9be" opacity="0.85"><path d="M 34 30 c -3 -6 -12 -5 -12 2 c 0 5 7 9 12 12 c 5 -3 12 -7 12 -12 c 0 -7 -9 -8 -12 -2 Z"/><path d="M 244 40 c -2.4 -5 -10 -4 -10 1.6 c 0 4 5.6 7.2 10 9.6 c 4.4 -2.4 10 -5.6 10 -9.6 c 0 -5.6 -7.6 -6.6 -10 -1.6 Z"/></g>
        <g transform="translate(102,26)"><path d="M 34 14 C 26 -2 0 2 0 20 C 0 34 18 44 34 54 C 50 44 68 34 68 20 C 68 2 42 -2 34 14 Z" fill="#e76a8b" stroke="#c14a6b" strokeWidth="2.5"/><path d="M 34 20 C 29 10 12 12 12 22" fill="none" stroke="#ffd3df" strokeWidth="2.5" strokeLinecap="round"/><g stroke="#ffffff" strokeWidth="1.4" strokeDasharray="3 3" fill="none"><path d="M 6 16 C 8 6 24 4 30 12"/><path d="M 62 16 C 60 6 44 4 38 12"/></g></g>
        <path d="M 0 104 Q 68 94 136 102 T 272 98 L 272 120 L 0 120 Z" fill="#a9d59b"/>
        <g><circle cx="52" cy="108" r="2.6" fill="#ffd166"/><g fill="#fffdf5"><circle cx="52" cy="104" r="1.9"/><circle cx="56" cy="108" r="1.9"/><circle cx="52" cy="112" r="1.9"/><circle cx="48" cy="108" r="1.9"/></g></g>
        <g><circle cx="222" cy="110" r="2.4" fill="#e88bb1"/><g fill="#fff"><circle cx="222" cy="106" r="1.7"/><circle cx="226" cy="110" r="1.7"/><circle cx="222" cy="114" r="1.7"/><circle cx="218" cy="110" r="1.7"/></g></g>
        <g stroke="#5f9c52" strokeWidth="1.6" strokeLinecap="round" opacity="0.9"><path d="M 150 112 l 0 -6 M 147 112 l -2 -4 M 153 112 l 2 -4"/></g>
        </svg>
      );

    case "wisdom_scroll":
      // Scribe's desk: unrolled scroll, quill, candle at golden hour
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`ws-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f7e6c4"/><stop offset="1" stopColor="#efd6a8"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#ws-sky-${uid})`} />
        <g fill="#fff3d9" opacity="0.9"><circle cx="36" cy="14" r="1.6"/><circle cx="120" cy="10" r="1.9"/><circle cx="220" cy="16" r="1.5"/></g>
        <g stroke="#d9b46e" strokeWidth="1.4" strokeLinecap="round" opacity="0.7"><path d="M 60 24 l 0 6 M 57 27 l 6 0"/><path d="M 246 30 l 0 6 M 243 33 l 6 0"/></g>
        <rect x="0" y="94" width="272" height="26" fill="#a9713f"/>
        <g stroke="#8a5a2e" strokeWidth="1.4" opacity="0.7"><line x1="0" y1="102" x2="272" y2="102"/><line x1="0" y1="111" x2="272" y2="111"/></g>
        <g transform="translate(58,34)"><rect x="14" y="4" width="130" height="50" rx="3" fill="#fdf3dd" stroke="#d9b98a" strokeWidth="2"/><ellipse cx="14" cy="29" rx="8" ry="27" fill="#eed6ae" stroke="#c9a877" strokeWidth="1.8"/><ellipse cx="144" cy="29" rx="8" ry="27" fill="#eed6ae" stroke="#c9a877" strokeWidth="1.8"/><g stroke="#b98d5a" strokeWidth="2.4" strokeLinecap="round"><line x1="34" y1="18" x2="120" y2="18"/><line x1="34" y1="29" x2="120" y2="29"/><line x1="34" y1="40" x2="96" y2="40"/></g></g>
        <g transform="translate(206,52)"><path d="M 4 40 Q 18 20 34 0" stroke="#8a5a2e" strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M 30 2 q 8 -4 12 -2 q -4 8 -12 8 q -4 0 -4 -3 Z" fill="#e9eef2" stroke="#b9c4cc" strokeWidth="1.4"/></g>
        <g transform="translate(24,58)"><rect x="0" y="10" width="12" height="26" rx="2" fill="#f2e3c2" stroke="#d0b482" strokeWidth="1.5"/><path d="M 6 8 q 4 -6 0 -10 q 6 4 4 10 Z" fill="#ffb347"/><circle cx="6" cy="2" r="2" fill="#ffd97a"/></g>
        </svg>
      );

    case "light_city":
      // City on a hill: glowing windows against the dusk
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`lc-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6b5a90"/><stop offset="0.65" stopColor="#a4708c"/><stop offset="1" stopColor="#eda76a"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#lc-sky-${uid})`} />
        <g fill="#fff3d9" opacity="0.9"><circle cx="40" cy="14" r="1.8"/><circle cx="96" cy="8" r="1.4"/><circle cx="230" cy="12" r="1.7"/><circle cx="196" cy="24" r="1.3"/></g>
        <g stroke="#ffe9a3" strokeWidth="2" strokeLinecap="round" opacity="0.65"><line x1="136" y1="34" x2="136" y2="20"/><line x1="112" y1="40" x2="102" y2="30"/><line x1="160" y1="40" x2="170" y2="30"/></g>
        <path d="M 0 92 Q 70 80 136 88 T 272 84 L 272 120 L 0 120 Z" fill="#7c5a52"/>
        <path d="M 60 88 Q 136 56 212 88 Z" fill="#8d6a54"/>
        <g><rect x="96" y="58" width="18" height="30" rx="1.5" fill="#c9ad7e" stroke="#a3854f" strokeWidth="1.4"/><rect x="120" y="46" width="22" height="42" rx="1.5" fill="#d9c193" stroke="#a3854f" strokeWidth="1.4"/><rect x="148" y="56" width="18" height="32" rx="1.5" fill="#c9ad7e" stroke="#a3854f" strokeWidth="1.4"/><path d="M 120 46 L 131 36 L 142 46 Z" fill="#b06a45"/><g fill="#ffd97a"><rect x="101" y="64" width="5" height="6" rx="1"/><rect x="101" y="76" width="5" height="6" rx="1"/><rect x="126" y="54" width="5" height="6" rx="1"/><rect x="133" y="66" width="5" height="6" rx="1"/><rect x="126" y="76" width="5" height="6" rx="1"/><rect x="153" y="62" width="5" height="6" rx="1"/><rect x="153" y="74" width="5" height="6" rx="1"/></g></g>
        <path d="M 0 108 Q 90 98 180 106 T 272 104 L 272 120 L 0 120 Z" fill="#5e4238"/>
        <g fill="#ffd97a" opacity="0.9"><circle cx="52" cy="102" r="1.5"/><circle cx="226" cy="100" r="1.5"/></g>
        </svg>
      );

    case "rainbow":
      // Promise arc: full double rainbow between cloud banks
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`rb-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#dcecf7"/><stop offset="1" stopColor="#fdf3dd"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#rb-sky-${uid})`} />
        <g fill="none" strokeLinecap="round"><path d="M 26 120 A 110 110 0 0 1 246 120" stroke="#e66a5c" strokeWidth="9"/><path d="M 35 120 A 101 101 0 0 1 237 120" stroke="#f4a259" strokeWidth="8"/><path d="M 44 120 A 92 92 0 0 1 228 120" stroke="#f7d154" strokeWidth="8"/><path d="M 53 120 A 83 83 0 0 1 219 120" stroke="#8fc93a" strokeWidth="8"/><path d="M 62 120 A 74 74 0 0 1 210 120" stroke="#62a8dc" strokeWidth="8"/><path d="M 71 120 A 65 65 0 0 1 201 120" stroke="#9d80c4" strokeWidth="8"/></g>
        <g fill="#ffffff"><ellipse cx="30" cy="104" rx="26" ry="11"/><ellipse cx="52" cy="110" rx="22" ry="10"/><ellipse cx="12" cy="112" rx="18" ry="9"/><ellipse cx="242" cy="104" rx="26" ry="11"/><ellipse cx="222" cy="112" rx="20" ry="9"/><ellipse cx="262" cy="112" rx="18" ry="9"/></g>
        <circle cx="234" cy="18" r="12" fill="#ffe8a0" opacity="0.9"/>
        <g stroke="#8a9bb0" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7"><path d="M 60 22 q 3 -3 6 0 q 3 -3 6 0"/><path d="M 104 34 q 3 -3 6 0 q 3 -3 6 0"/></g>
        <g fill="#9fcbe4" opacity="0.8"><path d="M 150 18 q 3 6 0 8 q -3 -2 0 -8 Z"/><path d="M 178 30 q 3 6 0 8 q -3 -2 0 -8 Z"/><path d="M 120 12 q 3 6 0 8 q -3 -2 0 -8 Z"/></g>
        </svg>
      );

    case "fruit_vine":
      // Arbor harvest: laden vine across the trellis, basket below
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`fv-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f2f7dd"/><stop offset="1" stopColor="#fdf3dd"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#fv-sky-${uid})`} />
        <g stroke="#a9713f" strokeWidth="3" strokeLinecap="round"><path d="M 0 16 Q 68 8 136 14 T 272 12"/></g>
        <g stroke="#6d9e4f" strokeWidth="2" fill="none" strokeLinecap="round"><path d="M 30 15 q 6 10 0 18"/><path d="M 108 14 q -6 10 0 18"/><path d="M 190 13 q 6 10 0 18"/><path d="M 252 12 q -5 9 0 16"/></g>
        <g fill="#7fbd72"><path d="M 44 22 q 10 -2 12 8 q -10 2 -12 -8 Z"/><path d="M 92 26 q -10 -2 -12 8 q 10 2 12 -8 Z"/><path d="M 160 22 q 10 -2 12 8 q -10 2 -12 -8 Z"/><path d="M 226 24 q -10 -2 -12 8 q 10 2 12 -8 Z"/></g>
        <g fill="#8a6bbf"><circle cx="66" cy="38" r="4"/><circle cx="73" cy="42" r="4"/><circle cx="59" cy="42" r="4"/><circle cx="66" cy="47" r="4"/><circle cx="62" cy="35" r="3.4"/><circle cx="70" cy="35" r="3.4"/></g>
        <g fill="#7b5aa6"><circle cx="206" cy="36" r="4"/><circle cx="213" cy="40" r="4"/><circle cx="199" cy="40" r="4"/><circle cx="206" cy="45" r="4"/></g>
        <path d="M 0 102 Q 80 92 160 100 T 272 96 L 272 120 L 0 120 Z" fill="#a9d59b"/>
        <g transform="translate(116,88)"><path d="M 0 8 L 40 8 L 34 26 L 6 26 Z" fill="#c9974f" stroke="#a3773a" strokeWidth="1.6"/><path d="M 4 8 Q 20 -4 36 8" fill="none" stroke="#a3773a" strokeWidth="2.4"/><g stroke="#a3773a" strokeWidth="1.1" opacity="0.7"><line x1="6" y1="14" x2="35" y2="14"/><line x1="7" y1="20" x2="33" y2="20"/></g><circle cx="13" cy="5" r="4" fill="#e66a5c"/><circle cx="22" cy="3" r="4" fill="#ffd166"/><circle cx="30" cy="5" r="4" fill="#8fc93a"/></g>
        <g stroke="#5f9c52" strokeWidth="1.6" strokeLinecap="round" opacity="0.9"><path d="M 40 112 l 0 -6 M 37 112 l -2 -4 M 43 112 l 2 -4"/><path d="M 232 110 l 0 -6 M 229 110 l -2 -4 M 235 110 l 2 -4"/></g>
        </svg>
      );

    case "calm_waters":
      // Still lake: mirror water, reeds, drifting duck at rest
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`cw-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#dceff2"/><stop offset="1" stopColor="#f6f3de"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#cw-sky-${uid})`} />
        <circle cx="224" cy="18" r="12" fill="#ffe8a0" opacity="0.85"/>
        <g fill="#ffffff" opacity="0.9"><ellipse cx="70" cy="16" rx="18" ry="6"/><ellipse cx="86" cy="12" rx="11" ry="5"/><ellipse cx="160" cy="24" rx="13" ry="5"/></g>
        <path d="M 0 58 Q 70 46 140 54 T 272 50 L 272 78 L 0 78 Z" fill="#b5d3b0"/>
        <rect x="0" y="76" width="272" height="44" fill="#a8cfe3"/>
        <path d="M 0 76 Q 68 72 136 76 T 272 76 L 272 80 Q 204 84 136 80 T 0 80 Z" fill="#c3dfee"/>
        <g stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.85"><line x1="40" y1="92" x2="66" y2="92"/><line x1="150" y1="100" x2="172" y2="100"/><line x1="216" y1="90" x2="238" y2="90"/><line x1="96" y1="108" x2="116" y2="108"/></g>
        <g transform="translate(160,68)"><ellipse cx="12" cy="12" rx="10" ry="6.5" fill="#c9974f"/><circle cx="22" cy="6" r="4.5" fill="#8a5a3b"/><polygon points="26,5 31,7 26,8.5" fill="#f4a259"/><path d="M 6 10 q 5 -4 10 0" stroke="#a3773a" strokeWidth="1.4" fill="none"/><path d="M 2 20 q 10 3 20 0" stroke="#8fb8d4" strokeWidth="1.4" fill="none" opacity="0.8"/></g>
        <g stroke="#5f9c52" strokeWidth="2.2" strokeLinecap="round"><line x1="24" y1="76" x2="22" y2="56"/><line x1="32" y1="76" x2="32" y2="52"/><line x1="40" y1="76" x2="42" y2="58"/></g>
        <ellipse cx="33" cy="53" rx="3" ry="6" fill="#8a5a3b"/>
        <g><ellipse cx="248" cy="104" rx="10" ry="4" fill="#7fbd72"/><path d="M 248 104 l 6 -3" stroke="#5f9c52" strokeWidth="1.3"/><circle cx="244" cy="100" r="2.2" fill="#e88bb1"/></g>
        </svg>
      );

    case "eagle_wings":
      // Canyon thermals: eagle soaring over golden mesas
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`ew-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fdeecd"/><stop offset="1" stopColor="#f4c98e"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#ew-sky-${uid})`} />
        <circle cx="46" cy="18" r="13" fill="#ffe08a"/>
        <g stroke="#f3c95f" strokeWidth="2" strokeLinecap="round" opacity="0.5"><line x1="20" y1="10" x2="12" y2="3"/><line x1="70" y1="8" x2="76" y2="1"/></g>
        <g fill="#ffffff" opacity="0.75"><ellipse cx="200" cy="14" rx="16" ry="5"/><ellipse cx="130" cy="24" rx="12" ry="4"/></g>
        <g transform="translate(140,26)" fill="#7a4a26"><path d="M 30 16 C 16 0 -6 4 -6 4 C 8 14 20 18 30 19 Z"/><path d="M 30 16 C 44 0 66 4 66 4 C 52 14 40 18 30 19 Z"/><ellipse cx="30" cy="19" rx="5" ry="9" fill="#5e3517"/><circle cx="30" cy="8" r="4.4" fill="#fef0c2"/><polygon points="30,6 34,8.5 30,11" fill="#f59e0b"/><path d="M 26 27 l 8 0 l -4 6 Z" fill="#5e3517"/></g>
        <g stroke="#e0b070" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.7"><path d="M 96 44 q 8 -6 16 0"/><path d="M 210 50 q 8 -6 16 0"/></g>
        <path d="M 0 92 L 34 66 L 68 92 Z" fill="#c98a4b" opacity="0.85"/>
        <path d="M 190 96 L 226 62 L 262 96 Z" fill="#b3763c" opacity="0.85"/>
        <path d="M 0 96 Q 90 86 180 94 T 272 92 L 272 120 L 0 120 Z" fill="#d9a25f"/>
        <path d="M 0 110 Q 100 102 200 108 T 272 106 L 272 120 L 0 120 Z" fill="#c08a48"/>
        <g stroke="#8a6b3a" strokeWidth="1.6" strokeLinecap="round" opacity="0.8"><path d="M 60 108 l 0 -8 M 56 104 l 4 -4 M 64 104 l -4 -4"/><path d="M 216 112 l 0 -8 M 212 108 l 4 -4 M 220 108 l -4 -4"/></g>
        </svg>
      );

    case "gospel_world":
      // Good news travels: globe, radiating light, messenger doves
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`gw-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#dcecf7"/><stop offset="1" stopColor="#fdf0d5"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#gw-sky-${uid})`} />
        <g stroke="#ffd166" strokeWidth="2" strokeLinecap="round" opacity="0.7"><line x1="136" y1="8" x2="136" y2="20"/><line x1="102" y1="14" x2="110" y2="24"/><line x1="170" y1="14" x2="162" y2="24"/><line x1="86" y1="34" x2="98" y2="38"/><line x1="186" y1="34" x2="174" y2="38"/></g>
        <g transform="translate(102,28)"><circle cx="34" cy="34" r="32" fill="#9fcbe4" stroke="#5b93bb" strokeWidth="2.5"/><path d="M 18 16 q 12 -8 22 0 q -2 10 -12 10 q -10 -2 -10 -10 Z" fill="#8fc06a"/><path d="M 44 30 q 12 2 14 12 q -8 8 -16 2 q -2 -8 2 -14 Z" fill="#8fc06a"/><path d="M 14 40 q 8 2 8 10 q -6 4 -10 -2 q -2 -5 2 -8 Z" fill="#8fc06a"/><path d="M 2 34 Q 34 26 66 34" fill="none" stroke="#7db3d3" strokeWidth="1.4" opacity="0.8"/><ellipse cx="34" cy="34" rx="14" ry="32" fill="none" stroke="#7db3d3" strokeWidth="1.4" opacity="0.8"/></g>
        <g fill="#ffffff" stroke="#c9d4de" strokeWidth="1.1"><path d="M 52 34 q 4 -8 12 -6 q -2 6 -8 8 q 6 2 4 6 q -8 0 -8 -8 Z"/><path d="M 216 40 q -4 -8 -12 -6 q 2 6 8 8 q -6 2 -4 6 q 8 0 8 -8 Z"/></g>
        <path d="M 0 106 Q 68 98 136 104 T 272 100 L 272 120 L 0 120 Z" fill="#a9d59b"/>
        <g stroke="#5f9c52" strokeWidth="1.6" strokeLinecap="round" opacity="0.9"><path d="M 60 114 l 0 -6 M 57 114 l -2 -4 M 63 114 l 2 -4"/><path d="M 212 112 l 0 -6 M 209 112 l -2 -4 M 215 112 l 2 -4"/></g>
        </svg>
      );

    case "hope_heaven":
      // Daybreak glory: sunburst through clouds, golden crown
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`hh-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe9c2"/><stop offset="0.6" stopColor="#ffd9a0"/><stop offset="1" stopColor="#fdf3dd"/></linearGradient>
          <radialGradient id={`hh-burst-${uid}`} cx="0.5" cy="0.2" r="0.7"><stop offset="0" stopColor="#fff3c4" stopOpacity="0.95"/><stop offset="1" stopColor="#fff3c4" stopOpacity="0"/></radialGradient>
        </defs>
        <rect width="272" height="120" fill={`url(#hh-sky-${uid})`} />
        <circle cx="136" cy="20" r="70" fill={`url(#hh-burst-${uid})`}/>
        <g stroke="#ffd166" strokeWidth="2.4" strokeLinecap="round" opacity="0.75"><line x1="136" y1="30" x2="136" y2="52"/><line x1="112" y1="34" x2="100" y2="52"/><line x1="160" y1="34" x2="172" y2="52"/><line x1="94" y1="24" x2="76" y2="34"/><line x1="178" y1="24" x2="196" y2="34"/></g>
        <g transform="translate(112,4)"><polygon points="0,26 8,8 17,20 24,4 31,20 40,8 48,26" fill="#ffd166" stroke="#d49b10" strokeWidth="2"/><rect x="0" y="24" width="48" height="7" rx="2" fill="#ffd166" stroke="#d49b10" strokeWidth="2"/><circle cx="24" cy="10" r="2.6" fill="#e63946"/><circle cx="9" cy="14" r="2" fill="#3e7cb1"/><circle cx="39" cy="14" r="2" fill="#5c8a3a"/></g>
        <g fill="#ffffff"><ellipse cx="40" cy="68" rx="30" ry="10"/><ellipse cx="66" cy="74" rx="24" ry="9"/><ellipse cx="232" cy="66" rx="28" ry="10"/><ellipse cx="208" cy="74" rx="22" ry="9"/></g>
        <g fill="#fff8e7"><circle cx="60" cy="34" r="1.8"/><circle cx="212" cy="30" r="1.8"/><circle cx="86" cy="16" r="1.4"/><circle cx="188" cy="14" r="1.4"/></g>
        <path d="M 0 106 Q 90 96 180 104 T 272 100 L 272 120 L 0 120 Z" fill="#f2d9a4"/>
        <g stroke="#e9a13b" strokeWidth="1.4" strokeLinecap="round" opacity="0.9"><path d="M 70 112 l 0 -6 M 67 115 l 6 -6"/><path d="M 206 110 l 0 -6 M 203 113 l 6 -6"/></g>
        </svg>
      );

    case "starry_sky":
    default:
      // Warm twilight: amber horizon, crescent, cypress silhouettes, fireflies
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 272 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id={`tw-sky-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5b4a80"/><stop offset="0.55" stopColor="#8a6bb0"/><stop offset="0.85" stopColor="#d78f6c"/><stop offset="1" stopColor="#f2b268"/></linearGradient></defs>
        <rect width="272" height="120" fill={`url(#tw-sky-${uid})`} />
        <path d="M 226 12 C 208 12 199 27 199 39 C 199 51 210 62 226 62 C 215 55 212 38 220 24 C 222 19 226 14 230 12 Z" fill="#ffdf7e"/>
        <g fill="#fff8e7"><circle cx="30" cy="16" r="2.2"/><circle cx="66" cy="34" r="1.6"/><circle cx="104" cy="14" r="2.6"/><circle cx="140" cy="40" r="1.5"/><circle cx="168" cy="20" r="1.8"/><circle cx="88" cy="52" r="1.4"/><circle cx="252" cy="70" r="1.5"/></g>
        <g stroke="#fff3c4" strokeWidth="1.4" strokeLinecap="round" opacity="0.9"><path d="M 52 8 l 0 8 M 48 12 l 8 0"/><path d="M 128 26 l 0 7 M 124.5 29.5 l 7 0"/><path d="M 246 14 l 0 6 M 243 17 l 6 0"/></g>
        <g fill="#f7c98d" opacity="0.5"><ellipse cx="60" cy="72" rx="30" ry="3"/><ellipse cx="190" cy="80" rx="38" ry="3"/></g>
        <path d="M 0 96 Q 60 82 120 92 T 272 88 L 272 120 L 0 120 Z" fill="#4a3a68"/>
        <path d="M 0 108 Q 80 96 160 106 T 272 102 L 272 120 L 0 120 Z" fill="#3a2d52"/>
        <g fill="#3a2d52"><path d="M 226 96 q 6 -18 0 -30 q 10 8 6 30 Z"/><rect x="227" y="94" width="3" height="10" rx="1"/></g>
        <g fill="#2e2342"><path d="M 40 108 q 5 -14 0 -24 q 9 7 5 24 Z"/><rect x="41" y="106" width="2.6" height="9" rx="1"/></g>
        <g fill="#ffd97a"><circle cx="96" cy="102" r="1.6"/><circle cx="122" cy="110" r="1.3"/><circle cx="70" cy="106" r="1.2"/><circle cx="176" cy="104" r="1.5"/></g>
        </svg>
      );

  }
}
