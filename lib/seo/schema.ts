import { siteConfig } from "@/data/site";
import type { ToolSEO } from "@/data/tools-seo";
import type { HowToStep } from "@/data/tools-howto";

export function howToSchema(slug: string, tool: ToolSEO, steps: HowToStep[]) {
  const shortTitle = tool.title.split(" - ")[0];
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${shortTitle}`,
    description: tool.description,
    url: `${siteConfig.url}/free-tools/${slug}`,
    totalTime: "PT1M",
    tool: [{ "@type": "HowToTool", name: "Web Browser" }],
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
    author: { "@id": `${siteConfig.url}/#person` },
  };
}

// Shared inline Person node for use as author/provider/publisher on
// individual pages. Avoids dangling @id refs to a Person defined only
// on the homepage — Google evaluates each page's JSON-LD graph alone.
export function personNode() {
  return {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: "Smit Parekh",
    url: siteConfig.url,
    jobTitle: "Full-Stack Web Developer",
    image: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
      siteConfig.social.x,
    ],
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function aggregateRatingSchema() {
  const cfg = siteConfig.aggregateRating;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    url: siteConfig.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: cfg.ratingValue,
      reviewCount: cfg.reviewCount,
      bestRating: cfg.bestRating,
      worstRating: cfg.worstRating,
    },
  };
}
