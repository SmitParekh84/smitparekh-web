"use client";

import { useState } from "react";
import { Download, ExternalLink, Play } from "lucide-react";

type Quality = {
  label: string;
  suffix: string;
  size: string;
};

const QUALITIES: Quality[] = [
  { label: "Max Resolution", suffix: "maxresdefault", size: "1280 × 720" },
  { label: "High Quality", suffix: "hqdefault", size: "480 × 360" },
  { label: "Medium Quality", suffix: "mqdefault", size: "320 × 180" },
  { label: "Standard", suffix: "sddefault", size: "640 × 480" },
];

function extractVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtube.com")) {
      if (url.searchParams.get("v")) return url.searchParams.get("v");
      const m = url.pathname.match(/\/(embed|shorts|v)\/([a-zA-Z0-9_-]{11})/);
      if (m) return m[2];
    }
    if (url.hostname === "youtu.be") return url.pathname.slice(1).split("?")[0];
  } catch {
    const m = trimmed.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
    if (m) return m[1];
  }
  return null;
}

function thumbUrl(videoId: string, suffix: string) {
  return `https://img.youtube.com/vi/${videoId}/${suffix}.jpg`;
}

export default function YouTubeThumbnailDownloader() {
  const [input, setInput] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  function handleFetch() {
    setError("");
    const id = extractVideoId(input);
    if (!id) {
      setError("Could not find a YouTube video ID. Paste the full URL or the 11-character video ID.");
      setVideoId(null);
      return;
    }
    setVideoId(id);
    setHidden(new Set());
  }

  async function handleDownload(suffix: string) {
    if (!videoId) return;
    const url = thumbUrl(videoId, suffix);
    setDownloading(suffix);
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const obj = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = obj;
      a.download = `yt-thumbnail-${videoId}-${suffix}.jpg`;
      a.click();
      URL.revokeObjectURL(obj);
    } catch {
      window.open(url, "_blank");
    } finally {
      setDownloading(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="text-sm font-medium">YouTube URL or Video ID</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Play className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFetch()}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 transition-shadow"
            />
          </div>
          <button
            onClick={handleFetch}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            Get Thumbnails
          </button>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <p className="text-xs text-muted-foreground">
          Supports youtube.com/watch, youtu.be, Shorts, /embed/, and bare video IDs
        </p>
      </div>

      {videoId && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {QUALITIES.filter((q) => !hidden.has(q.suffix)).map((q) => {
            const url = thumbUrl(videoId, q.suffix);
            return (
              <div key={q.suffix} className="rounded-xl border border-border bg-muted/20 overflow-hidden">
                <div className="relative aspect-video bg-muted flex items-center justify-center">
                  <img
                    src={url}
                    alt={`${q.label} YouTube thumbnail`}
                    className="w-full h-full object-cover"
                    onError={() => setHidden((prev) => new Set([...prev, q.suffix]))}
                  />
                </div>
                <div className="flex items-center justify-between p-3 gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{q.label}</p>
                    <p className="text-[10px] text-muted-foreground">{q.size}</p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-7 h-7 rounded-lg border border-border hover:bg-muted transition-colors"
                      title="Open full size"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => handleDownload(q.suffix)}
                      disabled={downloading === q.suffix}
                      className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600 transition-colors disabled:opacity-60"
                    >
                      <Download className="w-3 h-3" />
                      {downloading === q.suffix ? "Saving…" : "Download"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
