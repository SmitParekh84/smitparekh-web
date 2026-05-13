import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Zap, ShieldCheck, Server,
  Code2, Search, Layers, AlertTriangle, Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode } from "@/lib/seo/schema";
import { BookCallButton } from "@/components/cal/BookCallButton";

export const metadata: Metadata = {
  title: "Production Next.js 2026: Architecture, Performance & Deployment Guide | Smit Parekh",
  description:
    "Everything that separates a production-grade Next.js app from a tutorial project: App Router architecture, 95+ Lighthouse, TypeScript strict, ISR, structured data, Vercel deployment, and monitoring. Written by a developer who ships these every week.",
  alternates: { canonical: `${siteConfig.url}/production-nextjs` },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: `${siteConfig.url}/production-nextjs`,
    siteName: siteConfig.name,
    title: "Production Next.js 2026: Architecture, Performance & Deployment Guide",
    description:
      "App Router architecture, 95+ Lighthouse, TypeScript strict, ISR, structured data, Vercel CI/CD. Written by a developer who ships production Next.js every week.",
    images: [{ url: `${siteConfig.url}/images/Smit-Parekh-Home.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Production Next.js 2026: Architecture, Performance & Deployment Guide",
    description: "What separates production Next.js from a tutorial — App Router, Lighthouse 95+, TypeScript strict, ISR, and Vercel CI/CD.",
    images: [{ url: `${siteConfig.url}/images/Smit-Parekh-Home.png` }],
  },
  keywords: [
    "production next.js 2026", "next.js best practices 2026", "next.js app router guide",
    "next.js production architecture", "next.js performance optimization", "next.js typescript strict",
    "next.js vercel deployment guide", "next.js isr best practices", "next.js seo guide",
    "next.js server components best practices", "next.js production checklist",
    "next.js core web vitals", "next.js structured data", "next.js lighthouse 100",
  ],
};

const checklist = [
  {
    icon: Code2,
    category: "Architecture",
    color: "text-blue-500 bg-blue-500/10",
    items: [
      { label: "App Router with colocated layouts, loading.tsx, and error.tsx per segment", critical: true },
      { label: "TypeScript strict mode — no any, no type assertions without comment", critical: true },
      { label: "Server Components by default; Client Components only when hooks are needed", critical: true },
      { label: "Server Actions for mutations — no separate API routes for internal calls", critical: false },
      { label: "Parallel Routes for modals and dashboards that need independent loading states", critical: false },
      { label: "Route groups to share layouts without polluting URL structure", critical: false },
    ],
  },
  {
    icon: Zap,
    category: "Performance",
    color: "text-amber-500 bg-amber-500/10",
    items: [
      { label: "LCP under 2.5s — hero image preloaded, above-the-fold CSS inlined", critical: true },
      { label: "CLS = 0 — explicit width/height on all images, no layout-shifting fonts", critical: true },
      { label: "INP under 200ms — heavy client logic moved to Server Components or Web Workers", critical: true },
      { label: "next/image with sizes prop on every image — no raw <img> tags in production", critical: true },
      { label: "next/font for all custom fonts — no Google Fonts CDN link in layout.tsx", critical: false },
      { label: "Dynamic imports for heavy client-side libraries (charts, editors, maps)", critical: false },
    ],
  },
  {
    icon: Search,
    category: "SEO",
    color: "text-green-500 bg-green-500/10",
    items: [
      { label: "generateMetadata() on every page — unique title, description, and canonical URL", critical: true },
      { label: "generateStaticParams() for all dynamic routes you want pre-rendered", critical: true },
      { label: "JSON-LD schema: Organization/Person on root, BreadcrumbList on every page, Article on posts", critical: true },
      { label: "Dynamic OG images via opengraph-image.tsx — not a single generic image for all pages", critical: false },
      { label: "robots.ts and sitemap.ts in app/ root — auto-generated, revalidated with pages", critical: false },
      { label: "hreflang tags if targeting multiple languages or regions", critical: false },
    ],
  },
  {
    icon: Server,
    category: "Data & Caching",
    color: "text-purple-500 bg-purple-500/10",
    items: [
      { label: "ISR (revalidate) for pages that change on a schedule — not all pages need real-time", critical: true },
      { label: "fetch() cache: 'force-cache' with revalidate tags — not raw unstable_cache", critical: true },
      { label: "revalidatePath / revalidateTag in Server Actions after mutations", critical: true },
      { label: "Loading skeletons via loading.tsx — never leave a blank page while data loads", critical: false },
      { label: "Suspense boundaries around async Server Components with specific fallbacks", critical: false },
    ],
  },
  {
    icon: ShieldCheck,
    category: "Security & Config",
    color: "text-red-500 bg-red-500/10",
    items: [
      { label: "Environment variables: NEXT_PUBLIC_ only for truly public values — never API keys", critical: true },
      { label: "CSP headers in next.config — at minimum: no inline scripts outside LD+JSON", critical: true },
      { label: "Server-only data access gated by auth check before any DB read", critical: true },
      { label: "Rate limiting on public API routes — Next.js Route Handlers are wide open by default", critical: false },
      { label: "vercel.json: no debug headers, no x-powered-by in prod", critical: false },
    ],
  },
  {
    icon: Layers,
    category: "Deployment (Vercel)",
    color: "text-cyan-500 bg-cyan-500/10",
    items: [
      { label: "Preview deployments on every PR — not merging unreviewed code to main", critical: true },
      { label: "Environment variables scoped to Production / Preview / Development — not shared", critical: true },
      { label: "Edge Config or Vercel KV for feature flags and A/B tests — not env var redeploys", critical: false },
      { label: "Vercel Analytics + Speed Insights on every production deployment", critical: false },
      { label: "Custom domains with HSTS and automatic HTTPS — Vercel handles this by default", critical: false },
    ],
  },
];

const footguns = [
  {
    icon: AlertTriangle,
    title: "\"use client\" at the top of every file",
    description: "This turns your Server Components back into client bundles — the exact problem App Router was designed to solve. Add it only to the file that actually needs useState, useEffect, or event handlers.",
  },
  {
    icon: AlertTriangle,
    title: "Fetching in useEffect instead of Server Components",
    description: "Data that doesn't change on user interaction belongs in an async Server Component, not a client-side fetch. useEffect fetches create waterfalls, flash blank states, and aren't cached by Next.js.",
  },
  {
    icon: AlertTriangle,
    title: "Skipping generateStaticParams for dynamic routes",
    description: "Without generateStaticParams, Next.js renders dynamic routes on-demand with no prebuilt HTML. Every visitor hits cold rendering and waits. List every slug you know at build time.",
  },
  {
    icon: AlertTriangle,
    title: "One revalidate value for every page",
    description: "A blog post that changes once a month doesn't need revalidate: 60. A dashboard probably shouldn't use ISR at all. Match your revalidation strategy to how often the data actually changes.",
  },
  {
    icon: AlertTriangle,
    title: "Missing sizes on next/image with fill or responsive layout",
    description: "Without the sizes prop, Next.js downloads the full-resolution image at every viewport. This alone can cost 500KB–2MB on mobile — and tanks your Lighthouse score.",
  },
  {
    icon: AlertTriangle,
    title: "No canonical URLs on dynamically generated pages",
    description: "If the same content is reachable at multiple URLs (with query params, trailing slashes, or case variants), Google splits link equity between them. Every page needs an explicit alternates.canonical.",
  },
];

const faqs = [
  {
    q: "Should I use the App Router or Pages Router for a new project in 2026?",
    a: "App Router for any new project. It's been stable since Next.js 13.4, and Next.js 15/16 invest entirely in it. Pages Router still works, but Server Components, Suspense, and the caching model are App Router-only. If you're on Pages Router and it's working, no need to migrate immediately — but new projects should start with App Router.",
  },
  {
    q: "How do I get 95+ Lighthouse without compromising features?",
    a: "Most Lighthouse regressions come from three things: unoptimised images (LCP), layout shift from fonts or async components (CLS), and heavy client-side JavaScript (INP + TBT). Use next/image with explicit dimensions, next/font for typography, and move data fetching to Server Components. Remaining regressions are almost always caused by third-party scripts — load them with next/script's lazyOnload strategy.",
  },
  {
    q: "What's the right caching strategy for Next.js in 2026?",
    a: "Default is aggressive — Next.js 15 changed fetch() to no-store by default for Server Components in dynamic rendering contexts. For data that changes on a schedule, use export const revalidate = N at the segment level. For pages triggered by mutations, combine revalidatePath/revalidateTag with Server Actions. Avoid unstable_cache directly — use the fetch() abstraction or React's cache() instead.",
  },
  {
    q: "How should I structure TypeScript in a large Next.js codebase?",
    a: "TypeScript strict: true in tsconfig — no exceptions. Put global types in types/index.ts, not global.d.ts. Co-locate component prop types with the component, not in a separate types file. Use satisfies instead of type assertions. Avoid Zod in Server Components unless you're actually validating untrusted input — TypeScript + strict generics is enough for internal data shapes.",
  },
  {
    q: "What structured data does every Next.js site need?",
    a: "At minimum: Person or Organization on the root layout (sitewide authority), BreadcrumbList on every page (navigation signal), WebPage or Article on content pages. If you have FAQs, add FAQPage. If you're a service business, add Service with offers. If you have ratings, add AggregateRating. Use JSON-LD (script type='application/ld+json') — never RDFa or Microdata in a React codebase.",
  },
  {
    q: "When should I use Server Actions vs Route Handlers?",
    a: "Server Actions for mutations triggered from forms or client components in your own UI — they're colocated, type-safe, and revalidate cache automatically. Route Handlers for public APIs, webhooks, or endpoints consumed by third parties who can't call a Server Action. Never expose a Route Handler that calls a Server Action internally — pick one.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Production Next.js 2026: Architecture, Performance & Deployment Guide",
  description:
    "Everything that separates a production-grade Next.js app from a tutorial project — App Router architecture, TypeScript strict, Lighthouse 95+, ISR, structured data, and Vercel deployment.",
  url: `${siteConfig.url}/production-nextjs`,
  author: personNode(),
  publisher: personNode(),
  datePublished: "2026-05-13",
  dateModified: "2026-05-13",
  inLanguage: "en",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/production-nextjs` },
  keywords: "production next.js, next.js best practices 2026, next.js app router, next.js performance",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Production Next.js Guide", item: `${siteConfig.url}/production-nextjs` },
  ],
};

export default function ProductionNextjsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 pb-16 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
        <div className="page-container relative max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300 mb-6">
            <Code2 className="w-3.5 h-3.5" />
            Developer Guide · Updated May 2026
          </div>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
            Production{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
              Next.js 2026
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/70 max-w-3xl leading-relaxed">
            Architecture, performance, SEO, and deployment. Everything that separates an app that ships and ranks from one that works in dev and collapses in production.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#checklist" className={cn(buttonVariants({ size: "lg" }), "bg-blue-500 hover:bg-blue-600 text-white gap-2")}>
              Jump to Checklist
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/nextjs-developer" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/20 text-white hover:bg-white/10 hover:text-white gap-2")}>
              Hire a Next.js Developer
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "95+", label: "Lighthouse floor" },
              { value: "< 2.5s", label: "LCP target" },
              { value: "0", label: "CLS target" },
              { value: "< 200ms", label: "INP target" },
            ].map(({ value, label }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-white/55 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="page-section scroll-mt-20">
        <div className="page-container">
          <SectionHeader
            label="Production Checklist"
            title="Ship Confidently — Check Every Box"
            description="These aren't opinions. They're the difference between a Next.js app that works in a demo and one that stays up, ranks, and scales with real users."
          />

          <div className="space-y-10">
            {checklist.map(({ icon: Icon, category, color, items }) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn("flex items-center justify-center w-9 h-9 rounded-xl", color)}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h2 className="text-lg font-bold">{category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map(({ label, critical }) => (
                    <div
                      key={label}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border p-4",
                        critical
                          ? "border-blue-500/30 bg-blue-500/5"
                          : "border-border bg-card"
                      )}
                    >
                      <CheckCircle2 className={cn("w-4 h-4 mt-0.5 shrink-0", critical ? "text-blue-500" : "text-muted-foreground/50")} />
                      <p className="text-sm leading-relaxed text-muted-foreground">{label}</p>
                      {critical && (
                        <Badge className="ml-auto shrink-0 text-[10px] px-1.5 py-0 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                          Critical
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footguns */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Common Mistakes"
            title="The App Router Footguns Nobody Warns You About"
            description="These mistakes are invisible in development, obvious in production, and show up in every Next.js codebase I've audited."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {footguns.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/15 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1.5">{title}</h3>
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
            title="Next.js Production FAQ"
            description="The questions that come up on every project — answered directly."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold leading-snug">{q}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reading links */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <SectionHeader label="Go Deeper" title="Related Reading" align="left" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            {[
              {
                title: "Deploy Next.js on Vercel (2026)",
                href: "/blog/deploy-nextjs-on-vercel-in-2026-a-beginners-guide",
                label: "Step-by-step deployment guide",
              },
              {
                title: "Why Your Website Is Slow",
                href: "/blog/why-your-website-is-slow-and-how-a-developer-fixes-it",
                label: "Performance deep-dive",
              },
              {
                title: "Hire a Next.js Developer",
                href: "/nextjs-developer",
                label: "Work with Smit",
              },
            ].map(({ title, href, label }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col gap-1.5 rounded-xl border border-border bg-card px-4 py-4 hover:border-blue-500/40 transition-colors"
              >
                <p className="text-sm font-medium group-hover:text-blue-500 transition-colors">{title}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section">
        <div className="page-container max-w-2xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 text-white text-center">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="relative space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-sm font-medium">Available for Next.js projects</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Need someone to build this right the first time?
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                I apply every item on this checklist to every project I take on. If you want a Next.js app that ships fast, ranks, and stays up — let&apos;s talk.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link
                  href="/nextjs-developer"
                  className={cn(buttonVariants({ size: "lg" }), "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}
                >
                  Hire a Next.js Developer
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <BookCallButton
                  size="lg"
                  variant="outline"
                  label="Book a free call"
                  className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
