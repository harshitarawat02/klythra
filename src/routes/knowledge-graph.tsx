import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, GlassCard, StatusPill } from "@/components/klythra/shared";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/knowledge-graph")({
  head: () => ({
    meta: [
      { title: "Knowledge Graph · Klythra" },
      { name: "description", content: "Interactive graph of equipment, workers, permits, sensors, maintenance, hazards, supervisors and compliance rules." },
      { property: "og:title", content: "Klythra Knowledge Graph" },
      { property: "og:description", content: "Explore relationships across the industrial safety network." },
    ],
  }),
  component: KG,
});

type Node = { id: string; label: string; type: string; x: number; y: number; color: string };
const N: Node[] = [
  { id: "eq1", label: "Reactor R-12", type: "Equipment", x: 50, y: 45, color: "oklch(0.65 0.22 258)" },
  { id: "w1", label: "Worker · Suresh", type: "Worker", x: 22, y: 25, color: "oklch(0.82 0.15 210)" },
  { id: "w2", label: "Worker · Anita", type: "Worker", x: 78, y: 22, color: "oklch(0.82 0.15 210)" },
  { id: "p1", label: "HW-4471", type: "Permit", x: 22, y: 65, color: "oklch(0.72 0.18 155)" },
  { id: "s1", label: "Gas Sensor G-04", type: "Sensor", x: 78, y: 68, color: "oklch(0.78 0.17 75)" },
  { id: "m1", label: "Maint. M-882", type: "Maintenance", x: 12, y: 45, color: "oklch(0.78 0.17 75)" },
  { id: "h1", label: "Hot Work Hazard", type: "Hazard", x: 88, y: 45, color: "oklch(0.65 0.24 25)" },
  { id: "sv1", label: "Supervisor · A. Rao", type: "Supervisor", x: 50, y: 15, color: "oklch(0.75 0.16 210)" },
  { id: "c1", label: "OISD-STD-105", type: "Rule", x: 50, y: 82, color: "oklch(0.72 0.18 155)" },
];

const E: Array<[string, string]> = [
  ["eq1", "w1"], ["eq1", "w2"], ["eq1", "p1"], ["eq1", "s1"], ["eq1", "m1"], ["eq1", "h1"], ["eq1", "sv1"], ["eq1", "c1"],
  ["p1", "c1"], ["s1", "h1"], ["m1", "p1"],
];

function KG() {
  const [sel, setSel] = useState("eq1");
  const n = N.find((x) => x.id === sel)!;
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Ontology" title="Knowledge Graph" description="Every operational entity linked. Click a node to explore relationships." actions={<StatusPill status="info">9 Nodes · 11 Edges</StatusPill>} />
      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <div className="relative h-[520px] grid-bg rounded-xl overflow-hidden border border-border">
            <svg className="absolute inset-0 w-full h-full">
              {E.map(([a, b], i) => {
                const na = N.find((x) => x.id === a)!;
                const nb = N.find((x) => x.id === b)!;
                const active = sel === a || sel === b;
                return (
                  <line
                    key={i}
                    x1={`${na.x}%`}
                    y1={`${na.y}%`}
                    x2={`${nb.x}%`}
                    y2={`${nb.y}%`}
                    stroke={active ? "oklch(0.82 0.15 210)" : "oklch(0.4 0.05 245 / 0.5)"}
                    strokeWidth={active ? 1.5 : 1}
                    strokeDasharray={active ? "0" : "4 4"}
                  />
                );
              })}
            </svg>
            {N.map((node) => (
              <button
                key={node.id}
                onClick={() => setSel(node.id)}
                className={cn("absolute -translate-x-1/2 -translate-y-1/2 group", sel === node.id && "z-10")}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div
                  className={cn(
                    "rounded-full border-2 transition-all",
                    sel === node.id ? "h-14 w-14 animate-pulse-glow" : "h-10 w-10 group-hover:scale-110",
                  )}
                  style={{ background: `${node.color}33`, borderColor: node.color, boxShadow: `0 0 20px ${node.color}66` }}
                />
                <div className="mt-1 text-[10px] font-medium whitespace-nowrap text-center">{node.label}</div>
              </button>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <div className="text-xs uppercase tracking-widest text-cyan">Selected node</div>
          <h3 className="text-xl font-bold mt-1">{n.label}</h3>
          <div className="text-xs text-muted-foreground mt-1">{n.type}</div>
          <div className="mt-4 text-xs uppercase tracking-widest text-cyan mb-2">Relationships</div>
          <ul className="space-y-1.5 text-sm">
            {E.filter(([a, b]) => a === n.id || b === n.id).map(([a, b], i) => {
              const other = N.find((x) => x.id === (a === n.id ? b : a))!;
              return (
                <li key={i} className="flex items-center gap-2 glass rounded-lg px-2.5 py-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: other.color }} />
                  <span>{other.label}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground">{other.type}</span>
                </li>
              );
            })}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
