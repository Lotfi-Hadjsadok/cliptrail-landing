import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const LOGO_PATH = join(process.cwd(), "public/icon-prepared.png");

async function logoDataUrl() {
  const buf = await readFile(LOGO_PATH);
  return `data:image/png;base64,${buf.toString("base64")}`;
}

export async function renderAppIcon(dim: number) {
  const src = await logoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          width={dim}
          height={dim}
          alt=""
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { width: dim, height: dim },
  );
}
