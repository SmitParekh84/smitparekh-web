"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Star, Eye, EyeOff, Sparkles } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/SocialIcons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/lib/toast";
import { useGenerateProject, useGenerateProjectLinkedIn } from "@/hooks/use-projects";
import { CloudinaryImagePicker } from "@/components/admin/CloudinaryImagePicker";
import { LinkedInArticleModal } from "@/components/admin/LinkedInArticleModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
  const generateProject = useGenerateProject();
  const generateLinkedIn = useGenerateProjectLinkedIn();
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMode, setAiMode] = useState<"idea" | "rewrite">("idea");
  const [aiPrompt, setAiPrompt] = useState("");
  const [liOpen, setLiOpen] = useState(false);
  const [liData, setLiData] = useState<{ headline: string; body: string; hashtags: string[]; charCount: number } | null>(null);

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

  const imageMissing = !form.imageUrl;
  // Project equivalent of "publish": isVisible == true. Saving while visible
  // requires an image; toggling to hidden behaves like a draft.
  const blockPublish = form.isVisible && imageMissing;

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

  async function handleGenerateLinkedIn() {
    if (!form.title || !form.summary) {
      toast.error("Missing content", "Fill in the title and summary first.");
      return;
    }
    try {
      const res = await generateLinkedIn.mutateAsync({
        title: form.title,
        subtitle: form.subtitle,
        summary: form.summary,
        problem: form.problem,
        approach: form.approach,
        outcomes: form.outcomes,
        techStack: form.techStack as Record<string, string[]>,
        tags: form.tags,
      });
      setLiData(res.data);
      setLiOpen(true);
    } catch {
      toast.error("Generation failed", "Could not generate LinkedIn article. Try again.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.shortDescription || !form.detailMarkdown) {
      toast.error("Missing fields", "Title and descriptions are required.");
      return;
    }
    if (form.categories.length === 0) {
      toast.error("Missing category", "Select at least one category.");
      return;
    }
    if (form.isVisible && !form.imageUrl) {
      toast.error(
        "Cover image is required to publish.",
        "Add an image or hide the project to save without one."
      );
      return;
    }
    await onSubmit({
      ...form,
      slug: form.slug ? slugify(form.slug) : slugify(form.title),
    });
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="w-full space-y-6">
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
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              type="button"
              size="sm"
              onClick={() => setAiOpen(true)}
              className="gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {form.title ? "Regenerate" : "Generate draft"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGenerateLinkedIn}
              disabled={generateLinkedIn.isPending}
              className="gap-1.5"
            >
              {generateLinkedIn.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LinkedInIcon className="w-4 h-4 text-blue-600" />
              )}
              LinkedIn
            </Button>
          </div>
        </div>
      </div>

      <Dialog
        open={aiOpen}
        onOpenChange={(o) => {
          if (!generateProject.isPending) setAiOpen(o);
        }}
      >
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-2 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <DialogTitle>Generate project draft</DialogTitle>
                <DialogDescription>
                  Pick a mode, then describe the project. AI returns a full
                  structured case study.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div>
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

            <Textarea
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
              className="resize-y"
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">
              {aiPrompt.length}/4000
            </p>

            {form.title && (
              <p className="mt-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-600 dark:text-amber-400">
                This will overwrite all case-study fields below.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAiOpen(false)}
              disabled={generateProject.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleAiGenerate}
              disabled={generateProject.isPending || !aiPrompt.trim()}
              className="gap-1.5"
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
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Title */}
      <Field label="Title" required>
        <Input
          type="text"
          required
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="e.g. Liquidity.io"
          className="h-10"
        />
      </Field>

      {/* Slug + Subtitle */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Field label="URL Slug">
          <div className="flex gap-2">
            <Input
              type="text"
              value={form.slug}
              onChange={(e) => setField("slug", e.target.value)}
              placeholder="liquidity-io"
              className="h-10"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setField("slug", slugify(form.title))}
              className="shrink-0 text-xs h-10"
            >
              From title
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Used in /portfolio/&lt;slug&gt;. Auto-generated from title if blank.
          </p>
        </Field>
        <Field label="Subtitle">
          <Input
            type="text"
            value={form.subtitle}
            onChange={(e) => setField("subtitle", e.target.value)}
            placeholder="Cap Table Management Platform"
            className="h-10"
          />
        </Field>
      </div>

      {/* Meta row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <Field label="Industry">
          <Input
            type="text"
            value={form.industry}
            onChange={(e) => setField("industry", e.target.value)}
            placeholder="Equity & Cap Table Management"
            className="h-10"
          />
        </Field>
        <Field label="Role">
          <Input
            type="text"
            value={form.role}
            onChange={(e) => setField("role", e.target.value)}
            placeholder="Full Stack Developer"
            className="h-10"
          />
        </Field>
        <Field label="Year">
          <Input
            type="text"
            value={form.year}
            onChange={(e) => setField("year", e.target.value)}
            placeholder="2023–2025"
            className="h-10"
          />
        </Field>
        <Field label="Duration">
          <Input
            type="text"
            value={form.duration}
            onChange={(e) => setField("duration", e.target.value)}
            placeholder="20+ months"
            className="h-10"
          />
        </Field>
        <Field label="Hero Gradient (Tailwind classes)">
          <Input
            type="text"
            value={form.gradient}
            onChange={(e) => setField("gradient", e.target.value)}
            placeholder="from-blue-600 via-blue-500 to-sky-500"
            className="h-10"
          />
        </Field>
        <Field label="Tags (comma-separated)">
          <Input
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
            className="h-10"
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
        <Textarea
          required
          rows={2}
          value={form.shortDescription}
          onChange={(e) => setField("shortDescription", e.target.value)}
          placeholder="One-sentence project summary shown on the portfolio card"
          className="resize-none"
        />
      </Field>

      {/* Detail Markdown */}
      <Field label="Detail / Full Description (Markdown)" required>
        <Textarea
          required
          rows={8}
          value={form.detailMarkdown}
          onChange={(e) => setField("detailMarkdown", e.target.value)}
          placeholder="Full project description in Markdown format..."
          className="resize-y font-mono text-xs"
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
          <Textarea
            rows={3}
            value={form.summary}
            onChange={(e) => setField("summary", e.target.value)}
            placeholder="2-3 sentence overview shown in the case study hero."
            className="resize-y"
          />
        </Field>

        <Field label="The Problem">
          <Textarea
            rows={4}
            value={form.problem}
            onChange={(e) => setField("problem", e.target.value)}
            placeholder="What needed solving - the business and technical context."
            className="resize-y"
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
          <Label>Tech Stack</Label>
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
      <Field
        label="Project Image"
        required={form.isVisible}
        hint={
          form.isVisible
            ? "Required when project is visible on the site."
            : "Optional while hidden; required to make visible."
        }
      >
        <CloudinaryImagePicker
          kind="project"
          value={form.imageUrl}
          onChange={(url) => setField("imageUrl", url)}
          previewAspect="aspect-[16/10]"
        />
      </Field>

      {/* Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Field label="Demo Link">
          <Input
            type="url"
            value={form.demoLink}
            onChange={(e) => setField("demoLink", e.target.value)}
            placeholder="https://..."
            className="h-10"
          />
        </Field>
        <Field label="Demo Button Text">
          <Input
            type="text"
            value={form.demoBtn}
            onChange={(e) => setField("demoBtn", e.target.value)}
            placeholder="View Live Demo"
            className="h-10"
          />
        </Field>
        <Field label="Repository Link">
          <Input
            type="url"
            value={form.repoLink}
            onChange={(e) => setField("repoLink", e.target.value)}
            placeholder="https://github.com/..."
            className="h-10"
          />
        </Field>
      </div>

      {/* Visibility + Showcased */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Visible toggle */}
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <Switch
            id="project-is-visible"
            checked={form.isVisible}
            onCheckedChange={(checked) => setField("isVisible", checked)}
            className="data-[state=checked]:bg-emerald-500"
          />
          <Label htmlFor="project-is-visible" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              {form.isVisible ? (
                <Eye className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
              )}
              {form.isVisible ? "Visible on site" : "Hidden from site"}
            </div>
            <p className="text-xs font-normal text-muted-foreground">
              {form.isVisible
                ? "Project appears on portfolio and homepage"
                : "Project is hidden from all public pages"}
            </p>
          </Label>
        </div>

        {/* Showcased toggle */}
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <Switch
            id="project-is-showcased"
            checked={form.isShowcased}
            onCheckedChange={(checked) => setField("isShowcased", checked)}
            className="data-[state=checked]:bg-blue-500"
          />
          <Label htmlFor="project-is-showcased" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              Feature on homepage
            </div>
            <p className="text-xs font-normal text-muted-foreground">
              Show this project in the homepage featured section
            </p>
          </Label>
        </div>
      </div>

      {blockPublish && (
        <Alert variant="destructive">
          <AlertDescription>
            Add a project image to make this visible, or toggle &ldquo;Hidden from site&rdquo; to save without one.
          </AlertDescription>
        </Alert>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={isPending || blockPublish}
          className="w-full gap-2 sm:w-auto"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push("/admin")}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
      </div>
    </form>
    <LinkedInArticleModal open={liOpen} onClose={() => setLiOpen(false)} data={liData} />
    </>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
