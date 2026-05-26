"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Check, ShieldAlert, ShieldCheck, Clock } from "lucide-react";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNtaXQgUGFyZWtoIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjk5OTk5OTk5OTl9.dummy-signature-for-demo";

function b64urlDecode(input: string): string {
  let s = input.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4 !== 0) s += "=";
  try {
    const bin = atob(s);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    throw new Error("Invalid base64url segment");
  }
}

interface Decoded {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  parts: [string, string, string];
  error?: string;
}

function decodeJwt(token: string): Decoded | { error: string } {
  const t = token.trim();
  if (!t) return { error: "Paste a JWT to decode." };
  const parts = t.split(".");
  if (parts.length !== 3) return { error: "A JWT must have three dot-separated parts." };
  try {
    const header = JSON.parse(b64urlDecode(parts[0]));
    const payload = JSON.parse(b64urlDecode(parts[1]));
    return {
      header,
      payload,
      signature: parts[2],
      parts: [parts[0], parts[1], parts[2]],
    };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to decode token." };
  }
}

function fmtUnix(ts: unknown): string | null {
  if (typeof ts !== "number") return null;
  const d = new Date(ts * 1000);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString();
}

function CopyBtn({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-blue-500/40"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : label ?? "Copy"}
    </button>
  );
}

export default function JwtDecoder() {
  const [token, setToken] = useState(SAMPLE);
  const [nowMs, setNowMs] = useState(() => Date.now());
  const decoded = useMemo(() => decodeJwt(token), [token]);

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const isValid = !("error" in decoded);
  const exp = isValid ? (decoded as Decoded).payload.exp : undefined;
  const iat = isValid ? (decoded as Decoded).payload.iat : undefined;
  const nbf = isValid ? (decoded as Decoded).payload.nbf : undefined;
  const expiredFlag =
    typeof exp === "number" ? exp * 1000 < nowMs : null;

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium">JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          spellCheck={false}
          rows={5}
          className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Paste your JWT here (eyJ...)"
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setToken("")}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:border-blue-500/40"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => setToken(SAMPLE)}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:border-blue-500/40"
          >
            Load sample
          </button>
        </div>
      </div>

      {"error" in decoded ? (
        <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400">
          <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{decoded.error}</span>
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <div
              className={`rounded-lg border p-3 ${
                expiredFlag
                  ? "border-red-500/30 bg-red-500/5"
                  : expiredFlag === false
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-border bg-muted/20"
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-medium">
                {expiredFlag ? (
                  <>
                    <ShieldAlert className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-red-600 dark:text-red-400">Expired</span>
                  </>
                ) : expiredFlag === false ? (
                  <>
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Active</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">No exp claim</span>
                  </>
                )}
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                exp: {fmtUnix(exp) ?? "—"}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="text-xs font-medium text-muted-foreground">Issued at</p>
              <p className="mt-1 text-[11px]">{fmtUnix(iat) ?? "—"}</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="text-xs font-medium text-muted-foreground">Not before</p>
              <p className="mt-1 text-[11px]">{fmtUnix(nbf) ?? "—"}</p>
            </div>
          </div>

          <Section
            title="Header"
            tint="text-red-500"
            json={(decoded as Decoded).header}
            raw={(decoded as Decoded).parts[0]}
          />
          <Section
            title="Payload"
            tint="text-violet-500"
            json={(decoded as Decoded).payload}
            raw={(decoded as Decoded).parts[1]}
          />
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <h3 className="text-sm font-semibold text-cyan-500">Signature</h3>
              <CopyBtn value={(decoded as Decoded).parts[2]} />
            </div>
            <pre className="m-0 max-h-32 overflow-auto bg-muted/30 p-4 font-mono text-xs whitespace-pre-wrap break-all">
              {(decoded as Decoded).parts[2]}
            </pre>
            <p className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
              The signature can only be verified server-side using the secret or public key. This tool only decodes — it never validates the signature.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function Section({
  title,
  tint,
  json,
  raw,
}: {
  title: string;
  tint: string;
  json: Record<string, unknown>;
  raw: string;
}) {
  const pretty = useMemo(() => JSON.stringify(json, null, 2), [json]);
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <h3 className={`text-sm font-semibold ${tint}`}>{title}</h3>
        <div className="flex gap-2">
          <CopyBtn value={pretty} label="Copy JSON" />
          <CopyBtn value={raw} label="Copy raw" />
        </div>
      </div>
      <pre className="m-0 max-h-72 overflow-auto bg-muted/30 p-4 font-mono text-xs">{pretty}</pre>
    </div>
  );
}
