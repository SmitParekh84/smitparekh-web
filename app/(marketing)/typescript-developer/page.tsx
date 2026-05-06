import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Code2, Zap, ShieldCheck,
  TrendingUp, Clock, Star, Globe, Server, Layers, Bug,
} from "lucide-react";
import {
  SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
  SiNestjs, SiPostgresql, SiGraphql, SiJest,
} from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/ui/section-header";
import { RelatedDeveloperPages } from "@/components/sections/RelatedDeveloperPages";

export const metadata: Metadata = {
  title: "Hire a TypeScript Developer – Type-Safe Apps That Ship Without Surprises | Smit Parekh",
  description:
    "Hire a TypeScript developer with 4+ years in strict-mode TypeScript across React, Next.js, Node.js, and NestJS. Fewer runtime bugs, better DX, 30+ typed codebases delivered. Fixed-price available. Free quote in 24 hours.",
  alternates: { canonical: `${siteConfig.url}/typescript-developer` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/typescript-developer`,
    siteName: siteConfig.name,
    title: "Hire a TypeScript Developer – Strict-Mode, No any, No Surprises | Smit Parekh",
    description:
      "TypeScript development across the full stack — React, Next.js, Node.js, NestJS, PostgreSQL. Strict mode, fully typed APIs, zero suppressions. Serving clients in the UK, US, Canada, and worldwide.",
    images: [{ url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`, width: 1200, height: 630, alt: "Hire a TypeScript Developer – Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire a TypeScript Developer – Strict Mode, Full Stack | Smit Parekh",
    description: "Type-safe React, Node.js, and NestJS. No any, no suppressions, no runtime surprises. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`, width: 1200, height: 630 }],
  },
  keywords: [
    "hire TypeScript developer", "TypeScript developer for hire", "freelance TypeScript developer",
    "TypeScript React developer", "TypeScript Node.js developer", "TypeScript NestJS developer",
    "TypeScript developer UK", "TypeScript developer USA", "TypeScript developer Canada",
    "senior TypeScript developer", "strict TypeScript developer", "full stack TypeScript developer",
    "hire TypeScript engineer", "TypeScript Next.js developer", "TypeScript API developer",
    "TypeScript PostgreSQL developer", "freelance TypeScript developer UK",
    "remote TypeScript developer", "TypeScript developer for hire UK",
  ],
};

const results = [
  { value: "100%", label: "Strict-mode TypeScript across every project — no any, no workarounds, no suppressions", icon: ShieldCheck },
  { value: "4+", label: "Years writing TypeScript in production across React, Node.js, and NestJS stacks", icon: Clock },
  { value: "30+", label: "Fully typed codebases delivered — frontend, backend, and shared type contracts", icon: Star },
  { value: "80%", label: "Fewer runtime type errors in production after migrating JS codebases to strict TS", icon: Bug },
];

const whatIBuild = [
  {
    icon: Code2,
    title: "Strictly Typed React & Next.js Apps",
    description: "Every component, hook, and API call fully typed. Props validated at compile time, not discovered at runtime. Your IDE becomes a safety net, not a suggestion box.",
    tags: ["TypeScript", "React", "Next.js", "Zod"],
  },
  {
    icon: Server,
    title: "Typed NestJS & Express APIs",
    description: "End-to-end type safety from HTTP request to database response. DTOs, decorators, response types — the entire API surface is documented by the type system itself.",
    tags: ["TypeScript", "NestJS", "Express", "class-validator"],
  },
  {
    icon: Layers,
    title: "Shared Type Contracts (Monorepos)",
    description: "A single source of truth for types shared between your front-end and back-end. No more drift between what the API sends and what the client expects.",
    tags: ["TypeScript", "Turborepo", "tRPC", "Zod"],
  },
  {
    icon: TrendingUp,
    title: "JavaScript to TypeScript Migrations",
    description: "I've migrated live production codebases from JavaScript to TypeScript incrementally — without shutting down development or introducing regressions.",
    tags: ["TypeScript", "JSDoc", "Incremental Migration", "ESLint"],
  },
  {
    icon: Globe,
    title: "GraphQL With Full Type Generation",
    description: "Schema-first GraphQL with codegen — your queries, mutations, and resolvers all type-checked automatically. No manually maintained interfaces that drift from reality.",
    tags: ["TypeScript", "GraphQL", "codegen", "Apollo"],
  },
  {
    icon: ShieldCheck,
    title: "Runtime Validation With Compile-Time Safety",
    description: "Zod and class-validator schemas that enforce type correctness at the boundary — parse-don't-validate at the API edge, strict types everywhere else.",
    tags: ["TypeScript", "Zod", "class-validator", "Prisma"],
  },
];

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Strict mode from day one",
    description: "I don't start with loose config and tighten later. Every project starts with strictNullChecks, noImplicitAny, and noUncheckedIndexedAccess enabled. The type system earns its keep from commit one.",
  },
  {
    icon: Code2,
    title: "Types that document, not just annotate",
    description: "Well-named types and interfaces tell the next developer what a value means, not just what it contains. Discriminated unions, branded types, template literals — used where they add clarity.",
  },
  {
    icon: Zap,
    title: "No type-as-documentation theatre",
    description: "I don't write types for show. If something can be inferred, I let it. If a generic would help, I write it. The goal is a codebase that's easier to work in — not one that looks impressive on a code review.",
  },
  {
    icon: CheckCircle2,
    title: "End-to-end type safety, not just the front-end",
    description: "Most TypeScript projects have a typed front-end and an any-riddled backend. I type the full stack — API responses, database queries, environment variables, everything.",
  },
];

const techStack = [
  { name: "TypeScript 5", Icon: SiTypescript },
  { name: "React 18/19", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "NestJS", Icon: SiNestjs },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "GraphQL", Icon: SiGraphql },
  { name: "Jest / Vitest", Icon: SiJest },
];

const faqs = [
  {
    q: "What does strict-mode TypeScript actually mean?",
    a: "It means the compiler is configured with strictNullChecks, noImplicitAny, strictFunctionTypes, and related flags enabled. This catches entire categories of runtime errors at compile time — null dereferences, missing properties, incorrect function signatures — before they ever reach production.",
  },
  {
    q: "Can you migrate our existing JavaScript codebase to TypeScript?",
    a: "Yes. I do this incrementally — starting with allowJs and tsconfig paths so TypeScript and JavaScript coexist, then migrating file by file without blocking your team's feature work. A scoping call will give you a realistic timeline and a phased plan.",
  },
  {
    q: "Do you use TypeScript on the backend as well?",
    a: "Yes — Node.js, Express, and NestJS with full TypeScript. DTOs, typed middleware, typed database queries via Prisma or TypeORM. The type safety runs from the HTTP request to the database and back.",
  },
  {
    q: "How long does it take to set up a TypeScript monorepo?",
    a: "A well-structured monorepo with shared types, a front-end app, and a backend API typically takes 3–5 days to scaffold properly — path aliases, build pipeline, shared packages, and CI. Getting it right upfront saves weeks of pain later.",
  },
  {
    q: "Can you add TypeScript to a project that uses Zod or Prisma?",
    a: "Absolutely — I use both regularly. Zod for runtime validation at API boundaries with inferred types, and Prisma for type-safe database queries. They compose well and I know how to wire them so the types flow end-to-end without duplication.",
  },
  {
    q: "How much does hiring a TypeScript developer cost?",
    a: "Fixed-price for scoped work — a migration, a new typed API, a frontend. Retainer for ongoing typed development. Send your brief and I'll reply with a written proposal within 24 hours.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "TypeScript Developer for Hire",
  provider: { "@type": "Person", name: "Smit Parekh", url: siteConfig.url },
  serviceType: "TypeScript Full-Stack Development",
  description: "Freelance TypeScript developer with 4+ years in strict-mode TypeScript across React, Next.js, Node.js, and NestJS. 30+ fully typed codebases delivered.",
  areaServed: "Worldwide",
  url: `${siteConfig.url}/typescript-developer`,
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Fixed-price and retainer engagements available. Free quote within 24 hours.", availability: "https://schema.org/InStock" },
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
    { "@type": "ListItem", position: 2, name: "Hire a TypeScript Developer", item: `${siteConfig.url}/typescript-developer` },
  ],
};

export default function TypeScriptDeveloperPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <AuroraBackground as="section" className="min-h-[75vh] flex items-center pt-16 bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/30 dark:bg-none dark:bg-neutral-950">
        <div className="page-container py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-sm text-blue-700 dark:border-white/20 dark:bg-white/10 dark:text-white/90 backdrop-blur-sm">
                <SiTypescript className="w-4 h-4 text-blue-300" />
                TypeScript Expert · Strict Mode · Full Stack · AWS Certified
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                TypeScript That{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-blue-300 via-cyan-300 dark:to-white bg-clip-text text-transparent">
                  Catches Bugs
                </span>{" "}
                Before They Ship
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                Runtime errors are expensive. A proper TypeScript setup catches them at compile time — before your users do.
                I write strict-mode TypeScript across the full stack so the type system works for you, not against you.
              </p>

              <ul className="space-y-2.5">
                {[
                  "Strict mode enabled from commit one — no any, no suppressions",
                  "End-to-end typed APIs — from HTTP request to database response",
                  "JavaScript-to-TypeScript migrations without blocking your team",
                  "Fixed-price proposals — scope agreed in writing before work starts",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-blue-300 mt-0.5 shrink-0" />
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
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:bg-transparent dark:border-white/40 dark:text-white dark:hover:bg-white/10 dark:hover:text-white")}
                >
                  See the Work
                </Link>
              </div>
              <p className="text-xs text-neutral-400 dark:text-white/50">No commitment to enquire · Reply within 24 hours · UK, US, Canada & worldwide</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {results.map(({ value, label, icon: Icon }) => (
                <div key={value} className="rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-sm dark:border-white/15 dark:bg-white/8 p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/10">
                    <Icon className="w-5 h-5 text-blue-300" />
                  </div>
                  <p className="text-3xl font-bold text-neutral-900 leading-none dark:text-white">{value}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed dark:text-white/65">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AuroraBackground>

      <section className="border-y border-border bg-muted/30">
        <div className="page-container py-5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-2 hidden sm:block">Stack</p>
            {techStack.map(({ name, Icon }) => (
              <span key={name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-foreground/80">
                <Icon className="w-3.5 h-3.5 text-blue-500" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="TypeScript Expertise"
            title="What I Build With TypeScript"
            description="Not typed-for-show. Full-stack, strict-mode TypeScript where the type system actively prevents bugs in production."
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

      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Why Hire Me"
            title="The Difference Between Typed and Properly Typed"
            description="Adding .ts to your files doesn't make your codebase type-safe. The configuration, the patterns, and the discipline do."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {differentiators.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 shrink-0">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1.5">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <SectionHeader label="FAQ" title="Common Questions" align="left" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedDeveloperPages currentSlug="typescript-developer" />

      <section className="page-section bg-muted/20">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-sm font-medium">Available Now</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Want TypeScript done properly?</h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send your brief and I&apos;ll reply within 24 hours with a written proposal. Fixed price, clear scope, no surprises.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-blue-600 text-white hover:bg-blue-700 dark:bg-white dark:text-blue-600 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}>
                  Get a Free Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/hire-me" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:bg-transparent dark:border-white/40 dark:text-white dark:hover:bg-white/10 dark:hover:text-white")}>
                  About Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
