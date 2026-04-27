import { api, apiClient } from "./client";
import { isPythonApiEnabled, pythonApiClient } from "./python-client";

export interface CompressOptions {
  quality?: number;
  format?: "jpeg" | "png" | "webp";
}

export const removeBgApi = {
  /**
   * Strip background from an image. Routes to the Python tools service
   * (`/api/remove-bg`) when `NEXT_PUBLIC_PYTHON_API_URL` is set, otherwise
   * falls back to the Node backend (`/remove-background`).
   */
  removeBackground: async (image: File): Promise<Blob> => {
    if (isPythonApiEnabled && pythonApiClient) {
      const form = new FormData();
      form.append("file", image);
      const res = await pythonApiClient.post<Blob>("/api/remove-bg", form, {
        responseType: "blob",
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    }
    const form = new FormData();
    form.append("image", image);
    const res = await apiClient.post("/remove-background", form, {
      responseType: "blob",
      headers: { "Content-Type": "multipart/form-data" },
    });

    const blob = res.data as Blob;

    // Older server versions return JSON { imageUrl: "..." } — fetch the real image
    if (blob.type.includes("json") || blob.type.includes("text")) {
      const text = await blob.text();
      const json = JSON.parse(text) as { imageUrl?: string };
      if (json.imageUrl) {
        const imgRes = await fetch(json.imageUrl);
        if (!imgRes.ok) throw new Error("Failed to fetch processed image");
        return imgRes.blob();
      }
    }

    return blob;
  },
  compressImage: async (image: File, options?: CompressOptions): Promise<Blob> => {
    const form = new FormData();
    form.append("image", image);
    if (options?.quality !== undefined) form.append("quality", String(options.quality));
    if (options?.format) form.append("format", options.format);
    const res = await apiClient.post<Blob>("/compress-image", form, {
      responseType: "blob",
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
  compressBulk: (images: File[], options?: CompressOptions) => {
    const form = new FormData();
    images.forEach((file) => form.append("images", file));
    if (options?.quality !== undefined) form.append("quality", String(options.quality));
    if (options?.format) form.append("format", options.format);
    return api.postForm<{ success: boolean; data: Array<{ url: string; size: number }> }>(
      "/compress-images",
      form,
    );
  },
};
