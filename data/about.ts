export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export const aboutBio =
  "Full-Stack Developer with 4+ years delivering production web applications across FinTech, AI/ML, SaaS, and enterprise domains. Expert in React, Next.js, Node.js, TypeScript, and PostgreSQL - with deep experience in Redux state management, RESTful API architecture, and AWS cloud infrastructure. Proven track record cutting query response times by 65%, improving performance by 40%, and shipping APIs handling 10,000+ daily requests. One engineering partner for the full product lifecycle - architecture, build, deployment, and handover.";

export const experiences: Experience[] = [
  {
    company: "Monarch Innovations",
    role: "Full Stack Software Developer",
    period: "Jan 2026 – Present",
    description:
      "Developing modern FinTech web applications for the Satchel Inc suite (liquidity.io, simplici.io, equitytable.io). Built complex React + Redux Toolkit state management across 50+ components, designed RESTful APIs with Node.js and Express on PostgreSQL with 99.9% uptime, and deployed on AWS (EC2, RDS, S3) with Docker containerisation.",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redux", "AWS", "Docker"],
  },
  {
    company: "Cilans Systems",
    role: "Full Stack Software Developer",
    period: "Aug 2024 – Dec 2025",
    description:
      "Built and maintained 8+ production applications across AI/ML, SaaS, and enterprise domains. Architected RESTful APIs with Node.js and Express, optimised Redux state management delivering a 40% performance improvement, and wrote PostgreSQL schemas and migrations for complex business logic. Participated in code reviews and implemented TypeScript best practices across the team codebase.",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redux", "Docker"],
  },
  {
    company: "MarketiXpert",
    role: "Full Stack Developer (Freelance)",
    period: "Jan 2024 – Present",
    description:
      "Designed and developed marketixpert.tech end-to-end using Next.js and Node.js with TypeScript throughout. Implemented RESTful API endpoints for content management, authentication, and analytics using Express.js and PostgreSQL. Deployed on Vercel with an automated CI/CD pipeline, achieving 95+ Google Lighthouse scores.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Vercel", "CI/CD"],
  },
  {
    company: "Content Beta",
    role: "Digital Marketer & Video Editor",
    period: "Apr 2023 – Jan 2024",
    description:
      "Developed creative content and managed digital campaigns, building strong communication skills and a deep understanding of user-centric design principles. This role sharpened the ability to bridge engineering and marketing - a perspective that now informs every product built.",
    tags: ["Digital Marketing", "Content Strategy", "SEO", "Analytics"],
  },
];

export const certifications: Certification[] = [
  {
    name: "React – The Complete Guide 2025",
    issuer: "Udemy",
    year: "2025",
  },
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2024",
  },
  {
    name: "Web Development Bootcamp",
    issuer: "Udemy",
    year: "2024",
  },
  {
    name: "UX Design Foundations",
    issuer: "Google",
    year: "2024",
  },
];
