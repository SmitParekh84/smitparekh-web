"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

// Page-entrance animation for the public tools pages. See the marketing
// template for why the transform is cleared on completion.
export default function ToolsTemplate({
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
