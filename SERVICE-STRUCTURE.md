# Service Pages Structure

This document defines the 3-level hierarchy of service pages and the rules for each level.

---

## Hierarchy

```
Col 1 — Top-level services index
└── /services

Col 2 — Service category pages (3 main categories)
├── /services/development       → Development
├── /services/marketing-and-seo → Marketing & SEO
└── /services/products-and-ai   → Products & AI

Col 3 — Sub-category pages (one per service area)
├── Development
│   ├── /services/web-ecommerce          → Web & E-commerce
│   ├── /services/frontend-performance   → Frontend & Performance
│   ├── /services/backend-apis           → Backend & APIs
│   └── /services/mobile-care            → Mobile, Care & Redesign
├── Marketing & SEO
│   ├── /services/seo-services           → SEO Services
│   └── /services/ai-growth              → AI Search & Growth
└── Products & AI
    ├── /services/ai-engineering         → AI Engineering
    └── /services/products-programs      → Products & Programs

Col 4 — Leaf/slug pages (data-driven via [slug]/page.tsx)
├── Driven by data/services-catalog.ts
├── Route: /services/[slug]
└── All slugs listed below
```

---

## Col 4 Leaf Slugs (data/services-catalog.ts)

### Development
| Slug | Label | Col 3 Parent |
|---|---|---|
| `mvp-development` | MVP Development | web-ecommerce |
| `web-development` | Web Development | web-ecommerce |
| `landing-page-development` | Landing Page | web-ecommerce |
| `saas-development` | SaaS Development | web-ecommerce |
| `wordpress-development` | WordPress Dev | web-ecommerce |
| `shopify-development` | Shopify Dev | web-ecommerce |
| `ecommerce-development` | E-commerce Dev | web-ecommerce |
| `nextjs-development` | Next.js Dev | frontend-performance |
| `react-development` | React Dev | frontend-performance |
| `frontend-development` | Frontend Dev | frontend-performance |
| `performance-optimization` | Performance | frontend-performance |
| `backend-development` | Backend Dev | backend-apis |
| `api-development` | API Dev | backend-apis |
| `devops-consulting` | DevOps | backend-apis |
| `mobile-app-development` | Mobile Apps | mobile-care |
| `website-redesign` | Redesign | mobile-care |
| `website-maintenance` | Maintenance | mobile-care |

### Marketing & SEO
| Slug | Label | Col 3 Parent |
|---|---|---|
| `seo` | SEO Services | seo-services |
| `technical-seo` | Technical SEO | seo-services |
| `local-seo` | Local SEO | seo-services |
| `on-page-seo` | On-Page SEO | seo-services |
| `seo-audit` | SEO Audit | seo-services |
| `aeo-optimization` | AEO Optimization | ai-growth |
| `geo-optimization` | GEO Optimization | ai-growth |
| `content-seo` | Content SEO | ai-growth |
| `cro` | Conversion Rate Optimization | ai-growth |

### Products & AI
| Slug | Label | Col 3 Parent |
|---|---|---|
| `ai-integration` | AI Integration | ai-engineering |
| `ai-agent-development` | AI Agents | ai-engineering |
| `ai-chatbot-development` | AI Chatbots | ai-engineering |
| `aeo-geo-optimization` | AEO+GEO (combined) | ai-growth |
| `conversion-rate-optimization` | CRO (full name) | ai-growth |

---

## Rules

### 1. Every link must resolve
- Col 2 pages link to Col 3 pages — those slugs must exist as folders with `page.tsx`
- Col 3 pages link to Col 4 slugs — those slugs must exist in `data/services-catalog.ts`
- Adding a new leaf slug: add entry to `services-catalog.ts`, no new file needed

### 2. ServiceStats on every Col 2/3 page
- Import from `@/components/sections/ServiceStats`
- Use `devStats` for development pages
- Use `seoStats` for marketing/SEO pages
- Use `aiStats` for AI/products pages
- Insert between Differentiators section and FAQ section

### 3. SEO slugs
- Slugs are lowercase kebab-case, keyword-first
- Good: `mvp-development`, `technical-seo`, `aeo-optimization`
- Bad: `dev-mvp`, `seo-technical`, `optimization-aeo`

### 4. Content format (all pages)
- PageHero with SVG decoration (no images)
- Service/category cards as full-card `<Link>` with ArrowRight + group-hover
- Max 3 differentiators (not 8 sections)
- ServiceStats animated section
- 3 FAQs
- Lead form (ServiceLeadForm)

### 5. Git workflow
- `git add` only — never `git commit` or `git push` automatically

---

## ServiceStats Presets (components/sections/ServiceStats.tsx)

| Export | Use on |
|---|---|
| `devStats` | development, web-ecommerce, frontend-performance, backend-apis, mobile-care |
| `seoStats` | marketing-and-seo, seo-services, ai-growth |
| `aiStats` | products-and-ai, ai-engineering, products-programs |

---

## Hire Developer Pages

```
/hire-developer              → Hub: all regions + services overview + About Smit
/hire-developer/gulf         → Gulf/GCC hub: UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman
/hire-developer/[country]    → Individual country page (data/geo-pages.ts)
  Countries: uae, saudi-arabia, qatar, kuwait, bahrain, oman, usa, uk, india
```
