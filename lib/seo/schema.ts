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
    "@type": "Organization",
    "@id": `${siteConfig.url}/#org`,
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

// areaServed for use inside a Service node.
// India is listed alongside Worldwide because GSC shows 95% of clicks
// originate from India — the geo signal helps win local "hire X developer"
// queries without hurting the worldwide audience already in `areaServed`.
export function serviceRatingFields() {
  return {
    areaServed: [
      "Worldwide",
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Canada" },
    ],
  };
}
