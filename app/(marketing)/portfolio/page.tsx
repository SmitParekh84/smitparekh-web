import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfolio — Full Stack Web Development Projects by Smit Parekh",
  description:
    "Real production applications built by Smit Parekh — FinTech platforms, SaaS dashboards, legal tech, and enterprise systems. React, Next.js, Node.js, TypeScript, PostgreSQL, AWS.",
  alternates: { canonical: `${siteConfig.url}/portfolio` },
  openGraph: { url: `${siteConfig.url}/portfolio` },
  keywords: [
    "Smit Parekh portfolio",
    "full stack developer portfolio",
    "React developer projects",
    "Next.js projects",
    "FinTech web app",
    "SaaS dashboard development",
    "enterprise web development",
    "Node.js portfolio",
    "TypeScript developer portfolio",
  ],
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen pt-16">
      <div className="page-container page-section">
        <h1 className="text-4xl font-bold">Portfolio</h1>
        <p className="text-muted-foreground mt-4">Coming soon.</p>
      </div>
    </main>
  );
}
