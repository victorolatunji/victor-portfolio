import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// The preview card shown when the link is shared on LinkedIn, iMessage, Discord, etc.
export const alt = `${site.fullName} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#c9cac8",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 60, fontWeight: 800, color: "#000" }}>{site.brand}</div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 28, color: "#454545" }}>
            <div style={{ width: 16, height: 16, borderRadius: 8, background: "#17803d", marginRight: 14 }} />
            {site.role}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 800, color: "#000", lineHeight: 1 }}>{site.fullName}</div>
          <div style={{ fontSize: 40, color: "#d4201a", marginTop: 24 }}>{site.headline}</div>
        </div>
      </div>
    ),
    size,
  );
}