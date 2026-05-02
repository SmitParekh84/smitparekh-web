"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { toast } from "@/lib/toast";

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
    <div className="space-y-6 max-w-lg">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground mt-1 text-sm">Manage your profile and account.</p>
      </div>

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
  );
}
