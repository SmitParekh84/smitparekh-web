import { ImageResponse } from "next/og";
import { getToolSEO } from "@/data/tools-seo";

export const alt = "Free Online Tool — Smit Parekh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ToolOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolSEO(slug);

  const heading = tool ? tool.title.split(" — ")[0] : prettify(slug);
  const subline = tool
    ? tool.title.split(" — ").slice(1).join(" — ") || tool.description
    : "Free online tool — no signup required.";
  const description = tool?.description ?? "";

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
            "linear-gradient(135deg, #052e2b 0%, #064e3b 60%, #022c22 100%)",
          color: "#fafafa",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 700,
                color: "#022c22",
              }}
            >
              SP
            </div>
            <span style={{ fontSize: 20, fontWeight: 600 }}>Smit Parekh</span>
          </div>
          <span
            style={{
              fontSize: 14,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#6ee7b7",
              border: "1px solid rgba(110, 231, 183, 0.4)",
              padding: "8px 14px",
              borderRadius: 999,
            }}
          >
            Free · No signup
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#34d399",
              fontWeight: 600,
            }}
          >
            Free Online Tool
          </span>
          <h1
            style={{
              fontSize: heading.length > 28 ? 64 : 80,
              fontWeight: 800,
              lineHeight: 1.05,
              margin: 0,
              maxWidth: 1050,
            }}
          >
            {heading}
          </h1>
          <p
            style={{
              fontSize: 22,
              lineHeight: 1.4,
              color: "#d1fae5",
              margin: 0,
              maxWidth: 1000,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description || subline}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 16,
            color: "#a7f3d0",
          }}
        >
          <span>smitparekh.co.in/free-tools</span>
          <span>11+ free tools · No login · No watermark</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

function prettify(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
