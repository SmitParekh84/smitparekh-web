import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const ALLOWED_TAGS = new Set(["blogs", "projects"]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const tag = typeof body.tag === "string" && ALLOWED_TAGS.has(body.tag) ? body.tag : "blogs";
  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, tag });
}
