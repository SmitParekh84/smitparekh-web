"use client";

import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface StringListEditorProps {
  label: string;
  hint?: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}

export function StringListEditor({
  label,
  hint,
  values,
  onChange,
  placeholder,
  multiline,
}: StringListEditorProps) {
  function update(i: number, value: string) {
    const next = [...values];
    next[i] = value;
    onChange(next);
  }
  function remove(i: number) {
    onChange(values.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...values, ""]);
  }
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={add}
          className="text-blue-500 hover:text-blue-500"
        >
          <Plus className="w-3 h-3" /> Add
        </Button>
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <div className="space-y-2">
        {values.length === 0 && (
          <p className="text-xs text-muted-foreground italic">No items yet.</p>
        )}
        {values.map((v, i) => (
          <div key={i} className="flex gap-2 items-start">
            {multiline ? (
              <Textarea
                rows={3}
                value={v}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder}
                className="resize-y"
              />
            ) : (
              <Input
                type="text"
                value={v}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder}
                className="h-10"
              />
            )}
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={() => remove(i)}
              aria-label="Remove"
              className="shrink-0 mt-1"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface KVItem {
  label: string;
  value: string;
}

interface KVListEditorProps {
  label: string;
  hint?: string;
  values: KVItem[];
  onChange: (next: KVItem[]) => void;
  labelPlaceholder?: string;
  valuePlaceholder?: string;
}

export function KVListEditor({
  label,
  hint,
  values,
  onChange,
  labelPlaceholder = "Label",
  valuePlaceholder = "Value",
}: KVListEditorProps) {
  function update(i: number, key: keyof KVItem, val: string) {
    const next = [...values];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  }
  function remove(i: number) {
    onChange(values.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...values, { label: "", value: "" }]);
  }
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={add}
          className="text-blue-500 hover:text-blue-500"
        >
          <Plus className="w-3 h-3" /> Add
        </Button>
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <div className="space-y-2">
        {values.length === 0 && (
          <p className="text-xs text-muted-foreground italic">No items yet.</p>
        )}
        {values.map((item, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <Input
              type="text"
              value={item.label}
              onChange={(e) => update(i, "label", e.target.value)}
              placeholder={labelPlaceholder}
              className="h-10"
            />
            <Input
              type="text"
              value={item.value}
              onChange={(e) => update(i, "value", e.target.value)}
              placeholder={valuePlaceholder}
              className="h-10"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => remove(i)}
              aria-label="Remove"
              className="shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface OutcomeItem {
  label: string;
  value: string;
  detail: string;
}

interface OutcomeListEditorProps {
  label: string;
  hint?: string;
  values: OutcomeItem[];
  onChange: (next: OutcomeItem[]) => void;
}

export function OutcomeListEditor({
  label,
  hint,
  values,
  onChange,
}: OutcomeListEditorProps) {
  function update(i: number, key: keyof OutcomeItem, val: string) {
    const next = [...values];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  }
  function remove(i: number) {
    onChange(values.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...values, { label: "", value: "", detail: "" }]);
  }
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={add}
          className="text-blue-500 hover:text-blue-500"
        >
          <Plus className="w-3 h-3" /> Add
        </Button>
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <div className="space-y-3">
        {values.length === 0 && (
          <p className="text-xs text-muted-foreground italic">No outcomes yet.</p>
        )}
        {values.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-3 space-y-2 relative"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => remove(i)}
              aria-label="Remove outcome"
              className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Input
                type="text"
                value={item.label}
                onChange={(e) => update(i, "label", e.target.value)}
                placeholder="Label (e.g. 65% faster APIs)"
                className="h-10"
              />
              <Input
                type="text"
                value={item.value}
                onChange={(e) => update(i, "value", e.target.value)}
                placeholder="Value (e.g. Backend optimisation)"
                className="h-10"
              />
            </div>
            <Textarea
              rows={2}
              value={item.detail}
              onChange={(e) => update(i, "detail", e.target.value)}
              placeholder="Detail - one or two sentences explaining the outcome"
              className="resize-y"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export interface TechStackGroups {
  Frontend: string[];
  Backend: string[];
  Database: string[];
  Infrastructure: string[];
  Tooling: string[];
}

interface TechStackEditorProps {
  value: TechStackGroups;
  onChange: (next: TechStackGroups) => void;
}

const TECH_GROUPS: (keyof TechStackGroups)[] = [
  "Frontend",
  "Backend",
  "Database",
  "Infrastructure",
  "Tooling",
];

export function TechStackEditor({ value, onChange }: TechStackEditorProps) {
  function setGroup(group: keyof TechStackGroups, csv: string) {
    onChange({
      ...value,
      [group]: csv
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  }
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Comma-separated values per group. Leave blank to skip a group.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TECH_GROUPS.map((group) => (
          <div key={group} className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group}
            </Label>
            <Input
              type="text"
              value={(value[group] ?? []).join(", ")}
              onChange={(e) => setGroup(group, e.target.value)}
              placeholder={
                group === "Frontend"
                  ? "React, Next.js, TypeScript"
                  : group === "Backend"
                  ? "Node.js, Express"
                  : group === "Database"
                  ? "PostgreSQL"
                  : group === "Infrastructure"
                  ? "AWS, Docker"
                  : "GitHub Actions, Jest"
              }
              className="h-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
