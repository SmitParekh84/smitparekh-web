"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAdminClient, useAdminClientRequirements } from "@/hooks/api/use-clients";
import { ProjectWorkflow } from "@/components/admin/ProjectWorkflow";
import { cn } from "@/lib/utils";

const SERVICE_LABELS: Record<string, string> = {
  website: "Website Development",
  seo: "SEO",
  "ai-automation": "AI & Automation",
  "custom-software": "Custom Software",
};

export default function AdminClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const clientQuery = useAdminClient(id);
  const reqQuery = useAdminClientRequirements(id);

  const client = clientQuery.data?.data;
  const requirements = reqQuery.data?.data;

  return (
    <div className="space-y-6">
      <Link
        href="/admin/clients"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5 -ml-2 w-fit")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to clients
      </Link>

      {clientQuery.isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : !client ? (
        <p className="py-16 text-center text-sm text-muted-foreground">Client not found.</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-[22px] font-semibold tracking-tight">
                {client.name || client.email}
              </h1>
              <p className="text-[13px] text-muted-foreground">{client.email}</p>
            </div>
            <Badge variant="outline" className="capitalize">{client.status}</Badge>
          </div>

          {requirements && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex flex-wrap gap-2">
                  {requirements.categories.map((c) => (
                    <Badge key={c} variant="secondary">{SERVICE_LABELS[c] ?? c}</Badge>
                  ))}
                </div>
                {requirements.additionalNotes && (
                  <p className="text-muted-foreground">{requirements.additionalNotes}</p>
                )}
              </CardContent>
            </Card>
          )}

          <ProjectWorkflow clientId={id} />
        </>
      )}
    </div>
  );
}
