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
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        <h1 className="text-2xl font-bold">New Project</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Add a new project to your portfolio
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-7 sm:p-9">
        <ProjectForm
          onSubmit={handleSubmit}
          submitLabel="Create Project"
          isPending={createProject.isPending}
        />
      </div>
    </div>
  );
}
