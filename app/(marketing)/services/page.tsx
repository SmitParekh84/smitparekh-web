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
      provider: {
        "@type": "Person",
        name: "Smit Parekh",
        url: siteConfig.url,
      },
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
  title: "Services - Full-Stack Web Development by Smit Parekh",
  description:
    "End-to-end web development services: React frontends, Node.js APIs, database design, AWS deployment, and technical SEO. One partner for the full product lifecycle.",
  alternates: { canonical: `${siteConfig.url}/services` },
  keywords: [
    "full stack web development services",
    "React development services",
    "Next.js development services",
    "Node.js API development",
    "AWS deployment services",
    "technical SEO services",
    "MVP development",
    "freelance web developer services",
    "hire full stack developer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.name,
    title: "Services - Full-Stack Web Development by Smit Parekh",
    description:
      "End-to-end web development services: React frontends, Node.js APIs, database design, AWS deployment, and technical SEO.",
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
    title: "Services - Full-Stack Web Development by Smit Parekh",
    description:
      "End-to-end web development services: React, Node.js, AWS, technical SEO.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-web-development-services.png`,
        width: 1200,
        height: 630,
        alt: "Web Development Services by Smit Parekh - React, Next.js, Node.js, AWS",
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

const engagementModels = [
  {
    type: "Fixed Scope",
    description:
      "Defined deliverables, fixed price, fixed timeline. Best for MVPs and well-scoped features.",
    ideal: "MVPs · Feature builds · Redesigns",
  },
  {
    type: "Time & Materials",
    description:
      "Flexible scope, billed weekly. Best for evolving products where requirements change.",
    ideal: "Ongoing product development · Complex systems",
  },
  {
    type: "Monthly Retainer",
    description:
      "Dedicated hours each month for development, maintenance, and technical support.",
    ideal: "Maintenance · Performance work · Ongoing support",
  },
];

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
      {/* Header */}
      <PageHero
        eyebrow="What I Offer"
        icon={Code2}
        title="End-to-End Web Development"
        description="One partner for the full product lifecycle - from architecture to deployment. No juggling multiple vendors, no gaps in ownership."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700"
            )}
          >
            Discuss Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/portfolio"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
            )}
          >
            View My Work
          </Link>
        </div>
      </PageHero>

      {/* Services Grid */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Services"
            title="Everything You Need to Ship"
            description="Whether you need a full product build or a specific layer of the stack - I cover it end-to-end."
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

      {/* Process */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="How I Work"
            title="A Process Built Around Clarity"
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

      {/* Engagement Models */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Engagement"
            title="Work Together, Your Way"
            description="Choose the model that fits your project and team."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {engagementModels.map((model) => (
              <div
                key={model.type}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-7"
              >
                <h3 className="font-bold text-lg">{model.type}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {model.description}
                </p>
                <p className="text-xs text-blue-500 font-medium">{model.ideal}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Not sure which model fits? Tell me about your project and I&apos;ll
              recommend the right approach.
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              Get a Free Scoping Call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="page-section bg-muted/20">
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

      {/* CTA */}
      <section className="page-section">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Ready to Build?
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Let&apos;s Talk About Your Project
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Most clients go from first message to a scoped proposal within
                48 hours.
              </p>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold mt-2"
                )}
              >
                Start the Conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
