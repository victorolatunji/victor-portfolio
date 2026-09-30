import { site, type Player } from "@/data/site";

const rowY: Record<Player["line"], number> = { FWD: 16, MID: 40, DEF: 64, GK: 88 };

export default function Lineup() {
  const placed = (["FWD", "MID", "DEF", "GK"] as const).flatMap((line) => {
    const players = site.lineup.filter((p) => p.line === line);
    return players.map((p, i) => ({
      ...p,
      x: ((i + 1) / (players.length + 1)) * 100,
      y: rowY[line],
    }));
  });

  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16">
      <div className="pitch relative aspect-[68/100] w-full">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 68 100"
          fill="none"
          stroke="var(--color-lime)"
          strokeOpacity="0.45"
          strokeWidth="0.35"
          aria-hidden
        >
          <rect x="2" y="2" width="64" height="96" />
          <line x1="2" y1="50" x2="66" y2="50" />
          <circle cx="34" cy="50" r="9" />
          <rect x="14" y="2" width="40" height="16" />
          <rect x="25" y="2" width="18" height="6" />
          <rect x="14" y="82" width="40" height="16" />
          <rect x="25" y="92" width="18" height="6" />
        </svg>

        <ul aria-label="Starting eleven" className="absolute inset-0">
          {placed.map((p) => (
            <li
              key={p.name}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span
                className={`display flex h-10 w-10 items-center justify-center rounded-full text-lg ${
                  p.number === 11 ? "bg-red text-bone" : "bg-bone text-black"
                }`}
              >
                {p.number}
              </span>
              <span className="mt-1 whitespace-nowrap text-xs font-semibold text-bone">{p.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-md">
        <p className="text-lg leading-relaxed text-muted">
          The tools I reach for, lined up in a 4-3-3. Backend holds the defence, and the red
          shirt on the right wing is No. 11, my number.
        </p>
        <h3 className="display mt-10 text-2xl">Bench</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {site.bench.map((b) => (
            <li key={b} className="border border-black/30 px-3 py-1.5 text-sm font-medium">
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}