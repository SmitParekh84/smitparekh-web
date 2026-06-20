import { siteConfig } from "@/data/site";
import { certifications } from "@/data/about";
import type { ToolSEO } from "@/data/tools-seo";
import type { HowToStep } from "@/data/tools-howto";

// Machine-readable certifications for E-E-A-T / AEO. Shared so the homepage
// Person, the about-page Person, and every service-page Person all carry the
// same credential graph instead of stating them only in prose.
export function credentialNodes() {
  return certifications.map((cert) => ({
    "@type": "EducationalOccupationalCredential",
    name: cert.name,
    credentialCategory: "Certificate",
    recognizedBy: { "@type": "Organization", name: cert.issuer },
  }));
}

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
// on the homepage - Google evaluates each page's JSON-LD graph alone.
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
      siteConfig.social.instagram,
      siteConfig.social.upwork,
    ],
    hasCredential: credentialNodes(),
  };
}

// Article schema for long-form guide pages. Carries datePublished/dateModified
// (freshness for Google) and an inline Person author/publisher node so each
// page's JSON-LD graph stands on its own for AI answer-engine citation.
export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  section?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    ...(opts.section ? { articleSection: opts.section } : {}),
    image: opts.image ?? `${siteConfig.url}/images/Smit-Parekh-Home.png`,
    author: personNode(),
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#org`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    inLanguage: "en",
  };
}

// BreadcrumbList from an ordered list of { name, url } crumbs.
export function breadcrumbListSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
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
// The four target client markets are the Gulf (GCC), US, UK, and India.
// Listing them as explicit Country nodes (alongside Worldwide) strengthens the
// geo signal for "hire X developer <country>" queries in those markets.
export function serviceRatingFields() {
  return {
    areaServed: [
      "Worldwide",
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Qatar" },
      { "@type": "Country", name: "Bahrain" },
    ],
  };
}
