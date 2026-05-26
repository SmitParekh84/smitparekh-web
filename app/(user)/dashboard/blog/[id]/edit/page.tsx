"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TenantBlogForm } from "@/components/dashboard/TenantBlogForm";
import { useMyBlogs, useUpdateMyBlog } from "@/hooks/api/use-tenant";
import { toast } from "@/lib/toast";
import type { TenantBlog } from "@/lib/api/tenant";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: blogs, isLoading } = useMyBlogs();
  const updateBlog = useUpdateMyBlog();

  const blog = (blogs ?? []).find((b: TenantBlog) => b._id === id);

  async function handleSubmit(data: Partial<TenantBlog>) {
    try {
      await updateBlog.mutateAsync({ id, data });
      toast.success("Post updated");
      router.push("/dashboard/blog");
    } catch {
      // error toast handled by hook
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!blog) {
    return <p className="text-muted-foreground text-sm">Post not found.</p>;
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
        <h1 className="text-2xl font-semibold tracking-tight">Edit post</h1>
        <p className="mt-0.5 text-sm text-muted-foreground truncate">{blog.title}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 lg:p-8">
        <TenantBlogForm
          initialData={blog}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
          isPending={updateBlog.isPending}
        />
      </div>
    </div>
  );
}
