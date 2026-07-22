import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, GlassCard, StatusPill } from "@/components/klythra/shared";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart, ReferenceDot } from "recharts";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Predictive Timeline · Klythra" },
      { name: "description", content: "Forward-looking risk projection across the next 3 hours with color-shifted CRI, reason and confidence at every horizon." },
      { property: "og:title", content: "Klythra Predictive Timeline" },
      { property: "og:description", content: "Predict Compound Risk Index for the next 3 hours." },
    ],
  }),
  component: Timeline,
});

const data = [
  { t: "Now", cri: 0.81, conf: 94, reason: "Gas spike + permit overlap", state: "Critical" },
  { t: "+30m", cri: 0.86, conf: 92, reason: "Ventilation still degraded", state: "Critical" },
  { t: "+60m", cri: 0.72, conf: 89, reason: "Maintenance completes", state: "Elevated" },
  { t: "+90m", cri: 0.55, conf: 87, reason: "Shift change buffer", state: "Elevated" },
  { t: "+120m", cri: 0.38, conf: 85, reason: "Cooling cycle", state: "Safe" },
  { t: "+180m", cri: 0.28, conf: 82, reason: "Normal operations", state: "Safe" },
];

const colorFor = (v: number) =>
  v > 0.7 ? "oklch(0.65 0.24 25)" : v > 0.5 ? "oklch(0.78 0.17 45)" : v > 0.35 ? "oklch(0.78 0.17 75)" : "oklch(0.72 0.18 155)";

function Timeline() {
  const [sel, setSel] = useState(0);
  const p = data[sel];
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Forecast · 180 min horizon" title="Predictive Timeline" description="Klythra projects compound risk trajectory with per-horizon reasoning and confidence." actions={<StatusPill status="warn">Peak +30m</StatusPill>} />

      <GlassCard>
        <div className="h-80">
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="riskArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.24 25)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="oklch(0.72 0.18 155)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="t" stroke="oklch(0.6 0.03 240)" fontSize={12} />
              <YAxis domain={[0, 1]} stroke="oklch(0.6 0.03 240)" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "oklch(0.18 0.03 245)", border: "1px solid oklch(0.35 0.05 245)", borderRadius: 12 }}
                labelStyle={{ color: "oklch(0.82 0.15 210)" }}
              />
              <Area type="monotone" dataKey="cri" stroke="oklch(0.65 0.22 258)" strokeWidth={2.5} fill="url(#riskArea)" />
              <Line type="monotone" dataKey="cri" stroke="oklch(0.82 0.15 210)" strokeWidth={0} dot={{ r: 5, fill: "oklch(0.82 0.15 210)" }} />
              <ReferenceDot x={p.t} y={p.cri} r={8} fill={colorFor(p.cri)} stroke="white" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
          {data.map((d, i) => (
            <button
              key={d.t}
              onClick={() => setSel(i)}
              className={cn(
                "rounded-lg px-3 py-2 text-xs font-mono border transition",
                sel === i ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              <div>{d.t}</div>
              <div className="text-base font-bold" style={{ color: colorFor(d.cri) }}>{d.cri.toFixed(2)}</div>
            </button>
          ))}
        </div>
      </GlassCard>

      <div className="grid md:grid-cols-4 gap-4">
        <GlassCard><Detail l="Projected CRI" v={p.cri.toFixed(2)} c={colorFor(p.cri)} /></GlassCard>
        <GlassCard><Detail l="State" v={p.state} c={colorFor(p.cri)} /></GlassCard>
        <GlassCard><Detail l="Confidence" v={`${p.conf}%`} c="oklch(0.82 0.15 210)" /></GlassCard>
        <GlassCard><Detail l="Reason" v={p.reason} small /></GlassCard>
      </div>
    </div>
  );
}

function Detail({ l, v, c, small }: { l: string; v: string; c?: string; small?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{l}</div>
      <div className={cn("mt-1 font-bold font-display", small ? "text-sm leading-snug" : "text-2xl")} style={{ color: c }}>{v}</div>
    </div>
  );
}
