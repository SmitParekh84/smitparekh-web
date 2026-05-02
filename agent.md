# Copilot Agent Notes - smitparekh-web

Hey, quick read before you start touching this repo. This is my personal portfolio +
free tools site (smitparekh.co.in). Stack is Next.js 16 App Router, React 19,
TypeScript strict, Tailwind v4, shadcn/ui (`base-nova` style). Below is what tends
to bite people who jump in cold.

> Style note: keep diffs small, write plain code, no fancy commentary, and please
> use normal hyphens `-` instead of em-dashes `-` in any docs or comments you add.

---

## 1. Always check shadcn first when adding a new component

We use shadcn/ui (`style: base-nova`, see `components.json`). Before you hand-roll
any UI primitive (dialog, accordion, tabs, form, etc.), check if shadcn already
has it and add it via the CLI:

```bash
pnpm dlx shadcn@latest add <component>
# example
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add tabs
```

It will drop the file into `components/ui/<name>.tsx` using our existing tokens
and `cn()` helper. Only build a custom component when shadcn doesn't have one,
or the design is genuinely bespoke (Aurora background, SocialIcons, etc.).

What we already have in `components/ui/`:

```
aurora-background  avatar     badge      button     card      dropdown-menu
input              label      motion     scroll-area  section-header
separator          sheet      sidebar    skeleton   table     tooltip
```

Don't duplicate any of these. Extend them or compose them.

### shadcn quirks in this project

- `style` is `base-nova`, which uses `@base-ui/react` under the hood, not Radix.
- The `Button` does NOT support `asChild`. For link-styled buttons:
  ```tsx
  <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
    Contact
  </Link>
  ```
- Icon library is Lucide v1 (`lucide-react@^1.11.0`). Brand icons (GitHub,
  LinkedIn, Instagram) were removed from Lucide v1, so use
  `components/icons/SocialIcons.tsx` instead.
- shadcn writes CSS variables into `app/globals.css`. Do not create a
  `tailwind.config.js` and do not move tokens out of `globals.css`.

---

## 2. Tooling and basics

| Thing            | What we use                                     |
| ---------------- | ----------------------------------------------- |
| Package manager  | pnpm only (never npm or yarn)                   |
| Node             | >= 20                                           |
| Next.js          | 16.2.4 (App Router only, no Pages Router)       |
| React            | 19.2.4 (Server Components by default)           |
| TypeScript       | strict mode on                                  |
| Tailwind         | v4, CSS-only config in `app/globals.css`        |
| Server state     | TanStack Query v5                               |
| HTTP client      | axios (wrapped in `lib/api/client.ts`)          |
| Toasts           | sonner (always go through `lib/toast.ts`)       |
| Theming          | next-themes, class strategy                     |
| Animations       | framer-motion + `tw-animate-css`                |
| 3D (rare)        | three + @react-three/fiber                      |

Commands:

```bash
pnpm dev      # dev server, falls back to :3001 if :3000 is taken
pnpm build    # prod build + type check
pnpm lint     # eslint
```

Run `pnpm lint` and `pnpm build` before declaring a task done if you touched code.

---

## 3. Next.js 16 things that trip people up

- `params` in route components is a Promise. Always `await params`:
  ```tsx
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    ...
  }
  ```
- No `getServerSideProps` / `getStaticProps`. Use async Server Components or
  Route Handlers in `app/.../route.ts`.
- SEO uses the `Metadata` API, not the legacy `<Head>` component. Look at
  `app/layout.tsx` for the pattern.
- `next/image` with `fill` requires a `sizes` prop. Don't skip it.
- `"use client"` only when you actually need state, effects, browser APIs, or
  event handlers. Default everything else to a Server Component.

---

## 4. Folder map

```
app/                            App Router
  layout.tsx                    fonts, ThemeProvider, QueryProvider, Navbar, Footer
  page.tsx                      home
  globals.css                   tokens, base styles, layout utilities
  sitemap.ts / robots.ts        auto-generated
  (marketing)/                  /about, /contact, /portfolio
  (tools)/free-tools/           /free-tools and /free-tools/[slug]
  admin/                        admin area, guarded by AdminGuard

components/
  layout/        Navbar, Footer, Container
  sections/      Hero and other composite sections
  ui/            shadcn primitives (see list above)
  icons/         SocialIcons.tsx and friends
  providers/     ThemeProvider, QueryProvider, ThemeAwareToaster

lib/
  utils.ts       cn() (clsx + tailwind-merge)
  toast.ts       typed sonner wrapper
  query-client.ts
  api/           axios layer, one file per resource (see below)

hooks/
  api/           one React Query hooks file per resource
  use-toast.ts, use-auth.ts, use-projects.ts (re-exports)

types/index.ts   shared interfaces (Tool, Project, ContactFormData, ...)
data/            site config, navigation, footer, home content
```

---

## 5. Styling rules

Tokens live in `app/globals.css` inside `@theme inline`. Two layers:

- Layer 1, primitive palette: generates utilities like `bg-blue-500`,
  `text-cyan-400`. Use these for brand-specific things.
- Layer 2, semantic aliases (`--primary`, `--background`, `--muted`, `--ring`,
  ...): used by shadcn components. Use these for generic UI surfaces.

Useful primitives:

| Token       | Hex       | Used for                         |
| ----------- | --------- | -------------------------------- |
| `blue-500`  | `#0628FF` | Primary CTAs, links, icons       |
| `blue-600`  | darker    | Hover state for `blue-500`       |
| `cyan-400`  | `#00C5EC` | Accent, ring, gradient end       |
| `sky-500`   | `#2196F3` | Gradient midpoint                |
| `cream-100` | `#FFFDE7` | Light mode warm surface          |

Layout utilities (already defined in `globals.css @layer components`):

- `.page-container` instead of `container mx-auto px-4`
- `.page-section` for consistent vertical rhythm
- Or use `<Container as="section">` from `components/layout/Container.tsx`

Do:

```tsx
<section className="page-section">
  <div className="page-container">
    <h1 className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
      Title
    </h1>
  </div>
</section>
```

Don't:

- Hand-roll `max-w-7xl mx-auto px-4` everywhere.
- Use arbitrary hex values like `text-[#0628FF]` when a token exists.
- Use `brand-*` class names. Those were removed.
- Add a `tailwind.config.js`.

---

## 6. Data fetching, the only way

Client-side data goes through TanStack Query, and queries go through the typed
hooks in `hooks/api/`. New endpoint? Add a typed function in
`lib/api/<resource>.ts` and a hook in `hooks/api/use-<resource>.ts`. Don't
sprinkle raw `api.get(...)` calls into components.

```tsx
"use client";
import { useProjects, useDeleteProject } from "@/hooks/api";

const { data, isLoading, isError } = useProjects();
const del = useDeleteProject();
await del.mutateAsync(id); // throws ApiError on failure
```

Resource modules already living in `lib/api/`:
`auth`, `projects`, `contact`, `feedback`, `meta`, `qr-code`, `remove-bg`,
`resume`, `media`, `generate-post`.

Other rules:

- Query keys come from `lib/api/query-keys.ts`. Don't inline string keys.
- Errors are normalized to `ApiError` (`status`, `message`, `data`). Branch on
  `err instanceof ApiError`.
- Auth: bearer token in `localStorage.admin_token`, injected by an axios
  request interceptor. Login via `useLogin()`, then `setAdminToken(token)`.
- Default query config (`lib/query-client.ts`): `staleTime` 60s, `gcTime` 5m,
  `retry` 1, `refetchOnWindowFocus` false.

---

## 7. Toasts

Always import from one place:

```ts
import { toast } from "@/lib/toast";

toast.success("Saved", "Your changes are live.");
toast.error("Failed", "Please try again.");
toast.promise(api.post("/contact", data), {
  loading: "Sending...",
  success: "Message sent",
  error: "Failed to send",
});
```

Don't import `sonner` directly in feature code.

---

## 8. File naming

- Components: `PascalCase.tsx` (`HeroSection.tsx`)
- shadcn UI primitives: `kebab-case.tsx` in `components/ui/` (this is what the
  shadcn CLI generates, leave it alone)
- Utilities: `kebab-case.ts` (`format-date.ts`)
- Hooks: file `use-kebab-case.ts`, exported `useCamelCase`
  (`use-projects.ts` exports `useProjects`)
- Data files: match the feature (`home.ts`, `site.ts`)

---

## 9. Environment variables

| Variable                                         | Scope     | What it is                                              |
| ------------------------------------------------ | --------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`                            | client    | Express backend base URL                                |
| `NEXT_PUBLIC_PYTHON_API_URL`                     | client    | Python tools service (rembg, etc., optional)            |
| `NEXT_PUBLIC_SUPABASE_URL`                       | client    | Supabase project URL                                    |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`           | client    | Supabase anon key                                       |
| `SUPABASE_SERVICE_ROLE_KEY`                      | server    | Bypasses RLS — quota writes + admin reads. Never expose |
| `IP_HASH_SALT`                                   | server    | Salt for hashing IPs in `tool_usage.ip_hash`            |
| `IP_QUOTA_MULTIPLIER`                            | server    | Default `3` — sessions per NAT before IP cap            |
| `ADMIN_EMAILS` / `NEXT_PUBLIC_ADMIN_EMAILS`      | both      | Comma-separated admin allowlist; empty = locked         |
| `SUPABASE_ACCESS_TOKEN` / `SUPABASE_DB_PASSWORD` | local     | Used by `pnpm db:push` only                             |

`.env.example` is the source of truth, copy it to `.env.local` for local dev.
Don't commit secrets. Anything client-needs-to-see must be `NEXT_PUBLIC_*`.

When you add a new env var: update `.env.example` (with a comment), `.env.local`,
this table, the `README.md` table, and `CLAUDE.md` if it changes runtime behavior.

---

## 9.5. Tool quotas + DB migrations

- **Quota gate:** `app/api/tools/[slug]/use/route.ts` — `POST` consumes, `GET` reports remaining
- **Hook:** `useToolQuota({ slug })` from `hooks/api/use-tool-quota.ts`
- **UI:** every tool component wires `<QuotaBadge>` + `<LoginGateModal>`
- **Admin:** all admin routes/pages gate on `isAdminEmail()` (`lib/admin-allowlist.ts`)
- **IPs:** never log raw — use `hashIp()` (`lib/ip-hash.ts`)

Migrations live in `supabase/migrations/NNNN_<name>.sql`. Apply with **pnpm**:

```bash
pnpm db:new add_something    # scaffold next sequential file
pnpm db:push:dry             # preview
pnpm db:push                 # apply
```

Never use `npm run db:*` — repo is pnpm-only. Never edit a migration that's already been pushed.

---

## 10. Checklists I actually use

Adding a new UI piece:

- [ ] Did I check if shadcn already has it? (`pnpm dlx shadcn@latest add ...`)
- [ ] Right folder: `components/ui/` for primitives, `components/sections/` for
      page-level composites, `components/layout/` for chrome.
- [ ] Using design tokens (`blue-500`, `bg-card`, `text-muted-foreground`)
      instead of hardcoded hex?
- [ ] Using `.page-container` / `.page-section` for layout?
- [ ] `"use client"` only if it actually needs to be client?
- [ ] Images: `next/image` with `sizes` when `fill`?

Adding or changing an API call:

- [ ] Added or reused a function in `lib/api/<resource>.ts`?
- [ ] Wrote or reused a hook in `hooks/api/use-<resource>.ts`?
- [ ] Query key in `lib/api/query-keys.ts`, not inlined?
- [ ] Loading and error states handled (`isPending`, `isLoading`, `isError`)?
- [ ] Toast on success/failure for mutations?
- [ ] Errors checked with `instanceof ApiError` where needed?

Before opening a PR:

- [ ] `pnpm lint` clean
- [ ] `pnpm build` succeeds
- [ ] No new `tailwind.config.js`
- [ ] No `npm install` / `yarn add` left in scripts or docs
- [ ] No em-dashes in new docs/comments, just `-`

---

## 11. Common pitfalls (quick reference)

- Using `<Button asChild>` -> won't work, use `buttonVariants()` on `<Link>`.
- Importing `Github` from `lucide-react` -> doesn't exist in v1, use
  `SocialIcons.tsx`.
- Forgetting to `await params` in route components -> runtime error in Next 16.
- Adding `tailwind.config.js` -> we don't have one, tokens are in `globals.css`.
- Inlining query keys -> breaks invalidation, use `lib/api/query-keys.ts`.
- Using `npm`/`yarn` -> lockfile mismatch, pnpm only.
- Calling `api.get` directly from a component -> wrap it in a hook in
  `hooks/api/`.

---

## 12. Commits

Conventional commits, short and lowercase subject:

- `feat:` new feature
- `fix:` bug fix
- `refactor:` no behavior change
- `chore:` deps, config, tooling
- `docs:` docs only
- `style:` formatting / whitespace
- `perf:` perf improvement

Keep PRs focused on one thing. Don't sneak in unrelated formatting churn.

---

## 13. Related repos (context only, don't edit from here)

- `../smitparekh-api` - Express + MongoDB backend (winston logger, kebab-case files).
- `../python-tools` - FastAPI + rembg etc., deployed to a Hugging Face Docker Space.
- `../front-end` - legacy Vite React SPA, reference only.

If a change spans backend + frontend, do the frontend part here and call out
the backend change in the PR description so I can pair them up.
