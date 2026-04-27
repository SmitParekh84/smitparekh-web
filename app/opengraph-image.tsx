import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = "Smit Parekh — Full Stack Developer & Free Web Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
            "linear-gradient(135deg, #0a0a0a 0%, #18181b 60%, #1e3a8a 100%)",
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
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#0a0a0a",
            }}
          >
            SP
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 24, fontWeight: 600 }}>{siteConfig.name}</span>
            <span style={{ fontSize: 16, color: "#a1a1aa" }}>
              smitparekh.co.in
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              fontSize: 14,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#60a5fa",
              fontWeight: 600,
            }}
          >
            Full-Stack Developer · Free Web Tools
          </span>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              margin: 0,
              maxWidth: 1000,
            }}
          >
            Building production-grade apps & shipping useful tools.
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 18,
            color: "#a1a1aa",
          }}
        >
          <span>React · Next.js · Node.js · TypeScript</span>
          <span>4+ years building real-world software</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
