import { ImageResponse } from "next/og";
import { fetchCaseStudyBySlug } from "@/lib/server/projects";

export const alt = "Case Study — Smit Parekh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PortfolioOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let title = "Case Study";
  let subtitle = "Smit Parekh — Portfolio";
  let category = "Project";
  let tags: string[] = [];

  try {
    const project = await fetchCaseStudyBySlug(slug);
    if (project) {
      title = project.title;
      subtitle = project.subtitle || project.summary || subtitle;
      category = project.category || project.industry || category;
      tags = (project.tags ?? []).slice(0, 4);
    }
  } catch {
    // fall through to defaults
  }

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
            "linear-gradient(135deg, #020617 0%, #0f172a 55%, #1e293b 100%)",
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
                background: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 700,
                color: "#0a0a0a",
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
              color: "#93c5fd",
              border: "1px solid rgba(147, 197, 253, 0.4)",
              padding: "8px 14px",
              borderRadius: 999,
            }}
          >
            Case Study
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span
            style={{
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#60a5fa",
              fontWeight: 600,
            }}
          >
            {category}
          </span>
          <h1
            style={{
              fontSize: title.length > 40 ? 56 : 72,
              fontWeight: 800,
              lineHeight: 1.05,
              margin: 0,
              maxWidth: 1050,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 24,
              lineHeight: 1.4,
              color: "#cbd5e1",
              margin: 0,
              maxWidth: 1000,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {subtitle}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 16,
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {tags.length > 0 ? (
              tags.map((t) => (
                <span
                  key={t}
                  style={{
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    padding: "6px 12px",
                    borderRadius: 999,
                    fontSize: 14,
                  }}
                >
                  {t}
                </span>
              ))
            ) : (
              <span>smitparekh.co.in/portfolio</span>
            )}
          </div>
          <span>smitparekh.co.in</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
