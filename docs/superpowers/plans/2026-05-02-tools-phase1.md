# Tools Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign ATS Resume Checker into a two-flow responsive stepper, add a category filter bar to the Free Tools listing page, and wire a Notify Me backend endpoint for the locked Flow 2.

**Architecture:** Backend gets a new `tool-notifications` MongoDB collection with a `POST /api/tools/notify` endpoint (ESM, follows existing patterns). Frontend adds a `ToolsCategoryFilter` client component (underline tabs + filtered grid) to the Free Tools page, and rewrites `ATSResumeChecker` into a responsive stepper (horizontal md+, vertical mobile) with a flow selector and `ATSNotifyModal`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, Framer Motion v12, TanStack Query v5, Mongoose, Express ESM

---

## File Map

| File | Action |
|------|--------|
| `smitparekh-api/models/tool-notification.model.js` | **Create** — Mongoose schema for notify signups |
| `smitparekh-api/controllers/tools.controller.js` | **Create** — `notifyTool` handler |
| `smitparekh-api/routes/tools.routes.js` | **Create** — `POST /tools/notify` route |
| `smitparekh-api/app.js` | **Modify** — register tools route |
| `smitparekh-web/lib/api/tools.ts` | **Create** — `toolsApi.notify()` |
| `smitparekh-web/lib/api/index.ts` | **Modify** — export toolsApi |
| `smitparekh-web/hooks/api/use-tools.ts` | **Modify** — add `useNotifyTool()` |
| `smitparekh-web/components/tools/ATSNotifyModal.tsx` | **Create** — "Coming Soon" modal with email opt-in |
| `smitparekh-web/components/tools/ATSResumeChecker.tsx` | **Rewrite** — two-flow stepper |
| `smitparekh-web/components/tools/ToolsCategoryFilter.tsx` | **Create** — underline tabs + filtered grid |
| `smitparekh-web/app/(tools)/free-tools/page.tsx` | **Modify** — use ToolsCategoryFilter, update metadata |

---

## Task 1: Backend — tool-notification model

**Files:**
- Create: `smitparekh-api/models/tool-notification.model.js`

- [ ] **Step 1: Create the Mongoose model**

```js
// smitparekh-api/models/tool-notification.model.js
import mongoose from 'mongoose';

const toolNotificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
    },
    tool: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

toolNotificationSchema.index({ email: 1, tool: 1 }, { unique: true });

export default mongoose.model('ToolNotification', toolNotificationSchema);
```

- [ ] **Step 2: Commit**

```bash
git add smitparekh-api/models/tool-notification.model.js
git commit -m "feat: add ToolNotification model for coming-soon signups"
```

---

## Task 2: Backend — tools controller and route

**Files:**
- Create: `smitparekh-api/controllers/tools.controller.js`
- Create: `smitparekh-api/routes/tools.routes.js`
- Modify: `smitparekh-api/app.js`

- [ ] **Step 1: Create the controller**

```js
// smitparekh-api/controllers/tools.controller.js
import ToolNotification from '../models/tool-notification.model.js';

const KNOWN_TOOLS = [
  'ats-job-match',
  'background-remover',
  'viral-linkedin-post-generator',
  'linkedin-media-downloader',
  'seo-analyzer',
  'meta-tag-checker',
];

export const notifyTool = async (req, res) => {
  const { email, tool } = req.body ?? {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(422).json({ success: false, message: 'Invalid email address' });
  }
  if (!tool || !KNOWN_TOOLS.includes(tool)) {
    return res.status(422).json({ success: false, message: 'Unknown tool' });
  }

  try {
    await ToolNotification.findOneAndUpdate(
      { email, tool },
      { email, tool },
      { upsert: true }
    );
    return res.json({ success: true });
  } catch (err) {
    if (err?.code === 11000) return res.json({ success: true });
    console.error('[ToolNotify] Error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
```

- [ ] **Step 2: Create the route**

```js
// smitparekh-api/routes/tools.routes.js
import express from 'express';
import { notifyTool } from '../controllers/tools.controller.js';

const router = express.Router();

router.post('/tools/notify', notifyTool);

export default router;
```

- [ ] **Step 3: Register the route in app.js**

In `smitparekh-api/app.js`, add the import after line 19 (after `socialRoutes`):

```js
import toolsRoutes from './routes/tools.routes.js';
```

And add the route registration after line 70 (after `app.use('/api', socialRoutes)`):

```js
app.use('/api', toolsRoutes);
```

- [ ] **Step 4: Manual smoke test**

Start the API server (`node index.js`) and run:
```bash
curl -X POST http://localhost:5000/api/tools/notify \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","tool":"ats-job-match"}'
```
Expected: `{"success":true}`

Run again with same data — expected: `{"success":true}` (upsert, no error on duplicate).

Run with bad email: `{"email":"bad","tool":"ats-job-match"}` — expected: `422 {"success":false,"message":"Invalid email address"}`

- [ ] **Step 5: Commit**

```bash
git add smitparekh-api/controllers/tools.controller.js smitparekh-api/routes/tools.routes.js smitparekh-api/app.js
git commit -m "feat: add POST /api/tools/notify endpoint for coming-soon signups"
```

---

## Task 3: Frontend API layer

**Files:**
- Create: `smitparekh-web/lib/api/tools.ts`
- Modify: `smitparekh-web/lib/api/index.ts`
- Modify: `smitparekh-web/hooks/api/use-tools.ts`

- [ ] **Step 1: Create lib/api/tools.ts**

```ts
// smitparekh-web/lib/api/tools.ts
import { api } from "./client";

export interface NotifyToolPayload {
  email: string;
  tool: string;
}

export const toolsApi = {
  notify: (payload: NotifyToolPayload) =>
    api.post<{ success: boolean }>("/tools/notify", payload),
};
```

- [ ] **Step 2: Export from index.ts**

Add at the end of `smitparekh-web/lib/api/index.ts`:

```ts
export { toolsApi, type NotifyToolPayload } from "./tools";
```

- [ ] **Step 3: Add useNotifyTool hook**

In `smitparekh-web/hooks/api/use-tools.ts`, replace the existing import from `@/lib/api` with the expanded version that includes `toolsApi` and `NotifyToolPayload`:

```ts
import {
  qrCodeApi,
  mediaApi,
  resumeApi,
  generatePostApi,
  removeBgApi,
  toolsApi,
  type QrCodePayload,
  type LinkedInMediaPayload,
  type GeneratePostPayload,
  type CompressOptions,
  type NotifyToolPayload,
} from "@/lib/api";
```

Then add at the end of the file:

```ts
export function useNotifyTool() {
  return useMutation({
    mutationFn: (payload: NotifyToolPayload) => toolsApi.notify(payload),
  });
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd smitparekh-web && pnpm build 2>&1 | grep -E "error|Error" | head -20
```
Expected: no type errors related to the new files.

- [ ] **Step 5: Commit**

```bash
git add smitparekh-web/lib/api/tools.ts smitparekh-web/lib/api/index.ts smitparekh-web/hooks/api/use-tools.ts
git commit -m "feat: add toolsApi.notify and useNotifyTool hook"
```

---

## Task 4: ATSNotifyModal component

**Files:**
- Create: `smitparekh-web/components/tools/ATSNotifyModal.tsx`

- [ ] **Step 1: Create the modal component**

```tsx
// smitparekh-web/components/tools/ATSNotifyModal.tsx
"use client";

import { useState } from "react";
import { X, Sparkles, CheckCircle2 } from "lucide-react";
import { useNotifyTool } from "@/hooks/api/use-tools";
import { toast } from "@/lib/toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ATSNotifyModal({ open, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const mutation = useNotifyTool();

  if (!open) return null;

  function submit() {
    if (!email.trim()) return;
    mutation.mutate(
      { email: email.trim(), tool: "ats-job-match" },
      {
        onSuccess: () => setSubmitted(true),
        onError: () => toast.error("Failed", "Please try again."),
      }
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full sm:max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-blue-500" />
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <p className="font-semibold">You're on the list 🎉</p>
            <p className="text-sm text-muted-foreground mt-1">
              We'll email you when Job Match Check launches.
            </p>
            <button
              onClick={onClose}
              className="mt-4 text-sm text-blue-500 hover:underline"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-base mb-1">Job Match Check 🚀</h3>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              We're building a smarter ATS check — paste any job description and
              we match it against your resume for a tailored score.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Keyword match score", "Skill gap analysis", "Tailored recommendations"].map((f) => (
                <span
                  key={f}
                  className="text-xs bg-blue-500/10 text-blue-500 rounded-full px-2.5 py-1"
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="your@email.com"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 transition-shadow"
              />
              <button
                onClick={submit}
                disabled={mutation.isPending || !email.trim()}
                className="rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 text-sm transition-colors"
              >
                {mutation.isPending ? "…" : "Notify me"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add smitparekh-web/components/tools/ATSNotifyModal.tsx
git commit -m "feat: add ATSNotifyModal for Flow 2 coming-soon signup"
```

---

## Task 5: ATSResumeChecker — stepper rewrite

**Files:**
- Modify: `smitparekh-web/components/tools/ATSResumeChecker.tsx` (full rewrite)

- [ ] **Step 1: Rewrite ATSResumeChecker.tsx**

Replace the entire file content with:

```tsx
// smitparekh-web/components/tools/ATSResumeChecker.tsx
"use client";

import { useState, useRef } from "react";
import {
  Upload,
  FileText,
  X,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnalyzeResume } from "@/hooks/api/use-tools";
import { toast } from "@/lib/toast";
import ATSNotifyModal from "./ATSNotifyModal";

type Step = 0 | 1 | 2;

type Result = {
  score?: number;
  analysis?: string;
  recommendations?: string[];
};

function ScoreRing({ score }: { score: number }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg className="absolute inset-0 -rotate-90" width="112" height="112">
        <circle
          cx="56" cy="56" r={r}
          fill="none" stroke="currentColor" strokeWidth="10"
          className="text-muted"
        />
        <motion.circle
          cx="56" cy="56" r={r}
          fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (score / 100) * circ }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="text-center">
        <span className="text-2xl font-bold" style={{ color }}>{score}</span>
        <p className="text-xs text-muted-foreground">/100</p>
      </div>
    </div>
  );
}

const STEPS = ["Upload", "Analyse", "Report"] as const;

export default function ATSResumeChecker() {
  const [step, setStep] = useState<Step>(0);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [dragging, setDragging] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = useAnalyzeResume();

  function handleFile(f: File) {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(f.type) && !f.name.match(/\.(pdf|docx)$/i)) {
      toast.error("Invalid file", "Please upload a PDF or DOCX resume.");
      return;
    }
    setFile(f);
    setResult(null);
  }

  function analyze() {
    if (!file) return;
    mutation.mutate(file, {
      onSuccess: (res) => {
        setResult({
          score: res.atsScore,
          analysis:
            res.summary ??
            res.sectionBreakdown
              .map((s) => `${s.section} (${s.score}/100): ${s.feedback}`)
              .join("\n\n"),
          recommendations: res.recommendations,
        });
        setStep(2);
      },
      onError: () =>
        toast.error("Analysis failed", "Please try again with a valid resume file."),
    });
  }

  function reset() {
    setFile(null);
    setResult(null);
    setStep(0);
    mutation.reset();
  }

  function renderStepContent(i: number) {
    if (i === 0) {
      return (
        <div className="space-y-3">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const f = e.dataTransfer.files[0];
                if (f) handleFile(f);
              }}
              onClick={() => inputRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer py-12 transition-colors ${
                dragging
                  ? "border-blue-500 bg-blue-500/5"
                  : "border-border hover:border-blue-500/50"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-sm font-medium">Drop your resume here or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">PDF or DOCX — max 5 MB</p>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          {file && (
            <button
              onClick={() => setStep(1)}
              className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 text-sm transition-colors"
            >
              Next — Analyse
            </button>
          )}
        </div>
      );
    }

    if (i === 1) {
      return (
        <div className="space-y-3">
          {file && (
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
          )}
          <button
            onClick={analyze}
            disabled={mutation.isPending}
            className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {mutation.isPending ? "Analysing resume…" : "Check ATS Score"}
          </button>
        </div>
      );
    }

    if (i === 2 && result) {
      return (
        <div className="space-y-4">
          {result.score !== undefined && (
            <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl border border-border bg-card p-6">
              <ScoreRing score={result.score} />
              <div>
                <p className="text-lg font-bold">ATS Score</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-sm">
                  {result.score >= 75
                    ? "Great score! Your resume is well-optimised for ATS systems."
                    : result.score >= 50
                    ? "Good start. A few improvements will help you pass more filters."
                    : "Needs work. Follow the recommendations below to improve your score."}
                </p>
              </div>
            </div>
          )}
          {result.analysis && (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <p className="text-sm font-semibold">Analysis</p>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {result.analysis}
                </p>
              </div>
            </div>
          )}
          {result.recommendations && result.recommendations.length > 0 && (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <p className="text-sm font-semibold">Recommendations</p>
              </div>
              <ul className="divide-y divide-border">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 px-4 py-3">
                    <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{rec}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Start over
          </button>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="space-y-6">
      {/* Flow selector */}
      <div className="flex gap-3">
        <div className="flex-1 rounded-xl border-2 border-blue-500 bg-blue-500/5 px-4 py-3 cursor-default">
          <p className="text-[10px] font-bold text-blue-500 tracking-widest uppercase mb-0.5">
            Flow 1
          </p>
          <p className="text-sm font-semibold">Quick ATS Check</p>
          <p className="text-xs text-muted-foreground mt-0.5">Resume only → instant score</p>
        </div>
        <button
          onClick={() => setNotifyOpen(true)}
          className="flex-1 relative rounded-xl border-2 border-dashed border-border bg-muted/30 px-4 py-3 text-left opacity-70 hover:opacity-90 transition-opacity"
        >
          <span className="absolute top-2 right-2 bg-muted-foreground/60 text-background text-[9px] font-bold px-1.5 py-0.5 rounded tracking-widest">
            SOON
          </span>
          <p className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mb-0.5">
            Flow 2
          </p>
          <p className="text-sm font-semibold text-muted-foreground">Job Match Check</p>
          <p className="text-xs text-muted-foreground/70 mt-0.5">Resume + JD → match score</p>
        </button>
      </div>

      {/* Horizontal stepper — md+ only */}
      <div className="hidden md:flex items-center">
        {STEPS.map((label, i) => (
          <div key={label} className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i < step
                    ? "bg-green-500 text-white"
                    : i === step
                    ? "bg-blue-500 text-white"
                    : "bg-muted border-2 border-border text-muted-foreground"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                className={`text-[11px] font-semibold ${
                  i === step ? "text-blue-500" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-3 mb-4 transition-colors ${
                  i < step
                    ? "bg-gradient-to-r from-green-500 to-blue-500"
                    : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Desktop: active step content */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {renderStepContent(step)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile: vertical timeline stepper */}
      <div className="md:hidden">
        {STEPS.map((label, i) => (
          <div key={label} className="flex gap-3">
            {/* Timeline column */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  i < step
                    ? "bg-green-500 text-white"
                    : i === step
                    ? "bg-blue-500 text-white"
                    : "bg-muted border-2 border-border text-muted-foreground"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-0.5 flex-1 min-h-6 mt-1 transition-colors ${
                    i < step ? "bg-blue-500/40" : "bg-border"
                  }`}
                />
              )}
            </div>
            {/* Content column */}
            <div className={`flex-1 pb-5 ${i > step ? "opacity-40" : ""}`}>
              <p
                className={`text-sm font-semibold mb-2 ${
                  i === step ? "text-blue-500" : "text-muted-foreground"
                }`}
              >
                {label}
              </p>
              {i === step ? (
                renderStepContent(i)
              ) : i > step ? (
                <div className="rounded-xl border border-border bg-muted/20 px-3 py-2.5">
                  <p className="text-xs text-muted-foreground">
                    Complete previous step to unlock
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <ATSNotifyModal open={notifyOpen} onClose={() => setNotifyOpen(false)} />
    </div>
  );
}
```

- [ ] **Step 2: Run type check**

```bash
cd smitparekh-web && pnpm build 2>&1 | grep -E "error TS" | head -20
```
Expected: no type errors.

- [ ] **Step 3: Commit**

```bash
git add smitparekh-web/components/tools/ATSResumeChecker.tsx
git commit -m "feat: rewrite ATSResumeChecker with two-flow responsive stepper"
```

---

## Task 6: ToolsCategoryFilter component

**Files:**
- Create: `smitparekh-web/components/tools/ToolsCategoryFilter.tsx`

- [ ] **Step 1: Create the component**

```tsx
// smitparekh-web/components/tools/ToolsCategoryFilter.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Eraser,
  PenLine,
  FileText,
  QrCode,
  Hash,
  Minimize2,
  ArrowLeftRight,
  Download,
  Search,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toolsSEO } from "@/data/tools-seo";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  "background-remover": Eraser,
  "viral-linkedin-post-generator": PenLine,
  "ats-resume-checker": FileText,
  "meta-tag-checker": Globe,
  "qr-code-generator": QrCode,
  "word-counter": Hash,
  "image-compressor": Minimize2,
  "image-converter": ArrowLeftRight,
  "linkedin-media-downloader": Download,
  "seo-analyzer": Search,
  "password-generator": Lock,
  "youtube-thumbnail-downloader": Download,
  "json-formatter": FileText,
  "base64-encoder-decoder": ArrowLeftRight,
};

const CATEGORY_MAP: Record<string, string> = {
  "background-remover": "Image",
  "viral-linkedin-post-generator": "Content",
  "ats-resume-checker": "Career",
  "meta-tag-checker": "SEO",
  "qr-code-generator": "Dev",
  "word-counter": "Content",
  "image-compressor": "Image",
  "image-converter": "Image",
  "linkedin-media-downloader": "Content",
  "seo-analyzer": "SEO",
  "password-generator": "Security",
  "youtube-thumbnail-downloader": "Dev",
  "json-formatter": "Dev",
  "base64-encoder-decoder": "Dev",
};

const BADGE_MAP: Record<string, { label: string; className: string }> = {
  "background-remover": {
    label: "Popular",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  "viral-linkedin-post-generator": {
    label: "Popular",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  "ats-resume-checker": {
    label: "Trending",
    className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  "youtube-thumbnail-downloader": {
    label: "New",
    className: "bg-cyan-400/10 text-cyan-500 border-cyan-400/20",
  },
  "json-formatter": {
    label: "New",
    className: "bg-cyan-400/10 text-cyan-500 border-cyan-400/20",
  },
  "base64-encoder-decoder": {
    label: "New",
    className: "bg-cyan-400/10 text-cyan-500 border-cyan-400/20",
  },
};

const CATEGORIES = ["All", "Image", "Content", "SEO", "Career", "Dev", "Security"] as const;
type Category = (typeof CATEGORIES)[number];

export default function ToolsCategoryFilter() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? toolsSEO
      : toolsSEO.filter((t) => CATEGORY_MAP[t.slug] === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="sticky top-16 z-10 bg-background/95 backdrop-blur mb-8 border-b border-border">
        <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 px-4 py-3 text-sm transition-colors border-b-2 -mb-px ${
                active === cat
                  ? "text-blue-500 border-blue-500 font-semibold"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((tool) => {
          const Icon = ICON_MAP[tool.slug] ?? Globe;
          const category = CATEGORY_MAP[tool.slug] ?? "Tool";
          const badge = BADGE_MAP[tool.slug];
          const shortTitle = tool.title.split(" - ")[0];

          return (
            <Link
              key={tool.slug}
              href={`/free-tools/${tool.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/15 transition-colors shrink-0">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    {category}
                  </Badge>
                  {badge && (
                    <Badge className={`text-xs px-2 py-0.5 ${badge.className}`}>
                      {badge.label}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base leading-snug mb-1.5 group-hover:text-blue-500 transition-colors">
                  {shortTitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm text-blue-500 font-medium mt-auto">
                Use for free{" "}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add smitparekh-web/components/tools/ToolsCategoryFilter.tsx
git commit -m "feat: add ToolsCategoryFilter with underline tabs and filtered grid"
```

---

## Task 7: Free Tools page update

**Files:**
- Modify: `smitparekh-web/app/(tools)/free-tools/page.tsx`

- [ ] **Step 1: Update metadata and wire ToolsCategoryFilter**

Replace the entire `app/(tools)/free-tools/page.tsx` content:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Brain,
  RefreshCw,
  CheckCircle,
  Users,
  Wrench,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { siteConfig } from "@/data/site";
import { toolsSEO } from "@/data/tools-seo";
import FreeToolsFAQ from "@/components/tools/FreeToolsFAQ";
import ToolsCategoryFilter from "@/components/tools/ToolsCategoryFilter";

export const metadata: Metadata = {
  title: "Free Online Tools - Background Remover, Resume Checker, QR Code Generator & More",
  description:
    "14 free browser-based tools - AI background remover, ATS resume checker, LinkedIn post generator, QR code generator, word counter, SEO analyzer, and more. No signup, no cost. Available worldwide.",
  alternates: { canonical: `${siteConfig.url}/free-tools` },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/free-tools`,
    title: "Free Online Tools by Smit Parekh - No Signup Required",
    description:
      "14 free browser-based tools - background remover, ATS resume checker, LinkedIn generator, QR code maker, word counter, SEO analyzer & more. No signup, no cost. Used globally.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-free-developer-tools.png`,
        width: 1200,
        height: 630,
        alt: "Free Online Developer Tools by Smit Parekh - No Signup Required",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Free Online Tools by Smit Parekh - No Signup Required",
    description:
      "14 free browser-based tools - background remover, ATS resume checker, LinkedIn generator, QR codes & more. No signup, used globally.",
    images: [
      {
        url: `${siteConfig.url}/images/smit-parekh-free-developer-tools.png`,
        width: 1200,
        height: 630,
        alt: "Free Online Developer Tools by Smit Parekh - No Signup Required",
      },
    ],
  },
  keywords: [
    "free online tools",
    "free web tools no signup",
    "free developer tools",
    "free productivity tools",
    "AI tools free",
    "free browser based tools",
    "free tools no registration",
    "100% free online tools",
    "background remover free",
    "ATS resume checker free",
    "LinkedIn post generator free",
    "QR code generator free",
    "word counter online",
    "SEO analyzer free",
    "free image tools",
    "free career tools",
    "image compressor free",
    "password generator free",
    "LinkedIn video downloader free",
    "meta tag checker free",
    "youtube thumbnail downloader free",
    "json formatter online free",
    "base64 encoder decoder free",
    "free online tools India",
    "best free web tools India",
    "free AI tools India",
    "free online tools USA",
    "free tools no signup United States",
    "outils gratuits en ligne",
    "outils SEO gratuits",
    "outils développeur gratuits",
    "free tools online 2025",
  ],
};

const features = [
  { icon: CheckCircle, title: "100% Free Forever", description: "Every tool is free with no hidden costs, trials, or subscription tiers. Use them as much as you need." },
  { icon: Zap, title: "Lightning Fast", description: "Results in seconds. Browser-based tools run locally; AI tools use optimised server pipelines." },
  { icon: ShieldCheck, title: "Private & Secure", description: "Uploaded files are processed and deleted immediately - never stored, never shared, never used for training." },
  { icon: Brain, title: "AI-Powered", description: "Background removal, post generation, ATS scoring, and SEO analysis all use production-grade AI models." },
  { icon: Users, title: "No Account Required", description: "No signup, no email, no OAuth. Open a tool and use it - every single time." },
  { icon: RefreshCw, title: "Continuously Improved", description: "New tools and improvements ship regularly based on real feedback from developers and marketers." },
];

const steps = [
  { step: "01", title: "Pick a Tool", description: "Browse the collection below and choose the tool that fits your task - image, content, SEO, or career." },
  { step: "02", title: "Input Your Data", description: "Upload a file, paste a URL, or type your content. The interface tells you exactly what it needs." },
  { step: "03", title: "Get Instant Results", description: "Download your processed image, copy your generated text, or read your detailed analysis - in seconds." },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free Online Tools - No Signup Required",
  description: `${toolsSEO.length} free browser-based tools - AI background remover, ATS resume checker, LinkedIn post generator, QR code generator, and more. Available globally, no account needed.`,
  url: `${siteConfig.url}/free-tools`,
  inLanguage: "en",
  author: { "@type": "Person", name: "Smit Parekh", url: siteConfig.url },
  publisher: { "@type": "Person", name: "Smit Parekh", url: siteConfig.url },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: `${siteConfig.url}/free-tools` },
    ],
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Online Tools by Smit Parekh",
  description: `${toolsSEO.length} free browser-based tools with no signup required. Used in India, US, France, and worldwide.`,
  url: `${siteConfig.url}/free-tools`,
  numberOfItems: toolsSEO.length,
  itemListElement: toolsSEO.map((tool, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: tool.title.split(" - ")[0],
      description: tool.description,
      url: `${siteConfig.url}/free-tools/${tool.slug}`,
      applicationCategory: "WebApplication",
      operatingSystem: "Web Browser",
      inLanguage: "en",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        eligibleRegion: [
          { "@type": "Country", name: "IN" },
          { "@type": "Country", name: "US" },
          { "@type": "Country", name: "FR" },
          { "@type": "Country", name: "Worldwide" },
        ],
      },
    },
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are all these tools really free?", acceptedAnswer: { "@type": "Answer", text: "Yes - every tool is completely free, forever. No hidden fees, no trial periods, no credit card required." } },
    { "@type": "Question", name: "Do I need to create an account?", acceptedAnswer: { "@type": "Answer", text: "No account, no signup, no email. Just open a tool and use it immediately." } },
    { "@type": "Question", name: "What happens to my uploaded files?", acceptedAnswer: { "@type": "Answer", text: "Files uploaded for processing are used only to generate the result and are deleted immediately after. Nothing is stored." } },
    { "@type": "Question", name: "Can I use the results commercially?", acceptedAnswer: { "@type": "Answer", text: "Yes. All outputs can be used in personal and commercial projects without attribution." } },
    { "@type": "Question", name: "How accurate is the AI background remover?", acceptedAnswer: { "@type": "Answer", text: "The background remover uses the rembg u2net model, which performs well on portraits, products, and objects with clear edges." } },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: `${siteConfig.url}/free-tools` },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Smit Parekh",
  url: siteConfig.url,
  sameAs: [siteConfig.social.linkedin, siteConfig.social.github, siteConfig.social.x],
  knowsAbout: ["React", "Next.js", "Node.js", "TypeScript", "Full Stack Development", "Free Web Tools"],
};

export default function FreeToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      {/* Hero */}
      <PageHero
        eyebrow="Free Tools"
        icon={Wrench}
        title="Free Online Tools"
        description={`${toolsSEO.length} browser-based tools - no signup, no account, no cost. Built for developers, marketers, and professionals.`}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/85">
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-300" /> No account required</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-300" /> No data stored</span>
          <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-300" /> 100% free forever</span>
        </div>
      </PageHero>

      {/* Tools Grid with Category Filter */}
      <section className="page-section" id="tools">
        <div className="page-container">
          <ToolsCategoryFilter />
        </div>
      </section>

      {/* Features */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">Why Use These Tools</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Built for professionals who value their time</h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-xl mx-auto">
              Every tool is designed to solve a real problem fast - no friction, no paywalls.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="page-section">
        <div className="page-container">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">How It Works</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Three steps - that's it</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {steps.map(({ step, title, description }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-sm mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="page-section border-t border-border bg-muted/20">
        <div className="page-container">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">FAQ</p>
            <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
          </div>
          <FreeToolsFAQ />
        </div>
      </section>

      {/* CTA */}
      <section className="page-section">
        <div className="page-container text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-3">Ready to get started?</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Pick any tool above - no signup, no download, no waiting. Just results.
          </p>
          <Link
            href="#tools"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 text-sm transition-colors"
          >
            Browse All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Run type check and build**

```bash
cd smitparekh-web && pnpm build 2>&1 | tail -20
```
Expected: `✓ Compiled successfully` with no type errors.

- [ ] **Step 3: Start dev server and verify visually**

```bash
cd smitparekh-web && pnpm dev
```

Open http://localhost:3001/free-tools and verify:
- Filter tabs appear and filter the grid correctly
- "All" shows all 14 tools
- Each category tab shows only its tools
- Cards have correct badges (Popular/Trending/New)
- Tabs scroll horizontally on narrow viewport

Open http://localhost:3001/free-tools/ats-resume-checker and verify:
- Flow selector shows Flow 1 active, Flow 2 with "SOON" badge
- Clicking Flow 2 opens the Notify Me modal
- Modal email submit works (check Network tab — POST /api/tools/notify)
- After submit shows "You're on the list 🎉"
- On desktop: horizontal stepper visible, step 1 active
- On mobile (DevTools responsive mode): vertical timeline stepper visible
- Upload a PDF → "Next — Analyse" button appears → step 2 activates
- Click "Check ATS Score" → analysis loads → step 3 with report

- [ ] **Step 4: Commit**

```bash
git add smitparekh-web/app/\(tools\)/free-tools/page.tsx
git commit -m "feat: add ToolsCategoryFilter to free-tools page, update metadata to 14 tools"
```
