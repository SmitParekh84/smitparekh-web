"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Save,
  Sparkles,
  Lock,
  Check,
  Clock,
  Eye,
  EyeOff,
  Copy,
  Tag,
  ArrowRight,
  Webhook,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BLOG_CATEGORIES, type BlogPreferences } from "@/lib/blog-categories";
import { TENANT_FEATURE_DEFS, type TenantFeatures } from "@/lib/tenant-features";
import {
  useMyTenant,
  useUpdateMyPreferences,
  useRequestFeature,
  useRegenerateApiKey,
} from "@/hooks/api/use-tenant";
import { toast } from "@/lib/toast";
import type { Tenant } from "@/lib/api/tenant";

function SoonBadge() {
  return (
    <Badge variant="secondary" className="gap-1 text-[10px] uppercase tracking-wide">
      <Clock className="h-3 w-3" />
      Coming soon
    </Badge>
  );
}

export default function BlogSettingsPage() {
  const router = useRouter();
  const { data: tenant, isLoading } = useMyTenant();

  useEffect(() => {
    if (!isLoading && !tenant) router.replace("/dashboard/blog/onboarding");
  }, [tenant, isLoading, router]);

  if (isLoading || !tenant) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-semibold tracking-tight">Blog settings</h1>
        <p className="text-[13px] text-muted-foreground">
          Tenant identity, your API key, niche and AI features.
        </p>
      </div>

      <TenantIdentityCard tenant={tenant} />
      <ApiKeyCard tenant={tenant} />
      <PreferencesCard key={tenant._id} preferences={tenant.blogPreferences} />
      <AiFeaturesCard tenant={tenant} />
      <WebhooksCard />
      <DangerZoneCard />
    </div>
  );
}

/* ─── Tenant identity (read-only, real) ─────────────────────────────────── */
function TenantIdentityCard({ tenant }: { tenant: Tenant }) {
  const statusTone: Record<string, string> = {
    approved: "border-0 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    pending: "border-0 bg-amber-500/15 text-amber-600 dark:text-amber-400",
    rejected: "border-0 bg-red-500/15 text-red-600 dark:text-red-400",
    suspended: "border-0 bg-muted text-muted-foreground",
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base">Tenant identity</CardTitle>
          <CardDescription>
            Internal details for your blog tenant. We never host a public page — your site
            renders posts however it wants.
          </CardDescription>
        </div>
        <Badge className={cn("capitalize", statusTone[tenant.status] ?? statusTone.suspended)}>
          {tenant.status}
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Tenant name
          </div>
          <div className="text-[13.5px] font-medium">{tenant.name}</div>
        </div>
        <div className="space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Tenant slug
          </div>
          <code className="inline-flex items-center rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[12.5px] text-foreground/80">
            tenant:{tenant.tenantSlug}
          </code>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Sign-in email
          </div>
          <div className="text-[13px] text-foreground/80">{tenant.email}</div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── API key (real: reveal / copy / regenerate) ────────────────────────── */
function ApiKeyCard({ tenant }: { tenant: Tenant }) {
  const regenerate = useRegenerateApiKey();
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const apiKey = tenant.apiKey ?? "";

  async function copy() {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleRegenerate() {
    if (confirm("Regenerate? Your current key will stop working immediately.")) {
      regenerate.mutate();
    }
  }

  const masked = apiKey.replace(/.(?=.{4})/g, "•");

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base">API key</CardTitle>
          <CardDescription>
            Send on every request as the{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground/80">
              X-API-Key
            </code>{" "}
            header. Anyone with this key can manage your blog — keep it secret.
          </CardDescription>
        </div>
        <Link
          href="/dashboard/blog/api-docs"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1 shrink-0")}
        >
          See docs <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-muted/40 p-2">
          <Tag className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
          <code className="flex-1 truncate font-mono text-[12.5px] text-foreground/90">
            {show ? apiKey : masked}
          </code>
          <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => setShow((s) => !s)}>
            {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {show ? "Hide" : "Reveal"}
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={copy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 p-3">
          <div className="text-[12.5px] text-amber-700 dark:text-amber-300">
            Regenerating <strong>immediately invalidates</strong> the current key. Integrations
            using the old key start receiving <code className="font-mono">401</code>.
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            disabled={regenerate.isPending}
            onClick={handleRegenerate}
          >
            {regenerate.isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            Regenerate key
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Niche / audience / categories (real, wired) ───────────────────────── */
function PreferencesCard({ preferences }: { preferences?: BlogPreferences }) {
  const [niche, setNiche] = useState(preferences?.niche ?? "");
  const [audience, setAudience] = useState(preferences?.audience ?? "");
  const [cats, setCats] = useState<string[]>(preferences?.categories ?? []);
  const save = useUpdateMyPreferences();

  function toggleCat(c: string) {
    setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  async function handleSave() {
    try {
      await save.mutateAsync({ niche, audience, categories: cats });
      toast.success("Preferences saved", "AI topic suggestions will use these.");
    } catch {
      toast.error("Save failed", "Could not save preferences.");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Your blog niche</CardTitle>
        <CardDescription>
          Used to generate topic ideas tailored to you. Change this anytime.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="niche">What is your blog about?</Label>
          <Textarea
            id="niche"
            rows={2}
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. Practical web-dev tutorials and case studies for indie SaaS founders"
            className="resize-y"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="audience">Target audience</Label>
          <Input
            id="audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. Early-stage founders and junior developers"
            className="h-10"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Categories you write about</Label>
          <div className="flex flex-wrap gap-1.5">
            {BLOG_CATEGORIES.map((c) => {
              const selected = cats.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggleCat(c)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    selected
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-border bg-card text-muted-foreground hover:border-blue-500/60",
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
        <Button onClick={handleSave} disabled={save.isPending} className="gap-2">
          {save.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save preferences
        </Button>
      </CardContent>
    </Card>
  );
}

/* ─── AI features (real: request access) ────────────────────────────────── */
function AiFeaturesCard({ tenant }: { tenant: Tenant }) {
  const request = useRequestFeature();
  const [pendingKey, setPendingKey] = useState<string | null>(null);

  const granted: Partial<TenantFeatures> = tenant.features ?? {};
  const requested = tenant.featureRequests ?? [];

  async function handleRequest(key: string) {
    setPendingKey(key);
    try {
      await request.mutateAsync(key);
      toast.success("Request sent", "The admin will review your request.");
    } catch {
      toast.error("Request failed", "Try again in a moment.");
    } finally {
      setPendingKey(null);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">AI features</CardTitle>
        <CardDescription>
          Features enabled for your account are ready to use. Request any others — the admin
          reviews each request.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {TENANT_FEATURE_DEFS.map((f) => {
          const isOn = !!granted[f.key];
          const isRequested = requested.includes(f.key);
          return (
            <div
              key={f.key}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  {!isOn && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                  <span className="text-sm font-medium">{f.label}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{f.description}</p>
              </div>

              {isOn ? (
                <Badge className="gap-1 border-0 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <Check className="h-3 w-3" />
                  Enabled
                </Badge>
              ) : isRequested ? (
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  Requested
                </Badge>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  disabled={pendingKey === f.key}
                  onClick={() => handleRequest(f.key)}
                >
                  {pendingKey === f.key ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5" />
                  )}
                  Request access
                </Button>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

/* ─── Webhooks (coming soon) ─────────────────────────────────────────────── */
function WebhooksCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base">Webhooks</CardTitle>
          <CardDescription>
            Notify your server when posts change so you can rebuild or invalidate caches.
          </CardDescription>
        </div>
        <SoonBadge />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-10 text-center">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-border bg-muted/40 text-muted-foreground">
            <Webhook className="h-4 w-4" />
          </div>
          <p className="text-sm font-medium">Webhooks are coming soon</p>
          <p className="max-w-sm text-[12.5px] text-muted-foreground">
            You&rsquo;ll be able to fire <code className="font-mono">post.published</code>,{" "}
            <code className="font-mono">post.updated</code> and{" "}
            <code className="font-mono">post.deleted</code> events to your own endpoint.
          </p>
          <Button variant="outline" size="sm" disabled className="mt-1">
            Add webhook
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Danger zone (coming soon) ──────────────────────────────────────────── */
function DangerZoneCard() {
  return (
    <Card className="border-destructive/30">
      <CardHeader>
        <CardTitle className="text-base text-destructive">Danger zone</CardTitle>
        <CardDescription>Irreversible actions for this tenant.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-3">
          <div>
            <div className="flex items-center gap-2 text-[13px] font-medium">
              Unpublish all posts <SoonBadge />
            </div>
            <div className="text-[12px] text-muted-foreground">
              API stops serving every post until you toggle them back on. Drafts are unaffected.
            </div>
          </div>
          <Button variant="outline" size="sm" disabled>
            Unpublish all
          </Button>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-3">
          <div>
            <div className="flex items-center gap-2 text-[13px] font-medium">
              Delete tenant <SoonBadge />
            </div>
            <div className="text-[12px] text-muted-foreground">
              Permanently deletes the tenant, its posts and its API keys. Cannot be undone.
            </div>
          </div>
          <Button variant="destructive" size="sm" disabled className="gap-1.5">
            <Trash2 className="h-3.5 w-3.5" /> Delete tenant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
