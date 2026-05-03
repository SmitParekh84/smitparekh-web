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
    version: "1.6.0",
    codename: "Cleaner Free Tools Menu",
    date: "2026-05-03",
    summary:
      "We simplified the Free Tools menu so the eight tools visitors use most are front and center — and the full library of 31 tools is still just one click away.",
    highlights: [
      "Curated 8-tool quick menu in the navbar",
      "One-click access to the full 31-tool library",
      "Faster, distraction-free navigation on every page",
    ],
    changes: [
      {
        tag: "improved",
        title: "Redesigned Free Tools dropdown",
        description:
          "Replaced the dense, four-column menu with a clean two-column layout that highlights the most popular tools first. A clear link still takes you to the full catalog whenever you need it.",
        href: "/free-tools",
      },
      {
        tag: "performance",
        title: "Faster navigation, no flicker",
        description:
          "The menu now loads instantly on every page, even on slower connections — no spinners, no layout shift.",
      },
    ],
  },
  {
    version: "1.5.0",
    codename: "Developer Toolkit",
    date: "2026-05-03",
    summary:
      "Seven new developer-focused tools, a refreshed Free Tools menu, and a dashboard that automatically reflects every tool we ship.",
    highlights: [
      "7 new free developer tools",
      "Refreshed, easier-to-scan tools menu",
      "Your dashboard stays in sync with every new tool",
    ],
    changes: [
      {
        tag: "new",
        title: "JWT Decoder",
        description:
          "Decode JSON Web Tokens, inspect headers, payload, and expiry. Your token never leaves your browser.",
        href: "/free-tools/jwt-decoder",
      },
      {
        tag: "new",
        title: "SQL Formatter",
        description:
          "Beautify, indent, and minify SQL queries instantly. Recognizes multi-word keywords like LEFT JOIN and GROUP BY.",
        href: "/free-tools/sql-formatter",
      },
      {
        tag: "new",
        title: "Image to Base64 Converter",
        description:
          "Drag and drop any image to get a clean data URL, raw Base64, or a ready-to-paste image tag.",
        href: "/free-tools/image-to-base64",
      },
      {
        tag: "new",
        title: "CSS Gradient Generator",
        description:
          "Visually build linear, radial, and conic gradients with multi-stop color control. Copy ready-to-use CSS or Tailwind classes.",
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
          "Generate up to 1,000 industry-standard unique IDs at a time, including the new time-ordered v7 format.",
        href: "/free-tools/uuid-generator",
      },
      {
        tag: "improved",
        title: "Refreshed Free Tools menu",
        description:
          "The navbar now groups tools into Image, Content & SEO, Developer, and Productivity & Career so you can find what you need at a glance.",
      },
    ],
  },
  {
    version: "1.4.0",
    codename: "Productivity Pack",
    date: "2026-05-03",
    summary:
      "Twelve new everyday productivity and developer utilities — all 100% free, no sign-up required for the basics.",
    highlights: [
      "Pomodoro timer, world clock, and unit converter",
      "JSON, regex, hash, and color tools",
      "Markdown editor, cron builder, and lorem ipsum",
    ],
    changes: [
      {
        tag: "new",
        title: "Pomodoro Timer",
        description:
          "Stay focused with customizable work and break intervals. Includes desktop notifications and session history.",
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
          "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text or file. Your data never leaves your browser.",
        href: "/free-tools/hash-generator",
      },
      {
        tag: "new",
        title: "Color Converter",
        description: "Convert between HEX, RGB, HSL, and OKLCH color spaces with live previews.",
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
      "Free accounts arrive, alongside a transparent quota system, polished email notifications, and a brand-new public feedback page.",
    highlights: [
      "Sign in with Google to unlock higher limits",
      "Personal dashboard with your usage history",
      "Polished welcome and confirmation emails",
    ],
    changes: [
      {
        tag: "new",
        title: "Google sign-in and personal dashboard",
        description:
          "Sign in with Google to track your tool usage, manage saved reports, and unlock higher daily quotas.",
        href: "/login",
      },
      {
        tag: "new",
        title: "Generous free quotas, higher when you sign in",
        description:
          "Guests get a generous free allowance out of the box. Signed-in users get even more — with full transparency on what's left.",
      },
      {
        tag: "new",
        title: "Public feedback page",
        description:
          "Share feedback, bug reports, or feature ideas straight from the site. Every message lands in our inbox within minutes.",
        href: "/feedback",
      },
      {
        tag: "improved",
        title: "Polished welcome and notification emails",
        description:
          "Welcome, contact, and feedback emails now use clean, on-brand templates that arrive in your inbox in seconds.",
      },
      {
        tag: "improved",
        title: "ATS Resume Checker, two-step flow",
        description:
          "A cleaner, step-by-step experience with clearer scoring and AI-powered suggestions tailored to each section.",
        href: "/free-tools/ats-resume-checker",
      },
      {
        tag: "improved",
        title: "Self-service account deletion",
        description:
          "Delete your account at any time from Settings. We honor deletions immediately and remove your personal data — fully GDPR and CCPA aligned.",
      },
      {
        tag: "improved",
        title: "Profile picture upload",
        description: "Upload a profile picture from your account settings in seconds.",
      },
      {
        tag: "security",
        title: "Hardened privacy controls",
        description:
          "Tightened how environment variables are handled so sensitive identifiers never reach the browser.",
      },
    ],
  },
  {
    version: "1.2.0",
    codename: "Content Engine",
    date: "2026-05-01",
    summary:
      "An AI-assisted blogging workflow, an upgraded SEO Analyzer with shareable PDF reports, and a friendlier hire-me experience.",
    highlights: [
      "AI-assisted blog drafting",
      "Shareable PDF SEO reports",
      "LinkedIn-ready articles from any blog or project",
    ],
    changes: [
      {
        tag: "new",
        title: "AI blog draft generator",
        description:
          "Generate a full blog draft, including outline and SEO meta, from a single topic prompt.",
      },
      {
        tag: "new",
        title: "SEO Analyzer with PDF reports",
        description:
          "Run a full SEO audit on any URL and download a polished, white-label PDF report — ready to share with clients.",
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
          "Detailed offerings, tech stack, availability, and a simple, two-click way to start a project.",
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
        title: "Mobile-friendly tables",
        description: "Wide tables in articles now scroll horizontally on mobile instead of breaking the layout.",
      },
    ],
  },
  {
    version: "1.1.0",
    codename: "Foundations",
    date: "2026-04-29",
    summary:
      "The core portfolio, the first wave of free tools, and a polished foundation built for fast, reliable performance worldwide.",
    highlights: [
      "Portfolio with detailed project case studies",
      "First batch of free tools live",
      "Privacy-respecting analytics across the site",
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
        title: "Resume view tracking",
        description:
          "See when your public resume gets viewed and downloaded, so you can have sharper, data-driven hiring conversations.",
      },
      {
        tag: "improved",
        title: "Privacy-respecting analytics",
        description: "Lightweight analytics across tools, blog reads, and resume downloads — with full respect for visitor privacy.",
      },
      {
        tag: "performance",
        title: "Built for global speed",
        description:
          "A modern, edge-optimized foundation delivers fast first paint and smooth navigation everywhere — North America, Europe, and beyond.",
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
