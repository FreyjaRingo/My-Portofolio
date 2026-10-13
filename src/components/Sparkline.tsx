// Deterministic decorative sparkline, seeded by a string. Pure, so it renders
// the same on server and client.
export function Sparkline({ seed, className = "spark" }: { seed: string; className?: string }) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const rand = () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
  const n = 32;
  let v = 0.35 + rand() * 0.2;
  const coords: string[] = [];
  for (let i = 0; i < n; i++) {
    v += (rand() - 0.42) * 0.12;
    v = Math.min(0.72, Math.max(0.12, v));
    coords.push(`${((i / (n - 1)) * 300).toFixed(1)},${((1 - v) * 100).toFixed(1)}`);
  }
  return (
    <svg className={className} viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden>
      {[25, 50, 75].map((y) => (
        <line key={y} x1="0" x2="300" y1={y} y2={y} className="spark-grid" />
      ))}
      <polygon points={`0,100 ${coords.join(" ")} 300,100`} className="spark-area" />
      <polyline points={coords.join(" ")} className="spark-line" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
