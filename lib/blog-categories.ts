// UI mirror of the API's config/blog-categories.js - keep in sync.
export const BLOG_CATEGORIES = [
  "SEO",
  "Marketing",
  "Web Development",
  "Programming",
  "AI / ML",
  "Business",
  "Design",
  "Career",
  "DevOps",
  "Tutorials",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogPreferences {
  niche: string;
  audience: string;
  categories: string[];
}

export type ImproveMode = "improve" | "rewrite" | "expand" | "shorten";
