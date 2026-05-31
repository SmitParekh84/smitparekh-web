# smitparekh-web.

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
| `pnpm db:push`     | Apply pending Supabase migrations (auto-detects creds, downloads CLI on first run) |
| `pnpm db:push:dry` | Preview which migrations would be applied (no changes) |
| `pnpm db:new <name>` | Scaffold the next sequential `supabase/migrations/NNNN_<name>.sql` |

### Requirements

- Node.js **≥ 22**
- pnpm **≥ 9** (only package manager — never npm or yarn)

---

## Environment variables

Copy `.env.example` → `.env.local` and fill in values.

### Backend services

| Variable                     | Default                       | Description                         |
| ---------------------------- | ----------------------------- | ----------------------------------- |
| `NEXT_PUBLIC_API_URL`        | `http://localhost:5000/api`   | Express backend base URL            |
| `NEXT_PUBLIC_PYTHON_API_URL` | _(unset, optional)_           | Python tools service (rembg, etc.)  |

### Supabase auth + quotas

| Variable                              | Required        | Description                                                   |
| ------------------------------------- | --------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`            | yes             | `https://<project-ref>.supabase.co`                           |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`| yes             | Publishable (anon) key from Project Settings → API            |
| `SUPABASE_SERVICE_ROLE_KEY`           | yes (server)    | Server-only. Bypasses RLS for quota writes and admin reads.   |

### Tool quotas

| Variable               | Default | Description                                                                       |
| ---------------------- | ------- | --------------------------------------------------------------------------------- |
| `IP_HASH_SALT`         | _none_  | Salt used to sha256 client IPs in `tool_usage.ip_hash`. Rotate to wipe guest counts. |
| `IP_QUOTA_MULTIPLIER`  | `3`     | Guest IP quota multiplier — up to N distinct sessions per NAT before the IP cap.  |

### Admin allowlist

| Variable                    | Required | Description                                                              |
| --------------------------- | -------- | ------------------------------------------------------------------------ |
| `ADMIN_EMAILS`              | server   | Comma-separated emails allowed at `/admin` server APIs. Empty = locked.  |
| `NEXT_PUBLIC_ADMIN_EMAILS`  | client   | Same list, used by `<AdminGuard>` for the client-side gate.              |

### Supabase CLI (only needed locally for `pnpm db:push`)

| Variable                  | Description                                                                |
| ------------------------- | -------------------------------------------------------------------------- |
| `SUPABASE_ACCESS_TOKEN`   | Personal Access Token from <https://supabase.com/dashboard/account/tokens> |
| `SUPABASE_DB_PASSWORD`    | Database password from Supabase Project Settings → Database                |

> Production: set the same vars (minus the CLI ones) in your Vercel project.

---

## Database / Supabase migrations

SQL migrations live under `supabase/migrations/NNNN_<name>.sql`. They are **never auto-applied on deploy** — apply them explicitly from your machine.

### Apply pending migrations

```bash
pnpm db:push          # applies any new migration files
pnpm db:push:dry      # preview only, no changes
```

The script (`scripts/db-push.ps1`):
- Reads `SUPABASE_ACCESS_TOKEN` + `SUPABASE_DB_PASSWORD` from `.env.local` (or environment)
- Downloads the Supabase CLI to `.supabase-cli/` on first run (gitignored)
- Parses the project ref from `NEXT_PUBLIC_SUPABASE_URL`
- Links the project (idempotent) and runs `supabase db push`

### Create a new migration

```bash
pnpm db:new add_blog_comments
# → supabase/migrations/0003_add_blog_comments.sql
```

Edit the generated file, then run `pnpm db:push`.

> **pnpm vs npm:** the project is **pnpm-only**. `pnpm db:push` is the canonical command — never `npm run`.

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

## Admin redesign

The admin dashboard (`app/(admin)/admin/**`) is being reskinned from a Claude Design
handoff (shadcn-flavored, Geist-style cards, sectioned sidebar, breadcrumb topbar).

**Approach — dark mode is free.** The handoff prototype hardcoded light colors
(`bg-white`, `text-fg`, `bg-subtle`, `brand-500`). We do **not** copy those. Every
surface uses the existing semantic tokens from `globals.css`, so light/dark flips
automatically via `next-themes`:

| Handoff token            | Use in this repo                          |
| ------------------------ | ----------------------------------------- |
| `bg` / `bg-white` (page) | `bg-background`                            |
| `card`                   | `bg-card`                                  |
| `subtle`                 | `bg-muted/40`                             |
| `fg` / `mutedfg`         | `text-foreground` / `text-muted-foreground` |
| `border`                 | `border-border`                           |
| `brand-500` (`#0628ff`)  | `blue-500` (already the project brand)    |

### Shipped so far

- **Shell** — `AdminSidebar` regrouped into **Workspace / Team / Account** sections
  (Tenants now uses the `Building2` icon); `AdminTopbar` gained an `Admin › Page`
  breadcrumb and a search field.
- **Overview** (`app/(admin)/admin/page.tsx`) — new stat cards, visitors chart,
  top-sources, recent projects/feedback, and shortcuts. All real lists stay wired to
  the live API; nothing functional was removed.

### ⚠️ New UI built ahead of its backend (functionality is future work)

These surfaces are rendered so the design is complete, but are **not wired** yet.
They're labelled in the UI (e.g. a `Preview` badge) so they don't read as real data:

- **Overview → Visitors chart** — uses sample traffic data. Needs a real pageview
  source. Suggested: a Redis-backed daily counter (the project already has Upstash
  Redis REST configured — see `lib/redis.ts`), or Vercel Web Analytics.
- **Overview → Top sources** — sample referrer breakdown; same backend as above.
- **Topbar → global search** — input is non-functional; needs a search endpoint /
  command-palette wiring.

### Remaining pages (next passes, after this checkpoint)

Projects · Blog · Contacts · Feedback · Waitlist · Chats · Tools · Resume · Users ·
Tenants · Settings (the design adds Security/2FA, Domain, Integrations, API tokens,
Billing sub-tabs — these are also UI-ahead-of-backend and will be marked + listed
here as they land).

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

## Deployment.

The web app deploys to **Vercel**; the API deploys separately (see `smitparekh-api/vercel.json`). The combined `pnpm dev` script is local-only — production builds run `pnpm build` / `pnpm start` in each repo independently.

---

## Related

- **API:** [`smitparekh-api`](../smitparekh-api) — Express + MongoDB
- **Python tools:** [`python-tools`](../python-tools) — FastAPI + rembg, deployed to Hugging Face Docker Space
