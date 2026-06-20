/* Project journey helpers - map backend workflow phases into the 3-stage
   client-facing journey (Discovery → Proposal → Execution) and flag milestones.

   The backend (`config/project-templates.js`) emits per-service phases such as
   "Discovery", "Agreement", "Design", "Build", "Launch", "Delivery". We collapse
   those into three client-friendly journey stages so the portal can show a clean
   stage bar regardless of which services a client bought. */

import type { ProjectStep } from "@/types";

export type JourneyStage = "Discovery" | "Proposal" | "Execution";

export const JOURNEY_STAGES: JourneyStage[] = ["Discovery", "Proposal", "Execution"];

export const JOURNEY_META: Record<JourneyStage, { label: string; blurb: string }> = {
  Discovery: { label: "Discovery", blurb: "Understand the work" },
  Proposal: { label: "Proposal", blurb: "Scope, quote, close" },
  Execution: { label: "Execution", blurb: "Build & deliver" },
};

/** Collapse a backend phase name into one of the 3 client journey stages. */
export function toJourneyStage(phase?: string | null): JourneyStage {
  const p = (phase ?? "").toLowerCase();
  if (p.includes("discovery")) return "Discovery";
  if (p.includes("agreement") || p.includes("proposal")) return "Proposal";
  return "Execution";
}

/** "Deal closed" steps are milestones - backend keys end in `-deal`. */
export function isMilestone(step: ProjectStep): boolean {
  return step.key.endsWith("-deal") || /deal closed/i.test(step.label);
}

export interface StageProgress {
  stage: JourneyStage;
  total: number;
  done: number;
  active: boolean;
  complete: boolean;
}

/** Per-journey-stage progress across ALL steps (collective, not per service). */
export function stageProgress(steps: ProjectStep[]): StageProgress[] {
  return JOURNEY_STAGES.map((stage) => {
    const inStage = steps.filter((s) => toJourneyStage(s.phase) === stage);
    const total = inStage.length;
    const done = inStage.filter((s) => s.status === "done").length;
    const active = inStage.some((s) => s.status === "in_progress") || (done > 0 && done < total);
    return { stage, total, done, active, complete: total > 0 && done === total };
  }).filter((p) => p.total > 0);
}

export interface ProjectStats {
  total: number;
  done: number;
  inProgress: ProjectStep[];
  pct: number;
  next: ProjectStep | null;
  /** Current journey stage label, or "Done". */
  phase: JourneyStage | "Done";
}

export function projectStats(steps: ProjectStep[]): ProjectStats {
  const total = steps.length;
  const done = steps.filter((s) => s.status === "done").length;
  const inProgress = steps.filter((s) => s.status === "in_progress");
  const pct = Math.round((done / Math.max(1, total)) * 100);
  const ordered = [...steps].sort((a, b) => a.order - b.order);
  const next = ordered.find((s) => s.status === "pending") ?? null;
  const firstOpen = ordered.find((s) => s.status !== "done" && s.status !== "skipped");
  const phase: JourneyStage | "Done" = firstOpen ? toJourneyStage(firstOpen.phase) : "Done";
  return { total, done, inProgress, pct, next, phase };
}
