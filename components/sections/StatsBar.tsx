import { TrendingUp, CheckCircle2, Layers, Clock } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "3.5+", label: "Years in Production" },
  { icon: CheckCircle2, value: "30+", label: "Products Shipped" },
  { icon: Layers, value: "15+", label: "Businesses Served" },
  { icon: Clock, value: "100%", label: "On-Time Delivery" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="page-container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 shrink-0">
                <Icon className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold tracking-tight">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
