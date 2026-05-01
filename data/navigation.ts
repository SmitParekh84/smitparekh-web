export interface NavLink {
  href: string;
  label: string;
}

export interface NavDropdownItem extends NavLink {
  description?: string;
}

export interface NavDropdownGroup {
  title: string;
  items: NavDropdownItem[];
}

export interface NavFeatured {
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface NavItem extends NavLink {
  dropdown?: NavDropdownGroup[];
  featured?: NavFeatured;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  {
    href: "/free-tools",
    label: "Free Tools",
    dropdown: [
      {
        title: "Image Tools",
        items: [
          {
            href: "/free-tools/background-remover",
            label: "Bg Remover",
            description: "Remove background from images instantly",
          },
          {
            href: "/free-tools/image-compressor",
            label: "Image Compressor",
            description: "Reduce image file size without losing quality",
          },
          {
            href: "/free-tools/image-converter",
            label: "Image Converter",
            description: "Convert between image formats easily",
          },
        ],
      },
      {
        title: "Content Tools",
        items: [
          {
            href: "/free-tools/viral-linkedin-post-generator",
            label: "LinkedIn Post Generator",
            description: "Create engaging LinkedIn posts",
          },
          {
            href: "/free-tools/linkedin-media-downloader",
            label: "LinkedIn Media Downloader",
            description: "Download videos and images from LinkedIn",
          },
          {
            href: "/free-tools/youtube-thumbnail-downloader",
            label: "YouTube Thumbnail Downloader",
            description: "Download any YouTube video thumbnail in HD",
          },
          {
            href: "/free-tools/meta-tag-checker",
            label: "Meta Tag Checker",
            description: "Analyze and optimize your website's meta tags",
          },
          {
            href: "/free-tools/seo-analyzer",
            label: "SEO Analyzer",
            description: "Check and improve your website's SEO",
          },
          {
            href: "/free-tools/word-counter",
            label: "Word Counter",
            description: "Count words, characters, reading time & keyword density",
          },
        ],
      },
      {
        title: "Career & Dev Tools",
        items: [
          {
            href: "/free-tools/qr-code-generator",
            label: "QR Code Generator",
            description: "Generate custom QR codes for any link",
          },
          {
            href: "/free-tools/ats-resume-checker",
            label: "ATS Resume Checker",
            description: "Check your ATS score and get AI-powered resume tips",
          },
          {
            href: "/free-tools/password-generator",
            label: "Password Generator",
            description: "Generate strong, secure, random passwords instantly",
          },
          {
            href: "/free-tools/json-formatter",
            label: "JSON Formatter",
            description: "Beautify, minify and validate JSON instantly",
          },
          {
            href: "/free-tools/base64-encoder-decoder",
            label: "Base64 Encoder / Decoder",
            description: "Encode and decode Base64 strings and files",
          },
        ],
      },
    ],
    featured: {
      title: "Try Our Most Popular Tool",
      description: "Remove image backgrounds in seconds with our AI-powered tool",
      href: "/free-tools/background-remover",
      cta: "Try Background Remover",
    },
  },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/hire-me", label: "Hire Me" },
  { href: "/contact", label: "Contact" },
];

export const mobileNavItems: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/hire-me", label: "Hire Me" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/free-tools", label: "Free Tools" },
  { href: "/contact", label: "Contact" },
];
