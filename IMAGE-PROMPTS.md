# Image Generation Prompts

All images are OG/social share banners — **1200 × 630 px**.

Design system reference for consistency:

- Background: dark navy `#0a0a1a`
- Primary blue: `#0628FF`
- Cyan accent: `#00C5EC`
- Text: white `#fafafa`
- Style: minimal, modern tech — no clutter, no stock-photo vibes

**Light-mode palette for the pending batch:**

- Background: clean off-white `#fafafa` / very soft blue-white `#f5f7ff`
- Text / dark glyphs: near-black `#0a0a1a`
- Primary blue: `#0628FF` · Cyan accent: `#00C5EC` (used as crisp light accents, soft glows, and gradients on the light ground)
- Soft, diffuse shadows; airy and bright — no dark backgrounds

**Shared prompt rules (apply to every prompt below):**

- Aspect ratio: `--ar 1200:630` (Midjourney) / 1200 × 630 px export.
- Leave the **left third clear / low-detail** for an overlaid headline added later in Canva/Figma. Do **not** rely on AI to render legible text.
- Single consistent `--seed` across the whole batch for visual coherence.
- Mood: minimal, modern, bright, editorial, light-tech. No stock-photo people, no clutter, no neon overload, no generic "circuit board" cliché.

---

## Where to generate (image sites)

Paste the prompts below into any of these. For these light, minimal banners **Google ImageFX / Imagen** and **Ideogram** give the cleanest results; use **Midjourney** if you want the `--ar` / `--seed` flags to work natively.

| Site                          | URL                                                                     | Cost        | Native 1200×630?                                       | Best for                                                                   |
| ----------------------------- | ----------------------------------------------------------------------- | ----------- | ------------------------------------------------------ | -------------------------------------------------------------------------- |
| **Google ImageFX (Imagen)**   | https://aimagefx.withgoogle.com / https://labs.google/fx/tools/image-fx | Free        | Pick **Widescreen 16:9**, then crop/export to 1200×630 | Clean, bright light-mode scenes — top pick                                 |
| **Ideogram**                  | https://ideogram.ai                                                     | Free tier   | Choose **16:9** aspect                                 | Crisp graphics + the _only_ one reliable at legible text if you skip Canva |
| **Midjourney**                | https://www.midjourney.com                                              | Paid        | Yes — append `--ar 1200:630 --seed <n>`                | Premium look, native ratio + consistent seed across the batch              |
| **ChatGPT (GPT-4o / DALL·E)** | https://chatgpt.com                                                     | Free / Plus | Ask for "1200×630 landscape"                           | Quick iteration, follows complex prompt wording well                       |
| **Leonardo.Ai**               | https://leonardo.ai                                                     | Free tier   | Custom dimensions → 1200×630                           | Fine control, presets, upscaling                                           |
| **Recraft**                   | https://www.recraft.com                                                 | Free tier   | Custom 1200×630                                        | Vector/flat brand-style art, exact-size export                             |
| **Canva (Magic Media)**       | https://www.canva.com                                                   | Free / Pro  | Set canvas to 1200×630 first                           | Generate **and** overlay the headline text in one place                    |

> **Workflow:** generate the art without text → import into **Canva or Figma** at 1200×630 → overlay the headline using the brand palette → export PNG → drop into `public/images/`.

---

## 🧩 Banner template (with my photo) — the standard layout

This is the house style (same as `smit-parekh-web-development-services.png`). Build **one reusable Canva/Figma frame** at 1200×630 and swap the copy per page.

```
┌──────────────────────────────────────────────────────────┐
│  ·· (faint dotted texture, top-left)                      │
│                                                           │
│   Smit Parekh        ← wordmark, "Parekh" in blue #0628FF │
│   ──                  ← short blue underline              │
│                                          ╭──────────╮      │
│   BIG HEADLINE        ← 2–3 lines,       │          │      │
│   last line in blue      near-black      │  MY      │      │
│                                          │  PHOTO   │      │
│   Subhead in grey, one phrase in blue.   │ (cutout) │      │
│                                          │          │      │
│   [</>]   [▭]    [◔]     [✓]            ╰──────────╯      │
│   Pill1   Pill2  Pill3   Pill4   ← 4 feature pills        │
│                              ·· (dotted texture, bottom)   │
└──────────────────────────────────────────────────────────┘
```

**Fixed elements (every banner):**

- Background: light off-white `#fafafa`, with a faint **soft-blue circle/blob** behind the photo and tiny **dotted-grid** textures in corners.
- Wordmark top-left: **Smit** (near-black) **Parekh** (blue `#0628FF`) + short blue underline.
- Headline: bold near-black `#0a0a1a`, the **last line in blue** `#0628FF`.
- Subhead: medium grey, with one key phrase in blue.
- A row of **4 feature pills** — blue line-icon + bold label + small grey sub-label.
- **My photo: a real cutout (transparent PNG), composited in Canva/Figma — AI cannot reproduce my face.** Default side = **right** (mirror to left if you prefer; keep the _opposite_ side clear for text).

**How to use AI here:** generate **only the light background plate** (blob + dotted textures, no text, no person) with the prompt below, then layer your photo cutout + text on top in Canva/Figma.

> **Background-plate prompt (reuse for all pages):**
> `Clean minimal OG banner background, off-white #fafafa, a large soft pale-blue circle blob on the [right/left] side, subtle dotted-grid texture in the corners, faint thin concentric arc lines, lots of empty space, bright, airy, modern tech branding, no text, no people, flat soft shadows --ar 1200:630 --seed 1200`

Where to get a clean photo cutout: **remove.bg**, **Canva → Background Remover**, or your own `/free-tools` background remover.

---

## ⚠️ Pending — optional banners not yet created

The 13 dedicated banners below have been **generated, added to `public/images/`, and wired into each page's `openGraph` / `twitter` metadata** ✅ (see _Already Generated_). Only these two legal pages remain — still fine on the generic banner, generate them only if you want full coverage. Build from the **Banner template above**, drop into `public/images/`, then set `openGraph.images` in the page.

| Page → filename                                                  | Size (px)  | Headline             | Subhead                                  | 4 feature pills (icon · label · sub)                                          | Photo |
| --------------------------------------------------------------- | ---------- | -------------------- | ---------------------------------------- | ---------------------------------------------------------------------------- | ----- |
| `/privacy-policy` _(optional)_ → `smit-parekh-privacy-policy.png` | 1200 × 630 | **Privacy** Policy   | How your **data is handled** and kept safe. | 🛡 Data · Protected · 🔒 Secure · Storage · 👁 No · Selling · ✓ GDPR · Aware | Right |
| `/terms` _(optional)_ → `smit-parekh-terms.png`                  | 1200 × 630 | **Terms** of Service | The terms for **using this site** and my services. | 📄 Terms · Clear · 🤝 Fair · Usage · ⚖ Simple · Language · ✓ Transparent · Always | Right |

> Copy blocks (headline / subhead / pills) for the 13 completed banners are preserved in git history if you ever need to regenerate them.

---

## Already Generated (do not regenerate)

| Preview                                                       | File                                         | Page                                      |
| ------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------- |
| ![](public/images/Smit-Parekh-Home.png)                       | `Smit-Parekh-Home.png`                       | `/` (home)                                |
| ![](public/images/Smit-Parekh-Home-og.png)                    | `Smit-Parekh-Home-og.png`                    | `/` (home OG fallback)                    |
| ![](public/images/smit-parekh-hire-me.png)                    | `smit-parekh-hire-me.png`                    | `/hire-me`                                |
| ![](public/images/smit-parekh-about-full-stack-developer.png) | `smit-parekh-about-full-stack-developer.png` | `/about`                                  |
| ![](public/images/smit-parekh-web-development-services.png)   | `smit-parekh-web-development-services.png`   | `/services`                               |
| ![](public/images/smit-parekh-blog-web-development.png)       | `smit-parekh-blog-web-development.png`       | `/blog`                                   |
| ![](public/images/smit-parekh-portfolio-case-studies.png)     | `smit-parekh-portfolio-case-studies.png`     | `/portfolio`                              |
| ![](public/images/smit-parekh-free-developer-tools.png)       | `smit-parekh-free-developer-tools.png`       | `/free-tools`                             |
| ![](public/images/for-students.png)                           | `for-students.png`                           | `/for-students`                           |
| ![](public/images/hire-react-developer.png)                   | `hire-react-developer.png`                   | `/react-developer`                        |
| ![](public/images/hire-nextjs-developer.png)                  | `hire-nextjs-developer.png`                  | `/nextjs-developer`                       |
| ![](public/images/hire-nodejs-developer.png)                  | `hire-nodejs-developer.png`                  | `/nodejs-developer`                       |
| ![](public/images/hire-nestjs-developer.png)                  | `hire-nestjs-developer.png`                  | `/nestjs-developer`                       |
| ![](public/images/hire-full-stack-developer.png)              | `hire-full-stack-developer.png`              | `/full-stack-developer`                   |
| ![](public/images/hire-api-developer.png)                     | `hire-api-developer.png`                     | `/api-developer`                          |
| ![](public/images/hire-saas-developer.png)                    | `hire-saas-developer.png`                    | `/saas-developer`                         |
| ![](public/images/hire-postgresql-developer.png)              | `hire-postgresql-developer.png`              | `/postgresql-developer`                   |
| ![](public/images/hire-typescript-developer.png)              | `hire-typescript-developer.png`              | `/typescript-developer`                   |
| ![](public/images/hire-aws-developer.png)                     | `hire-aws-developer.png`                     | `/aws-developer`                          |
| ![](public/images/hire-wordpress-developer.png)               | `hire-wordpress-developer.png`               | `/wordpress-developer`                    |
| ![](public/images/hire-react-native-developer.png)            | `hire-react-native-developer.png`            | `/react-native-developer`                 |
| ![](public/images/smit-parekh-ai-seo-consultant.png)          | `smit-parekh-ai-seo-consultant.png`          | `/ai-seo-consultant`                      |
| ![](public/images/smit-parekh-generative-engine-optimization.png) | `smit-parekh-generative-engine-optimization.png` | `/generative-engine-optimization` |
| ![](public/images/hire-full-stack-ai-developer.png)           | `hire-full-stack-ai-developer.png`           | `/full-stack-ai-developer`                |
| ![](public/images/smit-parekh-nextjs-vercel-guide.png)        | `smit-parekh-nextjs-vercel-guide.png`        | `/nextjs-vercel-guide`                    |
| ![](public/images/smit-parekh-production-nextjs.png)          | `smit-parekh-production-nextjs.png`          | `/production-nextjs`                      |
| ![](public/images/smit-parekh-blog-api.png)                   | `smit-parekh-blog-api.png`                   | `/blog-api`                               |
| ![](public/images/smit-parekh-changelog.png)                  | `smit-parekh-changelog.png`                  | `/changelog`                              |
| ![](public/images/smit-parekh-faq.png)                        | `smit-parekh-faq.png`                        | `/faq`                                    |
| ![](public/images/smit-parekh-hire-developer-gulf.png)        | `smit-parekh-hire-developer-gulf.png`        | `/hire-developer`                         |
| ![](public/images/smit-parekh-book-a-call.png)                | `smit-parekh-book-a-call.png`                | `/book`                                   |
| ![](public/images/smit-parekh-contact.png)                    | `smit-parekh-contact.png`                    | `/contact`                                |
| ![](public/images/smit-parekh-feedback.png)                   | `smit-parekh-feedback.png`                   | `/feedback`                               |
| ![](public/images/smit-parekh-resume.png)                     | `smit-parekh-resume.png`                     | `/resume`                                 |
| —                                                             | `tools-og/*.png`                             | `/free-tools/[slug]` (all tool OG images) |
| ![](public/images/services-og/web-development.png)            | `services-og/web-development.png`            | `/services/web-development`               |
| ![](public/images/services-og/frontend-development.png)       | `services-og/frontend-development.png`       | `/services/frontend-development`          |
| ![](public/images/services-og/backend-development.png)        | `services-og/backend-development.png`        | `/services/backend-development`           |
| ![](public/images/services-og/api-development.png)            | `services-og/api-development.png`            | `/services/api-development`               |
| ![](public/images/services-og/saas-development.png)           | `services-og/saas-development.png`           | `/services/saas-development`              |
| ![](public/images/services-og/ecommerce-development.png)      | `services-og/ecommerce-development.png`      | `/services/ecommerce-development`         |
| ![](public/images/services-og/seo.png)                        | `services-og/seo.png`                        | `/services/seo`                           |
| ![](public/images/services-og/technical-seo.png)              | `services-og/technical-seo.png`              | `/services/technical-seo`                 |
| ![](public/images/services-og/local-seo.png)                  | `services-og/local-seo.png`                  | `/services/local-seo`                     |
| ![](public/images/services-og/seo-audit.png)                  | `services-og/seo-audit.png`                  | `/services/seo-audit`                     |
| ![](public/images/services-og/ai-integration.png)             | `services-og/ai-integration.png`             | `/services/ai-integration`                |
| ![](public/images/services-og/mvp-development.png)            | `services-og/mvp-development.png`            | `/services/mvp-development`               |
| ![](public/images/services-og/nextjs-development.png)         | `services-og/nextjs-development.png`         | `/services/nextjs-development`            |
| ![](public/images/services-og/react-development.png)          | `services-og/react-development.png`          | `/services/react-development`             |
| ![](public/images/services-og/performance-optimization.png)   | `services-og/performance-optimization.png`   | `/services/performance-optimization`      |
| ![](public/images/services-og/shopify-development.png)        | `services-og/shopify-development.png`        | `/services/shopify-development`           |
| ![](public/images/services-og/devops-consulting.png)          | `services-og/devops-consulting.png`          | `/services/devops-consulting`             |
| ![](public/images/services-og/landing-page-development.png)   | `services-og/landing-page-development.png`   | `/services/landing-page-development`      |
| ![](public/images/services-og/wordpress-development.png)      | `services-og/wordpress-development.png`      | `/services/wordpress-development`         |
| ![](public/images/services-og/mobile-app-development.png)     | `services-og/mobile-app-development.png`     | `/services/mobile-app-development`        |

---

## Notes

- Service OG images → `public/images/services-og/{slug}.png`
- Hire page OG images → `public/images/hire-{slug}.png`
- Other page OG images → `public/images/{name}.png`
- When adding new images: drop in the correct folder, add a row to the table above, then commit.
- If Midjourney adds text incorrectly, regenerate without the text parts and add text in Canva/Figma.
- Use the same `--seed` value across all banners for visual coherence.
