import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, PageHeader, StatusPill } from "@/components/klythra/shared";
import { RiskGauge, CountUp } from "@/components/klythra/RiskGauge";
import { PlantMap } from "@/components/klythra/PlantMap";
import { LiveSignals } from "@/components/klythra/LiveSignals";
import { TrendingDown, Shield, FileWarning, Zap, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Klythra" },
      { name: "description", content: "Operational Health, Compound Risk Index, live signals, and AI-driven decisions across every zone." },
      { property: "og:title", content: "Klythra Dashboard" },
      { property: "og:description", content: "Operational Health & Compound Risk overview." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Command Center · 22 Jul 2026 · 14:32 IST"
        title="Operational Intelligence"
        description="Klythra is monitoring 8 zones, 12 sensors, 14 permits and 3 maintenance operations in real time."
        actions={<StatusPill status="warn">Elevated Risk</StatusPill>}
      />

      {/* Hero */}
      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 pointer-events-none"
               style={{ background: "radial-gradient(circle at 70% 30%, oklch(0.78 0.17 75 / 0.25), transparent 60%)" }} />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Operational Health</div>
              <div className="flex items-baseline gap-4 mt-2">
                <span className="text-7xl font-bold font-display text-amber"><CountUp value={78} /></span>
                <div className="text-sm text-amber flex items-center gap-1"><TrendingDown className="h-4 w-4" /> Declining</div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground max-w-md">
                Operational Health declining due to increasing Safety Debt in Zone C. Compound risk drivers detected across 3 subsystems.
              </p>
              <div className="mt-4 flex gap-2">
                <Link to="/recommendations" className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg bg-primary text-primary-foreground glow-primary">
                  View recommendation <ChevronRight className="h-4 w-4" />
                </Link>
                <Link to="/live-plant" className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg glass border border-border">
                  Inspect Zone C
                </Link>
              </div>
            </div>
            <div className="ml-auto"><RiskGauge value={0.81} /></div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-xs uppercase tracking-widest text-cyan mb-3">Decision Score</div>
          <div className="space-y-3">
            {[
              { l: "Safety Score", v: "82%", c: "text-emerald" },
              { l: "Operational Impact", v: "2.8%", c: "text-amber" },
              { l: "Compliance", v: "OISD ✓", c: "text-emerald" },
              { l: "Confidence", v: "94%", c: "text-cyan" },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between border-b border-border/40 pb-2 last:border-0">
                <span className="text-sm text-muted-foreground">{r.l}</span>
                <span className={`text-lg font-semibold font-mono ${r.c}`}>{r.v}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            <div className="font-semibold text-foreground mb-1">Reasoning</div>
            <ul className="space-y-1">
              <li>· High gas concentration</li>
              <li>· Permit overlap</li>
              <li>· Ventilation drop</li>
              <li>· Maintenance activity</li>
            </ul>
          </div>
        </GlassCard>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Compound Risk Index", v: 0.81, sub: "+0.14 vs 1h", icon: Zap, tone: "critical" as const, dec: 2 },
          { l: "Safety Debt", v: 27, sub: "Open items", icon: Shield, tone: "warn" as const, dec: 0, suffix: "" },
          { l: "Active Permits", v: 14, sub: "3 hot work", icon: FileWarning, tone: "info" as const, dec: 0 },
          { l: "Critical Zones", v: 1, sub: "Zone C", icon: TrendingDown, tone: "critical" as const, dec: 0 },
        ].map((k) => {
          const Icon = k.icon;
          const toneMap = { critical: "text-critical", warn: "text-amber", info: "text-cyan", safe: "text-emerald" };
          return (
            <GlassCard key={k.l} interactive className="p-5">
              <div className="flex items-start justify-between">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k.l}</div>
                <Icon className={`h-4 w-4 ${toneMap[k.tone]}`} />
              </div>
              <div className={`mt-2 text-3xl font-bold font-display ${toneMap[k.tone]}`}>
                <CountUp value={k.v} decimals={k.dec} suffix={k.suffix ?? ""} />
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">{k.sub}</div>
            </GlassCard>
          );
        })}
      </div>

      {/* Map + Signals */}
      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-cyan">Live Plant Map</div>
              <h3 className="text-lg font-semibold mt-0.5">North Refinery · Sector 4</h3>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill status="safe">6 Safe</StatusPill>
              <StatusPill status="warn">2 Elevated</StatusPill>
              <StatusPill status="critical">1 Critical</StatusPill>
            </div>
          </div>
          <PlantMap />
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs uppercase tracking-widest text-cyan">Live Signals</div>
            <span className="text-[10px] text-emerald flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" /> Streaming
            </span>
          </div>
          <LiveSignals />
        </GlassCard>
      </div>
    </div>
  );
}
