/**
 * Cloudinary URL helpers.
 *
 * Injects format/quality auto transformations into Cloudinary URLs so the
 * CDN serves AVIF/WebP at optimal quality automatically. Non-Cloudinary URLs
 * are returned unchanged.
 *
 * Cloudinary URL shape:
 *   https://res.cloudinary.com/<cloud>/image/upload/<transforms>/<public_id>
 *
 * We splice `f_auto,q_auto` into the `<transforms>` segment if not present.
 */

const CLOUDINARY_HOST = "res.cloudinary.com";
const AUTO_TRANSFORMS = "f_auto,q_auto";

export function optimizeImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  try {
    const u = new URL(url);
    if (u.hostname !== CLOUDINARY_HOST) return url;

    // /<cloud>/image/upload/<rest>
    const marker = "/upload/";
    const idx = u.pathname.indexOf(marker);
    if (idx === -1) return url;

    const afterUpload = u.pathname.slice(idx + marker.length);

    if (afterUpload.includes("f_auto") || afterUpload.includes("q_auto")) {
      return url;
    }

    u.pathname =
      u.pathname.slice(0, idx + marker.length) +
      AUTO_TRANSFORMS +
      "/" +
      afterUpload;
    return u.toString();
  } catch {
    return url;
  }
}
