import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Bot, MessageSquare, Cpu, Shield } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { ServiceStats, aiStats } from "@/components/sections/ServiceStats";
import { ServiceCol3Layout } from "@/components/sections/ServiceCol3Layout";

export const metadata: Metadata = {
  title: "AI Engineering - Agents, RAG, Chatbots, Integration | Smit Parekh",
  description:
    "Production AI engineering: LLM integration, autonomous agents, RAG chatbots, and full-stack AI development. OpenAI, Claude, Gemini - with evals and observability.",
  alternates: { canonical: `${siteConfig.url}/services/ai-engineering` },
  keywords: ["AI engineering", "AI integration services", "AI agent development", "RAG chatbot development", "LLM integration", "OpenAI developer", "Claude developer"],
};

const services = [
  { href: "/services/ai-integration", label: "AI Integration", description: "Add LLM features to your existing product - scoped so edge cases, costs, and quality are handled from day one." },
  { href: "/services/ai-agent-development", label: "AI Agents", description: "Autonomous agents that use tools, make decisions, and complete multi-step tasks without constant human input." },
  { href: "/services/ai-chatbot-development", label: "AI Chatbots", description: "RAG-powered chatbots grounded in your own data - documentation, knowledge base, or product catalog." },
  { href: "/full-stack-ai-developer", label: "Full-Stack AI Development", description: "End-to-end AI product: frontend, backend, retrieval layer, and LLM logic - one engineer across the whole stack." },
];

const differentiators = [
  { icon: Cpu, title: "Evals from day one", body: "Every AI feature ships with a test set and an evaluation framework. Quality is measured before launch and tracked across model updates." },
  { icon: Shield, title: "Guardrails built in", body: "Hallucination controls, context length handling, off-topic guardrails, and fallback logic - not added after the first production incident." },
  { icon: CheckCircle2, title: "Cost profiled before launch", body: "Token usage per request is measured during development. Caching is applied for repeated queries. You know cost per user before you go live." },
];

const faqs = [
  { q: "Which AI models do you work with?", a: "OpenAI GPT-4o, Anthropic Claude, Google Gemini, and open-source models via Hugging Face or Ollama for on-premise requirements. Model choice depends on latency, cost, and whether data can leave your infrastructure." },
  { q: "What is RAG and when do I need it?", a: "Retrieval Augmented Generation grounds the model's answers in your own data. If you want AI to answer questions about your documentation, product catalog, or knowledge base accurately - RAG is how that works." },
  { q: "How do you prevent hallucinations?", a: "Grounding via RAG pipelines, output validation before responses reach users, prompt engineering with explicit uncertainty handling, and evals that catch regressions when model behaviour changes." },
];

export default function AIEngineeringPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="AI Engineering"
        icon={Sparkles}
        title="AI Features That Survive Production"
        description="LLM demos work. Production breaks them. Unexpected inputs, context overflow, wrong outputs at scale - that is the engineering problem this work solves."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#start" className={cn(buttonVariants({ size: "lg" }), "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700")}>
            Get a free assessment
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/services/products-and-ai" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white")}>
            All AI services
          </Link>
        </div>
      </PageHero>

      <ServiceCol3Layout
        badge="4 services"
        heading="Integration, agents, chatbots, or a full product?"
        services={services}
        sharedIcon={Sparkles}
      />

      {/* Differentiators */}
      <section className="page-section bg-muted">
        <div className="page-container">
          <div className="mx-auto max-w-xl text-center mb-10">
            <Badge variant="secondary" className="mb-3">Engineering approach</Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Reliable AI is 80% software engineering.</h2>
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
            <h2 className="text-2xl font-semibold tracking-tight">What AI feature are you trying to build?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Describe the feature or product. I'll reply within 24 hours with an honest read on what it takes to build it reliably.</p>
          </div>
          <ServiceLeadForm serviceTitle="AI Engineering" />
        </div>
      </section>
    </div>
  );
}
