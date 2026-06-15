import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  FileText,
  Globe,
  GraduationCap,
  Layers,
  Lightbulb,
  MessageSquare,
  Rocket,
  Timer,
  Trophy,
  Wallet,
  Wrench,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Web Dev for Students - Projects, Portfolios & Hackathons",
  description:
    "Hire a full-stack developer for your student project, final-year project, hackathon, or portfolio site. Budget-friendly pricing. React and Next.js.",
  alternates: { canonical: `${siteConfig.url}/for-students` },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/for-students`,
    siteName: siteConfig.name,
    title: "Affordable Web Development for Students - UK, Canada, US",
    description:
      "Final year projects, hackathon apps, portfolio websites, and startup MVPs - built by a professional developer at student-friendly prices. React, Next.js, Node.js. Free quote within 24 hours.",
    images: [
      {
        url: `${siteConfig.url}/images/for-students.png`,
        width: 1200,
        height: 630,
        alt: "Affordable Web Development for Students by Smit Parekh",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Affordable Web Development for Students - UK, Canada, US",
    description:
      "Final year projects, hackathons, portfolios, startup MVPs. Budget-friendly pricing. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/for-students.png`, width: 1200, height: 630 }],
  },
  keywords: [
    // Core intent
    "web developer for students",
    "affordable web developer for students",
    "student project web development",
    "freelance developer for student projects",
    "web development for university students",
    "web developer for final year project",
    "hire developer for university project",
    "cheap web developer for students",
    "budget web development students",
    "student-friendly web developer",
    "web development help for students",
    "web app for student project",

    // Project types
    "final year project web development",
    "capstone project web development",
    "hackathon developer for hire",
    "hackathon project developer",
    "student portfolio website developer",
    "portfolio website for students",
    "student startup web development",
    "university club website development",
    "technical documentation for student project",

    // Geo - UK
    "web developer for students UK",
    "affordable developer for international students UK",
    "freelance developer for students United Kingdom",
    "web development for Indian students in UK",
    "final year project developer UK",
    "hackathon developer UK",
    "student web developer London",

    // Geo - Canada
    "web developer for students Canada",
    "affordable developer for students Canada",
    "freelance developer for international students Canada",
    "web development for Indian students in Canada",
    "final year project developer Canada",
    "hackathon developer Toronto",

    // Geo - US
    "web developer for students USA",
    "affordable developer for international students United States",
    "freelance developer for students US",
    "student project developer United States",
    "hackathon developer USA",

    // Geo - India students abroad
    "web developer for Indian students abroad",
    "affordable developer for Indian students UK Canada",
    "Indian developer for student project",
  ],
};

const services = [
  {
    icon: GraduationCap,
    title: "Final Year / Capstone Project",
    description:
      "Turn your project idea into a working web application - the kind that impresses examiners and goes on your CV. Full-stack delivery with clean, readable code your supervisor can actually review.",
    tags: ["React", "Node.js", "PostgreSQL", "REST API"],
    badge: "Most requested",
  },
  {
    icon: Layers,
    title: "Personal Portfolio Website",
    description:
      "A professional portfolio that stands out from every Wix template in the room. Custom-built, fast-loading, and optimised for the job applications you'll be filing before graduation.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    badge: null,
  },
  {
    icon: Trophy,
    title: "Hackathon Project",
    description:
      "Need a working demo built fast? Hackathon projects live or die on execution speed. I've shipped production-quality apps under real time pressure - your deadline is my problem too.",
    tags: ["React", "Node.js", "MongoDB", "Rapid delivery"],
    badge: "Fast turnaround",
  },
  {
    icon: Lightbulb,
    title: "Startup MVP / Side Project",
    description:
      "Got a business idea from your entrepreneurship module? Let's build a real, working product - not a slide deck. Scoped lean so your limited budget goes as far as possible.",
    tags: ["Next.js", "Supabase", "Stripe", "Auth"],
    badge: null,
  },
  {
    icon: Globe,
    title: "Club or Society Website",
    description:
      "Your university club deserves more than a Facebook group. A clean, low-maintenance website with events, member info, and a contact form - built once, works for years.",
    tags: ["Next.js", "CMS", "Tailwind CSS"],
    badge: null,
  },
  {
    icon: FileText,
    title: "Technical Documentation",
    description:
      "README files, API documentation, architecture diagrams, and technical project reports - written by the engineer who built the system, so it's actually accurate.",
    tags: ["README", "API Docs", "Markdown", "Diagrams"],
    badge: null,
  },
];

const whyMe = [
  {
    icon: Wallet,
    title: "Tell me your budget, I'll tell you what I can build",
    description:
      "No fixed pricing tiers that don't match student realities. Message me with your brief and your budget and I'll give you an honest quote for exactly what's possible.",
  },
  {
    icon: Timer,
    title: "Fast delivery - most projects in 1-3 weeks",
    description:
      "Deadlines are real. Whether it's a submission date or a demo day, I plan around your schedule from the first message.",
  },
  {
    icon: Code2,
    title: "Clean, commented code you can own",
    description:
      "You get full source code - no subscriptions, no lock-in, no mystery framework. Written clearly enough that your supervisor or team can read and extend it.",
  },
  {
    icon: MessageSquare,
    title: "Async-first, any timezone",
    description:
      "Based in India (UTC+5:30), I work with students in the UK, Canada, and the US through async updates with scheduled calls at times that work for you.",
  },
  {
    icon: Wrench,
    title: "Works with your existing code",
    description:
      "Already started something? No problem. I can pick up an existing codebase, fix what's broken, and take it the rest of the way.",
  },
  {
    icon: Rocket,
    title: "Deployed and working - not just on localhost",
    description:
      "Every project I deliver is running live on a real URL. Not a zip file. Not a local demo. A deployed, working product you can show to anyone.",
  },
];

const steps = [
  {
    step: "01",
    title: "Send me your brief",
    description:
      "Tell me what you need, when it's due, and what you have to spend. No commitment, no forms - just a message via the contact page.",
  },
  {
    step: "02",
    title: "Get a clear quote in 24 hours",
    description:
      "I'll reply with exactly what I can build for your budget, a realistic timeline, and a plain-English breakdown. No hidden fees.",
  },
  {
    step: "03",
    title: "I build it. You own it.",
    description:
      "Regular updates throughout, working software at the end, and full handover of source code, docs, and the live deployment.",
  },
];

const faqs = [
  {
    q: "How much does a student project cost?",
    a: "It depends on what you need. A simple portfolio site starts around $150-300. A final year project web app with a backend typically runs $400-800. A hackathon MVP can be less. Message me with your brief and I'll give you an honest number.",
  },
  {
    q: "How fast can you build my project?",
    a: "Most student projects are delivered in 1-3 weeks. For hackathon work, I can move in 48-72 hours depending on complexity. Share your deadline in your first message.",
  },
  {
    q: "Will I fully own the code?",
    a: "Yes, completely. You get the full source code, the repository, and the deployment. There are no ongoing fees, no subscriptions, and no lock-in of any kind.",
  },
  {
    q: "Can you work with code I've already started?",
    a: "Absolutely. I can review what you have, take it from where it is, and finish or fix it. Just share the repo or files when you reach out.",
  },
  {
    q: "Do you serve students in the UK, Canada, and the US?",
    a: "Yes - I work fully remote with students across those countries and beyond. Communication happens async over email and WhatsApp, with video calls at times that work for your timezone.",
  },
  {
    q: "Can you write the technical documentation too?",
    a: "Yes. I offer README files, API documentation, architecture write-ups, and project reports as add-ons or as standalone work. Many students find this useful for their submission.",
  },
  {
    q: "What technologies do you use?",
    a: "React, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB, and AWS are my main stack. Tell me what your university or employer requires and I'll build to those constraints.",
  },
  {
    q: "Do you work with students outside the UK, Canada, and US?",
    a: "Yes - I work with students worldwide. Those countries are where most of my student clients are based, but location doesn't change anything about how we work together.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web Development for Students",
  provider: personNode(),
  serviceType: "Web Development",
  description:
    "Affordable full-stack web development for university and college students - final year projects, hackathon apps, portfolio websites, startup MVPs, and technical documentation. Serving students in the UK, Canada, the US, and worldwide.",
  areaServed: [
    { "@type": "Country", name: "GB" },
    { "@type": "Country", name: "CA" },
    { "@type": "Country", name: "US" },
    { "@type": "Country", name: "IN" },
  ],
  url: `${siteConfig.url}/for-students`,
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    description: "Budget-friendly pricing for students. Contact for a free quote.",
    availability: "https://schema.org/InStock",
  },
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
    { "@type": "ListItem", position: 2, name: "For Students", item: `${siteConfig.url}/for-students` },
  ],
};

export default function ForStudentsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageHero
        eyebrow="For Students"
        icon={GraduationCap}
        title="Professional Web Development at Student-Friendly Prices"
        description="Final year projects, hackathon apps, portfolio websites, and startup MVPs - built by a professional developer who understands student budgets and hard deadlines. Serving students in the UK, Canada, the US, and worldwide."
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/85">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-300" /> Free quote in 24 hours
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-300" /> Full source code ownership
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-300" /> UK · Canada · US · Worldwide
          </span>
        </div>
      </PageHero>

      {/* Services */}
      <section className="page-section" id="services">
        <div className="page-container">
          <SectionHeader
            label="What I Build for Students"
            title="From Idea to Working Product"
            description="Every service is priced with a student budget in mind. Tell me what you need and what you have to spend - I'll make it work."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, description, tags, badge }) => (
              <div
                key={title}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 h-full"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/15 transition-colors shrink-0">
                    <Icon className="w-5 h-5 text-blue-500" />
                  </div>
                  {badge && (
                    <Badge className="text-xs px-2 py-0.5 bg-cyan-400/10 text-cyan-600 dark:text-cyan-400 border-cyan-400/20">
                      {badge}
                    </Badge>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base leading-snug mb-2">{title}</h3>
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
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="Why Students Choose Me"
            title="Built Around Student Reality"
            description="Tight budgets, hard deadlines, and lecturers who will look at the code. I know the constraints - and I build around them."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyMe.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 mb-4">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="How It Works"
            title="Three Steps, No Surprises"
            description="From first message to working software - here's exactly what happens."
          />
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {steps.map(({ step, title, description }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-sm mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              Send Me Your Brief
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-muted-foreground mt-3">
              No commitment. Free quote back within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing note */}
      <section className="border-y border-border bg-blue-500/5">
        <div className="page-container py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 shrink-0 mt-0.5">
                <Wallet className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-semibold text-sm">Pricing is always budget-first</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Tell me your budget and deadline upfront. I'll tell you exactly what I can deliver for that number - no upsell, no surprises.
                  Portfolio sites typically start around <span className="font-medium text-foreground">$150</span>.
                  Final year project apps from <span className="font-medium text-foreground">$400</span>.
                  Hackathon MVPs from <span className="font-medium text-foreground">$200</span>.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 transition-colors shrink-0"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section bg-muted/20">
        <div className="page-container">
          <SectionHeader
            label="FAQ"
            title="Questions Students Ask"
            description="If yours isn't here, just message me."
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
      <section className="page-section">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-8 py-14 sm:px-12 text-white text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
            <div className="relative space-y-4 max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Student-friendly · Budget-first · No commitment to enquire
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Got a project in mind? Let&apos;s talk.
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Tell me what you&apos;re building, when it&apos;s due, and what budget you&apos;re working with.
                I&apos;ll reply within 24 hours with a clear, honest quote - no sales pitch, no hidden costs.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700 dark:hover:bg-white/90 dark:hover:text-blue-700 gap-2 font-semibold"
                  )}
                >
                  Contact for Pricing
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 dark:hover:text-white gap-2"
                  )}
                >
                  See My Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
