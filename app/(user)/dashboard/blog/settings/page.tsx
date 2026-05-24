"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Sparkles, Lock, Check, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "@/hooks/api/use-tenant";
import { toast } from "@/lib/toast";
import type { Tenant } from "@/lib/api/tenant";

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
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Blog settings</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Tell the AI what your blog is about, and manage your AI features.
        </p>
      </div>

      <PreferencesCard key={tenant._id} preferences={tenant.blogPreferences} />
      <AiFeaturesCard tenant={tenant} />
    </div>
  );
}

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
          Used to generate topic ideas tailored to you. You can change this anytime.
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
                      : "border-border bg-background text-muted-foreground hover:border-blue-500/60"
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
          Features enabled for your account are ready to use. Request any others —
          the admin reviews each request.
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
                <Badge className="gap-1 border-0 bg-green-500/15 text-green-600 dark:text-green-400">
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
