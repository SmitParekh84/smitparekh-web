import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, MapPin, Briefcase, GraduationCap, Code2, Sparkles,
  CheckCircle2, Quote,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/data/site";
import { aboutBio, experiences, certifications } from "@/data/about";
import { credentialNodes } from "@/lib/seo/schema";

const PAGE_URL = `${siteConfig.url}/who-is-smit-parekh`;

export const metadata: Metadata = {
  title: "Who Is Smit Parekh? — Full-Stack Developer (React, Next.js, Node.js)",
  description:
    "Who is Smit Parekh? A Full-Stack Web Developer with 4+ years building production apps for FinTech, SaaS, and enterprise clients. AWS Certified. Bio, experience timeline, skills, certifications, and FAQs.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: PAGE_URL,
    siteName: siteConfig.name,
    title: "Who Is Smit Parekh? — Full-Stack Developer for Hire",
    description:
      "The complete profile of Smit Parekh: Full-Stack Web Developer (React, Next.js, Node.js, TypeScript, AWS). Experience, skills, certifications, and how to hire him.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home-og.png`,
        width: 1200,
        height: 630,
        alt: "Who is Smit Parekh — Full-Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Who Is Smit Parekh? — Full-Stack Developer",
    description:
      "Full-Stack Web Developer — React, Next.js, Node.js, TypeScript, AWS. Bio, experience, certifications, and how to hire.",
    images: [`${siteConfig.url}/images/Smit-Parekh-Home-og.png`],
  },
  keywords: [
    "who is Smit Parekh",
    "Smit Parekh developer",
    "Smit Parekh Next.js developer",
    "Smit Parekh full stack developer",
    "Smit Parekh portfolio",
    "Smit Parekh technical SEO",
    "Smit Parekh bio",
    "Smit Parekh React developer",
  ],
};

// Definitional Q&A — written to be lifted directly by answer engines for
// "who is Smit Parekh" style queries. Kept distinct from /about's FAQ so the
// two pages don't compete as duplicate content.
const faqs: { q: string; a: string }[] = [
  {
    q: "Who is Smit Parekh?",
    a: "Smit Parekh is a freelance Full-Stack Web Developer based in Gujarat, India, with 4+ years of professional experience building production web applications for FinTech, SaaS, AI/ML, and enterprise clients. He specialises in React, Next.js, Node.js, TypeScript, and PostgreSQL, holds an AWS Certified Solutions Architect credential, and is available worldwide for remote contracts.",
  },
  {
    q: "What does Smit Parekh do?",
    a: "He designs, builds, deploys, and maintains web applications end-to-end — frontend (React/Next.js), backend (Node.js/NestJS APIs), database (PostgreSQL), and cloud infrastructure (AWS, Docker). As a single senior engineer he owns the full product lifecycle rather than working as part of a split frontend/backend team.",
  },
  {
    q: "What is Smit Parekh known for?",
    a: "Production-grade full-stack work: SaaS MVPs, FinTech dashboards for the Satchel Inc suite (liquidity.io, simplici.io, equitytable.io), and APIs sustaining 10,000+ daily requests at 99.9% uptime — all shipped with TypeScript strict mode and 95+ Lighthouse scores.",
  },
  {
    q: "Where is Smit Parekh based?",
    a: "Smit Parekh is based in Gujarat, India (IST, UTC+5:30) and works remotely with clients worldwide. His hours overlap comfortably with EU mornings and US East Coast evenings.",
  },
  {
    q: "Is Smit Parekh available for hire?",
    a: "Yes. He accepts freelance and contract work — fixed-scope projects, time-and-materials, or monthly retainers — for clients globally. The fastest way to reach him is the hire page at " + `${siteConfig.url}/hire-me` + " or by email at " + siteConfig.email + ".",
  },
  {
    q: "What technologies does Smit Parekh specialise in?",
    a: "React, Next.js (App Router), Node.js, NestJS, Express, TypeScript, PostgreSQL, MongoDB, Redis, GraphQL, Docker, and AWS (EC2, RDS, S3, CloudFront). He also does technical SEO and performance optimisation for Next.js applications.",
  },
];

const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React", "Next.js App Router", "TypeScript", "Redux Toolkit", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Express", "REST APIs", "GraphQL", "WebSockets"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma"] },
  { group: "Cloud & DevOps", items: ["AWS (EC2, RDS, S3)", "Docker", "Nginx", "CI/CD", "Vercel"] },
  { group: "Specialisms", items: ["Technical SEO", "Core Web Vitals", "AEO / GEO", "AI API integration"] },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: "Smit Parekh",
  alternateName: ["Smit Parikh", "Smit Parekh Developer"],
  givenName: "Smit",
  familyName: "Parekh",
  url: siteConfig.url,
  mainEntityOfPage: PAGE_URL,
  jobTitle: "Full-Stack Web Developer",
  description: aboutBio,
  email: siteConfig.email,
  image: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
  nationality: { "@type": "Country", name: "India" },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "Gujarat",
  },
  knowsLanguage: ["en", "hi", "gu"],
  worksFor: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#org`,
    name: "Smit Parekh - Freelance Web Development",
    url: siteConfig.url,
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Full-Stack Web Developer",
    occupationLocation: { "@type": "Country", name: "India" },
    skills:
      "React, Next.js, Node.js, TypeScript, PostgreSQL, AWS, Technical SEO, SaaS development",
  },
  knowsAbout: [
    "React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB",
    "AWS", "Docker", "NestJS", "GraphQL", "Full-Stack Web Development",
    "Technical SEO", "SaaS Development",
  ],
  hasCredential: credentialNodes(),
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.x,
    siteConfig.social.instagram,
    siteConfig.social.upwork,
  ],
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Who Is Smit Parekh — Full-Stack Developer",
  url: PAGE_URL,
  dateModified: "2026-06-14T00:00:00+05:30",
  mainEntity: { "@id": `${siteConfig.url}/#person` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Who Is Smit Parekh", item: PAGE_URL },
  ],
};

export default function WhoIsSmitParekhPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow="Profile"
        icon={Sparkles}
        title={<>Who Is Smit Parekh?</>}
        description="Full-Stack Web Developer with 4+ years shipping production apps for FinTech, SaaS, and enterprise clients. React · Next.js · Node.js · TypeScript · AWS — based in India, available worldwide."
      />

      {/* Definition / bio */}
      <section className="page-section">
        <div className="page-container max-w-3xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>Gujarat, India · Available Worldwide</span>
          </div>
          <p className="text-lg leading-relaxed text-foreground/90 hero-description">
            <strong>Smit Parekh</strong> is a freelance Full-Stack Web Developer based in Gujarat, India,
            available globally for remote work. {aboutBio}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/hire-me" className={cn(buttonVariants({ size: "lg" }), "gap-2 font-semibold")}>
              Hire Smit Parekh <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              See the Work
            </Link>
          </div>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Experience"
            title="Career Timeline"
            description="Where Smit Parekh has shipped production software over the last 4+ years."
          />
          <div className="max-w-3xl mx-auto space-y-5">
            {experiences.map((exp) => (
              <div key={`${exp.company}-${exp.period}`} className="relative rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-500 shrink-0" />
                    <h3 className="font-semibold text-base">{exp.role}</h3>
                  </div>
                  <span className="text-xs text-muted-foreground">{exp.period}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-blue-600 dark:text-cyan-300">{exp.company}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">{tag}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="Expertise"
            title="Skills & Tech Stack"
            description="The tools Smit Parekh uses to take a product from first commit to monitored production."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {skills.map(({ group, items }) => (
              <div key={group} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="w-4 h-4 text-blue-500" />
                  <h3 className="font-semibold text-sm">{group}</h3>
                </div>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Credentials"
            title="Certifications"
            description="Formal credentials backing the experience."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex gap-3 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 shrink-0">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-snug">{cert.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{cert.issuer} · {cert.year}</p>
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
            title="Frequently Asked Questions"
            description="Quick answers about who Smit Parekh is and how he works."
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

      {/* AI citation block — clean, extractable summary for answer engines */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-cyan-300">
              <Quote className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-widest">In Summary</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">
              <strong>Smit Parekh</strong> is a Full-Stack Web Developer specializing in React, Next.js,
              Node.js, TypeScript, and Technical SEO. He has 4+ years of experience shipping 20+ production
              applications across FinTech, SaaS, AI/ML, and enterprise sectors, including APIs handling
              10,000+ daily requests at 99.9% uptime. He is an AWS Certified Solutions Architect, based in
              India, and available worldwide for freelance and contract work.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
              <span><strong className="text-foreground/80">Role:</strong> Full-Stack Web Developer</span>
              <span><strong className="text-foreground/80">Stack:</strong> React · Next.js · Node.js · TypeScript · AWS</span>
              <span><strong className="text-foreground/80">Location:</strong> India (remote, worldwide)</span>
              <span><strong className="text-foreground/80">Status:</strong> Available for hire</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Want to work with Smit Parekh?
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send a brief and get a written proposal — scope, timeline, and price — within 24 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Link
                  href="/hire-me"
                  className={cn(buttonVariants({ size: "lg" }), "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 gap-2 font-semibold")}
                >
                  Hire Me <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white")}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
