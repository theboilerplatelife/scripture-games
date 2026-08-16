import { Star } from "./Star.jsx";

/* Small pieces shared by both games' win cards */

export function WinStars({ earned }) {
  return (
    <div className="vb-win-stars">
      {[1, 2, 3].map((n) => (
        <Star key={n} filled={earned >= n} size={34} />
      ))}
    </div>
  );
}

export function BestLine({ best, isNew }) {
  if (best <= 0) return null;
  return (
    <p className="vb-win-best">
      {isNew ? "🎉 New best!" : `Best: ${"⭐".repeat(best)}`}
    </p>
  );
}
