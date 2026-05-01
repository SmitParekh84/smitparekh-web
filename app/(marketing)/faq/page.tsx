import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  HelpCircle,
  ImageIcon,
  PenLine,
  Wrench,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/section-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { faqData } from "@/data/faq";
import { toolFAQs, type ToolFAQItem } from "@/data/tools-faq";
import { getToolSEO } from "@/data/tools-seo";

interface ToolGroup {
  id: string;
  title: string;
  icon: typeof ImageIcon;
  description: string;
  slugs: string[];
}

// Mirrors the categorisation used in `data/navigation.ts`.
const toolGroups: ToolGroup[] = [
  {
    id: "image-tools",
    title: "Image Tools",
    icon: ImageIcon,
    description:
      "Edit, convert, and optimise images right in your browser - no upload required for most tools.",
    slugs: ["background-remover", "image-compressor", "image-converter"],
  },
  {
    id: "content-seo-tools",
    title: "Content & SEO Tools",
    icon: PenLine,
    description:
      "Write better posts, audit your pages, and ship content that ranks and converts.",
    slugs: [
      "viral-linkedin-post-generator",
      "linkedin-media-downloader",
      "meta-tag-checker",
      "seo-analyzer",
      "word-counter",
    ],
  },
  {
    id: "career-dev-tools",
    title: "Career & Dev Tools",
    icon: Wrench,
    description:
      "Practical utilities for developers and job seekers - secure passwords, QR codes, and ATS resume scoring.",
    slugs: ["qr-code-generator", "ats-resume-checker", "password-generator"],
  },
];

interface ResolvedTool {
  slug: string;
  name: string;
  faqs: ToolFAQItem[];
}

function resolveTool(slug: string): ResolvedTool | null {
  const faqs = toolFAQs[slug];
  if (!faqs || faqs.length === 0) return null;
  const seo = getToolSEO(slug);
  const name = seo
    ? seo.title.split(" - ")[0]
    : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { slug, name, faqs };
}

const resolvedGroups = toolGroups
  .map((group) => ({
    ...group,
    tools: group.slugs
      .map(resolveTool)
      .filter((t): t is ResolvedTool => t !== null),
  }))
  .filter((g) => g.tools.length > 0);

const allFaqs: { question: string; answer: string }[] = [
  ...faqData,
  ...resolvedGroups.flatMap((group) =>
    group.tools.flatMap((tool) =>
      tool.faqs.map((f) => ({
        question: `${tool.name}: ${f.question}`,
        answer: f.answer,
      })),
    ),
  ),
];

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Smit Parekh",
  description:
    "Answers to common questions about Smit Parekh's full-stack web development services and every free tool on the site - background remover, SEO analyzer, ATS resume checker, password generator and more.",
  alternates: { canonical: `${siteConfig.url}/faq` },
  robots: { index: true, follow: true },
  keywords: [
    "FAQ",
    "frequently asked questions",
    "Smit Parekh FAQ",
    "free online tools FAQ",
    "background remover FAQ",
    "SEO analyzer FAQ",
    "ATS resume checker FAQ",
    "LinkedIn post generator FAQ",
    "password generator FAQ",
    "QR code generator FAQ",
    "image converter FAQ",
    "image compressor FAQ",
    "word counter FAQ",
    "meta tag checker FAQ",
    "LinkedIn media downloader FAQ",
    "full stack developer FAQ",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/faq`,
    title: "FAQ - Frequently Asked Questions | Smit Parekh",
    description:
      "Answers to common questions about services and every free tool - background remover, SEO analyzer, ATS resume checker, password generator and more.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`,
        width: 800,
        height: 800,
        alt: "Smit Parekh - FAQ",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "FAQ - Frequently Asked Questions | Smit Parekh",
    description:
      "Answers to common questions about services and every free tool on the site.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`,
        width: 800,
        height: 800,
        alt: "Smit Parekh - FAQ",
      },
    ],
  },
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${siteConfig.url}/faq`,
  mainEntity: allFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "FAQ",
      item: `${siteConfig.url}/faq`,
    },
  ],
};

interface FaqAccordionProps {
  items: ToolFAQItem[];
  idPrefix: string;
}

/**
 * Server-rendered accordion using native <details>/<summary>.
 * All question + answer text is in the initial HTML so search engines and
 * AI crawlers index the full content (no "use client" needed).
 */
function FaqAccordion({ items, idPrefix }: FaqAccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={`${idPrefix}-${i}`}
          id={`${idPrefix}-${i}`}
          className="group rounded-xl border border-border bg-card open:border-blue-500/40 transition-colors"
        >
          <summary
            className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 text-left"
          >
            <span className="font-medium text-sm leading-snug pr-2">
              {item.question}
            </span>
            <span
              aria-hidden="true"
              className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 transition-transform group-open:rotate-180"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </span>
          </summary>
          <div
            id={`${idPrefix}-${i}-content`}
            className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed"
          >
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        eyebrow="FAQ"
        icon={HelpCircle}
        title={<>Frequently Asked Questions</>}
        description="Quick, clear answers about working with me and every free tool on the site - so you can find what you need without the back-and-forth."
      />

      {/* Quick navigation */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Browse by Category"
            title="Jump to a Topic"
            description="Pick a section below to skip straight to the questions that matter to you."
          />

          <nav aria-label="FAQ categories">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <li>
                <a
                  href="#general"
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:border-blue-500/40 transition-colors"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500">
                    <HelpCircle className="w-5 h-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-sm">General</span>
                    <span className="block text-xs text-muted-foreground">
                      Services & process
                    </span>
                  </span>
                </a>
              </li>
              {resolvedGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:border-blue-500/40 transition-colors"
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-400">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-sm">
                          {group.title}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {group.tools.length} tool
                          {group.tools.length === 1 ? "" : "s"}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      {/* General FAQs */}
      <section id="general" className="page-section bg-muted/20 scroll-mt-24">
        <div className="page-container">
          <SectionHeader
            label="General"
            title="About Smit Parekh & This Site"
            align="left"
            description="Working with me, response times, and how the free tools handle your data."
          />
          <div className="max-w-3xl">
            <FaqAccordion items={faqData} idPrefix="general" />
          </div>
        </div>
      </section>

      {/* Per-tool FAQs grouped by category */}
      {resolvedGroups.map((group) => {
        const Icon = group.icon;
        return (
          <section
            key={group.id}
            id={group.id}
            className="page-section scroll-mt-24"
          >
            <div className="page-container">
              <div className="mb-10 lg:mb-12">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500">
                    <Icon className="w-5 h-5" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                    {group.title}
                  </p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {group.title} Questions
                </h2>
                <p className="text-muted-foreground mt-3 text-base leading-relaxed max-w-2xl">
                  {group.description}
                </p>
              </div>

              <div className="space-y-10">
                {group.tools.map((tool) => (
                  <article
                    key={tool.slug}
                    id={`tool-${tool.slug}`}
                    className="rounded-2xl border border-border bg-card p-6 sm:p-8 scroll-mt-24"
                  >
                    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {tool.faqs.length} question
                          {tool.faqs.length === 1 ? "" : "s"} answered
                        </p>
                      </div>
                      <Link
                        href={`/free-tools/${tool.slug}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "gap-1.5 w-fit",
                        )}
                        aria-label={`Open ${tool.name}`}
                      >
                        Use the tool
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </header>

                    <FaqAccordion items={tool.faqs} idPrefix={tool.slug} />
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Still have questions CTA */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Still Have Questions?
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Can&apos;t find what you&apos;re looking for?
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send me a message and I&apos;ll get back to you within 24 hours
                on business days.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold",
                  )}
                >
                  Contact Me
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/free-tools"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2",
                  )}
                >
                  Browse Free Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
