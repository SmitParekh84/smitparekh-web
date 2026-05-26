import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfolio - Production Web Apps by Smit Parekh",
  description:
    "Explore web applications built by Smit Parekh for FinTech, SaaS, LegalTech, and enterprise clients - React, Next.js, Node.js, TypeScript, PostgreSQL.",
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
    title: "Portfolio - Production Web Apps by Smit Parekh",
    description:
      "Explore web applications built by Smit Parekh - React, Next.js, Node.js for FinTech, SaaS, and enterprise clients.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-portfolio-case-studies.png`,
        width: 1200,
        height: 630,
        alt: "Smit Parekh Portfolio - Case Studies of Production Web Apps",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Portfolio - Production Web Apps by Smit Parekh",
    description:
      "Web applications built by Smit Parekh - React, Next.js, Node.js for FinTech, SaaS, and enterprise.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-portfolio-case-studies.png`,
        width: 1200,
        height: 630,
        alt: "Smit Parekh Portfolio - Case Studies of Production Web Apps",
      },
    ],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
