import { addNote, listNotes } from "@/lib/store";
import { cleanText, looksSpammy, rateLimited } from "@/lib/guard";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json({ notes: await listNotes() });
  } catch (e) {
    console.error(e);
    return Response.json({ notes: [], error: "Couldn't load the guest list." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (rateLimited(req, "guestbook", 3, 10 * 60_000)) {
    return Response.json({ error: "Easy, one note at a time. Try again in a few minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "website" field.
  if (cleanText(body.website, 100)) return Response.json({ ok: true });

  const name = cleanText(body.name, 40);
  const message = cleanText(body.message, 240);

  if (name.length < 2) return Response.json({ error: "Add your name (2+ characters)." }, { status: 400 });
  if (message.length < 3) return Response.json({ error: "Write a short note first." }, { status: 400 });
  if (looksSpammy(name + " " + message)) {
    return Response.json({ error: "Links aren't allowed on the guest list." }, { status: 400 });
  }

  try {
    const note = await addNote(name, message);
    return Response.json({ note }, { status: 201 });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Couldn't save your note. Try again." }, { status: 500 });
  }
}
