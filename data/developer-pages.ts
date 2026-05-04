export const developerPages = [
  {
    slug: "full-stack-developer",
    title: "Full-Stack Developer",
    description: "React, Next.js, NestJS, PostgreSQL & AWS — one engineer, full ownership from database to deploy",
    tags: ["React", "Next.js", "NestJS", "PostgreSQL"],
  },
  {
    slug: "react-developer",
    title: "React Developer",
    description: "Production-grade React UIs with TypeScript strict, Redux Toolkit, and 40% performance gains",
    tags: ["React", "TypeScript", "Redux", "Vite"],
  },
  {
    slug: "nextjs-developer",
    title: "Next.js Developer",
    description: "95+ Lighthouse, SEO-first App Router builds — from Server Components to production deploy",
    tags: ["Next.js", "App Router", "SEO", "Vercel"],
  },
  {
    slug: "nodejs-developer",
    title: "Node.js Developer",
    description: "10K+ req/day APIs at 99.9% uptime — NestJS, Express, GraphQL, Redis, and AWS",
    tags: ["Node.js", "NestJS", "Express", "AWS"],
  },
  {
    slug: "nestjs-developer",
    title: "NestJS Developer",
    description: "TypeScript-first NestJS APIs with dependency injection, guards, interceptors & microservices",
    tags: ["NestJS", "TypeScript", "GraphQL", "DI"],
  },
  {
    slug: "api-developer",
    title: "API Developer",
    description: "REST & GraphQL APIs — typed, documented, secured, rate-limited, and cached from day one",
    tags: ["REST", "GraphQL", "JWT", "Redis"],
  },
  {
    slug: "saas-developer",
    title: "SaaS Developer",
    description: "Multi-tenant apps with Stripe billing, auth flows, onboarding, and admin dashboards",
    tags: ["Next.js", "Stripe", "Supabase", "Multi-Tenant"],
  },
  {
    slug: "postgresql-developer",
    title: "PostgreSQL Developer",
    description: "Schema design, query optimisation, RLS, Supabase, and zero-downtime migrations",
    tags: ["PostgreSQL", "Supabase", "Prisma", "AWS RDS"],
  },
  {
    slug: "typescript-developer",
    title: "TypeScript Developer",
    description: "Strict-mode TypeScript across the full stack — no any, no suppressions, no runtime surprises",
    tags: ["TypeScript", "React", "Node.js", "Zod"],
  },
] as const;

export type DeveloperPageSlug = (typeof developerPages)[number]["slug"];

export const relatedPages: Record<DeveloperPageSlug, DeveloperPageSlug[]> = {
  "full-stack-developer": ["react-developer", "nextjs-developer", "nodejs-developer", "nestjs-developer"],
  "react-developer": ["nextjs-developer", "typescript-developer", "full-stack-developer", "saas-developer"],
  "nextjs-developer": ["react-developer", "typescript-developer", "saas-developer", "full-stack-developer"],
  "nodejs-developer": ["nestjs-developer", "api-developer", "postgresql-developer", "full-stack-developer"],
  "nestjs-developer": ["nodejs-developer", "api-developer", "typescript-developer", "full-stack-developer"],
  "api-developer": ["nodejs-developer", "nestjs-developer", "postgresql-developer", "full-stack-developer"],
  "saas-developer": ["nextjs-developer", "react-developer", "postgresql-developer", "full-stack-developer"],
  "postgresql-developer": ["nodejs-developer", "api-developer", "saas-developer", "full-stack-developer"],
  "typescript-developer": ["react-developer", "nextjs-developer", "nestjs-developer", "full-stack-developer"],
};
