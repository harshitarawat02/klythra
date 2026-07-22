import { useEffect, useState } from "react";
import { Activity, Gauge, Thermometer, Wind, Droplets, FileCheck, Users, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const signals = [
  { key: "gas", label: "Gas (ppm)", icon: Activity, base: 42, range: 8, unit: "", danger: 45 },
  { key: "pressure", label: "Pressure (bar)", icon: Gauge, base: 6.2, range: 0.6, unit: "", danger: 7 },
  { key: "temp", label: "Temperature", icon: Thermometer, base: 68, range: 4, unit: "°C", danger: 75 },
  { key: "vent", label: "Ventilation", icon: Wind, base: 62, range: 6, unit: "%", danger: 55, inverse: true },
  { key: "humidity", label: "Humidity", icon: Droplets, base: 48, range: 5, unit: "%", danger: 100 },
  { key: "permits", label: "Active Permits", icon: FileCheck, base: 14, range: 2, unit: "", danger: 100 },
  { key: "shift", label: "Shift Workers", icon: Users, base: 34, range: 3, unit: "", danger: 100 },
  { key: "maint", label: "Maintenance Ops", icon: Wrench, base: 3, range: 1, unit: "", danger: 100 },
];

export function LiveSignals() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2">
      {signals.map((s, idx) => {
        const noise = Math.sin((tick + idx) * 0.7) * s.range;
        const val = s.base + noise;
        const danger = s.inverse ? val < s.danger : val > s.danger;
        const Icon = s.icon;
        return (
          <div
            key={s.key}
            className={cn(
              "glass rounded-xl p-3 border transition-all",
              danger ? "border-critical/40 shadow-[0_0_16px_-4px_oklch(0.65_0.24_25/0.5)]" : "border-border",
            )}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</span>
              <Icon className={cn("h-3.5 w-3.5", danger ? "text-critical" : "text-cyan")} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-xl font-bold font-mono tabular-nums", danger && "text-critical")}>
                {val.toFixed(s.base < 10 ? 1 : 0)}
              </span>
              <span className="text-[10px] text-muted-foreground">{s.unit}</span>
            </div>
            <SparkBar tick={tick} idx={idx} danger={danger} />
          </div>
        );
      })}
    </div>
  );
}

function SparkBar({ tick, idx, danger }: { tick: number; idx: number; danger: boolean }) {
  const bars = Array.from({ length: 20 }, (_, i) => 20 + Math.abs(Math.sin((tick + idx * 3 + i) * 0.5)) * 60);
  return (
    <div className="flex items-end gap-0.5 h-6 mt-1.5">
      {bars.map((h, i) => (
        <div
          key={i}
          className={cn("flex-1 rounded-sm transition-all", danger ? "bg-critical/70" : "bg-cyan/60")}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
