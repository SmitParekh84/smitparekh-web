"use client";

import { FileText, MousePointerClick, Eye, Download, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useResumeEventStats } from "@/hooks/api/use-resume-events";

interface StatProps {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
}

function StatCard({ label, value, icon: Icon }: StatProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <Icon className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value.toLocaleString()}</div>
      </CardContent>
    </Card>
  );
}

export default function AdminResumePage() {
  const { data, isLoading, isError, refetch } = useResumeEventStats(30);

  const totals = data?.totals ?? { button_click: 0, view: 0, download: 0 };
  const daily = data?.daily ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="h-6 w-6 text-blue-500" />
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Resume analytics</h2>
          <p className="text-sm text-muted-foreground">
            Tracking button clicks, page views, and downloads over the last 30 days.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="mb-3 text-sm text-muted-foreground">
              Could not load resume analytics. Is the backend running?
            </p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="Button clicks"
              value={totals.button_click}
              icon={MousePointerClick}
            />
            <StatCard label="Page views" value={totals.view} icon={Eye} />
            <StatCard label="Downloads" value={totals.download} icon={Download} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily breakdown</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              {daily.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No events recorded yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                        <th className="py-2 pr-4 font-medium">Date</th>
                        <th className="py-2 pr-4 font-medium">Clicks</th>
                        <th className="py-2 pr-4 font-medium">Views</th>
                        <th className="py-2 font-medium">Downloads</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {daily.map((row) => (
                        <tr key={row.date}>
                          <td className="py-2 pr-4 font-mono text-xs">
                            {row.date}
                          </td>
                          <td className="py-2 pr-4">{row.button_click}</td>
                          <td className="py-2 pr-4">{row.view}</td>
                          <td className="py-2">{row.download}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
