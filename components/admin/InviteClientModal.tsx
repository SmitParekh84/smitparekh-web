"use client";

import { useState } from "react";
import { Loader2, Mail, Send } from "lucide-react";
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
import { useInviteClient } from "@/hooks/api/use-clients";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";

interface InviteClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteClientModal({ open, onOpenChange }: InviteClientModalProps) {
  const [email, setEmail] = useState("");
  const inviteClient = useInviteClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      await inviteClient.mutateAsync(email.trim().toLowerCase());
      toast.success("Invitation sent", `An invitation email has been sent to ${email}.`);
      setEmail("");
      onOpenChange(false);
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.message
          : "Could not send the invitation. Please try again.";
      toast.error("Failed to send invitation", msg);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-500" />
            Invite a client
          </DialogTitle>
          <DialogDescription>
            The client will receive an email with a secure onboarding link valid for 48 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="client-email">Client email address</Label>
            <Input
              id="client-email"
              type="email"
              placeholder="client@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={inviteClient.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!email.trim() || inviteClient.isPending}
              className="gap-2"
            >
              {inviteClient.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send invitation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
