<!-- BEGIN:nextjs-agent-rules -->
# Next.js 16 App Router — Agent Rules

This project uses **Next.js 16.2.4** with App Router. Many patterns differ from earlier versions.
Read the relevant docs in `node_modules/next/dist/docs/` before writing code involving routing,
metadata, server actions, or image optimization.

## Critical Next.js 16 Rules

- `params` in route components is a **Promise** — always `await params` before accessing properties
- Use the `Metadata` API (not `Head` component) for SEO — see `app/layout.tsx` for reference
- No `getServerSideProps` / `getStaticProps` — use async Server Components or Route Handlers
- `next/image` requires explicit `sizes` prop when using `fill` layout

## Styling Rules

- Tailwind v4: no `tailwind.config.js` — all tokens in `app/globals.css` `@theme inline`
- Use `.page-container` instead of `container mx-auto px-4`
- Use `.page-section` for vertical rhythm
- Color tokens: `blue-500` (primary), `cyan-400` (accent), `sky-500` (gradient mid)
- Never use `brand-*` class names — they no longer exist

## Component Rules

- Server Component by default — only add `"use client"` when genuinely needed
- `Button` has NO `asChild` — use `buttonVariants()` on `<Link>` elements instead
- Brand icons (GitHub, LinkedIn) → `components/icons/SocialIcons.tsx` (Lucide v1 removed them)
- Aurora hero backgrounds → `AuroraBackground` from `components/ui/aurora-background.tsx`

## Data Fetching Rules

- Client-side data → TanStack Query (`useQuery`, `useMutation`) in `"use client"` hooks
- API calls → `api.get/post/put/patch/del` from `lib/api.ts` (typed fetch wrapper, no axios)
- Toast after mutations → `import { toast } from "@/lib/toast"`
<!-- END:nextjs-agent-rules -->

---

## Development Workflow

### Before Writing Code

1. **Read CLAUDE.md** — Architecture, design tokens, API patterns
2. **Check existing components** — Don't duplicate; extend or reuse
3. **Verify data requirements** — Server vs client data fetching

### Component Creation Checklist

- [ ] Does this belong in `components/ui/` (primitive) or `components/sections/` (composite)?
- [ ] Using `.page-container` for layout instead of manual padding?
- [ ] Using design token classes (`blue-500`, `cyan-400`) not hardcoded colors?
- [ ] `"use client"` only if hooks/state required?
- [ ] Images use Next.js `Image` with `sizes` prop?

### API Integration Checklist

- [ ] Using `api` wrapper from `lib/api.ts` (not raw fetch, not axios)?
- [ ] Wrapped in React Query hook (`useQuery`, `useMutation`)?
- [ ] Error handling in place (toast on failure)?
- [ ] Loading/pending states handled?

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
- Hooks: `useCamelCase.ts` (e.g., `useProjects.ts`)
- Data files: Match feature name (e.g., `home.ts`, `site.ts`)

### Git Commits

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code restructuring (no behavior change)
- `chore:` Maintenance (deps, config)
- `docs:` Documentation only
