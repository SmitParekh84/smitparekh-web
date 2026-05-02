"use client";

import { useState } from "react";
import {
  Star,
  Mail,
  Loader2,
  Bug,
  MessageSquare,
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useAdminFeedbackList,
  useAdminUpdateFeedback,
  useAdminDeleteFeedback,
} from "@/hooks/api/use-feedback";
import type { FeedbackType, FeedbackStatus, FeedbackEntry } from "@/lib/api";
import { toast } from "@/lib/toast";

/* ── helpers ────────────────────────────────────────────────────────────────── */

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={
            n <= rating
              ? "h-3.5 w-3.5 fill-yellow-500 text-yellow-500"
              : "h-3.5 w-3.5 text-muted-foreground/30"
          }
        />
      ))}
    </div>
  );
}

const STATUS_OPTIONS: FeedbackStatus[] = ["open", "in_review", "resolved"];

const statusColors: Record<FeedbackStatus, string> = {
  open: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  in_review: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  resolved: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
};

const statusLabels: Record<FeedbackStatus, string> = {
  open: "Open",
  in_review: "In Review",
  resolved: "Resolved",
};

/* ── row ────────────────────────────────────────────────────────────────────── */

function FeedbackRow({ entry }: { entry: FeedbackEntry }) {
  const { mutate: update, isPending: isUpdating } = useAdminUpdateFeedback();
  const { mutate: remove, isPending: isDeleting } = useAdminDeleteFeedback();

  return (
    <li className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {/* Header row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{entry.name || "Anonymous"}</span>
            {entry.email && (
              <a
                href={`mailto:${entry.email}`}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-blue-500"
              >
                <Mail className="h-3 w-3" />
                {entry.email}
              </a>
            )}
            {/* Type badge */}
            {entry.type === "bug" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
                <Bug className="h-3 w-3" /> Bug
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                <MessageSquare className="h-3 w-3" /> Feedback
              </span>
            )}
            {/* Status select */}
            <select
              value={entry.status}
              disabled={isUpdating}
              onChange={(e) =>
                update(
                  { id: entry._id, body: { status: e.target.value as FeedbackStatus } },
                  {
                    onSuccess: () => toast.success("Status updated"),
                    onError: () => toast.error("Failed to update status"),
                  }
                )
              }
              className={`rounded-full px-2 py-0.5 text-xs font-medium border-0 cursor-pointer ${statusColors[entry.status]}`}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {statusLabels[s]}
                </option>
              ))}
            </select>
            {/* Public toggle */}
            <button
              type="button"
              disabled={isUpdating}
              onClick={() =>
                update(
                  { id: entry._id, body: { isPublic: !entry.isPublic } },
                  {
                    onSuccess: () =>
                      toast.success(entry.isPublic ? "Hidden from public" : "Now public"),
                    onError: () => toast.error("Failed to update visibility"),
                  }
                )
              }
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              title={entry.isPublic ? "Hide from public" : "Make public"}
            >
              {entry.isPublic ? (
                <Eye className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <EyeOff className="h-3.5 w-3.5" />
              )}
              {entry.isPublic ? "Public" : "Private"}
            </button>
            {typeof entry.rating === "number" && (
              <Badge variant="secondary" className="gap-1.5">
                <StarRow rating={entry.rating} />
              </Badge>
            )}
          </div>
          {/* Title */}
          <p className="mt-1 font-medium text-sm">{entry.title}</p>
          {/* Message */}
          <p className="mt-1 whitespace-pre-line text-sm text-foreground/80">{entry.message}</p>
        </div>

        {/* Right column */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <time className="text-xs text-muted-foreground">
            {new Date(entry.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => {
              if (!confirm("Delete this entry permanently?")) return;
              remove(entry._id, {
                onSuccess: () => toast.success("Deleted"),
                onError: () => toast.error("Failed to delete"),
              });
            }}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            {isDeleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </li>
  );
}

/* ── page ────────────────────────────────────────────────────────────────────── */

type TypeFilter = FeedbackType | "all";
type StatusFilter = FeedbackStatus | "all";

export default function FeedbackPage() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const { data, isLoading, isError, refetch } = useAdminFeedbackList({
    type: typeFilter === "all" ? undefined : typeFilter,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const entries = data?.data ?? [];

  // Compute stats from aggregate data
  const feedbackCount =
    data?.stats?.filter((s) => s._id.type === "feedback").reduce((a, b) => a + b.count, 0) ?? 0;
  const bugCount =
    data?.stats?.filter((s) => s._id.type === "bug").reduce((a, b) => a + b.count, 0) ?? 0;
  const openCount =
    data?.stats?.filter((s) => s._id.status === "open").reduce((a, b) => a + b.count, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Feedback & Bug Reports</h2>
        <p className="text-sm text-muted-foreground">
          Manage all user submissions — update status, toggle public visibility, or delete.
        </p>
      </div>

      {/* Stats */}
      {data && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total", value: data.total, color: "text-foreground" },
            { label: "Feedback", value: feedbackCount, color: "text-purple-600" },
            { label: "Bugs", value: bugCount, color: "text-red-600" },
            { label: "Open", value: openCount, color: "text-blue-600" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>All entries</CardTitle>
              <CardDescription>{data ? `${data.total} total` : "—"}</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Type filter */}
              <div className="flex rounded-lg border overflow-hidden text-xs font-medium">
                {(["all", "feedback", "bug"] as TypeFilter[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-3 py-1.5 transition-colors ${
                      typeFilter === t
                        ? "bg-foreground text-background"
                        : "hover:bg-muted/60"
                    }`}
                  >
                    {t === "all" ? "All" : t === "bug" ? "Bugs" : "Feedback"}
                  </button>
                ))}
              </div>
              {/* Status filter */}
              <div className="flex rounded-lg border overflow-hidden text-xs font-medium">
                {(["all", ...STATUS_OPTIONS] as (StatusFilter)[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 transition-colors ${
                      statusFilter === s
                        ? "bg-foreground text-background"
                        : "hover:bg-muted/60"
                    }`}
                  >
                    {s === "all" ? "Any status" : statusLabels[s as FeedbackStatus]}
                  </button>
                ))}
              </div>
              <Button variant="ghost" size="sm" onClick={() => refetch()}>
                <RefreshCw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {isError && (
            <div className="py-12 text-center">
              <p className="mb-3 text-sm text-muted-foreground">
                Could not load feedback. Is the backend running?
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !isError && entries.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No entries match the current filter.
            </p>
          )}

          {!isLoading && !isError && entries.length > 0 && (
            <ul className="divide-y divide-border">
              {entries.map((entry) => (
                <FeedbackRow key={entry._id} entry={entry} />
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
