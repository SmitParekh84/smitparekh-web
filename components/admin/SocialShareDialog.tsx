"use client";

import { useEffect, useState } from "react";
import {
  Linkedin,
  Loader2,
  RefreshCw,
  Copy,
  Check,
  Send,
  X as XIcon,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGenerateShareCaption } from "@/hooks/api/use-social";
import { siteConfig } from "@/data/site";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { SharePlatform, ShareKind } from "@/lib/api/social";

interface SocialShareDialogProps {
  open: boolean;
  onClose: () => void;
  kind: ShareKind;
  id: string;
  title: string;
  slug?: string;
  // Optional override (e.g. external demoLink for projects).
  publicUrl?: string;
}

function buildPublicUrl({
  kind,
  slug,
  publicUrl,
}: {
  kind: ShareKind;
  slug?: string;
  publicUrl?: string;
}) {
  if (publicUrl && /^https?:\/\//i.test(publicUrl)) return publicUrl;
  const base = siteConfig.url.replace(/\/+$/, "");
  if (kind === "blog" && slug) return `${base}/blog/${slug}`;
  // No public per-project page yet — fall back to the projects list anchor.
  if (kind === "project") return `${base}/#projects`;
  return base;
}

function buildIntentUrl(platform: SharePlatform, url: string, caption: string) {
  if (platform === "x") {
    // X intent uses `text` (which can already include the URL); auto-link works either way.
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`;
  }
  // LinkedIn share-offsite ignores any text param — caption goes via clipboard.
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}

export function SocialShareDialog({
  open,
  onClose,
  kind,
  id,
  title,
  slug,
  publicUrl,
}: SocialShareDialogProps) {
  const generate = useGenerateShareCaption();
  const [platform, setPlatform] = useState<SharePlatform | null>(null);
  const [caption, setCaption] = useState("");
  const [copied, setCopied] = useState(false);

  const url = buildPublicUrl({ kind, slug, publicUrl });

  // Reset whenever the dialog (re)opens.
  useEffect(() => {
    if (open) {
      setPlatform(null);
      setCaption("");
      setCopied(false);
      generate.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function loadCaption(p: SharePlatform) {
    setPlatform(p);
    setCopied(false);
    try {
      const res = await generate.mutateAsync({ kind, id, platform: p, url });
      setCaption(res.data.caption);
    } catch (err) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Try again in a moment.";
      toast.error("Couldn't generate caption", msg);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed", "Select the text and copy manually.");
    }
  }

  async function handleShare() {
    if (!platform || !caption.trim()) return;
    // Always copy first so LinkedIn (which has no text param) and X both have it
    // ready for paste if the intent URL truncates.
    try {
      await navigator.clipboard.writeText(caption);
    } catch {
      // Non-fatal; user can copy manually.
    }
    const intent = buildIntentUrl(platform, url, caption);
    window.open(intent, "_blank", "noopener,noreferrer");
    if (platform === "linkedin") {
      toast.success(
        "Caption copied",
        "Paste it into the LinkedIn composer that just opened."
      );
    }
  }

  if (!open) return null;

  const charCount = caption.length;
  const xLimit = 280;
  const overLimit = platform === "x" && charCount > xLimit;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={() => !generate.isPending && onClose()}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start gap-3">
          <div className="rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 p-2 text-white">
            <Send className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold">Share to social</h3>
            <p className="line-clamp-1 text-xs text-muted-foreground">
              {title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={generate.isPending}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted disabled:opacity-50"
            aria-label="Close"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Platform picker */}
        <div className="mb-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => loadCaption("linkedin")}
            disabled={generate.isPending}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
              platform === "linkedin"
                ? "border-[#0A66C2]/60 bg-[#0A66C2]/10 text-[#0A66C2]"
                : "border-border hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5"
            )}
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </button>
          <button
            type="button"
            onClick={() => loadCaption("x")}
            disabled={generate.isPending}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
              platform === "x"
                ? "border-foreground/60 bg-foreground/5 text-foreground"
                : "border-border hover:border-foreground/40 hover:bg-foreground/5"
            )}
          >
            <XIcon className="h-4 w-4" />
            X (Twitter)
          </button>
        </div>

        {/* Body */}
        {!platform ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center">
            <Sparkles className="mx-auto mb-2 h-5 w-5 text-blue-500" />
            <p className="text-sm font-medium">Pick a platform</p>
            <p className="mt-1 text-xs text-muted-foreground">
              AI writes a tailored caption — long-form with bullet points for
              LinkedIn, ≤280 chars for X.
            </p>
          </div>
        ) : generate.isPending && !caption ? (
          <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-10 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Drafting your post…
          </div>
        ) : (
          <>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={platform === "x" ? 5 : 12}
              className={cn(
                "w-full resize-y rounded-xl border bg-background px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2",
                overLimit
                  ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20"
                  : "border-border focus:border-blue-500/60 focus:ring-blue-500/20"
              )}
              placeholder="Caption will appear here..."
            />
            <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
              <span className="truncate">
                Link: <span className="font-mono">{url}</span>
              </span>
              {platform === "x" && (
                <span
                  className={cn(
                    "ml-2 shrink-0 font-medium",
                    overLimit ? "text-red-500" : "text-muted-foreground"
                  )}
                >
                  {charCount}/{xLimit}
                </span>
              )}
            </div>
          </>
        )}

        {/* Actions */}
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
          {platform && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadCaption(platform)}
              disabled={generate.isPending}
              className="gap-1.5"
            >
              {generate.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <RefreshCw className="h-3.5 w-3.5" />
              )}
              Regenerate
            </Button>
          )}
          {platform && caption && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          )}
          {platform && caption && (
            <Button
              type="button"
              size="sm"
              onClick={handleShare}
              disabled={overLimit}
              className="gap-1.5"
            >
              {platform === "linkedin" ? (
                <Linkedin className="h-3.5 w-3.5" />
              ) : (
                <XIcon className="h-3.5 w-3.5" />
              )}
              Open in {platform === "linkedin" ? "LinkedIn" : "X"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
