"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare, Bug, Star, Send, CheckCircle2, Loader2,
  Lightbulb, ShieldCheck, Zap, Clock, ArrowRight, HeartHandshake,
  LogIn, X,
} from "lucide-react";
import { useSubmitFeedback } from "@/hooks/api/use-feedback";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { createClient } from "@/lib/supabase/client";
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

/* ── login gate modal ───────────────────────────────────────────────────────── */

function GoogleIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function LoginGateModal({ type, onClose }: { type: FeedbackType; onClose: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/feedback` },
    });
  }

  // Close on backdrop click
  function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-card border rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <LogIn className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h2 className="font-semibold text-base leading-tight">Sign in to submit</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Free account - takes 5 seconds
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Why */}
        <p className="text-sm text-muted-foreground">
          We require sign-in to keep {type === "bug" ? "bug reports" : "feedback"} genuine and to be able to follow up with you once it's addressed.
        </p>

        {/* Benefits */}
        <ul className="space-y-2">
          {[
            { emoji: "🛡️", text: "Prevents spam - keeps all reports genuine" },
            { emoji: "💌", text: "Get notified when your report is resolved" },
            { emoji: "📋", text: "View and track your past submissions" },
          ].map(({ emoji, text }) => (
            <li key={text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <span className="text-base leading-none w-5 text-center">{emoji}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium h-10 transition-colors"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            {loading ? "Redirecting…" : "Continue with Google"}
          </button>
          <Link
            href={`/login?next=/feedback`}
            className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            Sign in with email instead →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── submit form ────────────────────────────────────────────────────────────── */

function SubmitForm() {
  const { session, isLoading: sessionLoading } = useSupabaseSession();
  const { mutate, isPending, isSuccess } = useSubmitFeedback();
  const [showLoginGate, setShowLoginGate] = useState(false);

  const [type, setType] = useState<FeedbackType>("feedback");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  // Pre-fill name/email once session resolves
  useEffect(() => {
    if (session) {
      setName(session.user.user_metadata?.full_name ?? "");
      setEmail(session.user.email ?? "");
    }
  }, [session]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setShowLoginGate(true);
      return;
    }
    mutate({
      type,
      name,
      email,
      title,
      message,
      rating: rating > 0 ? rating : undefined,
      supabaseUserId: session.user.id,
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
    <>
      {showLoginGate && (
        <LoginGateModal type={type} onClose={() => setShowLoginGate(false)} />
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Not-logged-in nudge banner */}
        {!sessionLoading && !session && (
          <div className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
            <LogIn className="h-4 w-4 text-blue-500 shrink-0" />
            <p className="text-sm text-muted-foreground flex-1">
              <Link href="/login?next=/feedback" className="text-blue-600 hover:underline dark:text-blue-400 font-medium">
                Sign in
              </Link>
              {" "}to submit - we follow up when bugs are fixed.
            </p>
          </div>
        )}

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

        <button
          type="submit"
          disabled={isPending || sessionLoading}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {isPending ? "Submitting…" : session ? "Submit" : "Submit (sign in required)"}
        </button>
      </form>
    </>
  );
}

/* ── what happens next panel ────────────────────────────────────────────────── */

const HOW_IT_WORKS = [
  {
    icon: <ShieldCheck className="h-5 w-5 text-blue-500" />,
    title: "Reviewed personally",
    desc: "Every submission lands in my inbox. I read each one - no automated filters.",
  },
  {
    icon: <Clock className="h-5 w-5 text-purple-500" />,
    title: "Actioned within 48 h",
    desc: "Bug reports get triaged fast. Feature ideas are tracked for upcoming releases.",
  },
  {
    icon: <Zap className="h-5 w-5 text-yellow-500" />,
    title: "Shapes what ships next",
    desc: "Recurring feedback directly influences the roadmap - your voice matters.",
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

        {/* Right - how it works */}
        <HowItWorksPanel />
      </div>
    </main>
  );
}
