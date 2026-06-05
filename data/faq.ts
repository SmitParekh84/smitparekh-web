export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "How much does it cost to hire a full-stack developer in India?",
    answer:
      "Rates for a senior full-stack developer in India typically range from $25–$60 per hour on the global freelance market, or ₹1.5L–₹4L per month for contract roles. Fixed-scope projects (MVP, redesign, feature build) are quoted per deliverable. Smit Parekh offers competitive rates for production-quality React, Next.js, and Node.js work — contact for a tailored estimate.",
  },
  {
    question: "How long does it take to build a SaaS MVP?",
    answer:
      "A focused SaaS MVP — one core workflow, auth, and a basic dashboard — takes 4–8 weeks with a single senior developer. Timeline depends on scope: a FinTech transaction platform or multi-tenant system will be 8–16 weeks. Smit has shipped MVPs in as little as 3 weeks for well-scoped products using Next.js, Node.js, and PostgreSQL.",
  },
  {
    question: "What is the difference between hiring a freelance developer and using a development agency?",
    answer:
      "A freelance developer is a single senior engineer who owns the full project — no account managers, no juniors, no handoff overhead. You get direct communication, faster iteration, and lower cost. An agency adds process, guarantees team continuity, and scales up for larger projects. For a 1–6 month product build, a senior freelancer like Smit Parekh typically delivers faster and cheaper with higher code quality than a comparable agency engagement.",
  },
  {
    question: "What tech stack is best for building a production web application in 2025?",
    answer:
      "For most production web applications in 2025 the recommended stack is: Next.js (App Router) for the frontend and server-side rendering, Node.js with TypeScript for the backend API, PostgreSQL for the database, AWS or Vercel for deployment, and Docker for containerisation. This stack powers everything from indie SaaS to enterprise FinTech platforms and is the primary stack Smit Parekh uses across all client projects.",
  },
  {
    question: "What should I look for when hiring a Next.js or React developer?",
    answer:
      "Look for: proven production deployments (not just side projects), TypeScript usage as a default, familiarity with server components and App Router in Next.js 14+, an understanding of performance (Core Web Vitals, Lighthouse), and experience integrating real backends (REST or GraphQL APIs, auth, databases). Ask to see past project code or GitHub. Smit Parekh has shipped 20+ production React and Next.js apps — view his portfolio for examples.",
  },
  {
    question: "Do you work with international clients and which time zones?",
    answer:
      "Yes — clients across the US, UK, Canada, UAE, and Australia. Based in India (IST, UTC+5:30), which overlaps with EU mornings and US East Coast evenings. Async-first by default with daily updates; sync calls are scheduled to fit the client's working hours. No geographic barrier to collaboration.",
  },
  {
    question: "What happens to files uploaded to the free tools?",
    answer:
      "Files are processed in memory and deleted immediately after the result is returned. Nothing is stored on the server. No account required, no data retained — privacy is a core design principle of every tool on this site.",
  },
];
