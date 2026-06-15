import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Smartphone, Zap, ShieldCheck,
  TrendingUp, Code2, Layers, Star, Clock, Globe, Sparkles,
} from "lucide-react";
import { SiReact, SiTypescript, SiNodedotjs } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { personNode, serviceRatingFields } from "@/lib/seo/schema";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/ui/section-header";
import { RelatedDeveloperPages } from "@/components/sections/RelatedDeveloperPages";

export const metadata: Metadata = {
  title: "Hire a React Native Developer - iOS & Android, One Codebase",
  description:
    "Hire a React Native developer with Expo. One TypeScript codebase for iOS and Android, EAS builds, push notifications, and App Store submission handled.",
  alternates: { canonical: `${siteConfig.url}/react-native-developer` },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteConfig.url}/react-native-developer`,
    siteName: siteConfig.name,
    title: "Hire a React Native Developer - iOS & Android | Smit Parekh",
    description:
      "React Native with Expo - one TypeScript codebase, two stores, 60% cost vs native. App Store submission handled. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/hire-react-native-developer.png`, width: 1200, height: 630, alt: "Hire a React Native Developer - Smit Parekh" }],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Hire a React Native Developer - iOS & Android | Smit Parekh",
    description: "React Native + Expo. iOS & Android from one codebase. App Store submission included. Free quote in 24 hours.",
    images: [{ url: `${siteConfig.url}/images/hire-react-native-developer.png`, width: 1200, height: 630 }],
  },
  keywords: [
    "hire React Native developer", "React Native developer for hire", "freelance React Native developer",
    "Expo developer", "iOS Android app developer", "cross-platform mobile developer",
    "React Native TypeScript developer", "React Native developer UK", "React Native developer Canada",
    "React Native developer USA", "Expo EAS developer", "mobile app developer for hire",
    "React Native Expo developer", "hire mobile app developer", "React Native freelancer",
    "iOS developer React Native", "Android developer React Native",
  ],
};

const results = [
  { value: "2", label: "Apps live on both App Store and Google Play from a single codebase", icon: Star },
  { value: "~60%", label: "Cost saving compared to building separate native iOS and Android apps", icon: TrendingUp },
  { value: "4.5★", label: "Average store rating on shipped React Native apps", icon: Smartphone },
  { value: "OTA", label: "Over-the-air updates shipped via EAS without app store review delays", icon: Zap },
];

const whatIBuild = [
  {
    icon: Smartphone,
    title: "Consumer Mobile Apps",
    description:
      "Onboarding flows, social feeds, real-time messaging, in-app purchases, and push notification campaigns - built with React Native and Expo Router for native feel on both iOS and Android without the native cost.",
    tags: ["React Native", "Expo Router", "Push Notifications", "IAP"],
  },
  {
    icon: Layers,
    title: "B2B & Internal Tools",
    description:
      "Field service apps, inventory management, approval workflows, and offline-first data entry. TypeScript strict, role-based access, and a data model that syncs when connectivity returns - not when it's convenient.",
    tags: ["Offline-first", "SQLite", "Role-based", "Sync"],
  },
  {
    icon: Code2,
    title: "React Native MVP",
    description:
      "Idea to App Store in 4-6 weeks. Auth, core flows, API integration, and EAS build + submission - the minimum that's actually shippable, not the minimum that's embarrassing.",
    tags: ["MVP", "Expo", "EAS Build", "App Store"],
  },
  {
    icon: Globe,
    title: "Web-to-Mobile Extensions",
    description:
      "You have a web app and you need a mobile companion. I share business logic, API clients, and validation schemas between your existing Next.js codebase and the React Native app - no duplicate code, no out-of-sync behaviour.",
    tags: ["Monorepo", "Shared Logic", "TanStack Query", "Zod"],
  },
  {
    icon: ShieldCheck,
    title: "Offline-First Architecture",
    description:
      "SQLite via Expo SQLite, MMKV for fast storage, Expo SecureStore for tokens, and an optimistic update layer so the UI never feels like it's waiting for the network. The app works on a plane, not just with 5G.",
    tags: ["SQLite", "MMKV", "SecureStore", "Optimistic UI"],
  },
  {
    icon: Sparkles,
    title: "App Store Submission & Review",
    description:
      "Apple Developer Program setup, provisioning profiles, Play Console listing, screenshots, privacy policy, metadata, and the review submission. I handle the paperwork - you approve the release.",
    tags: ["EAS Submit", "App Store", "Google Play", "Compliance"],
  },
];

const differentiators = [
  {
    icon: Code2,
    title: "TypeScript strict throughout",
    description:
      "No any, no implicit returns, no ignoring the compiler. Every component, hook, navigation param, and API response is fully typed. Catches bugs at compile time, not at 2am in production.",
  },
  {
    icon: Smartphone,
    title: "Platform-native feel, not web-in-a-shell",
    description:
      "React Native Gesture Handler for native gestures, platform-specific navigation patterns (stack on iOS, bottom tabs on Android), and haptic feedback via Expo Haptics. It feels like a real app because it is one.",
  },
  {
    icon: Zap,
    title: "EAS build pipeline from day one",
    description:
      "Expo EAS for OTA updates and store builds. CI on every commit, preview builds on PR, production release on tag. No manual Xcode archive ceremonies - just push to main.",
  },
  {
    icon: TrendingUp,
    title: "Full-stack context - app + API",
    description:
      "I build the API as well as the app. That means the API contracts get designed alongside the screens that consume them - no back-and-forth between a mobile dev and a backend dev who don't talk to each other.",
  },
];

const techStack = [
  { name: "React Native", Icon: SiReact },
  { name: "Expo SDK", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Expo Router", Icon: SiReact },
  { name: "Node.js API", Icon: SiNodedotjs },
  { name: "EAS Build", Icon: Smartphone },
];

const faqs = [
  {
    q: "React Native vs Flutter - which should I choose?",
    a: "React Native if your team knows JavaScript/TypeScript or you have a web product to share code with. Flutter if you need maximum rendering control (custom UI like games or highly animated apps) or if your team is Dart-native. For most business apps, React Native is the pragmatic choice - larger ecosystem, more hire market, and Expo makes the tooling excellent.",
  },
  {
    q: "How long does App Store review take?",
    a: "Typically 1-3 days for new submissions, often same-day for updates once the app has history. The most common rejection reasons are a missing privacy policy, vague app description, or a demo account that doesn't work for the reviewer. I prepare everything to avoid those.",
  },
  {
    q: "Can you add React Native to our existing web product?",
    a: "Yes - the most common pattern is a React Native app that talks to the same API as your web app. If your web product is built on Next.js or React, business logic, validation schemas, and API client code can be shared in a monorepo to eliminate duplication.",
  },
  {
    q: "What's an OTA update and why does it matter?",
    a: "Expo EAS lets you push JavaScript bundle updates to users' devices without going through app store review. Bug fixes, copy changes, and non-native feature additions ship in minutes instead of the usual 1-3 day review window. It's a meaningful operational advantage.",
  },
  {
    q: "How much does a React Native app cost?",
    a: "An MVP (auth + 3-5 core flows + EAS submission) starts at $6,000 and ships in 4-6 weeks. A full production app with 10+ screens, offline support, and real-time features starts at $15,000 and ships in 8-12 weeks. I work fixed-price with a written scope.",
  },
  {
    q: "Do you handle the back-end API as well?",
    a: "Yes. If you need an API built alongside the app, I can do both - see /services/backend-development or /services/api-development for what that covers. Bundling the two often saves time because the API contracts get designed alongside the screens that consume them.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "React Native Developer for Hire",
  provider: personNode(),
  serviceType: "React Native Mobile App Development",
  description: "Freelance React Native developer with Expo experience. One TypeScript codebase for iOS and Android, EAS build pipeline, push notifications, offline support, and App Store submission handled.",
  url: `${siteConfig.url}/react-native-developer`,
  offers: { "@type": "Offer", priceCurrency: "USD", description: "Fixed-price from $6,000 for MVP. Free quote within 24 hours.", availability: "https://schema.org/InStock" },
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
    { "@type": "ListItem", position: 2, name: "Hire a React Native Developer", item: `${siteConfig.url}/react-native-developer` },
  ],
};

export default function ReactNativeDeveloperPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <AuroraBackground as="section" className="min-h-[75vh] flex items-center pt-16 bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/30 dark:bg-none dark:bg-neutral-950">
        <div className="page-container py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-sm text-blue-700 dark:border-white/20 dark:bg-white/10 dark:text-white/90 backdrop-blur-sm">
                <Smartphone className="w-4 h-4" />
                React Native · Expo · iOS & Android · TypeScript
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white">
                iOS & Android Apps{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-cyan-300 dark:via-blue-300 dark:to-white bg-clip-text text-transparent">
                  Built Once, Shipped Twice
                </span>
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg dark:text-white/80">
                React Native with Expo - one TypeScript codebase for both stores, native feel on
                every device, and 60% of the cost of going fully native. App Store submission,
                OTA updates, and push notifications all handled.
              </p>

              <ul className="space-y-2.5">
                {[
                  "TypeScript strict - typed components, navigation, and API responses",
                  "EAS build pipeline - OTA updates without App Store review delays",
                  "Native feel - gestures, haptics, and platform-specific navigation patterns",
                  "App Store & Google Play submission handled end-to-end",
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
                  href="/services/mobile-app-development"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:bg-transparent dark:border-white/40 dark:text-white dark:hover:bg-white/10 gap-2")}
                >
                  Mobile App Services
                </Link>
              </div>

              <p className="text-xs text-neutral-400 dark:text-white/50">
                No commitment to enquire · Reply within 24 hours · UK, US, Canada & worldwide
              </p>
            </div>

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

      {/* What I build */}
      <section className="page-section">
        <div className="page-container">
          <SectionHeader
            label="React Native Expertise"
            title="What I Build With React Native"
            description="From consumer apps to internal tools - shipped to real stores with real users."
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
            title="React Native That Feels Native"
            description="The difference between a React Native app that impresses and one that doesn't comes down to a few decisions made in the first week."
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
            description="The questions every client asks - answered honestly."
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

      <RelatedDeveloperPages currentSlug="react-native-developer" />

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
                <span className="text-sm font-medium">Available for mobile app projects</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Ready to ship to the App Store and Google Play?
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Send your brief. I&apos;ll reply within 24 hours with a written proposal - scope, timeline, and price. One codebase, two stores, done right.
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
                  href="/services/mobile-app-development"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:border-white/40 dark:hover:bg-white/10 gap-2")}
                >
                  Mobile App Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
