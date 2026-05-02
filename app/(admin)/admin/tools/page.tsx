"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Activity, Users, UserCheck, TrendingUp, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toolsSEO } from "@/data/tools-seo";

const toolCategoryMap: Record<string, string> = {
  "background-remover": "Image",
  "viral-linkedin-post-generator": "Content",
  "ats-resume-checker": "Career",
  "meta-tag-checker": "SEO",
  "qr-code-generator": "Dev",
  "word-counter": "Content",
  "image-compressor": "Image",
  "image-converter": "Image",
  "linkedin-media-downloader": "Content",
  "seo-analyzer": "SEO",
  "password-generator": "Security",
  "youtube-thumbnail-downloader": "Dev",
  "json-formatter": "Dev",
  "base64-encoder-decoder": "Dev",
};

interface PerTool {
  slug: string;
  guest_quota: number;
  user_quota: number;
  is_active: boolean;
  updated_at: string;
  uses_today: number;
  sessions_today: number;
  users_today: number;
  uses_total: number;
}

interface StatsResponse {
  configured: boolean;
  perTool: PerTool[];
  summary: {
    totalToday: number;
    sessionsToday: number;
    usersToday: number;
    topTool: { slug: string; uses: number } | null;
  };
}

function nameFromSlug(slug: string): string {
  const seo = toolsSEO.find((t) => t.slug === slug);
  if (seo) return seo.title.split(" - ")[0];
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

export default function ToolsAdminPage() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tools/stats", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: StatsResponse = await res.json();
      setData(json);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateField = async (
    slug: string,
    field: "guest_quota" | "user_quota" | "is_active",
    value: number | boolean,
  ) => {
    setSavingSlug(slug);
    try {
      const res = await fetch(`/api/admin/tools/${slug}/config`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      setData((prev) =>
        prev
          ? {
              ...prev,
              perTool: prev.perTool.map((t) => (t.slug === slug ? { ...t, [field]: value } : t)),
            }
          : prev,
      );
    } catch (e) {
      alert(`Update failed: ${e instanceof Error ? e.message : "unknown"}`);
    } finally {
      setSavingSlug(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Tools</h2>
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Tools</h2>
        <Card>
          <CardContent className="pt-6 flex items-center gap-3 text-red-500">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data?.configured) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Tools</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Quota system not configured. Add <code>SUPABASE_SERVICE_ROLE_KEY</code> to your environment and run the SQL migration <code>supabase/migrations/0001_tools_phase2.sql</code> in your Supabase SQL Editor.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { summary, perTool } = data;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Tools</h2>
        <p className="text-sm text-muted-foreground">
          Per-tool quotas, usage, and activity (today vs. all-time).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          icon={<Activity className="w-5 h-5" />}
          label="Uses today"
          value={summary.totalToday.toLocaleString()}
        />
        <SummaryCard
          icon={<Users className="w-5 h-5" />}
          label="Sessions today"
          value={summary.sessionsToday.toLocaleString()}
        />
        <SummaryCard
          icon={<UserCheck className="w-5 h-5" />}
          label="Logged-in users today"
          value={summary.usersToday.toLocaleString()}
        />
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Top tool today"
          value={summary.topTool ? nameFromSlug(summary.topTool.slug) : "—"}
          sub={summary.topTool ? `${summary.topTool.uses} uses` : undefined}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Per-tool config</CardTitle>
          <CardDescription>
            Edit quotas inline — changes save on blur. Set 0 to disable that audience.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">Tool</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-right px-4 py-3">Today</th>
                <th className="text-right px-4 py-3">All-time</th>
                <th className="text-right px-4 py-3">Sessions</th>
                <th className="text-right px-4 py-3">Users</th>
                <th className="text-right px-4 py-3">Guest quota</th>
                <th className="text-right px-4 py-3">User quota</th>
                <th className="text-center px-4 py-3">Active</th>
                <th className="text-right px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {perTool.map((t) => (
                <tr key={t.slug} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-3 font-medium">{nameFromSlug(t.slug)}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
                      {toolCategoryMap[t.slug] ?? "Tool"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{t.uses_today}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                    {t.uses_total}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                    {t.sessions_today}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                    {t.users_today}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <QuotaInput
                      value={t.guest_quota}
                      disabled={savingSlug === t.slug}
                      onCommit={(v) => updateField(t.slug, "guest_quota", v)}
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <QuotaInput
                      value={t.user_quota}
                      disabled={savingSlug === t.slug}
                      onCommit={(v) => updateField(t.slug, "user_quota", v)}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => updateField(t.slug, "is_active", !t.is_active)}
                      disabled={savingSlug === t.slug}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        t.is_active ? "bg-blue-500" : "bg-muted"
                      } disabled:opacity-50`}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                          t.is_active ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/free-tools/${t.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Open <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
          {icon}
          {label}
        </div>
        <p className="text-2xl font-semibold mt-2 truncate">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}

function QuotaInput({
  value,
  onCommit,
  disabled,
}: {
  value: number;
  onCommit: (v: number) => void;
  disabled?: boolean;
}) {
  const [v, setV] = useState(String(value));
  useEffect(() => {
    setV(String(value));
  }, [value]);
  return (
    <input
      type="number"
      min={0}
      value={v}
      disabled={disabled}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => {
        const n = Math.max(0, Math.floor(Number(v) || 0));
        if (n !== value) onCommit(n);
        else setV(String(value));
      }}
      className="w-16 rounded-md border border-border bg-muted/30 px-2 py-1 text-right text-sm focus:outline-none focus:border-blue-500/50 disabled:opacity-50"
    />
  );
}
