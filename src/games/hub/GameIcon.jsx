/* Hand-drawn doodle icons for the hub game cards — same procedural-SVG
   craft language as the verse portraits, instead of platform-dependent emoji. */
export function GameIcon({ kind, size = 40 }) {
  const icons = {
    /* Verse Builder: craft scissors */
    scissors: (
      <g>
        <circle cx="20" cy="46" r="8" fill="none" stroke="#d94f30" strokeWidth="4.5" />
        <circle cx="44" cy="46" r="8" fill="none" stroke="#d94f30" strokeWidth="4.5" />
        <line x1="24" y1="40" x2="46" y2="10" stroke="#82828c" strokeWidth="5" strokeLinecap="round" />
        <line x1="40" y1="40" x2="18" y2="10" stroke="#b4b4be" strokeWidth="5" strokeLinecap="round" />
        <circle cx="32" cy="30" r="3" fill="#f5c234" stroke="#c99516" strokeWidth="1.5" />
      </g>
    ),
    /* Who Am I?: magnifying glass over a question scrap */
    magnifier: (
      <g>
        <rect x="30" y="30" width="22" height="22" rx="3" fill="#fffef8" stroke="#d5c8b2" strokeWidth="2" transform="rotate(6 41 41)" />
        <circle cx="26" cy="26" r="14" fill="rgba(174, 214, 241, 0.35)" stroke="#3e7cb1" strokeWidth="5" />
        <line x1="36" y1="36" x2="48" y2="48" stroke="#946b3d" strokeWidth="6" strokeLinecap="round" />
        <path d="M22 22 q4 -4 8 0" stroke="#fdfaf1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    ),
    /* Story Sequencer: an unrolled scroll with story lines */
    scroll: (
      <g>
        <rect x="14" y="12" width="36" height="40" rx="2" fill="#fdf6e3" stroke="#caa986" strokeWidth="2.5" />
        <ellipse cx="32" cy="12" rx="18" ry="5" fill="#eed6ba" stroke="#caa986" strokeWidth="2.5" />
        <ellipse cx="32" cy="52" rx="18" ry="5" fill="#eed6ba" stroke="#caa986" strokeWidth="2.5" />
        <g stroke="#946b3d" strokeWidth="3" strokeLinecap="round">
          <line x1="22" y1="24" x2="42" y2="24" />
          <line x1="22" y1="32" x2="42" y2="32" />
          <line x1="22" y1="40" x2="34" y2="40" />
        </g>
      </g>
    ),
    /* Sword Drill: a Bible racing with speed dashes */
    bible: (
      <g>
        <g stroke="#b9ac95" strokeWidth="3.5" strokeLinecap="round">
          <line x1="4" y1="22" x2="14" y2="22" />
          <line x1="2" y1="32" x2="12" y2="32" />
          <line x1="4" y1="42" x2="14" y2="42" />
        </g>
        <rect x="20" y="12" width="32" height="40" rx="4" fill="#9b2226" stroke="#6e1418" strokeWidth="2.5" />
        <rect x="20" y="12" width="6" height="40" fill="#6e1418" />
        <g stroke="#ffd166" strokeWidth="4" strokeLinecap="round">
          <line x1="38" y1="22" x2="38" y2="42" />
          <line x1="31" y1="29" x2="45" y2="29" />
        </g>
      </g>
    ),
    /* Memory Match: two cards, one flipped to a star */
    cards: (
      <g>
        <rect x="10" y="14" width="24" height="34" rx="3" fill="#3e7cb1" stroke="#2f6394" strokeWidth="2.5" transform="rotate(-8 22 31)" />
        <path d="M16 24 l6 6 m0 -6 l-6 6 M22 34 l6 6 m0 -6 l-6 6" stroke="#aed6f1" strokeWidth="2" strokeLinecap="round" transform="rotate(-8 22 31)" />
        <rect x="30" y="18" width="24" height="34" rx="3" fill="#fffef8" stroke="#d5c8b2" strokeWidth="2.5" transform="rotate(7 42 35)" />
        <path d="M42 26 l3 6.5 7 1 -5 5 1.2 7 -6.2 -3.4 -6.2 3.4 1.2 -7 -5 -5 7 -1 z" fill="#f5c234" stroke="#c99516" strokeWidth="1.5" transform="rotate(7 42 35)" />
      </g>
    ),
    /* Journey Maps: a folded map with a dashed route */
    map: (
      <g>
        <path d="M8 16 L24 10 L40 16 L56 10 L56 46 L40 52 L24 46 L8 52 Z" fill="#fdf6e3" stroke="#caa986" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="24" y1="10" x2="24" y2="46" stroke="#eaddc3" strokeWidth="2" />
        <line x1="40" y1="16" x2="40" y2="52" stroke="#eaddc3" strokeWidth="2" />
        <path d="M14 40 Q24 22 34 32 Q44 42 50 20" fill="none" stroke="#d94f30" strokeWidth="3" strokeDasharray="5 4" strokeLinecap="round" />
        <path d="M47 17 l6 6 m0 -6 l-6 6" stroke="#a33520" strokeWidth="3" strokeLinecap="round" />
      </g>
    ),
  };

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="hub-game-icon-svg">
      {icons[kind] || icons.scissors}
    </svg>
  );
}
