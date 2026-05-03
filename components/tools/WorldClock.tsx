"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, X, Search } from "lucide-react";

interface City {
  name: string;
  tz: string;
  country: string;
}

const ALL_CITIES: City[] = [
  { name: "New York", tz: "America/New_York", country: "USA" },
  { name: "Los Angeles", tz: "America/Los_Angeles", country: "USA" },
  { name: "Chicago", tz: "America/Chicago", country: "USA" },
  { name: "Toronto", tz: "America/Toronto", country: "Canada" },
  { name: "Vancouver", tz: "America/Vancouver", country: "Canada" },
  { name: "Mexico City", tz: "America/Mexico_City", country: "Mexico" },
  { name: "São Paulo", tz: "America/Sao_Paulo", country: "Brazil" },
  { name: "London", tz: "Europe/London", country: "UK" },
  { name: "Paris", tz: "Europe/Paris", country: "France" },
  { name: "Berlin", tz: "Europe/Berlin", country: "Germany" },
  { name: "Madrid", tz: "Europe/Madrid", country: "Spain" },
  { name: "Rome", tz: "Europe/Rome", country: "Italy" },
  { name: "Amsterdam", tz: "Europe/Amsterdam", country: "Netherlands" },
  { name: "Moscow", tz: "Europe/Moscow", country: "Russia" },
  { name: "Istanbul", tz: "Europe/Istanbul", country: "Turkey" },
  { name: "Dubai", tz: "Asia/Dubai", country: "UAE" },
  { name: "Mumbai", tz: "Asia/Kolkata", country: "India" },
  { name: "Bangalore", tz: "Asia/Kolkata", country: "India" },
  { name: "Delhi", tz: "Asia/Kolkata", country: "India" },
  { name: "Karachi", tz: "Asia/Karachi", country: "Pakistan" },
  { name: "Bangkok", tz: "Asia/Bangkok", country: "Thailand" },
  { name: "Singapore", tz: "Asia/Singapore", country: "Singapore" },
  { name: "Hong Kong", tz: "Asia/Hong_Kong", country: "Hong Kong" },
  { name: "Shanghai", tz: "Asia/Shanghai", country: "China" },
  { name: "Tokyo", tz: "Asia/Tokyo", country: "Japan" },
  { name: "Seoul", tz: "Asia/Seoul", country: "South Korea" },
  { name: "Sydney", tz: "Australia/Sydney", country: "Australia" },
  { name: "Melbourne", tz: "Australia/Melbourne", country: "Australia" },
  { name: "Auckland", tz: "Pacific/Auckland", country: "New Zealand" },
  { name: "Cairo", tz: "Africa/Cairo", country: "Egypt" },
  { name: "Johannesburg", tz: "Africa/Johannesburg", country: "South Africa" },
  { name: "Lagos", tz: "Africa/Lagos", country: "Nigeria" },
  { name: "UTC", tz: "UTC", country: "Worldwide" },
];

const DEFAULT_CITIES = ["Mumbai", "London", "New York", "Tokyo"];

function getOffset(tz: string, now: Date): string {
  const opts: Intl.DateTimeFormatOptions = {
    timeZone: tz,
    timeZoneName: "shortOffset",
  };
  const parts = new Intl.DateTimeFormat("en-US", opts).formatToParts(now);
  const off = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
  return off.replace("GMT", "UTC");
}

function isDayInTz(tz: string, now: Date): boolean {
  const h = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "numeric",
      hour12: false,
    }).format(now),
  );
  return h >= 6 && h < 19;
}

export default function WorldClock() {
  const [now, setNow] = useState(() => new Date());
  const [selected, setSelected] = useState<string[]>(DEFAULT_CITIES);
  const [search, setSearch] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const cities = useMemo(
    () =>
      selected
        .map((name) => ALL_CITIES.find((c) => c.name === name))
        .filter((c): c is City => Boolean(c)),
    [selected],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ALL_CITIES.filter((c) => !selected.includes(c.name)).slice(0, 12);
    return ALL_CITIES.filter(
      (c) =>
        !selected.includes(c.name) &&
        (c.name.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          c.tz.toLowerCase().includes(q)),
    ).slice(0, 12);
  }, [search, selected]);

  function add(name: string) {
    if (selected.includes(name)) return;
    setSelected([...selected, name]);
    setSearch("");
  }

  function remove(name: string) {
    setSelected(selected.filter((n) => n !== name));
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cities.map((c) => {
          const time = new Intl.DateTimeFormat("en-US", {
            timeZone: c.tz,
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }).format(now);
          const date = new Intl.DateTimeFormat("en-US", {
            timeZone: c.tz,
            weekday: "short",
            month: "short",
            day: "numeric",
          }).format(now);
          const isDay = isDayInTz(c.tz, now);
          return (
            <div
              key={c.name}
              className={`relative rounded-2xl border border-border p-4 transition-colors ${
                isDay
                  ? "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/5 dark:to-orange-500/5"
                  : "bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-500/5 dark:to-blue-500/10"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {c.country} · {getOffset(c.tz, now)}
                  </div>
                </div>
                <button
                  onClick={() => remove(c.name)}
                  className="text-muted-foreground hover:text-foreground p-1"
                  aria-label={`Remove ${c.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-3 text-3xl font-bold tabular-nums tracking-tight">{time}</div>
              <div className="text-xs text-muted-foreground">{date}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                {isDay ? "Daytime" : "Nighttime"}
              </div>
            </div>
          );
        })}
      </div>

      <div>
        {!showPicker ? (
          <button
            onClick={() => setShowPicker(true)}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/10 py-3 text-sm text-muted-foreground hover:bg-muted/20 hover:text-foreground transition-colors"
          >
            <Plus className="w-4 h-4" /> Add city
          </button>
        ) : (
          <div className="rounded-xl border border-border bg-card p-3 space-y-2">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/20 px-3 py-1.5">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search city, country, or timezone…"
                className="flex-1 bg-transparent text-sm outline-none"
                autoFocus
              />
              <button
                onClick={() => setShowPicker(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Done
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {filtered.length === 0 && (
                <p className="text-xs text-muted-foreground py-2">No matches.</p>
              )}
              {filtered.map((c) => (
                <button
                  key={c.name + c.tz}
                  onClick={() => add(c.name)}
                  className="text-xs rounded-full border border-border bg-muted/20 px-3 py-1 hover:bg-blue-500/10 hover:border-blue-500/40 transition-colors"
                >
                  {c.name} <span className="text-muted-foreground">({c.country})</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
