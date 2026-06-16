import { ImageResponse } from "next/og";
import { fetchBlogBySlug } from "@/lib/server/blogs";

export const alt = "Blog - Smit Parekh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BlogOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let title = "Notes on web development";
  let excerpt = "Building products in the open.";
  let tag = "Article";

  try {
    const blog = await fetchBlogBySlug(slug);
    if (blog) {
      title = blog.title;
      excerpt = blog.excerpt || excerpt;
      tag = blog.tags?.[0] || blog.category || tag;
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
            "linear-gradient(135deg, #ffffff 0%, #f5f7ff 55%, #eef2ff 100%)",
          color: "#0a0a1a",
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
                background: "#0628FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              SP
            </div>
            <span style={{ fontSize: 20, fontWeight: 600, color: "#0f172a" }}>Smit Parekh</span>
          </div>
          <span
            style={{
              fontSize: 14,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#0628FF",
              border: "1px solid rgba(6, 40, 255, 0.25)",
              padding: "8px 14px",
              borderRadius: 999,
              background: "rgba(6, 40, 255, 0.06)",
            }}
          >
            {tag}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h1
            style={{
              fontSize: title.length > 50 ? 56 : 68,
              fontWeight: 800,
              lineHeight: 1.05,
              margin: 0,
              maxWidth: 1050,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 22,
              lineHeight: 1.4,
              color: "#475569",
              margin: 0,
              maxWidth: 1000,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {excerpt}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 16,
            color: "#64748b",
          }}
        >
          <span>smitparekh.co.in/blog</span>
          <span>Notes on web development, engineering & building products</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
