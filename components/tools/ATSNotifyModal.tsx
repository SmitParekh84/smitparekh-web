"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotifyTool } from "@/hooks/api/use-tools";
import { toast } from "@/lib/toast";

interface ATSNotifyModalProps {
  open: boolean;
  onClose: () => void;
}

const FEATURE_CHIPS = ["Keyword match score", "Skill gap analysis", "Tailored recommendations"];

export function ATSNotifyModal({ open, onClose }: ATSNotifyModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const notify = useNotifyTool();

  function handleClose() {
    if (!notify.isPending) {
      setEmail("");
      setSubmitted(false);
      onClose();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    notify.mutate(
      { email, tool: "ats-job-match" },
      {
        onSuccess: () => setSubmitted(true),
        onError: () => toast.error("Failed", "Couldn't save your email - please try again."),
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Job Match Check 🚀</DialogTitle>
          <DialogDescription>
            We&apos;re building a smarter ATS check - paste any job description and we match it
            against your resume for a tailored score.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center space-y-2">
            <p className="text-2xl">🎉</p>
            <p className="font-semibold text-foreground">You&apos;re on the list!</p>
            <p className="text-sm text-muted-foreground">
              We&apos;ll email you when Job Match Check launches.
            </p>
            <Button variant="outline" size="sm" className="mt-4" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {FEATURE_CHIPS.map((chip) => (
                <Badge key={chip} variant="secondary">
                  {chip}
                </Badge>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={notify.isPending}
                className="flex-1"
              />
              <Button type="submit" disabled={notify.isPending || !email}>
                {notify.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Notify me"
                )}
              </Button>
            </form>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={notify.isPending}
              className="w-full text-xs text-muted-foreground"
            >
              Maybe later
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
