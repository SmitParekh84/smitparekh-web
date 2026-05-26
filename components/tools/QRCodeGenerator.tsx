"use client";

import { useState } from "react";
import { Download, QrCode, Wifi, Mail, Phone, MessageSquare, Link2, AlignLeft, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGenerateQrImage } from "@/hooks/api/use-tools";
import { toast } from "@/lib/toast";

type QRType = "url" | "text" | "email" | "phone" | "sms" | "wifi";

const QR_TYPES: { value: QRType; label: string; icon: React.FC<{ className?: string }> }[] = [
  { value: "url",   label: "URL",   icon: Link2 },
  { value: "text",  label: "Text",  icon: AlignLeft },
  { value: "email", label: "Email", icon: Mail },
  { value: "phone", label: "Phone", icon: Phone },
  { value: "sms",   label: "SMS",   icon: MessageSquare },
  { value: "wifi",  label: "WiFi",  icon: Wifi },
];

const SIZES = [
  { label: "Small",  value: 200 },
  { label: "Medium", value: 400 },
  { label: "Large",  value: 600 },
];

const COLOR_PRESETS = [
  { label: "Classic",  qr: "#000000", bg: "#ffffff" },
  { label: "Inverted", qr: "#ffffff", bg: "#000000" },
  { label: "Blue",     qr: "#1a73e8", bg: "#e8f0fe" },
  { label: "Green",    qr: "#0f9d58", bg: "#e6f4ea" },
  { label: "Purple",   qr: "#673ab7", bg: "#f3e8fd" },
  { label: "Red",      qr: "#ea4335", bg: "#fce8e6" },
];

function buildContent(type: QRType, fields: Record<string, string>): string {
  switch (type) {
    case "url":   return fields.url || "";
    case "text":  return fields.text || "";
    case "email": {
      const qs = new URLSearchParams();
      if (fields.subject) qs.set("subject", fields.subject);
      if (fields.body)    qs.set("body", fields.body);
      const q = qs.toString();
      return `mailto:${fields.email || ""}${q ? "?" + q : ""}`;
    }
    case "phone": return `tel:${fields.phone || ""}`;
    case "sms":   return `SMSTO:${fields.phone || ""}:${fields.message || ""}`;
    case "wifi":  return `WIFI:T:${fields.security || "WPA"};S:${fields.ssid || ""};P:${fields.password || ""};;`;
    default:      return "";
  }
}

export default function QRCodeGenerator() {
  const [qrType, setQrType]         = useState<QRType>("url");
  const [fields, setFields]         = useState<Record<string, string>>({});
  const [size, setSize]             = useState(400);
  const [qrColor, setQrColor]       = useState("#000000");
  const [bgColor, setBgColor]       = useState("#ffffff");
  const [transparent, setTransparent] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [qrUrl, setQrUrl]           = useState<string | null>(null);
  const [qrBlob, setQrBlob]         = useState<Blob | null>(null);
  const [copied, setCopied]         = useState(false);
  const mutation = useGenerateQrImage();

  const setField = (k: string, v: string) => setFields((f) => ({ ...f, [k]: v }));
  const hasContent = buildContent(qrType, fields).trim().length > 0;

  const generate = () => {
    const content = buildContent(qrType, fields);
    if (!content.trim()) return;
    if (qrUrl) URL.revokeObjectURL(qrUrl);
    mutation.mutate(
      {
        text: content,
        size,
        color: qrColor.replace("#", ""),
        background: transparent ? "transparent" : bgColor.replace("#", ""),
      },
      {
        onSuccess: (blob) => {
          setQrUrl(URL.createObjectURL(blob));
          setQrBlob(blob);
        },
        onError: () => toast.error("Failed to generate QR", "Please try again."),
      },
    );
  };

  const download = () => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = `qr-${qrType}-${Date.now()}.png`;
    a.click();
  };

  const copyImage = async () => {
    if (!qrBlob) return;
    try {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": qrBlob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed", "Your browser may not support copying images.");
    }
  };

  const inputCls = "w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 placeholder:text-muted-foreground";

  return (
    <div className="space-y-6">
      {/* Type selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">QR Code Type</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {QR_TYPES.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => { setQrType(value); setFields({}); setQrUrl(null); }}
              className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 text-xs font-medium transition-colors ${
                qrType === value
                  ? "border-blue-500 bg-blue-500/10 text-blue-500"
                  : "border-border bg-card text-muted-foreground hover:border-blue-500/30"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic fields */}
      <AnimatePresence mode="wait">
        <motion.div key={qrType} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="space-y-3">
          {qrType === "url" && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium">URL</label>
              <input value={fields.url ?? ""} onChange={(e) => setField("url", e.target.value)} onKeyDown={(e) => e.key === "Enter" && generate()} placeholder="https://example.com" className={inputCls} />
            </div>
          )}
          {qrType === "text" && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Text</label>
              <textarea value={fields.text ?? ""} onChange={(e) => setField("text", e.target.value)} placeholder="Enter any text…" rows={3} className={inputCls + " resize-none"} />
            </div>
          )}
          {qrType === "email" && (<>
            <div className="space-y-1.5"><label className="text-sm font-medium">Email Address</label><input value={fields.email ?? ""} onChange={(e) => setField("email", e.target.value)} placeholder="hello@example.com" type="email" className={inputCls} /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium">Subject <span className="text-muted-foreground font-normal">(optional)</span></label><input value={fields.subject ?? ""} onChange={(e) => setField("subject", e.target.value)} placeholder="Subject…" className={inputCls} /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium">Message <span className="text-muted-foreground font-normal">(optional)</span></label><textarea value={fields.body ?? ""} onChange={(e) => setField("body", e.target.value)} rows={2} className={inputCls + " resize-none"} /></div>
          </>)}
          {qrType === "phone" && (
            <div className="space-y-1.5"><label className="text-sm font-medium">Phone Number</label><input value={fields.phone ?? ""} onChange={(e) => setField("phone", e.target.value)} placeholder="+1 234 567 8900" type="tel" className={inputCls} /></div>
          )}
          {qrType === "sms" && (<>
            <div className="space-y-1.5"><label className="text-sm font-medium">Phone Number</label><input value={fields.phone ?? ""} onChange={(e) => setField("phone", e.target.value)} placeholder="+1 234 567 8900" type="tel" className={inputCls} /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium">Message <span className="text-muted-foreground font-normal">(optional)</span></label><textarea value={fields.message ?? ""} onChange={(e) => setField("message", e.target.value)} rows={2} className={inputCls + " resize-none"} /></div>
          </>)}
          {qrType === "wifi" && (<>
            <div className="space-y-1.5"><label className="text-sm font-medium">Network Name (SSID)</label><input value={fields.ssid ?? ""} onChange={(e) => setField("ssid", e.target.value)} placeholder="MyWiFiNetwork" className={inputCls} /></div>
            <div className="space-y-1.5"><label className="text-sm font-medium">Password</label><input value={fields.password ?? ""} onChange={(e) => setField("password", e.target.value)} type="password" className={inputCls} /></div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Security</label>
              <div className="flex gap-2">
                {["WPA", "WEP", "None"].map((s) => (
                  <button key={s} onClick={() => setField("security", s === "None" ? "nopass" : s)} className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${(fields.security ?? "WPA") === (s === "None" ? "nopass" : s) ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-border bg-card text-muted-foreground"}`}>{s}</button>
                ))}
              </div>
            </div>
          </>)}
        </motion.div>
      </AnimatePresence>

      {/* Size */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Size</label>
        <div className="flex gap-2">
          {SIZES.map(({ label, value }) => (
            <button key={value} onClick={() => setSize(value)} className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${size === value ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-border bg-card text-muted-foreground"}`}>{label}</button>
          ))}
        </div>
      </div>

      {/* Customize toggle */}
      <button onClick={() => setShowCustomize(!showCustomize)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        {showCustomize ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {showCustomize ? "Hide" : "Show"} colour customisation
      </button>

      <AnimatePresence>
        {showCustomize && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <div className="space-y-4 pt-1">
              {/* Colour presets */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Colour Presets</label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => { setQrColor(p.qr); setBgColor(p.bg); setTransparent(false); }}
                      title={p.label}
                      className="w-8 h-8 rounded-lg border-2 border-border hover:border-blue-500 transition-colors"
                      style={{ background: `linear-gradient(135deg, ${p.qr} 50%, ${p.bg} 50%)` }}
                    />
                  ))}
                </div>
              </div>

              {/* QR colour */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium w-28 shrink-0">QR Colour</label>
                <input type="color" value={qrColor} onChange={(e) => setQrColor(e.target.value)} className="w-9 h-9 rounded-lg cursor-pointer border border-border bg-transparent p-0.5" />
                <input type="text" value={qrColor} onChange={(e) => /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) && setQrColor(e.target.value)} maxLength={7} className="w-24 rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs font-mono focus:outline-none focus:border-blue-500/50" />
              </div>

              {/* BG colour */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium w-28 shrink-0">Background</label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} disabled={transparent} className="w-9 h-9 rounded-lg cursor-pointer border border-border bg-transparent p-0.5 disabled:opacity-40 disabled:cursor-not-allowed" />
                <input type="text" value={transparent ? "transparent" : bgColor} onChange={(e) => !transparent && /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) && setBgColor(e.target.value)} maxLength={7} disabled={transparent} className="w-24 rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs font-mono focus:outline-none focus:border-blue-500/50 disabled:opacity-40" />
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} className="rounded" />
                  Transparent
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={generate} disabled={!hasContent || mutation.isPending} className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2">
        <QrCode className="w-4 h-4" />
        {mutation.isPending ? "Generating…" : "Generate QR Code"}
      </button>

      <AnimatePresence>
        {qrUrl && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center gap-4 rounded-xl border border-border p-6" style={{ background: transparent ? 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGklEQVQoU2NkYGD4z8BQDwAEgAF/QualIQAAAABJRU5ErkJggg==") repeat' : bgColor }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrUrl} alt="Generated QR Code" className="max-w-56 w-full rounded-lg" />
            <div className="flex gap-2">
              <button onClick={copyImage} className="flex items-center gap-2 rounded-lg border border-border bg-card hover:bg-muted/40 text-sm font-medium px-4 py-2.5 transition-colors">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={download} className="flex items-center gap-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
