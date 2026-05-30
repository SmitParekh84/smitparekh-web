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
  site?: "smit" | "marketixpert";
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

/* ─── Client Onboarding ─────────────────────────────────────────────────── */

export type ClientStatus = "invited" | "onboarded" | "active" | "inactive";
export type InvitationStatus = "pending" | "accepted" | "expired";

export interface Client {
  _id: string;
  name?: string;
  email: string;
  mobile?: string;
  company?: string;
  status: ClientStatus;
  invitedAt: string;
  onboardedAt?: string | null;
  invitationExpiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ClientInvitation {
  token: string;
  email: string;
  status: InvitationStatus;
  expiresAt: string;
  invitedBy?: string;
}

/* ─── Service / Requirements Form ──────────────────────────────────────── */

export type ServiceCategory =
  | "website"
  | "seo"
  | "ai-automation"
  | "custom-software";

export type BudgetRange =
  | "under-500"
  | "500-2000"
  | "2000-5000"
  | "5000-15000"
  | "15000-50000"
  | "50000-plus"
  | "not-sure";

export type Timeline =
  | "asap"
  | "1-month"
  | "2-3-months"
  | "3-6-months"
  | "6-plus-months"
  | "flexible";

export type WorkPreference = "us" | "vendor" | "freelancer";

export interface WebsiteRequirements {
  hasExistingWebsite: boolean;
  existingUrl?: string;
  websiteGoals?: string[]; // redesign, add-features, fix-bugs, performance, other
  websiteType?: string; // landing-page, ecommerce, portfolio, blog, webapp, other
  hasDesigner?: "yes" | "no" | "need-one";
  hasContent?: "yes" | "no" | "need-help";
}

export interface SeoRequirements {
  hasExistingWebsite: boolean;
  existingUrl?: string;
  workingWithAgency?: "no" | "another-agency" | "you";
  primaryGoal?: string[]; // increase-traffic, improve-rankings, local-seo, technical-seo, all
  hasAnalytics?: boolean;
}

export interface AiAutomationRequirements {
  automationGoals?: string[]; // email, support-chatbot, data-processing, reports, social-media, integration, other
  hasExistingSystems?: boolean;
  existingSystemsDescription?: string;
  techPreference?: string; // no-preference, specific-describe
  techPreferenceDetail?: string;
}

export interface CustomSoftwareRequirements {
  softwareType?: string; // web-app, mobile-ios, mobile-android, mobile-both, desktop, api-backend, other
  hasDesignWireframes?: "yes" | "no" | "need-help";
  hasTechSpec?: "yes" | "no" | "need-help";
  description: string;
}

export interface ClientRequirements {
  _id?: string;
  clientId?: string;
  categories: ServiceCategory[];
  budget: BudgetRange;
  timeline: Timeline;
  workPreference: WorkPreference;
  vendorCompanyName?: string;
  freelancerProfileUrl?: string;
  hasUxDesigner?: boolean;
  additionalNotes?: string;
  website?: WebsiteRequirements;
  seo?: SeoRequirements;
  aiAutomation?: AiAutomationRequirements;
  customSoftware?: CustomSoftwareRequirements;
  submittedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

/* ─── Project Workflow ─────────────────────────────────────────────────── */

export type ProjectStepStatus = "pending" | "in_progress" | "done" | "skipped";

export interface ProjectStepLink {
  label: string;
  url: string;
}

export interface ProjectStep {
  key: string;
  service?: string;
  serviceLabel?: string;
  phase?: string;
  label: string;
  status: ProjectStepStatus;
  startDate?: string | null;
  endDate?: string | null;
  note?: string;
  links?: ProjectStepLink[];
  order: number;
}

export interface ClientProject {
  _id: string;
  clientId: string;
  steps: ProjectStep[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectStepPatch {
  status?: ProjectStepStatus;
  startDate?: string | null;
  endDate?: string | null;
  note?: string;
  links?: ProjectStepLink[];
}

/* ─── Invoices ─────────────────────────────────────────────────────────── */

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";
export type InvoiceCurrency = "USD" | "INR";

export interface InvoiceLineItem {
  description: string;
  amount: number;
}

export interface InvoiceStatusEvent {
  status: InvoiceStatus;
  at: string;
  by: string;
}

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  clientId: string | { _id: string; name?: string; email?: string; company?: string };
  projectId?: string | null;
  title: string;
  lineItems: InvoiceLineItem[];
  currency: InvoiceCurrency;
  amount: number;
  notes?: string;
  status: InvoiceStatus;
  dueDate?: string | null;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  paidAt?: string | null;
  statusHistory: InvoiceStatusEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: InvoiceCurrency;
  keyId: string;
}
