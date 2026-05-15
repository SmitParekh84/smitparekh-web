// Service landing pages — data-driven catalog.
// Add a new entry here to ship a new /services/<slug> page.
// Keep copy long-form and unique per page; this is what ranks.

export type ServiceCategoryId = "development" | "marketing" | "products" | "specialized";

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceProofStat {
  value: string;
  label: string;
}

export interface ServicePricingTier {
  name: string;
  startingFrom: string;
  bestFor: string;
  bullets: string[];
  popular?: boolean;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceDeliverable {
  title: string;
  description: string;
  iconName:
    | "Code2"
    | "Server"
    | "Database"
    | "Cloud"
    | "Search"
    | "Smartphone"
    | "Layers"
    | "ShieldCheck"
    | "Zap"
    | "Sparkles"
    | "FileSearch"
    | "MapPin"
    | "Globe"
    | "Cpu"
    | "TrendingUp"
    | "Brain"
    | "Megaphone"
    | "Target"
    | "BarChart3"
    | "Webhook";
}

export interface ServicePage {
  slug: string;
  category: ServiceCategoryId;
  iconName: ServiceDeliverable["iconName"];
  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  // Hero
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  // Why-me lede shown beside the lead form
  lede: string;
  // Sections
  deliverables: ServiceDeliverable[];
  techStack: { label: string; items: string[] }[];
  process: ServiceProcessStep[];
  proof: ServiceProofStat[];
  pricing: ServicePricingTier[];
  faqs: ServiceFAQ[];
  related: string[]; // slugs
}

export const serviceCategories: { id: ServiceCategoryId; title: string; description: string }[] = [
  {
    id: "development",
    title: "Development",
    description: "Build, scale, and maintain production web apps",
  },
  {
    id: "marketing",
    title: "Marketing & SEO",
    description: "Rank higher, convert better, ship faster",
  },
  {
    id: "products",
    title: "Products",
    description: "Off-the-shelf hosted services you can plug in",
  },
  {
    id: "specialized",
    title: "Specialized",
    description: "AI integrations and bespoke engineering",
  },
];

// ============================================================
// SERVICE PAGES
// ============================================================

export const servicePages: ServicePage[] = [
  // ---------------------------------------------------------- DEVELOPMENT
  {
    slug: "web-development",
    category: "development",
    iconName: "Code2",
    metaTitle: "Web Development Services — Next.js, React, Node.js | Smit Parekh",
    metaDescription:
      "Production-grade web development services. Next.js & React frontends, Node.js APIs, PostgreSQL, AWS deploys, 95+ Lighthouse, SEO-first. From MVP to scale. Free quote in 24 hours.",
    keywords: [
      "web development services",
      "Next.js development services",
      "React development services",
      "freelance web developer",
      "custom web application development",
      "Node.js web development",
      "TypeScript web development",
      "full-stack web development",
      "MVP web development",
      "website development for business",
      "hire web developer",
    ],
    eyebrow: "Web Development",
    heroTitle: "Production web apps, end to end",
    heroDescription:
      "From the database schema to the deployed Next.js frontend, I ship modern web apps designed to rank, convert, and scale. One engineer, full ownership.",
    lede: "Most agencies hand off between 3–5 vendors. I cover the full stack — database, API, frontend, SEO, and deploy — so nothing falls between the cracks. 4+ years shipping production traffic for FinTech, SaaS, and enterprise teams.",
    deliverables: [
      {
        iconName: "Code2",
        title: "Modern Next.js or React frontend",
        description:
          "Server Components, App Router, TypeScript strict, Tailwind, Framer Motion. Pixel-perfect, accessible, and fast — 95+ Lighthouse on real production data, not synthetic demos.",
      },
      {
        iconName: "Server",
        title: "Node.js APIs that scale",
        description:
          "Express or NestJS with typed routes, JWT auth, validation, rate limiting, OpenAPI docs, and structured logs. Built to take 10K+ requests a day at 99.9% uptime.",
      },
      {
        iconName: "Database",
        title: "PostgreSQL or MongoDB",
        description:
          "Schema-first design with proper indexing, migrations, and Row-Level Security in Supabase or Prisma. Queries that stay sub-100ms as the table grows.",
      },
      {
        iconName: "Cloud",
        title: "AWS, Vercel, or Supabase deploy",
        description:
          "CI/CD on GitHub Actions, zero-downtime deploys, preview environments per PR, automated rollback, and edge caching. The boring stuff that matters.",
      },
      {
        iconName: "Search",
        title: "SEO baked in from day one",
        description:
          "Server-rendered metadata, JSON-LD structured data, automatic sitemap, OG images, and Core Web Vitals tuned to pass on real-world devices.",
      },
      {
        iconName: "ShieldCheck",
        title: "Tested and documented",
        description:
          "Integration tests for every critical path, OWASP-aware security review, and a written handover doc. You don't get locked into me — you can hand the codebase to anyone.",
      },
    ],
    techStack: [
      { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind", "shadcn/ui"] },
      { label: "Backend", items: ["Node.js", "NestJS", "Express", "Zod", "Prisma"] },
      { label: "Database", items: ["PostgreSQL", "Supabase", "MongoDB", "Redis"] },
      { label: "Cloud", items: ["Vercel", "AWS", "Docker", "GitHub Actions"] },
    ],
    process: [
      {
        title: "Discovery call",
        description:
          "30-minute call to understand your goals, users, and constraints. You leave with a written scope and ballpark estimate within 24 hours.",
      },
      {
        title: "Architecture & plan",
        description:
          "Data model, API contracts, page tree, and a milestone-by-milestone delivery plan — all written down before code is written.",
      },
      {
        title: "Iterative build",
        description:
          "Weekly demos, deployed previews per PR, and Loom walkthroughs at every milestone. You see real progress, never a black box.",
      },
      {
        title: "Launch & handover",
        description:
          "Final QA, Lighthouse audit, security review, and a documented codebase you fully own. 30-day post-launch support included.",
      },
    ],
    proof: [
      { value: "4+", label: "Years shipping production web apps" },
      { value: "95+", label: "Lighthouse on real data, not demos" },
      { value: "10K+", label: "Daily API requests handled" },
      { value: "99.9%", label: "Uptime across deployed projects" },
    ],
    pricing: [
      {
        name: "MVP",
        startingFrom: "$3,500",
        bestFor: "Founders shipping their first build",
        bullets: [
          "1 frontend + 1 API + 1 database",
          "Auth, payments, and 3–5 core flows",
          "Deployed to Vercel/Supabase",
          "Delivered in 2–4 weeks",
        ],
      },
      {
        name: "Production",
        startingFrom: "$8,000",
        popular: true,
        bestFor: "Teams scaling past 100 users",
        bullets: [
          "Multi-tenant, role-based access",
          "10+ flows, admin dashboard",
          "Tests, CI/CD, monitoring",
          "Delivered in 4–8 weeks",
        ],
      },
      {
        name: "Retainer",
        startingFrom: "$2,500/mo",
        bestFor: "Ongoing product evolution",
        bullets: [
          "Reserved hours each month",
          "New features, fixes, optimisations",
          "Async standups + weekly review",
          "Cancel any time",
        ],
      },
    ],
    faqs: [
      {
        q: "What's the typical timeline for a web app?",
        a: "An MVP with 3–5 flows usually lands in 2–4 weeks. A production app with auth, payments, and an admin dashboard takes 4–8 weeks. Larger or multi-tenant builds are scoped per milestone.",
      },
      {
        q: "Do you work with existing codebases?",
        a: "Yes. I regularly take over legacy React or Next.js codebases, write a code-quality audit, and incrementally migrate to TypeScript strict, modern patterns, and a tested stack.",
      },
      {
        q: "Who owns the code?",
        a: "You do, completely. Code is committed to your GitHub org, and there's no licensing or lock-in. Full handover documentation is part of every engagement.",
      },
      {
        q: "Do you handle deployment and CI/CD?",
        a: "Yes — Vercel, AWS, Supabase, or your existing infra. Every project ships with GitHub Actions CI, preview environments per PR, and a documented production deploy.",
      },
      {
        q: "Can you also handle SEO?",
        a: "Yes, technical SEO is baked into the build — server-rendered metadata, JSON-LD, sitemap, OG images, Core Web Vitals. For deeper content/keyword work, see /services/seo.",
      },
    ],
    related: ["frontend-development", "backend-development", "api-development", "technical-seo"],
  },

  // ---------------------------------------------------------------- FRONTEND
  {
    slug: "frontend-development",
    category: "development",
    iconName: "Layers",
    metaTitle: "Frontend Development Services — React & Next.js Specialists | Smit Parekh",
    metaDescription:
      "Frontend development for React and Next.js — accessible, animated, 95+ Lighthouse, TypeScript strict, design-system driven. From single landing pages to multi-tenant dashboards.",
    keywords: [
      "frontend development services",
      "React development",
      "Next.js development",
      "frontend developer for hire",
      "Tailwind CSS development",
      "design system development",
      "frontend performance optimization",
      "accessible frontend development",
      "shadcn UI developer",
      "Framer Motion developer",
    ],
    eyebrow: "Frontend Development",
    heroTitle: "Frontends that look great and stay fast",
    heroDescription:
      "Production-grade React and Next.js frontends with a focus on accessibility, performance, and design systems. Built to scale across teams and devices.",
    lede: "I build frontends that don't just look polished on launch day — they stay fast and maintainable as the team and feature set grow. TypeScript strict, design tokens, and a tested component library are the defaults, not extras.",
    deliverables: [
      {
        iconName: "Code2",
        title: "Component library & design system",
        description:
          "shadcn/ui base, design tokens in CSS variables, dark mode, theming, and Storybook-ready components. New screens get built in days, not weeks.",
      },
      {
        iconName: "Zap",
        title: "Performance budget enforced in CI",
        description:
          "Lighthouse runs on every PR. Bundle size, LCP, CLS, and INP have hard ceilings. Regressions get caught before they ship to production.",
      },
      {
        iconName: "ShieldCheck",
        title: "Accessibility & keyboard support",
        description:
          "WCAG 2.1 AA targets, semantic markup, ARIA only where it earns its keep, full keyboard nav. Tested with screen readers, not just axe.",
      },
      {
        iconName: "Sparkles",
        title: "Motion & micro-interactions",
        description:
          "Framer Motion v12 with reduced-motion respect. Page transitions, scroll-driven animations, and shared layout — the difference between 'a website' and 'a product'.",
      },
      {
        iconName: "Globe",
        title: "Internationalisation ready",
        description:
          "next-intl or i18next wiring with locale routing, RTL support, and translation keys lifted out of components. Add a new language in an afternoon.",
      },
      {
        iconName: "Layers",
        title: "State management without the chaos",
        description:
          "TanStack Query for server state, Zustand or context for UI state. No Redux ceremony unless you actually need it. Predictable, testable, debuggable.",
      },
    ],
    techStack: [
      { label: "Frameworks", items: ["Next.js", "React", "Astro", "Remix"] },
      { label: "Styling", items: ["Tailwind v4", "CSS variables", "shadcn/ui", "Radix"] },
      { label: "State", items: ["TanStack Query", "Zustand", "Context", "React Hook Form"] },
      { label: "Quality", items: ["TypeScript strict", "Vitest", "Playwright", "Lighthouse CI"] },
    ],
    process: [
      { title: "Design audit", description: "Review Figma, brand, and existing UI. Spot patterns, gaps, and reusable primitives before writing code." },
      { title: "Tokens & primitives", description: "Set up design tokens, base components, and the layout system. Everything downstream is a recombination of these." },
      { title: "Page-by-page build", description: "Ship one page at a time with deployed previews. Stakeholders click real screens, not static mocks." },
      { title: "Polish & ship", description: "Animations, edge cases, accessibility passes, and a Lighthouse audit. Then production." },
    ],
    proof: [
      { value: "40%", label: "Average bundle size reduction on takeovers" },
      { value: "100", label: "Lighthouse accessibility score targeted" },
      { value: "<1.5s", label: "LCP on 4G targeted for landing pages" },
      { value: "30+", label: "Production frontends shipped" },
    ],
    pricing: [
      {
        name: "Landing / Marketing",
        startingFrom: "$1,500",
        bestFor: "Marketing teams shipping a new launch",
        bullets: ["Single-page or short multi-page site", "Animations, SEO, analytics", "Delivered in 5–10 days"],
      },
      {
        name: "Product UI",
        startingFrom: "$4,500",
        popular: true,
        bestFor: "Teams building or rebuilding their app frontend",
        bullets: ["Full component library", "10+ screens, dashboard UX", "Design system + Storybook", "Delivered in 3–6 weeks"],
      },
      {
        name: "Retainer",
        startingFrom: "$2,000/mo",
        bestFor: "Ongoing frontend evolution",
        bullets: ["Reserved frontend hours", "Design system stewardship", "Performance regression watch"],
      },
    ],
    faqs: [
      { q: "Do you work from Figma?", a: "Yes — that's the default. I also work from existing UI screenshots, hand-drawn wireframes, or written briefs when there's no design yet." },
      { q: "Can you join an existing frontend team?", a: "Yes. I regularly slot into existing React/Next.js codebases, follow the team's conventions, and PR like any other engineer." },
      { q: "How do you handle animations without hurting performance?", a: "GPU-accelerated transforms only, IntersectionObserver-driven entry animations, and a hard rule of skipping motion when prefers-reduced-motion is set. Animations should add polish, not jank." },
      { q: "Do you handle email templates and OG images?", a: "Yes. Email templates with MJML or React Email, and dynamic OG images via @vercel/og or Cloudinary on-the-fly." },
    ],
    related: ["web-development", "backend-development", "api-development", "ecommerce-development"],
  },

  // ---------------------------------------------------------------- BACKEND
  {
    slug: "backend-development",
    category: "development",
    iconName: "Server",
    metaTitle: "Backend Development Services — Node.js, NestJS, PostgreSQL | Smit Parekh",
    metaDescription:
      "Backend development services for production traffic. Node.js, NestJS, PostgreSQL, Redis, AWS. Typed APIs, 99.9% uptime, sub-100ms p95, OpenAPI docs. Free architecture review in 24 hours.",
    keywords: [
      "backend development services",
      "Node.js backend developer",
      "NestJS development",
      "Express API development",
      "PostgreSQL backend",
      "TypeScript backend",
      "scalable backend development",
      "backend architecture services",
      "freelance backend developer",
      "microservices development",
    ],
    eyebrow: "Backend Development",
    heroTitle: "Backends built for real production traffic",
    heroDescription:
      "Typed Node.js and NestJS APIs with PostgreSQL or MongoDB, Redis caching, structured logs, and the boring discipline that keeps p95 latency under 100ms.",
    lede: "Most backends are fine on launch day. The question is what happens in month 6 — when traffic is 10× higher, the team has tripled, and the original developer has left. That's the backend I build.",
    deliverables: [
      {
        iconName: "Server",
        title: "Typed REST and GraphQL APIs",
        description:
          "End-to-end TypeScript with Zod or class-validator at the boundary, OpenAPI docs, and consistent error handling. Every route is a contract you can lean on.",
      },
      {
        iconName: "Database",
        title: "PostgreSQL & MongoDB done right",
        description:
          "Schema design, indexing strategy, migrations, RLS for multi-tenancy, soft deletes, audit logs. Queries that stay sub-100ms past 1M rows.",
      },
      {
        iconName: "Zap",
        title: "Caching & rate limiting",
        description:
          "Redis for hot data and rate limits, ETags for conditional requests, response compression, connection pooling. Throughput up, infra cost down.",
      },
      {
        iconName: "ShieldCheck",
        title: "Auth, authz, and security",
        description:
          "JWT access + refresh, OAuth, RBAC, API keys, session rotation, OWASP-aware input handling. Done once, done right, audited.",
      },
      {
        iconName: "Webhook",
        title: "Webhooks & background jobs",
        description:
          "Reliable delivery with retry + DLQ, idempotent handlers, BullMQ or Cloud Tasks for async work, cron jobs that you can actually monitor.",
      },
      {
        iconName: "Cloud",
        title: "Observability built in",
        description:
          "Structured logs, request IDs end to end, OpenTelemetry traces, error tracking, and SLO dashboards. You see problems before users do.",
      },
    ],
    techStack: [
      { label: "Frameworks", items: ["NestJS", "Express", "Fastify", "tRPC"] },
      { label: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"] },
      { label: "Infra", items: ["AWS", "Docker", "GitHub Actions", "Cloudflare"] },
      { label: "Quality", items: ["Zod", "Jest", "Supertest", "OpenAPI"] },
    ],
    process: [
      { title: "Architecture review", description: "Map the data model, identify hot paths, surface scale risks. Output: a written architecture doc you can share with stakeholders." },
      { title: "Build & test", description: "TDD-friendly module structure, contract tests against the OpenAPI schema, integration tests against a real DB — not mocks." },
      { title: "Load & harden", description: "k6 load tests at projected scale, fix the slowest endpoints first, add caching where it actually moves the needle." },
      { title: "Ship & monitor", description: "Blue/green or canary deploys, dashboards for p95 latency and error rate, on-call runbook for the team." },
    ],
    proof: [
      { value: "<100ms", label: "p95 latency target on production APIs" },
      { value: "10K+", label: "Daily API requests handled at 99.9% uptime" },
      { value: "65%", label: "Average query speedup on optimisations" },
      { value: "0", label: "Plaintext passwords ever stored" },
    ],
    pricing: [
      {
        name: "API Build",
        startingFrom: "$3,000",
        bestFor: "New product backends",
        bullets: ["5–15 endpoints", "Auth, validation, OpenAPI docs", "Deployed to AWS or Render", "Delivered in 2–4 weeks"],
      },
      {
        name: "Scale",
        startingFrom: "$7,500",
        popular: true,
        bestFor: "Teams hitting scale or rewriting",
        bullets: ["Multi-tenant, RBAC, audit logs", "Redis caching + rate limiting", "Load tested at projected scale", "Observability + runbooks"],
      },
      {
        name: "Retainer",
        startingFrom: "$2,500/mo",
        bestFor: "Ongoing backend work",
        bullets: ["New endpoints, schema evolution", "Performance regression watch", "On-call rotation support"],
      },
    ],
    faqs: [
      { q: "Do you work with NestJS specifically, or general Node?", a: "Both. NestJS is my default for anything past a basic CRUD because of dependency injection and guards/interceptors. Express or Fastify when minimalism matters more." },
      { q: "Can you take over a struggling backend?", a: "Yes — I do this often. The first deliverable is a written audit covering perf hotspots, security risks, and a prioritised remediation plan before any code is touched." },
      { q: "Do you handle background jobs and queues?", a: "Yes. BullMQ with Redis, Cloud Tasks, or AWS SQS — picked based on your infra. Always idempotent handlers and a dead-letter strategy." },
      { q: "What about migrations and zero-downtime deploys?", a: "Migrations are versioned with Prisma or knex/squitch, applied in a separate step from app deploy. Schema changes use expand-then-contract so writes never break." },
    ],
    related: ["api-development", "web-development", "saas-development", "ai-integration"],
  },

  // ---------------------------------------------------------------- API
  {
    slug: "api-development",
    category: "development",
    iconName: "Webhook",
    metaTitle: "API Development Services — REST, GraphQL, Webhooks | Smit Parekh",
    metaDescription:
      "API development services. REST and GraphQL APIs with JWT auth, rate limiting, OpenAPI docs, webhooks, and SDKs. Built to be consumed by partners and customers, not just your own frontend.",
    keywords: [
      "API development services",
      "REST API development",
      "GraphQL API development",
      "webhook API development",
      "API integration services",
      "OpenAPI Swagger developer",
      "JWT auth API developer",
      "rate limiting API",
      "public API design",
      "third-party API integration",
    ],
    eyebrow: "API Development",
    heroTitle: "APIs your partners actually enjoy using",
    heroDescription:
      "Well-versioned, well-documented REST or GraphQL APIs with auth, rate limiting, and webhooks. Built to be consumed by partners and customers — not only your own frontend.",
    lede: "A public API is a contract. I treat it that way — versioned cleanly, documented from day one, monitored, and designed so that the SDK practically writes itself.",
    deliverables: [
      { iconName: "Webhook", title: "REST or GraphQL — picked for you", description: "Not religion. REST for resource-shaped data and CDN cacheability. GraphQL when clients need flexible shapes and there's a real schema team." },
      { iconName: "FileSearch", title: "OpenAPI / GraphQL schema", description: "Generated docs that stay accurate. Type-safe clients for TypeScript, Python, Go via openapi-typescript or codegen. Postman collection on request." },
      { iconName: "ShieldCheck", title: "Auth that scales beyond your frontend", description: "API keys with rotation, OAuth 2.0 with PKCE, JWT with refresh, mTLS for partner integrations. Scoped permissions per token." },
      { iconName: "Zap", title: "Rate limiting + quotas", description: "Per-key, per-IP, per-endpoint limits with Redis. Quota dashboards your customers can self-serve. Burst tolerance + 429 with Retry-After done right." },
      { iconName: "Webhook", title: "Webhooks with retry & signing", description: "HMAC-signed payloads, exponential backoff with jitter, dead-letter for failures, replay endpoint, idempotency keys on inbound." },
      { iconName: "BarChart3", title: "Usage analytics & SLOs", description: "Per-customer usage dashboards, p95/p99 latency tracking, error budget alerting. Sales can see who's hitting their limits." },
    ],
    techStack: [
      { label: "REST", items: ["NestJS", "Fastify", "OpenAPI", "Zod"] },
      { label: "GraphQL", items: ["Apollo Server", "Pothos", "DataLoader", "Mercurius"] },
      { label: "Auth", items: ["JWT", "OAuth 2.0", "Supabase Auth", "Auth0"] },
      { label: "Infra", items: ["Redis", "Kong / Tyk", "Cloudflare", "AWS API Gateway"] },
    ],
    process: [
      { title: "Design first", description: "Endpoints, resources, errors, pagination, versioning strategy — all written in OpenAPI before code." },
      { title: "Reference implementation", description: "Build a thin slice end-to-end: auth, one resource, full docs, one SDK. Validates the design with a real consumer." },
      { title: "Build the surface", description: "Fan out the rest of the endpoints. Contract tests against the schema run on every PR." },
      { title: "Launch & monitor", description: "Public docs site, sandbox keys, status page, and webhook test tool — the things partners actually expect." },
    ],
    proof: [
      { value: "30+", label: "Production APIs shipped" },
      { value: "<50ms", label: "p95 on cached endpoints" },
      { value: "99.9%", label: "Uptime across deployed APIs" },
      { value: "100%", label: "Routes documented in OpenAPI" },
    ],
    pricing: [
      {
        name: "Internal API",
        startingFrom: "$3,000",
        bestFor: "Backend for your own frontend",
        bullets: ["10–20 endpoints", "JWT auth, OpenAPI docs", "Tests, CI, deploy"],
      },
      {
        name: "Public API",
        startingFrom: "$8,500",
        popular: true,
        bestFor: "APIs your customers consume",
        bullets: ["API keys, quotas, rate limiting", "Webhooks + SDK", "Public docs site + sandbox", "Status page + monitoring"],
      },
      {
        name: "Retainer",
        startingFrom: "$2,500/mo",
        bestFor: "Long-term API evolution",
        bullets: ["New endpoints, deprecations", "SDK maintenance", "On-call coverage"],
      },
    ],
    faqs: [
      { q: "REST or GraphQL?", a: "REST for partner-facing APIs (CDN-cacheable, simple integration). GraphQL when clients need to compose responses and there's a schema team. I'll recommend based on your actual consumers, not preference." },
      { q: "Do you build SDKs?", a: "Yes. TypeScript first, then Python, Go, and Ruby on request. Generated from OpenAPI so they stay in sync with the API." },
      { q: "How do you version an API?", a: "URL path versioning (/v1, /v2) with a documented deprecation window — typically 12 months — and a changelog endpoint for clients to subscribe to." },
      { q: "What about API gateway and edge?", a: "Kong, Tyk, or AWS API Gateway depending on your infra. Cloudflare Workers for edge auth and rate limiting where it makes sense." },
    ],
    related: ["backend-development", "web-development", "saas-development", "ai-integration"],
  },

  // ---------------------------------------------------------------- SAAS
  {
    slug: "saas-development",
    category: "development",
    iconName: "Layers",
    metaTitle: "SaaS Development Services — Multi-Tenant Apps, Stripe Billing | Smit Parekh",
    metaDescription:
      "SaaS development services — multi-tenant Next.js apps with Stripe billing, Supabase auth, RBAC, admin dashboards, and onboarding. From idea to paying customers.",
    keywords: [
      "SaaS development services",
      "SaaS developer for hire",
      "multi-tenant SaaS development",
      "Stripe billing integration",
      "B2B SaaS development",
      "Next.js SaaS",
      "Supabase SaaS",
      "MVP SaaS development",
      "subscription SaaS development",
      "white-label SaaS",
    ],
    eyebrow: "SaaS Development",
    heroTitle: "Multi-tenant SaaS, billing on day one",
    heroDescription:
      "End-to-end SaaS builds with Stripe billing, multi-tenant auth, role-based access, onboarding flows, and admin dashboards — built to take real paying customers.",
    lede: "Most SaaS MVPs ship without billing, without admin tools, without invite flows. They look great on launch and break on first paying customer. I build with billing, tenancy, and ops from day one — because that's what survives contact with users.",
    deliverables: [
      { iconName: "Layers", title: "Multi-tenant from the data model up", description: "Workspace/team scoping in Postgres with RLS, no leaky queries, audit log on every cross-tenant boundary, invite + role management." },
      { iconName: "Webhook", title: "Stripe billing wired correctly", description: "Subscriptions, metered usage, proration, trials, cancellations, dunning. Webhook handlers are idempotent and signed. No silent revenue leaks." },
      { iconName: "ShieldCheck", title: "Auth & RBAC", description: "Supabase Auth or Auth0 with SSO, MFA, magic link, OAuth. Role-based access with permissions checked on the server, not the client." },
      { iconName: "Sparkles", title: "Onboarding that converts", description: "First-run wizard, sample data, checklist, contextual tooltips, and Intercom-style empty states. Activation is a feature, not a hope." },
      { iconName: "BarChart3", title: "Admin & support tools", description: "Internal admin to impersonate users, refund payments, view tenant health, and replay events. The tools your support team will need on day 2." },
      { iconName: "Megaphone", title: "Marketing site + product on one domain", description: "/, /pricing, /docs marketing pages sharing a design system with the product. Logged-in/out states handled cleanly." },
    ],
    techStack: [
      { label: "App", items: ["Next.js", "React", "TypeScript", "Tailwind"] },
      { label: "Backend", items: ["Supabase", "PostgreSQL", "NestJS", "Prisma"] },
      { label: "Billing", items: ["Stripe", "Paddle", "Lemonsqueezy"] },
      { label: "Ops", items: ["Resend", "PostHog", "Sentry", "Cloudflare"] },
    ],
    process: [
      { title: "Pricing & tiers", description: "Pricing model, feature gating, and metering decisions before writing code. Wrong tiers = wrong product." },
      { title: "Core flows", description: "Signup, invite, billing, cancel, upgrade, downgrade. Boring flows that drive 80% of revenue." },
      { title: "Product features", description: "Whatever your app actually does — built tenant-aware from day one." },
      { title: "Launch & iterate", description: "Closed beta with 5–10 design partners, instrument with PostHog, ship to public." },
    ],
    proof: [
      { value: "8+", label: "SaaS products shipped to paying users" },
      { value: "Stripe", label: "Default billing — webhooks signed, idempotent" },
      { value: "<5s", label: "Signup to first 'aha' moment targeted" },
      { value: "0", label: "Cross-tenant data leaks (RLS enforced)" },
    ],
    pricing: [
      { name: "MVP", startingFrom: "$6,500", bestFor: "Founders validating with paying users", bullets: ["Signup, billing, 3–5 core flows", "Single-tier pricing", "Delivered in 3–5 weeks"] },
      { name: "Production", startingFrom: "$14,000", popular: true, bestFor: "Teams scaling past 100 paying customers", bullets: ["Multi-tenant + invite + RBAC", "Tiered pricing, metering, dunning", "Admin + support tools", "Delivered in 6–10 weeks"] },
      { name: "Retainer", startingFrom: "$3,500/mo", bestFor: "Ongoing product growth", bullets: ["Reserved engineering hours", "Feature flags + experiment infra", "On-call coverage"] },
    ],
    faqs: [
      { q: "Stripe or Paddle?", a: "Stripe by default for control and ecosystem. Paddle when you want a Merchant of Record (handles VAT/sales tax globally). I'll recommend based on where your customers are." },
      { q: "How do you handle tenancy?", a: "Shared schema with tenant_id on every row, Postgres RLS for hard isolation. Schema-per-tenant only when there's a regulatory reason." },
      { q: "Can you migrate me off no-code (Bubble, Webflow)?", a: "Yes — common path. I keep your data model intact, recreate flows in Next.js, and migrate data with a one-time import script." },
      { q: "Do you handle SOC2 prep?", a: "I can wire the technical controls (audit log, MFA, access reviews, encryption) and recommend a vendor (Vanta, Drata) for the policy/evidence side." },
    ],
    related: ["web-development", "backend-development", "api-development", "ecommerce-development"],
  },

  // ---------------------------------------------------------------- ECOMMERCE
  {
    slug: "ecommerce-development",
    category: "development",
    iconName: "Globe",
    metaTitle: "E-commerce Development Services — Headless Shopify, Next.js | Smit Parekh",
    metaDescription:
      "Headless e-commerce builds on Next.js with Shopify, Stripe, or custom backends. Sub-second product pages, SEO-first catalog, and conversion-tuned checkout. Free audit in 24 hours.",
    keywords: [
      "ecommerce development services",
      "headless Shopify developer",
      "Next.js ecommerce",
      "custom ecommerce development",
      "Stripe checkout integration",
      "ecommerce SEO development",
      "B2B ecommerce development",
      "ecommerce performance optimization",
      "Shopify Hydrogen developer",
      "ecommerce migration services",
    ],
    eyebrow: "E-commerce Development",
    heroTitle: "Storefronts that load fast and convert hard",
    heroDescription:
      "Headless Shopify or custom commerce on Next.js — sub-second product pages, SEO-tuned catalog, and a checkout designed around the data, not the template.",
    lede: "On Shopify Liquid you compete on theme polish. Going headless flips it: you compete on speed, SEO, and merchandising precision. That's where Next.js plus a commerce backend wins.",
    deliverables: [
      { iconName: "Zap", title: "Sub-second product pages", description: "ISR + Cloudflare cache, image optimisation, code-splitting per route. Real-world LCP under 1.5s on mid-range phones." },
      { iconName: "Search", title: "SEO-first catalog & PLPs", description: "Server-rendered product / collection pages with Product schema, breadcrumbs, faceted URLs, and canonical handling for variants." },
      { iconName: "Globe", title: "Headless Shopify, BigCommerce, or custom", description: "Storefront API, Hydrogen, or a custom Postgres+Stripe backend — picked on your catalog size, complexity, and team." },
      { iconName: "ShieldCheck", title: "Conversion-tuned checkout", description: "Stripe Checkout, Shop Pay, or Bolt — A/B-ready, mobile-first, address autocomplete, abandoned-cart recovery hooks." },
      { iconName: "BarChart3", title: "Analytics & merchandising", description: "GA4 + server-side events via Stape, Klaviyo / Mailchimp wiring, Algolia / Meilisearch for instant search and merchandising rules." },
      { iconName: "Webhook", title: "Inventory, fulfilment & subscriptions", description: "Webhook handlers for orders, fulfilment, and refunds. Recharge / Stripe Subscriptions wired correctly with proration." },
    ],
    techStack: [
      { label: "Storefront", items: ["Next.js", "Hydrogen", "React", "Tailwind"] },
      { label: "Commerce", items: ["Shopify", "BigCommerce", "Stripe", "Medusa"] },
      { label: "Search", items: ["Algolia", "Meilisearch", "Typesense"] },
      { label: "Growth", items: ["Klaviyo", "Stape", "GA4", "PostHog"] },
    ],
    process: [
      { title: "Catalog & migration plan", description: "Audit current catalog, redirects, and analytics. Plan the migration so SEO equity transfers cleanly." },
      { title: "Headless foundation", description: "Storefront API + Next.js scaffolding, product/PLP/PDP shells, Stripe / Shop Pay wiring." },
      { title: "Merchandising & polish", description: "Faceted search, collection rules, badges, related products, abandoned-cart hooks." },
      { title: "Launch with redirects", description: "Old → new URL map, monitored for 30 days post-launch. SEO rankings preserved, not sacrificed." },
    ],
    proof: [
      { value: "<1.5s", label: "LCP on mid-range phones targeted" },
      { value: "+18%", label: "Typical conversion uplift on PDP redesigns" },
      { value: "100%", label: "Old URLs redirected on migration" },
      { value: "GA4 + GTM", label: "Server-side ready" },
    ],
    pricing: [
      { name: "Headless Storefront", startingFrom: "$5,500", bestFor: "Shopify stores under 500 SKUs", bullets: ["Headless Next.js + Shopify Storefront API", "Product, collection, cart, checkout", "GA4 + Klaviyo wired"] },
      { name: "Commerce Platform", startingFrom: "$15,000", popular: true, bestFor: "Mid-market merchants & B2B", bullets: ["Custom backend or Medusa", "Multi-currency, multi-region", "B2B portal + quote workflows"] },
      { name: "Retainer", startingFrom: "$3,000/mo", bestFor: "Ongoing CRO + merchandising", bullets: ["Experiment infra", "PDP/PLP iterations", "Performance regression watch"] },
    ],
    faqs: [
      { q: "Why headless instead of Shopify themes?", a: "Speed, SEO, and merchandising flexibility. You also unblock the marketing team from theme constraints. The tradeoff is more engineering — worth it for ambitious brands, not for $5k starter stores." },
      { q: "What about Shopify checkout?", a: "You keep Shopify checkout (PCI / Shop Pay benefits) or move to Stripe Checkout when you go fully custom. Both wired with abandoned-cart hooks." },
      { q: "Can you migrate without losing SEO?", a: "Yes. Old URL inventory, a 1:1 redirect map, server-rendered metadata identical to or better than the old site, and a 30-day rank-watch post-launch." },
      { q: "Do you support multi-region pricing & tax?", a: "Yes. Stripe Tax, Shopify Markets, or a custom currency/region matrix depending on your stack." },
    ],
    related: ["web-development", "frontend-development", "seo", "technical-seo"],
  },

  // ---------------------------------------------------------------- SEO
  {
    slug: "seo",
    category: "marketing",
    iconName: "Search",
    metaTitle: "SEO Services — Developer-Led SEO for SaaS & B2B | Smit Parekh",
    metaDescription:
      "SEO services that combine on-page, technical, and content work. Built by a developer who knows Core Web Vitals, schema, and how Next.js really renders. Free SEO audit in 24 hours.",
    keywords: [
      "SEO services",
      "SEO consultant",
      "developer SEO services",
      "SaaS SEO services",
      "B2B SEO services",
      "Next.js SEO services",
      "content SEO services",
      "on-page SEO",
      "freelance SEO consultant",
      "SEO for startups",
    ],
    eyebrow: "SEO Services",
    heroTitle: "SEO done by someone who ships the code",
    heroDescription:
      "On-page, technical, and content SEO — combined into one engagement, run by a developer who can actually fix the rendering bugs your audit will surface.",
    lede: "Most SEO agencies hand you a 90-page audit and a 'send this to your dev team' email. I am the dev team. I audit it, fix it, write the content, and ship the schema — without a three-way handoff that loses 60% of the velocity.",
    deliverables: [
      { iconName: "FileSearch", title: "Full technical & content audit", description: "Crawlability, indexation, Core Web Vitals, schema, internal links, content gaps, keyword cannibalisation, backlink profile. One doc, prioritised by impact." },
      { iconName: "Sparkles", title: "On-page SEO across the site", description: "Title, meta, H1, schema (Article, Product, FAQ, Breadcrumb, Organization), OG images, canonicals, hreflang. Templated so new pages inherit it." },
      { iconName: "Zap", title: "Core Web Vitals fixes", description: "Real-user LCP, INP, CLS work. Image optimisation, code splitting, hydration cost reduction, render-blocking removal. Pass on real-world data, not Lighthouse-only." },
      { iconName: "TrendingUp", title: "Content briefs & writing", description: "Keyword research, search-intent mapping, content briefs with target SERP features, and 1500–2500-word articles written by me — not GPT-spam." },
      { iconName: "Megaphone", title: "Internal link strategy", description: "Topic clusters, hub-and-spoke link maps, contextual links wired into the CMS or rendered pages. Your highest-authority pages funnel correctly." },
      { iconName: "BarChart3", title: "Search Console + GA4 wiring", description: "GSC verified, GA4 events for scroll/conversion, monthly reporting dashboards (Looker Studio) so you can see what's actually moving." },
    ],
    techStack: [
      { label: "Audit", items: ["Screaming Frog", "Ahrefs", "Search Console", "PageSpeed Insights"] },
      { label: "Implementation", items: ["Next.js metadata API", "JSON-LD", "next-sitemap", "Cloudinary OG"] },
      { label: "Content", items: ["Ahrefs", "ContentHarmony", "SurferSEO", "Originality.ai"] },
      { label: "Reporting", items: ["Looker Studio", "GA4", "Search Console", "PostHog"] },
    ],
    process: [
      { title: "Audit (week 1)", description: "Full crawl, content inventory, Core Web Vitals report. Output: prioritised punch-list with effort/impact estimates." },
      { title: "Quick wins (weeks 2–3)", description: "Schema, metadata templates, broken links, redirect cleanup, lazy-loading bugs. The fastest paths to ranking change." },
      { title: "Content engine (weeks 4+)", description: "2–4 articles per month + internal link work. Briefs match real SERP intent, not just keyword volume." },
      { title: "Iterate on data", description: "Monthly review of ranking, CTR, conversions. Cut what doesn't work, double down on what does." },
    ],
    proof: [
      { value: "+120%", label: "Median organic traffic uplift in 6 months" },
      { value: "95+", label: "Core Web Vitals score targeted on key URLs" },
      { value: "100%", label: "Pages with valid structured data after audit" },
      { value: "0", label: "Black-hat tactics, ever" },
    ],
    pricing: [
      { name: "Audit", startingFrom: "$750", bestFor: "One-time deep audit + plan", bullets: ["Full technical + content audit", "Prioritised action plan", "60-min review call"] },
      { name: "SEO Sprint", startingFrom: "$3,500", popular: true, bestFor: "6-week intensive", bullets: ["Audit + all quick-win fixes shipped", "Schema + metadata templates", "8 content briefs delivered"] },
      { name: "Retainer", startingFrom: "$1,800/mo", bestFor: "Ongoing SEO growth", bullets: ["2–4 articles + internal linking", "Technical regression watch", "Monthly Looker Studio report"] },
    ],
    faqs: [
      { q: "How long until I see ranking change?", a: "Technical fixes can move things in 2–4 weeks. Content-driven ranking on competitive terms takes 3–6 months. I'll be honest about which keywords are realistic and which aren't, in writing, before we start." },
      { q: "Do you use AI to write content?", a: "I use AI for keyword research and outline drafts. The final article is written or heavily edited by me — Google's helpful-content update has tanked sites that publish raw GPT output, and I won't put your domain in that bucket." },
      { q: "Will you guarantee a #1 ranking?", a: "No. Anyone who does is lying. I will guarantee the technical fixes are correct, the content is genuinely better than what currently ranks, and the work is measurable in GSC." },
      { q: "Do you work with my existing CMS?", a: "Yes — WordPress, Webflow, Shopify, Sanity, Contentful, custom Next.js. Schema and metadata are templated into whatever CMS you use." },
    ],
    related: ["technical-seo", "local-seo", "seo-audit", "web-development"],
  },

  // ---------------------------------------------------------------- TECHNICAL SEO
  {
    slug: "technical-seo",
    category: "marketing",
    iconName: "FileSearch",
    metaTitle: "Technical SEO Services — Core Web Vitals, Schema, Next.js | Smit Parekh",
    metaDescription:
      "Technical SEO services for Next.js, React, and headless sites. Core Web Vitals, structured data, indexation, rendering audits. Fixes shipped, not just recommended.",
    keywords: [
      "technical SEO services",
      "Core Web Vitals optimization",
      "JavaScript SEO",
      "Next.js technical SEO",
      "schema markup services",
      "structured data services",
      "indexation issues",
      "JS rendering SEO",
      "site speed SEO",
      "technical SEO audit",
    ],
    eyebrow: "Technical SEO",
    heroTitle: "Technical SEO, fixed not just flagged",
    heroDescription:
      "Core Web Vitals, schema, indexation, and JavaScript-rendering work — by someone who reads the Next.js source, not just the SEO tool report.",
    lede: "Technical SEO is where most SaaS sites bleed traffic silently — orphan pages, client-rendered metadata, broken canonicals, schema typos. I find them in a day and ship the fixes the same week.",
    deliverables: [
      { iconName: "FileSearch", title: "Crawlability & indexation audit", description: "Robots, sitemaps, canonical chains, hreflang, parameter URLs, soft-404s, duplicate content. Coverage report cleaned to green." },
      { iconName: "Zap", title: "Core Web Vitals on real users", description: "LCP, INP, CLS attacked on real-user data from CrUX, not synthetic Lighthouse. Hydration cost, image strategy, render-blocking, font loading." },
      { iconName: "Sparkles", title: "Structured data — Article, FAQ, Product, Organization, Breadcrumb", description: "JSON-LD templated and validated. Rich-result eligibility for every page type that qualifies." },
      { iconName: "Layers", title: "JavaScript rendering audit", description: "Server-rendered vs client-rendered diff, prerender for SPA-only frameworks, dynamic imports without losing SEO. Googlebot sees what users see." },
      { iconName: "Webhook", title: "Server response & infra", description: "Server-Timing headers, edge-cache strategy, 5xx rates, TTFB. SEO starts at the response, not the page." },
      { iconName: "BarChart3", title: "Monitoring after the fix", description: "GSC + CrUX dashboards, regression alerts in CI (Lighthouse-CI), uptime monitoring. The fix stays fixed." },
    ],
    techStack: [
      { label: "Audit", items: ["Screaming Frog", "Sitebulb", "GSC", "Lighthouse CI"] },
      { label: "Schema", items: ["JSON-LD", "schema.org validator", "Rich Results test"] },
      { label: "Performance", items: ["next/image", "PartyTown", "Critters", "WebPageTest"] },
      { label: "Monitoring", items: ["CrUX", "PageSpeed Insights API", "Cloudflare", "PostHog"] },
    ],
    process: [
      { title: "Crawl + baseline", description: "Full Screaming Frog crawl, CrUX baseline, GSC export. Output: a one-page severity-ranked list." },
      { title: "Quick wins", description: "Schema, metadata, canonicals, sitemap — the things Google reads first. Shipped in week 1." },
      { title: "Performance & rendering", description: "LCP, INP, hydration. Where most of the long-tail traffic actually unlocks." },
      { title: "Monitor & alert", description: "Lighthouse CI in your GitHub Actions, CrUX-based weekly snapshots, monthly review." },
    ],
    proof: [
      { value: "<2.5s", label: "Real-user LCP target on key URLs" },
      { value: "100%", label: "Templated schema across the site" },
      { value: "+45%", label: "Median crawl-budget improvement after audit" },
      { value: "Lighthouse CI", label: "Wired into your PR pipeline" },
    ],
    pricing: [
      { name: "Audit Only", startingFrom: "$650", bestFor: "Diagnosis + plan", bullets: ["Crawl + CrUX + schema audit", "Severity-ranked action list", "60-min review call"] },
      { name: "Audit + Fix", startingFrom: "$2,800", popular: true, bestFor: "Diagnosis + implementation", bullets: ["Audit + all quick-win fixes shipped", "Schema templates implemented", "Lighthouse CI configured"] },
      { name: "Retainer", startingFrom: "$1,200/mo", bestFor: "Ongoing technical SEO", bullets: ["Monthly crawl + regression watch", "New-page schema review", "Performance budget enforcement"] },
    ],
    faqs: [
      { q: "We're on Next.js — is it really an SEO risk?", a: "Next.js is excellent for SEO if you use it right. App Router + Server Components are SEO-friendly by default. The bugs creep in around 'use client' boundaries, lazy-loaded metadata, and dynamic OG images. That's the audit job." },
      { q: "What about React SPA / Vite?", a: "SPA-only frameworks get a prerender layer (Vercel prerender, Prerender.io) or a documented migration plan to Next.js / Astro. Both work; pick based on team capacity." },
      { q: "How long until rankings move after a technical fix?", a: "Recrawl + reindex usually takes 2–6 weeks. CWV changes propagate to ranking signals over 28-day rolling windows. Schema typically shows in results within days." },
      { q: "Do you fix the bugs or just write the report?", a: "I fix them. The report is just to explain what's being fixed. Implementation is the deliverable." },
    ],
    related: ["seo", "local-seo", "seo-audit", "web-development"],
  },

  // ---------------------------------------------------------------- LOCAL SEO
  {
    slug: "local-seo",
    category: "marketing",
    iconName: "MapPin",
    metaTitle: "Local SEO Services — Google Business Profile, Citations, Reviews | Smit Parekh",
    metaDescription:
      "Local SEO services for service businesses and multi-location brands. Google Business Profile optimisation, citations, reviews, local schema, location pages that actually rank.",
    keywords: [
      "local SEO services",
      "Google Business Profile optimization",
      "GBP optimization",
      "citation building",
      "local SEO consultant",
      "multi-location SEO",
      "near-me SEO",
      "local schema markup",
      "review management",
      "local SEO for service business",
    ],
    eyebrow: "Local SEO",
    heroTitle: "Show up in the Map Pack — for the right searches",
    heroDescription:
      "Google Business Profile optimisation, citations, reviews, local schema, and location-page architecture for service businesses and multi-location brands.",
    lede: "If you're a service business or a brand with locations, organic SEO matters less than ranking in the Map Pack. Different rules apply — proximity, prominence, relevance — and a lot of generic SEO advice actively hurts you. I do this work specifically.",
    deliverables: [
      { iconName: "MapPin", title: "Google Business Profile, fully optimised", description: "Categories, attributes, services, products, descriptions, photos, posts. Q&A seeded with real questions. UTM-tracked website link." },
      { iconName: "FileSearch", title: "NAP consistency & citations", description: "Audit + cleanup of name/address/phone across 50+ directories. Yelp, BBB, Apple Maps, Bing Places, industry-specific (Avvo, Houzz, Healthgrades, etc.)." },
      { iconName: "TrendingUp", title: "Review acquisition pipeline", description: "Review-request emails or SMS post-service, single-link landing page, response templates for both 5-star and 1-star reviews." },
      { iconName: "Sparkles", title: "Local schema markup", description: "LocalBusiness, Service, FAQ, Review, AggregateRating schema per location. ServiceArea correctly defined for SAB businesses." },
      { iconName: "Layers", title: "Location pages that don't get penalised", description: "Unique, useful per-location pages — not doorway pages. Real photos, real staff, real reviews. Built to survive Helpful Content updates." },
      { iconName: "BarChart3", title: "Map Pack rank tracking", description: "Geo-grid rank tracking for your priority keywords across the service area. Monthly delta on top 20 terms." },
    ],
    techStack: [
      { label: "Tools", items: ["GBP", "Local Falcon", "BrightLocal", "Whitespark"] },
      { label: "Schema", items: ["LocalBusiness", "Service", "FAQ", "Review"] },
      { label: "Reviews", items: ["Google", "Yelp", "Trustpilot", "Industry-specific"] },
      { label: "Reporting", items: ["GBP Insights", "Looker Studio", "GA4", "Call tracking"] },
    ],
    process: [
      { title: "Local audit", description: "GBP, citations, reviews, location-page architecture, competitor map-pack analysis." },
      { title: "GBP + citations", description: "Optimise GBP completely, fix citation inconsistencies, build missing high-authority ones." },
      { title: "Reviews + content", description: "Review pipeline live, per-location pages refreshed, local schema deployed." },
      { title: "Track & iterate", description: "Geo-grid scans monthly, GBP posts weekly, review responses within 24h." },
    ],
    proof: [
      { value: "Top 3", label: "Map Pack ranking targeted on primary keyword + city" },
      { value: "+90%", label: "Median review volume increase in 90 days" },
      { value: "100%", label: "NAP consistency across top 30 directories" },
      { value: "Geo-grid", label: "Monthly tracking included" },
    ],
    pricing: [
      { name: "Local Audit", startingFrom: "$500", bestFor: "Single-location businesses", bullets: ["GBP + citation + review audit", "Geo-grid baseline", "Action plan"] },
      { name: "Local SEO Sprint", startingFrom: "$2,200", popular: true, bestFor: "Single-location optimisation", bullets: ["Full GBP optimisation", "Citation cleanup + 20 new", "Review pipeline live", "Local schema deployed"] },
      { name: "Multi-location Retainer", startingFrom: "$1,400/mo", bestFor: "Brands with 2+ locations", bullets: ["Per-location GBP management", "Monthly geo-grid scan", "Review response service"] },
    ],
    faqs: [
      { q: "I don't have a physical address — can I still do local SEO?", a: "Yes, if you're a Service Area Business (plumber, electrician, mobile mechanic, etc.). You hide the address in GBP and define service areas instead. Same rules, slightly different setup." },
      { q: "How many citations do I actually need?", a: "Quality over quantity. 30–50 high-authority + industry-specific citations beats 500 generic directory listings. The big-3 (Google, Apple Maps, Bing) are non-negotiable." },
      { q: "How do you handle negative reviews?", a: "Templated empathy + action response within 24 hours, escalation flag for legitimate issues, flag-for-removal request when reviews violate Google's policies (fake, off-topic, conflict of interest)." },
      { q: "Will you guarantee Map Pack #1?", a: "No. Map Pack ranking depends on proximity, which I can't control. I can guarantee your GBP, citations, reviews, and on-site signals are at the top of your category — that's what we control." },
    ],
    related: ["seo", "technical-seo", "seo-audit", "web-development"],
  },

  // ---------------------------------------------------------------- SEO AUDIT
  {
    slug: "seo-audit",
    category: "marketing",
    iconName: "FileSearch",
    metaTitle: "SEO Audit Services — Full Technical & Content Audit | Smit Parekh",
    metaDescription:
      "Comprehensive SEO audits — technical, on-page, content, and backlink. Severity-ranked action plan with effort and impact estimates. Delivered in 5 business days.",
    keywords: [
      "SEO audit services",
      "website SEO audit",
      "technical SEO audit",
      "content SEO audit",
      "Next.js SEO audit",
      "SaaS SEO audit",
      "ecommerce SEO audit",
      "SEO consultant audit",
      "professional SEO audit",
      "SEO audit report",
    ],
    eyebrow: "SEO Audit",
    heroTitle: "An SEO audit you can actually act on",
    heroDescription:
      "Technical, on-page, content, and backlink — one report, severity-ranked, with effort and impact estimates on every recommendation. Delivered in 5 business days.",
    lede: "Most audits are a 90-page PDF with no prioritisation. Mine is severity-ranked, paired with code-level instructions, and ends with a 60-minute walkthrough call so your team actually knows what to do on Monday.",
    deliverables: [
      { iconName: "FileSearch", title: "Crawl-based technical audit", description: "Screaming Frog + Sitebulb full crawl. Indexation, canonicals, redirects, broken links, hreflang, parameter URLs, soft-404s. Every issue counted." },
      { iconName: "Zap", title: "Core Web Vitals on real users", description: "CrUX baseline for LCP, INP, CLS across top URLs. Root-cause analysis, not just 'optimise images'." },
      { iconName: "Sparkles", title: "Structured data & on-page", description: "Schema audit across page types, title/meta/H1 patterns, internal link map, keyword cannibalisation report." },
      { iconName: "TrendingUp", title: "Content & keyword gap", description: "Top 20 pages by impressions vs. clicks, decaying content list, keyword gap vs. 3 competitors, content briefs for top 5 opportunities." },
      { iconName: "Layers", title: "Backlink profile", description: "Authority, anchor distribution, toxic-link flags, link velocity, disavow recommendations if warranted." },
      { iconName: "BarChart3", title: "Action plan with effort/impact", description: "Every finding gets a severity, an effort estimate, and an expected impact. Prioritised so you ship the right thing first." },
    ],
    techStack: [
      { label: "Crawling", items: ["Screaming Frog", "Sitebulb", "Ahrefs", "Lumar"] },
      { label: "Performance", items: ["CrUX", "PageSpeed Insights API", "Lighthouse CI"] },
      { label: "On-page", items: ["GSC", "Ahrefs", "ContentHarmony"] },
      { label: "Reporting", items: ["Looker Studio", "Notion", "Loom walkthrough"] },
    ],
    process: [
      { title: "Kickoff (day 1)", description: "Goals, priority pages, current rank-tracking access. 30-min call." },
      { title: "Crawl + analysis (days 2–4)", description: "Full crawl, GSC export, CrUX baseline, backlink pull, competitive analysis." },
      { title: "Report (day 5)", description: "Severity-ranked action plan delivered as Notion doc + Loom walkthrough." },
      { title: "Review call (day 5–7)", description: "60-min walkthrough with your team. Quotes for implementation are optional and separate." },
    ],
    proof: [
      { value: "5 days", label: "From kickoff to delivered report" },
      { value: "100+", label: "Audits delivered to date" },
      { value: "Notion + Loom", label: "Format your team will actually open" },
      { value: "60 min", label: "Live walkthrough call included" },
    ],
    pricing: [
      { name: "Mini Audit", startingFrom: "$350", bestFor: "Single-issue diagnostic", bullets: ["1 problem area (e.g. CWV)", "Written report + 30-min call", "Delivered in 3 days"] },
      { name: "Full Audit", startingFrom: "$900", popular: true, bestFor: "Most teams", bullets: ["Technical + on-page + content + backlinks", "Severity-ranked plan with effort/impact", "60-min Loom + live walkthrough"] },
      { name: "Enterprise Audit", startingFrom: "$3,500", bestFor: "Sites over 10K URLs", bullets: ["Multi-section deep dive", "Per-section workshops", "Custom Looker Studio dashboard"] },
    ],
    faqs: [
      { q: "Can you also implement the fixes?", a: "Yes — that's offered as a separate engagement (see /services/seo and /services/technical-seo). I will quote it after the audit so you can decide based on the actual findings." },
      { q: "Do I need to give you GSC access?", a: "Highly recommended. GSC data dramatically improves the content + opportunity sections. Read-only access is fine." },
      { q: "Will you audit a site that isn't live yet?", a: "Yes — pre-launch audits cover information architecture, URL strategy, metadata templates, schema plan, and a CWV-aware tech-stack review." },
      { q: "How is this different from a free SEO audit tool?", a: "Tools give you 200 issues with no prioritisation. The audit ranks issues by traffic impact, ties them to specific pages, and includes the implementation instructions — not just 'add alt text'." },
    ],
    related: ["seo", "technical-seo", "local-seo", "web-development"],
  },

  // ---------------------------------------------------------------- AI INTEGRATION
  {
    slug: "ai-integration",
    category: "specialized",
    iconName: "Brain",
    metaTitle: "AI Integration Services — OpenAI, Claude, RAG, LLM in Production | Smit Parekh",
    metaDescription:
      "AI integration services for SaaS and web apps. OpenAI, Claude, Llama, RAG, vector search, evals. Built to be reliable in production, not just demo-able.",
    keywords: [
      "AI integration services",
      "LLM integration",
      "OpenAI integration",
      "Claude integration",
      "RAG developer",
      "vector search developer",
      "AI app development",
      "ChatGPT API integration",
      "AI for SaaS",
      "LLM in production",
    ],
    eyebrow: "AI Integration",
    heroTitle: "LLMs in production, not just demos",
    heroDescription:
      "OpenAI, Anthropic Claude, and open-source LLMs wired into your app with RAG, structured outputs, evals, and the discipline that keeps it cheap and reliable at scale.",
    lede: "A demo with GPT-4 takes an afternoon. An LLM feature that doesn't hallucinate on edge cases, doesn't leak prompts, costs less than your hosting bill, and doesn't break when the model is deprecated — that's a real engineering project. That's the project I take.",
    deliverables: [
      { iconName: "Brain", title: "Model selection that fits the job", description: "GPT-4o, Claude Sonnet, Haiku, Llama 3.1, Mistral — picked on cost, latency, and the actual task. Often Haiku or Llama 70B in production with GPT-4 reserved for retries." },
      { iconName: "FileSearch", title: "RAG done right", description: "Chunking strategy, embedding model selection, reranking, hybrid (BM25 + vector) search. Pinecone, pgvector, or Weaviate — picked by data size and ops capacity." },
      { iconName: "Sparkles", title: "Structured outputs & function calling", description: "Tool use, JSON schema enforcement, OpenAI structured outputs, Claude tool_use. No more 'parse the markdown the LLM hopefully returned'." },
      { iconName: "ShieldCheck", title: "Prompt injection & safety", description: "Input sanitisation, output filtering, rate limiting per user, abuse detection. Your LLM endpoint isn't a back door to your prod database." },
      { iconName: "BarChart3", title: "Evals & regression testing", description: "Golden dataset, automated eval suite, A/B between models on every PR. You upgrade the model only when the evals say it's safe." },
      { iconName: "Zap", title: "Streaming + token cost optimisation", description: "Server-Sent Events for token-by-token streaming, prompt caching, context-window discipline. Bills that don't surprise you." },
    ],
    techStack: [
      { label: "Models", items: ["GPT-4o", "Claude 3.5", "Llama 3.1", "Mistral"] },
      { label: "RAG", items: ["pgvector", "Pinecone", "Weaviate", "Cohere Rerank"] },
      { label: "Orchestration", items: ["LangChain", "LlamaIndex", "Vercel AI SDK", "Inngest"] },
      { label: "Quality", items: ["Promptfoo", "LangSmith", "Braintrust", "Helicone"] },
    ],
    process: [
      { title: "Feature scoping", description: "Where does the LLM actually help vs hurt? Some 'AI features' should not exist. We answer that first." },
      { title: "Prototype + eval set", description: "Working prototype + a golden dataset to measure quality. You can compare models objectively from day one." },
      { title: "Productionise", description: "Streaming, retries, fallback model, cost budget, observability — the boring stuff that makes the demo a product." },
      { title: "Ship + monitor", description: "Cost dashboards, eval dashboards, prompt versioning. New model? Re-run evals, deploy if green." },
    ],
    proof: [
      { value: "60%", label: "Average token cost reduction via model switching + caching" },
      { value: "Promptfoo", label: "Automated evals on every PR" },
      { value: "<1s", label: "TTFT (time to first token) targeted on streamed responses" },
      { value: "0", label: "Prompts leaked in production endpoints" },
    ],
    pricing: [
      { name: "Prototype", startingFrom: "$2,500", bestFor: "Validating one AI feature", bullets: ["Single feature, single model", "Golden dataset + basic eval", "Delivered in 1–2 weeks"] },
      { name: "Production AI", startingFrom: "$8,500", popular: true, bestFor: "Shipping AI to real users", bullets: ["RAG + structured outputs", "Streaming, retries, fallback model", "Cost + eval dashboards"] },
      { name: "Retainer", startingFrom: "$3,000/mo", bestFor: "Ongoing LLM evolution", bullets: ["Model migrations + evals", "Prompt iteration", "Cost watch + optimisation"] },
    ],
    faqs: [
      { q: "OpenAI or Anthropic?", a: "Depends on the task. Claude is currently stronger at long-context reasoning and tool use; GPT-4o at multimodal and tight latency. I'll benchmark both on your golden dataset." },
      { q: "Can you build a ChatGPT for our docs?", a: "Yes — that's a classic RAG project. Embedding pipeline + vector store + grounded retrieval + citations in the UI so users know where answers come from." },
      { q: "How do you control costs?", a: "Smaller model by default, GPT-4 / Claude Opus only on retry. Prompt caching, response caching where safe, streaming so you bail early. Monthly budget alerts." },
      { q: "What about open-source / self-hosted LLMs?", a: "Yes — Llama 3.1, Mistral, Qwen via Together AI, Groq, or self-hosted on AWS. Right when privacy, cost, or compliance demands it. Often slower to integrate than OpenAI/Anthropic, so we measure tradeoffs honestly." },
    ],
    related: ["api-development", "backend-development", "web-development", "saas-development"],
  },

  // ---------------------------------------------------------------- MVP DEVELOPMENT
  {
    slug: "mvp-development",
    category: "development",
    iconName: "Zap",
    metaTitle: "MVP Development Service — Idea to Live Product in 4–8 Weeks | Smit Parekh",
    metaDescription:
      "Investor-ready MVPs built in 4–8 weeks. Full-stack Next.js + Node.js, auth, payments, admin dashboard. Fixed price, no scope creep. Free 24-hour quote.",
    keywords: [
      "MVP development service",
      "minimum viable product development",
      "build an MVP",
      "startup MVP developer",
      "MVP web app development",
      "SaaS MVP development",
      "rapid prototyping service",
      "freelance MVP developer",
      "hire MVP developer",
      "investor-ready MVP",
      "launch MVP fast",
      "startup product development",
    ],
    eyebrow: "MVP Development",
    heroTitle: "From idea to live product in 4–8 weeks",
    heroDescription:
      "Investor-ready MVPs built with the right stack, the right scope, and a fixed price. Ship fast, validate with real users, and raise with confidence.",
    lede: "Most MVPs fail because they're either over-engineered (takes 6 months, costs $50K) or under-engineered (can't scale past 100 users). I've shipped 20+ MVPs and know exactly where to cut scope without cutting quality — auth, payments, core flows, and a deploy that doesn't embarrass you in a demo.",
    deliverables: [
      {
        iconName: "Code2",
        title: "Full-stack app with core user flows",
        description:
          "Next.js frontend + Node.js API + PostgreSQL database. Typesafe end-to-end, mobile-responsive from day one, and fast enough to impress investors without a loader spinner.",
      },
      {
        iconName: "ShieldCheck",
        title: "Authentication & role-based access",
        description:
          "Email/password, Google OAuth, or magic links via Supabase Auth or Clerk. User roles and permission guards included — you don't have to bolt them on post-launch.",
      },
      {
        iconName: "Webhook",
        title: "Payments wired up",
        description:
          "Stripe Checkout, subscriptions, and webhooks. Pricing page, trial logic, and a billing portal so users can manage themselves. PCI-compliant from the start.",
      },
      {
        iconName: "Layers",
        title: "Admin dashboard",
        description:
          "Internal dashboard to manage users, view signups, toggle flags, and handle support tasks — without needing direct DB access. Saves hours every week from day one.",
      },
      {
        iconName: "Cloud",
        title: "Production deploy + CI/CD",
        description:
          "Vercel + Supabase (or Railway) with preview environments per branch and a GitHub Actions pipeline. You get a real URL for your pitch deck, not a localhost screenshot.",
      },
      {
        iconName: "FileSearch",
        title: "Handover documentation",
        description:
          "Architecture overview, environment setup guide, and a Loom walkthrough of the codebase. Any developer you hire next can be productive in hours, not weeks.",
      },
    ],
    techStack: [
      { label: "Frontend", items: ["Next.js 14+", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
      { label: "Backend", items: ["Node.js", "Express / Hono", "Zod", "Prisma ORM"] },
      { label: "Database & Auth", items: ["PostgreSQL", "Supabase", "Clerk", "Redis"] },
      { label: "Payments & Deploy", items: ["Stripe", "Vercel", "Railway", "GitHub Actions"] },
    ],
    process: [
      {
        title: "Scope session (Day 1)",
        description:
          "30-minute call to map the core user journey. We cut anything that doesn't prove the value prop. You get a written scope and fixed quote within 24 hours.",
      },
      {
        title: "Schema & wireframes (Week 1)",
        description:
          "Data model, API contracts, and page-level wireframes. Every decision written down before code starts. No re-architecture surprises mid-build.",
      },
      {
        title: "Iterative build (Weeks 2–6)",
        description:
          "Weekly deployed previews. Loom walkthroughs at each milestone. Feedback in the PR — nothing waits for a big reveal at the end.",
      },
      {
        title: "Launch & handover (Week 7–8)",
        description:
          "Final QA, Lighthouse audit, production deploy, and codebase walkthrough. 30 days of post-launch bug fixes included.",
      },
    ],
    proof: [
      { value: "20+", label: "MVPs shipped to real users" },
      { value: "4–8 wks", label: "Average time from kickoff to live" },
      { value: "Fixed", label: "Price — no scope creep surprises" },
      { value: "30 days", label: "Post-launch bug-fix support" },
    ],
    pricing: [
      {
        name: "Lean MVP",
        startingFrom: "$3,500",
        bestFor: "Validate a single core loop",
        bullets: [
          "1 user type, 3–5 core screens",
          "Auth + 1 payment flow",
          "Deployed to Vercel / Supabase",
          "Delivered in 2–3 weeks",
        ],
      },
      {
        name: "Full MVP",
        startingFrom: "$7,500",
        popular: true,
        bestFor: "Investor-ready, demo-able product",
        bullets: [
          "2 user types (e.g. user + admin)",
          "Auth, payments, dashboard, onboarding",
          "5–10 core flows, mobile responsive",
          "Delivered in 4–6 weeks",
        ],
      },
      {
        name: "Post-launch Retainer",
        startingFrom: "$2,000/mo",
        bestFor: "Iterate after first users",
        bullets: [
          "Dedicated hours for new features",
          "Bug fixes + performance work",
          "Weekly async standups",
          "Cancel any time",
        ],
      },
    ],
    faqs: [
      {
        q: "How is an MVP different from a full product?",
        a: "An MVP has exactly one core user journey — the thing that proves your value. Everything else (settings, reports, integrations, secondary flows) is cut. I help you decide what that core is, and we build only that. You can always add more after validation.",
      },
      {
        q: "Can we add features after the MVP ships?",
        a: "Yes — most clients continue on a monthly retainer after launch to iterate based on real user feedback. The codebase is structured for extension from the start.",
      },
      {
        q: "What if requirements change mid-build?",
        a: "Small changes are absorbed. Significant scope changes (new entities, new flows) are scoped separately and quoted. Nothing gets added silently — every change is a written decision.",
      },
      {
        q: "Do you help with the product itself, or just the code?",
        a: "Both. Part of the discovery call is questioning the scope. If a feature adds complexity without adding proof, I'll flag it. Some of the best decisions I've made for clients were cuts, not additions.",
      },
      {
        q: "Will the MVP be able to scale when I get users?",
        a: "Yes. I use PostgreSQL with proper indexes, a stateless API, and a Vercel/Railway deploy that autoscales. The architecture handles 10K+ daily active users without a rewrite.",
      },
    ],
    related: ["web-development", "saas-development", "api-development", "frontend-development"],
  },

  // ---------------------------------------------------------------- NEXT.JS DEVELOPMENT
  {
    slug: "nextjs-development",
    category: "development",
    iconName: "Globe",
    metaTitle: "Next.js Development Service — App Router, RSC, Vercel | Smit Parekh",
    metaDescription:
      "Next.js 14+ development service. App Router, React Server Components, TypeScript, Tailwind, SEO-first builds. 95+ Lighthouse, fast deploys, full-stack or frontend-only.",
    keywords: [
      "Next.js development service",
      "hire Next.js developer",
      "Next.js App Router developer",
      "Next.js 14 development",
      "React Server Components developer",
      "Next.js full-stack developer",
      "Next.js frontend developer",
      "Vercel deployment service",
      "Next.js SEO development",
      "Next.js TypeScript developer",
    ],
    eyebrow: "Next.js Development",
    heroTitle: "Next.js 14+ built the way the framework was meant to be used",
    heroDescription:
      "App Router, React Server Components, TypeScript strict, Tailwind, and a 95+ Lighthouse score on real data. Frontend-only or full-stack — I'll fit your team.",
    lede: "I've shipped 15+ Next.js apps since the App Router launched and know exactly where its strengths are (server-first data fetching, ISR, edge middleware) and where teams burn hours needlessly. No config archaeology, no client-side waterfalls, no layout shift.",
    deliverables: [
      {
        iconName: "Code2",
        title: "App Router with server-first data fetching",
        description:
          "Layouts, loading states, error boundaries, route groups, and parallel routes done correctly. Zero client-side waterfalls — data arrives before paint.",
      },
      {
        iconName: "Search",
        title: "SEO built into the framework",
        description:
          "generateMetadata per page, JSON-LD schema, dynamic OG images, sitemap.xml, robots.txt, and canonical URLs. No plugin layer — native Next.js APIs only.",
      },
      {
        iconName: "Zap",
        title: "95+ Lighthouse on production traffic",
        description:
          "Image optimization with next/image and blur placeholders, font subsetting with next/font, code splitting, and Largest Contentful Paint consistently under 2.5 seconds.",
      },
      {
        iconName: "Layers",
        title: "Component architecture that scales",
        description:
          "Shared UI primitives, design-token-based Tailwind setup, server vs client boundary strategy documented. Your next hire can contribute from day one.",
      },
      {
        iconName: "Cloud",
        title: "Vercel + GitHub Actions CI",
        description:
          "Preview environments on every PR, production deploys on merge, edge caching for static routes, and error alerting wired up before you touch a real user.",
      },
      {
        iconName: "ShieldCheck",
        title: "TypeScript strict mode throughout",
        description:
          "No implicit any, no type assertions, no ts-ignore. Every component, hook, API route, and server action is typed end-to-end including environment variables.",
      },
    ],
    techStack: [
      { label: "Framework", items: ["Next.js 14+", "React 19", "TypeScript 5", "Turbopack"] },
      { label: "Styling", items: ["Tailwind CSS v4", "shadcn/ui", "Framer Motion", "CSS Modules"] },
      { label: "Data", items: ["TanStack Query", "Prisma", "Supabase", "tRPC"] },
      { label: "Deploy", items: ["Vercel", "Edge Middleware", "ISR", "GitHub Actions"] },
    ],
    process: [
      {
        title: "Architecture review",
        description:
          "Which pages are static, dynamic, or ISR? Where do server vs client components split? Data-fetching strategy defined before a component is written.",
      },
      {
        title: "Design-to-code",
        description:
          "Figma or wireframes converted to reusable components with Tailwind tokens, responsive breakpoints, and accessibility built in.",
      },
      {
        title: "Integration & testing",
        description:
          "API routes, auth, third-party SDKs, and a Playwright smoke suite on the critical paths. Lighthouse CI gating on every PR.",
      },
      {
        title: "Deploy & handover",
        description:
          "Production Vercel config, team access, environment variables documented, codebase walkthrough, and 30 days of post-launch support.",
      },
    ],
    proof: [
      { value: "15+", label: "Next.js apps shipped with App Router" },
      { value: "95+", label: "Lighthouse on production, not labs" },
      { value: "<2.5s", label: "LCP on all delivered projects" },
      { value: "0", label: "Client-side waterfalls shipped to production" },
    ],
    pricing: [
      {
        name: "Frontend only",
        startingFrom: "$2,500",
        bestFor: "Designs or migrations to Next.js",
        bullets: [
          "App Router + TypeScript + Tailwind",
          "SEO metadata + Lighthouse audit",
          "Vercel deploy + preview environments",
          "Delivered in 1–3 weeks",
        ],
      },
      {
        name: "Full-stack Next.js",
        startingFrom: "$6,000",
        popular: true,
        bestFor: "Complete app or product build",
        bullets: [
          "App Router + API routes or separate Node.js API",
          "Auth, DB, edge caching, CI/CD",
          "95+ Lighthouse + FAQPage / JSON-LD schema",
          "Delivered in 3–6 weeks",
        ],
      },
      {
        name: "Migration",
        startingFrom: "$4,000",
        bestFor: "Pages Router or CRA → App Router",
        bullets: [
          "Component-by-component migration plan",
          "Zero downtime, branch-per-feature",
          "Performance before/after report",
          "Timeline depends on app size",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I use the App Router or Pages Router?",
        a: "App Router for all new projects — it's where Next.js investment is going. If you're on Pages Router and your app works, migrating just to migrate isn't worth it unless you're hitting specific limitations (ISR granularity, layouts, streaming). I'll tell you honestly.",
      },
      {
        q: "Can you migrate our existing React / CRA app to Next.js?",
        a: "Yes. I do this by building the Next.js shell alongside the existing app and migrating route-by-route. No big-bang rewrites. Each route is tested and deployed before the next one is touched.",
      },
      {
        q: "Do you work frontend-only, or full-stack?",
        a: "Both. I can build the Next.js frontend and integrate it against your existing API, or I can build the API too. Whichever fits your team.",
      },
      {
        q: "How do you hit 95+ Lighthouse consistently?",
        a: "Image lazy loading and correct sizing with next/image, font subsetting with next/font, server-side rendering so there's no JS blocking the first paint, and zero render-blocking third-party scripts. I measure on real devices, not the Lighthouse desktop emulator.",
      },
    ],
    related: ["web-development", "frontend-development", "react-development", "performance-optimization"],
  },

  // ---------------------------------------------------------------- REACT DEVELOPMENT
  {
    slug: "react-development",
    category: "development",
    iconName: "Layers",
    metaTitle: "React Development Service — SPAs, Dashboards, Component Libraries | Smit Parekh",
    metaDescription:
      "React development service for SPAs, admin dashboards, design systems, and component libraries. TypeScript, TanStack Query, Vite, Tailwind. Senior-only work.",
    keywords: [
      "React development service",
      "hire React developer",
      "React SPA development",
      "React dashboard development",
      "React component library development",
      "React TypeScript developer",
      "custom React application",
      "React TanStack Query developer",
      "senior React developer for hire",
      "React design system development",
      "React Vite development",
    ],
    eyebrow: "React Development",
    heroTitle: "React apps that ship fast and stay maintainable",
    heroDescription:
      "SPAs, data-heavy dashboards, and component libraries in React with TypeScript, TanStack Query, and a component architecture your team can extend without fear.",
    lede: "Most React codebases become unmaintainable within 12 months — not because React is bad, but because prop drilling, inconsistent state patterns, and no component boundaries. I've refactored enough of these to know what to build right the first time: clear data-fetching boundaries, a typed component API, and a design system that doesn't fight the product.",
    deliverables: [
      {
        iconName: "Layers",
        title: "Component library with typed API",
        description:
          "Atomic components (Button, Input, Modal, Table) up to feature-level blocks (DataTable, FilterBar, DashboardCard). Props documented with TypeScript — no reading source code to understand usage.",
      },
      {
        iconName: "Zap",
        title: "TanStack Query data layer",
        description:
          "Typed query hooks per resource, optimistic updates, background refresh, and error boundaries. Every loading and error state handled — no empty screens or silent failures.",
      },
      {
        iconName: "ShieldCheck",
        title: "TypeScript strict mode, no exceptions",
        description:
          "No any, no non-null assertions, no ts-ignore. Inference used where natural, explicit types where safety matters. Codebase that the next developer can trust.",
      },
      {
        iconName: "Target",
        title: "Performance by default",
        description:
          "React.memo, useMemo, and useCallback used correctly (not everywhere). Code-split by route with React.lazy and Suspense. Bundle analysed and trimmed before handover.",
      },
      {
        iconName: "Database",
        title: "State management that fits",
        description:
          "Zustand for client state, TanStack Query for server state. Context only where it belongs (theme, auth). No Redux unless the team specifically needs it.",
      },
      {
        iconName: "FileSearch",
        title: "Testing & documentation",
        description:
          "Vitest + React Testing Library on critical paths. Component stories in Storybook if a library is being built. README per module explaining the data flow.",
      },
    ],
    techStack: [
      { label: "Core", items: ["React 18+", "TypeScript 5", "Vite", "React Router v7"] },
      { label: "Data", items: ["TanStack Query", "Axios", "Zod", "Zustand"] },
      { label: "UI", items: ["Tailwind CSS", "shadcn/ui", "Radix UI", "Framer Motion"] },
      { label: "Quality", items: ["Vitest", "React Testing Library", "Storybook", "ESLint"] },
    ],
    process: [
      {
        title: "Component audit (existing apps)",
        description:
          "For existing codebases: identify the duplicated components, inconsistent patterns, and biggest pain points before writing a line of new code.",
      },
      {
        title: "Design system setup",
        description:
          "Token-based Tailwind config, primitive components, and a naming convention that scales. Built once, used everywhere.",
      },
      {
        title: "Feature build",
        description:
          "Features built in vertical slices: route → data hook → component tree → tests. Deployed previews per PR so stakeholders can review on real devices.",
      },
      {
        title: "Handover",
        description:
          "Bundle size report, component documentation, and a Loom codebase walkthrough. Your team owns it from day one.",
      },
    ],
    proof: [
      { value: "5+", label: "Years of React in production" },
      { value: "10+", label: "React apps from scratch or refactored" },
      { value: "TypeScript", label: "Strict mode — no implicit any anywhere" },
      { value: "0", label: "Redux installs in the last 3 years" },
    ],
    pricing: [
      {
        name: "Component library",
        startingFrom: "$2,000",
        bestFor: "Design system or shared UI package",
        bullets: [
          "Typed component API with Tailwind",
          "Storybook stories + usage docs",
          "Published to your npm org or monorepo",
          "Delivered in 1–2 weeks",
        ],
      },
      {
        name: "React SPA or dashboard",
        startingFrom: "$5,000",
        popular: true,
        bestFor: "Data-heavy internal tools & apps",
        bullets: [
          "TanStack Query data layer + auth",
          "Role-based views + optimistic updates",
          "Responsive, tested, Lighthouse-audited",
          "Delivered in 3–5 weeks",
        ],
      },
      {
        name: "Retainer",
        startingFrom: "$2,000/mo",
        bestFor: "Ongoing feature development",
        bullets: [
          "Dedicated weekly hours",
          "New screens, components, bug fixes",
          "Async standups + weekly review",
          "Cancel any time",
        ],
      },
    ],
    faqs: [
      {
        q: "Next.js or plain React — which should I use?",
        a: "If you need SEO, server-side rendering, or an API layer — use Next.js. If you're building a fully authenticated SPA (dashboard, admin tool, internal app) where SEO doesn't matter and you already have an API — plain React with Vite is simpler and ships faster.",
      },
      {
        q: "Can you refactor our existing React codebase?",
        a: "Yes. I start with a component and data-flow audit, identify the worst pain points, and refactor incrementally. No big-bang rewrites — you ship features throughout the engagement.",
      },
      {
        q: "Do you build Storybook design systems?",
        a: "Yes. For teams with multiple apps or a shared component library, Storybook with interaction tests and auto-generated docs is a significant productivity multiplier. I'll set it up and document the contribution workflow.",
      },
      {
        q: "We're using Redux, should we migrate to Zustand / TanStack Query?",
        a: "Often yes — most Redux in 2024 is managing server state that TanStack Query handles better, and local UI state that Zustand handles with a tenth of the boilerplate. I'll audit your Redux usage and recommend only the parts worth migrating.",
      },
    ],
    related: ["frontend-development", "nextjs-development", "web-development", "performance-optimization"],
  },

  // ---------------------------------------------------------------- PERFORMANCE OPTIMIZATION
  {
    slug: "performance-optimization",
    category: "development",
    iconName: "TrendingUp",
    metaTitle: "Web Performance Optimization — Core Web Vitals, 95+ Lighthouse | Smit Parekh",
    metaDescription:
      "Fix slow websites. Core Web Vitals (LCP, CLS, INP), 95+ Lighthouse, bundle size reduction, image optimization, server response time. Written report + implementation included.",
    keywords: [
      "web performance optimization service",
      "Core Web Vitals fix",
      "improve Lighthouse score",
      "website speed optimization",
      "LCP optimization",
      "CLS fix",
      "INP optimization",
      "website slow fix",
      "Next.js performance optimization",
      "React bundle size optimization",
      "hire performance optimization developer",
      "PageSpeed Insights improvement",
    ],
    eyebrow: "Performance Optimization",
    heroTitle: "From slow to 95+ Lighthouse — with a written plan and real results",
    heroDescription:
      "Core Web Vitals fixed, bundle sizes cut, LCP under 2.5 seconds. I audit, prioritize, and implement — or give you the plan to do it yourself.",
    lede: "A slow site doesn't just frustrate users — it costs you ranking positions and conversion rate. Studies consistently show a 100ms increase in page load time drops conversions by 1%. I've taken sites from 38 → 97 Lighthouse and know the exact sequence: measure on real users, find the 20% of fixes that unlock 80% of the score, and implement without regressions.",
    deliverables: [
      {
        iconName: "FileSearch",
        title: "Performance audit report",
        description:
          "Full analysis with Lighthouse, WebPageTest, and Chrome UX Report (real-user CrUX data). Every issue severity-ranked by impact on LCP, CLS, INP, and TTFB — with implementation instructions.",
      },
      {
        iconName: "Zap",
        title: "LCP under 2.5 seconds",
        description:
          "Largest Contentful Paint fixed via image optimization (next/image, AVIF/WebP, preload hints), critical CSS inlining, server response time improvements, and removing render-blocking resources.",
      },
      {
        iconName: "Layers",
        title: "Bundle size reduction",
        description:
          "Webpack Bundle Analyzer or Rollup Visualizer teardown. Tree-shaking dead imports, code-splitting by route, replacing heavy libraries, and lazy-loading below-fold components.",
      },
      {
        iconName: "Search",
        title: "CLS elimination",
        description:
          "Every layout shift tracked to its source: unsized images, late-loading fonts, injected banners, dynamic content without reserved space. Fixed to 0.1 or below.",
      },
      {
        iconName: "Server",
        title: "Server response time (TTFB)",
        description:
          "Database query profiling, N+1 query fixes, Redis caching for hot paths, edge CDN configuration, and API route response-time instrumentation.",
      },
      {
        iconName: "TrendingUp",
        title: "Before/after evidence",
        description:
          "Lighthouse comparison, WebPageTest filmstrip, and a CrUX dashboard showing real-user improvement over 28 days. Stakeholder-ready results you can share.",
      },
    ],
    techStack: [
      { label: "Measurement", items: ["Lighthouse CI", "WebPageTest", "Chrome UX Report", "Datadog RUM"] },
      { label: "Frontend", items: ["next/image", "next/font", "Bundle Analyzer", "Preload / Prefetch"] },
      { label: "Backend", items: ["Redis", "Prisma query logs", "pg_stat_statements", "EXPLAIN ANALYZE"] },
      { label: "CDN & Infra", items: ["Vercel Edge", "Cloudflare", "AWS CloudFront", "Cache-Control headers"] },
    ],
    process: [
      {
        title: "Baseline measurement",
        description:
          "Lighthouse + WebPageTest + CrUX field data. I measure on real mobile hardware, not just desktop. No fixing what we haven't measured.",
      },
      {
        title: "Prioritised fix plan",
        description:
          "Each issue gets an effort vs impact score. The top 5 fixes typically unlock 80% of the score gain. We agree on what's in scope before work starts.",
      },
      {
        title: "Implementation",
        description:
          "Fixes shipped in small PRs with before/after Lighthouse diffs. No regressions — Lighthouse CI gates every PR.",
      },
      {
        title: "Evidence report",
        description:
          "Final Lighthouse comparison, WebPageTest filmstrip, and 28-day CrUX trend. A document you can use to show stakeholders what changed and why.",
      },
    ],
    proof: [
      { value: "38→97", label: "Best single-project Lighthouse improvement" },
      { value: "2×", label: "Organic traffic uplift documented after CWV fixes" },
      { value: "<2.5s", label: "LCP target on every delivered project" },
      { value: "0.1", label: "CLS or below on all delivered pages" },
    ],
    pricing: [
      {
        name: "Audit only",
        startingFrom: "$500",
        bestFor: "Get the plan, implement yourself",
        bullets: [
          "Full Lighthouse + WebPageTest + CrUX analysis",
          "Severity-ranked issue list with fix instructions",
          "30-min walkthrough call",
          "Delivered in 3 business days",
        ],
      },
      {
        name: "Audit + Implementation",
        startingFrom: "$2,500",
        popular: true,
        bestFor: "Full fix on a live production site",
        bullets: [
          "Full audit as above",
          "Top-priority fixes implemented",
          "Lighthouse CI added to your pipeline",
          "Before/after evidence report",
        ],
      },
      {
        name: "Ongoing monitoring",
        startingFrom: "$800/mo",
        bestFor: "Prevent regressions as you ship",
        bullets: [
          "Monthly Lighthouse + CrUX review",
          "Regression alerts + fix PRs",
          "Quarterly full audit",
          "Cancel any time",
        ],
      },
    ],
    faqs: [
      {
        q: "Our Lighthouse score is good in the tool, but real users report it's slow. Why?",
        a: "Lighthouse desktop emulates a fast CPU and fast network. Real users on mobile 4G see different results. I always measure with CrUX (28-day real-user data) and WebPageTest on a throttled mobile connection. The lab score and field score often diverge significantly — field data is what actually affects your Search ranking.",
      },
      {
        q: "Will improving performance affect our SEO?",
        a: "Yes, directly. Core Web Vitals are a confirmed Google ranking signal. Improving LCP, CLS, and INP to 'Good' thresholds on the CrUX field data removes a ranking suppressor. The effect is usually visible in Search Console within 4–6 weeks.",
      },
      {
        q: "Can you optimize a WordPress / PHP site, or only React/Next.js?",
        a: "Primarily React, Next.js, and Node.js stacks. For WordPress I can advise on caching strategy, image delivery, and CDN configuration, but I won't implement PHP-level changes.",
      },
      {
        q: "How long do the improvements last?",
        a: "Performance regresses when new code ships without measurement gates. As part of the engagement I add Lighthouse CI to your pipeline so every PR shows a Lighthouse delta — regressions get caught before they reach production.",
      },
    ],
    related: ["web-development", "nextjs-development", "technical-seo", "frontend-development"],
  },

  // ---------------------------------------------------------------- SHOPIFY DEVELOPMENT
  {
    slug: "shopify-development",
    category: "development",
    iconName: "Smartphone",
    metaTitle: "Headless Shopify Development — Next.js + Storefront API | Smit Parekh",
    metaDescription:
      "Headless Shopify development with Next.js and the Storefront API. Custom storefronts, Hydrogen migrations, 95+ Lighthouse, faster checkouts. Free quote in 24 hours.",
    keywords: [
      "headless Shopify development",
      "Shopify Next.js development",
      "Shopify Storefront API developer",
      "custom Shopify storefront",
      "Shopify Hydrogen alternative",
      "Shopify headless commerce",
      "hire Shopify developer",
      "Shopify performance optimization",
      "Shopify custom frontend",
      "decoupled Shopify development",
      "Next.js Shopify developer",
    ],
    eyebrow: "Shopify Development",
    heroTitle: "Headless Shopify storefront that actually converts",
    heroDescription:
      "Custom Next.js frontend on top of Shopify's battle-tested checkout and inventory. The flexibility of a bespoke storefront, the reliability of Shopify's backend.",
    lede: "Shopify's built-in themes are fast to set up but hit a wall when you need custom UX, specific performance targets, or design that doesn't look like every other Shopify store. Going headless gives you a React frontend you fully control — while keeping Shopify's checkout, payments, inventory, and fulfilment working exactly as they do today.",
    deliverables: [
      {
        iconName: "Code2",
        title: "Next.js storefront with Storefront API",
        description:
          "Full product catalogue, collections, cart, and checkout flow via Shopify Storefront API or Hydrogen-compatible GraphQL. Typesafe with auto-generated GQL types.",
      },
      {
        iconName: "Zap",
        title: "95+ Lighthouse — faster than any Shopify theme",
        description:
          "Server-rendered product pages with ISR, next/image for every product photo, and a Time to Interactive under 3 seconds on real mobile hardware. Themes can't match this.",
      },
      {
        iconName: "Layers",
        title: "Custom UI that matches your brand",
        description:
          "Pixel-perfect product pages, collection filters, search, wishlist, and cart drawer — designed to your spec, not limited by a theme's section schema.",
      },
      {
        iconName: "Search",
        title: "SEO-first product & collection pages",
        description:
          "Server-rendered metadata, Product schema, BreadcrumbList schema, automatic sitemap, canonical URLs, and hreflang for international stores. Designed to rank.",
      },
      {
        iconName: "ShieldCheck",
        title: "Shopify checkout & payments untouched",
        description:
          "Shopify Checkout handles payments, fraud protection, Shop Pay, and local payment methods. Nothing custom here — you keep everything Shopify already does well.",
      },
      {
        iconName: "Webhook",
        title: "Webhooks for inventory & order sync",
        description:
          "Real-time stock updates, order confirmation flows, and fulfilment status pushed to your storefront via Shopify webhooks. No stale product data.",
      },
    ],
    techStack: [
      { label: "Frontend", items: ["Next.js 14+", "TypeScript", "Tailwind CSS", "Framer Motion"] },
      { label: "Commerce", items: ["Shopify Storefront API", "Shopify Admin API", "GraphQL Codegen", "Shopify Checkout"] },
      { label: "Search & CMS", items: ["Algolia", "Shopify Search", "Contentful", "Sanity"] },
      { label: "Deploy", items: ["Vercel", "Cloudflare", "ISR", "Shopify Webhooks"] },
    ],
    process: [
      {
        title: "Commerce audit",
        description:
          "Review your current Shopify setup: products, variants, metafields, markets, and checkout customisations. We identify what headless gives you vs what it complicates before committing.",
      },
      {
        title: "Design & data model",
        description:
          "Storefront wireframes, Shopify metafield schema for custom product data, and GraphQL query plan. No frontend work until the data layer is locked.",
      },
      {
        title: "Storefront build",
        description:
          "Product pages, collection pages, cart, search, and account flows built iteratively with Vercel preview deploys. Lighthouse gated on every PR.",
      },
      {
        title: "Launch & redirect",
        description:
          "DNS cutover plan, 301 redirects from old URLs, Search Console notification, and 30 days of post-launch support. Zero ranking loss on transition.",
      },
    ],
    proof: [
      { value: "95+", label: "Lighthouse — faster than any theme" },
      { value: "TypeSafe", label: "GraphQL with auto-generated types" },
      { value: "0", label: "Changes to Shopify checkout or payments" },
      { value: "30 days", label: "Post-launch support included" },
    ],
    pricing: [
      {
        name: "Storefront MVP",
        startingFrom: "$5,000",
        bestFor: "New stores or simple catalogues",
        bullets: [
          "Home, collection, product, cart pages",
          "Storefront API integration",
          "Mobile responsive, 95+ Lighthouse",
          "Delivered in 3–4 weeks",
        ],
      },
      {
        name: "Full Custom Storefront",
        startingFrom: "$12,000",
        popular: true,
        bestFor: "High-traffic or design-led brands",
        bullets: [
          "All pages + search + account + wishlist",
          "Algolia or Shopify search",
          "International markets + hreflang",
          "Delivered in 6–10 weeks",
        ],
      },
      {
        name: "Theme → Headless Migration",
        startingFrom: "$8,000",
        bestFor: "Replacing an existing Shopify theme",
        bullets: [
          "URL parity + 301 redirect plan",
          "Zero ranking loss on cutover",
          "Performance before/after report",
          "Timeline based on page count",
        ],
      },
    ],
    faqs: [
      {
        q: "Why go headless instead of using a Shopify theme?",
        a: "Three main reasons: performance (95+ Lighthouse vs typical theme scores of 40–65), design control (not limited by a theme's section schema), and flexibility (integrate any CMS, loyalty program, or search provider). The trade-off is complexity — it's more expensive to build and maintain. For high-traffic, high-AOV, or design-led brands, the conversion lift justifies it.",
      },
      {
        q: "Does headless Shopify affect checkout?",
        a: "No — Shopify Checkout (and all its payment methods, Shop Pay, fraud protection) remains completely untouched. The cart is built on your Next.js frontend; checkout happens on Shopify's hosted checkout page.",
      },
      {
        q: "Will we lose SEO rankings when we migrate?",
        a: "Not if the migration is handled correctly. I build a URL parity map, implement 301 redirects for any changed URLs, keep metadata identical, and notify Google Search Console on launch day. With ISR, pages are server-rendered and indexable from day one.",
      },
      {
        q: "Can you integrate with Shopify Plus features?",
        a: "Yes — checkout extensibility, custom B2B pricing, market-specific content, and Shopify Functions are all available via the API layer. Plus features are supported but not required.",
      },
      {
        q: "What about Hydrogen (Shopify's official headless framework)?",
        a: "Hydrogen is great if you want to stay in the Shopify ecosystem long-term. I prefer Next.js when clients want more framework familiarity, better hiring market, and Vercel's ecosystem — but I can also build in Hydrogen if that's the preference.",
      },
    ],
    related: ["ecommerce-development", "web-development", "performance-optimization", "frontend-development"],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}

export function getRelatedServices(slug: string): ServicePage[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return service.related
    .map((s) => getServiceBySlug(s))
    .filter((s): s is ServicePage => Boolean(s));
}

export function getServicesByCategory(categoryId: ServiceCategoryId): ServicePage[] {
  return servicePages.filter((s) => s.category === categoryId);
}
