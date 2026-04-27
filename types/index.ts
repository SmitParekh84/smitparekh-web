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

export interface BackendProject {
  _id: string;
  title: string;
  categories: string[];
  shortDescription: string;
  detailMarkdown: string;
  imageUrl: string;
  repoLink: string;
  demoLink: string;
  demoBtn: string;
  isShowcased: boolean;
  isVisible: boolean;
  publishDate: string;
  updatedDate: string;
}

export type BackendProjectInput = Omit<
  BackendProject,
  "_id" | "publishDate" | "updatedDate"
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

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export interface AuthResponse {
  success?: boolean;
  message?: string;
  token: string;
  user?: AuthUser;
}
