import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Search, Brain, Sparkles, FileSearch,
  TrendingUp, Target, BarChart3, Zap, Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode, serviceRatingFields, aggregateRatingSchema } from "@/lib/seo/schema";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "AI SEO Consultant - SEO + AEO + GEO for Google and AI Search",
  description:
    "AI SEO consultant covering SEO, AEO, and Generative Engine Optimization (GEO). Rank on Google and get cited by ChatGPT, Perplexity, and AI Overviews.",
  alternates: { canonical: `${siteConfig.url}/ai-seo-consultant` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/ai-seo-consultant`,
    siteName: siteConfig.name,
    title: "AI SEO Consultant - SEO + AEO + GEO | Smit Parekh",
    description:
      "Rank on Google and inside AI answers. SEO, AEO, and GEO from a developer who fixes Core Web Vitals, schema, and content - and measures your citation rate in ChatGPT and Perplexity.",
    images: [{ url: `${siteConfig.url}/images/smit-parekh-ai-seo-consultant.png`, width: 1200, height: 630, alt: "AI SEO Consultant - Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "AI SEO Consultant - SEO + AEO + GEO | Smit Parekh",
    description:
      "SEO + AEO + GEO. Rank on Google and get cited by ChatGPT, Perplexity, and AI Overviews - by a developer who ships the fixes.",
    images: [`${siteConfig.url}/images/smit-parekh-ai-seo-consultant.png`],
  },
  keywords: [
    "AI SEO consultant", "AI SEO services", "SEO and AEO consultant", "GEO consultant",
    "answer engine optimization consultant", "generative engine optimization", "AI search optimization",
    "rank in ChatGPT", "get cited by Perplexity", "Google AI Overviews SEO", "LLM SEO consultant",
    "AEO GEO services", "modern SEO consultant", "developer SEO consultant", "freelance AI SEO expert",
  ],
};

const results = [
  { value: "3-in-1", label: "SEO + AEO + GEO in one engagement - Google rankings and AI citations together", icon: Search },
  { value: "Dev-led", label: "I fix the Core Web Vitals, schema, and rendering bugs an audit surfaces - not just flag them", icon: Zap },
  { value: "4 engines", label: "Visibility tracked across ChatGPT, Perplexity, Gemini, and Google AI Overviews", icon: Brain },
  { value: "+120%", label: "Median organic traffic uplift in 6 months on content + technical programs", icon: TrendingUp },
];

const pillars = [
  {
    icon: Search,
    title: "SEO - Rank on Google",
    description: "On-page, technical, and content SEO: crawlability, schema, internal linking, Core Web Vitals, and genuinely useful long-form content. The classic foundation that still drives most clicks.",
    tags: ["On-page", "Technical SEO", "Content", "Core Web Vitals"],
  },
  {
    icon: Target,
    title: "AEO - Win the Answer",
    description: "Answer Engine Optimization: structuring content so it becomes the extractable answer in featured snippets, Google AI Overviews, and Perplexity - direct answers up top, clean schema, named facts.",
    tags: ["Featured snippets", "AI Overviews", "FAQ schema"],
  },
  {
    icon: Brain,
    title: "GEO - Get Recommended by AI",
    description: "Generative Engine Optimization: getting your brand mentioned and recommended inside ChatGPT, Claude, and Gemini answers through entity SEO, quotable statistics, and authority signals models trust.",
    tags: ["Entity SEO", "Citations", "Brand mentions"],
  },
];

const deliverables = [
  { icon: FileSearch, title: "SEO + AI visibility audit", description: "One audit covering technical SEO, on-page, content, plus a baseline of who gets cited for your buyer questions across ChatGPT, Perplexity, Gemini, and AI Overviews." },
  { icon: Sparkles, title: "Schema & structured data", description: "FAQPage, Article, HowTo, Organization, and Person JSON-LD - validated and templated. The machine-readable layer both Google and generative engines read." },
  { icon: Target, title: "Answer-first content structure", description: "Pages rewritten so the direct answer leads, followed by depth. Eligible for snippets and AI citations while still ranking the classic way." },
  { icon: TrendingUp, title: "Entity & authority signals", description: "Consistent entity definitions, sameAs links, quotable stats, and an author/Organization footprint so models associate your brand with the right topics and trust it." },
  { icon: Zap, title: "Core Web Vitals & rendering fixes", description: "Because I'm a developer, I ship the LCP, INP, CLS, and JavaScript-rendering fixes that an audit surfaces - not a 'send this to your dev team' email." },
  { icon: BarChart3, title: "Search + AI share-of-voice reporting", description: "Looker Studio for Google rankings and traffic, plus monthly tracking of how often you appear in AI answers and how you're described." },
];

const internalLinks = [
  { href: "/services/seo", title: "SEO Services", description: "On-page, technical & content SEO in one engagement" },
  { href: "/services/aeo-geo-optimization", title: "AEO & GEO", description: "Get cited by ChatGPT, Perplexity & AI Overviews" },
  { href: "/services/technical-seo", title: "Technical SEO", description: "Core Web Vitals, schema & JS rendering, fixed not flagged" },
  { href: "/generative-engine-optimization", title: "What is GEO?", description: "A plain-English guide to Generative Engine Optimization" },
];

const faqs = [
  {
    q: "What is an AI SEO consultant?",
    a: "An AI SEO consultant optimises your visibility across both traditional search and AI-powered search. That means classic SEO (ranking on Google), Answer Engine Optimization or AEO (being the extractable answer in featured snippets and AI Overviews), and Generative Engine Optimization or GEO (being mentioned and recommended inside ChatGPT, Claude, and Perplexity answers).",
  },
  {
    q: "What's the difference between SEO, AEO, and GEO?",
    a: "SEO gets your page ranked in Google's blue links. AEO gets your content lifted as the direct answer in snippets and AI Overviews. GEO gets your brand named and recommended inside generative AI chat responses. They share a foundation - crawlability, authority, structure - but AEO and GEO reward extractable answers, schema, named facts, and consistent entities far more heavily.",
  },
  {
    q: "Why does AI search optimization matter now?",
    a: "A growing share of buyers ask ChatGPT, Perplexity, or Google's AI Overviews and never click a traditional result. If your brand isn't structured to be cited there, you're invisible to those buyers no matter how well you rank in classic search. Optimising for both is now table stakes.",
  },
  {
    q: "Can you guarantee I'll be cited by ChatGPT or rank #1 on Google?",
    a: "No - and anyone who guarantees either is bluffing. Rankings and AI citations are influenced by factors no one fully controls. What I guarantee is that the technical fixes are correct, the content is genuinely better than what currently wins, and that both Google rankings and AI citation rate are measured month over month so the work is accountable.",
  },
  {
    q: "Do you actually implement the fixes?",
    a: "Yes. That's the advantage of a developer-led consultant - I fix the Core Web Vitals, ship the schema, rewrite the answer blocks, and wire the internal links myself. The audit just explains what's being fixed; implementation is the deliverable.",
  },
  {
    q: "Who are you and what's your background?",
    a: "I'm Smit Parekh, a full-stack developer with 4+ years building production web apps, and I run SEO, AEO, and GEO as a developer rather than a pure marketer. You can read more on the /about page. That technical depth is exactly why the fixes get shipped instead of stuck in a backlog.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI SEO Consultant - SEO, AEO & GEO",
  provider: personNode(),
  serviceType: "AI Search Optimization (SEO, AEO, GEO)",
  description:
    "AI SEO consulting covering classic SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) - ranking on Google and getting cited by ChatGPT, Perplexity, and Google AI Overviews.",
  url: `${siteConfig.url}/ai-seo-consultant`,
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Audit, sprint, and retainer engagements available. Free audit within 24 hours.", availability: "https://schema.org/InStock" },
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
    { "@type": "ListItem", position: 2, name: "AI SEO Consultant", item: `${siteConfig.url}/ai-seo-consultant` },
  ],
};

export default function AISEOConsultantPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema()) }} />

      {/* Hero */}
      <AuroraBackground as="section" className="min-h-[75vh] flex items-center pt-16 bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/30 dark:bg-none dark:bg-neutral-950">
        <div className="page-container py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-sm text-blue-700 dark:border-white/20 dark:bg-white/10 dark:text-white/90 backdrop-blur-sm">
                <Brain className="w-4 h-4 text-blue-600 dark:text-cyan-300" />
                SEO · AEO · GEO - classic search + AI search
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                Rank on Google.{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  Get Cited by AI.
                </span>
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                Search is splitting in two - Google&apos;s blue links and AI answers from ChatGPT,
                Perplexity, and Google AI Overviews. I optimise for both: classic SEO, Answer Engine
                Optimization, and Generative Engine Optimization - and because I&apos;m a developer,
                I ship the fixes instead of handing you a 90-page PDF.
              </p>

              <ul className="space-y-2.5">
                {[
                  "SEO - on-page, technical & content that ranks on Google",
                  "AEO - win featured snippets & Google AI Overviews",
                  "GEO - get named and recommended inside ChatGPT & Perplexity",
                  "Developer-led - Core Web Vitals & schema fixed, not just flagged",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-cyan-300 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-blue-600 text-white hover:bg-blue-700 dark:bg-white dark:text-blue-600 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}>
                  Get a Free Audit
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/about" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:bg-transparent dark:border-white/40 dark:text-white dark:hover:bg-white/10 dark:hover:text-white gap-2")}>
                  About Me
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

      {/* Quick answer (AEO/GEO extractable block) */}
      <section className="page-section">
        <div className="page-container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6 sm:p-8">
            <Badge variant="secondary" className="mb-3">In short</Badge>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              What is the difference between SEO, AEO, and GEO?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-foreground/90 leading-relaxed">
              <strong>SEO</strong> (Search Engine Optimization) gets your page ranked in Google&apos;s
              traditional results. <strong>AEO</strong> (Answer Engine Optimization) structures your
              content to become the direct answer in featured snippets and Google AI Overviews.
              <strong> GEO</strong> (Generative Engine Optimization) gets your brand mentioned and
              recommended inside generative AI tools like ChatGPT, Claude, and Perplexity. Smit Parekh
              is an AI SEO consultant and full-stack developer who runs all three together - ranking
              you on Google while making your content extractable, well-structured, and authoritative
              enough to be cited by AI answer engines.
            </p>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Three Pillars"
            title="SEO + AEO + GEO, Run Together"
            description="Visibility on Google and inside AI answers come from the same foundation - so I optimise for all three in one engagement, not three siloed retainers."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {pillars.map(({ icon: Icon, title, description, tags }) => (
              <div key={title} className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all h-full">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/15 transition-colors">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base leading-snug mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">{tag}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="What You Get"
            title="One Engagement, Both Kinds of Search"
            description="Everything needed to be visible on Google and inside AI answers - diagnosed, implemented, and measured."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deliverables.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 hover:border-blue-500/40 transition-colors">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Go Deeper"
            title="Related Services & Guides"
            description="Each area has a dedicated page with scope, process, and pricing."
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
            title="AI SEO, Answered"
            description="What clients ask before optimising for Google and AI search."
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
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span className="text-sm font-medium">Visible on Google and inside AI answers</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Want to show up everywhere your buyers search?
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send your site. I&apos;ll reply within 24 hours with a free audit - what&apos;s holding back
                your Google rankings, and where you&apos;re missing from AI answers - plus a prioritised plan.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}>
                  Get My Free Audit
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/services/seo" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2")}>
                  See SEO Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
