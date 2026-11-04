"use client";

import { useEffect, useState } from "react";

type Note = { id: string; name: string; message: string; created_at: string };

function ago(iso: string) {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

const tilts = [-2.5, 1.5, -1, 2, -1.8, 1];

export default function GuestList() {
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<{ kind: "idle" | "sending" | "ok" | "error"; text?: string }>({
    kind: "idle",
  });

  useEffect(() => {
    fetch("/api/guestbook", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setNotes(d.notes ?? []))
      .catch(() => setNotes([]));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, website }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      if (data.note) setNotes((n) => [data.note, ...(n ?? [])]);
      setMessage("");
      setStatus({ kind: "ok", text: "You're on the list. Thanks!" });
      window.dispatchEvent(new Event("guestbook:signed"));
    } catch (err) {
      setStatus({ kind: "error", text: (err as Error).message });
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
      <form onSubmit={submit} className="self-start">
        <label className="block">
          <span className="mono text-xs text-ink/60">NAME</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            required
            minLength={2}
            className="field mt-1"
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label className="mt-5 block">
          <span className="mono text-xs text-ink/60">NOTE</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={240}
            required
            minLength={3}
            rows={4}
            className="field mt-1 resize-none"
            placeholder="Say something about the site, the work, anything."
          />
          <span className="mono mt-1 block text-right text-[0.65rem] text-ink/45">{message.length}/240</span>
        </label>
        <label className="hidden" aria-hidden>
          Website
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
        <button type="submit" disabled={status.kind === "sending"} className="btn-dark mt-4 disabled:opacity-60">
          {status.kind === "sending" ? "Signing…" : "Sign the list"}
        </button>
        {status.text && (
          <p
            role="status"
            className={`mt-3 text-sm ${status.kind === "error" ? "text-accent" : "text-live-dark"}`}
          >
            {status.text}
          </p>
        )}
      </form>

      <div>
        {notes === null ? (
          <p className="mono text-xs text-ink/50">LOADING THE RACK…</p>
        ) : notes.length === 0 ? (
          <p className="text-ink/60">No notes yet. Be the first name on the list.</p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2">
            {notes.slice(0, 8).map((n, i) => (
              <li key={n.id} className="note" style={{ rotate: `${tilts[i % tilts.length]}deg` }}>
                <span className="note-hole" aria-hidden />
                <p className="leading-relaxed">&ldquo;{n.message}&rdquo;</p>
                <p className="mono mt-3 flex justify-between gap-3 text-[0.7rem] text-ink/55">
                  <span className="truncate">{n.name.toUpperCase()}</span>
                  <span className="shrink-0">{ago(n.created_at)}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
