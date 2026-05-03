"use client";

import { useMemo, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const WORDS = [
  "lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do",
  "eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim",
  "ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip",
  "ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate",
  "velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat",
  "non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum",
  "curabitur","pretium","tincidunt","lacus","nulla","gravida","orci","a","odio","nibh",
  "mauris","ornare","odio","metus","nec","fringilla","molestie","nunc","sapien","tellus",
  "rutrum","pellentesque","commodo","eros","a","enim","vestibulum","ante","primis","faucibus",
];

const LOREM_START = ["lorem", "ipsum", "dolor", "sit", "amet"];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSentence(minWords = 6, maxWords = 14, isFirst = false): string {
  const len = minWords + Math.floor(Math.random() * (maxWords - minWords + 1));
  const words: string[] = [];
  for (let i = 0; i < len; i++) {
    if (isFirst && i < LOREM_START.length) {
      words.push(LOREM_START[i]);
    } else {
      words.push(rand(WORDS));
    }
  }
  // Random commas
  for (let i = 1; i < words.length - 2; i++) {
    if (Math.random() < 0.08) words[i] += ",";
  }
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(sentencesMin = 3, sentencesMax = 7, startWithLorem = false): string {
  const len = sentencesMin + Math.floor(Math.random() * (sentencesMax - sentencesMin + 1));
  const sentences: string[] = [];
  for (let i = 0; i < len; i++) {
    sentences.push(generateSentence(6, 14, startWithLorem && i === 0));
  }
  return sentences.join(" ");
}

type Mode = "paragraphs" | "sentences" | "words" | "bytes";

export default function LoremIpsumGenerator() {
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const text = useMemo(() => {
    void seed; // re-roll trigger
    if (mode === "paragraphs") {
      const arr: string[] = [];
      for (let i = 0; i < count; i++) {
        arr.push(generateParagraph(3, 7, startWithLorem && i === 0));
      }
      return arr.join("\n\n");
    }
    if (mode === "sentences") {
      const arr: string[] = [];
      for (let i = 0; i < count; i++) {
        arr.push(generateSentence(8, 18, startWithLorem && i === 0));
      }
      return arr.join(" ");
    }
    if (mode === "words") {
      const arr: string[] = [];
      for (let i = 0; i < count; i++) {
        if (startWithLorem && i < LOREM_START.length) arr.push(LOREM_START[i]);
        else arr.push(rand(WORDS));
      }
      arr[0] = arr[0][0].toUpperCase() + arr[0].slice(1);
      return arr.join(" ") + ".";
    }
    // bytes
    let out = "";
    while (out.length < count) out += " " + rand(WORDS);
    return out.slice(0, count).trim();
  }, [mode, count, startWithLorem, seed]);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr,1fr,auto] gap-3 items-end">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Generate</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
            <option value="bytes">Bytes (chars)</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Count</label>
          <input
            type="number"
            min={1}
            max={mode === "bytes" ? 100000 : 200}
            value={count}
            onChange={(e) =>
              setCount(Math.max(1, Math.min(mode === "bytes" ? 100000 : 200, Number(e.target.value) || 1)))
            }
            className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
        <button
          onClick={() => setSeed((s) => s + 1)}
          className="rounded-lg border border-border bg-muted/20 px-4 py-2 text-sm font-medium hover:bg-muted/40 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Regenerate
        </button>
      </div>

      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={startWithLorem}
          onChange={(e) => setStartWithLorem(e.target.checked)}
          className="accent-blue-500"
        />
        Start with &ldquo;Lorem ipsum dolor sit amet…&rdquo;
      </label>

      <div className="relative">
        <textarea
          value={text}
          readOnly
          rows={12}
          className="w-full rounded-xl border border-border bg-muted/20 p-4 text-sm leading-relaxed font-serif outline-none focus:ring-2 focus:ring-blue-500/40 resize-y"
        />
        <button
          onClick={copy}
          className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted/40 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" /> Copy
            </>
          )}
        </button>
      </div>

      <div className="text-xs text-muted-foreground flex flex-wrap gap-4">
        <span>Characters: <strong className="text-foreground">{text.length}</strong></span>
        <span>Words: <strong className="text-foreground">{text.trim().split(/\s+/).filter(Boolean).length}</strong></span>
      </div>
    </div>
  );
}
