import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0f11",
          color: "#f5f6f7",
          fontSize: 44,
          fontWeight: 800,
        }}
      >
        V<span style={{ color: "#c9a24a" }}>.</span>
      </div>
    ),
    size,
  );
}