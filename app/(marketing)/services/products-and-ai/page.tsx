import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Package, Sparkles, Cpu, Shield } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { ServiceStats, aiStats } from "@/components/sections/ServiceStats";
import { ServiceCol2Layout } from "@/components/sections/ServiceCol2Layout";

export const metadata: Metadata = {
  title: "AI Development & Products - OpenAI, RAG, Agents | Smit Parekh",
  description:
    "Production AI engineering: RAG pipelines, agents, chatbots, and full-stack AI apps. OpenAI, Claude, Gemini. Built with evals and observability.",
  alternates: { canonical: `${siteConfig.url}/services/products-and-ai` },
  keywords: ["AI development services", "AI integration developer", "RAG pipeline", "AI agent development", "AI chatbot", "OpenAI developer", "LLM integration"],
};

const categories = [
  {
    icon: Sparkles,
    title: "AI Engineering",
    href: "/services/ai-engineering",
    description: "LLM integration, AI agents, RAG chatbots - built for production with evals, guardrails, and observability.",
    services: [
      { label: "AI Integration", href: "/services/ai-integration" },
      { label: "AI Agents", href: "/services/ai-agent-development" },
      { label: "AI Chatbots", href: "/services/ai-chatbot-development" },
      { label: "Full-Stack AI Dev", href: "/full-stack-ai-developer" },
    ],
  },
  {
    icon: Package,
    title: "Products & Programs",
    href: "/services/products-programs",
    description: "Ready-made developer tools and a discounted program for students and early-career builders.",
    services: [
      { label: "Blog API", href: "/blog-api" },
      { label: "For Students", href: "/for-students" },
    ],
  },
];

const differentiators = [
  { icon: Cpu, title: "Evals from day one", body: "Every AI feature ships with a test set. You see the quality score before launch and track it across model updates." },
  { icon: Shield, title: "Guardrails and fallbacks built in", body: "Hallucination controls, context length handling, and fallback logic - not added later when production breaks." },
  { icon: CheckCircle2, title: "Models chosen for the task", body: "Smaller models for classification, larger ones for generation. Token cost profiled during development, not after the invoice arrives." },
];

const faqs = [
  { q: "Which AI models do you work with?", a: "OpenAI GPT-4o, Anthropic Claude, Google Gemini, and open-source models via Hugging Face or Ollama for on-premise. Model choice depends on your latency, cost, and data sovereignty requirements." },
  { q: "What is RAG and do I need it?", a: "RAG (Retrieval Augmented Generation) grounds the AI's answers in your own data - documentation, product catalog, knowledge base. Without it, the model answers from training data that doesn't include your content." },
  { q: "How do you prevent hallucinations?", a: "Grounding via RAG, output validation before responses reach users, and an eval suite that catches regressions when model behaviour changes across versions." },
];

export default function ProductsAndAIPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Products & AI"
        icon={Package}
        title="AI That Works in Production"
        description="The demo worked fine. The problem is what happens in production. Edge cases, context overflow, unexpected inputs - that is what this work specialises in."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#start" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700")}>
            Get a free assessment
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
          <span className="text-foreground">Products & AI</span>
        </nav>
      </div>

      <ServiceCol2Layout
        badge="2 service areas"
        heading="6 services - integration to full AI product."
        categories={categories}
      />

      {/* Differentiators */}
      <section className="page-section bg-muted">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">Engineering approach</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">AI that ships, not slides.</h2>
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
            <Badge variant="secondary" className="mb-3">Free assessment · 24h</Badge>
            <h2 className="text-2xl font-semibold tracking-tight">What are you building with AI?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Describe the feature or product. I will reply within 24 hours with an honest read on what it takes to build it properly.</p>
          </div>
          <ServiceLeadForm serviceTitle="Products & AI" />
        </div>
      </section>
    </div>
  );
}
