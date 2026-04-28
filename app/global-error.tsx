"use client";

import { useEffect } from "react";

export default function GlobalRootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root error boundary:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#a1a1aa",
              marginBottom: 12,
            }}
          >
            Critical error
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 12px" }}>
            The site couldn&apos;t load
          </h1>
          <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.6, margin: "0 0 24px" }}>
            Something broke at the root level. Try refreshing - if this keeps
            happening, please let us know at{" "}
            <a href="mailto:smitparekh02@gmail.com" style={{ color: "#fafafa" }}>
              smitparekh02@gmail.com
            </a>
            .
          </p>
          {error.digest && (
            <p style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", color: "#71717a", marginBottom: 16 }}>
              Error ID: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              background: "#fafafa",
              color: "#0a0a0a",
              border: 0,
              borderRadius: 8,
              padding: "10px 18px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
