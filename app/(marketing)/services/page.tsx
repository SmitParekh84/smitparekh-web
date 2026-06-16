import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import {
  Code2,
  Monitor,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Search,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
  Eye,
  Users,
  Clock,
  Lock,
  Sparkles,
  Quote,
  ChevronDown,
  Building2,
  MessageSquare,
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiNestjs, SiPostgresql, SiMongodb,
  SiRedis, SiSocketdotio, SiGraphql, SiDocker,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { SectionHeader } from "@/components/ui/section-header";
import { buttonVariants } from "@/components/ui/button";
import { PageHero } from "@/components/layout/PageHero";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { developerPages } from "@/data/developer-pages";
import { aggregateRatingSchema } from "@/lib/seo/schema";

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Web Development Services by Smit Parekh",
  url: `${siteConfig.url}/services`,
  itemListElement: services.map((service, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.shortDescription,
      provider: { "@id": `${siteConfig.url}/#person` },
      areaServed: "Worldwide",
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
  ],
};

export const metadata: Metadata = {
  title: "Web Development Services - React, Next.js & Node.js",
  description:
    "Hire a senior full-stack developer for MVPs, SaaS, e-commerce & SEO. Fixed scope from $5K, hourly from $80/hr. 50+ projects shipped, 95+ Lighthouse.",
  alternates: { canonical: `${siteConfig.url}/services` },
  keywords: [
    "full stack web development services",
    "hire full stack developer",
    "React development services",
    "Next.js development services",
    "Node.js API development",
    "SaaS development services",
    "freelance senior developer",
    "MVP development services",
    "AWS deployment services",
    "technical SEO services",
    "headless e-commerce development",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.name,
    title: "Web Development Services - Hire Smit Parekh",
    description:
      "Senior full-stack developer for MVPs, SaaS & e-commerce. Fixed scope from $5K. 95+ Lighthouse standard.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-web-development-services.png`,
        width: 1200,
        height: 630,
        alt: "Web Development Services by Smit Parekh - React, Next.js, Node.js, AWS",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Web Development Services - Hire Smit Parekh",
    description:
      "Senior full-stack developer for MVPs, SaaS & e-commerce. From $5K fixed scope.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-web-development-services.png`,
        width: 1200,
        height: 630,
        alt: "Web Development Services by Smit Parekh",
      },
    ],
  },
};

const iconMap = {
  Code2,
  Monitor,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Search,
  Megaphone,
} as const;

const stats = [
  { label: "Projects shipped", value: "50+" },
  { label: "Years in production", value: "5+" },
  { label: "Daily API requests handled", value: "10K+" },
  { label: "Lighthouse score (avg)", value: "95+" },
];

const differentiators = [
  {
    icon: Users,
    title: "Single point of contact",
    desc: "You work directly with me - no account managers, no junior devs, no Slack handoffs.",
  },
  {
    icon: Zap,
    title: "Replies within 4 hours",
    desc: "Real updates and progress, not weekly status reports. Available across US, EU & APAC hours.",
  },
  {
    icon: Lock,
    title: "You own the code",
    desc: "Clean codebase, full docs, zero vendor lock-in. Your GitHub from day one - even if we part ways.",
  },
  {
    icon: ShieldCheck,
    title: "Senior-only work",
    desc: "Every line is written by me - 5+ years shipping production systems at scale, not interns or offshore teams.",
  },
  {
    icon: Eye,
    title: "Weekly demos, not status",
    desc: "You see working software every Friday. Course-correct early, kill features that don't matter.",
  },
  {
    icon: Sparkles,
    title: "Built to last",
    desc: "TypeScript strict, tests, 95+ Lighthouse. No tech debt handed to your next hire.",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery & Scoping",
    description:
      "We align on goals, constraints, and success criteria. You get a clear scope document and timeline - no surprises.",
  },
  {
    step: "02",
    title: "Architecture & Design",
    description:
      "I design the data model, API contracts, and component architecture before writing a single line of production code.",
  },
  {
    step: "03",
    title: "Iterative Build",
    description:
      "Weekly check-ins, working demos at every milestone. You see real progress, not a black box.",
  },
  {
    step: "04",
    title: "Test & Deploy",
    description:
      "Automated tests, Lighthouse audits, and a staged rollout to production. Zero-downtime deployments as standard.",
  },
  {
    step: "05",
    title: "Handover & Support",
    description:
      "Full documentation, codebase walkthrough, and a 30-day support window post-launch. You own the code.",
  },
];

const testimonials = [
  {
    quote:
      "Smit delivered our MVP in 6 weeks and the codebase is so clean we onboarded our next engineer in a single day. Best freelance experience we've had - and we've had many.",
    name: "FinTech Founder",
    role: "Series-A startup, US",
    rating: 5,
  },
  {
    quote:
      "Lighthouse went from 62 to 98. Our organic traffic doubled in 3 months. He doesn't just push pixels - he understands what makes pages rank.",
    name: "Head of Growth",
    role: "B2B SaaS, EU",
    rating: 5,
  },
  {
    quote:
      "Smit asks the right product questions before writing any code. We changed our entire pricing flow based on his input. Worth every dollar.",
    name: "AI Startup Founder",
    role: "Bootstrapped, APAC",
    rating: 5,
  },
];

const engagementModels = [
  {
    type: "Fixed Scope",
    description:
      "Defined deliverables, fixed price, fixed timeline. Best for MVPs and well-scoped features.",
    ideal: "MVPs · Feature builds · Redesigns",
    startsAt: "From $5,000",
    popular: false,
  },
  {
    type: "Time & Materials",
    description:
      "Flexible scope, billed weekly. Best for evolving products where requirements change.",
    ideal: "Ongoing product development · Complex systems",
    startsAt: "From $80 / hour",
    popular: true,
  },
  {
    type: "Monthly Retainer",
    description:
      "Dedicated hours each month for development, maintenance, and technical support.",
    ideal: "Maintenance · Performance work · Ongoing support",
    startsAt: "From $3,000 / month",
    popular: false,
  },
];

const industries = [
  "FinTech",
  "SaaS",
  "E-commerce",
  "AI & ML",
  "Healthcare",
  "EdTech",
  "Real Estate",
  "Marketplaces",
  "Creator Tools",
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most MVPs ship in 6-10 weeks. Full SaaS builds take 3-4 months. Marketing sites and redesigns are usually 2-4 weeks. We agree a timeline before any work starts - and you get a working demo every Friday so there are no surprises.",
  },
  {
    q: "Do you work with existing engineering teams?",
    a: "Yes. I plug into your existing GitHub, Slack, Linear, or Jira. I can lead the build end-to-end, ship features alongside your team, or just be the senior reviewer on architecture-critical PRs.",
  },
  {
    q: "What's included in post-launch support?",
    a: "30 days of free bug fixes after launch. After that, a monthly retainer is the most common option - it covers maintenance, small features, performance work, and on-call support. You can also pay ad-hoc when issues come up.",
  },
  {
    q: "Do you sign NDAs and IP transfer agreements?",
    a: "Yes. I sign mutual NDAs before any sensitive details are shared. Code is yours from day one via your GitHub org - I sign IP-transfer language in the contract too, so there's zero ambiguity.",
  },
  {
    q: "What time zones do you work in?",
    a: "Based in India (IST / UTC+5:30). I overlap with US East Coast mornings, EU afternoons, and APAC business hours. Async-first by default with Slack or Linear, sync calls when decisions need to be made.",
  },
  {
    q: "Do you handle hosting, infrastructure, and DevOps?",
    a: "Yes. AWS (EC2, RDS, S3, Lambda), Vercel, Railway, Cloudflare, Docker, GitHub Actions - I set up production infra, monitoring, and CI/CD. You get a fully working production setup, not just code sitting on GitHub.",
  },
  {
    q: "What if I only need part of a project?",
    a: "That's fine. Frontend-only builds, backend API work, SEO audits, performance optimization, code reviews - I'll scope just what you need. No minimum project size, but most engagements start at 2 weeks of work.",
  },
  {
    q: "Do you offer free consultations?",
    a: "Yes. The first 30-minute scoping call is free, no commitment. If we're a fit, you'll get a written proposal within 48 hours covering scope, timeline, milestones, and a fixed quote.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

type IconType = ComponentType<{ className?: string }>;

const techCategories: {
  label: string;
  Icon: IconType;
  accent: string;
  items: { name: string; Icon: IconType }[];
}[] = [
  {
    label: "Frontend",
    Icon: Code2,
    accent: "from-blue-500/20 to-blue-500/0 text-blue-500",
    items: [
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
    ],
  },
  {
    label: "Backend",
    Icon: Server,
    accent: "from-emerald-500/20 to-emerald-500/0 text-emerald-500",
    items: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "NestJS", Icon: SiNestjs },
      { name: "GraphQL", Icon: SiGraphql },
      { name: "Socket.io", Icon: SiSocketdotio },
    ],
  },
  {
    label: "Database",
    Icon: Database,
    accent: "from-purple-500/20 to-purple-500/0 text-purple-500",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "Redis", Icon: SiRedis },
    ],
  },
  {
    label: "Cloud & DevOps",
    Icon: Cloud,
    accent: "from-amber-500/20 to-amber-500/0 text-amber-500",
    items: [
      { name: "AWS", Icon: FaAws },
      { name: "Docker", Icon: SiDocker },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema()) }}
      />

      {/* Hero */}
      <PageHero
        eyebrow="What I Offer"
        icon={Code2}
        title="Senior full-stack developer for MVPs, SaaS & growth"
        description="One partner for the full product lifecycle - architecture to deployment. No juggling vendors, no gaps in ownership."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700"
            )}
          >
            Get a free scoping call
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/portfolio"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
            )}
          >
            View case studies
          </Link>
        </div>

        {/* Trust line */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/85">
          <span className="flex items-center gap-1.5">
            <span className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
              ))}
            </span>
            <span>5.0 · Upwork Top Rated</span>
          </span>
          <span className="hidden sm:inline text-white/40">•</span>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Accepting projects for Q1
          </span>
          <span className="hidden sm:inline text-white/40">•</span>
          <span>Reply within 4 hours</span>
        </div>
      </PageHero>

      {/* Stats bar */}
      <section className="border-b border-border bg-card">
        <div className="page-container py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is a full-stack developer — standalone answer block for AI citation */}
      <section className="page-section bg-muted/20 border-b border-border">
        <div className="page-container max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            What does a full-stack developer do?
          </h2>
          <p className="text-base text-foreground/90 leading-relaxed mb-4">
            A full-stack developer designs, builds, and deploys both the client-facing frontend (the UI a user sees) and the server-side backend (APIs, databases, business logic) of a web application. They own the entire vertical slice — from a React or Next.js user interface, through a Node.js or NestJS API layer, down to a PostgreSQL or MongoDB database, and out to cloud infrastructure on AWS or Vercel.
          </p>
          <p className="text-base text-foreground/90 leading-relaxed mb-4">
            In practice, hiring a single senior full-stack developer instead of separate frontend and backend specialists eliminates the coordination overhead and integration bugs that appear at every handoff boundary. One person who can write the API contract and the component that consumes it ships faster, debugs faster, and produces a more coherent codebase.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Smit Parekh is a full-stack developer with 4+ years building production web applications — React, Next.js, Node.js, TypeScript, PostgreSQL, and AWS — for FinTech, SaaS, and enterprise clients.{" "}
            <Link href="/hire-me" className="text-blue-500 hover:underline">
              See engagement models and availability →
            </Link>
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Services"
            title="Everything you need to ship"
            description="Whether you need a full product build or one specific layer of the stack - I cover it end-to-end."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => {
              const Icon = iconMap[service.iconName];
              return (
                <div
                  key={service.title}
                  className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/15 transition-colors">
                    <Icon className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base leading-snug mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                  <ul className="space-y-1.5 mt-auto">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why work with me - Differentiators */}
      <section className="page-section bg-muted/20 border-y border-border">
        <div className="page-container">
          <SectionHeader
            label="Why Hire Me"
            title="What you actually get"
            description="The reasons clients pick a senior solo dev over a 5-person agency."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {differentiators.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 hover:border-blue-500/40 transition-colors"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-base leading-snug">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="How I Work"
            title="A process built around clarity"
            description="Predictable delivery comes from a structured process - not guesswork."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {process.map((step, i) => (
              <div key={step.step} className="relative flex flex-col items-center text-center px-4">
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-1/2 w-full h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
                )}
                <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 font-bold text-sm mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="page-section bg-muted/20 border-y border-border">
        <div className="page-container">
          <SectionHeader
            label="Social Proof"
            title="What clients say"
            description="Real outcomes from real projects shipped in the last 12 months."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-500/15" />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-foreground/90 leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="pt-3 border-t border-border">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Upwork Top Rated Plus
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              100% Job Success Score
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              50+ projects shipped
            </span>
          </div>
        </div>
      </section>

      {/* Engagement Models with pricing */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Pricing & Engagement"
            title="Transparent pricing, your way of working"
            description="Three engagement models. Pick the one that matches your project - or talk to me and I'll recommend the right fit."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {engagementModels.map((model) => (
              <div
                key={model.type}
                className={cn(
                  "relative flex flex-col gap-3 rounded-2xl border bg-card p-7 transition-all",
                  model.popular
                    ? "border-blue-500/40 shadow-lg shadow-blue-500/5"
                    : "border-border hover:border-blue-500/30"
                )}
              >
                {model.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-blue-500 text-white text-[11px] font-semibold px-2.5 py-1 shadow-md">
                    <Sparkles className="w-3 h-3" />
                    Most popular
                  </span>
                )}
                <h3 className="font-bold text-lg">{model.type}</h3>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  {model.startsAt}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {model.description}
                </p>
                <p className="text-xs text-blue-500 font-medium">{model.ideal}</p>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: model.popular ? "default" : "outline", size: "sm" }),
                    "mt-2 w-full gap-1.5"
                  )}
                >
                  Get a quote
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            All prices in USD. Indian clients billed in INR at prevailing rate. NDA, IP transfer & invoicing handled before kickoff.
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="page-section bg-muted/20 border-y border-border">
        <div className="page-container">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Technologies I work with daily
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techCategories.map(({ label, Icon: CatIcon, accent, items }) => {
              const parts = accent.split(" ");
              const gradientCls = parts.slice(0, -1).join(" ");
              const textCls = parts[parts.length - 1];
              return (
                <div
                  key={label}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
                >
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${gradientCls} opacity-60`}
                  />
                  <div className="relative flex items-center gap-2.5 mb-4">
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-lg bg-background/60 border border-border ${textCls}`}
                    >
                      <CatIcon className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-sm tracking-tight">{label}</h3>
                  </div>
                  <ul className="relative flex flex-col gap-1.5 list-none m-0 p-0">
                    {items.map(({ name, Icon }) => (
                      <li
                        key={name}
                        className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm text-foreground/85 transition-colors hover:bg-muted/50`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${textCls}`} />
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries served */}
      <section className="page-section">
        <div className="page-container max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">
            Industries
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Shipping for teams across these industries
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            From regulated FinTech systems to high-traffic e-commerce - the patterns repeat, the stack scales.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {industries.map((ind) => (
              <span
                key={ind}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground/80"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-500" />
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Developer specialty pages */}
      <section className="page-section bg-muted/20 border-y border-border">
        <div className="page-container">
          <SectionHeader
            label="Hire by Speciality"
            title="Looking for a specific technology?"
            description="Each speciality page goes deep on a single technology - what I build, how I work, and the questions clients ask before hiring."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {developerPages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="group flex flex-col gap-2.5 rounded-2xl border border-border bg-card px-5 py-4 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
              >
                <p className="font-semibold text-sm group-hover:text-blue-500 transition-colors">
                  Hire a {page.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {page.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {page.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full border border-border bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section">
        <div className="page-container max-w-3xl">
          <SectionHeader
            label="FAQ"
            title="Common questions, straight answers"
            description="Most of the things clients ask before kicking off a project."
          />

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-border bg-card open:border-blue-500/40 open:shadow-md open:shadow-blue-500/5 transition-all"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 px-5 py-4 list-none">
                  <span className="text-sm sm:text-base font-semibold leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown className="mt-0.5 w-4 h-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 group-open:text-blue-500" />
                </summary>
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold mb-1">Question not answered?</p>
            <p className="text-xs text-muted-foreground mb-4">
              Send a quick message and you&apos;ll get a reply within 4 business hours.
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
            >
              Ask a question
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="page-section">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Ready to build?
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Let&apos;s talk about your project
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Most clients go from first message to a scoped proposal in 48 hours. The first call is free, no commitment.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold"
                  )}
                >
                  Start the conversation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "gap-2 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
                  )}
                >
                  See past work first
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-4 text-xs text-white/75">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Reply within 4 hours
                </span>
                <span className="hidden sm:inline text-white/40">•</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  NDA on request
                </span>
                <span className="hidden sm:inline text-white/40">•</span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  You own the code
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
