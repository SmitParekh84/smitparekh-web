"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { useProject, useUpdateProject } from "@/hooks/use-projects";
import { toast } from "@/lib/toast";
import type { BackendProjectInput } from "@/types";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: project, isLoading, isError } = useProject(id);
  const updateProject = useUpdateProject();

  async function handleSubmit(data: BackendProjectInput) {
    try {
      await updateProject.mutateAsync({ id, data });
      toast.success("Project updated!");
      router.push("/admin/projects");
    } catch {
      toast.error("Failed to update project", "Please try again.");
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p className="text-sm mb-4">Could not load project.</p>
        <Link
          href="/admin/projects"
          className="text-sm text-blue-500 hover:text-blue-400"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/projects"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Projects
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Edit project</h1>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">{project.title}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 lg:p-8">
        <ProjectForm
          initialData={project}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          isPending={updateProject.isPending}
        />
      </div>
    </div>
  );
}
