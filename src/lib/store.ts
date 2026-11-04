// Storage for the guest list and live stats.
// Uses Supabase when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set (see supabase/schema.sql).
// Without them it falls back to an in-memory store, so `npm run dev` works with zero setup.
// (In-memory data resets whenever the server restarts: fine locally, not for production.)


export type Note = { id: string; name: string; message: string; created_at: string };
export type Stats = {
  visitsTotal: number;
  visitsToday: number;
  notes: number;
  mostWorn: { slug: string; views: number } | null;
};

const URL_ = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const mode: "supabase" | "memory" = URL_ && KEY ? "supabase" : "memory";

// ---------- Supabase (PostgREST over fetch, no SDK needed) ----------
async function sb(path: string, init: RequestInit & { prefer?: string } = {}) {
  const res = await fetch(`${URL_}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: KEY!,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      ...(init.prefer ? { Prefer: init.prefer } : {}),
      ...init.headers,
    },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return res;
}

async function sbCount(path: string) {
  const res = await sb(path, { method: "HEAD", prefer: "count=exact" });
  const range = res.headers.get("content-range") ?? "*/0";
  return Number(range.split("/")[1] ?? 0);
}

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

// ---------- Memory fallback ----------
const mem = {
  notes: [] as Note[],
  visits: [] as string[], // ISO dates
  views: new Map<string, number>(),
};

// ---------- Public API ----------
export async function listNotes(limit = 24): Promise<Note[]> {
  if (mode === "memory") return mem.notes.slice(0, limit);
  const res = await sb(
    `guestbook?select=id,name,message,created_at&hidden=eq.false&order=created_at.desc&limit=${limit}`,
  );
  return res.json();
}

export async function addNote(name: string, message: string): Promise<Note> {
  if (mode === "memory") {
    const note = { id: crypto.randomUUID(), name, message, created_at: new Date().toISOString() };
    mem.notes.unshift(note);
    return note;
  }
  const res = await sb("guestbook?select=id,name,message,created_at", {
    method: "POST",
    prefer: "return=representation",
    body: JSON.stringify({ name, message }),
  });
  const [note] = await res.json();
  return note;
}

export async function recordVisit() {
  if (mode === "memory") {
    mem.visits.push(todayUTC());
    return;
  }
  await sb("visits", { method: "POST", body: JSON.stringify({}) });
}

export async function recordView(slug: string) {
  if (mode === "memory") {
    mem.views.set(slug, (mem.views.get(slug) ?? 0) + 1);
    return;
  }
  await sb("rpc/bump_piece_view", { method: "POST", body: JSON.stringify({ p_slug: slug }) });
}

export async function getStats(): Promise<Stats> {
  if (mode === "memory") {
    const top = [...mem.views.entries()].sort((a, b) => b[1] - a[1])[0];
    return {
      visitsTotal: mem.visits.length,
      visitsToday: mem.visits.filter((d) => d === todayUTC()).length,
      notes: mem.notes.length,
      mostWorn: top ? { slug: top[0], views: top[1] } : null,
    };
  }
  const [visitsTotal, visitsToday, notes, topRes] = await Promise.all([
    sbCount("visits?select=id"),
    sbCount(`visits?select=id&created_at=gte.${todayUTC()}`),
    sbCount("guestbook?select=id&hidden=eq.false"),
    sb("piece_views?select=slug,views&order=views.desc&limit=1"),
  ]);
  const [top] = (await topRes.json()) as { slug: string; views: number }[];
  return { visitsTotal, visitsToday, notes, mostWorn: top ?? null };
}

// ---------- Chalkboard signatures ("I was here") ----------
// Each signature is the visitor's own chalk drawing, stored as a small PNG data URL.
export type Signature = { id: string; image: string; x: number; y: number; tilt: number; created_at: string };

const memSigs: Signature[] = [];

export async function listSignatures(limit = 120): Promise<Signature[]> {
  if (mode === "memory") return memSigs.slice(0, limit);
  const res = await sb(
    `board_signatures?select=id,image,x,y,tilt,created_at&hidden=eq.false&image=not.is.null&order=created_at.desc&limit=${limit}`,
  );
  return res.json();
}

export async function addSignature(image: string): Promise<Signature> {
  // x/y/tilt give each signature its own little wobble on the wall (same for every visitor).
  const spot = {
    image,
    x: Math.round(2 + Math.random() * 86), // % from left
    y: Math.round(30 + Math.random() * 60), // % from top (clear of the "Sign here" label)
    tilt: Math.round(-8 + Math.random() * 16), // degrees
  };
  if (mode === "memory") {
    const sig = { ...spot, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    memSigs.unshift(sig);
    return sig;
  }
  const res = await sb("board_signatures?select=id,image,x,y,tilt,created_at", {
    method: "POST",
    prefer: "return=representation",
    body: JSON.stringify(spot),
  });
  const [sig] = await res.json();
  return sig;
}
