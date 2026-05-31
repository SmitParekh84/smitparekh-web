"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { useClientMe, useUpdateClientMe } from "@/hooks/api/use-clients";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";

function initials(name?: string, email?: string) {
  const src = name?.trim() || email || "";
  return (
    src
      .split(/\s+|@/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "C"
  );
}

export default function ClientAccountPage() {
  const router = useRouter();
  const { data, isLoading } = useClientMe();
  const client = data?.data;
  const updateMe = useUpdateClientMe();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <ProfileCard
        key={client?._id}
        name={client?.name ?? ""}
        company={client?.company ?? ""}
        mobile={client?.mobile ?? ""}
        email={client?.email ?? ""}
        saving={updateMe.isPending}
        onSave={async (payload) => {
          try {
            await updateMe.mutateAsync(payload);
            toast.success("Profile updated");
          } catch (err) {
            const msg = err instanceof ApiError ? err.message : "Could not save your profile.";
            toast.error("Update failed", msg);
            throw err;
          }
        }}
      />

      <PasswordCard email={client?.email ?? ""} />

      <NotificationsCard />

      {/* Sign out */}
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <div className="text-[13.5px] font-medium">Sign out</div>
            <div className="text-xs text-muted-foreground">End your session on this device.</div>
          </div>
          <Button
            variant="outline"
            className="gap-1.5"
            onClick={async () => {
              await createClient().auth.signOut();
              router.replace("/client/login");
            }}
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

/* ─── Profile ─────────────────────────────────────────────────────────── */
function ProfileCard({
  name: initialName,
  company: initialCompany,
  mobile: initialMobile,
  email,
  saving,
  onSave,
}: {
  name: string;
  company: string;
  mobile: string;
  email: string;
  saving: boolean;
  onSave: (payload: { name: string; company: string; mobile: string }) => Promise<void>;
}) {
  const [name, setName] = useState(initialName);
  const [company, setCompany] = useState(initialCompany);
  const [mobile, setMobile] = useState(initialMobile);

  const dirty = name !== initialName || company !== initialCompany || mobile !== initialMobile;

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-base">Profile</CardTitle>
          <p className="mt-0.5 text-sm text-muted-foreground">Your contact details for this project.</p>
        </div>
      </CardHeader>
      <CardContent className="divide-y divide-border pt-0">
        <AccRow label="Avatar" hint="Shown to your project team.">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-blue-500/15 text-sm font-semibold text-blue-500">
              {initials(name, email)}
            </AvatarFallback>
          </Avatar>
        </AccRow>
        <AccRow label="Full name">
          <Input className="max-w-sm" value={name} onChange={(e) => setName(e.target.value)} />
        </AccRow>
        <AccRow label="Company">
          <Input className="max-w-sm" value={company} onChange={(e) => setCompany(e.target.value)} />
        </AccRow>
        <AccRow label="Email" hint="Used to sign in. Contact us to change it.">
          <div className="flex max-w-sm items-center gap-2">
            <Input className="flex-1 bg-muted/40" value={email} readOnly />
            <Badge
              variant="outline"
              className="gap-1 border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Verified
            </Badge>
          </div>
        </AccRow>
        <AccRow label="Phone">
          <Input
            className="max-w-sm"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </AccRow>
      </CardContent>
      <div className="flex items-center justify-end gap-2 border-t border-border bg-muted/30 px-5 py-3">
        <Button
          disabled={!dirty || saving}
          onClick={() => onSave({ name, company, mobile }).catch(() => {})}
          className="gap-1.5"
        >
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          Save changes
        </Button>
      </div>
    </Card>
  );
}

/* ─── Password (real, via Supabase) ───────────────────────────────────── */
function PasswordCard({ email }: { email: string }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [busy, setBusy] = useState(false);

  const canSubmit = current.length > 0 && next.length >= 12;

  async function updatePassword() {
    if (next.length < 12) {
      toast.error("Password too short", "Use at least 12 characters.");
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();

      // Verify current password first
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email,
        password: current,
      });
      if (signInErr) {
        toast.error("Incorrect password", "The current password you entered is wrong.");
        return;
      }

      // Update to new password
      const { error: updateErr } = await supabase.auth.updateUser({ password: next });
      if (updateErr) throw updateErr;

      setCurrent("");
      setNext("");
      toast.success("Password updated");
    } catch (err) {
      toast.error("Update failed", err instanceof Error ? err.message : "Could not update password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-base">Password</CardTitle>
          <p className="mt-0.5 text-sm text-muted-foreground">Use a long, unique password.</p>
        </div>
      </CardHeader>
      <CardContent className="divide-y divide-border pt-0">
        <AccRow label="Current password">
          <Input
            className="max-w-sm"
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Your current password"
          />
        </AccRow>
        <AccRow label="New password">
          <div className="max-w-sm space-y-1">
            <Input
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              placeholder="At least 12 characters"
            />
            {next.length > 0 && next.length < 12 && (
              <p className="text-[11.5px] text-red-500">
                {12 - next.length} more character{12 - next.length !== 1 ? "s" : ""} needed
              </p>
            )}
          </div>
        </AccRow>
      </CardContent>
      <div className="flex items-center justify-end border-t border-border bg-muted/30 px-5 py-3">
        <Button onClick={updatePassword} disabled={busy || !canSubmit} className="gap-1.5">
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          Update password
        </Button>
      </div>
    </Card>
  );
}

/* ─── Notifications (local preference) ────────────────────────────────── */
function NotificationsCard() {
  const [notif, setNotif] = useState({ projectUpdates: true, proposalReady: true, weekly: false });
  const [saved, setSaved] = useState(false);

  const rows: { key: keyof typeof notif; label: string; hint: string }[] = [
    { key: "projectUpdates", label: "Project updates", hint: "When a step changes status or a file is shared." },
    { key: "proposalReady", label: "Proposal ready", hint: "When your proposal or quote is sent." },
    { key: "weekly", label: "Weekly summary", hint: "A Monday digest of progress." },
  ];

  function toggle(key: keyof typeof notif, value: boolean) {
    setNotif((p) => ({ ...p, [key]: value }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle className="text-base">Email notifications</CardTitle>
          <p className="mt-0.5 text-sm text-muted-foreground">Choose when we email you.</p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
            <Check className="h-3.5 w-3.5" /> Saved
          </span>
        )}
      </CardHeader>
      <CardContent className="divide-y divide-border pt-0">
        {rows.map((r) => (
          <AccRow key={r.key} label={r.label} hint={r.hint}>
            <Switch checked={notif[r.key]} onCheckedChange={(v) => toggle(r.key, v)} />
          </AccRow>
        ))}
      </CardContent>
    </Card>
  );
}

function AccRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 py-4 first:pt-4 last:pb-4 sm:grid-cols-[180px_1fr] sm:items-start">
      <div>
        <div className="text-[13.5px] font-medium">{label}</div>
        {hint && <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
