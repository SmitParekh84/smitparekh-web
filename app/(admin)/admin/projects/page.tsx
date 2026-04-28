"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Star,
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useProjects,
  useDeleteProject,
  useUpdateProject,
  useGenerateProject,
  useDeletedProjects,
  useRestoreProject,
  usePermanentDeleteProject,
} from "@/hooks/use-projects";
import { TrashTable } from "@/components/admin/TrashTable";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"active" | "trash">("active");
  const { data: projects, isLoading, isError, refetch } = useProjects();
  const {
    data: deletedProjects,
    isLoading: isLoadingTrash,
    isError: isErrorTrash,
    refetch: refetchTrash,
  } = useDeletedProjects();
  const deleteProject = useDeleteProject();
  const restoreProject = useRestoreProject();
  const permanentDeleteProject = usePermanentDeleteProject();
  const updateProject = useUpdateProject();
  const generateProject = useGenerateProject();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMode, setAiMode] = useState<"idea" | "rewrite">("idea");
  const [aiPrompt, setAiPrompt] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);

  const visibleIds = (projects ?? []).map((p) => p._id);
  const allChecked =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const someChecked =
    !allChecked && visibleIds.some((id) => selectedIds.has(id));

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    setSelectedIds((prev) => {
      if (visibleIds.every((id) => prev.has(id))) return new Set();
      return new Set(visibleIds);
    });
  }
  function clearSelection() {
    setSelectedIds(new Set());
  }

  async function handleBulkUpdate(
    field: "isVisible" | "isShowcased",
    value: boolean
  ) {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    setBulkBusy(true);
    try {
      await Promise.all(
        ids.map((id) =>
          updateProject.mutateAsync({ id, data: { [field]: value } })
        )
      );
      toast.success(
        `Updated ${ids.length} ${ids.length === 1 ? "project" : "projects"}`
      );
      clearSelection();
    } catch {
      toast.error("Bulk update failed", "Some projects may not have updated.");
    } finally {
      setBulkBusy(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteProject.mutateAsync(id);
      toast.success("Moved to trash", {
        action: {
          label: "Undo",
          onClick: () => {
            restoreProject.mutate(id, {
              onSuccess: () => toast.success("Project restored"),
              onError: () =>
                toast.error("Restore failed", "Could not restore project."),
            });
          },
        },
      });
      setConfirmId(null);
    } catch {
      toast.error("Delete failed", "Could not delete project.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleToggle(
    id: string,
    field: "isVisible" | "isShowcased",
    next: boolean
  ) {
    setTogglingId(id + ":" + field);
    try {
      await updateProject.mutateAsync({ id, data: { [field]: next } });
    } catch {
      toast.error("Update failed", "Could not update project.");
    } finally {
      setTogglingId(null);
    }
  }

  async function handleAiGenerate() {
    const prompt = aiPrompt.trim();
    if (!prompt) {
      toast.error("Enter details", "Type your project notes or idea.");
      return;
    }
    try {
      const res = await generateProject.mutateAsync({ mode: aiMode, prompt });
      sessionStorage.setItem("project-ai-draft", JSON.stringify(res.data));
      toast.success("Draft generated", "Add an image, review, and save.");
      setAiOpen(false);
      setAiPrompt("");
      router.push("/admin/projects/new?ai=1");
    } catch (err) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Try again in a moment.";
      toast.error("AI generation failed", msg);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <p className="text-sm text-muted-foreground">
            Manage your portfolio projects.
          </p>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setAiOpen(true)}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4 text-blue-500" />
            Generate with AI
          </Button>
          <Link
            href="/admin/projects/new"
            className={cn(buttonVariants({ size: "sm" }), "gap-2")}
          >
            <Plus className="h-4 w-4" />
            New project
          </Link>
        </div>
      </div>

      {aiOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => !generateProject.isPending && setAiOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-2 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold">Generate project draft</h3>
                <p className="text-xs text-muted-foreground">
                  Pick a mode and describe the project - AI fills the new entry.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAiOpen(false)}
                disabled={generateProject.isPending}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAiMode("idea")}
                disabled={generateProject.isPending}
                className={cn(
                  "rounded-xl border p-3 text-left text-xs transition-colors",
                  aiMode === "idea"
                    ? "border-blue-500 bg-blue-500/5"
                    : "border-border hover:border-blue-500/40"
                )}
              >
                <p className="text-sm font-medium">From an idea</p>
                <p className="mt-0.5 text-muted-foreground">
                  Describe a concept - AI generates the whole case study.
                </p>
              </button>
              <button
                type="button"
                onClick={() => setAiMode("rewrite")}
                disabled={generateProject.isPending}
                className={cn(
                  "rounded-xl border p-3 text-left text-xs transition-colors",
                  aiMode === "rewrite"
                    ? "border-blue-500 bg-blue-500/5"
                    : "border-border hover:border-blue-500/40"
                )}
              >
                <p className="text-sm font-medium">Rewrite my notes</p>
                <p className="mt-0.5 text-muted-foreground">
                  Paste real notes - product/client names get stripped.
                </p>
              </button>
            </div>

            <textarea
              autoFocus
              rows={aiMode === "rewrite" ? 8 : 5}
              maxLength={4000}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={generateProject.isPending}
              placeholder={
                aiMode === "rewrite"
                  ? "Paste raw notes, README excerpts, or a draft. Real metrics & tech are kept - brand names removed."
                  : "Describe the project. e.g. 'A real-time fintech dashboard that lets traders track positions across 5 brokers, with sub-second updates and risk alerts.'"
              }
              className="w-full resize-y rounded-xl border border-border bg-background px-3 py-2 text-sm transition-colors focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">
              {aiPrompt.length}/4000
            </p>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAiOpen(false)}
                disabled={generateProject.isPending}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleAiGenerate}
                disabled={generateProject.isPending || !aiPrompt.trim()}
                className="gap-1.5"
              >
                {generateProject.isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-1 border-b border-border">
        <button
          type="button"
          onClick={() => setTab("active")}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors",
            tab === "active"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Active
          {tab === "active" && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-500" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setTab("trash")}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors",
            tab === "trash"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Trash
          {deletedProjects && deletedProjects.length > 0 && (
            <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-muted px-1 text-[10px] font-semibold text-muted-foreground">
              {deletedProjects.length}
            </span>
          )}
          {tab === "trash" && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-500" />
          )}
        </button>
      </div>

      {tab === "trash" ? (
        <Card>
          <CardHeader>
            <CardTitle>Trash</CardTitle>
            <CardDescription>
              Soft-deleted projects. Restore or permanently delete.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <TrashTable
              data={deletedProjects?.map((p) => ({
                _id: p._id,
                title: p.title,
                imageUrl: p.imageUrl,
                subtitle: p.shortDescription,
                deletedAt: p.deletedAt,
              }))}
              isLoading={isLoadingTrash}
              isError={isErrorTrash}
              onRefetch={() => refetchTrash()}
              onRestore={(id) => restoreProject.mutateAsync(id)}
              onPermanentDelete={(id) =>
                permanentDeleteProject.mutateAsync(id)
              }
              noun="project"
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
        <CardHeader>
          <CardTitle>All projects</CardTitle>
          <CardDescription>
            {projects ? `${projects.length} total` : "-"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {isError && (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Could not load projects. Is the backend running?
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !isError && projects && projects.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-muted-foreground mb-4">No projects yet.</p>
              <Link
                href="/admin/projects/new"
                className={cn(buttonVariants({ size: "sm" }), "gap-2")}
              >
                <Plus className="h-4 w-4" />
                Add your first project
              </Link>
            </div>
          )}

          {!isLoading && !isError && projects && projects.length > 0 && (
            <>
              {selectedIds.size > 0 && (
                <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-2">
                  <span className="text-xs font-medium">
                    {selectedIds.size} selected
                  </span>
                  <span className="ml-1 hidden text-xs text-muted-foreground sm:inline">
                    Apply to all:
                  </span>
                  <div className="ml-auto flex flex-wrap items-center gap-1.5">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-xs"
                      disabled={bulkBusy}
                      onClick={() => handleBulkUpdate("isVisible", true)}
                    >
                      <Eye className="h-3.5 w-3.5" /> Show
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-xs"
                      disabled={bulkBusy}
                      onClick={() => handleBulkUpdate("isVisible", false)}
                    >
                      <EyeOff className="h-3.5 w-3.5" /> Hide
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-xs"
                      disabled={bulkBusy}
                      onClick={() => handleBulkUpdate("isShowcased", true)}
                    >
                      <Star className="h-3.5 w-3.5" /> Feature
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-xs"
                      disabled={bulkBusy}
                      onClick={() => handleBulkUpdate("isShowcased", false)}
                    >
                      <Star className="h-3.5 w-3.5 opacity-40" /> Unfeature
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-7 gap-1 text-xs"
                      disabled={bulkBusy}
                      onClick={clearSelection}
                    >
                      {bulkBusy ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <X className="h-3.5 w-3.5" />
                      )}
                      Clear
                    </Button>
                  </div>
                </div>
              )}
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[1%] pr-0">
                    <input
                      type="checkbox"
                      aria-label="Select all"
                      checked={allChecked}
                      ref={(el) => {
                        if (el) el.indeterminate = someChecked;
                      }}
                      onChange={toggleAll}
                      className="h-4 w-4 cursor-pointer rounded border-border accent-blue-500"
                    />
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden sm:table-cell">Categories</TableHead>
                  <TableHead className="hidden md:table-cell">Visible</TableHead>
                  <TableHead className="hidden lg:table-cell">Featured</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead className="w-[1%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow
                    key={project._id}
                    data-state={selectedIds.has(project._id) ? "selected" : undefined}
                  >
                    <TableCell className="pr-0">
                      <input
                        type="checkbox"
                        aria-label={`Select ${project.title}`}
                        checked={selectedIds.has(project._id)}
                        onChange={() => toggleOne(project._id)}
                        className="h-4 w-4 cursor-pointer rounded border-border accent-blue-500"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {project.imageUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={project.imageUrl}
                            alt=""
                            className="h-9 w-9 shrink-0 rounded-lg border border-border object-cover"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-medium">{project.title}</p>
                          <p className="line-clamp-1 max-w-[260px] text-xs text-muted-foreground">
                            {project.shortDescription}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {project.categories.slice(0, 2).map((cat) => (
                          <Badge key={cat} variant="secondary" className="px-2 py-0 text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <button
                        type="button"
                        title={project.isVisible !== false ? "Click to hide" : "Click to show"}
                        disabled={togglingId === project._id + ":isVisible"}
                        onClick={() =>
                          handleToggle(
                            project._id,
                            "isVisible",
                            project.isVisible === false
                          )
                        }
                        className="rounded-md p-1 transition-colors hover:bg-muted disabled:opacity-50"
                      >
                        {togglingId === project._id + ":isVisible" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : project.isVisible !== false ? (
                          <Eye className="h-4 w-4 text-green-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground/50" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <button
                        type="button"
                        title={project.isShowcased ? "Click to unfeature" : "Click to feature"}
                        disabled={togglingId === project._id + ":isShowcased"}
                        onClick={() =>
                          handleToggle(
                            project._id,
                            "isShowcased",
                            !project.isShowcased
                          )
                        }
                        className="rounded-md p-1 transition-colors hover:bg-muted disabled:opacity-50"
                      >
                        {togglingId === project._id + ":isShowcased" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : project.isShowcased ? (
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ) : (
                          <Star className="h-4 w-4 text-muted-foreground/40" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                      {new Date(project.publishDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              buttonVariants({ variant: "ghost", size: "icon" }),
                              "h-7 w-7"
                            )}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <Link
                          href={`/admin/projects/${project._id}/edit`}
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "h-7 w-7"
                          )}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>

                        {confirmId === project._id ? (
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-7 px-2 text-xs"
                              disabled={deletingId === project._id}
                              onClick={() => handleDelete(project._id)}
                            >
                              {deletingId === project._id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                "Confirm"
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 px-2 text-xs"
                              onClick={() => setConfirmId(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => setConfirmId(project._id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </>
          )}
        </CardContent>
      </Card>
      )}
    </div>
  );
}
