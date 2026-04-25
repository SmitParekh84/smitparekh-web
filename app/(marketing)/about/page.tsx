import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About Smit Parekh — Full Stack Developer | React & Node.js Expert",
  description:
    "Meet Smit Parekh — Full Stack Developer with 3.5+ years building production web applications across FinTech, SaaS, and enterprise. Expert in React, Next.js, Node.js, TypeScript, PostgreSQL, and AWS.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: { url: `${siteConfig.url}/about` },
  keywords: [
    "Smit Parekh",
    "Smit Parekh developer",
    "about Smit Parekh",
    "full stack developer",
    "React developer",
    "Node.js developer",
    "TypeScript developer",
    "FinTech developer",
    "SaaS developer",
    "web developer India",
  ],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-16">
      <div className="page-container page-section">
        <h1 className="text-4xl font-bold">About</h1>
        <p className="text-muted-foreground mt-4">Coming soon.</p>
      </div>
    </main>
  );
}
