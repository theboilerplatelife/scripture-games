/* ---------- Deterministic Pseudo-Randomness for Paper Scraps ---------- */
export function jitter(seed, i, min, max) {
  const x = Math.sin(seed * 127.1 + i * 311.7) * 43758.5453;
  const f = x - Math.floor(x);
  return min + f * (max - min);
}

export function tornEdge(seed) {
  // Irregular polygon clip-path so each scrap looks authentically hand-torn
  const pts = [];
  const steps = 5;
  for (let i = 0; i <= steps; i++) pts.push(`${(i / steps) * 100}% ${jitter(seed, i, 0, 9)}%`);
  for (let i = 0; i <= steps; i++) pts.push(`${100 - jitter(seed, i + 20, 0, 5)}% ${(i / steps) * 100}%`);
  for (let i = steps; i >= 0; i--) pts.push(`${(i / steps) * 100}% ${100 - jitter(seed, i + 40, 0, 9)}%`);
  for (let i = steps; i >= 0; i--) pts.push(`${jitter(seed, i + 60, 0, 5)}% ${(i / steps) * 100}%`);
  return `polygon(${pts.join(",")})`;
}

export function shuffle(arr, seed) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(jitter(seed, i, 0, i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
