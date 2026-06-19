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
    version: "1.10.0",
    codename: "Blog AI Studio",
    date: "2026-05-24",
    summary:
      "AI writing tools for Blog API tenants - generate full drafts from a prompt, get topic ideas tuned to your niche and audience, and rewrite or expand content in one click. Each capability is enabled per account.",
    highlights: [
      "AI blog draft generation from a single prompt",
      "Niche-aware topic suggestions with category tabs",
      "One-click Improve / Rewrite / Expand / Shorten on any draft",
      "Per-account AI feature permissions",
    ],
    changes: [
      {
        tag: "new",
        title: "AI blog generation",
        description:
          "Describe a topic and get a complete, structured draft - title, excerpt, body, category and tags - ready to edit and publish.",
        href: "/dashboard/blog/new",
      },
      {
        tag: "new",
        title: "Niche-aware topic suggestions",
        description:
          "Save your blog niche, audience and categories, then generate SEO-friendly title ideas per category. Click any idea to drop it straight into your post.",
        href: "/dashboard/blog/new",
      },
      {
        tag: "new",
        title: "AI content rewrite & improve",
        description:
          "Improve, rewrite, expand or shorten your draft content with one click while keeping your Markdown structure intact.",
        href: "/dashboard/blog/new",
      },
      {
        tag: "new",
        title: "Per-account AI permissions",
        description:
          "Each Blog API account's AI features are enabled individually, so you only see the tools available to you.",
      },
      {
        tag: "improved",
        title: "Blog API in the main menu",
        description:
          "The Blog API now has its own top-level navigation link for quicker access.",
        href: "/blog-api",
      },
      {
        tag: "improved",
        title: "Feedback moved to the footer",
        description:
          "Tidied the top navigation; the feedback form now lives in the site footer.",
        href: "/feedback",
      },
    ],
  },
  {
    version: "1.9.0",
    codename: "Service Pages & Lead Gen",
    date: "2026-05-14",
    summary:
      "Ten dedicated service landing pages built for SEO and lead generation - Web Development, Frontend, Backend, API, SaaS, E-commerce, SEO, Technical SEO, Local SEO, SEO Audit, and AI Integration. Every page has its own quote form so visitors can start a project in 30 seconds.",
    highlights: [
      "10 new service landing pages with full SEO + JSON-LD",
      "Inline lead-gen form on every service page (24-hour reply target)",
      "Services mega menu rebuilt with 4 categories",
    ],
    changes: [
      {
        tag: "new",
        title: "Web Development service page",
        description:
          "Full landing page for end-to-end Next.js + Node.js builds, with pricing tiers, tech stack, process, FAQs, and an inline quote form.",
        href: "/services/web-development",
      },
      {
        tag: "new",
        title: "Frontend, Backend, API, SaaS & E-commerce pages",
        description:
          "Five dedicated development service pages, each with unique copy, pricing models, and a lead form that drops straight into the inbox.",
        href: "/services/frontend-development",
      },
      {
        tag: "new",
        title: "SEO service pages",
        description:
          "Four SEO landing pages - SEO Services, Technical SEO, Local SEO, and SEO Audit - covering content, Core Web Vitals, Google Business Profile, and audit-only engagements.",
        href: "/services/seo",
      },
      {
        tag: "new",
        title: "AI Integration service page",
        description:
          "Dedicated page for OpenAI, Claude, RAG, and LLM-in-production work - with evals, structured outputs, and cost-control as headline deliverables.",
        href: "/services/ai-integration",
      },
      {
        tag: "improved",
        title: "Mega-menu Services dropdown",
        description:
          "Services menu rebuilt as a 4-column mega menu - Development, Marketing & SEO, Products & Specialized, and Browse - so visitors can find the right service in one glance.",
        href: "/services",
      },
      {
        tag: "new",
        title: "Inline lead-gen form on every service page",
        description:
          "A reusable form with project type, budget, and timeline pickers. Submissions hit the same backend as /contact and trigger an email reply within 24 hours.",
      },
      {
        tag: "improved",
        title: "Schema.org coverage for every service page",
        description:
          "Service, FAQPage, and BreadcrumbList JSON-LD on each landing page - eligible for rich results in Google and clear context for AI search engines.",
      },
    ],
  },
  {
    version: "1.8.0",
    codename: "Headless Blog API",
    date: "2026-05-14",
    summary:
      "A polished blog dashboard, a public Blog API landing page, and full feature parity between the admin and tenant blog editors. Anyone can now plug a headless blog into their Next.js project, business site, or SaaS dashboard.",
    highlights: [
      "New /blog-api landing page - request a tenant in one click",
      "Tenant blog editor rebuilt to match the admin editor",
      "Drafts, categories, tags, read time, featured posts and scheduled publish for every tenant",
    ],
    changes: [
      {
        tag: "new",
        title: "Blog API landing page",
        description:
          "A dedicated page that explains the headless blog service, with use-cases for Next.js projects, business sites, and SaaS dashboards. Includes a copy-paste Next.js fetch example, the full endpoint list, and an FAQ.",
        href: "/blog-api",
      },
      {
        tag: "improved",
        title: "Tenant blog editor - full parity with the admin editor",
        description:
          "The dashboard blog form now matches the admin form: slug auto-generation, category dropdown, tags, read time, author, scheduled publish date, publish and featured toggles, save-draft, and a monospace Markdown editor.",
        href: "/dashboard/blog/new",
      },
      {
        tag: "improved",
        title: "Cover image is enforced before publishing",
        description:
          "Tenants now get a clear inline warning when trying to publish without a cover image, and a one-click 'Save draft' option so no work is lost.",
      },
      {
        tag: "improved",
        title: "Blog API discoverability",
        description:
          "Added the Blog API to the Services menu and the sitemap, so it can be discovered without the dashboard.",
      },
    ],
  },
  {
    version: "1.7.0",
    codename: "Student AI Toolkit",
    date: "2026-05-10",
    summary:
      "Six new AI tools built for college and university students - summarize lecture notes, generate flashcards, plan essays, cite sources, paraphrase paragraphs, and write tailored cover letters. All free, no sign-up needed for the first uses.",
    highlights: [
      "AI Note Summarizer with built-in flashcards and quiz",
      "Flashcard generator with Anki-ready CSV export",
      "Essay outliner with APA, MLA, Chicago, and Harvard support",
      "Citation generator for APA, MLA, Chicago, Harvard, and IEEE",
      "Three-tone paraphraser for academic, formal, and casual writing",
      "Cover letter generator tailored to your resume and the job description",
    ],
    changes: [
      {
        tag: "new",
        title: "AI Note Summarizer",
        description:
          "Paste lecture notes or a textbook chapter and get clean bullet summaries, key terms, flashcards, and a self-check quiz. Pick brief, standard, or deep mode depending on how much detail you want.",
        href: "/free-tools/ai-note-summarizer",
      },
      {
        tag: "new",
        title: "AI Flashcard Generator",
        description:
          "Type any topic and get up to 50 study cards. Flip them in the browser or download as an Anki CSV for spaced-repetition review.",
        href: "/free-tools/ai-flashcard-generator",
      },
      {
        tag: "new",
        title: "AI Essay Outline Builder",
        description:
          "Hand it a topic, target word count, and citation style. You get a thesis, a hook, sectioned arguments with word targets, evidence ideas, and source suggestions.",
        href: "/free-tools/ai-essay-outliner",
      },
      {
        tag: "new",
        title: "AI Citation Generator",
        description:
          "Paste a URL, DOI, ISBN, or reference details and get a clean citation in APA, MLA, Chicago, Harvard, or IEEE - plus the in-text version, ready to copy.",
        href: "/free-tools/ai-citation-generator",
      },
      {
        tag: "new",
        title: "AI Paraphraser",
        description:
          "Three rewritten versions in one click - academic, formal, or casual. Keeps the meaning, changes the structure and wording.",
        href: "/free-tools/ai-paraphraser",
      },
      {
        tag: "new",
        title: "AI Cover Letter Generator",
        description:
          "Paste your resume and the job description, pick a tone, and get a tailored cover letter you can copy or download.",
        href: "/free-tools/ai-cover-letter",
      },
    ],
  },
  {
    version: "1.6.0",
    codename: "Cleaner Free Tools Menu",
    date: "2026-05-03",
    summary:
      "We simplified the Free Tools menu so the eight tools visitors use most are front and center - and the full library of 31 tools is still just one click away.",
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
          "The menu now loads instantly on every page, even on slower connections - no spinners, no layout shift.",
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
      "Twelve new everyday productivity and developer utilities - all 100% free, no sign-up required for the basics.",
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
        description: "Track multiple time zones at a glance - perfect for distributed teams.",
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
          "Guests get a generous free allowance out of the box. Signed-in users get even more - with full transparency on what's left.",
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
          "Delete your account at any time from Settings. We honor deletions immediately and remove your personal data - fully GDPR and CCPA aligned.",
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
          "Run a full SEO audit on any URL and download a polished, white-label PDF report - ready to share with clients.",
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
          "A searchable FAQ covering general questions and per-tool details - written for real people, not crawlers.",
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
        description: "Lightweight analytics across tools, blog reads, and resume downloads - with full respect for visitor privacy.",
      },
      {
        tag: "performance",
        title: "Built for global speed",
        description:
          "A modern, edge-optimized foundation delivers fast first paint and smooth navigation everywhere - North America, Europe, and beyond.",
      },
    ],
  },
  {
    version: "1.0.0",
    codename: "A New Home",
    date: "2026-04-26",
    summary:
      "The big move. After more than eighteen months of building in the open on smitparekh.studio, the whole experience was rebuilt from the ground up and given a permanent new home at smitparekh.co.in. Same craft, faster site, sharper brand, ready for everything that comes next.",
    highlights: [
      "Moved to a permanent home at smitparekh.co.in",
      "Full rebuild on a modern, edge-ready foundation",
      "Every project and free tool carried over and polished",
    ],
    changes: [
      {
        tag: "new",
        title: "A brand new home at smitparekh.co.in",
        description:
          "The portfolio graduated from smitparekh.studio to its own dedicated domain, with a refreshed identity and a cleaner, faster experience on every page.",
        href: "/portfolio",
      },
      {
        tag: "improved",
        title: "Rebuilt from the ground up",
        description:
          "Years of features were rewritten on a modern stack for better speed, accessibility, and reliability for visitors anywhere in the world.",
      },
      {
        tag: "improved",
        title: "A sharper personal brand",
        description:
          "A new visual identity, refined typography, and a consistent tone across the site, all built to make a strong first impression with clients and recruiters.",
      },
    ],
  },
  {
    version: "0.9.0",
    codename: "Motion & Branding",
    date: "2026-04-24",
    summary:
      "The final chapter on smitparekh.studio was all about feel and finish. Smooth scroll animations, a redesigned navigation bar, two handy new tools, and a full personal branding refresh brought the original site to its most polished state yet.",
    highlights: [
      "Site-wide scroll animations for a more premium feel",
      "Redesigned navigation with a smoother mobile menu",
      "New Word Counter and Password Generator tools",
    ],
    changes: [
      {
        tag: "new",
        title: "Word Counter",
        description:
          "Instant word, character, sentence, and reading-time counts for writers, students, and marketers.",
        href: "/free-tools/word-counter",
      },
      {
        tag: "new",
        title: "Password Generator",
        description:
          "Strong, fully customizable passwords generated right in the browser, with nothing ever sent to a server.",
        href: "/free-tools/password-generator",
      },
      {
        tag: "improved",
        title: "Smooth scroll animations everywhere",
        description:
          "Sections now ease gracefully into view as you scroll, giving the whole site a more considered, premium feel.",
      },
      {
        tag: "improved",
        title: "Redesigned navigation",
        description:
          "A cleaner desktop menu and a smooth slide-in mobile panel made it far easier to move around the site.",
      },
      {
        tag: "improved",
        title: "Branded splash screen",
        description:
          "A polished loading screen with full dark and light mode support replaced the plain spinner.",
      },
    ],
  },
  {
    version: "0.8.0",
    codename: "Open & Accessible",
    date: "2026-04-20",
    summary:
      "A milestone built on trust. The project went open source under an MIT license, and a full accessibility pass made the site easier to use for everyone, with better contrast, stronger keyboard support, and faster fonts.",
    highlights: [
      "Released open source under the MIT license",
      "Accessibility improvements across the whole site",
      "Faster fonts and fewer layout shifts",
    ],
    changes: [
      {
        tag: "new",
        title: "Open source under MIT",
        description:
          "The full source was published openly with a complete README, so anyone can learn from it or build on top of it.",
      },
      {
        tag: "improved",
        title: "Accessibility pass",
        description:
          "Fixed contrast issues, added ARIA labels, and improved keyboard navigation so the site works well with screen readers and assistive technology.",
      },
      {
        tag: "performance",
        title: "Faster, non-blocking fonts",
        description:
          "Reworked font loading to remove render-blocking requests and speed up the first paint on every page.",
      },
    ],
  },
  {
    version: "0.7.0",
    codename: "Career Tools",
    date: "2026-04-16",
    summary:
      "A focus on tools that help people get hired. The ATS Resume Checker and an AI resume analyzer arrived together, sharing a clean new layout that every tool page would go on to use.",
    highlights: [
      "New ATS Resume Checker with section-by-section scoring",
      "AI-powered resume analysis and suggestions",
      "Shared, consistent layout across every tool page",
    ],
    changes: [
      {
        tag: "new",
        title: "ATS Resume Checker",
        description:
          "Upload a resume and get a clear score, keyword matches, and practical suggestions to help it pass applicant tracking systems.",
        href: "/free-tools/ats-resume-checker",
      },
      {
        tag: "new",
        title: "AI resume analyzer",
        description:
          "Smart, section-aware feedback to sharpen bullet points and surface the right skills for the role.",
      },
      {
        tag: "improved",
        title: "Consistent tool page layout",
        description:
          "A shared hero and page structure brought every tool in line for a cleaner, more familiar experience.",
      },
    ],
  },
  {
    version: "0.6.0",
    codename: "Growing the Toolbox",
    date: "2025-08-17",
    summary:
      "The toolbox kept growing with a LinkedIn media downloader, alongside behind-the-scenes work on responsive ads and steady SEO improvements to reach more people.",
    highlights: [
      "New LinkedIn media downloader",
      "Responsive, better-placed ad units",
      "Ongoing SEO and structured data improvements",
    ],
    changes: [
      {
        tag: "new",
        title: "LinkedIn Media Downloader",
        description:
          "Save videos and images from LinkedIn posts in just a couple of clicks.",
        href: "/free-tools/linkedin-media-downloader",
      },
      {
        tag: "improved",
        title: "Smarter ad placements",
        description:
          "Responsive ad units that adapt to every screen size without getting in the way of the content.",
      },
      {
        tag: "improved",
        title: "SEO and structured data",
        description:
          "Cleaner metadata and schema across the site to help the right people find the tools.",
      },
    ],
  },
  {
    version: "0.5.0",
    codename: "Reach & Polish",
    date: "2025-05-06",
    summary:
      "A season of polish and reach. A built-in help assistant, detailed project case-study pages, friendlier loading states, and the first ad placements turned a simple portfolio into a proper product.",
    highlights: [
      "Detailed project case-study pages",
      "In-page help assistant",
      "Smooth skeleton loading states",
    ],
    changes: [
      {
        tag: "new",
        title: "Project case-study pages",
        description:
          "Each project earned its own detailed page with the story, the context, and the links behind the work.",
        href: "/portfolio",
      },
      {
        tag: "new",
        title: "In-page help assistant",
        description:
          "A friendly helper to answer common questions without ever leaving the page.",
      },
      {
        tag: "new",
        title: "Custom error pages",
        description:
          "Clear, on-brand 404 and 500 pages so visitors never hit a dead end.",
      },
      {
        tag: "improved",
        title: "Skeleton loading states",
        description:
          "Pages now show clean placeholders while content loads, instead of blank screens.",
      },
    ],
  },
  {
    version: "0.4.0",
    codename: "Built to Scale",
    date: "2025-04-06",
    summary:
      "The biggest expansion yet. The site was rebuilt around clean, data-driven content and shipped a whole wave of new tools, from a QR code generator to image utilities and an SEO analyzer, alongside fresh services, skills, and testimonials sections.",
    highlights: [
      "Wave of new tools: QR Code, Image Compressor, Image Converter, SEO Analyzer",
      "Data-driven rebuild for faster updates",
      "New Services, Skills, and Testimonials sections",
    ],
    changes: [
      {
        tag: "new",
        title: "QR Code Generator",
        description:
          "Create custom QR codes for links, text, and contact details in seconds.",
        href: "/free-tools/qr-code-generator",
      },
      {
        tag: "new",
        title: "Image Compressor and Converter",
        description:
          "Shrink and convert images right in the browser, with no quality guesswork.",
        href: "/free-tools/image-compressor",
      },
      {
        tag: "new",
        title: "SEO Analyzer",
        description:
          "Check any page for on-page SEO issues and get clear, actionable fixes.",
        href: "/free-tools/seo-analyzer",
      },
      {
        tag: "improved",
        title: "Data-driven rebuild",
        description:
          "Reworked the site around structured content so new projects and tools could ship far faster.",
      },
      {
        tag: "new",
        title: "Services, Skills, and Testimonials",
        description:
          "New sections to tell the full story of the work, the skills behind it, and the people it helped.",
      },
    ],
  },
  {
    version: "0.3.0",
    codename: "The Toolbox Opens",
    date: "2025-01-19",
    summary:
      "The portfolio started becoming a destination. The first free tools arrived, including a background remover, a text-to-speech tool, and a meta tag checker, giving visitors a real reason to come back.",
    highlights: [
      "First free tools go live",
      "Background Remover and Text to Speech",
      "Meta Tag Checker for quick SEO checks",
    ],
    changes: [
      {
        tag: "new",
        title: "Background Remover",
        description:
          "Remove image backgrounds instantly, free and right in the browser.",
        href: "/free-tools/background-remover",
      },
      {
        tag: "new",
        title: "Text to Speech",
        description:
          "Turn written text into natural-sounding audio in a single click.",
      },
      {
        tag: "new",
        title: "Meta Tag Checker",
        description:
          "Preview and validate a page's meta tags for search results and social sharing.",
        href: "/free-tools/meta-tag-checker",
      },
    ],
  },
  {
    version: "0.2.0",
    codename: "The First Tool",
    date: "2024-12-23",
    summary:
      "The very first free tool shipped, a LinkedIn post generator, marking the moment the portfolio started giving something genuinely useful back to its visitors.",
    highlights: [
      "First free tool: LinkedIn Post Generator",
      "The shift from portfolio to platform begins",
    ],
    changes: [
      {
        tag: "new",
        title: "LinkedIn Post Generator",
        description:
          "Draft engaging, ready-to-publish LinkedIn posts from a simple prompt.",
      },
      {
        tag: "improved",
        title: "Groundwork for a growing toolbox",
        description:
          "Laid the foundations that every future tool would go on to build on.",
      },
    ],
  },
  {
    version: "0.1.0",
    codename: "First Light",
    date: "2024-09-23",
    summary:
      "A major leap forward. The portfolio was rebuilt as a modern React application and launched on smitparekh.studio, bringing web development, design, and video work together in one place, with SEO and a working contact form built in from day one.",
    highlights: [
      "Rebuilt in React, launched on smitparekh.studio",
      "First projects across web, design, and video",
      "SEO, sitemap, and contact form from day one",
    ],
    changes: [
      {
        tag: "new",
        title: "Rebuilt in React",
        description:
          "Rebuilt as a modern React app and launched on smitparekh.studio, bringing web development, design, and video projects together in one place.",
      },
      {
        tag: "new",
        title: "Featured projects",
        description:
          "Early work including an e-commerce landing page, a Connect Four game, a coffee shop app, and motion graphics.",
      },
      {
        tag: "new",
        title: "Contact form and SEO foundation",
        description:
          "A working contact form, sitemap, and robots setup so the right people could find the site and get in touch.",
      },
    ],
  },
  {
    version: "0.0.2",
    codename: "Going Dynamic",
    date: "2024-05-28",
    summary:
      "The portfolio grew up from a static page into a real web application. Rebuilt on Node.js, Express, and EJS with Tailwind CSS, it gained reusable templates, a structured projects section, and its first live deployment on Vercel.",
    highlights: [
      "Rebuilt on Node.js, Express, and EJS",
      "Styled with Tailwind CSS",
      "First live deployment on Vercel",
    ],
    changes: [
      {
        tag: "new",
        title: "A server-rendered rebuild",
        description:
          "Moved from a single static page to a Node.js and Express app with EJS templates, so the site could grow without copying markup around.",
      },
      {
        tag: "new",
        title: "Structured projects and testimonials",
        description:
          "Projects moved into their own data layer, with a dedicated testimonials section to add social proof.",
      },
      {
        tag: "improved",
        title: "Tailwind CSS styling",
        description:
          "Adopted Tailwind CSS for faster, more consistent styling across every section.",
      },
      {
        tag: "new",
        title: "Live on Vercel",
        description:
          "The portfolio earned its first proper deployment on Vercel, complete with custom 404 handling.",
      },
    ],
  },
  {
    version: "0.0.1",
    codename: "Day One",
    date: "2024-01-19",
    summary:
      "Where the whole journey started. The first live portfolio went online in January 2024, built on a Next.js foundation and personalized through a clean, structured data file, with sections for about, projects, skills, and social links.",
    highlights: [
      "The first live portfolio, online in January 2024",
      "Built on a Next.js foundation",
      "About, projects, skills, and social links",
    ],
    changes: [
      {
        tag: "new",
        title: "The first live portfolio",
        description:
          "Got a personal site online for the very first time, built on a Next.js foundation and configured through a single, tidy data file.",
      },
      {
        tag: "new",
        title: "Projects and skills",
        description:
          "Showcased early projects and a skills badge grid, all in one clean, scannable layout.",
      },
      {
        tag: "new",
        title: "Social links front and center",
        description:
          "Quick links to LinkedIn, GitHub, Kaggle, and LeetCode so people could connect right away.",
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
