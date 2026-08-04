import type { WallpaperDevice } from "@/types";

export function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return "-";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const value = bytes / 1024 ** i;
  return `${value >= 10 || i === 0 ? Math.round(value) : value.toFixed(1)} ${units[i]}`;
}

export function formatCount(n: number): string {
  if (!n || n < 0) return "0";
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}k`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}

export function resolutionLabel(width: number, height: number): string {
  if (!width || !height) return "";
  const shortest = Math.min(width, height);
  if (shortest >= 4320) return "8K";
  if (shortest >= 2160) return "4K";
  if (shortest >= 1440) return "2K";
  if (shortest >= 1080) return "HD";
  return `${width}×${height}`;
}

export const deviceLabels: Record<WallpaperDevice, string> = {
  phone: "Phone",
  tablet: "Tablet",
  desktop: "Desktop",
};
