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
  "/client/",
  "/onboarding/",
  "/login",
  "/auth/",
];

// Major AI / answer-engine crawlers we explicitly welcome onto public pages for
// GEO/AEO visibility. Each gets `allow: /` for public content plus the shared
// private-path disallow so admin/auth stay off-limits.
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot", // ChatGPT training + citations
  "OAI-SearchBot", // ChatGPT Search index
  "ChatGPT-User", // ChatGPT real-time browsing
  // Anthropic
  "ClaudeBot", // Claude web crawler (training + search index)
  "Claude-User", // Claude.ai real-time browsing
  "Claude-SearchBot", // Claude web search index
  "anthropic-ai", // legacy crawler / brand signals
  // Google
  "Google-Extended", // Gemini + AI training/grounding
  "Google-CloudVertexBot", // Vertex AI on-demand fetch
  // Microsoft (powers Bing + Copilot)
  "Bingbot",
  // Perplexity
  "PerplexityBot", // answer-engine index
  "Perplexity-User", // real-time user fetch
  // Apple
  "Applebot", // Siri / Spotlight + Apple Intelligence search
  "Applebot-Extended", // Apple Intelligence training
  // Amazon
  "Amazonbot", // Alexa + AI answers
  // Meta
  "Meta-ExternalAgent", // Meta AI training crawler
  "Meta-ExternalFetcher", // Meta AI on-demand fetch
  "FacebookBot",
  // ByteDance / TikTok
  "Bytespider",
  "TikTokSpider",
  // Other answer engines / AI datasets
  "DuckAssistBot", // DuckDuckGo AI assist
  "MistralAI-User", // Mistral / Le Chat
  "cohere-ai", // Cohere
  "PetalBot", // Huawei
  "Timpibot", // Timpi
  "ProRataInc", // ProRata.ai / Gist
  "CCBot", // Common Crawl (feeds many LLM datasets)
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
