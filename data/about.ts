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
  "Full-Stack Web Developer with 3.5+ years building production applications for FinTech, SaaS, and enterprise clients. I specialise in React, Next.js, Node.js, TypeScript, and AWS — delivering fast, scalable software that drives measurable business outcomes. One partner for the full product lifecycle — no hand-offs, no gaps, just clean code and clear communication.";

export const experiences: Experience[] = [
  {
    company: "FinTech Product Studio",
    role: "Senior Full-Stack Developer",
    period: "2023 – Present",
    description:
      "Lead development on a cap-table management and analytics platform serving enterprise FinTech clients. Own the full stack — React frontend with 100+ components, NestJS/Node.js APIs handling 10,000+ daily requests, PostgreSQL with optimised query plans, and AWS (EC2, RDS, S3) infrastructure.",
    tags: ["React", "Next.js", "TypeScript", "NestJS", "PostgreSQL", "AWS", "Docker"],
  },
  {
    company: "SaaS & LegalTech Agency",
    role: "Full-Stack Developer",
    period: "2022 – 2023",
    description:
      "Delivered end-to-end web applications for SaaS analytics and legal-tech clients. Built real-time collaboration with Socket.io, designed RESTful API architectures, and led a database migration from MongoDB to PostgreSQL reducing query times by 65%.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "PostgreSQL", "Express"],
  },
  {
    company: "Digital Product Agency",
    role: "Junior Full-Stack Developer",
    period: "2021 – 2022",
    description:
      "Built HRMS and employee management systems from the ground up. Gained hands-on production experience with React, Node.js, relational database design, and role-based access control.",
    tags: ["React", "JavaScript", "Node.js", "Express", "MySQL"],
  },
];

export const certifications: Certification[] = [
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    year: "2023",
  },
  {
    name: "MongoDB Associate Developer",
    issuer: "MongoDB University",
    year: "2022",
  },
  {
    name: "React – The Complete Guide",
    issuer: "Udemy",
    year: "2021",
  },
  {
    name: "Node.js, Express, MongoDB & More",
    issuer: "Udemy",
    year: "2021",
  },
];
