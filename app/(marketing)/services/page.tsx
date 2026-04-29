import type { Metadata } from "next";
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

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "AWS",
  "Docker",
  "Socket.io",
  "Tailwind CSS",
  "GraphQL",
  "REST APIs",
  "Jest",
  "Git",
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
        <div className="page-container text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Technologies I Work With
          </p>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            <div className="flex w-max animate-marquee">
              <ul className="flex shrink-0 gap-2 sm:gap-3 pr-2 sm:pr-3 list-none m-0 p-0">
                {techStack.map((tech, i) => (
                  <li
                    key={`svc-tech-a-${i}`}
                    className="whitespace-nowrap px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-border bg-card text-xs sm:text-sm text-foreground/80 font-medium"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <ul
                aria-hidden="true"
                className="flex shrink-0 gap-2 sm:gap-3 pr-2 sm:pr-3 list-none m-0 p-0"
              >
                {techStack.map((tech, i) => (
                  <li
                    key={`svc-tech-b-${i}`}
                    className="whitespace-nowrap px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-border bg-card text-xs sm:text-sm text-foreground/80 font-medium"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
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
