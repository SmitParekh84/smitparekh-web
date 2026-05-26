"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, XCircle, Copy, Check, BookOpen, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyTenant, useRegisterTenant } from "@/hooks/api/use-tenant";
import { cn } from "@/lib/utils";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      onClick={handleCopy}
      className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
      title="Copy"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

const STATUS_CONFIG = {
  pending:  { icon: Clock,       color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", label: "Pending Approval" },
  approved: { icon: CheckCircle, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",   label: "Approved" },
  rejected: { icon: XCircle,     color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",           label: "Rejected" },
  suspended:{ icon: XCircle,     color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",       label: "Suspended" },
} as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { data: tenant, isLoading } = useMyTenant();
  const register = useRegisterTenant();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!isLoading && tenant?.status === "approved") {
      router.replace("/dashboard/blog");
    }
  }, [tenant, isLoading, router]);

  if (isLoading) {
    return (
      <div className="max-w-lg space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="max-w-lg space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Set up your Blog API</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Register to get an API key you can use to manage blog posts from your own tools and sites.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create your tenant account</CardTitle>
            <CardDescription>Takes 10 seconds. Admin approves within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Your name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                disabled={register.isPending}
              />
            </div>
            <Button
              onClick={() => register.mutate({ name })}
              disabled={!name.trim() || register.isPending}
              className="w-full"
            >
              {register.isPending ? "Registering…" : "Register & get API key"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (tenant.status === "approved") {
    return null;
  }

  const cfg = STATUS_CONFIG[tenant.status];
  const StatusIcon = cfg.icon;

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Blog API</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Your request is under review. Here are your credentials — save your API key now.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-3 pb-3">
          <StatusIcon className="h-5 w-5" />
          <div className="space-y-0.5">
            <CardTitle className="text-base">Account status</CardTitle>
            <Badge className={cn("text-xs font-medium border-0", cfg.color)}>{cfg.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {tenant.status === "rejected" && tenant.rejectionReason && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
              Reason: {tenant.rejectionReason}
            </p>
          )}

          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Your API Key</p>
            <div className="flex items-center rounded-lg border border-border bg-muted/50 px-3 py-2 font-mono text-sm">
              <span className="truncate">{tenant.apiKey}</span>
              <CopyButton text={tenant.apiKey} />
            </div>
            <p className="text-xs text-muted-foreground">
              Use this key in the <code className="text-xs bg-muted px-1 rounded">X-API-Key</code> header. Keep it secret.
            </p>
          </div>

          <Link
            href="/dashboard/blog/settings"
            className={cn(buttonVariants({ variant: "outline" }), "w-full gap-2")}
          >
            <Sparkles className="h-4 w-4" />
            Set up your blog preferences
          </Link>

          <Link
            href="/dashboard/blog/api-docs"
            className={cn(buttonVariants({ variant: "outline" }), "w-full gap-2")}
          >
            <BookOpen className="h-4 w-4" />
            View API Documentation
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
