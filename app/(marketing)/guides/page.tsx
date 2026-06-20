import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  DollarSign,
  GitCompareArrows,
  Users,
  Rocket,
  Code2,
  Layers,
  Globe,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/data/site";
import { guides, type GuideIconName } from "@/data/guides";
import { breadcrumbListSchema } from "@/lib/seo/schema";

const url = `${siteConfig.url}/guides`;

export const metadata: Metadata = {
  title: "Web Development Guides - Cost, Hiring & Tech Comparisons",
  description:
    "Practical, no-hype guides on what software costs, how to hire the right developer, and which technology fits your project. Real 2026 price ranges and honest comparisons.",
  keywords: [
    "web development guides",
    "software development cost guide",
    "how to hire a developer",
    "saas cost",
    "mvp cost",
    "website cost",
    "freelancer vs agency",
    "nextjs vs react",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url,
    siteName: siteConfig.name,
    title: "Web Development Guides - Cost, Hiring & Tech Comparisons | Smit Parekh",
    description:
      "No-hype guides on software cost, hiring developers, and choosing the right technology. Real 2026 price ranges and honest comparisons.",
    images: [
      {
        url: `${siteConfig.url}/images/guides-og/smit-parekh-guides.png`,
        width: 1200,
        height: 630,
        alt: "Web Development Guides — Smit Parekh",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Web Development Guides | Smit Parekh",
    description: "No-hype guides on software cost, hiring developers, and choosing the right technology.",
    images: [`${siteConfig.url}/images/guides-og/smit-parekh-guides.png`],
  },
};

const iconMap: Record<GuideIconName, LucideIcon> = {
  DollarSign,
  GitCompareArrows,
  Users,
  Rocket,
  Code2,
  Layers,
  Globe,
};

const categoryOrder = ["Cost Guide", "Comparison", "Hiring Guide", "Technical Guide"] as const;

export default function GuidesHubPage() {
  const breadcrumb = breadcrumbListSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Guides", url },
  ]);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Web Development Guides",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}/guides/${g.slug}`,
      name: g.heroTitle,
    })),
  };

  // Group guides by category, preserving a sensible display order.
  const grouped = categoryOrder
    .map((cat) => ({ cat, items: guides.filter((g) => g.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <PageHero
        eyebrow="Guides"
        icon={BookOpen}
        title="Web Development Guides"
        description="No-hype answers to the questions founders and teams actually ask — what things cost, how to hire well, and which technology fits. Written by the developer who builds them."
        align="center"
      />

      <section className="page-section">
        <div className="page-container space-y-14">
          {grouped.map(({ cat, items }) => (
            <div key={cat}>
              <h2 className="text-lg font-bold tracking-tight mb-5">{cat}s</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((g) => {
                  const Icon = iconMap[g.iconName];
                  return (
                    <Link
                      key={g.slug}
                      href={`/guides/${g.slug}`}
                      className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all h-full"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/15 transition-colors">
                          <Icon className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {g.readingTime}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-base leading-snug mb-2 group-hover:text-blue-500 transition-colors">
                          {g.heroTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {g.heroDescription}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">
                        Read guide
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="page-section bg-muted/70 border-t border-border">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Have a project these guides didn&apos;t answer?
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Tell me what you&apos;re building and I&apos;ll send a written, fixed-price estimate within 24 hours — scope, timeline, and price, with no sales pressure.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Get a free quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/hire-me"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold hover:border-blue-500/40 transition-colors"
              >
                How I work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
