import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

// Private/sensitive paths kept out of every crawler's index. A user agent that
// matches its OWN group in robots.txt ignores the wildcard `*` group entirely,
// so every named AI bot below must restate these — otherwise allowing it on `/`
// would also expose /admin, /auth, the API, etc.
const PRIVATE_PATHS = [
  "/api/",
  "/admin/",
  "/dashboard/",
  "/login",
  "/auth/",
  "/sitemap-html",
];

// Major AI / answer-engine crawlers we explicitly welcome onto public pages for
// GEO/AEO visibility. Each gets `allow: /` for public content plus the shared
// private-path disallow so admin/auth stay off-limits.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI: ChatGPT training + citations
  "OAI-SearchBot", // OpenAI: ChatGPT Search index
  "ChatGPT-User", // OpenAI: ChatGPT real-time browsing
  "ClaudeBot", // Anthropic: Claude web search + citations
  "anthropic-ai", // Anthropic: legacy crawler / brand signals
  "Claude-Web", // Anthropic: Claude.ai browsing
  "Google-Extended", // Google: Gemini + AI training/grounding
  "PerplexityBot", // Perplexity: AI answer engine
  "Perplexity-User", // Perplexity: real-time user fetch
  "Applebot-Extended", // Apple: Apple Intelligence training
  "Amazonbot", // Amazon: Alexa + AI answers
  "cohere-ai", // Cohere AI
  "Meta-ExternalAgent", // Meta AI crawler
  "Bingbot", // Microsoft: Bing + Copilot
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Main rule: allow all crawlers on public content, block private areas.
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      // Named AI crawlers — same access as `*`, restated so they don't fall
      // through to an unrestricted group.
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVATE_PATHS,
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    // No `Host:` directive — it's a Yandex-only extension that Bing and Google
    // don't understand. Bing Webmaster Tools flags it as "Syntax not understood",
    // which suppressed crawling/indexing. Canonical host is enforced via the
    // www→apex (or apex→www) redirect + the canonical tag in metadata instead.
  };
}
