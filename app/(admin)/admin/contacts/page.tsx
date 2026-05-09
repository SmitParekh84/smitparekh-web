"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Inbox,
  Loader2,
  Mail,
  MailOpen,
  Reply,
  RotateCcw,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { ContactReplyDialog } from "@/components/admin/ContactReplyDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useAdminContacts,
  useAdminContact,
  useDeletedAdminContacts,
  useDeleteAdminContact,
  useRestoreAdminContact,
  useSetContactRead,
  useBulkSetContactsRead,
} from "@/hooks/api/use-admin-contacts";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { formatRelative, formatDateTime } from "@/lib/date";
import type { AdminContact } from "@/types";

type Tab = "inbox" | "trash";

export default function AdminContactsPage() {
  const [tab, setTab] = useState<Tab>("inbox");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [bulkPending, setBulkPending] = useState(false);

  const inboxQuery = useAdminContacts({ limit: 50, unread: unreadOnly });
  const trashQuery = useDeletedAdminContacts();

  const setRead = useSetContactRead();
  const bulkSetReadMut = useBulkSetContactsRead();
  const deleteContact = useDeleteAdminContact();
  const restoreContact = useRestoreAdminContact();

  const inbox = inboxQuery.data?.data ?? [];
  const total = inboxQuery.data?.total ?? 0;
  const unreadCount = inboxQuery.data?.unreadCount ?? 0;
  const deleted = trashQuery.data ?? [];

  // Drop selections that no longer exist (after refetch / filter change)
  useEffect(() => {
    if (selected.size === 0) return;
    const visible = new Set(inbox.map((c) => c._id));
    let changed = false;
    const next = new Set<string>();
    selected.forEach((id) => {
      if (visible.has(id)) next.add(id);
      else changed = true;
    });
    if (changed) setSelected(next);
  }, [inbox, selected]);

  // Clear selection on tab change
  useEffect(() => {
    setSelected(new Set());
  }, [tab]);

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllVisible(checked: boolean) {
    if (!checked) {
      setSelected(new Set());
      return;
    }
    setSelected(new Set(inbox.map((c) => c._id)));
  }

  async function bulkSetRead(isRead: boolean) {
    const ids = inbox
      .filter((c) => selected.has(c._id) && c.isRead !== isRead)
      .map((c) => c._id);
    if (ids.length === 0) {
      setSelected(new Set());
      return;
    }
    setBulkPending(true);
    try {
      const res = await bulkSetReadMut.mutateAsync({ ids, isRead });
      toast.success(
        `Marked ${res.modified} as ${isRead ? "read" : "unread"}`,
      );
      setSelected(new Set());
    } catch {
      toast.error("Bulk update failed", "Please try again.");
    } finally {
      setBulkPending(false);
    }
  }

  // Auto-mark read when opening unread contact
  const detailQuery = useAdminContact(openId);
  useEffect(() => {
    const c = detailQuery.data;
    if (!c) return;
    if (!c.isDeleted && !c.isRead) {
      setRead.mutate({ id: c._id, isRead: true });
    }
    // Only fire when the opened id changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailQuery.data?._id]);

  function closeDetail() {
    setOpenId(null);
  }

  async function handleSoftDelete(id: string) {
    try {
      await deleteContact.mutateAsync(id);
      toast.success("Moved to trash");
      if (openId === id) closeDetail();
    } catch {
      toast.error("Delete failed", "Could not move contact to trash.");
    }
  }

  async function handleRestore(id: string) {
    try {
      await restoreContact.mutateAsync(id);
      toast.success("Contact restored");
    } catch {
      toast.error("Restore failed", "Could not restore contact.");
    }
  }

  function handleToggleRead(c: AdminContact) {
    setRead.mutate({ id: c._id, isRead: !c.isRead });
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 p-[1px]">
        <div className="rounded-2xl bg-card px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 p-2 text-white shadow-sm">
                <Inbox className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Contacts
                </h2>
                <p className="text-sm text-muted-foreground">
                  Submissions from the public contact form.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:self-center">
              <Badge variant="secondary" className="gap-1.5">
                <Mail className="h-3 w-3" />
                {total} total
              </Badge>
              {unreadCount > 0 && (
                <Badge className="gap-1.5 bg-blue-500 text-white hover:bg-blue-500">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-b border-border">
        <TabButton
          active={tab === "inbox"}
          onClick={() => setTab("inbox")}
          label="Inbox"
        />
        <TabButton
          active={tab === "trash"}
          onClick={() => setTab("trash")}
          label="Trash"
          count={deleted.length}
        />
        {tab === "inbox" && (
          <button
            type="button"
            onClick={() => setUnreadOnly((v) => !v)}
            className={cn(
              "ml-auto rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              unreadOnly
                ? "border-blue-500 bg-blue-500/10 text-blue-500"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            Unread only
          </button>
        )}
      </div>

      {tab === "inbox" ? (
        <Card>
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
            <CardDescription>
              {inboxQuery.isLoading
                ? "Loading..."
                : `${inbox.length} of ${total} shown`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {selected.size > 0 && (
              <BulkActionBar
                count={selected.size}
                pending={bulkPending}
                onMarkRead={() => bulkSetRead(true)}
                onMarkUnread={() => bulkSetRead(false)}
                onClear={() => setSelected(new Set())}
              />
            )}
            <ContactList
              isLoading={inboxQuery.isLoading}
              isError={inboxQuery.isError}
              onRefetch={() => inboxQuery.refetch()}
              items={inbox}
              onOpen={(id) => setOpenId(id)}
              selected={selected}
              onToggleOne={toggleOne}
              onToggleAll={toggleAllVisible}
              emptyText={
                unreadOnly ? "No unread messages." : "No messages yet."
              }
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Trash</CardTitle>
            <CardDescription>
              Soft-deleted submissions. Restore to send back to the inbox.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <DeletedList
              isLoading={trashQuery.isLoading}
              isError={trashQuery.isError}
              onRefetch={() => trashQuery.refetch()}
              items={deleted}
              onRestore={handleRestore}
              restoringId={
                restoreContact.isPending
                  ? (restoreContact.variables as string | undefined) ?? null
                  : null
              }
            />
          </CardContent>
        </Card>
      )}

      {openId && (
        <ContactDetailDrawer
          id={openId}
          onClose={closeDetail}
          onToggleRead={handleToggleRead}
          onSoftDelete={handleSoftDelete}
        />
      )}
    </div>
  );
}

/* ------------------------------- subviews -------------------------------- */

function TabButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      {typeof count === "number" && count > 0 && (
        <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-muted px-1 text-[10px] font-semibold text-muted-foreground">
          {count}
        </span>
      )}
      {active && (
        <span className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-500" />
      )}
    </button>
  );
}

function BulkActionBar({
  count,
  pending,
  onMarkRead,
  onMarkUnread,
  onClear,
}: {
  count: number;
  pending: boolean;
  onMarkRead: () => void;
  onMarkUnread: () => void;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-blue-500/[0.06] px-4 py-2.5 sm:px-6">
      <span className="text-sm font-medium text-blue-600">
        {count} selected
      </span>
      <div className="ml-auto flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 gap-1.5 text-xs"
          disabled={pending}
          onClick={onMarkRead}
        >
          {pending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <MailOpen className="h-3.5 w-3.5" />
          )}
          Mark read
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 gap-1.5 text-xs"
          disabled={pending}
          onClick={onMarkUnread}
        >
          <Mail className="h-3.5 w-3.5" />
          Mark unread
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-8 gap-1.5 text-xs"
          disabled={pending}
          onClick={onClear}
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </Button>
      </div>
    </div>
  );
}

function ContactList({
  items,
  isLoading,
  isError,
  onRefetch,
  onOpen,
  selected,
  onToggleOne,
  onToggleAll,
  emptyText,
}: {
  items: AdminContact[];
  isLoading: boolean;
  isError: boolean;
  onRefetch: () => void;
  onOpen: (id: string) => void;
  selected: Set<string>;
  onToggleOne: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
  emptyText: string;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="px-6 py-12 text-center">
        <p className="mb-3 text-sm text-muted-foreground">
          Could not load contacts. Is the backend running?
        </p>
        <Button variant="outline" size="sm" onClick={onRefetch}>
          Retry
        </Button>
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        {emptyText}
      </p>
    );
  }
  const allSelected = items.length > 0 && items.every((c) => selected.has(c._id));
  const someSelected = !allSelected && items.some((c) => selected.has(c._id));
  return (
    <div>
      <div className="flex items-center gap-3 border-b border-border bg-muted/30 px-4 py-2 sm:px-6">
        <Checkbox
          aria-label={allSelected ? "Deselect all" : "Select all"}
          checked={allSelected ? true : someSelected ? "indeterminate" : false}
          onCheckedChange={(v) => onToggleAll(v === true)}
        />
        <span className="text-xs font-medium text-muted-foreground">
          {selected.size > 0
            ? `${selected.size} selected`
            : "Select all on this page"}
        </span>
      </div>
      <ul className="divide-y divide-border">
        {items.map((c) => {
          const isSelected = selected.has(c._id);
          const unread = !c.isRead;
          return (
            <li
              key={c._id}
              className={cn(
                "relative flex items-start gap-3 px-4 py-3 transition-colors sm:px-6",
                // Unread: clearer tint + left accent bar
                unread && "bg-blue-500/[0.07] dark:bg-blue-500/[0.09]",
                unread &&
                  "before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-blue-500",
                isSelected && "bg-blue-500/[0.12] dark:bg-blue-500/[0.14]",
                "hover:bg-muted/50",
              )}
            >
              <div className="pt-0.5">
                <Checkbox
                  aria-label={`Select message from ${c.name}`}
                  checked={isSelected}
                  onCheckedChange={() => onToggleOne(c._id)}
                />
              </div>
              <button
                type="button"
                onClick={() => onOpen(c._id)}
                className="flex min-w-0 flex-1 flex-col gap-1 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    {unread && (
                      <span
                        aria-label="Unread"
                        className="size-2 shrink-0 rounded-full bg-blue-500"
                      />
                    )}
                    <span
                      className={cn(
                        "truncate",
                        // Strong weight + full strength when unread,
                        // normal weight + slightly muted when already read.
                        unread
                          ? "font-semibold text-foreground"
                          : "font-normal text-muted-foreground",
                      )}
                    >
                      {c.name}
                    </span>
                    <span className="hidden truncate text-xs text-muted-foreground sm:inline">
                      {c.email}
                    </span>
                    {!c.emailSent && (
                      <Badge
                        variant="secondary"
                        className="shrink-0 gap-1 border-amber-500/30 bg-amber-500/10 text-amber-600 hover:bg-amber-500/10"
                      >
                        <AlertTriangle className="h-3 w-3" />
                        Email failed
                      </Badge>
                    )}
                    {c.repliedAt && (
                      <Badge
                        variant="secondary"
                        title={`Replied ${formatRelative(c.repliedAt)}${
                          (c.replyCount ?? 0) > 1 ? ` · ${c.replyCount} replies` : ""
                        }`}
                        className="shrink-0 gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400"
                      >
                        <Reply className="h-3 w-3" />
                        Replied
                        {(c.replyCount ?? 0) > 1 ? ` ×${c.replyCount}` : ""}
                      </Badge>
                    )}
                  </div>
                  <time
                    className={cn(
                      "shrink-0 text-xs",
                      unread ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {formatRelative(c.createdAt)}
                  </time>
                </div>
                <p className="line-clamp-1 pl-4 text-sm">
                  <span
                    className={cn(
                      unread
                        ? "font-medium text-foreground"
                        : "font-normal text-muted-foreground",
                    )}
                  >
                    {c.subject}
                  </span>
                  <span className="mx-1.5 text-muted-foreground">&middot;</span>
                  <span
                    className={cn(
                      unread
                        ? "text-foreground/80"
                        : "text-muted-foreground/70",
                    )}
                  >
                    {c.description}
                  </span>
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DeletedList({
  items,
  isLoading,
  isError,
  onRefetch,
  onRestore,
  restoringId,
}: {
  items: AdminContact[];
  isLoading: boolean;
  isError: boolean;
  onRefetch: () => void;
  onRestore: (id: string) => Promise<void>;
  restoringId: string | null;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="px-6 py-12 text-center">
        <p className="mb-3 text-sm text-muted-foreground">
          Could not load trash.
        </p>
        <Button variant="outline" size="sm" onClick={onRefetch}>
          Retry
        </Button>
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Trash is empty.
      </p>
    );
  }
  return (
    <ul className="divide-y divide-border">
      {items.map((c) => (
        <li
          key={c._id}
          className="flex items-start justify-between gap-3 px-4 py-3 sm:px-6"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate font-medium">{c.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {c.email}
              </span>
              {c.deletedAt && (
                <span className="text-xs text-muted-foreground">
                  &middot; deleted {formatRelative(c.deletedAt)}
                </span>
              )}
            </div>
            <p className="line-clamp-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/80">
                {c.subject}
              </span>
              <span className="mx-1.5">&middot;</span>
              {c.description}
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-xs"
            disabled={restoringId === c._id}
            onClick={() => onRestore(c._id)}
          >
            {restoringId === c._id ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <RotateCcw className="h-3 w-3" />
            )}
            Restore
          </Button>
        </li>
      ))}
    </ul>
  );
}

function ContactDetailDrawer({
  id,
  onClose,
  onToggleRead,
  onSoftDelete,
}: {
  id: string;
  onClose: () => void;
  onToggleRead: (c: AdminContact) => void;
  onSoftDelete: (id: string) => Promise<void>;
}) {
  const { data: contact, isLoading, isError, refetch } = useAdminContact(id);
  const [replyOpen, setReplyOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (replyOpen) return; // let the reply dialog handle its own escape
        onClose();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, replyOpen]);

  async function handleCopyEmail() {
    if (!contact) return;
    try {
      await navigator.clipboard.writeText(contact.email);
      toast.success("Email copied");
    } catch {
      toast.error("Could not copy email");
    }
  }

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
        onClick={(e) => {
          // Only close on direct backdrop click — NOT on events bubbling from
          // the React portal of the nested ContactReplyDialog.
          if (e.target === e.currentTarget) onClose();
        }}
      >
      <aside
        className="flex h-full w-full max-w-xl flex-col border-l border-border bg-card shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-base font-semibold">Message</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}
          {isError && (
            <div className="py-12 text-center">
              <p className="mb-3 text-sm text-muted-foreground">
                Could not load contact.
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}
          {contact && (
            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  From
                </p>
                <p className="mt-1 font-medium">{contact.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    {contact.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-1.5 py-0.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Copy className="h-3 w-3" />
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Subject
                </p>
                <p className="mt-1 font-medium">{contact.subject}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Message
                </p>
                <p className="mt-1 whitespace-pre-line text-sm text-foreground/90">
                  {contact.description}
                </p>
              </div>

              {contact.repliedAt && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                        Replied {formatRelative(contact.repliedAt)}
                        {(contact.replyCount ?? 0) > 1 && (
                          <span className="ml-1.5 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                            {contact.replyCount} replies
                          </span>
                        )}
                      </p>
                      {contact.lastReplySubject && (
                        <p className="mt-1 truncate text-xs text-emerald-700/80 dark:text-emerald-300/80">
                          Last subject: <span className="font-medium">{contact.lastReplySubject}</span>
                        </p>
                      )}
                      <p className="mt-0.5 text-[11px] text-emerald-700/70 dark:text-emerald-300/70">
                        {formatDateTime(contact.repliedAt)}
                      </p>
                      {!contact.replies?.length && (
                        <p className="mt-2 text-[11px] italic text-emerald-700/70 dark:text-emerald-300/70">
                          Reply body not available — view in Resend logs.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {contact.replies && contact.replies.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Your replies
                  </p>
                  {[...contact.replies]
                    .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
                    .map((reply, idx) => (
                      <div
                        key={`${reply.sentAt}-${idx}`}
                        className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-3.5"
                      >
                        <p className="text-sm font-medium">{reply.subject}</p>
                        <p className="mt-1.5 whitespace-pre-line text-sm text-foreground/90">
                          {reply.body}
                        </p>
                        <p
                          className="mt-2 text-[11px] text-muted-foreground"
                          title={formatDateTime(reply.sentAt)}
                        >
                          Sent {formatRelative(reply.sentAt)} · {formatDateTime(reply.sentAt)}
                        </p>
                      </div>
                    ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Received</p>
                  <p>{formatDateTime(contact.createdAt)}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Status</p>
                  <p>
                    {contact.isRead
                      ? `Read${contact.readAt ? ` ${formatRelative(contact.readAt)}` : ""}`
                      : "Unread"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Notification email</p>
                  <p
                    className={cn(
                      contact.emailSent
                        ? "text-emerald-600"
                        : "text-amber-600",
                    )}
                  >
                    {contact.emailSent ? "Delivered" : "Failed"}
                  </p>
                  {!contact.emailSent && contact.emailError && (
                    <p className="mt-0.5 text-[11px]">{contact.emailError}</p>
                  )}
                </div>
                {contact.ipAddress && (
                  <div>
                    <p className="font-medium text-foreground">IP</p>
                    <p className="font-mono">{contact.ipAddress}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {contact && (
          <div className="flex flex-wrap items-center gap-2 border-t border-border bg-muted/20 px-5 py-3">
            <button
              type="button"
              onClick={() => setReplyOpen(true)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-white transition-colors",
                contact.repliedAt
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-blue-500 hover:bg-blue-600",
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {contact.repliedAt ? "Reply again with AI" : "Reply with AI"}
            </button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-8 gap-1.5 text-xs"
              onClick={() => onToggleRead(contact)}
            >
              {contact.isRead ? (
                <>
                  <Mail className="h-3.5 w-3.5" />
                  Mark unread
                </>
              ) : (
                <>
                  <MailOpen className="h-3.5 w-3.5" />
                  Mark read
                </>
              )}
            </Button>
            <div className="ml-auto">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-8 gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => onSoftDelete(contact._id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </aside>
      </div>
      {/* Rendered as a sibling (NOT inside the backdrop div) so its Radix
          portal events don't bubble through React's tree into the drawer's
          onClick={onClose} handler and accidentally close the drawer. */}
      {contact && (
        <ContactReplyDialog
          contact={contact}
          open={replyOpen}
          onClose={() => setReplyOpen(false)}
        />
      )}
    </>
  );
}

