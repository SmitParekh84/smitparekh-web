export interface Service {
  title: string;
  shortDescription: string;
  bullets: string[];
  iconName: "Code2" | "Monitor" | "Server" | "Database" | "Cloud" | "ShieldCheck" | "Search" | "Megaphone";
}

export const services: Service[] = [
  {
    title: "Full Stack Web Development",
    shortDescription: "End-to-end applications built to scale",
    bullets: [
      "React + Node.js with TypeScript",
      "Scalable REST APIs - Express & NestJS",
      "FinTech, SaaS & enterprise delivery",
    ],
    iconName: "Code2",
  },
  {
    title: "React.js Frontend",
    shortDescription: "Pixel-perfect, performant UIs",
    bullets: [
      "Tailwind CSS, Material-UI, shadcn/ui",
      "Memoization, code splitting & lazy loading",
      "Reusable component libraries & hooks",
    ],
    iconName: "Monitor",
  },
  {
    title: "Node.js Backend & APIs",
    shortDescription: "APIs handling 10,000+ daily requests",
    bullets: [
      "Auth, validation & WebSocket real-time",
      "99.9% uptime & horizontal scaling",
      "Express and NestJS architectures",
    ],
    iconName: "Server",
  },
  {
    title: "Database Design",
    shortDescription: "Optimised schemas, 65% faster queries",
    bullets: [
      "PostgreSQL with indexing & caching",
      "MongoDB for document-based workloads",
      "Migrations & data integrity management",
    ],
    iconName: "Database",
  },
  {
    title: "Cloud & DevOps",
    shortDescription: "AWS deployment with full CI/CD",
    bullets: [
      "AWS: EC2, RDS, S3, Lambda",
      "Docker containerisation",
      "95+ Lighthouse scores consistently",
    ],
    iconName: "Cloud",
  },
  {
    title: "TypeScript & Code Quality",
    shortDescription: "Type-safe, test-covered codebases",
    bullets: [
      "Strict TypeScript frontend & backend",
      "Jest + React Testing Library coverage",
      "Clean code & SOLID design patterns",
    ],
    iconName: "ShieldCheck",
  },
  {
    title: "Technical SEO",
    shortDescription: "Developer-led search optimisation",
    bullets: [
      "Core Web Vitals & Lighthouse fixes",
      "Sitemaps, structured data & meta tags",
      "SEO-first Next.js App Router builds",
    ],
    iconName: "Search",
  },
  {
    title: "Digital Marketing",
    shortDescription: "Data-driven growth strategy",
    bullets: [
      "SEO + content strategy for organic traffic",
      "Google Analytics & Search Console",
      "Dev insight bridging engineering & growth",
    ],
    iconName: "Megaphone",
  },
];
