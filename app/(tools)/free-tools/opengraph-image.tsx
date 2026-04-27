import { ImageResponse } from "next/og";

export const alt = "Free Online Tools — Smit Parekh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function FreeToolsOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #022c22 0%, #064e3b 60%, #064e3b 100%)",
          color: "#fafafa",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#022c22",
            }}
          >
            SP
          </div>
          <span style={{ fontSize: 24, fontWeight: 600 }}>Smit Parekh</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              fontSize: 14,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6ee7b7",
              fontWeight: 600,
            }}
          >
            11+ Free Tools · No signup · No watermark
          </span>
          <h1
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.02,
              margin: 0,
              maxWidth: 1050,
            }}
          >
            Free online tools that actually work.
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 18,
            color: "#a7f3d0",
          }}
        >
          <span>Background remover · QR generator · ATS checker · & more</span>
          <span>smitparekh.co.in</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
