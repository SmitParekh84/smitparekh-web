import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, MapPin, Briefcase, Award, User } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { PageHero } from "@/components/layout/PageHero";
// import { LinkedInBadge } from "@/components/ui/linkedin-badge";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { faqPageSchema } from "@/lib/seo/schema";
import { aboutBio, experiences, certifications } from "@/data/about";
import { homeData, aboutStats } from "@/data/home";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
  UpworkIcon,
  WebsiteIcon,
} from "@/components/icons/SocialIcons";

export const metadata: Metadata = {
  title: "About Smit Parekh - Full Stack Developer | React & Node.js Expert",
  description:
    "Meet Smit Parekh - Full Stack Developer with 4+ years building production web applications across FinTech, AI/ML, SaaS, and enterprise. Expert in React, Next.js, Node.js, TypeScript, PostgreSQL, and AWS.",
  alternates: { canonical: `${siteConfig.url}/about` },
  keywords: [
    "about Smit Parekh",
    "Smit Parekh biography",
    "Full Stack Developer profile",
    "React developer India",
    "Next.js developer India",
    "Node.js developer experience",
    "freelance full stack developer",
    "FinTech developer",
    "SaaS developer",
    "enterprise web developer",
  ],
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    title: "About Smit Parekh - Full Stack Developer",
    description:
      "4+ years building production web apps for FinTech, SaaS, and enterprise - React, Next.js, Node.js, TypeScript, AWS.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-about-full-stack-developer.png`,
        width: 1200,
        height: 630,
        alt: "About Smit Parekh - Full Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "About Smit Parekh - Full Stack Developer",
    description:
      "4+ years building production web apps for FinTech, SaaS, and enterprise - React, Next.js, Node.js.",
  },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "About Smit Parekh - Full Stack Developer",
  url: `${siteConfig.url}/about`,
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
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
      "NestJS",
      "Redux",
      "GraphQL",
    ],
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
      siteConfig.social.x,
      siteConfig.social.instagram,
      siteConfig.social.upwork,
    ],
    hasCredential: certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.name,
      credentialCategory: "Certificate",
      recognizedBy: { "@type": "Organization", name: cert.issuer },
    })),
  },
};

const aboutFaqs: { q: string; a: string }[] = [
  {
    q: "What kind of projects does Smit Parekh work on?",
    a: "Production web applications across FinTech, SaaS, AI/ML, and enterprise. Typical engagements include multi-tenant SaaS products, internal admin platforms, real-time dashboards, REST and GraphQL APIs, and Next.js marketing sites that need 95+ Lighthouse scores. Most projects involve React or Next.js on the frontend with Node.js, NestJS, or Express on the backend.",
  },
  {
    q: "What makes Smit Parekh's work production-grade and professional quality?",
    a: "Every project ships with TypeScript strict mode, automated tests on critical paths, CI/CD pipelines, monitoring, and documented deployment runbooks. No suppressed any types, no commented-out code, no hackathon-style shortcuts. The same standards apply whether the budget is for a 2-week MVP or a 6-month platform build.",
  },
  {
    q: "Where is Smit Parekh based and which timezones does he work in?",
    a: "Based in India (IST, UTC+5:30) and available worldwide as a remote contractor. Core working hours overlap comfortably with EU mornings and US East Coast evenings; sync calls and demos are scheduled to fit the client's working hours. Async-first by default, with daily updates and weekly demos.",
  },
  {
    q: "How experienced is Smit Parekh with React, Next.js, and Node.js?",
    a: "4+ years of professional experience shipping React and Node.js to production, with the last 2+ years focused heavily on Next.js App Router, Server Components, and edge deployments. Has shipped 20+ production applications including FinTech platforms handling 10K+ daily API requests at 99.9% uptime.",
  },
  {
    q: "Does Smit Parekh take on long-term contracts or only short projects?",
    a: "Both. Engagement models include fixed-scope projects (MVPs, redesigns, defined feature builds), time-and-materials contracts for evolving products, and monthly retainers for ongoing development and maintenance. Typical contracts range from 4 weeks to 12 months. Available for either solo ownership or as a senior contributor on an existing team.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: `${siteConfig.url}/about`,
    },
  ],
};

const socialIcons = {
  email: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  x: XIcon,
  upwork: UpworkIcon,
  marketixpert: WebsiteIcon,
} as const;

const stats = [
  { value: aboutStats.years, label: "Years Experience" },
  { value: aboutStats.certifications, label: "Certifications" },
  { value: aboutStats.companies, label: "Companies" },
  { value: "20+", label: "Projects Shipped" },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(aboutFaqs)) }}
      />

      {/* Hero banner - matches /blog style */}
      <PageHero
        eyebrow="About Me"
        icon={User}
        title={<>Smit Parekh - Full-Stack Web Developer</>}
        description="4+ years building production web apps for FinTech, AI/ML, SaaS, and enterprise clients. React, Next.js, Node.js, TypeScript, AWS - based in India, available worldwide."
      />

      {/* Profile */}
      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>India · Available Worldwide</span>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                {aboutBio}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: "lg" }), "gap-2")}
                >
                  Work With Me
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/resume"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "gap-2"
                  )}
                >
                  <Download className="w-4 h-4" />
                  View Resume
                </Link>
              </div>

              <div className="flex items-center gap-4">
                {homeData.socialLinks.map((social) => {
                  const Icon = socialIcons[social.platform];
                  const isEmail = social.href.startsWith("mailto:");
                  return (
                    <a
                      key={social.platform}
                      href={social.href}
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noopener noreferrer"}
                      aria-label={social.label}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Photo + Stats */}
            <div className="flex flex-col items-center lg:items-end gap-8">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border border-border bg-muted shadow-2xl">
                <Image
                  src={homeData.imageSrc}
                  alt="Smit Parekh - Full Stack Developer"
                  fill
                  sizes="(max-width: 640px) 256px, 288px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center rounded-2xl border border-border bg-card px-4 py-4 text-center"
                  >
                    <span className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* <LinkedInBadge className="w-full lg:justify-end" /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Experience"
            title="Work History"
            align="left"
          />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <h3 className="font-bold text-base">{exp.role}</h3>
                      <p className="text-sm text-blue-500 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground border border-border rounded-full px-3 py-1 w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                      >
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
          <SectionHeader
            label="Credentials"
            title="Certifications"
            align="left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-400/10">
                  <Award className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm leading-snug">{cert.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-blue-500 font-medium mt-1">
                    {cert.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* FAQ */}
      <section className="page-section">
        <div className="page-container max-w-3xl">
          <SectionHeader
            label="Frequently Asked"
            title="Common questions"
            description="What clients usually ask before working with me."
          />
          <div className="mt-10 space-y-4">
            {aboutFaqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-border bg-card p-5 open:border-blue-500/40 open:shadow-sm transition-all"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-semibold text-base leading-snug list-none">
                  <span>{item.q}</span>
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-blue-500 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-muted/20">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Let&apos;s Build Something
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to Work Together?
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                I&apos;m available for new projects. Tell me what you&apos;re
                building and let&apos;s see if we&apos;re a fit.
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
                <Link
                  href="/portfolio"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2"
                  )}
                >
                  View My Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
