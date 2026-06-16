import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Code2, Brain, Cpu, Sparkles,
  Server, Zap, ShieldCheck, Clock, MessageSquare,
} from "lucide-react";
import { SiReact, SiNextdotjs, SiTypescript, SiNestjs, SiPostgresql, SiOpenai } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode, serviceRatingFields, aggregateRatingSchema } from "@/lib/seo/schema";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Hire a Full-Stack AI Developer - Next.js, OpenAI & Claude",
  description:
    "Hire a full-stack AI developer shipping production web apps with AI built in. Next.js, Node.js, OpenAI, Claude, RAG, and agents - one engineer end to end.",
  alternates: { canonical: `${siteConfig.url}/full-stack-ai-developer` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/full-stack-ai-developer`,
    siteName: siteConfig.name,
    title: "Hire a Full-Stack AI Developer - Web Apps with AI Built In | Smit Parekh",
    description:
      "Full-stack AI developer - Next.js, Node.js, PostgreSQL plus OpenAI, Claude, RAG, and agents. One engineer who builds the app and the AI inside it.",
    images: [{ url: `${siteConfig.url}/images/hire-full-stack-ai-developer.png`, width: 1200, height: 630, alt: "Hire a Full-Stack AI Developer - Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire a Full-Stack AI Developer - Web Apps with AI Built In | Smit Parekh",
    description:
      "Full-stack AI developer - Next.js, Node.js, PostgreSQL plus OpenAI, Claude, RAG, agents, and evals. One engineer, full ownership.",
    images: [`${siteConfig.url}/images/hire-full-stack-ai-developer.png`],
  },
  keywords: [
    "full-stack AI developer", "hire full-stack AI developer", "AI app developer",
    "AI full-stack engineer", "Next.js AI developer", "OpenAI developer", "Claude developer",
    "RAG developer", "LLM app developer", "AI SaaS developer", "freelance AI developer",
    "AI integration developer", "generative AI developer", "AI feature development",
    "hire AI engineer", "full-stack LLM developer", "AI agent developer",
  ],
};

const results = [
  { value: "Full-stack", label: "App and AI in one pair of hands - schema, API, UI, and the LLM layer, no hand-offs", icon: Code2 },
  { value: "4+", label: "Years shipping production web apps for FinTech, SaaS, and enterprise teams", icon: Clock },
  { value: "Eval-gated", label: "AI features ship behind a golden dataset and automated evals - not vibes", icon: ShieldCheck },
  { value: "60%", label: "Typical token-cost reduction via model routing, caching, and right-sizing", icon: Zap },
];

const whatIBuild = [
  {
    icon: MessageSquare,
    title: "AI Chat & RAG Assistants",
    description: "Support bots and on-site assistants grounded in your docs - with citations, streaming, and honest 'I don't know' instead of confident hallucination.",
    tags: ["RAG", "OpenAI", "Claude", "pgvector"],
  },
  {
    icon: Cpu,
    title: "AI Agents & Automation",
    description: "Tool-using agents that run real workflows against your systems, with guardrails, human-in-the-loop checkpoints, and step/cost limits that keep them safe.",
    tags: ["LangGraph", "Agents SDK", "Tools", "Evals"],
  },
  {
    icon: Sparkles,
    title: "AI Features Inside Your Product",
    description: "Summarisation, classification, extraction, semantic search, and generation wired into your existing app with structured outputs and proper error handling.",
    tags: ["Structured outputs", "Embeddings", "Streaming"],
  },
  {
    icon: Code2,
    title: "AI-Native SaaS, End to End",
    description: "The whole product - multi-tenant Next.js app, Stripe billing, auth, admin tools - with the AI capability as a first-class, metered, monitored part of it.",
    tags: ["Next.js", "Supabase", "Stripe", "Multi-Tenant"],
  },
  {
    icon: Server,
    title: "AI-Ready Backends & APIs",
    description: "Typed Node.js APIs, vector stores, queues for async generation, webhook handlers, and usage metering - the plumbing that makes an AI feature reliable at scale.",
    tags: ["NestJS", "PostgreSQL", "Redis", "Queues"],
  },
  {
    icon: Brain,
    title: "Evals, Guardrails & Cost Control",
    description: "Golden datasets, automated evals on every change, prompt-injection defenses, and cost dashboards - so your AI stays accurate, safe, and affordable in production.",
    tags: ["Promptfoo", "LangSmith", "Guardrails"],
  },
];

const differentiators = [
  {
    icon: Code2,
    title: "I build the app and the AI inside it",
    description: "Most 'AI consultants' can prototype a prompt but can't ship the product around it. I own the database, the API, the UI, and the LLM layer - so the AI feature is actually wired into a real, deployed application, not a Streamlit demo.",
  },
  {
    icon: ShieldCheck,
    title: "Production discipline, not demo magic",
    description: "An AI demo takes an afternoon. An AI feature that doesn't hallucinate on edge cases, doesn't leak prompts, and doesn't surprise you on the bill is an engineering project. I bring evals, guardrails, retries, and fallbacks by default.",
  },
  {
    icon: Zap,
    title: "Cost-aware by design",
    description: "Smaller models like Claude Haiku or GPT-4o-mini for routine work, premium models reserved for hard reasoning, prompt caching, and context discipline. Your AI bill should be predictable, not a monthly surprise.",
  },
  {
    icon: Brain,
    title: "Model-agnostic, future-proof",
    description: "OpenAI, Anthropic Claude, or open-source - chosen per task and benchmarked on your data. The orchestration layer is built so you can switch models as the frontier moves, without a rewrite.",
  },
];

const techStack = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "NestJS", Icon: SiNestjs },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "OpenAI / Claude", Icon: SiOpenai },
];

const internalLinks = [
  { href: "/services/ai-integration", title: "AI Integration", description: "OpenAI, Claude, RAG & evals wired into your app" },
  { href: "/services/ai-agent-development", title: "AI Agent Development", description: "Tool-using autonomous agents with guardrails" },
  { href: "/services/ai-chatbot-development", title: "AI Chatbot Development", description: "RAG assistants grounded in your docs, with citations" },
  { href: "/full-stack-developer", title: "Full-Stack Developer", description: "The non-AI full-stack work - React, Next.js, Node.js" },
];

const faqs = [
  {
    q: "What is a full-stack AI developer?",
    a: "A full-stack AI developer builds the complete web application and the AI capability inside it - database, API, frontend, and the LLM layer (prompts, RAG, agents, evals). Instead of one person prototyping a prompt and a separate team shipping the app, one engineer owns both, so the AI feature is actually integrated into a production product.",
  },
  {
    q: "Which AI models and tools do you work with?",
    a: "OpenAI (GPT-4o and mini), Anthropic Claude, and open-source models like Llama and Mistral, plus RAG stacks (pgvector, Pinecone), orchestration (LangGraph, the Vercel AI SDK, the OpenAI and Claude agent SDKs), and eval tooling (Promptfoo, LangSmith). I pick per task and benchmark on your data rather than defaulting to one vendor.",
  },
  {
    q: "How do you stop AI features from hallucinating or leaking data?",
    a: "Grounding answers in your real content with RAG and citations, enforcing structured outputs, filtering inputs and outputs, defending against prompt injection, and gating every change behind a golden-dataset eval suite. High-risk actions get human-in-the-loop approval. The goal is an AI feature that's incapable of the worst outcomes, not just discouraged from them.",
  },
  {
    q: "Will running AI in production be expensive?",
    a: "Usually far less than people fear. I default to smaller models for routine turns, reserve premium models for hard reasoning, cache aggressively, and keep context tight - typically a 60% cost reduction versus a naive GPT-4-everywhere build. You get a realistic monthly token estimate before we start.",
  },
  {
    q: "Can you add AI to my existing app instead of building from scratch?",
    a: "Yes - that's common. Share the repo and I'll assess where AI genuinely helps (and where it doesn't), then wire the feature into your existing stack with the same evals, guardrails, and cost controls I'd use on a greenfield build.",
  },
  {
    q: "Do you also handle the non-AI parts of the product?",
    a: "Yes. I'm a full-stack developer first - see /full-stack-developer for the core web work. The advantage of one engineer is that the AI layer and the product around it are designed together, not bolted on afterward.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Full-Stack AI Developer for Hire",
  provider: personNode(),
  serviceType: "Full-Stack AI Development",
  description:
    "Freelance full-stack AI developer who ships production web apps with AI built in - Next.js, Node.js, PostgreSQL plus OpenAI, Claude, RAG, agents, and evals.",
  url: `${siteConfig.url}/full-stack-ai-developer`,
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
    { "@type": "ListItem", position: 2, name: "Hire a Full-Stack AI Developer", item: `${siteConfig.url}/full-stack-ai-developer` },
  ],
};

export default function FullStackAIDeveloperPage() {
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
                <Brain className="w-4 h-4 text-blue-600 dark:text-cyan-300" />
                Full-Stack · OpenAI · Claude · RAG · Agents
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                Web Apps With{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  AI Built In
                </span>
                {" "}- By One Engineer
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                Most teams split the people who build the product from the people who add the AI.
                I do both. I own the database, API, and UI <em>and</em> the LLM layer - so the AI
                feature is genuinely wired into a production app, with evals, guardrails, and a
                bill that doesn&apos;t surprise you.
              </p>

              <ul className="space-y-2.5">
                {[
                  "RAG assistants & chatbots grounded in your docs - with citations",
                  "Tool-using AI agents with guardrails and human-in-the-loop",
                  "AI features inside a full Next.js + Node.js + PostgreSQL app",
                  "Evals, prompt-injection defenses & cost control by default",
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
                  href="/about"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:bg-transparent dark:border-white/40 dark:text-white dark:hover:bg-white/10 dark:hover:text-white gap-2")}
                >
                  About Me
                </Link>
              </div>

              <p className="text-xs text-neutral-400 dark:text-white/50">
                No commitment to enquire · Reply within 24 hours · Worldwide
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {results.map(({ value, label, icon: Icon }) => (
                <div key={value} className="rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-sm dark:border-white/15 dark:bg-white/8 p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/10">
                    <Icon className="w-5 h-5 text-blue-500 dark:text-cyan-300" />
                  </div>
                  <p className="text-2xl font-bold text-neutral-900 leading-none dark:text-white">{value}</p>
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
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-2 hidden sm:block">Stack</p>
            {techStack.map(({ name, Icon }) => (
              <span key={name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-foreground/80">
                <Icon className="w-3.5 h-3.5 text-blue-500" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick answer (AEO/GEO extractable block) */}
      <section className="page-section">
        <div className="page-container">
          <div className="mx-auto max-w-3xl rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6 sm:p-8">
            <Badge variant="secondary" className="mb-3">In short</Badge>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              What does a full-stack AI developer do?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-foreground/90 leading-relaxed">
              A full-stack AI developer builds the entire web application and the AI capability inside
              it - database, backend API, frontend, and the LLM layer (prompts, retrieval-augmented
              generation, agents, and evaluations). Smit Parekh is a full-stack AI developer with 4+
              years of production experience who builds AI chatbots, agents, and AI-native SaaS using
              Next.js, Node.js, and PostgreSQL together with OpenAI, Anthropic Claude, and open-source
              models - shipping AI features that are grounded, evaluated, guard-railed, and cost-controlled,
              not just demoable.
            </p>
          </div>
        </div>
      </section>

      {/* What I build */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="AI, End to End"
            title="What I Build With AI"
            description="From a grounded support chatbot to an AI-native SaaS product - the AI capability and the application around it, owned by one engineer."
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
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Why Hire Me"
            title="Why a Full-Stack AI Developer Beats a Split Team"
            description="When the same engineer owns the product and the AI layer, the feature actually ships - grounded, evaluated, and affordable."
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

      {/* Internal links */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Related Services"
            title="Explore the AI Work in Detail"
            description="Each capability has a dedicated service page with scope, process, and pricing."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {internalLinks.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
              >
                <h3 className="font-semibold text-sm leading-snug group-hover:text-blue-500 transition-colors">{page.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{page.description}</p>
                <span className="inline-flex items-center gap-1 text-xs text-blue-500 font-medium mt-1">Learn more <ArrowRight className="w-3 h-3" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Common Questions"
            title="Full-Stack AI Development, Answered"
            description="The questions clients ask before adding AI to their product."
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
                <span className="text-sm font-medium">Available for new AI projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to add AI to your product - properly?
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send your brief. I&apos;ll reply within 24 hours with a written proposal - scope, timeline,
                model recommendation, and a realistic cost estimate. No discovery calls until you&apos;ve seen the numbers.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold")}>
                  Start the Conversation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/portfolio" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2")}>
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
