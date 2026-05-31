"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Award,
  CheckCircle2,
  Circle,
  GripVertical,
  Loader2,
  MinusCircle,
  PlayCircle,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { isMilestone } from "@/lib/project-journey";
import type { ProjectStep, ProjectStepPatch, ProjectStepStatus } from "@/types";

/* ─── Constants ─────────────────────────────────────────────────────────── */

const SERVICE_OPTIONS = [
  "Website Development",
  "SEO",
  "AI & Automation",
  "Custom Software",
  "Other",
];

const PHASE_OPTIONS = ["Discovery", "Proposal", "Execution"];

const STATUS_OPTIONS: { value: ProjectStepStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In progress" },
  { value: "done", label: "Done" },
  { value: "skipped", label: "Skipped" },
];

const STATUS_DOT: Record<
  ProjectStepStatus,
  { dot: string; icon: React.ElementType }
> = {
  pending: {
    dot: "border-muted-foreground/30 bg-background text-muted-foreground",
    icon: Circle,
  },
  in_progress: {
    dot: "border-blue-500 bg-blue-500/10 text-blue-500",
    icon: PlayCircle,
  },
  done: {
    dot: "border-green-500 bg-green-500 text-white",
    icon: CheckCircle2,
  },
  skipped: {
    dot: "border-muted-foreground/30 bg-muted text-muted-foreground",
    icon: MinusCircle,
  },
};

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface Props {
  steps: ProjectStep[];
  onUpdateStep: (key: string, patch: ProjectStepPatch) => void;
  onAddStep: (payload: { label: string; serviceLabel: string; phase: string }) => void;
  onDeleteStep: (key: string) => void;
  onReorderSteps: (order: string[]) => void;
  onRegenerate: () => void;
  busyStepKey?: string | null;
  reorderPending?: boolean;
  addPending?: boolean;
  regeneratePending?: boolean;
}

/* ─── Sortable step row ─────────────────────────────────────────────────── */

function SortableStepRow({
  step,
  onUpdateStep,
  onDeleteStep,
  isBusy,
  isOverlay = false,
}: {
  step: ProjectStep;
  onUpdateStep: (key: string, patch: ProjectStepPatch) => void;
  onDeleteStep: (key: string) => void;
  isBusy?: boolean;
  isOverlay?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: step.key });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
  };

  const meta = STATUS_DOT[step.status] ?? STATUS_DOT.pending;
  const StatusIcon = isMilestone(step) ? Award : meta.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center gap-2.5 px-3 py-2.5",
        "border-b border-border last:border-0",
        "bg-background transition-shadow duration-150",
        isDragging && "opacity-50",
        isOverlay && "rounded-xl border border-border shadow-lg",
      )}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className={cn(
          "shrink-0 cursor-grab touch-none rounded p-0.5",
          "text-muted-foreground/40 transition-all duration-150",
          "group-hover:text-muted-foreground",
          "active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        )}
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      {/* Status icon */}
      <span
        className={cn(
          "grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors",
          isMilestone(step)
            ? step.status === "done"
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-blue-500/40 bg-blue-500/10 text-blue-500"
            : meta.dot,
        )}
      >
        {isBusy ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <StatusIcon className="h-3 w-3" />
        )}
      </span>

      {/* Label */}
      <div className="min-w-0 flex-1">
        <span
          className={cn(
            "text-[13px] font-medium",
            step.status === "skipped" && "text-muted-foreground line-through",
          )}
        >
          {step.label}
        </span>
        <div className="mt-0.5 flex flex-wrap items-center gap-1">
          {step.serviceLabel && (
            <span className="rounded-full bg-muted/60 px-1.5 py-0 text-[10px] text-muted-foreground">
              {step.serviceLabel}
            </span>
          )}
          {step.phase && (
            <span className="rounded-full bg-muted/60 px-1.5 py-0 text-[10px] text-muted-foreground">
              {step.phase}
            </span>
          )}
          {isMilestone(step) && (
            <Badge
              variant="outline"
              className="gap-1 border-blue-500/30 bg-blue-500/10 py-0 text-[9px] text-blue-600 dark:text-blue-400"
            >
              <Sparkles className="h-2 w-2" /> Milestone
            </Badge>
          )}
        </div>
      </div>

      {/* Status select */}
      <Select
        value={step.status}
        onValueChange={(v) => onUpdateStep(step.key, { status: v as ProjectStepStatus })}
      >
        <SelectTrigger className="h-7 w-32 shrink-0 text-[11px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value} className="text-[11px]">
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Delete */}
      <button
        onClick={() => onDeleteStep(step.key)}
        disabled={isBusy}
        className={cn(
          "shrink-0 rounded p-1 text-muted-foreground/40",
          "opacity-0 transition-all duration-150 group-hover:opacity-100",
          "hover:bg-red-500/10 hover:text-red-500",
          "disabled:pointer-events-none",
        )}
        aria-label="Delete step"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ─── Add step row ──────────────────────────────────────────────────────── */

function AddStepRow({
  onAdd,
  pending,
}: {
  onAdd: (payload: { label: string; serviceLabel: string; phase: string }) => void;
  pending?: boolean;
}) {
  const [label, setLabel] = useState("");
  const [service, setService] = useState("Website Development");
  const [phase, setPhase] = useState("Execution");
  const [open, setOpen] = useState(false);

  function handleAdd() {
    const trimmed = label.trim();
    if (!trimmed) return;
    onAdd({ label: trimmed, serviceLabel: service, phase });
    setLabel("");
    setOpen(false);
  }

  return (
    <div className="border-t border-border">
      {open ? (
        <div
          className="space-y-2.5 p-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <Input
            autoFocus
            placeholder="Step name, e.g. Wix plugin setup"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="h-8 text-[13px]"
          />
          <div className="flex items-center gap-2">
            <Select value={service} onValueChange={setService}>
              <SelectTrigger className="h-7 flex-1 text-[11px]">
                <SelectValue placeholder="Workstream" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s} className="text-[11px]">{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={phase} onValueChange={setPhase}>
              <SelectTrigger className="h-7 flex-1 text-[11px]">
                <SelectValue placeholder="Phase" />
              </SelectTrigger>
              <SelectContent>
                {PHASE_OPTIONS.map((p) => (
                  <SelectItem key={p} value={p} className="text-[11px]">{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="h-7 gap-1.5 text-[12px]"
              onClick={handleAdd}
              disabled={!label.trim() || pending}
            >
              {pending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
              Add step
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-[12px]"
              onClick={() => { setOpen(false); setLabel(""); }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className={cn(
            "flex w-full items-center gap-2 px-4 py-2.5 text-[12.5px] text-muted-foreground",
            "transition-colors hover:bg-muted/30 hover:text-foreground",
          )}
        >
          <Plus className="h-3.5 w-3.5" />
          Add step
        </button>
      )}
    </div>
  );
}

/* ─── Main editor ───────────────────────────────────────────────────────── */

export function AdminWorkflowEditor({
  steps,
  onUpdateStep,
  onAddStep,
  onDeleteStep,
  onReorderSteps,
  onRegenerate,
  busyStepKey,
  reorderPending,
  addPending,
  regeneratePending,
}: Props) {
  const sorted = [...steps].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const [items, setItems] = useState<string[]>(sorted.map((s) => s.key));
  const [activeId, setActiveId] = useState<string | null>(null);

  // Sync when steps change externally (e.g. after regenerate or add)
  useEffect(() => {
    const incoming = [...steps].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((s) => s.key);
    setItems(incoming);
  }, [steps]);

  const stepMap = new Map(steps.map((s) => [s.key, s]));
  const displaySteps = items.map((k) => stepMap.get(k)).filter(Boolean) as ProjectStep[];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveId(null);
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = items.indexOf(String(active.id));
    const newIdx = items.indexOf(String(over.id));
    const next = arrayMove(items, oldIdx, newIdx);
    setItems(next);
    onReorderSteps(next);
  }

  const activeStep = activeId ? stepMap.get(activeId) : null;

  const done = steps.filter((s) => s.status === "done").length;
  const pct = Math.round((done / Math.max(1, steps.length)) * 100);

  return (
    <div className="space-y-3">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[12.5px] text-muted-foreground">
            {done}/{steps.length} steps · {pct}%
          </span>
          {reorderPending && (
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Saving order…
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerate}
          disabled={regeneratePending}
          className="gap-1.5 text-[12px]"
        >
          {regeneratePending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" />
          )}
          Rebuild from requirements
        </Button>
      </div>

      {/* Sortable list */}
      <div className="overflow-hidden rounded-xl border border-border">
        {steps.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            No workflow steps yet. Add one below or rebuild from requirements.
          </p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {displaySteps.map((step) => (
                <SortableStepRow
                  key={step.key}
                  step={step}
                  onUpdateStep={onUpdateStep}
                  onDeleteStep={onDeleteStep}
                  isBusy={busyStepKey === step.key}
                />
              ))}
            </SortableContext>

            {/* Ghost while dragging */}
            <DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
              {activeStep && (
                <SortableStepRow
                  step={activeStep}
                  onUpdateStep={() => {}}
                  onDeleteStep={() => {}}
                  isOverlay
                />
              )}
            </DragOverlay>
          </DndContext>
        )}

        <AddStepRow onAdd={onAddStep} pending={addPending} />
      </div>

      <p className="text-[11px] text-muted-foreground">
        Drag rows to reorder · Changes sync to the client portal instantly.
      </p>
    </div>
  );
}
