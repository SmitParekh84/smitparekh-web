"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, Star, Eye, EyeOff, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { useUploadProjectImage, useGenerateProject } from "@/hooks/use-projects";
import {
  StringListEditor,
  KVListEditor,
  OutcomeListEditor,
  TechStackEditor,
  type KVItem,
  type OutcomeItem,
  type TechStackGroups,
} from "./CaseStudyFields";
import type { BackendProject, BackendProjectInput } from "@/types";

const CATEGORY_OPTIONS = [
  "FinTech",
  "SaaS",
  "LegalTech",
  "Enterprise",
  "E-Commerce",
  "Healthcare",
  "Education",
  "Web App",
  "API / Backend",
  "DevOps",
];

interface ProjectFormProps {
  initialData?: Partial<BackendProject>;
  onSubmit: (data: BackendProjectInput) => Promise<void>;
  submitLabel: string;
  isPending: boolean;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[–—]/g, "-")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const DEFAULT_TECH_STACK: TechStackGroups = {
  Frontend: [],
  Backend: [],
  Database: [],
  Infrastructure: [],
  Tooling: [],
};

export function ProjectForm({
  initialData,
  onSubmit,
  submitLabel,
  isPending,
}: ProjectFormProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadImage = useUploadProjectImage();
  const generateProject = useGenerateProject();
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMode, setAiMode] = useState<"idea" | "rewrite">("idea");
  const [aiPrompt, setAiPrompt] = useState("");

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    subtitle: initialData?.subtitle ?? "",
    categories: initialData?.categories ?? [],
    industry: initialData?.industry ?? "",
    role: initialData?.role ?? "Full Stack Developer",
    year: initialData?.year ?? "",
    duration: initialData?.duration ?? "",
    gradient: initialData?.gradient ?? "from-blue-600 via-blue-500 to-sky-500",
    tags: (initialData?.tags ?? []) as string[],
    shortDescription: initialData?.shortDescription ?? "",
    summary: initialData?.summary ?? "",
    detailMarkdown: initialData?.detailMarkdown ?? "",
    problem: initialData?.problem ?? "",
    approach: (initialData?.approach ?? []) as string[],
    outcomes: (initialData?.outcomes ?? []) as OutcomeItem[],
    highlights: (initialData?.highlights ?? []) as KVItem[],
    techStack: {
      ...DEFAULT_TECH_STACK,
      ...(initialData?.techStack ?? {}),
    } as TechStackGroups,
    lessons: (initialData?.lessons ?? []) as string[],
    imageUrl: initialData?.imageUrl ?? "",
    repoLink: initialData?.repoLink ?? "",
    demoLink: initialData?.demoLink ?? "",
    demoBtn: initialData?.demoBtn ?? "View Live Demo",
    isShowcased: initialData?.isShowcased ?? false,
    isVisible: initialData?.isVisible ?? true,
  });

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function applyAiData(ai: Partial<typeof form> & { categories?: string[] }) {
    setForm((prev) => ({
      ...prev,
      title: ai.title || prev.title,
      slug: prev.slug || (ai.title ? slugify(ai.title) : prev.slug),
      subtitle: ai.subtitle ?? prev.subtitle,
      categories:
        Array.isArray(ai.categories) && ai.categories.length
          ? ai.categories.filter((c) => CATEGORY_OPTIONS.includes(c))
          : prev.categories,
      industry: ai.industry ?? prev.industry,
      role: ai.role ?? prev.role,
      year: ai.year ?? prev.year,
      duration: ai.duration ?? prev.duration,
      gradient: ai.gradient ?? prev.gradient,
      tags: Array.isArray(ai.tags) && ai.tags.length ? ai.tags : prev.tags,
      shortDescription: ai.shortDescription ?? prev.shortDescription,
      summary: ai.summary ?? prev.summary,
      detailMarkdown: ai.detailMarkdown ?? prev.detailMarkdown,
      problem: ai.problem ?? prev.problem,
      approach:
        Array.isArray(ai.approach) && ai.approach.length
          ? ai.approach
          : prev.approach,
      outcomes:
        Array.isArray(ai.outcomes) && ai.outcomes.length
          ? (ai.outcomes as OutcomeItem[])
          : prev.outcomes,
      highlights:
        Array.isArray(ai.highlights) && ai.highlights.length
          ? (ai.highlights as KVItem[])
          : prev.highlights,
      techStack: ai.techStack
        ? ({ ...DEFAULT_TECH_STACK, ...ai.techStack } as TechStackGroups)
        : prev.techStack,
      lessons:
        Array.isArray(ai.lessons) && ai.lessons.length ? ai.lessons : prev.lessons,
    }));
  }

  // Hydrate from session-storage AI draft generated on the listing page
  // (admin/projects?ai=1 → POST /generate → sessionStorage → navigate here).
  useEffect(() => {
    if (initialData?._id) return;
    if (typeof window === "undefined") return;
    if (!new URLSearchParams(window.location.search).has("ai")) return;
    const raw = sessionStorage.getItem("project-ai-draft");
    if (!raw) return;
    try {
      const ai = JSON.parse(raw);
      applyAiData(ai);
      toast.success("AI draft loaded", "Add an image, review, and save.");
    } catch {
      // ignore
    } finally {
      sessionStorage.removeItem("project-ai-draft");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAiGenerate() {
    const prompt = aiPrompt.trim();
    if (!prompt) {
      toast.error("Enter details", "Type your project notes or idea.");
      return;
    }
    try {
      const res = await generateProject.mutateAsync({ mode: aiMode, prompt });
      applyAiData(res.data as unknown as Partial<typeof form>);
      toast.success("Draft generated", "Review and edit before saving.");
      setAiOpen(false);
      setAiPrompt("");
    } catch (err) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Try again in a moment.";
      toast.error("AI generation failed", msg);
    }
  }

  function toggleCategory(cat: string) {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await uploadImage.mutateAsync(file);
      setField("imageUrl", result.url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed", "Could not upload image.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.shortDescription || !form.detailMarkdown || !form.imageUrl) {
      toast.error("Missing fields", "Title, descriptions, and image are required.");
      return;
    }
    if (form.categories.length === 0) {
      toast.error("Missing category", "Select at least one category.");
      return;
    }
    await onSubmit({
      ...form,
      slug: form.slug ? slugify(form.slug) : slugify(form.title),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6">
      {/* AI Generate */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-2 text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Generate with AI</p>
              <p className="text-xs text-muted-foreground">
                Paste rough notes (with product names - they&apos;ll be removed)
                or describe a new idea. AI fills the entire case study.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAiOpen(true)}
            className={cn(
              buttonVariants({ size: "sm" }),
              "gap-1.5 self-start sm:self-auto"
            )}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {form.title ? "Regenerate" : "Generate draft"}
          </button>
        </div>
      </div>

      {aiOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => !generateProject.isPending && setAiOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-2 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold">Generate project draft</h3>
                <p className="text-xs text-muted-foreground">
                  Pick a mode, then describe the project. AI returns a full
                  structured case study.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAiOpen(false)}
                disabled={generateProject.isPending}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAiMode("idea")}
                disabled={generateProject.isPending}
                className={cn(
                  "rounded-xl border p-3 text-left text-xs transition-colors",
                  aiMode === "idea"
                    ? "border-blue-500 bg-blue-500/5"
                    : "border-border hover:border-blue-500/40"
                )}
              >
                <p className="text-sm font-medium">From an idea</p>
                <p className="mt-0.5 text-muted-foreground">
                  Describe a project concept - AI generates the whole thing.
                </p>
              </button>
              <button
                type="button"
                onClick={() => setAiMode("rewrite")}
                disabled={generateProject.isPending}
                className={cn(
                  "rounded-xl border p-3 text-left text-xs transition-colors",
                  aiMode === "rewrite"
                    ? "border-blue-500 bg-blue-500/5"
                    : "border-border hover:border-blue-500/40"
                )}
              >
                <p className="text-sm font-medium">Rewrite my notes</p>
                <p className="mt-0.5 text-muted-foreground">
                  Paste real notes - AI strips product/client names.
                </p>
              </button>
            </div>

            <textarea
              autoFocus
              rows={aiMode === "rewrite" ? 8 : 5}
              maxLength={4000}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={generateProject.isPending}
              placeholder={
                aiMode === "rewrite"
                  ? "Paste raw notes, bullet points, README, or a draft. Include real metrics, tech stack, and details - they'll be kept; brand names will be removed."
                  : "Describe the project. e.g. 'A real-time fintech dashboard that lets traders track positions across 5 brokers, with sub-second updates and risk alerts.'"
              }
              className="w-full resize-y rounded-xl border border-border bg-background px-3 py-2 text-sm transition-colors focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">
              {aiPrompt.length}/4000
            </p>

            {form.title && (
              <p className="mt-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-600 dark:text-yellow-400">
                This will overwrite all case-study fields below.
              </p>
            )}

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setAiOpen(false)}
                disabled={generateProject.isPending}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAiGenerate}
                disabled={generateProject.isPending || !aiPrompt.trim()}
                className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
              >
                {generateProject.isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Title */}
      <Field label="Title" required>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="e.g. Liquidity.io"
          className={inputClass}
        />
      </Field>

      {/* Slug + Subtitle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="URL Slug">
          <div className="flex gap-2">
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setField("slug", e.target.value)}
              placeholder="liquidity-io"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setField("slug", slugify(form.title))}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "shrink-0 text-xs"
              )}
            >
              From title
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Used in /portfolio/&lt;slug&gt;. Auto-generated from title if blank.
          </p>
        </Field>
        <Field label="Subtitle">
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => setField("subtitle", e.target.value)}
            placeholder="Cap Table Management Platform"
            className={inputClass}
          />
        </Field>
      </div>

      {/* Meta row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Industry">
          <input
            type="text"
            value={form.industry}
            onChange={(e) => setField("industry", e.target.value)}
            placeholder="Equity & Cap Table Management"
            className={inputClass}
          />
        </Field>
        <Field label="Role">
          <input
            type="text"
            value={form.role}
            onChange={(e) => setField("role", e.target.value)}
            placeholder="Full Stack Developer"
            className={inputClass}
          />
        </Field>
        <Field label="Year">
          <input
            type="text"
            value={form.year}
            onChange={(e) => setField("year", e.target.value)}
            placeholder="2023–2025"
            className={inputClass}
          />
        </Field>
        <Field label="Duration">
          <input
            type="text"
            value={form.duration}
            onChange={(e) => setField("duration", e.target.value)}
            placeholder="20+ months"
            className={inputClass}
          />
        </Field>
        <Field label="Hero Gradient (Tailwind classes)">
          <input
            type="text"
            value={form.gradient}
            onChange={(e) => setField("gradient", e.target.value)}
            placeholder="from-blue-600 via-blue-500 to-sky-500"
            className={inputClass}
          />
        </Field>
        <Field label="Tags (comma-separated)">
          <input
            type="text"
            value={form.tags.join(", ")}
            onChange={(e) =>
              setField(
                "tags",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            placeholder="React, Next.js, TypeScript, Node.js"
            className={inputClass}
          />
        </Field>
      </div>

      {/* Categories */}
      <Field label="Categories" required>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                form.categories.includes(cat)
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "border-border bg-muted text-muted-foreground hover:border-blue-500/40 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        {form.categories.length > 0 && (
          <p className="text-xs text-blue-500 mt-2">
            Selected: {form.categories.join(", ")}
          </p>
        )}
      </Field>

      {/* Short Description */}
      <Field label="Short Description" required>
        <textarea
          required
          rows={2}
          value={form.shortDescription}
          onChange={(e) => setField("shortDescription", e.target.value)}
          placeholder="One-sentence project summary shown on the portfolio card"
          className={cn(inputClass, "resize-none")}
        />
      </Field>

      {/* Detail Markdown */}
      <Field label="Detail / Full Description (Markdown)" required>
        <textarea
          required
          rows={8}
          value={form.detailMarkdown}
          onChange={(e) => setField("detailMarkdown", e.target.value)}
          placeholder="Full project description in Markdown format..."
          className={cn(inputClass, "resize-y font-mono text-xs")}
        />
      </Field>

      {/* === Case Study Sections === */}
      <div className="rounded-2xl border border-dashed border-blue-500/30 bg-blue-500/5 p-5 sm:p-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wider">
            Case Study Content
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Powers the rich /portfolio/&lt;slug&gt; case study page. Optional but
            strongly recommended.
          </p>
        </div>

        <Field label="Summary">
          <textarea
            rows={3}
            value={form.summary}
            onChange={(e) => setField("summary", e.target.value)}
            placeholder="2-3 sentence overview shown in the case study hero."
            className={cn(inputClass, "resize-y")}
          />
        </Field>

        <Field label="The Problem">
          <textarea
            rows={4}
            value={form.problem}
            onChange={(e) => setField("problem", e.target.value)}
            placeholder="What needed solving - the business and technical context."
            className={cn(inputClass, "resize-y")}
          />
        </Field>

        <StringListEditor
          label="Approach"
          hint="Each item is a bullet describing how you solved a specific aspect."
          values={form.approach}
          onChange={(v) => setField("approach", v)}
          placeholder="Architected the React frontend around feature-scoped Redux slices..."
          multiline
        />

        <KVListEditor
          label="Highlights"
          hint='Stat cards shown "At a Glance" - e.g. "API Requests / Day" → "10,000+".'
          values={form.highlights}
          onChange={(v) => setField("highlights", v)}
          labelPlaceholder="API Requests / Day"
          valuePlaceholder="10,000+"
        />

        <OutcomeListEditor
          label="Outcomes"
          hint="Big wins from shipping the project - label, value, and a short detail."
          values={form.outcomes}
          onChange={(v) => setField("outcomes", v)}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Tech Stack
          </label>
          <TechStackEditor
            value={form.techStack}
            onChange={(v) => setField("techStack", v)}
          />
        </div>

        <StringListEditor
          label="Lessons"
          hint="Optional - short reflections or takeaways."
          values={form.lessons}
          onChange={(v) => setField("lessons", v)}
          placeholder="Treat money-touching writes as transactional first..."
          multiline
        />
      </div>

      {/* Image */}
      <Field label="Project Image" required>
        <div className="space-y-2">
          <input
            type="text"
            value={form.imageUrl}
            onChange={(e) => setField("imageUrl", e.target.value)}
            placeholder="https://res.cloudinary.com/... or paste a URL"
            className={inputClass}
          />
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">or</span>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploadImage.isPending}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-2 text-xs"
              )}
            >
              {uploadImage.isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              Upload Image
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          {form.imageUrl && (
            <div className="relative w-32 h-20 rounded-xl overflow-hidden border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setField("imageUrl", "")}
                className="absolute top-1 right-1 p-0.5 rounded-full bg-black/60 text-white hover:bg-black/80"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </Field>

      {/* Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Demo Link">
          <input
            type="url"
            value={form.demoLink}
            onChange={(e) => setField("demoLink", e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </Field>
        <Field label="Demo Button Text">
          <input
            type="text"
            value={form.demoBtn}
            onChange={(e) => setField("demoBtn", e.target.value)}
            placeholder="View Live Demo"
            className={inputClass}
          />
        </Field>
        <Field label="Repository Link">
          <input
            type="url"
            value={form.repoLink}
            onChange={(e) => setField("repoLink", e.target.value)}
            placeholder="https://github.com/..."
            className={inputClass}
          />
        </Field>
      </div>

      {/* Visibility + Showcased */}
      <div className="space-y-3">
        {/* Visible toggle */}
        <label className="flex items-center gap-3 cursor-pointer select-none rounded-xl border border-border bg-card px-4 py-3">
          <div
            onClick={() => setField("isVisible", !form.isVisible)}
            className={cn(
              "relative w-10 h-5 rounded-full transition-colors shrink-0",
              form.isVisible ? "bg-green-500" : "bg-muted border border-border"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",
                form.isVisible ? "translate-x-5" : "translate-x-0.5"
              )}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-sm font-medium">
              {form.isVisible ? (
                <Eye className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
              )}
              {form.isVisible ? "Visible on site" : "Hidden from site"}
            </div>
            <p className="text-xs text-muted-foreground">
              {form.isVisible
                ? "Project appears on portfolio and homepage"
                : "Project is hidden from all public pages"}
            </p>
          </div>
        </label>

        {/* Showcased toggle */}
        <label className="flex items-center gap-3 cursor-pointer select-none rounded-xl border border-border bg-card px-4 py-3">
          <div
            onClick={() => setField("isShowcased", !form.isShowcased)}
            className={cn(
              "relative w-10 h-5 rounded-full transition-colors shrink-0",
              form.isShowcased ? "bg-blue-500" : "bg-muted border border-border"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",
                form.isShowcased ? "translate-x-5" : "translate-x-0.5"
              )}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Star className="w-3.5 h-3.5 text-yellow-500" />
              Feature on homepage
            </div>
            <p className="text-xs text-muted-foreground">
              Show this project in the homepage featured section
            </p>
          </div>
        </label>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full gap-2 sm:w-auto",
            isPending && "cursor-not-allowed opacity-70"
          )}
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-blue-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-colors";
