"use client";

import { useRef, useState } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { useUploadMyBlogImage } from "@/hooks/api/use-tenant";
import { ImageCropperDialog, shouldSkipCropping, useImageCropper } from "@/components/ui/image-cropper";

interface TenantCoverImagePickerProps {
  value: string;
  onChange: (url: string) => void;
}

export function TenantCoverImagePicker({ value, onChange }: TenantCoverImagePickerProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const upload = useUploadMyBlogImage();
  const cropper = useImageCropper();

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file", "Please select an image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", "Please choose an image under 5 MB.");
      return;
    }
    if (shouldSkipCropping(file)) {
      void doUpload(file);
    } else {
      cropper.openWith(file);
    }
  }

  async function doUpload(file: File) {
    try {
      const result = await upload.mutateAsync(file);
      onChange(result.url);
      toast.success("Image uploaded");
    } catch {
      // error toast handled by hook
    }
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Cover" className="w-full aspect-[16/9] object-cover" />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={upload.isPending}
              className="px-2.5 py-1.5 rounded-lg bg-black/60 text-white text-xs font-medium hover:bg-black/80 transition-colors disabled:opacity-50"
            >
              {upload.isPending ? "Uploading…" : "Change"}
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
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0]); }}
          disabled={upload.isPending}
          className={cn(
            "flex flex-col items-center justify-center gap-2 w-full aspect-[16/9] rounded-xl border-2 border-dashed transition-colors text-sm text-muted-foreground",
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
              <ImageIcon className="h-6 w-6" />
              <span className="font-medium text-foreground">Click to upload, or drag and drop</span>
              <span className="text-xs">PNG, JPG, WEBP — up to 5 MB · Recommended: 1600 × 900</span>
            </>
          )}
        </button>
      )}

      <Input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste an image URL"
        className="h-10"
      />

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      <ImageCropperDialog
        open={cropper.open}
        onOpenChange={cropper.setOpen}
        file={cropper.file}
        aspect={16 / 9}
        onCropped={doUpload}
        confirmLabel="Upload"
      />
    </div>
  );
}
