"use client";

import { useState } from "react";
import { Download, Video, Image as ImageIcon, ExternalLink, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDownloadLinkedInMedia } from "@/hooks/api/use-tools";
import { toast } from "@/lib/toast";

export default function LinkedInMediaDownloader() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<{ mediaUrl?: string; type?: "image" | "video"; message?: string } | null>(null);
  const mutation = useDownloadLinkedInMedia();

  const download = () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    mutation.mutate(
      { url: trimmed },
      {
        onSuccess: (res) => {
          setResult(res);
          if (!res.mediaUrl) {
            toast.error("No media found", "Make sure the post contains an image or video.");
          }
        },
        onError: () => {
          toast.error("Download failed", "Make sure the URL is a valid LinkedIn post URL.");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">LinkedIn Post URL</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && download()}
            placeholder="https://www.linkedin.com/posts/…"
            className="flex-1 rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
          />
          <button
            onClick={download}
            disabled={!url.trim() || mutation.isPending}
            className="rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold px-5 py-3 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {mutation.isPending ? "Fetching…" : "Get Media"}
          </button>
        </div>
      </div>

      {/* How to get URL */}
      <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
        <p className="text-xs font-semibold flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-500" />
          How to get the post URL
        </p>
        <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
          <li>Open LinkedIn and find the post with the video or image</li>
          <li>Click the three-dot menu (⋯) on the post</li>
          <li>Select &quot;Copy link to post&quot;</li>
          <li>Paste the URL above</li>
        </ol>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {result.mediaUrl ? (
              <div className="rounded-xl border border-border bg-card p-5 space-y-4">
                <div className="flex items-center gap-2">
                  {result.type === "video" ? (
                    <Video className="w-5 h-5 text-blue-500" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-cyan-400" />
                  )}
                  <p className="text-sm font-semibold capitalize">{result.type || "Media"} found</p>
                </div>

                {result.type === "image" && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={result.mediaUrl} alt="LinkedIn media" className="rounded-lg max-h-64 object-contain w-full" />
                )}

                <div className="flex gap-2">
                  <a
                    href={result.mediaUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2.5 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download {result.type === "video" ? "Video" : "Image"}
                  </a>
                  <a
                    href={result.mediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card hover:bg-muted/50 text-muted-foreground text-sm px-4 py-2.5 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
                <p className="text-sm text-red-400">
                  {result.message || "No downloadable media found in this post."}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
