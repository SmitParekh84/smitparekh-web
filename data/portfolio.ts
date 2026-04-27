export interface ProjectOutcome {
  label: string;
  value: string;
  detail: string;
}

export interface ProjectHighlight {
  label: string;
  value: string;
}

export interface ProjectTechStack {
  Frontend?: string[];
  Backend?: string[];
  Database?: string[];
  Infrastructure?: string[];
  Tooling?: string[];
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  summary: string;
  tags: string[];
  category: string;
  industry: string;
  role: string;
  year: string;
  duration: string;
  demoLink: string;
  repoLink?: string;
  gradient: string;
  highlights: ProjectHighlight[];
  problem: string;
  approach: string[];
  outcomes: ProjectOutcome[];
  techStack: ProjectTechStack;
  lessons?: string[];
  isShowcased?: boolean;
}

export const featuredProjects: Project[] = [
  {
    id: 1,
    slug: "liquidity-io",
    title: "Liquidity.io",
    subtitle: "Cap Table Management Platform",
    description:
      "Enterprise FinTech platform for equity management, shareholder tracking, and financial reporting. Built for the Satchel Inc suite — handles 10,000+ daily API requests across 50+ Redux Toolkit components with 99.9% uptime.",
    summary:
      "Liquidity.io is the cap table and equity-management product in the Satchel Inc FinTech suite. Founders, CFOs, and investors use it as the single source of truth for ownership — modeling rounds, issuing shares, tracking vesting, and producing audit-ready financial reports. I worked on the platform end-to-end across React, Redux Toolkit, and Node.js services.",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redux", "AWS", "Docker"],
    category: "FinTech",
    industry: "Equity & Cap Table Management",
    role: "Full Stack Developer",
    year: "2023–2025",
    duration: "20+ months",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-blue-600 via-blue-500 to-sky-500",
    highlights: [
      { label: "API Requests / Day", value: "10,000+" },
      { label: "Uptime SLA", value: "99.9%" },
      { label: "Redux Components", value: "50+" },
      { label: "Active Tenants", value: "Enterprise" },
    ],
    problem:
      "Equity management is one of the highest-stakes workflows in any company — every share issuance, vesting event, and ownership change has legal and financial implications. The platform needed to support complex multi-class cap structures, real-time collaboration between founders and finance teams, audit-quality reporting, and strict access controls — without sacrificing the responsive feel of a modern SaaS product.",
    approach: [
      "Architected the React frontend around 50+ feature-scoped Redux Toolkit slices with normalized entities, RTK Query for server state, and selectors that keep large cap tables performant on re-render.",
      "Designed reusable equity primitives (share class, grant, transaction) so issuance, transfer, vesting, and reporting flows compose from the same domain model.",
      "Built Node.js + Express services with PostgreSQL transactions for every ownership-changing operation, ensuring cap tables can never enter an inconsistent state.",
      "Implemented role-based access control with row-level checks — founders, employees, investors, and auditors each see a tailored, permission-aware view of the same dataset.",
      "Containerized services with Docker and deployed to AWS behind a load balancer, with structured logging and CloudWatch alarms for the high-traffic endpoints.",
    ],
    outcomes: [
      {
        label: "10,000+ requests/day",
        value: "Sustained throughput",
        detail:
          "The API tier comfortably handles 10K+ daily requests across cap-table reads and ownership-changing writes without degradation.",
      },
      {
        label: "99.9% uptime",
        value: "Production reliability",
        detail:
          "Health checks, graceful restarts, and AWS auto-scaling keep the platform within enterprise SLA targets.",
      },
      {
        label: "Faster cap-table loads",
        value: "Optimized rendering",
        detail:
          "Memoized selectors and virtualised tables eliminated re-render storms on cap tables with hundreds of stakeholders.",
      },
    ],
    techStack: {
      Frontend: ["React", "Next.js", "TypeScript", "Redux Toolkit", "RTK Query", "Tailwind CSS"],
      Backend: ["Node.js", "Express", "TypeScript", "REST APIs"],
      Database: ["PostgreSQL", "Prisma / SQL migrations"],
      Infrastructure: ["AWS (EC2, RDS, S3)", "Docker", "CloudWatch"],
      Tooling: ["GitHub Actions", "Jest", "ESLint"],
    },
    lessons: [
      "Treat money-touching writes as transactional first, UX second — every ownership change is a single PostgreSQL transaction.",
      "Normalised Redux entities are the difference between a snappy cap table and a frozen browser tab.",
    ],
    isShowcased: true,
  },
  {
    id: 2,
    slug: "insightifi",
    title: "Insightifi",
    subtitle: "SaaS Analytics Platform",
    description:
      "Real-time data visualisation dashboards with business intelligence analytics for enterprise clients. Optimised PostgreSQL queries with indexing and caching strategies — reduced API response times by 65%.",
    summary:
      "Insightifi is a multi-tenant analytics platform that lets enterprise teams pipe their operational data into shared dashboards. The product spans ingestion, querying, and a Chart.js-powered dashboard layer — I focused on backend query performance and the React/Redux dashboard experience.",
    tags: ["React", "TypeScript", "Chart.js", "Node.js", "PostgreSQL", "Redux", "AWS"],
    category: "SaaS",
    industry: "Business Intelligence & Analytics",
    role: "Full Stack Developer",
    year: "2023",
    duration: "8 months",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-sky-500 via-cyan-400 to-blue-400",
    highlights: [
      { label: "API Latency Cut", value: "65%" },
      { label: "Dashboards", value: "Real-time" },
      { label: "Tenants", value: "Enterprise" },
      { label: "Charts Rendered", value: "Chart.js" },
    ],
    problem:
      "The platform's first version did clean visual work but couldn't keep up at enterprise scale — dashboards on large datasets were taking multiple seconds to load, ad-hoc filters were re-issuing expensive queries, and there was no caching strategy. Customers needed sub-second feedback to actually trust the tool for daily decisions.",
    approach: [
      "Profiled the slowest endpoints, identified missing composite indexes, and rewrote N+1 query patterns with explicit JOINs and aggregation pushdowns.",
      "Introduced a tiered caching strategy — short-lived response caching for repeated dashboard queries plus query-shape memoization in Node.js.",
      "Refactored the Redux dashboard store so filters debounce updates and only re-issue the affected widgets instead of the full board.",
      "Standardized on a Chart.js render layer with consistent themes, lazy-loaded chart bundles, and skeleton states for perceived performance.",
    ],
    outcomes: [
      {
        label: "65% faster APIs",
        value: "Backend optimisation",
        detail:
          "Indexes and query rewrites cut median response time on the slowest endpoints by 65%.",
      },
      {
        label: "Smoother dashboards",
        value: "Frontend optimisation",
        detail:
          "Debounced filters and granular Redux updates eliminated the full-board re-renders that were freezing tabs.",
      },
      {
        label: "Trusted by ops teams",
        value: "Adoption",
        detail:
          "Sub-second feedback turned the product from a quarterly review tool into a daily-use dashboard for enterprise teams.",
      },
    ],
    techStack: {
      Frontend: ["React", "TypeScript", "Redux", "Chart.js", "Tailwind CSS"],
      Backend: ["Node.js", "Express", "REST APIs"],
      Database: ["PostgreSQL (indexes, query plans)"],
      Infrastructure: ["AWS", "Caching layer"],
    },
    isShowcased: true,
  },
  {
    id: 3,
    slug: "simplcase",
    title: "SimplCase",
    subtitle: "LegalTech Real-time Collaboration",
    description:
      "Real-time legal collaboration platform with live chat, document sharing, and WebSocket notifications. Features optimistic UI updates, bidirectional Socket.io communication, and Redux-managed concurrent user state.",
    summary:
      "SimplCase is a real-time collaboration workspace for legal teams — live chat, document sharing, presence, and a notification bus all running over WebSockets. I built the realtime layer on Socket.io and the Redux state model that keeps multiple users in sync.",
    tags: ["React", "Socket.io", "Node.js", "TypeScript", "PostgreSQL", "Redux"],
    category: "LegalTech",
    industry: "Legal Collaboration",
    role: "Full Stack Developer",
    year: "2022–2023",
    duration: "10 months",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-blue-500 via-sky-500 to-cyan-500",
    highlights: [
      { label: "Transport", value: "Socket.io" },
      { label: "UX Pattern", value: "Optimistic UI" },
      { label: "Concurrency", value: "Multi-user" },
      { label: "State", value: "Redux" },
    ],
    problem:
      "Legal collaboration is conversation-heavy and time-sensitive — teams need to see typing, presence, document edits, and chat updates the instant they happen, but also need the app to stay correct when network blips, reconnects, or two people act on the same record.",
    approach: [
      "Designed a bidirectional Socket.io contract with versioned events so the client and server can evolve independently.",
      "Built optimistic UI patterns in Redux — actions update the local state immediately, then reconcile with the authoritative server response (or roll back on rejection).",
      "Modelled presence and typing indicators as cheap ephemeral events on a separate channel from durable chat/document writes, so high-frequency UI cues don't pressure the persistence layer.",
      "Added reconnect-and-resync logic so a dropped client catches up on missed events without duplicating state.",
    ],
    outcomes: [
      {
        label: "Real-time feel",
        value: "Sub-second updates",
        detail:
          "Chat, presence, and document events propagate to all participants in well under a second on a healthy connection.",
      },
      {
        label: "Resilient under churn",
        value: "Reconnect logic",
        detail:
          "Clients gracefully recover from disconnects without losing or duplicating messages.",
      },
      {
        label: "Clean concurrency model",
        value: "Optimistic + reconcile",
        detail:
          "Two users acting on the same record converge to the server's truth without the UI ever feeling stuck.",
      },
    ],
    techStack: {
      Frontend: ["React", "TypeScript", "Redux", "Socket.io client"],
      Backend: ["Node.js", "Express", "Socket.io"],
      Database: ["PostgreSQL"],
    },
    isShowcased: true,
  },
  {
    id: 4,
    slug: "hrms",
    title: "HRMS",
    subtitle: "Employee Management System",
    description:
      "Full-stack HR system with role-based access control, leave management, payroll processing, and employee records. Schema migrated from MongoDB to PostgreSQL — 65% faster query performance.",
    summary:
      "An internal HRMS covering employee records, leave, and payroll for a mid-sized team. The interesting story is the migration: I moved the data layer from MongoDB to PostgreSQL while the system was in production, redesigning the schema around relational integrity instead of document nesting.",
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL", "Express", "Redux"],
    category: "Enterprise",
    industry: "HR & Payroll",
    role: "Full Stack Developer",
    year: "2022",
    duration: "6 months",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-cyan-400 via-sky-400 to-blue-500",
    highlights: [
      { label: "Query Speed", value: "+65%" },
      { label: "Migration", value: "Mongo → PG" },
      { label: "Access", value: "RBAC" },
      { label: "Modules", value: "HR · Leave · Payroll" },
    ],
    problem:
      "The original MongoDB schema worked early on but couldn't model HR's relational reality — employees, departments, managers, leave balances, payroll runs all reference each other. Reports were slow, integrity was enforced in application code, and analytics were painful.",
    approach: [
      "Designed a normalized PostgreSQL schema with foreign keys and check constraints so the database itself protects HR-critical invariants.",
      "Wrote an idempotent migration pipeline with parity checks against the live MongoDB so we could cut over with confidence.",
      "Implemented RBAC at the API layer with route-level guards plus column-level field hiding for sensitive payroll fields.",
      "Rebuilt reports as set-based SQL (window functions, CTEs) instead of in-memory aggregation in Node.",
    ],
    outcomes: [
      {
        label: "65% faster queries",
        value: "After migration",
        detail:
          "Reporting and search workloads got materially faster after moving to a properly indexed relational schema.",
      },
      {
        label: "Stronger data integrity",
        value: "Constraint-enforced",
        detail:
          "Foreign keys and check constraints eliminated several classes of bugs that the application layer used to police.",
      },
      {
        label: "Cleaner permissions",
        value: "RBAC",
        detail:
          "Role-based access control gave HR clear answers to 'who can see what' across employee, leave, and payroll data.",
      },
    ],
    techStack: {
      Frontend: ["React", "TypeScript", "Redux"],
      Backend: ["Node.js", "Express", "TypeScript"],
      Database: ["PostgreSQL", "MongoDB (legacy → migrated)"],
    },
    isShowcased: true,
  },
  {
    id: 5,
    slug: "marketixpert",
    title: "MarketiXpert",
    subtitle: "Full-Stack Digital Marketing Platform",
    description:
      "End-to-end digital marketing platform (marketixpert.tech) with Next.js frontend and Node.js backend. REST API for content management, user auth, and analytics tracking. 95+ Lighthouse score, automated CI/CD on Vercel.",
    summary:
      "MarketiXpert is a public-facing digital marketing platform built on Next.js (App Router) with a Node.js/Express API. I owned the full stack — content APIs, auth, analytics ingestion, and the SEO-tuned marketing site that ships at 95+ Lighthouse.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Express", "Vercel"],
    category: "SaaS",
    industry: "Digital Marketing",
    role: "Full Stack Developer",
    year: "2024",
    duration: "Ongoing",
    demoLink: "https://marketixpert.tech",
    gradient: "from-blue-600 via-cyan-500 to-sky-400",
    highlights: [
      { label: "Lighthouse", value: "95+" },
      { label: "Framework", value: "Next.js App Router" },
      { label: "CI/CD", value: "Vercel" },
      { label: "API", value: "Node + PG" },
    ],
    problem:
      "A marketing platform has to do two contradictory things well — be a fast, SEO-friendly public site for prospects, and a real authenticated product behind the login. Most stacks force you to compromise on one side; the goal here was zero compromises.",
    approach: [
      "Used the Next.js App Router with server components for the marketing surface (fully static, SEO-tuned) and client components for the authenticated product views.",
      "Built a Node.js + Express REST API with PostgreSQL as the single source of truth for content, users, and analytics events.",
      "Wired automated CI/CD on Vercel so every push runs lint, type-check, and preview deploys before anything reaches production.",
      "Tuned Core Web Vitals — image optimisation, font preconnect, route-level code splitting — to land a 95+ Lighthouse score.",
    ],
    outcomes: [
      {
        label: "95+ Lighthouse",
        value: "Performance + SEO",
        detail:
          "The marketing surface scores 95+ on Performance, Accessibility, Best Practices, and SEO.",
      },
      {
        label: "Automated delivery",
        value: "CI/CD on Vercel",
        detail:
          "Every commit gets a preview URL; main is gated by lint and type-check.",
      },
      {
        label: "Single stack",
        value: "Marketing + product",
        detail:
          "Public site and authenticated app share the same Next.js project and the same Node API.",
      },
    ],
    techStack: {
      Frontend: ["Next.js (App Router)", "TypeScript", "Tailwind CSS"],
      Backend: ["Node.js", "Express", "REST APIs"],
      Database: ["PostgreSQL"],
      Infrastructure: ["Vercel", "GitHub Actions"],
    },
    isShowcased: true,
  },
  {
    id: 6,
    slug: "equitytable-io",
    title: "equitytable.io",
    subtitle: "Equity Table Management",
    description:
      "Equity table management tool from the Satchel Inc FinTech suite. Built with React, TypeScript, and Node.js — enables founders and investors to manage cap structures, vesting schedules, and ownership stakes in real time.",
    summary:
      "equitytable.io is the founder-facing slice of the Satchel Inc FinTech suite — a focused tool for managing cap structures, vesting, and ownership in real time. I worked on the React/Redux frontend and the Node.js services that power it.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redux", "AWS"],
    category: "FinTech",
    industry: "Equity & Cap Table Management",
    role: "Full Stack Developer",
    year: "2023–2024",
    duration: "12+ months",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-blue-500 via-blue-400 to-cyan-400",
    highlights: [
      { label: "Domain", value: "Cap Tables" },
      { label: "Stack", value: "React + Node" },
      { label: "Storage", value: "PostgreSQL" },
      { label: "Cloud", value: "AWS" },
    ],
    problem:
      "Founders want a clean, fast tool to manage equity without booting up a heavyweight enterprise platform. equitytable.io needed to give them the same correctness guarantees as the enterprise product, but with a lighter UI and faster setup path.",
    approach: [
      "Designed a focused React + Redux frontend that surfaces only the operations a founder needs — issue, transfer, vest, report.",
      "Reused the equity domain model from the Satchel suite so equitytable.io and Liquidity.io stay in sync on what 'a share' means.",
      "Built Node.js services with PostgreSQL, deployed on AWS, with the same transactional guarantees as the enterprise product.",
    ],
    outcomes: [
      {
        label: "Founder-first UX",
        value: "Focused tool",
        detail:
          "Strips the enterprise platform down to what early-stage founders actually use day-to-day.",
      },
      {
        label: "Shared domain model",
        value: "With Liquidity.io",
        detail:
          "Both products operate on the same equity primitives, so behaviour stays consistent across the suite.",
      },
      {
        label: "Production-grade backend",
        value: "Node + PostgreSQL on AWS",
        detail:
          "Same transactional, audit-ready backend posture as the enterprise platform.",
      },
    ],
    techStack: {
      Frontend: ["React", "TypeScript", "Redux"],
      Backend: ["Node.js", "Express", "TypeScript"],
      Database: ["PostgreSQL"],
      Infrastructure: ["AWS"],
    },
    isShowcased: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return featuredProjects.find((p) => p.slug === slug);
}
