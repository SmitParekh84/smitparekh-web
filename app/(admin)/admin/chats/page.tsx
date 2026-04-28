"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  MessagesSquare,
  Search,
  Sparkles,
  Bot,
  User as UserIcon,
  ShieldAlert,
  Zap,
  Cloud,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChatSessions, useChatSession } from "@/hooks/api/use-chat";

function formatRelative(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString();
}

function SourceBadge({ source }: { source: string | null | undefined }) {
  if (!source || source === "user") return null;
  if (source === "canned")
    return (
      <Badge variant="secondary" className="gap-1 text-[10px]">
        <Zap className="h-2.5 w-2.5" /> canned
      </Badge>
    );
  if (source === "banned")
    return (
      <Badge variant="destructive" className="gap-1 text-[10px]">
        <ShieldAlert className="h-2.5 w-2.5" /> banned
      </Badge>
    );
  if (source === "gemini")
    return (
      <Badge variant="outline" className="gap-1 text-[10px]">
        <Cloud className="h-2.5 w-2.5" /> gemini
      </Badge>
    );
  return (
    <Badge variant="outline" className="text-[10px]">
      {source}
    </Badge>
  );
}

export default function AdminChatsPage() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  const list = useChatSessions({ page, limit: 20, search: debounced || undefined });
  const detail = useChatSession(selected);

  const sessions = list.data?.sessions ?? [];
  const totalPages = list.data?.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Chats</h2>
          <p className="text-sm text-muted-foreground">
            Conversations from the site assistant. Canned and banned replies are
            answered instantly without calling Gemini.
          </p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search session id or message…"
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">All sessions</CardTitle>
            <CardDescription>
              {list.data ? `${list.data.total} total` : "—"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {list.isLoading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            )}
            {list.isError && (
              <div className="py-12 text-center text-sm text-muted-foreground">
                Failed to load sessions.{" "}
                <button
                  className="underline"
                  onClick={() => list.refetch()}
                  type="button"
                >
                  Retry
                </button>
              </div>
            )}
            {!list.isLoading && sessions.length === 0 && (
              <div className="flex flex-col items-center gap-2 py-16 text-center">
                <MessagesSquare className="h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">No conversations yet.</p>
              </div>
            )}
            {sessions.map((s) => {
              const isActive = s.sessionId === selected;
              return (
                <button
                  key={s.sessionId}
                  type="button"
                  onClick={() => setSelected(s.sessionId)}
                  className={cn(
                    "block w-full rounded-lg border p-3 text-left transition-colors",
                    isActive
                      ? "border-blue-500/60 bg-blue-500/5"
                      : "border-border hover:border-border/80 hover:bg-muted/40",
                  )}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <code className="truncate text-[11px] text-muted-foreground">
                      {s.sessionId}
                    </code>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {formatRelative(s.lastMessageAt)}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-foreground/90">
                    {s.preview || (
                      <span className="text-muted-foreground italic">No preview</span>
                    )}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <Badge variant="secondary" className="text-[10px]">
                      {s.messageCount} msgs
                    </Badge>
                    {s.firstPagePath && (
                      <Badge variant="outline" className="max-w-[160px] truncate text-[10px]">
                        {s.firstPagePath}
                      </Badge>
                    )}
                    <SourceBadge source={s.lastReplySource} />
                  </div>
                </button>
              );
            })}

            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <span className="text-xs text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detail */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base">Transcript</CardTitle>
                <CardDescription>
                  {selected ? (
                    <code className="text-[11px]">{selected}</code>
                  ) : (
                    "Pick a session on the left"
                  )}
                </CardDescription>
              </div>
              {selected && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelected(null)}
                  aria-label="Close transcript"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!selected && (
              <div className="flex flex-col items-center gap-2 py-20 text-center">
                <Sparkles className="h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  Select a conversation to view the full transcript.
                </p>
              </div>
            )}
            {selected && detail.isLoading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            )}
            {selected && detail.isError && (
              <div className="py-12 text-center text-sm text-muted-foreground">
                Failed to load transcript.
              </div>
            )}
            {selected && detail.data && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">First page</p>
                    <p className="font-medium">{detail.data.firstPagePath || "—"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last page</p>
                    <p className="font-medium">{detail.data.lastPagePath || "—"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Started</p>
                    <p className="font-medium">
                      {new Date(detail.data.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last activity</p>
                    <p className="font-medium">
                      {formatRelative(detail.data.lastMessageAt)}
                    </p>
                  </div>
                  {detail.data.userAgent && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">User agent</p>
                      <p className="truncate font-mono text-[10px]">
                        {detail.data.userAgent}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {detail.data.messages.map((m, i) => {
                    const isUser = m.role === "user";
                    return (
                      <div
                        key={i}
                        className={cn("flex items-start gap-2", isUser && "justify-end")}
                      >
                        {!isUser && (
                          <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-500">
                            <Bot className="h-3.5 w-3.5" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
                            isUser
                              ? "rounded-tr-sm bg-blue-500 text-white"
                              : "rounded-tl-sm border border-border bg-card text-foreground/90",
                          )}
                        >
                          {!isUser && (
                            <div className="mb-1 flex items-center gap-1.5">
                              <SourceBadge source={m.source} />
                              {m.cannedId && (
                                <code className="text-[10px] text-muted-foreground">
                                  {m.cannedId}
                                </code>
                              )}
                              <span className="text-[10px] text-muted-foreground">
                                {new Date(m.createdAt).toLocaleTimeString()}
                              </span>
                            </div>
                          )}
                          {isUser ? (
                            <span className="whitespace-pre-wrap">{m.content}</span>
                          ) : (
                            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1.5 prose-a:text-blue-500">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {m.content}
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>
                        {isUser && (
                          <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            <UserIcon className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
