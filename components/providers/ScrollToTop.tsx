"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function ScrollToTop() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    if (prevPathname.current !== null && prevPathname.current !== pathname) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}
