@AGENTS.md

# Smit Parekh Portfolio - Next.js 16 Frontend

## What This Is

Tools landing page + personal portfolio site. Deployed at `smitparekh.co.in`.
Built with Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui.

## Tech Stack (exact versions matter)

| Package               | Version  | Notes                                         |
| --------------------- | -------- | --------------------------------------------- |
| next                  | 16.2.4   | App Router only - no Pages Router             |
| react / react-dom     | 19.2.4   | Server Components by default                  |
| typescript            | ^5       | `"strict": true` in tsconfig                  |
| tailwindcss           | ^4       | Config-less - CSS-only setup                  |
| @base-ui/react        | ^1.4.1   | Powers shadcn `base-nova` style               |
| @tanstack/react-query | ^5       | Server state - all API calls go through this  |
| sonner                | ^2.0.7   | Toast notifications                           |
| next-themes           | ^0.4.6   | Class-based dark/light mode                   |
| lucide-react          | ^1.11.0  | Icons - brand icons removed in v1             |
| pnpm                  | any      | ONLY package manager - never npm/yarn         |

---

## Critical Patterns - Read Before Touching Anything

### 1. shadcn `base-nova` - No `asChild`
Uses `@base-ui/react/button` which has **no `asChild` prop**. For link-styled buttons:

```tsx
// CORRECT
<Link href="/contact" className={buttonVariants({ variant: "outline" })}>
  Contact
</Link>

// WRONG - throws at runtime
<Button asChild><Link href="/contact">Contact</Link></Button>
```

### 2. Tailwind v4 - CSS-only config
No `tailwind.config.js`. Tokens live in `app/globals.css` inside `@theme inline`.
Never create `tailwind.config.js` or use `theme.extend`.

### 3. Lucide v1 - Brand icons removed
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

**Layer 1 - Primitive palette** (`@theme inline`, static values)
These generate Tailwind utilities (`bg-blue-500`, `text-cyan-400`, etc.):

| Token           | Hex       | Use                         |
| --------------- | --------- | --------------------------- |
| `blue-500`      | `#0628FF` | Primary CTAs, links, icons  |
| `blue-600`      | darker    | Hover state for blue-500    |
| `cyan-400`      | `#00C5EC` | Accent, ring, gradient end  |
| `sky-500`       | `#2196F3` | Gradient midpoint           |
| `cream-100`     | `#FFFDE7` | Light mode warm surface     |
| `neutral-0–950` | -         | Blue-tinted surface + text  |

**Layer 2 - Semantic aliases** (`:root` / `.dark`, reference primitives)
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
├── api/                        ← axios-based API layer (split per resource)
│   ├── client.ts               ←   axios instance, interceptors, ApiError
│   ├── query-keys.ts           ←   centralized React Query keys
│   ├── auth.ts                 ←   login + token storage helpers
│   ├── projects.ts             ←   CRUD + image upload
│   ├── contact.ts              ←   contact form, CV download
│   ├── feedback.ts             ←   submit/list
│   ├── meta.ts                 ←   tags, SEO analyze, reports
│   ├── qr-code.ts              ←   QR generation (json + blob)
│   ├── remove-bg.ts            ←   remove bg, compress (single + bulk)
│   ├── resume.ts               ←   resume analyzer
│   ├── media.ts                ←   LinkedIn media download
│   ├── generate-post.ts        ←   AI post generation
│   └── index.ts                ←   barrel re-exports
├── query-client.ts             ← QueryClient factory with default config
└── toast.ts                    ← typed Sonner toast helper

hooks/
├── use-toast.ts                ← re-exports toast from lib/toast
├── use-auth.ts                 ← thin re-export of hooks/api/use-auth + token helpers
├── use-projects.ts             ← thin re-export of hooks/api/use-projects
└── api/                        ← React Query hooks (one file per resource)
    ├── use-auth.ts
    ├── use-projects.ts
    ├── use-contact.ts
    ├── use-feedback.ts
    ├── use-meta.ts
    ├── use-tools.ts
    └── index.ts

types/
└── index.ts                    ← global interfaces (Tool, Project, ContactFormData, etc.)

data/
├── site.ts                     ← SEO config, URL, keywords
├── navigation.ts               ← navItems (desktop mega menu) + mobileNavItems
├── footer.ts                   ← footerData (links, socials, copyright)
└── home.ts                     ← homeData, aboutStats, cvLink
```

---

## API Layer (`lib/api/`)

Axios-based, split per resource. Returns `res.data` directly so calls feel like fetch wrappers.

```typescript
// Preferred: typed hooks
import { useProjects, useSubmitContact } from "@/hooks/api";

// Escape hatch: direct API call (rare - wrap in a hook instead)
import { api, ApiError, projectsApi } from "@/lib/api";

const projects = await projectsApi.list();              // typed module
const tool     = await api.get<Tool>("/tools/:slug");   // raw axios call
```

**Resource modules** (`lib/api/<resource>.ts`):
- `authApi` - `login`, `getAdminToken`, `setAdminToken`, `clearAdminToken`
- `projectsApi` - `list`, `byId`, `byTitle`, `create`, `replace`, `update`, `remove`, `uploadImage`
- `contactApi` - `submit`, `cvDownload`
- `feedbackApi` - `submit`, `list`
- `metaApi` - `getTags`, `analyzeSeo`, `listSeoReports`
- `qrCodeApi` - `generate`, `generateImage` (Blob)
- `removeBgApi` - `removeBackground`, `compressImage`, `compressBulk`
- `resumeApi`, `mediaApi`, `generatePostApi`

**Error handling:**
```typescript
import { ApiError } from "@/lib/api";

try {
  await contactApi.submit(formData);
} catch (err) {
  if (err instanceof ApiError && err.status === 422) {
    // validation error - err.data has details
  }
}
```

**Auth:** axios request interceptor injects `Authorization: Bearer <token>` from `localStorage.admin_token`.
Login flow: `useLogin()` mutation → on success `setAdminToken(token)` → guarded routes via `<AdminGuard>`.

**Base URL:** `NEXT_PUBLIC_API_URL` env var (defaults to `http://localhost:5000/api`).

---

## React Query Patterns

**Always use the hooks in `hooks/api/`. Add a new hook there for any new endpoint.**

```typescript
// hooks/api/use-projects.ts
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "@/lib/api";
import { queryKeys } from "@/lib/api/query-keys";

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: () => projectsApi.list(),
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.projects.all }),
  });
}
```

**Consuming a hook in a component:**
```tsx
"use client";
import { useProjects, useDeleteProject } from "@/hooks/api";

const { data: projects, isLoading, isError } = useProjects();
const deleteProject = useDeleteProject();

await deleteProject.mutateAsync(id);  // throws ApiError on failure
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

Full list lives in `.env.example` / `README.md`. Highlights agents care about:

| Variable                          | Scope    | Description                                                |
| --------------------------------- | -------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`             | client   | Express backend base URL                                   |
| `NEXT_PUBLIC_PYTHON_API_URL`      | client   | Python tools service (optional)                            |
| `NEXT_PUBLIC_SUPABASE_URL`        | client   | Supabase project URL                                       |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | client | Publishable (anon) key                                  |
| `SUPABASE_SERVICE_ROLE_KEY`       | server   | Bypasses RLS for quota writes / admin reads. Never expose. |
| `IP_HASH_SALT`                    | server   | Salt for hashing IPs in `tool_usage.ip_hash`               |
| `IP_QUOTA_MULTIPLIER`             | server   | Default `3` — sessions per NAT before IP cap hits          |
| `ADMIN_EMAILS`                    | server   | Comma-separated admin email allowlist; empty = locked. **Never use `NEXT_PUBLIC_ADMIN_EMAILS`** — that was removed (leaked admin identity to browser) |
| `RESEND_API_KEY`                  | server   | Resend API key for sending email                           |
| `RESEND_FROM`                     | server   | Sender address: `Smit Parekh <noreply@smitparekh.co.in>`  |
| `SUPABASE_ACCESS_TOKEN` / `SUPABASE_DB_PASSWORD` | local-only | Used by `pnpm db:push`                       |

> **Security rule:** Any variable with `NEXT_PUBLIC_` prefix is baked into the browser bundle and readable in DevTools.
> Secrets must **never** use this prefix. Only safe-to-expose values: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

---

## Tool Quotas (Supabase) — read before touching tools

- **Tables:** `tool_usage`, `users`, `tools` — defined in `supabase/migrations/0001_tools_phase2.sql` + `0002_tools_ip_hash.sql`.
- **Quota gate:** `app/api/tools/[slug]/use/route.ts`
  - `POST` consumes one slot (and inserts a usage row).
  - `GET` returns remaining quota for the badge — no consumption.
  - Guests: `MAX(session_count, ceil(ip_count / IP_QUOTA_MULTIPLIER))`.
  - Logged-in users: counted purely by `user_id`.
- **Client API:** `useToolQuota()` (`hooks/api/use-tool-quota.ts`) — exposes `checkQuota()`, `status`, `refreshStatus()`. Auto-fetches `status` on mount so `<QuotaBadge>` renders immediately.
- **Login gate:** `<LoginGateModal>` opens when the route returns `429`. Auto-resume after login is **not** wired yet — user must retry manually.
- **Admin gate:** every admin route + page checks `isAdminEmail()` (`lib/admin-allowlist.ts`). Empty allowlist locks everyone out, including the dev.
- **IP hashing:** `lib/ip-hash.ts` — sha256(`ip + IP_HASH_SALT`).slice(0, 32). Never log raw IPs.
- **Adding a new tool:** insert a row in `tools` (slug, daily_limit_guest, daily_limit_user, monthly_limit_user). Wire `useToolQuota({ slug })` + `<QuotaBadge>` + `<LoginGateModal>` into the tool component — see `ATSResumeChecker.tsx` as the reference.

---

## Database Migrations

- All schema changes live in `supabase/migrations/NNNN_<name>.sql` (zero-padded, sequential).
- **Never auto-applied on deploy.** Apply locally:
  ```bash
  pnpm db:new add_something    # scaffold next file
  # …edit the SQL…
  pnpm db:push:dry             # preview
  pnpm db:push                 # apply
  ```
- The script downloads the Supabase CLI to `.supabase-cli/` (gitignored) on first run and reads creds from `.env.local`. **Use `pnpm`, never `npm`.**
- Once a migration is pushed to remote, **do not edit it** — create a new migration to fix or amend.

---

## Commands

```bash
pnpm dev          # Dev server - runs on :3001 if :3000 is taken
pnpm build        # Production build + type check
pnpm lint         # ESLint
pnpm db:push      # Apply pending Supabase migrations
pnpm db:new <n>   # Scaffold next migration file
```

## Related

- **Backend:** `../smitparekh-api` - Express + MongoDB API (Resend email, Swagger dev docs, tsx ESM+JSX loader)
- **Python tools:** `../python-tools` - FastAPI + rembg (background removal etc.), deployed to Hugging Face Docker Space
- **Old frontend:** `../front-end` - Legacy Vite React SPA (reference only)

---

## PageHero Component

Every marketing page uses `<PageHero>` from `components/layout/PageHero.tsx`.
It's a **server component** — safe to use directly in `page.tsx`.

```tsx
import { PageHero } from "@/components/layout/PageHero";
import { MessageSquare } from "lucide-react"; // or any Lucide icon

<PageHero
  eyebrow="Badge text"            // small badge above the title
  title="Main heading"
  description="Subtitle shown below the title."
  icon={MessageSquare}            // Lucide icon component (not JSX, the reference)
  align="center"                  // "left" | "center"
/>
```

Used by: `/about`, `/contact`, `/portfolio`, `/blog`, `/feedback`, and all other marketing pages.
Gradient: `from-blue-600 via-blue-500 to-cyan-500`.

### Marketing page pattern

```
app/(marketing)/pagename/
├── page.tsx       ← server component: Metadata export + <PageHero> + renders _client
└── _client.tsx    ← "use client": form/interactive UI (no header — PageHero is in page.tsx)
```

Do NOT put a custom `<h1>` or `<div>` header inside `_client.tsx` — that was the bug.
The `<PageHero>` lives in `page.tsx` and is rendered before `_client.tsx`.

---

## AdminGuard

`components/admin/AdminGuard.tsx` is a **client component** (`"use client"`).

It gates admin routes by checking `session.user.app_metadata?.role`:
```ts
const role = session.user.app_metadata?.role;
const isAdmin = role === 'admin' || role === 'superadmin';
```

**Rules:**
- **Never** use email comparison or `NEXT_PUBLIC_ADMIN_EMAILS` for client-side gating — that was removed.
- The admin role is set in Supabase Auth dashboard → Users → Edit user → app_metadata: `{"role": "admin"}`.
- For server-side admin checks (Route Handlers, Server Actions) use `isAdminEmail()` from `lib/admin-allowlist.ts` with the `ADMIN_EMAILS` server env var.

---

## Navigation

Defined in `data/navigation.ts`. Two arrays used by Navbar:
- `navItems` — desktop menu items
- `mobileNavItems` — mobile drawer items

**Current top-level links (both arrays must stay in sync):**
Home · About · Portfolio · Blog · Free Tools · Feedback · **Hire Me** (`/hire-me`)

> "Resume" was renamed to "Hire Me" — do not revert. The route is `/hire-me`.

---

## Feedback Page

`app/(marketing)/feedback/` — submit-only, no public submissions list.

Structure:
- `page.tsx` — metadata + `<PageHero>` + `<FeedbackClientPage>`
- `_client.tsx` — two-column layout:
  - Left: `<SubmitForm>` (type selector, name/email, subject/description, send button)
  - Right: `<HowItWorksPanel>` (4 process cards + 6-item what-to-report grid + contact CTA)

There is **no public listing of submissions**. All feedback is admin-only via the Express backend (`GET /api/feedback` requires admin role).

---

## UI Component Standards

### Never use native HTML form elements when a shadcn equivalent exists

| ❌ Don't use                | ✅ Use instead                          |
| -------------------------- | --------------------------------------- |
| `<select>` / `<option>`    | `AppSelect` or shadcn `Select`          |
| `<input type="checkbox">`  | shadcn `Checkbox`                       |
| `<input type="radio">`     | shadcn `RadioGroup` + `RadioGroupItem`  |
| raw `<textarea>`           | shadcn `Textarea`                       |
| raw `<input>`              | shadcn `Input`                          |

### `AppSelect` — project-standard dropdown

Located at `components/ui/app-select.tsx`. Use for any dropdown where options are a simple array.

```tsx
import { AppSelect } from "@/components/ui/app-select";

// Simple string options
<AppSelect
  value={category}
  onValueChange={setCategory}
  options={["All", "React", "Next.js"]}
  triggerClassName="w-40"         // optional: override width/style
/>

// Label-value pairs
<AppSelect
  value={status}
  onValueChange={setStatus}
  options={[
    { value: "all", label: "All statuses" },
    { value: "active", label: "Active only" },
  ]}
/>
```

For **inline badge-style selects** (e.g., status toggle in a table row), use shadcn `Select` primitives directly with custom trigger classes:

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Select value={status} onValueChange={onChange}>
  <SelectTrigger className="h-auto w-auto rounded-full border-0 px-2.5 py-0.5 text-xs font-medium shadow-none [&>svg]:h-3 [&>svg]:w-3 bg-blue-100 text-blue-700">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="open">Open</SelectItem>
    <SelectItem value="resolved">Resolved</SelectItem>
  </SelectContent>
</Select>
```

### Reusable component principle

If a component is used in **2+ places** OR has likely future use, create it as a reusable component:
- UI wrappers → `components/ui/` (e.g., `app-select.tsx`, `skeleton.tsx`)
- Admin UI patterns → `components/admin/` (e.g., `FeedbackRow`, `BlogForm`)
- Layout patterns → `components/layout/` (e.g., `PageHero`, `Container`)

Do **not** duplicate styled JSX blocks across pages — extract immediately.
