# SEO / GEO / Schema Comprehensive Sweep

**Date:** 2026-05-06
**Goal:** Improve AI/GEO citation presence (ChatGPT, Perplexity, Google AI Overviews) and "hire a [X] developer" ranking via a structured data + entity foundation overhaul.

---

## 1. GEO/AI Entity Foundation

### 1.1 `public/llms.txt`
- Fix "3.5+ years" → "4+"
- List all 11 tools with one-line descriptions
- Add page links: Blog, Portfolio, Hire Me, For Students, FAQ, Changelog
- Add Availability block (Q3 2026, limited spots)
- Add Case Studies section so AI crawlers treat portfolio as citable content

### 1.2 Enhanced `Person` Schema (`app/page.tsx`)
Current schema already has `name`, `url`, `jobTitle`, `description`, `email`, `image`, `knowsAbout`.

Add:
- `"@id": "https://www.smitparekh.co.in/#person"` — stable IRI used by all other schemas as a cross-reference
- `sameAs: [linkedin, github, x, upwork, instagram]` — platform entity association
- `worksFor`: `Organization` → `{ name: "Marketixpert", url: "https://www.marketixpert.com" }` (from `siteConfig.social.marketixpert`)

---

## 2. Centralized Schema Library (`lib/seo/schema.ts`)

Single file of pure factory functions — no side effects, all return plain objects ready for `JSON.stringify`. Every page imports from here.

| Function | Return type | Used on |
|---|---|---|
| `personSchema()` | `Person` | home, about |
| `profilePageSchema()` | `ProfilePage` | home, about |
| `websiteSchema()` | `WebSite` + `SearchAction` | home |
| `articleSchema(blog)` | `BlogPosting` | `/blog/[slug]` |
| `softwareAppSchema(tool)` | `SoftwareApplication` | `/free-tools/[slug]` |
| `howToSchema(tool, steps)` | `HowTo` | `/free-tools/[slug]` |
| `serviceSchema()` | `Service` / `ProfessionalService` | `/services` |
| `aggregateRatingSchema(cfg)` | `AggregateRating` | `/hire-me` |
| `breadcrumbSchema(items)` | `BreadcrumbList` | all pages |

**Cross-referencing:** every schema that involves the author/provider uses `{ "@id": "https://www.smitparekh.co.in/#person" }` rather than repeating the full Person object.

**Types:** all parameters are typed — `blog` matches the existing blog type from `lib/server/blogs.ts`, `tool` matches the tool SEO type from `data/tools-seo.ts`.

---

## 3. Page-level Schema Integrations

### 3.1 Home (`app/page.tsx`)
Add `<script type="application/ld+json">` blocks for:
- `profilePageSchema()` — `ProfilePage` wrapping `/#person`
- enhanced `personSchema()` — with `@id`, `sameAs`, `worksFor`
- `websiteSchema()` — `WebSite` entity only (no `SearchAction` — no global search URL exists)

### 3.2 About (`app/(marketing)/about/page.tsx`)
Add:
- `profilePageSchema()` referencing `/#person`
- `breadcrumbSchema([Home, About])`

### 3.3 Blog post (`app/(marketing)/blog/[slug]/page.tsx`)
Add `articleSchema(blog)`:
- `@type: BlogPosting`
- `headline`, `description`, `image` (coverImage)
- `datePublished: blog.createdAt`, `dateModified: blog.updatedAt`
- `author: { "@id": "/#person" }`
- `publisher: { "@id": "/#person" }`
- `mainEntityOfPage: blog URL`

### 3.4 Tool page (`app/(tools)/free-tools/[slug]/page.tsx`)
Add two schemas:
- `softwareAppSchema(tool)`: `applicationCategory: "WebApplication"`, `operatingSystem: "Any"`, `offers: { price: "0" }`, `author: { "@id": "/#person" }`
- `howToSchema(tool, steps)`: steps sourced from a new `data/tools-howto.ts` file — each tool gets 3–5 plain-text steps describing how to use it

### 3.5 Services (`app/(marketing)/services/page.tsx`)
Add `serviceSchema()`:
- Array of `Service` objects (one per service offered)
- Each `Service` has `provider: { "@id": "/#person" }`, `name`, `description`, `serviceType`
- Wrapped in a `ProfessionalService` or just individual `Service` nodes

### 3.6 Hire Me (`app/(marketing)/hire-me/page.tsx`)
Add `aggregateRatingSchema(cfg)`:
- Reads from `siteConfig.aggregateRating`
- `@type: Person` + `aggregateRating` property
- `ratingValue`, `reviewCount`, `bestRating: 5`, `worstRating: 1`

---

## 4. IndexNow Expansion (`app/api/indexnow/route.ts`)

Current: ~13 hardcoded static URLs.

Change: call `fetchAllBlogs()` and `fetchAllCaseStudies()` (same server functions used by `sitemap.ts`) at request time, map to full URLs, append to the static list.

Result: all blog posts and case studies are submitted on every IndexNow call — full site coverage.

---

## 5. AggregateRating Config (`data/site.ts`)

Add to the `siteConfig` object:

```ts
aggregateRating: {
  ratingValue: 5.0,
  reviewCount: 12,
  bestRating: 5,
  worstRating: 1,
},
```

Manual update by the developer when review count changes. No DB or admin UI needed.

---

## Data Sources

| Data | Source |
|---|---|
| Blog list | `lib/server/blogs.ts` → `fetchAllBlogs()` |
| Case studies | `lib/server/projects.ts` → `fetchAllCaseStudies()` |
| Tool metadata | `data/tools-seo.ts` → `toolsSEO`, `getToolSEO()` |
| Tool HowTo steps | New file: `data/tools-howto.ts` |
| Site config | `data/site.ts` → `siteConfig` |
| Social URLs | `siteConfig.social` |

---

## Files Changed / Created

| File | Action |
|---|---|
| `public/llms.txt` | Update |
| `data/site.ts` | Add `aggregateRating` field |
| `data/tools-howto.ts` | Create — HowTo steps per tool slug |
| `lib/seo/schema.ts` | Create — all schema factory functions |
| `app/page.tsx` | Add `profilePageSchema`, enhanced `personSchema`, `websiteSchema` |
| `app/(marketing)/about/page.tsx` | Add `profilePageSchema`, `breadcrumbSchema` |
| `app/(marketing)/blog/[slug]/page.tsx` | Add `articleSchema` |
| `app/(tools)/free-tools/[slug]/page.tsx` | Add `softwareAppSchema`, `howToSchema` |
| `app/(marketing)/services/page.tsx` | Add `serviceSchema` |
| `app/(marketing)/hire-me/page.tsx` | Add `aggregateRatingSchema` |
| `app/api/indexnow/route.ts` | Expand URL list dynamically |

---

## Out of Scope

- Changing any visible UI
- Hreflang (single language site)
- VideoObject schema (no videos currently)
- GSC sitemap submission (manual step)
