export function Pencil({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="vb-pencil-svg">
      <g transform="rotate(45 32 32)">
        {/* Hexagon wooden yellow body */}
        <rect x="22" y="16" width="20" height="32" rx="1.5" fill="#f5c234" stroke="#c99516" strokeWidth="1.5" />
        <rect x="28" y="16" width="8" height="32" fill="#ffe066" />
        {/* Metal ferrule band */}
        <rect x="22" y="10" width="20" height="7" fill="#b4b4be" stroke="#82828c" strokeWidth="1.5" />
        <line x1="22" y1="13.5" x2="42" y2="13.5" stroke="#757580" strokeWidth="1.2" />
        {/* Pink eraser */}
        <path d="M22 10 Q22 4 32 4 Q42 4 42 10 Z" fill="#f48686" stroke="#ca5e5e" strokeWidth="1.5" />
        {/* Sharpened cedar wood collar */}
        <polygon points="22,48 42,48 32,62" fill="#eed6ba" stroke="#caa986" strokeWidth="1.5" />
        {/* Dark graphite tip */}
        <polygon points="29,57 35,57 32,63" fill="#2d2926" />
      </g>
    </svg>
  );
}
