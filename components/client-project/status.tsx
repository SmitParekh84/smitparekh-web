import { CircleDashed, Loader2, CheckCircle2, MinusCircle, ExternalLink } from "lucide-react";
import type { ProjectStepStatus, ProjectLink } from "@/types";
import { cn } from "@/lib/utils";

export const STEP_STATUS_CONFIG: Record<
  ProjectStepStatus,
  { label: string; badgeClassName: string; icon: React.ElementType; iconClassName: string }
> = {
  pending: {
    label: "Pending",
    badgeClassName: "border-muted bg-muted/50 text-muted-foreground",
    icon: CircleDashed,
    iconClassName: "text-muted-foreground",
  },
  in_progress: {
    label: "In progress",
    badgeClassName: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    icon: Loader2,
    iconClassName: "text-blue-500",
  },
  done: {
    label: "Done",
    badgeClassName: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
    icon: CheckCircle2,
    iconClassName: "text-green-500",
  },
  skipped: {
    label: "Skipped",
    badgeClassName: "border-muted bg-muted/40 text-muted-foreground line-through",
    icon: MinusCircle,
    iconClassName: "text-muted-foreground",
  },
};

export const STEP_STATUS_ORDER: ProjectStepStatus[] = ["pending", "in_progress", "done", "skipped"];

/** Renders resource links as clickable chips. Returns null when empty. */
export function LinkChips({ links, className }: { links?: ProjectLink[]; className?: string }) {
  if (!links || links.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link, i) => (
        <a
          key={`${link.url}-${i}`}
          href={link.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <ExternalLink className="h-3 w-3 shrink-0" />
          <span className="max-w-[14rem] truncate">{link.label || link.url}</span>
        </a>
      ))}
    </div>
  );
}
