"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const LINKEDIN_PROFILE_JS = "https://platform.linkedin.com/badges/js/profile.js";

function getLinkedInVanity(): string {
  // e.g. "https://www.linkedin.com/in/smit-parekh-n/" -> "smit-parekh-n"
  const match = siteConfig.social.linkedin.match(/\/in\/([^/?#]+)/);
  return match?.[1] ?? "";
}

interface LinkedInBadgeProps {
  className?: string;
  size?: "medium" | "large";
  type?: "VERTICAL" | "HORIZONTAL";
}

/**
 * Embeds the official LinkedIn profile badge.
 *
 * - Client component - renders the badge container and injects `profile.js`.
 * - Syncs `data-theme` with the app's resolved theme (light/dark).
 * - Re-injects `profile.js` whenever the theme changes so the iframe re-renders.
 */
export function LinkedInBadge({
  className,
  size = "medium",
  type = "VERTICAL",
}: LinkedInBadgeProps) {
  const { resolvedTheme } = useTheme();
  const vanity = getLinkedInVanity();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = LINKEDIN_PROFILE_JS;
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [theme]);

  if (!vanity) return null;

  return (
    <div className={cn("flex justify-center", className)}>
      <div
        key={theme}
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size={size}
        data-theme={theme}
        data-type={type}
        data-vanity={vanity}
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href={`${siteConfig.social.linkedin}?trk=profile-badge`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {siteConfig.name}
        </a>
      </div>
    </div>
  );
}
