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
      "Enterprise FinTech platform for equity management, shareholder tracking, and financial reporting. Handles 10,000+ daily API requests across 100+ Redux components.",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    category: "FinTech",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-blue-600 via-blue-500 to-sky-500",
  },
  {
    id: 2,
    title: "Insightifi",
    subtitle: "SaaS Analytics Platform",
    description:
      "Real-time data visualisation dashboards with business intelligence analytics. Optimised PostgreSQL queries reducing API response times by 65%.",
    tags: ["React", "TypeScript", "Chart.js", "Node.js", "PostgreSQL", "Redux"],
    category: "SaaS",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-sky-500 via-cyan-400 to-blue-400",
  },
  {
    id: 3,
    title: "SimplCase",
    subtitle: "Legal Tech Real-time Platform",
    description:
      "Real-time legal collaboration with live chat, document sharing, and WebSocket notifications. Features optimistic UI updates and bidirectional communication.",
    tags: ["React", "Socket.io", "Node.js", "TypeScript", "PostgreSQL"],
    category: "LegalTech",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-blue-500 via-sky-500 to-cyan-500",
  },
  {
    id: 4,
    title: "HRMS",
    subtitle: "Employee Management System",
    description:
      "Full-stack HR system with role-based access, leave management, payroll processing, and complex relational schema migrated from MongoDB to PostgreSQL.",
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL", "Express"],
    category: "Enterprise",
    demoLink: "https://www.smitparekh.co.in/contact",
    gradient: "from-cyan-400 via-sky-400 to-blue-500",
  },
];
