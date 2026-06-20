"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// On route change, jump straight to the top of the new page. Instant — no
// animated scroll — so a new page always starts at the top instead of appearing
// to slide up from wherever you were on the previous page.
export function ScrollToTop() {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    if (prevPathname.current !== null && prevPathname.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}
