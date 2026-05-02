"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Camera, Bug, MessageSquare, Plus, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyFeedback } from "@/hooks/api/use-feedback";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { toast } from "@/lib/toast";
import type { FeedbackEntry, FeedbackType, FeedbackStatus } from "@/lib/api";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

const TYPE_CFG: Record<FeedbackType, { label: string; icon: React.ElementType; class: string }> = {
  bug: { label: "Bug", icon: Bug, class: "bg-red-500/10 text-red-500 border-red-500/20" },
  feedback: { label: "Feedback", icon: MessageSquare, class: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
};

const STATUS_CFG: Record<FeedbackStatus, { label: string; class: string }> = {
  open: { label: "Open", class: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
  in_review: { label: "In review", class: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400" },
  resolved: { label: "Resolved", class: "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400" },
};

function relativeDate(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return "Today";
  if (d === 1) return "Yesterday";
  if (d < 30) return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

/* ─── My Feedback card ────────────────────────────────────────────────────── */

function MyFeedbackCard() {
  const { data, isLoading } = useMyFeedback();
  const items: FeedbackEntry[] = data?.data ?? [];

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex-row items-start justify-between space-y-0 gap-4">
        <div>
          <CardTitle className="text-base font-semibold">My Reports</CardTitle>
          <CardDescription className="mt-0.5">
            Your submitted feedback and bug reports.
          </CardDescription>
        </div>
        <Link href="/feedback" className={buttonVariants({ variant: "outline", size: "sm" }) + " shrink-0"}>
            <Plus className="h-3.5 w-3.5" />
            New
          </Link>
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
              <Skeleton className="h-4 w-14 rounded" />
              <Skeleton className="h-4 flex-1 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          ))
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
            <div className="rounded-full bg-muted p-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">No reports yet</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Found a bug or have a suggestion? Let us know.
              </p>
            </div>
            <Link href="/feedback" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Submit feedback <ExternalLink className="ml-1.5 h-3 w-3" />
            </Link>
          </div>
        ) : (
          items.map((item) => {
            const type = TYPE_CFG[item.type] ?? TYPE_CFG.feedback;
            const status = STATUS_CFG[item.status] ?? STATUS_CFG.open;
            const TypeIcon = type.icon;
            return (
              <div
                key={item._id}
                className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5 hover:bg-muted/40 transition-colors"
              >
                <Badge variant="outline" className={`shrink-0 gap-1 text-xs ${type.class}`}>
                  <TypeIcon className="h-2.5 w-2.5" />
                  {type.label}
                </Badge>
                <span className="flex-1 min-w-0 text-sm font-medium truncate">
                  {item.title}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className={`text-xs ${status.class}`}>
                    {status.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {relativeDate(item.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

interface UserProfile {
  email: string;
  name: string | null;
  avatar_url: string | null;
}

export default function DashboardSettingsPage() {
  const router = useRouter();
  const { session } = useSupabaseSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const deleteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch("/api/user/me/usage")
      .then((r) => r.json())
      .then((d) => {
        setProfile(d.user);
        setName(d.user.name ?? "");
      });
  }, []);

  // Auto-cancel delete confirm after 5 s
  useEffect(() => {
    if (confirmDelete) {
      deleteTimerRef.current = setTimeout(() => setConfirmDelete(false), 5000);
    }
    return () => {
      if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current);
    };
  }, [confirmDelete]);

  const meta = session?.user?.user_metadata ?? {};
  const avatarUrl =
    profile?.avatar_url ??
    (meta.avatar_url as string | undefined) ??
    undefined;
  const email = profile?.email ?? session?.user?.email ?? "";
  const displayName =
    profile?.name ??
    (meta.full_name as string | undefined) ??
    (meta.name as string | undefined) ??
    "";
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleSaveName() {
    if (!name.trim()) return;
    setSaving(true);
    const res = await fetch("/api/user/me/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
    });
    setSaving(false);
    if (res.ok) {
      setProfile((p) => (p ? { ...p, name: name.trim() } : p));
      toast.success("Saved", "Display name updated.");
    } else {
      toast.error("Error", "Could not save name. Try again.");
    }
  }

  async function handleDeleteAccount() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    const res = await fetch("/api/user/me/delete", { method: "DELETE" });
    if (res.ok) {
      router.replace("/login?deleted=1");
    } else {
      setDeleting(false);
      setConfirmDelete(false);
      toast.error("Error", "Could not delete account. Try again.");
    }
  }

  if (!profile) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground mt-1 text-sm">Manage your profile and account.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left column — account */}
        <div className="space-y-6">
          {/* Profile card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Profile</CardTitle>
              <CardDescription>
                Your Google profile photo and display name.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 rounded-xl">
                    {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
                    <AvatarFallback className="rounded-xl bg-blue-500/15 text-blue-500 text-xl font-bold">
                      {initials || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted">
                    <Camera className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">{displayName || "—"}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Photo synced from Google — cannot be changed here.
                  </p>
                </div>
              </div>

              {/* Display name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="display-name">
                  Display name
                </label>
                <div className="flex gap-2">
                  <input
                    id="display-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    placeholder="Your name"
                    className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveName}
                    disabled={saving || !name.trim() || name.trim() === (profile.name ?? "")}
                  >
                    {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Save"}
                  </Button>
                </div>
              </div>

              {/* Email (read-only) */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email</label>
                <div className="flex h-9 w-full items-center rounded-lg border border-input bg-muted/40 px-3 text-sm text-muted-foreground select-all">
                  {email}
                </div>
                <p className="text-xs text-muted-foreground">
                  Email is managed by Google and cannot be changed here.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Danger zone */}
          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-destructive">Danger zone</CardTitle>
              <CardDescription>
                Deleting your account is reversible — if you sign in again your account will be
                restored. However, your usage history is always kept to prevent abuse.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="w-full sm:w-auto"
              >
                {deleting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Deleting…</>
                ) : confirmDelete ? (
                  "⚠️ Tap again to confirm delete"
                ) : (
                  "Delete my account"
                )}
              </Button>
              {confirmDelete && (
                <p className="mt-2 text-xs text-muted-foreground">
                  This will sign you out. Sign in again to restore your account.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column — activity */}
        <MyFeedbackCard />
      </div>
    </div>
  );
}

