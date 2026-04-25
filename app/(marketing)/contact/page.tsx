import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Smit Parekh — Hire a Full Stack Developer",
  description:
    "Start a project with Smit Parekh. Get a scoped proposal within 48 hours. Available for web development, API builds, and long-term partnerships worldwide.",
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: { url: `${siteConfig.url}/contact` },
  keywords: [
    "hire full stack developer",
    "contact Smit Parekh",
    "hire React developer",
    "web developer for hire",
    "freelance web developer contact",
    "hire Next.js developer",
  ],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-16">
      <div className="page-container page-section">
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="text-muted-foreground mt-4">Coming soon.</p>
      </div>
    </main>
  );
}
