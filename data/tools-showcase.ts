export interface FeaturedTool {
  slug: string;
  title: string;
  description: string;
  iconName: string;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export const featuredTools: FeaturedTool[] = [
  {
    slug: "background-remover",
    title: "Background Remover",
    description: "Remove image backgrounds instantly with AI. No signup required.",
    iconName: "Eraser",
    category: "Image",
    isPopular: true,
  },
  {
    slug: "viral-linkedin-post-generator",
    title: "LinkedIn Post Generator",
    description: "Create viral LinkedIn posts with AI-powered hooks and formatting.",
    iconName: "PenLine",
    category: "Content",
    isPopular: true,
  },
  {
    slug: "ats-resume-checker",
    title: "ATS Resume Checker",
    description: "Get your ATS score and AI-powered resume improvement tips.",
    iconName: "FileText",
    category: "Career",
    isNew: true,
  },
  {
    slug: "meta-tag-checker",
    title: "Meta Tag Checker",
    description: "Analyse and optimise your website's meta tags for better SEO.",
    iconName: "Globe",
    category: "SEO",
  },
  {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    description: "Generate custom QR codes for any URL, text, or contact info.",
    iconName: "QrCode",
    category: "Dev",
  },
  {
    slug: "word-counter",
    title: "Word Counter",
    description: "Count words, characters, reading time & keyword density instantly.",
    iconName: "Hash",
    category: "Content",
  },
];
