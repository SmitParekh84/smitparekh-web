import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Code2, Zap, ShieldCheck,
  Clock, Globe, Layers, Server, Star, Users, MapPin, Banknote,
} from "lucide-react";
import { SiReact, SiNextdotjs, SiTypescript, SiNestjs, SiPostgresql, SiDocker } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode, aggregateRatingSchema } from "@/lib/seo/schema";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/ui/section-header";
import { RelatedDeveloperPages } from "@/components/sections/RelatedDeveloperPages";
import { geoCountries, getGeoCountry, geoKeywords, type GeoCountry } from "@/data/geo-pages";

interface Props {
  params: Promise<{ country: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return geoCountries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const c = getGeoCountry(country);
  if (!c) return {};

  const url = `${siteConfig.url}/hire-developer/${c.slug}`;
  const title = `Hire a Full-Stack Developer in ${c.primaryCity} & ${c.country}`;
  const description = `Hire a full-stack developer for ${c.primaryCity} and ${c.country} businesses. React, Next.js, Node.js & PostgreSQL — ${c.timezoneLabel} overlap, free quote in 24 hours.`;

  return {
    title,
    description,
    keywords: geoKeywords(c),
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      locale: "en_US",
      url,
      siteName: siteConfig.name,
      title,
      description,
      // opengraph-image.tsx generates a branded card per country
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title,
      description,
    },
  };
}

const whatIBuild = [
  {
    icon: Code2,
    title: "SaaS Products",
    description: "Multi-tenant architecture, Stripe subscriptions, auth with SSO, onboarding, and admin dashboards — the full SaaS stack from schema to marketing site.",
    tags: ["Next.js", "Supabase", "Stripe", "Multi-Tenant"],
  },
  {
    icon: Layers,
    title: "Full-Stack Web Applications",
    description: "Next.js App Router frontend, NestJS or Express API, PostgreSQL database, Redis caching, and cloud deployment — owned end-to-end by one engineer.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "AWS"],
  },
  {
    icon: Server,
    title: "REST & GraphQL APIs",
    description: "TypeScript APIs with Zod validation, JWT auth, RBAC, rate limiting, Redis caching, and OpenAPI docs. Built to handle real, adversarial traffic.",
    tags: ["REST", "GraphQL", "NestJS", "Redis"],
  },
  {
    icon: Globe,
    title: "SEO-First Marketing Sites",
    description: "Next.js with the Metadata API, structured data, dynamic OG images, ISR, and Core Web Vitals A+. Sites that rank locally and convert.",
    tags: ["Next.js", "SEO", "Core Web Vitals", "ISR"],
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

function results(c: GeoCountry) {
  return [
    { value: "30+", label: "Production applications shipped — frontend to database to deployment, no hand-offs", icon: Star },
    { value: "4+", label: "Years writing React, Next.js, NestJS, and PostgreSQL in production for FinTech, SaaS, and enterprise", icon: Clock },
    { value: c.utcOffset === "+4" ? "1.5h" : "2.5h", label: `Timezone gap from ${c.country} — a shared working day, not async hand-offs across midnight`, icon: Globe },
    { value: "95+", label: "Lighthouse score on every Next.js deployment — performance built in, not bolted on", icon: Zap },
  ];
}

function differentiators(c: GeoCountry) {
  return [
    {
      icon: Clock,
      title: `Real overlap with ${c.country} hours`,
      description: c.istOverlap + " You get same-day replies and live reviews — not a 12-hour round trip on every question.",
    },
    {
      icon: Banknote,
      title: "Invoicing that fits your finance team",
      description: `Clear written proposals before any work starts. Fixed-price or retainer, invoiced in USD (or ${c.currencyCode} on request) — no surprise scope, no hourly drift.`,
    },
    {
      icon: Code2,
      title: "One engineer who owns the whole stack",
      description: "No hand-off between a frontend team and a backend team. I own the schema, the API, and the UI — and I'm accountable for all three.",
    },
    {
      icon: ShieldCheck,
      title: "Security across every layer",
      description: "Input validation on the API, RLS at the database, HTTPS and security headers on the frontend. Consistent security decisions, not patchwork fixes.",
    },
  ];
}

function buildFaqs(c: GeoCountry) {
  return [
    {
      q: `Do you work with companies in ${c.primaryCity} and ${c.country}?`,
      a: `Yes. I work remotely with ${c.demonym} startups, agencies, and enterprise teams across ${c.cities.join(", ")}. ${c.istOverlap} Most of my ${c.country} clients never feel the distance.`,
    },
    {
      q: `What are your working hours relative to ${c.timezoneLabel}?`,
      a: `I work on India time (IST), which sits very close to ${c.timezoneLabel}. ${c.istOverlap} That means real-time standups, live screen-shares, and same-day turnaround instead of overnight delays.`,
    },
    {
      q: `Can you invoice in ${c.currencyCode}?`,
      a: `I quote in USD by default since it's the simplest for cross-border work, and I can invoice in ${c.currencyCode} on request. You get a written proposal with scope, timeline, and a fixed price before any work begins.`,
    },
    {
      q: "What do you build, exactly?",
      a: "Full-stack web apps and SaaS products: Next.js or React frontend, NestJS or Express API, PostgreSQL database, and AWS or Vercel deployment. I can own the whole stack or slot into an existing team.",
    },
    {
      q: "How quickly can you start?",
      a: `Send a brief and you'll have a written proposal within 24 hours. For scoped work I can usually begin within a week. ${siteConfig.availability.note}`,
    },
    {
      q: "Can you work with our existing codebase?",
      a: "Yes. Share the repo and I'll assess it honestly — what to keep, what to refactor, what to rewrite. I won't recommend a rewrite unless it's genuinely the right call.",
    },
  ];
}

export default async function GeoDeveloperPage({ params }: Props) {
  const { country } = await params;
  const c = getGeoCountry(country);
  if (!c) notFound();

  const url = `${siteConfig.url}/hire-developer/${c.slug}`;
  const faqs = buildFaqs(c);
  const resultCards = results(c);
  const diffCards = differentiators(c);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Full-Stack Developer for Hire in ${c.country}`,
    provider: personNode(),
    serviceType: "Full-Stack Web Development",
    description: `Freelance full-stack developer working with ${c.primaryCity} and ${c.country} businesses. React, Next.js, NestJS, PostgreSQL, and AWS — one engineer from database to frontend deploy, on a ${c.timezoneLabel} overlap.`,
    url,
    areaServed: [
      { "@type": "Country", name: c.country },
      ...c.cities.map((city) => ({ "@type": "Place", name: city })),
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      description: `Fixed-price and retainer engagements. Invoicing in USD or ${c.currencyCode}. Free quote within 24 hours.`,
      availability: "https://schema.org/InStock",
    },
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
      { "@type": "ListItem", position: 2, name: "Hire a Developer", item: `${siteConfig.url}/hire-developer` },
      { "@type": "ListItem", position: 3, name: `${c.primaryCity} & ${c.country}`, item: url },
    ],
  };

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
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-sm text-blue-700 dark:border-white/20 dark:bg-white/10 dark:text-white/90 backdrop-blur-sm">
                <MapPin className="w-4 h-4" />
                Serving {c.cities.join(" · ")}
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                Hire a Full-Stack Developer in{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  {c.primaryCity}
                </span>
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                {c.intro}
              </p>

              <ul className="space-y-2.5">
                {[
                  `${c.timezoneLabel} overlap — same-day communication, live reviews`,
                  "React / Next.js frontend — 95+ Lighthouse, SEO-first",
                  "NestJS or Express API — TypeScript strict, 10K+ req/day",
                  `Invoice in USD or ${c.currencyCode} — fixed-price or retainer`,
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
                No commitment to enquire · Reply within 24 hours · {c.primaryCity}, {c.country} & worldwide
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {resultCards.map(({ value, label, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-sm dark:border-white/15 dark:bg-white/8 p-5 flex flex-col gap-3">
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
            label={`For ${c.country} businesses`}
            title="What I Build"
            description={`End-to-end products for ${c.primaryCity} teams — not just components or endpoints. From the first migration to the first paying user, one engineer with full context on every layer.`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

      {/* Why hire me locally */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Why Hire Me"
            title={`Why ${c.country} Teams Work With a Remote Engineer`}
            description={`The distance disappears when the timezone lines up and the ownership is clear. Here's what working with me looks like from ${c.primaryCity}.`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {diffCards.map(({ icon: Icon, title, description }) => (
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
            title={`Hiring a Developer in ${c.country}`}
            description="The questions every Gulf client asks — answered honestly."
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
                <span className="text-sm font-medium">Available for new {c.country} projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to hire a developer for your {c.primaryCity} project?
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
                  href="/hire-developer"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2")}
                >
                  Other Regions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
