import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Code2, Layers, Server, Smartphone, Zap } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { ServiceStats, devStats } from "@/components/sections/ServiceStats";
import { ServiceCol2Layout } from "@/components/sections/ServiceCol2Layout";

export const metadata: Metadata = {
  title: "Web Development Services - React, Next.js, Node.js | Smit Parekh",
  description:
    "Full-stack web development: MVP to enterprise. React, Next.js, Node.js, AWS. One senior developer, fixed price, written scope.",
  alternates: { canonical: `${siteConfig.url}/services/development` },
  keywords: ["web development services", "full stack developer for hire", "React developer", "Next.js developer", "Node.js developer", "MVP development"],
};

const categories = [
  {
    icon: Layers,
    title: "Web & E-commerce",
    href: "/services/web-ecommerce",
    description: "MVP, SaaS, Shopify, WooCommerce, Next.js storefronts - from idea to live product.",
    services: [
      { label: "MVP Development" },
      { label: "SaaS Development" },
      { label: "Shopify Dev" },
      { label: "E-commerce" },
    ],
  },
  {
    icon: Zap,
    title: "Frontend & Performance",
    href: "/services/frontend-performance",
    description: "Next.js App Router, React, 95+ Lighthouse score, Core Web Vitals fixed.",
    services: [
      { label: "Next.js Dev" },
      { label: "React Dev" },
      { label: "Frontend Dev" },
      { label: "Performance" },
    ],
  },
  {
    icon: Server,
    title: "Backend & APIs",
    href: "/services/backend-apis",
    description: "Node.js, NestJS, PostgreSQL, REST and GraphQL - built for scale from day one.",
    services: [
      { label: "Backend Dev" },
      { label: "API Dev" },
      { label: "DevOps" },
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile, Care & Redesign",
    href: "/services/mobile-care",
    description: "React Native apps, website redesigns that protect SEO, maintenance retainers.",
    services: [
      { label: "Mobile Apps" },
      { label: "Redesign" },
      { label: "Maintenance" },
    ],
  },
];

const differentiators = [
  { icon: Code2, title: "Fixed price in writing", body: "Scope, price, and timeline agreed before a single line is written." },
  { icon: CheckCircle2, title: "One engineer, no handoffs", body: "The person you talk to writes every line. No project manager, no junior proxy." },
  { icon: Server, title: "Production-ready from day one", body: "Auth, logging, monitoring, and error handling included - not bolted on after launch." },
];

const faqs = [
  { q: "What is your minimum project budget?", a: "Landing pages from ~$800. MVPs from ~$4,000. SaaS products from ~$8,000. All prices are fixed and written before work starts." },
  { q: "How long does a typical project take?", a: "MVPs: 4 to 8 weeks. Full web apps: 6 to 12 weeks. Timeline is included in the scope document and doesn't change without a signed change order." },
  { q: "Do you work with existing codebases?", a: "Yes. I review the codebase first to give you an honest read on what continuation vs. targeted rewrite looks like, then scope accordingly." },
];

export default function DevelopmentPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Development"
        icon={Code2}
        title="Full-Stack Development, Fixed Price"
        description="One senior engineer owns the whole project - frontend, backend, and infrastructure. No handoffs, no agency markup."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#start" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700")}>
            Get a free quote
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
          <span className="text-foreground">Development</span>
        </nav>
      </div>

      <ServiceCol2Layout
        badge="4 service areas"
        heading="What are you building?"
        categories={categories}
      />

      {/* Differentiators */}
      <section className="page-section bg-muted">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">Why it works</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">No agencies. No middlemen.</h2>
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
            <h2 className="text-2xl font-semibold tracking-tight">What are you building?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Describe the project in a paragraph. I'll reply with a written estimate within 24 hours.</p>
          </div>
          <ServiceLeadForm serviceTitle="Web Development" />
        </div>
      </section>
    </div>
  );
}
