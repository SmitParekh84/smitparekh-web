# Smit Parekh Portfolio - Copilot Instructions

Monorepo for [smitparekh.co.in](https://smitparekh.co.in). Two sub-projects:

```
SmitParekh-Portfolio/
├── smitparekh-web/   ← Next.js 16 App Router frontend
└── smitparekh-api/   ← Express + MongoDB backend API
```

Always use **pnpm** — never npm or yarn. Never create `tailwind.config.js`.
Read `smitparekh-web/CLAUDE.md` for frontend architecture.
Read `smitparekh-api/README.md` for backend architecture.

---

## Quick Tech Reference

| Layer     | Stack                                                              |
| --------- | ------------------------------------------------------------------ |
| Frontend  | Next.js 16.2.4, React 19, TypeScript strict, Tailwind v4, shadcn  |
| Backend   | Node >=22, Express, MongoDB/Mongoose, Supabase JWT auth            |
| Email     | **Resend** + **React Email** (JSX templates in `smitparekh-api/emails/`) |
| Auth      | Supabase (frontend login) → JWT verified by backend middleware     |
| Database  | MongoDB Atlas (content) + Supabase (auth + quotas)                 |
| Images    | Cloudinary                                                         |
| Hosting   | Vercel (both frontend and backend)                                 |

---

## Critical Rules - Read Every Time

### Frontend (`smitparekh-web/`)

1. **pnpm only** - never `npm install` or `yarn add`
2. **Tailwind v4** - config-less, all tokens in `app/globals.css` @theme inline block
3. **shadcn `base-nova` style** - `Button` has NO `asChild` prop; use `buttonVariants()` on `<Link>` instead
4. **Lucide v1** - brand icons removed; use `components/icons/SocialIcons.tsx` for GitHub/LinkedIn/Instagram
5. **Server Components by default** - only add `"use client"` when hooks/state/browser APIs are needed
6. **Next.js 16 params** - `params` is a Promise in route components; always `await params` before accessing
7. **Layout classes** - use `.page-container` and `.page-section` (never `container mx-auto px-4`)

### Backend (`smitparekh-api/`)

1. **ESM + JSX** - project is `"type": "module"`; runs with `node --import tsx/esm` (via `tsx` devDep)
2. **Resend for email** - NOT nodemailer. Import `email.service.js` which lazy-inits Resend
3. **Swagger docs** - mounted at `/docs` only in `NODE_ENV !== 'production'` (local dev only)
4. **Supabase JWT only** - API never issues tokens; only verifies them via `middleware/auth.middleware.js`

### Env Var Security

- **`NEXT_PUBLIC_*` vars** are baked into the browser bundle and visible in DevTools
- Secrets (`SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `ADMIN_EMAILS`, `IP_HASH_SALT`) must **never** have the `NEXT_PUBLIC_` prefix
- Only safe-to-expose vars have `NEXT_PUBLIC_` prefix: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_ADMIN_EMAILS` was removed - it leaked admin identity to the browser

---

## Frontend Key Patterns

### AdminGuard (client-side admin gate)
`components/admin/AdminGuard.tsx` checks `session.user.app_metadata?.role === 'admin'` from Supabase JWT.
**Do NOT** use email comparisons or `NEXT_PUBLIC_ADMIN_EMAILS` for client-side auth gating.

### PageHero (marketing page headers)
Every marketing page (`/about`, `/contact`, `/portfolio`, `/feedback`, etc.) uses `<PageHero>` from `components/layout/PageHero.tsx`.

```tsx
import { PageHero } from "@/components/layout/PageHero";
import { MessageSquare } from "lucide-react";

// In page.tsx (server component - PageHero is server-safe):
<PageHero
  eyebrow="Badge text"
  title="Page title"
  description="Short description shown under the title."
  icon={MessageSquare}
  align="center"
/>
```

Props: `eyebrow` (badge), `title`, `description`, `icon` (Lucide), `align` ('left'|'center').
Gradient: `from-blue-600 via-blue-500 to-cyan-500`.

### Page pattern for marketing pages
```
app/(marketing)/pagename/
├── page.tsx       ← server component: metadata + <PageHero> + imports _client
└── _client.tsx    ← "use client": interactive form/UI without the hero header
```

### Navigation
Defined in `data/navigation.ts` - two arrays: `navItems` (desktop) and `mobileNavItems`.
Current top-level links: Home, About, Portfolio, Blog, Free Tools, Feedback, **Hire Me** (`/hire-me`).
"Resume" was renamed to "Hire Me" - do not revert.

### Tool Quota System
Every free tool goes through `app/api/tools/[slug]/use/route.ts`.
- `POST` consumes a quota unit; `GET` returns remaining
- Client hook: `useToolQuota({ slug })` - call `checkQuota()` before running the tool
- Add `<QuotaBadge>` + `<LoginGateModal>` to every tool UI (see `ATSResumeChecker.tsx`)

### Feedback Page
`app/(marketing)/feedback/` - No public submissions list. Shows:
- Left: submit form (`SubmitForm` component in `_client.tsx`)
- Right: `HowItWorksPanel` (4 process cards + what-to-report grid)
All feedback/bug reports go to admin only. The public page is the submit form only.

---

## Backend Key Patterns

### Email System (Resend + React Email)
Templates live in `smitparekh-api/emails/` as JSX files.

```
emails/
├── _components/
│   └── EmailBase.jsx          ← shared layout: gradient header, logo, dark footer
├── WelcomeEmail.jsx           ← new user welcome
├── ContactNotification.jsx    ← admin alert when contact form submitted
├── FeedbackAck.jsx            ← acknowledgement to feedback submitter
└── WaitlistConfirmation.jsx   ← tool waitlist confirmation
```

Usage in routes/controllers - import from `services/email.service.js`:
```js
import { sendContactNotification, sendFeedbackAck, sendWelcomeEmail, sendWaitlistConfirmation } from '../services/email.service.js';
```

**Never use nodemailer or Gmail SMTP** - that was removed. All mail goes through Resend.

### Email Env Vars
```
RESEND_API_KEY=re_...          # from resend.com dashboard
RESEND_FROM=Smit Parekh <noreply@smitparekh.co.in>
CONTACT_NOTIFY_TO=smitparekh03@gmail.com   # admin inbox for contact form alerts
```
`smitparekh.co.in` must be verified in resend.com/domains before emails deliver.

### Swagger API Docs (local only)
Available at `http://localhost:5000/docs` when `NODE_ENV=development`.
**Not exposed in production** - guarded by `if (process.env.NODE_ENV !== 'production')` in `app.js`.
Add `@swagger` JSDoc comments to `routes/*.js` files - `config/swagger.js` scans them automatically.

### ESM + JSX (tsx loader)
Backend is `"type": "module"` so plain Node cannot parse `.jsx` files.
Solution: `tsx` devDependency with `node --import tsx/esm` loader flag in all scripts.
Vercel handles JSX natively via esbuild - no issues on prod.

### Auth Flow
1. User logs in via Supabase on frontend -> gets Supabase JWT
2. Frontend sends `Authorization: Bearer <jwt>` on every request
3. `middleware/auth.middleware.js` verifies JWT via Supabase JWKS endpoint
4. `requireRole('admin', 'superadmin')` checks role in MongoDB

---

## Environment Variables Reference

### Frontend (`.env.local`)
```
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...          # publishable, safe in browser
SUPABASE_SERVICE_ROLE_KEY=eyJ...              # SECRET - server only, never NEXT_PUBLIC
ADMIN_EMAILS=admin@example.com                # SECRET - server only, never NEXT_PUBLIC
IP_HASH_SALT=random-salt                      # SECRET - server only
RESEND_API_KEY=re_...                         # SECRET - server only
RESEND_FROM=Smit Parekh <noreply@smitparekh.co.in>
```

### Backend (`.env`)
```
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
DATABASE_URL=mongodb+srv://...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RESEND_API_KEY=re_...
RESEND_FROM=Smit Parekh <noreply@smitparekh.co.in>
CONTACT_NOTIFY_TO=smitparekh03@gmail.com
OPENAI_API_KEY=sk-...
OPENROUTER_API_KEY=sk-or-...
REMOVE_BG_API_KEY=...
PYTHON_API_URL=http://localhost:8000
```

---

## Git Commit Format
Always follow conventional commits:
- `feat:` new feature
- `fix:` bug fix
- `refactor:` code restructuring (no behavior change)
- `chore:` maintenance (deps, config)
- `docs:` documentation only

Always include this trailer:
```
Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```
