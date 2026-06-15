import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Code2, Zap, ShieldCheck,
  TrendingUp, Globe, Layers, Server, Star, Clock, Activity,
} from "lucide-react";
import { SiReact, SiNextdotjs, SiTypescript, SiNestjs, SiPostgresql, SiRedis } from "react-icons/si";
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
  title: "Web Application Development - Production SaaS & Real-Time Apps",
  description:
    "Custom web application development by one senior engineer. SaaS solutions, real-time systems, and production deployments - React, Next.js, Node.js, PostgreSQL & AWS. Full product ownership, database to deploy.",
  alternates: { canonical: `${siteConfig.url}/web-application-development` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/web-application-development`,
    siteName: siteConfig.name,
    title: "Web Application Development - Production SaaS & Real-Time Apps | Smit Parekh",
    description:
      "Custom web applications built and shipped by one engineer - SaaS solutions, real-time systems, and production deployments on React, Next.js, Node.js, PostgreSQL and AWS. Full product ownership from first commit to first paying user.",
    images: [{ url: `${siteConfig.url}/images/Smit-Parekh-Home.png`, width: 1200, height: 630, alt: "Web Application Development - Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Web Application Development - SaaS, Real-Time & Production Apps | Smit Parekh",
    description:
      "Production web applications - SaaS solutions, real-time systems, performance optimization. One engineer, full product ownership. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/Smit-Parekh-Home.png`, width: 1200, height: 630 }],
  },
  keywords: [
    "web application development", "custom web applications", "web application developer",
    "build a web application", "SaaS solutions", "SaaS application development",
    "real-time systems", "real-time web applications", "production deployments",
    "production web applications", "product ownership", "full product ownership",
    "web application performance optimization", "scalable web applications",
    "React web application", "Next.js web application", "Node.js web application",
    "multi-tenant SaaS development", "WebSocket real-time app", "hire web application developer",
    "Smit Parekh web developer",
  ],
};

const results = [
  { value: "20+", label: "Production web applications shipped end to end - SaaS platforms, dashboards, and real-time systems, frontend to database to deploy", icon: Star },
  { value: "10K+", label: "Daily API requests sustained at 99.9% uptime across production deployments handling real traffic, not happy-path demos", icon: Activity },
  { value: "95+", label: "Lighthouse score on every build - performance optimization baked into the architecture, not bolted on after launch", icon: Zap },
  { value: "4+", label: "Years owning web applications across FinTech, SaaS, and enterprise - one engineer, full product ownership", icon: Clock },
];

const whatIBuild = [
  {
    icon: Layers,
    title: "SaaS Solutions",
    description: "Multi-tenant SaaS platforms with Stripe billing, SSO authentication, onboarding flows, role-based dashboards, and an admin back office. The complete SaaS stack from database schema to marketing site - built to take you from private beta to paying customers.",
    tags: ["Multi-Tenant", "Stripe", "Supabase", "Next.js"],
  },
  {
    icon: Activity,
    title: "Real-Time Systems",
    description: "Live dashboards, collaborative editors, notifications, and presence built on WebSockets and server-sent events. Optimistic UI, conflict resolution, and reconnect handling - real-time systems that stay correct under flaky networks and concurrent edits.",
    tags: ["WebSocket", "SSE", "Redis", "Live Data"],
  },
  {
    icon: Code2,
    title: "Custom Web Applications",
    description: "Bespoke web applications with a Next.js App Router frontend, a NestJS or Express API, a PostgreSQL database, and Redis caching - one codebase, one engineer, full accountability. No coordination overhead between a frontend team and a backend team.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "TypeScript"],
  },
  {
    icon: Server,
    title: "REST & GraphQL APIs",
    description: "Typed APIs with Zod validation, JWT auth, RBAC, rate limiting, and OpenAPI docs - the backbone behind every web application. APIs that survive real, adversarial traffic at 10,000+ requests a day, not just the demo path.",
    tags: ["REST", "GraphQL", "JWT", "Redis"],
  },
  {
    icon: TrendingUp,
    title: "Performance Optimization",
    description: "Slow application? I take builds from sluggish to 95+ Lighthouse - LCP under 2.5s, bundle size cut, N+1 queries killed, hot paths cached. See the dedicated performance optimization service for the full audit-and-implement process.",
    tags: ["Core Web Vitals", "Caching", "Bundle Size", "TTFB"],
  },
  {
    icon: Globe,
    title: "Production Deployments",
    description: "CI/CD pipelines, zero-downtime releases, monitoring, and rollback plans on Vercel or AWS. Production deployments treated as a first-class deliverable - your web application ships on a pipeline, not from a laptop.",
    tags: ["Vercel", "AWS", "CI/CD", "Docker"],
  },
];

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Full product ownership",
    description: "I own the schema, the API, and the UI - and I'm accountable for all three. No hand-off between teams, no gap between the API contract and the component that calls it. Product ownership means I care about what your web application does after deploy day, not just whether the ticket closed.",
  },
  {
    icon: Zap,
    title: "Performance optimization at every layer",
    description: "95+ Lighthouse on the frontend, sub-50ms p95 on the API, indexed queries in the database. Performance optimization isn't a frontend concern or a backend concern - in a web application it's a full-stack concern, and I treat it that way from the first commit.",
  },
  {
    icon: Activity,
    title: "Built for real-time and scale",
    description: "Real-time systems and high-traffic web applications fail in ways demos never reveal - race conditions, dropped sockets, N+1 queries under load. I architect for production deployments handling 10,000+ daily requests, with caching and observability in from day one.",
  },
  {
    icon: TrendingUp,
    title: "Architecture that survives the first pivot",
    description: "SaaS solutions live or die on how well the data model and domain boundaries hold up when the plan changes. I make the structural decisions up front so your web application treats pivots as features, not rewrites.",
  },
];

const techStack = [
  { name: "React / Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "NestJS", Icon: SiNestjs },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Redis", Icon: SiRedis },
  { name: "React (SPA)", Icon: SiReact },
  { name: "AWS", Icon: FaAws },
];

const faqs = [
  {
    q: "How much does it cost to build a web application?",
    a: "For a scoped build - an MVP, a SaaS module, a real-time feature - I quote fixed price. For ongoing product work I offer a weekly or monthly retainer. You get a written proposal within 24 hours of a brief: scope, timeline, and price. No verbal estimates and no discovery calls until you've seen the numbers.",
  },
  {
    q: "Do you build SaaS solutions from scratch?",
    a: "Yes. Multi-tenant architecture, Stripe subscriptions, authentication with SSO, onboarding, admin dashboards, and the marketing site - the complete SaaS stack owned by one engineer. From first commit to first paying user.",
  },
  {
    q: "Can you build real-time features into my web application?",
    a: "Yes - live dashboards, collaborative editing, notifications, and presence using WebSockets or server-sent events, backed by Redis. I handle the hard parts: optimistic UI, conflict resolution, reconnect logic, and keeping real-time systems correct under concurrent edits.",
  },
  {
    q: "What does full product ownership actually mean?",
    a: "I own every layer - PostgreSQL schema, the API, the React/Next.js UI, the CI/CD pipeline, and the production deployment. One point of contact, full accountability, and someone who's still invested after launch. No account managers, no junior devs learning on your budget.",
  },
  {
    q: "How do you handle production deployments?",
    a: "Vercel for Next.js applications - best-in-class for the framework. AWS (EC2, ECS, RDS, S3, CloudFront) for clients with specific infrastructure needs. Everything ships through CI/CD with zero-downtime releases, monitoring, and a rollback plan - production deployments are a deliverable, not an afterthought.",
  },
  {
    q: "My web application is slow - can you fix it without a rebuild?",
    a: "Usually, yes. Most performance problems are a handful of fixable issues: unoptimized images, oversized bundles, N+1 database queries, missing caching. I measure on real users, fix the 20% that unlocks 80% of the score, and target 95+ Lighthouse - see the performance optimization service for the full process.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Application Development",
  provider: personNode(),
  serviceType: "Custom Web Application Development",
  description:
    "Custom web application development by a senior full-stack engineer - SaaS solutions, real-time systems, and production deployments on React, Next.js, Node.js, PostgreSQL and AWS with full product ownership.",
  url: `${siteConfig.url}/web-application-development`,
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Fixed-price and retainer engagements available. Free quote within 24 hours.", availability: "https://schema.org/InStock" },
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
    { "@type": "ListItem", position: 2, name: "Web Application Development", item: `${siteConfig.url}/web-application-development` },
  ],
};

export default function WebApplicationDevelopmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <AuroraBackground as="section" className="min-h-[75vh] flex items-center pt-16 bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/30 dark:bg-none dark:bg-neutral-950">
        <div className="page-container py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-sm text-blue-700 dark:border-white/20 dark:bg-white/10 dark:text-white/90 backdrop-blur-sm">
                <SiNextdotjs className="w-4 h-4 text-neutral-700 dark:text-white" />
                Web Apps · SaaS · Real-Time · Production
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                Production Web Applications,{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  Built &amp; Shipped
                </span>{" "}
                by One Engineer
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                SaaS solutions, real-time systems, and the production deployments behind them - designed,
                built, and owned by a single senior engineer. From the first migration to the first paying
                user, with performance optimization built into the architecture, not bolted on after launch.
              </p>

              <ul className="space-y-2.5">
                {[
                  "SaaS solutions - multi-tenant, Stripe billing, SSO, dashboards",
                  "Real-time systems - WebSockets, live data, optimistic UI",
                  "Production deployments - CI/CD, zero-downtime, monitoring",
                  "Performance optimization - 95+ Lighthouse, 10K+ req/day",
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
                No commitment to enquire · Reply within 24 hours · UK, US, Canada &amp; worldwide
              </p>
            </div>

            {/* Right - result cards */}
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
            label="Web Application Expertise"
            title="What I Build"
            description="Complete web applications - not just components or endpoints. SaaS solutions, real-time systems, and the production deployments that keep them online, all owned by one engineer with full context on every layer."
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
            title="Why Full Product Ownership Matters"
            description="Split teams create split accountability. When one engineer owns the schema, API, UI, and production deployment, there are no gaps - and your web application has someone genuinely accountable for it."
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
            description="The questions every client asks before commissioning a web application - answered honestly."
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

      <RelatedDeveloperPages currentSlug="web-application-development" />

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
                <span className="text-sm font-medium">Available for new web application projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to build a web application with full product ownership?
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send your brief. I&apos;ll reply within 24 hours with a written proposal - scope, timeline, and price. SaaS solutions, real-time systems, or a rescue on an existing build.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg" }), "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}
                >
                  Start the Conversation
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
