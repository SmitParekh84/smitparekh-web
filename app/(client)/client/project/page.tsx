"use client";

import { ProjectTimeline } from "@/components/client/ProjectTimeline";

export default function ClientProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Project</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track progress and open the resources we&apos;ve shared with you.
        </p>
      </div>
      <ProjectTimeline />
    </div>
  );
}
