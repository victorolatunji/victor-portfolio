"use client";

import { useEffect, useRef, useState } from "react";
import { site, type Piece } from "@/data/site";
import { PieceArt, ShoeArt } from "./Art";

const KEY = "closet-order-v1";
const defaultOrder = site.rail.map((p) => p.slug);
const bySlug = new Map(site.rail.map((p) => [p.slug, p]));

type Drag = { slug: string; from: number; dx: number; step: number; centers: number[] };

function tag(p: Piece, i: number) {
  if (p.type === "brand") return "FROM THE LABEL";
  if (p.type === "commission") return "RESERVED";
  if (p.status) return p.status.toUpperCase();
  return `NO. ${String(i + 1).padStart(2, "0")} · ${p.year}`;
}

export default function Closet() {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<string[]>(defaultOrder);
  const [arrange, setArrange] = useState(false);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [piece, setPiece] = useState<Piece | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const start = useRef(0);

  // Restore this visitor's arrangement (saved only on their device).
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as string[] | null;
        if (saved && saved.length === defaultOrder.length && saved.every((s) => bySlug.has(s))) setOrder(saved);
      } catch {}
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Garments swing with scroll speed.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = window.scrollY;
    let sway = 0;
    let raf = 0;
    const tick = () => {
      sway *= 0.9;
      rail.style.setProperty("--sway", `${sway.toFixed(2)}deg`);
      raf = Math.abs(sway) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      const v = window.scrollY - last;
      last = window.scrollY;
      sway = Math.max(-9, Math.min(9, sway + v * 0.12));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (piece) dialog.current?.showModal();
  }, [piece]);

  function save(next: string[]) {
    setOrder(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }

  function tryOn(p: Piece) {
    setPiece(p);
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "view", slug: p.slug }),
    }).catch(() => {});
  }

  function shuffle() {
    const next = [...order];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    save(next);
  }

  // ----- drag to rearrange -----
  function onPointerDown(e: React.PointerEvent, slug: string, from: number) {
    if (!arrange) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const rects = itemRefs.current.map((el) => el?.getBoundingClientRect());
    const step = rects[1] && rects[0] ? rects[1].left - rects[0].left : 200;
    start.current = e.clientX;
    setDrag({ slug, from, dx: 0, step, centers: rects.map((r) => (r ? r.left + r.width / 2 : 0)) });
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag) return;
    setDrag({ ...drag, dx: e.clientX - start.current });
  }
  function targetIndex(d: Drag) {
    const c = d.centers[d.from] + d.dx;
    let to = 0;
    d.centers.forEach((x, i) => {
      if (i !== d.from && c > x) to++;
    });
    return to;
  }
  function onPointerUp() {
    if (!drag) return;
    const to = targetIndex(drag);
    if (to !== drag.from) {
      const next = [...order];
      const [moved] = next.splice(drag.from, 1);
      next.splice(to, 0, moved);
      save(next);
    }
    setDrag(null);
  }
  function shiftFor(i: number) {
    if (!drag || i === drag.from) return 0;
    const to = targetIndex(drag);
    if (drag.from < to && i > drag.from && i <= to) return -drag.step;
    if (drag.from > to && i >= to && i < drag.from) return drag.step;
    return 0;
  }

  function scrollRail(dir: number) {
    const el = railRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div>
      {/* Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => open && setArrange((a) => !a)}
            aria-pressed={arrange}
            className={`chip ${arrange ? "chip-on" : ""}`}
            aria-disabled={!open}
          >
            <span className="chip-dot" aria-hidden />
            {arrange ? "Done arranging" : "Rearrange the rail"}
          </button>
          <button type="button" onClick={() => open && shuffle()} className="chip" aria-disabled={!open}>
            Shuffle
          </button>
          <button type="button" onClick={() => open && save(defaultOrder)} className="chip" aria-disabled={!open}>
            Reset
          </button>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => scrollRail(-1)} className="rail-nav" aria-label="Scroll rail left">
            ←
          </button>
          <button type="button" onClick={() => scrollRail(1)} className="rail-nav" aria-label="Scroll rail right">
            →
          </button>
        </div>
      </div>

      {/* Wardrobe */}
      <div className="wardrobe relative">
        <div className="wardrobe-inner relative overflow-hidden">
          <div className="rail-bar" aria-hidden />
          <ul
            ref={railRef}
            aria-label="The collection"
            className={`rail relative flex gap-2 overflow-x-auto px-6 pb-4 pt-3 ${arrange ? "is-arranging" : "snap-x snap-mandatory"}`}
          >
            {order.map((slug, i) => {
              const p = bySlug.get(slug)!;
              const dragging = drag?.slug === slug;
              const x = dragging ? drag!.dx : shiftFor(i);
              return (
                <li
                  key={slug}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className={`shrink-0 snap-center ${dragging ? "is-dragging" : ""}`}
                  style={{ transform: `translateX(${x}px)` }}
                  onPointerDown={(e) => onPointerDown(e, slug, i)}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                >
                  <button
                    type="button"
                    onClick={() => !arrange && tryOn(p)}
                    className="hanger flex w-[11rem] flex-col items-center sm:w-[12.5rem]"
                    style={{ animationDelay: `${i * 90}ms` }}
                    aria-label={arrange ? `${p.title}. Drag to move` : `${p.title}. Open details`}
                  >
                    <PieceArt
                      kind={p.kind}
                      color={p.color}
                      image={p.image}
                      alt={p.title}
                      className={`garment ${p.type === "commission" ? "opacity-70" : ""}`}
                    />
                    <span className={`tag mt-1 ${p.type === "commission" ? "tag-dashed" : ""}`}>
                      <span className="mono flex items-center gap-1.5 text-[0.62rem] text-ink/55">
                        {p.link?.href.startsWith("http") && p.type === "project" && (
                          <span className="pulse h-1.5 w-1.5 rounded-full bg-live" aria-hidden />
                        )}
                        {tag(p, i)}
                      </span>
                      <span className="block text-sm font-semibold leading-tight">{p.title}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Shoe shelf: quick links */}
          <div className="shelf relative px-6 pb-5 pt-4">
            <ul className="flex flex-wrap justify-around gap-x-4 gap-y-3">
              {site.shoes.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") || s.href.endsWith(".pdf") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="shoe group flex flex-col items-center"
                    aria-label={`${s.label} (${s.name})`}
                  >
                    <ShoeArt kind={s.kind} image={s.image} alt={s.name} className="w-24 sm:w-28" />
                    <span className="mono mt-1 text-[0.65rem] text-bone/70 group-hover:text-gold">
                      {s.label.toUpperCase()} ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Doors */}
          <div className={`doors ${open ? "is-open" : ""}`} aria-hidden={open}>
            <div className="door door-left">
              <span className="door-panel" />
              <span className="knob knob-left" />
            </div>
            <div className="door door-right">
              <span className="door-panel" />
              <span className="knob knob-right" />
            </div>
            {!open && (
              <button type="button" onClick={() => setOpen(true)} className="open-btn mono">
                Open the closet →
              </button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-ink/60">
        {!open
          ? `${site.rail.length} pieces and ${site.shoes.length} pairs inside.`
          : arrange
            ? "Drag the pieces into your own order. It's saved on this device."
            : "Tap a piece to view it. Shoes on the shelf take you to my profiles."}
      </p>

      {/* Viewing room */}
      <dialog
        ref={dialog}
        onClose={() => setPiece(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="fitting"
        aria-labelledby="fitting-title"
      >
        {piece && (
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <div className="fitting-stage flex items-center justify-center p-8">
              <span className="block w-full max-w-[15rem]">
                <PieceArt kind={piece.kind} color={piece.color} image={piece.image} alt={piece.title} />
              </span>
            </div>
            <div className="p-7 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <p className="mono text-xs text-ink/55">
                  VIEWING ROOM{piece.year ? ` · ${piece.year}` : ""}
                </p>
                <button
                  type="button"
                  onClick={() => dialog.current?.close()}
                  className="mono -mr-2 -mt-2 px-2 py-1 text-xs hover:text-accent"
                >
                  CLOSE ✕
                </button>
              </div>
              <h3 id="fitting-title" className="display mt-3 text-4xl sm:text-5xl">
                {piece.title}
              </h3>
              {piece.role && <p className="mt-2 text-sm text-ink/60">{piece.role}</p>}
              {piece.type === "project" && piece.link?.href.startsWith("http") && (
                <p className="mono mt-3 mr-2 inline-flex items-center gap-2 border border-live/40 bg-live/10 px-2 py-1 text-[0.7rem] text-live-dark">
                  <span className="pulse h-1.5 w-1.5 rounded-full bg-live" aria-hidden />
                  LIVE
                </p>
              )}
              {piece.status && (
                <p className="mono mt-3 inline-flex items-center gap-2 border border-ink/25 px-2 py-1 text-[0.7rem]">
                  <span className="pulse h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  {piece.status.toUpperCase()}
                </p>
              )}
              <p className="mt-5 leading-relaxed">{piece.summary}</p>
              {piece.points && (
                <ul className="mt-4 space-y-2">
                  {piece.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/80">
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
              {piece.stack && (
                <div className="mt-6 border-t border-ink/15 pt-4">
                  <p className="mono text-[0.7rem] text-ink/55">MATERIALS</p>
                  <p className="mt-1 text-sm font-semibold">{piece.stack.join(" · ")}</p>
                </div>
              )}
              {piece.link && (
                <a
                  href={piece.link.href}
                  target={piece.link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  onClick={() => piece.link!.href.startsWith("#") && dialog.current?.close()}
                  className="btn-dark mt-7 inline-block"
                >
                  {piece.link.label} {piece.link.href.startsWith("http") ? "↗" : "→"}
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
