"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { BlogForm } from "@/components/admin/BlogForm";
import { useCreateBlog } from "@/hooks/use-blogs";
import { toast } from "@/lib/toast";
import type { BackendBlogInput } from "@/types";

export default function NewBlogPage() {
  const router = useRouter();
  const createBlog = useCreateBlog();

  async function handleSubmit(data: BackendBlogInput) {
    try {
      await createBlog.mutateAsync(data);
      toast.success("Post created!");
      router.push("/admin/blogs");
    } catch {
      toast.error("Failed to create post", "Please try again.");
    }
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
        <h1 className="text-2xl font-semibold tracking-tight">New post</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Write and publish a new article.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 lg:p-9">
        <BlogForm
          onSubmit={handleSubmit}
          submitLabel="Create Post"
          isPending={createBlog.isPending}
        />
      </div>
    </div>
  );
}
