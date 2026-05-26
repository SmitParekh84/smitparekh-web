"use client";

import { useState } from "react";
import {
  Search, CheckCircle2, AlertCircle, XCircle, Copy, Check,
  ExternalLink, Globe,
} from "lucide-react";

const XBrandIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInBrandIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { metaApi } from "@/lib/api";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

type Tags = Record<string, string | string[] | undefined>;

// ── helpers ────────────────────────────────────────────────────────────────

const IMPORTANT_TAGS = [
  "title", "description", "og:title", "og:description",
  "og:image", "og:url", "twitter:card", "twitter:title", "canonical",
];

function val(tags: Tags, ...keys: string[]): string {
  for (const k of keys) {
    const v = tags[k];
    if (v) return Array.isArray(v) ? v[0] : v;
  }
  return "";
}

function tagStatus(key: string, value: string | string[] | undefined): "good" | "warn" | "missing" {
  if (!value || (Array.isArray(value) && !value[0])) return "missing";
  const str = Array.isArray(value) ? value[0] : value;
  if (key === "title" && (str.length < 30 || str.length > 60)) return "warn";
  if (key === "description" && (str.length < 70 || str.length > 160)) return "warn";
  return "good";
}

function CharBar({ value, min, max }: { value: string; min: number; max: number }) {
  const len = value.length;
  const pct = Math.min(100, (len / (max * 1.1)) * 100);
  const good = len >= min && len <= max;
  const over = len > max;
  return (
    <div className="mt-1.5 space-y-0.5">
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", good ? "bg-emerald-500" : over ? "bg-red-400" : "bg-amber-400")}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={cn("text-xs", good ? "text-emerald-600" : over ? "text-red-400" : "text-amber-500")}>
        {len} chars — {good ? "optimal" : over ? `${len - max} over limit` : `aim for ${min}–${max}`}
      </p>
    </div>
  );
}

function StatusIcon({ status }: { status: "good" | "warn" | "missing" }) {
  if (status === "good") return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
  if (status === "warn") return <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />;
  return <XCircle className="w-4 h-4 text-red-400 shrink-0" />;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      title={`Copy ${label}`}
      className="shrink-0 rounded-lg border border-border bg-muted/40 p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

// ── platform preview cards ──────────────────────────────────────────────────

function GoogleCard({ title, description, url }: { title: string; description: string; url: string }) {
  const host = url ? (() => { try { return new URL(url).hostname; } catch { return url; } })() : "";
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-0.5 max-w-lg">
      <p className="text-xs text-muted-foreground">{host || "example.com"}</p>
      <p className="text-base text-blue-600 dark:text-blue-400 font-medium leading-snug line-clamp-1">
        {title || "Page Title"}
      </p>
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {description || "No description available."}
      </p>
    </div>
  );
}

function SocialCard({
  platform, title, description, image, url, icon: Icon, accent,
}: {
  platform: string; title: string; description: string;
  image: string; url: string;
  icon: React.FC<{ className?: string }>; accent: string;
}) {
  const host = url ? (() => { try { return new URL(url).hostname; } catch { return url; } })() : "example.com";
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden max-w-sm">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt="OG preview"
          className="w-full h-36 object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      ) : (
        <div className="w-full h-36 bg-muted/50 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">No image</p>
        </div>
      )}
      <div className="p-3 space-y-0.5">
        <div className={cn("flex items-center gap-1.5 text-xs font-semibold", accent)}>
          <Icon className="w-3.5 h-3.5" /> {platform}
        </div>
        <p className="text-sm font-medium line-clamp-1">{title || "Page Title"}</p>
        <p className="text-xs text-muted-foreground line-clamp-2">{description || "No description."}</p>
        <p className="text-xs text-muted-foreground/60">{host}</p>
      </div>
    </div>
  );
}

// ── main component ──────────────────────────────────────────────────────────

export default function MetaTagChecker() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<Tags | null>(null);

  const mutation = useMutation({
    mutationFn: (u: string) => metaApi.getTags(u),
    onSuccess: (d) => setData(d as Tags),
    onError: () => toast.error("Failed to fetch", "Make sure the URL is accessible and includes https://"),
  });

  const check = () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    const withProtocol = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    mutation.mutate(withProtocol);
  };

  const important = IMPORTANT_TAGS.map((key) => ({
    key,
    value: data?.[key],
    status: data ? tagStatus(key, data[key]) : ("missing" as const),
  }));

  const allEntries = data ? Object.entries(data) : [];
  const otherEntries = allEntries.filter(([k]) => !IMPORTANT_TAGS.includes(k));

  const title       = data ? val(data, "title", "og:title", "twitter:title") : "";
  const description = data ? val(data, "description", "og:description", "twitter:description") : "";
  const image       = data ? val(data, "og:image", "twitter:image") : "";
  const pageUrl     = data ? val(data, "og:url", "canonical") : url;
  const siteName    = data ? val(data, "og:site_name") : "";
  const keywords    = data ? val(data, "keywords") : "";
  const favicon     = data ? val(data, "favicon") : "";

  const good    = important.filter((e) => e.status === "good").length;
  const warn    = important.filter((e) => e.status === "warn").length;
  const missing = important.filter((e) => e.status === "missing").length;

  return (
    <div className="space-y-6">
      {/* ── Input ────────────────────────────────────────────────────────── */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
            https://
          </span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="example.com"
            className="w-full rounded-xl border border-border bg-muted/30 pl-16 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
          />
        </div>
        <button
          onClick={check}
          disabled={!url.trim() || mutation.isPending}
          className="rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-5 py-3 font-semibold transition-colors flex items-center gap-2 shrink-0"
        >
          <Search className="w-4 h-4" />
          {mutation.isPending ? "Checking…" : "Check"}
        </button>
      </div>

      {/* ── Loading ──────────────────────────────────────────────────────── */}
      {mutation.isPending && (
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
          <p className="text-sm text-muted-foreground">Fetching meta tags…</p>
        </div>
      )}

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {data && !mutation.isPending && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Score summary pills */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Good",    count: good,    color: "text-emerald-500", bg: "bg-emerald-500/8 border-emerald-500/20" },
                { label: "Warning", count: warn,    color: "text-amber-500",   bg: "bg-amber-500/8 border-amber-500/20" },
                { label: "Missing", count: missing, color: "text-red-400",     bg: "bg-red-500/8 border-red-500/20" },
              ].map(({ label, count, color, bg }) => (
                <div key={label} className={cn("rounded-xl border p-3 text-center", bg)}>
                  <p className={cn("text-2xl font-bold", color)}>{count}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* Key tag fields with copy + char bar */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <p className="text-sm font-semibold">Key SEO Tags</p>
              </div>
              <div className="divide-y divide-border">
                {important.map(({ key, value, status }) => {
                  const str = Array.isArray(value) ? value[0] : (value ?? "");
                  return (
                    <div key={key} className="px-4 py-3">
                      <div className="flex items-start gap-3">
                        <StatusIcon status={status} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-mono text-muted-foreground">{key}</p>
                          {str ? (
                            <p className="text-sm mt-0.5 break-words">{str}</p>
                          ) : (
                            <p className="text-sm mt-0.5 text-red-400 italic">Not found</p>
                          )}
                          {str && (key === "title" || key === "description") && (
                            <CharBar
                              value={str}
                              min={key === "title" ? 30 : 70}
                              max={key === "title" ? 60 : 160}
                            />
                          )}
                        </div>
                        {str && <CopyButton text={str} label={key} />}
                      </div>
                    </div>
                  );
                })}

                {/* Keywords */}
                {keywords && (
                  <div className="px-4 py-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono text-muted-foreground">keywords</p>
                        <p className="text-sm mt-0.5 break-words">{keywords}</p>
                      </div>
                      <CopyButton text={keywords} label="keywords" />
                    </div>
                  </div>
                )}

                {/* Site name */}
                {siteName && (
                  <div className="px-4 py-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-mono text-muted-foreground">og:site_name</p>
                        <p className="text-sm mt-0.5">{siteName}</p>
                      </div>
                      <CopyButton text={siteName} label="site name" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* OG Image + Favicon */}
            {(image || favicon) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {image && (
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-border bg-muted/30">
                      <p className="text-xs font-semibold">OG Image</p>
                    </div>
                    <div className="p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt="Open Graph"
                        className="w-full h-32 object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const el = e.currentTarget;
                          el.style.display = "none";
                          el.nextElementSibling?.removeAttribute("hidden");
                        }}
                      />
                      <div hidden className="w-full h-32 rounded-lg bg-muted/40 flex items-center justify-center">
                        <p className="text-xs text-muted-foreground">Image blocked by browser policy</p>
                      </div>
                      <a
                        href={image} target="_blank" rel="noopener noreferrer"
                        className="mt-2 flex items-center gap-1 text-xs text-blue-500 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" /> View full image
                      </a>
                    </div>
                  </div>
                )}

                {favicon && (
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-border bg-muted/30">
                      <p className="text-xs font-semibold">Favicon</p>
                    </div>
                    <div className="p-3 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={favicon}
                        alt="Favicon"
                        className="w-10 h-10 rounded-lg object-contain bg-muted/40 p-1"
                        referrerPolicy="no-referrer"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.3"; }}
                      />
                      <a
                        href={favicon} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" /> View favicon
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Platform preview cards */}
            <div className="space-y-3">
              <p className="text-sm font-semibold">Platform Previews</p>
              <p className="text-xs text-muted-foreground -mt-1">
                How your page appears in search and social media.
              </p>

              <div className="grid gap-4">
                {/* Google */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Google
                  </p>
                  <GoogleCard title={title} description={description} url={pageUrl || url} />
                </div>

                {/* Social cards in 2-col on sm+ */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                      <XBrandIcon className="w-3.5 h-3.5" /> Twitter / X
                    </p>
                    <SocialCard
                      platform="Twitter / X" title={title} description={description}
                      image={image} url={pageUrl || url}
                      icon={XBrandIcon} accent="text-foreground"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                      <FacebookIcon className="w-3.5 h-3.5" /> Facebook
                    </p>
                    <SocialCard
                      platform="Facebook" title={title} description={description}
                      image={image} url={pageUrl || url}
                      icon={FacebookIcon} accent="text-blue-600"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                      <LinkedInBrandIcon className="w-3.5 h-3.5" /> LinkedIn
                    </p>
                    <SocialCard
                      platform="LinkedIn" title={title} description={description}
                      image={image} url={pageUrl || url}
                      icon={LinkedInBrandIcon} accent="text-blue-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Recommendations */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <p className="text-sm font-semibold">SEO Recommendations</p>
              </div>
              <div className="divide-y divide-border">
                {[
                  {
                    label: "Title Tag",
                    good: !!title && title.length >= 10 && title.length < 60,
                    ok: !!title,
                    pass: `Optimal length (${title.length} chars).`,
                    warn: title.length >= 60
                      ? "Title too long — keep under 60 characters."
                      : "Title too short — aim for 30–60 characters.",
                    fail: "No title tag found. Add one for better SEO.",
                  },
                  {
                    label: "Meta Description",
                    good: !!description && description.length >= 70 && description.length <= 160,
                    ok: !!description,
                    pass: `Optimal length (${description.length} chars).`,
                    warn: description.length > 160
                      ? "Description too long — keep under 160 characters."
                      : "Description too short — aim for 70–160 characters.",
                    fail: "No meta description. Add one to improve click-through rate.",
                  },
                  {
                    label: "OG Image",
                    good: !!image,
                    ok: !!image,
                    pass: "Open Graph image present. Great for social sharing.",
                    warn: "",
                    fail: "No og:image tag. Add one to control how your page looks when shared.",
                  },
                  {
                    label: "Site Name",
                    good: !!siteName,
                    ok: !!siteName,
                    pass: "og:site_name is set. Helps with brand recognition.",
                    warn: "",
                    fail: "No og:site_name. Add one to strengthen brand presence in shares.",
                  },
                ].map(({ label, good: isGood, ok, pass, warn: warnMsg, fail }) => {
                  const status = isGood ? "good" : ok && warnMsg ? "warn" : "missing";
                  const msg = isGood ? pass : ok && warnMsg ? warnMsg : fail;
                  return (
                    <div key={label} className="flex items-start gap-3 px-4 py-3">
                      <StatusIcon status={status} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{msg}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Other tags */}
            {otherEntries.length > 0 && (
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/30">
                  <p className="text-sm font-semibold">All Other Meta Tags</p>
                </div>
                <div className="divide-y divide-border max-h-56 overflow-y-auto">
                  {otherEntries.map(([key, value]) => (
                    <div key={key} className="flex items-start gap-3 px-4 py-2.5">
                      <p className="text-xs font-mono text-muted-foreground w-36 shrink-0">{key}</p>
                      <p className="text-xs text-foreground/80 min-w-0 break-words">
                        {Array.isArray(value) ? value.join(", ") : value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official debuggers */}
            <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Official Debuggers
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Facebook Debugger", href: "https://developers.facebook.com/tools/debug/" },
                  { label: "Twitter Card Validator", href: "https://cards-dev.twitter.com/validator" },
                  { label: "LinkedIn Inspector", href: "https://www.linkedin.com/post-inspector/inspect/" },
                  { label: "Google Rich Results", href: "https://search.google.com/test/rich-results" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-500 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" /> {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
