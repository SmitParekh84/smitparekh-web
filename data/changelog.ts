export type ChangelogTag = "new" | "improved" | "fixed" | "security" | "performance";

export interface ChangelogChange {
  tag: ChangelogTag;
  title: string;
  description?: string;
  href?: string;
}

export interface ChangelogRelease {
  version: string;
  codename: string;
  date: string; // ISO yyyy-mm-dd
  summary: string;
  highlights: string[];
  changes: ChangelogChange[];
}

export const changelog: ChangelogRelease[] = [
  {
    version: "1.5.0",
    codename: "Developer Toolkit",
    date: "2026-05-03",
    summary:
      "Seven new client-side developer tools, a redesigned Free Tools menu, and a fully synced admin and user dashboard.",
    highlights: [
      "7 new free developer tools",
      "Smarter, four-column tools menu",
      "Admin and user dashboards now reflect every tool automatically",
    ],
    changes: [
      {
        tag: "new",
        title: "JWT Decoder",
        description:
          "Decode JSON Web Tokens in your browser, inspect headers, payloads, and expiry status without sending the token anywhere.",
        href: "/free-tools/jwt-decoder",
      },
      {
        tag: "new",
        title: "SQL Formatter",
        description:
          "Beautify, indent, and minify SQL queries instantly. Supports multi-word keywords like LEFT JOIN and GROUP BY.",
        href: "/free-tools/sql-formatter",
      },
      {
        tag: "new",
        title: "Image to Base64 Converter",
        description:
          "Drag and drop any image to get a clean data URL, raw Base64, or ready-to-paste img tag.",
        href: "/free-tools/image-to-base64",
      },
      {
        tag: "new",
        title: "CSS Gradient Generator",
        description:
          "Visually build linear, radial, and conic gradients with multi-stop colour control. Copy ready-to-use CSS or Tailwind classes.",
        href: "/free-tools/css-gradient-generator",
      },
      {
        tag: "new",
        title: "Slug Generator",
        description:
          "Turn any text into clean, SEO-friendly URL slugs. Bulk mode, accent stripping, and stop-word removal included.",
        href: "/free-tools/slug-generator",
      },
      {
        tag: "new",
        title: "Favicon Generator",
        description:
          "Generate favicons in every modern size from text, an emoji, or your own image. Download all sizes in one click.",
        href: "/free-tools/favicon-generator",
      },
      {
        tag: "new",
        title: "UUID Generator (v4 and v7)",
        description:
          "Generate up to 1,000 RFC-compliant UUIDs at a time. Supports the new time-ordered UUID v7 standard.",
        href: "/free-tools/uuid-generator",
      },
      {
        tag: "improved",
        title: "Redesigned Free Tools menu",
        description:
          "The navbar dropdown now shows all 31 tools, grouped into Image, Content & SEO, Developer, and Productivity & Career.",
      },
      {
        tag: "improved",
        title: "Admin tools dashboard now lists every tool",
        description:
          "New tools automatically appear in the admin overview, category filter, and the user dashboard with no extra setup.",
      },
    ],
  },
  {
    version: "1.4.0",
    codename: "Productivity Pack",
    date: "2026-05-03",
    summary:
      "Twelve new everyday productivity and developer utilities — all 100% free, with no sign-up required for the basics.",
    highlights: [
      "Pomodoro timer, world clock, and unit converter",
      "JSON, regex, hash, and colour tools",
      "Markdown editor, cron builder, and lorem ipsum",
    ],
    changes: [
      {
        tag: "new",
        title: "Pomodoro Timer",
        description:
          "Stay focused with customisable work and break intervals. Includes desktop notifications and session history.",
        href: "/free-tools/pomodoro-timer",
      },
      {
        tag: "new",
        title: "World Clock",
        description: "Track multiple time zones at a glance — perfect for distributed teams.",
        href: "/free-tools/world-clock",
      },
      {
        tag: "new",
        title: "Unit Converter",
        description:
          "Convert length, weight, temperature, data sizes, and more between metric and imperial.",
        href: "/free-tools/unit-converter",
      },
      {
        tag: "new",
        title: "Markdown Editor",
        description:
          "Live side-by-side Markdown preview with syntax highlighting and one-click HTML export.",
        href: "/free-tools/markdown-editor",
      },
      {
        tag: "new",
        title: "Cron Expression Builder",
        description:
          "Build and explain cron schedules visually. No more guessing what `*/5 * * * 1-5` means.",
        href: "/free-tools/cron-builder",
      },
      {
        tag: "new",
        title: "Lorem Ipsum Generator",
        description: "Generate placeholder paragraphs, sentences, or words for any design mockup.",
        href: "/free-tools/lorem-ipsum",
      },
      {
        tag: "new",
        title: "JSON Formatter",
        description: "Beautify, minify, and validate JSON with line-level error reporting.",
        href: "/free-tools/json-formatter",
      },
      {
        tag: "new",
        title: "Regex Tester",
        description:
          "Test regular expressions live with capture-group inspection and common-pattern presets.",
        href: "/free-tools/regex-tester",
      },
      {
        tag: "new",
        title: "Hash Generator",
        description:
          "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text or file, fully client-side.",
        href: "/free-tools/hash-generator",
      },
      {
        tag: "new",
        title: "Colour Converter",
        description: "Convert between HEX, RGB, HSL, and OKLCH colour spaces with live previews.",
        href: "/free-tools/color-converter",
      },
      {
        tag: "new",
        title: "URL Encoder / Decoder",
        description: "Encode and decode URL components safely without losing reserved characters.",
        href: "/free-tools/url-encoder-decoder",
      },
      {
        tag: "new",
        title: "Base64 Encoder / Decoder",
        description: "Encode and decode Base64 text and files in your browser.",
        href: "/free-tools/base64-encoder-decoder",
      },
    ],
  },
  {
    version: "1.3.0",
    codename: "Accounts and Quotas",
    date: "2026-05-02",
    summary:
      "User accounts arrive, alongside a transparent quota system, transactional email, and a brand-new public feedback page.",
    highlights: [
      "Sign in with Google to unlock higher limits",
      "Personal dashboard with usage history",
      "Transactional email powered by Resend and React Email",
    ],
    changes: [
      {
        tag: "new",
        title: "Google sign-in and personal dashboard",
        description:
          "Sign in with Google to track your tool usage, manage saved reports, and get higher daily quotas.",
        href: "/login",
      },
      {
        tag: "new",
        title: "Hybrid IP and session quotas",
        description:
          "Guests get a generous free quota out of the box; signed-in users receive even higher limits with full transparency.",
      },
      {
        tag: "new",
        title: "Public feedback page",
        description:
          "Submit feedback, bug reports, or feature ideas directly from the site. Every message reaches us within minutes.",
        href: "/feedback",
      },
      {
        tag: "improved",
        title: "Branded transactional emails",
        description:
          "Welcome, contact, and feedback emails now use polished React Email templates and ship via Resend for fast, reliable delivery.",
      },
      {
        tag: "improved",
        title: "ATS Resume Checker, two-flow stepper",
        description:
          "Cleaner step-by-step UX with clearer scoring and AI-powered suggestions tailored to each section.",
        href: "/free-tools/ats-resume-checker",
      },
      {
        tag: "improved",
        title: "Self-service account deletion",
        description:
          "Delete your account at any time from Settings. We honour deletions immediately and remove all personal data.",
      },
      {
        tag: "improved",
        title: "Avatar upload",
        description: "Upload a profile picture from your account settings, hosted on Cloudinary.",
      },
      {
        tag: "security",
        title: "Removed admin email leak from the browser bundle",
        description:
          "Tightened environment variable handling so admin identifiers stay strictly server-side.",
      },
      {
        tag: "fixed",
        title: "Admin login redirect loop",
        description: "Admins are now redirected straight to the dashboard after sign-in.",
      },
    ],
  },
  {
    version: "1.2.0",
    codename: "Content Engine",
    date: "2026-05-01",
    summary:
      "An AI-assisted blogging workflow, an upgraded SEO Analyzer with PDF reports, and a friendlier hire-me experience.",
    highlights: [
      "AI blog drafting with Gemini",
      "PDF SEO reports you can email to clients",
      "LinkedIn article generator for blogs and projects",
    ],
    changes: [
      {
        tag: "new",
        title: "AI blog draft generator",
        description:
          "Spin up a full blog draft, including outline and SEO meta, from a single topic prompt — built on Gemini.",
      },
      {
        tag: "new",
        title: "SEO Analyzer with PDF reports",
        description:
          "Run a full SEO audit on any URL and download a polished PDF report ready to share with clients.",
        href: "/free-tools/seo-analyzer",
      },
      {
        tag: "new",
        title: "LinkedIn article generator",
        description:
          "Turn any blog post or case study into a ready-to-publish LinkedIn article in your own voice.",
      },
      {
        tag: "new",
        title: "Smart social share captions",
        description:
          "Generate LinkedIn, Twitter, and Instagram captions from any blog or project, with one-click copy.",
      },
      {
        tag: "new",
        title: "Hire Me page",
        description:
          "Detailed offerings, tech stack, availability, and a single click to book me on Upwork.",
        href: "/hire-me",
      },
      {
        tag: "new",
        title: "FAQ page",
        description:
          "A searchable FAQ covering general questions and per-tool details — written for real people, not crawlers.",
        href: "/faq",
      },
      {
        tag: "improved",
        title: "Mobile-friendly markdown tables",
        description: "Wide tables now scroll horizontally on mobile instead of breaking the layout.",
      },
    ],
  },
  {
    version: "1.1.0",
    codename: "Foundations",
    date: "2026-04-29",
    summary:
      "The core portfolio, the first wave of free tools, and a complete admin panel for managing content.",
    highlights: [
      "Portfolio with project case studies",
      "First free tools batch live",
      "Admin panel for blogs, projects, contacts, and users",
    ],
    changes: [
      {
        tag: "new",
        title: "Portfolio with case studies",
        description:
          "Browse projects with detailed case studies, tech stacks, screenshots, and outcomes.",
        href: "/portfolio",
      },
      {
        tag: "new",
        title: "Free tools, first batch",
        description:
          "Background Remover, Image Compressor, Image Converter, ATS Resume Checker, LinkedIn Post Generator, YouTube Thumbnail Downloader, Meta Tag Checker, Word Counter, QR Code Generator, and Password Generator.",
        href: "/free-tools",
      },
      {
        tag: "new",
        title: "Admin panel",
        description:
          "Full CRUD for blogs, projects, users, contacts, and feedback — secured with Supabase JWT and role-based access.",
      },
      {
        tag: "new",
        title: "Soft-delete for users, projects, and blogs",
        description:
          "Accidental deletes can now be restored from the admin Trash without restoring a backup.",
      },
      {
        tag: "new",
        title: "Resume PDF analytics",
        description:
          "Track downloads of the public resume PDF for sharper, data-driven hiring conversations.",
      },
      {
        tag: "improved",
        title: "Google Analytics and Tag Manager",
        description: "Privacy-respecting analytics for tools, blog reads, and resume downloads.",
      },
      {
        tag: "performance",
        title: "Edge-friendly Next.js 16 setup",
        description:
          "App Router, React 19, Turbopack, and Tailwind v4 deliver fast first-paint everywhere in the world.",
      },
    ],
  },
];

export function getLatestRelease(): ChangelogRelease | undefined {
  return changelog[0];
}

export function tagLabel(tag: ChangelogTag): string {
  switch (tag) {
    case "new":
      return "New";
    case "improved":
      return "Improved";
    case "fixed":
      return "Fixed";
    case "security":
      return "Security";
    case "performance":
      return "Performance";
  }
}
