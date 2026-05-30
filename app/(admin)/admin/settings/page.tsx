"use client";

import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Bell,
  Camera,
  Globe,
  Key,
  LogOut,
  Monitor,
  Moon,
  Settings,
  Shield,
  Sun,
  Tag,
  UserRound,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  ImageCropperDialog,
  shouldSkipCropping,
  useImageCropper,
} from "@/components/ui/image-cropper";
import { useSupabaseSession, useUpdateProfile, useUploadAvatar } from "@/hooks/api/use-auth";
import { createClient } from "@/lib/supabase/client";
import { clearAdminToken } from "@/lib/api";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

/* ─── Left-nav structure ──────────────────────────────────────────────── */

const SETTING_GROUPS = [
  {
    title: "Account",
    items: [
      { id: "profile", label: "Profile", icon: UserRound },
      { id: "security", label: "Security", icon: Shield },
      { id: "notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    title: "Workspace",
    items: [
      { id: "general", label: "General", icon: Settings },
      { id: "appearance", label: "Appearance", icon: Sun },
      { id: "domain", label: "Domain", icon: Globe },
    ],
  },
  {
    title: "Integrations",
    items: [
      { id: "integrations", label: "Integrations", icon: Zap },
      { id: "api", label: "API tokens", icon: Tag },
    ],
  },
] as const;

type SettingTab = (typeof SETTING_GROUPS)[number]["items"][number]["id"];

/* ─── Row layout for settings fields ─────────────────────────────────── */

function FieldRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[220px_1fr] sm:items-start">
      <div>
        <div className="text-[13.5px] font-medium">{label}</div>
        {hint && <div className="mt-0.5 text-[12px] text-muted-foreground">{hint}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function SettingsCard({
  title,
  desc,
  children,
  footer,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          {desc && <CardDescription className="mt-0.5">{desc}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="divide-y divide-border pt-0">
        {children}
      </CardContent>
      {footer && (
        <div className="flex items-center justify-end gap-2 rounded-b-xl border-t border-border bg-muted/30 px-5 py-3">
          {footer}
        </div>
      )}
    </Card>
  );
}

/* ─── Profile tab ─────────────────────────────────────────────────────── */

function ProfileSettings({
  session,
  isLoading,
}: {
  session: ReturnType<typeof useSupabaseSession>["session"];
  isLoading: boolean;
}) {
  const updateProfile = useUpdateProfile();
  const uploadAvatar = useUploadAvatar();
  const fileRef = useRef<HTMLInputElement>(null);
  const cropper = useImageCropper();

  const meta = session?.user?.user_metadata ?? {};
  const currentName: string = meta.full_name ?? meta.name ?? "";
  const currentAvatar: string | undefined = meta.avatar_url;
  const email: string = session?.user?.email ?? "";

  const [name, setName] = useState(currentName);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(currentAvatar);

  useEffect(() => {
    setName(currentName);
    setAvatarPreview(currentAvatar);
  }, [currentName, currentAvatar]);

  const initials = (name || currentName || "SP")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file", "Please choose an image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large", "Please choose an image under 5 MB.");
      return;
    }
    if (shouldSkipCropping(file)) {
      void uploadCroppedAvatar(file);
      return;
    }
    cropper.openWith(file);
  }

  async function uploadCroppedAvatar(file: File) {
    const previousAvatar = avatarPreview;
    setAvatarPreview(URL.createObjectURL(file));
    const uploadPromise = uploadAvatar.mutateAsync(file);
    toast.promise(uploadPromise, {
      loading: "Uploading photo...",
      success: "Photo uploaded",
      error: "Upload failed",
    });
    try {
      const url = await uploadPromise;
      await updateProfile.mutateAsync({ avatarUrl: url });
    } catch {
      setAvatarPreview(previousAvatar);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Name required", "Display name cannot be empty.");
      return;
    }
    try {
      await updateProfile.mutateAsync({ name: trimmed });
      toast.success("Profile updated");
    } catch {
      toast.error("Save failed", "Please try again.");
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <>
      <SettingsCard
        title="Profile"
        desc="Public details shown in the admin and on your portfolio."
        footer={
          <>
            <Button variant="outline" onClick={() => setName(currentName)} disabled={name === currentName}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={updateProfile.isPending || name.trim() === currentName}
            >
              {updateProfile.isPending ? "Saving…" : "Save changes"}
            </Button>
          </>
        }
      >
        <FieldRow label="Avatar" hint="JPG or PNG, max 5 MB.">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Avatar className="h-14 w-14 rounded-2xl">
                {avatarPreview && <AvatarImage src={avatarPreview} alt={name} />}
                <AvatarFallback className="rounded-2xl bg-blue-500/15 text-lg font-bold text-blue-500">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Change photo"
              >
                <Camera className="h-4 w-4 text-white" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileRef.current?.click()}
                disabled={uploadAvatar.isPending}
              >
                <Camera className="mr-1.5 h-3.5 w-3.5" />
                {uploadAvatar.isPending ? "Uploading…" : "Upload"}
              </Button>
            </div>
          </div>
        </FieldRow>
        <FieldRow label="Display name">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="max-w-md"
          />
        </FieldRow>
        <FieldRow label="Email" hint="Managed by Supabase Auth.">
          <div className="flex max-w-md items-center gap-2">
            <Input value={email} readOnly disabled className="bg-muted/50 text-muted-foreground" />
            <Badge variant="secondary" className="shrink-0 text-xs">
              Read-only
            </Badge>
          </div>
        </FieldRow>
      </SettingsCard>

      <ImageCropperDialog
        open={cropper.open}
        onOpenChange={cropper.setOpen}
        file={cropper.file}
        aspect={1}
        cropShape="round"
        outputType="image/jpeg"
        onCropped={uploadCroppedAvatar}
        confirmLabel="Upload"
        title="Crop profile photo"
        description="Position your photo inside the circle."
      />
    </>
  );
}

/* ─── Security tab ────────────────────────────────────────────────────── */

function SecuritySettings() {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [busy, setBusy] = useState(false);

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPwd.length < 12) {
      toast.error("Password too short", "Use at least 12 characters.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await createClient().auth.updateUser({ password: newPwd });
      if (error) throw error;
      setCurrentPwd("");
      setNewPwd("");
      toast.success("Password updated");
    } catch (err) {
      toast.error("Update failed", err instanceof Error ? err.message : "Could not update.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SettingsCard
      title="Password"
      desc="Use a long, unique password."
      footer={
        <Button onClick={updatePassword} disabled={busy || !newPwd}>
          {busy ? "Updating…" : "Update password"}
        </Button>
      }
    >
      <FieldRow label="Current password">
        <Input
          type="password"
          value={currentPwd}
          onChange={(e) => setCurrentPwd(e.target.value)}
          placeholder="••••••••"
          className="max-w-md"
        />
      </FieldRow>
      <FieldRow label="New password" hint="At least 12 characters.">
        <Input
          type="password"
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
          placeholder="At least 12 characters"
          className="max-w-md"
        />
      </FieldRow>
    </SettingsCard>
  );
}

/* ─── Notifications tab ───────────────────────────────────────────────── */

function NotificationsSettings() {
  const [notif, setNotif] = useState({
    contacts: true,
    feedback: true,
    waitlist: false,
    weekly: true,
  });

  const rows: { key: keyof typeof notif; label: string; hint: string }[] = [
    { key: "contacts", label: "New contact form submissions", hint: "Email + in-app notification." },
    { key: "feedback", label: "New feedback entries", hint: "Email when rating is 2 or below." },
    { key: "waitlist", label: "Waitlist signups", hint: "Daily digest at 9am." },
    { key: "weekly", label: "Weekly traffic summary", hint: "Sent every Monday." },
  ];

  return (
    <SettingsCard title="Notifications" desc="Choose what reaches your inbox.">
      {rows.map((r) => (
        <FieldRow key={r.key} label={r.label} hint={r.hint}>
          <Switch
            checked={notif[r.key]}
            onCheckedChange={(v) => setNotif((p) => ({ ...p, [r.key]: v }))}
          />
        </FieldRow>
      ))}
    </SettingsCard>
  );
}

/* ─── General tab ─────────────────────────────────────────────────────── */

function GeneralSettings() {
  return (
    <SettingsCard
      title="Site settings"
      desc="Public branding and regional defaults."
      footer={<Button>Save</Button>}
    >
      <FieldRow label="Site name">
        <Input defaultValue="Smit Parekh" className="max-w-md" />
      </FieldRow>
      <FieldRow label="Tagline">
        <Input
          defaultValue="Full-stack engineer · tools that earn their keep"
          className="max-w-md"
        />
      </FieldRow>
      <FieldRow label="Public email" hint="Shown in the footer.">
        <Input defaultValue="hello@smitparekh.co.in" className="max-w-md" />
      </FieldRow>
    </SettingsCard>
  );
}

/* ─── Appearance tab ──────────────────────────────────────────────────── */

const THEME_OPTIONS = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

function AppearanceSettings() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  return (
    <SettingsCard title="Appearance" desc="Tune how the admin panel looks.">
      <FieldRow label="Theme" hint="Auto follows your OS.">
        <div className="flex gap-2">
          {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              className={cn(
                "flex h-16 w-24 flex-col items-center justify-center gap-2 rounded-lg border text-[12px] font-medium capitalize transition-all",
                theme === value
                  ? "border-blue-500 bg-blue-500/8 text-blue-600 dark:text-blue-400"
                  : "border-border bg-card text-muted-foreground hover:border-blue-500/40 hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Currently rendering as{" "}
          <span className="font-medium text-foreground capitalize">{resolvedTheme}</span>.
        </p>
      </FieldRow>
    </SettingsCard>
  );
}

/* ─── Domain tab ──────────────────────────────────────────────────────── */

function DomainSettings() {
  return (
    <SettingsCard title="Custom domain" desc="Point your domain to the public site.">
      <FieldRow label="Primary domain">
        <div className="flex max-w-md items-center gap-2">
          <Input defaultValue="smitparekh.co.in" readOnly className="bg-muted/50" />
          <Badge
            variant="outline"
            className="shrink-0 gap-1 border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Verified
          </Badge>
        </div>
      </FieldRow>
      <FieldRow label="SSL" hint="Auto-renewed by Vercel.">
        <Badge
          variant="outline"
          className="gap-1 border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Active
        </Badge>
      </FieldRow>
      <FieldRow label="Hosting">
        <span className="text-[13px] text-muted-foreground">Vercel — configured via Vercel dashboard.</span>
      </FieldRow>
    </SettingsCard>
  );
}

/* ─── Integrations tab ────────────────────────────────────────────────── */

const INTEGRATIONS = [
  { name: "Supabase", hint: "Database + auth", status: "connected" as const },
  { name: "Vercel", hint: "Hosting + analytics", status: "connected" as const },
  { name: "Resend", hint: "Transactional email", status: "connected" as const },
  { name: "Cloudinary", hint: "Image CDN", status: "connected" as const },
  { name: "Cal.com", hint: "Booking widget", status: "connected" as const },
  { name: "Upstash Redis", hint: "Rate limiting + quota cache", status: "connected" as const },
];

function IntegrationsSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Integrations</CardTitle>
        <CardDescription>External services this admin talks to.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {INTEGRATIONS.map((it) => (
            <div
              key={it.name}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-md border border-border bg-muted/40">
                  <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="leading-tight">
                  <div className="text-[13.5px] font-medium">{it.name}</div>
                  <div className="text-[11.5px] text-muted-foreground">{it.hint}</div>
                </div>
              </div>
              <Badge
                variant="outline"
                className="gap-1 border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Connected
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── API tokens tab ──────────────────────────────────────────────────── */

function ApiSettings() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base">API tokens</CardTitle>
          <CardDescription>Personal access tokens for programmatic use.</CardDescription>
        </div>
        <Button size="sm" className="gap-1.5">
          <Key className="h-3.5 w-3.5" /> Create token
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            API token management is coming soon. Use the Supabase service role key for server-side access.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────── */

export default function SettingsPage() {
  const [tab, setTab] = useState<SettingTab>("profile");
  const { session, isLoading } = useSupabaseSession();

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      {/* Left nav */}
      <nav className="space-y-5">
        {SETTING_GROUPS.map((g) => (
          <div key={g.title}>
            <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              {g.title}
            </div>
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const Icon = it.icon;
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
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {it.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <Separator />

        <button
          type="button"
          onClick={async () => {
            await clearAdminToken();
            window.location.replace("/admin/login");
          }}
          className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-3.5 w-3.5 shrink-0" />
          Sign out
        </button>
      </nav>

      {/* Content */}
      <div className="space-y-6">
        {tab === "profile" && <ProfileSettings session={session} isLoading={isLoading} />}
        {tab === "security" && <SecuritySettings />}
        {tab === "notifications" && <NotificationsSettings />}
        {tab === "general" && <GeneralSettings />}
        {tab === "appearance" && <AppearanceSettings />}
        {tab === "domain" && <DomainSettings />}
        {tab === "integrations" && <IntegrationsSettings />}
        {tab === "api" && <ApiSettings />}
      </div>
    </div>
  );
}
