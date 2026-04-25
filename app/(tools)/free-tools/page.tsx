import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Free Online Tools — Background Remover, Resume Checker, QR Code Generator & More",
  description:
    "Free browser-based tools — AI background remover, ATS resume checker, LinkedIn post generator, QR code generator, word counter, SEO analyzer, and more. No signup, no cost.",
  alternates: { canonical: `${siteConfig.url}/free-tools` },
  openGraph: { url: `${siteConfig.url}/free-tools` },
  keywords: [
    "free online tools",
    "free web tools no signup",
    "free developer tools",
    "free productivity tools",
    "AI tools free",
    "background remover free",
    "ATS resume checker free",
    "LinkedIn post generator",
    "QR code generator free",
    "word counter online",
    "SEO analyzer free",
    "free image tools",
    "free career tools",
  ],
};

export default function FreeToolsPage() {
  return (
    <main className="min-h-screen pt-16">
      <div className="page-container page-section">
        <h1 className="text-4xl font-bold">Free Tools</h1>
        <p className="text-muted-foreground mt-4">Coming soon.</p>
      </div>
    </main>
  );
}
