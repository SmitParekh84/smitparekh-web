import { ImageResponse } from "next/og";

export const alt = "About Smit Parekh — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function AboutOgImage() {
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
            "linear-gradient(135deg, #0a0a0a 0%, #1e1b4b 60%, #312e81 100%)",
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
              background: "#a78bfa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#1e1b4b",
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
              color: "#c4b5fd",
              fontWeight: 600,
            }}
          >
            About · Full-Stack Developer
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
            Hey, I&apos;m Smit — I build production web apps.
          </h1>
          <p
            style={{
              fontSize: 24,
              lineHeight: 1.4,
              color: "#ddd6fe",
              margin: 0,
              maxWidth: 1000,
            }}
          >
            4+ years shipping for FinTech, SaaS & enterprise clients.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 18,
            color: "#c4b5fd",
          }}
        >
          <span>React · Next.js · Node.js · TypeScript · AWS</span>
          <span>smitparekh.co.in/about</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
