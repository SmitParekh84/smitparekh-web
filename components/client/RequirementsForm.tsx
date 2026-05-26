"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  Code2,
  Globe,
  Loader2,
  Search,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AppSelect } from "@/components/ui/app-select";
import { Badge } from "@/components/ui/badge";
import { useSubmitRequirements, useMyRequirements } from "@/hooks/api/use-clients";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type {
  ServiceCategory,
  BudgetRange,
  Timeline,
  WorkPreference,
  ClientRequirements,
} from "@/types";

/* ─── Static options ────────────────────────────────────────────────────── */

const SERVICES: {
  id: ServiceCategory;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: "website",
    label: "Website Development",
    description: "Landing pages, e-commerce, web apps",
    icon: Globe,
  },
  {
    id: "seo",
    label: "SEO",
    description: "Organic traffic, rankings, technical SEO",
    icon: Search,
  },
  {
    id: "ai-automation",
    label: "AI & Automation",
    description: "Chatbots, workflows, data processing",
    icon: Bot,
  },
  {
    id: "custom-software",
    label: "Custom Software",
    description: "Web apps, mobile apps, APIs",
    icon: Code2,
  },
];

const BUDGET_OPTIONS: { value: BudgetRange; label: string }[] = [
  { value: "under-500", label: "Under $500" },
  { value: "500-2000", label: "$500 – $2,000" },
  { value: "2000-5000", label: "$2,000 – $5,000" },
  { value: "5000-15000", label: "$5,000 – $15,000" },
  { value: "15000-50000", label: "$15,000 – $50,000" },
  { value: "50000-plus", label: "$50,000+" },
  { value: "not-sure", label: "Not sure / Flexible" },
];

const TIMELINE_OPTIONS: { value: Timeline; label: string }[] = [
  { value: "asap", label: "ASAP (within 2 weeks)" },
  { value: "1-month", label: "1 month" },
  { value: "2-3-months", label: "2–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "6-plus-months", label: "6+ months" },
  { value: "flexible", label: "Flexible" },
];

const WEBSITE_GOALS = [
  { id: "redesign", label: "Redesign / refresh" },
  { id: "add-features", label: "Add new features" },
  { id: "fix-bugs", label: "Fix bugs / issues" },
  { id: "performance", label: "Improve performance" },
  { id: "other", label: "Other" },
];

const WEBSITE_TYPES = [
  { value: "landing-page", label: "Landing page" },
  { value: "ecommerce", label: "E-commerce store" },
  { value: "portfolio", label: "Portfolio / brochure" },
  { value: "blog", label: "Blog / news site" },
  { value: "webapp", label: "Web application" },
  { value: "other", label: "Other" },
];

const SEO_GOALS = [
  { id: "increase-traffic", label: "Increase organic traffic" },
  { id: "improve-rankings", label: "Improve keyword rankings" },
  { id: "local-seo", label: "Local SEO" },
  { id: "technical-seo", label: "Technical SEO audit & fixes" },
  { id: "all", label: "All of the above" },
];

const AI_GOALS = [
  { id: "email", label: "Email / outreach automation" },
  { id: "support-chatbot", label: "Customer support chatbot" },
  { id: "data-processing", label: "Data processing / analysis" },
  { id: "reports", label: "Automated reporting" },
  { id: "social-media", label: "Social media automation" },
  { id: "integration", label: "System integrations" },
  { id: "other", label: "Other" },
];

const SOFTWARE_TYPES = [
  { value: "web-app", label: "Web application" },
  { value: "mobile-ios", label: "Mobile app (iOS)" },
  { value: "mobile-android", label: "Mobile app (Android)" },
  { value: "mobile-both", label: "Mobile app (iOS + Android)" },
  { value: "desktop", label: "Desktop application" },
  { value: "api-backend", label: "API / backend service" },
  { value: "other", label: "Other" },
];

/* ─── Types ─────────────────────────────────────────────────────────────── */

type Step = "services" | "details" | "logistics" | "review";

interface FormState {
  categories: ServiceCategory[];
  budget: BudgetRange | "";
  timeline: Timeline | "";
  workPreference: WorkPreference | "";
  vendorCompanyName: string;
  freelancerProfileUrl: string;
  hasUxDesigner: boolean | null;
  additionalNotes: string;
  // Website
  website_hasExisting: boolean | null;
  website_existingUrl: string;
  website_goals: string[];
  website_type: string;
  website_hasDesigner: "yes" | "no" | "need-one" | "";
  website_hasContent: "yes" | "no" | "need-help" | "";
  // SEO
  seo_hasExisting: boolean | null;
  seo_existingUrl: string;
  seo_workingWithAgency: "no" | "another-agency" | "you" | "";
  seo_goals: string[];
  seo_hasAnalytics: boolean | null;
  // AI
  ai_goals: string[];
  ai_hasExistingSystems: boolean | null;
  ai_existingSystemsDescription: string;
  // Software
  sw_type: string;
  sw_hasDesign: "yes" | "no" | "need-help" | "";
  sw_hasTechSpec: "yes" | "no" | "need-help" | "";
  sw_description: string;
}

const EMPTY: FormState = {
  categories: [],
  budget: "",
  timeline: "",
  workPreference: "",
  vendorCompanyName: "",
  freelancerProfileUrl: "",
  hasUxDesigner: null,
  additionalNotes: "",
  website_hasExisting: null,
  website_existingUrl: "",
  website_goals: [],
  website_type: "",
  website_hasDesigner: "",
  website_hasContent: "",
  seo_hasExisting: null,
  seo_existingUrl: "",
  seo_workingWithAgency: "",
  seo_goals: [],
  seo_hasAnalytics: null,
  ai_goals: [],
  ai_hasExistingSystems: null,
  ai_existingSystemsDescription: "",
  sw_type: "",
  sw_hasDesign: "",
  sw_hasTechSpec: "",
  sw_description: "",
};

const STEPS: Step[] = ["services", "details", "logistics", "review"];
const STEP_LABELS: Record<Step, string> = {
  services: "Services",
  details: "Details",
  logistics: "Logistics",
  review: "Review",
};

/* ─── Main Component ─────────────────────────────────────────────────────── */

export function RequirementsForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("services");
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const { data: existingData } = useMyRequirements();
  const submitMutation = useSubmitRequirements();

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleMulti(key: "categories" | "website_goals" | "seo_goals" | "ai_goals", id: string) {
    setForm((prev) => {
      const arr = prev[key] as string[];
      const next = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
      return { ...prev, [key]: next };
    });
  }

  function validateStep(s: Step): boolean {
    const errs: Partial<Record<keyof FormState, string>> = {};

    if (s === "services") {
      if (form.categories.length === 0)
        errs.categories = "Select at least one service.";
    }

    if (s === "details") {
      if (form.categories.includes("website")) {
        if (form.website_hasExisting === null)
          errs.website_hasExisting = "Required.";
        if (form.website_hasExisting && !form.website_existingUrl.trim())
          errs.website_existingUrl = "Please enter your website URL.";
        if (!form.website_hasExisting && !form.website_type)
          errs.website_type = "Please select a website type.";
      }
      if (form.categories.includes("seo")) {
        if (form.seo_hasExisting === null) errs.seo_hasExisting = "Required.";
        if (form.seo_hasExisting && !form.seo_existingUrl.trim())
          errs.seo_existingUrl = "Please enter your website URL.";
      }
      if (form.categories.includes("custom-software")) {
        if (!form.sw_description.trim())
          errs.sw_description = "Please describe your requirements.";
      }
    }

    if (s === "logistics") {
      if (!form.budget) errs.budget = "Please select a budget range.";
      if (!form.timeline) errs.timeline = "Please select a timeline.";
      if (!form.workPreference) errs.workPreference = "Please select an option.";
      if (form.workPreference === "vendor" && !form.vendorCompanyName.trim())
        errs.vendorCompanyName = "Please enter the company name.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  }

  function goBack() {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  }

  async function handleSubmit() {
    const payload: Omit<
      ClientRequirements,
      "_id" | "clientId" | "submittedAt" | "createdAt" | "updatedAt"
    > = {
      categories: form.categories,
      budget: form.budget as BudgetRange,
      timeline: form.timeline as Timeline,
      workPreference: form.workPreference as WorkPreference,
      vendorCompanyName: form.vendorCompanyName || undefined,
      freelancerProfileUrl: form.freelancerProfileUrl || undefined,
      hasUxDesigner: form.hasUxDesigner ?? undefined,
      additionalNotes: form.additionalNotes || undefined,
      website: form.categories.includes("website")
        ? {
            hasExistingWebsite: form.website_hasExisting ?? false,
            existingUrl: form.website_existingUrl || undefined,
            websiteGoals: form.website_goals.length ? form.website_goals : undefined,
            websiteType: form.website_type || undefined,
            hasDesigner: (form.website_hasDesigner || undefined) as
              | "yes"
              | "no"
              | "need-one"
              | undefined,
            hasContent: (form.website_hasContent || undefined) as
              | "yes"
              | "no"
              | "need-help"
              | undefined,
          }
        : undefined,
      seo: form.categories.includes("seo")
        ? {
            hasExistingWebsite: form.seo_hasExisting ?? false,
            existingUrl: form.seo_existingUrl || undefined,
            workingWithAgency: (form.seo_workingWithAgency || undefined) as
              | "no"
              | "another-agency"
              | "you"
              | undefined,
            primaryGoal: form.seo_goals.length ? form.seo_goals : undefined,
            hasAnalytics: form.seo_hasAnalytics ?? undefined,
          }
        : undefined,
      aiAutomation: form.categories.includes("ai-automation")
        ? {
            automationGoals: form.ai_goals.length ? form.ai_goals : undefined,
            hasExistingSystems: form.ai_hasExistingSystems ?? undefined,
            existingSystemsDescription: form.ai_existingSystemsDescription || undefined,
          }
        : undefined,
      customSoftware: form.categories.includes("custom-software")
        ? {
            softwareType: form.sw_type || undefined,
            hasDesignWireframes: (form.sw_hasDesign || undefined) as
              | "yes"
              | "no"
              | "need-help"
              | undefined,
            hasTechSpec: (form.sw_hasTechSpec || undefined) as
              | "yes"
              | "no"
              | "need-help"
              | undefined,
            description: form.sw_description,
          }
        : undefined,
    };

    try {
      await submitMutation.mutateAsync(payload);
      setSubmitted(true);
      toast.success("Requirements submitted!", "We'll be in touch within 24–48 hours.");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toast.error("Submission failed", msg);
    }
  }

  /* Success state */
  if (submitted || existingData?.data) {
    return (
      <div className="flex flex-col items-center gap-5 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15">
          <CheckCircle2 className="h-9 w-9 text-green-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Requirements received!</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
            Thank you. Our team will review your submission and reach out within 24–48 hours.
          </p>
        </div>
        <Button onClick={() => router.push("/client/dashboard")} className="gap-2">
          Back to dashboard
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress header */}
      <StepProgress current={step} steps={STEPS} labels={STEP_LABELS} />

      {/* Step content */}
      {step === "services" && (
        <ServiceStep form={form} errors={errors} onToggle={(id) => toggleMulti("categories", id)} />
      )}
      {step === "details" && (
        <DetailsStep form={form} errors={errors} set={set} onToggle={toggleMulti} />
      )}
      {step === "logistics" && (
        <LogisticsStep form={form} errors={errors} set={set} />
      )}
      {step === "review" && <ReviewStep form={form} />}

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-border pt-6">
        <Button
          variant="ghost"
          onClick={step === "services" ? () => router.push("/client/dashboard") : goBack}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {step === "services" ? "Dashboard" : "Back"}
        </Button>

        {step === "review" ? (
          <Button
            onClick={handleSubmit}
            disabled={submitMutation.isPending}
            className="gap-2 px-8"
          >
            {submitMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <TrendingUp className="h-4 w-4" />
                Submit requirements
              </>
            )}
          </Button>
        ) : (
          <Button onClick={goNext} className="gap-2">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

/* ─── Step: Services ─────────────────────────────────────────────────────── */

function ServiceStep({
  form,
  errors,
  onToggle,
}: {
  form: FormState;
  errors: Partial<Record<keyof FormState, string>>;
  onToggle: (id: ServiceCategory) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">What do you need help with?</h2>
        <p className="text-sm text-muted-foreground">Select all that apply.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {SERVICES.map((svc) => {
          const selected = form.categories.includes(svc.id);
          return (
            <button
              key={svc.id}
              type="button"
              onClick={() => onToggle(svc.id)}
              className={cn(
                "relative flex items-start gap-4 rounded-xl border p-4 text-left transition-all",
                selected
                  ? "border-blue-500 bg-blue-500/5 shadow-sm shadow-blue-500/10"
                  : "border-border bg-card hover:border-muted-foreground/40"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  selected ? "bg-blue-500/15 text-blue-500" : "bg-muted text-muted-foreground"
                )}
              >
                <svc.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-medium">{svc.label}</p>
                <p className="text-xs text-muted-foreground">{svc.description}</p>
              </div>
              {selected && (
                <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {errors.categories && (
        <p className="text-sm text-destructive">{errors.categories}</p>
      )}
    </div>
  );
}

/* ─── Step: Details ──────────────────────────────────────────────────────── */

function DetailsStep({
  form,
  errors,
  set,
  onToggle,
}: {
  form: FormState;
  errors: Partial<Record<keyof FormState, string>>;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  onToggle: (key: "categories" | "website_goals" | "seo_goals" | "ai_goals", id: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold">Tell us more about your project</h2>
        <p className="text-sm text-muted-foreground">
          Answer what&apos;s relevant — optional fields are marked.
        </p>
      </div>

      {/* Website section */}
      {form.categories.includes("website") && (
        <Section title="Website Development" icon={Globe}>
          <YesNoField
            label="Do you have an existing website?"
            required
            value={form.website_hasExisting}
            onChange={(v) => set("website_hasExisting", v)}
            error={errors.website_hasExisting}
          />

          {form.website_hasExisting === true && (
            <FieldWrapper label="Your website URL" required error={errors.website_existingUrl}>
              <Input
                placeholder="https://example.com"
                value={form.website_existingUrl}
                onChange={(e) => set("website_existingUrl", e.target.value)}
                className={errors.website_existingUrl ? "border-destructive" : ""}
              />
            </FieldWrapper>
          )}

          {form.website_hasExisting === true && (
            <FieldWrapper label="What do you need done?" optional>
              <MultiToggle
                options={WEBSITE_GOALS}
                selected={form.website_goals}
                onToggle={(id) => onToggle("website_goals", id)}
              />
            </FieldWrapper>
          )}

          {form.website_hasExisting === false && (
            <FieldWrapper label="What type of website?" required error={errors.website_type}>
              <AppSelect
                value={form.website_type}
                onValueChange={(v) => set("website_type", v)}
                options={WEBSITE_TYPES}
                triggerClassName="w-full"
              />
            </FieldWrapper>
          )}

          <FieldWrapper label="Do you have a UI/UX designer?" optional>
            <ThreeWaySelect
              options={[
                { value: "yes", label: "Yes, I do" },
                { value: "no", label: "No" },
                { value: "need-one", label: "I need one" },
              ]}
              value={form.website_hasDesigner}
              onChange={(v) => set("website_hasDesigner", v as FormState["website_hasDesigner"])}
            />
          </FieldWrapper>

          <FieldWrapper label="Do you have content ready (copy, images)?" optional>
            <ThreeWaySelect
              options={[
                { value: "yes", label: "Yes, ready" },
                { value: "no", label: "Not yet" },
                { value: "need-help", label: "Need help creating it" },
              ]}
              value={form.website_hasContent}
              onChange={(v) => set("website_hasContent", v as FormState["website_hasContent"])}
            />
          </FieldWrapper>
        </Section>
      )}

      {/* SEO section */}
      {form.categories.includes("seo") && (
        <Section title="SEO" icon={Search}>
          <YesNoField
            label="Do you have an existing website?"
            required
            value={form.seo_hasExisting}
            onChange={(v) => set("seo_hasExisting", v)}
            error={errors.seo_hasExisting}
          />

          {form.seo_hasExisting && (
            <FieldWrapper label="Your website URL" required error={errors.seo_existingUrl}>
              <Input
                placeholder="https://example.com"
                value={form.seo_existingUrl}
                onChange={(e) => set("seo_existingUrl", e.target.value)}
                className={errors.seo_existingUrl ? "border-destructive" : ""}
              />
            </FieldWrapper>
          )}

          <FieldWrapper label="What are your primary SEO goals?" optional>
            <MultiToggle
              options={SEO_GOALS}
              selected={form.seo_goals}
              onToggle={(id) => onToggle("seo_goals", id)}
            />
          </FieldWrapper>

          <FieldWrapper label="Currently working with an SEO agency?" optional>
            <ThreeWaySelect
              options={[
                { value: "no", label: "No" },
                { value: "another-agency", label: "Yes, another agency" },
                { value: "you", label: "Yes, with you" },
              ]}
              value={form.seo_workingWithAgency}
              onChange={(v) =>
                set("seo_workingWithAgency", v as FormState["seo_workingWithAgency"])
              }
            />
          </FieldWrapper>

          <YesNoField
            label="Do you have Google Analytics / Search Console set up?"
            value={form.seo_hasAnalytics}
            onChange={(v) => set("seo_hasAnalytics", v)}
            optional
          />
        </Section>
      )}

      {/* AI Automation section */}
      {form.categories.includes("ai-automation") && (
        <Section title="AI & Automation" icon={Bot}>
          <FieldWrapper label="What do you want to automate?" optional>
            <MultiToggle
              options={AI_GOALS}
              selected={form.ai_goals}
              onToggle={(id) => onToggle("ai_goals", id)}
            />
          </FieldWrapper>

          <YesNoField
            label="Do you have existing systems to integrate with?"
            value={form.ai_hasExistingSystems}
            onChange={(v) => set("ai_hasExistingSystems", v)}
            optional
          />

          {form.ai_hasExistingSystems && (
            <FieldWrapper label="Describe your existing systems" optional>
              <Textarea
                placeholder="E.g. CRM, ERP, custom database…"
                value={form.ai_existingSystemsDescription}
                onChange={(e) => set("ai_existingSystemsDescription", e.target.value)}
                rows={3}
              />
            </FieldWrapper>
          )}
        </Section>
      )}

      {/* Custom Software section */}
      {form.categories.includes("custom-software") && (
        <Section title="Custom Software" icon={Code2}>
          <FieldWrapper label="Type of software" optional>
            <AppSelect
              value={form.sw_type}
              onValueChange={(v) => set("sw_type", v)}
              options={SOFTWARE_TYPES}
              triggerClassName="w-full"
            />
          </FieldWrapper>

          <FieldWrapper label="Describe your requirements" required error={errors.sw_description}>
            <Textarea
              placeholder="What problem are you solving? What should the software do?"
              value={form.sw_description}
              onChange={(e) => set("sw_description", e.target.value)}
              rows={4}
              className={errors.sw_description ? "border-destructive" : ""}
            />
          </FieldWrapper>

          <FieldWrapper label="Do you have design / wireframes?" optional>
            <ThreeWaySelect
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "need-help", label: "Need help" },
              ]}
              value={form.sw_hasDesign}
              onChange={(v) => set("sw_hasDesign", v as FormState["sw_hasDesign"])}
            />
          </FieldWrapper>

          <FieldWrapper label="Do you have a technical specification?" optional>
            <ThreeWaySelect
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "need-help", label: "Need help" },
              ]}
              value={form.sw_hasTechSpec}
              onChange={(v) => set("sw_hasTechSpec", v as FormState["sw_hasTechSpec"])}
            />
          </FieldWrapper>
        </Section>
      )}
    </div>
  );
}

/* ─── Step: Logistics ────────────────────────────────────────────────────── */

function LogisticsStep({
  form,
  errors,
  set,
}: {
  form: FormState;
  errors: Partial<Record<keyof FormState, string>>;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Budget, timeline & team</h2>
        <p className="text-sm text-muted-foreground">
          Help us understand your scope and constraints.
        </p>
      </div>

      <FieldWrapper label="Budget range" required error={errors.budget}>
        <AppSelect
          value={form.budget}
          onValueChange={(v) => set("budget", v as BudgetRange)}
          options={BUDGET_OPTIONS}
          triggerClassName="w-full max-w-xs"
        />
      </FieldWrapper>

      <FieldWrapper label="Expected timeline" required error={errors.timeline}>
        <AppSelect
          value={form.timeline}
          onValueChange={(v) => set("timeline", v as Timeline)}
          options={TIMELINE_OPTIONS}
          triggerClassName="w-full max-w-xs"
        />
      </FieldWrapper>

      <FieldWrapper
        label="Who will be working on this project?"
        required
        error={errors.workPreference}
      >
        <div className="flex flex-col gap-2.5">
          {(
            [
              { value: "us", label: "You — Smit Parekh & team", desc: "We handle everything" },
              {
                value: "vendor",
                label: "Another vendor / agency",
                desc: "You're already working with someone else",
              },
              {
                value: "freelancer",
                label: "A freelancer",
                desc: "You have an independent developer",
              },
            ] as const
          ).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set("workPreference", opt.value)}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3.5 text-left transition-all",
                form.workPreference === opt.value
                  ? "border-blue-500 bg-blue-500/5"
                  : "border-border hover:border-muted-foreground/40"
              )}
            >
              <div
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  form.workPreference === opt.value
                    ? "border-blue-500 bg-blue-500"
                    : "border-muted-foreground/40"
                )}
              >
                {form.workPreference === opt.value && (
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </FieldWrapper>

      {form.workPreference === "vendor" && (
        <FieldWrapper label="Vendor / agency name" required error={errors.vendorCompanyName}>
          <Input
            placeholder="Acme Agency Pvt. Ltd."
            value={form.vendorCompanyName}
            onChange={(e) => set("vendorCompanyName", e.target.value)}
            className={cn("max-w-xs", errors.vendorCompanyName && "border-destructive")}
          />
        </FieldWrapper>
      )}

      {form.workPreference === "freelancer" && (
        <FieldWrapper label="Freelancer profile / portfolio link" optional>
          <Input
            placeholder="https://upwork.com/... or https://linkedin.com/..."
            value={form.freelancerProfileUrl}
            onChange={(e) => set("freelancerProfileUrl", e.target.value)}
            className="max-w-sm"
          />
        </FieldWrapper>
      )}

      <YesNoField
        label="Do you have a UI/UX designer on the project?"
        value={form.hasUxDesigner}
        onChange={(v) => set("hasUxDesigner", v)}
        optional
      />

      <FieldWrapper label="Anything else we should know?" optional>
        <Textarea
          placeholder="Add context, constraints, or questions…"
          value={form.additionalNotes}
          onChange={(e) => set("additionalNotes", e.target.value)}
          rows={3}
          className="max-w-xl"
        />
      </FieldWrapper>
    </div>
  );
}

/* ─── Step: Review ───────────────────────────────────────────────────────── */

function ReviewStep({ form }: { form: FormState }) {
  const budgetLabel = BUDGET_OPTIONS.find((o) => o.value === form.budget)?.label;
  const timelineLabel = TIMELINE_OPTIONS.find((o) => o.value === form.timeline)?.label;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Review your submission</h2>
        <p className="text-sm text-muted-foreground">
          Check everything looks right before submitting.
        </p>
      </div>

      <div className="rounded-xl border border-border divide-y divide-border">
        <ReviewRow label="Services">
          <div className="flex flex-wrap gap-1.5">
            {form.categories.map((c) => (
              <Badge key={c} variant="secondary">
                {SERVICES.find((s) => s.id === c)?.label ?? c}
              </Badge>
            ))}
          </div>
        </ReviewRow>
        <ReviewRow label="Budget">
          <span>{budgetLabel ?? "—"}</span>
        </ReviewRow>
        <ReviewRow label="Timeline">
          <span>{timelineLabel ?? "—"}</span>
        </ReviewRow>
        <ReviewRow label="Working with">
          <span className="capitalize">
            {form.workPreference === "us"
              ? "Smit Parekh & team"
              : form.workPreference === "vendor"
              ? `Vendor: ${form.vendorCompanyName}`
              : form.workPreference === "freelancer"
              ? `Freelancer${form.freelancerProfileUrl ? ` — ${form.freelancerProfileUrl}` : ""}`
              : "—"}
          </span>
        </ReviewRow>
        {form.website_hasExisting !== null && form.categories.includes("website") && (
          <ReviewRow label="Existing website">
            <span>{form.website_hasExisting ? form.website_existingUrl || "Yes" : "No"}</span>
          </ReviewRow>
        )}
        {form.seo_hasExisting !== null && form.categories.includes("seo") && (
          <ReviewRow label="SEO – existing site">
            <span>{form.seo_hasExisting ? form.seo_existingUrl || "Yes" : "No"}</span>
          </ReviewRow>
        )}
        {form.categories.includes("custom-software") && form.sw_description && (
          <ReviewRow label="Software description">
            <span className="text-muted-foreground">{form.sw_description}</span>
          </ReviewRow>
        )}
        {form.additionalNotes && (
          <ReviewRow label="Additional notes">
            <span className="text-muted-foreground">{form.additionalNotes}</span>
          </ReviewRow>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        By submitting, you agree that the information above is accurate and ready for review.
      </p>
    </div>
  );
}

/* ─── Shared sub-components ──────────────────────────────────────────────── */

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border p-5 space-y-5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
          <Icon className="h-4 w-4 text-blue-500" />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function FieldWrapper({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label}{" "}
        {required && <span className="text-destructive">*</span>}
        {optional && (
          <span className="text-[11px] text-muted-foreground font-normal ml-1">(optional)</span>
        )}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function YesNoField({
  label,
  required,
  optional,
  value,
  onChange,
  error,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  value: boolean | null;
  onChange: (v: boolean) => void;
  error?: string;
}) {
  return (
    <FieldWrapper label={label} required={required} optional={optional} error={error}>
      <div className="flex gap-2">
        {[
          { label: "Yes", val: true },
          { label: "No", val: false },
        ].map((opt) => (
          <button
            key={String(opt.val)}
            type="button"
            onClick={() => onChange(opt.val)}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
              value === opt.val
                ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "border-border text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </FieldWrapper>
  );
}

function ThreeWaySelect({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
            value === opt.value
              ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
              : "border-border text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function MultiToggle({
  options,
  selected,
  onToggle,
}: {
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onToggle(opt.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
              active
                ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "border-border text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
            )}
          >
            {active && <Check className="h-3 w-3" />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function StepProgress({
  current,
  steps,
  labels,
}: {
  current: Step;
  steps: readonly Step[];
  labels: Record<Step, string>;
}) {
  const currentIdx = steps.indexOf(current);
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={s} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition-all",
                  done && "bg-blue-500 text-white",
                  active && "border-2 border-blue-500 text-blue-500",
                  !done && !active && "border-2 border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </div>
              <span
                className={cn(
                  "hidden sm:inline text-sm font-medium",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {labels[s]}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "h-px w-8 flex-1 transition-colors",
                  i < currentIdx ? "bg-blue-500" : "bg-muted-foreground/20"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ReviewRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 px-4 py-3 text-sm">
      <span className="w-40 shrink-0 text-muted-foreground">{label}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
