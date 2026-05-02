<!-- BEGIN:nextjs-agent-rules -->
# Next.js 16 App Router - Agent Rules

This project uses **Next.js 16.2.4** with App Router. Many patterns differ from earlier versions.
Read the relevant docs in `node_modules/next/dist/docs/` before writing code involving routing,
metadata, server actions, or image optimization.

## Critical Next.js 16 Rules

- `params` in route components is a **Promise** - always `await params` before accessing properties
- Use the `Metadata` API (not `Head` component) for SEO - see `app/layout.tsx` for reference
- No `getServerSideProps` / `getStaticProps` - use async Server Components or Route Handlers
- `next/image` requires explicit `sizes` prop when using `fill` layout

## Styling Rules

- Tailwind v4: no `tailwind.config.js` - all tokens in `app/globals.css` `@theme inline`
- Use `.page-container` instead of `container mx-auto px-4`
- Use `.page-section` for vertical rhythm
- Color tokens: `blue-500` (primary), `cyan-400` (accent), `sky-500` (gradient mid)
- Never use `brand-*` class names - they no longer exist

## Component Rules

- Server Component by default - only add `"use client"` when genuinely needed
- `Button` has NO `asChild` - use `buttonVariants()` on `<Link>` elements instead
- Brand icons (GitHub, LinkedIn) → `components/icons/SocialIcons.tsx` (Lucide v1 removed them)
- Aurora hero backgrounds → `AuroraBackground` from `components/ui/aurora-background.tsx`

## Data Fetching Rules

- Client-side data → TanStack Query (`useQuery`, `useMutation`) in `"use client"` hooks
- **Prefer typed hooks** from `hooks/api/` (e.g. `useProjects`, `useSubmitContact`) over raw `api.*` calls
- Low-level escape hatch → `api.get/post/put/patch/del/postForm` from `lib/api/client.ts` (axios-based, returns `res.data`)
- All resource API modules live in `lib/api/<resource>.ts` (auth, projects, contact, feedback, meta, qr-code, remove-bg, resume, media, generate-post)
- Errors are normalized to `ApiError` (`status`, `message`, `data`) from `lib/api/client.ts`
- Bearer token auth: stored in `localStorage.admin_token`; injected automatically by axios request interceptor
- Toast after mutations → `import { toast } from "@/lib/toast"`
<!-- END:nextjs-agent-rules -->

---

## Development Workflow

### Before Writing Code

1. **Read CLAUDE.md** - Architecture, design tokens, API patterns
2. **Check existing components** - Don't duplicate; extend or reuse
3. **Verify data requirements** - Server vs client data fetching

### Component Creation Checklist

- [ ] Does this belong in `components/ui/` (primitive) or `components/sections/` (composite)?
- [ ] Using `.page-container` for layout instead of manual padding?
- [ ] Using design token classes (`blue-500`, `cyan-400`) not hardcoded colors?
- [ ] `"use client"` only if hooks/state required?
- [ ] Images use Next.js `Image` with `sizes` prop?

### API Integration Checklist

- [ ] Using a hook from `hooks/api/` (e.g., `useProjects`, `useSubmitContact`)?
- [ ] If a new endpoint, added a typed function to the matching `lib/api/<resource>.ts` and a hook to `hooks/api/use-<resource>.ts`?
- [ ] Query keys come from `lib/api/query-keys.ts` (don't inline string keys)?
- [ ] Error handling in place (toast on failure, `ApiError` for branching)?
- [ ] Loading/pending states handled (`isPending`, `isLoading`, `isError`)?

### Styling Guidelines

**DO:**
```tsx
<div className="page-container">
  <h1 className="text-blue-500">Title</h1>
  <Button variant="primary">Click</Button>
</div>
```

**DON'T:**
```tsx
<div className="max-w-7xl mx-auto px-4">
  <h1 className="text-[#0628FF]">Title</h1>
  <button className="bg-blue-600">Click</button>
</div>
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
- Utilities: `kebab-case.ts` (e.g., `format-date.ts`)
- Hooks: `use-kebab-case.ts` exporting `useCamelCase` (e.g., `use-projects.ts` → `useProjects`)
- Data files: Match feature name (e.g., `home.ts`, `site.ts`)

### Git Commits

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code restructuring (no behavior change)
- `chore:` Maintenance (deps, config)
- `docs:` Documentation only

---

## Tool Quotas + Supabase

Anything touching free-tools usage MUST go through the quota layer:

- **Quota route:** `app/api/tools/[slug]/use/route.ts` — `POST` consumes, `GET` reports remaining
- **Client hook:** `useToolQuota({ slug })` from `hooks/api/use-tool-quota.ts` — call `checkQuota()` before doing the work
- **UI:** wire `<QuotaBadge>` (remaining count) + `<LoginGateModal>` (opens on 429) into every tool component — see `ATSResumeChecker.tsx`
- **Admin:** every admin route + UI gates on `isAdminEmail()` (`lib/admin-allowlist.ts`). Empty `ADMIN_EMAILS` = locked-out by design.
- **Never log raw IPs.** Use `hashIp()` from `lib/ip-hash.ts`.

## Database Migrations

- SQL lives in `supabase/migrations/NNNN_<name>.sql` (zero-padded). Never edit a migration after it's been pushed — add a new one.
- **pnpm-only** workflow:
  ```bash
  pnpm db:new add_something   # scaffold next file
  pnpm db:push:dry            # preview
  pnpm db:push                # apply
  ```
- The script auto-loads `SUPABASE_ACCESS_TOKEN` + `SUPABASE_DB_PASSWORD` from `.env.local` and downloads the CLI on first run. Do **not** call `npm run db:*`.

## Environment

When adding a new env var:
1. Document it in `.env.example` with a comment explaining what it is + where to get it
2. Add the same key to `.env.local` for the dev value
3. If it's user-facing config, mention it in `README.md` under "Environment variables"
4. If it changes behavior agents should know about, add a row to the table in `CLAUDE.md`
