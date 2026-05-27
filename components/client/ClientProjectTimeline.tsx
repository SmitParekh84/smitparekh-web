"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ExternalLink, Loader2, MinusCircle, PlayCircle, Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ProjectStep, ProjectStepLink, ProjectStepStatus, ProjectStepPatch } from "@/types";

const STATUS_META: Record<
  ProjectStepStatus,
  { label: string; badge: string; dot: string; icon: React.ElementType }
> = {
  pending: {
    label: "Pending",
    badge: "border-muted bg-muted/50 text-muted-foreground",
    dot: "border-muted-foreground/30 bg-background text-muted-foreground",
    icon: Circle,
  },
  in_progress: {
    label: "In progress",
    badge: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    dot: "border-blue-500 bg-blue-500/10 text-blue-500",
    icon: PlayCircle,
  },
  done: {
    label: "Done",
    badge: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
    dot: "border-green-500 bg-green-500 text-white",
    icon: CheckCircle2,
  },
  skipped: {
    label: "Skipped",
    badge: "border-muted bg-muted/40 text-muted-foreground line-through",
    dot: "border-muted-foreground/30 bg-muted text-muted-foreground",
    icon: MinusCircle,
  },
};

const STATUS_OPTIONS: { value: ProjectStepStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In progress" },
  { value: "done", label: "Done" },
  { value: "skipped", label: "Skipped" },
];

function toDateInput(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

function formatDate(iso?: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

interface Props {
  steps: ProjectStep[];
  editable?: boolean;
  onUpdateStep?: (stepKey: string, patch: ProjectStepPatch) => void;
  busyStepKey?: string | null;
}

export function ClientProjectTimeline({ steps, editable, onUpdateStep, busyStepKey }: Props) {
  const [newLinks, setNewLinks] = useState<Record<string, { label: string; url: string }>>({});

  function getNewLink(stepKey: string) {
    return newLinks[stepKey] ?? { label: "", url: "" };
  }

  function setNewLinkField(stepKey: string, field: "label" | "url", value: string) {
    setNewLinks((prev) => ({
      ...prev,
      [stepKey]: { ...getNewLink(stepKey), [field]: value },
    }));
  }

  function handleAddLink(step: ProjectStep) {
    const input = getNewLink(step.key);
    if (!input.url.trim()) return;
    const updated: ProjectStepLink[] = [...(step.links ?? []), { label: input.label.trim(), url: input.url.trim() }];
    onUpdateStep?.(step.key, { links: updated });
    setNewLinks((prev) => ({ ...prev, [step.key]: { label: "", url: "" } }));
  }

  function handleRemoveLink(step: ProjectStep, idx: number) {
    const updated = (step.links ?? []).filter((_, i) => i !== idx);
    onUpdateStep?.(step.key, { links: updated });
  }

  if (!steps.length) {
    return (
      <p className="text-sm text-muted-foreground">No workflow steps yet.</p>
    );
  }

  const ordered = [...steps].sort((a, b) => a.order - b.order);
  const current = ordered.filter((s) => s.status === "in_progress");

  // Group by service, preserving order.
  const groups: { label: string; steps: ProjectStep[] }[] = [];
  for (const step of ordered) {
    const label = step.serviceLabel || "Project";
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.steps.push(step);
    else groups.push({ label, steps: [step] });
  }

  return (
    <div className="space-y-6">
      {/* Currently working on */}
      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-500">
          Currently working on
        </p>
        {current.length ? (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {current.map((s) => (
              <Badge
                key={s.key}
                variant="outline"
                className="border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
              >
                {s.label}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">
            Nothing in progress right now.
          </p>
        )}
      </div>

      {groups.map((group) => (
        <div key={group.label} className="space-y-3">
          {groups.length > 1 && (
            <h3 className="text-sm font-semibold text-foreground">{group.label}</h3>
          )}
          <ol className="space-y-0">
            {group.steps.map((step, i) => {
              const meta = STATUS_META[step.status];
              const Icon = meta.icon;
              const isLast = i === group.steps.length - 1;
              const start = formatDate(step.startDate);
              const end = formatDate(step.endDate);
              const busy = busyStepKey === step.key;

              return (
                <li key={step.key} className="relative flex gap-3 pb-5">
                  {/* connector line */}
                  {!isLast && (
                    <span
                      className="absolute left-[13px] top-7 bottom-0 w-px bg-border"
                      aria-hidden
                    />
                  )}
                  {/* dot */}
                  <span
                    className={cn(
                      "z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2",
                      meta.dot
                    )}
                  >
                    {busy ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Icon className="h-3.5 w-3.5" />
                    )}
                  </span>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          step.status === "skipped" && "text-muted-foreground line-through"
                        )}
                      >
                        {step.label}
                      </span>
                      {step.phase && (
                        <span className="text-[11px] text-muted-foreground">{step.phase}</span>
                      )}
                      {!editable && (
                        <Badge variant="outline" className={cn("text-[10px]", meta.badge)}>
                          {meta.label}
                        </Badge>
                      )}
                    </div>

                    {/* Read-only dates / note / links */}
                    {!editable && (start || end || step.note) && (
                      <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                        {(start || end) && (
                          <p>
                            {start ?? "—"}
                            {" → "}
                            {end ?? "ongoing"}
                          </p>
                        )}
                        {step.note && <p className="italic">{step.note}</p>}
                      </div>
                    )}
                    {!editable && (step.links ?? []).length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {(step.links ?? []).map((link, li) => (
                          <a
                            key={li}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-blue-500/30 bg-blue-500/5 px-2 py-0.5 text-xs text-blue-600 transition-colors hover:bg-blue-500/15 dark:text-blue-400"
                          >
                            <ExternalLink className="h-3 w-3 shrink-0" />
                            {link.label || link.url}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Editable controls */}
                    {editable && onUpdateStep && (
                      <div className="mt-2 space-y-2">
                        <div className="grid gap-2 sm:grid-cols-[140px_1fr_1fr] sm:items-center">
                          <Select
                            value={step.status}
                            onValueChange={(value) => {
                              const status = value as ProjectStepStatus;
                              const patch: ProjectStepPatch = { status };
                              const today = new Date().toISOString().slice(0, 10);
                              if (status === "in_progress" && !step.startDate) patch.startDate = today;
                              if (status === "done" && !step.endDate) patch.endDate = today;
                              onUpdateStep(step.key, patch);
                            }}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUS_OPTIONS.map((o) => (
                                <SelectItem key={o.value} value={o.value} className="text-xs">
                                  {o.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <label className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <span className="w-9 shrink-0">Start</span>
                            <Input
                              type="date"
                              value={toDateInput(step.startDate)}
                              onChange={(e) =>
                                onUpdateStep(step.key, { startDate: e.target.value || null })
                              }
                              className="h-8 text-xs"
                            />
                          </label>

                          <label className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <span className="w-9 shrink-0">End</span>
                            <Input
                              type="date"
                              value={toDateInput(step.endDate)}
                              onChange={(e) =>
                                onUpdateStep(step.key, { endDate: e.target.value || null })
                              }
                              className="h-8 text-xs"
                            />
                          </label>
                        </div>

                        {/* Links management */}
                        <div className="space-y-1.5 border-t border-border/50 pt-2">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Links
                          </p>
                          {(step.links ?? []).map((link, li) => (
                            <div key={li} className="flex items-center gap-1.5 text-xs">
                              <ExternalLink className="h-3 w-3 shrink-0 text-blue-500" />
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-w-0 flex-1 truncate text-blue-600 hover:underline dark:text-blue-400"
                              >
                                {link.label || link.url}
                              </a>
                              <button
                                type="button"
                                onClick={() => handleRemoveLink(step, li)}
                                className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                                aria-label="Remove link"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                          {/* Add link row */}
                          <div className="flex items-center gap-1.5">
                            <Input
                              type="text"
                              placeholder="Label (optional)"
                              value={getNewLink(step.key).label}
                              onChange={(e) => setNewLinkField(step.key, "label", e.target.value)}
                              className="h-7 w-28 shrink-0 text-xs"
                            />
                            <Input
                              type="url"
                              placeholder="https://..."
                              value={getNewLink(step.key).url}
                              onChange={(e) => setNewLinkField(step.key, "url", e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleAddLink(step)}
                              className="h-7 min-w-0 flex-1 text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddLink(step)}
                              disabled={!getNewLink(step.key).url.trim()}
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-background transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                              aria-label="Add link"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
