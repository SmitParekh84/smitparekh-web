"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyBlogs, useUpdateMyBlog } from "@/hooks/api/use-tenant";
import type { TenantBlog } from "@/lib/api/tenant";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: blogs, isLoading } = useMyBlogs();
  const updateBlog = useUpdateMyBlog();

  const blog = (blogs ?? []).find((b: TenantBlog) => b._id === id);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    coverImage: "",
  });

  useEffect(() => {
    if (blog) {
      setForm({
        title: blog.title ?? "",
        excerpt: blog.excerpt ?? "",
        content: blog.content ?? "",
        category: blog.category ?? "",
        coverImage: blog.coverImage ?? "",
      });
    }
  }, [blog]);

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-2xl">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!blog) {
    return <p className="text-muted-foreground text-sm">Blog not found.</p>;
  }

  function handleChange(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSave() {
    await updateBlog.mutateAsync({ id, data: form });
    router.push("/dashboard/blog");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Post</h2>
        <p className="text-muted-foreground text-sm mt-0.5">{blog.title}</p>
      </div>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Title</label>
            <Input value={form.title} onChange={handleChange("title")} placeholder="Post title" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Excerpt</label>
            <Textarea
              value={form.excerpt}
              onChange={handleChange("excerpt")}
              placeholder="Short description (max 320 chars)"
              rows={2}
              maxLength={320}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Content (Markdown)</label>
            <Textarea
              value={form.content}
              onChange={handleChange("content")}
              placeholder="Write your post in Markdown…"
              rows={12}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Category</label>
              <Input
                value={form.category}
                onChange={handleChange("category")}
                placeholder="General"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Cover Image URL</label>
              <Input
                value={form.coverImage}
                onChange={handleChange("coverImage")}
                placeholder="https://…"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} disabled={updateBlog.isPending}>
              {updateBlog.isPending ? "Saving…" : "Save changes"}
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard/blog")}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
