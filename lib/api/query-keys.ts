export const queryKeys = {
  projects: {
    all: ["projects"] as const,
    list: () => [...queryKeys.projects.all, "list"] as const,
    byId: (id: string) => [...queryKeys.projects.all, "id", id] as const,
    byTitle: (title: string) => [...queryKeys.projects.all, "title", title] as const,
    bySlug: (slug: string) => [...queryKeys.projects.all, "slug", slug] as const,
  },
  blogs: {
    all: ["blogs"] as const,
    list: () => [...queryKeys.blogs.all, "list"] as const,
    byId: (id: string) => [...queryKeys.blogs.all, "id", id] as const,
    bySlug: (slug: string) => [...queryKeys.blogs.all, "slug", slug] as const,
  },
  feedback: {
    all: ["feedback"] as const,
    list: () => [...queryKeys.feedback.all, "list"] as const,
  },
  meta: {
    all: ["meta"] as const,
    tags: (url: string) => [...queryKeys.meta.all, "tags", url] as const,
    seoReports: () => [...queryKeys.meta.all, "seo-reports"] as const,
  },
} as const;
