import { ImageResponse } from "next/og";
import { getGeoCountry } from "@/data/geo-pages";

export const alt = "Hire a Full-Stack Developer — Smit Parekh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function GeoOgImage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const c = getGeoCountry(country);

  const headline = c ? `Hire a Full-Stack Developer in ${c.primaryCity}` : "Hire a Full-Stack Developer";
  const sub = c
    ? `React · Next.js · Node.js — serving ${c.country}, ${c.timezoneLabel} overlap`
    : "React · Next.js · Node.js";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #060915 0%, #0d1540 55%, #071030 100%)",
          color: "#fafafa",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
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

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
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
            <span style={{ fontSize: 20, fontWeight: 600, color: "#e2e8f0" }}>Smit Parekh</span>
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
            Hire Me
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, zIndex: 1 }}>
          <h1
            style={{
              fontSize: headline.length > 38 ? 52 : 64,
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
            {headline}
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
            {sub}
          </p>
        </div>

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
          <span style={{ color: "#64748b" }}>smitparekh.co.in</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "flex" }} />
            <span>Free quote in 24 hours · Reply same day</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
