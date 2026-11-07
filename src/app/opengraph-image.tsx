import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

// The preview card shown when the link is shared (WhatsApp, iMessage, LinkedIn, X, Discord…).
// Simple and professional, in the site's own fonts: Instrument Serif + Inter (files in /assets/fonts).
// Name and role come from site.ts.
export const alt = `${site.fullName} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0e0f11";
const BONE = "#f5f6f7";
const GOLD = "#c9a24a";

export default async function OpenGraphImage() {
  const [serif, sans] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/InstrumentSerif-Regular.woff")),
    readFile(join(process.cwd(), "assets/fonts/Inter-Medium.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 36,
          background: INK,
        }}
      >
        {/* fine gold frame */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1.5px solid rgba(201,162,74,0.55)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Instrument Serif",
              fontSize: 44,
              letterSpacing: 16,
              color: INK,
              background: BONE,
              padding: "10px 18px 6px 34px",
            }}
          >
            {site.brand}
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "Instrument Serif",
              fontSize: 96,
              lineHeight: 1,
              color: BONE,
              marginTop: 54,
              letterSpacing: -1,
            }}
          >
            {site.fullName}
          </div>

          <div style={{ display: "flex", width: 72, height: 1.5, background: GOLD, marginTop: 34 }} />

          <div style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#1f9d55", marginRight: 16 }} />
            <div
              style={{
                display: "flex",
                fontFamily: "Inter",
                fontSize: 22,
                letterSpacing: 7,
                color: GOLD,
              }}
            >
              {site.role.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Inter", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}
