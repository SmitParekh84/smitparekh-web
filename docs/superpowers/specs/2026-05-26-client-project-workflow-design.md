# Client Project Workflow — Admin Drive + Client View

**Date:** 2026-05-26
**Status:** Approved (design)
**Repos:** `smitparekh-web` (frontend), `smitparekh-api` (Express + MongoDB backend)

## Problem

The backend already has a full client-project workflow (`ClientProject` model: one doc per
client, generated `steps[]`, each with `status`/dates/`note`, plus admin + client endpoints),
but **none of it is wired into the frontend**. The admin can only invite clients and change
their status; the client portal only shows a requirements summary.

The owner wants to drive each project step (pending → in_progress → done) and attach **notes
plus shareable resource links** (Google Docs/Sheets/Drive, etc.) to steps, so the client can
see progress and deliverables in their portal.

## Goals

- Admin can view a client's generated project workflow and drive each step's status/dates.
- Each step carries a free-text note **and** a structured list of resource links (`{label, url}`).
- Client sees a read-only progress timeline with notes and clickable resource links.
- Reuse the existing backend; add only a `links` field — no new endpoints.

## Non-goals

- No per-project entity beyond the existing one-`ClientProject`-per-client model.
- No file uploads (links only).
- No realtime; standard React Query fetch/invalidate.

## Data model changes (backend)

`client-project.model.js` — add to `stepSchema`:
```js
links: {
  type: [{ label: { type: String, default: '' }, url: { type: String, required: true } }],
  default: [],
}   // sub-docs use { _id: false } like the step schema
```
`project-templates.js` — `buildStepsForCategories` seeds `links: []` per step.

## Backend behavior

`client-project.controller.js`:
- `updateProjectStep` (PATCH `.../project/steps/:stepKey`): accept optional `links` in body.
  Validate: array; each item `{ label?, url }`; `url` must match `^https?://`; cap **10 links/step**;
  trim `label` ≤ 80 chars, `url` ≤ 500 chars. Reject invalid with 422.
- `regenerateClientProject`: extend the per-key merge to preserve `links` (same as `note`).
- Existing `note` cap (1000 chars) unchanged.

## Frontend — data layer

- `types/index.ts`: `ProjectLink { label?: string; url: string }`,
  `ProjectStepStatus = "pending" | "in_progress" | "done" | "skipped"`,
  `ProjectStep { key, service, serviceLabel, phase, label, status, startDate, endDate, note, links, order }`,
  `ClientProject { _id, clientId, steps: ProjectStep[], createdAt, updatedAt }`.
- `lib/api/clients.ts`: `getProject(clientId)`, `updateStep(clientId, stepKey, payload)`,
  `regenerateProject(clientId)`, `getMyProject()`.
- `lib/api/query-keys.ts`: `clients.project(clientId)`, `clients.myProject()`.
- `hooks/api/use-clients.ts`: `useAdminClientProject(clientId)`, `useUpdateProjectStep()`,
  `useRegenerateClientProject()`, `useMyProject()`. Mutations invalidate the matching project key.

## Frontend — admin UI

- New route `app/(admin)/admin/clients/[id]/page.tsx`: client header (name/email/status badge) +
  requirements summary (reuse existing labels) + `<ProjectWorkflow clientId>`.
- Existing clients table rows link to `/admin/clients/[id]`.
- `components/admin/ProjectWorkflow.tsx`: steps grouped by `service` → `phase`. Each step row:
  status select, optional start/end date inputs, notes `Textarea`, and a **links editor**
  (repeatable label + URL rows with add/remove). Per-step "Save" → `useUpdateProjectStep`.
  Header has "Regenerate from requirements" (confirm dialog) → `useRegenerateClientProject`.

## Frontend — client UI

- New nav item **"Project"** in `components/client/ClientShell.tsx` → `/client/project`.
- New route `app/(client)/client/project/page.tsx` → `<ProjectTimeline />` (uses `useMyProject`).
- `components/client/ProjectTimeline.tsx`: read-only timeline grouped by phase. Status pill per
  step; **notes + links shown only when status is `in_progress` or `done`** (pending = "Upcoming",
  no leaked drafts). Links render as clickable chips.
- Empty state when `data == null` (no requirements submitted yet): point to `/client/requirements`.

## Shared (DRY)

- `components/client-project/status.ts`: status → `{ label, className, icon }` map + a
  `LinkChips` component for rendering `ProjectLink[]`. Imported by both admin and client views.

## Auth

No new auth work. Admin endpoints go through the existing axios bearer-token `api` client
(same as `getRequirements`); client self endpoints follow `getMyRequirements`' path
(`isClientAuth` on the backend).

## Testing / verification

- `tsc --noEmit` after each change (per project convention).
- Manual: admin sets a step in_progress, adds a Google Doc link + note, saves; client `/project`
  shows the step with the clickable link; pending steps hide notes/links.
- Backend: invalid URL → 422; >10 links rejected; regenerate preserves note + links by key.

## File footprint

- Backend (3 edits): model, templates, controller.
- Frontend (new): `admin/clients/[id]/page.tsx`, `client/project/page.tsx`,
  `ProjectWorkflow.tsx`, `ProjectTimeline.tsx`, `client-project/status.ts`.
- Frontend (edits): `types/index.ts`, `lib/api/clients.ts`, `query-keys.ts`,
  `use-clients.ts`, `clients/page.tsx` (row links), `ClientShell.tsx` (nav item).
