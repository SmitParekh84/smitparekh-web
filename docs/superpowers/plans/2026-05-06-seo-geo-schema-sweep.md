# SEO / GEO / Schema Comprehensive Sweep — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve GEO/AI citation presence and "hire developer" ranking by fixing entity cross-referencing across all schema, adding missing HowTo and AggregateRating schemas, updating llms.txt for AI crawlers, and expanding IndexNow coverage.

**Architecture:** Several schemas already exist inline per page. Rather than centralising everything, we add `lib/seo/schema.ts` only for genuinely new factory functions (HowTo, AggregateRating). Existing schemas are updated in-place to add `@id` cross-refs, `worksFor`, and `upwork` sameAs. All schemas cross-reference the stable IRI `https://www.smitparekh.co.in/#person`.

**Tech Stack:** Next.js 16 App Router, TypeScript strict, JSON-LD (inline `<script type="application/ld+json">`), schema.org vocabulary.

---

## File Map

| File | Action | Reason |
|---|---|---|
| `public/llms.txt` | Update | Outdated years + missing tools/pages |
| `data/site.ts` | Modify | Add `aggregateRating` config |
| `data/tools-howto.ts` | Create | HowTo steps for all 37 tools |
| `lib/seo/schema.ts` | Create | `howToSchema()` + `aggregateRatingSchema()` factories |
| `app/page.tsx` | Modify | Add `@id`, `worksFor`, `upwork` to Person; add `@id` to websiteSchema |
| `app/(marketing)/about/page.tsx` | Modify | Add `@id`, `worksFor`, `upwork` to ProfilePage Person |
| `app/(marketing)/hire-me/page.tsx` | Modify | Add `@id`, `worksFor` to ProfilePage Person; add AggregateRating schema |
| `app/(tools)/free-tools/[slug]/page.tsx` | Modify | Add HowTo schema; update toolSchema author to `@id` ref |
| `app/(marketing)/blog/[slug]/page.tsx` | Modify | Update author/publisher to `@id` ref |
| `app/(marketing)/services/page.tsx` | Modify | Update provider to `@id` ref |
| `app/api/indexnow/route.ts` | Modify | Fetch blog + case study URLs dynamically |

---

## Task 1: Update `public/llms.txt`

**Files:**
- Modify: `public/llms.txt`

- [ ] **Step 1: Replace the file contents**

The current file says "3.5+ years", lists only 11 tools, and is missing pages. Replace with:

```text
# Smit Parekh - Full Stack Web Developer

> Full-Stack Web Developer with 4+ years building production applications for FinTech, SaaS, and enterprise clients. Specialises in React, Next.js, Node.js, TypeScript, PostgreSQL, and AWS. Also offers 37+ free browser-based tools with no signup required.

## About

Smit Parekh is a Full-Stack Web Developer based in India, available for projects worldwide. He delivers end-to-end web applications — from architecture to AWS deployment — for startups and enterprise clients across FinTech, SaaS, and LegalTech.

## Availability

- Status: Accepting new projects
- Next availability: Q3 2026
- Note: Limited spots — get in touch early
- Contact: smitparekh03@gmail.com

## Services

- Full-Stack Web Development (React + Node.js + TypeScript)
- React.js Frontend Development
- Node.js Backend & REST API Development
- Database Design (PostgreSQL, MongoDB)
- Cloud & DevOps (AWS: EC2, RDS, S3, Docker)
- TypeScript & Code Quality
- Technical SEO
- Digital Marketing Strategy

## Pages

- Home: https://www.smitparekh.co.in
- About: https://www.smitparekh.co.in/about
- Services: https://www.smitparekh.co.in/services
- Portfolio / Case Studies: https://www.smitparekh.co.in/portfolio
- Blog: https://www.smitparekh.co.in/blog
- Free Tools: https://www.smitparekh.co.in/free-tools
- Hire Me: https://www.smitparekh.co.in/hire-me
- FAQ: https://www.smitparekh.co.in/faq
- For Students: https://www.smitparekh.co.in/for-students
- Changelog: https://www.smitparekh.co.in/changelog
- Contact: https://www.smitparekh.co.in/contact

## Case Studies (Portfolio)

Full case studies are available at https://www.smitparekh.co.in/portfolio
Each case study covers the problem, technical solution, stack used, and measurable outcomes.

## Free Tools (no signup, no cost, browser-based)

### Image Tools
- Background Remover: https://www.smitparekh.co.in/free-tools/background-remover
- Image Compressor: https://www.smitparekh.co.in/free-tools/image-compressor
- Image Converter: https://www.smitparekh.co.in/free-tools/image-converter
- Image to Base64: https://www.smitparekh.co.in/free-tools/image-to-base64
- Favicon Generator: https://www.smitparekh.co.in/free-tools/favicon-generator

### Content & SEO Tools
- LinkedIn Post Generator: https://www.smitparekh.co.in/free-tools/viral-linkedin-post-generator
- LinkedIn Media Downloader: https://www.smitparekh.co.in/free-tools/linkedin-media-downloader
- YouTube Thumbnail Downloader: https://www.smitparekh.co.in/free-tools/youtube-thumbnail-downloader
- Meta Tag Checker: https://www.smitparekh.co.in/free-tools/meta-tag-checker
- SEO Analyzer: https://www.smitparekh.co.in/free-tools/seo-analyzer
- Word Counter: https://www.smitparekh.co.in/free-tools/word-counter
- Slug Generator: https://www.smitparekh.co.in/free-tools/slug-generator
- Markdown Editor: https://www.smitparekh.co.in/free-tools/markdown-editor
- Lorem Ipsum Generator: https://www.smitparekh.co.in/free-tools/lorem-ipsum

### Career & Resume Tools
- ATS Resume Checker: https://www.smitparekh.co.in/free-tools/ats-resume-checker
- AI Cover Letter Generator: https://www.smitparekh.co.in/free-tools/ai-cover-letter
- AI Paraphraser: https://www.smitparekh.co.in/free-tools/ai-paraphraser

### AI Study Tools (for students)
- AI Note Summarizer: https://www.smitparekh.co.in/free-tools/ai-note-summarizer
- AI Flashcard Generator: https://www.smitparekh.co.in/free-tools/ai-flashcard-generator
- AI Essay Outliner: https://www.smitparekh.co.in/free-tools/ai-essay-outliner
- AI Citation Generator: https://www.smitparekh.co.in/free-tools/ai-citation-generator

### Developer Tools
- QR Code Generator: https://www.smitparekh.co.in/free-tools/qr-code-generator
- Password Generator: https://www.smitparekh.co.in/free-tools/password-generator
- JSON Formatter: https://www.smitparekh.co.in/free-tools/json-formatter
- Base64 Encoder/Decoder: https://www.smitparekh.co.in/free-tools/base64-encoder-decoder
- URL Encoder/Decoder: https://www.smitparekh.co.in/free-tools/url-encoder-decoder
- Hash Generator (MD5, SHA-256, SHA-512): https://www.smitparekh.co.in/free-tools/hash-generator
- Regex Tester: https://www.smitparekh.co.in/free-tools/regex-tester
- JWT Decoder: https://www.smitparekh.co.in/free-tools/jwt-decoder
- SQL Formatter: https://www.smitparekh.co.in/free-tools/sql-formatter
- CSS Gradient Generator: https://www.smitparekh.co.in/free-tools/css-gradient-generator
- UUID Generator: https://www.smitparekh.co.in/free-tools/uuid-generator
- Image to Base64: https://www.smitparekh.co.in/free-tools/image-to-base64
- Cron Builder: https://www.smitparekh.co.in/free-tools/cron-builder

### Utility Tools
- Pomodoro Timer: https://www.smitparekh.co.in/free-tools/pomodoro-timer
- World Clock / Timezone Converter: https://www.smitparekh.co.in/free-tools/world-clock
- Unit Converter: https://www.smitparekh.co.in/free-tools/unit-converter
- Color Converter (HEX, RGB, HSL): https://www.smitparekh.co.in/free-tools/color-converter

## Contact

- Email: smitparekh03@gmail.com
- LinkedIn: https://www.linkedin.com/in/smitparekh84/
- GitHub: https://github.com/SmitParekh84
- X (Twitter): https://x.com/smit_parekh84
- Upwork: https://www.upwork.com/freelancers/~018877bbeb80ff2d25
```

- [ ] **Step 2: Verify the file saved correctly**

Open `public/llms.txt` and confirm "4+ years" is present and all tool sections appear.

- [ ] **Step 3: Commit**

```bash
git add public/llms.txt
git commit -m "chore(seo): update llms.txt — 4+ years, 37 tools, all pages"
```

---

## Task 2: Add `aggregateRating` to `data/site.ts`

**Files:**
- Modify: `data/site.ts`

- [ ] **Step 1: Add the field to `siteConfig`**

In `data/site.ts`, add `aggregateRating` as the last property inside the `siteConfig` object, before the closing `} as const;`:

```ts
  aggregateRating: {
    ratingValue: 5.0,
    reviewCount: 12,
    bestRating: 5,
    worstRating: 1,
  },
```

The full tail of `siteConfig` should look like:
```ts
  keywords: [
    // ... existing keywords array unchanged
  ],
  aggregateRating: {
    ratingValue: 5.0,
    reviewCount: 12,
    bestRating: 5,
    worstRating: 1,
  },
} as const;
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build 2>&1 | head -20
```

Expected: no type errors on `data/site.ts`.

- [ ] **Step 3: Commit**

```bash
git add data/site.ts
git commit -m "chore(seo): add aggregateRating config to siteConfig"
```

---

## Task 3: Create `data/tools-howto.ts`

**Files:**
- Create: `data/tools-howto.ts`

- [ ] **Step 1: Create the file with all 37 tool HowTo steps**

```ts
export interface HowToStep {
  name: string;
  text: string;
}

export const toolHowToSteps: Record<string, HowToStep[]> = {
  "background-remover": [
    { name: "Upload your image", text: "Click the upload area or drag and drop a photo, logo, or product image." },
    { name: "Wait for AI processing", text: "The AI removes the background automatically — no manual selection needed." },
    { name: "Download the result", text: "Click Download to save the image with a transparent background as PNG." },
  ],
  "viral-linkedin-post-generator": [
    { name: "Choose a post type", text: "Select the style of LinkedIn post you want — story, tips, opinion, or carousel hook." },
    { name: "Enter your topic or idea", text: "Type a brief description of what your post is about." },
    { name: "Generate and copy", text: "Click Generate, review the output, and copy it directly to LinkedIn." },
  ],
  "ats-resume-checker": [
    { name: "Paste your resume text", text: "Copy the full text of your resume and paste it into the input area." },
    { name: "Optionally add a job description", text: "Paste the target job description to get keyword-matched suggestions." },
    { name: "Review your ATS score", text: "Read your score, keyword gaps, and actionable suggestions to improve shortlisting chances." },
  ],
  "meta-tag-checker": [
    { name: "Enter a URL", text: "Type or paste the full URL of the page you want to inspect." },
    { name: "Click Analyse", text: "The tool fetches the page and extracts all meta tags, OG tags, and Twitter cards." },
    { name: "Review the results", text: "Check title length, meta description, Open Graph image, and Twitter card status — fix any flagged issues." },
  ],
  "qr-code-generator": [
    { name: "Choose content type", text: "Select URL, plain text, email address, or phone number." },
    { name: "Enter your content", text: "Type or paste the value you want encoded into the QR code." },
    { name: "Download your QR code", text: "Click Download to save the QR code as a high-resolution PNG." },
  ],
  "word-counter": [
    { name: "Paste or type your text", text: "Enter any text into the editor — articles, essays, captions, or scripts." },
    { name: "View counts instantly", text: "See word count, character count (with and without spaces), sentence count, and paragraph count update live." },
    { name: "Check reading time and keyword density", text: "Scroll down to see estimated reading time and the top keywords by frequency." },
  ],
  "image-compressor": [
    { name: "Upload your image", text: "Drag and drop or click to upload a JPEG, PNG, or WebP file." },
    { name: "Adjust quality if needed", text: "Use the quality slider to balance file size and visual fidelity." },
    { name: "Download the compressed image", text: "Click Download to save the smaller file — no watermark, no account needed." },
  ],
  "image-converter": [
    { name: "Upload your image", text: "Click to upload or drag and drop the source image file." },
    { name: "Choose the output format", text: "Select JPEG, PNG, or WebP as the target format." },
    { name: "Download the converted file", text: "Click Convert then Download — the file is processed entirely in your browser." },
  ],
  "linkedin-media-downloader": [
    { name: "Copy a LinkedIn post URL", text: "Right-click a LinkedIn post and copy the link, or grab it from the browser address bar." },
    { name: "Paste the URL and click Download", text: "Paste the post URL into the input and click the Download button." },
    { name: "Save the file", text: "The video or image downloads directly to your device — no login required." },
  ],
  "seo-analyzer": [
    { name: "Enter a webpage URL", text: "Type or paste the full URL of the page you want to audit." },
    { name: "Click Analyse", text: "The tool fetches the page and checks title tags, headings, meta description, links, and performance signals." },
    { name: "Review the SEO report", text: "Read each section — fix any red or amber items first for the fastest ranking improvement." },
  ],
  "password-generator": [
    { name: "Set your length and character options", text: "Choose password length and toggle uppercase, lowercase, numbers, and symbols." },
    { name: "Click Generate", text: "A cryptographically random password is created instantly in your browser." },
    { name: "Copy your password", text: "Click Copy — the password is never sent to any server." },
  ],
  "youtube-thumbnail-downloader": [
    { name: "Paste a YouTube video URL", text: "Copy the URL from any YouTube video page or Shorts URL and paste it into the input." },
    { name: "Choose your resolution", text: "Select Max Resolution, HD (480p), or Standard (default) quality." },
    { name: "Download the thumbnail", text: "Click the download button to save the thumbnail image to your device." },
  ],
  "json-formatter": [
    { name: "Paste your JSON", text: "Paste raw or minified JSON into the input area." },
    { name: "Format or minify", text: "Click Beautify for readable indented output, or Minify to compress it." },
    { name: "Copy the result", text: "Click Copy to get the formatted JSON — syntax errors are highlighted in red." },
  ],
  "base64-encoder-decoder": [
    { name: "Choose a mode", text: "Select Encode to convert text to Base64, or Decode to convert Base64 back to plain text." },
    { name: "Enter your input", text: "Paste your text or Base64 string into the input area." },
    { name: "Copy the output", text: "The result appears instantly — click Copy to use it." },
  ],
  "url-encoder-decoder": [
    { name: "Choose a mode", text: "Select Encode to percent-encode a URL, or Decode to convert an encoded string back to readable text." },
    { name: "Paste your input", text: "Enter the URL or encoded string you want to convert." },
    { name: "Copy the result", text: "Click Copy — you can switch between full URL encoding and component encoding." },
  ],
  "hash-generator": [
    { name: "Choose a hash algorithm", text: "Select MD5, SHA-1, SHA-256, SHA-384, or SHA-512." },
    { name: "Type or paste your input", text: "Enter the text you want to hash — the hash updates as you type." },
    { name: "Copy the hash", text: "Click Copy to use the hash — everything runs client-side, nothing is sent to a server." },
  ],
  "regex-tester": [
    { name: "Enter your regex pattern", text: "Type your regular expression in the pattern field and set any flags (g, i, m, s)." },
    { name: "Paste your test string", text: "Add the text you want to match against in the test string area." },
    { name: "View matches and groups", text: "Matches are highlighted in the test string and capture groups appear in a list below." },
  ],
  "pomodoro-timer": [
    { name: "Set focus and break durations", text: "Adjust the focus session length (default 25 min) and short/long break durations." },
    { name: "Click Start", text: "The timer counts down — browser notifications alert you when a session ends." },
    { name: "Work through sessions", text: "Complete four focus sessions to earn a long break — your session count is tracked automatically." },
  ],
  "world-clock": [
    { name: "Search for and add cities", text: "Type a city name in the search box and click Add to display its current time." },
    { name: "Compare time zones side by side", text: "All added cities show live time with day/night status and UTC offset." },
    { name: "Remove cities you no longer need", text: "Click the X on any city card to remove it from your view." },
  ],
  "unit-converter": [
    { name: "Choose a category", text: "Select length, weight, temperature, area, volume, speed, time, or data size." },
    { name: "Enter a value and select the input unit", text: "Type the number and pick the unit you're converting from." },
    { name: "Read instant conversions", text: "All equivalent values in every unit for that category update instantly below." },
  ],
  "markdown-editor": [
    { name: "Type or paste Markdown", text: "Write or paste Markdown content into the left editor pane." },
    { name: "Preview the rendered output", text: "The right pane shows a live HTML preview — GitHub-flavoured Markdown is fully supported." },
    { name: "Export your content", text: "Click Copy as HTML to get the rendered markup, or Download to save the .md file." },
  ],
  "cron-builder": [
    { name: "Choose a preset or configure fields", text: "Pick a common schedule from the presets dropdown, or set minute, hour, day, month, and weekday fields manually." },
    { name: "Read the human-readable description", text: "The tool explains the schedule in plain English as you build it." },
    { name: "Copy the expression and check next runs", text: "Copy your cron expression and review the next five scheduled run times." },
  ],
  "lorem-ipsum": [
    { name: "Choose output type and count", text: "Select paragraphs, sentences, or words and set how many you need." },
    { name: "Click Generate", text: "The placeholder text is generated instantly." },
    { name: "Copy the text", text: "Click Copy to use the Lorem Ipsum in your design or document." },
  ],
  "jwt-decoder": [
    { name: "Paste your JWT token", text: "Copy a JSON Web Token from your app or API response and paste it into the input." },
    { name: "View decoded sections", text: "The header, payload, and signature are decoded and displayed in readable JSON." },
    { name: "Check expiry and claims", text: "Expiry time, issued-at, and standard claims are highlighted — your token never leaves your browser." },
  ],
  "sql-formatter": [
    { name: "Paste your SQL query", text: "Copy raw or minified SQL and paste it into the input area." },
    { name: "Choose Beautify or Minify", text: "Click Beautify for auto-indented, keyword-uppercased output, or Minify to compress." },
    { name: "Copy the formatted SQL", text: "Click Copy to use the result — works for MySQL, PostgreSQL, SQLite, and SQL Server." },
  ],
  "image-to-base64": [
    { name: "Upload your image", text: "Click to upload a PNG, JPG, GIF, SVG, or WebP file — it never leaves your browser." },
    { name: "Choose output format", text: "Select Data URL, CSS background, img tag, or raw Base64." },
    { name: "Copy the result", text: "Click Copy to use the encoded string directly in your HTML or CSS." },
  ],
  "css-gradient-generator": [
    { name: "Choose gradient type", text: "Select Linear, Radial, or Conic gradient." },
    { name: "Add color stops and adjust settings", text: "Pick colors for each stop, drag to reorder, and set angle or position." },
    { name: "Copy your CSS", text: "Click Copy CSS or Copy Tailwind to get the value ready to paste into your code." },
  ],
  "slug-generator": [
    { name: "Paste your titles", text: "Enter one title per line — paste a full list for bulk conversion." },
    { name: "Configure options", text: "Choose separator (hyphen or underscore), max length, and whether to strip stop words." },
    { name: "Copy the slugs", text: "Click Copy All to get all slugs at once, or copy individual ones from the list." },
  ],
  "favicon-generator": [
    { name: "Choose a source", text: "Select Text (enter 1-2 characters), Emoji (pick from the selector), or Image (upload your own)." },
    { name: "Preview across sizes", text: "See your favicon rendered at 16, 32, 48, 64, 128, 180, 192, and 512px." },
    { name: "Download and install", text: "Download the PNG files and copy the HTML link tags to add them to your site's head." },
  ],
  "uuid-generator": [
    { name: "Choose version and quantity", text: "Select UUID v4 (random) or v7 (time-ordered) and set how many to generate (up to 1000)." },
    { name: "Configure format", text: "Toggle uppercase, no-hyphens, or brace-wrapped output as needed." },
    { name: "Copy or download", text: "Click Copy All to get the UUIDs, or Download to save them as a text file." },
  ],
  "color-converter": [
    { name: "Enter a color value", text: "Type a HEX, RGB, HSL, RGBA, or HSLA value in any format, or use the color picker." },
    { name: "View instant conversions", text: "All equivalent color formats update instantly as you type." },
    { name: "Copy the format you need", text: "Click Copy next to any format to grab the value for your CSS or design tool." },
  ],
  "ai-note-summarizer": [
    { name: "Paste your notes", text: "Copy lecture notes, a textbook chapter, or any study material and paste it into the input." },
    { name: "Choose output type", text: "Select bullet summary, key terms, flashcards, or self-check quiz." },
    { name: "Copy or save the output", text: "Review the generated content and copy it to your note-taking app or revision document." },
  ],
  "ai-flashcard-generator": [
    { name: "Enter a topic or study material", text: "Type a subject like 'photosynthesis' or paste a passage of text." },
    { name: "Set the number of cards", text: "Choose how many flashcards to generate (up to 50)." },
    { name: "Export to Anki", text: "Download your flashcards as Anki-compatible CSV or JSON for spaced repetition practice." },
  ],
  "ai-essay-outliner": [
    { name: "Enter your essay topic and style", text: "Type your essay question and choose APA, MLA, Chicago, or Harvard citation style." },
    { name: "Click Generate outline", text: "The AI creates a structured outline with thesis, hook, sectioned arguments, and word targets." },
    { name: "Copy your plan", text: "Copy the full outline to start writing — evidence ideas and source suggestions are included." },
  ],
  "ai-citation-generator": [
    { name: "Paste a URL, DOI, or ISBN", text: "Enter the source reference — URL for web pages, DOI for journal articles, or ISBN for books." },
    { name: "Choose your citation format", text: "Select APA, MLA, Chicago, Harvard, or IEEE." },
    { name: "Copy the citation", text: "Get both the full reference entry and the in-text citation version in one click." },
  ],
  "ai-paraphraser": [
    { name: "Paste the text you want to rewrite", text: "Copy a paragraph from your essay, article, or notes and paste it in." },
    { name: "Choose a tone", text: "Select Academic (formal scholarly language), Formal (professional), or Casual (plain and conversational)." },
    { name: "Copy your preferred version", text: "Three rewritten alternatives are generated — copy the one that fits best." },
  ],
  "ai-cover-letter": [
    { name: "Paste your resume and the job description", text: "Copy your resume text and the full job posting into their respective input areas." },
    { name: "Choose a letter tone", text: "Select Professional, Enthusiastic, or Concise depending on the company culture." },
    { name: "Copy the cover letter", text: "Review the tailored output and copy it directly into your job application." },
  ],
};

export function getToolHowToSteps(slug: string): HowToStep[] {
  return toolHowToSteps[slug] ?? [];
}
```

- [ ] **Step 2: Verify TypeScript accepts the file**

```bash
pnpm build 2>&1 | grep "tools-howto"
```

Expected: no output (no errors).

- [ ] **Step 3: Commit**

```bash
git add data/tools-howto.ts
git commit -m "feat(seo): add HowTo steps data for all 37 tools"
```

---

## Task 4: Create `lib/seo/schema.ts`

**Files:**
- Create: `lib/seo/schema.ts`

This file contains only the two factory functions for schema types that do not yet exist in any page: `HowTo` and `AggregateRating`. Everything else is updated in-place.

- [ ] **Step 1: Create the schema factory file**

```ts
import { siteConfig } from "@/data/site";
import type { ToolSEO } from "@/data/tools-seo";
import type { HowToStep } from "@/data/tools-howto";

export function howToSchema(slug: string, tool: ToolSEO, steps: HowToStep[]) {
  const shortTitle = tool.title.split(" - ")[0];
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${shortTitle}`,
    description: tool.description,
    url: `${siteConfig.url}/free-tools/${slug}`,
    totalTime: "PT1M",
    tool: [{ "@type": "HowToTool", name: "Web Browser" }],
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
    author: { "@id": `${siteConfig.url}/#person` },
  };
}

export function aggregateRatingSchema() {
  const cfg = siteConfig.aggregateRating;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    url: siteConfig.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: cfg.ratingValue,
      reviewCount: cfg.reviewCount,
      bestRating: cfg.bestRating,
      worstRating: cfg.worstRating,
    },
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build 2>&1 | grep "lib/seo"
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add lib/seo/schema.ts
git commit -m "feat(seo): add howToSchema and aggregateRatingSchema factories"
```

---

## Task 5: Update Person schema on `app/page.tsx`

**Files:**
- Modify: `app/page.tsx`

The current `personSchema` is missing `@id`, `worksFor`, and `upwork` in `sameAs`. The `websiteSchema` author/publisher are plain objects without `@id`.

- [ ] **Step 1: Replace `personSchema` in `app/page.tsx`**

Find the existing `personSchema` constant (starts at line ~68) and replace it entirely:

```ts
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: "Smit Parekh",
  url: siteConfig.url,
  jobTitle: "Full-Stack Web Developer",
  description:
    "Full-Stack Web Developer with 4+ years delivering production applications for FinTech, SaaS, and enterprise clients. Specialises in React, Next.js, Node.js, TypeScript, and AWS.",
  email: siteConfig.email,
  image: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "NestJS",
  ],
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.x,
    siteConfig.social.instagram,
    siteConfig.social.upwork,
  ],
  worksFor: {
    "@type": "Organization",
    name: "Marketixpert",
    url: siteConfig.social.marketixpert,
  },
};
```

- [ ] **Step 2: Replace `websiteSchema` in `app/page.tsx`**

Find the existing `websiteSchema` constant and replace it:

```ts
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  alternateName: [
    "Smit Parekh - Full Stack Developer",
    "Smit Parekh Portfolio",
    "Smit Parekh Tools",
    "Smit Parekh Dev",
  ],
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en",
  author: { "@id": `${siteConfig.url}/#person` },
  publisher: { "@id": `${siteConfig.url}/#person` },
};
```

- [ ] **Step 3: Add `ProfilePage` schema constant after the existing schemas, before `export default`**

```ts
const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteConfig.url}/#profilepage`,
  name: "Smit Parekh - Full Stack Developer for Hire",
  url: siteConfig.url,
  mainEntity: { "@id": `${siteConfig.url}/#person` },
};
```

- [ ] **Step 4: Inject `profilePageSchema` in the JSX**

In the `return` block of `HomePage`, add a new `<script>` block after the existing `websiteSchema` script:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
/>
```

- [ ] **Step 5: Verify the dev server renders valid JSON-LD**

```bash
pnpm dev
```

Open `http://localhost:3001` in a browser, view page source, and confirm three schema scripts are present with `@id` values and `worksFor`.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat(seo): add @id, worksFor, upwork sameAs, ProfilePage schema to home"
```

---

## Task 6: Update Person in `app/(marketing)/about/page.tsx`

**Files:**
- Modify: `app/(marketing)/about/page.tsx`

The existing `profilePageSchema.mainEntity` is an inline Person object without `@id` or `worksFor`.

- [ ] **Step 1: Replace the `profilePageSchema` constant**

Find the existing `profilePageSchema` constant (around line 68) and replace it entirely:

```ts
const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "About Smit Parekh - Full Stack Developer",
  url: `${siteConfig.url}/about`,
  mainEntity: {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: "Smit Parekh",
    url: siteConfig.url,
    jobTitle: "Full-Stack Web Developer",
    description: aboutBio,
    email: siteConfig.email,
    image: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
      "NestJS",
      "Redux",
      "GraphQL",
    ],
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
      siteConfig.social.x,
      siteConfig.social.instagram,
      siteConfig.social.upwork,
    ],
    worksFor: {
      "@type": "Organization",
      name: "Marketixpert",
      url: siteConfig.social.marketixpert,
    },
    hasCredential: certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.name,
      credentialCategory: "Certificate",
      recognizedBy: { "@type": "Organization", name: cert.issuer },
    })),
  },
};
```

- [ ] **Step 2: Verify dev server**

```bash
pnpm dev
```

Open `http://localhost:3001/about`, view page source, confirm `@id` and `worksFor` appear in the schema script.

- [ ] **Step 3: Commit**

```bash
git add app/(marketing)/about/page.tsx
git commit -m "feat(seo): add @id, worksFor, upwork to about ProfilePage schema"
```

---

## Task 7: Update `app/(marketing)/hire-me/page.tsx` — add `@id`/`worksFor` + `AggregateRating`

**Files:**
- Modify: `app/(marketing)/hire-me/page.tsx`

- [ ] **Step 1: Add import for `aggregateRatingSchema` at the top of the file**

After the existing imports, add:

```ts
import { aggregateRatingSchema } from "@/lib/seo/schema";
```

- [ ] **Step 2: Replace the `hireMeSchema` constant**

Find the existing `hireMeSchema` constant and replace it:

```ts
const hireMeSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Hire Smit Parekh - Full Stack Developer",
  url: `${siteConfig.url}/hire-me`,
  mainEntity: {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: "Smit Parekh",
    url: siteConfig.url,
    jobTitle: "Full-Stack Web Developer",
    description: aboutBio,
    email: siteConfig.email,
    image: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
      siteConfig.social.x,
      siteConfig.social.upwork,
    ],
    worksFor: {
      "@type": "Organization",
      name: "Marketixpert",
      url: siteConfig.social.marketixpert,
    },
  },
};
```

- [ ] **Step 3: Add `AggregateRating` script in the JSX return**

In the `return` block of the hire-me page component, after the existing schema scripts, add:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema()) }}
/>
```

- [ ] **Step 4: Verify dev server**

```bash
pnpm dev
```

Open `http://localhost:3001/hire-me`, view page source, confirm both `hireMeSchema` and the `AggregateRating` script appear with correct values.

- [ ] **Step 5: Commit**

```bash
git add app/(marketing)/hire-me/page.tsx
git commit -m "feat(seo): add @id, worksFor, AggregateRating to hire-me schema"
```

---

## Task 8: Add `HowTo` schema to `/free-tools/[slug]` page

**Files:**
- Modify: `app/(tools)/free-tools/[slug]/page.tsx`

- [ ] **Step 1: Add imports at the top of the file**

After the existing imports, add:

```ts
import { howToSchema } from "@/lib/seo/schema";
import { getToolHowToSteps } from "@/data/tools-howto";
```

- [ ] **Step 2: Update `toolSchema` author/publisher to use `@id`**

Inside `ToolPage`, find the `toolSchema` object. Replace the `author` and `publisher` properties:

```ts
author: { "@id": `${siteConfig.url}/#person` },
publisher: { "@id": `${siteConfig.url}/#person` },
```

(These currently have `{ "@type": "Person", name: "Smit Parekh", url: siteConfig.url }` — replace both.)

- [ ] **Step 3: Build the `howToSchemaData` constant after `toolSchema`**

Add this after the `toolSchema` definition inside the `ToolPage` component:

```ts
const steps = getToolHowToSteps(slug);
const howToSchemaData =
  tool && steps.length > 0 ? howToSchema(slug, tool, steps) : null;
```

- [ ] **Step 4: Inject the `HowTo` script in the JSX return**

After the existing `{toolSchema && <script .../>}` block, add:

```tsx
{howToSchemaData && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchemaData) }}
  />
)}
```

- [ ] **Step 5: Verify dev server**

```bash
pnpm dev
```

Open `http://localhost:3001/free-tools/background-remover`, view page source, confirm `HowTo` schema appears with `step` array and `author: { "@id": ".../#person" }`.

- [ ] **Step 6: Commit**

```bash
git add app/(tools)/free-tools/[slug]/page.tsx
git commit -m "feat(seo): add HowTo schema and @id cross-refs to tool pages"
```

---

## Task 9: Update `@id` cross-refs in blog and services schemas

**Files:**
- Modify: `app/(marketing)/blog/[slug]/page.tsx`
- Modify: `app/(marketing)/services/page.tsx`

### Blog post

- [ ] **Step 1: Update `articleSchema` author and publisher in `app/(marketing)/blog/[slug]/page.tsx`**

Find the `articleSchema` object inside `BlogPostPage` (line ~138). Replace the `author` and `publisher` properties:

```ts
author: { "@id": `${siteConfig.url}/#person` },
publisher: { "@id": `${siteConfig.url}/#person` },
```

(These currently have `{ "@type": "Person", name: blog.author, url: siteConfig.url }` and `{ "@type": "Person", name: siteConfig.name, url: siteConfig.url }` — replace both.)

### Services page

- [ ] **Step 2: Update `servicesSchema` provider in `app/(marketing)/services/page.tsx`**

Find the `servicesSchema` object (line ~30). Replace the `provider` inside each `item`:

```ts
provider: { "@id": `${siteConfig.url}/#person` },
```

(Currently `{ "@type": "Person", name: "Smit Parekh", url: siteConfig.url }` — replace in the map callback.)

- [ ] **Step 3: Verify dev server**

```bash
pnpm dev
```

Open `http://localhost:3001/blog` and click any blog post. View page source and confirm `author: { "@id": ".../#person" }` in the `BlogPosting` schema.

Open `http://localhost:3001/services` and confirm provider uses `@id`.

- [ ] **Step 4: Commit**

```bash
git add app/(marketing)/blog/[slug]/page.tsx app/(marketing)/services/page.tsx
git commit -m "feat(seo): update author/provider @id cross-refs in blog and services schemas"
```

---

## Task 10: Expand IndexNow to cover blog posts and case studies

**Files:**
- Modify: `app/api/indexnow/route.ts`

- [ ] **Step 1: Replace the `POST` handler in `app/api/indexnow/route.ts`**

The current file has a hardcoded `ALL_URLS` array that only covers ~13 static URLs. Replace the entire file content:

```ts
import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import { toolsSEO } from "@/data/tools-seo";
import { fetchAllBlogs } from "@/lib/server/blogs";
import { fetchAllCaseStudies } from "@/lib/server/projects";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "";

const STATIC_URLS = [
  siteConfig.url,
  `${siteConfig.url}/about`,
  `${siteConfig.url}/portfolio`,
  `${siteConfig.url}/services`,
  `${siteConfig.url}/hire-me`,
  `${siteConfig.url}/contact`,
  `${siteConfig.url}/blog`,
  `${siteConfig.url}/free-tools`,
  `${siteConfig.url}/faq`,
  `${siteConfig.url}/for-students`,
  `${siteConfig.url}/changelog`,
  ...toolsSEO.map((t) => `${siteConfig.url}/free-tools/${t.slug}`),
];

export async function POST() {
  if (!INDEXNOW_KEY) {
    return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 500 });
  }

  const [blogs, caseStudies] = await Promise.all([
    fetchAllBlogs(),
    fetchAllCaseStudies(),
  ]);

  const blogUrls = blogs.map((b) => `${siteConfig.url}/blog/${b.slug}`);
  const caseStudyUrls = caseStudies.map((p) => `${siteConfig.url}/portfolio/${p.slug}`);

  const urlList = [...STATIC_URLS, ...blogUrls, ...caseStudyUrls];

  const body = {
    host: new URL(siteConfig.url).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return NextResponse.json({
    status: res.status,
    submitted: urlList.length,
    breakdown: {
      static: STATIC_URLS.length,
      blogs: blogUrls.length,
      caseStudies: caseStudyUrls.length,
    },
  });
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build 2>&1 | grep "indexnow"
```

Expected: no output (no errors).

- [ ] **Step 3: Verify the route responds correctly (dev)**

```bash
pnpm dev
```

In another terminal:
```bash
curl -X POST http://localhost:3001/api/indexnow
```

Expected: JSON response with `{ "error": "INDEXNOW_KEY not configured" }` (because INDEXNOW_KEY isn't set in dev) — this confirms the route is reachable and the import structure works.

If `INDEXNOW_KEY` is set in `.env.local`, expected response is:
```json
{ "status": 200, "submitted": <number>, "breakdown": { "static": ..., "blogs": ..., "caseStudies": ... } }
```

- [ ] **Step 4: Commit**

```bash
git add app/api/indexnow/route.ts
git commit -m "feat(seo): expand IndexNow to include all blog and case study URLs"
```

---

## Final Verification

- [ ] **Run a full production build**

```bash
pnpm build
```

Expected: build completes with 0 errors and 0 type errors.

- [ ] **Test key schemas with Google's Rich Results Test**

Visit `https://search.google.com/test/rich-results` and test:
1. `https://www.smitparekh.co.in` — should show Person + WebSite + ProfilePage
2. `https://www.smitparekh.co.in/free-tools/background-remover` — should show SoftwareApplication + HowTo
3. `https://www.smitparekh.co.in/hire-me` — should show ProfilePage + AggregateRating

- [ ] **Validate `llms.txt` is reachable**

```bash
curl https://www.smitparekh.co.in/llms.txt | head -5
```

Expected: `# Smit Parekh - Full Stack Web Developer` on the first line.
