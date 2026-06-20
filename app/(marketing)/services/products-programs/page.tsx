import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Package, BookOpen, GraduationCap, Zap } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { ServiceStats, aiStats } from "@/components/sections/ServiceStats";
import { ServiceCol3Layout } from "@/components/sections/ServiceCol3Layout";

export const metadata: Metadata = {
  title: "Developer Products & Student Programs | Smit Parekh",
  description:
    "A hosted Blog API for developers and a student development program with discounted project rates. Built products you can use today.",
  alternates: { canonical: `${siteConfig.url}/services/products-programs` },
  keywords: ["blog API", "headless blog API", "developer tools", "student web development", "student project help", "affordable web development"],
};

const products = [
  {
    icon: BookOpen,
    href: "/blog-api",
    label: "Blog API",
    description: "Hosted headless blog API with CRUD, Markdown, tag filtering, and auth. Drop it into any project without building a blog backend from scratch.",
    badge: "Ready to use",
  },
  {
    icon: GraduationCap,
    href: "/for-students",
    label: "For Students",
    description: "50% off development rates for portfolio projects, hackathon submissions, and academic work. Professional-grade output at student-grade pricing.",
    badge: "50% off",
  },
];

const differentiators = [
  { icon: Zap, title: "Blog API - use it today", body: "REST endpoints, Markdown support, pagination, tag filtering, and API key auth. Documented and hosted. No setup required." },
  { icon: GraduationCap, title: "Student rates, professional quality", body: "The same architecture and TypeScript standards as commercial projects, at half the price. No shortcuts because the budget is smaller." },
  { icon: CheckCircle2, title: "No scope creep, no surprises", body: "Both products have clear, written scope: the API has documentation, the student program has a defined deliverable list and fixed price." },
];

const faqs = [
  { q: "What does the Blog API include?", a: "CRUD endpoints for posts, Markdown support, tag-based filtering, pagination, and API key authentication. A hosted instance is available so you can test it immediately. Documentation covers every endpoint." },
  { q: "Who qualifies for the student program?", a: "Current students, recent graduates, and early-career developers working on portfolio projects, hackathon submissions, side projects, or academic work. Proof of student status required." },
  { q: "Can students use the Blog API for free?", a: "The Blog API has a free tier for testing. The student program discount applies to custom development work - not the Blog API, which is separately priced." },
];

export default function ProductsProgramsPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Products & Programs"
        icon={Package}
        title="Tools You Can Use Today"
        description="A headless Blog API you can drop into any project, and a development program for students who need professional output at a price that makes sense."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/blog-api" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700")}>
            Try the Blog API
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/services/products-and-ai" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white")}>
            All AI & product services
          </Link>
        </div>
      </PageHero>

      <ServiceCol3Layout
        badge="2 products"
        heading="Ready to use or ready to build."
        services={products}
      />

      {/* Differentiators */}
      <section className="page-section bg-muted">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">What you get</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Built to use, not to demo.</h2>
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

      <ServiceStats stats={aiStats} />

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
            <Badge variant="secondary" className="mb-3">Get started · 24h</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">Questions about the API or student program?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Describe what you need. I'll reply within 24 hours with access details or a project quote.</p>
          </div>
          <ServiceLeadForm serviceTitle="Products & Programs" />
        </div>
      </section>
    </div>
  );
}
