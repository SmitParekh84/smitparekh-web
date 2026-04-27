import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfolio — Production Web Apps by Smit Parekh",
  description:
    "Explore web applications built by Smit Parekh for FinTech, SaaS, LegalTech, and enterprise clients — React, Next.js, Node.js, TypeScript, PostgreSQL.",
  alternates: { canonical: `${siteConfig.url}/portfolio` },
  keywords: [
    "Smit Parekh portfolio",
    "web development portfolio",
    "React projects",
    "Next.js projects",
    "full stack developer projects",
    "FinTech web app",
    "SaaS web application",
    "Node.js projects portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/portfolio`,
    title: "Portfolio — Production Web Apps by Smit Parekh",
    description:
      "Explore web applications built by Smit Parekh — React, Next.js, Node.js for FinTech, SaaS, and enterprise clients.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
        width: 800,
        height: 800,
        alt: "Smit Parekh — Full Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Portfolio — Production Web Apps by Smit Parekh",
    description:
      "Web applications built by Smit Parekh — React, Next.js, Node.js for FinTech, SaaS, and enterprise.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
        width: 800,
        height: 800,
        alt: "Smit Parekh — Full Stack Developer Portfolio",
      },
    ],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio — Production Web Apps by Smit Parekh",
    description:
      "Web applications built by Smit Parekh for FinTech, SaaS, LegalTech, and enterprise clients.",
    url: `${siteConfig.url}/portfolio`,
    author: {
      "@type": "Person",
      name: "Smit Parekh",
      url: siteConfig.url,
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
        name: "Portfolio",
        item: `${siteConfig.url}/portfolio`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
