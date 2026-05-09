/* Global TypeScript types for the Smit Parekh portfolio / tools app */

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Tool {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface BackendProjectOutcome {
  label: string;
  value: string;
  detail?: string;
}

export interface BackendProjectHighlight {
  label: string;
  value: string;
}

export interface BackendProjectTechStack {
  Frontend?: string[];
  Backend?: string[];
  Database?: string[];
  Infrastructure?: string[];
  Tooling?: string[];
}

export interface BackendProject {
  _id: string;
  title: string;
  slug?: string;
  subtitle?: string;
  categories: string[];
  industry?: string;
  role?: string;
  year?: string;
  duration?: string;
  gradient?: string;
  tags?: string[];
  shortDescription: string;
  summary?: string;
  detailMarkdown: string;
  problem?: string;
  approach?: string[];
  outcomes?: BackendProjectOutcome[];
  highlights?: BackendProjectHighlight[];
  techStack?: BackendProjectTechStack;
  lessons?: string[];
  imageUrl: string;
  repoLink: string;
  demoLink: string;
  demoBtn: string;
  isShowcased: boolean;
  isVisible: boolean;
  publishDate: string;
  updatedDate: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
}

export type BackendProjectInput = Omit<
  BackendProject,
  "_id" | "publishDate" | "updatedDate"
>;

export interface BackendBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  readMinutes: number;
  author: string;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
}

export type BackendBlogInput = Omit<
  BackendBlog,
  "_id" | "createdAt" | "updatedAt"
>;

export interface BackendListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

export interface BackendOneResponse<T> {
  success: boolean;
  data: T;
}

/* Admin: Contact submissions */
export interface AdminContactReply {
  subject: string;
  body: string;
  sentAt: string;
  messageId?: string | null;
}

export interface AdminContact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  description: string;
  isRead: boolean;
  readAt?: string | null;
  emailSent: boolean;
  emailError?: string | null;
  ipAddress?: string;
  userAgent?: string;
  isDeleted: boolean;
  deletedAt?: string | null;
  repliedAt?: string | null;
  replyCount?: number;
  lastReplySubject?: string | null;
  replies?: AdminContactReply[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminContactsListResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  unreadCount: number;
  data: AdminContact[];
}

/* Admin: Users */
export interface AdminUser {
  _id: string;
  name?: string;
  email: string;
  role: string;
  provider?: string;
  avatarUrl?: string;
  lastLoginAt?: string | null;
  loginCount?: number;
  isDeleted?: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  success?: boolean;
  message?: string;
  token: string;
  user?: AuthUser;
}
