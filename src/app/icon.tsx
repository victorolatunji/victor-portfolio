import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Browser tab icon: the VAO logo on a white tile.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const png = await readFile(join(process.cwd(), "public/vao-logo.png"));
  const logo = `data:image/png;base64,${png.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 12,
        }}
      >
        <img src={logo} width={58} height={25} alt="VAO" />
      </div>
    ),
    size,
  );
}
