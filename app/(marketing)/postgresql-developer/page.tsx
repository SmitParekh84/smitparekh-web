import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Code2, Zap, ShieldCheck,
  TrendingUp, Database, Globe, Layers, Server, Star, Clock,
} from "lucide-react";
import { SiPostgresql, SiTypescript, SiDocker, SiRedis, SiPrisma, SiSupabase } from "react-icons/si";
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
  title: "Hire a PostgreSQL Developer - Query Tuning & Schema Design",
  description:
    "Hire a PostgreSQL developer with 4+ years on production databases. Query optimisation, indexing, schema design, partitioning, migrations. 99.9% uptime.",
  alternates: { canonical: `${siteConfig.url}/postgresql-developer` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/postgresql-developer`,
    siteName: siteConfig.name,
    title: "Hire a PostgreSQL Developer - Sub-10ms Queries, Schema Design | Smit Parekh",
    description: "PostgreSQL database design and optimisation - indexing, partitioning, migrations, Supabase RLS. Sub-10ms p99 latency. Deployed on AWS RDS or Supabase.",
    images: [{ url: `${siteConfig.url}/images/hire-postgresql-developer.png`, width: 1200, height: 630, alt: "Hire a PostgreSQL Developer - Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire a PostgreSQL Developer - Sub-10ms Queries, 99.9% Uptime | Smit Parekh",
    description: "PostgreSQL database design and optimisation. Indexing, RLS, Supabase, AWS RDS. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/hire-postgresql-developer.png`, width: 1200, height: 630 }],
  },
  keywords: [
    "hire PostgreSQL developer", "PostgreSQL developer for hire", "freelance PostgreSQL developer",
    "PostgreSQL developer UK", "PostgreSQL developer Canada", "PostgreSQL developer USA",
    "hire database developer", "PostgreSQL schema design", "PostgreSQL query optimisation",
    "PostgreSQL performance tuning", "PostgreSQL indexing expert", "Supabase developer for hire",
    "PostgreSQL migration developer", "PostgreSQL RLS developer", "hire database engineer",
    "PostgreSQL partitioning expert", "PostgreSQL full-text search developer",
    "Prisma PostgreSQL developer", "PostgreSQL Node.js developer", "freelance database developer",
  ],
};

const results = [
  { value: "<10ms", label: "p99 query latency achieved on production PostgreSQL databases through targeted indexing and query rewrites", icon: Zap },
  { value: "99.9%", label: "Uptime across production PostgreSQL deployments - AWS RDS Multi-AZ with automated failover", icon: Globe },
  { value: "40%", label: "Query performance improvement on an existing production database after indexing and EXPLAIN ANALYZE work", icon: TrendingUp },
  { value: "4+", label: "Years designing and maintaining production PostgreSQL schemas in FinTech, SaaS, and enterprise products", icon: Clock },
];

const whatIBuild = [
  {
    icon: Database,
    title: "Schema Design & Data Modelling",
    description: "Normalised schemas that don't become a nightmare to query six months later. Third normal form where it matters, denormalisation where performance demands it. Every FK, constraint, and index justified.",
    tags: ["PostgreSQL", "Schema Design", "Normalisation", "Constraints"],
  },
  {
    icon: Zap,
    title: "Query Optimisation",
    description: "EXPLAIN ANALYZE, index-only scans, partial indexes, covering indexes, CTE optimisation, and query rewrites. I find the slow queries, I identify why they're slow, and I fix them - with before/after numbers.",
    tags: ["EXPLAIN ANALYZE", "Indexing", "Query Rewriting", "CTEs"],
  },
  {
    icon: ShieldCheck,
    title: "Supabase & Row-Level Security",
    description: "RLS policies that enforce access control at the database layer without an ORM middleware layer. Auth integration, anonymous roles, service-role separation - the security model Supabase was designed for.",
    tags: ["Supabase", "RLS", "PostgreSQL", "Auth"],
  },
  {
    icon: Layers,
    title: "Migrations & Schema Evolution",
    description: "Zero-downtime migrations on live production databases. Rolling schema changes, column additions, index builds CONCURRENTLY, and reversible migrations. No 3am maintenance windows.",
    tags: ["Migrations", "Zero-Downtime", "Prisma Migrate", "Flyway"],
  },
  {
    icon: Server,
    title: "AWS RDS & Managed Deployments",
    description: "Multi-AZ RDS for PostgreSQL, read replicas, automated backups, parameter groups, and CloudWatch monitoring. Production-ready infrastructure that wakes no one up at midnight.",
    tags: ["AWS RDS", "Multi-AZ", "Read Replicas", "CloudWatch"],
  },
  {
    icon: Code2,
    title: "Full-Text Search & Advanced Features",
    description: "tsvector full-text search, JSONB storage and indexing, window functions, recursive CTEs, and materialized views. When the ORM hits its ceiling, raw SQL delivers.",
    tags: ["Full-Text Search", "JSONB", "Window Functions", "Materialized Views"],
  },
];

const differentiators = [
  {
    icon: Zap,
    title: "I read EXPLAIN ANALYZE, not guesses",
    description: "Every optimisation starts with EXPLAIN ANALYZE output. I look at seq scans, hash joins, nested loops, and cost estimates - not assumptions. The fix follows the evidence.",
  },
  {
    icon: ShieldCheck,
    title: "Security at the database layer, not just the app",
    description: "RLS policies, least-privilege roles, no superuser in production, secrets never in queries. The database is the last line of defence - I treat it that way.",
  },
  {
    icon: Database,
    title: "Schema decisions that age well",
    description: "The JOIN that's fast today can table-scan a 50M-row table in six months. I design schemas with growth in mind - partition strategies, archive tables, and indexes on columns that will be filtered on.",
  },
  {
    icon: Code2,
    title: "ORM-fluent, raw-SQL comfortable",
    description: "Prisma, Drizzle, TypeORM - I know when the ORM abstraction is fine and when raw SQL is the right tool. You don't need to choose between developer ergonomics and database performance.",
  },
];

const techStack = [
  { name: "PostgreSQL 16", Icon: SiPostgresql },
  { name: "Supabase", Icon: SiSupabase },
  { name: "Prisma ORM", Icon: SiPrisma },
  { name: "Redis", Icon: SiRedis },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Docker", Icon: SiDocker },
  { name: "AWS RDS", Icon: FaAws },
];

const faqs = [
  {
    q: "How much does hiring a PostgreSQL developer cost?",
    a: "For a scoped engagement - schema design, a query optimisation audit, or a migration project - I quote a fixed price after reviewing the brief. Ongoing database work runs on a retainer. I'll send written numbers within 24 hours.",
  },
  {
    q: "Can you optimise an existing production database?",
    a: "Yes - and this is one of the most common requests I get. Share your slow query log, schema, and table sizes. I'll run an audit, identify the highest-impact problems, and scope the fix. No unnecessary rebuilds.",
  },
  {
    q: "Do you work with Supabase or only self-hosted PostgreSQL?",
    a: "Both. Supabase is my primary deployment target for new projects - the RLS model, Auth integration, and edge functions make it excellent for SaaS. For clients with existing AWS infrastructure, I deploy PostgreSQL on RDS Multi-AZ.",
  },
  {
    q: "Can you handle zero-downtime schema migrations?",
    a: "Yes. Adding columns with defaults, building indexes CONCURRENTLY, renaming with view aliases - I know the patterns that avoid table locks on live traffic. If a migration has unavoidable downtime, I'll tell you upfront.",
  },
  {
    q: "Do you write raw SQL or use an ORM?",
    a: "Prisma for schema management and standard queries - the type safety and migration tooling are excellent. Raw SQL for complex analytics, recursive queries, window functions, or anything where the ORM generates inefficient plans.",
  },
  {
    q: "How do you handle database backups and disaster recovery?",
    a: "On AWS RDS: automated daily snapshots, point-in-time recovery, and cross-region replica for DR. On Supabase: built-in daily backups plus periodic manual exports for critical data. I document the recovery procedure, not just the backup.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "PostgreSQL Developer for Hire",
  provider: personNode(),
  serviceType: "PostgreSQL Database Development & Optimisation",
  description: "Freelance PostgreSQL developer with 4+ years designing and optimising production databases. Schema design, query optimisation, RLS, Supabase, and AWS RDS.",
  url: `${siteConfig.url}/postgresql-developer`,
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
    { "@type": "ListItem", position: 2, name: "Hire a PostgreSQL Developer", item: `${siteConfig.url}/postgresql-developer` },
  ],
};

export default function PostgreSQLDeveloperPage() {
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
                <SiPostgresql className="w-4 h-4 text-cyan-300" />
                PostgreSQL Expert · Supabase · AWS RDS · 4+ Years
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                PostgreSQL That{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  Stays Fast
                </span>{" "}
                When the Data Grows
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                Most databases are fast at launch and slow at scale. I design schemas with growth in mind,
                optimise queries with EXPLAIN ANALYZE evidence, and run migrations that never take down production.
              </p>

              <ul className="space-y-2.5">
                {[
                  "Sub-10ms p99 query latency through targeted indexing",
                  "Zero-downtime migrations on live production databases",
                  "Supabase RLS policies that enforce security at the database layer",
                  "AWS RDS Multi-AZ for 99.9% uptime with automated failover",
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
            label="PostgreSQL Expertise"
            title="What I Build With PostgreSQL"
            description="Not just tables and queries. Production-grade database layers that stay fast, stay secure, and evolve without downtime."
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
      <section className="page-section border-t border-border bg-muted/70">
        <div className="page-container">
          <SectionHeader
            label="Why Hire Me"
            title="The Difference Between a Database Developer and a Database Engineer"
            description="Anyone can create a table. The gap shows when you hit 10M rows, a complex access control model, or a schema that needs to change without downtime."
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

      <RelatedDeveloperPages currentSlug="postgresql-developer" />

      {/* CTA */}
      <section className="page-section bg-muted/70">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-sm font-medium">Available for new PostgreSQL projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to hire a PostgreSQL developer who reads EXPLAIN ANALYZE?
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
