import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Search, MapPin, FileSearch, Globe } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { ServiceStats, seoStats } from "@/components/sections/ServiceStats";
import { ServiceCol3Layout } from "@/components/sections/ServiceCol3Layout";

export const metadata: Metadata = {
  title: "SEO Services - Technical SEO, Local SEO, SEO Audit | Smit Parekh",
  description:
    "Developer-led SEO: technical SEO, local SEO, on-page SEO, and full site audits. Severity-ranked reports with fixes done in code, not sent as recommendations.",
  alternates: { canonical: `${siteConfig.url}/services/seo-services` },
  keywords: ["technical SEO services", "local SEO", "SEO audit", "developer SEO", "on-page SEO", "SEO consultant", "structured data SEO"],
};

const services = [
  { href: "/services/technical-seo", label: "Technical SEO", description: "Crawlability, indexation, Core Web Vitals, structured data, and site architecture - fixed in code." },
  { href: "/services/local-seo", label: "Local SEO", description: "Google Business Profile, NAP consistency, local schema, and citation building for local search visibility." },
  { href: "/services/on-page-seo", label: "On-Page SEO", description: "Title tags, meta descriptions, heading structure, internal linking, and content optimisation at scale." },
  { href: "/services/seo-audit", label: "SEO Audit", description: "Full site audit with severity-ranked issue list, estimated traffic impact, and fix complexity per item." },
];

const differentiators = [
  { icon: Search, title: "Fixes in code, not in a PDF", body: "Core Web Vitals, schema markup, redirect chains, crawl budget - I implement them directly in the codebase." },
  { icon: FileSearch, title: "Severity-ranked, not a 200-item list", body: "Every audit returns issues ordered by traffic impact. You know which fix to do first." },
  { icon: MapPin, title: "Local and technical combined", body: "Most SEO consultants specialise in one. Developer background means both technical fixes and local signals are covered." },
];

const faqs = [
  { q: "How is developer-led SEO different from an agency?", a: "An agency recommends. I implement. Core Web Vitals, structured data, redirect chains, and crawl budget fixes go into the actual codebase - not into a report you send to your developer." },
  { q: "How long does it take to see results?", a: "Technical fixes appear in Search Console within 4 to 6 weeks. Content and authority gains take 3 to 6 months. Local SEO improvements typically show in 6 to 12 weeks." },
  { q: "What does a full SEO audit cover?", a: "Crawlability, indexation issues, Core Web Vitals, structured data validity, page speed, mobile usability, internal linking gaps, redirect chains, duplicate content, and keyword cannibalisation - each with a severity rating and estimated fix effort." },
];

export default function SeoServicesPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="SEO Services"
        icon={Search}
        title="Technical SEO Done in Code"
        description="Most SEO consultants email you a checklist. A developer who does SEO fixes the actual technical problems blocking your rankings."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#start" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700")}>
            Get a free audit
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/services/marketing-and-seo" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white")}>
            All SEO services
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
          <Link href="/services/marketing-and-seo" className="hover:text-foreground transition-colors">Marketing &amp; SEO</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">SEO Services</span>
        </nav>
      </div>

      <ServiceCol3Layout
        badge="4 services"
        heading="Which SEO problem needs solving?"
        services={services}
        sharedIcon={Search}
      />

      {/* Differentiators */}
      <section className="page-section bg-muted">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">Developer advantage</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Ranked issues. Fixes in code.</h2>
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

      <ServiceStats stats={seoStats} />

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
            <h2 className="text-2xl font-semibold tracking-tight">What is holding back your rankings?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Share your site URL and target keywords. I'll reply with a prioritised assessment within 24 hours.</p>
          </div>
          <ServiceLeadForm serviceTitle="SEO Services" />
        </div>
      </section>
    </div>
  );
}
