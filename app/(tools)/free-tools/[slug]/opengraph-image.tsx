import { ImageResponse } from "next/og";
import { getToolSEO } from "@/data/tools-seo";

export const alt = "Free Tools - Smit Parekh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ToolOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tool = getToolSEO(slug);

  // Use the short name (before " - ") as the headline
  const title = tool
    ? tool.title.split(" - ")[0]
    : slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

  const description =
    tool?.description ?? "Free online tool — no account required.";

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
            "linear-gradient(135deg, #060915 0%, #0d1540 55%, #071030 100%)",
          color: "#fafafa",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative top-right glow blob */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(6, 40, 255, 0.15)",
            filter: "blur(80px)",
            display: "flex",
          }}
        />

        {/* Top row: logo + "Free Tool" badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "#0628FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              SP
            </div>
            <span style={{ fontSize: 20, fontWeight: 600, color: "#e2e8f0" }}>
              Smit Parekh
            </span>
          </div>

          <span
            style={{
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#00C5EC",
              border: "1px solid rgba(0, 197, 236, 0.35)",
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(0, 197, 236, 0.07)",
            }}
          >
            Free Tool
          </span>
        </div>

        {/* Centre: title + description */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: 20, zIndex: 1 }}
        >
          <h1
            style={{
              fontSize: title.length > 38 ? 52 : 66,
              fontWeight: 800,
              lineHeight: 1.08,
              margin: 0,
              maxWidth: 1040,
              color: "#f8fafc",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h1>

          {/* Blue accent underline */}
          <div
            style={{
              width: 64,
              height: 4,
              borderRadius: 2,
              background: "linear-gradient(90deg, #0628FF 0%, #00C5EC 100%)",
              display: "flex",
            }}
          />

          <p
            style={{
              fontSize: 22,
              lineHeight: 1.45,
              color: "#94a3b8",
              margin: 0,
              maxWidth: 980,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 15,
            color: "#475569",
            zIndex: 1,
          }}
        >
          <span style={{ color: "#64748b" }}>smitparekh.co.in/free-tools</span>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                display: "flex",
              }}
            />
            <span>Free · No account required · Instant results</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
