"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Download,
  FileSignature,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { SignaturePad } from "@/components/client/SignaturePad";
import { useMyContract, useSignContract } from "@/hooks/api/use-contracts";
import { contractsApi } from "@/lib/api/contracts";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { ContractStatus } from "@/types";

const STATUS_CONFIG: Record<
  ContractStatus,
  { label: string; dot: string; badge: string }
> = {
  no_template: {
    label: "Not ready",
    dot: "bg-muted-foreground/40",
    badge: "border-border bg-muted/50 text-muted-foreground",
  },
  pending_signature: {
    label: "Awaiting signature",
    dot: "bg-yellow-500",
    badge: "border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  },
  signed: {
    label: "Signed",
    dot: "bg-green-500",
    badge: "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400",
  },
};

export default function ClientContractPage() {
  const { data, isLoading } = useMyContract();
  const signMutation = useSignContract();
  const [downloading, setDownloading] = useState(false);
  const [signed, setSigned] = useState(false);

  const contract = data?.data;

  async function handleSign(dataUrl: string) {
    try {
      await signMutation.mutateAsync(dataUrl);
      setSigned(true);
      toast.success("Contract signed!", "Your signed document is ready to download.");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Could not save signature.";
      toast.error("Signing failed", msg);
    }
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const blob = await contractsApi.downloadMine() as unknown as Blob;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "contract-signed.docx";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Could not download document.";
      toast.error("Download failed", msg);
    } finally {
      setDownloading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    );
  }

  /* No template uploaded by admin yet */
  if (!contract || contract.status === "no_template") {
    return (
      <div className="mx-auto max-w-lg">
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <FileSignature className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">No contract ready yet</p>
            <p className="max-w-sm text-xs text-muted-foreground">
              Your project contract will appear here once it&apos;s been prepared. You&apos;ll be
              notified by email when it&apos;s ready to sign.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[contract.status];
  const isSigned = contract.status === "signed" || signed;

  return (
    <div className="mx-auto max-w-xl space-y-5">
      {/* Header card */}
      <Card>
        <CardContent className="flex items-start justify-between gap-4 p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-600">
              <FileSignature className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[13.5px] font-semibold">Project Contract</p>
              <p className="text-xs text-muted-foreground">{contract.templateName}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn("gap-1.5 text-[11px]", cfg.badge)}>
            <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
            {cfg.label}
          </Badge>
        </CardContent>
      </Card>

      {/* Signed state */}
      {isSigned ? (
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-[13.5px] font-semibold text-green-700 dark:text-green-400">
                  Contract signed
                </p>
                {contract.signedAt && (
                  <p className="text-xs text-muted-foreground">
                    Signed on{" "}
                    {new Date(contract.signedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
            <p className="text-[13px] text-muted-foreground">
              Your signature has been recorded. Download your signed copy below.
            </p>
            <Button
              className="w-full gap-2"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              {downloading ? "Generating…" : "Download signed contract (.docx)"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Pending signature */
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="text-base">Sign your contract</CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Draw your signature below using a mouse or touchscreen.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignaturePad
              onSign={handleSign}
            />
            {signMutation.isPending && (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving your signature…
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Trust note */}
      <div className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/30 p-3.5">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          Your signature is stored securely and embedded directly into the contract document.
          Only you and your project team can access it.
        </p>
      </div>
    </div>
  );
}
