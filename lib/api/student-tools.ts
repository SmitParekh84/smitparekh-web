import { api } from "./client";

// ─── Note Summarizer ─────────────────────────────────────────
export interface NoteSummarizerPayload {
  text: string;
  depth?: "brief" | "standard" | "deep";
}
export interface NoteSummary {
  title: string;
  summary: string[];
  keyTerms: { term: string; definition: string }[];
  flashcards: { front: string; back: string }[];
  quiz: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
}

// ─── Flashcards ──────────────────────────────────────────────
export interface FlashcardsPayload {
  topic: string;
  count?: number;
  level?: "high-school" | "undergraduate" | "graduate";
}
export interface FlashcardsResponse {
  topic: string;
  cards: { front: string; back: string }[];
}

// ─── Essay Outline ───────────────────────────────────────────
export interface EssayOutlinePayload {
  topic: string;
  wordCount?: number;
  style?: "APA" | "MLA" | "Chicago" | "Harvard" | "general";
  stance?: string;
}
export interface EssayOutline {
  topic: string;
  thesis: string;
  hook: string;
  sections: {
    heading: string;
    wordTarget: number;
    points: string[];
    evidenceIdeas: string[];
  }[];
  conclusion: string;
  citationStyle: string;
  suggestedSources: string[];
}

// ─── Citation ────────────────────────────────────────────────
export interface CitationPayload {
  source: string;
  citationStyle?: "APA" | "MLA" | "Chicago" | "Harvard" | "IEEE";
}
export interface CitationResponse {
  style: string;
  citation: string;
  inText: string;
  fields: {
    authors: string[];
    year: string | null;
    title: string;
    publisher: string | null;
    url: string | null;
    doi: string | null;
  };
  warnings: string[];
}

// ─── Paraphrase ──────────────────────────────────────────────
export interface ParaphrasePayload {
  text: string;
  mode?: "academic" | "formal" | "casual";
}
export interface ParaphraseResponse {
  mode: string;
  variants: { label: string; text: string }[];
  notes: string;
}

// ─── Cover Letter ────────────────────────────────────────────
export interface CoverLetterPayload {
  resume: string;
  jobDescription: string;
  tone?: "professional" | "enthusiastic" | "concise";
  name?: string;
  role?: string;
  company?: string;
}
export interface CoverLetterResponse {
  letter: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  error?: string;
}

export const studentToolsApi = {
  summarizeNotes: async (payload: NoteSummarizerPayload) => {
    const res = await api.post<ApiEnvelope<NoteSummary>>(
      "/student-tools/note-summarizer",
      payload,
    );
    return res.data;
  },
  generateFlashcards: async (payload: FlashcardsPayload) => {
    const res = await api.post<ApiEnvelope<FlashcardsResponse>>(
      "/student-tools/flashcards",
      payload,
    );
    return res.data;
  },
  buildEssayOutline: async (payload: EssayOutlinePayload) => {
    const res = await api.post<ApiEnvelope<EssayOutline>>(
      "/student-tools/essay-outline",
      payload,
    );
    return res.data;
  },
  generateCitation: async (payload: CitationPayload) => {
    const res = await api.post<ApiEnvelope<CitationResponse>>(
      "/student-tools/citation",
      payload,
    );
    return res.data;
  },
  paraphrase: async (payload: ParaphrasePayload) => {
    const res = await api.post<ApiEnvelope<ParaphraseResponse>>(
      "/student-tools/paraphrase",
      payload,
    );
    return res.data;
  },
  generateCoverLetter: async (payload: CoverLetterPayload) => {
    const res = await api.post<ApiEnvelope<CoverLetterResponse>>(
      "/student-tools/cover-letter",
      payload,
    );
    return res.data;
  },
};
