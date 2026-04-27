"use client";

import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Star,
  Loader2,
  Eye,
  EyeOff,
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
import { useBlogs, useDeleteBlog } from "@/hooks/use-blogs";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

export default function AdminBlogsPage() {
  const { data: blogs, isLoading, isError, refetch } = useBlogs();
  const deleteBlog = useDeleteBlog();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteBlog.mutateAsync(id);
      toast.success("Post deleted");
      setConfirmId(null);
    } catch {
      toast.error("Delete failed", "Could not delete post.");
    } finally {
      setDeletingId(null);
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
        <Link
          href="/admin/blogs/new"
          className={cn(
            buttonVariants({ size: "sm" }),
            "gap-2 self-start sm:self-auto"
          )}
        >
          <Plus className="h-4 w-4" />
          New post
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All posts</CardTitle>
          <CardDescription>
            {blogs ? `${blogs.length} total` : "—"}
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
            <Table>
              <TableHeader>
                <TableRow>
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
                  <TableRow key={blog._id}>
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
                      {blog.isPublished !== false ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-500">
                          <Eye className="h-3.5 w-3.5" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <EyeOff className="h-3.5 w-3.5" /> Draft
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {blog.isFeatured ? (
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
