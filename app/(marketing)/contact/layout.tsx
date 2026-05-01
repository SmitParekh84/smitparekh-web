import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Smit Parekh - Hire a Full Stack Developer",
  description:
    "Get in touch with Smit Parekh for full-stack web development. Discuss your project - React, Next.js, Node.js, TypeScript. Reply within 24 hours, proposal within 48.",
  alternates: { canonical: `${siteConfig.url}/contact` },
  keywords: [
    "contact Smit Parekh",
    "hire full stack developer",
    "hire React developer",
    "hire Next.js developer",
    "freelance developer contact",
    "web development inquiry",
    "hire web developer India",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/contact`,
    title: "Contact Smit Parekh - Hire a Full Stack Developer",
    description:
      "Discuss your web development project with Smit Parekh. Reply within 24 hours, scoped proposal within 48.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`,
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
    title: "Contact Smit Parekh - Hire a Full Stack Developer",
    description:
      "Discuss your web development project - React, Next.js, Node.js. Reply within 24 hours.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`,
        width: 800,
        height: 800,
        alt: "Smit Parekh - Full Stack Developer",
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Smit Parekh",
    description:
      "Contact page for Smit Parekh - Full Stack Web Developer available for new projects.",
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "Person",
      name: "Smit Parekh",
      url: siteConfig.url,
      email: siteConfig.email,
      jobTitle: "Full-Stack Web Developer",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${siteConfig.url}/contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
