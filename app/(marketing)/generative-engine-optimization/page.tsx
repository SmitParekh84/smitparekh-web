import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Brain, Sparkles, FileSearch,
  Target, BarChart3, Quote, ListChecks,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode, serviceRatingFields, aggregateRatingSchema } from "@/lib/seo/schema";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Generative Engine Optimization (GEO) - Get Cited by AI",
  description:
    "Generative Engine Optimization (GEO), done for you. Get your brand cited in ChatGPT, Claude, Perplexity, and Google AI Overviews via entity SEO and schema.",
  alternates: { canonical: `${siteConfig.url}/generative-engine-optimization` },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: `${siteConfig.url}/generative-engine-optimization`,
    siteName: siteConfig.name,
    title: "Generative Engine Optimization (GEO) - Get Cited by AI | Smit Parekh",
    description:
      "What GEO is and how to get your brand recommended inside ChatGPT, Perplexity, and AI Overviews - entity SEO, structured answers, quotable stats, and schema.",
    images: [{ url: `${siteConfig.url}/images/smit-parekh-generative-engine-optimization.png`, width: 1200, height: 630, alt: "Generative Engine Optimization (GEO) - Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Generative Engine Optimization (GEO) - Get Cited by AI | Smit Parekh",
    description:
      "Get your brand cited inside ChatGPT, Perplexity, and AI Overviews. GEO explained and done for you.",
    images: [`${siteConfig.url}/images/smit-parekh-generative-engine-optimization.png`],
  },
  keywords: [
    "generative engine optimization", "GEO", "what is GEO", "GEO services", "GEO consultant",
    "get cited by ChatGPT", "get cited by Perplexity", "rank in AI Overviews", "AI search optimization",
    "LLM optimization", "brand visibility in AI", "entity SEO", "AI citation optimization", "answer engine optimization",
  ],
};

const results = [
  { value: "GEO", label: "Generative Engine Optimization - being recommended inside AI answers, not just ranked", icon: Brain },
  { value: "4 engines", label: "ChatGPT, Perplexity, Gemini, and Google AI Overviews tracked for your brand", icon: BarChart3 },
  { value: "Cited", label: "Content structured so generative engines can extract and attribute it to you", icon: Quote },
  { value: "Dev-led", label: "Schema, entities, and content shipped by a developer, not just recommended", icon: Sparkles },
];

const howItWorks = [
  {
    icon: Quote,
    title: "Quotable, original facts",
    description: "Generative engines disproportionately cite original statistics, direct quotes, and clearly-sourced claims. Adding named data points and authoritative citations makes your page the source an AI reaches for.",
  },
  {
    icon: Target,
    title: "Answer-first structure",
    description: "A direct, extractable answer in the first one or two sentences - then the depth. LLMs lift the concise answer; the supporting detail earns the citation.",
  },
  {
    icon: FileSearch,
    title: "Entity & authority signals",
    description: "Consistent entity definitions, sameAs links, an author and Organization footprint, and topical depth tell models who you are and that you're a credible source on the topic.",
  },
  {
    icon: Sparkles,
    title: "Machine-readable schema",
    description: "FAQPage, Article, HowTo, Organization, and Person JSON-LD give generative engines the structured facts they prefer to read - clean, validated, and consistent.",
  },
];

const checklist = [
  "A direct answer to the target question in the first 1-2 sentences",
  "Original statistics, named data points, and clearly-sourced claims",
  "Validated FAQPage, Article, and Organization JSON-LD",
  "Consistent entity definitions and sameAs links to authoritative profiles",
  "A clear author / About footprint establishing topical expertise",
  "Fast, crawlable, server-rendered pages an AI crawler can actually read",
];

const internalLinks = [
  { href: "/services/aeo-geo-optimization", title: "AEO & GEO Services", description: "The full done-for-you engagement, with scope and pricing" },
  { href: "/ai-seo-consultant", title: "AI SEO Consultant", description: "SEO + AEO + GEO run together in one engagement" },
  { href: "/services/seo", title: "SEO Services", description: "The classic-search foundation GEO builds on" },
  { href: "/about", title: "About Smit Parekh", description: "The developer behind the work - background & approach" },
];

const faqs = [
  {
    q: "What is Generative Engine Optimization (GEO)?",
    a: "Generative Engine Optimization (GEO) is the practice of structuring your content and brand so that generative AI tools - ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews - mention, recommend, and cite you when they answer relevant questions. Where SEO optimises for ranking in a list of links, GEO optimises for being the source an AI quotes in its answer.",
  },
  {
    q: "How is GEO different from AEO and SEO?",
    a: "SEO targets traditional ranked results on Google. AEO (Answer Engine Optimization) targets the extractable answer in featured snippets and AI Overviews. GEO is broader - it targets being named and recommended inside conversational AI answers. They share a foundation but GEO leans heavily on quotable facts, entity consistency, authority, and structured data.",
  },
  {
    q: "How do you get cited by ChatGPT or Perplexity?",
    a: "By making your content the most useful, quotable, and machine-readable source for a question: a direct answer up top, original statistics and named facts, validated schema, consistent entity data, a credible author footprint, and fast crawlable pages. No single trick guarantees a citation - it's the combination, measured over time.",
  },
  {
    q: "Can GEO results actually be measured?",
    a: "Yes. I run a fixed set of your buyer questions across ChatGPT, Perplexity, Gemini, and AI Overviews on a schedule and log whether you appear, how you're described, and who's cited instead. That gives a monthly 'AI share of voice' you can track - so GEO is accountable, not hand-wavy.",
  },
  {
    q: "Is GEO worth it if my SEO is already good?",
    a: "Increasingly, yes. A growing share of buyers ask AI tools and never click a blue link, so strong Google rankings alone can still leave you invisible in AI answers. The good news: much of GEO builds on the SEO foundation you already have, so it's an extension rather than a restart.",
  },
  {
    q: "Who does the GEO work?",
    a: "I'm Smit Parekh, a full-stack developer who runs SEO, AEO, and GEO as engineering rather than guesswork - see /about for background. Because I ship the schema, entity data, and content fixes myself, recommendations don't get stuck waiting on a separate dev team.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Generative Engine Optimization (GEO) - Get Cited by ChatGPT, Perplexity & AI Overviews",
  description:
    "What Generative Engine Optimization is, how it differs from SEO and AEO, and how to get your brand mentioned and cited inside generative AI answers.",
  author: personNode(),
  publisher: personNode(),
  mainEntityOfPage: `${siteConfig.url}/generative-engine-optimization`,
  url: `${siteConfig.url}/generative-engine-optimization`,
  image: `${siteConfig.url}/images/smit-parekh-generative-engine-optimization.png`,
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Generative Engine Optimization (GEO)",
  provider: personNode(),
  serviceType: "Generative Engine Optimization",
  description:
    "Generative Engine Optimization services - getting brands mentioned and cited inside ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews through entity SEO, structured answers, quotable statistics, and schema.",
  url: `${siteConfig.url}/generative-engine-optimization`,
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Audit, sprint, and retainer engagements available. Free AI-visibility audit within 24 hours.", availability: "https://schema.org/InStock" },
  ...serviceRatingFields(),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Generative Engine Optimization", item: `${siteConfig.url}/generative-engine-optimization` },
  ],
};

export default function GenerativeEngineOptimizationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema()) }} />

      {/* Hero */}
      <AuroraBackground as="section" className="min-h-[70vh] flex items-center pt-16 bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/30 dark:bg-none dark:bg-neutral-950">
        <div className="page-container py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-sm text-blue-700 dark:border-white/20 dark:bg-white/10 dark:text-white/90 backdrop-blur-sm">
                <Brain className="w-4 h-4 text-blue-600 dark:text-cyan-300" />
                GEO - Generative Engine Optimization
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                Get Your Brand{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  Cited by AI
                </span>
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                When buyers ask ChatGPT, Perplexity, or Google&apos;s AI Overviews, do they hear your
                name - or a competitor&apos;s? Generative Engine Optimization makes your content the
                source AI tools quote and recommend. Here&apos;s what GEO is, how it works, and how I
                do it for you.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-blue-600 text-white hover:bg-blue-700 dark:bg-white dark:text-blue-600 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}>
                  Free AI-Visibility Audit
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/services/aeo-geo-optimization" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:bg-transparent dark:border-white/40 dark:text-white dark:hover:bg-white/10 dark:hover:text-white gap-2")}>
                  See GEO Services
                </Link>
              </div>

              <p className="text-xs text-neutral-400 dark:text-white/50">
                No commitment to enquire · Reply within 24 hours · Worldwide
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {results.map(({ value, label, icon: Icon }) => (
                <div key={value} className="rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-sm dark:border-white/15 dark:bg-white/8 p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/10">
                    <Icon className="w-5 h-5 text-blue-500 dark:text-cyan-300" />
                  </div>
                  <p className="text-2xl font-bold text-neutral-900 leading-none dark:text-white">{value}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed dark:text-white/65">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AuroraBackground>

      {/* Definition block (AEO/GEO extractable) */}
      <section className="page-section">
        <div className="page-container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6 sm:p-8">
            <Badge variant="secondary" className="mb-3">Definition</Badge>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              What is Generative Engine Optimization?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-foreground/90 leading-relaxed">
              <strong>Generative Engine Optimization (GEO)</strong> is the practice of structuring your
              content, data, and brand so that generative AI engines - such as ChatGPT, Claude,
              Perplexity, Gemini, and Google AI Overviews - mention, recommend, and cite you when they
              answer relevant questions. Unlike traditional SEO, which optimises for ranking in a list
              of links a person clicks, GEO optimises for being the source an AI quotes directly inside
              its generated answer. It relies on quotable original facts, an answer-first content
              structure, consistent entity data, authority signals, and machine-readable schema.
            </p>
          </div>
        </div>
      </section>

      {/* How GEO works */}
      <section className="page-section border-t border-border bg-muted/70">
        <div className="page-container">
          <SectionHeader
            label="How It Works"
            title="What Makes AI Cite a Page"
            description="Generative engines reward a specific set of signals. GEO is the deliberate work of giving them those signals - across your highest-value pages."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {howItWorks.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="page-section">
        <div className="page-container">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              label="GEO Checklist"
              title="Is Your Page Ready to Be Cited?"
              description="A quick checklist of what generative engines look for. I implement every item across your priority pages."
              align="left"
            />
            <ul className="space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <ListChecks className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="page-section border-t border-border bg-muted/70">
        <div className="page-container">
          <SectionHeader
            label="Go Deeper"
            title="Related Services & Pages"
            description="From the full done-for-you engagement to the classic SEO foundation it builds on."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {internalLinks.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
              >
                <h3 className="font-semibold text-sm leading-snug group-hover:text-blue-500 transition-colors">{page.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{page.description}</p>
                <span className="inline-flex items-center gap-1 text-xs text-blue-500 font-medium mt-1">Learn more <ArrowRight className="w-3 h-3" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Common Questions"
            title="GEO, Answered"
            description="The questions people ask about getting cited by AI."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section bg-muted/70">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-sm font-medium">Find out how AI describes you today</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                See where you stand in AI answers
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send me your site and a few buyer questions. I&apos;ll run them through ChatGPT, Perplexity,
                and AI Overviews, show you who&apos;s cited today, and map how to make it you - free, within 24 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}>
                  Get My AI-Visibility Audit
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/ai-seo-consultant" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2")}>
                  SEO + AEO + GEO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
