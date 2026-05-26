"use client";

import { useState, Fragment } from "react";
import { Plus, Trash2, RotateCcw, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AppSelect } from "@/components/ui/app-select";
import { Spinner } from "@/components/ui/spinner";
import {
  useAdminClientProject,
  useUpdateProjectStep,
  useRegenerateClientProject,
} from "@/hooks/api/use-clients";
import { STEP_STATUS_CONFIG, STEP_STATUS_ORDER } from "@/components/client-project/status";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import type { ProjectStep, ProjectLink, ProjectStepStatus } from "@/types";

const STATUS_OPTIONS = STEP_STATUS_ORDER.map((s) => ({
  value: s,
  label: STEP_STATUS_CONFIG[s].label,
}));

function dateInputValue(iso?: string | null) {
  if (!iso) return "";
  return new Date(iso).toISOString().slice(0, 10);
}

function StepEditor({ clientId, step }: { clientId: string; step: ProjectStep }) {
  const updateStep = useUpdateProjectStep(clientId);

  const [status, setStatus] = useState<ProjectStepStatus>(step.status);
  const [startDate, setStartDate] = useState(dateInputValue(step.startDate));
  const [endDate, setEndDate] = useState(dateInputValue(step.endDate));
  const [note, setNote] = useState(step.note ?? "");
  const [links, setLinks] = useState<ProjectLink[]>(step.links ?? []);

  // State resets when the server copy changes via the `key` prop in the parent
  // (after save / regenerate) — see <StepEditor key=...> below.

  function setLink(i: number, patch: Partial<ProjectLink>) {
    setLinks((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }
  function addLink() {
    setLinks((prev) => [...prev, { label: "", url: "" }]);
  }
  function removeLink(i: number) {
    setLinks((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    const cleanedLinks = links
      .map((l) => ({ label: (l.label ?? "").trim(), url: l.url.trim() }))
      .filter((l) => l.url.length > 0);
    const badUrl = cleanedLinks.find((l) => !/^https?:\/\//i.test(l.url));
    if (badUrl) {
      toast.error("Invalid link", "Each link URL must start with http:// or https://");
      return;
    }
    try {
      await updateStep.mutateAsync({
        stepKey: step.key,
        payload: {
          status,
          startDate: startDate || null,
          endDate: endDate || null,
          note,
          links: cleanedLinks,
        },
      });
      toast.success("Saved", `"${step.label}" updated.`);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Could not save step.";
      toast.error("Save failed", msg);
    }
  }

  const cfg = STEP_STATUS_CONFIG[status];

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <cfg.icon className={`h-4 w-4 ${cfg.iconClassName}`} />
          <span className="text-sm font-medium">{step.label}</span>
        </div>
        <AppSelect
          value={status}
          onValueChange={(v) => setStatus(v as ProjectStepStatus)}
          options={STATUS_OPTIONS}
          triggerClassName="w-36"
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs">Start date</Label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-9" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">End date</Label>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-9" />
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <Label className="text-xs">Note (visible to client when in progress / done)</Label>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={1000}
          rows={2}
          placeholder="What's the update? e.g. Design draft ready for review."
        />
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Resource links</Label>
          <Button type="button" variant="ghost" size="sm" onClick={addLink} className="h-7 gap-1 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add link
          </Button>
        </div>
        {links.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Add Google Doc / Sheet / Drive links the client can open.
          </p>
        )}
        {links.map((link, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              value={link.label ?? ""}
              onChange={(e) => setLink(i, { label: e.target.value })}
              placeholder="Label (e.g. Design file)"
              maxLength={80}
              className="h-9 w-40 shrink-0"
            />
            <Input
              value={link.url}
              onChange={(e) => setLink(i, { url: e.target.value })}
              placeholder="https://docs.google.com/…"
              maxLength={500}
              className="h-9 flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeLink(i)}
              className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-end">
        <Button size="sm" onClick={handleSave} disabled={updateStep.isPending}>
          {updateStep.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export function ProjectWorkflow({ clientId }: { clientId: string }) {
  const projectQuery = useAdminClientProject(clientId);
  const regenerate = useRegenerateClientProject(clientId);
  const [confirmRegen, setConfirmRegen] = useState(false);

  const steps = projectQuery.data?.data?.steps ?? [];
  const ordered = [...steps].sort((a, b) => a.order - b.order);

  async function handleRegenerate() {
    if (!confirmRegen) {
      setConfirmRegen(true);
      setTimeout(() => setConfirmRegen(false), 4000);
      return;
    }
    setConfirmRegen(false);
    try {
      await regenerate.mutateAsync();
      toast.success("Workflow regenerated", "Steps rebuilt from current requirements.");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Could not regenerate.";
      toast.error("Failed", msg);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base">Project workflow</CardTitle>
          <CardDescription>Drive each step and share notes &amp; resource links.</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRegenerate}
          disabled={regenerate.isPending}
          className="gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {confirmRegen ? "Click again to confirm" : "Regenerate"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {projectQuery.isLoading && (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        )}
        {projectQuery.isError && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Could not load the project. Is the backend running?
          </p>
        )}
        {!projectQuery.isLoading && !projectQuery.isError && ordered.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No workflow yet — it generates once the client submits requirements. Try
            &quot;Regenerate&quot;.
          </p>
        )}
        {ordered.map((step, i) => {
          const prev = ordered[i - 1];
          const showPhaseHeader = !prev || prev.serviceLabel !== step.serviceLabel || prev.phase !== step.phase;
          return (
            <Fragment key={step.key}>
              {showPhaseHeader && (
                <div className="flex items-center gap-2 pt-2">
                  {step.serviceLabel && <Badge variant="secondary">{step.serviceLabel}</Badge>}
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {step.phase}
                  </span>
                </div>
              )}
              <StepEditor
                key={`${step.status}|${step.startDate ?? ""}|${step.endDate ?? ""}|${step.note ?? ""}|${(step.links ?? []).map((l) => `${l.label}=${l.url}`).join(",")}`}
                clientId={clientId}
                step={step}
              />
            </Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
}
