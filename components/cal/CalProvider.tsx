"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { getCalApi } from "@calcom/embed-react";
import { CAL } from "@/lib/cal";

/**
 * Mount once in the root layout. Initialises the Cal.com embed runtime
 * and re-applies UI config whenever the site's resolved theme flips so
 * the popup always matches what the visitor is looking at.
 *
 * Renders nothing visible.
 */
export function CalProvider() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const cal = await getCalApi({ namespace: CAL.namespace });
        if (cancelled) return;
        cal("ui", {
          theme: resolvedTheme === "dark" ? "dark" : "light",
          cssVarsPerTheme: {
            light: { "cal-brand": "#0628FF" },
            dark: { "cal-brand": "#00C5EC" },
          },
          hideEventTypeDetails: false,
          layout: CAL.layout,
        });
      } catch {
        // Cal SDK failed to load (offline, blocked) - silent: BookCallButton
        // falls back to opening publicUrl in a new tab.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [resolvedTheme]);

  return null;
}
