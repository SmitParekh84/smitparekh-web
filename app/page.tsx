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
        url: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
        width: 800,
        height: 800,
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
        url: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
        width: 800,
        height: 800,
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
  name: "Smit Parekh",
  url: siteConfig.url,
  jobTitle: "Full-Stack Web Developer",
  description:
    "Full-Stack Web Developer with 4+ years delivering production applications for FinTech, SaaS, and enterprise clients. Specialises in React, Next.js, Node.js, TypeScript, and AWS.",
  email: siteConfig.email,
  image: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
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
  ],
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.x,
    siteConfig.social.instagram,
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  alternateName: [
    "Smit Parekh - Full Stack Developer",
    "Smit Parekh Portfolio",
    "Smit Parekh Tools",
    "Smit Parekh Dev",
  ],
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en",
  author: {
    "@type": "Person",
    name: "Smit Parekh",
    url: siteConfig.url,
  },
  publisher: {
    "@type": "Person",
    name: "Smit Parekh",
    url: siteConfig.url,
    image: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
  },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
