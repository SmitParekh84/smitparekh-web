"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

// Page-entrance animation. A template (unlike a layout) re-mounts on every
// route change, so each page fades + lifts in instead of snapping in at the top
// after the instant ScrollToTop jump. The transform is cleared once the
// animation finishes so any `sticky`/`fixed` children inside a page (e.g. the
// changelog rail, the /services/[slug] sidebar) keep working — a lingering
// transform would turn them into a containing block and break them.
export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as any }}
      onAnimationComplete={() => {
        if (ref.current) ref.current.style.transform = "none";
      }}
    >
      {children}
    </motion.div>
  );
}
