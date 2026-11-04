"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

// Full-length arched mirror, fogged up. Visitors wipe the glass (mouse or finger)
// to reveal what's etched behind the condensation.
export default function Mirror() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [wiped, setWiped] = useState(0);

  // Paint the fog.
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const paint = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const g = ctx.createLinearGradient(0, 0, r.width, r.height);
      g.addColorStop(0, "rgba(236,240,244,0.94)");
      g.addColorStop(1, "rgba(206,213,221,0.94)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, r.width, r.height);
      // a few droplets
      for (let i = 0; i < 70; i++) {
        const x = (Math.sin(i * 12.9898) * 0.5 + 0.5) * r.width;
        const y = (Math.sin(i * 78.233) * 0.5 + 0.5) * r.height;
        const rad = 1 + ((i * 7) % 4);
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    paint();
    window.addEventListener("resize", paint);
    return () => window.removeEventListener("resize", paint);
  }, []);

  function wipe(e: React.PointerEvent) {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const r = c.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 46;
    ctx.beginPath();
    const p = last.current ?? { x, y };
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
    last.current = { x, y };
    setWiped((w) => Math.min(100, w + 0.6));

    // glare + tilt follow the pointer
    const el = wrap.current;
    if (el && e.pointerType !== "touch") {
      el.style.setProperty("--gx", `${((x / r.width) * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${((y / r.height) * 100).toFixed(1)}%`);
      el.style.setProperty("--rx", `${((0.5 - y / r.height) * 8).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((x / r.width - 0.5) * 10).toFixed(2)}deg`);
    }
  }

  function leave() {
    last.current = null;
    const el = wrap.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div className="mirror-wrap">
      <div ref={wrap} className="mirror">
        <div className="mirror-glass">
          {/* Etched behind the fog: what's happening right now */}
          <div className="mirror-etched">
            <p className="mono text-[0.62rem] text-live-dark">● {site.now.heading.toUpperCase()}</p>
            <ul className="mt-4 space-y-3 px-7 text-left">
              {site.now.items.map((n) => (
                <li key={n} className="flex gap-2.5 text-[0.95rem] leading-snug">
                  <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  {n}
                </li>
              ))}
            </ul>
            <p className="display mt-6 px-6 text-xl italic text-accent">{site.now.signoff}</p>
          </div>
          <canvas
            ref={canvas}
            className="mirror-fog"
            onPointerMove={wipe}
            onPointerDown={wipe}
            onPointerLeave={leave}
            onPointerUp={() => (last.current = null)}
            aria-hidden
          />
          <span className="mirror-glare" aria-hidden />
          {wiped < 8 && <span className="mirror-hint mono">WIPE THE GLASS</span>}
        </div>
      </div>
      <div className="mirror-shadow" aria-hidden />
    </div>
  );
}
