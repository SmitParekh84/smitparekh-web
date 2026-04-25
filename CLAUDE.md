@AGENTS.md

# Smit Parekh Portfolio — Next.js 16 Frontend

## What This Is

Tools landing page + personal portfolio site. Deployed at `smitparekh.co.in`.
Built with Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui.

## Tech Stack (exact versions matter)

| Package               | Version  | Notes                                         |
| --------------------- | -------- | --------------------------------------------- |
| next                  | 16.2.4   | App Router only — no Pages Router             |
| react / react-dom     | 19.2.4   | Server Components by default                  |
| typescript            | ^5       | `"strict": true` in tsconfig                  |
| tailwindcss           | ^4       | Config-less — CSS-only setup                  |
| @base-ui/react        | ^1.4.1   | Powers shadcn `base-nova` style               |
| @tanstack/react-query | ^5       | Server state — all API calls go through this  |
| sonner                | ^2.0.7   | Toast notifications                           |
| next-themes           | ^0.4.6   | Class-based dark/light mode                   |
| lucide-react          | ^1.11.0  | Icons — brand icons removed in v1             |
| pnpm                  | any      | ONLY package manager — never npm/yarn         |

---

## Critical Patterns — Read Before Touching Anything

### 1. shadcn `base-nova` — No `asChild`
Uses `@base-ui/react/button` which has **no `asChild` prop**. For link-styled buttons:

```tsx
// CORRECT
<Link href="/contact" className={buttonVariants({ variant: "outline" })}>
  Contact
</Link>

// WRONG — throws at runtime
<Button asChild><Link href="/contact">Contact</Link></Button>
```

### 2. Tailwind v4 — CSS-only config
No `tailwind.config.js`. Tokens live in `app/globals.css` inside `@theme inline`.
Never create `tailwind.config.js` or use `theme.extend`.

### 3. Lucide v1 — Brand icons removed
`lucide-react@1.x` removed `Github`, `Linkedin`, `Instagram`.
Use `components/icons/SocialIcons.tsx` which has hand-written inline SVGs.

### 4. pnpm only
```bash
pnpm add <pkg>       # install
pnpm add -D <pkg>    # dev
pnpm remove <pkg>    # uninstall
```

### 5. Server vs Client components
Default is Server. Only add `"use client"` when you need:
- `useState` / `useEffect` / other hooks
- Browser APIs (`window`, `document`)
- Event handlers

---

## Design Token System (`app/globals.css`)

Two-layer architecture:

**Layer 1 — Primitive palette** (`@theme inline`, static values)
These generate Tailwind utilities (`bg-blue-500`, `text-cyan-400`, etc.):

| Token           | Hex       | Use                         |
| --------------- | --------- | --------------------------- |
| `blue-500`      | `#0628FF` | Primary CTAs, links, icons  |
| `blue-600`      | darker    | Hover state for blue-500    |
| `cyan-400`      | `#00C5EC` | Accent, ring, gradient end  |
| `sky-500`       | `#2196F3` | Gradient midpoint           |
| `cream-100`     | `#FFFDE7` | Light mode warm surface     |
| `neutral-0–950` | —         | Blue-tinted surface + text  |

**Layer 2 — Semantic aliases** (`:root` / `.dark`, reference primitives)
These are what shadcn components consume:
`--primary`, `--background`, `--foreground`, `--muted`, `--accent`, `--ring`, etc.

**Usage in components:**
```tsx
// Use primitives for brand-specific colors
<span className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">

// Use semantic tokens for UI elements
<div className="bg-card text-card-foreground border-border">

// Opacity modifier replaces "muted" variants
<div className="bg-blue-500/15">   {/* tint */}
<div className="bg-blue-500/8">    {/* very faint glow */}
```

---

## Layout Utilities (`app/globals.css` `@layer components`)

Instead of repeating `container mx-auto px-4` everywhere:

```tsx
// Consistent horizontal padding + max-width
<div className="page-container">...</div>

// Vertical rhythm for page sections
<section className="page-section">...</section>

// Combine them
<section className="page-section">
  <div className="page-container">...</div>
</section>
```

**Use `components/layout/Container.tsx` for reusable wrapper:**
```tsx
import { Container } from "@/components/layout/Container";

<Container as="section" className="py-20">
  ...
</Container>
```

---

## Folder Structure

```
app/
├── page.tsx                    ← / (home)
├── layout.tsx                  ← root (fonts, ThemeProvider, QueryProvider, Navbar, Footer)
├── globals.css                 ← tokens, base styles, layout utilities
├── sitemap.ts                  ← auto-generated sitemap.xml
├── robots.ts                   ← auto-generated robots.txt
├── (marketing)/                ← route group: no URL impact
│   ├── about/page.tsx          ← /about
│   ├── contact/page.tsx        ← /contact
│   └── portfolio/page.tsx      ← /portfolio
└── (tools)/                    ← route group: no URL impact
    └── free-tools/
        ├── page.tsx            ← /free-tools
        └── [slug]/page.tsx     ← /free-tools/[slug]

components/
├── layout/
│   ├── Navbar.tsx              ← sticky glass navbar, mega menu, theme toggle
│   ├── Footer.tsx              ← 4-col footer with social links
│   └── Container.tsx           ← page-container wrapper component
├── sections/
│   └── Hero.tsx                ← home hero section
├── ui/
│   ├── aurora-background.tsx   ← animated gradient blob background
│   ├── button.tsx              ← shadcn button (no asChild)
│   ├── badge.tsx               ← shadcn badge
│   ├── sheet.tsx               ← shadcn sheet (mobile nav)
│   └── separator.tsx           ← shadcn separator
├── icons/
│   └── SocialIcons.tsx         ← inline SVG: GitHub, LinkedIn, Instagram, Mail
└── providers/
    ├── ThemeProvider.tsx        ← next-themes wrapper
    ├── QueryProvider.tsx        ← TanStack Query wrapper + devtools
    └── ThemeAwareToaster.tsx    ← Sonner Toaster synced to app theme

lib/
├── utils.ts                    ← cn() utility (clsx + tailwind-merge)
├── api.ts                      ← typed fetch wrapper for backend API
├── query-client.ts             ← QueryClient factory with default config
└── toast.ts                    ← typed Sonner toast helper

hooks/
└── use-toast.ts                ← re-exports toast from lib/toast

types/
└── index.ts                    ← global interfaces (Tool, Project, ContactFormData, etc.)

data/
├── site.ts                     ← SEO config, URL, keywords
├── navigation.ts               ← navItems (desktop mega menu) + mobileNavItems
├── footer.ts                   ← footerData (links, socials, copyright)
└── home.ts                     ← homeData, aboutStats, cvLink
```

---

## API Layer (`lib/api.ts`)

Native fetch wrapper — no axios dependency:

```typescript
import { api } from "@/lib/api";

// All methods are fully typed
const tools = await api.get<Tool[]>("/tools");
const result = await api.post<Tool>("/tools", { name: "...", slug: "..." });
```

**Error handling:**
```typescript
import { api, ApiError } from "@/lib/api";

try {
  await api.post("/contact", formData);
} catch (err) {
  if (err instanceof ApiError && err.status === 422) {
    // validation error
  }
}
```

**Base URL:** `NEXT_PUBLIC_API_URL` env var (defaults to `http://localhost:3001`)

---

## React Query Patterns

**Custom hook structure:**
```typescript
// hooks/use-tools.ts
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Tool } from "@/types";

export function useTools() {
  return useQuery({
    queryKey: ["tools"],
    queryFn: () => api.get<Tool[]>("/tools"),
  });
}

export function useContactForm() {
  return useMutation({
    mutationFn: (data: ContactFormData) => api.post("/contact", data),
    onSuccess: () => toast.success("Message sent!"),
    onError: () => toast.error("Failed to send"),
  });
}
```

**Default query config** (in `lib/query-client.ts`):
- `staleTime`: 60s
- `gcTime`: 5min
- `retry`: 1
- `refetchOnWindowFocus`: false

---

## Toast Notifications

```typescript
import { toast } from "@/lib/toast";
// OR from hook:
import { toast } from "@/hooks/use-toast";

toast.success("Saved!", "Your changes have been saved.");
toast.error("Failed", "Please try again.");
toast.loading("Sending...");
toast.promise(api.post("/contact", data), {
  loading: "Sending...",
  success: "Message sent!",
  error: "Failed to send",
});
```

---

## Aurora Background Component

For animated hero sections:

```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";

// As a section wrapper
<AuroraBackground as="section" className="min-h-screen flex items-center pt-16">
  <div className="page-container py-20">
    ...
  </div>
</AuroraBackground>

// As a div (default)
<AuroraBackground className="rounded-2xl">
  ...
</AuroraBackground>
```

Animation keyframes (`aurora-float`) are defined in `app/globals.css`.

---

## Environment Variables

| Variable              | Default                 | Description         |
| --------------------- | ----------------------- | ------------------- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` | Backend API base URL |

---

## Commands

```bash
pnpm dev      # Dev server — runs on :3001 if :3000 is taken
pnpm build    # Production build + type check
pnpm lint     # ESLint
```

## Related

- **Backend:** `../backend` — NestJS/Express API server
- **Old frontend:** `../front-end` — Legacy React SPA (reference only)
