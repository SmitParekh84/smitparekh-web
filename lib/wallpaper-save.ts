/**
 * Wallpaper save logic - the piece that makes "save to gallery" work across
 * iPhone, Android, and desktop.
 *
 * Strategy:
 *   1. Fetch the ORIGINAL Cloudinary image as a blob. We deliberately do NOT
 *      run it through optimizeImageUrl() - `f_auto` can serve AVIF, which
 *      iOS Photos refuses to save. The original (jpg/png/webp) saves cleanly.
 *   2. If the browser can share files (iOS + most Android), open the native
 *      share sheet with the file. On iOS this gives a one-tap "Save Image"
 *      straight into Photos.
 *   3. Otherwise fall back to a normal <a download> (desktop, older Android).
 *
 * The CSP `connect-src` must include https://res.cloudinary.com for the fetch
 * to succeed (see next.config.ts). Cloudinary itself returns
 * `Access-Control-Allow-Origin: *`, so cross-origin fetch is allowed.
 */

export type SaveOutcome =
  | "shared" // native share sheet opened (iOS/Android → Photos)
  | "downloaded" // file downloaded (desktop / Android fallback)
  | "cancelled" // user dismissed the share sheet - no-op, not an error
  | "fallback-open"; // share blocked; opened raw image for long-press save

export interface SaveResult {
  outcome: SaveOutcome;
}

function extensionFor(format: string, blobType: string): string {
  const fromFormat = (format || "").toLowerCase().replace("jpeg", "jpg");
  if (fromFormat) return fromFormat;
  const fromType = blobType.split("/")[1] || "jpg";
  return fromType.replace("jpeg", "jpg");
}

function safeFileName(title: string, ext: string): string {
  const base =
    title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "wallpaper";
  return `${base}.${ext}`;
}

function triggerDownload(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoke on the next tick so the download has claimed the URL.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

interface SaveInput {
  imageUrl: string; // ORIGINAL Cloudinary secure_url
  title: string;
  format?: string;
}

export async function saveWallpaper({
  imageUrl,
  title,
  format = "",
}: SaveInput): Promise<SaveResult> {
  const res = await fetch(imageUrl, { mode: "cors" });
  if (!res.ok) throw new Error(`Failed to fetch image (${res.status})`);
  const blob = await res.blob();

  const ext = extensionFor(format, blob.type);
  const fileName = safeFileName(title, ext);
  const file = new File([blob], fileName, {
    type: blob.type || "image/jpeg",
  });

  const nav = typeof navigator !== "undefined" ? navigator : undefined;
  const canShareFiles =
    !!nav?.canShare && nav.canShare({ files: [file] }) && !!nav.share;

  if (canShareFiles) {
    try {
      await nav!.share({ files: [file], title });
      return { outcome: "shared" };
    } catch (err) {
      const name = (err as { name?: string })?.name;
      // User tapped away - not a failure, don't fall through to a download.
      if (name === "AbortError") return { outcome: "cancelled" };
      // iOS sometimes drops the user-gesture after the await (NotAllowedError).
      // Open the raw image in a new tab so the user can long-press → Add to
      // Photos, instead of hitting a dead end.
      if (name === "NotAllowedError") {
        window.open(imageUrl, "_blank", "noopener,noreferrer");
        return { outcome: "fallback-open" };
      }
      // Any other share failure: fall back to a plain download.
      triggerDownload(blob, fileName);
      return { outcome: "downloaded" };
    }
  }

  triggerDownload(blob, fileName);
  return { outcome: "downloaded" };
}

/** True when the current device is likely to save via the share sheet (iOS). */
export function prefersShareSave(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (ua.includes("Macintosh") && "ontouchend" in document);
  return isIOS;
}
