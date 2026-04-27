import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Smit Parekh — Full Stack Developer & Free Web Tools",
    short_name: "Smit Parekh",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
