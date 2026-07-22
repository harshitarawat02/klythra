import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, GlassCard, StatusPill } from "@/components/klythra/shared";
import { Search, Play, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/memory")({
  head: () => ({
    meta: [
      { title: "Industrial Memory · Klythra" },
      { name: "description", content: "Search previous incident patterns and replay how they unfolded across observation, understanding, imagination and action." },
      { property: "og:title", content: "Klythra Industrial Memory" },
      { property: "og:description", content: "Historical incident patterns and safety replays." },
    ],
  }),
  component: Memory,
});

const patterns = [
  { id: 17, title: "Hot work during permit overlap · Refinery-B", similar: 82, date: "12 Mar 2024", factors: ["Permit overlap", "Delayed maintenance", "Poor ventilation"] },
  { id: 22, title: "Compressor failure cascade · Sector 2", similar: 71, date: "04 Aug 2023", factors: ["Pressure spike", "Bearing wear", "Shift handoff error"] },
  { id: 9, title: "Gas leak at loading bay · Terminal-4", similar: 64, date: "27 Nov 2022", factors: ["Valve stuck", "Wind direction", "Late detection"] },
];

const replaySteps = [
  { s: "Observe", d: "Gas sensor G-04 detected 47 ppm at 14:31." },
  { s: "Understand", d: "Correlated with hot work permit HW-4471 in the same enclosure." },
  { s: "Imagine", d: "Projected ignition probability of 74% within 20 minutes." },
  { s: "Recall", d: "Matched Incident Pattern #17 (82% similarity)." },
  { s: "Recommend", d: "Delay hot work 18 min, boost ventilation to 78%." },
  { s: "Human Approval", d: "Awaiting supervisor sign-off." },
  { s: "Audit", d: "Decision recorded against OISD-STD-105." },
];

function Memory() {
  const [openReplay, setOpenReplay] = useState<number | null>(null);
  const [step, setStep] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="History · 2019 → 2026" title="Industrial Memory" description="Every incident becomes a pattern. Every pattern trains the next decision." actions={<StatusPill status="info">217 Patterns</StatusPill>} />

      <GlassCard className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input placeholder="Search patterns, factors, zones…" className="w-full h-11 pl-10 pr-4 rounded-lg bg-input/40 border border-border focus:outline-none focus:border-primary/60" />
        </div>
      </GlassCard>

      <div className="space-y-3">
        {patterns.map((p) => (
          <GlassCard key={p.id} className="p-0 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center gap-4 p-5">
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-cyan">Incident Pattern #{p.id.toString().padStart(2, "0")}</div>
                <h3 className="text-lg font-semibold mt-0.5">{p.title}</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.factors.map((f) => (
                    <span key={f} className="text-[11px] px-2 py-0.5 rounded-full glass border border-border">{f}</span>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber font-display">{p.similar}%</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Similar</div>
              </div>
              <div className="text-xs text-muted-foreground">{p.date}</div>
              <button onClick={() => setOpenReplay(openReplay === p.id ? null : p.id)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/20 border border-primary/40 text-sm font-medium hover:bg-primary/30">
                <Play className="h-3.5 w-3.5" /> View Replay
              </button>
            </div>

            {openReplay === p.id && (
              <div className="border-t border-border p-5 animate-slide-up">
                <div className="text-xs uppercase tracking-widest text-cyan mb-3">Safety Replay</div>
                <ol className="space-y-2">
                  {replaySteps.map((r, i) => (
                    <li key={r.s}>
                      <button onClick={() => setStep(step === i ? null : i)} className="w-full flex items-center gap-3 p-2.5 rounded-lg glass hover:border-primary/40 border border-transparent text-left">
                        <span className="h-6 w-6 rounded-full bg-primary/20 border border-primary/40 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                        <span className="font-semibold flex-1">{r.s}</span>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", step === i && "rotate-180")} />
                      </button>
                      {step === i && <div className="mt-1 ml-9 text-sm text-muted-foreground animate-slide-up">{r.d}</div>}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
