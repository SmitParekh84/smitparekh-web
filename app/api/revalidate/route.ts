import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const ALLOWED_TAGS = new Set(["blogs", "projects"]);
const SECRET = process.env.REVALIDATE_SECRET ?? "";

export async function POST(request: Request) {
  // Require a shared secret so arbitrary callers can't spam cache busts.
  // Header: X-Revalidate-Secret: <value>  OR  body.secret: <value>
  const headerSecret = request.headers.get("x-revalidate-secret") ?? "";
  const body = await request.json().catch(() => ({}));
  const bodySecret = typeof body.secret === "string" ? body.secret : "";

  if (SECRET && headerSecret !== SECRET && bodySecret !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tag =
    typeof body.tag === "string" && ALLOWED_TAGS.has(body.tag)
      ? body.tag
      : "blogs";

  revalidateTag(tag, "default");
  return NextResponse.json({ revalidated: true, tag });
}
