"use client";

import { useRef, useState } from "react";
import {
  Loader2,
  Upload,
  X,
  ImageIcon,
  Check,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";
import {
  useBlogImages,
  useDeleteBlogImage,
  useUploadBlogImage,
} from "@/hooks/use-blogs";
import {
  useProjectImages,
  useDeleteProjectImage,
  useUploadProjectImage,
} from "@/hooks/use-projects";
import type { CloudinaryImage } from "@/lib/api/blogs";

interface CloudinaryImagePickerProps {
  kind: "blog" | "project";
  value: string;
  onChange: (url: string) => void;
  /** Aspect ratio for the preview / dropzone. Defaults to 16:9. */
  previewAspect?: string;
  /** Hint shown in the dropzone. */
  hint?: string;
}

export function CloudinaryImagePicker({
  kind,
  value,
  onChange,
  previewAspect = "aspect-[16/9]",
  hint = "Recommended: 1600 × 900",
}: CloudinaryImagePickerProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<string>("library");

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Cover"
            className={cn("w-full object-cover", previewAspect)}
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-black/60 text-white text-xs font-medium hover:bg-black/80 transition-colors"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "flex flex-col items-center justify-center gap-2 w-full rounded-xl border-2 border-dashed border-border hover:border-blue-500/50 hover:bg-muted/40 transition-colors text-sm text-muted-foreground",
            previewAspect
          )}
        >
          <ImageIcon className="h-6 w-6" />
          <span>Click to choose an image</span>
          <span className="text-xs">{hint}</span>
        </button>
      )}

      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="...or paste an image URL"
        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm transition-colors focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Choose image</DialogTitle>
            <DialogDescription>
              Pick a previously uploaded image or upload a new one.
            </DialogDescription>
          </DialogHeader>

          <Tabs value={tab} onValueChange={(v) => setTab(String(v))} className="flex-1 min-h-0 flex flex-col">
            <TabsList>
              <TabsTab value="library">Library</TabsTab>
              <TabsTab value="upload">Upload new</TabsTab>
            </TabsList>

            <TabsPanel value="library" className="flex-1 min-h-0 overflow-y-auto pr-1 -mr-1">
              <LibraryGrid
                kind={kind}
                currentUrl={value}
                onSelect={(url) => {
                  onChange(url);
                  setOpen(false);
                }}
                onDeleteSelected={() => onChange("")}
              />
            </TabsPanel>

            <TabsPanel value="upload">
              <UploadPanel
                kind={kind}
                onUploaded={(url) => {
                  onChange(url);
                  setOpen(false);
                }}
              />
            </TabsPanel>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ---------------- Library tab ---------------- */

function LibraryGrid({
  kind,
  currentUrl,
  onSelect,
  onDeleteSelected,
}: {
  kind: "blog" | "project";
  currentUrl: string;
  onSelect: (url: string) => void;
  onDeleteSelected: () => void;
}) {
  const blogQuery = useBlogImages(kind === "blog");
  const projectQuery = useProjectImages(kind === "project");
  const query = kind === "blog" ? blogQuery : projectQuery;

  const deleteBlog = useDeleteBlogImage();
  const deleteProject = useDeleteProjectImage();
  const deleteMutation = kind === "blog" ? deleteBlog : deleteProject;

  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  if (query.isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        Loading library…
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        Failed to load library.
        <button
          type="button"
          onClick={() => query.refetch()}
          className="text-blue-500 hover:underline text-xs"
        >
          Retry
        </button>
      </div>
    );
  }

  const images: CloudinaryImage[] = query.data?.images ?? [];

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
        <ImageIcon className="h-6 w-6" />
        No images yet. Switch to the Upload tab to add one.
      </div>
    );
  }

  async function handleDelete(img: CloudinaryImage) {
    try {
      await deleteMutation.mutateAsync(img.publicId);
      toast.success("Image deleted");
      if (currentUrl === img.secureUrl) {
        onDeleteSelected();
      }
      setPendingDelete(null);
    } catch {
      toast.error("Delete failed", "Could not delete image.");
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-1">
      {images.map((img) => {
        const isSelected = img.secureUrl === currentUrl;
        const isConfirming = pendingDelete === img.publicId;
        const isDeleting =
          deleteMutation.isPending &&
          deleteMutation.variables === img.publicId;

        return (
          <div
            key={img.publicId}
            className={cn(
              "group relative rounded-lg overflow-hidden border transition-all",
              isSelected
                ? "border-blue-500 ring-2 ring-blue-500/30"
                : "border-border hover:border-blue-500/40"
            )}
          >
            <button
              type="button"
              onClick={() => onSelect(img.secureUrl)}
              disabled={isDeleting || isConfirming}
              className="block w-full aspect-[16/10] bg-muted disabled:opacity-50"
              aria-label="Use this image"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.secureUrl}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>

            {isSelected && (
              <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 rounded-md bg-blue-500 text-white text-[10px] font-semibold px-1.5 py-0.5">
                <Check className="h-3 w-3" /> In use
              </span>
            )}

            {/* Delete affordance */}
            {!isConfirming ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPendingDelete(img.publicId);
                }}
                disabled={isDeleting}
                className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100 hover:bg-red-600 transition-opacity"
                aria-label="Delete image"
              >
                {isDeleting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <X className="h-3.5 w-3.5" />
                )}
              </button>
            ) : (
              <div className="absolute inset-0 bg-black/80 text-white p-3 flex flex-col items-center justify-center gap-2 text-center">
                <Trash2 className="h-5 w-5 text-red-400" />
                <p className="text-xs leading-tight">
                  Delete this image from Cloudinary?
                </p>
                <div className="flex gap-1.5 mt-1">
                  <button
                    type="button"
                    onClick={() => setPendingDelete(null)}
                    disabled={isDeleting}
                    className="px-2 py-1 rounded-md bg-white/15 hover:bg-white/25 text-[11px] font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(img)}
                    disabled={isDeleting}
                    className="px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 text-[11px] font-semibold inline-flex items-center gap-1 disabled:opacity-60"
                  >
                    {isDeleting && <Loader2 className="h-3 w-3 animate-spin" />}
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Upload tab ---------------- */

function UploadPanel({
  kind,
  onUploaded,
}: {
  kind: "blog" | "project";
  onUploaded: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const uploadBlog = useUploadBlogImage();
  const uploadProject = useUploadProjectImage();
  const upload = kind === "blog" ? uploadBlog : uploadProject;

  async function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file", "Please select an image.");
      return;
    }
    try {
      const result = await upload.mutateAsync(file);
      toast.success("Image uploaded");
      onUploaded(result.url);
    } catch {
      toast.error("Upload failed", "Could not upload image.");
    }
  }

  return (
    <div className="py-3">
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        disabled={upload.isPending}
        className={cn(
          "flex flex-col items-center justify-center gap-3 w-full rounded-xl border-2 border-dashed transition-colors text-sm text-muted-foreground py-12 px-6",
          dragOver
            ? "border-blue-500 bg-blue-500/5"
            : "border-border hover:border-blue-500/50 hover:bg-muted/40",
          upload.isPending && "opacity-60 cursor-not-allowed"
        )}
      >
        {upload.isPending ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Uploading…</span>
          </>
        ) : (
          <>
            <Upload className="h-6 w-6" />
            <span className="font-medium text-foreground">
              Click to upload, or drag and drop
            </span>
            <span className="text-xs">PNG, JPG, WEBP — up to ~5 MB</span>
          </>
        )}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <p className="mt-3 text-xs text-muted-foreground">
        Uploads are saved to your Cloudinary{" "}
        <code className="rounded bg-muted px-1 py-0.5">
          {kind === "blog" ? "blogs/" : "projects/"}
        </code>{" "}
        folder and will appear in the Library tab next time.
      </p>
    </div>
  );
}
