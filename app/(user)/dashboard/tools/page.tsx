"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface UsageTool {
  slug: string;
  uses: number;
  quota: number;
  remaining: number;
  is_active: boolean;
}

interface UsageData {
  user: { email: string; name: string | null };
  today: { total: number; byTool: UsageTool[] };
  allTime: { total: number; byTool: { slug: string; uses: number }[] };
}

const TOOL_LABELS: Record<string, string> = {
  "ats-resume-checker": "ATS Resume Checker",
  "image-compressor": "Image Compressor",
  "qr-code-generator": "QR Code Generator",
  "word-counter": "Word Counter",
  "meta-tag-generator": "Meta Tag Generator",
  "password-generator": "Password Generator",
};

function toolLabel(slug: string) {
  return TOOL_LABELS[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function remainingBadge(remaining: number, quota: number) {
  if (quota === 0) return <Badge variant="secondary">—</Badge>;
  const pct = remaining / quota;
  if (pct > 0.5) return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{remaining} left</Badge>;
  if (pct > 0) return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">{remaining} left</Badge>;
  return <Badge variant="destructive">Exhausted</Badge>;
}

export default function DashboardToolsPage() {
  const [data, setData] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/me/usage")
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const todayTools = data?.today.byTool ?? [];
  const allTimeTools = data?.allTime.byTool ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">My Tools</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Your daily quota usage and all-time tool history.
        </p>
      </div>

      {/* Today's usage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Today&apos;s usage</CardTitle>
        </CardHeader>
        <CardContent>
          {todayTools.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">
              No tool uses today yet. {" "}
              <Link href="/free-tools" className="underline hover:text-foreground transition-colors">
                Try a free tool
              </Link>
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wide">
                    <th className="pb-2 text-left font-medium">Tool</th>
                    <th className="pb-2 text-right font-medium">Used</th>
                    <th className="pb-2 text-right font-medium hidden sm:table-cell">Quota</th>
                    <th className="pb-2 text-right font-medium">Status</th>
                    <th className="pb-2 text-right font-medium hidden md:table-cell w-28">Progress</th>
                    <th className="pb-2 w-8" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {todayTools.map((tool) => {
                    const pct = tool.quota > 0 ? Math.min(100, (tool.uses / tool.quota) * 100) : 0;
                    return (
                      <tr key={tool.slug} className="group hover:bg-muted/40 transition-colors">
                        <td className="py-3 pr-4 font-medium">{toolLabel(tool.slug)}</td>
                        <td className="py-3 text-right tabular-nums">{tool.uses}</td>
                        <td className="py-3 text-right tabular-nums hidden sm:table-cell text-muted-foreground">
                          {tool.quota}
                        </td>
                        <td className="py-3 text-right">{remainingBadge(tool.remaining, tool.quota)}</td>
                        <td className="py-3 pl-4 hidden md:table-cell">
                          <Progress value={pct} className="h-1.5" />
                        </td>
                        <td className="py-3 pl-3">
                          <Link
                            href={`/free-tools/${tool.slug}`}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label={`Open ${toolLabel(tool.slug)}`}
                          >
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* All-time history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">All-time history</CardTitle>
        </CardHeader>
        <CardContent>
          {allTimeTools.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">
              No usage history yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wide">
                    <th className="pb-2 text-left font-medium">Tool</th>
                    <th className="pb-2 text-right font-medium">Total uses</th>
                    <th className="pb-2 w-8" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {allTimeTools.map((tool) => (
                    <tr key={tool.slug} className="group hover:bg-muted/40 transition-colors">
                      <td className="py-3 pr-4 font-medium">{toolLabel(tool.slug)}</td>
                      <td className="py-3 text-right tabular-nums font-mono text-muted-foreground">
                        {tool.uses}
                      </td>
                      <td className="py-3 pl-3">
                        <Link
                          href={`/free-tools/${tool.slug}`}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`Open ${toolLabel(tool.slug)}`}
                        >
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
