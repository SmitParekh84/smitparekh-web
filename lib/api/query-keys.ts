export const queryKeys = {
  projects: {
    all: ["projects"] as const,
    list: () => [...queryKeys.projects.all, "list"] as const,
    deleted: () => [...queryKeys.projects.all, "deleted"] as const,
    byId: (id: string) => [...queryKeys.projects.all, "id", id] as const,
    byTitle: (title: string) => [...queryKeys.projects.all, "title", title] as const,
    bySlug: (slug: string) => [...queryKeys.projects.all, "slug", slug] as const,
    images: () => [...queryKeys.projects.all, "images"] as const,
  },
  blogs: {
    all: ["blogs"] as const,
    list: () => [...queryKeys.blogs.all, "list"] as const,
    deleted: () => [...queryKeys.blogs.all, "deleted"] as const,
    byId: (id: string) => [...queryKeys.blogs.all, "id", id] as const,
    bySlug: (slug: string) => [...queryKeys.blogs.all, "slug", slug] as const,
    images: () => [...queryKeys.blogs.all, "images"] as const,
  },
  feedback: {
    all: ["feedback"] as const,
    list: () => [...queryKeys.feedback.all, "list"] as const,
  },
  chat: {
    all: ["chat"] as const,
    sessions: (params?: { page?: number; limit?: number; search?: string }) =>
      [...queryKeys.chat.all, "sessions", params ?? {}] as const,
    session: (id: string) => [...queryKeys.chat.all, "session", id] as const,
  },
  meta: {
    all: ["meta"] as const,
    tags: (url: string) => [...queryKeys.meta.all, "tags", url] as const,
    seoReports: () => [...queryKeys.meta.all, "seo-reports"] as const,
  },
  adminContacts: {
    all: ["admin-contacts"] as const,
    list: (params?: { page?: number; limit?: number; unread?: boolean }) =>
      [...queryKeys.adminContacts.all, "list", params ?? {}] as const,
    deleted: () => [...queryKeys.adminContacts.all, "deleted"] as const,
    detail: (id: string) =>
      [...queryKeys.adminContacts.all, "detail", id] as const,
  },
  adminUsers: {
    all: ["admin-users"] as const,
    list: () => [...queryKeys.adminUsers.all, "list"] as const,
    deleted: () => [...queryKeys.adminUsers.all, "deleted"] as const,
  },
  resumeEvents: {
    all: ["resume-events"] as const,
    stats: (days: number) =>
      [...queryKeys.resumeEvents.all, "stats", days] as const,
  },
} as const;
