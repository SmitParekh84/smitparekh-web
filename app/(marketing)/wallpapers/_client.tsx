"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ImageOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { WallpaperCard } from "@/components/wallpapers/WallpaperCard";
import { WallpaperFilters } from "@/components/wallpapers/WallpaperFilters";
import {
  useWallpapersInfinite,
  useWallpaperCategories,
} from "@/hooks/api/use-wallpapers";
import type { WallpaperDevice } from "@/types";

// Debounce a fast-changing value (the search box) so we don't refetch per key.
function useDebounced<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function WallpapersClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [device, setDevice] = useState<WallpaperDevice | "all">("all");

  const debouncedSearch = useDebounced(search);

  const params = useMemo(
    () => ({
      q: debouncedSearch || undefined,
      category: category === "All" ? undefined : category,
      device: device === "all" ? undefined : device,
    }),
    [debouncedSearch, category, device]
  );

  const { data: categories = [] } = useWallpaperCategories();
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useWallpapersInfinite(params);

  const items = useMemo(
    () => data?.pages.flatMap((p) => p.data) ?? [],
    [data]
  );
  const total = data?.pages[0]?.total ?? 0;

  // Infinite scroll sentinel.
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <WallpaperFilters
        search={search}
        onSearch={setSearch}
        category={category}
        onCategory={setCategory}
        device={device}
        onDevice={setDevice}
        categories={categories}
      />

      <div className="page-container py-8">
        {!isLoading && !isError && total > 0 && (
          <p className="mb-4 text-sm text-muted-foreground">
            {total} wallpaper{total === 1 ? "" : "s"}
          </p>
        )}

        {/* Loading skeletons */}
        {isLoading && (
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton
                key={i}
                className="mb-4 w-full rounded-2xl"
                style={{ height: 160 + ((i * 47) % 180) }}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="mb-3 text-sm text-muted-foreground">
              Couldn&apos;t load wallpapers. Is the backend running?
            </p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ImageOff className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="text-sm font-medium">No wallpapers found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search or filter.
            </p>
          </div>
        )}

        {/* Masonry grid */}
        {!isLoading && !isError && items.length > 0 && (
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
            {items.map((w) => (
              <WallpaperCard key={w._id} wallpaper={w} />
            ))}
          </div>
        )}

        {/* Infinite-scroll sentinel + spinner */}
        <div ref={sentinelRef} className="h-1" />
        {isFetchingNextPage && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
    </>
  );
}
