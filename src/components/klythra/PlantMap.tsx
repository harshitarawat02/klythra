import { useEffect, useState } from "react";
import { AlertTriangle, Users, Wrench, FileCheck, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

type Zone = {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  risk: "safe" | "warn" | "critical";
  workers: number;
};

const zones: Zone[] = [
  { id: "A", name: "Zone A · Storage", x: 4, y: 6, w: 28, h: 34, risk: "safe", workers: 3 },
  { id: "B", name: "Zone B · Processing", x: 34, y: 6, w: 32, h: 34, risk: "warn", workers: 8 },
  { id: "C", name: "Zone C · Hot Work", x: 68, y: 6, w: 28, h: 40, risk: "critical", workers: 4 },
  { id: "D", name: "Zone D · Utilities", x: 4, y: 42, w: 24, h: 30, risk: "safe", workers: 2 },
  { id: "E", name: "Zone E · Control Room", x: 30, y: 42, w: 22, h: 30, risk: "safe", workers: 5 },
  { id: "F", name: "Zone F · Loading Bay", x: 54, y: 48, w: 42, h: 24, risk: "warn", workers: 6 },
  { id: "G", name: "Zone G · Compressor", x: 4, y: 74, w: 40, h: 22, risk: "warn", workers: 3 },
  { id: "H", name: "Zone H · Yard", x: 46, y: 74, w: 50, h: 22, risk: "safe", workers: 4 },
];

const zoneColor = (r: Zone["risk"]) =>
  r === "critical" ? "oklch(0.65 0.24 25)" : r === "warn" ? "oklch(0.78 0.17 75)" : "oklch(0.72 0.18 155)";

export function PlantMap({ compact = false, onSelectZone }: { compact?: boolean; onSelectZone?: (z: string) => void }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(i);
  }, []);

  return (
    <div className={cn("relative w-full grid-bg rounded-xl overflow-hidden border border-border", compact ? "h-[360px]" : "h-[520px]")}>
      {/* scan line */}
      <div
        className="pointer-events-none absolute left-0 right-0 h-24 opacity-30"
        style={{
          top: `${(tick * 7) % 100}%`,
          background: "linear-gradient(180deg, transparent, oklch(0.82 0.15 210 / 0.25), transparent)",
        }}
      />

      {zones.map((z) => (
        <button
          key={z.id}
          onClick={() => onSelectZone?.(z.id)}
          className="absolute rounded-lg border transition-all hover:scale-[1.02] text-left group"
          style={{
            left: `${z.x}%`,
            top: `${z.y}%`,
            width: `${z.w}%`,
            height: `${z.h}%`,
            borderColor: `${zoneColor(z.risk)}`,
            background: `linear-gradient(135deg, ${zoneColor(z.risk)}22, ${zoneColor(z.risk)}08)`,
            boxShadow: z.risk === "critical" ? `0 0 32px ${zoneColor(z.risk)}66, inset 0 0 40px ${zoneColor(z.risk)}22` : `inset 0 0 20px ${zoneColor(z.risk)}18`,
          }}
        >
          <div className="p-2 flex flex-col h-full justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest opacity-70">Zone {z.id}</div>
              <div className="text-xs font-semibold">{z.name.split("· ")[1]}</div>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 opacity-80">
                <Users className="h-3 w-3" /> {z.workers}
              </span>
              {z.risk === "critical" && (
                <span className="flex items-center gap-1 text-critical font-semibold">
                  <AlertTriangle className="h-3 w-3" /> HOT
                </span>
              )}
            </div>
          </div>

          {/* pulsing sensor */}
          <span
            className="absolute top-1 right-1 h-2 w-2 rounded-full animate-pulse-glow"
            style={{ background: zoneColor(z.risk), boxShadow: `0 0 12px ${zoneColor(z.risk)}` }}
          />
          {z.risk === "critical" && (
            <span
              className="absolute top-1 right-1 h-2 w-2 rounded-full animate-pulse-ring"
              style={{ background: zoneColor(z.risk) }}
            />
          )}
        </button>
      ))}

      {/* icons floating */}
      <div className="absolute bottom-3 left-3 flex gap-3 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><Wind className="h-3 w-3 text-cyan" /> Ventilation</span>
        <span className="flex items-center gap-1"><Wrench className="h-3 w-3 text-amber" /> Maintenance</span>
        <span className="flex items-center gap-1"><FileCheck className="h-3 w-3 text-emerald" /> Permits</span>
      </div>

      {/* worker dots moving */}
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan glow-cyan transition-all duration-1500"
          style={{
            left: `${20 + ((tick + i * 13) % 60)}%`,
            top: `${30 + ((tick * 3 + i * 21) % 40)}%`,
            transition: "all 1.5s ease-in-out",
          }}
        />
      ))}
    </div>
  );
}
