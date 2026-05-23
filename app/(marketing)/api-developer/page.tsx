import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Code2, Zap, ShieldCheck,
  TrendingUp, Globe, Layers, Server, Star, Clock, Lock,
} from "lucide-react";
import { SiNodedotjs, SiTypescript, SiGraphql, SiDocker, SiPostgresql, SiRedis } from "react-icons/si";
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
  title: "Hire an API Developer – REST & GraphQL APIs, 10K+ Req/Day, TypeScript | Smit Parekh",
  description:
    "Hire an API developer with 4+ years building production REST and GraphQL APIs handling 10,000+ daily requests at 99.9% uptime. TypeScript strict, JWT auth, rate limiting, OpenAPI docs. Free quote in 24 hours.",
  alternates: { canonical: `${siteConfig.url}/api-developer` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/api-developer`,
    siteName: siteConfig.name,
    title: "Hire an API Developer – REST & GraphQL, 10K+ Req/Day | Smit Parekh",
    description: "Production REST and GraphQL APIs — TypeScript, JWT auth, rate limiting, Redis caching, OpenAPI documentation. 10K+ daily requests, 99.9% uptime.",
    images: [{ url: `${siteConfig.url}/images/hire-api-developer.png`, width: 1200, height: 630, alt: "Hire an API Developer – Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire an API Developer – REST & GraphQL, 10K+ Req/Day | Smit Parekh",
    description: "REST and GraphQL APIs in production. TypeScript, JWT, rate limiting, OpenAPI. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/hire-api-developer.png`, width: 1200, height: 630 }],
  },
  keywords: [
    "hire API developer", "API developer for hire", "freelance API developer",
    "REST API developer", "GraphQL API developer", "hire REST API developer",
    "hire GraphQL developer", "API developer UK", "API developer Canada", "API developer USA",
    "hire backend API developer", "Node.js API developer", "TypeScript API developer",
    "JWT authentication developer", "OpenAPI developer", "Swagger API developer",
    "rate limiting API developer", "API integration developer", "webhook developer",
    "microservices API developer", "freelance backend developer API",
  ],
};

const results = [
  { value: "10K+", label: "Daily API requests handled in production at 99.9% uptime across multiple client products", icon: Globe },
  { value: "<50ms", label: "p95 response time on production REST APIs with Redis caching and connection pooling", icon: Zap },
  { value: "30+", label: "Production APIs shipped — REST, GraphQL, WebSocket, and webhook integrations", icon: Star },
  { value: "4+", label: "Years building API layers for FinTech, SaaS, and enterprise — not prototypes, real production traffic", icon: Clock },
];

const whatIBuild = [
  {
    icon: Code2,
    title: "REST APIs",
    description: "Resource-oriented REST APIs with consistent error handling, pagination, filtering, and versioning. Every route is typed end-to-end with TypeScript, documented with OpenAPI, and tested with integration tests.",
    tags: ["REST", "Express", "TypeScript", "OpenAPI"],
  },
  {
    icon: Layers,
    title: "GraphQL APIs",
    description: "Schema-first GraphQL with Apollo Server or Pothos — type-safe resolvers, DataLoader for N+1 elimination, subscriptions for real-time data, and persisted queries for performance.",
    tags: ["GraphQL", "Apollo Server", "DataLoader", "Subscriptions"],
  },
  {
    icon: Lock,
    title: "Auth & Authorisation",
    description: "JWT access and refresh tokens, OAuth2 with Google and GitHub, role-based access control, API key authentication, and Supabase Auth integration. Auth done once, done correctly.",
    tags: ["JWT", "OAuth2", "RBAC", "Supabase Auth"],
  },
  {
    icon: Zap,
    title: "Performance & Caching",
    description: "Redis caching for hot data, ETags for conditional requests, response compression, connection pooling, and rate limiting. APIs that scale without scaling costs proportionally.",
    tags: ["Redis", "Rate Limiting", "ETags", "Connection Pooling"],
  },
  {
    icon: Globe,
    title: "Webhooks & Third-Party Integrations",
    description: "Stripe webhooks with signature verification, idempotent event processing, retry queues with exponential backoff. Integrations with Resend, Twilio, Plaid, and other common SaaS APIs.",
    tags: ["Webhooks", "Stripe", "Queue Processing", "Idempotency"],
  },
  {
    icon: Server,
    title: "API Infrastructure",
    description: "Containerised APIs on AWS EC2 or ECS with Application Load Balancer, auto-scaling, structured logging with CloudWatch, alerting, and zero-downtime deployments via GitHub Actions.",
    tags: ["Docker", "AWS ECS", "ALB", "GitHub Actions"],
  },
];

const differentiators = [
  {
    icon: Code2,
    title: "TypeScript strict, end-to-end",
    description: "Request bodies, query params, path params, response shapes — all typed with Zod validation. The TypeScript types and the runtime validation are the same schema, not two different things to keep in sync.",
  },
  {
    icon: ShieldCheck,
    title: "Security is not a second pass",
    description: "Input validation on every endpoint. Rate limiting on auth routes. CORS configured correctly. SQL injection prevented by parameterised queries. OWASP Top 10 is a checklist, not a retrospective.",
  },
  {
    icon: Zap,
    title: "APIs designed for the client that calls them",
    description: "A good API isn't just technically correct — it's ergonomic for the front-end team using it. I design response shapes, pagination conventions, and error formats around how clients actually consume data.",
  },
  {
    icon: TrendingUp,
    title: "Observability from day one",
    description: "Structured JSON logs with request IDs, error monitoring via Sentry, and dashboards that tell you when something breaks before users do. Not bolted on after the first outage.",
  },
];

const techStack = [
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "GraphQL", Icon: SiGraphql },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Redis", Icon: SiRedis },
  { name: "Docker", Icon: SiDocker },
  { name: "AWS", Icon: FaAws },
];

const faqs = [
  {
    q: "How much does an API developer cost?",
    a: "For a defined scope — a new API, an integration, a performance audit — I quote a fixed price. For ongoing API work I offer a weekly or monthly retainer. You'll have written numbers within 24 hours of sending a brief.",
  },
  {
    q: "Do you build REST or GraphQL APIs?",
    a: "Both — the choice depends on the use case. REST for simple resource APIs and mobile apps where payload size matters. GraphQL for complex data graphs, multiple client types, or rapid iteration. I'll recommend the right fit for your requirements.",
  },
  {
    q: "Can you integrate with third-party APIs?",
    a: "Yes. Stripe, Resend, Twilio, Plaid, HubSpot, Shopify — I've integrated with most common SaaS APIs. I handle webhook signature verification, retry logic, idempotency, and the edge cases that SDKs don't document.",
  },
  {
    q: "Do you write API documentation?",
    a: "Always. OpenAPI 3.1 spec generated from the TypeScript types — so the docs and the implementation can't drift apart. Swagger UI deployed alongside the API for your front-end team to reference without asking questions.",
  },
  {
    q: "How do you handle authentication?",
    a: "JWT for most projects — access tokens with short expiry and refresh tokens stored in httpOnly cookies. OAuth2 with Google and GitHub for social login. API keys for machine-to-machine. Supabase Auth for projects already on Supabase.",
  },
  {
    q: "Can you improve an existing slow API?",
    a: "Yes. Share the slow endpoints and I'll audit the queries, caching strategy, payload sizes, and middleware stack. Most performance problems have a known cause — missing indexes, no caching, N+1 queries, or serialisation overhead.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "API Developer for Hire",
  provider: personNode(),
  serviceType: "REST & GraphQL API Development",
  description: "Freelance API developer with 4+ years building production REST and GraphQL APIs. TypeScript strict, JWT auth, rate limiting, Redis caching, and OpenAPI documentation.",
  url: `${siteConfig.url}/api-developer`,
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
    { "@type": "ListItem", position: 2, name: "Hire an API Developer", item: `${siteConfig.url}/api-developer` },
  ],
};

export default function APIDeveloperPage() {
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
                <SiNodedotjs className="w-4 h-4 text-cyan-300" />
                REST & GraphQL Expert · TypeScript · 10K+ Req/Day
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                APIs Built to{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  Handle Production
                </span>{" "}
                Traffic From Day One
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                Most APIs look fine until they hit real traffic, rate limits, or an adversarial request.
                I&apos;ve shipped APIs handling 10,000+ daily requests at 99.9% uptime — and I know exactly
                where the failure modes are.
              </p>

              <ul className="space-y-2.5">
                {[
                  "TypeScript strict end-to-end — Zod validation on every request",
                  "OpenAPI documentation auto-generated from your types",
                  "JWT auth, RBAC, rate limiting — security baked in from route one",
                  "Redis caching and connection pooling — performance that scales",
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
            label="API Expertise"
            title="What I Build"
            description="Not just endpoints. Production API layers that are typed, documented, secured, cached, and observable from the first deploy."
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
            title="The Difference Between an API and a Production API"
            description="Any developer can write endpoints that pass tests. The gap shows under real traffic, with adversarial inputs, or when the client team needs to iterate quickly."
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

      <RelatedDeveloperPages currentSlug="api-developer" />

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
                <span className="text-sm font-medium">Available for new API projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to hire an API developer who&apos;s shipped at scale?
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
