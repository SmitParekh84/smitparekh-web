import { Badge } from "@/components/ui/badge";

export type StatIconType =
  | "bars"
  | "clock"
  | "toggle"
  | "shield"
  | "speed"
  | "check"
  | "trend"
  | "star"
  | "cpu"
  | "flash"
  | "target"
  | "grid";

export interface StatItem {
  metric: string;
  label: string;
  icon: StatIconType;
}

// devStats: bars, clock, toggle, shield
export const devStats: StatItem[] = [
  { metric: "20+", label: "MVPs shipped to real users", icon: "bars" },
  { metric: "4-8 wks", label: "Average kickoff to live", icon: "clock" },
  { metric: "Fixed", label: "Price, no scope creep", icon: "toggle" },
  { metric: "30 days", label: "Post-launch bug-fix support", icon: "shield" },
];

// seoStats: speed, trend, star, check  (no overlaps with devStats)
export const seoStats: StatItem[] = [
  { metric: "95+", label: "Lighthouse score target", icon: "speed" },
  { metric: "3x", label: "Average organic traffic lift", icon: "trend" },
  { metric: "48h", label: "Technical fix turnaround", icon: "star" },
  { metric: "100%", label: "Code fixes, not report PDFs", icon: "check" },
];

// aiStats: cpu, flash, grid, target  (no overlaps with dev or seoStats)
export const aiStats: StatItem[] = [
  { metric: "10+", label: "AI features shipped to production", icon: "cpu" },
  { metric: "24h", label: "Assessment turnaround time", icon: "flash" },
  { metric: "3", label: "LLM providers supported", icon: "grid" },
  { metric: "Evals", label: "On every AI feature build", icon: "target" },
];

function BarsIcon() {
  return (
    <svg viewBox="0 0 76 64" fill="none" width="76" height="64" aria-hidden="true">
      <defs>
        <linearGradient id="sc-bars-g" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#00C5EC" />
          <stop offset="1" stopColor="#0628FF" />
        </linearGradient>
      </defs>
      <rect x="2" width="14" rx="2" fill="url(#sc-bars-g)" fillOpacity="0.45">
        <animate attributeName="height" values="0;10" dur="0.5s" fill="freeze" begin="0.2s" />
        <animate attributeName="y" values="64;54" dur="0.5s" fill="freeze" begin="0.2s" />
      </rect>
      <rect x="20" width="14" rx="2" fill="url(#sc-bars-g)" fillOpacity="0.6">
        <animate attributeName="height" values="0;22" dur="0.5s" fill="freeze" begin="0.35s" />
        <animate attributeName="y" values="64;42" dur="0.5s" fill="freeze" begin="0.35s" />
      </rect>
      <rect x="38" width="14" rx="2" fill="url(#sc-bars-g)" fillOpacity="0.8">
        <animate attributeName="height" values="0;38" dur="0.5s" fill="freeze" begin="0.5s" />
        <animate attributeName="y" values="64;26" dur="0.5s" fill="freeze" begin="0.5s" />
      </rect>
      <rect x="56" width="14" rx="2" fill="url(#sc-bars-g)">
        <animate attributeName="height" values="0;58" dur="0.5s" fill="freeze" begin="0.65s" />
        <animate attributeName="y" values="64;6" dur="0.5s" fill="freeze" begin="0.65s" />
      </rect>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none" width="72" height="72" aria-hidden="true">
      <defs>
        <linearGradient id="sc-clock-g" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#00C5EC" />
          <stop offset="1" stopColor="#0628FF" />
        </linearGradient>
      </defs>
      <circle cx="36" cy="36" r="30" stroke="url(#sc-clock-g)" strokeWidth="2.5" />
      <circle cx="36" cy="36" r="22" stroke="#0628FF" strokeWidth="0.75" opacity="0.3" />
      <circle cx="36" cy="36" r="3" fill="url(#sc-clock-g)" />
      <line x1="36" y1="36" x2="36" y2="14" stroke="url(#sc-clock-g)" strokeWidth="2.5" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 36 36" to="360 36 36" dur="8s" repeatCount="indefinite" />
      </line>
      <line x1="36" y1="36" x2="52" y2="43" stroke="#00C5EC" strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <animateTransform attributeName="transform" type="rotate" from="0 36 36" to="360 36 36" dur="1.2s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

function ToggleIcon() {
  return (
    <svg viewBox="0 0 88 40" fill="none" width="88" height="40" aria-hidden="true">
      <defs>
        <linearGradient id="sc-toggle-g" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#0628FF" />
          <stop offset="1" stopColor="#00C5EC" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="80" height="32" rx="16" fill="url(#sc-toggle-g)" fillOpacity="0.15" />
      <rect x="4" y="4" width="80" height="32" rx="16" stroke="url(#sc-toggle-g)" strokeWidth="2" />
      <circle cy="20" r="13" fill="url(#sc-toggle-g)">
        <animate attributeName="cx" values="21;67" dur="0.7s" fill="freeze" begin="0.4s" calcMode="spline" keySplines="0.4 0 0.2 1" />
      </circle>
      <circle cy="15" r="4" fill="white" fillOpacity="0.25">
        <animate attributeName="cx" values="18;64" dur="0.7s" fill="freeze" begin="0.4s" calcMode="spline" keySplines="0.4 0 0.2 1" />
      </circle>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 72 80" fill="none" width="72" height="80" aria-hidden="true">
      <defs>
        <linearGradient id="sc-shield-g" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#00C5EC" />
          <stop offset="1" stopColor="#0628FF" />
        </linearGradient>
      </defs>
      <path
        d="M36 4 L64 14 L64 42 C64 58 50 70 36 76 C22 70 8 58 8 42 L8 14 Z"
        stroke="url(#sc-shield-g)" strokeWidth="2.5"
        fill="url(#sc-shield-g)" fillOpacity="0.1"
        strokeDasharray="220" strokeDashoffset="220"
      >
        <animate attributeName="stroke-dashoffset" values="220;0" dur="0.8s" fill="freeze" begin="0.2s" />
      </path>
      <path
        d="M24 40 L32 49 L48 32"
        stroke="url(#sc-shield-g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="45" strokeDashoffset="45"
      >
        <animate attributeName="stroke-dashoffset" values="45;0" dur="0.4s" fill="freeze" begin="0.85s" />
      </path>
    </svg>
  );
}

function SpeedIcon() {
  return (
    <svg viewBox="0 0 80 52" fill="none" width="80" height="52" aria-hidden="true">
      <defs>
        <linearGradient id="sc-speed-g" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#0628FF" />
          <stop offset="1" stopColor="#00C5EC" />
        </linearGradient>
      </defs>
      <path d="M10 46 A30 30 0 0 1 70 46" stroke="#0628FF" strokeWidth="2" opacity="0.2" strokeLinecap="round" />
      <path
        d="M10 46 A30 30 0 0 1 70 46"
        stroke="url(#sc-speed-g)" strokeWidth="3.5" strokeLinecap="round"
        strokeDasharray="95" strokeDashoffset="95"
      >
        <animate attributeName="stroke-dashoffset" values="95;18" dur="0.9s" fill="freeze" begin="0.3s" calcMode="spline" keySplines="0.4 0 0.2 1" />
      </path>
      <line x1="10" y1="46" x2="14" y2="42" stroke="white" strokeWidth="1" opacity="0.25" />
      <line x1="40" y1="16" x2="40" y2="20" stroke="white" strokeWidth="1" opacity="0.25" />
      <line x1="70" y1="46" x2="66" y2="42" stroke="white" strokeWidth="1" opacity="0.25" />
      <line x1="40" y1="46" x2="16" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="-45 40 46" to="45 40 46" dur="0.9s" fill="freeze" begin="0.3s" calcMode="spline" keySplines="0.4 0 0.2 1" />
      </line>
      <circle cx="40" cy="46" r="4" fill="url(#sc-speed-g)" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none" width="72" height="72" aria-hidden="true">
      <defs>
        <linearGradient id="sc-check-g" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#00C5EC" />
          <stop offset="1" stopColor="#0628FF" />
        </linearGradient>
      </defs>
      <circle cx="36" cy="36" r="30" fill="url(#sc-check-g)" fillOpacity="0.07" />
      <circle
        cx="36" cy="36" r="30"
        stroke="url(#sc-check-g)" strokeWidth="2.5"
        strokeDasharray="189" strokeDashoffset="189"
      >
        <animate attributeName="stroke-dashoffset" values="189;0" dur="0.7s" fill="freeze" begin="0.2s" />
      </circle>
      <path
        d="M22 37 L32 47 L50 27"
        stroke="url(#sc-check-g)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="48" strokeDashoffset="48"
      >
        <animate attributeName="stroke-dashoffset" values="48;0" dur="0.4s" fill="freeze" begin="0.75s" />
      </path>
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 80 60" fill="none" width="80" height="60" aria-hidden="true">
      <defs>
        <linearGradient id="sc-trend-g" x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#0628FF" />
          <stop offset="1" stopColor="#00C5EC" />
        </linearGradient>
      </defs>
      {/* area fill */}
      <path d="M4 50 L22 36 L40 40 L58 18 L74 10 L74 56 L4 56 Z" fill="url(#sc-trend-g)" fillOpacity="0.08" />
      {/* trend line */}
      <path
        d="M4 50 L22 36 L40 40 L58 18 L74 10"
        stroke="url(#sc-trend-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="145" strokeDashoffset="145"
      >
        <animate attributeName="stroke-dashoffset" values="145;0" dur="0.85s" fill="freeze" begin="0.2s" />
      </path>
      {/* arrowhead */}
      <path d="M66 6 L74 10 L70 18" stroke="url(#sc-trend-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="opacity" values="0;1" dur="0.2s" fill="freeze" begin="0.9s" />
      </path>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 72 68" fill="none" width="72" height="68" aria-hidden="true">
      <defs>
        <linearGradient id="sc-star-g" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#00C5EC" />
          <stop offset="1" stopColor="#0628FF" />
        </linearGradient>
      </defs>
      {/* outer glow ring */}
      <circle cx="36" cy="34" r="30" fill="url(#sc-star-g)" fillOpacity="0.05" />
      {/* star path */}
      <path
        d="M36 6 L41.5 22.5 L60 22.5 L45.5 33 L51 49.5 L36 39 L21 49.5 L26.5 33 L12 22.5 L30.5 22.5 Z"
        stroke="url(#sc-star-g)" strokeWidth="2" strokeLinejoin="round"
        fill="url(#sc-star-g)" fillOpacity="0"
        strokeDasharray="165" strokeDashoffset="165"
      >
        <animate attributeName="stroke-dashoffset" values="165;0" dur="0.8s" fill="freeze" begin="0.2s" />
        <animate attributeName="fill-opacity" values="0;0.18" dur="0.4s" fill="freeze" begin="0.85s" />
      </path>
    </svg>
  );
}

function CpuIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none" width="72" height="72" aria-hidden="true">
      <defs>
        <linearGradient id="sc-cpu-g" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#00C5EC" />
          <stop offset="1" stopColor="#0628FF" />
        </linearGradient>
      </defs>
      {/* chip body */}
      <rect x="18" y="18" width="36" height="36" rx="5" stroke="url(#sc-cpu-g)" strokeWidth="2.5"
        fill="url(#sc-cpu-g)" fillOpacity="0.08"
        strokeDasharray="148" strokeDashoffset="148"
      >
        <animate attributeName="stroke-dashoffset" values="148;0" dur="0.7s" fill="freeze" begin="0.15s" />
      </rect>
      {/* inner core */}
      <rect x="26" y="26" width="20" height="20" rx="3" fill="url(#sc-cpu-g)" fillOpacity="0.25" />
      {/* pins left */}
      <line x1="18" y1="27" x2="10" y2="27" stroke="url(#sc-cpu-g)" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="36" x2="10" y2="36" stroke="url(#sc-cpu-g)" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="45" x2="10" y2="45" stroke="url(#sc-cpu-g)" strokeWidth="2" strokeLinecap="round" />
      {/* pins right */}
      <line x1="54" y1="27" x2="62" y2="27" stroke="url(#sc-cpu-g)" strokeWidth="2" strokeLinecap="round" />
      <line x1="54" y1="36" x2="62" y2="36" stroke="url(#sc-cpu-g)" strokeWidth="2" strokeLinecap="round" />
      <line x1="54" y1="45" x2="62" y2="45" stroke="url(#sc-cpu-g)" strokeWidth="2" strokeLinecap="round" />
      {/* pins top */}
      <line x1="27" y1="18" x2="27" y2="10" stroke="url(#sc-cpu-g)" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="18" x2="36" y2="10" stroke="url(#sc-cpu-g)" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="18" x2="45" y2="10" stroke="url(#sc-cpu-g)" strokeWidth="2" strokeLinecap="round" />
      {/* pins bottom */}
      <line x1="27" y1="54" x2="27" y2="62" stroke="url(#sc-cpu-g)" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="54" x2="36" y2="62" stroke="url(#sc-cpu-g)" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="54" x2="45" y2="62" stroke="url(#sc-cpu-g)" strokeWidth="2" strokeLinecap="round" />
      {/* center dot pulse */}
      <circle cx="36" cy="36" r="3.5" fill="url(#sc-cpu-g)">
        <animate attributeName="r" values="3.5;5;3.5" dur="1.8s" repeatCount="indefinite" begin="0.9s" />
        <animate attributeName="fill-opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite" begin="0.9s" />
      </circle>
    </svg>
  );
}

function FlashIcon() {
  return (
    <svg viewBox="0 0 56 80" fill="none" width="56" height="80" aria-hidden="true">
      <defs>
        <linearGradient id="sc-flash-g" x1="0" y1="0" x2="0.3" y2="1">
          <stop stopColor="#00C5EC" />
          <stop offset="1" stopColor="#0628FF" />
        </linearGradient>
      </defs>
      {/* outer glow */}
      <ellipse cx="28" cy="40" rx="18" ry="22" fill="url(#sc-flash-g)" fillOpacity="0.06" />
      {/* bolt */}
      <path
        d="M34 4 L10 44 L27 44 L22 76 L46 36 L29 36 Z"
        stroke="url(#sc-flash-g)" strokeWidth="2.5" strokeLinejoin="round"
        fill="url(#sc-flash-g)" fillOpacity="0"
        strokeDasharray="195" strokeDashoffset="195"
      >
        <animate attributeName="stroke-dashoffset" values="195;0" dur="0.7s" fill="freeze" begin="0.2s" />
        <animate attributeName="fill-opacity" values="0;0.2" dur="0.3s" fill="freeze" begin="0.75s" />
      </path>
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none" width="72" height="72" aria-hidden="true">
      <defs>
        <linearGradient id="sc-target-g" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0628FF" />
          <stop offset="1" stopColor="#00C5EC" />
        </linearGradient>
      </defs>
      <circle cx="36" cy="36" r="30" stroke="url(#sc-target-g)" strokeWidth="1.5" opacity="0.3"
        strokeDasharray="189" strokeDashoffset="189"
      >
        <animate attributeName="stroke-dashoffset" values="189;0" dur="0.45s" fill="freeze" begin="0.1s" />
      </circle>
      <circle cx="36" cy="36" r="20" stroke="url(#sc-target-g)" strokeWidth="2" opacity="0.55"
        strokeDasharray="126" strokeDashoffset="126"
      >
        <animate attributeName="stroke-dashoffset" values="126;0" dur="0.45s" fill="freeze" begin="0.35s" />
      </circle>
      <circle cx="36" cy="36" r="10" stroke="url(#sc-target-g)" strokeWidth="2.5"
        strokeDasharray="63" strokeDashoffset="63"
      >
        <animate attributeName="stroke-dashoffset" values="63;0" dur="0.4s" fill="freeze" begin="0.6s" />
      </circle>
      <circle cx="36" cy="36" r="0" fill="url(#sc-target-g)">
        <animate attributeName="r" values="0;4.5" dur="0.3s" fill="freeze" begin="0.88s" />
      </circle>
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 72 72" fill="none" width="72" height="72" aria-hidden="true">
      <defs>
        <linearGradient id="sc-grid-g" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#00C5EC" />
          <stop offset="1" stopColor="#0628FF" />
        </linearGradient>
      </defs>
      {/* 3 provider boxes, each progressively more filled */}
      <rect x="4" y="14" width="18" height="18" rx="4" stroke="url(#sc-grid-g)" strokeWidth="2" fill="url(#sc-grid-g)" fillOpacity="0">
        <animate attributeName="fill-opacity" values="0;0.15" dur="0.3s" fill="freeze" begin="0.1s" />
        <animate attributeName="opacity" values="0;1" dur="0.3s" fill="freeze" begin="0.1s" />
      </rect>
      <rect x="27" y="14" width="18" height="18" rx="4" stroke="url(#sc-grid-g)" strokeWidth="2" fill="url(#sc-grid-g)" fillOpacity="0">
        <animate attributeName="fill-opacity" values="0;0.4" dur="0.3s" fill="freeze" begin="0.3s" />
        <animate attributeName="opacity" values="0;1" dur="0.3s" fill="freeze" begin="0.3s" />
      </rect>
      <rect x="50" y="14" width="18" height="18" rx="4" stroke="url(#sc-grid-g)" strokeWidth="2" fill="url(#sc-grid-g)" fillOpacity="0">
        <animate attributeName="fill-opacity" values="0;0.8" dur="0.3s" fill="freeze" begin="0.5s" />
        <animate attributeName="opacity" values="0;1" dur="0.3s" fill="freeze" begin="0.5s" />
      </rect>
      {/* connector line */}
      <line x1="4" y1="42" x2="68" y2="42" stroke="url(#sc-grid-g)" strokeWidth="1.5" opacity="0.3" strokeDasharray="5 3" />
      {/* 3 output nodes */}
      <circle cx="13" cy="58" r="9" stroke="url(#sc-grid-g)" strokeWidth="2" fill="url(#sc-grid-g)" fillOpacity="0.12">
        <animate attributeName="opacity" values="0;1" dur="0.25s" fill="freeze" begin="0.65s" />
      </circle>
      <circle cx="36" cy="58" r="9" stroke="url(#sc-grid-g)" strokeWidth="2" fill="url(#sc-grid-g)" fillOpacity="0.35">
        <animate attributeName="opacity" values="0;1" dur="0.25s" fill="freeze" begin="0.8s" />
      </circle>
      <circle cx="59" cy="58" r="9" stroke="url(#sc-grid-g)" strokeWidth="2" fill="url(#sc-grid-g)" fillOpacity="0.65">
        <animate attributeName="opacity" values="0;1" dur="0.25s" fill="freeze" begin="0.95s" />
      </circle>
    </svg>
  );
}

function StatSVG({ type }: { type: StatIconType }) {
  switch (type) {
    case "bars":   return <BarsIcon />;
    case "clock":  return <ClockIcon />;
    case "toggle": return <ToggleIcon />;
    case "shield": return <ShieldIcon />;
    case "speed":  return <SpeedIcon />;
    case "check":  return <CheckIcon />;
    case "trend":  return <TrendIcon />;
    case "star":   return <StarIcon />;
    case "cpu":    return <CpuIcon />;
    case "flash":  return <FlashIcon />;
    case "target": return <TargetIcon />;
    case "grid":   return <GridIcon />;
  }
}

interface ServiceStatsProps {
  stats: StatItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function ServiceStats({
  stats,
  eyebrow = "Proven results",
  title = "Results that build trust",
  description = "The numbers behind the work — measured on real production data, not demos.",
}: ServiceStatsProps) {
  return (
    <section
      className="page-section relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, hsl(var(--foreground)/0.04) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="page-container relative">
        <div className="mx-auto max-w-xl text-center mb-10">
          <Badge variant="secondary" className="mb-3">{eyebrow}</Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.metric + stat.label}
              className="relative rounded-2xl border border-border bg-card overflow-hidden p-6 flex flex-col min-h-[200px]"
            >
              {/* top glow */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-blue-500/[0.09] to-transparent pointer-events-none" />
              {/* icon */}
              <div className="flex items-center justify-center flex-1 py-4 relative">
                <StatSVG type={stat.icon} />
              </div>
              {/* metric */}
              <div>
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent leading-tight">
                  {stat.metric}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
