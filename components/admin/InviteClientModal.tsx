"use client";

import { useState } from "react";
import { Clock, Loader2, Mail, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useInviteClient } from "@/hooks/api/use-clients";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";

interface InviteClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteClientModal({ open, onOpenChange }: InviteClientModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const inviteClient = useInviteClient();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function handleClose() {
    if (inviteClient.isPending) return;
    setEmail("");
    setName("");
    setCompany("");
    setMessage("");
    onOpenChange(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !emailValid) return;

    try {
      await inviteClient.mutateAsync({
        email: email.trim().toLowerCase(),
        name: name.trim() || undefined,
        company: company.trim() || undefined,
        message: message.trim() || undefined,
      });
      toast.success("Invitation sent", `Onboarding link sent to ${email}.`);
      handleClose();
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.message
          : "Could not send the invitation. Please try again.";
      toast.error("Failed to send invitation", msg);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex-row items-start gap-3 space-y-0">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Mail className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <DialogTitle>Invite a client</DialogTitle>
            <DialogDescription className="mt-0.5">
              They&apos;ll get an onboarding link to set up their portal.
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email - required */}
          <div className="space-y-1.5">
            <Label htmlFor="invite-email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="invite-email"
              type="email"
              placeholder="client@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
            {email && !emailValid && (
              <p className="text-[11.5px] text-destructive">Enter a valid email address.</p>
            )}
          </div>

          {/* Name + Company - optional */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="invite-name">Name</Label>
              <Input
                id="invite-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Optional"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="invite-company">Company</Label>
              <Input
                id="invite-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Personal note - optional */}
          <div className="space-y-1.5">
            <Label htmlFor="invite-message">Personal note</Label>
            <Textarea
              id="invite-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Added to the invitation email (optional)."
            />
          </div>

          {/* Expiry notice */}
          <div className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-[12px] text-muted-foreground">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            The invite link expires in 7 days.
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={inviteClient.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!email.trim() || !emailValid || inviteClient.isPending}
              className="gap-2"
            >
              {inviteClient.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send invite
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
