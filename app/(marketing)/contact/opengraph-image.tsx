import { ImageResponse } from "next/og";

export const alt = "Contact — Smit Parekh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ContactOgImage() {
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
            "linear-gradient(135deg, #0a0a0a 0%, #4a044e 60%, #701a75 100%)",
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
              background: "#e879f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#4a044e",
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
              color: "#f0abfc",
              fontWeight: 600,
            }}
          >
            Contact · Available for new projects
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
            Got a project? Let&apos;s build it.
          </h1>
          <p
            style={{
              fontSize: 24,
              lineHeight: 1.4,
              color: "#fae8ff",
              margin: 0,
              maxWidth: 1000,
            }}
          >
            Reply within 24 hours · Free scoping call · No pushy sales
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 18,
            color: "#f0abfc",
          }}
        >
          <span>smitparekh02@gmail.com</span>
          <span>smitparekh.co.in/contact</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
