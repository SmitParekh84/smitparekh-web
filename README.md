# smitparekh-web

Next.js 16 frontend for [smitparekh.co.in](https://smitparekh.co.in) — portfolio site, tools landing page, and admin dashboard. Talks to a sibling Express API ([`smitparekh-api`](../smitparekh-api)) and an optional Python tools service ([`python-tools`](../python-tools)).

---

## Tech stack

| Package               | Version   | Notes                                        |
| --------------------- | --------- | -------------------------------------------- |
| next                  | 16.2.4    | App Router only — no Pages Router            |
| react / react-dom     | 19.2.4    | Server Components by default                 |
| typescript            | ^5        | `"strict": true`                             |
| tailwindcss           | ^4        | Config-less — all tokens in `globals.css`    |
| @base-ui/react        | ^1.4.1    | Powers shadcn `base-nova` components         |
| @tanstack/react-query | ^5        | Client-side data fetching                    |
| sonner                | ^2.0.7    | Toast notifications                          |
| next-themes           | ^0.4.6    | Class-based dark / light mode                |
| lucide-react          | ^1.11.0   | Icons (v1 removed brand icons — see below)   |
| axios                 | —         | HTTP client for the API layer                |

---

## Local development

The two repos live as **siblings** on disk:

```
SmitParekh-Portfolio/
├── smitparekh-web/   ← this repo
└── smitparekh-api/   ← Express backend
```

### 1. Clone both repos side-by-side

```bash
mkdir SmitParekh-Portfolio && cd SmitParekh-Portfolio
git clone <web-repo-url>  smitparekh-web
git clone <api-repo-url>  smitparekh-api
```

> The folder names **must** be `smitparekh-web` and `smitparekh-api` — the dev script resolves the API via `../smitparekh-api`.

### 2. Configure environment variables

```bash
cp smitparekh-web/.env.example smitparekh-web/.env.local
cp smitparekh-api/.env.example smitparekh-api/.env
# Fill in the values in each file
```

### 3. Install deps for both repos

```bash
cd smitparekh-web
pnpm setup        # installs web deps + api deps in one go
```

### 4. Run web + api together

```bash
pnpm dev
```

This boots:
- **web** → Next.js on `http://localhost:3000` (`:3001` if `:3000` is taken)
- **api** → Express on `http://localhost:5000`

Logs are interleaved with colored prefixes. Press `Ctrl+C` once to stop both.

---

## Scripts

| Command          | What it does                                         |
| ---------------- | ---------------------------------------------------- |
| `pnpm dev`       | Run **web + api** together (default)                 |
| `pnpm dev:solo`  | Run only the Next.js web app                         |
| `pnpm dev:web`   | Same as `dev:solo` (used internally by `dev`)        |
| `pnpm dev:api`   | Run only the API (proxies to `../smitparekh-api`)    |
| `pnpm setup`     | `pnpm install` in both repos                         |
| `pnpm build`     | Production build of the Next.js app                  |
| `pnpm lint`      | ESLint                                               |

### Requirements

- Node.js **≥ 22**
- pnpm **≥ 9** (only package manager — never npm or yarn)

---

## Environment variables

| Variable                     | Default                       | Description                         |
| ---------------------------- | ----------------------------- | ----------------------------------- |
| `NEXT_PUBLIC_API_URL`        | `http://localhost:5000/api`   | Express backend base URL            |
| `NEXT_PUBLIC_PYTHON_API_URL` | _(unset, optional)_           | Python tools service (rembg, etc.)  |

---

## Key patterns

### shadcn `base-nova` — no `asChild`

`@base-ui/react` has no `asChild` prop. For link-styled buttons use `buttonVariants()`:

```tsx
// Correct
<Link href="/contact" className={buttonVariants({ variant: "outline" })}>
  Contact
</Link>

// Wrong — throws at runtime
<Button asChild><Link href="/contact">Contact</Link></Button>
```

### Tailwind v4 — CSS-only config

No `tailwind.config.js`. All design tokens live in `app/globals.css` inside `@theme inline`. Never create `tailwind.config.js` or use `theme.extend`.

### Lucide v1 — brand icons removed

`lucide-react@1.x` dropped `Github`, `Linkedin`, `Instagram`. Use `components/icons/SocialIcons.tsx` which has hand-written inline SVGs.

### Server vs Client components

Default is Server Component. Only add `"use client"` when you need `useState`, `useEffect`, browser APIs, or event handlers.

### API layer

All data fetching goes through typed React Query hooks in `hooks/api/`:

```typescript
// Preferred
import { useProjects, useSubmitContact } from "@/hooks/api";

// Low-level escape hatch (rare)
import { api, projectsApi } from "@/lib/api";
```

---

## Folder structure

```
app/
├── page.tsx                    ← / (home)
├── layout.tsx                  ← root layout (fonts, providers, Navbar, Footer)
├── globals.css                 ← design tokens, base styles, layout utilities
├── sitemap.ts / robots.ts      ← auto-generated SEO files
├── (marketing)/                ← /about, /contact, /portfolio
└── (tools)/free-tools/         ← /free-tools + /free-tools/[slug]

components/
├── layout/                     ← Navbar, Footer, Container
├── sections/                   ← Hero, etc.
├── ui/                         ← shadcn primitives + AuroraBackground
├── icons/                      ← SocialIcons.tsx (inline SVGs)
└── providers/                  ← ThemeProvider, QueryProvider, ThemeAwareToaster

lib/
├── api/                        ← Axios-based modules (one file per resource)
│   ├── client.ts               ←   axios instance, interceptors, ApiError
│   ├── query-keys.ts           ←   centralized React Query key factory
│   └── <resource>.ts           ←   auth, projects, contact, feedback, meta, …
├── query-client.ts             ← QueryClient factory (staleTime 60s, retry 1)
└── toast.ts                    ← typed Sonner toast helper

hooks/api/                      ← React Query hooks (one file per resource)
types/index.ts                  ← global interfaces
data/                           ← static config (site.ts, navigation.ts, home.ts)
```

---

## Deployment

The web app deploys to **Vercel**; the API deploys separately (see `smitparekh-api/vercel.json`). The combined `pnpm dev` script is local-only — production builds run `pnpm build` / `pnpm start` in each repo independently.

---

## Related

- **API:** [`smitparekh-api`](../smitparekh-api) — Express + MongoDB
- **Python tools:** [`python-tools`](../python-tools) — FastAPI + rembg, deployed to Hugging Face Docker Space
