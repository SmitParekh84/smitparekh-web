"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { useUploadWallpapers } from "@/hooks/api/use-wallpapers";

export function WallpaperUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const upload = useUploadWallpapers();

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) {
      toast.error("No images", "Only image files can be uploaded.");
      return;
    }
    if (files.length > 20) {
      toast.error("Too many files", "Upload up to 20 wallpapers at a time.");
      return;
    }

    try {
      const res = await upload.mutateAsync(files);
      const ok = res.data.length;
      const failed = res.errors.length;
      if (ok > 0) {
        toast.success(
          `Uploaded ${ok} wallpaper${ok === 1 ? "" : "s"}`,
          "Add details below, then publish."
        );
      }
      if (failed > 0) {
        toast.error(
          `${failed} failed`,
          res.errors.map((e) => e.file).join(", ")
        );
      }
    } catch {
      toast.error("Upload failed", "Please try again.");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (!upload.isPending) handleFiles(e.dataTransfer.files);
      }}
      onClick={() => !upload.isPending && inputRef.current?.click()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors",
        dragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/40 hover:bg-muted/40",
        upload.isPending && "pointer-events-none opacity-70"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      {upload.isPending ? (
        <>
          <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium">Uploading to Cloudinary...</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Large images may take a moment.
          </p>
        </>
      ) : (
        <>
          <div className="mb-3 rounded-full bg-primary/10 p-3 text-primary">
            <UploadCloud className="h-7 w-7" />
          </div>
          <p className="text-sm font-medium">
            Drop wallpapers here, or click to browse
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <ImageIcon className="h-3 w-3" />
            Up to 20 images. They upload as drafts - publish after adding details.
          </p>
        </>
      )}
    </div>
  );
}
