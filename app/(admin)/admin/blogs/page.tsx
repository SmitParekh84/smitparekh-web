"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Star,
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  useBlogs,
  useDeleteBlog,
  useUpdateBlog,
  useGenerateBlog,
  useDeletedBlogs,
  useRestoreBlog,
  usePermanentDeleteBlog,
} from "@/hooks/use-blogs";
import { TrashTable } from "@/components/admin/TrashTable";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

export default function AdminBlogsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"active" | "trash">("active");
  const { data: blogs, isLoading, isError, refetch } = useBlogs();
  const {
    data: deletedBlogs,
    isLoading: isLoadingTrash,
    isError: isErrorTrash,
    refetch: refetchTrash,
  } = useDeletedBlogs();
  const deleteBlog = useDeleteBlog();
  const restoreBlog = useRestoreBlog();
  const permanentDeleteBlog = usePermanentDeleteBlog();
  const updateBlog = useUpdateBlog();
  const generateBlog = useGenerateBlog();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);

  const visibleIds = (blogs ?? []).map((b) => b._id);
  const allChecked =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const someChecked =
    !allChecked && visibleIds.some((id) => selectedIds.has(id));

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    setSelectedIds((prev) => {
      if (visibleIds.every((id) => prev.has(id))) return new Set();
      return new Set(visibleIds);
    });
  }
  function clearSelection() {
    setSelectedIds(new Set());
  }

  async function handleBulkUpdate(
    field: "isPublished" | "isFeatured",
    value: boolean
  ) {
    const ids = Array.from(selectedIds);
    if (!ids.length) return;
    setBulkBusy(true);
    try {
      await Promise.all(
        ids.map((id) =>
          updateBlog.mutateAsync({ id, data: { [field]: value } })
        )
      );
      toast.success(
        `Updated ${ids.length} ${ids.length === 1 ? "post" : "posts"}`
      );
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
      await deleteBlog.mutateAsync(id);
      toast.success("Moved to trash", {
        action: {
          label: "Undo",
          onClick: () => {
            restoreBlog.mutate(id, {
              onSuccess: () => toast.success("Post restored"),
              onError: () =>
                toast.error("Restore failed", "Could not restore post."),
            });
          },
        },
      });
      setConfirmId(null);
    } catch {
      toast.error("Delete failed", "Could not delete post.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleToggle(
    id: string,
    field: "isPublished" | "isFeatured",
    next: boolean
  ) {
    setTogglingId(id + ":" + field);
    try {
      await updateBlog.mutateAsync({ id, data: { [field]: next } });
    } catch {
      toast.error("Update failed", "Could not update post.");
    } finally {
      setTogglingId(null);
    }
  }

  async function handleAiGenerate() {
    const prompt = aiPrompt.trim();
    if (!prompt) {
      toast.error("Enter a topic", "Type a title or short prompt for the AI.");
      return;
    }
    try {
      const res = await generateBlog.mutateAsync(prompt);
      sessionStorage.setItem("blog-ai-draft", JSON.stringify(res.data));
      toast.success("Draft generated", "Review and edit before saving.");
      setAiOpen(false);
      setAiPrompt("");
      router.push("/admin/blogs/new?ai=1");
    } catch (err) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Try again in a moment.";
      toast.error("AI generation failed", msg);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Blog</h2>
          <p className="text-sm text-muted-foreground">
            Manage articles, drafts and featured posts.
          </p>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setAiOpen(true)}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4 text-blue-500" />
            Generate with AI
          </Button>
          <Link
            href="/admin/blogs/new"
            className={cn(buttonVariants({ size: "sm" }), "gap-2")}
          >
            <Plus className="h-4 w-4" />
            New post
          </Link>
        </div>
      </div>

      {aiOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => !generateBlog.isPending && setAiOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-2 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold">Generate blog draft</h3>
                <p className="text-xs text-muted-foreground">
                  Describe the topic. The AI fills the new post - you review &
                  edit before saving.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAiOpen(false)}
                disabled={generateBlog.isPending}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <textarea
              autoFocus
              rows={4}
              maxLength={4000}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={generateBlog.isPending}
              placeholder="e.g. How I use ISR in Next.js 16 to ship a fast blog with editor previews"
              className="w-full resize-y rounded-xl border border-border bg-background px-3 py-2 text-sm transition-colors focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">
              {aiPrompt.length}/4000
            </p>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAiOpen(false)}
                disabled={generateBlog.isPending}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleAiGenerate}
                disabled={generateBlog.isPending || !aiPrompt.trim()}
                className="gap-1.5"
              >
                {generateBlog.isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-1 border-b border-border">
        <button
          type="button"
          onClick={() => setTab("active")}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors",
            tab === "active"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Active
          {tab === "active" && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-500" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setTab("trash")}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors",
            tab === "trash"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Trash
          {deletedBlogs && deletedBlogs.length > 0 && (
            <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-muted px-1 text-[10px] font-semibold text-muted-foreground">
              {deletedBlogs.length}
            </span>
          )}
          {tab === "trash" && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-blue-500" />
          )}
        </button>
      </div>

      {tab === "trash" ? (
        <Card>
          <CardHeader>
            <CardTitle>Trash</CardTitle>
            <CardDescription>
              Soft-deleted posts. Restore or permanently delete.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <TrashTable
              data={deletedBlogs?.map((b) => ({
                _id: b._id,
                title: b.title,
                imageUrl: b.coverImage,
                subtitle: b.excerpt,
                deletedAt: b.deletedAt,
              }))}
              isLoading={isLoadingTrash}
              isError={isErrorTrash}
              onRefetch={() => refetchTrash()}
              onRestore={(id) => restoreBlog.mutateAsync(id)}
              onPermanentDelete={(id) =>
                permanentDeleteBlog.mutateAsync(id)
              }
              noun="post"
            />
          </CardContent>
        </Card>
      ) : (
      <Card>
        <CardHeader>
          <CardTitle>All posts</CardTitle>
          <CardDescription>
            {blogs ? `${blogs.length} total` : "-"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {isError && (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Could not load posts. Is the backend running?
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !isError && blogs && blogs.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                No blog posts yet.
              </p>
              <Link
                href="/admin/blogs/new"
                className={cn(buttonVariants({ size: "sm" }), "gap-2")}
              >
                <Plus className="h-4 w-4" />
                Write your first post
              </Link>
            </div>
          )}

          {!isLoading && !isError && blogs && blogs.length > 0 && (
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
                      onClick={() => handleBulkUpdate("isPublished", true)}
                    >
                      <Eye className="h-3.5 w-3.5" /> Publish
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-xs"
                      disabled={bulkBusy}
                      onClick={() => handleBulkUpdate("isPublished", false)}
                    >
                      <EyeOff className="h-3.5 w-3.5" /> Unpublish
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-xs"
                      disabled={bulkBusy}
                      onClick={() => handleBulkUpdate("isFeatured", true)}
                    >
                      <Star className="h-3.5 w-3.5" /> Feature
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-xs"
                      disabled={bulkBusy}
                      onClick={() => handleBulkUpdate("isFeatured", false)}
                    >
                      <Star className="h-3.5 w-3.5 opacity-40" /> Unfeature
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
                  <TableHead className="hidden lg:table-cell">Featured</TableHead>
                  <TableHead className="hidden lg:table-cell">Published</TableHead>
                  <TableHead className="w-[1%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
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
                        {blog.coverImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={blog.coverImage}
                            alt=""
                            className="h-9 w-14 shrink-0 rounded-md border border-border object-cover"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-medium">{blog.title}</p>
                          <p className="line-clamp-1 max-w-[260px] text-xs text-muted-foreground">
                            {blog.excerpt}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary" className="px-2 py-0 text-xs">
                        {blog.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <button
                        type="button"
                        title={blog.isPublished !== false ? "Click to unpublish" : "Click to publish"}
                        disabled={togglingId === blog._id + ":isPublished"}
                        onClick={() =>
                          handleToggle(
                            blog._id,
                            "isPublished",
                            blog.isPublished === false
                          )
                        }
                        className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs transition-colors hover:bg-muted disabled:opacity-50"
                      >
                        {togglingId === blog._id + ":isPublished" ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : blog.isPublished !== false ? (
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
                    <TableCell className="hidden lg:table-cell">
                      <button
                        type="button"
                        title={blog.isFeatured ? "Click to unfeature" : "Click to feature"}
                        disabled={togglingId === blog._id + ":isFeatured"}
                        onClick={() =>
                          handleToggle(blog._id, "isFeatured", !blog.isFeatured)
                        }
                        className="rounded-md p-1 transition-colors hover:bg-muted disabled:opacity-50"
                      >
                        {togglingId === blog._id + ":isFeatured" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : blog.isFeatured ? (
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ) : (
                          <Star className="h-4 w-4 text-muted-foreground/40" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                      {new Date(blog.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        {blog.slug && blog.isPublished && (
                          <a
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              buttonVariants({ variant: "ghost", size: "icon" }),
                              "h-7 w-7"
                            )}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <Link
                          href={`/admin/blogs/${blog._id}/edit`}
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
      )}
    </div>
  );
}
