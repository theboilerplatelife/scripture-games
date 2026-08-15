import { useMemo } from "react";
import { jitter, tornEdge } from "../../utils/random.js";

export function Confetti() {
  const bits = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        left: jitter(9, i, 2, 96),
        delay: jitter(10, i, 0, 1.4),
        dur: jitter(11, i, 2.4, 4),
        rot: jitter(12, i, -200, 200),
        w: jitter(13, i, 10, 22),
        h: jitter(14, i, 12, 26),
        color: ["#fdfaf1", "#f6e7c8", "#dfeaf5", "#f8d8d0", "#e2eeda", "#fce4a6"][i % 6],
        seed: i + 30,
      })),
    []
  );

  return (
    <div className="vb-confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <span
          key={i}
          style={{
            left: `${b.left}%`,
            width: b.w,
            height: b.h,
            background: b.color,
            clipPath: tornEdge(b.seed),
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
            "--rot": `${b.rot}deg`,
          }}
        />
      ))}
    </div>
  );
}
