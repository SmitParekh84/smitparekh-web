import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Zap, BarChart3, Globe, Monitor } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { ServiceStats, devStats } from "@/components/sections/ServiceStats";
import { ServiceCol3Layout } from "@/components/sections/ServiceCol3Layout";

export const metadata: Metadata = {
  title: "Frontend & Performance - Next.js, React, 95+ Lighthouse | Smit Parekh",
  description:
    "Next.js App Router, React, and performance optimization. 95+ Lighthouse, sub-1s LCP, Core Web Vitals fixed. Built from scratch, not from a starter template.",
  alternates: { canonical: `${siteConfig.url}/services/frontend-performance` },
  keywords: ["Next.js development", "React development", "frontend development services", "performance optimization", "Core Web Vitals", "Lighthouse 95", "LCP optimization"],
};

const services = [
  { href: "/services/nextjs-development", label: "Next.js Development", description: "App Router, React Server Components, TypeScript strict mode - production architecture, not a demo." },
  { href: "/services/react-development", label: "React Development", description: "SPAs, dashboards, and component libraries with state management that fits actual complexity." },
  { href: "/services/frontend-development", label: "Frontend Development", description: "React, Next.js, design systems, and accessibility - pixel-perfect with keyboard nav and screen reader support." },
  { href: "/services/performance-optimization", label: "Performance Optimization", description: "Core Web Vitals, LCP under 1 second. Before-and-after Lighthouse report with CrUX field data." },
];

const differentiators = [
  { icon: Zap, title: "95+ or the work continues", body: "Performance is measurable. Before-and-after Lighthouse report included. The score has to be there." },
  { icon: Monitor, title: "App Router from day one", body: "Projects built natively on Next.js App Router load faster and cache better than converted Pages Router projects." },
  { icon: BarChart3, title: "TypeScript strict mode, always", body: "Strict mode with no any shortcuts. Bugs surface at compile time, not in user reports." },
];

const faqs = [
  { q: "How much does a Lighthouse improvement actually matter?", a: "Google data shows a 1-second improvement in mobile load time increases conversion rates by up to 27%. Score improvements from 60 to 90 consistently reduce bounce rate and lift pages per session." },
  { q: "What is the difference between App Router and Pages Router?", a: "App Router is the current Next.js architecture with React Server Components, nested layouts, and built-in streaming. New projects should use App Router. Pages Router is legacy - it can be migrated carefully." },
  { q: "Can you take over an existing React codebase?", a: "Yes, after a code review first. I will tell you honestly whether a clean continuation or a targeted rewrite makes more sense before quoting." },
];

export default function FrontendPerformancePage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Frontend & Performance"
        icon={Zap}
        title="Interfaces That Load Fast"
        description="Competitors scoring 97 on Lighthouse rank above you and convert better. Performance is not optional - it is how search engines and users judge your site."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#start" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700")}>
            Get a free audit
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
          <span className="text-foreground">Frontend &amp; Performance</span>
        </nav>
      </div>

      <ServiceCol3Layout
        badge="4 services"
        heading="New build or fixing an existing one?"
        services={services}
        sharedIcon={Zap}
      />

      {/* Differentiators */}
      <section className="page-section bg-muted">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">Measurable results</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Fast because it's built right.</h2>
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
            <Badge variant="secondary" className="mb-3">Free audit · 24h</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">What does your frontend need?</h2>
            <p className="mt-2 text-sm text-muted-foreground">New build, migration, or performance audit. Describe where you are and where you need to be.</p>
          </div>
          <ServiceLeadForm serviceTitle="Frontend & Performance" />
        </div>
      </section>
    </div>
  );
}
