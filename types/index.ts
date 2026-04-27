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
