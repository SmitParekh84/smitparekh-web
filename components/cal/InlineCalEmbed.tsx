"use client";

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { CAL } from "@/lib/cal";

/**
 * Full-page inline Cal.com calendar. We:
 *   1. Wait for next-themes to hydrate before rendering the iframe so the
 *      booking page's first paint matches the visitor's actual theme.
 *   2. Re-key the <Cal /> on theme change to force the iframe to reload
 *      with the new theme baked into its initial URL — the runtime
 *      cal("ui", { theme }) postMessage update is unreliable across all
 *      Cal embed versions, especially for the slot-list panel.
 */
export function InlineCalEmbed() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    if (!mounted) return;
    (async () => {
      try {
        const cal = await getCalApi({ namespace: CAL.namespace });
        cal("ui", {
          theme,
          cssVarsPerTheme: {
            light: { "cal-brand": "#0628FF" },
            dark: { "cal-brand": "#00C5EC" },
          },
          hideEventTypeDetails: false,
          layout: CAL.layout,
        });
      } catch {
        /* offline / blocked — the <Cal> component still renders an iframe */
      }
    })();
  }, [theme, mounted]);

  if (!mounted) {
    // Skeleton matches the embed's min-height to avoid layout shift.
    return (
      <div
        className="w-full min-h-[640px] animate-pulse bg-muted/30"
        aria-hidden
      />
    );
  }

  return (
    <Cal
      key={theme}
      namespace={CAL.namespace}
      calLink={CAL.link}
      style={{ width: "100%", height: "100%", minHeight: "640px", overflow: "scroll" }}
      config={{
        layout: CAL.layout,
        theme,
        useSlotsViewOnSmallScreen: "true",
      }}
    />
  );
}

