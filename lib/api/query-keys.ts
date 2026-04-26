export const queryKeys = {
  projects: {
    all: ["projects"] as const,
    list: () => [...queryKeys.projects.all, "list"] as const,
    byId: (id: string) => [...queryKeys.projects.all, "id", id] as const,
    byTitle: (title: string) => [...queryKeys.projects.all, "title", title] as const,
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
