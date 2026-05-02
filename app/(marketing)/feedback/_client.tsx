"use client";

import { useState } from "react";
import {
  MessageSquare, Bug, Star, Send, CheckCircle2, Loader2,
  Lightbulb, ShieldCheck, Zap, Clock, ArrowRight, HeartHandshake,
} from "lucide-react";
import { useSubmitFeedback } from "@/hooks/api/use-feedback";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import type { FeedbackType } from "@/lib/api";

/* ── helpers ───────────────────────────────────────────────────────────────── */

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="p-0.5 transition-transform hover:scale-110"
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              n <= (hovered || value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

/* ── submit form ────────────────────────────────────────────────────────────── */

function SubmitForm() {
  const { session } = useSupabaseSession();
  const { mutate, isPending, isSuccess, isError } = useSubmitFeedback();

  const [type, setType] = useState<FeedbackType>("feedback");
  const [name, setName] = useState(session?.user.user_metadata?.full_name ?? "");
  const [email, setEmail] = useState(session?.user.email ?? "");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      type,
      name,
      email,
      title,
      message,
      rating: rating > 0 ? rating : undefined,
      supabaseUserId: session?.user.id,
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-green-500" />
        <h3 className="text-lg font-semibold">Thanks for submitting!</h3>
        <p className="text-sm text-muted-foreground">
          Your {type === "bug" ? "bug report" : "feedback"} has been received and will be reviewed.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Type toggle */}
      <div className="flex gap-2">
        {(["feedback", "bug"] as FeedbackType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              type === t
                ? t === "bug"
                  ? "bg-red-500 text-white"
                  : "bg-purple-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t === "bug" ? <Bug className="h-3.5 w-3.5" /> : <MessageSquare className="h-3.5 w-3.5" />}
            {t === "bug" ? "Bug Report" : "Feedback"}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Name *</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email *</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          {type === "bug" ? "What went wrong? *" : "Subject *"}
        </label>
        <input
          required
          maxLength={120}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={type === "bug" ? "Brief description of the bug" : "What's your feedback about?"}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          {type === "bug" ? "Steps to reproduce *" : "Details *"}
        </label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            type === "bug"
              ? "1. Go to...\n2. Click on...\n3. See error..."
              : "Tell me more..."
          }
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring"
        />
      </div>

      {type === "feedback" && (
        <div>
          <label className="mb-1.5 block text-sm font-medium">Rating (optional)</label>
          <StarRating value={rating} onChange={setRating} />
        </div>
      )}

      {isError && (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {isPending ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}

/* ── what happens next panel ────────────────────────────────────────────────── */

const HOW_IT_WORKS = [
  {
    icon: <ShieldCheck className="h-5 w-5 text-blue-500" />,
    title: "Reviewed personally",
    desc: "Every submission lands in my inbox. I read each one — no automated filters.",
  },
  {
    icon: <Clock className="h-5 w-5 text-purple-500" />,
    title: "Actioned within 48 h",
    desc: "Bug reports get triaged fast. Feature ideas are tracked for upcoming releases.",
  },
  {
    icon: <Zap className="h-5 w-5 text-yellow-500" />,
    title: "Shapes what ships next",
    desc: "Recurring feedback directly influences the roadmap — your voice matters.",
  },
  {
    icon: <HeartHandshake className="h-5 w-5 text-green-500" />,
    title: "You hear back",
    desc: "Provide your email and I'll follow up once the bug is fixed or feature ships.",
  },
];

const GOOD_FEEDBACK = [
  { icon: "🐛", label: "Broken button / layout issue" },
  { icon: "💡", label: "Feature you wish existed" },
  { icon: "⚡", label: "Performance or loading problem" },
  { icon: "🔒", label: "Security or privacy concern" },
  { icon: "✍️", label: "Content typo or wrong info" },
  { icon: "🌟", label: "General experience rating" },
];

function HowItWorksPanel() {
  return (
    <div className="space-y-8">
      {/* How it works */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold">What happens after you submit?</h2>
        </div>
        <div className="space-y-4">
          {HOW_IT_WORKS.map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-3 rounded-xl border bg-card p-4 shadow-sm">
              <div className="mt-0.5 shrink-0">{icon}</div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What to report */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold">What's worth reporting?</h2>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {GOOD_FEEDBACK.map(({ icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2.5 text-sm"
            >
              <span>{icon}</span>
              <span className="text-muted-foreground">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA strip */}
      <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 dark:border-blue-900/40 dark:bg-blue-950/30">
        <div>
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Got a bigger idea?</p>
          <p className="text-xs text-blue-700/70 dark:text-blue-400">
            Reach out directly via the contact page.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Contact <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

/* ── page ───────────────────────────────────────────────────────────────────── */

export default function FeedbackClientPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Submit form */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold">Submit</h2>
          <SubmitForm />
        </div>

        {/* Right — how it works */}
        <HowItWorksPanel />
      </div>
    </main>
  );
}
