"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { useUploadProjectImage } from "@/hooks/use-projects";
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

export function ProjectForm({
  initialData,
  onSubmit,
  submitLabel,
  isPending,
}: ProjectFormProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadImage = useUploadProjectImage();

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    categories: initialData?.categories ?? [],
    shortDescription: initialData?.shortDescription ?? "",
    detailMarkdown: initialData?.detailMarkdown ?? "",
    imageUrl: initialData?.imageUrl ?? "",
    repoLink: initialData?.repoLink ?? "",
    demoLink: initialData?.demoLink ?? "",
    demoBtn: initialData?.demoBtn ?? "View Live Demo",
    isShowcased: initialData?.isShowcased ?? false,
  });

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
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
    await onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
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

      {/* Showcased */}
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <div
          onClick={() => setField("isShowcased", !form.isShowcased)}
          className={cn(
            "relative w-10 h-5 rounded-full transition-colors",
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
            Show this project in the featured section
          </p>
        </div>
      </label>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            buttonVariants({ size: "lg" }),
            "gap-2",
            isPending && "opacity-70 cursor-not-allowed"
          )}
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
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
