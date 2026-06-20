import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Search, TrendingUp, BarChart3 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { ServiceStats, seoStats } from "@/components/sections/ServiceStats";
import { ServiceCol2Layout } from "@/components/sections/ServiceCol2Layout";

export const metadata: Metadata = {
  title: "SEO & Marketing Services - Developer-Led SEO | Smit Parekh",
  description:
    "Technical SEO, local SEO, AI search optimization, and content SEO done by a developer who can fix the code blocking your rankings.",
  alternates: { canonical: `${siteConfig.url}/services/marketing-and-seo` },
  keywords: ["technical SEO services", "developer SEO", "SEO consultant", "AI SEO", "GEO", "AEO", "local SEO", "content SEO"],
};

const categories = [
  {
    icon: Search,
    title: "SEO Services",
    href: "/services/seo-services",
    description: "Technical SEO, local SEO, on-page SEO, and full site audits with severity-ranked fix lists.",
    services: [
      { label: "Technical SEO" },
      { label: "Local SEO" },
      { label: "On-Page SEO" },
      { label: "SEO Audit" },
    ],
  },
  {
    icon: TrendingUp,
    title: "AI Search & Growth",
    href: "/services/ai-growth",
    description: "AEO, GEO, content SEO, and CRO - get your brand into ChatGPT, Perplexity, and AI Overviews.",
    services: [
      { label: "AEO Optimization" },
      { label: "GEO Optimization" },
      { label: "Content SEO" },
      { label: "CRO" },
    ],
  },
];

const differentiators = [
  { icon: Search, title: "Developer does the fixes", body: "Most SEO consultants send a 200-item checklist. I fix the code. Results show in Search Console, not a PDF report." },
  { icon: BarChart3, title: "Ranked issues, not noise", body: "Every audit returns a severity-ranked list. You know exactly which fix moves the needle most." },
  { icon: TrendingUp, title: "AI search included", body: "Technical SEO now includes AI Overviews and generative search. Both are covered, not just traditional Google." },
];

const faqs = [
  { q: "How is developer-led SEO different from an agency?", a: "An agency sends recommendations. I implement the fixes in the code directly. Core Web Vitals, structured data, crawl budget, redirect chains - all done in the actual codebase." },
  { q: "How long before I see results?", a: "Technical fixes (indexing, Core Web Vitals, schema) show in Search Console within 4 to 6 weeks. Content and authority gains take 3 to 6 months. Timeline depends on your current baseline." },
  { q: "What is AEO and do I need it?", a: "Answer Engine Optimization targets AI tools like ChatGPT and Perplexity. If your audience uses AI to find services like yours, you want to appear in those answers - not just Google's ten blue links." },
];

export default function MarketingAndSEOPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Marketing & SEO"
        icon={Search}
        title="SEO That Actually Gets Fixed"
        description="A developer who writes the code and fixes the technical problems blocking your rankings - not someone who emails you a checklist."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#start" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700")}>
            Get a free SEO audit
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/services" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white")}>
            All services
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
          <span className="text-foreground">Marketing & SEO</span>
        </nav>
      </div>

      <ServiceCol2Layout
        badge="2 service areas"
        heading="Traditional SEO and AI search, covered."
        categories={categories}
      />

      {/* Differentiators */}
      <section className="page-section bg-muted">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">Developer advantage</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Fixed in code, not on a slide deck.</h2>
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
            <p className="mt-2 text-sm text-muted-foreground">Share your site URL and what you are trying to rank for. I will reply with a prioritised assessment within 24 hours.</p>
          </div>
          <ServiceLeadForm serviceTitle="Marketing & SEO" />
        </div>
      </section>
    </div>
  );
}
