import { ImageResponse } from "next/og";

export const alt = "Services — Full-Stack Web Development by Smit Parekh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ServicesOgImage() {
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
            "linear-gradient(135deg, #0a0a0a 0%, #082f49 60%, #0c4a6e 100%)",
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
              background: "#38bdf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#082f49",
            }}
          >
            SP
          </div>
          <span style={{ fontSize: 24, fontWeight: 600 }}>Smit Parekh</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span
            style={{
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#7dd3fc",
              fontWeight: 600,
            }}
          >
            Services
          </span>
          <h1
            style={{
              fontSize: 80,
              fontWeight: 800,
              lineHeight: 1.02,
              margin: 0,
              maxWidth: 1050,
            }}
          >
            End-to-end web development, shipped.
          </h1>
          <p
            style={{
              fontSize: 24,
              lineHeight: 1.4,
              color: "#bae6fd",
              margin: 0,
              maxWidth: 1000,
            }}
          >
            React frontends · Node APIs · Database design · AWS · Technical SEO
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 18,
            color: "#7dd3fc",
          }}
        >
          <span>From MVP to scale — built right the first time.</span>
          <span>smitparekh.co.in/services</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
