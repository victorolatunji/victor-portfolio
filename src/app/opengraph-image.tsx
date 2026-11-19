import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

// The preview card shown when the link is shared (WhatsApp, iMessage, LinkedIn, X, Discord…).
// Styled to match the VAO logo: bold geometric sans, black / white / the logo's grey, nothing else.
// Everything sits inside the centre square so WhatsApp's square thumbnail doesn't cut it off.
export const alt = `${site.fullName} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0e0f11";
const WHITE = "#f5f6f7";
const GREY = "#8b8f96"; // matches the logo's crossbar

export default async function OpenGraphImage() {
  const [bold, medium, logoPng] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Inter-Bold.woff")),
    readFile(join(process.cwd(), "assets/fonts/Inter-Medium.woff")),
    readFile(join(process.cwd(), "public/vao-logo-white.png")),
  ]);
  const logo = `data:image/png;base64,${logoPng.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: INK,
          fontFamily: "Inter",
        }}
      >
        <img src={logo} width={300} height={128} alt={site.brand} />

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: -1,
            color: WHITE,
          }}
        >
          {site.shortName}
        </div>

        <div style={{ display: "flex", width: 56, height: 4, background: GREY, marginTop: 26 }} />

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 6,
            color: GREY,
          }}
        >
          {site.role.toUpperCase()}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: bold, style: "normal", weight: 700 },
        { name: "Inter", data: medium, style: "normal", weight: 500 },
      ],
    },
  );
}
