"use client";

import { useState } from "react";
import {
  MessageSquare,
  Bug,
  Star,
  Shield,
  Activity,
  Zap,
  Check,
  Send,
  Loader2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { useSubmitFeedback, useMyFeedback } from "@/hooks/api/use-feedback";
import type { FeedbackType, FeedbackStatus } from "@/lib/api";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const HOW_IT_WORKS = [
  { icon: Shield, t: "Reviewed personally", s: "Every submission lands in our inbox. No automated filters." },
  { icon: Activity, t: "Actioned within 48h", s: "Bugs get triaged fast. Ideas are tracked for upcoming releases." },
  { icon: Zap, t: "Shapes what ships next", s: "Recurring feedback directly influences the roadmap." },
  { icon: Check, t: "You hear back", s: "We follow up once the bug is fixed or the feature ships." },
];

const REPORTABLE = [
  { icon: "🐛", label: "API error or unexpected response" },
  { icon: "💡", label: "Feature or endpoint you wish existed" },
  { icon: "⚡", label: "Performance or slow request" },
  { icon: "🔒", label: "Security or privacy concern" },
  { icon: "✍️", label: "Docs typo or wrong info" },
  { icon: "🌟", label: "General experience or rating" },
];

function StarRow({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n === value ? 0 : n)}
          aria-label={`${n} of 5`}
          className={cn(
            "text-muted-foreground/40 transition-colors hover:text-amber-500",
            n <= value && "text-amber-500",
          )}
        >
          <Star className={cn("h-[18px] w-[18px]", n <= value && "fill-current")} />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-1 text-[12.5px] tabular-nums text-muted-foreground">{value}/5</span>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: FeedbackStatus }) {
  if (status === "open")
    return (
      <Badge className="gap-1 border-0 bg-amber-500/15 text-amber-600 dark:text-amber-400">
        Open
      </Badge>
    );
  if (status === "in_review")
    return (
      <Badge className="gap-1 border-0 bg-blue-500/15 text-blue-600 dark:text-blue-400">
        In review
      </Badge>
    );
  return (
    <Badge className="gap-1 border-0 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
      Resolved
    </Badge>
  );
}

export default function HelpFeedbackPage() {
  const { session } = useSupabaseSession();
  const submit = useSubmitFeedback();
  const { data: myFeedback, isLoading: feedbackLoading } = useMyFeedback();

  const meta = session?.user?.user_metadata ?? {};
  const name: string =
    (meta.full_name as string | undefined) ?? (meta.name as string | undefined) ?? "";
  const email: string = session?.user?.email ?? "";

  const [type, setType] = useState<FeedbackType>("feedback");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [done, setDone] = useState(false);

  const list = myFeedback?.data ?? [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    try {
      await submit.mutateAsync({
        name: name || "User",
        email,
        type,
        title: title.trim(),
        message: message.trim(),
        rating: type === "feedback" && rating > 0 ? rating : undefined,
        supabaseUserId: session?.user?.id,
      });
      setDone(true);
      setTitle("");
      setMessage("");
      setRating(0);
      toast.success("Thanks — we got it", "Your message is in our inbox.");
    } catch {
      toast.error("Could not send", "Please try again in a moment.");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-semibold tracking-tight">Help &amp; feedback</h1>
        <p className="text-[13px] text-muted-foreground">
          Report a bug or share an idea. We read every one.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Form + submissions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
              <CardDescription>
                Report a bug, share an idea, or ask a question.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {done ? (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
                  <div className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                  <div className="mt-2 text-[14px] font-semibold">Thanks — we got it</div>
                  <p className="mx-auto mt-1 max-w-md text-[12.5px] text-muted-foreground">
                    Your {type === "bug" ? "bug report" : "message"} is tracked below. You&rsquo;ll
                    hear back at <span className="font-medium text-foreground">{email}</span>.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => setDone(false)}
                  >
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <div className="mb-1.5 text-[13px] font-medium">Type</div>
                    <div className="flex gap-2">
                      {(
                        [
                          { v: "feedback", l: "Feedback or idea", Icon: MessageSquare },
                          { v: "bug", l: "Bug report", Icon: Bug },
                        ] as const
                      ).map((opt) => {
                        const active = type === opt.v;
                        return (
                          <button
                            key={opt.v}
                            type="button"
                            onClick={() => setType(opt.v)}
                            className={cn(
                              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors",
                              active
                                ? opt.v === "bug"
                                  ? "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                                  : "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                : "border-border bg-card text-foreground/70 hover:bg-muted/50",
                            )}
                          >
                            <opt.Icon className="h-3.5 w-3.5" /> {opt.l}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Name</Label>
                      <Input value={name} readOnly className="bg-muted/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Email</Label>
                      <Input value={email} readOnly className="bg-muted/50" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="fb-title">
                      {type === "bug" ? "What went wrong?" : "Subject"}{" "}
                      <span className="text-muted-foreground">({title.length}/120)</span>
                    </Label>
                    <Input
                      id="fb-title"
                      required
                      maxLength={120}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={
                        type === "bug"
                          ? "POST /api/v1/blogs returns 500 when…"
                          : "A short summary of your feedback"
                      }
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="fb-msg">{type === "bug" ? "Steps to reproduce" : "Details"}</Label>
                    <Textarea
                      id="fb-msg"
                      required
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        type === "bug"
                          ? "1. Call the endpoint with…\n2. Expected 201, got 500\n3. Request ID: req_…"
                          : "Tell us a bit more — context, examples, why it matters to you."
                      }
                      className="resize-y font-mono text-[12.5px]"
                    />
                  </div>

                  {type === "feedback" && (
                    <div className="space-y-1.5">
                      <Label>Rating <span className="text-muted-foreground">(optional)</span></Label>
                      <StarRow value={rating} onChange={setRating} />
                    </div>
                  )}

                  <div className="flex items-center justify-end pt-1">
                    <Button
                      type="submit"
                      className="gap-1.5"
                      disabled={submit.isPending || !title.trim() || !message.trim()}
                    >
                      {submit.isPending ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Send className="h-3.5 w-3.5" />
                      )}
                      Send
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
              <div>
                <CardTitle>Your submissions</CardTitle>
                <CardDescription>What you&rsquo;ve sent us and where it stands.</CardDescription>
              </div>
              {!feedbackLoading && <Badge variant="outline">{list.length} total</Badge>}
            </CardHeader>
            <CardContent>
              {feedbackLoading ? (
                <div className="space-y-2">
                  {[0, 1, 2].map((i) => (
                    <Skeleton key={i} className="h-14 w-full" />
                  ))}
                </div>
              ) : list.length === 0 ? (
                <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  You haven&rsquo;t sent anything yet.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {list.map((item) => (
                    <li key={item._id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "grid h-8 w-8 shrink-0 place-items-center rounded-md border",
                            item.type === "bug"
                              ? "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                              : "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
                          )}
                        >
                          {item.type === "bug" ? (
                            <Bug className="h-3.5 w-3.5" />
                          ) : (
                            <MessageSquare className="h-3.5 w-3.5" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[13.5px] font-medium">{item.title}</span>
                            <StatusBadge status={item.status} />
                            {typeof item.rating === "number" && item.rating > 0 && (
                              <span className="inline-flex items-center gap-0.5 text-amber-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      "h-2.5 w-2.5",
                                      i < item.rating! ? "fill-current" : "text-muted-foreground/30",
                                    )}
                                  />
                                ))}
                              </span>
                            )}
                          </div>
                          <div className="mt-0.5 text-[11.5px] text-muted-foreground">
                            {item.type === "bug" ? "Bug report" : "Feedback"} ·{" "}
                            {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {HOW_IT_WORKS.map((h) => (
                <div key={h.t} className="flex items-start gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-muted/40">
                    <h.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-[13px] font-semibold">{h.t}</div>
                    <div className="text-[12px] text-muted-foreground">{h.s}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What&rsquo;s worth reporting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {REPORTABLE.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-2.5 py-1.5"
                >
                  <span className="text-[13px]">{r.icon}</span>
                  <span className="text-[12.5px] text-foreground/80">{r.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="grid h-9 w-9 place-items-center rounded-md border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
              <div className="leading-tight">
                <div className="text-[13px] font-medium">Big idea or partnership?</div>
                <div className="text-[12px] text-muted-foreground">Reach out directly.</div>
              </div>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "ml-auto")}
              >
                Contact
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
