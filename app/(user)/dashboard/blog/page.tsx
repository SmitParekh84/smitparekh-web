"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useMyTenant,
  useMyBlogs,
  useDeleteMyBlog,
  usePublishMyBlog,
} from "@/hooks/api/use-tenant";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date";
import type { TenantBlog } from "@/lib/api/tenant";

export default function TenantBlogListPage() {
  const router = useRouter();
  const { data: tenant, isLoading: tenantLoading } = useMyTenant();
  const { data: blogs, isLoading: blogsLoading, isError, refetch } = useMyBlogs();
  const deleteMyBlog = useDeleteMyBlog();
  const publishMyBlog = usePublishMyBlog();

  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);

  useEffect(() => {
    if (!tenantLoading && (!tenant || tenant.status !== "approved")) {
      router.replace("/dashboard/blog/onboarding");
    }
  }, [tenant, tenantLoading, router]);

  if (tenantLoading || !tenant || tenant.status !== "approved") {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  const allBlogs: TenantBlog[] = blogs ?? [];
  const visibleIds = allBlogs.map((b) => b._id);
  const allChecked = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const someChecked = !allChecked && visibleIds.some((id) => selectedIds.has(id));

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    setSelectedIds((prev) =>
      visibleIds.every((id) => prev.has(id)) ? new Set() : new Set(visibleIds)
    );
  }
  function clearSelection() {
    setSelectedIds(new Set());
  }

  async function handleTogglePublish(blog: TenantBlog) {
    setTogglingId(blog._id);
    try {
      await publishMyBlog.mutateAsync(blog._id);
    } catch {
      toast.error("Update failed", "Could not update post.");
    } finally {
      setTogglingId(null);
    }
  }

  async function handleBulkPublish(targetState: boolean) {
    const ids = Array.from(selectedIds);
    const toToggle = allBlogs.filter(
      (b) => ids.includes(b._id) && b.isPublished !== targetState
    );
    if (!toToggle.length) {
      toast.success(`Already ${targetState ? "published" : "unpublished"}`);
      clearSelection();
      return;
    }
    setBulkBusy(true);
    try {
      await Promise.all(toToggle.map((b) => publishMyBlog.mutateAsync(b._id)));
      toast.success(`Updated ${toToggle.length} ${toToggle.length === 1 ? "post" : "posts"}`);
      clearSelection();
    } catch {
      toast.error("Bulk update failed", "Some posts may not have updated.");
    } finally {
      setBulkBusy(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteMyBlog.mutateAsync(id);
      setConfirmId(null);
    } catch {
      toast.error("Delete failed", "Could not delete post.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">My Blogs</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage your blog posts via dashboard or API.
          </p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
        >
          <Plus className="h-4 w-4" />
          New post
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All posts</CardTitle>
          <CardDescription>
            {blogs ? `${allBlogs.length} post${allBlogs.length !== 1 ? "s" : ""}` : "—"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {blogsLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {isError && (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Could not load posts. Please try again.
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}

          {!blogsLoading && !isError && allBlogs.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-muted-foreground mb-4">No blog posts yet.</p>
              <Link
                href="/dashboard/blog/new"
                className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
              >
                <Plus className="h-4 w-4" />
                Write your first post
              </Link>
            </div>
          )}

          {!blogsLoading && !isError && allBlogs.length > 0 && (
            <>
              {selectedIds.size > 0 && (
                <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-4 py-2">
                  <span className="text-xs font-medium">
                    {selectedIds.size} selected
                  </span>
                  <span className="ml-1 hidden text-xs text-muted-foreground sm:inline">
                    Apply to all:
                  </span>
                  <div className="ml-auto flex flex-wrap items-center gap-1.5">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-xs"
                      disabled={bulkBusy}
                      onClick={() => handleBulkPublish(true)}
                    >
                      <Eye className="h-3.5 w-3.5" /> Publish
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-xs"
                      disabled={bulkBusy}
                      onClick={() => handleBulkPublish(false)}
                    >
                      <EyeOff className="h-3.5 w-3.5" /> Unpublish
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-7 gap-1 text-xs"
                      disabled={bulkBusy}
                      onClick={clearSelection}
                    >
                      {bulkBusy ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <X className="h-3.5 w-3.5" />
                      )}
                      Clear
                    </Button>
                  </div>
                </div>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[1%] pr-0">
                      <input
                        type="checkbox"
                        aria-label="Select all"
                        checked={allChecked}
                        ref={(el) => {
                          if (el) el.indeterminate = someChecked;
                        }}
                        onChange={toggleAll}
                        className="h-4 w-4 cursor-pointer rounded border-border accent-blue-500"
                      />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden sm:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Published</TableHead>
                    <TableHead className="w-[1%] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allBlogs.map((blog) => (
                    <TableRow
                      key={blog._id}
                      data-state={selectedIds.has(blog._id) ? "selected" : undefined}
                    >
                      <TableCell className="pr-0">
                        <input
                          type="checkbox"
                          aria-label={`Select ${blog.title}`}
                          checked={selectedIds.has(blog._id)}
                          onChange={() => toggleOne(blog._id)}
                          className="h-4 w-4 cursor-pointer rounded border-border accent-blue-500"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {blog.coverImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={blog.coverImage}
                              alt=""
                              className="h-9 w-14 shrink-0 rounded-md border border-border object-cover"
                            />
                          ) : (
                            <div className="h-9 w-14 shrink-0 rounded-md border border-dashed border-border bg-muted" />
                          )}
                          <div className="min-w-0">
                            <p className="truncate font-medium text-sm">{blog.title}</p>
                            <p className="line-clamp-1 max-w-[260px] text-xs text-muted-foreground">
                              {blog.excerpt}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {blog.category && (
                          <Badge variant="secondary" className="px-2 py-0 text-xs">
                            {blog.category}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <button
                          type="button"
                          title={blog.isPublished ? "Click to unpublish" : "Click to publish"}
                          disabled={togglingId === blog._id}
                          onClick={() => handleTogglePublish(blog)}
                          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs transition-colors hover:bg-muted disabled:opacity-50"
                        >
                          {togglingId === blog._id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : blog.isPublished ? (
                            <span className="inline-flex items-center gap-1 text-green-500">
                              <Eye className="h-3.5 w-3.5" /> Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-muted-foreground">
                              <EyeOff className="h-3.5 w-3.5" /> Draft
                            </span>
                          )}
                        </button>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                        {formatDate(blog.publishedAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/dashboard/blog/${blog._id}/edit`}
                            className={cn(
                              buttonVariants({ variant: "ghost", size: "icon" }),
                              "h-7 w-7"
                            )}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>
                          {confirmId === blog._id ? (
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="destructive"
                                className="h-7 px-2 text-xs"
                                disabled={deletingId === blog._id}
                                onClick={() => handleDelete(blog._id)}
                              >
                                {deletingId === blog._id ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  "Confirm"
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs"
                                onClick={() => setConfirmId(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-destructive"
                              onClick={() => setConfirmId(blog._id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
