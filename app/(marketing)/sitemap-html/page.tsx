import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2, Server, Database, Globe, Users, BookOpen,
  Wrench, FileText, HelpCircle, MessageSquare, ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Site Map – All Pages | Smit Parekh",
  description:
    "Complete directory of all pages on smitparekh.co.in — developer hire pages, portfolio, free tools, blog, and more.",
  alternates: { canonical: `${siteConfig.url}/sitemap-html` },
  robots: { index: true, follow: true },
};

const sections = [
  {
    label: "Hire a Developer",
    icon: Code2,
    description: "Speciality pages for every technology I work with",
    pages: [
      { href: "/full-stack-developer", title: "Full-Stack Developer", desc: "React, Next.js, NestJS, PostgreSQL & AWS — one engineer, full ownership" },
      { href: "/react-developer", title: "React Developer", desc: "Production React UIs with TypeScript, Redux, and 40% performance gains" },
      { href: "/nextjs-developer", title: "Next.js Developer", desc: "95+ Lighthouse, SEO-first App Router — from Server Components to deploy" },
      { href: "/nodejs-developer", title: "Node.js Developer", desc: "10K+ req/day APIs at 99.9% uptime — NestJS, Express, GraphQL" },
      { href: "/nestjs-developer", title: "NestJS Developer", desc: "TypeScript-first APIs with DI, guards, interceptors & microservices" },
      { href: "/api-developer", title: "API Developer", desc: "REST & GraphQL APIs — typed, documented, secured, cached from day one" },
      { href: "/saas-developer", title: "SaaS Developer", desc: "Multi-tenant apps with Stripe billing, auth & admin dashboards" },
      { href: "/postgresql-developer", title: "PostgreSQL Developer", desc: "Schema design, query optimisation, RLS & zero-downtime migrations" },
      { href: "/typescript-developer", title: "TypeScript Developer", desc: "Strict-mode TypeScript — no any, no suppressions, no surprises" },
    ],
  },
  {
    label: "Core Pages",
    icon: Globe,
    description: "Main sections of the site",
    pages: [
      { href: "/", title: "Home", desc: "Overview of Smit Parekh — full-stack developer for hire" },
      { href: "/about", title: "About", desc: "Background, experience, certifications, and how I work" },
      { href: "/portfolio", title: "Portfolio & Case Studies", desc: "Production projects shipped for FinTech, SaaS, and enterprise" },
      { href: "/services", title: "Services", desc: "End-to-end web development — frontend, backend, database, and deployment" },
      { href: "/hire-me", title: "Hire Me", desc: "Availability, engagement models, tech stack, and FAQs" },
      { href: "/contact", title: "Contact", desc: "Send a project brief — reply within 24 hours" },
    ],
  },
  {
    label: "Free Tools",
    icon: Wrench,
    description: "Developer tools available free, no signup required",
    pages: [
      { href: "/free-tools", title: "All Free Tools", desc: "11 free developer tools — no account needed" },
      { href: "/free-tools/password-generator", title: "Password Generator", desc: "Secure random password generator with custom rules" },
      { href: "/free-tools/word-counter", title: "Word Counter", desc: "Count words, characters, sentences, and reading time" },
      { href: "/free-tools/image-converter", title: "Image Converter", desc: "Convert images between JPG, PNG, WebP, and more" },
      { href: "/free-tools/qr-code-generator", title: "QR Code Generator", desc: "Generate QR codes for URLs, text, and more" },
      { href: "/free-tools/background-remover", title: "Background Remover", desc: "Remove image backgrounds with AI — instant results" },
      { href: "/free-tools/image-compressor", title: "Image Compressor", desc: "Compress images without visible quality loss" },
      { href: "/free-tools/viral-linkedin-post-generator", title: "LinkedIn Post Generator", desc: "AI-powered LinkedIn posts that drive engagement" },
      { href: "/free-tools/ats-resume-checker", title: "ATS Resume Checker", desc: "Check your resume against ATS systems before applying" },
      { href: "/free-tools/meta-tag-checker", title: "Meta Tag Checker", desc: "Audit any URL's meta tags, OG data, and Twitter cards" },
      { href: "/free-tools/seo-analyzer", title: "SEO Analyser", desc: "On-page SEO analysis for any URL — instant report" },
      { href: "/free-tools/linkedin-media-downloader", title: "LinkedIn Media Downloader", desc: "Download LinkedIn images and videos directly" },
    ],
  },
  {
    label: "Content",
    icon: BookOpen,
    description: "Articles, changelogs, and learning resources",
    pages: [
      { href: "/blog", title: "Blog", desc: "Technical articles on full-stack development, performance, and SEO" },
      { href: "/changelog", title: "Changelog", desc: "What's new on smitparekh.co.in — features and updates" },
      { href: "/for-students", title: "For Students", desc: "Resources and guidance for developers starting their career" },
    ],
  },
  {
    label: "Info",
    icon: HelpCircle,
    description: "Support and informational pages",
    pages: [
      { href: "/faq", title: "FAQ", desc: "Frequently asked questions about working with me" },
      { href: "/resume", title: "Resume", desc: "View or download my full CV" },
      { href: "/feedback", title: "Feedback", desc: "Share feedback about your experience" },
    ],
  },
  {
    label: "Legal",
    icon: FileText,
    description: "Legal and policy documents",
    pages: [
      { href: "/privacy-policy", title: "Privacy Policy", desc: "How data is collected, stored, and used on this site" },
      { href: "/terms", title: "Terms of Service", desc: "Terms and conditions for using this site" },
    ],
  },
];

export default function SitemapHTMLPage() {
  return (
    <div className="page-section">
      <div className="page-container">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">Site Map</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">All Pages</h1>
          <p className="text-muted-foreground text-base max-w-xl">
            Every page on smitparekh.co.in, organised by section.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map(({ label, icon: Icon, description, pages }) => (
            <div key={label}>
              <div className="flex items-center gap-3 mb-1">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
                  <Icon className="w-4 h-4 text-blue-500" />
                </div>
                <h2 className="text-lg font-bold">{label}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-5 pl-11">{description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {pages.map(({ href, title, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3.5 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium group-hover:text-blue-500 transition-colors truncate">
                        {title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                        {desc}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-blue-500 transition-colors mt-0.5 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
