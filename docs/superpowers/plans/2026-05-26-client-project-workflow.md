# Client Project Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the existing backend client-project workflow into the frontend so the admin can drive each step's status/dates and attach notes + shareable resource links, and the client sees a read-only progress timeline with clickable links.

**Architecture:** Reuse the existing `ClientProject` MongoDB model and its 4 routes. Add a `links` array to each step (backend), expose the 4 endpoints through the axios `api` layer + React Query hooks, build an admin client-detail page with a per-step editor, and a client-facing read-only timeline. Shared status/link rendering lives in one module used by both sides.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, shadcn/`base-nova`, TanStack Query, Express + Mongoose (backend).

**Conventions (project-specific — do not deviate):**
- pnpm only. No test runner exists → verify with `pnpm exec tsc --noEmit` and manual checks. Do NOT add a test framework.
- Never `git commit`/`git push`. "Commit" steps mean `git add` the listed files; the user runs the commit with the suggested message.
- shadcn `base-nova` has **no `asChild`** — use `buttonVariants()` on `<Link>`. Use `AppSelect` / shadcn primitives, never native `<select>`/`<textarea>`.
- Two repos: backend = `../smitparekh-api` (sibling of `smitparekh-web`), frontend = `smitparekh-web`.

---

## File Structure

**Backend (`smitparekh-api`):**
- Modify `models/client-project.model.js` — add `links` to `stepSchema`.
- Modify `config/project-templates.js` — seed `links: []`.
- Modify `controllers/client-project.controller.js` — accept/validate `links`; preserve on regenerate.

**Frontend (`smitparekh-web`):**
- Modify `types/index.ts` — project workflow types.
- Modify `lib/api/clients.ts` — 4 endpoint methods.
- Modify `lib/api/query-keys.ts` — project keys.
- Modify `hooks/api/use-clients.ts` — 4 hooks.
- Create `components/client-project/status.tsx` — shared status config + `LinkChips`.
- Create `components/admin/ProjectWorkflow.tsx` — admin per-step editor.
- Create `app/(admin)/admin/clients/[id]/page.tsx` — admin client detail page.
- Modify `app/(admin)/admin/clients/page.tsx` — rows link to detail.
- Create `components/client/ProjectTimeline.tsx` — client read-only timeline.
- Create `app/(client)/client/project/page.tsx` — client project page.
- Modify `components/client/ClientShell.tsx` — add "Project" nav item.

---

## Task 1: Backend — add `links` to the step schema

**Files:**
- Modify: `../smitparekh-api/models/client-project.model.js`
- Modify: `../smitparekh-api/config/project-templates.js`

- [ ] **Step 1: Add `links` to `stepSchema`**

In `models/client-project.model.js`, change the `stepSchema` definition (currently ends with `order`) to include a `links` array. Replace the `note`/`order` tail:

```js
    note: { type: String, default: '' },
    links: {
      type: [
        new mongoose.Schema(
          {
            label: { type: String, default: '' },
            url: { type: String, required: true },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
    order: { type: Number, default: 0 },
```

- [ ] **Step 2: Seed `links: []` in the template builder**

In `config/project-templates.js`, inside `buildStepsForCategories`, the `steps.push({ ... })` object has `note: '',`. Add `links: []` right after it:

```js
          note: '',
          links: [],
          order: order++,
```

- [ ] **Step 3: Verify the backend still loads**

Run (from `../smitparekh-api`): `node --check models/client-project.model.js && node --check config/project-templates.js`
Expected: no output, exit 0 (syntax OK).

- [ ] **Step 4: Commit (stage only)**

```bash
git -C ../smitparekh-api add models/client-project.model.js config/project-templates.js
```
Suggested message: `feat(client-project): add per-step resource links field`

---

## Task 2: Backend — accept/validate `links` and preserve on regenerate

**Files:**
- Modify: `../smitparekh-api/controllers/client-project.controller.js`

- [ ] **Step 1: Add a links sanitizer helper**

At the top of `controllers/client-project.controller.js`, after the `STEP_STATUSES` const, add:

```js
const MAX_LINKS = 10;

function sanitizeLinks(input) {
  if (!Array.isArray(input)) return { error: 'links must be an array' };
  if (input.length > MAX_LINKS) return { error: `links cannot exceed ${MAX_LINKS} items` };
  const cleaned = [];
  for (const item of input) {
    const url = typeof item?.url === 'string' ? item.url.trim().slice(0, 500) : '';
    if (!/^https?:\/\//i.test(url)) return { error: 'each link url must start with http:// or https://' };
    const label = typeof item?.label === 'string' ? item.label.trim().slice(0, 80) : '';
    cleaned.push({ label, url });
  }
  return { value: cleaned };
}
```

- [ ] **Step 2: Handle `links` in `updateProjectStep`**

In `updateProjectStep`, the body destructure is `const { status, startDate, endDate, note } = req.body || {};`. Change it to include `links`:

```js
    const { status, startDate, endDate, note, links } = req.body || {};
```

Then, after the existing `if (note !== undefined) step.note = String(note).slice(0, 1000);` line, add:

```js
    if (links !== undefined) {
      const result = sanitizeLinks(links);
      if (result.error) return res.status(422).json({ success: false, message: result.error });
      step.links = result.value;
    }
```

- [ ] **Step 3: Preserve `links` on regenerate**

In `regenerateClientProject`, the merge maps old progress: `return { ...s, status: old.status, startDate: old.startDate, endDate: old.endDate, note: old.note };`. Add `links`:

```js
      return { ...s, status: old.status, startDate: old.startDate, endDate: old.endDate, note: old.note, links: old.links || [] };
```

- [ ] **Step 4: Verify syntax**

Run (from `../smitparekh-api`): `node --check controllers/client-project.controller.js`
Expected: exit 0.

- [ ] **Step 5: Manual smoke test (if backend is running)**

With the backend running and an admin token, PATCH a step with an invalid link and confirm 422:
```bash
curl -s -X PATCH "$API/clients/$CLIENT_ID/project/steps/web-design" \
  -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" \
  -d '{"links":[{"label":"x","url":"ftp://nope"}]}'
```
Expected: `{"success":false,"message":"each link url must start with http:// or https://"}`. Then repeat with `"url":"https://docs.google.com/..."` → expect `success:true` and the step echoes `links`.

- [ ] **Step 6: Commit (stage only)**

```bash
git -C ../smitparekh-api add controllers/client-project.controller.js
```
Suggested message: `feat(client-project): validate step links, preserve on regenerate`

---

## Task 3: Frontend — workflow types

**Files:**
- Modify: `smitparekh-web/types/index.ts` (after the `ClientRequirements` interface, ~line 313)

- [ ] **Step 1: Append the project workflow types**

At the end of the Client section in `types/index.ts`, add:

```ts
/* ─── Client Project Workflow ──────────────────────────────────────────── */

export type ProjectStepStatus = "pending" | "in_progress" | "done" | "skipped";

export interface ProjectLink {
  label?: string;
  url: string;
}

export interface ProjectStep {
  key: string;
  service?: string;
  serviceLabel?: string;
  phase?: string;
  label: string;
  status: ProjectStepStatus;
  startDate?: string | null;
  endDate?: string | null;
  note?: string;
  links?: ProjectLink[];
  order: number;
}

export interface ClientProject {
  _id: string;
  clientId: string;
  steps: ProjectStep[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProjectStepPayload {
  status?: ProjectStepStatus;
  startDate?: string | null;
  endDate?: string | null;
  note?: string;
  links?: ProjectLink[];
}
```

- [ ] **Step 2: Verify**

Run (from `smitparekh-web`): `pnpm exec tsc --noEmit`
Expected: no NEW errors referencing `types/index.ts` (pre-existing `.next/types/validator.ts` errors about `app/api/user/me/...` routes are unrelated and may remain).

- [ ] **Step 3: Commit (stage only)**

```bash
git add types/index.ts
```
Suggested message: `feat(types): add client project workflow types`

---

## Task 4: Frontend — API methods + query keys

**Files:**
- Modify: `smitparekh-web/lib/api/clients.ts`
- Modify: `smitparekh-web/lib/api/query-keys.ts`

- [ ] **Step 1: Add project methods to `clientsApi`**

In `lib/api/clients.ts`, update the import line and add 4 methods. Change the import:

```ts
import type {
  Client,
  ClientInvitation,
  ClientRequirements,
  ClientProject,
  UpdateProjectStepPayload,
} from "@/types";
```

Add inside the `/* Admin */` group (after `getRequirements`):

```ts
  getProject: (clientId: string) =>
    api.get<{ success: boolean; data: ClientProject }>(`/clients/${clientId}/project`),

  updateStep: (clientId: string, stepKey: string, payload: UpdateProjectStepPayload) =>
    api.patch<{ success: boolean; data: ClientProject }>(
      `/clients/${clientId}/project/steps/${stepKey}`,
      payload
    ),

  regenerateProject: (clientId: string) =>
    api.post<{ success: boolean; data: ClientProject }>(`/clients/${clientId}/project/regenerate`, {}),
```

Add inside the `/* Client (self) */` group (after `getMyRequirements`):

```ts
  getMyProject: () =>
    api.get<{ success: boolean; data: ClientProject | null }>("/clients/project/me"),
```

- [ ] **Step 2: Add project query keys**

In `lib/api/query-keys.ts`, inside the `clients` block (after `myRequirements`), add:

```ts
    project: (clientId: string) => [...queryKeys.clients.all, "project", clientId] as const,
    myProject: () => [...queryKeys.clients.all, "my-project"] as const,
```

- [ ] **Step 3: Verify**

Run: `pnpm exec tsc --noEmit`
Expected: no new errors in `lib/api/clients.ts` or `query-keys.ts`.

- [ ] **Step 4: Commit (stage only)**

```bash
git add lib/api/clients.ts lib/api/query-keys.ts
```
Suggested message: `feat(api): client project endpoints + query keys`

---

## Task 5: Frontend — React Query hooks

**Files:**
- Modify: `smitparekh-web/hooks/api/use-clients.ts`

- [ ] **Step 1: Add hooks**

Update the type import at the top:

```ts
import type { ClientRequirements, UpdateProjectStepPayload } from "@/types";
```

In the `/* ─── Admin hooks ─── */` section, after `useAdminClientRequirements`, add:

```ts
export function useAdminClientProject(clientId: string) {
  return useQuery({
    queryKey: queryKeys.clients.project(clientId),
    queryFn: () => clientsApi.getProject(clientId),
    enabled: !!clientId,
  });
}

export function useUpdateProjectStep(clientId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ stepKey, payload }: { stepKey: string; payload: UpdateProjectStepPayload }) =>
      clientsApi.updateStep(clientId, stepKey, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.clients.project(clientId) }),
  });
}

export function useRegenerateClientProject(clientId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => clientsApi.regenerateProject(clientId),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.clients.project(clientId) }),
  });
}
```

In the `/* ─── Client (self) hooks ─── */` section, after `useMyRequirements`, add:

```ts
export function useMyProject() {
  return useQuery({
    queryKey: queryKeys.clients.myProject(),
    queryFn: () => clientsApi.getMyProject(),
  });
}
```

- [ ] **Step 2: Verify**

Run: `pnpm exec tsc --noEmit`
Expected: no new errors.

- [ ] **Step 3: Commit (stage only)**

```bash
git add hooks/api/use-clients.ts
```
Suggested message: `feat(hooks): client project workflow hooks`

---

## Task 6: Shared — status config + `LinkChips`

**Files:**
- Create: `smitparekh-web/components/client-project/status.tsx`

- [ ] **Step 1: Create the shared module**

```tsx
import { CircleDashed, Loader2, CheckCircle2, MinusCircle, ExternalLink } from "lucide-react";
import type { ProjectStepStatus, ProjectLink } from "@/types";
import { cn } from "@/lib/utils";

export const STEP_STATUS_CONFIG: Record<
  ProjectStepStatus,
  { label: string; badgeClassName: string; icon: React.ElementType; iconClassName: string }
> = {
  pending: {
    label: "Pending",
    badgeClassName: "border-muted bg-muted/50 text-muted-foreground",
    icon: CircleDashed,
    iconClassName: "text-muted-foreground",
  },
  in_progress: {
    label: "In progress",
    badgeClassName: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    icon: Loader2,
    iconClassName: "text-blue-500",
  },
  done: {
    label: "Done",
    badgeClassName: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
    icon: CheckCircle2,
    iconClassName: "text-green-500",
  },
  skipped: {
    label: "Skipped",
    badgeClassName: "border-muted bg-muted/40 text-muted-foreground line-through",
    icon: MinusCircle,
    iconClassName: "text-muted-foreground",
  },
};

export const STEP_STATUS_ORDER: ProjectStepStatus[] = ["pending", "in_progress", "done", "skipped"];

/** Renders resource links as clickable chips. Returns null when empty. */
export function LinkChips({ links, className }: { links?: ProjectLink[]; className?: string }) {
  if (!links || links.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link, i) => (
        <a
          key={`${link.url}-${i}`}
          href={link.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <ExternalLink className="h-3 w-3 shrink-0" />
          <span className="max-w-[14rem] truncate">{link.label || link.url}</span>
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm exec tsc --noEmit`
Expected: no new errors.

- [ ] **Step 3: Commit (stage only)**

```bash
git add components/client-project/status.tsx
```
Suggested message: `feat(client-project): shared step status config + LinkChips`

---

## Task 7: Admin — `ProjectWorkflow` editor component

**Files:**
- Create: `smitparekh-web/components/admin/ProjectWorkflow.tsx`

Confirm available primitives first: this uses `Card`, `Button`, `Textarea`, `Input`, `Label`, `AppSelect`, `Badge`, `Spinner`, the toast helper, and the shared status module — all already in the codebase.

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useState, useEffect, Fragment } from "react";
import { Plus, Trash2, RotateCcw, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AppSelect } from "@/components/ui/app-select";
import { Spinner } from "@/components/ui/spinner";
import {
  useAdminClientProject,
  useUpdateProjectStep,
  useRegenerateClientProject,
} from "@/hooks/api/use-clients";
import { STEP_STATUS_CONFIG, STEP_STATUS_ORDER } from "@/components/client-project/status";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import type { ProjectStep, ProjectLink, ProjectStepStatus } from "@/types";

const STATUS_OPTIONS = STEP_STATUS_ORDER.map((s) => ({
  value: s,
  label: STEP_STATUS_CONFIG[s].label,
}));

function dateInputValue(iso?: string | null) {
  if (!iso) return "";
  return new Date(iso).toISOString().slice(0, 10);
}

function StepEditor({ clientId, step }: { clientId: string; step: ProjectStep }) {
  const updateStep = useUpdateProjectStep(clientId);

  const [status, setStatus] = useState<ProjectStepStatus>(step.status);
  const [startDate, setStartDate] = useState(dateInputValue(step.startDate));
  const [endDate, setEndDate] = useState(dateInputValue(step.endDate));
  const [note, setNote] = useState(step.note ?? "");
  const [links, setLinks] = useState<ProjectLink[]>(step.links ?? []);

  // Re-sync local state if the server copy changes (e.g. after regenerate).
  useEffect(() => {
    setStatus(step.status);
    setStartDate(dateInputValue(step.startDate));
    setEndDate(dateInputValue(step.endDate));
    setNote(step.note ?? "");
    setLinks(step.links ?? []);
  }, [step]);

  function setLink(i: number, patch: Partial<ProjectLink>) {
    setLinks((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }
  function addLink() {
    setLinks((prev) => [...prev, { label: "", url: "" }]);
  }
  function removeLink(i: number) {
    setLinks((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    // Drop empty link rows; keep only rows with a url.
    const cleanedLinks = links
      .map((l) => ({ label: (l.label ?? "").trim(), url: l.url.trim() }))
      .filter((l) => l.url.length > 0);
    const badUrl = cleanedLinks.find((l) => !/^https?:\/\//i.test(l.url));
    if (badUrl) {
      toast.error("Invalid link", "Each link URL must start with http:// or https://");
      return;
    }
    try {
      await updateStep.mutateAsync({
        stepKey: step.key,
        payload: {
          status,
          startDate: startDate || null,
          endDate: endDate || null,
          note,
          links: cleanedLinks,
        },
      });
      toast.success("Saved", `“${step.label}” updated.`);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Could not save step.";
      toast.error("Save failed", msg);
    }
  }

  const cfg = STEP_STATUS_CONFIG[status];

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <cfg.icon className={`h-4 w-4 ${cfg.iconClassName}`} />
          <span className="text-sm font-medium">{step.label}</span>
        </div>
        <AppSelect
          value={status}
          onValueChange={(v) => setStatus(v as ProjectStepStatus)}
          options={STATUS_OPTIONS}
          triggerClassName="w-36"
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs">Start date</Label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-9" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">End date</Label>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-9" />
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <Label className="text-xs">Note (visible to client when in progress / done)</Label>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={1000}
          rows={2}
          placeholder="What's the update? e.g. Design draft ready for review."
        />
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Resource links</Label>
          <Button type="button" variant="ghost" size="sm" onClick={addLink} className="h-7 gap-1 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add link
          </Button>
        </div>
        {links.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Add Google Doc / Sheet / Drive links the client can open.
          </p>
        )}
        {links.map((link, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              value={link.label ?? ""}
              onChange={(e) => setLink(i, { label: e.target.value })}
              placeholder="Label (e.g. Design file)"
              maxLength={80}
              className="h-9 w-40 shrink-0"
            />
            <Input
              value={link.url}
              onChange={(e) => setLink(i, { url: e.target.value })}
              placeholder="https://docs.google.com/…"
              maxLength={500}
              className="h-9 flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeLink(i)}
              className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-end">
        <Button size="sm" onClick={handleSave} disabled={updateStep.isPending}>
          {updateStep.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export function ProjectWorkflow({ clientId }: { clientId: string }) {
  const projectQuery = useAdminClientProject(clientId);
  const regenerate = useRegenerateClientProject(clientId);
  const [confirmRegen, setConfirmRegen] = useState(false);

  const steps = projectQuery.data?.data?.steps ?? [];
  const ordered = [...steps].sort((a, b) => a.order - b.order);

  async function handleRegenerate() {
    if (!confirmRegen) {
      setConfirmRegen(true);
      setTimeout(() => setConfirmRegen(false), 4000);
      return;
    }
    setConfirmRegen(false);
    try {
      await regenerate.mutateAsync();
      toast.success("Workflow regenerated", "Steps rebuilt from current requirements.");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Could not regenerate.";
      toast.error("Failed", msg);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base">Project workflow</CardTitle>
          <CardDescription>Drive each step and share notes &amp; resource links.</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRegenerate}
          disabled={regenerate.isPending}
          className="gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {confirmRegen ? "Click again to confirm" : "Regenerate"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {projectQuery.isLoading && (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        )}
        {projectQuery.isError && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Could not load the project. Is the backend running?
          </p>
        )}
        {!projectQuery.isLoading && !projectQuery.isError && ordered.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No workflow yet — it generates once the client submits requirements. Try “Regenerate”.
          </p>
        )}
        {ordered.map((step, i) => {
          const prev = ordered[i - 1];
          const showPhaseHeader = !prev || prev.serviceLabel !== step.serviceLabel || prev.phase !== step.phase;
          return (
            <Fragment key={step.key}>
              {showPhaseHeader && (
                <div className="flex items-center gap-2 pt-2">
                  {step.serviceLabel && <Badge variant="secondary">{step.serviceLabel}</Badge>}
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {step.phase}
                  </span>
                </div>
              )}
              <StepEditor clientId={clientId} step={step} />
            </Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Confirm `Textarea` exists**

Run: `pnpm exec tsc --noEmit`
Expected: no new errors. If `@/components/ui/textarea` is missing, add a shadcn `Textarea` (it is referenced in CLAUDE.md's UI standards, so it should exist) before continuing.

- [ ] **Step 3: Commit (stage only)**

```bash
git add components/admin/ProjectWorkflow.tsx
```
Suggested message: `feat(admin): project workflow step editor`

---

## Task 8: Admin — client detail page + clickable table rows

**Files:**
- Create: `smitparekh-web/app/(admin)/admin/clients/[id]/page.tsx`
- Modify: `smitparekh-web/app/(admin)/admin/clients/page.tsx`

- [ ] **Step 1: Create the client detail page**

```tsx
"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAdminClient, useAdminClientRequirements } from "@/hooks/api/use-clients";
import { ProjectWorkflow } from "@/components/admin/ProjectWorkflow";
import { cn } from "@/lib/utils";

const SERVICE_LABELS: Record<string, string> = {
  website: "Website Development",
  seo: "SEO",
  "ai-automation": "AI & Automation",
  "custom-software": "Custom Software",
};

export default function AdminClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const clientQuery = useAdminClient(id);
  const reqQuery = useAdminClientRequirements(id);

  const client = clientQuery.data?.data;
  const requirements = reqQuery.data?.data;

  return (
    <div className="space-y-6">
      <Link
        href="/admin/clients"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5 -ml-2 w-fit")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to clients
      </Link>

      {clientQuery.isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !client ? (
        <p className="py-16 text-center text-sm text-muted-foreground">Client not found.</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-[22px] font-semibold tracking-tight">
                {client.name || client.email}
              </h1>
              <p className="text-[13px] text-muted-foreground">{client.email}</p>
            </div>
            <Badge variant="outline" className="capitalize">{client.status}</Badge>
          </div>

          {requirements && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex flex-wrap gap-2">
                  {requirements.categories.map((c) => (
                    <Badge key={c} variant="secondary">{SERVICE_LABELS[c] ?? c}</Badge>
                  ))}
                </div>
                {requirements.additionalNotes && (
                  <p className="text-muted-foreground">{requirements.additionalNotes}</p>
                )}
              </CardContent>
            </Card>
          )}

          <ProjectWorkflow clientId={id} />
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Make table rows link to the detail page**

In `app/(admin)/admin/clients/page.tsx`, import `useRouter` from `next/navigation` at the top:

```ts
import { useRouter } from "next/navigation";
```

Inside `AdminClientsPage`, add near the other hooks:

```ts
  const router = useRouter();
```

Change the table row opening tag from:

```tsx
                  <TableRow key={client._id}>
```
to (make it clickable but keep the actions dropdown from triggering navigation):

```tsx
                  <TableRow
                    key={client._id}
                    onClick={() => router.push(`/admin/clients/${client._id}`)}
                    className="cursor-pointer"
                  >
```

In the Actions `TableCell`, stop row navigation when interacting with the menu. Change the wrapping div:

```tsx
                      <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
```

- [ ] **Step 3: Verify**

Run: `pnpm exec tsc --noEmit`
Expected: no new errors. Note: `params` is a Promise in Next 16 — the page uses `use(params)` (per AGENTS.md rule).

- [ ] **Step 4: Manual check**

Run `pnpm dev`, open `/admin/clients`, click a client row → lands on `/admin/clients/<id>` showing requirements + the workflow. Set a step to "In progress", add a note + a `https://` link, Save → toast "Saved".

- [ ] **Step 5: Commit (stage only)**

```bash
git add "app/(admin)/admin/clients/[id]/page.tsx" "app/(admin)/admin/clients/page.tsx"
```
Suggested message: `feat(admin): client detail page with project workflow`

---

## Task 9: Client — `ProjectTimeline` read-only view

**Files:**
- Create: `smitparekh-web/components/client/ProjectTimeline.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { Fragment } from "react";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useMyProject } from "@/hooks/api/use-clients";
import { STEP_STATUS_CONFIG, LinkChips } from "@/components/client-project/status";
import { formatDate } from "@/lib/date";

export function ProjectTimeline() {
  const { data, isLoading } = useMyProject();
  const project = data?.data ?? null;
  const steps = [...(project?.steps ?? [])].sort((a, b) => a.order - b.order);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (!project || steps.length === 0) {
    return (
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-cyan-400/5">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
            <ClipboardList className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-sm font-medium">Your project hasn&apos;t started yet</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            Once you submit your requirements, we&apos;ll set up your project workflow and you&apos;ll
            see live progress and shared resources here.
          </p>
          <Link
            href="/client/requirements"
            className={buttonVariants({ size: "sm", className: "mt-1" })}
          >
            Submit requirements
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Project progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {steps.map((step, i) => {
          const prev = steps[i - 1];
          const showPhaseHeader = !prev || prev.serviceLabel !== step.serviceLabel || prev.phase !== step.phase;
          const cfg = STEP_STATUS_CONFIG[step.status];
          // Hide notes/links for not-yet-started steps so drafts aren't leaked early.
          const reveal = step.status === "in_progress" || step.status === "done";
          return (
            <Fragment key={step.key}>
              {showPhaseHeader && (
                <div className="flex items-center gap-2 pb-1 pt-4 first:pt-0">
                  {step.serviceLabel && <Badge variant="secondary">{step.serviceLabel}</Badge>}
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {step.phase}
                  </span>
                </div>
              )}
              <div className="flex gap-3 py-2">
                <cfg.icon className={`mt-0.5 h-4 w-4 shrink-0 ${cfg.iconClassName}`} />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">{step.label}</span>
                    <Badge variant="outline" className={`text-[11px] font-medium ${cfg.badgeClassName}`}>
                      {cfg.label}
                    </Badge>
                    {step.endDate && step.status === "done" && (
                      <span className="text-xs text-muted-foreground">{formatDate(step.endDate)}</span>
                    )}
                  </div>
                  {reveal && step.note && (
                    <p className="text-sm text-muted-foreground">{step.note}</p>
                  )}
                  {reveal && <LinkChips links={step.links} />}
                </div>
              </div>
            </Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Confirm `formatDate` signature**

Open `lib/date.ts` and confirm `formatDate(iso: string)` exists and accepts an ISO string (it's used in `client/dashboard` patterns and blog pages). If its name/signature differs, adjust the import/call accordingly.

- [ ] **Step 3: Verify**

Run: `pnpm exec tsc --noEmit`
Expected: no new errors.

- [ ] **Step 4: Commit (stage only)**

```bash
git add components/client/ProjectTimeline.tsx
```
Suggested message: `feat(client): read-only project timeline`

---

## Task 10: Client — project page + nav item

**Files:**
- Create: `smitparekh-web/app/(client)/client/project/page.tsx`
- Modify: `smitparekh-web/components/client/ClientShell.tsx`

- [ ] **Step 1: Create the client project page**

```tsx
"use client";

import { ProjectTimeline } from "@/components/client/ProjectTimeline";

export default function ClientProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Project</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track progress and open the resources we&apos;ve shared with you.
        </p>
      </div>
      <ProjectTimeline />
    </div>
  );
}
```

- [ ] **Step 2: Add the "Project" nav item to `ClientShell`**

In `components/client/ClientShell.tsx`, update the icon import to include a workflow icon:

```ts
import { LayoutDashboard, FileText, FolderKanban, LogOut } from "lucide-react";
```

Change the `NAV` array to add Project between Dashboard and Requirements:

```ts
const NAV = [
  { title: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard },
  { title: "Project", href: "/client/project", icon: FolderKanban },
  { title: "Requirements", href: "/client/requirements", icon: FileText },
];
```

- [ ] **Step 3: Verify**

Run: `pnpm exec tsc --noEmit`
Expected: no new errors. Confirm `FolderKanban` is exported by `lucide-react@1.x`; if not, fall back to `Workflow` or `ListChecks`.

- [ ] **Step 4: Manual check**

In `pnpm dev`, sign in as a client → the top nav shows "Project" → `/client/project` renders the timeline. Steps the admin set to in_progress/done show notes + clickable links; pending steps show status only.

- [ ] **Step 5: Commit (stage only)**

```bash
git add "app/(client)/client/project/page.tsx" components/client/ClientShell.tsx
```
Suggested message: `feat(client): project page + nav item`

---

## Task 11: Final verification

- [ ] **Step 1: Type-check the whole frontend**

Run: `pnpm exec tsc --noEmit`
Expected: only the pre-existing `.next/types/validator.ts` errors about `app/api/user/me/activity` and `.../usage/trend` routes — nothing referencing any file created/modified in this plan.

- [ ] **Step 2: Lint**

Run: `pnpm lint`
Expected: no new errors in the touched files.

- [ ] **Step 3: End-to-end manual pass**

With both repos running: admin opens a client → sets "Design & wireframes" to In progress → adds note "Draft ready" + a Google Doc link → Save. Client opens `/client/project` → sees that step In progress with the note and a clickable "Design file" chip; pending steps reveal nothing. Admin marks it Done → client sees the Done pill + end date.

- [ ] **Step 4: Report staged files + suggested commit messages**

List every staged file across both repos and the suggested commit message per task, so the user can review and commit.

---

## Notes for the implementer

- **Auth:** no new work — admin calls reuse the bearer-token axios `api`; client self-calls reuse the same path as `getMyRequirements`. If `/clients/project/me` 401s for a logged-in client, the bug is in the existing token wiring, not this feature.
- **`use(params)`:** Next 16 makes `params` a Promise — the admin detail page unwraps it with React's `use()`. Do not `await` in a client component.
- **No `asChild`:** all link-buttons use `buttonVariants()` on `<Link>` (base-nova has no `asChild`).
- **Reveal rule:** the client hides notes/links unless a step is `in_progress` or `done` — keep this in `ProjectTimeline` only; the admin always sees everything.
