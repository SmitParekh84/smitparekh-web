"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Star, Eye, EyeOff, Sparkles, FileText, Braces, Copy, Check } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/SocialIcons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AppSelect } from "@/components/ui/app-select";
import { toast } from "@/lib/toast";
import { useGenerateBlog, useGenerateBlogLinkedIn } from "@/hooks/use-blogs";
import { CloudinaryImagePicker } from "@/components/admin/CloudinaryImagePicker";
import { LinkedInArticleModal } from "@/components/admin/LinkedInArticleModal";
import { BlogTopicSuggestions } from "@/components/admin/BlogTopicSuggestions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { BackendBlog, BackendBlogInput } from "@/types";

const CLAUDE_PROMPT = `You are a senior SEO content strategist writing for Smit Parekh's personal portfolio blog.
Services covered: full-stack web development, Next.js, React, Node.js, TypeScript, AI/LLM integration, DevOps, technical consulting.
Target audience: developers, founders, CTOs, hiring managers in US, CA, UK, IN.

Topic: [REPLACE WITH YOUR TOPIC]

Return ONLY a valid JSON object — no prose, no code fence, no markdown around it.

CRITICAL JSON RULES (the import will fail if you break these):
- Inside any string value, EVERY double quote must be escaped as \\". No exceptions.
- Inside the "content" field, dialogue, quoted phrases, and quoted code must use \\" — e.g. \\"Explain @Injectable()\\" — never raw " marks.
- Use \\n for paragraph breaks inside "content".
- Do not wrap the response in triple backtick fences.

Schema:
{
  "title": "50-65 chars. Primary keyword near start. Title Case. No emojis.",
  "excerpt": "140-160 chars meta description. Primary keyword once. Ends with an action verb.",
  "content": "Full article in GitHub-Flavored Markdown, 1100-1700 words. Do NOT repeat the title as an H1 heading.",
  "category": "MUST be exactly one of: Web Development, React, Next.js, Node.js, TypeScript, DevOps, Career, AI / ML, Tutorial, Case Study, General",
  "tags": ["3 to 6 short lowercase tags"],
  "readMinutes": 7
}`;

const CATEGORY_OPTIONS = [
  "Web Development",
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "DevOps",
  "Career",
  "AI / ML",
  "Tutorial",
  "Case Study",
  "General",
];

interface BlogFormProps {
  initialData?: Partial<BackendBlog>;
  onSubmit: (data: BackendBlogInput) => Promise<void>;
  submitLabel: string;
  isPending: boolean;
}

// Accept JSON where string values contain literal newlines/tabs OR
// unescaped double quotes (both common when an LLM returns long-form
// Markdown content). Strict JSON.parse rejects those; we walk the input
// and rewrite control chars + heuristically detect literal " inside a
// string by looking ahead at the next non-whitespace char.
//
// A " is treated as a real string terminator only if the next non-space
// char is one of , } ] : (or end of input). Otherwise it's escaped to \".
// This handles the typical case where an LLM forgets to escape inline
// quotes inside Markdown content like:  "Explain `@Injectable()`."
function tolerantJsonParse(input: string): unknown {
  try {
    return JSON.parse(input);
  } catch {
    let out = "";
    let inString = false;
    let escaped = false;
    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      if (escaped) { out += ch; escaped = false; continue; }
      if (ch === "\\") { out += ch; escaped = true; continue; }
      if (ch === '"') {
        if (!inString) {
          inString = true;
          out += ch;
          continue;
        }
        // Look ahead for next non-whitespace char to decide if this " is
        // a real string terminator or a literal quote inside content.
        let j = i + 1;
        while (j < input.length && /\s/.test(input[j])) j++;
        const next = j < input.length ? input[j] : "";
        const isTerminator = next === "" || next === "," || next === "}" || next === "]" || next === ":";
        if (isTerminator) {
          inString = false;
          out += ch;
        } else {
          out += '\\"';
        }
        continue;
      }
      if (inString) {
        if (ch === "\n") { out += "\\n"; continue; }
        if (ch === "\r") { out += "\\r"; continue; }
        if (ch === "\t") { out += "\\t"; continue; }
      }
      out += ch;
    }
    return JSON.parse(out);
  }
}

// Single-line fields (title, excerpt) should never contain newlines or
// runs of whitespace — these creep in when JSON is copied from a chat
// transcript that hard-wraps long lines.
function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

// Markdown content needs its newlines (paragraph breaks, lists, headings,
// code blocks) but chat-wrap injects extra single \n inside paragraphs.
// Strategy: leave fenced code blocks alone; outside code, replace a single
// \n with a space ONLY if the next line is plain prose (not a heading,
// list, blockquote, table, code marker, or blank line).
function normalizeMarkdown(value: string): string {
  const parts = value.replace(/\r\n/g, "\n").split(/(```[\s\S]*?```)/g);
  return parts
    .map((part, i) => {
      if (i % 2 === 1) return part; // fenced code — preserve verbatim
      return part
        .replace(/([^\n])\n(?![\n#\-*>|`\s\d])/g, "$1 ")
        .replace(/[ \t]{2,}/g, " ");
    })
    .join("")
    .trim();
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

export function BlogForm({
  initialData,
  onSubmit,
  submitLabel,
  isPending,
}: BlogFormProps) {
  const router = useRouter();
  const generateBlog = useGenerateBlog();
  const generateLinkedIn = useGenerateBlogLinkedIn();
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [liOpen, setLiOpen] = useState(false);
  const [liData, setLiData] = useState<{ headline: string; body: string; hashtags: string[]; charCount: number } | null>(null);

  const [savingDraft, setSavingDraft] = useState(false);
  const [jsonOpen, setJsonOpen] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [promptCopied, setPromptCopied] = useState(false);
  const [jsonCopied, setJsonCopied] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    coverImage: initialData?.coverImage ?? "",
    category: initialData?.category ?? "Web Development",
    tagsCsv: (initialData?.tags ?? []).join(", "),
    readMinutes: initialData?.readMinutes ?? 5,
    author: initialData?.author ?? "Smit Parekh",
    isPublished: initialData?.isPublished ?? true,
    isFeatured: initialData?.isFeatured ?? false,
    site: (initialData?.site ?? "smit") as "smit" | "marketixpert",
    publishedAt: initialData?.publishedAt
      ? new Date(initialData.publishedAt).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
  });

  const imageMissing = !form.coverImage;
  const blockPublish = form.isPublished && imageMissing;

  // Hydrate from session-storage AI draft generated on the listing page
  // (admin/blogs?ai=1 → POST /generate → sessionStorage → navigate here).
  useEffect(() => {
    if (initialData?._id) return; // editing an existing post - never overwrite
    if (typeof window === "undefined") return;
    if (!new URLSearchParams(window.location.search).has("ai")) return;
    const raw = sessionStorage.getItem("blog-ai-draft");
    if (!raw) return;
    try {
      const ai = JSON.parse(raw) as {
        title?: string;
        excerpt?: string;
        content?: string;
        category?: string;
        tags?: string[];
        readMinutes?: number;
      };
      setForm((prev) => ({
        ...prev,
        title: ai.title || prev.title,
        slug: prev.slug || slugify(ai.title || ""),
        excerpt: ai.excerpt || prev.excerpt,
        content: ai.content || prev.content,
        category: ai.category || prev.category,
        tagsCsv:
          Array.isArray(ai.tags) && ai.tags.length
            ? ai.tags.join(", ")
            : prev.tagsCsv,
        readMinutes: ai.readMinutes || prev.readMinutes,
      }));
      toast.success("AI draft loaded", "Add a cover image, review, and save.");
    } catch {
      // ignore - corrupted draft
    } finally {
      sessionStorage.removeItem("blog-ai-draft");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleGenerate() {
    const prompt = aiPrompt.trim();
    if (!prompt) {
      toast.error("Enter a topic", "Type a title or short prompt for the AI.");
      return;
    }
    try {
      const res = await generateBlog.mutateAsync(prompt);
      const ai = res.data;
      setForm((prev) => ({
        ...prev,
        title: ai.title || prev.title,
        slug: prev.slug || slugify(ai.title || prev.title),
        excerpt: ai.excerpt || prev.excerpt,
        content: ai.content || prev.content,
        category: ai.category || prev.category,
        tagsCsv: Array.isArray(ai.tags) && ai.tags.length ? ai.tags.join(", ") : prev.tagsCsv,
        readMinutes: ai.readMinutes || prev.readMinutes,
      }));
      toast.success("Draft generated", "Review and edit before saving.");
      setAiOpen(false);
      setAiPrompt("");
    } catch (err) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Try again in a moment.";
      toast.error("AI generation failed", msg);
    }
  }

  async function handleGenerateLinkedIn() {
    if (!form.title || !form.content) {
      toast.error("Missing content", "Fill in the title and content first.");
      return;
    }
    try {
      const res = await generateLinkedIn.mutateAsync({
        title: form.title,
        content: form.content,
        excerpt: form.excerpt,
        tags: form.tagsCsv.split(",").map(t => t.trim()).filter(Boolean),
        category: form.category,
        articleUrl: form.slug ? `https://www.smitparekh.co.in/blog/${form.slug}` : undefined,
      });
      setLiData(res.data);
      setLiOpen(true);
    } catch {
      toast.error("Generation failed", "Could not generate LinkedIn article. Try again.");
    }
  }

  function handleCopyPrompt() {
    navigator.clipboard.writeText(CLAUDE_PROMPT).then(() => {
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
    });
  }

  // Snapshot the current form into the JSON shape the Import JSON dialog
  // (and the Claude prompt) expect. Slug, cover image, author, isPublished
  // and dates are intentionally excluded — those are owned by the form,
  // not the SEO content the LLM rewrites.
  function handleCopyAsJson() {
    const tags = form.tagsCsv
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = {
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      tags,
      readMinutes: form.readMinutes,
    };
    const text = JSON.stringify(payload, null, 2);
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      toast.error("Copy failed", "Clipboard not available in this browser.");
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        setJsonCopied(true);
        setTimeout(() => setJsonCopied(false), 2000);
        toast.success(
          "Copied as JSON",
          "Paste into Claude with the SEO prompt, then return the result via Paste JSON."
        );
      },
      () => toast.error("Copy failed", "Could not write to clipboard.")
    );
  }

  function handleBeautifyJson() {
    if (!jsonText.trim()) return;
    try {
      const parsed = tolerantJsonParse(jsonText.trim());
      setJsonText(JSON.stringify(parsed, null, 2));
      setJsonError(null);
    } catch (err) {
      const detail = err instanceof Error ? err.message : "unknown error";
      setJsonError(`Cannot beautify — ${detail}`);
    }
  }

  function handleImportJson() {
    setJsonError(null);
    let parsed: unknown;
    try {
      parsed = tolerantJsonParse(jsonText.trim());
    } catch (err) {
      const detail = err instanceof Error ? err.message : "unknown error";
      setJsonError(`Invalid JSON: ${detail}`);
      return;
    }
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      setJsonError("Expected a JSON object, not an array or primitive.");
      return;
    }
    const obj = parsed as Record<string, unknown>;
    const missing: string[] = [];
    if (!obj.title || typeof obj.title !== "string" || !obj.title.trim()) missing.push('"title"');
    if (!obj.excerpt || typeof obj.excerpt !== "string" || !obj.excerpt.trim()) missing.push('"excerpt"');
    if (!obj.content || typeof obj.content !== "string" || !obj.content.trim()) missing.push('"content"');
    if (missing.length) {
      setJsonError(`Missing required fields: ${missing.join(", ")}`);
      return;
    }
    const rawCat = typeof obj.category === "string" ? obj.category.trim() : "";
    const category = CATEGORY_OPTIONS.includes(rawCat) ? rawCat : "Web Development";
    const tags = Array.isArray(obj.tags)
      ? (obj.tags as unknown[]).filter((t): t is string => typeof t === "string").map((t) => t.trim()).filter(Boolean)
      : [];
    const readMinutes =
      typeof obj.readMinutes === "number" && obj.readMinutes > 0 ? Math.round(obj.readMinutes) : 5;
    const normTitle = collapseWhitespace(obj.title as string);
    const normExcerpt = collapseWhitespace(obj.excerpt as string);
    setForm((prev) => ({
      ...prev,
      title: normTitle,
      slug: prev.slug || slugify(normTitle),
      excerpt: normExcerpt,
      content: normalizeMarkdown(obj.content as string),
      category,
      tagsCsv: tags.join(", "),
      readMinutes,
    }));
    const note =
      rawCat && !CATEGORY_OPTIONS.includes(rawCat)
        ? `Category "${rawCat}" not recognised — defaulted to "Web Development". Change if needed.`
        : "Add a cover image and review before publishing.";
    toast.success("JSON imported", note);
    setJsonOpen(false);
    setJsonText("");
    setJsonError(null);
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
    const tags = form.tagsCsv
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    await onSubmit({
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
      site: form.site,
      publishedAt: new Date(form.publishedAt).toISOString(),
    });
  }

  // Strip markdown so we can auto-derive a draft excerpt from content.
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

  async function handleSaveDraft() {
    if (!form.title.trim()) {
      toast.error("Title required", "Add at least a title before saving a draft.");
      return;
    }
    if (!form.content.trim()) {
      toast.error("Content required", "Write something - even a rough outline - before saving a draft.");
      return;
    }

    const tags = form.tagsCsv
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const excerpt =
      form.excerpt.trim() || plainExcerptFrom(form.content) || form.title.trim();

    setSavingDraft(true);
    try {
      await onSubmit({
        title: form.title,
        slug: form.slug ? slugify(form.slug) : slugify(form.title),
        excerpt,
        content: form.content,
        coverImage: form.coverImage,
        category: form.category,
        tags,
        site: form.site,
        readMinutes: Number(form.readMinutes) || 5,
        author: form.author,
        isPublished: false,
        isFeatured: false,
        publishedAt: new Date(form.publishedAt).toISOString(),
      });
      // Reflect draft state in the UI in case the user stays on the page.
      setForm((prev) => ({ ...prev, isPublished: false, excerpt }));
      toast.success("Draft saved", "Hidden from /blog. Publish from the toggle when ready.");
    } finally {
      setSavingDraft(false);
    }
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
                Type a topic or title - AI fills the form. You can edit before saving.
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
              onClick={handleCopyAsJson}
              disabled={!form.title && !form.content}
              title="Copy current title, excerpt, content, category, tags & read time as JSON to send to Claude for SEO rewriting"
              className="gap-1.5"
            >
              {jsonCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy as JSON
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => { setJsonOpen(true); setJsonError(null); }}
              className="gap-1.5"
            >
              <Braces className="h-3.5 w-3.5" />
              Paste JSON
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
          if (!generateBlog.isPending) setAiOpen(o);
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-2 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <DialogTitle>Generate blog draft</DialogTitle>
                <DialogDescription>
                  Be specific. Mention audience, angle, or keywords for better output.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div>
            <Textarea
              autoFocus
              rows={4}
              maxLength={4000}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={generateBlog.isPending}
              placeholder="e.g. How to deploy Next.js 16 on Vercel with ISR, written for junior developers"
              className="resize-y"
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">
              {aiPrompt.length}/4000
            </p>

            <BlogTopicSuggestions
              onPick={(t) => setAiPrompt(t)}
              disabled={generateBlog.isPending}
            />

            {form.title && (
              <p className="mt-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-600 dark:text-amber-400">
                This will overwrite Title, Excerpt, Content, Category, Tags & Read time.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAiOpen(false)}
              disabled={generateBlog.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleGenerate}
              disabled={generateBlog.isPending || !aiPrompt.trim()}
              className="gap-1.5"
            >
              {generateBlog.isPending ? (
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

      {/* JSON Import Dialog */}
      <Dialog open={jsonOpen} onOpenChange={(o) => { setJsonOpen(o); if (!o) { setJsonText(""); setJsonError(null); } }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 p-2 text-white">
                <Braces className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <DialogTitle>Import from JSON</DialogTitle>
                <DialogDescription>
                  Paste Claude/LLM output to auto-fill title, excerpt, content,
                  category, tags & read time. Slug, cover image, author and
                  publish date are preserved.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            {/* Claude prompt helper */}
            <div className="rounded-xl border border-border bg-muted/40 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Need a JSON? Copy this prompt → paste into Claude.ai → replace the topic → copy the output back here.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyPrompt}
                  className="shrink-0 gap-1.5 text-xs"
                >
                  {promptCopied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy prompt
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* JSON textarea */}
            <div>
              <Textarea
                autoFocus
                rows={12}
                value={jsonText}
                onChange={(e) => { setJsonText(e.target.value); setJsonError(null); }}
                placeholder={'{\n  "title": "...",\n  "excerpt": "...",\n  "content": "...",\n  "category": "Next.js",\n  "tags": ["nextjs", "performance"],\n  "readMinutes": 6\n}'}
                className="resize-y font-mono text-xs leading-relaxed"
              />
              {jsonError && (
                <p className="mt-1.5 text-xs text-destructive">{jsonError}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setJsonOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleBeautifyJson}
              disabled={!jsonText.trim()}
              className="gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Beautify
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleImportJson}
              disabled={!jsonText.trim()}
              className="gap-1.5"
            >
              <Braces className="h-3.5 w-3.5" />
              Apply to form
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
          placeholder="e.g. Building a real-time dashboard with Next.js 16"
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
              placeholder="building-a-real-time-dashboard"
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
            Used in /blog/&lt;slug&gt;. Auto-generated from title if blank.
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
          placeholder="A short hook (max 320 characters) shown on listing & meta description."
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
        <CloudinaryImagePicker
          kind="blog"
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
          placeholder={`# Heading\n\nWrite your blog post in **Markdown**.\n\n- Lists\n- Code blocks\n- Links, images, tables - all supported.`}
          className="resize-y font-mono text-xs leading-relaxed"
        />
        <p className="text-xs text-muted-foreground mt-1">
          GitHub-Flavored Markdown is supported (headings, lists, code blocks, tables, links).
        </p>
      </Field>

      {/* Meta row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Field label="Author">
          <Input
            type="text"
            value={form.author}
            onChange={(e) => setField("author", e.target.value)}
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
            placeholder="React, Next.js, Performance"
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
            id="blog-is-published"
            checked={form.isPublished}
            onCheckedChange={(checked) => setField("isPublished", checked)}
            className="data-[state=checked]:bg-emerald-500"
          />
          <Label htmlFor="blog-is-published" className="flex-1 cursor-pointer">
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
                ? "Visible on /blog"
                : "Hidden from public site"}
            </p>
          </Label>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
          <Switch
            id="blog-is-featured"
            checked={form.isFeatured}
            onCheckedChange={(checked) => setField("isFeatured", checked)}
            className="data-[state=checked]:bg-blue-500"
          />
          <Label htmlFor="blog-is-featured" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              Feature on /blog
            </div>
            <p className="text-xs font-normal text-muted-foreground">
              Show this post in the hero featured slot
            </p>
          </Label>
        </div>
      </div>

      {/* Target site */}
      <div className="rounded-xl border border-border bg-card px-4 py-3">
        <p className="mb-2 text-sm font-medium">Target Site</p>
        <div className="flex gap-2">
          {(["smit", "marketixpert"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setField("site", s)}
              className={`rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors ${
                form.site === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              }`}
            >
              {s === "smit" ? "smitparekh.co.in" : "marketixpert.com"}
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          {form.site === "marketixpert"
            ? "This post will appear on marketixpert.com/posts"
            : "This post will appear on smitparekh.co.in/blog"}
        </p>
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
          className={`w-full gap-2 sm:w-auto ${blockPublish ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}`}
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
          onClick={() => router.push("/admin/blogs")}
          disabled={isPending || savingDraft}
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
