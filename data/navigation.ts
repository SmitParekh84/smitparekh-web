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
          {
            href: "/free-tools/image-to-base64",
            label: "Image to Base64",
            description: "Convert images to data URLs instantly",
          },
          {
            href: "/free-tools/favicon-generator",
            label: "Favicon Generator",
            description: "Generate favicons in every size from text or image",
          },
        ],
      },
      {
        title: "Content & SEO",
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
          {
            href: "/free-tools/slug-generator",
            label: "Slug Generator",
            description: "Convert any text into clean SEO-friendly URL slugs",
          },
          {
            href: "/free-tools/lorem-ipsum",
            label: "Lorem Ipsum Generator",
            description: "Generate placeholder paragraphs, sentences or words",
          },
        ],
      },
      {
        title: "Developer Tools",
        items: [
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
          {
            href: "/free-tools/url-encoder-decoder",
            label: "URL Encoder / Decoder",
            description: "Encode and decode URL components safely",
          },
          {
            href: "/free-tools/regex-tester",
            label: "Regex Tester",
            description: "Test and debug regular expressions live",
          },
          {
            href: "/free-tools/hash-generator",
            label: "Hash Generator",
            description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes",
          },
          {
            href: "/free-tools/sql-formatter",
            label: "SQL Formatter",
            description: "Beautify and minify SQL queries instantly",
          },
          {
            href: "/free-tools/uuid-generator",
            label: "UUID Generator",
            description: "Generate UUID v4 and v7 in bulk",
          },
          {
            href: "/free-tools/jwt-decoder",
            label: "JWT Decoder",
            description: "Decode and inspect JWT tokens client-side",
          },
          {
            href: "/free-tools/css-gradient-generator",
            label: "CSS Gradient Generator",
            description: "Build linear, radial and conic gradients visually",
          },
          {
            href: "/free-tools/color-converter",
            label: "Color Converter",
            description: "Convert between HEX, RGB, HSL, OKLCH instantly",
          },
        ],
      },
      {
        title: "Productivity & Career",
        items: [
          {
            href: "/free-tools/ats-resume-checker",
            label: "ATS Resume Checker",
            description: "Check your ATS score and get AI-powered resume tips",
          },
          {
            href: "/free-tools/qr-code-generator",
            label: "QR Code Generator",
            description: "Generate custom QR codes for any link",
          },
          {
            href: "/free-tools/password-generator",
            label: "Password Generator",
            description: "Generate strong, secure, random passwords instantly",
          },
          {
            href: "/free-tools/pomodoro-timer",
            label: "Pomodoro Timer",
            description: "Stay focused with customizable work/break cycles",
          },
          {
            href: "/free-tools/world-clock",
            label: "World Clock",
            description: "Track multiple time zones at a glance",
          },
          {
            href: "/free-tools/unit-converter",
            label: "Unit Converter",
            description: "Convert length, weight, temperature, data and more",
          },
          {
            href: "/free-tools/markdown-editor",
            label: "Markdown Editor",
            description: "Live preview Markdown with side-by-side editor",
          },
          {
            href: "/free-tools/cron-builder",
            label: "Cron Expression Builder",
            description: "Build and explain cron schedules visually",
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
  {
    href: "/services",
    label: "Services",
    dropdown: [
      {
        title: "Development",
        items: [
          {
            href: "/services/web-development",
            label: "Web Development",
            description: "End-to-end Next.js + Node.js builds, MVP to scale",
          },
          {
            href: "/services/frontend-development",
            label: "Frontend Development",
            description: "React, Next.js, design systems & 95+ Lighthouse",
          },
          {
            href: "/services/backend-development",
            label: "Backend Development",
            description: "Node.js, NestJS, PostgreSQL, Redis & AWS",
          },
          {
            href: "/services/api-development",
            label: "API Development",
            description: "REST & GraphQL APIs with auth, rate limits, webhooks",
          },
          {
            href: "/services/saas-development",
            label: "SaaS Development",
            description: "Multi-tenant apps with Stripe billing & RBAC",
          },
          {
            href: "/services/ecommerce-development",
            label: "E-commerce Development",
            description: "Headless Shopify or custom commerce on Next.js",
          },
        ],
      },
      {
        title: "Marketing & SEO",
        items: [
          {
            href: "/services/seo",
            label: "SEO Services",
            description: "Developer-led on-page, technical & content SEO",
          },
          {
            href: "/services/technical-seo",
            label: "Technical SEO",
            description: "Core Web Vitals, schema & JavaScript rendering",
          },
          {
            href: "/services/local-seo",
            label: "Local SEO",
            description: "Google Business Profile, citations & reviews",
          },
          {
            href: "/services/seo-audit",
            label: "SEO Audit",
            description: "Severity-ranked report delivered in 5 business days",
          },
        ],
      },
      {
        title: "Products & Specialized",
        items: [
          {
            href: "/blog-api",
            label: "Blog API",
            description: "Hosted headless blog API for any project",
          },
          {
            href: "/services/ai-integration",
            label: "AI Integration",
            description: "OpenAI, Claude, RAG & evals in production",
          },
          {
            href: "/for-students",
            label: "For Students",
            description: "Budget-friendly projects & hackathon help",
          },
        ],
      },
      {
        title: "Browse",
        items: [
          {
            href: "/services",
            label: "All Services",
            description: "Full overview of every service & engagement model",
          },
          {
            href: "/hire-me",
            label: "Hire Me",
            description: "Availability, rates & how engagements work",
          },
          {
            href: "/portfolio",
            label: "Case Studies",
            description: "See past projects, tech stacks & outcomes",
          },
        ],
      },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/hire-me", label: "Hire Me" },
  { href: "/feedback", label: "Feedback" },
  { href: "/contact", label: "Contact" },
];

export const mobileNavItems: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/hire-me", label: "Hire Me" },
  { href: "/services", label: "Services" },
  { href: "/for-students", label: "For Students" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/free-tools", label: "Free Tools" },
  { href: "/feedback", label: "Feedback" },
  { href: "/contact", label: "Contact" },
];
