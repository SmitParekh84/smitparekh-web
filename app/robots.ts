import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Main rule: allow all crawlers on public content
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/login",
          "/auth/",
          "/sitemap-html",
        ],
      },
      // AI search/citation crawlers — allow all for GEO/AEO visibility
      { userAgent: "GPTBot", allow: "/" },          // ChatGPT web search + citations
      { userAgent: "OAI-SearchBot", allow: "/" },   // OpenAI SearchGPT
      { userAgent: "ChatGPT-User", allow: "/" },    // ChatGPT real-time browsing
      { userAgent: "PerplexityBot", allow: "/" },   // Perplexity AI search
      { userAgent: "ClaudeBot", allow: "/" },       // Claude web search
      { userAgent: "anthropic-ai", allow: "/" },    // Anthropic training (brand signals)
      { userAgent: "cohere-ai", allow: "/" },       // Cohere AI
      // Block low-value scrapers and training-only crawlers
      { userAgent: "Google-Extended", disallow: "/" }, // Gemini training only (not AI Overviews)
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    // The robots `Host:` directive must be a bare hostname — including the
    // scheme (https://) makes validators report "Syntax not understood".
    host: new URL(siteConfig.url).host,
  };
}
