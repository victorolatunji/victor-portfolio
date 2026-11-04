import { site } from "@/data/site";
import { rateLimited } from "@/lib/guard";
import { getStats, mode, recordView, recordVisit } from "@/lib/store";

export const dynamic = "force-dynamic";

const slugs = new Set(site.rail.map((p) => p.slug));

export async function GET() {
  try {
    const stats = await getStats();
    const piece = stats.mostWorn ? site.rail.find((p) => p.slug === stats.mostWorn!.slug) : undefined;
    return Response.json({ ...stats, mostWornTitle: piece?.title ?? null, mode });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Stats unavailable." }, { status: 500 });
  }
}

// Body: { type: "visit" } once per browser session, or { type: "view", slug } when a piece is opened.
export async function POST(req: Request) {
  if (rateLimited(req, "stats", 60, 60_000)) return Response.json({ ok: true });

  let body: { type?: string; slug?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  try {
    if (body.type === "visit") await recordVisit();
    else if (body.type === "view" && body.slug && slugs.has(body.slug)) await recordView(body.slug);
    else return Response.json({ error: "Unknown event." }, { status: 400 });
    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Couldn't record that." }, { status: 500 });
  }
}
