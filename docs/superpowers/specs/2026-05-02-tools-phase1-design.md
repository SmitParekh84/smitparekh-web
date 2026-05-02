# Tools Phase 1 — Design Spec
**Date:** 2026-05-02  
**Status:** Approved — ready for implementation  
**Scope:** ATS Resume Checker UI redesign + Free Tools listing page improvements  
**Out of scope (Phase 2):** Rate limiting, Supabase Auth, Admin dashboard — see `2026-05-02-tools-phase2-design.md`

---

## 1. ATS Resume Checker — Two-Flow Stepper

### Overview
Redesign `components/tools/ATSResumeChecker.tsx` from a single flat layout into a stepper-based flow selector with two flows. Flow 1 is live; Flow 2 is locked with a "Coming Soon" modal.

### Flow Selector
Two tabs at the top of the component:

| Tab | State | Label | Subtitle |
|-----|-------|-------|----------|
| Flow 1 | Active | Quick ATS Check | Resume only → instant score |
| Flow 2 | Locked | Job Match Check | Resume + JD → match score |

- Flow 1 tab: solid border (`border-blue-500`), blue tint background
- Flow 2 tab: dashed border, muted background, `opacity-70`, "Coming Soon" badge (top-right corner)
- Clicking Flow 1 tab does nothing (already active)
- Clicking Flow 2 tab opens the **Notify Me modal** (see below)

### Stepper — Responsive Layout

**Desktop (md+): Horizontal stepper**
```
[1 Upload] ——————— [2 Analyse] ——————— [3 Report]
```
- Step circles: 32×32px, active = `bg-blue-500 text-white`, pending = `bg-muted border border-border text-muted-foreground`
- Connector line: active segment = gradient `blue-500 → cyan-400`, pending = `bg-border`
- Step labels below each circle

**Mobile (<md): Vertical timeline stepper**
```
● Upload        ← active: blue dot
│               ← connector line
○ Analyse       ← pending: muted circle
│
○ Report
```
- Each step has an inline content area beneath its label
- Pending steps show a locked placeholder card (`opacity-40`)
- Active step shows the full input UI (dropzone, button, etc.)

### Step Content — Flow 1

**Step 1 — Upload Resume**
- Existing dropzone UI (PDF/DOCX, max 5 MB) — keep as-is
- "Next" advances to Step 2 only after file is selected

**Step 2 — Analyse**
- Existing "Check ATS Score" button logic — keep as-is
- `mutation.isPending` shows spinner with "Analysing resume…"
- On success → auto-advance to Step 3

**Step 3 — Report**
- Existing `ScoreRing`, analysis, and recommendations sections — keep as-is
- Add "Start Over" link (resets to Step 1)

### Notify Me Modal — Flow 2

Triggered when user clicks the locked Flow 2 tab.

**Content:**
- Title: "Job Match Check 🚀"
- Body: "We're building a smarter ATS check — paste any job description and we match it against your resume for a tailored score."
- Feature teaser chips: "Keyword match score · Skill gap analysis · Tailored recommendations"
- Email input + "Notify me" CTA button
- On submit: `POST /api/tools/notify` with `{ email, tool: "ats-job-match" }` — save to backend
- On success: replace form with "You're on the list 🎉" confirmation
- Dismiss: click outside or X button

**Backend required:** New endpoint `POST /api/tools/notify` → saves `{ email, tool, createdAt }` to a `tool_notifications` collection in MongoDB. No auth required.

### SEO — No changes needed
Stepper is a client component (`"use client"`), no metadata impact.

---

## 2. Free Tools Listing Page — `/free-tools`

### Category Filter Bar

Add above the tools grid in `app/(tools)/free-tools/page.tsx`.

**Categories and tool counts:**

| Category | Tools |
|----------|-------|
| All | 14 |
| Image | background-remover, image-compressor, image-converter (3) |
| Content | viral-linkedin-post-generator, word-counter, linkedin-media-downloader (3) |
| SEO | meta-tag-checker, seo-analyzer (2) |
| Career | ats-resume-checker (1) |
| Dev | qr-code-generator, json-formatter, base64-encoder-decoder, youtube-thumbnail-downloader (4) |
| Security | password-generator (1) |

**Visual style:** Underline tabs (Option C from brainstorm)
- Active tab: bold text, `text-blue-500`, 2px bottom border `border-blue-500`
- Inactive: `text-muted-foreground`, hover `text-foreground`
- Border bottom on the full row: `border-b border-border`
- Horizontally scrollable on mobile (`overflow-x-auto`, no scrollbar)
- This is a `"use client"` component — filter state is `useState<string>("all")`
- Filtering: show/hide cards client-side (no route change, no query params)

**Placement:** Between the hero and the tools grid section. Sticky on scroll (`sticky top-16 z-10 bg-background/95 backdrop-blur`).

### Badge Updates

Replace current hardcoded `popularSlugs` / `newSlugs` sets with:

| Badge | Color | Slugs |
|-------|-------|-------|
| Popular | blue-500 | background-remover, viral-linkedin-post-generator |
| Trending | amber-500 | ats-resume-checker |
| New | cyan-500 | youtube-thumbnail-downloader, json-formatter, base64-encoder-decoder |

Remove: the old `newSlugs` set containing only `ats-resume-checker` (it's now "Trending").

### Tool Card — Minor Improvements

Keep existing card layout. Add:
- Category label in small muted text above the tool name (e.g., "Career", "Image")
- Already exists via `toolCategoryMap` — just render it inside the card
- Replace `<h2>` with `<h3>` inside cards (the page `<h2>` is the section header) — fixes heading hierarchy for SEO

### Usage Counter
Deferred to Phase 2+ when user traffic is sufficient to show meaningful numbers.

### SEO Updates

**`app/(tools)/free-tools/page.tsx` metadata:**
- Update `description` to reflect 14 tools (was 11)
- Update `keywords` to add `youtube-thumbnail-downloader free`, `json-formatter-online`, `base64-encoder-decoder`
- Update `itemListSchema.numberOfItems` from hardcoded to `toolsSEO.length` (already done)
- Update hero description string: `${toolsSEO.length} browser-based tools` (already uses dynamic count — no change needed)

**Individual tool pages** (`/free-tools/[slug]`): No changes in Phase 1.

---

## 3. Backend — Notify Me Endpoint

**File:** `smitparekh-api/routes/tools.routes.js` (new file)  
**Controller:** `smitparekh-api/controllers/tools.controller.js` (new file)  
**Model:** `smitparekh-api/models/tool-notification.model.js` (new file)

```js
// Model schema
{
  email: { type: String, required: true },
  tool:  { type: String, required: true },  // e.g. "ats-job-match"
  createdAt: { type: Date, default: Date.now }
}
```

**Route:** `POST /api/tools/notify`  
- No auth required  
- Validate: email format, tool is a known slug  
- Upsert (ignore duplicate email+tool combos)  
- Response: `{ success: true }`

**Frontend API module:** Add `toolsApi.notify({ email, tool })` to `lib/api/` and a `useNotifyTool()` mutation hook to `hooks/api/use-tools.ts`.

---

## 4. Mobile Responsiveness Checklist

- [ ] ATS stepper: vertical layout on `< md`, horizontal on `md+`
- [ ] Flow selector tabs: full-width on mobile (each tab `flex-1`)
- [ ] Filter bar: `overflow-x-auto` with hidden scrollbar, `-webkit-overflow-scrolling: touch`
- [ ] Tools grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` — already correct, no change
- [ ] Notify Me modal: full-screen on mobile (`sm:max-w-md`)

---

## 5. Files to Create / Modify

| File | Action |
|------|--------|
| `components/tools/ATSResumeChecker.tsx` | Rewrite — stepper + flow selector |
| `components/tools/ATSNotifyModal.tsx` | New — "Coming Soon" modal for Flow 2 |
| `app/(tools)/free-tools/page.tsx` | Add filter bar, badge updates, h3 fix |
| `components/tools/ToolsCategoryFilter.tsx` | New — underline tabs client component |
| `lib/api/tools.ts` | New — `toolsApi.notify()` |
| `hooks/api/use-tools.ts` | Add `useNotifyTool()` |
| `smitparekh-api/models/tool-notification.model.js` | New |
| `smitparekh-api/controllers/tools.controller.js` | New |
| `smitparekh-api/routes/tools.routes.js` | New |
| `smitparekh-api/app.js` | Register new tools route |
