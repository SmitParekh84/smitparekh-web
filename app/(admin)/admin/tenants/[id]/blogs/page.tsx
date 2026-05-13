"use client";

import { use } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Pencil,
  Eye,
  EyeOff,
  ImageIcon,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminTenantBlogs } from "@/hooks/api/use-admin-tenants";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date";

export default function AdminTenantBlogsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: tenantId } = use(params);
  const { data, isLoading, isError, refetch } = useAdminTenantBlogs(tenantId);

  const tenant = data?.tenant;
  const blogs = data?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/tenants"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Tenants
        </Link>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {tenant ? `${tenant.name} — Blogs` : "Tenant Blogs"}
            </h2>
            {tenant && (
              <p className="text-sm text-muted-foreground">
                {tenant.email} ·{" "}
                <span
                  className={cn(
                    "capitalize font-medium",
                    tenant.status === "approved"
                      ? "text-green-600 dark:text-green-400"
                      : tenant.status === "pending"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-muted-foreground"
                  )}
                >
                  {tenant.status}
                </span>
              </p>
            )}
          </div>
          {!isLoading && !isError && (
            <p className="text-sm text-muted-foreground self-start sm:self-auto">
              {blogs.length} post{blogs.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-border px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Could not load blogs. Is the backend running?
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      )}

      {!isLoading && !isError && blogs.length === 0 && (
        <div className="rounded-xl border border-dashed border-border px-6 py-20 text-center">
          <p className="text-sm text-muted-foreground">
            No blogs yet for this tenant.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Run a migration from the Tenants page to assign existing blogs, or
            the tenant can create new ones via the API.
          </p>
        </div>
      )}

      {!isLoading && !isError && blogs.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
            >
              {/* Cover image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                {blog.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}

                {/* Status pill */}
                <div className="absolute left-2 top-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      blog.isPublished
                        ? "bg-green-500/90 text-white"
                        : "bg-black/60 text-white"
                    )}
                  >
                    {blog.isPublished ? (
                      <Eye className="h-2.5 w-2.5" />
                    ) : (
                      <EyeOff className="h-2.5 w-2.5" />
                    )}
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                </div>

                {/* No image warning */}
                {!blog.coverImage && (
                  <div className="absolute right-2 top-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-semibold text-white">
                      <ImageIcon className="h-2.5 w-2.5" />
                      No image
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-2 text-sm font-medium leading-snug">
                    {blog.title}
                  </p>
                </div>

                {blog.excerpt && (
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {blog.excerpt}
                  </p>
                )}

                <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                  <div className="flex items-center gap-1.5">
                    {blog.category && (
                      <Badge
                        variant="secondary"
                        className="px-1.5 py-0 text-[10px]"
                      >
                        {blog.category}
                      </Badge>
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      {formatDate(blog.publishedAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {blog.slug && blog.isPublished && (
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "icon" }),
                          "h-7 w-7"
                        )}
                        title="View live post"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <Link
                      href={`/admin/blogs/${blog._id}/edit`}
                      className={cn(
                        buttonVariants({ variant: "default", size: "sm" }),
                        "h-7 gap-1.5 px-2.5 text-xs"
                      )}
                      title="Edit this blog (includes image upload)"
                    >
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
