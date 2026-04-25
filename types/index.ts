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
