import type { Metadata } from "next";
import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Server,
  Database,
  Cloud,
  Zap,
  Users,
  ShieldCheck,
  Clock,
  Download,
  Star,
  TrendingUp,
  Globe,
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiNestjs, SiPostgresql, SiMongodb,
  SiRedis, SiSocketdotio, SiGraphql, SiDocker,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { UpworkIcon } from "@/components/icons/SocialIcons";
import { PageHero } from "@/components/layout/PageHero";
import { BookCallButton } from "@/components/cal/BookCallButton";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { aggregateRatingSchema, faqPageSchema } from "@/lib/seo/schema";
import { aboutBio, experiences, certifications } from "@/data/about";
import { developerPages } from "@/data/developer-pages";

export const metadata: Metadata = {
  title: "Hire Smit Parekh - Full Stack Developer | React, Next.js, Node.js",
  description:
    "Hire Smit Parekh - Full Stack Developer with 4+ years shipping production web apps for FinTech, SaaS & enterprise. React, Next.js, Node.js, TypeScript, AWS. Fixed price, clear scope, fast delivery.",
  alternates: { canonical: `${siteConfig.url}/hire-me` },
  keywords: [
    "hire full stack developer",
    "hire React developer",
    "hire Next.js developer",
    "hire Node.js developer",
    "freelance full stack developer India",
    "contract web developer",
    "full stack developer for hire",
    "hire TypeScript developer",
    "hire React Next.js developer",
    "Smit Parekh hire",
  ],
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/hire-me`,
    siteName: siteConfig.name,
    title: "Hire Smit Parekh - Full Stack Developer",
    description:
      "4+ years shipping production web apps. React, Next.js, Node.js, TypeScript, AWS. Fixed price, clear scope, fast delivery.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-hire-me.png`,
        width: 1200,
        height: 630,
        alt: "Hire Smit Parekh - Full Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire Smit Parekh - Full Stack Developer",
    description:
      "4+ years shipping production web apps. React, Next.js, Node.js, TypeScript, AWS.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-hire-me.png`,
        width: 1200,
        height: 630,
        alt: "Hire Smit Parekh - Full Stack Developer",
      },
    ],
  },
};

const hireMeSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Hire Smit Parekh - Full Stack Developer",
  url: `${siteConfig.url}/hire-me`,
  mainEntity: {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: "Smit Parekh",
    url: siteConfig.url,
    jobTitle: "Full-Stack Web Developer",
    description: aboutBio,
    email: siteConfig.email,
    image: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
    worksFor: { "@type": "Organization", name: "Freelance" },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
      siteConfig.social.x,
      siteConfig.social.upwork,
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Hire Me", item: `${siteConfig.url}/hire-me` },
  ],
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

const metrics = [
  { value: "65%", label: "Faster query response times", icon: TrendingUp },
  { value: "40%", label: "Performance improvement delivered", icon: Zap },
  { value: "10K+", label: "Daily API requests handled", icon: Globe },
  { value: "8+", label: "Production apps at scale", icon: Star },
];

const whatIBuild = [
  {
    icon: Code2,
    title: "SaaS Products",
    description:
      "Full-stack SaaS from scratch - auth, billing, dashboards, multi-tenancy. Built to handle real users from day one.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    icon: TrendingUp,
    title: "FinTech Platforms",
    description:
      "Complex financial web apps with real-time data, secure APIs, and compliance-first architecture.",
    tags: ["React", "TypeScript", "AWS", "PostgreSQL"],
  },
  {
    icon: Zap,
    title: "MVPs & Prototypes",
    description:
      "From idea to working product in weeks. Scoped tightly so you can validate before you scale.",
    tags: ["Next.js", "Node.js", "MongoDB"],
  },
  {
    icon: Server,
    title: "API & Backend Systems",
    description:
      "RESTful and GraphQL APIs built for performance - pagination, caching, auth, rate limiting, docs.",
    tags: ["Node.js", "NestJS", "Redis", "Docker"],
  },
];

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Production-grade only",
    description:
      "Everything I ship is tested, documented, and built to scale. Not a hackathon demo - a real product.",
  },
  {
    icon: Users,
    title: "One point of contact",
    description:
      "No account managers, no hand-offs. You talk to the engineer doing the work, every time.",
  },
  {
    icon: Clock,
    title: "Delivery you can plan around",
    description:
      "Scoped milestones, weekly demos, async updates. You always know what's shipped and what's next.",
  },
];

const engagementModels = [
  {
    type: "Fixed Scope",
    description:
      "Defined deliverables, fixed price, fixed timeline. Best for MVPs and well-scoped features.",
    ideal: "MVPs · Feature builds · Redesigns",
    highlight: false,
  },
  {
    type: "Time & Materials",
    description:
      "Flexible scope, billed weekly. Best for evolving products where requirements change.",
    ideal: "Ongoing development · Complex systems",
    highlight: true,
  },
  {
    type: "Monthly Retainer",
    description:
      "Dedicated hours each month for development, maintenance, and technical support.",
    ideal: "Maintenance · Ongoing iteration · Support",
    highlight: false,
  },
];

const faqs = [
  {
    q: "How much do you charge?",
    a: "I work fixed-price for clearly scoped projects and hourly for ongoing work. After a 30-minute scoping call you'll receive a written proposal with no hidden fees.",
  },
  {
    q: "Are you available right now?",
    a: "Yes - currently accepting new projects. Typical start is within 1–2 weeks of agreeing the scope. For urgent fixes I can often start the same week.",
  },
  {
    q: "Can you work with my existing team?",
    a: "Absolutely. I integrate with your GitHub, Linear/Jira, and deployment pipeline. Comfortable as the sole engineer or as a senior contributor on a larger team.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, happy to sign your standard NDA before any discovery conversations.",
  },
  {
    q: "What timezone are you in?",
    a: "India (IST, UTC+5:30). I work async-first with a few hours of daily overlap for US/EU clients - sync calls and demos scheduled to fit your working hours.",
  },
  {
    q: "Do you handle deployment and DevOps?",
    a: "Yes - AWS (EC2, RDS, S3), Vercel, and Docker are all part of my standard stack. Every project includes production deployment and monitoring setup.",
  },
];

export default function HireMePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hireMeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqs)) }}
      />

      <PageHero
        eyebrow="Available for Hire"
        icon={Star}
        title="Full-Stack Developer Who Ships"
        description="4+ years building production web apps for FinTech, SaaS & enterprise. React, Next.js, Node.js, TypeScript, AWS - based in India, working worldwide."
      >
        <div className="flex flex-wrap gap-3 items-center">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700"
            )}
          >
            Start a Conversation
            <ArrowRight className="w-4 h-4" />
          </Link>
          <BookCallButton
            size="lg"
            variant="outline"
            label="Book a 15-min call"
            className="gap-2 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
          />
          <Link
            href="/resume"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <Download className="w-4 h-4" />
            View Resume
          </Link>
          <a
            href={siteConfig.social.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
            )}
          >
            <UpworkIcon className="w-4 h-4" />
            Hire on Upwork
          </a>
        </div>
      </PageHero>

      {/* Profile strip */}
      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo + stats */}
            <div className="flex flex-col items-center lg:items-start gap-8">
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border border-border bg-muted shadow-2xl">
                <Image
                  src="/images/Smit-Parekh-Home.png"
                  alt="Smit Parekh - Full Stack Developer available for hire"
                  fill
                  sizes="(max-width: 640px) 240px, 288px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                {[
                  { value: "4+", label: "Years Experience" },
                  { value: "4+", label: "Companies" },
                  { value: "20+", label: "Projects Shipped" },
                  { value: "AWS", label: "Certified" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center rounded-2xl border border-border bg-card px-4 py-4 text-center"
                  >
                    <span className="text-2xl font-bold text-foreground">{s.value}</span>
                    <span className="text-xs text-muted-foreground mt-1">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio + availability */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  Open to new projects — Q2 2025
                </span>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                {aboutBio}
              </p>

              <ul className="space-y-2">
                {[
                  "Full ownership from architecture to production deploy",
                  "Clear written scope before any work starts",
                  "Weekly demos + async Loom updates throughout",
                  "30-day post-launch support on every project",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 w-4 h-4 text-cyan-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg" }), "gap-2")}
                >
                  Hire Me
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  View My Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track record */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center rounded-2xl border border-border bg-card p-6 gap-3"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-3xl font-bold text-foreground">{value}</span>
                <span className="text-xs text-muted-foreground leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I build */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Expertise"
            title="What I Build Best"
            description="I specialise in complex, full-stack web products - not templates or marketing sites."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whatIBuild.map(({ icon: Icon, title, description, tags }) => (
              <div
                key={title}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 hover:border-blue-500/40 transition-colors"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why me */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Why Hire Me"
            title="What Sets Me Apart"
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {differentiators.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-7"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="page-section">
        <div className="page-container">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Technologies I Work With
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
                    <div className={`flex items-center justify-center w-9 h-9 rounded-lg bg-background/60 border border-border ${textCls}`}>
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

      {/* Experience timeline */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <SectionHeader label="Track Record" title="Work History" align="left" />
          <div className="space-y-5">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row gap-6 rounded-2xl border border-border bg-card p-6 sm:p-7"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10">
                  <Star className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <h3 className="font-bold text-sm">{exp.role}</h3>
                      <p className="text-sm text-blue-500 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground border border-border rounded-full px-3 py-1 w-fit">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader label="Credentials" title="Certifications" align="left" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-400/10">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm leading-snug">{cert.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                  <p className="text-xs text-blue-500 font-medium mt-1">{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Engagement"
            title="Choose How We Work Together"
            description="Every project starts with a free 30-minute scoping call. No commitment, just clarity."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {engagementModels.map((model) => (
              <div
                key={model.type}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl border p-7 transition-colors",
                  model.highlight
                    ? "border-blue-500/40 bg-blue-500/5"
                    : "border-border bg-card"
                )}
              >
                {model.highlight && (
                  <Badge className="w-fit text-xs bg-blue-500 text-white">Most Popular</Badge>
                )}
                <h3 className="font-bold text-lg">{model.type}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {model.description}
                </p>
                <p className="text-xs text-blue-500 font-medium">{model.ideal}</p>
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
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer specialty pages */}
      <section className="page-section border-t border-border">
        <div className="page-container">
          <SectionHeader
            label="Hire by Speciality"
            title="Need a Specific Technology?"
            description="Each page goes deep on one technology — what I build with it, the results I've delivered, and how I work."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {developerPages.map((page) => (
              <a
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
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-border bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
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
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-sm font-medium">Available Now</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to hire? Let&apos;s talk.
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send a message and I&apos;ll reply within 24 hours with a free
                scoped proposal — no commitment required.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold"
                  )}
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <BookCallButton
                  size="lg"
                  variant="outline"
                  label="Book a 15-min call"
                  className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2"
                />
                <Link
                  href="/portfolio"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2"
                  )}
                >
                  View My Work
                </Link>
                <a
                  href={siteConfig.social.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2"
                  )}
                >
                  <UpworkIcon className="w-4 h-4" />
                  Hire on Upwork
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
