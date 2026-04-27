"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { BlogForm } from "@/components/admin/BlogForm";
import { useBlog, useUpdateBlog } from "@/hooks/use-blogs";
import { toast } from "@/lib/toast";
import type { BackendBlogInput } from "@/types";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: blog, isLoading, isError } = useBlog(id);
  const updateBlog = useUpdateBlog();

  async function handleSubmit(data: BackendBlogInput) {
    try {
      await updateBlog.mutateAsync({ id, data });
      toast.success("Post updated!");
      router.push("/admin/blogs");
    } catch {
      toast.error("Failed to update post", "Please try again.");
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p className="text-sm mb-4">Could not load post.</p>
        <Link
          href="/admin/blogs"
          className="text-sm text-blue-500 hover:text-blue-400"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/blogs"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Blog
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Edit post</h1>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">
          {blog.title}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 lg:p-9">
        <BlogForm
          initialData={blog}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          isPending={updateBlog.isPending}
        />
      </div>
    </div>
  );
}
