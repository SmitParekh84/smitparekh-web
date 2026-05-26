import { api } from "./client";

export interface GeneratePostPayload {
  topic: string;
  tone?: "professional" | "casual" | "inspirational" | "story" | "educational";
  length?: "short" | "medium" | "long";
  audience?: string;
}

export interface GeneratePostResponse {
  post: string;
}

const TONE_MAP: Record<string, { cringeLevel: number; useEmojis: boolean }> = {
  professional:  { cringeLevel: 1, useEmojis: false },
  story:         { cringeLevel: 2, useEmojis: false },
  educational:   { cringeLevel: 2, useEmojis: false },
  inspirational: { cringeLevel: 3, useEmojis: true  },
  casual:        { cringeLevel: 5, useEmojis: true  },
};

const LENGTH_MAP: Record<string, number> = { short: 300, medium: 800, long: 1500 };

function toBackendPayload(p: GeneratePostPayload) {
  const { cringeLevel, useEmojis } = TONE_MAP[p.tone ?? "professional"] ?? TONE_MAP.professional;
  return {
    activity: p.topic,
    advice: p.audience ?? "",
    cringeLevel,
    useEmojis,
    useBulletPoints: false,
    bulletType: "plain",
    characterLength: LENGTH_MAP[p.length ?? "medium"],
    modifiedHookTemplate: "",
  };
}

export const generatePostApi = {
  generate: async (payload: GeneratePostPayload): Promise<GeneratePostResponse> => {
    const res = await api.post<{ generatedPost: string }>("/generate-post", toBackendPayload(payload));
    return { post: res.generatedPost };
  },
};
