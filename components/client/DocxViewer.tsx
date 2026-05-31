"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  /** Fetcher function that returns a Blob */
  fetchDoc: () => Promise<Blob>;
  className?: string;
}

/**
 * Renders a DOCX blob inline using docx-preview (lazily loaded).
 * Pass a `fetchDoc` function; the component calls it once on mount.
 */
export function DocxViewer({ fetchDoc, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setState("loading");

    async function render() {
      try {
        const [blob, { renderAsync }] = await Promise.all([
          fetchDoc(),
          import("docx-preview"),
        ]);
        if (cancelled || !containerRef.current) return;

        const buf = await blob.arrayBuffer();
        if (cancelled || !containerRef.current) return;

        await renderAsync(buf, containerRef.current, undefined, {
          className: "docx-content",
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          ignoreFonts: false,
          breakPages: true,
          useBase64URL: true,
        });
        if (!cancelled) setState("ready");
      } catch {
        if (!cancelled) setState("error");
      }
    }

    render();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("relative", className)}>
      {state === "loading" && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}
      {state === "error" && (
        <p className="py-10 text-center text-sm text-muted-foreground">
          Could not render document.
        </p>
      )}
      <div
        ref={containerRef}
        className={cn(
          "docx-viewer overflow-auto rounded-xl",
          state !== "ready" && "hidden",
        )}
        style={{ maxHeight: "600px" }}
      />
    </div>
  );
}
