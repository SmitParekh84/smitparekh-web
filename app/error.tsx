"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, RefreshCcw, AlertTriangle, Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error boundary:", error);
  }, [error]);

  return (
    <section className="page-section pt-32 pb-24">
      <div className="page-container max-w-2xl text-center">
        <div className="rounded-2xl border border-border bg-card p-10 sm:p-14">
          <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <p className="text-sm font-mono text-muted-foreground mb-2">
            Something went wrong
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            We hit an unexpected snag
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            This is on our end — usually a temporary hiccup. Try again, or
            head somewhere else for now.
          </p>

          {error.digest && (
            <p className="mt-3 text-xs font-mono text-muted-foreground/70">
              Error ID: {error.digest}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={reset}
              className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              Try again
            </button>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-1.5"
              )}
            >
              <Home className="h-3.5 w-3.5" />
              Back to home
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1.5"
              )}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Report this issue
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
