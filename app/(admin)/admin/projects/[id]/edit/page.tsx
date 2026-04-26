"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
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
  return (
    <AdminGuard>
      <EditProject id={id} />
    </AdminGuard>
  );
}

function EditProject({ id }: { id: string }) {
  const router = useRouter();
  const { data: project, isLoading, isError } = useProject(id);
  const updateProject = useUpdateProject();

  async function handleSubmit(data: BackendProjectInput) {
    try {
      await updateProject.mutateAsync({ id, data });
      toast.success("Project updated!");
      router.push("/admin");
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
          href="/admin"
          className="text-sm text-blue-500 hover:text-blue-400"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        <h1 className="text-2xl font-bold">Edit Project</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{project.title}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-7 sm:p-9">
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
