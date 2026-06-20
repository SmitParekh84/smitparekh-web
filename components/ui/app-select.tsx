"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface AppSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  /** Pass an array of strings or `{ value, label }` objects. */
  options: (string | SelectOption)[];
  placeholder?: string;
  disabled?: boolean;
  /** Extra classes on the SelectTrigger (width, height, border-radius, etc.) */
  triggerClassName?: string;
}

function toOption(o: string | SelectOption): SelectOption {
  return typeof o === "string" ? { value: o, label: o } : o;
}

/**
 * AppSelect - project-standard select built on shadcn/ui Select.
 *
 * Use this instead of a native <select> for all form fields and filter bars.
 * Pass `options` as a string[] or SelectOption[] for the dropdown items.
 *
 * @example
 * <AppSelect
 *   value={category}
 *   onValueChange={setCategory}
 *   options={["All", "React", "Next.js"]}
 *   triggerClassName="w-40"
 * />
 */
export function AppSelect({
  value,
  onValueChange,
  options,
  placeholder,
  disabled,
  triggerClassName,
}: AppSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn("w-full", triggerClassName)}>
        <SelectValue placeholder={placeholder ?? "Select…"} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => {
          const opt = toOption(o);
          return (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
