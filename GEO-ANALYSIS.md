# GEO / AEO Analysis — smitparekh.co.in
Last updated: 2026-05-16

---

## GEO Readiness Score: 74/100

| Category | Score | Notes |
|----------|-------|-------|
| AI Crawler Access | 16/20 | GPTBot now fixed; Google-Extended still blocked (intentional) |
| llms.txt Quality | 18/20 | Comprehensive — definition blocks, stats, hire intent |
| Schema Markup | 16/20 | Person, Org, FAQ, Service, WebSite, ProfilePage — solid |
| Content Citability | 12/20 | Good FAQs; needs more 134–167 word standalone answer blocks |
| Technical (SSR) | 10/10 | Next.js SSR — all content is crawler-accessible |
| Brand Signals | 2/10 | Missing Wikipedia, Reddit, YouTube presence |

---

## Platform Breakdown

| Platform | Score | Blocker |
|----------|-------|---------|
| Google AI Overviews | 78/100 | Schema strong; needs more citability blocks |
| ChatGPT | 65/100 | GPTBot was blocked (now fixed) |
| Perplexity | 62/100 | No Reddit/community validation signals |
| Bing Copilot | 58/100 | Low Bing-specific authority signals |

---

## AI Crawler Access — FIXED

| Crawler | Before | After | Impact |
|---------|--------|-------|--------|
| GPTBot | ❌ BLOCKED | ✅ Allowed | ChatGPT web search citations now possible |
| OAI-SearchBot | ❌ Missing | ✅ Added | OpenAI SearchGPT visibility |
| ChatGPT-User | ✅ Allowed | ✅ Allowed | — |
| PerplexityBot | ✅ Allowed | ✅ Allowed | — |
| ClaudeBot | ✅ Allowed | ✅ Allowed | — |
| anthropic-ai | ❌ Missing | ✅ Added | Brand signal to Anthropic |
| cohere-ai | ❌ Missing | ✅ Added | Cohere AI visibility |
| Google-Extended | ❌ Blocked | ❌ Blocked | OK — only Gemini training, not AI Overviews |
| CCBot / Bytespider | ❌ Blocked | ❌ Blocked | OK — low-value scrapers |

---

## llms.txt Status — UPGRADED

**Before:** Good structure, missing stats and definition blocks.
**After:** Added:
- `"Who Is Smit Parekh"` — 134-word self-contained definition block for AI citation
- `"What Clients Hire Smit Parekh For"` — intent-matched hire queries
- Specific stats: `10,000+ daily API requests`, `99.9% uptime`, `20+ production apps`
- Structured specialist pages section

---

## Schema Markup

### Implemented ✅
- `Person` (with `givenName`, `familyName`, `nationality`, `knowsAbout`)
- `Organization` (NEW — with `founder`, `contactPoint`, `areaServed`)
- `WebSite` (with `alternateName` array)
- `ProfilePage` (home + about)
- `FAQPage` (home + about + developer pages)
- `Service` (home)
- `BreadcrumbList` (all pages)
- `EducationalOccupationalCredential` (certifications on /about)

### Missing / To Add
- `Article` schema on blog posts → check `/blog/[slug]/page.tsx`
- `datePublished` + `dateModified` on all pages
- `HowTo` schema for tutorial blog posts
- `SoftwareApplication` schema for free tools

---

## Brand Mention Analysis

| Platform | Status | Action |
|----------|--------|--------|
| LinkedIn | ✅ Active | Profile linked in sameAs |
| GitHub | ✅ Active | Profile linked in sameAs |
| Upwork | ✅ Active | Profile linked in sameAs |
| Reddit | ❌ No presence | Post answers in r/webdev, r/reactjs, r/nextjs |
| YouTube | ❌ No presence | Highest AI citation signal (0.737 correlation) |
| Wikipedia | ❌ No presence | Not viable at current scale |
| X (Twitter) | ✅ Account exists | Linked in sameAs |

---

## Content Citability Analysis

### What's Working
- FAQ sections on home, about, developer pages — good Q&A format
- Specific numbers: `4+ years`, `20+ projects`, `10K+ daily API requests`, `99.9% uptime`
- Direct answers in FAQ items (80–150 words each)

### Gaps — Pages needing standalone answer blocks
1. `/services` — no "What does a full-stack developer do?" definition block
2. `/hire-me` — no "How to hire a freelance developer" answer block
3. `/for-students` — no "What is X" definition for each tool/resource
4. `/free-tools` — tool pages lack "What is [tool name]?" first-paragraph definitions

---

## Top 5 Highest-Impact Changes

| Priority | Change | Impact | Status |
|----------|--------|--------|--------|
| 1 | Unblock GPTBot | ChatGPT citations unlocked | ✅ Done |
| 2 | Add OAI-SearchBot | SearchGPT visibility | ✅ Done |
| 3 | Upgrade llms.txt with definition blocks + stats | All AI platforms | ✅ Done |
| 4 | Add Organization schema | Entity graph depth | ✅ Done |
| 5 | Start posting on Reddit (r/webdev, r/nextjs) | Perplexity citations | ⏳ Ongoing |

---

## Next Actions (implement in code)

### High value — quick wins
- [x] Add `dateModified` to all page schemas (ProfilePage home/about + SoftwareApplication tools — 2026-05-18)
- [x] Add `Article` schema to `/blog/[slug]/page.tsx` (was already done — BlogPosting schema present)
- [x] Add `SoftwareApplication` schema to `/free-tools/[slug]/page.tsx` (was already done — added dateModified/datePublished)
- [x] Add "What is [tool]?" definition block to every tool page (`<h2>What is {shortTitle}?</h2>` before intro — 2026-05-18)

### Medium effort
- [ ] Add `HowTo` schema to tutorial blog posts
- [ ] Add `Review`/`AggregateRating` schema to services pages (if testimonials exist)
- [ ] Create `/llms-full.txt` with full blog post summaries

### Ongoing (off-site)
- [ ] Post weekly answers on Reddit in r/webdev, r/reactjs, r/nextjs (Perplexity cites Reddit heavily — 46.7%)
- [ ] Start YouTube channel or at minimum a YouTube video (0.737 AI citation correlation)
- [ ] Add Smit Parekh entry to Wikidata (free, no Wikipedia required)
