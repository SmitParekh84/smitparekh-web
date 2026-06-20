import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { ServicePage } from "@/data/services-catalog";
import { classifyMetric, type MetricVisual } from "@/lib/seo/metric-image";

// One square analytics card per proof stat. The SVG glyph is the real design.
// An optional `stat.image` can override it with a generated image.

/** Analytics SVG matched to the metric's visual archetype. */
function MetricGlyph({ visual }: { visual: MetricVisual }) {
  const common = "h-full w-full";
  const gid = `mg-${visual}`;
  const grad = (
    <defs>
      <linearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#0628FF" />
        <stop offset="100%" stopColor="#00C5EC" />
      </linearGradient>
    </defs>
  );
  switch (visual) {
    case "trend":
      return (
        <svg viewBox="0 0 100 60" className={common} fill="none" aria-hidden>
          {grad}
          <path d="M2 50 L22 38 L42 42 L62 22 L82 26 L98 8" stroke={`url(#${gid})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 50 L22 38 L42 42 L62 22 L82 26 L98 8 L98 60 L2 60 Z" fill={`url(#${gid})`} opacity="0.12" />
        </svg>
      );
    case "gauge":
      return (
        <svg viewBox="0 0 100 60" className={common} fill="none" aria-hidden>
          {grad}
          <circle cx="50" cy="42" r="26" stroke="currentColor" strokeWidth="7" className="text-muted/40" />
          <circle cx="50" cy="42" r="26" stroke={`url(#${gid})`} strokeWidth="7" strokeLinecap="round" strokeDasharray="163" strokeDashoffset="34" transform="rotate(-90 50 42)" />
        </svg>
      );
    case "counter":
      return (
        <svg viewBox="0 0 100 60" className={common} fill="none" aria-hidden>
          {grad}
          {[14, 32, 50, 68].map((x, i) => (
            <rect key={x} x={x} y={48 - (i + 1) * 9} width="12" height={(i + 1) * 9} rx="2" fill={`url(#${gid})`} opacity={0.55 + i * 0.15} />
          ))}
        </svg>
      );
    case "speed":
      return (
        <svg viewBox="0 0 100 60" className={common} fill="none" aria-hidden>
          {grad}
          <path d="M14 48 A36 36 0 0 1 86 48" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-muted/40" />
          <path d="M14 48 A36 36 0 0 1 70 19" stroke={`url(#${gid})`} strokeWidth="7" strokeLinecap="round" />
          <line x1="50" y1="48" x2="68" y2="26" stroke={`url(#${gid})`} strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="48" r="4" fill={`url(#${gid})`} />
        </svg>
      );
    case "duration":
      return (
        <svg viewBox="0 0 100 60" className={common} fill="none" aria-hidden>
          {grad}
          <circle cx="50" cy="30" r="22" stroke={`url(#${gid})`} strokeWidth="4" />
          <line x1="50" y1="30" x2="50" y2="16" stroke={`url(#${gid})`} strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="30" x2="62" y2="36" stroke={`url(#${gid})`} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 100 60" className={common} fill="none" aria-hidden>
          <path d="M50 8 L74 18 V32 C74 46 63 53 50 56 C37 53 26 46 26 32 V18 Z" fill="#10b981" opacity="0.14" stroke="#10b981" strokeWidth="2.5" />
          <path d="M40 31 L47 38 L62 23" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "rank":
      return (
        <svg viewBox="0 0 100 60" className={common} fill="none" aria-hidden>
          {grad}
          <rect x="14" y="34" width="20" height="20" rx="2" fill={`url(#${gid})`} opacity="0.5" />
          <rect x="40" y="20" width="20" height="34" rx="2" fill={`url(#${gid})`} />
          <rect x="66" y="40" width="20" height="14" rx="2" fill={`url(#${gid})`} opacity="0.5" />
        </svg>
      );
    case "rating":
      return (
        <svg viewBox="0 0 100 60" className={common} fill="none" aria-hidden>
          {grad}
          {[10, 30, 50, 70, 90].map((cx, i) => (
            <path
              key={cx}
              d={`M${cx} 18 l2.9 6 6.6.6 -5 4.4 1.5 6.4 -6-3.4 -6 3.4 1.5-6.4 -5-4.4 6.6-.6 Z`}
              fill={`url(#${gid})`}
              opacity={i < 4 ? 1 : 0.45}
            />
          ))}
        </svg>
      );
    default: // badge
      return (
        <svg viewBox="0 0 100 60" className={common} fill="none" aria-hidden>
          {grad}
          <rect x="20" y="22" width="60" height="18" rx="9" fill={`url(#${gid})`} opacity="0.16" stroke={`url(#${gid})`} strokeWidth="2" />
          <circle cx="32" cy="31" r="4" fill={`url(#${gid})`} />
        </svg>
      );
  }
}

function MetricCard({ stat }: { stat: ServicePage["proof"][number] }) {
  const visual = classifyMetric(stat.value, stat.label);

  if (stat.image) {
    return (
      <div className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
        <Image
          src={stat.image}
          alt={`${stat.value} - ${stat.label}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div className="group relative flex aspect-square flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 sm:p-6">
      {/* glyph panel */}
      <div className="flex h-[46%] items-center justify-center rounded-xl bg-gradient-to-b from-blue-500/[0.07] to-transparent p-2.5 text-blue-500/90 transition-transform duration-300 group-hover:scale-[1.05]">
        <MetricGlyph visual={visual} />
      </div>
      <div className="mt-auto pt-3">
        <p className="metric-value w-fit bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
          {stat.value}
        </p>
        <p className="mt-1.5 text-xs leading-snug text-muted-foreground">{stat.label}</p>
      </div>
    </div>
  );
}

export function ServiceResults({ service }: { service: ServicePage }) {
  if (!service.proof?.length) return null;
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-3">
            Proven results
          </Badge>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Results that build trust
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            The numbers behind the work - measured on real production data, not demos.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {service.proof.map((stat) => (
            <MetricCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
