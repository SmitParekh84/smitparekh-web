"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import ShapeGrid from "@/components/ui/ShapeGrid";

// Page background: an animated brand-colored grid (ShapeGrid canvas) with two
// soft corner glows (blue left, cyan right). The slowly drifting grid sits
// behind the content and gives the page depth. Non-interactive (pointer-events
// none) so it never blocks clicks. Pass `className="fixed"` to pin it to the
// viewport so content scrolls over it (more depth); default is `absolute`.
//
// Brand colors follow the theme. The corner glows use the
// --grid-glow-1 / --grid-glow-2 tokens from globals.css.

export function GridGlowBackground({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Faint brand-tinted grid lines; cells fill on the (non-interactive) hover.
  const borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(6,40,255,0.10)";
  const hoverFillColor = isDark ? "rgba(0,197,236,0.10)" : "rgba(6,40,255,0.06)";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* Corner glows behind the grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle 600px at 0% 200px, var(--grid-glow-1), transparent),
            radial-gradient(circle 600px at 100% 200px, var(--grid-glow-2), transparent)
          `,
        }}
      />
      {/* Animated brand grid */}
      <ShapeGrid
        direction="diagonal"
        speed={0.4}
        squareSize={48}
        shape="square"
        borderColor={borderColor}
        hoverFillColor={hoverFillColor}
        hoverTrailAmount={0}
        className="opacity-30"
      />
    </div>
  );
}
