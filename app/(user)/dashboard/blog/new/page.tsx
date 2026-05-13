"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateMyBlog } from "@/hooks/api/use-tenant";
import { TenantCoverImagePicker } from "@/components/dashboard/TenantCoverImagePicker";

export default function NewBlogPage() {
  const router = useRouter();
  const createBlog = useCreateMyBlog();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    coverImage: "",
  });

  function handleChange(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleCreate() {
    if (!form.title.trim()) return;
    await createBlog.mutateAsync(form);
    router.push("/dashboard/blog");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">New Post</h2>
        <p className="text-muted-foreground text-sm mt-0.5">
          Fill in the details and save as a draft.
        </p>
      </div>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={form.title}
              onChange={handleChange("title")}
              placeholder="Post title"
              autoFocus
            />
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
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Category</label>
            <Input
              value={form.category}
              onChange={handleChange("category")}
              placeholder="General"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Cover Image</label>
            <TenantCoverImagePicker
              value={form.coverImage}
              onChange={(url) => setForm((f) => ({ ...f, coverImage: url }))}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleCreate}
              disabled={createBlog.isPending || !form.title.trim()}
            >
              {createBlog.isPending ? "Creating…" : "Create post"}
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
