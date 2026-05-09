import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Code2, Zap, ShieldCheck,
  TrendingUp, Globe, Layers, Server, Star, Clock, Lock,
} from "lucide-react";
import { SiNestjs, SiTypescript, SiNodedotjs, SiGraphql, SiDocker, SiPostgresql } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode } from "@/lib/seo/schema";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/ui/section-header";
import { RelatedDeveloperPages } from "@/components/sections/RelatedDeveloperPages";

export const metadata: Metadata = {
  title: "Hire a NestJS Developer – TypeScript-First APIs, DI, Guards & Interceptors | Smit Parekh",
  description:
    "Hire a NestJS developer with 4+ years building production TypeScript APIs. Dependency injection, guards, interceptors, pipes, microservices, GraphQL, and AWS deployment. Free quote in 24 hours.",
  alternates: { canonical: `${siteConfig.url}/nestjs-developer` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/nestjs-developer`,
    siteName: siteConfig.name,
    title: "Hire a NestJS Developer – TypeScript APIs, DI, Microservices | Smit Parekh",
    description: "NestJS APIs in production — dependency injection, guards, interceptors, GraphQL, microservices, TypeScript strict. Deployed on AWS or Docker.",
    images: [{ url: `${siteConfig.url}/images/hire-nestjs-developer.png`, width: 1200, height: 630, alt: "Hire a NestJS Developer – Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire a NestJS Developer – TypeScript APIs, DI, Microservices | Smit Parekh",
    description: "NestJS TypeScript APIs with DI, guards, interceptors, GraphQL, and microservices. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/hire-nestjs-developer.png`, width: 1200, height: 630 }],
  },
  keywords: [
    "hire NestJS developer", "NestJS developer for hire", "freelance NestJS developer",
    "NestJS developer UK", "NestJS developer Canada", "NestJS developer USA",
    "hire NestJS developer UK", "NestJS TypeScript developer", "NestJS API developer",
    "NestJS GraphQL developer", "NestJS microservices developer", "hire NestJS backend developer",
    "NestJS dependency injection developer", "NestJS Express developer", "NestJS Fastify developer",
    "NestJS PostgreSQL developer", "NestJS MongoDB developer", "NestJS AWS developer",
    "hire TypeScript backend developer", "freelance Node.js NestJS developer",
  ],
};

const results = [
  { value: "10K+", label: "Daily requests handled by NestJS production APIs at 99.9% uptime across multiple client products", icon: Globe },
  { value: "30+", label: "Production NestJS APIs shipped — REST, GraphQL, WebSocket, and microservice architectures", icon: Star },
  { value: "4+", label: "Years writing production-grade NestJS in TypeScript strict mode — not side projects, real deadlines", icon: Clock },
  { value: "100%", label: "TypeScript strict coverage across all NestJS APIs — no any, no suppressions, no runtime surprises", icon: Zap },
];

const whatIBuild = [
  {
    icon: Code2,
    title: "Structured NestJS REST APIs",
    description: "Controllers, services, and repositories with proper separation of concerns. DTOs with class-validator for input validation, interceptors for response transformation, and guards for auth. Architecture that scales.",
    tags: ["NestJS", "TypeScript", "DTOs", "class-validator"],
  },
  {
    icon: Layers,
    title: "GraphQL with NestJS",
    description: "Code-first GraphQL with @nestjs/graphql and Mercurius or Apollo. Type-safe resolvers generated from TypeScript decorators, DataLoader for N+1 prevention, and subscriptions for real-time features.",
    tags: ["GraphQL", "NestJS", "Code-First", "DataLoader"],
  },
  {
    icon: Lock,
    title: "Guards, Interceptors & Pipes",
    description: "Auth guards with JWT and Passport strategies, role-based guards for RBAC, logging interceptors, caching interceptors, response transformation, and global validation pipes. The middleware layer done properly.",
    tags: ["Guards", "Interceptors", "Passport", "JWT"],
  },
  {
    icon: Server,
    title: "Dependency Injection & Modules",
    description: "Clean module boundaries, dynamic modules for configuration, async providers for database connections, and custom decorators that eliminate boilerplate. The DI container used for what it was designed for.",
    tags: ["DI Container", "Modules", "Providers", "Custom Decorators"],
  },
  {
    icon: Zap,
    title: "Microservices & Message Queues",
    description: "NestJS microservices with NATS, Redis, or RabbitMQ transport. Event-driven patterns, CQRS with @nestjs/cqrs, and the message contract design that keeps services decoupled as the system grows.",
    tags: ["Microservices", "NATS", "CQRS", "Event-Driven"],
  },
  {
    icon: Globe,
    title: "Production Deployment",
    description: "Dockerised NestJS on AWS ECS with Application Load Balancer, auto-scaling, CloudWatch monitoring, and zero-downtime deployments. Or EC2 with PM2 cluster mode for simpler setups.",
    tags: ["Docker", "AWS ECS", "PM2", "CI/CD"],
  },
];

const differentiators = [
  {
    icon: Code2,
    title: "NestJS architecture as it was intended",
    description: "I use the module system, DI container, and decorator patterns the way the framework designers intended — not as thin wrappers around an Express app. The architecture holds as the codebase grows.",
  },
  {
    icon: ShieldCheck,
    title: "Security at the guard level, not the controller level",
    description: "Auth logic in guards, not controllers. RBAC as a decorator, not a conditional. Input validation as a pipe, not inline. Security concerns live in the right abstraction layer — once, applied everywhere.",
  },
  {
    icon: Zap,
    title: "TypeScript strict from the first decorator",
    description: "NestJS is TypeScript-native and I use it that way — strict mode, no any, decorated DTOs with full type inference, and end-to-end type safety from request to database. No type gymnastics.",
  },
  {
    icon: TrendingUp,
    title: "Testing that's worth writing",
    description: "Unit tests for services with mocked providers, integration tests against a real database, and e2e tests for critical flows. NestJS's testing module makes isolation clean — I use it correctly.",
  },
];

const techStack = [
  { name: "NestJS", Icon: SiNestjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "GraphQL", Icon: SiGraphql },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Docker", Icon: SiDocker },
  { name: "AWS", Icon: FaAws },
];

const faqs = [
  {
    q: "How much does a NestJS developer cost?",
    a: "For a scoped engagement — a new API, a migration from Express, a feature addition — I quote a fixed price after reviewing the brief. Ongoing NestJS work runs on a retainer. Written numbers within 24 hours.",
  },
  {
    q: "Why NestJS over Express or Fastify?",
    a: "For teams that need to onboard quickly, NestJS's module and DI structure means new engineers know where everything lives. For products that will grow, the architecture enforces separation of concerns Express doesn't. I recommend NestJS when the codebase will scale in team size or complexity.",
  },
  {
    q: "Can you migrate an existing Express API to NestJS?",
    a: "Yes. NestJS can run on top of Express, so migration is incremental — new modules get the NestJS structure while existing routes keep working. I scope these migrations as phased work, not a big-bang rewrite.",
  },
  {
    q: "Do you use GraphQL or REST with NestJS?",
    a: "Both — NestJS supports both elegantly. REST for standard resource APIs. GraphQL with the code-first approach for data-rich applications or multiple client types. I'll recommend the right fit based on your front-end and use case.",
  },
  {
    q: "How do you handle authentication in NestJS?",
    a: "Passport.js with the @nestjs/passport integration for JWT and OAuth2 strategies. Guards for route protection, roles decorators for RBAC, and refresh token rotation handled at the interceptor level — not scattered across controllers.",
  },
  {
    q: "Can NestJS handle microservices?",
    a: "Yes. NestJS has first-class microservice support with NATS, Redis, RabbitMQ, and Kafka transports. I've built event-driven NestJS microservices in production using CQRS and the @nestjs/cqrs package for clean domain boundaries.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "NestJS Developer for Hire",
  provider: personNode(),
  serviceType: "NestJS API Development",
  description: "Freelance NestJS developer with 4+ years building production TypeScript APIs. Dependency injection, guards, interceptors, GraphQL, microservices, and AWS deployment.",
  areaServed: "Worldwide",
  url: `${siteConfig.url}/nestjs-developer`,
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
    { "@type": "ListItem", position: 2, name: "Hire a NestJS Developer", item: `${siteConfig.url}/nestjs-developer` },
  ],
};

export default function NestJSDeveloperPage() {
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
                <SiNestjs className="w-4 h-4 text-red-400" />
                NestJS Expert · TypeScript · DI · Microservices
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                NestJS APIs{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  Structured to Scale
                </span>{" "}
                With Your Team
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                Express codebases become spaghetti. NestJS doesn&apos;t have to — if the modules, DI, and guard
                patterns are used correctly from the start. I&apos;ve built NestJS APIs that 10-person teams
                can navigate without a Slack message.
              </p>

              <ul className="space-y-2.5">
                {[
                  "TypeScript strict — no any, no suppressions across the entire API",
                  "Guards, interceptors, and pipes in the right abstraction layer",
                  "GraphQL code-first or REST — both done correctly",
                  "Microservices with NATS or Redis when the architecture needs it",
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
            label="NestJS Expertise"
            title="What I Build With NestJS"
            description="Production APIs that a team can maintain, extend, and debug without the author present — because the architecture makes the intent obvious."
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
            title="NestJS Used as Designed, Not Just Installed"
            description="Most NestJS codebases are Express with a thin NestJS wrapper. The framework's DI, guard, and module systems exist for a reason — I use them correctly."
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

      <RelatedDeveloperPages currentSlug="nestjs-developer" />

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
                <span className="text-sm font-medium">Available for new NestJS projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to hire a NestJS developer who knows the framework, not just the syntax?
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send your brief. I&apos;ll reply within 24 hours with a written proposal — scope, timeline, and price. No discovery calls until you&apos;ve seen the numbers.
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
