"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, Sparkles, Wand2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AppSelect } from "@/components/ui/app-select";
import {
  useAiDraftContactReply,
  useSendContactReply,
} from "@/hooks/api/use-admin-contacts";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import type { ReplyTone } from "@/lib/api";
import type { AdminContact } from "@/types";

interface Props {
  contact: AdminContact | null;
  open: boolean;
  onClose: () => void;
}

const TONE_OPTIONS: { value: ReplyTone; label: string }[] = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "brief", label: "Brief" },
];

export function ContactReplyDialog({ contact, open, onClose }: Props) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [tone, setTone] = useState<ReplyTone>("professional");
  const [intent, setIntent] = useState("");

  const draftMut = useAiDraftContactReply();
  const sendMut = useSendContactReply();

  // Reset / seed state when the dialog opens for a different contact.
  useEffect(() => {
    if (!open || !contact) return;
    setSubject(`Re: ${contact.subject}`);
    setBody("");
    setIntent("");
    draftMut.reset();
    sendMut.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, contact?._id]);

  if (!contact) return null;

  async function handleGenerate() {
    if (!contact) return;
    try {
      const res = await draftMut.mutateAsync({
        id: contact._id,
        payload: { tone, intent: intent.trim() || undefined },
      });
      setSubject(res.subject);
      setBody(res.body);
      toast.success("Draft generated", "Edit before sending if needed.");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Could not generate draft.";
      toast.error("Generation failed", message);
    }
  }

  async function handleSend() {
    if (!contact) return;
    if (!subject.trim() || !body.trim()) {
      toast.error("Missing fields", "Subject and body are required.");
      return;
    }
    try {
      await sendMut.mutateAsync({
        id: contact._id,
        payload: { subject: subject.trim(), body: body.trim() },
      });
      toast.success("Reply sent", `Email delivered to ${contact.email}.`);
      onClose();
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Could not send reply.";
      toast.error("Send failed", message);
    }
  }

  const busy = draftMut.isPending || sendMut.isPending;

  return (
    <Dialog open={open} onOpenChange={(o) => (!o ? onClose() : undefined)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-2 text-white">
              <Mail className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle>Reply to {contact.name}</DialogTitle>
              <DialogDescription className="truncate">
                Sending to {contact.email}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Original message preview (collapsed) */}
          <details className="rounded-lg border border-border bg-muted/30 px-3 py-2">
            <summary className="cursor-pointer text-xs font-medium text-muted-foreground">
              Original message — {contact.subject}
            </summary>
            <p className="mt-2 whitespace-pre-line text-xs text-foreground/80">
              {contact.description}
            </p>
          </details>

          {/* AI controls */}
          <div className="grid gap-3 rounded-xl border border-border bg-muted/30 p-3 sm:grid-cols-[160px_1fr_auto]">
            <div className="space-y-1.5">
              <Label className="text-xs">Tone</Label>
              <AppSelect
                value={tone}
                onValueChange={(v) => setTone(v as ReplyTone)}
                options={TONE_OPTIONS}
                triggerClassName="w-full"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Reply angle (optional)</Label>
              <Input
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                placeholder='e.g., "decline politely" or "propose a 30-min call next week"'
                className="text-sm"
              />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                size="sm"
                onClick={handleGenerate}
                disabled={busy}
                className="w-full gap-1.5"
              >
                {draftMut.isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Drafting...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    {body ? "Regenerate" : "Generate"}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Editable subject + body */}
          <div className="space-y-1.5">
            <Label htmlFor="reply-subject" className="text-xs">
              Subject
            </Label>
            <Input
              id="reply-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Re: ..."
              maxLength={120}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="reply-body" className="text-xs">
              Body
            </Label>
            <Textarea
              id="reply-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Click Generate to draft with AI, or write your reply here."
              rows={12}
              className="resize-y font-sans text-sm leading-relaxed"
            />
            <p className="text-[11px] text-muted-foreground">
              {body.length} characters · plain text · sent via Resend with
              Reply-To set to {contact.email}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={busy}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(body).then(
                () => toast.success("Body copied"),
                () => toast.error("Copy failed"),
              );
            }}
            disabled={!body || busy}
            className="gap-1.5"
          >
            <Wand2 className="h-3.5 w-3.5" />
            Copy body
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSend}
            disabled={!subject.trim() || !body.trim() || busy}
            className="gap-1.5"
          >
            {sendMut.isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="h-3.5 w-3.5" />
                Send reply
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
