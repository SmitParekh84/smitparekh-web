import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Clock,
  CalendarDays,
  DollarSign,
  GitCompareArrows,
  Users,
  Rocket,
  Code2,
  Layers,
  Globe,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import {
  guides,
  getGuideBySlug,
  getRelatedGuides,
  type Guide,
  type GuideIconName,
} from "@/data/guides";
import {
  articleSchema,
  breadcrumbListSchema,
  faqPageSchema,
} from "@/lib/seo/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

const iconMap: Record<GuideIconName, LucideIcon> = {
  DollarSign,
  GitCompareArrows,
  Users,
  Rocket,
  Code2,
  Layers,
  Globe,
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  const url = `${siteConfig.url}/guides/${guide.slug}`;
  const ogImage = `${url}/opengraph-image`;
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      siteName: siteConfig.name,
      title: guide.metaTitle,
      description: guide.metaDescription,
      publishedTime: guide.updated,
      modifiedTime: guide.updated,
      authors: [siteConfig.url],
      section: guide.category,
      images: [{ url: ogImage, width: 1200, height: 630, alt: guide.heroTitle, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: guide.metaTitle,
      description: guide.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const HeroIcon = iconMap[guide.iconName];
  const related = getRelatedGuides(slug);
  const url = `${siteConfig.url}/guides/${guide.slug}`;

  const article = articleSchema({
    headline: guide.metaTitle,
    description: guide.metaDescription,
    url,
    datePublished: guide.updated,
    dateModified: guide.updated,
    section: guide.category,
    image: `${url}/opengraph-image`,
  });

  const faq = faqPageSchema(guide.faqs.map((f) => ({ q: f.q, a: f.a })));

  const breadcrumb = breadcrumbListSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Guides", url: `${siteConfig.url}/guides` },
    { name: guide.heroTitle, url },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-blue-500/5 to-transparent">
        <div className="page-container py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-1 text-xs text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/guides" className="hover:text-foreground transition-colors">Guides</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground line-clamp-1">{guide.eyebrow}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700 dark:border-white/15 dark:bg-white/10 dark:text-white/90">
              <HeroIcon className="h-4 w-4 text-blue-500 dark:text-cyan-300" />
              {guide.category}
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              {guide.heroTitle}
            </h1>

            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {guide.heroDescription}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                Updated {formatDate(guide.updated)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {guide.readingTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                By Smit Parekh
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TL;DR — the standalone answer block built for featured snippets + AI citation */}
      <section className="page-container pt-10">
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
            Quick answer
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
            {guide.tldr}
          </p>
        </div>
      </section>

      {/* Key takeaways */}
      <section className="page-container pt-8">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight mb-4">Key takeaways</h2>
          <ul className="space-y-2.5">
            {guide.takeaways.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-foreground/90">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                <span className="leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Body */}
      <article className="page-container py-10">
        <div className="max-w-3xl space-y-12">
          {guide.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight mb-4">{sec.heading}</h2>
              <div className="space-y-4">
                {sec.paragraphs.map((p, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>

              {sec.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[15px] text-foreground/90">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.links && sec.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {sec.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors"
                    >
                      {l.label}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* Cost table */}
          {guide.costTable && <DataTable table={guide.costTable} icon={DollarSign} />}

          {/* Comparison table */}
          {guide.comparisonTable && <DataTable table={guide.comparisonTable} icon={GitCompareArrows} />}
        </div>
      </article>

      {/* FAQ */}
      <section className="page-section bg-muted/20 border-y border-border">
        <div className="page-container max-w-3xl">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-3">FAQ</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-3">
            {guide.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <span className="text-sm sm:text-base font-medium pr-2">{f.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                    <span className="text-lg leading-none">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="relative mx-auto max-w-2xl space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{guide.ctaHeading}</h2>
              <p className="text-white/85 text-base leading-relaxed">{guide.ctaText}</p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg" }), "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}
                >
                  Get a free quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2")}
                >
                  See the work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related guides */}
      {related.length > 0 && (
        <section className="page-section bg-muted/20 border-t border-border">
          <div className="page-container">
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">Related guides</h2>
              <p className="mt-1 text-sm text-muted-foreground">More reading to help you decide.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r) => {
                const Icon = iconMap[r.iconName];
                return (
                  <Link
                    key={r.slug}
                    href={`/guides/${r.slug}`}
                    className="group flex flex-col gap-2.5 rounded-2xl border border-border bg-card px-5 py-5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                  >
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="font-semibold text-sm group-hover:text-blue-500 transition-colors leading-snug">
                      {r.heroTitle}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {r.heroDescription}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function DataTable({ table, icon: Icon }: { table: NonNullable<Guide["costTable"]>; icon: LucideIcon }) {
  return (
    <section className="not-prose">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <h2 className="text-lg font-semibold tracking-tight">{table.caption}</h2>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="bg-muted/40">
              {table.columns.map((c) => (
                <th key={c} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri} className="border-t border-border">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      "px-4 py-3 align-top text-foreground/90",
                      ci === 0 && "font-medium text-foreground"
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.footnote && (
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{table.footnote}</p>
      )}
    </section>
  );
}
