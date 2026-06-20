import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Server, Database, Cloud, Activity } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { ServiceStats, devStats } from "@/components/sections/ServiceStats";
import { ServiceCol3Layout } from "@/components/sections/ServiceCol3Layout";

export const metadata: Metadata = {
  title: "Backend & API Development - Node.js, NestJS, AWS | Smit Parekh",
  description:
    "Production-ready backend development: REST and GraphQL APIs, Node.js, NestJS, PostgreSQL, Redis, AWS, CI/CD. Auth, rate limiting, and monitoring from day one.",
  alternates: { canonical: `${siteConfig.url}/services/backend-apis` },
  keywords: ["backend development services", "API development", "Node.js developer", "NestJS developer", "REST API", "GraphQL API", "DevOps", "AWS", "PostgreSQL developer"],
};

const services = [
  { href: "/services/backend-development", label: "Backend Development", description: "Node.js and NestJS with PostgreSQL, Redis, and AWS - scoped to what your traffic actually needs." },
  { href: "/services/api-development", label: "API Development", description: "REST and GraphQL with auth, rate limiting, webhooks, and OpenAPI docs built for third-party developers." },
  { href: "/services/devops-consulting", label: "DevOps & Cloud", description: "CI/CD pipelines, Docker, AWS architecture, and zero-downtime deployment - set up before first launch." },
];

const differentiators = [
  { icon: Activity, title: "Observability from day one", body: "Structured logging, error tracking, and uptime alerts set up during the build, not six months later at 11pm." },
  { icon: Database, title: "Postgres as source of truth", body: "PostgreSQL with proper indexing and migrations. Redis for caching and queues, not the primary store." },
  { icon: Server, title: "Auth that doesn't need a rewrite", body: "JWT, refresh tokens, RBAC, OAuth - designed right the first time so you're not migrating auth six months later." },
];

const faqs = [
  { q: "REST or GraphQL - which should I use?", a: "REST for most projects: simpler, easier to cache, better tooling. GraphQL for complex multi-client scenarios where different consumers need different data subsets from the same backend." },
  { q: "Do you handle database design and migrations?", a: "Yes. Schema design is part of every backend project. Migrations are version-controlled and repeatable across environments. No manual database edits in production." },
  { q: "Can you audit an existing backend?", a: "Yes. An audit covers API security, query performance, missing indexes, connection pool configuration, auth implementation, error handling, and logging - severity-ranked with estimated fix impact." },
];

export default function BackendAPIsPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Backend & APIs"
        icon={Server}
        title="Backends That Don't Break at 3am"
        description="200 concurrent users hit your checkout endpoint. That's when backend shortcuts become production incidents. Build it right first."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#start" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700")}>
            Get a free quote
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/services/development" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white")}>
            All dev services
          </Link>
        </div>
      </PageHero>

      {/* Breadcrumb */}
      <div className="page-container pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/services" className="hover:text-foreground transition-colors">Services</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/services/development" className="hover:text-foreground transition-colors">Development</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Backend &amp; APIs</span>
        </nav>
      </div>

      <ServiceCol3Layout
        badge="3 services"
        heading="New API, rewrite, or infrastructure?"
        services={services}
        sharedIcon={Server}
      />

      {/* Differentiators */}
      <section className="page-section bg-muted">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">Built to last</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Production-ready is not a checklist item.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {differentiators.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} className="rounded-2xl border border-border bg-card p-6">
                  <div className="h-9 w-9 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-4">
                    <Icon className="h-4 w-4 text-cyan-400" />
                  </div>
                  <p className="text-sm font-semibold tracking-tight mb-1.5">{d.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{d.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceStats stats={devStats} />

      {/* FAQ */}
      <section className="page-section">
        <div className="page-container max-w-2xl">
          <div className="mx-auto max-w-xl text-center mb-8">
            <Badge variant="secondary" className="mb-3">FAQ</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">Common questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-border bg-card p-5">
                <p className="text-sm font-semibold mb-1.5">{faq.q}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="start" className="page-section bg-muted">
        <div className="page-container max-w-2xl">
          <div className="mx-auto max-w-xl text-center mb-8">
            <Badge variant="secondary" className="mb-3">Free quote · 24h</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">What does your backend need?</h2>
            <p className="mt-2 text-sm text-muted-foreground">New API, migration, or infrastructure audit. Describe what you are building and the current bottlenecks.</p>
          </div>
          <ServiceLeadForm serviceTitle="Backend & APIs" />
        </div>
      </section>
    </div>
  );
}
