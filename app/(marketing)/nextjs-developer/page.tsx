import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Code2, Zap, ShieldCheck,
  TrendingUp, Search, Globe, Layers, Server, Star, Clock,
} from "lucide-react";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiVercel, SiSupabase, SiPostgresql } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode, serviceRatingFields } from "@/lib/seo/schema";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/ui/section-header";
import { RelatedDeveloperPages } from "@/components/sections/RelatedDeveloperPages";

export const metadata: Metadata = {
  title: "Hire a Next.js Developer – 95+ Lighthouse, SEO-First, App Router Expert | Smit Parekh",
  description:
    "Hire a Next.js developer with 4+ years shipping full-stack production apps. App Router, Server Components, TypeScript strict, 95+ Lighthouse scores on every deployment. Fixed-price available. Free quote in 24 hours.",
  alternates: { canonical: `${siteConfig.url}/nextjs-developer` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/nextjs-developer`,
    siteName: siteConfig.name,
    title: "Hire a Next.js Developer – App Router Expert, 95+ Lighthouse | Smit Parekh",
    description: "Full-stack Next.js development — App Router, Server Components, TypeScript, SEO-first builds, 95+ Lighthouse. Deployed to Vercel or AWS.",
    images: [{ url: `${siteConfig.url}/images/hire-nextjs-developer.png`, width: 1200, height: 630, alt: "Hire a Next.js Developer – Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire a Next.js Developer – 95+ Lighthouse, SEO-First | Smit Parekh",
    description: "Full-stack Next.js. App Router, TypeScript, 95+ Lighthouse. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/hire-nextjs-developer.png`, width: 1200, height: 630 }],
  },
  keywords: [
    "hire Next.js developer", "Next.js developer for hire", "freelance Next.js developer",
    "Next.js developer UK", "Next.js developer Canada", "Next.js developer USA",
    "hire Next.js developer UK", "hire Next.js developer Canada", "Next.js App Router developer",
    "Next.js full stack developer", "Next.js TypeScript developer", "Next.js SEO developer",
    "Next.js Vercel developer", "Next.js 15 developer", "Next.js performance developer",
    "hire full stack Next.js developer", "Next.js SaaS developer", "Next.js e-commerce developer",
    "Next.js server components developer", "freelance Next.js developer UK",
  ],
};

const results = [
  { value: "95+", label: "Lighthouse score on every Next.js deployment — no exceptions, no excuses", icon: Zap },
  { value: "30+", label: "Full-stack Next.js applications shipped from architecture to production deploy", icon: Star },
  { value: "40%", label: "Performance improvement on a live Next.js migration from Pages to App Router", icon: TrendingUp },
  { value: "#1", label: "SEO-first builds using metadata API, structured data, ISR, and Core Web Vitals tuning", icon: Search },
];

const whatIBuild = [
  {
    icon: Code2,
    title: "SaaS Products",
    description: "Auth, billing, dashboards, multi-tenant architecture, and subscription gates — the full SaaS stack built on Next.js App Router with Supabase or PostgreSQL. Deployed and maintained.",
    tags: ["Next.js", "Supabase", "Stripe", "TypeScript"],
  },
  {
    icon: Search,
    title: "SEO-First Marketing Sites",
    description: "Core Web Vitals A+, metadata API, structured data, dynamic OG images, and ISR for content freshness. Built to rank — not just to look good in a browser.",
    tags: ["Next.js", "Metadata API", "Schema.org", "ISR"],
  },
  {
    icon: Layers,
    title: "Content Platforms & Blogs",
    description: "CMS-driven content with ISR or static generation, RSS feeds, structured data for Google News, and a full SEO content stack. Speed that doesn't trade off freshness.",
    tags: ["Next.js", "Sanity / Contentful", "ISR", "RSS"],
  },
  {
    icon: Globe,
    title: "E-commerce Storefronts",
    description: "Headless Shopify or custom cart, product catalog with ISR, checkout integration, and the page speed that actually converts browsers into buyers.",
    tags: ["Next.js", "Shopify Storefront API", "TypeScript", "Stripe"],
  },
  {
    icon: Server,
    title: "Full-Stack Web Applications",
    description: "API routes, Server Actions, middleware, Supabase or PostgreSQL, auth, and deployment — all inside a single Next.js monorepo. One codebase, full ownership.",
    tags: ["Next.js", "Server Actions", "PostgreSQL", "AWS"],
  },
  {
    icon: TrendingUp,
    title: "Legacy Next.js Migrations",
    description: "Pages Router to App Router. Next.js 12 to 15. Slow builds to sub-5s deploys. I've done the migration and the performance work that makes it worthwhile.",
    tags: ["App Router", "RSC", "TypeScript", "Lighthouse"],
  },
];

const differentiators = [
  {
    icon: Zap,
    title: "95+ Lighthouse is the floor, not the target",
    description: "LCP under 2.5s, CLS zero, INP under 200ms — not aspirational, but delivered. I profile before I ship, not after a client flags slowness.",
  },
  {
    icon: Search,
    title: "SEO built into the architecture, not bolted on",
    description: "Metadata API, generateStaticParams, ISR, dynamic OG images, structured data, canonical URLs, hreflang — the full stack, handled by the developer writing the code.",
  },
  {
    icon: ShieldCheck,
    title: "App Router without the footguns",
    description: "Server Components, Client Components, streaming, Suspense, parallel routes — I know which patterns cause silent re-renders and which ones scale. Experience from real migrations, not docs.",
  },
  {
    icon: Code2,
    title: "Full-stack in one codebase",
    description: "Route Handlers, Server Actions, middleware — I own the API layer too. No hand-off to a separate backend team. One engineer, one codebase, full accountability.",
  },
];

const techStack = [
  { name: "Next.js 15/16", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind CSS v4", Icon: SiTailwindcss },
  { name: "Supabase", Icon: SiSupabase },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Vercel", Icon: SiVercel },
  { name: "AWS", Icon: FaAws },
];

const faqs = [
  {
    q: "How much does a Next.js developer cost?",
    a: "Fixed-price for scoped projects — a marketing site, a SaaS MVP, an App Router migration. Retainer for ongoing product work. I quote in writing within 24 hours of receiving a brief. No verbal estimates, no surprises.",
  },
  {
    q: "How long does a Next.js project take?",
    a: "A SEO-first marketing site: 2–3 weeks. An MVP SaaS product: 4–8 weeks. A full App Router migration from Pages Router: 2–4 weeks depending on codebase size. Every engagement gets a written timeline in the proposal.",
  },
  {
    q: "Do you use the App Router or Pages Router?",
    a: "App Router for all new projects — it's what Next.js is built around now and the performance and SEO benefits are significant. For existing Pages Router codebases, I can work in it or scope a migration.",
  },
  {
    q: "Can you handle the back-end as well?",
    a: "Yes. Route Handlers, Server Actions, Supabase, PostgreSQL, Redis, AWS — I own the full stack. You don't need a separate back-end developer unless the scale genuinely requires a dedicated team.",
  },
  {
    q: "Do you guarantee specific SEO rankings?",
    a: "No ethical developer does. I guarantee technically excellent SEO — Core Web Vitals, structured data, metadata, crawlability. Rankings depend on content, competition, and time. The technical foundation is my responsibility.",
  },
  {
    q: "Which deployment platform do you use?",
    a: "Vercel for most projects — it's the best-in-class Next.js deployment platform. AWS (EC2, CloudFront, S3) for clients with specific infra requirements or existing AWS accounts. Both include CI/CD as standard.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Next.js Developer for Hire",
  provider: personNode(),
  serviceType: "Next.js Full-Stack Development",
  description: "Freelance Next.js developer with 4+ years shipping full-stack production apps. App Router, Server Components, TypeScript strict, 95+ Lighthouse scores, SEO-first builds.",
  url: `${siteConfig.url}/nextjs-developer`,
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Fixed-price and retainer engagements. Free quote within 24 hours.", availability: "https://schema.org/InStock" },
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
    { "@type": "ListItem", position: 2, name: "Hire a Next.js Developer", item: `${siteConfig.url}/nextjs-developer` },
  ],
};

export default function NextjsDeveloperPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <AuroraBackground as="section" className="min-h-[75vh] flex items-center pt-16 bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/30 dark:bg-none dark:bg-neutral-950">
        <div className="page-container py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-sm text-blue-700 dark:border-white/20 dark:bg-white/10 dark:text-white/90 backdrop-blur-sm">
                <SiNextdotjs className="w-4 h-4 text-neutral-700 dark:text-white" />
                Next.js App Router Expert · TypeScript · SEO-First
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                Next.js That{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  Ranks, Converts,
                </span>{" "}
                and Scales
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                95+ Lighthouse. Core Web Vitals A+. SEO architecture built into every route, not retrofitted
                after the fact. Full-stack from Server Components to PostgreSQL — deployed and monitored from day one.
              </p>

              <ul className="space-y-2.5">
                {[
                  "App Router, Server Components, and streaming — used correctly",
                  "95+ Lighthouse score on every deployment, guaranteed",
                  "SEO metadata API, structured data, ISR — the full stack",
                  "Deployed to Vercel or AWS with CI/CD included",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 dark:text-cyan-300 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg" }), "bg-blue-600 text-white hover:bg-blue-700 dark:bg-white dark:text-blue-600 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:bg-transparent dark:border-white/40 dark:text-white dark:hover:bg-white/10 dark:hover:text-white gap-2")}
                >
                  See the Work
                </Link>
              </div>

              <p className="text-xs text-neutral-400 dark:text-white/50">
                No commitment to enquire · Reply within 24 hours · UK, US, Canada & worldwide
              </p>
            </div>

            {/* Right — result cards */}
            <div className="grid grid-cols-2 gap-4">
              {results.map(({ value, label, icon: Icon }) => (
                <div key={value} className="rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-sm dark:border-white/15 dark:bg-white/8 p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/10">
                    <Icon className="w-5 h-5 text-blue-500 dark:text-cyan-300" />
                  </div>
                  <p className="text-3xl font-bold text-neutral-900 leading-none dark:text-white">{value}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed dark:text-white/65">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AuroraBackground>

      {/* Tech strip */}
      <section className="border-y border-border bg-muted/30">
        <div className="page-container py-5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-2 hidden sm:block">
              Stack
            </p>
            {techStack.map(({ name, Icon }) => (
              <span key={name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-foreground/80">
                <Icon className="w-3.5 h-3.5 text-blue-500" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What I build */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Next.js Expertise"
            title="What I Build With Next.js"
            description="Full-stack products, not just front-ends. From the first route to the production deploy — one engineer, full ownership."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whatIBuild.map(({ icon: Icon, title, description, tags }) => (
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

      {/* Differentiators */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Why Hire Me"
            title="Next.js Done Right Looks Different"
            description="The App Router has footguns. ISR has edge cases. SEO has nuance. I've hit all of them — and I know how to avoid them on your project."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {differentiators.map(({ icon: Icon, title, description }) => (
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

      {/* FAQ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Common Questions"
            title="Before You Reach Out"
            description="The questions every client asks — answered honestly."
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

      <RelatedDeveloperPages currentSlug="nextjs-developer" />

      {/* CTA */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-sm font-medium">Available for new Next.js projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Your Next.js project, delivered on time and built to rank
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send your brief. I&apos;ll reply within 24 hours with scope, timeline, and a fixed price. No discovery calls before you&apos;ve seen the numbers.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg" }), "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2")}
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
