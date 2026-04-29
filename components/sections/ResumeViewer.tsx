"use client";

import { useEffect, useRef } from "react";
import { Download, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTrackResumeEvent } from "@/hooks/api/use-resume-events";

interface ResumeViewerProps {
  pdfPath: string;
  fileName: string;
}

export default function ResumeViewer({ pdfPath, fileName }: ResumeViewerProps) {
  const trackEvent = useTrackResumeEvent();
  const trackedView = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode double-invocation in dev.
    if (trackedView.current) return;
    trackedView.current = true;
    trackEvent.mutate("view");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDownloadClick() {
    trackEvent.mutate("download");
  }

  return (
    <section className="page-section">
      <div className="page-container">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
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
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Resume
              </h1>
            </div>
          </div>

          <a
            href={pdfPath}
            download={fileName}
            onClick={handleDownloadClick}
            className={cn(buttonVariants({ size: "sm" }), "gap-2")}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
          <iframe
            src={`${pdfPath}#toolbar=1&navpanes=0&view=FitH`}
            title="Smit Parekh - Resume"
            className="h-[80vh] min-h-[600px] w-full"
          />
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Having trouble viewing?{" "}
          <a
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDownloadClick}
            className="text-blue-500 hover:underline"
          >
            Open the PDF in a new tab
          </a>
          .
        </p>
      </div>
    </section>
  );
}
