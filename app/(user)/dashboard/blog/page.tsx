"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useMyTenant, useMyBlogs, useDeleteMyBlog, usePublishMyBlog } from "@/hooks/api/use-tenant";
import { cn } from "@/lib/utils";
import type { TenantBlog } from "@/lib/api/tenant";

function BlogRow({ blog, onDelete, onTogglePublish }: {
  blog: TenantBlog;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-border/50 last:border-0">
      <div className="min-w-0 space-y-1">
        <p className="font-medium text-sm truncate">{blog.title}</p>
        <p className="text-xs text-muted-foreground truncate">{blog.excerpt}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge
            variant="secondary"
            className={cn(
              "text-xs",
              blog.isPublished
                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                : "bg-muted text-muted-foreground"
            )}
          >
            {blog.isPublished ? "Published" : "Draft"}
          </Badge>
          {blog.category && (
            <span className="text-xs text-muted-foreground">{blog.category}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onTogglePublish(blog._id)}
          className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          title={blog.isPublished ? "Unpublish" : "Publish"}
        >
          {blog.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
        <Link
          href={`/dashboard/blog/${blog._id}/edit`}
          className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
        >
          <Pencil className="h-4 w-4" />
        </Link>
        <button
          onClick={() => {
            if (confirm("Delete this blog post?")) onDelete(blog._id);
          }}
          className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function TenantBlogListPage() {
  const router = useRouter();
  const { data: tenant, isLoading: tenantLoading } = useMyTenant();
  const { data: blogs, isLoading: blogsLoading } = useMyBlogs();
  const deleteMyBlog = useDeleteMyBlog();
  const publishMyBlog = usePublishMyBlog();

  useEffect(() => {
    if (!tenantLoading && (!tenant || tenant.status !== "approved")) {
      router.replace("/dashboard/blog/onboarding");
    }
  }, [tenant, tenantLoading, router]);

  if (tenantLoading || !tenant || tenant.status !== "approved") {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Blogs</h2>
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
        <CardContent className="p-0 px-6">
          {blogsLoading ? (
            <div className="space-y-4 py-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (blogs ?? []).length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-muted-foreground text-sm">No blog posts yet.</p>
              <Link
                href="/dashboard/blog/new"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
              >
                <Plus className="h-4 w-4" /> Write your first post
              </Link>
            </div>
          ) : (
            (blogs ?? []).map((blog) => (
              <BlogRow
                key={blog._id}
                blog={blog}
                onDelete={(id) => deleteMyBlog.mutate(id)}
                onTogglePublish={(id) => publishMyBlog.mutate(id)}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
