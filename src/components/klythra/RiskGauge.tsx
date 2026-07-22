import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function RiskGauge({ value = 0.81, label = "Compound Risk Index" }: { value?: number; label?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 1200;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setDisplay(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const R = 80;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - display);

  const color =
    display < 0.4
      ? "oklch(0.72 0.18 155)"
      : display < 0.7
        ? "oklch(0.78 0.17 75)"
        : "oklch(0.65 0.24 25)";

  const status = display < 0.4 ? "Safe" : display < 0.7 ? "Elevated" : "Critical";

  return (
    <div className="relative flex flex-col items-center">
      <svg width="200" height="200" className="-rotate-90 drop-shadow-[0_0_20px_oklch(0.65_0.22_258/0.3)]">
        <defs>
          <linearGradient id="gaugeGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.82 0.15 210)" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={R} stroke="oklch(0.3 0.04 245 / 0.4)" strokeWidth="14" fill="none" />
        <circle
          cx="100"
          cy="100"
          r={R}
          stroke="url(#gaugeGrad)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.1s linear", filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold font-display" style={{ color }}>
          {display.toFixed(2)}
        </div>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
        <div className={cn("mt-1 text-xs font-semibold")} style={{ color }}>
          {status}
        </div>
      </div>
    </div>
  );
}

export function CountUp({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 900;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <span>
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}
