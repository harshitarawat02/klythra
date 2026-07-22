import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, GlassCard, StatusPill } from "@/components/klythra/shared";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/simulation")({
  head: () => ({
    meta: [
      { title: "Simulation Lab · Klythra" },
      { name: "description", content: "Simulate operational scenarios and compare risk, production impact, safety improvement and AI confidence." },
      { property: "og:title", content: "Klythra Simulation Lab" },
      { property: "og:description", content: "Run scenario simulations for operational decisions." },
    ],
  }),
  component: Sim,
});

const scenarios = [
  { name: "Continue Operations", risk: 0.86, impact: 0, safety: -12, conf: 91, winner: false, tone: "critical" as const },
  { name: "Delay Operation", risk: 0.32, impact: -2.8, safety: 74, conf: 94, winner: true, tone: "safe" as const },
  { name: "Increase Ventilation", risk: 0.48, impact: -0.9, safety: 48, conf: 88, winner: false, tone: "warn" as const },
];

function Sim() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="What-if · Zone C" title="Scenario Simulation" description="Compare projected outcomes across three operational strategies." actions={<StatusPill status="info">3 Scenarios</StatusPill>} />
      <div className="grid md:grid-cols-3 gap-6">
        {scenarios.map((s) => (
          <GlassCard key={s.name} interactive className={cn("relative overflow-hidden", s.winner && "border-emerald/50 glow-primary")}>
            {s.winner && (
              <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] uppercase tracking-widest bg-emerald/20 text-emerald border border-emerald/40 px-2 py-1 rounded-full">
                <Trophy className="h-3 w-3" /> Recommended
              </div>
            )}
            <h3 className="text-lg font-bold">{s.name}</h3>
            <div className="mt-4 space-y-3">
              <Metric l="Risk (CRI)" v={s.risk.toFixed(2)} tone={s.risk > 0.7 ? "text-critical" : s.risk > 0.4 ? "text-amber" : "text-emerald"} />
              <Metric l="Production Impact" v={`${s.impact}%`} tone={s.impact < 0 ? "text-amber" : "text-emerald"} />
              <Metric l="Safety Improvement" v={`${s.safety > 0 ? "+" : ""}${s.safety}%`} tone={s.safety > 0 ? "text-emerald" : "text-critical"} />
              <Metric l="Confidence" v={`${s.conf}%`} tone="text-cyan" />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function Metric({ l, v, tone }: { l: string; v: string; tone: string }) {
  return (
    <div className="flex justify-between border-b border-border/30 pb-2 last:border-0">
      <span className="text-sm text-muted-foreground">{l}</span>
      <span className={cn("font-bold font-mono", tone)}>{v}</span>
    </div>
  );
}
