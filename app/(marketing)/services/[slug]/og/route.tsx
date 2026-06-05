import { ImageResponse } from "next/og";
import { getServiceBySlug } from "@/data/services-catalog";

export const contentType = "image/png";
const size = { width: 1200, height: 630 };

// Dynamically generated Open Graph card for service pages that do NOT ship a
// hand-made static card (see STATIC_OG_SERVICE_SLUGS in services-catalog.ts).
// Referenced explicitly from generateMetadata only for those slugs, so the
// 20 services with existing static cards are never affected.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  const eyebrow = service?.eyebrow ?? "Services";
  const title = service?.heroTitle ?? slug.replace(/-/g, " ");
  const description =
    service?.metaDescription ??
    "Production web development, SEO, and AI services by Smit Parekh.";

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
        {/* Decorative glow blobs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(6, 40, 255, 0.18)",
            filter: "blur(80px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -90,
            left: -90,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(0, 197, 236, 0.14)",
            filter: "blur(80px)",
            display: "flex",
          }}
        />

        {/* Top row: logo + service-type badge */}
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
            {eyebrow}
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
          <span style={{ color: "#64748b" }}>smitparekh.co.in/services</span>

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
            <span>Free quote in 24 hours · Worldwide</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
