"use client";

import { useState } from "react";
import { Bell, Users, ChevronDown, ChevronRight, Mail, Loader2, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAdminWaitlist } from "@/hooks/api/use-feedback";
import type { WaitlistGroup } from "@/lib/api";
import { formatDate } from "@/lib/date";

function ToolLabel(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function WaitlistCard({ group }: { group: WaitlistGroup }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = expanded ? ChevronDown : ChevronRight;

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
            <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-medium">{ToolLabel(group.tool)}</p>
            <p className="text-xs text-muted-foreground">{group.tool}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 dark:bg-blue-900/30">
            <Users className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              {group.count}
            </span>
          </div>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      </button>

      {expanded && (
        <div className="border-t px-5 py-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Subscribers ({group.count})
          </p>
          <ul className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {group.emails.map((e, i) => (
              <li key={i} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <a
                    href={`mailto:${e.email}`}
                    className="text-sm hover:text-blue-600 transition-colors truncate"
                  >
                    {e.email}
                  </a>
                </div>
                <time className="shrink-0 text-xs text-muted-foreground">
                  {formatDate(e.joinedAt)}
                </time>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function AdminWaitlistPage() {
  const { data, isLoading, isError, refetch } = useAdminWaitlist();

  const groups = data?.data ?? [];
  const totalSignups = data?.total ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Waitlist</h2>
          <p className="text-sm text-muted-foreground">
            Users who signed up for coming-soon tool notifications.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
          <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Total stat */}
      {data && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground">Total Signups</p>
            <p className="text-2xl font-bold text-blue-600">{totalSignups}</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground">Tools</p>
            <p className="text-2xl font-bold">{groups.length}</p>
          </div>
          <div className="rounded-xl border bg-card p-4 sm:col-span-1 col-span-2">
            <p className="text-xs text-muted-foreground">Most Wanted</p>
            <p className="text-base font-semibold truncate">
              {groups[0] ? ToolLabel(groups[0].tool) : "—"}
            </p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>By Tool</CardTitle>
          <CardDescription>Click a tool to expand and see individual emails.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {isError && (
            <div className="py-12 text-center">
              <p className="mb-3 text-sm text-muted-foreground">
                Could not load waitlist data. Is the backend running?
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !isError && groups.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No waitlist signups yet.
            </p>
          )}

          {!isLoading && !isError && groups.map((group) => (
            <WaitlistCard key={group.tool} group={group} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
