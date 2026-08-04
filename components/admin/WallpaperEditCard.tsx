"use client";

import { useState } from "react";
import { Loader2, Trash2, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { resolutionLabel } from "@/lib/wallpaper-format";
import {
  useUpdateWallpaper,
  useDeleteWallpaper,
} from "@/hooks/api/use-wallpapers";
import type { Wallpaper, WallpaperDevice, WallpaperUpdateInput } from "@/types";

interface WallpaperEditCardProps {
  wallpaper: Wallpaper;
  categorySuggestions: string[];
}

export function WallpaperEditCard({
  wallpaper,
  categorySuggestions,
}: WallpaperEditCardProps) {
  const [title, setTitle] = useState(wallpaper.title);
  const [category, setCategory] = useState(wallpaper.category);
  const [tags, setTags] = useState(wallpaper.tags.join(", "));
  const [confirmDelete, setConfirmDelete] = useState(false);

  const update = useUpdateWallpaper();
  const remove = useDeleteWallpaper();

  async function save(data: WallpaperUpdateInput, label: string) {
    try {
      await update.mutateAsync({ id: wallpaper._id, data });
    } catch {
      toast.error("Update failed", `Could not update ${label}.`);
    }
  }

  function saveTitleOnBlur() {
    const trimmed = title.trim();
    if (!trimmed || trimmed === wallpaper.title) return;
    save({ title: trimmed }, "title");
  }

  function saveCategoryOnBlur() {
    const trimmed = category.trim() || "General";
    if (trimmed === wallpaper.category) return;
    save({ category: trimmed }, "category");
  }

  function saveTagsOnBlur() {
    const parsed = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (parsed.join(",") === wallpaper.tags.join(",")) return;
    save({ tags: parsed }, "tags");
  }

  async function handleDelete() {
    try {
      await remove.mutateAsync(wallpaper._id);
      toast.success("Wallpaper deleted");
    } catch {
      toast.error("Delete failed");
    }
  }

  const res = resolutionLabel(wallpaper.width, wallpaper.height);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* Preview */}
      <div className="relative aspect-[4/3] w-full bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={wallpaper.imageUrl}
          alt={wallpaper.title}
          className="h-full w-full object-cover"
        />
        <span
          className={cn(
            "absolute left-2 top-2 rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
            wallpaper.isPublished
              ? "bg-emerald-500 text-white"
              : "bg-amber-500 text-white"
          )}
        >
          {wallpaper.isPublished ? "Published" : "Draft"}
        </span>
        {res && (
          <span className="absolute right-2 top-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            {res}
          </span>
        )}
        {wallpaper.isPublished && (
          <a
            href={`/wallpapers/${wallpaper.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 rounded-md bg-black/55 p-1.5 text-white hover:bg-black/70"
            title="View public page"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {/* Fields */}
      <div className="space-y-3 p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitleOnBlur}
            className="h-9"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Category
            </label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onBlur={saveCategoryOnBlur}
              list="wallpaper-categories"
              className="h-9"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Device
            </label>
            <Select
              value={wallpaper.device}
              onValueChange={(v) =>
                save({ device: v as WallpaperDevice }, "device")
              }
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
                <SelectItem value="desktop">Desktop</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Tags (comma-separated)
          </label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            onBlur={saveTagsOnBlur}
            placeholder="nature, green, minimal"
            className="h-9"
          />
        </div>

        <datalist id="wallpaper-categories">
          {categorySuggestions.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        {/* Publish + delete */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <label className="flex items-center gap-2 text-sm">
            <Switch
              checked={wallpaper.isPublished}
              onCheckedChange={(v) => save({ isPublished: v }, "publish state")}
              disabled={update.isPending}
            />
            <span className="text-muted-foreground">
              {wallpaper.isPublished ? "Published" : "Draft"}
            </span>
          </label>

          {confirmDelete ? (
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="destructive"
                className="h-7 px-2 text-xs"
                onClick={handleDelete}
                disabled={remove.isPending}
              >
                {remove.isPending ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  "Delete"
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => setConfirmDelete(true)}
              title="Delete wallpaper"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
