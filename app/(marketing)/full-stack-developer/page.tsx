import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Code2, Zap, ShieldCheck,
  TrendingUp, Globe, Layers, Server, Star, Clock, Users,
} from "lucide-react";
import { SiReact, SiNextdotjs, SiTypescript, SiNestjs, SiPostgresql, SiDocker } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode, serviceRatingFields, aggregateRatingSchema } from "@/lib/seo/schema";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/ui/section-header";
import { RelatedDeveloperPages } from "@/components/sections/RelatedDeveloperPages";

export const metadata: Metadata = {
  title: "Hire a Full-Stack Developer - React, Next.js & Node.js",
  description:
    "Hire a full-stack developer with 4+ years shipping production apps. React, Next.js, NestJS, PostgreSQL, AWS. One engineer, database to deploy.",
  alternates: { canonical: `${siteConfig.url}/full-stack-developer` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/full-stack-developer`,
    siteName: siteConfig.name,
    title: "Hire a Full-Stack Developer - React, Next.js, Node.js, PostgreSQL | Smit Parekh",
    description: "Full-stack developer with 4+ years shipping production apps. React, Next.js, NestJS, PostgreSQL, and AWS - one engineer, full ownership from database to deploy.",
    images: [{ url: `${siteConfig.url}/images/hire-full-stack-developer.png`, width: 1200, height: 630, alt: "Hire a Full-Stack Developer - Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire a Full-Stack Developer - React, Next.js, Node.js, AWS | Smit Parekh",
    description: "Full-stack developer - React, Next.js, NestJS, PostgreSQL, AWS. One engineer, full ownership. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/hire-full-stack-developer.png`, width: 1200, height: 630 }],
  },
  keywords: [
    "hire full-stack developer", "full-stack developer for hire", "freelance full-stack developer",
    "full-stack developer UK", "full-stack developer Canada", "full-stack developer USA",
    "hire full-stack developer UK", "hire full-stack developer Canada", "React Node.js developer",
    "Next.js full-stack developer", "full-stack TypeScript developer", "NestJS React developer",
    "full-stack PostgreSQL developer", "hire full-stack JavaScript developer",
    "full-stack AWS developer", "hire senior full-stack developer", "full-stack SaaS developer",
    "freelance full-stack developer UK", "full-stack web developer for hire",
    "hire full-stack engineer", "full-stack developer FinTech",
  ],
};

const results = [
  { value: "10+", label: "Full-stack production applications shipped - frontend to database to deployment, no hand-offs", icon: Star },
  { value: "4+", label: "Years writing React, Next.js, NestJS, and PostgreSQL in production for FinTech, SaaS, and enterprise", icon: Clock },
  { value: "95+", label: "Lighthouse score on every Next.js deployment - performance built in, not bolted on after the fact", icon: Zap },
  { value: "99.9%", label: "API uptime across production Node.js deployments handling 10,000+ daily requests at scale", icon: Globe },
];

const whatIBuild = [
  {
    icon: Code2,
    title: "SaaS Products",
    description: "Multi-tenant architecture, Stripe subscriptions, auth with SSO, onboarding flows, and admin dashboards. The full SaaS stack from database schema to marketing site - built to go from beta to paying customers.",
    tags: ["Next.js", "Supabase", "Stripe", "Multi-Tenant"],
  },
  {
    icon: TrendingUp,
    title: "FinTech Dashboards",
    description: "Real-time data, complex state, role-based access, and audit trails. I've shipped dashboards for liquidity.io, simplici.io, and equitytable.io - production FinTech with the reliability requirements that come with it.",
    tags: ["React", "Redux Toolkit", "WebSocket", "TypeScript"],
  },
  {
    icon: Layers,
    title: "Full-Stack Web Applications",
    description: "Next.js App Router frontend, NestJS or Express API, PostgreSQL database, Redis caching, and AWS deployment - all owned by one engineer. One codebase, full accountability, no coordination overhead.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "AWS"],
  },
  {
    icon: Server,
    title: "REST & GraphQL APIs",
    description: "TypeScript APIs with Zod validation, JWT auth, RBAC, rate limiting, Redis caching, and OpenAPI documentation. APIs that handle real traffic and real adversarial requests - not just happy-path tests.",
    tags: ["REST", "GraphQL", "NestJS", "Redis"],
  },
  {
    icon: Globe,
    title: "SEO-First Marketing Sites",
    description: "Next.js App Router with metadata API, structured data, dynamic OG images, ISR, and Core Web Vitals A+. Sites that rank - not just sites that look good in a Lighthouse report tab.",
    tags: ["Next.js", "SEO", "Metadata API", "Core Web Vitals"],
  },
  {
    icon: Users,
    title: "MVPs & Greenfield Products",
    description: "You have an idea and a brief. I'll turn it into a working product with the right architecture for today and enough room to grow tomorrow. From first commit to first paying user - one engineer.",
    tags: ["MVP", "Architecture", "Full-Stack", "Launch"],
  },
];

const differentiators = [
  {
    icon: Code2,
    title: "One engineer who owns the whole stack",
    description: "No hand-off between a frontend team and a backend team. No gap between the API contract and the component that calls it. I own the schema, the API, and the UI - and I'm accountable for all three.",
  },
  {
    icon: Zap,
    title: "Performance at both ends",
    description: "95+ Lighthouse on the frontend. Sub-50ms p95 on the API. Indexed queries in the database. Performance isn't a frontend concern or a backend concern - it's a full-stack concern, and I treat it that way.",
  },
  {
    icon: ShieldCheck,
    title: "Security across every layer",
    description: "Input validation on the API, RLS at the database layer, HTTPS and security headers on the frontend. Security decisions made consistently across the stack - not applied patchwork to whichever layer flagged a finding.",
  },
  {
    icon: TrendingUp,
    title: "Architecture that survives the first pivot",
    description: "I've seen what happens to codebases that weren't designed for change. I make the structural decisions at the start - domain boundaries, data model, API contracts - so pivots are features, not rewrites.",
  },
];

const techStack = [
  { name: "React / Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "NestJS", Icon: SiNestjs },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "React (SPA)", Icon: SiReact },
  { name: "Docker", Icon: SiDocker },
  { name: "AWS", Icon: FaAws },
];

const faqs = [
  {
    q: "How much does a full-stack developer cost?",
    a: "For a scoped project - MVP, a feature addition, a performance audit - I quote fixed price. For ongoing product work I offer a weekly or monthly retainer. Written proposal within 24 hours of a brief, no verbal estimates.",
  },
  {
    q: "What does full-stack actually mean in your case?",
    a: "Database design and migrations, REST or GraphQL API, React or Next.js frontend, CI/CD pipeline, and production deployment. I can hand off each layer or own the whole thing end-to-end. Most clients want the full ownership.",
  },
  {
    q: "Can you work with my existing codebase?",
    a: "Yes. Share the repo and I'll assess what's there honestly - what to keep, what to refactor, and what to rewrite. I won't recommend a full rewrite unless it's genuinely the right call with the right justification.",
  },
  {
    q: "Do you work with React or Next.js?",
    a: "Both. React with Vite for SPAs where server-side rendering isn't needed. Next.js App Router for anything SEO-sensitive, content-driven, or where a full-stack monorepo simplifies deployment. I'll recommend based on your requirements.",
  },
  {
    q: "How do you handle deployment and infrastructure?",
    a: "Vercel for Next.js projects - it's the best-in-class deployment platform. AWS (EC2, ECS, RDS, S3, CloudFront) for clients with specific infra requirements or existing AWS accounts. Docker for everything - containers ship the same everywhere.",
  },
  {
    q: "Do you do ongoing maintenance as well?",
    a: "Yes. Post-launch retainers for bug fixes, dependency updates, feature additions, and monitoring. I prefer long-term relationships with the products I ship - I care about what happens after deploy day.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Full-Stack Developer for Hire",
  provider: personNode(),
  serviceType: "Full-Stack Web Development",
  description: "Freelance full-stack developer with 4+ years shipping production applications. React, Next.js, NestJS, PostgreSQL, and AWS - one engineer from database to frontend deploy.",
  url: `${siteConfig.url}/full-stack-developer`,
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
    { "@type": "ListItem", position: 2, name: "Hire a Full-Stack Developer", item: `${siteConfig.url}/full-stack-developer` },
  ],
};

export default function FullStackDeveloperPage() {
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
            {/* Left - copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-sm text-blue-700 dark:border-white/20 dark:bg-white/10 dark:text-white/90 backdrop-blur-sm">
                <SiNextdotjs className="w-4 h-4 text-neutral-700 dark:text-white" />
                Full-Stack · React · NestJS · PostgreSQL · AWS
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                One Engineer,{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  Full Ownership
                </span>{" "}
                From Database to Deploy
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                Frontend teams and backend teams create coordination overhead. I own the schema, the API,
                and the UI - so there&apos;s no gap between what the API returns and what the component expects.
                One point of contact, full accountability.
              </p>

              <ul className="space-y-2.5">
                {[
                  "React / Next.js frontend - 95+ Lighthouse, SEO-first",
                  "NestJS or Express API - TypeScript strict, 10K+ req/day",
                  "PostgreSQL database - schema design, indexing, migrations",
                  "AWS or Vercel deployment - CI/CD included from day one",
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
                No commitment to enquire · Reply within 24 hours · Remote-friendly · working with startups across the Gulf, US, UK & India
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
            label="Full-Stack Expertise"
            title="What I Build"
            description="End-to-end products - not just components or endpoints. From the first migration to the first paying user, one engineer with full context on every layer."
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
            title="Why Full-Stack Ownership Matters"
            description="Split teams create split accountability. When one engineer owns the schema, API, and UI, there are no gaps - and no one to blame when things break."
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
            description="The questions every client asks - answered honestly."
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

      <RelatedDeveloperPages currentSlug="full-stack-developer" />

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
                <span className="text-sm font-medium">Available for new full-stack projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to hire a full-stack developer with end-to-end ownership?
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send your brief. I&apos;ll reply within 24 hours with a written proposal - scope, timeline, and price. No discovery calls until you&apos;ve seen the numbers.
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
