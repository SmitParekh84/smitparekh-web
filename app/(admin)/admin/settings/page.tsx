"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Camera, LogOut, Monitor, Moon, Sun, UserRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ImageCropperDialog,
  shouldSkipCropping,
  useImageCropper,
} from "@/components/ui/image-cropper";
import { useSupabaseSession, useUpdateProfile, useUploadAvatar } from "@/hooks/api/use-auth";
import { clearAdminToken } from "@/lib/api";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

export default function SettingsPage() {
  const router = useRouter();
  const { resolvedTheme, theme, setTheme } = useTheme();
  const { session, isLoading } = useSupabaseSession();
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
    // Reset so picking the same file twice still triggers onChange.
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

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Name required", "Display name cannot be empty.");
      return;
    }
    try {
      await updateProfile.mutateAsync({ name: trimmed });
      toast.success("Profile updated", "Your display name has been saved.");
    } catch {
      toast.error("Save failed", "Please try again.");
    }
  }

  async function handleLogout() {
    await clearAdminToken();
    router.replace("/admin/login");
  }

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-2xl">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight">Settings</h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Site, integrations and account preferences.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <UserRound className="h-4 w-4 text-blue-500" />
            Profile
          </CardTitle>
          <CardDescription>Update your display name and profile photo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-5">
              <div className="relative group">
                <Avatar className="h-20 w-20 rounded-2xl">
                  {avatarPreview && <AvatarImage src={avatarPreview} alt={name} />}
                  <AvatarFallback className="rounded-2xl bg-blue-500/15 text-blue-500 text-xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Change photo"
                >
                  <Camera className="h-5 w-5 text-white" />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{name || "Your name"}</p>
                <p className="text-xs text-muted-foreground">{email}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                  className="mt-1"
                  disabled={uploadAvatar.isPending}
                >
                  <Camera className="h-3.5 w-3.5 mr-1.5" />
                  {uploadAvatar.isPending ? "Uploading…" : "Change photo"}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Fields */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="display-name">Display name</Label>
                <Input
                  id="display-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="email"
                    value={email}
                    readOnly
                    disabled
                    className="bg-muted/50 text-muted-foreground"
                  />
                  <Badge variant="secondary" className="text-xs shrink-0">
                    Read-only
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Email is managed by Supabase Auth and cannot be changed here.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={updateProfile.isPending || name.trim() === currentName}
              >
                {updateProfile.isPending ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sun className="h-4 w-4 text-amber-500" />
            Appearance
          </CardTitle>
          <CardDescription>Choose how the admin panel looks.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                className={cn(
                  "flex flex-1 flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all",
                  theme === value
                    ? "border-blue-500 bg-blue-500/8 text-blue-500"
                    : "border-border bg-card text-muted-foreground hover:border-blue-500/40 hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Currently rendering as{" "}
            <span className="font-medium text-foreground capitalize">{resolvedTheme}</span>.
          </p>
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <LogOut className="h-4 w-4 text-destructive" />
            Account
          </CardTitle>
          <CardDescription>Sign out or review your access level.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="text-sm font-medium">Role</p>
              <p className="text-xs text-muted-foreground">Your access level</p>
            </div>
            <Badge variant="secondary" className="capitalize">
              {meta.role ?? "admin"}
            </Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div>
              <p className="text-sm font-medium">Sign out</p>
              <p className="text-xs text-muted-foreground">
                You will be redirected to the login page.
              </p>
            </div>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              Log out
            </Button>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
}
