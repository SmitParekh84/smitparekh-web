"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Trash2, Loader2 } from "lucide-react";

type Algo = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

const ALGOS: Algo[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Tiny pure-JS MD5 (RFC 1321) - kept inline so the tool works fully client-side
// without a build dep. Returns lowercase hex.
function md5(input: string): string {
  function rh(n: number) {
    let s = "",
      j;
    for (j = 0; j <= 3; j++)
      s +=
        ((n >> (j * 8 + 4)) & 0x0f).toString(16) +
        ((n >> (j * 8)) & 0x0f).toString(16);
    return s;
  }
  function ad(x: number, y: number) {
    const l = (x & 0xffff) + (y & 0xffff);
    return (((x >> 16) + (y >> 16) + (l >> 16)) << 16) | (l & 0xffff);
  }
  function rl(n: number, c: number) {
    return (n << c) | (n >>> (32 - c));
  }
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    return ad(rl(ad(ad(a, q), ad(x, t)), s), b);
  }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function s2b(s: string) {
    const nb = ((s.length + 8) >> 6) + 1;
    const bl = nb * 16;
    const blocks = new Array(bl).fill(0);
    let i;
    for (i = 0; i < s.length; i++) {
      blocks[i >> 2] |= s.charCodeAt(i) << ((i % 4) * 8);
    }
    blocks[i >> 2] |= 0x80 << ((i % 4) * 8);
    blocks[bl - 2] = s.length * 8;
    return blocks;
  }
  // UTF-8 encode
  const utf8 = unescape(encodeURIComponent(input));
  const x = s2b(utf8);
  let a = 1732584193,
    b = -271733879,
    c = -1732584194,
    d = 271733878;
  for (let i = 0; i < x.length; i += 16) {
    const oa = a,
      ob = b,
      oc = c,
      od = d;
    a = ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = ad(a, oa);
    b = ad(b, ob);
    c = ad(c, oc);
    d = ad(d, od);
  }
  return rh(a) + rh(b) + rh(c) + rh(d);
}

interface HashRow {
  algo: string;
  value: string;
}

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<HashRow[]>([]);
  const [copied, setCopied] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [upper, setUpper] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!input) {
        setHashes([]);
        return;
      }
      setBusy(true);
      try {
        const enc = new TextEncoder().encode(input);
        const md5Hex = md5(input);
        const results: HashRow[] = [{ algo: "MD5", value: md5Hex }];
        for (const algo of ALGOS) {
          const buf = await crypto.subtle.digest(algo, enc);
          results.push({ algo, value: bufToHex(buf) });
        }
        if (!cancelled) setHashes(results);
      } finally {
        if (!cancelled) setBusy(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [input]);

  async function handleCopy(algo: string, val: string) {
    await navigator.clipboard.writeText(upper ? val.toUpperCase() : val);
    setCopied(algo);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={upper}
            onChange={(e) => setUpper(e.target.checked)}
            className="rounded border-border"
          />
          Uppercase output
        </label>
        {busy && (
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Loader2 className="w-3 h-3 animate-spin" /> Hashing…
          </span>
        )}
        <button
          onClick={() => setInput("")}
          className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text to hash…"
          className="w-full h-32 rounded-lg border border-border bg-muted/20 p-3 text-xs font-mono outline-none focus:ring-2 focus:ring-blue-500/40 resize-none transition-shadow"
          spellCheck={false}
        />
        <p className="text-xs text-muted-foreground text-right">{input.length} chars</p>
      </div>

      <div className="space-y-2">
        {hashes.length === 0 && !busy && (
          <p className="text-xs text-muted-foreground text-center py-6">
            Hashes will appear here as you type.
          </p>
        )}
        {hashes.map((h) => (
          <div
            key={h.algo}
            className="rounded-lg border border-border bg-muted/20 p-3 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-500">{h.algo}</span>
              <button
                onClick={() => handleCopy(h.algo, h.value)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied === h.algo ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {copied === h.algo ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-xs font-mono break-all text-muted-foreground select-all">
              {upper ? h.value.toUpperCase() : h.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
