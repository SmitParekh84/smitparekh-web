"use client";

import { useState, useCallback } from "react";
import { Copy, RefreshCw, Check, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?",
};

function generatePassword(length: number, opts: Record<string, boolean>): string {
  let pool = "";
  if (opts.uppercase) pool += CHARS.uppercase;
  if (opts.lowercase) pool += CHARS.lowercase;
  if (opts.numbers) pool += CHARS.numbers;
  if (opts.symbols) pool += CHARS.symbols;
  if (!pool) pool = CHARS.lowercase;

  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((v) => pool[v % pool.length])
    .join("");
}

function getStrength(password: string): { label: string; score: number; color: string } {
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 20) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", score, color: "bg-red-500" };
  if (score <= 3) return { label: "Fair", score, color: "bg-yellow-500" };
  if (score <= 4) return { label: "Good", score, color: "bg-blue-500" };
  return { label: "Strong", score, color: "bg-green-500" };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [password, setPassword] = useState(() => generatePassword(16, { uppercase: true, lowercase: true, numbers: true, symbols: false }));
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    setPassword(generatePassword(length, options));
  }, [length, options]);

  const copy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = getStrength(password);

  const toggleOption = (key: string) => {
    const next = { ...options, [key]: !options[key as keyof typeof options] };
    const anyEnabled = Object.values(next).some(Boolean);
    if (!anyEnabled) return;
    setOptions(next);
    setPassword(generatePassword(length, next));
  };

  const handleLength = (val: number) => {
    setLength(val);
    setPassword(generatePassword(val, options));
  };

  return (
    <div className="space-y-6">
      {/* Password display */}
      <div className="relative rounded-xl border border-border bg-muted/30 p-4">
        <p className="font-mono text-lg break-all pr-20 select-all leading-relaxed">
          {password}
        </p>
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            onClick={generate}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-blue-500/50 transition-colors"
            aria-label="Regenerate"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={copy}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-blue-500/50 transition-colors"
            aria-label="Copy"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Check className="w-4 h-4 text-green-500" />
                </motion.span>
              ) : (
                <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Copy className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Strength */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Strength
          </span>
          <span className="font-medium">{strength.label}</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${strength.color}`}
            animate={{ width: `${(strength.score / 6) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Length */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Length</span>
          <span className="font-semibold text-blue-500">{length}</span>
        </div>
        <input
          type="range"
          min={4}
          max={64}
          value={length}
          onChange={(e) => handleLength(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>4</span>
          <span>64</span>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(options) as Array<keyof typeof options>).map((key) => (
          <button
            key={key}
            onClick={() => toggleOption(key)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
              options[key]
                ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            <span className={`w-3 h-3 rounded-sm flex-shrink-0 border-2 flex items-center justify-center ${options[key] ? "bg-blue-500 border-blue-500" : "border-muted-foreground"}`}>
              {options[key] && <Check className="w-2 h-2 text-white" />}
            </span>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      <button
        onClick={generate}
        className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Generate New Password
      </button>
    </div>
  );
}
