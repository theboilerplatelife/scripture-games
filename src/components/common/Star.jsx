export function Star({ filled, size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.6l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17l-5.7 3 1.2-6.3L2.8 9.3l6.4-.8z"
        fill={filled ? "#f2b134" : "none"}
        stroke={filled ? "#c98a1b" : "#b9ac95"}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeDasharray={filled ? "none" : "3 2"}
      />
    </svg>
  );
}
