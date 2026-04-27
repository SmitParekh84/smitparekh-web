"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { useCreateProject } from "@/hooks/use-projects";
import { toast } from "@/lib/toast";
import type { BackendProjectInput } from "@/types";

export default function NewProjectPage() {
  const router = useRouter();
  const createProject = useCreateProject();

  async function handleSubmit(data: BackendProjectInput) {
    try {
      await createProject.mutateAsync(data);
      toast.success("Project created!");
      router.push("/admin/projects");
    } catch {
      toast.error("Failed to create project", "Please try again.");
    }
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
        <h1 className="text-2xl font-semibold tracking-tight">New project</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Add a new project to your portfolio.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 lg:p-9">
        <ProjectForm
          onSubmit={handleSubmit}
          submitLabel="Create Project"
          isPending={createProject.isPending}
        />
      </div>
    </div>
  );
}
