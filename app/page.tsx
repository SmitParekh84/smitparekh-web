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

export const metadata: Metadata = {
  title: `${siteConfig.name} — Full Stack Developer & Free Tools`,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    url: siteConfig.url,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Smit Parekh",
  url: siteConfig.url,
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer specialising in React, Node.js, TypeScript, and cloud infrastructure.",
  sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  author: { "@type": "Person", name: "Smit Parekh" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
