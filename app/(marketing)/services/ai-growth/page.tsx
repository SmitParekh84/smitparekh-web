import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, Bot, BarChart3, Target } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { ServiceStats, seoStats } from "@/components/sections/ServiceStats";
import { ServiceCol3Layout } from "@/components/sections/ServiceCol3Layout";

export const metadata: Metadata = {
  title: "AI Search & Growth - AEO, GEO, Content SEO, CRO | Smit Parekh",
  description:
    "Optimize for AI search: AEO, GEO, content SEO, and conversion rate optimization. Get your brand inside ChatGPT, Perplexity, and Google AI Overviews.",
  alternates: { canonical: `${siteConfig.url}/services/ai-growth` },
  keywords: ["AEO optimization", "GEO optimization", "AI search optimization", "content SEO", "CRO", "conversion rate optimization", "AI Overviews", "ChatGPT SEO"],
};

const services = [
  { href: "/services/aeo-optimization", label: "AEO Optimization", description: "Answer Engine Optimization to get your content cited in ChatGPT, Perplexity, and Gemini answers." },
  { href: "/services/geo-optimization", label: "GEO Optimization", description: "Generative Engine Optimization for Google AI Overviews and AI-generated search summaries." },
  { href: "/services/content-seo", label: "Content SEO", description: "Topic clusters, internal linking architecture, and content that ranks and gets cited by AI engines." },
  { href: "/services/cro", label: "Conversion Rate Optimization", description: "Heatmaps, A/B testing, and funnel analysis - traffic you already have converted at a higher rate." },
];

const differentiators = [
  { icon: Bot, title: "AI search is already here", body: "Over 30% of searches are shifting to AI-generated answers. AEO and GEO aren't future-proofing - they're catching up to what's already happening." },
  { icon: TrendingUp, title: "Content that earns citations", body: "AI engines cite sources that have structured, authoritative content with clear entity relationships. That structure is built into every piece of content work." },
  { icon: BarChart3, title: "Conversion optimisation, not just traffic", body: "Rankings don't pay bills. CRO work focuses on turning the traffic you have into leads and customers before spending more on acquisition." },
];

const faqs = [
  { q: "What is AEO and why does it matter now?", a: "Answer Engine Optimization is about getting your content cited in AI-generated answers from ChatGPT, Perplexity, Claude, and Gemini. As users shift to asking AI instead of searching Google, brands not in those answers lose visibility they can't recover with traditional SEO." },
  { q: "What is GEO?", a: "Generative Engine Optimization targets Google's AI Overviews specifically. It requires structured, entity-rich content with clear sourcing that Google's AI can confidently surface at the top of search results." },
  { q: "How does CRO work alongside SEO?", a: "SEO brings traffic. CRO converts it. A site ranking on page one with a 1% conversion rate earns less than a site on page two with a 4% rate. Both levers matter - CRO often delivers faster ROI than SEO for established sites." },
];

export default function AIGrowthPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="AI Search & Growth"
        icon={TrendingUp}
        title="Rank in AI Search, Not Just Google"
        description="ChatGPT, Perplexity, and Google AI Overviews answer questions your customers are already asking. Your brand needs to be in those answers."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#start" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700")}>
            Get a free assessment
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/services/marketing-and-seo" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white")}>
            All SEO services
          </Link>
        </div>
      </PageHero>

      <ServiceCol3Layout
        badge="4 services"
        heading="Which growth lever matters most?"
        services={services}
        sharedIcon={TrendingUp}
      />

      {/* Differentiators */}
      <section className="page-section bg-muted">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">Why it matters now</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Search is changing. Visibility isn't optional.</h2>
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
            <Badge variant="secondary" className="mb-3">Free assessment · 24h</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">How visible are you in AI search?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Share your site and the questions your customers are asking. I'll reply with an AI visibility assessment within 24 hours.</p>
          </div>
          <ServiceLeadForm serviceTitle="AI Search & Growth" />
        </div>
      </section>
    </div>
  );
}
