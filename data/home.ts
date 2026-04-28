export interface HomeData {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  socialLinks: Array<{
    href: string;
    label: string;
    platform: "email" | "linkedin" | "github" | "x";
  }>;
}

export const homeData: HomeData = {
  title: "Hi, I'm Smit Parekh",
  subtitle: "Full-Stack Web Development for Startups & Growing Businesses",
  description:
    "I build fast, scalable web applications that drive real business results - from early-stage MVPs to enterprise platforms handling thousands of daily users. React · Node.js · TypeScript · AWS.",
  imageSrc: "/images/Smit-Parekh-Home.png",
  socialLinks: [
    {
      href: "mailto:smitparekh02@gmail.com",
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
  ],
};

export const aboutStats = {
  years: "4+",
  certifications: "4+",
  companies: "4+",
};

export const cvLink = "https://www.smitparekh.co.in/Smit-parekh.pdf";
