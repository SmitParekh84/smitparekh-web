"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Loader2,
  Camera,
  Clock,
  User,
  Shield,
  Bell,
  Sun,
  Tag,
  Zap,
  Sparkles,
  CreditCard,
  FileText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useSupabaseSession } from "@/hooks/api/use-auth";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

interface UserProfile {
  email: string;
  name: string | null;
  avatar_url: string | null;
}

type TabId =
  | "profile"
  | "security"
  | "notify"
  | "appearance"
  | "api"
  | "integrations"
  | "plan"
  | "billing"
  | "invoices";

const NAV_GROUPS: { title: string; items: { id: TabId; label: string; icon: React.ElementType }[] }[] = [
  {
    title: "Account",
    items: [
      { id: "profile", label: "Profile", icon: User },
      { id: "security", label: "Security", icon: Shield },
      { id: "notify", label: "Notifications", icon: Bell },
    ],
  },
  {
    title: "Workspace",
    items: [
      { id: "appearance", label: "Appearance", icon: Sun },
      { id: "api", label: "API tokens", icon: Tag },
      { id: "integrations", label: "Integrations", icon: Zap },
    ],
  },
  {
    title: "Subscription",
    items: [
      { id: "plan", label: "Plan", icon: Sparkles },
      { id: "billing", label: "Billing", icon: CreditCard },
      { id: "invoices", label: "Invoices", icon: FileText },
    ],
  },
];

function SoonBadge() {
  return (
    <Badge variant="secondary" className="gap-1 text-[10px] uppercase tracking-wide">
      <Clock className="h-3 w-3" />
      Coming soon
    </Badge>
  );
}

function ComingSoon({ title, desc }: { title: string; desc: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </div>
        <SoonBadge />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-12 text-center">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-border bg-muted/40 text-muted-foreground">
            <Clock className="h-4 w-4" />
          </div>
          <p className="text-sm font-medium">Not available yet</p>
          <p className="max-w-sm text-[12.5px] text-muted-foreground">
            This section is part of the new design and will be wired up soon.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardSettingsPage() {
  const router = useRouter();
  const { session } = useSupabaseSession();
  const { theme, setTheme } = useTheme();
  const [tab, setTab] = useState<TabId>("profile");

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
    profile?.avatar_url ?? (meta.avatar_url as string | undefined) ?? undefined;
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
    <div className="space-y-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-semibold tracking-tight">Settings</h1>
        <p className="text-[13px] text-muted-foreground">
          Account, billing and preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Left nav */}
        <nav className="space-y-5">
          {NAV_GROUPS.map((g) => (
            <div key={g.title}>
              <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                {g.title}
              </div>
              <ul className="space-y-0.5">
                {g.items.map((it) => {
                  const active = tab === it.id;
                  return (
                    <li key={it.id}>
                      <button
                        type="button"
                        onClick={() => setTab(it.id)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition-colors",
                          active
                            ? "bg-muted font-medium text-foreground"
                            : "text-foreground/70 hover:bg-muted/60",
                        )}
                      >
                        <it.icon className="h-4 w-4" />
                        <span>{it.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Content */}
        <div className="space-y-6">
          {tab === "profile" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Profile</CardTitle>
                  <CardDescription>
                    Your Google profile photo and display name.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Photo synced from Google — cannot be changed here.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="display-name">Display name</Label>
                    <div className="flex gap-2">
                      <Input
                        id="display-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={100}
                        placeholder="Your name"
                        className="h-9 max-w-md"
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

                  <div className="space-y-1.5">
                    <Label>Email</Label>
                    <div className="flex h-9 max-w-md items-center rounded-lg border border-input bg-muted/40 px-3 text-sm text-muted-foreground select-all">
                      {email}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Email is managed by Google and cannot be changed here.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/30">
                <CardHeader>
                  <CardTitle className="text-base text-destructive">Danger zone</CardTitle>
                  <CardDescription>
                    Deleting your account is reversible — sign in again to restore it. Usage
                    history is always kept to prevent abuse.
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
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Deleting…
                      </>
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
            </>
          )}

          {tab === "appearance" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Appearance</CardTitle>
                <CardDescription>Tune how the dashboard looks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex gap-2">
                    {(["light", "dark", "system"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTheme(t)}
                        className={cn(
                          "flex h-16 w-24 flex-col items-center justify-center gap-1 rounded-lg border text-[12px] font-medium capitalize transition-colors",
                          theme === t
                            ? "border-foreground ring-2 ring-foreground/10"
                            : "border-border hover:border-foreground/40",
                        )}
                      >
                        <div
                          className={cn(
                            "h-6 w-12 rounded",
                            t === "light" && "border border-border bg-white",
                            t === "dark" && "bg-neutral-900",
                            t === "system" &&
                              "border border-border bg-gradient-to-r from-white to-neutral-900",
                          )}
                        />
                        {t}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Auto follows your OS.</p>
                </div>

                <div className="space-y-2 opacity-60">
                  <div className="flex items-center gap-2">
                    <Label>Density</Label>
                    <SoonBadge />
                  </div>
                  <div className="inline-flex h-9 items-center gap-1 rounded-lg border border-border bg-muted/40 p-0.5">
                    {["Compact", "Comfortable", "Spacious"].map((d) => (
                      <span
                        key={d}
                        className={cn(
                          "inline-flex h-7 items-center rounded-md px-3 text-[13px] font-medium",
                          d === "Comfortable"
                            ? "border border-border bg-card"
                            : "text-muted-foreground",
                        )}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {tab === "security" && (
            <ComingSoon title="Security" desc="Password, two-factor auth and active sessions." />
          )}
          {tab === "notify" && (
            <ComingSoon title="Notifications" desc="Choose what reaches your inbox." />
          )}
          {tab === "api" && (
            <ComingSoon title="API tokens" desc="Personal access tokens for the tool and blog APIs." />
          )}
          {tab === "integrations" && (
            <ComingSoon title="Integrations" desc="Connect GitHub, Vercel, Slack and more." />
          )}
          {tab === "plan" && (
            <ComingSoon title="Plan" desc="Compare plans and manage your subscription." />
          )}
          {tab === "billing" && (
            <ComingSoon title="Billing" desc="Payment method and billing details." />
          )}
          {tab === "invoices" && (
            <ComingSoon title="Invoices" desc="Download past invoices." />
          )}
        </div>
      </div>
    </div>
  );
}
