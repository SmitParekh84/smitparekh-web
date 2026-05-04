export interface HomeData {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  socialLinks: Array<{
    href: string;
    label: string;
    platform: "email" | "linkedin" | "github" | "x" | "upwork" | "marketixpert";
  }>;
}

export const homeData: HomeData = {
  title: "Hi, I'm Smit Parekh",
  subtitle: "I Ship Production-Ready Web Apps — On Time, Every Time",
  description:
    "From scoped requirements to live, monitored deployment — I own the full stack so you never juggle multiple vendors. 30+ products shipped across FinTech, SaaS, and e-commerce. React · Node.js · TypeScript · AWS.",
  imageSrc: "/images/Smit-Parekh-Home.png",
  socialLinks: [
    {
      href: "mailto:smitparekh03@gmail.com",
      label: "Send email",
      platform: "email",
    },
    {
      href: "https://www.linkedin.com/in/smitparekh84/",
      label: "LinkedIn profile",
      platform: "linkedin",
    },
    {
      href: "https://github.com/SmitParekh84",
      label: "GitHub profile",
      platform: "github",
    },
    {
      href: "https://x.com/smit_parekh84",
      label: "X profile",
      platform: "x",
    },
    {
      href: "https://www.upwork.com/freelancers/~018877bbeb80ff2d25",
      label: "Upwork profile",
      platform: "upwork",
    },
    {
      href: "https://www.marketixpert.com",
      label: "Marketixpert - my agency website",
      platform: "marketixpert",
    },
  ],
};

export const aboutStats = {
  years: "4+",
  certifications: "4+",
  companies: "15+",
};

export const cvLink = "https://www.smitparekh.co.in/Smit-parekh.pdf";
