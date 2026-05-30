import type { Metadata } from "next";
import { RequirementsForm } from "@/components/client/RequirementsForm";

export const metadata: Metadata = {
  title: "Project Requirements | Client Portal",
  robots: { index: false, follow: false },
};

export default function ClientRequirementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Requirements</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us what you need and we&apos;ll put the right team together.
        </p>
      </div>
      <RequirementsForm />
    </div>
  );
}
