import { addSignature, listSignatures } from "@/lib/store";
import { rateLimited } from "@/lib/guard";

export const dynamic = "force-dynamic";

const MAX_IMAGE = 60_000; // characters of base64; a cropped chalk signature is usually 5 to 20 KB
const PNG = /^data:image\/png;base64,[A-Za-z0-9+/=]+$/;

export async function GET() {
  try {
    return Response.json({ signatures: await listSignatures() });
  } catch (e) {
    console.error(e);
    return Response.json({ signatures: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (rateLimited(req, "board", 3, 10 * 60_000)) {
    return Response.json({ error: "You've signed already. Come back a little later." }, { status: 429 });
  }
  let body: { image?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }
  const image = typeof body.image === "string" ? body.image : "";
  if (!PNG.test(image)) return Response.json({ error: "Draw your signature with the chalk first." }, { status: 400 });
  if (image.length > MAX_IMAGE) return Response.json({ error: "That's a big one. Try a smaller signature." }, { status: 400 });
  try {
    return Response.json({ signature: await addSignature(image) }, { status: 201 });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Couldn't place your signature. Try again." }, { status: 500 });
  }
}
