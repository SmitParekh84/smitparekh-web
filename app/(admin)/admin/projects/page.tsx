"use client";

import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink, Star, Loader2 } from "lucide-react";
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
import { useProjects, useDeleteProject } from "@/hooks/use-projects";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const { data: projects, isLoading, isError, refetch } = useProjects();
  const deleteProject = useDeleteProject();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteProject.mutateAsync(id);
      toast.success("Project deleted");
      setConfirmId(null);
    } catch {
      toast.error("Delete failed", "Could not delete project.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <p className="text-sm text-muted-foreground">
            Manage your portfolio projects.
          </p>
        </div>
        <Link href="/admin/projects/new" className={cn(buttonVariants({ size: "sm" }), "gap-2")}>
          <Plus className="h-4 w-4" />
          New project
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All projects</CardTitle>
          <CardDescription>
            {projects ? `${projects.length} total` : "—"}
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden sm:table-cell">Categories</TableHead>
                  <TableHead className="hidden md:table-cell">Featured</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead className="w-[1%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project._id}>
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
                      {project.isShowcased ? (
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
