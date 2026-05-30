"use client";

import { Check, FileText, Rocket, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { JOURNEY_META, stageProgress, type JourneyStage } from "@/lib/project-journey";
import type { ProjectStep } from "@/types";

const STAGE_ICON: Record<JourneyStage, React.ElementType> = {
  Discovery: Search,
  Proposal: FileText,
  Execution: Rocket,
};

/** Journey stage bar (Discovery → Proposal → Execution) shown on the client
    dashboard and project page so the client always knows where they are. */
export function ClientStageBar({ steps }: { steps: ProjectStep[] }) {
  const stages = stageProgress(steps);
  if (stages.length === 0) return null;

  const currentIdx = stages.findIndex((s) => !s.complete);

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        {stages.map((p, i) => {
          const Icon = STAGE_ICON[p.stage];
          const isCurrent = i === currentIdx;
          const isComplete = p.complete;
          const reached = isComplete || isCurrent || currentIdx === -1;
          return (
            <div key={p.stage} className="contents">
              <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                <div
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-full border-2 transition-colors",
                    isComplete
                      ? "border-green-500 bg-green-500 text-white"
                      : isCurrent
                      ? "border-blue-500 bg-blue-500/10 text-blue-500"
                      : "border-border bg-background text-muted-foreground"
                  )}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : <Icon className="h-[15px] w-[15px]" />}
                </div>
                <div
                  className={cn(
                    "mt-1.5 text-[12.5px] font-medium",
                    reached ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {JOURNEY_META[p.stage].label}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {isComplete ? "Complete" : isCurrent ? "In progress" : `${p.done}/${p.total}`}
                </div>
              </div>
              {i < stages.length - 1 && (
                <div
                  className={cn(
                    "mb-7 h-0.5 flex-1 rounded-full",
                    p.complete ? "bg-green-500" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
