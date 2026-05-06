import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Code2, Zap, ShieldCheck,
  TrendingUp, Users, Clock, Star, Globe, Server, Layers,
} from "lucide-react";
import { SiReact, SiTypescript, SiRedux, SiNextdotjs, SiTailwindcss, SiJest, SiVite, SiWebpack } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/ui/section-header";
import { RelatedDeveloperPages } from "@/components/sections/RelatedDeveloperPages";

export const metadata: Metadata = {
  title: "Hire a React Developer – Production-Grade UI That Scales | Smit Parekh",
  description:
    "Hire a React developer with 4+ years shipping production apps for FinTech, SaaS, and enterprise. Redux Toolkit, TypeScript strict, 40% performance gains, 30+ products delivered. Fixed-price available. Free quote in 24 hours.",
  alternates: { canonical: `${siteConfig.url}/react-developer` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/react-developer`,
    siteName: siteConfig.name,
    title: "Hire a React Developer – 4+ Years, 30+ Products Shipped | Smit Parekh",
    description:
      "React development that holds up at scale — Redux Toolkit, TypeScript, 40% performance improvements, 30+ products shipped. Serving clients in the UK, US, Canada, and worldwide.",
    images: [{ url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`, width: 1200, height: 630, alt: "Hire a React Developer – Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire a React Developer – 30+ Products Shipped | Smit Parekh",
    description: "React development built for scale. TypeScript, Redux, 40% performance gains. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`, width: 1200, height: 630 }],
  },
  keywords: [
    "hire React developer", "React developer for hire", "freelance React developer",
    "React.js developer", "hire React.js developer", "React developer UK",
    "React developer Canada", "React developer USA", "remote React developer",
    "hire React developer UK", "hire React developer Canada", "hire React developer USA",
    "freelance React developer UK", "React TypeScript developer", "Redux developer",
    "React Redux developer for hire", "senior React developer", "experienced React developer",
    "React developer FinTech", "React SaaS developer", "hire frontend developer",
    "React component developer", "Next.js React developer",
  ],
};

const results = [
  { value: "40%", label: "Performance boost delivered on a live React + Redux codebase", icon: TrendingUp },
  { value: "30+", label: "Production React applications shipped across FinTech, SaaS & enterprise", icon: Star },
  { value: "50+", label: "Redux-managed components shipped in a single production state tree", icon: Layers },
  { value: "4+", label: "Years writing React in anger — not tutorials, real deadline-driven products", icon: Clock },
];

const whatIBuild = [
  {
    icon: TrendingUp,
    title: "FinTech Dashboards",
    description: "Real-time data, complex state, role-based access, and performance budgets that cannot slip. Built for liquidity.io, simplici.io, and equitytable.io at Monarch Innovations.",
    tags: ["React", "Redux Toolkit", "TypeScript", "WebSocket"],
  },
  {
    icon: Code2,
    title: "SaaS Product UIs",
    description: "Multi-tenant interfaces, subscription gates, onboarding flows, and billing integrations — the full UI stack a SaaS product needs to go from beta to paying customers.",
    tags: ["React", "Next.js", "Stripe", "Auth"],
  },
  {
    icon: Layers,
    title: "Admin Dashboards & Internal Tools",
    description: "Data tables with 10K+ rows, advanced filters, bulk actions, CSV export, role-based permissions. The tools your operations team will actually use every day.",
    tags: ["React", "TanStack Table", "TypeScript", "REST API"],
  },
  {
    icon: Globe,
    title: "Performance Turnarounds",
    description: "Inherited a slow React codebase? Render waterfalls, missing memoisation, bundle bloat — I've diagnosed and fixed all of it. 40% improvement is a floor, not a ceiling.",
    tags: ["React Profiler", "Lighthouse", "Code Splitting", "Memoisation"],
  },
  {
    icon: Server,
    title: "Component Libraries",
    description: "Reusable, tested, documented UI components your whole team can use without a Slack message. Built on shadcn/ui or from scratch — your call.",
    tags: ["React", "Storybook", "Radix UI", "Tailwind CSS"],
  },
  {
    icon: Users,
    title: "MVP Front-ends",
    description: "You've validated the idea. Now you need a React front-end that's fast to ship, easy to iterate on, and won't need a rewrite six months later. That's exactly what I build.",
    tags: ["React", "Vite", "TypeScript", "REST API"],
  },
];

const differentiators = [
  {
    icon: ShieldCheck,
    title: "State management that doesn't become spaghetti",
    description: "I've managed 50+ components in a single Redux Toolkit state tree without chaos. I know when Redux is overkill, when Zustand fits, and when plain useState is all you need.",
  },
  {
    icon: Zap,
    title: "Performance is a feature, not an afterthought",
    description: "useCallback, useMemo, React.memo — I use them when they matter and skip them when they don't. Every component is profiled before it ships. No guessing.",
  },
  {
    icon: Code2,
    title: "TypeScript strict, from day one",
    description: "No any, no workarounds, no suppressed errors. Every React component I write is fully typed — props, state, API responses, event handlers. All of it.",
  },
  {
    icon: CheckCircle2,
    title: "Tests that actually catch regressions",
    description: "React Testing Library, component-level unit tests, and integration tests for critical user flows. Not 100% coverage for the sake of it — tests that prevent real bugs.",
  },
];

const techStack = [
  { name: "React 18/19", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Redux Toolkit", Icon: SiRedux },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Jest / RTL", Icon: SiJest },
  { name: "Vite", Icon: SiVite },
  { name: "Webpack", Icon: SiWebpack },
];

const faqs = [
  {
    q: "How much does a React developer cost?",
    a: "For a scoped project — an MVP, a dashboard, a component library — I work on a fixed price agreed upfront. For ongoing React work I offer a weekly or monthly retainer. Send me your brief and I'll turn around a written quote within 24 hours, no commitment required.",
  },
  {
    q: "How long does it take to build a React application?",
    a: "A focused MVP front-end typically takes 2–4 weeks. A full-featured SaaS dashboard with auth, billing, and admin panel runs 6–10 weeks. The timeline goes into the proposal before any work starts.",
  },
  {
    q: "Can you work with my existing React codebase?",
    a: "Yes — and I prefer it when there's already a base to improve. Share the repo and I'll give you an honest assessment of what needs fixing, what can stay, and what the full scope looks like.",
  },
  {
    q: "Do you use class components or function components?",
    a: "Function components with hooks exclusively. Class components are a maintenance burden I don't take on for new work — if your existing codebase has them, migration is scoped and priced as part of the engagement.",
  },
  {
    q: "Which state management library do you use?",
    a: "Redux Toolkit for complex, shared state. Zustand for lighter applications. TanStack Query for server state. Plain useState and useContext where that's genuinely all you need. The library follows the problem, not the other way around.",
  },
  {
    q: "Do you handle the back-end as well, or just React?",
    a: "Both. I'm a full-stack developer — React front-end, Node.js backend, PostgreSQL/MongoDB, and AWS deployment. You can hire me for React alone or for the full stack. Either works.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "React Developer for Hire",
  provider: { "@type": "Person", name: "Smit Parekh", url: siteConfig.url },
  serviceType: "React.js Frontend Development",
  description: "Freelance React developer with 4+ years shipping production applications for FinTech, SaaS, and enterprise. TypeScript strict, Redux Toolkit, 40% performance improvements, 30+ products delivered.",
  areaServed: "Worldwide",
  url: `${siteConfig.url}/react-developer`,
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Fixed-price and retainer engagements available. Free quote within 24 hours.", availability: "https://schema.org/InStock" },
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
    { "@type": "ListItem", position: 2, name: "Hire a React Developer", item: `${siteConfig.url}/react-developer` },
  ],
};

export default function ReactDeveloperPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <AuroraBackground as="section" className="min-h-[75vh] flex items-center pt-16 bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/30 dark:bg-none dark:bg-neutral-950">
        <div className="page-container py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-sm text-blue-700 dark:border-white/20 dark:bg-white/10 dark:text-white/90 backdrop-blur-sm">
                <SiReact className="w-4 h-4 text-cyan-300" />
                React.js Expert · AWS Certified · 30+ Products Shipped
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                React Development{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  Built to Last
                </span>{" "}
                Beyond the Demo
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                Most React codebases look fine until they hit 50 components, real users, or a deadline. I&apos;ve shipped
                through all three — and I know exactly where things fall apart and how to prevent it.
              </p>

              <ul className="space-y-2.5">
                {[
                  "TypeScript strict-mode — no any, no suppressions",
                  "Redux Toolkit state management that doesn't become a liability",
                  "40% performance improvement delivered on a live production codebase",
                  "Fixed-price proposals — no scope creep surprises",
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
                No commitment to enquire · Reply within 24 hours · UK, US, Canada & worldwide
              </p>
            </div>

            {/* Right — result cards */}
            <div className="grid grid-cols-2 gap-4">
              {results.map(({ value, label, icon: Icon }) => (
                <div key={value} className="rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur-sm dark:border-white/15 dark:bg-white/8 p-5 flex flex-col gap-3">
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
            label="React Expertise"
            title="What I Build With React"
            description="Not side projects. Not tutorials. Production applications with real users, real deadlines, and real consequences when something breaks."
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
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Why Hire Me"
            title="The Difference Between a React Developer and a React Engineer"
            description="Anyone can wire up useState. The gap shows when the codebase scales, the deadline moves, and the performance budget gets tight."
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

      {/* FAQ */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Common Questions"
            title="Before You Reach Out"
            description="The questions every client asks — answered honestly."
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

      <RelatedDeveloperPages currentSlug="react-developer" />

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
                <span className="text-sm font-medium">Available for new React projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to hire a React developer who&apos;s done it before?
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
                  href="/portfolio"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2")}
                >
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
