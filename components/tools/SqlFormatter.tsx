"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Wand2, Minimize2 } from "lucide-react";

const KEYWORDS = [
  "SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "IN", "IS", "NULL", "AS", "BY",
  "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET", "JOIN", "INNER JOIN",
  "LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "OUTER JOIN", "CROSS JOIN", "ON",
  "UNION", "UNION ALL", "INTERSECT", "EXCEPT", "INSERT INTO", "VALUES",
  "UPDATE", "SET", "DELETE", "CREATE TABLE", "ALTER TABLE", "DROP TABLE",
  "CREATE INDEX", "DROP INDEX", "PRIMARY KEY", "FOREIGN KEY", "REFERENCES",
  "CONSTRAINT", "UNIQUE", "DEFAULT", "CHECK", "WITH", "DISTINCT", "CASE",
  "WHEN", "THEN", "ELSE", "END", "BETWEEN", "LIKE", "ILIKE", "EXISTS", "ALL",
  "ANY", "SOME", "INTO", "RETURNING", "COUNT", "SUM", "AVG", "MIN", "MAX",
  "TRUE", "FALSE", "ASC", "DESC",
];

const NEWLINE_BEFORE = [
  "FROM", "WHERE", "AND", "OR", "GROUP BY", "ORDER BY", "HAVING", "LIMIT",
  "OFFSET", "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN",
  "OUTER JOIN", "CROSS JOIN", "ON", "UNION", "UNION ALL", "INTERSECT",
  "EXCEPT", "VALUES", "SET", "RETURNING", "WITH",
];

interface Token {
  type: "keyword" | "string" | "comment" | "ident" | "punct" | "ws";
  value: string;
}

function tokenize(sql: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  const upper = sql.toUpperCase();
  while (i < sql.length) {
    const ch = sql[i];

    // line comment
    if (ch === "-" && sql[i + 1] === "-") {
      let j = i;
      while (j < sql.length && sql[j] !== "\n") j++;
      out.push({ type: "comment", value: sql.slice(i, j) });
      i = j;
      continue;
    }
    // block comment
    if (ch === "/" && sql[i + 1] === "*") {
      let j = i + 2;
      while (j < sql.length && !(sql[j] === "*" && sql[j + 1] === "/")) j++;
      j = Math.min(sql.length, j + 2);
      out.push({ type: "comment", value: sql.slice(i, j) });
      i = j;
      continue;
    }
    // string
    if (ch === "'" || ch === '"' || ch === "`") {
      let j = i + 1;
      while (j < sql.length) {
        if (sql[j] === ch && sql[j + 1] === ch) {
          j += 2;
          continue;
        }
        if (sql[j] === ch) {
          j++;
          break;
        }
        j++;
      }
      out.push({ type: "string", value: sql.slice(i, j) });
      i = j;
      continue;
    }
    if (/\s/.test(ch)) {
      let j = i;
      while (j < sql.length && /\s/.test(sql[j])) j++;
      out.push({ type: "ws", value: sql.slice(i, j) });
      i = j;
      continue;
    }
    // multi-word keyword check (longest-first)
    let matched: string | null = null;
    for (const kw of KEYWORDS) {
      if (kw.includes(" ")) {
        const len = kw.length;
        if (
          upper.slice(i, i + len) === kw &&
          (i + len === sql.length || /[\s,();]/.test(sql[i + len])) &&
          (i === 0 || /[\s,();]/.test(sql[i - 1]))
        ) {
          if (!matched || kw.length > matched.length) matched = kw;
        }
      }
    }
    if (matched) {
      out.push({ type: "keyword", value: matched });
      i += matched.length;
      continue;
    }
    // identifier / number / single-word keyword
    if (/[A-Za-z_0-9.]/.test(ch)) {
      let j = i;
      while (j < sql.length && /[A-Za-z_0-9.]/.test(sql[j])) j++;
      const word = sql.slice(i, j);
      const upperWord = word.toUpperCase();
      if (KEYWORDS.includes(upperWord)) out.push({ type: "keyword", value: upperWord });
      else out.push({ type: "ident", value: word });
      i = j;
      continue;
    }
    // punctuation
    out.push({ type: "punct", value: ch });
    i++;
  }
  return out;
}

function format(sql: string, indentSize: number, uppercase: boolean): string {
  const tokens = tokenize(sql).filter((t) => t.type !== "ws");
  const lines: string[] = [];
  let current = "";
  let depth = 0;
  const indent = () => " ".repeat(Math.max(0, depth) * indentSize);
  let lastWasPunct: string | null = null;

  const flush = () => {
    if (current.trim()) lines.push(indent() + current.trim());
    current = "";
  };

  for (let idx = 0; idx < tokens.length; idx++) {
    const t = tokens[idx];

    if (t.type === "keyword" && NEWLINE_BEFORE.includes(t.value)) {
      flush();
      current = (uppercase ? t.value : t.value.toLowerCase());
      lastWasPunct = null;
      continue;
    }
    if (t.type === "keyword" && t.value === "SELECT") {
      flush();
      current = uppercase ? "SELECT" : "select";
      lastWasPunct = null;
      continue;
    }
    if (t.type === "punct" && t.value === ",") {
      // trailing comma + newline within select/group/order lists
      current += ",";
      flush();
      lastWasPunct = ",";
      continue;
    }
    if (t.type === "punct" && t.value === ";") {
      current += ";";
      flush();
      lastWasPunct = ";";
      continue;
    }
    if (t.type === "punct" && t.value === "(") {
      const need = current && !/[\s(]$/.test(current);
      current += (need ? " " : "") + "(";
      depth++;
      lastWasPunct = "(";
      continue;
    }
    if (t.type === "punct" && t.value === ")") {
      depth = Math.max(0, depth - 1);
      current += ")";
      lastWasPunct = ")";
      continue;
    }
    let val = t.value;
    if (t.type === "keyword") val = uppercase ? val : val.toLowerCase();
    if (t.type === "comment") {
      flush();
      lines.push(indent() + val);
      continue;
    }
    const needSpace =
      current.length > 0 &&
      !/[\s(]$/.test(current) &&
      lastWasPunct !== "(" &&
      val !== "," &&
      val !== ";" &&
      val !== ")";
    current += (needSpace ? " " : "") + val;
    lastWasPunct = null;
  }
  flush();
  return lines.join("\n");
}

function minify(sql: string): string {
  return sql.replace(/\s+/g, " ").replace(/\s*([,;()])\s*/g, "$1").trim();
}

const SAMPLE = `select u.id,u.name,count(o.id) as orders from users u left join orders o on o.user_id=u.id where u.created_at>'2024-01-01' and u.status='active' group by u.id,u.name having count(o.id)>2 order by orders desc limit 10;`;

export default function SqlFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [indentSize, setIndentSize] = useState(2);
  const [uppercase, setUppercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const formatted = useMemo(() => {
    try {
      return format(input, indentSize, uppercase);
    } catch (e) {
      return e instanceof Error ? `-- error: ${e.message}` : "-- error";
    }
  }, [input, indentSize, uppercase]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Indent</span>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="rounded-md border border-border bg-background px-2 py-1 text-sm"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 tab</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
            className="h-4 w-4 rounded border-border"
          />
          <span>UPPERCASE keywords</span>
        </label>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => setInput(minify(input))}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:border-blue-500/40"
          >
            <Minimize2 className="h-3.5 w-3.5" /> Minify
          </button>
          <button
            type="button"
            onClick={() => setInput(SAMPLE)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:border-blue-500/40"
          >
            <Wand2 className="h-3.5 w-3.5" /> Sample
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Input SQL</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            rows={18}
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Paste your SQL here…"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">Formatted</label>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(formatted);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium hover:border-blue-500/40"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="m-0 max-h-[28rem] overflow-auto rounded-lg border border-border bg-muted/30 p-3 font-mono text-xs">
            {formatted || " - "}
          </pre>
        </div>
      </div>
    </div>
  );
}
