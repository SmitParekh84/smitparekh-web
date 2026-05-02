"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGeneratePost } from "@/hooks/api/use-tools";
import { useToolQuota } from "@/hooks/api/use-tool-quota";
import { toast } from "@/lib/toast";
import { LoginGateModal } from "@/components/tools/LoginGateModal";

const TONES = ["Professional", "Casual", "Inspirational", "Story", "Educational"] as const;
const LENGTHS = ["short", "medium", "long"] as const;

export default function LinkedInPostGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<typeof TONES[number]>("Professional");
  const [length, setLength] = useState<typeof LENGTHS[number]>("medium");
  const [audience, setAudience] = useState("");
  const [post, setPost] = useState("");
  const [copied, setCopied] = useState(false);
  const [loginGateOpen, setLoginGateOpen] = useState(false);
  const mutation = useGeneratePost();
  const { checkQuota, isChecking } = useToolQuota("viral-linkedin-post-generator");

  const generate = async () => {
    if (!topic.trim()) return;
    const quota = await checkQuota();
    if (!quota.allowed) {
      setLoginGateOpen(true);
      return;
    }
    mutation.mutate(
      { topic: topic.trim(), tone: tone.toLowerCase() as "professional" | "casual" | "inspirational" | "story" | "educational", length, audience: audience.trim() || undefined },
      {
        onSuccess: (res) => {
          setPost(res.post);
        },
        onError: () => {
          toast.error("Generation failed", "Please try again.");
        },
      },
    );
  };

  const copy = async () => {
    await navigator.clipboard.writeText(post);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied!", "Post copied to clipboard.");
  };

  const charCount = post.length;
  const isOverLimit = charCount > 3000;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Topic or Idea <span className="text-red-400">*</span></label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g. lessons learned from building a SaaS startup…"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tone</label>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  tone === t ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-border bg-card text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Length</label>
            <div className="flex gap-2">
              {LENGTHS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLength(l)}
                  className={`flex-1 rounded-lg border py-2 text-sm font-medium capitalize transition-colors ${
                    length === l ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Target Audience <span className="text-muted-foreground text-xs">(optional)</span></label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="E.g. startup founders, developers…"
              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <button
        onClick={generate}
        disabled={!topic.trim() || mutation.isPending || isChecking}
        className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        {isChecking ? "Checking…" : mutation.isPending ? "Writing post…" : "Generate Post"}
      </button>

      <AnimatePresence>
        {post && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <p className="text-sm font-semibold">Generated Post</p>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${isOverLimit ? "text-red-400" : "text-muted-foreground"}`}>
                  {charCount}/3000
                </span>
                <button
                  onClick={generate}
                  disabled={mutation.isPending}
                  className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                  title="Regenerate"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={copy}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1.5 transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check className="w-3 h-3" />
                      </motion.span>
                    ) : (
                      <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Copy className="w-3 h-3" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <div className="p-4">
              <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed text-foreground/90">
                {post}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginGateModal
        open={loginGateOpen}
        onClose={() => setLoginGateOpen(false)}
        toolName="the LinkedIn Post Generator"
      />
    </div>
  );
}
