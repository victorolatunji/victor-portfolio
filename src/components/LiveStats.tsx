"use client";

import { useEffect, useState } from "react";

type Stats = {
  visitsTotal: number;
  visitsToday: number;
  notes: number;
  mostWornTitle: string | null;
};

const fmt = (n: number) => n.toLocaleString("en-CA");

// Shop-receipt style readout. Counts this visit once per browser session, then polls.
export default function LiveStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let alive = true;

    const load = () =>
      fetch("/api/stats", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((s) => alive && s && setStats(s))
        .catch(() => {});

    let counted = false;
    try {
      counted = sessionStorage.getItem("closet-visit") === "1";
      if (!counted) sessionStorage.setItem("closet-visit", "1");
    } catch {}

    const first = counted
      ? load()
      : fetch("/api/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "visit" }),
        })
          .catch(() => {})
          .then(load);

    const id = setInterval(load, 30_000);
    const onNote = () => load();
    window.addEventListener("guestbook:signed", onNote);
    void first;
    return () => {
      alive = false;
      clearInterval(id);
      window.removeEventListener("guestbook:signed", onNote);
    };
  }, []);

  const rows = [
    { label: "Visitors today", value: stats ? fmt(stats.visitsToday) : "··" },
    { label: "Visitors all time", value: stats ? fmt(stats.visitsTotal) : "··" },
    { label: "Notes on the rack", value: stats ? fmt(stats.notes) : "··" },
    { label: "Most worn", value: stats ? (stats.mostWornTitle ?? "Be the first") : "··" },
  ];

  return (
    <div className="receipt" aria-live="polite">
      <div className="flex items-center justify-between">
        <p className="mono text-xs">CLOSET RECEIPT</p>
        <p className="mono flex items-center gap-2 text-xs">
          <span className="pulse h-2 w-2 rounded-full bg-live" aria-hidden />
          LIVE
        </p>
      </div>
      <dl className="mt-4 space-y-2.5 border-y border-dashed border-ink/35 py-4">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-4">
            <dt className="mono text-xs text-ink/60">{r.label.toUpperCase()}</dt>
            <dd className="mono truncate text-sm font-semibold">{r.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mono mt-3 text-center text-[0.65rem] text-ink/50">THANK YOU FOR STOPPING BY</p>
    </div>
  );
}
