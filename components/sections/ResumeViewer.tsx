"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Download, ArrowLeft, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTrackResumeEvent } from "@/hooks/api/use-resume-events";

interface ResumeViewerProps {
  pdfPath: string;
  fileName: string;
}

// Mobile browsers (Chrome/Safari on Android & iOS) refuse to render PDFs
// inside an <iframe> and show "This content is blocked". Detect those
// platforms so we can show a fallback UI instead of a broken viewer.
const MOBILE_UA_RE = /Android|iPhone|iPad|iPod|Mobile/i;

function subscribeToMobile() {
  // User agent doesn't change after page load, so no subscription is needed.
  return () => {};
}

function getIsMobileSnapshot() {
  return MOBILE_UA_RE.test(navigator.userAgent);
}

function getIsMobileServerSnapshot() {
  return false;
}

export default function ResumeViewer({ pdfPath, fileName }: ResumeViewerProps) {
  const trackEvent = useTrackResumeEvent();
  const trackedView = useRef(false);
  const isMobile = useSyncExternalStore(
    subscribeToMobile,
    getIsMobileSnapshot,
    getIsMobileServerSnapshot
  );

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
          {isMobile ? (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-semibold sm:text-lg">
                  Preview not available on mobile
                </h2>
                <p className="max-w-md text-sm text-muted-foreground">
                  Mobile browsers don&apos;t support inline PDF previews. Open
                  the resume in a new tab or download it to view.
                </p>
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "sm" }), "gap-2")}
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in new tab
                </a>
                <a
                  href={pdfPath}
                  download={fileName}
                  onClick={handleDownloadClick}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "gap-2"
                  )}
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </div>
            </div>
          ) : (
            <iframe
              src={`${pdfPath}#toolbar=1&navpanes=0&view=FitH`}
              title="Smit Parekh - Resume"
              className="h-[80vh] min-h-[600px] w-full"
            />
          )}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Having trouble viewing?{" "}
          <a
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
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
