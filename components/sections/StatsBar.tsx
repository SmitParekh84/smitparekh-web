"use client";

import { TrendingUp, CheckCircle2, Layers, Clock } from "lucide-react";
import { StaggerGrid, StaggerItem } from "@/components/ui/motion";

const stats = [
  { icon: TrendingUp, value: "4+", label: "Years in Production" },
  { icon: CheckCircle2, value: "30+", label: "Products Shipped" },
  { icon: Layers, value: "15+", label: "Happy Clients" },
  { icon: Clock, value: "0", label: "Missed Deadlines" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="page-container py-10">
        <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-8" delay={0.1}>
          {stats.map(({ icon: Icon, value, label }) => (
            <StaggerItem key={label}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 shrink-0">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold tracking-tight">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
