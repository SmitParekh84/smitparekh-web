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

export interface NavSubCategory {
  title: string;
  href?: string;
  items: NavDropdownItem[];
}

export interface NavCategory {
  title: string;
  href?: string;
  subCategories: NavSubCategory[];
}

export interface NavItem extends NavLink {
  dropdown?: NavDropdownGroup[];
  categories?: NavCategory[];
  featured?: NavFeatured;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Case Study" },
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
    categories: [
      {
        title: "Development",
        href: "/services/development",
        subCategories: [
          {
            title: "Web & E-commerce",
            href: "/services/web-ecommerce",
            items: [
              {
                href: "/services/mvp-development",
                label: "MVP Development",
                description: "Idea to live product in 4-8 weeks, fixed price",
              },
              {
                href: "/services/web-development",
                label: "Web Development",
                description: "End-to-end Next.js + Node.js builds, MVP to scale",
              },
              {
                href: "/services/landing-page-development",
                label: "Landing Pages",
                description: "High-converting pages, 95+ Lighthouse, 48h delivery",
              },
              {
                href: "/services/saas-development",
                label: "SaaS Development",
                description: "Multi-tenant apps with Stripe billing & RBAC",
              },
              {
                href: "/services/wordpress-development",
                label: "WordPress Development",
                description: "Custom themes, WooCommerce & headless WP + Next.js",
              },
              {
                href: "/services/shopify-development",
                label: "Shopify Development",
                description: "Headless Next.js storefront on Shopify backend",
              },
              {
                href: "/services/ecommerce-development",
                label: "E-commerce Development",
                description: "Custom commerce on Next.js, any backend",
              },
            ],
          },
          {
            title: "Frontend & Performance",
            href: "/services/frontend-performance",
            items: [
              {
                href: "/services/nextjs-development",
                label: "Next.js Development",
                description: "App Router, RSC, TypeScript, 95+ Lighthouse",
              },
              {
                href: "/services/react-development",
                label: "React Development",
                description: "SPAs, dashboards & component libraries",
              },
              {
                href: "/services/frontend-development",
                label: "Frontend Development",
                description: "React, Next.js, design systems & accessibility",
              },
              {
                href: "/services/performance-optimization",
                label: "Performance Optimization",
                description: "Core Web Vitals, 95+ Lighthouse, bundle cuts",
              },
            ],
          },
          {
            title: "Backend & APIs",
            href: "/services/backend-apis",
            items: [
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
                href: "/services/devops-consulting",
                label: "DevOps & Cloud",
                description: "CI/CD, Docker, AWS architecture & zero-downtime deploys",
              },
            ],
          },
          {
            title: "Mobile, Care & Redesign",
            href: "/services/mobile-care",
            items: [
              {
                href: "/services/mobile-app-development",
                label: "Mobile App Development",
                description: "React Native + Expo - iOS & Android from one codebase",
              },
              {
                href: "/services/website-redesign",
                label: "Website Redesign",
                description: "Modernise & replatform without losing SEO",
              },
              {
                href: "/services/website-maintenance",
                label: "Website Maintenance",
                description: "Updates, security, speed & support on retainer",
              },
            ],
          },
        ],
      },
      {
        title: "Marketing & SEO",
        href: "/services/marketing-and-seo",
        subCategories: [
          {
            title: "SEO Services",
            href: "/services/seo-services",
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
                href: "/services/on-page-seo",
                label: "On-Page SEO",
                description: "Title tags, headings, internal links & content optimisation",
              },
              {
                href: "/services/seo-audit",
                label: "SEO Audit",
                description: "Severity-ranked report in 5 business days",
              },
            ],
          },
          {
            title: "AI Search & Growth",
            href: "/services/ai-growth",
            items: [
              {
                href: "/services/aeo-optimization",
                label: "AEO Optimization",
                description: "Get cited in ChatGPT, Perplexity, Claude & Gemini",
              },
              {
                href: "/services/geo-optimization",
                label: "GEO Optimization",
                description: "Rank in Google AI Overviews & Bing Copilot",
              },
              {
                href: "/services/content-seo",
                label: "Content SEO",
                description: "Content that ranks, converts & gets quoted",
              },
              {
                href: "/services/conversion-rate-optimization",
                label: "Conversion Optimization",
                description: "Funnel analysis, A/B testing & friction removal",
              },
            ],
          },
        ],
      },
      {
        title: "Products & AI",
        href: "/services/products-and-ai",
        subCategories: [
          {
            title: "AI Engineering",
            href: "/services/ai-engineering",
            items: [
              {
                href: "/services/ai-integration",
                label: "AI Integration",
                description: "OpenAI, Claude, RAG & evals in production",
              },
              {
                href: "/services/ai-agent-development",
                label: "AI Agents",
                description: "Tool-using autonomous agents with guardrails",
              },
              {
                href: "/services/ai-chatbot-development",
                label: "AI Chatbots",
                description: "RAG assistants grounded in your docs, with citations",
              },
              {
                href: "/full-stack-ai-developer",
                label: "Full-Stack AI Developer",
                description: "Ship apps with AI built in - one engineer, full stack",
              },
            ],
          },
          {
            title: "Products & Programs",
            href: "/services/products-programs",
            items: [
              {
                href: "/blog-api",
                label: "Blog API",
                description: "Hosted headless blog API for any project",
              },
              {
                href: "/for-students",
                label: "For Students",
                description: "Budget-friendly projects & hackathon help",
              },
            ],
          },
        ],
      },
      {
        title: "Hire a Developer",
        href: "/hire-developer",
        subCategories: [
          {
            title: "Gulf / GCC",
            href: "/hire-developer",
            items: [
              {
                href: "/hire-developer/uae",
                label: "United Arab Emirates",
                description: "Hire a developer in Dubai, Abu Dhabi & UAE",
              },
              {
                href: "/hire-developer/saudi-arabia",
                label: "Saudi Arabia",
                description: "Hire a developer in Riyadh, Jeddah & KSA",
              },
              {
                href: "/hire-developer/qatar",
                label: "Qatar",
                description: "Hire a developer in Doha & Qatar",
              },
              {
                href: "/hire-developer/kuwait",
                label: "Kuwait",
                description: "Hire a developer in Kuwait City",
              },
              {
                href: "/hire-developer/bahrain",
                label: "Bahrain",
                description: "Hire a developer in Manama & Bahrain",
              },
              {
                href: "/hire-developer/oman",
                label: "Oman",
                description: "Hire a developer in Muscat & Oman",
              },
            ],
          },
          {
            title: "US, UK & India",
            href: "/hire-developer",
            items: [
              {
                href: "/hire-developer/usa",
                label: "United States",
                description: "Hire a full-stack developer for US-based companies",
              },
              {
                href: "/hire-developer/uk",
                label: "United Kingdom",
                description: "Hire a full-stack developer for UK-based companies",
              },
              {
                href: "/hire-developer/india",
                label: "India",
                description: "Hire a full-stack developer based in India",
              },
              {
                href: "/hire-developer",
                label: "All Regions",
                description: "Full overview of all hire-a-developer pages",
              },
            ],
          },
        ],
      },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/hire-me", label: "Hire Me" },
  { href: "/contact", label: "Contact" },
];

export const mobileNavItems: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/hire-me", label: "Hire Me" },
  { href: "/hire-developer", label: "Gulf / GCC Clients" },
  { href: "/services", label: "Services" },
  { href: "/for-students", label: "For Students" },
  { href: "/portfolio", label: "Case Study" },
  { href: "/blog", label: "Blog" },
  { href: "/guides", label: "Guides" },
  { href: "/blog-api", label: "Blog API" },
  { href: "/free-tools", label: "Free Tools" },
  { href: "/contact", label: "Contact" },
];
