"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog post load error:", error);
  }, [error]);

  return (
    <section className="page-section pt-32">
      <div className="page-container max-w-xl text-center">
        <div className="rounded-2xl border border-border bg-card p-10">
          <h1 className="text-2xl font-bold">We couldn&apos;t load this article</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            The server took too long to respond. This is usually temporary —
            give it another try in a moment.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={reset}
              className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              Try again
            </button>
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-1.5"
              )}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
