"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useOnboardClient, useValidateInvitation } from "@/hooks/api/use-clients";
import { ApiError } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Phone,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

/* Common country dial codes for the mobile field. */
const COUNTRIES = [
  { iso: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { iso: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { iso: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { iso: "AE", name: "UAE (Dubai)", dial: "+971", flag: "🇦🇪" },
  { iso: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { iso: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { iso: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { iso: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { iso: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦" },
  { iso: "KW", name: "Kuwait", dial: "+965", flag: "🇰🇼" },
  { iso: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { iso: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { iso: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { iso: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { iso: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
  { iso: "LK", name: "Sri Lanka", dial: "+94", flag: "🇱🇰" },
  { iso: "NP", name: "Nepal", dial: "+977", flag: "🇳🇵" },
  { iso: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { iso: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬" },
  { iso: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { iso: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
  { iso: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
];

type Step = "welcome" | "info" | "password" | "done";

interface FormData {
  name: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

export function OnboardingClient({ token }: { token: string }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("welcome");
  const [form, setForm] = useState<FormData>({
    name: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [countryIso, setCountryIso] = useState("IN");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const invitationQuery = useValidateInvitation(token);
  const onboard = useOnboardClient();

  const invitation = invitationQuery.data?.data;

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validateInfo(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (form.mobile && !/^[\d\s\-()]{6,15}$/.test(form.mobile)) {
      newErrors.mobile = "Enter a valid mobile number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validatePassword(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleComplete() {
    if (!validatePassword()) return;
    try {
      const dial = COUNTRIES.find((c) => c.iso === countryIso)?.dial ?? "";
      const mobile = form.mobile.trim() ? `${dial} ${form.mobile.trim()}`.trim() : undefined;

      await onboard.mutateAsync({
        token,
        name: form.name.trim(),
        mobile,
        password: form.password,
      });

      // Establish a real browser session so the portal is accessible right away.
      // If this fails the account still exists - the user can sign in at /client/login.
      if (invitation?.email) {
        try {
          await createClient().auth.signInWithPassword({
            email: invitation.email,
            password: form.password,
          });
        } catch {
          /* fall through to the done screen */
        }
      }

      setStep("done");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toast.error("Onboarding failed", msg);
    }
  }

  /* Loading state */
  if (invitationQuery.isLoading) {
    return (
      <OnboardingShell>
        <div className="flex flex-col items-center gap-3 py-16">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-sm text-muted-foreground">Validating your invitation…</p>
        </div>
      </OnboardingShell>
    );
  }

  /* Invalid / expired invitation */
  if (invitationQuery.isError || !invitation || invitation.status !== "pending") {
    return (
      <OnboardingShell>
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-7 w-7 text-destructive" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Link expired or invalid</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              This invitation link is no longer valid. Please ask your account manager to send a new
              one.
            </p>
          </div>
        </div>
      </OnboardingShell>
    );
  }

  /* Step: Welcome */
  if (step === "welcome") {
    return (
      <OnboardingShell>
        <div className="flex flex-col items-center gap-5 py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 shadow-lg">
            <Image src="/Smit-Logo.svg" alt="Smit Parekh" width={32} height={32} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              You&apos;re invited
            </p>
            <h1 className="mt-1.5 text-2xl font-bold">Welcome aboard!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              You&apos;ve been invited to{" "}
              <span className="font-medium text-foreground">smitparekh.co.in</span> client portal.
              Let&apos;s set up your account - it takes less than a minute.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Invitation for <span className="font-medium text-foreground">{invitation.email}</span>
            </p>
          </div>
          <Button className="mt-2 gap-2 px-8" onClick={() => setStep("info")}>
            Get started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <StepDots current={0} total={2} />
      </OnboardingShell>
    );
  }

  /* Step: Info */
  if (step === "info") {
    return (
      <OnboardingShell>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Your details</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tell us a little about yourself.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">
                Full name <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={cn("pl-9", errors.name && "border-destructive")}
                />
              </div>
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="mobile">
                Mobile number{" "}
                <span className="text-[11px] text-muted-foreground font-normal">(optional)</span>
              </Label>
              <div className="flex gap-2">
                <CountryCodeSelect value={countryIso} onChange={setCountryIso} />
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="mobile"
                    type="tel"
                    inputMode="tel"
                    placeholder="98765 43210"
                    value={form.mobile}
                    onChange={(e) => updateField("mobile", e.target.value)}
                    className={cn("pl-9", errors.mobile && "border-destructive")}
                  />
                </div>
              </div>
              {errors.mobile && <p className="text-xs text-destructive">{errors.mobile}</p>}
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="ghost" onClick={() => setStep("welcome")}>
              Back
            </Button>
            <Button
              className="gap-2"
              onClick={() => {
                if (validateInfo()) setStep("password");
              }}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <StepDots current={1} total={2} />
      </OnboardingShell>
    );
  }

  /* Step: Password */
  if (step === "password") {
    return (
      <OnboardingShell>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Create your password</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a strong password to secure your account.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="password">
                Password <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className={cn("pl-9 pr-10", errors.password && "border-destructive")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">
                Confirm password <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  className={cn("pl-9 pr-10", errors.confirmPassword && "border-destructive")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">{errors.confirmPassword}</p>
              )}
            </div>

            <PasswordStrength password={form.password} />
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="ghost" onClick={() => setStep("info")}>
              Back
            </Button>
            <Button className="gap-2" onClick={handleComplete} disabled={onboard.isPending}>
              {onboard.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Complete setup
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
        <StepDots current={2} total={2} />
      </OnboardingShell>
    );
  }

  /* Step: Done */
  return (
    <OnboardingShell>
      <div className="flex flex-col items-center gap-5 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15">
          <CheckCircle2 className="h-9 w-9 text-green-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">You&apos;re all set!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome, {form.name.split(" ")[0]}! Your account is ready. Head to your dashboard to
            submit your project requirements.
          </p>
        </div>
        <Button className="mt-2 gap-2 px-8" onClick={() => router.push("/client/dashboard")}>
          Go to dashboard
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </OnboardingShell>
  );
}

/* ─── Shared sub-components ──────────────────────────────────────────────── */

function CountryCodeSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const selected = COUNTRIES.find((c) => c.iso === value) ?? COUNTRIES[0];
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[116px] shrink-0" aria-label="Country code">
        <span className="flex items-center gap-1.5">
          <span className="text-base leading-none">{selected.flag}</span>
          <span className="text-sm">{selected.dial}</span>
        </span>
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {COUNTRIES.map((c) => (
          <SelectItem key={c.iso} value={c.iso}>
            <span className="flex items-center gap-2">
              <span className="text-base leading-none">{c.flag}</span>
              <span>{c.name}</span>
              <span className="text-muted-foreground">{c.dial}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function OnboardingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">{children}</div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Smit Parekh · smitparekh.co.in
        </p>
      </div>
    </div>
  );
}

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="mt-8 flex justify-center gap-2">
      {Array.from({ length: total + 1 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            i === current ? "w-6 bg-blue-500" : "w-1.5 bg-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const strength = checks.filter(Boolean).length;
  const labels = ["Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-destructive", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              i < strength ? colors[strength - 1] : "bg-muted",
            )}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Strength:{" "}
        <span
          className={cn(
            "font-medium",
            strength <= 1 && "text-destructive",
            strength === 2 && "text-yellow-600",
            strength >= 3 && "text-foreground",
          )}
        >
          {labels[strength - 1] ?? "Very weak"}
        </span>
      </p>
    </div>
  );
}
