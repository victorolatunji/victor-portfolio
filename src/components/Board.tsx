"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

type Sig = { id: string; image: string; x: number; y: number; tilt: number; created_at: string };
type Tool = "none" | "chalk" | "eraser";

// A plain black chalkboard. Visitors pick up the chalk or the eraser (a real-looking one
// follows the pointer or finger), wipe the board, and "Place signature" saves whatever
// they drew into the I-was-here corner for everyone to see.
export default function Board() {
  const boardRef = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ghost = useRef<HTMLDivElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [tool, setTool] = useState<Tool>("none");
  const [wiping, setWiping] = useState(false);
  const [sigs, setSigs] = useState<Sig[]>([]);
  const [fresh, setFresh] = useState<string | null>(null);
  const [status, setStatus] = useState<{ kind: "idle" | "sending" | "error" | "ok"; text?: string }>({ kind: "idle" });

  useEffect(() => {
    fetch("/api/board", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setSigs(d.signatures ?? []))
      .catch(() => {});
  }, []);

  // Size the drawing layer to its own box, keeping existing chalk on resize.
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const fit = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(r.width * dpr);
      const h = Math.round(r.height * dpr);
      if (!w || !h || (c.width === w && c.height === h)) return;
      const copy = document.createElement("canvas");
      copy.width = c.width;
      copy.height = c.height;
      if (c.width && c.height) copy.getContext("2d")?.drawImage(c, 0, 0);
      c.width = w;
      c.height = h;
      if (copy.width && copy.height) c.getContext("2d")?.drawImage(copy, 0, 0, w, h);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  // ----- the chalk / eraser that follows the pointer -----
  function moveGhost(e: React.PointerEvent) {
    const g = ghost.current;
    const b = boardRef.current;
    if (!g || !b) return;
    const r = b.getBoundingClientRect();
    g.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
    g.dataset.show = "1";
  }
  function hideGhost() {
    if (ghost.current) ghost.current.dataset.show = "0";
  }

  function point(e: React.PointerEvent) {
    const c = canvas.current!;
    const r = c.getBoundingClientRect();
    const s = c.width / r.width;
    return { x: (e.clientX - r.left) * s, y: (e.clientY - r.top) * s, s };
  }

  function stroke(e: React.PointerEvent) {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx || tool === "none") return;
    const p = point(e);
    const from = last.current ?? p;
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      ctx.lineWidth = 38 * p.s;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.globalCompositeOperation = "source-over";
    } else {
      // Grainy chalk: many tiny specks along the path.
      const steps = Math.max(1, Math.round(Math.hypot(p.x - from.x, p.y - from.y) / (1.2 * p.s)));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = from.x + (p.x - from.x) * t;
        const y = from.y + (p.y - from.y) * t;
        for (let k = 0; k < 5; k++) {
          ctx.fillStyle = `rgba(245,246,247,${0.3 + Math.random() * 0.45})`;
          const j = 2.6 * p.s;
          ctx.fillRect(x + (Math.random() - 0.5) * j, y + (Math.random() - 0.5) * j, 1.4 * p.s, 1.4 * p.s);
        }
      }
    }
    last.current = { x: p.x, y: p.y };
  }

  function down(e: React.PointerEvent) {
    if (tool === "none") return;
    if (idle.current) clearTimeout(idle.current);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    last.current = null;
    moveGhost(e);
    stroke(e);
  }
  function move(e: React.PointerEvent) {
    if (tool === "none") return;
    moveGhost(e);
    if (e.buttons !== 0 || e.pointerType === "touch") stroke(e);
  }
  function up(e: React.PointerEvent) {
    last.current = null;
    if (e.pointerType === "touch") {
      hideGhost();
      // On phones the board blocks scrolling while a tool is in hand,
      // so put it down after a few quiet seconds.
      if (idle.current) clearTimeout(idle.current);
      idle.current = setTimeout(() => setTool("none"), 4000);
    }
  }

  function wipe(after?: () => void) {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx || wiping) return;
    setWiping(true);
    const start = performance.now();
    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      ctx.clearRect(0, 0, c.width * t, c.height);
      if (t < 1) requestAnimationFrame(frame);
      else {
        setWiping(false);
        after?.();
      }
    };
    requestAnimationFrame(frame);
  }

  // Crop whatever was drawn, shrink it, and return it as a PNG.
  function capture(): string | null {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return null;
    const { data, width, height } = ctx.getImageData(0, 0, c.width, c.height);
    let minX = width, minY = height, maxX = -1, maxY = -1;
    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        if (data[(y * width + x) * 4 + 3] > 20) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < 0 || maxX - minX < 8 || maxY - minY < 4) return null;
    const pad = 6;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(width, maxX + pad);
    maxY = Math.min(height, maxY + pad);
    const w = maxX - minX;
    const h = maxY - minY;
    const scale = Math.min(1, 200 / w, 100 / h); // stored small; shown even smaller
    const out = document.createElement("canvas");
    out.width = Math.max(1, Math.round(w * scale));
    out.height = Math.max(1, Math.round(h * scale));
    out.getContext("2d")?.drawImage(c, minX, minY, w, h, 0, 0, out.width, out.height);
    return out.toDataURL("image/png");
  }

  async function placeSignature() {
    const image = capture();
    if (!image) {
      setTool("chalk");
      setStatus({ kind: "error", text: "Sign with the chalk first." });
      return;
    }
    setStatus({ kind: "sending", text: "Placing your signature…" });
    try {
      const res = await fetch("/api/board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setTool("none");
      hideGhost();
      wipe(() => {
        if (data.signature) {
          setSigs((s) => [data.signature, ...s]);
          setFresh(data.signature.id);
        }
        setStatus({ kind: "ok", text: "Signed. You're on the board for good." });
      });
    } catch (err) {
      setStatus({ kind: "error", text: (err as Error).message });
    }
  }

  function pick(t: Tool) {
    setTool((cur) => (cur === t ? "none" : t));
    setStatus({ kind: "idle" });
    hideGhost();
  }


  return (
    <div>
      <div
        ref={boardRef}
        className={`board ${tool !== "none" ? "is-drawing" : ""}`}
        data-signing={tool !== "none" ? "1" : "0"}
        onPointerLeave={hideGhost}
      >
        <div className="board-content">
          <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
            <div>
              <p className="chalk text-4xl leading-none sm:text-5xl">{site.fullName}</p>
              <svg viewBox="0 0 300 12" className="mt-1 h-3 w-64 max-w-full" aria-hidden>
                <path d="M2 8 Q80 2 150 7 T298 5" className="chalk-line" />
              </svg>
              <p className="chalk mt-2 text-xl text-bone/70">{site.role} · front end to back end</p>
              <div className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-bone/85">
                {site.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="chalk mt-6 inline-block text-2xl text-bone">
                <span className="chalk-circle">&ldquo;{site.motto}&rdquo;</span>
              </p>
            </div>
            <div>
              <p className="chalk text-3xl">{site.now.heading}:</p>
              <ul className="mt-3 space-y-2.5">
                {site.now.items.map((n) => (
                  <li key={n} className="chalk flex gap-3 text-2xl leading-tight">
                    <span className="text-live" aria-hidden>
                      ✓
                    </span>
                    {n}
                  </li>
                ))}
              </ul>
              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-dashed border-bone/25 pt-5">
                {site.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="chalk text-lg text-bone/55">{f.label}</dt>
                    <dd className="text-sm text-bone/90">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* I-was-here wall: signatures line up so none ever overlap */}
          <div className="sig-zone" aria-label="Signatures left by visitors">
            <p className="chalk sig-sign">
              <span className="sig-blink">✎ Sign here</span> <span className="text-bone/55">· I was here</span>
            </p>
            {sigs.length > 0 && (
              <div className="sig-wall">
                {sigs.map((s) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={s.id}
                    src={s.image}
                    alt="A visitor's chalk signature"
                    className={`sig ${s.id === fresh ? "is-fresh" : ""}`}
                    style={{ rotate: `${s.tilt}deg`, translate: `0 ${(s.y % 7) - 3}px` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <canvas
          ref={canvas}
          className="board-canvas"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          aria-hidden
        />

        {/* The tool in your hand */}
        <div ref={ghost} className={`tool-ghost tool-${tool}`} data-show="0" aria-hidden>
          {tool === "chalk" && <span className="ghost-chalk" />}
          {tool === "eraser" && (
            <span className="ghost-eraser">
              <span />
            </span>
          )}
        </div>

        {wiping && <span className="sponge" aria-hidden />}
      </div>

      {/* Chalk tray */}
      <div className="tray">
        <button type="button" aria-pressed={tool === "chalk"} onClick={() => pick("chalk")} className={`tray-btn ${tool === "chalk" ? "is-on" : ""}`}>
          <span className="stick" aria-hidden />
          Chalk
        </button>
        <button type="button" aria-pressed={tool === "eraser"} onClick={() => pick("eraser")} className={`tray-btn ${tool === "eraser" ? "is-on" : ""}`}>
          <span className="duster" aria-hidden />
          Eraser
        </button>
        <button type="button" onClick={() => wipe()} className="tray-btn">
          Wipe the board
        </button>
        <button
          type="button"
          onClick={placeSignature}
          disabled={status.kind === "sending"}
          className={`tray-btn tray-sign ${status.kind === "sending" ? "is-sending" : ""}`}
          aria-label="Place signature"
          title="Place signature"
        >
          <svg viewBox="0 0 24 24" className="thumb" aria-hidden>
            <path d="M6.2 6.6A7.5 7.5 0 0 1 19.4 10" />
            <path d="M4.6 10.4a7.6 7.6 0 0 1 .6-2" />
            <path d="M8.1 19.4a12 12 0 0 1-1.4-6.6 5.3 5.3 0 0 1 10.6 0v1" />
            <path d="M12 9.6a3.2 3.2 0 0 0-3.2 3.2c0 2.6.6 5 1.9 7" />
            <path d="M15.2 12.8c0 3 .5 5.3 1.4 6.8" />
            <path d="M12 12.8c0 2.8.7 5.6 2.2 7.6" />
            <path d="M19.4 13.4c0 1.8.2 3.4.6 4.6" />
            <path d="M4.4 13.6c0 1.6.2 3 .7 4.2" />
          </svg>
        </button>
      </div>
      <p role="status" className={`mt-3 min-h-5 text-sm ${status.kind === "error" ? "text-accent" : status.kind === "ok" ? "text-live-dark" : "text-ink/60"}`}>
        {status.text}
      </p>
    </div>
  );
}
