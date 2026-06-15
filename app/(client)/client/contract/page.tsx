"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Download,
  Eye,
  FileSignature,
  Loader2,
  RotateCcw,
  Save,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { SignaturePad } from "@/components/client/SignaturePad";
import { DocxViewer } from "@/components/client/DocxViewer";
import { useMyContract, useSignContract } from "@/hooks/api/use-contracts";
import { contractsApi } from "@/lib/api/contracts";
import { toast } from "@/lib/toast";
import { ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { ContractStatus } from "@/types";

/* ─── localStorage key for saved signature ─────────────────────────────── */
const LS_KEY = "sp_saved_signature";

function loadSaved(): string | null {
  try { return localStorage.getItem(LS_KEY); } catch { return null; }
}
function saveSig(b64: string) {
  try { localStorage.setItem(LS_KEY, b64); } catch {}
}
function clearSaved() {
  try { localStorage.removeItem(LS_KEY); } catch {}
}

/* ─── Status config ─────────────────────────────────────────────────────── */
const STATUS_CONFIG: Record<ContractStatus, { label: string; dot: string; badge: string }> = {
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

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function ClientContractPage() {
  const { data, isLoading } = useMyContract();
  const signMutation = useSignContract();

  const [downloading, setDownloading] = useState(false);
  const [justSigned, setJustSigned] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSignedDoc, setShowSignedDoc] = useState(false);
  const [saveForFuture, setSaveForFuture] = useState(true);
  const [savedSig, setSavedSig] = useState<string | null>(null);
  const [usingSaved, setUsingSaved] = useState(false);

  // Load saved signature from localStorage on mount
  useEffect(() => {
    const sig = loadSaved();
    setSavedSig(sig);
    if (sig) setUsingSaved(true);
  }, []);

  const contract = data?.data;

  async function handleSign(dataUrl: string) {
    try {
      await signMutation.mutateAsync(dataUrl);
      if (saveForFuture) saveSig(dataUrl);
      setJustSigned(true);
      setSavedSig(dataUrl);
      toast.success("Contract signed!", "Your signed document is ready to download.");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Could not save signature.";
      toast.error("Signing failed", msg);
    }
  }

  async function handleUseSaved() {
    if (!savedSig) return;
    await handleSign(savedSig);
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const blob = await contractsApi.downloadMine();
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

  /* ── Loading ─────────────────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    );
  }

  /* ── No template ─────────────────────────────────────────────────────── */
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
              notified by email when it&apos;s ready.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[contract.status];
  const isSigned = contract.status === "signed" || justSigned;

  return (
    <div className="mx-auto max-w-2xl space-y-5">

      {/* ── Header card ─────────────────────────────────────────────────── */}
      <Card>
        <CardContent className="flex items-center justify-between gap-4 p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-600">
              <FileSignature className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[13.5px] font-semibold">Project Contract</p>
              <p className="text-xs text-muted-foreground">{contract.templateName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("gap-1.5 text-[11px]", cfg.badge)}>
              <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
              {cfg.label}
            </Badge>
            {/* Preview template button */}
            {!isSigned && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => setShowPreview((v) => !v)}
              >
                <Eye className="h-3.5 w-3.5" />
                {showPreview ? "Hide" : "Preview"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── DOCX preview (template, before signing) ─────────────────────── */}
      {showPreview && !isSigned && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contract preview</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DocxViewer
              fetchDoc={() => contractsApi.previewMine()}
              className="px-2 pb-4"
            />
          </CardContent>
        </Card>
      )}

      {/* ── Signed state ─────────────────────────────────────────────────── */}
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

            <div className="flex flex-wrap gap-2">
              <Button
                className="flex-1 gap-2"
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
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setShowSignedDoc((v) => !v)}
              >
                <Eye className="h-3.5 w-3.5" />
                {showSignedDoc ? "Hide" : "View"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* ── Signing card ─────────────────────────────────────────────── */
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="text-base">Sign your contract</CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {savedSig && usingSaved
                  ? "Use your saved signature or draw a new one."
                  : "Draw your signature using a mouse or touchscreen."}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Saved signature option */}
            {savedSig && (
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-muted/20 p-3">
                  <div className="space-y-1.5">
                    <p className="text-[12.5px] font-medium">Use saved signature</p>
                    <img
                      src={savedSig}
                      alt="Your saved signature"
                      className="h-12 w-auto rounded border border-border bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Button
                      size="sm"
                      className="gap-1.5"
                      onClick={handleUseSaved}
                      disabled={signMutation.isPending}
                    >
                      {signMutation.isPending ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-3 w-3" />
                      )}
                      Use this
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-muted-foreground"
                      onClick={() => { clearSaved(); setSavedSig(null); setUsingSaved(false); }}
                    >
                      <RotateCcw className="h-3 w-3" /> Draw new
                    </Button>
                  </div>
                </div>
                <p className="text-center text-[11px] text-muted-foreground">- or draw a new signature below -</p>
              </div>
            )}

            {/* Drawing pad - opens full-screen overlay */}
            <SignaturePad
              onSign={handleSign}
              disabled={signMutation.isPending}
            />

            {/* Save for future checkbox */}
            {!savedSig && (
              <label className="flex cursor-pointer items-center gap-2 text-[12.5px] text-muted-foreground select-none">
                <input
                  type="checkbox"
                  checked={saveForFuture}
                  onChange={(e) => setSaveForFuture(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-border accent-blue-500"
                />
                <Save className="h-3.5 w-3.5" />
                Save this signature for future use
              </label>
            )}

            {signMutation.isPending && (
              <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="text-[13px] text-muted-foreground">Saving your signature…</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Signed document inline view ──────────────────────────────────── */}
      {isSigned && showSignedDoc && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Signed contract</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DocxViewer
              fetchDoc={() => contractsApi.downloadMine()}
              className="px-2 pb-4"
            />
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
