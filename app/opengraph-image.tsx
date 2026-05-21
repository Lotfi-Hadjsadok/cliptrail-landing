import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ClipTrail, clipboard history for Mac";

export default async function OpengraphImage() {
  const logoBuf = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logoBuf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(60% 50% at 12% 8%, rgba(100,181,246,0.45), transparent 70%), radial-gradient(60% 60% at 90% 90%, rgba(38,198,218,0.35), transparent 75%), #F0F7FF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 104,
              height: 104,
              borderRadius: 26,
              background: "linear-gradient(180deg, #1e7adf 0%, #1565C0 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 12px 28px rgba(21,101,192,0.45)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              width={98}
              height={98}
              alt=""
              style={{ objectFit: "contain" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: -1,
            }}
          >
            <span style={{ color: "#1565C0" }}>Clip</span>
            <span style={{ color: "#0D47A1" }}>Trail</span>
          </div>
        </div>

        <div
          style={{
            marginTop: 50,
            display: "flex",
            flexDirection: "column",
            color: "#0D1B3E",
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: -3,
            lineHeight: 1.02,
          }}
        >
          <span>Every copy.</span>
          <span style={{ color: "#1565C0" }}>One trail.</span>
        </div>

        <div
          style={{
            marginTop: 32,
            color: "#37474F",
            fontSize: 32,
            fontWeight: 600,
            maxWidth: 900,
          }}
        >
          Mac &amp; iPhone clipboard history. Search, recall, paste. Lifetime
          $9.99.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "16px 22px",
            background: "#0D1B3E",
            color: "#26C6DA",
            borderRadius: 18,
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 0.5,
          }}
        >
          ⌘⇧V
        </div>
      </div>
    ),
    { ...size },
  );
}
