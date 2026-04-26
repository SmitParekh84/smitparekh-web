"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, ExternalLink, Star, Loader2 } from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { useProjects, useDeleteProject } from "@/hooks/use-projects";
import { clearAdminToken } from "@/hooks/use-auth";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <Dashboard />
    </AdminGuard>
  );
}

function Dashboard() {
  const router = useRouter();
  const { data: projects, isLoading, isError, refetch } = useProjects();
  const deleteProject = useDeleteProject();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  function handleLogout() {
    clearAdminToken();
    router.replace("/admin/login");
  }

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
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your portfolio projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Logout
          </button>
          <Link
            href="/admin/projects/new"
            className={cn(buttonVariants({ size: "sm" }), "gap-2")}
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>
      </div>

      {/* Table */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Could not load projects. Is the backend running?
          </p>
          <button
            onClick={() => refetch()}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          {projects && projects.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-sm mb-4">No projects yet.</p>
              <Link
                href="/admin/projects/new"
                className={cn(buttonVariants({ size: "sm" }), "gap-2")}
              >
                <Plus className="w-4 h-4" />
                Add Your First Project
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                      Title
                    </th>
                    <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell">
                      Categories
                    </th>
                    <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">
                      Featured
                    </th>
                    <th className="text-left px-5 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">
                      Date
                    </th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {projects?.map((project) => (
                    <tr
                      key={project._id}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {project.imageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={project.imageUrl}
                              alt=""
                              className="w-8 h-8 rounded-lg object-cover border border-border shrink-0"
                            />
                          )}
                          <div>
                            <p className="font-medium leading-snug">
                              {project.title}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                              {project.shortDescription}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 hidden sm:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {project.categories.slice(0, 2).map((cat) => (
                            <Badge
                              key={cat}
                              variant="secondary"
                              className="text-xs px-2 py-0"
                            >
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </td>

                      <td className="px-5 py-4 hidden md:table-cell">
                        {project.isShowcased ? (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )}
                      </td>

                      <td className="px-5 py-4 hidden lg:table-cell text-muted-foreground text-xs">
                        {new Date(project.publishDate).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {project.demoLink && (
                            <a
                              href={project.demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <Link
                            href={`/admin/projects/${project._id}/edit`}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>

                          {confirmId === project._id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(project._id)}
                                disabled={deletingId === project._id}
                                className="px-2 py-1 rounded-lg text-xs bg-destructive text-destructive-foreground hover:bg-destructive/80 transition-colors"
                              >
                                {deletingId === project._id ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  "Confirm"
                                )}
                              </button>
                              <button
                                onClick={() => setConfirmId(null)}
                                className="px-2 py-1 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmId(project._id)}
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {!isLoading && !isError && projects && (
        <p className="text-xs text-muted-foreground">
          {projects.length} project{projects.length !== 1 ? "s" : ""} total
        </p>
      )}
    </div>
  );
}
