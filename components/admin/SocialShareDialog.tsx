"use client";

import { useEffect, useState } from "react";
import {
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

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function XLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

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
  if (kind === "project" && slug) return `${base}/portfolio/${slug}`;
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
  // Cache captions per platform so switching tabs doesn't re-hit the API.
  // Only an explicit "Regenerate" click forces a fresh call.
  const [captions, setCaptions] = useState<Partial<Record<SharePlatform, string>>>({});
  const [copied, setCopied] = useState(false);

  const caption = platform ? captions[platform] ?? "" : "";

  const url = buildPublicUrl({ kind, slug, publicUrl });

  // Reset whenever the dialog (re)opens.
  useEffect(() => {
    if (open) {
      setPlatform(null);
      setCaptions({});
      setCopied(false);
      generate.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function setCaption(next: string) {
    if (!platform) return;
    setCaptions((prev) => ({ ...prev, [platform]: next }));
  }

  async function loadCaption(p: SharePlatform, { force = false } = {}) {
    setPlatform(p);
    setCopied(false);
    // Use cached caption when available unless the user asked for a regenerate.
    if (!force && captions[p]) return;
    try {
      const res = await generate.mutateAsync({ kind, id, platform: p, url });
      setCaptions((prev) => ({ ...prev, [p]: res.data.caption }));
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
            <LinkedInIcon className="h-4 w-4" />
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
              onClick={() => loadCaption(platform, { force: true })}
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
                <LinkedInIcon className="h-3.5 w-3.5" />
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
