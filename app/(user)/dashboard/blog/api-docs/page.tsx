"use client";

import { useState } from "react";
import { Copy, Check, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useMyTenant, useRegenerateApiKey } from "@/hooks/api/use-tenant";
import { cn } from "@/lib/utils";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") ??
  "https://api.smitparekh.co.in";

function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div
      className={cn(
        "relative group rounded-lg bg-neutral-950 dark:bg-neutral-900 text-neutral-100 text-xs font-mono p-4 overflow-x-auto",
        className
      )}
    >
      <pre className="whitespace-pre-wrap break-all">{children}</pre>
      <button
        onClick={copy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded bg-white/10 hover:bg-white/20"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-400" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}

const METHOD_COLORS: Record<string, string> = {
  GET:    "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  POST:   "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  PUT:    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  PATCH:  "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
};

interface Endpoint {
  method: string;
  path: string;
  description: string;
  requestBody?: string;
  response: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET",
    path: "/api/v1/blogs",
    description: "List your published blogs. Add ?all=true to include drafts.",
    response: `{ "success": true, "count": 2, "data": [{ "_id": "…", "title": "…", "isPublished": true }] }`,
  },
  {
    method: "GET",
    path: "/api/v1/blogs/:id",
    description: "Get a single blog post by MongoDB ID.",
    response: `{ "success": true, "data": { "_id": "…", "title": "…", "content": "…" } }`,
  },
  {
    method: "POST",
    path: "/api/v1/blogs",
    description: "Create a new blog post (starts as draft).",
    requestBody: `{ "title": "My First Post", "excerpt": "Short summary (max 320 chars)", "content": "# Heading\\n\\nMarkdown content…", "category": "General", "tags": ["tag1"], "author": "Jane" }`,
    response: `{ "success": true, "data": { "_id": "…", "isPublished": false } }`,
  },
  {
    method: "PUT",
    path: "/api/v1/blogs/:id",
    description: "Update blog fields. Send only the fields you want to update.",
    requestBody: `{ "title": "Updated Title", "content": "New content…" }`,
    response: `{ "success": true, "data": { "_id": "…", "title": "Updated Title" } }`,
  },
  {
    method: "PATCH",
    path: "/api/v1/blogs/:id/publish",
    description: "Toggle published state. Publishes if draft, unpublishes if live.",
    response: `{ "success": true, "data": { "_id": "…", "isPublished": true } }`,
  },
  {
    method: "DELETE",
    path: "/api/v1/blogs/:id",
    description: "Soft-delete a blog post.",
    response: `{ "success": true, "message": "Blog deleted" }`,
  },
];

export default function ApiDocsPage() {
  const { data: tenant, isLoading } = useMyTenant();
  const regenerate = useRegenerateApiKey();

  const apiKey = tenant?.apiKey ?? "YOUR_API_KEY";

  function fetchExample(ep: Endpoint) {
    const hasBody = !!ep.requestBody;
    return `fetch("${API_BASE}${ep.path.replace(":id", "<blog-id>")}", {
  method: "${ep.method}",
  headers: {
    "X-API-Key": "${apiKey}",
    "Content-Type": "application/json",
  },${hasBody ? `\n  body: JSON.stringify(${ep.requestBody}),` : ""}
})
  .then(res => res.json())
  .then(console.log);`;
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="max-w-md text-center py-16">
        <p className="text-muted-foreground text-sm">
          Register as a tenant first to see your API docs.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-[22px] font-semibold tracking-tight">API docs</h1>
        <p className="text-[13px] text-muted-foreground">
          Programmatically create and update posts.
        </p>
      </div>

      {/* Header card */}
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Tag className="h-[18px] w-[18px]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[18px] font-semibold tracking-tight">Blog API</h2>
                <Badge variant="outline" className="font-mono">v1</Badge>
                <Badge className="gap-1 border-0 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Operational
                </Badge>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[12.5px] text-muted-foreground">
                <span>Base URL</span>
                <code className="rounded border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-foreground/80">
                  {API_BASE}
                </code>
                <span>·</span>
                <span>
                  Header <code className="font-mono text-foreground/80">X-API-Key</code>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your API Key</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock>{apiKey}</CodeBlock>
          <p className="text-xs text-muted-foreground">
            Pass this in every request as the{" "}
            <code className="bg-muted px-1 rounded text-xs">X-API-Key</code> header.
            Keep it secret — anyone with this key can manage your blogs.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (confirm("Regenerate? Your current key will stop working immediately.")) {
                regenerate.mutate();
              }
            }}
            disabled={regenerate.isPending}
          >
            {regenerate.isPending ? "Regenerating…" : "Regenerate key"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Base URL</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock>{API_BASE}</CodeBlock>
          <p className="text-xs text-muted-foreground mt-2">
            All endpoints are prefixed with{" "}
            <code className="bg-muted px-1 rounded text-xs">/api/v1/blogs</code>.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Endpoints</h3>
        {ENDPOINTS.map((ep) => (
          <Card key={`${ep.method}-${ep.path}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2.5">
                <Badge className={cn("font-mono text-xs border-0", METHOD_COLORS[ep.method])}>
                  {ep.method}
                </Badge>
                <code className="text-sm font-mono">{ep.path}</code>
              </div>
              <p className="text-sm text-muted-foreground">{ep.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {ep.requestBody && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Request Body
                  </p>
                  <CodeBlock>{ep.requestBody}</CodeBlock>
                </div>
              )}
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Response
                </p>
                <CodeBlock>{ep.response}</CodeBlock>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Example (fetch)
                </p>
                <CodeBlock>{fetchExample(ep)}</CodeBlock>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
