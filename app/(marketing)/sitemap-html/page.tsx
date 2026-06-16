import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2, Server, Database, Globe, Users, BookOpen,
  Wrench, FileText, HelpCircle, MessageSquare, ArrowRight, MapPin,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { toolsSEO } from "@/data/tools-seo";
import { developerPages } from "@/data/developer-pages";
import { geoCountries } from "@/data/geo-pages";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Site Map - All Pages",
  description:
    "Complete directory of all pages on smitparekh.co.in - developer hire pages, portfolio, free tools, blog, and more.",
  alternates: { canonical: `${siteConfig.url}/sitemap-html` },
  robots: { index: false, follow: true },
};

type Page = { href: string; title: string; desc: string };

const corePages: Page[] = [
  { href: "/", title: "Home", desc: "Overview of Smit Parekh - full-stack developer for hire" },
  { href: "/about", title: "About", desc: "Background, experience, certifications, and how I work" },
  { href: "/portfolio", title: "Portfolio & Case Studies", desc: "Production projects shipped for FinTech, SaaS, and enterprise" },
  { href: "/services", title: "Services", desc: "End-to-end web development - frontend, backend, database, and deployment" },
  { href: "/hire-me", title: "Hire Me", desc: "Availability, engagement models, tech stack, and FAQs" },
  { href: "/contact", title: "Contact", desc: "Send a project brief - reply within 24 hours" },
];

const contentPages: Page[] = [
  { href: "/blog", title: "Blog", desc: "Technical articles on full-stack development, performance, and SEO" },
  { href: "/changelog", title: "Changelog", desc: "What's new on smitparekh.co.in - features and updates" },
  { href: "/for-students", title: "For Students", desc: "Resources and guidance for developers starting their career" },
  { href: "/production-nextjs", title: "Production Next.js", desc: "Shipping Next.js apps to production - checklist, config, and lessons learned" },
  { href: "/nextjs-vercel-guide", title: "Next.js & Vercel Guide", desc: "Step-by-step guide to deploying Next.js on Vercel with zero downtime" },
];

const infoPages: Page[] = [
  { href: "/faq", title: "FAQ", desc: "Frequently asked questions about working with me" },
  { href: "/resume", title: "Resume", desc: "View or download my full CV" },
  { href: "/feedback", title: "Feedback", desc: "Share feedback about your experience" },
];

const legalPages: Page[] = [
  { href: "/privacy-policy", title: "Privacy Policy", desc: "How data is collected, stored, and used on this site" },
  { href: "/terms", title: "Terms of Service", desc: "Terms and conditions for using this site" },
];

const devPages: Page[] = developerPages.map((p) => ({
  href: `/${p.slug}`,
  title: `${p.title} for Hire`,
  desc: p.description,
}));

const geoPages: Page[] = [
  {
    href: "/hire-developer",
    title: "Hire a Developer in the Gulf - GCC Hub",
    desc: "Overview page for all GCC country-targeted hire pages.",
  },
  ...geoCountries.map((c) => ({
    href: `/hire-developer/${c.slug}`,
    title: `Hire a Developer in ${c.primaryCity} & ${c.country}`,
    desc: c.intro,
  })),
];

const guidePages: Page[] = [
  { href: "/guides", title: "All Guides", desc: "Cost guides, hiring guides, and tech comparisons" },
  ...guides.map((g) => ({
    href: `/guides/${g.slug}`,
    title: g.heroTitle,
    desc: g.metaDescription,
  })),
];

const toolPages: Page[] = [...toolsSEO]
  .sort((a, b) => a.slug.localeCompare(b.slug))
  .map((t) => ({
    href: `/free-tools/${t.slug}`,
    title: t.title.split(" - ")[0],
    desc: t.description,
  }));

const sections = [
  { label: "Hire a Developer", icon: Code2, description: "Speciality pages for every technology I work with", pages: devPages },
  { label: "Hire by Region", icon: MapPin, description: "Country-targeted hire pages for the Gulf (GCC)", pages: geoPages },
  { label: "Core Pages", icon: Globe, description: "Main sections of the site", pages: corePages },
  { label: "Free Tools", icon: Wrench, description: `${toolsSEO.length} free browser-based tools - no signup required`, pages: toolPages },
  { label: "Guides", icon: BookOpen, description: "Cost guides, hiring guides, and technology comparisons", pages: guidePages },
  { label: "Content", icon: BookOpen, description: "Articles, changelogs, and learning resources", pages: contentPages },
  { label: "Info", icon: HelpCircle, description: "Support and informational pages", pages: infoPages },
  { label: "Legal", icon: FileText, description: "Legal and policy documents", pages: legalPages },
];

export default function SitemapHTMLPage() {
  return (
    <div className="page-section">
      <div className="page-container">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">Site Map</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">All Pages</h1>
          <p className="text-muted-foreground text-base max-w-xl">
            Every page on smitparekh.co.in, organised by section.
          </p>
        </div>

        <div className="space-y-14">
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
