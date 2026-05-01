export type SocialPlatform = "instagram" | "email" | "linkedin" | "github";

export interface FooterLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  platform: SocialPlatform;
  label: string;
}

export interface FooterData {
  title: string;
  subtitle: string;
  pageLinks: FooterLink[];
  toolLinks: FooterLink[];
  socialLinks: SocialLink[];
  copyright: string;
  legalLinks: FooterLink[];
}

export const footerData: FooterData = {
  title: "Smit Parekh",
  subtitle: "Full Stack Developer & Marketing Manager",
  pageLinks: [
    { href: "/hire-me", label: "Hire Me" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/free-tools", label: "Free Tools" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Me" },
  ],
  toolLinks: [
    { href: "/free-tools/background-remover", label: "Bg Remover" },
    {
      href: "/free-tools/viral-linkedin-post-generator",
      label: "LinkedIn Post Generator",
    },
    {
      href: "/free-tools/linkedin-media-downloader",
      label: "LinkedIn Media Downloader",
    },
    { href: "/free-tools/qr-code-generator", label: "QR Code Generator" },
  ],
  socialLinks: [
    {
      href: "https://www.instagram.com/smit_8_4/",
      platform: "instagram",
      label: "Instagram",
    },
    {
      href: "mailto:smitparekh02@gmail.com",
      platform: "email",
      label: "Email",
    },
    {
      href: "https://www.linkedin.com/in/smitparekh84",
      platform: "linkedin",
      label: "LinkedIn",
    },
    {
      href: "https://github.com/SmitParekh84",
      platform: "github",
      label: "GitHub",
    },
  ],
  copyright: "© Smit Parekh. All rights reserved.",
  legalLinks: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};
