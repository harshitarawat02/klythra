import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, GlassCard, StatusPill } from "@/components/klythra/shared";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance · Klythra" },
      { name: "description", content: "Automatic mapping of every recommendation to OISD, Factory Act and DGMS regulations." },
      { property: "og:title", content: "Klythra Compliance" },
      { property: "og:description", content: "Regulatory compliance mapping." },
    ],
  }),
  component: Comp,
});

const frameworks = [
  {
    code: "OISD", name: "Oil Industry Safety Directorate", coverage: 96,
    rules: [
      { r: "OISD-STD-105 · Hot work permits", ok: true },
      { r: "OISD-STD-116 · Fire protection", ok: true },
      { r: "OISD-STD-144 · Gas monitoring", ok: true },
      { r: "OISD-STD-118 · Ventilation", ok: false },
    ],
  },
  {
    code: "Factory Act", name: "The Factories Act 1948", coverage: 100,
    rules: [
      { r: "§21 · Fencing of machinery", ok: true },
      { r: "§36 · Precautions in confined spaces", ok: true },
      { r: "§41B · On-site emergency plan", ok: true },
    ],
  },
  {
    code: "DGMS", name: "Directorate General of Mines Safety", coverage: 88,
    rules: [
      { r: "DGMS Circular 05/2015", ok: true },
      { r: "DGMS Tech Circular 11/2019", ok: false },
      { r: "DGMS Safety Bulletin 03/2021", ok: true },
    ],
  },
];

function Comp() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Regulatory" title="Compliance Center" description="Every AI recommendation is auto-mapped to the underlying regulation." actions={<StatusPill status="warn">2 Violations</StatusPill>} />
      <div className="grid md:grid-cols-3 gap-6">
        {frameworks.map((f) => (
          <GlassCard key={f.code}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-cyan">{f.code}</div>
                <h3 className="text-lg font-bold mt-0.5">{f.name}</h3>
              </div>
              <div className={cn("text-2xl font-bold font-display", f.coverage === 100 ? "text-emerald" : f.coverage >= 90 ? "text-amber" : "text-critical")}>{f.coverage}%</div>
            </div>
            <div className="mt-4 space-y-1.5">
              {f.rules.map((r) => (
                <div key={r.r} className="flex items-center gap-2 text-sm border-b border-border/30 pb-1.5 last:border-0">
                  <span className={cn("h-5 w-5 rounded-full flex items-center justify-center", r.ok ? "bg-emerald/20 text-emerald" : "bg-critical/20 text-critical")}>
                    {r.ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  </span>
                  <span className={cn(r.ok ? "text-muted-foreground" : "text-critical")}>{r.r}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
