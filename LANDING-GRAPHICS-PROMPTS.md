# Landing-Page Graphics — Image Prompts

In-page graphics for the **home page** (`app/page.tsx`) to break up the text-heavy
sections (Services, Skills, FeaturedTools, CTA). These are **illustrations / mockups**,
not OG share banners — see `IMAGE-PROMPTS.md` for the 1200×630 social banners.

**Workflow:** generate each graphic → export a **transparent PNG** (or WebP) at the size
noted → drop it into `public/images/home/` with the exact filename below → tell me, and
I'll wire the `next/image` slots into the matching section (correct `width`/`height`/`sizes`,
lazy-loaded, responsive).

## Shared style (already baked into every prompt)

- Light, off-white `#fafafa` **or transparent** background
- Primary blue `#0628FF` · cyan accent `#00C5EC` · near-black `#0a0a1a` · soft slate greys
- Flat with subtle soft shadows + gentle glow, airy negative space
- Premium SaaS / developer-tool aesthetic
- **No** photo-real people, no clutter, no circuit-board cliché, no neon, no readable lorem text

---

## 1. App screenshot mockup — the "screen"
- **Section:** Services (right of the intro)
- **File:** `public/images/home/app-mockup.png`
- **Size:** 1600 × 1000 px · transparent PNG

```
Clean modern product mockup on transparent background: a sleek laptop browser window showing a minimal SaaS analytics dashboard (sidebar nav, KPI cards, a line chart and a bar chart) in an off-white UI with primary blue #0628FF accents and cyan #00C5EC highlights, near-black #0a0a1a text, generous whitespace. Slightly angled 3/4 perspective with a soft drop shadow. A smaller smartphone mockup overlapping the bottom-right corner showing the same app's mobile view. Crisp, flat, premium developer-tool aesthetic, subtle blue glow behind the devices. No readable lorem text, no people. --ar 16:10
```

## 2. "Boost your speed" performance graphic
- **Section:** Skills (or a new performance band)
- **File:** `public/images/home/performance.png`
- **Size:** 1200 × 900 px · transparent PNG

```
Minimal light-mode illustration of web performance on transparent background: three circular gauge meters showing "100" scores (green/blue rings) labeled like Lighthouse — Performance, SEO, Best Practices — beside a stylized speedometer needle swung to the high end. Primary blue #0628FF and cyan #00C5EC rings, near-black #0a0a1a numerals, soft slate labels, off-white cards with soft shadows. A subtle upward speed/motion streak and a small rocket or lightning glyph for "fast". Flat, crisp, airy, premium. No photo-real people. --ar 4:3
```

## 3. Full-stack architecture flow
- **Section:** Services (wide band between the cards and the CTA)
- **File:** `public/images/home/architecture.png`
- **Size:** 1600 × 700 px · transparent PNG

```
Clean flat isometric diagram on transparent background showing a left-to-right full-stack flow: a browser/frontend card → an API/server node → a database cylinder → a cloud platform, connected by smooth flowing lines with small data dots. Each node a soft off-white rounded card with a simple line icon in primary blue #0628FF, connectors and active states in cyan #00C5EC, near-black #0a0a1a labels, soft drop shadows, lots of negative space. Modern developer-tool aesthetic, subtle blue glow, no clutter, no circuit-board cliché, no text paragraphs. --ar 21:9
```

## 4. Clean-code window
- **Section:** Skills (accent beside the skills list)
- **File:** `public/images/home/code-window.png`
- **Size:** 1200 × 800 px · transparent PNG

```
Stylized minimal code editor window on transparent background, off-white #fafafa chrome with three soft traffic-light dots, showing abstract syntax-highlighted code blocks (no real readable text) using primary blue #0628FF keywords, cyan #00C5EC strings, near-black #0a0a1a base text, soft slate comments. A floating small "TypeScript" and "React" rounded chip with simple line icons. Soft shadow, subtle blue glow, crisp, flat, premium, airy. No people. --ar 3:2
```

## 5. CTA supporting illustration
- **Section:** CTABanner
- **File:** `public/images/home/cta-illustration.png`
- **Size:** 1000 × 1000 px · transparent PNG

```
Friendly minimal light-mode illustration on transparent background: an abstract "let's build together" concept — stacked rounded UI cards and simple geometric building blocks assembling into a product, with a small paper-plane/arrow signalling launch. Primary blue #0628FF and cyan #00C5EC shapes, near-black #0a0a1a accents, off-white surfaces, soft shadows, gentle glow, lots of breathing room. Premium, optimistic, modern SaaS aesthetic. No photo-real people, no clutter. --ar 1:1
```

---

## After you generate them

Drop the PNGs into `public/images/home/` using the filenames above, then ping me. I'll wire
each into its section with `next/image` (responsive `sizes`, lazy-loaded below the fold,
`priority` only if above the fold). Skip any you don't want — the wiring is per-file.
