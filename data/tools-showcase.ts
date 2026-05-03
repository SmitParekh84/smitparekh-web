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
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    description: "Beautify, minify, and validate JSON with instant syntax error detection.",
    iconName: "Braces",
    category: "Dev",
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    description: "Test regex live with highlighted matches, groups, and replace mode.",
    iconName: "Regex",
    category: "Dev",
    isNew: true,
  },
  {
    slug: "hash-generator",
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes instantly.",
    iconName: "Fingerprint",
    category: "Security",
    isNew: true,
  },
  {
    slug: "color-converter",
    title: "Color Converter",
    description: "Convert HEX, RGB, HSL with live preview and alpha channel support.",
    iconName: "Palette",
    category: "Dev",
    isNew: true,
  },
  {
    slug: "url-encoder-decoder",
    title: "URL Encoder & Decoder",
    description: "Percent-encode and decode URLs and query strings — component or full URL.",
    iconName: "Link",
    category: "Dev",
    isNew: true,
  },
  {
    slug: "pomodoro-timer",
    title: "Pomodoro Timer",
    description: "Free focus timer with work/break cycles, browser notifications, and round tracking.",
    iconName: "Timer",
    category: "Productivity",
    isNew: true,
  },
  {
    slug: "world-clock",
    title: "World Clock",
    description: "Compare live time across multiple timezones — perfect for distributed teams.",
    iconName: "Clock",
    category: "Productivity",
    isNew: true,
  },
  {
    slug: "unit-converter",
    title: "Unit Converter",
    description: "Convert length, weight, temperature, area, volume, speed, time, and data sizes.",
    iconName: "Calculator",
    category: "Productivity",
    isNew: true,
  },
  {
    slug: "markdown-editor",
    title: "Markdown Editor",
    description: "Live preview Markdown editor with HTML export and .md download.",
    iconName: "FileEdit",
    category: "Content",
    isNew: true,
  },
  {
    slug: "cron-builder",
    title: "Cron Builder",
    description: "Build and test cron expressions with human-readable schedule + next 5 runs.",
    iconName: "CalendarClock",
    category: "Dev",
    isNew: true,
  },
  {
    slug: "lorem-ipsum",
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text by paragraphs, sentences, words, or exact bytes.",
    iconName: "Type",
    category: "Content",
    isNew: true,
  },
];
