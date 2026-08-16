/* ============================================================
   MEMORY MATCH — Content-Unique Cartoon Micro-Illustrations
   Lightweight, child-friendly vector SVG scenes tailored to
   each verse's specific imagery. Prohibits depictions of Jesus
   per Constitution Article 1.2.
   ============================================================ */

import { useId } from "react";

export function PairIllustration({ art = "creation" }) {
  // Both cards of a pair render the same scene, so gradient IDs must be
  // unique per component instance to keep the DOM valid
  const uid = useId();
  switch (art) {
    case "shepherd":
      // Rolling meadow hills, cute fluffy lamb, wooden crook
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`shep-sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4edda" />
              <stop offset="100%" stopColor="#f8fdf9" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#shep-sky-${uid})`} />
          {/* Rolling hills */}
          <ellipse cx="40" cy="115" rx="70" ry="40" fill="#a8d5a2" opacity="0.6" />
          <ellipse cx="120" cy="110" rx="80" ry="45" fill="#88c580" opacity="0.6" />
          {/* Shepherd crook */}
          <path d="M 135 45 C 135 32 148 32 148 42 L 148 85" fill="none" stroke="#a07855" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
          {/* Fluffy sheep */}
          <g transform="translate(18, 56) scale(0.65)" opacity="0.85">
            <circle cx="20" cy="20" r="10" fill="#ffffff" stroke="#c0d0c0" strokeWidth="1.5" />
            <circle cx="28" cy="16" r="9" fill="#ffffff" stroke="#c0d0c0" strokeWidth="1.5" />
            <circle cx="36" cy="20" r="10" fill="#ffffff" stroke="#c0d0c0" strokeWidth="1.5" />
            <circle cx="28" cy="25" r="9" fill="#ffffff" stroke="#c0d0c0" strokeWidth="1.5" />
            <circle cx="18" cy="25" r="8" fill="#ffffff" stroke="#c0d0c0" strokeWidth="1.5" />
            {/* Sheep head */}
            <circle cx="44" cy="20" r="7" fill="#4a403a" />
            <ellipse cx="42" cy="15" rx="3" ry="5" fill="#4a403a" transform="rotate(-30 42 15)" />
            <circle cx="45" cy="19" r="1" fill="#fff" />
            {/* Legs */}
            <rect x="22" y="32" width="2.5" height="8" rx="1" fill="#4a403a" />
            <rect x="32" y="32" width="2.5" height="8" rx="1" fill="#4a403a" />
          </g>
          {/* Daisy */}
          <circle cx="85" cy="80" r="2.5" fill="#ffd166" opacity="0.8" />
          <circle cx="85" cy="76" r="1.5" fill="#ffffff" opacity="0.8" />
          <circle cx="89" cy="80" r="1.5" fill="#ffffff" opacity="0.8" />
          <circle cx="85" cy="84" r="1.5" fill="#ffffff" opacity="0.8" />
          <circle cx="81" cy="80" r="1.5" fill="#ffffff" opacity="0.8" />
        </svg>
      );

    case "lamp":
      // Ancient clay lamp radiating warm golden light on a path
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id={`lamp-glow-${uid}`} cx="80" cy="45" r="60" fx="80" fy="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#fed976" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#fdf6e2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="160" height="100" fill="#fdfbf5" />
          <rect width="160" height="100" fill={`url(#lamp-glow-${uid})`} />
          {/* Stone stepping path */}
          <path d="M 0 95 Q 80 85 160 90 L 160 100 L 0 100 Z" fill="#e8dacb" opacity="0.5" />
          <ellipse cx="50" cy="92" rx="14" ry="4" fill="#d4c2b0" opacity="0.6" />
          <ellipse cx="110" cy="91" rx="16" ry="4" fill="#d4c2b0" opacity="0.6" />
          {/* Clay oil lamp */}
          <g transform="translate(112, 48) scale(0.65)" opacity="0.85">
            {/* Lamp base */}
            <ellipse cx="30" cy="35" rx="20" ry="10" fill="#c07d4b" />
            <path d="M 12 35 C 12 28 35 26 48 30 C 58 33 60 28 62 25 C 61 35 52 40 44 42 Z" fill="#b06c3b" />
            {/* Handle */}
            <path d="M 15 32 C 5 28 5 42 16 40" fill="none" stroke="#8d4f24" strokeWidth="3" strokeLinecap="round" />
            {/* Glowing flame */}
            <circle cx="62" cy="22" r="10" fill="#ffd166" opacity="0.5" />
            <path d="M 62 14 C 65 19 65 24 62 27 C 59 24 59 19 62 14 Z" fill="#e63946" />
            <path d="M 62 17 C 64 20 64 23 62 25 C 60 23 60 20 62 17 Z" fill="#ffbe0b" />
          </g>
          {/* Soft sparkles */}
          <circle cx="45" cy="35" r="2" fill="#ffbe0b" opacity="0.6" />
          <circle cx="35" cy="48" r="1.5" fill="#ffbe0b" opacity="0.5" />
        </svg>
      );

    case "creation":
      // Sunny skies, sunburst, blue earth & green nature
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`cre-sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="100%" stopColor="#fef3c7" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#cre-sky-${uid})`} />
          {/* Sun with rays */}
          <circle cx="135" cy="25" r="16" fill="#fde047" opacity="0.8" />
          <circle cx="135" cy="25" r="24" fill="#fef08a" opacity="0.4" />
          {/* Green hills */}
          <circle cx="20" cy="120" rx="90" ry="50" fill="#86efac" opacity="0.5" />
          <circle cx="140" cy="115" rx="80" ry="45" fill="#4ade80" opacity="0.4" />
          {/* Cute cartoon plant sprout */}
          <g transform="translate(18, 55) scale(0.65)" opacity="0.8">
            <path d="M 20 40 Q 20 20 28 12" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="28" cy="12" rx="7" ry="4" fill="#4ade80" transform="rotate(-30 28 12)" />
            <ellipse cx="14" cy="20" rx="6" ry="3.5" fill="#22c55e" transform="rotate(35 14 20)" />
          </g>
        </svg>
      );

    case "dove_peace":
      // Gentle white dove with olive leaf soaring through pastel clouds
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`dove-sky-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#fdf2f8" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#dove-sky-${uid})`} />
          {/* Clouds */}
          <ellipse cx="30" cy="80" rx="40" ry="20" fill="#ffffff" opacity="0.75" />
          <ellipse cx="140" cy="85" rx="35" ry="18" fill="#ffffff" opacity="0.7" />
          {/* Dove */}
          <g transform="translate(100, 30) scale(0.65)" opacity="0.85">
            {/* Wings */}
            <path d="M 25 25 C 20 10 35 2 48 5 C 38 15 32 20 25 25 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M 20 25 C 10 12 25 6 36 10 C 28 18 24 22 20 25 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            {/* Body */}
            <ellipse cx="25" cy="28" rx="14" ry="7" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            {/* Head */}
            <circle cx="38" cy="24" r="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            {/* Beak & Olive branch */}
            <polygon points="42,23 48,25 42,27" fill="#f59e0b" />
            <path d="M 46 25 Q 52 28 58 24" fill="none" stroke="#15803d" strokeWidth="1.5" />
            <ellipse cx="53" cy="25" rx="3" ry="1.5" fill="#4ade80" transform="rotate(-20 53 25)" />
            <ellipse cx="57" cy="23" rx="2.5" ry="1.5" fill="#4ade80" transform="rotate(30 57 23)" />
          </g>
        </svg>
      );

    case "armor_shield":
      // Gleaming knight shield of faith & fortress stones
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`arm-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#arm-bg-${uid})`} />
          {/* Stone battlements */}
          <rect x="0" y="82" width="160" height="18" fill="#cbd5e1" opacity="0.6" />
          <rect x="20" y="74" width="22" height="10" fill="#cbd5e1" opacity="0.6" />
          <rect x="65" y="74" width="22" height="10" fill="#cbd5e1" opacity="0.6" />
          <rect x="110" y="74" width="22" height="10" fill="#cbd5e1" opacity="0.6" />
          {/* Shield */}
          <g transform="translate(110, 25) scale(0.65)" opacity="0.85">
            <path d="M 10 5 L 45 5 C 45 35 35 52 27 58 C 19 52 10 35 10 5 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
            <path d="M 14 9 L 41 9 C 41 33 33 48 27 52 C 21 48 14 33 14 9 Z" fill="#60a5fa" />
            {/* Cross emblem */}
            <rect x="24.5" y="16" width="6" height="26" rx="1" fill="#fef08a" />
            <rect x="17" y="23" width="21" height="6" rx="1" fill="#fef08a" />
          </g>
          {/* Sparkles */}
          <circle cx="95" cy="30" r="2" fill="#fbbf24" opacity="0.7" />
          <circle cx="85" cy="45" r="1.5" fill="#fbbf24" opacity="0.6" />
        </svg>
      );

    case "praise_harp":
      // Golden harp, musical notes and sunshine
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`harp-sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fffbeb" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#harp-sky-${uid})`} />
          {/* Sunburst rays */}
          <path d="M 0 0 L 40 100 M 0 0 L 80 100 M 0 0 L 120 100" stroke="#fde68a" strokeWidth="2" opacity="0.4" />
          {/* Golden Harp */}
          <g transform="translate(108, 22) scale(0.65)" opacity="0.85">
            <path d="M 12 55 C 12 15 45 10 52 18 C 55 22 45 28 36 28 C 36 55 30 58 12 55 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
            <line x1="22" y1="26" x2="20" y2="54" stroke="#d97706" strokeWidth="1.5" />
            <line x1="27" y1="27" x2="24" y2="54" stroke="#d97706" strokeWidth="1.5" />
            <line x1="32" y1="28" x2="28" y2="54" stroke="#d97706" strokeWidth="1.5" />
          </g>
          {/* Musical Notes */}
          <g transform="translate(15, 30)" opacity="0.75" fill="#f59e0b">
            <circle cx="10" cy="20" r="3" />
            <rect x="12" y="8" width="2" height="12" />
            <path d="M 14 8 C 18 8 20 12 20 14 L 14 11 Z" />
            <circle cx="28" cy="35" r="2.5" />
            <rect x="30" y="24" width="1.5" height="11" />
          </g>
        </svg>
      );

    case "love_heart":
      // Warm glowing hearts & floral blossoms
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`love-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdf2f8" />
              <stop offset="100%" stopColor="#ffe4e6" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#love-bg-${uid})`} />
          {/* Main Heart */}
          <g transform="translate(112, 30) scale(0.65)" opacity="0.85">
            <path d="M 28 12 C 28 5 18 2 12 8 C 6 2 -4 5 -4 12 C -4 22 12 36 12 36 C 12 36 28 22 28 12 Z" fill="#fb7185" stroke="#e11d48" strokeWidth="2" />
            <path d="M 40 28 C 40 24 34 22 30 26 C 26 22 20 24 20 28 C 20 34 30 42 30 42 C 30 42 40 34 40 28 Z" fill="#fda4af" />
          </g>
          {/* Flowers */}
          <circle cx="25" cy="75" r="4" fill="#f43f5e" opacity="0.7" />
          <circle cx="25" cy="75" r="2" fill="#fef08a" opacity="0.8" />
          <circle cx="45" cy="85" r="3" fill="#fb7185" opacity="0.6" />
        </svg>
      );

    case "wisdom_scroll":
      // Royal ancient scroll with wax seal and jewel
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`wis-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#ede9fe" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#wis-bg-${uid})`} />
          {/* Ancient Scroll */}
          <g transform="translate(105, 26) scale(0.65)" opacity="0.85">
            <rect x="10" y="15" width="45" height="35" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <line x1="16" y1="24" x2="48" y2="24" stroke="#d97706" strokeWidth="1.5" opacity="0.5" />
            <line x1="16" y1="31" x2="44" y2="31" stroke="#d97706" strokeWidth="1.5" opacity="0.5" />
            <line x1="16" y1="38" x2="40" y2="38" stroke="#d97706" strokeWidth="1.5" opacity="0.5" />
            {/* Scroll rolls */}
            <ellipse cx="10" cy="32" rx="4" ry="18" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
            <ellipse cx="55" cy="32" rx="4" ry="18" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
            {/* Wax seal */}
            <circle cx="32" cy="42" r="6" fill="#dc2626" />
            <circle cx="32" cy="42" r="3.5" fill="#b91c1c" />
          </g>
          {/* Shining Jewel */}
          <polygon points="25,40 32,32 39,40 32,48" fill="#a855f7" opacity="0.75" />
          <circle cx="48" cy="30" r="2" fill="#c084fc" opacity="0.6" />
        </svg>
      );

    case "light_city":
      // Radiant city on a hill shining across the horizon
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`city-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#ffedd5" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#city-bg-${uid})`} />
          {/* Hilltop */}
          <ellipse cx="130" cy="100" rx="60" ry="35" fill="#78716c" opacity="0.4" />
          {/* City buildings */}
          <g transform="translate(100, 32) scale(0.65)" opacity="0.85">
            <rect x="10" y="20" width="14" height="25" fill="#ffffff" stroke="#57534e" strokeWidth="1.5" />
            <rect x="24" y="10" width="18" height="35" fill="#ffffff" stroke="#57534e" strokeWidth="1.5" />
            <rect x="42" y="22" width="12" height="23" fill="#ffffff" stroke="#57534e" strokeWidth="1.5" />
            {/* Glowing windows */}
            <rect x="29" y="15" width="4" height="6" rx="1" fill="#facc15" />
            <rect x="29" y="25" width="4" height="6" rx="1" fill="#facc15" />
            <rect x="14" y="26" width="3" height="4" rx="1" fill="#facc15" />
            <rect x="45" y="28" width="3" height="4" rx="1" fill="#facc15" />
          </g>
          {/* Golden beacon rays */}
          <circle cx="120" cy="30" r="30" fill="#fef08a" opacity="0.4" />
          <circle cx="120" cy="30" r="14" fill="#fde047" opacity="0.6" />
        </svg>
      );

    case "rainbow":
      // Cheerful rainbow over soft clouds
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`rb-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#f0fdf4" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#rb-bg-${uid})`} />
          {/* Rainbow arcs */}
          <g transform="translate(70, 85)" opacity="0.75" fill="none" strokeWidth="4">
            <ellipse cx="0" cy="0" rx="55" ry="55" stroke="#ef4444" />
            <ellipse cx="0" cy="0" rx="51" ry="51" stroke="#f97316" />
            <ellipse cx="0" cy="0" rx="47" ry="47" stroke="#eab308" />
            <ellipse cx="0" cy="0" rx="43" ry="43" stroke="#22c55e" />
            <ellipse cx="0" cy="0" rx="39" ry="39" stroke="#3b82f6" />
            <ellipse cx="0" cy="0" rx="35" ry="35" stroke="#a855f7" />
          </g>
          {/* Fluffy clouds */}
          <ellipse cx="15" cy="85" rx="30" ry="16" fill="#ffffff" opacity="0.8" />
          <ellipse cx="125" cy="85" rx="35" ry="18" fill="#ffffff" opacity="0.8" />
        </svg>
      );

    case "fruit_vine":
      // Grapes cluster & green vine
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`vine-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0fdf4" />
              <stop offset="100%" stopColor="#dcfce7" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#vine-bg-${uid})`} />
          {/* Vine branch */}
          <path d="M 160 10 Q 120 25 100 45" fill="none" stroke="#854d0e" strokeWidth="3" opacity="0.7" />
          <path d="M 125 22 Q 110 15 95 20" fill="none" stroke="#854d0e" strokeWidth="2" opacity="0.7" />
          {/* Leaves */}
          <ellipse cx="120" cy="20" rx="10" ry="6" fill="#22c55e" opacity="0.8" transform="rotate(-25 120 20)" />
          <ellipse cx="98" cy="26" rx="8" ry="5" fill="#16a34a" opacity="0.8" transform="rotate(35 98 26)" />
          {/* Grape cluster */}
          <g transform="translate(102, 38) scale(0.65)" opacity="0.85" fill="#8b5cf6">
            <circle cx="10" cy="10" r="5" />
            <circle cx="18" cy="10" r="5" />
            <circle cx="26" cy="10" r="5" />
            <circle cx="14" cy="17" r="5" />
            <circle cx="22" cy="17" r="5" />
            <circle cx="18" cy="24" r="5" />
          </g>
          {/* Apple */}
          <circle cx="25" cy="75" r="7" fill="#ef4444" opacity="0.75" />
          <ellipse cx="27" cy="67" rx="3" ry="1.5" fill="#22c55e" opacity="0.8" transform="rotate(-30 27 67)" />
        </svg>
      );

    case "calm_waters":
      // Peaceful turquoise waves & sailboat
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`water-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#water-bg-${uid})`} />
          {/* Gentle waves */}
          <path d="M 0 75 Q 40 68 80 75 T 160 75 L 160 100 L 0 100 Z" fill="#38bdf8" opacity="0.5" />
          <path d="M 0 85 Q 40 80 80 85 T 160 85 L 160 100 L 0 100 Z" fill="#0284c7" opacity="0.4" />
          {/* Sailboat */}
          <g transform="translate(108, 40) scale(0.65)" opacity="0.85">
            {/* Hull */}
            <path d="M 5 30 L 35 30 L 28 38 L 12 38 Z" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />
            {/* Mast */}
            <line x1="20" y1="8" x2="20" y2="30" stroke="#78350f" strokeWidth="2" />
            {/* White Sails */}
            <polygon points="20,10 32,26 20,26" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points="18,12 8,26 18,26" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          </g>
        </svg>
      );

    case "eagle_wings":
      // Golden eagle soaring across mountain sunrise
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`eagle-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="100%" stopColor="#fed7aa" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#eagle-bg-${uid})`} />
          {/* Distant mountain peaks */}
          <polygon points="0,100 45,55 90,100" fill="#9a3412" opacity="0.25" />
          <polygon points="60,100 110,48 160,100" fill="#7c2d12" opacity="0.3" />
          {/* Soaring Eagle */}
          <g transform="translate(100, 22) scale(0.65)" opacity="0.85" fill="#78350f">
            {/* Broad Wings */}
            <path d="M 25 20 C 15 5 0 8 0 8 C 10 16 18 20 25 22 Z" />
            <path d="M 25 20 C 35 5 50 8 50 8 C 40 16 32 20 25 22 Z" />
            {/* Body and head */}
            <ellipse cx="25" cy="22" rx="4" ry="8" fill="#451a03" />
            <circle cx="25" cy="14" r="3.5" fill="#fef08a" />
            <polygon points="25,12 28,14 25,16" fill="#f59e0b" />
          </g>
        </svg>
      );

    case "gospel_world":
      // Compass & globe sharing good news
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`gosp-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#gosp-bg-${uid})`} />
          {/* Earth Globe */}
          <g transform="translate(108, 25) scale(0.65)" opacity="0.85">
            <circle cx="28" cy="28" r="22" fill="#60a5fa" stroke="#2563eb" strokeWidth="2" />
            {/* Continents */}
            <path d="M 15 22 Q 22 12 32 18 Q 28 28 20 32 Z" fill="#4ade80" />
            <path d="M 32 26 Q 42 24 45 36 Q 35 44 28 38 Z" fill="#4ade80" />
          </g>
          {/* Compass Rose */}
          <g transform="translate(20, 45)" opacity="0.65">
            <circle cx="15" cy="15" r="10" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="15,6 18,15 15,13" fill="#ef4444" />
            <polygon points="15,24 18,15 15,17" fill="#3b82f6" />
          </g>
        </svg>
      );

    case "hope_heaven":
      // Golden crown & pearly heavenly gates
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`hope-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fae8ff" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#hope-bg-${uid})`} />
          {/* Golden Crown */}
          <g transform="translate(108, 26) scale(0.65)" opacity="0.85">
            <polygon points="5,42 10,18 22,28 32,12 42,28 54,18 59,42" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <rect x="5" y="42" width="54" height="7" rx="2" fill="#d97706" />
            {/* Jewels on crown */}
            <circle cx="10" cy="18" r="2.5" fill="#ef4444" />
            <circle cx="32" cy="12" r="3.5" fill="#3b82f6" />
            <circle cx="54" cy="18" r="2.5" fill="#10b981" />
          </g>
          {/* Golden rays & sparkles */}
          <circle cx="35" cy="35" r="2.5" fill="#eab308" opacity="0.75" />
          <circle cx="50" cy="48" r="1.5" fill="#eab308" opacity="0.6" />
        </svg>
      );

    case "starry_sky":
    default:
      // Night sky, crescent moon & twinkling stars
      return (
        <svg className="mm-card-bg-ill" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`star-bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#star-bg-${uid})`} />
          {/* Crescent Moon */}
          <g transform="translate(118, 22) scale(0.65)" opacity="0.85">
            <path d="M 25 5 C 12 5 5 18 5 28 C 5 38 14 48 26 48 C 18 42 16 28 22 16 C 24 12 28 8 30 6 C 28 5 26 5 25 5 Z" fill="#fde047" />
          </g>
          {/* Twinkling Stars */}
          <circle cx="25" cy="25" r="2" fill="#ffffff" opacity="0.8" />
          <circle cx="45" cy="40" r="1.5" fill="#fde047" opacity="0.9" />
          <circle cx="85" cy="20" r="2.5" fill="#ffffff" opacity="0.85" />
          <circle cx="70" cy="45" r="1.5" fill="#ffffff" opacity="0.75" />
          <circle cx="95" cy="55" r="2" fill="#fde047" opacity="0.8" />
        </svg>
      );
  }
}
