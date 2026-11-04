import type { Shoe as ShoeT } from "@/data/site";

// Original, unbranded side-profile shoes. viewBox 140 x 80, toe pointing right.
export default function Shoe({ kind, className }: { kind: ShoeT["kind"]; className?: string }) {
  switch (kind) {
    case "workboot":
      return (
        <svg viewBox="0 0 140 80" className={className} aria-hidden>
          {/* shaft + upper (wheat nubuck) */}
          <path d="M18 62 V18 Q18 10 26 10 H54 Q60 10 61 18 L62 38 Q92 40 116 48 Q128 52 127 62 Z" fill="#c98a3a" />
          <path d="M18 18 Q18 10 26 10 H54 Q60 10 61 18 L61 22 H18 Z" fill="#4a2c1a" />
          <path d="M62 38 Q92 40 116 48 Q128 52 127 62 H96 Q94 48 62 46 Z" fill="rgba(0,0,0,0.12)" />
          <path d="M100 47 Q120 50 124 58" stroke="rgba(0,0,0,0.25)" strokeWidth={1} fill="none" />
          {/* eyelets + laces */}
          {[24, 30, 36, 42].map((y, i) => (
            <g key={y}>
              <circle cx={56 + i * 0.5} cy={y} r="1.8" fill="var(--color-gold)" />
              <path d={`M50 ${y + 2} L58 ${y - 1}`} stroke="#e9d9b8" strokeWidth={1.4} />
            </g>
          ))}
          <path d="M22 30 V58 M26 30 V58" stroke="rgba(0,0,0,0.12)" />
          <path d="M20 56 H126" stroke="rgba(255,255,255,0.35)" strokeDasharray="2 2" />
          {/* lug sole */}
          <path d="M16 62 H128 Q130 62 130 66 V68 H16 Z" fill="#5a3418" />
          <path d="M16 68 H130 V72 H16 Z" fill="#3b2211" />
          {[20, 32, 44, 56, 68, 80, 92, 104, 116].map((x) => (
            <rect key={x} x={x} y="72" width="7" height="3" fill="#3b2211" />
          ))}
        </svg>
      );
    case "hightop":
      return (
        <svg viewBox="0 0 140 80" className={className} aria-hidden>
          {/* black upper */}
          <path d="M16 56 V16 Q16 8 24 8 H50 Q56 22 74 30 Q112 38 124 48 V56 Z" fill="#111214" />
          <path d="M16 16 Q16 8 24 8 H40 V56 H16 Z" fill="#1d1e21" />
          <path d="M74 30 Q112 38 124 48 V56 H98 Q96 40 74 36 Z" fill="#2a2c30" />
          {/* oversized laces */}
          {[16, 24, 32].map((y, i) => (
            <path key={y} d={`M${44 + i * 6} ${y} q8 -3 14 2`} stroke="#ecebe6" strokeWidth={3.2} fill="none" strokeLinecap="round" />
          ))}
          <path d="M20 24 V48" stroke="rgba(255,255,255,0.12)" strokeWidth={2} />
          {/* chunky off-white midsole */}
          <path d="M12 56 H126 Q132 56 132 62 V66 Q132 72 126 72 H16 Q12 72 12 68 Z" fill="#ecebe6" />
          <path d="M12 64 H132" stroke="rgba(0,0,0,0.12)" />
          <path d="M108 56 Q130 56 132 64" stroke="rgba(0,0,0,0.15)" fill="none" />
        </svg>
      );
    case "runner":
      return (
        <svg viewBox="0 0 140 80" className={className} aria-hidden>
          <path d="M14 58 Q12 36 26 30 Q40 24 54 30 Q78 38 110 44 Q128 48 128 58 Z" fill="#4b5a3a" />
          {/* layered panels */}
          <path d="M20 52 Q50 44 80 48 Q104 52 126 54" stroke="#3a4630" strokeWidth={5} fill="none" />
          <path d="M24 44 Q52 36 84 42" stroke="#5e6e4a" strokeWidth={4} fill="none" />
          <path d="M44 30 L60 44 M52 32 L68 44 M60 34 L76 46" stroke="#2c3424" strokeWidth={2} />
          <path d="M14 40 Q20 32 30 30" stroke="rgba(255,255,255,0.18)" strokeWidth={2} fill="none" />
          {/* sole with air window */}
          <path d="M12 58 H128 Q132 58 132 62 V66 Q132 70 126 70 H16 Q12 70 12 66 Z" fill="#1b1c1f" />
          <rect x="22" y="61" width="22" height="5" rx="2.5" fill="rgba(200,215,230,0.55)" />
          <rect x="96" y="61" width="18" height="5" rx="2.5" fill="rgba(200,215,230,0.55)" />
        </svg>
      );
    case "clog":
      return (
        <svg viewBox="0 0 140 80" className={className} aria-hidden>
          {/* cork + footbed */}
          <path d="M14 60 Q14 54 22 54 H120 Q130 54 130 60 V64 H14 Z" fill="#c9a777" />
          <path d="M14 64 H130 V70 Q130 72 126 72 H18 Q14 72 14 68 Z" fill="#2a2420" />
          {[24, 40, 56, 72, 88, 104, 118].map((x) => (
            <circle key={x} cx={x} cy="59" r="0.9" fill="rgba(0,0,0,0.25)" />
          ))}
          {/* suede upper */}
          <path d="M36 54 Q40 26 76 24 Q114 22 124 54 Z" fill="#9a8c7a" />
          <path d="M60 30 Q90 24 114 40" stroke="rgba(255,255,255,0.18)" strokeWidth={2} fill="none" />
          <path d="M36 54 Q40 30 70 26" stroke="rgba(0,0,0,0.14)" strokeDasharray="2 2" fill="none" />
          {/* strap + buckle */}
          <path d="M52 34 Q74 26 98 30" stroke="#837663" strokeWidth={7} fill="none" />
          <rect x="88" y="25" width="10" height="9" rx="1" fill="none" stroke="var(--color-silver)" strokeWidth={1.8} />
          <path d="M93 25 V34" stroke="var(--color-silver)" strokeWidth={1.4} />
        </svg>
      );
  }
}
