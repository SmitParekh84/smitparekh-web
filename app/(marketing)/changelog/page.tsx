import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Wrench,
  ShieldCheck,
  Bug,
  Rocket,
  ArrowUpRight,
  CalendarDays,
  Tag,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/data/site";
import {
  changelog,
  tagLabel,
  type ChangelogTag,
} from "@/data/changelog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Changelog - Latest Features & Updates | Smit Parekh",
  description:
    "See every release, new free tool, improvement, and fix shipped on smitparekh.co.in. A transparent product changelog updated with each launch.",
  alternates: { canonical: `${siteConfig.url}/changelog` },
  robots: { index: true, follow: true },
  keywords: [
    "Smit Parekh changelog",
    "product updates",
    "release notes",
    "what's new",
    "free tools updates",
    "new features",
    "site changelog",
    "release history",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/changelog`,
    title: "Changelog - Latest Features & Updates | Smit Parekh",
    description:
      "A transparent product changelog. Every release, every new tool, every fix - in plain English.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`,
        width: 1200,
        height: 630,
        alt: "Smit Parekh - Changelog",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Changelog - Latest Features & Updates | Smit Parekh",
    description:
      "A transparent product changelog. Every release, every new tool, every fix.",
    images: [`${siteConfig.url}/images/Smit-Parekh-Home-og.png`],
  },
};

const tagStyles: Record<ChangelogTag, string> = {
  new: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  improved: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  fixed: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  security: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  performance:
    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
};

const tagIcons: Record<ChangelogTag, typeof Sparkles> = {
  new: Sparkles,
  improved: Wrench,
  fixed: Bug,
  security: ShieldCheck,
  performance: Rocket,
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const changelogSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Smit Parekh - Changelog",
  description:
    "Release notes and product updates for smitparekh.co.in including free tools, dashboards, and improvements.",
  itemListElement: changelog.map((release, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    item: {
      "@type": "CreativeWork",
      name: `v${release.version} - ${release.codename}`,
      datePublished: release.date,
      description: release.summary,
      url: `${siteConfig.url}/changelog#v${release.version.replace(/\./g, "-")}`,
    },
  })),
};

export default function ChangelogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(changelogSchema) }}
      />

      <PageHero
        eyebrow="Changelog"
        title="Every release, in plain English"
        description="A transparent record of new features, improvements, fixes, and security updates shipped on smitparekh.co.in. Updated with every launch."
        icon={Tag}
        align="center"
      />

      <section className="page-section">
        <div className="page-container max-w-4xl">
          {/* Legend */}
          <div className="mb-10 flex flex-wrap gap-2 justify-center">
            {(Object.keys(tagStyles) as ChangelogTag[]).map((tag) => {
              const Icon = tagIcons[tag];
              return (
                <span
                  key={tag}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                    tagStyles[tag]
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tagLabel(tag)}
                </span>
              );
            })}
          </div>

          {/* Releases */}
          <div className="relative">
            {/* vertical timeline line on md+ */}
            <div
              aria-hidden
              className="hidden md:block absolute left-[7.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-border to-transparent"
            />

            <div className="space-y-16">
              {changelog.map((release, idx) => {
                const anchor = `v${release.version.replace(/\./g, "-")}`;
                const isLatest = idx === 0;
                return (
                  <article
                    key={release.version}
                    id={anchor}
                    className="md:grid md:grid-cols-[8rem_1fr] md:gap-10 scroll-mt-24"
                  >
                    {/* Date column */}
                    <div className="mb-4 md:mb-0 md:text-right">
                      <div className="md:sticky md:top-24 inline-flex md:flex md:flex-col md:items-end gap-2">
                        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(release.date)}
                        </div>
                        {isLatest && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            Latest
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Body card */}
                    <div className="relative">
                      {/* timeline dot */}
                      <div
                        aria-hidden
                        className="hidden md:block absolute -left-[2.6rem] top-1.5 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-background"
                      />

                      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                        <header className="mb-5">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                              v{release.version}
                            </h2>
                            <span className="text-base font-medium text-blue-600 dark:text-blue-400">
                              {release.codename}
                            </span>
                          </div>
                          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {release.summary}
                          </p>
                        </header>

                        {/* Highlights */}
                        {release.highlights.length > 0 && (
                          <ul className="mb-6 space-y-1.5 rounded-xl bg-muted/40 border border-border/50 p-4">
                            {release.highlights.map((h) => (
                              <li
                                key={h}
                                className="flex items-start gap-2 text-sm text-foreground"
                              >
                                <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-500" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Detailed changes */}
                        <ul className="space-y-4">
                          {release.changes.map((change, ci) => {
                            const Icon = tagIcons[change.tag];
                            return (
                              <li
                                key={`${release.version}-${ci}`}
                                className="flex gap-3"
                              >
                                <span
                                  className={cn(
                                    "inline-flex items-center gap-1 self-start rounded-full border px-2 py-0.5 text-[11px] font-semibold mt-0.5 flex-shrink-0",
                                    tagStyles[change.tag]
                                  )}
                                >
                                  <Icon className="h-3 w-3" />
                                  {tagLabel(change.tag)}
                                </span>
                                <div className="min-w-0 flex-1">
                                  {change.href ? (
                                    <Link
                                      href={change.href}
                                      className="group inline-flex items-center gap-1 font-medium text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                      {change.title}
                                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                  ) : (
                                    <span className="font-medium text-foreground">
                                      {change.title}
                                    </span>
                                  )}
                                  {change.description && (
                                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                                      {change.description}
                                    </p>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-16 rounded-2xl border border-border bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              Have an idea for what we should build next?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
              We ship updates every week. If there is a tool, fix, or improvement
              you want to see, we would love to hear about it.
            </p>
            <Link
              href="/feedback"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Share feedback
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
