import type { Icon } from "@/data/site";

// Original, unbranded accessory drawings. viewBox 64 x 64.
const G = "var(--color-gold)";
const GD = "#9c7a2e"; // gold shadow
const S = "#c9ced5"; // silver
const SD = "#8b929b"; // silver shadow
// Round computed coordinates so server and browser render identical numbers.
const r2 = (n: number) => Math.round(n * 100) / 100;
const K = "#16171a"; // black
const line = (c: string, w = 2.4) => ({
  stroke: c,
  strokeWidth: w,
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});
const sparkle = (x: number, y: number, r = 2) => (
  <path key={`${x}-${y}`} d={`M${x} ${y - r} L${x + r * 0.35} ${y} L${x} ${y + r} L${x - r * 0.35} ${y} Z M${x - r} ${y} L${x} ${y + r * 0.35} L${x + r} ${y} L${x} ${y - r * 0.35} Z`} fill="#ffffff" />
);

const icons: Record<Icon, React.ReactNode> = {
  chain: (
    <>
      {Array.from({ length: 9 }, (_, i) => {
        const x = 8 + i * 6;
        const y = r2(20 + Math.sin(i / 2.5) * 16);
        return <ellipse key={i} cx={x} cy={y} rx="4.6" ry="3.4" transform={`rotate(${i % 2 ? 35 : -35} ${x} ${y})`} {...line(i % 2 ? GD : G, 2.6)} />;
      })}
    </>
  ),
  ring: (
    <>
      <ellipse cx="32" cy="40" rx="15" ry="14" {...line(G, 4.5)} />
      <ellipse cx="32" cy="40" rx="15" ry="14" {...line(GD, 1)} transform="translate(0 2)" />
      <rect x="22" y="12" width="20" height="14" rx="4" fill={G} />
      <rect x="25" y="15" width="14" height="8" rx="2" fill={K} />
      <path d="M29 19 H35" {...line(G, 1.2)} />
    </>
  ),
  cufflinks: (
    <>
      <circle cx="21" cy="26" r="11" fill={S} />
      <circle cx="21" cy="26" r="7" fill={K} />
      <path d="M21 37 V48" {...line(SD, 2.6)} />
      <rect x="15" y="46" width="12" height="4" rx="2" fill={SD} />
      <circle cx="44" cy="30" r="11" fill={S} />
      <circle cx="44" cy="30" r="7" fill={K} />
      <path d="M44 41 V52" {...line(SD, 2.6)} />
      <rect x="38" y="50" width="12" height="4" rx="2" fill={SD} />
      <circle cx="18" cy="23" r="2" fill="rgba(255,255,255,0.4)" />
      <circle cx="41" cy="27" r="2" fill="rgba(255,255,255,0.4)" />
    </>
  ),
  tieclip: (
    <>
      <path d="M26 6 L38 6 L36 16 L28 16 Z" fill="#7d1d22" />
      <path d="M28 16 L36 16 L42 54 L32 62 L22 54 Z" fill="#8f2129" />
      <rect x="10" y="30" width="44" height="6" rx="2" fill={G} />
      <path d="M12 38 H52" {...line(GD, 1.4)} />
    </>
  ),
  lighter: (
    <>
      <rect x="20" y="24" width="24" height="34" rx="3" fill={S} />
      <rect x="20" y="24" width="24" height="34" rx="3" fill="none" stroke={SD} strokeWidth={1} />
      <path d="M26 24 V58" stroke="rgba(255,255,255,0.5)" strokeWidth={3} />
      <rect x="20" y="14" width="16" height="11" rx="1.5" fill={SD} />
      <circle cx="28" cy="19" r="3" fill={K} />
      <path d="M40 4 Q47 10 41 17 Q36 12 40 4 Z" fill="#e0552a" />
      <path d="M40 9 Q43 12 40 15 Q38 12 40 9 Z" fill="#f4c24a" />
    </>
  ),
  watch: (
    <>
      {/* steel bracelet */}
      {[4, 10, 50, 56].map((y) => (
        <rect key={y} x="22" y={y} width="20" height="5" rx="1" fill={y < 30 ? S : SD} />
      ))}
      <rect x="16" y="15" width="32" height="34" rx="7" fill={S} stroke={SD} strokeWidth={1.4} />
      <rect x="21" y="20" width="22" height="24" rx="4" fill="#f7f8f9" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={[32, 41, 32, 23][i]} cy={[23, 32, 41, 32][i]} r="1" fill={K} />
      ))}
      <path d="M32 32 V25 M32 32 L37 35" {...line(K, 1.6)} />
      <rect x="48" y="29" width="3" height="6" rx="1" fill={SD} />
    </>
  ),
  bracelet: (
    <>
      <ellipse cx="32" cy="32" rx="24" ry="15" {...line(SD, 2)} />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return <circle key={i} cx={r2(32 + Math.cos(a) * 24)} cy={r2(32 + Math.sin(a) * 15)} r="2.8" fill="#f2f6fa" stroke={SD} strokeWidth={0.8} />;
      })}
      {sparkle(14, 22, 2.4)}
      {sparkle(50, 40, 2.4)}
    </>
  ),
  studs: (
    <>
      {[20, 44].map((x) => (
        <g key={x}>
          <circle cx={x} cy="32" r="10" fill="#eef3f8" stroke={SD} strokeWidth={1.4} />
          <path d={`M${x - 10} 32 H${x + 10} M${x} 22 V42 M${x - 7} 25 L${x + 7} 39 M${x + 7} 25 L${x - 7} 39`} stroke="rgba(139,146,155,0.6)" strokeWidth={0.8} />
          <circle cx={x} cy="32" r="4" fill="#ffffff" stroke={SD} strokeWidth={0.6} />
          {[0, 1, 2, 3].map((k) => (
            <circle key={k} cx={x + [-9, 9, -9, 9][k]} cy={32 + [-9, -9, 9, 9][k]} r="1.6" fill={S} />
          ))}
        </g>
      ))}
      {sparkle(26, 22, 3)}
    </>
  ),
  pendant: (
    <>
      {/* rope chain */}
      <path d="M6 4 Q32 26 58 4" stroke={G} strokeWidth={2.6} strokeDasharray="2.5 1.5" fill="none" />
      <rect x="29" y="14" width="6" height="7" rx="2" fill={G} />
      {/* iced face pendant */}
      <path d="M32 20 Q46 22 46 38 Q46 54 32 60 Q18 54 18 38 Q18 22 32 20 Z" fill={G} />
      <path d="M24 26 L28 22 L32 25 L36 22 L40 26" {...line(GD, 2)} />
      <path d="M32 30 Q40 31 40 40 Q40 50 32 54 Q24 50 24 40 Q24 31 32 30 Z" fill="#f3d995" />
      <path d="M28 38 h3 M33 38 h3" {...line(GD, 1.6)} />
      <path d="M32 40 V45 M29 48 Q32 50 35 48" {...line(GD, 1.4)} />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <circle key={i} cx={r2(32 + Math.cos(a) * 12)} cy={r2(40 + Math.sin(a) * 15)} r="1.3" fill="#ffffff" />;
      })}
      {sparkle(46, 26, 3)}
    </>
  ),
  glasses: (
    <>
      {/* rimless: lenses + thin bridge + temples */}
      <rect x="6" y="22" width="22" height="16" rx="3" fill="rgba(210,225,240,0.35)" stroke="rgba(139,146,155,0.7)" strokeWidth={0.8} />
      <rect x="36" y="22" width="22" height="16" rx="3" fill="rgba(210,225,240,0.35)" stroke="rgba(139,146,155,0.7)" strokeWidth={0.8} />
      <path d="M28 26 Q32 23 36 26" {...line(G, 1.8)} />
      <path d="M6 25 L2 22 M58 25 L62 22" {...line(G, 1.8)} />
      <path d="M2 22 L2 44 M62 22 L62 44" stroke="#5a3a25" strokeWidth={2.2} strokeLinecap="round" />
      <path d="M10 26 L16 26" stroke="rgba(255,255,255,0.8)" strokeWidth={1.4} />
      <path d="M40 26 L46 26" stroke="rgba(255,255,255,0.8)" strokeWidth={1.4} />
    </>
  ),
  carkey: (
    <>
      <circle cx="12" cy="14" r="8" {...line(SD, 2.4)} />
      <path d="M18 19 L24 24" {...line(SD, 2.4)} />
      <rect x="20" y="20" width="26" height="38" rx="11" fill={K} transform="rotate(-25 33 39)" />
      <circle cx="30" cy="32" r="3.4" fill="#2b2d31" stroke={SD} strokeWidth={0.8} />
      <circle cx="36" cy="42" r="3.4" fill="#2b2d31" stroke={SD} strokeWidth={0.8} />
      <circle cx="42" cy="51" r="2.6" fill="var(--color-accent)" />
      <path d="M26 26 L34 22" stroke="rgba(255,255,255,0.18)" strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  pen: (
    <>
      <path d="M10 54 L44 12 L52 19 L18 61 Z" fill={S} />
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M${18 + i * 4.4} ${44 - i * 5.4} L${24 + i * 4.4} ${49 - i * 5.4}`} stroke={SD} strokeWidth={0.8} />
      ))}
      <path d="M44 12 L52 19 L56 14 L48 7 Z" fill={SD} />
      <path d="M14 50 L22 57" {...line(G, 2.6)} />
      <path d="M10 54 L18 61 L6 63 Z" fill={G} />
      <path d="M8 60 L11 57" {...line(GD, 0.8)} />
    </>
  ),
  cardholder: (
    <>
      <rect x="6" y="16" width="52" height="34" rx="4" fill={K} />
      <path d="M6 26 H58 M6 34 H58" stroke="#2b2d31" strokeWidth={1.4} />
      <rect x="12" y="10" width="40" height="12" rx="2" fill="#f2f3f4" />
      <path d="M8 18 H56" stroke="rgba(255,255,255,0.18)" strokeDasharray="2 2" />
      <circle cx="49" cy="43" r="2.4" fill={G} />
    </>
  ),
  scarf: (
    <>
      <path d="M10 12 Q32 28 54 12 L50 26 Q32 38 14 26 Z" fill="#8f2129" />
      <path d="M20 28 L14 56 L26 54 L30 30 Z" fill="#7d1d22" />
      <path d="M14 56 l1 4 M18 55 l1 4 M22 55 l1 4 M26 54 l1 4" stroke="#7d1d22" strokeWidth={1.2} />
      <path d="M14 18 Q32 30 50 18" stroke="rgba(255,255,255,0.25)" strokeWidth={1.2} fill="none" />
      <path d="M16 22 Q32 33 48 22" stroke="var(--color-gold)" strokeWidth={0.8} fill="none" />
    </>
  ),
  pocketsquare: (
    <>
      <path d="M16 30 L22 10 L30 26 L38 8 L46 30 Z" fill="#f4f5f6" stroke="#c7cbd1" strokeWidth={1} />
      <path d="M22 10 L26 30 M38 8 L36 30" stroke="#d6dadf" strokeWidth={0.8} />
      <rect x="10" y="28" width="44" height="28" rx="2" fill={K} />
      <path d="M10 30 H54" stroke="#2b2d31" strokeWidth={2} />
      <path d="M12 54 L52 54" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 2" />
    </>
  ),
  trucker: (
    <>
      {/* foam front + mesh back + brim */}
      <path d="M10 40 Q10 14 34 12 Q50 12 54 26 L54 40 Z" fill={K} />
      <path d="M34 12 Q50 12 54 26 L54 40 H38 Q40 22 34 12 Z" fill="#2b2d31" />
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} d={`M${40 + i * 3} 18 V40`} stroke="#45484e" strokeWidth={0.8} />
      ))}
      <path d="M8 40 H62 Q62 48 52 48 H8 Z" fill="#0b0c0e" />
      <rect x="14" y="22" width="18" height="8" rx="1" fill="var(--color-live)" />
      <circle cx="34" cy="12" r="2" fill="#2b2d31" />
    </>
  ),
  headphones: (
    <>
      <path d="M12 38 V30 Q12 8 32 8 Q52 8 52 30 V38" {...line("#3a3d43", 4)} />
      <path d="M18 12 Q32 4 46 12" stroke="#5a5e66" strokeWidth={5} strokeLinecap="round" fill="none" />
      <rect x="6" y="32" width="14" height="22" rx="5" fill="#2b2d31" />
      <rect x="44" y="32" width="14" height="22" rx="5" fill="#2b2d31" />
      <rect x="15" y="34" width="5" height="18" rx="2.5" fill="#45484e" />
      <rect x="44" y="34" width="5" height="18" rx="2.5" fill="#45484e" />
      <path d="M9 36 V48" stroke="rgba(255,255,255,0.18)" strokeWidth={1.5} strokeLinecap="round" />
    </>
  ),
  keyring: (
    <>
      <circle cx="20" cy="20" r="12" {...line(SD, 3)} />
      <path d="M28 28 L52 52" {...line(G, 5)} />
      <path d="M44 44 L50 38 M50 50 L56 44" {...line(G, 4)} />
      <circle cx="28" cy="28" r="5" fill={G} />
      <circle cx="28" cy="28" r="2" fill={K} />
    </>
  ),
  belt: (
    <>
      <path d="M2 26 H62 V38 H2 Z" fill={K} />
      <path d="M2 28 H62 M2 36 H62" stroke="rgba(255,255,255,0.12)" strokeDasharray="2 2" />
      <rect x="20" y="20" width="22" height="24" rx="3" {...line(S, 3.5)} />
      <path d="M31 20 V44" {...line(SD, 2.6)} />
      {[48, 54].map((x) => (
        <circle key={x} cx={x} cy="32" r="1.5" fill="#45484e" />
      ))}
    </>
  ),
  gloves: (
    <>
      <path d="M18 60 V34 L15 16 Q15 12 18.5 12 Q22 12 22 16 L23.5 30 L25 10 Q25 6 28.5 6 Q32 6 32 10 L32 30 L35 12 Q35 8 38.5 8 Q42 8 42 12 L39.5 32 L46 24 Q49 21 51.5 23.5 Q54 26 51 30 L41 46 V60 Z" fill={K} />
      <path d="M18 54 H41" stroke={G} strokeWidth={1.4} />
      <path d="M22 18 L23 30 M29 12 L29 30 M38 14 L36 30" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
    </>
  ),
  perfume: (
    <>
      <rect x="22" y="6" width="20" height="12" rx="2" fill={K} />
      <rect x="27" y="17" width="10" height="5" fill={SD} />
      <rect x="14" y="22" width="36" height="38" rx="3" fill="#0e0f11" />
      <path d="M18 26 V56" stroke="rgba(255,255,255,0.18)" strokeWidth={3} />
      <rect x="20" y="40" width="24" height="10" fill="#1d1e21" stroke={G} strokeWidth={0.8} />
      <path d="M24 45 H40" stroke={G} strokeWidth={1} />
    </>
  ),
  beanie: (
    <>
      <path d="M10 44 Q10 10 32 10 Q54 10 54 44 Z" fill="#1d1e21" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${14 + i * 4.5} ${40} Q${14 + i * 4.5} ${22} ${22 + i * 2.5} 14`} stroke="#2b2d31" strokeWidth={1.4} fill="none" />
      ))}
      <rect x="8" y="40" width="48" height="14" rx="3" fill="#2b2d31" />
      {Array.from({ length: 11 }, (_, i) => (
        <path key={i} d={`M${12 + i * 4} 42 V52`} stroke="#3a3d43" strokeWidth={1.4} />
      ))}
      <rect x="40" y="44" width="8" height="6" rx="1" fill="var(--color-live)" />
    </>
  ),
  pocketwatch: (
    <>
      <path d="M32 2 V10" {...line(G, 2.4)} />
      <circle cx="32" cy="6" r="4" {...line(G, 2)} />
      <circle cx="32" cy="36" r="22" fill={G} />
      <circle cx="32" cy="36" r="22" {...line(GD, 1.4)} />
      <circle cx="32" cy="36" r="17" fill="#f7f4ea" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <circle key={i} cx={r2(32 + Math.cos(a) * 14)} cy={r2(36 + Math.sin(a) * 14)} r={i % 3 === 0 ? 1.4 : 0.8} fill={K} />;
      })}
      <path d="M32 36 V25 M32 36 L40 40" {...line(K, 1.8)} />
      <circle cx="32" cy="36" r="1.6" fill="var(--color-accent)" />
    </>
  ),
};

export default function AccessoryIcon({ icon, className }: { icon: Icon; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      {icons[icon]}
    </svg>
  );
}
