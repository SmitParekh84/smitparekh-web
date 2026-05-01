"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/SocialIcons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface LinkedInArticleData {
  headline: string;
  body: string;
  hashtags: string[];
  charCount: number;
}

interface LinkedInArticleModalProps {
  open: boolean;
  onClose: () => void;
  data: LinkedInArticleData | null;
}

export function LinkedInArticleModal({ open, onClose, data }: LinkedInArticleModalProps) {
  const [copied, setCopied] = useState<"headline" | "body" | "all" | null>(null);

  function copy(type: "headline" | "body" | "all") {
    if (!data) return;
    const text =
      type === "headline"
        ? data.headline
        : type === "body"
        ? data.body
        : `${data.headline}\n\n${data.body}\n\n${data.hashtags.map(h => `#${h}`).join(" ")}`;
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }

  const hashtagString = data?.hashtags.map(h => `#${h}`).join(" ") ?? "";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LinkedInIcon className="w-5 h-5 text-blue-600" />
            LinkedIn Article
          </DialogTitle>
          <DialogDescription>
            Copy and paste directly into LinkedIn.{" "}
            {data && (
              <span className="text-muted-foreground">
                {data.charCount.toLocaleString()} chars total.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {data && (
          <div className="space-y-4 mt-2">
            {/* Headline */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Headline
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs gap-1.5"
                  onClick={() => copy("headline")}
                >
                  {copied === "headline" ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied === "headline" ? "Copied!" : "Copy"}
                </Button>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm font-medium">
                {data.headline}
              </div>
            </div>

            {/* Body */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Article Body
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs gap-1.5"
                  onClick={() => copy("body")}
                >
                  {copied === "body" ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied === "body" ? "Copied!" : "Copy"}
                </Button>
              </div>
              <textarea
                readOnly
                value={data.body}
                rows={12}
                className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm resize-none focus:outline-none font-mono leading-relaxed"
              />
            </div>

            {/* Hashtags */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Hashtags
              </span>
              <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-blue-500 font-medium">
                {hashtagString}
              </div>
            </div>

            {/* Copy All */}
            <Button className="w-full gap-2" onClick={() => copy("all")}>
              {copied === "all" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied === "all" ? "Copied Everything!" : "Copy Headline + Body + Hashtags"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
