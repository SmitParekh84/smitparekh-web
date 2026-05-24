export interface TenantFeatures {
  aiBlogGeneration: boolean;
  aiTopicSuggestions: boolean;
  aiContentImprove: boolean;
  aiSeoMeta: boolean;
}

export const TENANT_FEATURE_DEFS = [
  { key: "aiBlogGeneration", label: "AI Blog Generation", description: "Generate full blog drafts from a topic." },
  { key: "aiTopicSuggestions", label: "AI Topic Suggestions", description: "Suggest blog topic ideas." },
  { key: "aiContentImprove", label: "AI Content Improve", description: "Rewrite, expand, or improve a draft." },
  { key: "aiSeoMeta", label: "AI SEO Meta", description: "Generate SEO title, description, and tags." },
] as const satisfies ReadonlyArray<{
  key: keyof TenantFeatures;
  label: string;
  description: string;
}>;

// Fallback used when a tenant document predates the `features` field
// (Mongoose .lean() reads do NOT apply schema defaults to old docs).
export const DEFAULT_TENANT_FEATURES: TenantFeatures = {
  aiBlogGeneration: false,
  aiTopicSuggestions: false,
  aiContentImprove: false,
  aiSeoMeta: false,
};
