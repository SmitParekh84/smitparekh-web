export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: string;
  demoLink: string;
  gradient: string;
}

export const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Liquidity.io",
    subtitle: "Cap Table Management Platform",
    description:
      "Enterprise FinTech platform for equity management, shareholder tracking, and financial reporting. Built for the Satchel Inc suite — handles 10,000+ daily API requests across 50+ Redux Toolkit components with 99.9% uptime.",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redux", "AWS", "Docker"],
    category: "FinTech",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-blue-600 via-blue-500 to-sky-500",
  },
  {
    id: 2,
    title: "Insightifi",
    subtitle: "SaaS Analytics Platform",
    description:
      "Real-time data visualisation dashboards with business intelligence analytics for enterprise clients. Optimised PostgreSQL queries with indexing and caching strategies — reduced API response times by 65%.",
    tags: ["React", "TypeScript", "Chart.js", "Node.js", "PostgreSQL", "Redux", "AWS"],
    category: "SaaS",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-sky-500 via-cyan-400 to-blue-400",
  },
  {
    id: 3,
    title: "SimplCase",
    subtitle: "LegalTech Real-time Platform",
    description:
      "Real-time legal collaboration platform with live chat, document sharing, and WebSocket notifications. Features optimistic UI updates, bidirectional Socket.io communication, and Redux-managed concurrent user state.",
    tags: ["React", "Socket.io", "Node.js", "TypeScript", "PostgreSQL", "Redux"],
    category: "LegalTech",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-blue-500 via-sky-500 to-cyan-500",
  },
  {
    id: 4,
    title: "HRMS",
    subtitle: "Employee Management System",
    description:
      "Full-stack HR system with role-based access control, leave management, payroll processing, and employee records. Schema migrated from MongoDB to PostgreSQL — 65% faster query performance.",
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL", "Express", "Redux"],
    category: "Enterprise",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-cyan-400 via-sky-400 to-blue-500",
  },
  {
    id: 5,
    title: "MarketiXpert",
    subtitle: "Full-Stack Digital Marketing Platform",
    description:
      "End-to-end digital marketing platform (marketixpert.tech) with Next.js frontend and Node.js backend. REST API for content management, user auth, and analytics tracking. 95+ Lighthouse score, automated CI/CD on Vercel.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Express", "Vercel"],
    category: "SaaS",
    demoLink: "https://marketixpert.tech",
    gradient: "from-blue-600 via-cyan-500 to-sky-400",
  },
  {
    id: 6,
    title: "equitytable.io",
    subtitle: "Equity Table Management",
    description:
      "Equity table management tool from the Satchel Inc FinTech suite. Built with React, TypeScript, and Node.js — enables founders and investors to manage cap structures, vesting schedules, and ownership stakes in real time.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redux", "AWS"],
    category: "FinTech",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-blue-500 via-blue-400 to-cyan-400",
  },
];
