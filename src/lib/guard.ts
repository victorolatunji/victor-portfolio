
// Best-effort rate limit per IP (per server instance). Stops casual spam;
// Supabase row-level security + the length limits do the rest.
const hits = new Map<string, number[]>();

export function rateLimited(req: Request, key: string, max: number, windowMs: number) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const id = `${key}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(id) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(id, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

const LINKS = /(https?:\/\/|www\.)/i;

export function cleanText(v: unknown, max: number) {
  if (typeof v !== "string") return "";
  return v.replace(/\s+/g, " ").trim().slice(0, max);
}

export function looksSpammy(text: string) {
  return LINKS.test(text);
}
