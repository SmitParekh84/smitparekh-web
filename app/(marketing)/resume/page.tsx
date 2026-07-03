import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume - Smit Parekh",
  description:
    "The downloadable resume of Smit Parekh is currently unavailable. Contact Smit directly to request a copy.",
  alternates: { canonical: `${siteConfig.url}/resume` },
  robots: { index: false, follow: true },
};

export default function ResumePage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="page-section">
        <div className="page-container">
          <div className="mb-6">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1.5"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>

          <div className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center gap-6 rounded-2xl border border-border bg-muted px-6 py-16 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Resume currently not available
              </h1>
              <p className="mx-auto max-w-md text-sm text-muted-foreground">
                My downloadable resume isn&apos;t available right now. Please get
                in touch with Smit directly and I&apos;ll be happy to share a
                copy.
              </p>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "sm" }), "gap-2")}
              >
                <Mail className="h-4 w-4" />
                Contact Smit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
