import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog - Web Development & Engineering Notes by Smit Parekh",
  description:
    "Articles, tutorials and engineering notes by Smit Parekh on React, Next.js, Node.js, TypeScript, and full-stack development.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  keywords: [
    "Smit Parekh blog",
    "web development blog",
    "React tutorials",
    "Next.js tutorials",
    "Node.js articles",
    "TypeScript articles",
    "full stack engineering blog",
    "JavaScript tutorials",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: `${siteConfig.url}/blog`,
    title: "Blog - Web Development & Engineering Notes by Smit Parekh",
    description:
      "Articles and engineering notes on React, Next.js, Node.js and TypeScript by Smit Parekh.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
        width: 800,
        height: 800,
        alt: "Smit Parekh - Blog",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: "Blog - Smit Parekh",
    description:
      "Articles on React, Next.js, Node.js and full-stack engineering.",
    images: [
      {
        url: `${siteConfig.url}/images/Smit-Parekh-Home.png`,
        width: 800,
        height: 800,
        alt: "Smit Parekh - Blog",
      },
    ],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
