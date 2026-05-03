"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  Users,
  UserCheck,
  TrendingUp,
  AlertTriangle,
  Search,
  RefreshCw,
  CheckCircle2,
  RotateCcw,
  Wrench,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRangeFilter, rangeFor, type DateRangeMode, type DateRange } from "@/components/ui/date-range-filter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toolsSEO } from "@/data/tools-seo";
import { toast } from "@/lib/toast";
import { AppSelect, type SelectOption } from "@/components/ui/app-select";

const CATEGORIES = ["All", "Image", "Content", "Career", "SEO", "Dev", "Security"];

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
  "url-encoder-decoder": "Dev",
  "hash-generator": "Security",
  "regex-tester": "Dev",
  "color-converter": "Dev",
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

interface UserActivityItem {
  userId: string;
  email: string;
  name: string | null;
  usesToday: number;
  toolsToday: string[];
  usesTotal: number;
  lastUsedAt: string | null;
}

interface UsersActivityResponse {
  users: UserActivityItem[];
  guestUsesToday: number;
  guestSessionsToday: number;
}

const PERIOD_LABEL: Record<DateRangeMode, string> = {
  day: "today",
  week: "this week",
  month: "this month",
  year: "this year",
};

function nameFromSlug(slug: string): string {
  const seo = toolsSEO.find((t) => t.slug === slug);
  if (seo) return seo.title.split(" - ")[0];
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function ToolsAdminPage() {
  const [tab, setTab] = useState<"tools" | "users">("tools");
  const [data, setData] = useState<StatsResponse | null>(null);
  const [usersData, setUsersData] = useState<UsersActivityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>(rangeFor("month"));
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const [resettingUser, setResettingUser] = useState<string | null>(null);

  // Tool tab filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const filteredTools = useMemo(() => {
    if (!data?.perTool) return [];
    return data.perTool.filter((t) => {
      const name = nameFromSlug(t.slug).toLowerCase();
      const matchSearch =
        !search ||
        name.includes(search.toLowerCase()) ||
        t.slug.includes(search.toLowerCase());
      const matchCat = category === "All" || toolCategoryMap[t.slug] === category;
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" ? t.is_active : !t.is_active);
      return matchSearch && matchCat && matchStatus;
    });
  }, [data?.perTool, search, category, statusFilter]);

  const loadTools = useCallback(async (range?: DateRange) => {
    setLoading(true);
    const r = range ?? dateRange;
    try {
      const url = `/api/admin/tools/stats?from=${r.from}&to=${r.to}&mode=${r.mode}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData(await res.json());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load stats");
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  function handleRangeChange(range: DateRange) {
    setDateRange(range);
    loadTools(range);
  }

  const loadUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const res = await fetch("/api/admin/users/usage", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setUsersData(await res.json());
    } catch (e) {
      toast.error("Failed to load users", e instanceof Error ? e.message : "Unknown error");
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTools();
  }, [loadTools]);

  useEffect(() => {
    if (tab === "users" && !usersData && !usersLoading) loadUsers();
  }, [tab, usersData, usersLoading, loadUsers]);

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
        throw new Error((err as { error?: string }).error || `HTTP ${res.status}`);
      }
      setData((prev) =>
        prev
          ? {
              ...prev,
              perTool: prev.perTool.map((t) =>
                t.slug === slug ? { ...t, [field]: value } : t,
              ),
            }
          : prev,
      );
      setSavedSlug(slug);
      setTimeout(() => setSavedSlug((s) => (s === slug ? null : s)), 2000);
    } catch (e) {
      toast.error("Update failed", e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSavingSlug(null);
    }
  };

  const resetUser = async (userId: string, email: string) => {
    setResettingUser(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}/reset`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setUsersData((prev) =>
        prev
          ? {
              ...prev,
              users: prev.users.map((u) =>
                u.userId === userId ? { ...u, usesToday: 0, toolsToday: [] } : u,
              ),
            }
          : prev,
      );
      toast.success("Reset", `Today's usage cleared for ${email}.`);
    } catch (e) {
      toast.error("Reset failed", e instanceof Error ? e.message : "Unknown error");
    } finally {
      setResettingUser(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-7 w-24 mb-2" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-8 w-56 rounded-lg" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-5 space-y-3">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border p-5 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
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
              Quota system not configured. Add{" "}
              <code>SUPABASE_SERVICE_ROLE_KEY</code> to your environment and run
              the SQL migration.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { summary } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Tools</h2>
          <p className="text-sm text-muted-foreground">
            Per-tool quotas, usage, and user activity.
          </p>
        </div>
        <DateRangeFilter value={dateRange.mode} onChange={handleRangeChange} />
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          icon={<Activity className="w-5 h-5" />}
          label={`Uses ${PERIOD_LABEL[dateRange.mode]}`}
          value={summary.totalToday.toLocaleString()}
        />
        <SummaryCard
          icon={<Users className="w-5 h-5" />}
          label={`Sessions ${PERIOD_LABEL[dateRange.mode]}`}
          value={summary.sessionsToday.toLocaleString()}
        />
        <SummaryCard
          icon={<UserCheck className="w-5 h-5" />}
          label={`Logged-in users ${PERIOD_LABEL[dateRange.mode]}`}
          value={summary.usersToday.toLocaleString()}
        />
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5" />}
          label={`Top tool ${PERIOD_LABEL[dateRange.mode]}`}
          value={summary.topTool ? nameFromSlug(summary.topTool.slug) : "—"}
          sub={summary.topTool ? `${summary.topTool.uses} uses` : undefined}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {(["tools", "users"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-blue-500 text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "tools" ? "Tools Config" : "User Activity"}
          </button>
        ))}
      </div>

      {/* ── Tools Config tab ─────────────────────────────── */}
      {tab === "tools" && (
        <div className="space-y-4">
          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search tools…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <AppSelect
              value={category}
              onValueChange={setCategory}
              options={CATEGORIES.map((c): SelectOption => ({
                value: c,
                label: c === "All" ? "All categories" : c,
              }))}
              triggerClassName="w-40"
            />
            <AppSelect
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as "all" | "active" | "inactive")}
              options={[
                { value: "all", label: "All statuses" },
                { value: "active", label: "Active only" },
                { value: "inactive", label: "Inactive only" },
              ]}
              triggerClassName="w-36"
            />
          </div>

          {/* Tools table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Per-tool config</CardTitle>
              <CardDescription>
                Edit quotas inline — changes save on blur. Set <span className="font-semibold text-emerald-600 dark:text-emerald-400">∞</span> (0) for unlimited.
                {filteredTools.length !== data.perTool.length && (
                  <span className="ml-2 text-blue-500">
                    Showing {filteredTools.length} of {data.perTool.length}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="border-b border-border bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="text-left px-4 py-3">Tool</th>
                    <th className="text-left px-4 py-3">Category</th>
                    <th className="text-right px-4 py-3 capitalize">{PERIOD_LABEL[dateRange.mode]}</th>
                    <th className="text-right px-4 py-3 hidden sm:table-cell">All-time</th>
                    <th className="text-right px-4 py-3 hidden md:table-cell">Sessions</th>
                    <th className="text-right px-4 py-3 hidden md:table-cell">Users</th>
                    <th className="text-right px-4 py-3">Guest Q</th>
                    <th className="text-right px-4 py-3">User Q</th>
                    <th className="text-center px-4 py-3">Active</th>
                    <th className="text-right px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTools.length === 0 ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-4 py-8 text-center text-sm text-muted-foreground"
                      >
                        No tools match your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredTools.map((t) => (
                      <tr
                        key={t.slug}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-4 py-3 font-medium">{nameFromSlug(t.slug)}</td>
                        <td className="px-4 py-3">
                          <Badge
                            variant="secondary"
                            className="text-[10px] uppercase tracking-wide"
                          >
                            {toolCategoryMap[t.slug] ?? "Tool"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">
                          {t.uses_today}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-muted-foreground hidden sm:table-cell">
                          {t.uses_total}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-muted-foreground hidden md:table-cell">
                          {t.sessions_today}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-muted-foreground hidden md:table-cell">
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
                            onClick={() =>
                              updateField(t.slug, "is_active", !t.is_active)
                            }
                            disabled={savingSlug === t.slug}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                              t.is_active ? "bg-blue-500" : "bg-muted"
                            } disabled:opacity-50`}
                            aria-label={t.is_active ? "Deactivate" : "Activate"}
                          >
                            <span
                              className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                                t.is_active ? "translate-x-4" : "translate-x-0.5"
                              }`}
                            />
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {savedSlug === t.slug ? (
                            <span className="inline-flex items-center gap-1 text-xs text-green-500">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Saved
                            </span>
                          ) : (
                            <Link
                              href={`/admin/tools/${t.slug}`}
                              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                            >
                              <Wrench className="w-3 h-3" /> Use
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── User Activity tab ─────────────────────────────── */}
      {tab === "users" && (
        <div className="space-y-4">
          {usersLoading ? (
            <p className="text-sm text-muted-foreground">Loading user activity…</p>
          ) : usersData ? (
            <>
              {/* Guest summary */}
              <div className="grid gap-4 sm:grid-cols-2">
                <SummaryCard
                  icon={<Users className="w-5 h-5" />}
                  label="Guest uses today"
                  value={usersData.guestUsesToday.toLocaleString()}
                />
                <SummaryCard
                  icon={<Activity className="w-5 h-5" />}
                  label="Guest sessions today"
                  value={usersData.guestSessionsToday.toLocaleString()}
                />
              </div>

              {/* Registered users table */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle className="text-base">Registered Users</CardTitle>
                    <CardDescription>
                      Users who have used at least one tool.
                    </CardDescription>
                  </div>
                  <button
                    onClick={loadUsers}
                    disabled={usersLoading}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Refresh"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${usersLoading ? "animate-spin" : ""}`}
                    />
                  </button>
                </CardHeader>
                <CardContent className="overflow-x-auto p-0">
                  {usersData.users.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                      No registered users have used any tools yet.
                    </div>
                  ) : (
                    <table className="w-full text-sm min-w-[480px]">
                      <thead className="border-b border-border bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
                        <tr>
                          <th className="text-left px-4 py-3">User</th>
                          <th className="text-right px-4 py-3">Today</th>
                          <th className="text-right px-4 py-3 hidden sm:table-cell">
                            All-time
                          </th>
                          <th className="text-left px-4 py-3 hidden md:table-cell">
                            Tools today
                          </th>
                          <th className="text-right px-4 py-3 hidden sm:table-cell">
                            Last active
                          </th>
                          <th className="text-right px-4 py-3">Reset</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersData.users.map((u) => (
                          <tr
                            key={u.userId}
                            className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <p className="font-medium text-sm">
                                {u.name ?? u.email}
                              </p>
                              {u.name && (
                                <p className="text-xs text-muted-foreground">
                                  {u.email}
                                </p>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right tabular-nums">
                              {u.usesToday}
                            </td>
                            <td className="px-4 py-3 text-right tabular-nums text-muted-foreground hidden sm:table-cell">
                              {u.usesTotal}
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell">
                              <div className="flex flex-wrap gap-1">
                                {u.toolsToday.map((s) => (
                                  <Badge
                                    key={s}
                                    variant="secondary"
                                    className="text-[10px]"
                                  >
                                    {nameFromSlug(s)}
                                  </Badge>
                                ))}
                                {u.toolsToday.length === 0 && (
                                  <span className="text-xs text-muted-foreground">
                                    —
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right text-xs text-muted-foreground hidden sm:table-cell">
                              {u.lastUsedAt ? relativeTime(u.lastUsedAt) : "—"}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => resetUser(u.userId, u.email)}
                                disabled={
                                  resettingUser === u.userId || u.usesToday === 0
                                }
                                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 disabled:opacity-40 transition-colors"
                                title={
                                  u.usesToday === 0
                                    ? "No uses today"
                                    : "Reset today's usage"
                                }
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Reset</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>
      )}
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
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    setV(String(value));
  }, [value]);

  const displayValue = !focused && value === 0 ? "∞" : v;

  return (
    <div className="relative inline-flex items-center">
      <input
        type={focused ? "number" : "text"}
        min={0}
        value={displayValue}
        disabled={disabled}
        title={value === 0 ? "Unlimited (0 = no limit)" : undefined}
        onChange={(e) => setV(e.target.value)}
        onFocus={() => { setFocused(true); setV(String(value)); }}
        onBlur={() => {
          setFocused(false);
          const n = Math.max(0, Math.floor(Number(v) || 0));
          if (n !== value) onCommit(n);
          else setV(String(value));
        }}
        className={`w-16 rounded-md border bg-muted/30 px-2 py-1 text-right text-sm focus:outline-none focus:border-blue-500/50 disabled:opacity-50 ${
          value === 0
            ? "border-emerald-400/50 text-emerald-600 dark:text-emerald-400 font-semibold"
            : "border-border"
        }`}
      />
    </div>
  );
}
