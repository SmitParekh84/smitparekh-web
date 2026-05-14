"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AppSelect } from "@/components/ui/app-select";
import { useSubmitContact } from "@/hooks/api/use-contact";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  "New project — building from scratch",
  "Existing project — needs help / take-over",
  "Audit only — diagnose then decide",
  "Retainer / ongoing engagement",
  "Not sure yet — exploring",
];

const BUDGETS = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Hourly / retainer",
];

const TIMELINES = [
  "ASAP — within 2 weeks",
  "1 month",
  "2–3 months",
  "3+ months",
  "Flexible",
];

interface ServiceLeadFormProps {
  serviceTitle: string;
  variant?: "card" | "embed";
  compact?: boolean;
  defaultMessage?: string;
}

export function ServiceLeadForm({
  serviceTitle,
  variant = "card",
  compact = false,
  defaultMessage,
}: ServiceLeadFormProps) {
  const submitContact = useSubmitContact();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: PROJECT_TYPES[0],
    budget: BUDGETS[1],
    timeline: TIMELINES[2],
    message: defaultMessage ?? "",
  });

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Missing fields", "Name, email, and message are required.");
      return;
    }
    const subject = `[${serviceTitle}] ${form.projectType} — ${form.budget}`;
    const description = [
      `Service: ${serviceTitle}`,
      form.company.trim() ? `Company: ${form.company.trim()}` : null,
      `Project type: ${form.projectType}`,
      `Budget: ${form.budget}`,
      `Timeline: ${form.timeline}`,
      "",
      "Message:",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await submitContact.mutateAsync({
        name: form.name.trim(),
        email: form.email.trim(),
        subject,
        description,
      });
      setSubmitted(true);
      toast.success(
        "Message sent!",
        "I'll get back to you within 24 hours with next steps."
      );
    } catch {
      toast.error("Failed to send", "Please try again or email me directly.");
    }
  }

  if (submitted) {
    return (
      <div
        className={cn(
          variant === "card" && "rounded-2xl border border-border bg-card p-6 sm:p-8",
          "text-center"
        )}
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">Message received</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          Thanks {form.name.split(" ")[0]}. I&apos;ll reply to{" "}
          <span className="font-medium text-foreground">{form.email}</span>{" "}
          within 24 hours with a scoping question or a written estimate.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        variant === "card" && "rounded-2xl border border-border bg-card p-6 sm:p-8",
        "space-y-4"
      )}
    >
      {variant === "card" && !compact && (
        <div className="mb-2">
          <h3 className="text-lg font-semibold tracking-tight">
            Start a conversation
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Reply within 24 hours. No sales call required upfront.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="lead-name">Name *</Label>
          <Input
            id="lead-name"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Your name"
            required
            disabled={submitContact.isPending}
            className="h-10"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lead-email">Email *</Label>
          <Input
            id="lead-email"
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="you@company.com"
            required
            disabled={submitContact.isPending}
            className="h-10"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lead-company">Company (optional)</Label>
        <Input
          id="lead-company"
          value={form.company}
          onChange={(e) => setField("company", e.target.value)}
          placeholder="Your company"
          disabled={submitContact.isPending}
          className="h-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Project type</Label>
          <AppSelect
            value={form.projectType}
            onValueChange={(v) => setField("projectType", v)}
            options={PROJECT_TYPES}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Budget</Label>
          <AppSelect
            value={form.budget}
            onValueChange={(v) => setField("budget", v)}
            options={BUDGETS}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Timeline</Label>
        <AppSelect
          value={form.timeline}
          onValueChange={(v) => setField("timeline", v)}
          options={TIMELINES}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lead-message">Project details *</Label>
        <Textarea
          id="lead-message"
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          placeholder="What are you building? What's the current state? Any specific tech or constraints?"
          required
          rows={5}
          disabled={submitContact.isPending}
          className="resize-y"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitContact.isPending}
        className="w-full gap-2"
      >
        {submitContact.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {submitContact.isPending ? "Sending..." : "Send & get a reply in 24h"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Or email{" "}
        <a
          href="mailto:smitparekh02@gmail.com"
          className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          smitparekh02@gmail.com
        </a>{" "}
        directly.
      </p>
    </form>
  );
}
