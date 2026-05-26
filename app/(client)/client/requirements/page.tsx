import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ClipboardList } from "lucide-react";
import { RequirementsForm } from "@/components/client/RequirementsForm";

export const metadata: Metadata = {
  title: "Project Requirements | Client Portal",
  robots: { index: false, follow: false },
};

export default function ClientRequirementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Portal"
        title="Project Requirements"
        description="Tell us what you need and we'll put the right team together."
        icon={ClipboardList}
        align="left"
      />
      <div className="mt-8">
        <RequirementsForm />
      </div>
    </>
  );
}
