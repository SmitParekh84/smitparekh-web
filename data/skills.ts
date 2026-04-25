export interface Skill {
  name: string;
  percentage: number;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  iconName: "Monitor" | "Code2" | "Database" | "Cloud";
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    subtitle: "3.5+ years",
    iconName: "Monitor",
    skills: [
      { name: "React.js", percentage: 92 },
      { name: "TypeScript", percentage: 85 },
      { name: "JavaScript (ES6+)", percentage: 90 },
      { name: "Next.js", percentage: 82 },
      { name: "Redux / Redux Toolkit", percentage: 85 },
      { name: "Tailwind CSS", percentage: 83 },
    ],
  },
  {
    title: "Backend",
    subtitle: "3.5+ years",
    iconName: "Code2",
    skills: [
      { name: "Node.js", percentage: 88 },
      { name: "Express.js", percentage: 87 },
      { name: "RESTful API Design", percentage: 90 },
      { name: "NestJS", percentage: 72 },
      { name: "Socket.io", percentage: 75 },
    ],
  },
  {
    title: "Databases",
    subtitle: "Advanced",
    iconName: "Database",
    skills: [
      { name: "PostgreSQL", percentage: 87 },
      { name: "SQL Query Optimisation", percentage: 83 },
      { name: "MongoDB", percentage: 76 },
      { name: "Database Design", percentage: 82 },
    ],
  },
  {
    title: "Cloud & DevOps",
    subtitle: "Hands-on",
    iconName: "Cloud",
    skills: [
      { name: "AWS (EC2, S3, Lambda, RDS)", percentage: 74 },
      { name: "Docker", percentage: 77 },
      { name: "CI/CD Pipelines", percentage: 72 },
      { name: "Git / GitHub / GitLab", percentage: 88 },
    ],
  },
];
