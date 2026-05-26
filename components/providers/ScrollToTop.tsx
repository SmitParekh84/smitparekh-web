"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { animate, type AnimationPlaybackControls } from "framer-motion";

export function ScrollToTop() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);
  const animation = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (prevPathname.current !== null && prevPathname.current !== pathname) {
      const startY = window.scrollY;

      // Cancel any in-progress scroll before starting a new one
      animation.current?.stop();

      if (startY > 0) {
        // Scale duration with distance: fast for short scrolls, max 0.7s for long ones
        const duration = Math.min(0.7, startY / 3000 + 0.3);

        animation.current = animate(startY, 0, {
          duration,
          ease: [0.32, 0.72, 0, 1], // easeOutExpo — fast start, graceful finish
          onUpdate: (y) => window.scrollTo(0, y),
        });
      }
    }

    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}
