"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { TenantBlogForm } from "@/components/dashboard/TenantBlogForm";
import { useCreateMyBlog } from "@/hooks/api/use-tenant";
import { toast } from "@/lib/toast";
import type { TenantBlog } from "@/lib/api/tenant";

export default function NewBlogPage() {
  const router = useRouter();
  const createBlog = useCreateMyBlog();

  async function handleSubmit(data: Partial<TenantBlog>) {
    try {
      await createBlog.mutateAsync(data);
      toast.success("Post created!");
      router.push("/dashboard/blog");
    } catch {
      // error toast handled by hook
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/blog"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Blog
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">New post</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Write and publish a new article on your blog.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 lg:p-8">
        <TenantBlogForm
          onSubmit={handleSubmit}
          submitLabel="Create Post"
          isPending={createBlog.isPending}
        />
      </div>
    </div>
  );
}
