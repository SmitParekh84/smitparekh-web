import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Code2, Zap, ShieldCheck,
  TrendingUp, Globe, Layers, Server, Star, Clock, Users,
} from "lucide-react";
import { SiNextdotjs, SiTypescript, SiStripe, SiSupabase, SiPostgresql, SiVercel } from "react-icons/si";
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
  title: "Hire a SaaS Developer – Multi-Tenant Apps, Stripe Billing & Auth | Smit Parekh",
  description:
    "Hire a SaaS developer with 4+ years building production multi-tenant applications. Auth, Stripe billing, subscription management, onboarding flows, admin dashboards, and scalable architecture. Free quote in 24 hours.",
  alternates: { canonical: `${siteConfig.url}/saas-developer` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/saas-developer`,
    siteName: siteConfig.name,
    title: "Hire a SaaS Developer – Multi-Tenant, Stripe, Auth | Smit Parekh",
    description: "Full-stack SaaS development — multi-tenant architecture, Stripe subscriptions, auth, onboarding flows, admin dashboards. From MVP to paying customers.",
    images: [{ url: `${siteConfig.url}/images/hire-saas-developer.png`, width: 1200, height: 630, alt: "Hire a SaaS Developer – Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire a SaaS Developer – Multi-Tenant, Stripe Billing, Auth | Smit Parekh",
    description: "SaaS apps with auth, Stripe billing, multi-tenancy, and admin dashboards. From MVP to scale. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/hire-saas-developer.png`, width: 1200, height: 630 }],
  },
  keywords: [
    "hire SaaS developer", "SaaS developer for hire", "freelance SaaS developer",
    "SaaS developer UK", "SaaS developer Canada", "SaaS developer USA",
    "hire SaaS developer UK", "multi-tenant SaaS developer", "Stripe billing developer",
    "subscription SaaS developer", "hire SaaS MVP developer", "SaaS Next.js developer",
    "SaaS Supabase developer", "SaaS authentication developer", "hire full-stack SaaS developer",
    "SaaS onboarding developer", "SaaS admin dashboard developer", "B2B SaaS developer",
    "SaaS TypeScript developer", "freelance SaaS Next.js developer",
  ],
};

const results = [
  { value: "30+", label: "Production SaaS applications shipped — from MVP to paying customers at scale", icon: Star },
  { value: "4+", label: "Years building multi-tenant SaaS products for FinTech, HR, and enterprise software companies", icon: Clock },
  { value: "100%", label: "Stripe integration success rate — subscriptions, trials, metered billing, and webhook reliability", icon: TrendingUp },
  { value: "<4wk", label: "Typical SaaS MVP timeline — auth, billing, dashboard, and first paying user in under four weeks", icon: Zap },
];

const whatIBuild = [
  {
    icon: Users,
    title: "Multi-Tenant Architecture",
    description: "Row-level security with Supabase, organisation/workspace data isolation, role-based permissions per tenant, and invitation flows. The data model that lets you onboard thousands of companies without a rewrite.",
    tags: ["Multi-Tenant", "Supabase RLS", "RBAC", "Organisations"],
  },
  {
    icon: Code2,
    title: "Stripe Billing & Subscriptions",
    description: "Plans, trials, seat-based pricing, usage-based billing, upgrade and downgrade flows, dunning management, customer portal, and webhook-driven subscription state. Every Stripe edge case handled.",
    tags: ["Stripe", "Subscriptions", "Webhooks", "Customer Portal"],
  },
  {
    icon: ShieldCheck,
    title: "Authentication & Auth Flows",
    description: "Supabase Auth or NextAuth — email/password, Google OAuth, magic links, and SSO. Session management, protected routes, role checks, and the admin impersonation flow every SaaS team eventually needs.",
    tags: ["Supabase Auth", "NextAuth", "OAuth", "SSO"],
  },
  {
    icon: Layers,
    title: "Onboarding & Activation Flows",
    description: "The gap between signup and activation is where SaaS products lose users. I build onboarding wizards, empty states, in-app guidance, and the metrics that tell you where drop-off happens.",
    tags: ["Onboarding", "Progress Tracking", "Email", "Activation"],
  },
  {
    icon: Server,
    title: "Admin Dashboards",
    description: "The dashboard your ops team needs to manage users, view subscription status, impersonate accounts, manage feature flags, and handle support requests — without touching the database directly.",
    tags: ["Admin Panel", "User Management", "Feature Flags", "Analytics"],
  },
  {
    icon: Globe,
    title: "SaaS Marketing Sites",
    description: "SEO-first Next.js marketing sites with pricing pages, feature comparisons, social proof, and conversion-optimised CTAs. Built to rank and built to convert — not just to look good.",
    tags: ["Next.js", "SEO", "Pricing Page", "Conversion"],
  },
];

const differentiators = [
  {
    icon: Users,
    title: "Multi-tenancy designed before it's needed",
    description: "Adding multi-tenancy to a single-tenant codebase is a rewrite. I design the tenant isolation model in the schema from day one — so scaling to enterprise accounts doesn't require starting over.",
  },
  {
    icon: Code2,
    title: "Stripe handled at the webhook level, not just the checkout",
    description: "Checkout is 10% of Stripe. The real work is webhook idempotency, failed payment recovery, subscription state sync, and proration on plan changes. I've handled all of it in production.",
  },
  {
    icon: Zap,
    title: "MVPs that aren't throwaway",
    description: "The architecture decisions you make at MVP stage are the ones you'll live with at 10,000 users. I build MVPs that are fast to ship AND structured to grow — without a full rewrite at Series A.",
  },
  {
    icon: TrendingUp,
    title: "Full-stack ownership, one point of contact",
    description: "Database schema, API layer, frontend, Stripe integration, and deployment — all owned by one engineer. No coordination overhead, no hand-off gaps, no finger-pointing when something breaks.",
  },
];

const techStack = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Supabase", Icon: SiSupabase },
  { name: "Stripe", Icon: SiStripe },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Vercel", Icon: SiVercel },
  { name: "AWS", Icon: FaAws },
];

const faqs = [
  {
    q: "How much does building a SaaS product cost?",
    a: "An MVP with auth, Stripe billing, a core feature, and admin dashboard typically runs 4–8 weeks at a fixed price. I scope it from your brief — no verbal estimates, written proposal within 24 hours.",
  },
  {
    q: "How long does it take to build a SaaS MVP?",
    a: "Three to six weeks for a focused MVP — auth, billing, one core workflow, and the infrastructure to support it. The scope goes in the proposal before work starts. No surprises mid-engagement.",
  },
  {
    q: "Can you build on top of an existing SaaS codebase?",
    a: "Yes. Share the repo and I'll assess the architecture, identify what needs changing, and scope the work honestly. I won't recommend a rewrite unless it's genuinely the right call.",
  },
  {
    q: "Do you handle Stripe integration end-to-end?",
    a: "Yes — checkout, subscriptions, trials, usage-based billing, dunning, customer portal, and webhook handling with idempotency. Stripe is complex at the edges. I've handled the edges in production.",
  },
  {
    q: "Which stack do you use for SaaS products?",
    a: "Next.js App Router for the frontend, Supabase for auth and database (with PostgreSQL RLS for multi-tenancy), Stripe for billing, and Vercel for deployment. For larger clients: Node.js/NestJS API and AWS.",
  },
  {
    q: "Do you build the marketing site too, or just the application?",
    a: "Both. A SaaS product needs a marketing site that ranks and converts — not just an app. I build the full package: SEO-first Next.js marketing site, pricing page, and the product itself.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SaaS Developer for Hire",
  provider: personNode(),
  serviceType: "SaaS Product Development",
  description: "Freelance SaaS developer with 4+ years building multi-tenant production applications. Auth, Stripe billing, subscriptions, onboarding flows, and admin dashboards.",
  url: `${siteConfig.url}/saas-developer`,
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
    { "@type": "ListItem", position: 2, name: "Hire a SaaS Developer", item: `${siteConfig.url}/saas-developer` },
  ],
};

export default function SaaSDeveloperPage() {
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
                SaaS Expert · Multi-Tenant · Stripe · Supabase
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                SaaS Products{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  Built for Growth,
                </span>{" "}
                Not Just Launch
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                Auth, billing, multi-tenancy, onboarding — the four things that make or break a SaaS product.
                I&apos;ve built all of them in production, and I know which decisions at MVP stage you&apos;ll
                regret at 10,000 users.
              </p>

              <ul className="space-y-2.5">
                {[
                  "Multi-tenant architecture designed before it's needed",
                  "Stripe billing — subscriptions, trials, usage-based, dunning",
                  "Auth with SSO, RBAC, and the admin impersonation flow",
                  "MVP to first paying user in under four weeks",
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
            label="SaaS Expertise"
            title="What I Build"
            description="The full SaaS stack — from database schema to marketing site. Every layer your product needs to acquire, retain, and monetise users."
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
            title="The Difference Between a SaaS Developer and an App Developer"
            description="Building features is easy. Building the subscription model, the tenant isolation, and the billing edge cases that keep a SaaS business alive — that's the hard part."
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

      <RelatedDeveloperPages currentSlug="saas-developer" />

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
                <span className="text-sm font-medium">Available for new SaaS projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to hire a SaaS developer who&apos;s been to production?
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
