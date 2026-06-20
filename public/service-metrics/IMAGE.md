# Service metric card images — generation prompts

These are the **square (1:1)** trust cards in the "Results that build trust"
section on every `/services/<slug>` page. By default each card renders an
animated **SVG glyph** — generate an image only when you want a richer visual
for a specific metric.

House style follows [`IMAGE-PROMPTS.md`](../../IMAGE-PROMPTS.md): light off-white
`#fafafa` ground, primary blue `#0628FF`, cyan accent `#00C5EC`, airy and
minimal. **Difference:** these are **1:1 squares**, not 1200×630 banners.

## How to wire an image onto a card

1. Generate the PNG (sites + workflow: see `IMAGE-PROMPTS.md`).
2. Save it here using the slug naming below → `public/service-metrics/<slug>-<n>.png`
   (`n` = 1–4, matching the order of the four metrics on that page).
3. In `data/services-catalog.ts`, set `image` on that proof stat:

   ```ts
   { value: "+120%", label: "Median organic traffic uplift", image: "/service-metrics/seo-1.png" }
   ```

Leave `image` unset to keep the SVG. Prompts below are paste-ready; AI rarely
renders text cleanly, so overlay the value/label in Canva/Figma if needed.

---

## /services/web-development

### `web-development-1.png` — **4+** · Years shipping production web apps

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "4+" large in bold near-black #0a0a1a, caption "Years shipping production web apps" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `web-development-2.png` — **95+** · Lighthouse on real data, not demos

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "95+" large in bold near-black #0a0a1a, caption "Lighthouse on real data, not demos" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `web-development-3.png` — **10K+** · Daily API requests handled

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "10K+" large in bold near-black #0a0a1a, caption "Daily API requests handled" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `web-development-4.png` — **99.9%** · Uptime across deployed projects

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "99.9%" large in bold near-black #0a0a1a, caption "Uptime across deployed projects" beneath in medium grey. Visual: a circular progress ring sweeping most of the way around in a blue #0628FF → cyan #00C5EC gradient, the value centered inside the ring. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/frontend-development

### `frontend-development-1.png` — **40%** · Average bundle size reduction on takeovers

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "40%" large in bold near-black #0a0a1a, caption "Average bundle size reduction on takeovers" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `frontend-development-2.png` — **100** · Lighthouse accessibility score targeted

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "100" large in bold near-black #0a0a1a, caption "Lighthouse accessibility score targeted" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `frontend-development-3.png` — **<1.5s** · LCP on 4G targeted for landing pages

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<1.5s" large in bold near-black #0a0a1a, caption "LCP on 4G targeted for landing pages" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `frontend-development-4.png` — **30+** · Production frontends shipped

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "30+" large in bold near-black #0a0a1a, caption "Production frontends shipped" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/backend-development

### `backend-development-1.png` — **<100ms** · p95 latency target on production APIs

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<100ms" large in bold near-black #0a0a1a, caption "p95 latency target on production APIs" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `backend-development-2.png` — **10K+** · Daily API requests handled at 99.9% uptime

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "10K+" large in bold near-black #0a0a1a, caption "Daily API requests handled at 99.9% uptime" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `backend-development-3.png` — **65%** · Average query speedup on optimisations

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "65%" large in bold near-black #0a0a1a, caption "Average query speedup on optimisations" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `backend-development-4.png` — **0** · Plaintext passwords ever stored

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "0" large in bold near-black #0a0a1a, caption "Plaintext passwords ever stored" beneath in medium grey. Visual: a calm emerald-green shield with a checkmark, sitting on a soft radial glow. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/api-development

### `api-development-1.png` — **30+** · Production APIs shipped

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "30+" large in bold near-black #0a0a1a, caption "Production APIs shipped" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `api-development-2.png` — **<50ms** · p95 on cached endpoints

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<50ms" large in bold near-black #0a0a1a, caption "p95 on cached endpoints" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `api-development-3.png` — **99.9%** · Uptime across deployed APIs

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "99.9%" large in bold near-black #0a0a1a, caption "Uptime across deployed APIs" beneath in medium grey. Visual: a circular progress ring sweeping most of the way around in a blue #0628FF → cyan #00C5EC gradient, the value centered inside the ring. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `api-development-4.png` — **100%** · Routes documented in OpenAPI

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "100%" large in bold near-black #0a0a1a, caption "Routes documented in OpenAPI" beneath in medium grey. Visual: a circular progress ring sweeping most of the way around in a blue #0628FF → cyan #00C5EC gradient, the value centered inside the ring. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/saas-development

### `saas-development-1.png` — **8+** · SaaS products shipped to paying users

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "8+" large in bold near-black #0a0a1a, caption "SaaS products shipped to paying users" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `saas-development-2.png` — **Stripe** · Default billing - webhooks signed, idempotent

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Stripe" large in bold near-black #0a0a1a, caption "Default billing - webhooks signed, idempotent" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `saas-development-3.png` — **<5s** · Signup to first 'aha' moment targeted

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<5s" large in bold near-black #0a0a1a, caption "Signup to first 'aha' moment targeted" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `saas-development-4.png` — **0** · Cross-tenant data leaks (RLS enforced)

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "0" large in bold near-black #0a0a1a, caption "Cross-tenant data leaks (RLS enforced)" beneath in medium grey. Visual: a calm emerald-green shield with a checkmark, sitting on a soft radial glow. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/ecommerce-development

### `ecommerce-development-1.png` — **<1.5s** · LCP on mid-range phones targeted

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<1.5s" large in bold near-black #0a0a1a, caption "LCP on mid-range phones targeted" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `ecommerce-development-2.png` — **+18%** · Typical conversion uplift on PDP redesigns

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "+18%" large in bold near-black #0a0a1a, caption "Typical conversion uplift on PDP redesigns" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `ecommerce-development-3.png` — **100%** · Old URLs redirected on migration

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "100%" large in bold near-black #0a0a1a, caption "Old URLs redirected on migration" beneath in medium grey. Visual: a circular progress ring sweeping most of the way around in a blue #0628FF → cyan #00C5EC gradient, the value centered inside the ring. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `ecommerce-development-4.png` — **GA4 + GTM** · Server-side ready

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "GA4 + GTM" large in bold near-black #0a0a1a, caption "Server-side ready" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/seo

### `seo-1.png` — **+120%** · Median organic traffic uplift in 6 months

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "+120%" large in bold near-black #0a0a1a, caption "Median organic traffic uplift in 6 months" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `seo-2.png` — **95+** · Core Web Vitals score targeted on key URLs

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "95+" large in bold near-black #0a0a1a, caption "Core Web Vitals score targeted on key URLs" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `seo-3.png` — **100%** · Pages with valid structured data after audit

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "100%" large in bold near-black #0a0a1a, caption "Pages with valid structured data after audit" beneath in medium grey. Visual: a circular progress ring sweeping most of the way around in a blue #0628FF → cyan #00C5EC gradient, the value centered inside the ring. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `seo-4.png` — **0** · Black-hat tactics, ever

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "0" large in bold near-black #0a0a1a, caption "Black-hat tactics, ever" beneath in medium grey. Visual: a calm emerald-green shield with a checkmark, sitting on a soft radial glow. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/technical-seo

### `technical-seo-1.png` — **<2.5s** · Real-user LCP target on key URLs

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<2.5s" large in bold near-black #0a0a1a, caption "Real-user LCP target on key URLs" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `technical-seo-2.png` — **100%** · Templated schema across the site

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "100%" large in bold near-black #0a0a1a, caption "Templated schema across the site" beneath in medium grey. Visual: a circular progress ring sweeping most of the way around in a blue #0628FF → cyan #00C5EC gradient, the value centered inside the ring. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `technical-seo-3.png` — **+45%** · Median crawl-budget improvement after audit

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "+45%" large in bold near-black #0a0a1a, caption "Median crawl-budget improvement after audit" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `technical-seo-4.png` — **Lighthouse CI** · Wired into your PR pipeline

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Lighthouse CI" large in bold near-black #0a0a1a, caption "Wired into your PR pipeline" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/local-seo

### `local-seo-1.png` — **Top 3** · Map Pack ranking targeted on primary keyword + city

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Top 3" large in bold near-black #0a0a1a, caption "Map Pack ranking targeted on primary keyword + city" beneath in medium grey. Visual: a clean three-step winners' podium, the #1 position raised and highlighted in a blue #0628FF → cyan #00C5EC gradient. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `local-seo-2.png` — **+90%** · Median review volume increase in 90 days

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "+90%" large in bold near-black #0a0a1a, caption "Median review volume increase in 90 days" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `local-seo-3.png` — **100%** · NAP consistency across top 30 directories

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "100%" large in bold near-black #0a0a1a, caption "NAP consistency across top 30 directories" beneath in medium grey. Visual: a circular progress ring sweeping most of the way around in a blue #0628FF → cyan #00C5EC gradient, the value centered inside the ring. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `local-seo-4.png` — **Geo-grid** · Monthly tracking included

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Geo-grid" large in bold near-black #0a0a1a, caption "Monthly tracking included" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/seo-audit

### `seo-audit-1.png` — **5 days** · From kickoff to delivered report

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "5 days" large in bold near-black #0a0a1a, caption "From kickoff to delivered report" beneath in medium grey. Visual: a minimal clock + timeline motif with a single blue #0628FF → cyan #00C5EC progress marker partway along it. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `seo-audit-2.png` — **100+** · Audits delivered to date

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "100+" large in bold near-black #0a0a1a, caption "Audits delivered to date" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `seo-audit-3.png` — **Notion + Loom** · Format your team will actually open

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Notion + Loom" large in bold near-black #0a0a1a, caption "Format your team will actually open" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `seo-audit-4.png` — **60 min** · Live walkthrough call included

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "60 min" large in bold near-black #0a0a1a, caption "Live walkthrough call included" beneath in medium grey. Visual: a minimal clock + timeline motif with a single blue #0628FF → cyan #00C5EC progress marker partway along it. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/ai-integration

### `ai-integration-1.png` — **60%** · Average token cost reduction via model switching + caching

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "60%" large in bold near-black #0a0a1a, caption "Average token cost reduction via model switching + caching" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `ai-integration-2.png` — **Promptfoo** · Automated evals on every PR

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Promptfoo" large in bold near-black #0a0a1a, caption "Automated evals on every PR" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `ai-integration-3.png` — **<1s** · TTFT (time to first token) targeted on streamed responses

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<1s" large in bold near-black #0a0a1a, caption "TTFT (time to first token) targeted on streamed responses" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `ai-integration-4.png` — **0** · Prompts leaked in production endpoints

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "0" large in bold near-black #0a0a1a, caption "Prompts leaked in production endpoints" beneath in medium grey. Visual: a calm emerald-green shield with a checkmark, sitting on a soft radial glow. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/mvp-development

### `mvp-development-1.png` — **20+** · MVPs shipped to real users

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "20+" large in bold near-black #0a0a1a, caption "MVPs shipped to real users" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `mvp-development-2.png` — **4-8 wks** · Average time from kickoff to live

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "4-8 wks" large in bold near-black #0a0a1a, caption "Average time from kickoff to live" beneath in medium grey. Visual: a minimal clock + timeline motif with a single blue #0628FF → cyan #00C5EC progress marker partway along it. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `mvp-development-3.png` — **Fixed** · Price - no scope creep surprises

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Fixed" large in bold near-black #0a0a1a, caption "Price - no scope creep surprises" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `mvp-development-4.png` — **30 days** · Post-launch bug-fix support

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "30 days" large in bold near-black #0a0a1a, caption "Post-launch bug-fix support" beneath in medium grey. Visual: a minimal clock + timeline motif with a single blue #0628FF → cyan #00C5EC progress marker partway along it. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/nextjs-development

### `nextjs-development-1.png` — **15+** · Next.js apps shipped with App Router

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "15+" large in bold near-black #0a0a1a, caption "Next.js apps shipped with App Router" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `nextjs-development-2.png` — **95+** · Lighthouse on production, not labs

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "95+" large in bold near-black #0a0a1a, caption "Lighthouse on production, not labs" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `nextjs-development-3.png` — **<2.5s** · LCP on all delivered projects

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<2.5s" large in bold near-black #0a0a1a, caption "LCP on all delivered projects" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `nextjs-development-4.png` — **0** · Client-side waterfalls shipped to production

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "0" large in bold near-black #0a0a1a, caption "Client-side waterfalls shipped to production" beneath in medium grey. Visual: a calm emerald-green shield with a checkmark, sitting on a soft radial glow. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/react-development

### `react-development-1.png` — **5+** · Years of React in production

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "5+" large in bold near-black #0a0a1a, caption "Years of React in production" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `react-development-2.png` — **10+** · React apps from scratch or refactored

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "10+" large in bold near-black #0a0a1a, caption "React apps from scratch or refactored" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `react-development-3.png` — **TypeScript** · Strict mode - no implicit any anywhere

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "TypeScript" large in bold near-black #0a0a1a, caption "Strict mode - no implicit any anywhere" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `react-development-4.png` — **0** · Redux installs in the last 3 years

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "0" large in bold near-black #0a0a1a, caption "Redux installs in the last 3 years" beneath in medium grey. Visual: a calm emerald-green shield with a checkmark, sitting on a soft radial glow. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/performance-optimization

### `performance-optimization-1.png` — **38→97** · Best single-project Lighthouse improvement

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "38→97" large in bold near-black #0a0a1a, caption "Best single-project Lighthouse improvement" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `performance-optimization-2.png` — **2×** · Organic traffic uplift documented after CWV fixes

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "2×" large in bold near-black #0a0a1a, caption "Organic traffic uplift documented after CWV fixes" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `performance-optimization-3.png` — **<2.5s** · LCP target on every delivered project

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<2.5s" large in bold near-black #0a0a1a, caption "LCP target on every delivered project" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `performance-optimization-4.png` — **0.1** · CLS or below on all delivered pages

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "0.1" large in bold near-black #0a0a1a, caption "CLS or below on all delivered pages" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/shopify-development

### `shopify-development-1.png` — **95+** · Lighthouse - faster than any theme

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "95+" large in bold near-black #0a0a1a, caption "Lighthouse - faster than any theme" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `shopify-development-2.png` — **TypeSafe** · GraphQL with auto-generated types

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "TypeSafe" large in bold near-black #0a0a1a, caption "GraphQL with auto-generated types" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `shopify-development-3.png` — **0** · Changes to Shopify checkout or payments

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "0" large in bold near-black #0a0a1a, caption "Changes to Shopify checkout or payments" beneath in medium grey. Visual: a calm emerald-green shield with a checkmark, sitting on a soft radial glow. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `shopify-development-4.png` — **30 days** · Post-launch support included

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "30 days" large in bold near-black #0a0a1a, caption "Post-launch support included" beneath in medium grey. Visual: a minimal clock + timeline motif with a single blue #0628FF → cyan #00C5EC progress marker partway along it. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/devops-consulting

### `devops-consulting-1.png` — **99.9%** · Uptime target across deployed projects

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "99.9%" large in bold near-black #0a0a1a, caption "Uptime target across deployed projects" beneath in medium grey. Visual: a circular progress ring sweeping most of the way around in a blue #0628FF → cyan #00C5EC gradient, the value centered inside the ring. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `devops-consulting-2.png` — **<5min** · Median deployment time after CI setup

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<5min" large in bold near-black #0a0a1a, caption "Median deployment time after CI setup" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `devops-consulting-3.png` — **~40%** · Average AWS cost reduction on first review

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "~40%" large in bold near-black #0a0a1a, caption "Average AWS cost reduction on first review" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `devops-consulting-4.png` — **0** · Production credential leaks after secrets migration

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "0" large in bold near-black #0a0a1a, caption "Production credential leaks after secrets migration" beneath in medium grey. Visual: a calm emerald-green shield with a checkmark, sitting on a soft radial glow. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/landing-page-development

### `landing-page-development-1.png` — **95+** · Lighthouse on every page shipped

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "95+" large in bold near-black #0a0a1a, caption "Lighthouse on every page shipped" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `landing-page-development-2.png` — **<1.2s** · LCP target on real 4G connection

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<1.2s" large in bold near-black #0a0a1a, caption "LCP target on real 4G connection" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `landing-page-development-3.png` — **48h** · Delivery time for a single-section page

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "48h" large in bold near-black #0a0a1a, caption "Delivery time for a single-section page" beneath in medium grey. Visual: a minimal clock + timeline motif with a single blue #0628FF → cyan #00C5EC progress marker partway along it. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `landing-page-development-4.png` — **30%** · Average conversion lift reported by clients

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "30%" large in bold near-black #0a0a1a, caption "Average conversion lift reported by clients" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/wordpress-development

### `wordpress-development-1.png` — **50+** · WordPress sites shipped since 2019

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "50+" large in bold near-black #0a0a1a, caption "WordPress sites shipped since 2019" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `wordpress-development-2.png` — **95+** · Lighthouse score on every custom theme

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "95+" large in bold near-black #0a0a1a, caption "Lighthouse score on every custom theme" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `wordpress-development-3.png` — **0** · Page builders used - ever

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "0" large in bold near-black #0a0a1a, caption "Page builders used - ever" beneath in medium grey. Visual: a calm emerald-green shield with a checkmark, sitting on a soft radial glow. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `wordpress-development-4.png` — **<2s** · LCP target on WooCommerce product pages

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<2s" large in bold near-black #0a0a1a, caption "LCP target on WooCommerce product pages" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/mobile-app-development

### `mobile-app-development-1.png` — **2** · Apps live on App Store & Google Play

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "2" large in bold near-black #0a0a1a, caption "Apps live on App Store & Google Play" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `mobile-app-development-2.png` — **~60%** · Cost saving vs separate native builds

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "~60%" large in bold near-black #0a0a1a, caption "Cost saving vs separate native builds" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `mobile-app-development-3.png` — **4.5★** · Average store rating on shipped apps

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "4.5★" large in bold near-black #0a0a1a, caption "Average store rating on shipped apps" beneath in medium grey. Visual: a row of five rating stars filled with a blue #0628FF → cyan #00C5EC gradient and a soft reflection beneath. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `mobile-app-development-4.png` — **OTA** · Over-the-air updates without review delays

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "OTA" large in bold near-black #0a0a1a, caption "Over-the-air updates without review delays" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/aeo-geo-optimization

### `aeo-geo-optimization-1.png` — **30-50** · Buyer questions tracked across AI answer engines

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "30-50" large in bold near-black #0a0a1a, caption "Buyer questions tracked across AI answer engines" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `aeo-geo-optimization-2.png` — **100%** · Priority pages shipped with validated JSON-LD

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "100%" large in bold near-black #0a0a1a, caption "Priority pages shipped with validated JSON-LD" beneath in medium grey. Visual: a circular progress ring sweeping most of the way around in a blue #0628FF → cyan #00C5EC gradient, the value centered inside the ring. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `aeo-geo-optimization-3.png` — **4** · Engines monitored - ChatGPT, Perplexity, Gemini, AI Overviews

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "4" large in bold near-black #0a0a1a, caption "Engines monitored - ChatGPT, Perplexity, Gemini, AI Overviews" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `aeo-geo-optimization-4.png` — **0** · Keyword stuffing or AI spam - extractable, factual content only

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "0" large in bold near-black #0a0a1a, caption "Keyword stuffing or AI spam - extractable, factual content only" beneath in medium grey. Visual: a calm emerald-green shield with a checkmark, sitting on a soft radial glow. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/content-seo

### `content-seo-1.png` — **+120%** · Median organic traffic uplift in 6 months on content programs

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "+120%" large in bold near-black #0a0a1a, caption "Median organic traffic uplift in 6 months on content programs" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `content-seo-2.png` — **1500-2500** · Words of genuinely useful depth per article

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "1500-2500" large in bold near-black #0a0a1a, caption "Words of genuinely useful depth per article" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `content-seo-3.png` — **2-4** · Cluster-linked articles shipped per month

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "2-4" large in bold near-black #0a0a1a, caption "Cluster-linked articles shipped per month" beneath in medium grey. Visual: a row of four ascending bar columns in a blue #0628FF → cyan #00C5EC gradient, with the big number above them. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `content-seo-4.png` — **0** · Raw AI-spam articles published under your domain

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "0" large in bold near-black #0a0a1a, caption "Raw AI-spam articles published under your domain" beneath in medium grey. Visual: a calm emerald-green shield with a checkmark, sitting on a soft radial glow. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/conversion-rate-optimization

### `conversion-rate-optimization-1.png` — **+18%** · Typical conversion uplift on landing-page programs

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "+18%" large in bold near-black #0a0a1a, caption "Typical conversion uplift on landing-page programs" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `conversion-rate-optimization-2.png` — **ICE-scored** · Every test prioritised by impact, confidence, effort

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "ICE-scored" large in bold near-black #0a0a1a, caption "Every test prioritised by impact, confidence, effort" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `conversion-rate-optimization-3.png` — **100%** · Winning variants shipped to production, not left as test code

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "100%" large in bold near-black #0a0a1a, caption "Winning variants shipped to production, not left as test code" beneath in medium grey. Visual: a circular progress ring sweeping most of the way around in a blue #0628FF → cyan #00C5EC gradient, the value centered inside the ring. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `conversion-rate-optimization-4.png` — **Real stats** · Powered tests - no calling wins on tiny samples

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Real stats" large in bold near-black #0a0a1a, caption "Powered tests - no calling wins on tiny samples" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/ai-agent-development

### `ai-agent-development-1.png` — **Eval-gated** · No agent change ships without passing the golden task set

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Eval-gated" large in bold near-black #0a0a1a, caption "No agent change ships without passing the golden task set" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `ai-agent-development-2.png` — **Human-in-loop** · Approval checkpoints on every high-risk action

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Human-in-loop" large in bold near-black #0a0a1a, caption "Approval checkpoints on every high-risk action" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `ai-agent-development-3.png` — **60%** · Typical token-cost cut via model routing + caching

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "60%" large in bold near-black #0a0a1a, caption "Typical token-cost cut via model routing + caching" beneath in medium grey. Visual: an upward-trending line-and-area chart, line in a blue #0628FF → cyan #00C5EC gradient with a soft gradient fill beneath and a small green up-arrow delta chip. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `ai-agent-development-4.png` — **Full traces** · Every agent run logged and replayable

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Full traces" large in bold near-black #0a0a1a, caption "Every agent run logged and replayable" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/ai-chatbot-development

### `ai-chatbot-development-1.png` — **Cited** · Every answer links back to its source passage

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Cited" large in bold near-black #0a0a1a, caption "Every answer links back to its source passage" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `ai-chatbot-development-2.png` — **<1s** · Time-to-first-token targeted on streamed replies

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<1s" large in bold near-black #0a0a1a, caption "Time-to-first-token targeted on streamed replies" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `ai-chatbot-development-3.png` — **Deflection** · Built to resolve common questions before they reach support

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Deflection" large in bold near-black #0a0a1a, caption "Built to resolve common questions before they reach support" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `ai-chatbot-development-4.png` — **0** · PII leaked - filtered inputs and scoped retrieval

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "0" large in bold near-black #0a0a1a, caption "PII leaked - filtered inputs and scoped retrieval" beneath in medium grey. Visual: a calm emerald-green shield with a checkmark, sitting on a soft radial glow. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/website-maintenance

### `website-maintenance-1.png` — **Cancel anytime** · No long lock-in contracts on retainers

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Cancel anytime" large in bold near-black #0a0a1a, caption "No long lock-in contracts on retainers" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `website-maintenance-2.png` — **Same dev** · The person who maintains it can also fix it fast

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Same dev" large in bold near-black #0a0a1a, caption "The person who maintains it can also fix it fast" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `website-maintenance-3.png` — **Monitored** · Uptime, errors, and Core Web Vitals watched continuously

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Monitored" large in bold near-black #0a0a1a, caption "Uptime, errors, and Core Web Vitals watched continuously" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `website-maintenance-4.png` — **Reported** · Plain-English monthly health report every cycle

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Reported" large in bold near-black #0a0a1a, caption "Plain-English monthly health report every cycle" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```


## /services/website-redesign

### `website-redesign-1.png` — **100%** · Changed URLs covered by a 1:1 redirect map

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "100%" large in bold near-black #0a0a1a, caption "Changed URLs covered by a 1:1 redirect map" beneath in medium grey. Visual: a circular progress ring sweeping most of the way around in a blue #0628FF → cyan #00C5EC gradient, the value centered inside the ring. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `website-redesign-2.png` — **<2.5s** · Real-user LCP targeted post-redesign

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "<2.5s" large in bold near-black #0a0a1a, caption "Real-user LCP targeted post-redesign" beneath in medium grey. Visual: a sleek semicircular speedometer with the needle near the fast end and a blue #0628FF → cyan #00C5EC arc. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `website-redesign-3.png` — **30 days** · Post-launch rank + performance watch included

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "30 days" large in bold near-black #0a0a1a, caption "Post-launch rank + performance watch included" beneath in medium grey. Visual: a minimal clock + timeline motif with a single blue #0628FF → cyan #00C5EC progress marker partway along it. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

### `website-redesign-4.png` — **Preserved** · Top content and SEO equity carried through the rebuild

```
Clean minimal light analytics card, 1:1 square, off-white #fafafa / soft blue-white #f5f7ff background, subtle dotted-grid texture and faint soft-blue glow, airy with lots of empty space, flat soft shadows, ~20px rounded corners, bright modern editorial tech style. Show ONE KPI: the value "Preserved" large in bold near-black #0a0a1a, caption "Top content and SEO equity carried through the rebuild" beneath in medium grey. Visual: a single labeled pill with one minimalist blue line-icon, finished with a cyan #00C5EC accent. Brand palette: primary blue #0628FF, cyan accent #00C5EC on the light ground. No people, no logos, no watermark, no clutter, no gibberish text. Crisp, high-detail. --ar 1:1 --seed 1200
```

