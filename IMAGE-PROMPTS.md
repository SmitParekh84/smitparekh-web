# Image Generation Prompts

All images are OG/social share banners — **1200 × 630 px**.  
Place generated files in `public/images/services-og/` with the exact filename shown.

Design system reference for consistency:
- Background: dark navy `#0a0a1a`
- Primary blue: `#0628FF`
- Cyan accent: `#00C5EC`
- Text: white `#fafafa`
- Style: minimal, modern tech — no clutter, no stock-photo vibes

---

## Already Generated (do not regenerate)

These images exist and are in use:

| File | Page |
|------|------|
| `public/images/Smit-Parekh-Home.png` | `/` (home) |
| `public/images/Smit-Parekh-Home-og.png` | `/` (home OG fallback) |
| `public/images/smit-parekh-hire-me.png` | `/hire-me` |
| `public/images/smit-parekh-about-full-stack-developer.png` | `/about` |
| `public/images/smit-parekh-web-development-services.png` | `/services` |
| `public/images/smit-parekh-blog-web-development.png` | `/blog` |
| `public/images/smit-parekh-portfolio-case-studies.png` | `/portfolio` |
| `public/images/smit-parekh-free-developer-tools.png` | `/free-tools` |
| `public/images/hire-react-developer.png` | `/react-developer` |
| `public/images/hire-nextjs-developer.png` | `/nextjs-developer` |
| `public/images/hire-nodejs-developer.png` | `/nodejs-developer` |
| `public/images/hire-nestjs-developer.png` | `/nestjs-developer` |
| `public/images/hire-full-stack-developer.png` | `/full-stack-developer` |
| `public/images/hire-api-developer.png` | `/api-developer` |
| `public/images/hire-saas-developer.png` | `/saas-developer` |
| `public/images/hire-postgresql-developer.png` | `/postgresql-developer` |
| `public/images/hire-typescript-developer.png` | `/typescript-developer` |
| `public/images/tools-og/*.png` | `/free-tools/[slug]` (all tool OG images) |

---

## Service Pages — `public/images/services-og/`

These pages currently use `Smit-Parekh-Home-og.png` as fallback.  
Generate and drop each file into `public/images/services-og/`.  
After generating, update `app/(marketing)/services/[slug]/page.tsx` to reference the correct file per slug.

---

### `web-development.png`
**Page:** `/services/web-development`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Web Development Services", grey subtitle "Next.js · React · Node.js · PostgreSQL · AWS — End-to-End", below that row of three small pills "Frontend", "Backend", "Cloud". Right side: abstract vertical stack diagram — clean layered horizontal blocks with blue (#0628FF) header layer, cyan (#00C5EC) middle layer, darker bottom layer, connected by thin glowing vertical lines suggesting a full-stack architecture, soft blue glow. Thin blue-to-cyan gradient bar at very top. Bottom right "smitparekh.co.in/services/web-development". Ultra minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `frontend-development.png`
**Page:** `/services/frontend-development`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Frontend Development", grey subtitle "React · Next.js · TypeScript · Tailwind CSS · 95+ Lighthouse", below that a cyan pill "Accessible · Performant · Responsive". Right side: abstract browser window frame with a speed gauge showing "95" in cyan, and below it a small component tree diagram in blue and cyan lines on a dark card with subtle glow. Thin blue-to-cyan gradient bar at top. Bottom right "smitparekh.co.in/services/frontend-development". Minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `backend-development.png`
**Page:** `/services/backend-development`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Backend Development", grey subtitle "Node.js · NestJS · Express · GraphQL · 10K+ req/day APIs", below that a green pill "99.9% Uptime". Right side: abstract server rack visual — three stacked horizontal bars with blue (#0628FF) left accent borders, small metric labels "10K req/s" in cyan monospace, "99.9%" in green, soft blue glow behind the stack. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/services/backend-development". Ultra minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `api-development.png`
**Page:** `/services/api-development`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "API Development", grey subtitle "REST · GraphQL · JWT Auth · Rate Limiting · OpenAPI Docs", below that a blue pill "Typed · Documented · Secured". Right side: abstract terminal-style card showing HTTP verbs "GET", "POST", "PUT" in blue (#0628FF) and a small JSON snippet "{ id: 1, status: ok }" in cyan (#00C5EC) monospace font, dark card with soft glow. Thin blue-to-cyan gradient bar at top. Bottom right "smitparekh.co.in/services/api-development". Ultra minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `saas-development.png`
**Page:** `/services/saas-development`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "SaaS Development", grey subtitle "Multi-Tenant · Stripe Billing · Auth Flows · Admin Dashboards · Next.js", below that a blue pill "From Idea to Production". Right side: abstract SaaS dashboard mockup — clean minimal UI card with a sidebar strip, header bar, and two small data widgets showing a line graph and a metric number, all in blue and cyan on dark card, soft glow. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/services/saas-development". Minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `ecommerce-development.png`
**Page:** `/services/ecommerce-development`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "E-Commerce Development", grey subtitle "Headless Shopify · Next.js · Stripe · Product Catalogue · SEO", below that a blue pill "Conversion-Optimised". Right side: abstract online store card — clean minimal browser frame showing a product grid layout with three placeholder product cards in blue-cyan gradient headers, a small shopping cart icon in cyan at top right, soft glow. Thin gradient bar at top. Bottom right "smitparekh.co.in/services/ecommerce-development". Ultra minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `seo.png`
**Page:** `/services/seo`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "SEO Services", grey subtitle "Technical SEO · Core Web Vitals · Schema · Sitemaps · Content Strategy", below that a cyan pill "95+ Lighthouse · Rank Higher". Right side: abstract upward trending chart — clean minimal line graph curving upward in cyan (#00C5EC) with a soft glow under the line, a small search icon in blue above, on a dark card. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/services/seo". Minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `technical-seo.png`
**Page:** `/services/technical-seo`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Technical SEO", grey subtitle "Crawlability · Core Web Vitals · Schema Markup · Site Speed · Indexation", below that a blue pill "Lighthouse 95+ Standard". Right side: abstract audit checklist card — clean dark card with five rows, each row showing a small cyan checkmark icon and a short horizontal label bar in blue, top row has green checkmark, suggesting a passing audit report, soft glow. Thin gradient bar at top. Bottom right "smitparekh.co.in/services/technical-seo". Ultra minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `local-seo.png`
**Page:** `/services/local-seo`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Local SEO", grey subtitle "Google Business Profile · Local Pack · NAP Consistency · Reviews · Citations", below that a cyan pill "Rank in Your City". Right side: abstract map pin visual — a clean geometric map pin shape in blue (#0628FF) with a cyan glow ring around it, below it two small horizontal bars suggesting search result snippets, on a dark card. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/services/local-seo". Minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `seo-audit.png`
**Page:** `/services/seo-audit`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "SEO Audit", grey subtitle "Full-Site Analysis · Technical · On-Page · Backlinks · Actionable Report", below that a blue pill "Delivered in 48 Hours". Right side: abstract report card visual — clean dark card with a circular score gauge showing "85" in cyan at top, below it four short horizontal progress bars in blue at different lengths suggesting category scores, soft glow. Thin gradient bar at top. Bottom right "smitparekh.co.in/services/seo-audit". Ultra minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `ai-integration.png`
**Page:** `/services/ai-integration`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "AI Integration", grey subtitle "OpenAI · Claude · RAG Pipelines · Embeddings · Streaming Chat UI", below that a cyan pill "Add AI to Your Product". Right side: abstract neural network visual — clean geometric nodes connected by thin glowing lines in blue and cyan, forming a minimal AI brain/network pattern, soft pulse glow around the center node, on a dark card. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/services/ai-integration". Ultra minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `mvp-development.png`
**Page:** `/services/mvp-development`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "MVP Development", grey subtitle "Idea to Deployed Product in 6–10 Weeks · React · Node.js · AWS", below that a blue pill "Fixed Scope · Fixed Price". Right side: abstract rocket launch visual — clean geometric rocket silhouette in blue (#0628FF) with a cyan gradient exhaust trail pointing upward-right, minimal and iconic, soft blue glow behind it, on a dark card. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/services/mvp-development". Minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `nextjs-development.png`
**Page:** `/services/nextjs-development`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Next.js Development", grey subtitle "App Router · Server Components · SEO-first · Vercel · 95+ Lighthouse", below that a cyan pill "Production-Grade Next.js". Right side: abstract browser frame with a performance score meter "95" in cyan and below it a small server component tree diagram — two boxes labeled "Server" and "Client" connected by a cyan line, on a dark card with glow. Thin gradient bar at top. Bottom right "smitparekh.co.in/services/nextjs-development". Minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `react-development.png`
**Page:** `/services/react-development`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "React Development", grey subtitle "TypeScript · Redux Toolkit · React Query · 40% Performance Gains", below that a blue pill "4+ Years Experience". Right side: abstract minimal code window card showing a React component outline — angled brackets, component name "function App()" in blue (#0628FF) and props in cyan (#00C5EC) monospace font, soft glow. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/services/react-development". Ultra minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `performance-optimization.png`
**Page:** `/services/performance-optimization`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Performance Optimization", grey subtitle "Core Web Vitals · LCP · CLS · INP · Lighthouse 95+ · Page Speed", below that a cyan pill "Faster Sites, Better Rankings". Right side: abstract speed dashboard — a clean circular gauge with a needle pointing to "95" in bright cyan, small metric labels "LCP 1.2s" and "CLS 0.01" in grey monospace below it, on a dark card with soft blue glow. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/services/performance-optimization". Ultra minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `shopify-development.png`
**Page:** `/services/shopify-development`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Shopify Development", grey subtitle "Custom Themes · Headless Shopify · Liquid · Storefront API · Conversions", below that a blue pill "Shopify Plus Ready". Right side: abstract storefront card — clean minimal online store UI frame with a product card (placeholder box with blue-cyan gradient, price tag in cyan, "Add to Cart" button in blue), soft glow behind card. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/services/shopify-development". Minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

## Other Pages — `public/images/`

---

### `for-students.png`
**Page:** `/for-students`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Developer for Student Projects", grey subtitle "Final Year Projects · Hackathons · Portfolio Sites · Budget-Friendly Pricing", below that a small green badge "Available for Students · UK · Canada · US". Right side: abstract graduation cap icon combined with a floating code card — simple geometric mortarboard shape in blue (#0628FF) with a small code snippet card below it showing "< Project />" in cyan monospace, soft glow. Thin blue-to-cyan gradient bar at top. Bottom right "smitparekh.co.in/for-students". Ultra minimal dark tech, no photography. --ar 1200:630 --v 6 --style raw
```

---

### `devops-consulting.png`
**Page:** `/services/devops-consulting`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "DevOps & Cloud Consulting", grey subtitle "CI/CD · Docker · AWS · Zero-Downtime Deploys · 99.9% Uptime", below that a green pill "Infra Audit in 24h". Right side: abstract pipeline diagram — three horizontal flow nodes connected by arrows in blue (#0628FF) to cyan (#00C5EC), each node a small rounded rectangle labeled "Build", "Test", "Deploy" with a green checkmark on the last node, soft blue glow. Thin blue-to-cyan gradient bar at top. Bottom right "smitparekh.co.in/services/devops-consulting". Ultra minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `landing-page-development.png`
**Page:** `/services/landing-page-development`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Landing Page Development", grey subtitle "Next.js · 95+ Lighthouse · <1.2s LCP · High Converting · 48h Delivery", below that a cyan pill "SEO-first · A/B Ready". Right side: abstract landing page wireframe card — clean minimal browser frame with a large hero block at top in blue gradient, below it two small CTA button shapes in cyan, and a row of three small social proof stars, soft glow. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/services/landing-page-development". Minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `wordpress-development.png`
**Page:** `/services/wordpress-development`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "WordPress Development", grey subtitle "Custom Themes · WooCommerce · Headless WP + Next.js · 95+ Lighthouse", below that a blue pill "No Page Builders · Ever". Right side: abstract CMS card — clean dark card with a content editor sidebar strip on the left in blue, a large content area on the right with a few horizontal block lines in cyan suggesting Gutenberg blocks, soft glow. Thin gradient bar at top. Bottom right "smitparekh.co.in/services/wordpress-development". Minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `mobile-app-development.png`
**Page:** `/services/mobile-app-development`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Mobile App Development", grey subtitle "React Native · Expo · iOS & Android · TypeScript · App Store Submission", below that a cyan pill "One Codebase · Two Stores". Right side: two clean mobile phone silhouettes side by side — one labeled "iOS" and one "Android", both showing a minimal app screen with blue header and cyan accent elements, a small React logo between them suggesting shared code, soft blue glow. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/services/mobile-app-development". Minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `hire-aws-developer.png`
**Page:** `/aws-developer`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Hire an AWS Developer", grey subtitle "EC2 · Lambda · RDS · CloudFront · CDK · IaC — 99.9% Uptime Infra", below that a cyan pill "Top Rated · Available Now". Right side: abstract cloud architecture visual — clean minimal cloud icon outline in blue (#0628FF) with three smaller service node boxes below it (labeled "Lambda", "RDS", "S3" in small cyan monospace), connected by thin glowing lines, soft blue glow behind diagram. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/aws-developer". Ultra minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `hire-wordpress-developer.png`
**Page:** `/wordpress-developer`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Hire a WordPress Developer", grey subtitle "Custom Themes · WooCommerce · Headless WP · PHP · 95+ Lighthouse", below that a blue pill "50+ Sites Shipped · Top Rated". Right side: abstract WordPress-themed card — clean minimal browser frame with a sidebar CMS editor strip in blue, a large content canvas with horizontal Gutenberg block outlines in cyan, small "WooCommerce" text badge in the corner, soft glow. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/wordpress-developer". Minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

### `hire-react-native-developer.png`
**Page:** `/react-native-developer`

```
Dark navy background (#0a0a1a). Professional OG banner. Left side: bold white heading "Hire a React Native Developer", grey subtitle "Expo · iOS & Android · TypeScript · EAS · App Store Ready", below that a cyan pill "2 Apps Live · 4.5★ Rated". Right side: two clean mobile phone silhouettes side by side — one with an iOS-style top notch, one with an Android-style bezel, both showing a minimal app screen with blue header and cyan accent, a small React atom logo between them, soft blue glow. Thin gradient bar blue-to-cyan at top. Bottom right "smitparekh.co.in/react-native-developer". Minimal dark tech. --ar 1200:630 --v 6 --style raw
```

---

## Notes

- After generating, drop each service file in `public/images/services-og/` with the exact filename shown.
- For-students image goes in `public/images/for-students.png`.
- After generating service images, update the OG image reference in `app/(marketing)/services/[slug]/page.tsx` to use:
  ```ts
  url: `${siteConfig.url}/images/services-og/${service.slug}.png`,
  ```
- If Midjourney adds text incorrectly, regenerate without the text parts and add text in Canva/Figma.
- Use the same generation session so colors stay coherent across all banners.
- Consistent style tip: seed the same `--seed` value across all service banners for visual coherence.
