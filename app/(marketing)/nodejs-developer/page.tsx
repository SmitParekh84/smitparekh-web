import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Server, Zap, ShieldCheck,
  TrendingUp, Globe, Database, Layers, Clock, Star,
} from "lucide-react";
import { SiNodedotjs, SiNestjs, SiTypescript, SiPostgresql, SiMongodb, SiRedis, SiDocker, SiGraphql } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/ui/section-header";
import { RelatedDeveloperPages } from "@/components/sections/RelatedDeveloperPages";

export const metadata: Metadata = {
  title: "Hire a Node.js Developer – 10K+ Req/Day, 99.9% Uptime, NestJS & Express | Smit Parekh",
  description:
    "Hire a Node.js developer with 4+ years shipping production APIs handling 10,000+ daily requests at 99.9% uptime. NestJS, Express, GraphQL, PostgreSQL, Redis, AWS. Fixed-price available. Free quote in 24 hours.",
  alternates: { canonical: `${siteConfig.url}/nodejs-developer` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/nodejs-developer`,
    siteName: siteConfig.name,
    title: "Hire a Node.js Developer – 10K+ Req/Day APIs, NestJS, AWS | Smit Parekh",
    description: "Node.js APIs in production handling 10,000+ daily requests at 99.9% uptime. NestJS, GraphQL, PostgreSQL, Redis, Docker, AWS.",
    images: [{ url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`, width: 1200, height: 630, alt: "Hire a Node.js Developer – Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire a Node.js Developer – 10K+ Req/Day, 99.9% Uptime | Smit Parekh",
    description: "Node.js APIs in production. NestJS, GraphQL, PostgreSQL, AWS. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`, width: 1200, height: 630 }],
  },
  keywords: [
    "hire Node.js developer", "Node.js developer for hire", "freelance Node.js developer",
    "Node.js developer UK", "Node.js developer Canada", "Node.js developer USA",
    "hire Node.js developer UK", "hire Node.js developer Canada", "hire backend developer",
    "NestJS developer for hire", "Express.js developer", "hire NestJS developer",
    "Node.js API developer", "GraphQL developer for hire", "Node.js TypeScript developer",
    "Node.js PostgreSQL developer", "Node AWS developer", "hire backend Node.js developer",
    "freelance backend developer", "REST API developer for hire", "microservices developer",
  ],
};

const results = [
  { value: "10K+", label: "Daily API requests handled in production — at 99.9% uptime across multiple client products", icon: Globe },
  { value: "99.9%", label: "Uptime across Node.js backends deployed on AWS EC2 with proper health checks and alerting", icon: ShieldCheck },
  { value: "65%", label: "Faster query response times delivered through indexing, Redis caching, and query optimisation", icon: Zap },
  { value: "20+", label: "NestJS service modules shipped across a single production monorepo at Monarch Innovations", icon: Layers },
];

const whatIBuild = [
  {
    icon: Server,
    title: "REST APIs — Production-Grade",
    description: "Authentication, pagination, rate limiting, input validation, Swagger documentation, and proper error handling. The APIs that stay up when the load spikes at 3am.",
    tags: ["Node.js", "Express", "NestJS", "TypeScript"],
  },
  {
    icon: Globe,
    title: "GraphQL APIs",
    description: "Schema-first design, resolver optimisation, DataLoader for N+1 prevention, and subscriptions for real-time data. GraphQL that performs — not just a trendy tech choice.",
    tags: ["GraphQL", "Apollo Server", "DataLoader", "TypeScript"],
  },
  {
    icon: Layers,
    title: "Microservices Architecture",
    description: "Event-driven services with Kafka or RabbitMQ, Docker containerisation, inter-service communication, and health checks. Built to scale horizontally, not vertically.",
    tags: ["NestJS", "Kafka", "RabbitMQ", "Docker"],
  },
  {
    icon: Zap,
    title: "Real-Time Systems",
    description: "WebSocket with Socket.io, live dashboards, real-time notifications, and collaborative features — built for FinTech platforms where lag costs money.",
    tags: ["Socket.io", "Node.js", "Redis", "WebSocket"],
  },
  {
    icon: ShieldCheck,
    title: "Authentication & Security",
    description: "JWT, OAuth 2.0, session management, 2FA, role-based access control, and rate limiting. Security as a first-class requirement, not a post-launch checklist item.",
    tags: ["JWT", "OAuth", "RBAC", "bcrypt"],
  },
  {
    icon: Database,
    title: "Database-Heavy Backends",
    description: "Complex PostgreSQL schemas, migrations, query optimisation, Redis caching layers, and Elasticsearch for full-text search. 65% faster queries — already delivered.",
    tags: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
  },
];

const differentiators = [
  {
    icon: ShieldCheck,
    title: "APIs built for 3am — not just for Postman",
    description: "Retry logic, graceful degradation, circuit breakers, health endpoints, and structured logging. Production APIs need to handle partial failures. I build them that way from the start.",
  },
  {
    icon: Zap,
    title: "Performance tuned before it's a problem",
    description: "Redis caching, database indexing, connection pooling, and query analysis are standard — not optional extras. The 65% query improvement was found before the client even noticed slowness.",
  },
  {
    icon: TrendingUp,
    title: "NestJS module architecture that scales",
    description: "Not just Express with middleware. NestJS dependency injection, module boundaries, interceptors, guards, and pipes — the architecture that makes a 100K-line codebase manageable.",
  },
  {
    icon: Server,
    title: "Deployed on AWS, not just running locally",
    description: "EC2, RDS, S3, Lambda, CloudWatch — I set up the infrastructure, configure the CI/CD pipeline, and hand over a system you can actually monitor and scale.",
  },
];

const techStack = [
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "NestJS", Icon: SiNestjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "GraphQL", Icon: SiGraphql },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Redis", Icon: SiRedis },
  { name: "Docker", Icon: SiDocker },
  { name: "AWS", Icon: FaAws },
];

const faqs = [
  {
    q: "How much does a Node.js developer cost?",
    a: "Fixed-price for scoped API projects — a REST API, an auth system, a microservice. Retainer for ongoing backend development. I quote in writing within 24 hours, with clear scope and no hidden costs.",
  },
  {
    q: "NestJS or Express — which do you use?",
    a: "NestJS for projects that will grow — the module architecture, DI, and decorator patterns pay off quickly. Express for simpler APIs where overhead isn't justified. I make the call based on your requirements, not preference.",
  },
  {
    q: "Can you optimise an existing Node.js backend?",
    a: "Yes, and it's often where the most value is. Share the codebase or describe the problem and I'll assess what's causing the slowness — whether it's missing indexes, N+1 queries, no caching, or architectural debt.",
  },
  {
    q: "Do you write API documentation?",
    a: "Swagger/OpenAPI documentation is standard on all API projects — not an optional extra. Every endpoint gets request/response schemas, error codes, and authentication requirements documented.",
  },
  {
    q: "Can you handle both the front-end and back-end?",
    a: "Yes — full-stack means full-stack. React or Next.js on the front-end, Node.js on the back-end, PostgreSQL or MongoDB, deployed to AWS or Vercel. One engineer, one invoice.",
  },
  {
    q: "How do you ensure API reliability?",
    a: "Structured error handling, input validation (Zod or class-validator), rate limiting, health check endpoints, and CloudWatch or similar monitoring are standard. I set up alerting before the API goes live.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Node.js Developer for Hire",
  provider: { "@type": "Person", name: "Smit Parekh", url: siteConfig.url },
  serviceType: "Node.js Backend Development",
  description: "Freelance Node.js developer with 4+ years shipping production APIs handling 10,000+ daily requests at 99.9% uptime. NestJS, Express, GraphQL, PostgreSQL, Redis, AWS Certified.",
  areaServed: "Worldwide",
  url: `${siteConfig.url}/nodejs-developer`,
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Fixed-price and retainer engagements. Free quote within 24 hours.", availability: "https://schema.org/InStock" },
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
    { "@type": "ListItem", position: 2, name: "Hire a Node.js Developer", item: `${siteConfig.url}/nodejs-developer` },
  ],
};

export default function NodejsDeveloperPage() {
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
                <SiNodedotjs className="w-4 h-4 text-green-400" />
                Node.js · NestJS · GraphQL · AWS Certified
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                Node.js APIs That{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-green-300 via-cyan-300 dark:to-white bg-clip-text text-transparent">
                  Handle Real Traffic
                </span>{" "}
                — Not Just Tests
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                10,000+ daily requests. 99.9% uptime. 65% faster queries. These aren&apos;t benchmarks
                from a side project — they&apos;re numbers from production systems already running in the wild.
              </p>

              <ul className="space-y-2.5">
                {[
                  "NestJS architecture that scales to 20+ modules without chaos",
                  "PostgreSQL, Redis caching, query optimisation as standard",
                  "Swagger documentation on every endpoint",
                  "AWS deployment with CloudWatch monitoring included",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-green-300 mt-0.5 shrink-0" />
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
                    <Icon className="w-5 h-5 text-green-300" />
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
            label="Node.js Expertise"
            title="What I Build With Node.js"
            description="APIs that handle production load — not Postman demos. Authentication, caching, documentation, and deployment included as standard."
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
            title="Backend Work That Holds Up Under Pressure"
            description="A Node.js API that passes your test suite is table stakes. One that holds up at 3am, under load, with a partial database failure — that's what I build."
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

      <RelatedDeveloperPages currentSlug="nodejs-developer" />

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
                <span className="text-sm font-medium">Available for new Node.js projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Your backend, built to handle what production throws at it
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send your API brief. I&apos;ll reply within 24 hours with a written proposal — endpoints, architecture, timeline, and a fixed price. No vague estimates.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg" }), "bg-blue-600 text-white hover:bg-blue-700 dark:bg-white dark:text-blue-600 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}
                >
                  Start the Conversation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:bg-transparent dark:border-white/40 dark:text-white dark:hover:bg-white/10 dark:hover:text-white gap-2")}
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
