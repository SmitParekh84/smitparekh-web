import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import Services from "@/components/sections/Services";
import FeaturedTools from "@/components/sections/FeaturedTools";
import Portfolio from "@/components/sections/Portfolio";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";
import { siteConfig } from "@/data/site";
import { faqData } from "@/data/faq";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Smit Parekh - Full Stack Developer for Hire | React, Next.js & Node.js",
  description:
    "Hire Smit Parekh - Full Stack Developer with 4+ years building production web apps for FinTech, SaaS, and enterprise clients. React, Next.js, Node.js, TypeScript, PostgreSQL, AWS. Also offers free online tools.",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Smit Parekh - Full Stack Developer for Hire | React, Next.js & Node.js",
    description:
      "Hire Smit Parekh - Full Stack Developer with 4+ years building production web apps for FinTech, SaaS, and enterprise clients. React, Next.js, Node.js, TypeScript, PostgreSQL, AWS.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`,
        width: 1200,
        height: 630,
        alt: "Smit Parekh - Full Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Smit Parekh - Full Stack Developer for Hire | React, Next.js & Node.js",
    description:
      "Hire Smit Parekh - Full Stack Developer with 4+ years building production web apps. React, Next.js, Node.js, TypeScript, AWS.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`,
        width: 1200,
        height: 630,
        alt: "Smit Parekh - Full Stack Developer",
      },
    ],
  },
  keywords: [
    "hire full stack developer",
    "React developer for hire",
    "Next.js developer",
    "Node.js developer",
    "TypeScript developer",
    "full stack web developer",
    "Smit Parekh",
    "freelance developer",
    "web application development",
    "FinTech developer",
    "SaaS developer",
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: "Smit Parekh",
  alternateName: ["Smit Parikh", "Smit Parekh Developer"],
  givenName: "Smit",
  familyName: "Parekh",
  url: siteConfig.url,
  mainEntityOfPage: siteConfig.url,
  jobTitle: "Full-Stack Web Developer",
  description:
    "Smit Parekh is a Full-Stack Web Developer based in Gujarat, India, with 4+ years building production web applications for FinTech, SaaS, AI/ML, and enterprise clients. He holds an AWS Certified Solutions Architect credential and a Google UX Design certification, and has shipped 20+ production systems including platforms handling 10,000+ daily API requests at 99.9% uptime. His primary stack is React, Next.js, Node.js, TypeScript, and PostgreSQL. Available globally as a freelance contractor.",
  email: siteConfig.email,
  image: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
  gender: "https://schema.org/Male",
  nationality: { "@type": "Country", name: "India" },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "Gujarat",
  },
  knowsLanguage: ["en", "hi", "gu"],
  worksFor: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#org`,
    name: "Smit Parekh - Freelance Web Development",
    url: siteConfig.url,
  },
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "NestJS",
    "GraphQL",
    "Full-Stack Web Development",
    "Technical SEO",
    "SaaS Development",
  ],
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.x,
    siteConfig.social.instagram,
    siteConfig.social.upwork,
  ],
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".hero-description", "meta[name='description']"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#org`,
  name: "Smit Parekh - Freelance Web Development",
  url: siteConfig.url,
  logo: `${siteConfig.url}/Smit-Logo.svg`,
  founder: { "@id": `${siteConfig.url}/#person` },
  contactPoint: {
    "@type": "ContactPoint",
    email: siteConfig.email,
    contactType: "customer service",
    availableLanguage: "English",
  },
  areaServed: "Worldwide",
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.upwork,
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: siteConfig.aggregateRating.ratingValue,
    reviewCount: siteConfig.aggregateRating.reviewCount,
    bestRating: siteConfig.aggregateRating.bestRating,
    worstRating: siteConfig.aggregateRating.worstRating,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  alternateName: [
    "Smit Parekh - Full Stack Developer",
    "Smit Parekh Portfolio",
    "Smit Parekh Tools",
    "Smit Parekh Dev",
    "Smit Parikh",
  ],
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en",
  dateModified: "2026-05-23",
  author: { "@id": `${siteConfig.url}/#person` },
  publisher: { "@id": `${siteConfig.url}/#person` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Smit Parekh - Full Stack Developer",
  url: siteConfig.url,
  datePublished: "2024-01-01",
  dateModified: "2026-05-18",
  mainEntity: { "@id": `${siteConfig.url}/#person` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Full-Stack Web Development",
  provider: { "@type": "Person", name: "Smit Parekh", url: siteConfig.url },
  serviceType: "Web Development",
  description:
    "End-to-end web development services including React frontends, Node.js backends, PostgreSQL databases, and AWS cloud deployment.",
  areaServed: "Worldwide",
  url: `${siteConfig.url}/services`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
  ],
};

// ── Client reviews as Review objects — feeds Google rich results + AI search ──
// Using real testimonials from data/testimonials.ts (5-star ones for best signal).
const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Client Reviews — Smit Parekh Full-Stack Developer",
  description: "Real client testimonials for Smit Parekh's web development services.",
  itemListElement: testimonials
    .filter((t) => t.rating === 5)
    .slice(0, 5)
    .map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        itemReviewed: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#org`,
          name: "Smit Parekh - Freelance Web Development",
          url: siteConfig.url,
        },
        author: {
          "@type": "Person",
          name: t.name,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: t.rating,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: t.quote,
        publisher: {
          "@type": "Organization",
          name: t.company,
          ...(t.companyUrl ? { url: t.companyUrl } : {}),
        },
      },
    })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />

      <Hero />
      <StatsBar />
      <Services />
      <FeaturedTools />
      <Portfolio />
      <Skills />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
