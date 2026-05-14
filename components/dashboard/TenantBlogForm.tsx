"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Star, Eye, EyeOff, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AppSelect } from "@/components/ui/app-select";
import { toast } from "@/lib/toast";
import { TenantCoverImagePicker } from "@/components/dashboard/TenantCoverImagePicker";
import type { TenantBlog } from "@/lib/api/tenant";

const CATEGORY_OPTIONS = [
  "General",
  "Web Development",
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "DevOps",
  "AI / ML",
  "SEO",
  "Marketing",
  "Product",
  "Business",
  "Tutorial",
  "Case Study",
];

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

function plainExcerptFrom(markdown: string, max = 200): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~>#-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

export type TenantBlogFormValues = Partial<TenantBlog>;

interface TenantBlogFormProps {
  initialData?: Partial<TenantBlog>;
  onSubmit: (data: TenantBlogFormValues) => Promise<void>;
  submitLabel: string;
  isPending: boolean;
  cancelHref?: string;
}

export function TenantBlogForm({
  initialData,
  onSubmit,
  submitLabel,
  isPending,
  cancelHref = "/dashboard/blog",
}: TenantBlogFormProps) {
  const router = useRouter();
  const [savingDraft, setSavingDraft] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    coverImage: initialData?.coverImage ?? "",
    category: initialData?.category ?? "General",
    tagsCsv: (initialData?.tags ?? []).join(", "),
    readMinutes: initialData?.readMinutes ?? 5,
    author: initialData?.author ?? "",
    isPublished: initialData?.isPublished ?? false,
    isFeatured: initialData?.isFeatured ?? false,
    publishedAt: initialData?.publishedAt
      ? new Date(initialData.publishedAt).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
  });

  const imageMissing = !form.coverImage;
  const blockPublish = form.isPublished && imageMissing;

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function buildPayload(overrides?: Partial<TenantBlogFormValues>): TenantBlogFormValues {
    const tags = form.tagsCsv
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    return {
      title: form.title,
      slug: form.slug ? slugify(form.slug) : slugify(form.title),
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      category: form.category,
      tags,
      readMinutes: Number(form.readMinutes) || 5,
      author: form.author,
      isPublished: form.isPublished,
      isFeatured: form.isFeatured,
      publishedAt: new Date(form.publishedAt).toISOString(),
      ...overrides,
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.content) {
      toast.error("Missing fields", "Title, excerpt and content are required.");
      return;
    }
    if (form.isPublished && !form.coverImage) {
      toast.error(
        "Cover image is required to publish.",
        "Add a cover image or save as draft instead."
      );
      return;
    }
    await onSubmit(buildPayload());
  }

  async function handleSaveDraft() {
    if (!form.title.trim()) {
      toast.error("Title required", "Add at least a title before saving a draft.");
      return;
    }
    if (!form.content.trim()) {
      toast.error("Content required", "Write something before saving a draft.");
      return;
    }
    const excerpt =
      form.excerpt.trim() || plainExcerptFrom(form.content) || form.title.trim();
    setSavingDraft(true);
    try {
      await onSubmit(buildPayload({ excerpt, isPublished: false, isFeatured: false }));
      setForm((prev) => ({ ...prev, isPublished: false, excerpt }));
      toast.success("Draft saved", "Hidden from public. Publish from the toggle when ready.");
    } finally {
      setSavingDraft(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {/* Title */}
      <Field label="Title" required>
        <Input
          type="text"
          required
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="e.g. How we shipped our v2 dashboard in two weeks"
          className="h-10"
        />
      </Field>

      {/* Slug + Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Field label="URL Slug">
          <div className="flex gap-2">
            <Input
              type="text"
              value={form.slug}
              onChange={(e) => setField("slug", e.target.value)}
              placeholder="how-we-shipped-our-v2-dashboard"
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
            Auto-generated from the title if left blank.
          </p>
        </Field>
        <Field label="Category" required>
          <AppSelect
            value={form.category}
            onValueChange={(v) => setField("category", v)}
            options={CATEGORY_OPTIONS}
          />
        </Field>
      </div>

      {/* Excerpt */}
      <Field label="Excerpt" required>
        <Textarea
          required
          rows={3}
          maxLength={320}
          value={form.excerpt}
          onChange={(e) => setField("excerpt", e.target.value)}
          placeholder="A short hook (max 320 characters) shown on listings & meta description."
          className="resize-y"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {form.excerpt.length}/320 characters
        </p>
      </Field>

      {/* Cover image */}
      <Field
        label="Cover Image"
        required={form.isPublished}
        hint={
          form.isPublished
            ? "Required when publishing."
            : "Optional for drafts; required to publish."
        }
      >
        <TenantCoverImagePicker
          value={form.coverImage}
          onChange={(url) => setField("coverImage", url)}
        />
      </Field>

      {/* Content */}
      <Field label="Content (Markdown)" required>
        <Textarea
          required
          rows={20}
          value={form.content}
          onChange={(e) => setField("content", e.target.value)}
          placeholder={`# Heading\n\nWrite your post in **Markdown**.\n\n- Lists\n- Code blocks\n- Links, images, tables — all supported.`}
          className="resize-y font-mono text-xs leading-relaxed"
        />
        <p className="text-xs text-muted-foreground mt-1">
          GitHub-Flavored Markdown is supported.
        </p>
      </Field>

      {/* Meta row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Field label="Author">
          <Input
            type="text"
            value={form.author}
            onChange={(e) => setField("author", e.target.value)}
            placeholder="Your name"
            className="h-10"
          />
        </Field>
        <Field label="Read time (minutes)">
          <Input
            type="number"
            min={1}
            max={120}
            value={form.readMinutes}
            onChange={(e) => setField("readMinutes", Number(e.target.value))}
            className="h-10"
          />
        </Field>
        <Field label="Tags (comma-separated)">
          <Input
            type="text"
            value={form.tagsCsv}
            onChange={(e) => setField("tagsCsv", e.target.value)}
            placeholder="react, performance"
            className="h-10"
          />
        </Field>
        <Field label="Publish date">
          <Input
            type="datetime-local"
            value={form.publishedAt}
            onChange={(e) => setField("publishedAt", e.target.value)}
            className="h-10"
          />
        </Field>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <Switch
            id="tenant-blog-is-published"
            checked={form.isPublished}
            onCheckedChange={(checked) => setField("isPublished", checked)}
            className="data-[state=checked]:bg-emerald-500"
          />
          <Label htmlFor="tenant-blog-is-published" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              {form.isPublished ? (
                <Eye className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
              )}
              {form.isPublished ? "Published" : "Draft"}
            </div>
            <p className="text-xs font-normal text-muted-foreground">
              {form.isPublished
                ? "Visible via your public API and feed"
                : "Hidden — only you can see it"}
            </p>
          </Label>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <Switch
            id="tenant-blog-is-featured"
            checked={form.isFeatured}
            onCheckedChange={(checked) => setField("isFeatured", checked)}
            className="data-[state=checked]:bg-blue-500"
          />
          <Label htmlFor="tenant-blog-is-featured" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              Featured
            </div>
            <p className="text-xs font-normal text-muted-foreground">
              Highlighted in API responses (e.g. ?featured=true)
            </p>
          </Label>
        </div>
      </div>

      {blockPublish && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
          Cover image is required to publish. Use <strong>Save draft</strong> below to save your progress — you can add the image and publish later.
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={isPending || savingDraft || blockPublish}
          className="w-full gap-2 sm:w-auto"
        >
          {isPending && !savingDraft && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
        <Button
          type="button"
          variant={blockPublish ? "default" : "secondary"}
          size="lg"
          onClick={handleSaveDraft}
          disabled={isPending || savingDraft}
          className={`w-full gap-2 sm:w-auto ${
            blockPublish ? "bg-blue-500 hover:bg-blue-600 text-white" : ""
          }`}
        >
          {savingDraft ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          {savingDraft ? "Saving draft..." : "Save draft"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push(cancelHref)}
          disabled={isPending || savingDraft}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
      </div>
    </form>
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
