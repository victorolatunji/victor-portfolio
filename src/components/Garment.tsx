import type { Kind } from "@/data/site";

// Original, unbranded flat-lay pieces on hangers. viewBox 200 x 250, hook at top-centre.
// Shading is done with translucent overlays so any fabric colour works.

const seam = { stroke: "rgba(0,0,0,0.32)", strokeWidth: 1.2, fill: "none" } as const;
const stitch = { stroke: "rgba(255,255,255,0.28)", strokeWidth: 1, strokeDasharray: "3 3", fill: "none" } as const;
const shade = "rgba(0,0,0,0.16)";
const shine = "rgba(255,255,255,0.08)";

const shapes: Record<Kind, string> = {
  coat: "M62 54 L30 68 L14 210 L38 214 L52 108 L48 242 L152 242 L148 108 L162 214 L186 210 L170 68 L138 54 L114 54 L100 104 L86 54 Z",
  hoodie:
    "M62 54 L30 68 L12 198 L38 202 L54 106 L54 216 L146 216 L146 106 L162 202 L188 198 L170 68 L138 54 Q100 78 62 54 Z",
  jacket:
    "M62 54 L30 68 L12 192 L38 196 L54 106 L56 196 L144 196 L146 106 L162 196 L188 192 L170 68 L138 54 L114 54 L100 74 L86 54 Z",
  shirt:
    "M64 52 L32 66 L16 204 L38 208 L54 106 L54 222 L146 222 L146 106 L162 208 L184 204 L168 66 L136 52 L112 52 L100 62 L88 52 Z",
  jeans: "M62 56 H138 L148 242 H108 L100 112 L92 242 H52 Z",
  sweatpants: "M62 56 H138 L145 206 Q147 224 141 236 H108 L100 114 L92 236 H59 Q53 224 55 206 Z",
  jorts: "M60 56 H140 L152 156 H106 L100 104 L94 156 H48 Z",
};

const bottoms = new Set<Kind>(["jeans", "sweatpants", "jorts"]);

function details(kind: Kind) {
  switch (kind) {
    case "coat":
      return (
        <>
          <path d="M100 104 L100 242 H152 L148 108 L162 214 L186 210 L170 68 L138 54 L114 54 Z" fill={shade} />
          <path d="M86 54 L100 104 L76 140 L66 70 Z" fill="rgba(255,255,255,0.07)" />
          <path d="M114 54 L100 104 L124 140 L134 70 Z" fill="rgba(0,0,0,0.12)" />
          <path d="M66 70 L76 140 M134 70 L124 140" {...seam} />
          {[150, 176, 202].map((y) => (
            <g key={y}>
              <circle cx="88" cy={y} r="3" fill="var(--color-gold)" />
              <circle cx="112" cy={y} r="3" fill="var(--color-gold)" />
            </g>
          ))}
          <path d="M60 196 H84 M116 196 H140" stroke="rgba(255,255,255,0.18)" strokeWidth={2} />
          <path d="M16 196 L38 200 M184 196 L162 200" {...seam} />
          <path d="M52 108 L48 242 M148 108 L152 242" {...stitch} />
        </>
      );
    case "hoodie":
      return (
        <>
          <path d="M100 74 L100 216 H146 L146 106 L162 202 L188 198 L170 68 L138 54 Z" fill={shade} />
          <path d="M64 56 Q100 10 136 56 Q100 84 64 56 Z" fill="rgba(0,0,0,0.28)" />
          <path d="M74 58 Q100 28 126 58" {...seam} />
          <path d="M93 76 Q91 96 94 110 M107 76 Q109 96 106 110" stroke="#f1f2f3" strokeWidth={1.6} fill="none" />
          <rect x="91.5" y="108" width="4" height="7" rx="1" fill="var(--color-silver)" />
          <rect x="104.5" y="108" width="4" height="7" rx="1" fill="var(--color-silver)" />
          <path d="M68 156 H132 L140 194 H60 Z" fill="rgba(0,0,0,0.12)" />
          <path d="M68 156 L60 194 M132 156 L140 194 M68 156 H132" {...seam} />
          {[202, 206, 210].map((y) => (
            <path key={y} d={`M54 ${y} H146`} stroke="rgba(0,0,0,0.18)" strokeWidth={1} />
          ))}
          <path d="M14 184 L38 188 M14 190 L38 194 M186 184 L162 188 M186 190 L162 194" stroke="rgba(0,0,0,0.2)" />
          <path d="M62 54 L54 106 M138 54 L146 106" {...stitch} />
        </>
      );
    case "jacket":
      return (
        <>
          <path d="M100 74 L100 196 H144 L146 106 L162 196 L188 192 L170 68 L138 54 L114 54 Z" fill={shade} />
          <path d="M86 54 L66 86 L82 96 M114 54 L134 86 L118 96" stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} fill="none" />
          <path d="M110 70 L92 196" stroke="var(--color-silver)" strokeWidth={2.2} />
          <path d="M64 124 L86 120 M116 152 L138 148" stroke="var(--color-silver)" strokeWidth={1.6} />
          <path d="M56 188 H144" stroke="rgba(255,255,255,0.2)" strokeWidth={4} />
          <circle cx="66" cy="72" r="2.2" fill="var(--color-silver)" />
          <circle cx="134" cy="72" r="2.2" fill="var(--color-silver)" />
        </>
      );
    case "shirt":
      return (
        <>
          <path d="M100 62 L100 222 H146 L146 106 L162 208 L184 204 L168 66 L136 52 L112 52 Z" fill="rgba(0,0,0,0.06)" />
          {/* collar */}
          <path d="M88 52 L100 62 L84 76 L74 56 Z" fill="#ffffff" stroke="rgba(0,0,0,0.22)" strokeWidth={1} />
          <path d="M112 52 L100 62 L116 76 L126 56 Z" fill="#ffffff" stroke="rgba(0,0,0,0.22)" strokeWidth={1} />
          {/* placket + buttons */}
          <path d="M104 64 V222" stroke="rgba(0,0,0,0.14)" strokeWidth={1} />
          {[96, 124, 152, 180, 208].map((y) => (
            <circle key={y} cx="104" cy={y} r="1.8" fill="#d6dadf" stroke="rgba(0,0,0,0.25)" strokeWidth={0.6} />
          ))}
          {/* yoke + cuffs */}
          <path d="M66 70 Q100 78 134 70" stroke="rgba(0,0,0,0.1)" strokeWidth={1} fill="none" />
          <path d="M18 190 L38 194 M182 190 L162 194" stroke="rgba(0,0,0,0.18)" strokeWidth={1} />
          <path d="M120 84 h12 v10 h-12 z" fill="none" stroke="rgba(0,0,0,0.12)" />
          {/* tie */}
          <path d="M95 64 L105 64 L103 74 L97 74 Z" fill="#7d1d22" />
          <path d="M97 74 L103 74 L108 168 L100 180 L92 168 Z" fill="#8f2129" />
          <path d="M100 74 L100 176" stroke="rgba(0,0,0,0.15)" strokeWidth={1} />
          <path d="M94 110 L106 104 M93 130 L107 124 M92 150 L107 144" stroke="rgba(255,255,255,0.12)" strokeWidth={2} />
        </>
      );
    case "jeans":
      return (
        <>
          <path d="M100 112 L108 242 H148 L138 56 H100 Z" fill={shade} />
          <path d="M62 70 H138" {...seam} />
          <path d="M62 64 H138" {...stitch} />
          <path d="M100 70 V112 M104 72 Q104 100 100 108" {...seam} />
          <path d="M70 72 Q74 92 92 90 M130 72 Q126 92 108 90" {...seam} />
          <rect x="118" y="74" width="9" height="8" rx="1" fill="none" stroke="rgba(0,0,0,0.25)" />
          {[74, 90, 110, 126].map((x) => (
            <path key={x} d={`M${x} 56 V70`} stroke="rgba(0,0,0,0.35)" strokeWidth={2.2} />
          ))}
          <circle cx="70" cy="74" r="1.6" fill="var(--color-gold)" />
          <circle cx="130" cy="74" r="1.6" fill="var(--color-gold)" />
          <circle cx="100" cy="64" r="2.4" fill="var(--color-gold)" />
          <path d="M70 120 L84 126 M68 128 L82 134 M118 128 L132 122 M118 136 L132 130" stroke={shine} strokeWidth={2} />
          <path d="M54 232 H92 M108 232 H146" stroke="rgba(255,255,255,0.12)" strokeWidth={2} />
          <path d="M57 120 L52 242 M143 120 L148 242" {...stitch} />
        </>
      );
    case "sweatpants":
      return (
        <>
          <path d="M100 114 L108 236 H141 Q147 224 145 206 L138 56 H100 Z" fill={shade} />
          <rect x="62" y="56" width="76" height="14" fill="rgba(0,0,0,0.18)" />
          {[60, 63, 66].map((y) => (
            <path key={y} d={`M62 ${y} H138`} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
          ))}
          <path d="M96 70 Q94 92 88 100 M104 70 Q106 92 112 100" stroke="#ffffff" strokeWidth={1.6} fill="none" />
          <path d="M66 74 L72 102 M134 74 L128 102" {...seam} />
          <path d="M60 140 Q74 146 88 140 M112 140 Q126 146 140 140" stroke={shine} strokeWidth={2} fill="none" />
          {[222, 226, 230].map((y) => (
            <path key={y} d={`M58 ${y} H92 M108 ${y} H142`} stroke="rgba(0,0,0,0.18)" strokeWidth={1} />
          ))}
        </>
      );
    case "jorts":
      return (
        <>
          <path d="M100 104 L106 156 H152 L140 56 H100 Z" fill={shade} />
          <path d="M60 68 H140" {...seam} />
          <path d="M60 62 H140" {...stitch} />
          <path d="M100 68 V102" {...seam} />
          {[72, 92, 108, 128].map((x) => (
            <path key={x} d={`M${x} 56 V68`} stroke="rgba(0,0,0,0.3)" strokeWidth={2} />
          ))}
          <path
            d="M48 156 l3 6 l3 -6 l3 6 l3 -6 l3 6 l3 -6 l3 6 l3 -6 l3 6 l3 -6 l3 6 l3 -6 l3 6 l3 -6 M106 156 l3 6 l3 -6 l3 6 l3 -6 l3 6 l3 -6 l3 6 l3 -6 l3 6 l3 -6 l3 6 l3 -6 l3 6 l3 -6"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth={1}
            fill="none"
          />
          <text x="100" y="136" textAnchor="middle" fontSize="11" fill="rgba(0,0,0,0.5)" fontFamily="monospace">
            RESERVED
          </text>
        </>
      );
  }
}

export default function Garment({ kind, color, className }: { kind: Kind; color: string; className?: string }) {
  const isBottom = bottoms.has(kind);
  return (
    <svg viewBox="0 0 200 250" className={className} aria-hidden>
      <path
        d="M100 26 V16 Q100 6 109 6 Q117 6 117 13"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {isBottom ? (
        <>
          <path d="M100 26 L100 38 M56 40 H144" stroke="var(--color-gold)" strokeWidth={3} strokeLinecap="round" />
          <rect x="66" y="38" width="8" height="20" rx="1.5" fill="var(--color-silver)" />
          <rect x="126" y="38" width="8" height="20" rx="1.5" fill="var(--color-silver)" />
        </>
      ) : (
        <path d="M100 26 L58 52 H142 Z" fill="none" stroke="var(--color-gold)" strokeWidth={3} strokeLinejoin="round" />
      )}
      <path
        d={shapes[kind]}
        fill={color}
        stroke={kind === "shirt" ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.35)"}
        strokeWidth={1}
      />
      {details(kind)}
    </svg>
  );
}
