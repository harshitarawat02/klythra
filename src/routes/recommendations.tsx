import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, GlassCard, StatusPill } from "@/components/klythra/shared";
import { RiskGauge } from "@/components/klythra/RiskGauge";
import { AlertTriangle, Check, Pencil, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recommendations")({
  head: () => ({
    meta: [
      { title: "AI Recommendations · Klythra" },
      { name: "description", content: "Live safest-action recommendations with reasoning, five-question explanation, and human approval flow." },
      { property: "og:title", content: "Klythra AI Recommendations" },
      { property: "og:description", content: "AI recommendations with reasoning and approval." },
    ],
  }),
  component: Recommendations,
});

const qs = [
  { q: "Is it Safe?", a: "No. Current Compound Risk Index is 0.81 (Critical). Executing hot work at this moment carries a 74% probability of triggering a Level-2 gas event within 20 minutes." },
  { q: "Why?", a: "Gas concentration in Zone C reached 47ppm (threshold 40). Ventilation dropped to 52% (min 65%). Permit HW-4471 overlaps maintenance ticket M-882 in the same enclosure. 4 workers within blast radius." },
  { q: "What happens if ignored?", a: "Predicted outcome: gas ignition risk peaks at T+18 min. Estimated impact: 2 injuries (severe), 8-hour production halt, ₹42L loss, OISD-STD-105 violation logged." },
  { q: "Safest Alternative?", a: "Delay hot work 18 minutes, boost ventilation to 78%, complete M-882 first. Reduces CRI to 0.32, keeps production impact under 2.8%." },
  { q: "How confident is the AI?", a: "94% confidence · derived from 217 comparable historical events (2019-2026), 12 live signals, and 4 corroborating pattern matches in Industrial Memory." },
];

export function Recommendations() {
  const [confirm, setConfirm] = useState<null | string>(null);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="AI Recommendation · T+00:00" title="Decision Recommendation" description="Klythra's safest-action recommendation for the current operational state." actions={<StatusPill status="critical">Action Required</StatusPill>} />

      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 relative overflow-hidden border-critical/40">
          <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: "radial-gradient(circle at 20% 20%, oklch(0.65 0.24 25 / 0.35), transparent 60%)" }} />
          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-critical/20 border border-critical/40 flex items-center justify-center glow-danger">
                <AlertTriangle className="h-6 w-6 text-critical" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-critical">Priority · High</div>
                <h2 className="text-2xl font-bold mt-1">Delay Hot Work Operation</h2>
                <p className="text-sm text-muted-foreground mt-1">Zone C · Permit HW-4471 · Recommended by Klythra AI</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { l: "Risk Reduction", v: "74%", tone: "text-emerald" },
                { l: "Expected Delay", v: "18 min", tone: "text-amber" },
                { l: "Confidence", v: "94%", tone: "text-cyan" },
              ].map((s) => (
                <div key={s.l} className="glass rounded-xl p-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
                  <div className={cn("text-2xl font-bold font-display mt-1", s.tone)}>{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest text-cyan mb-2">Reason</div>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                {["Gas concentration rising", "Ventilation below threshold", "Permit overlaps maintenance", "Nearby workers detected"].map((r) => (
                  <li key={r} className="flex items-center gap-2 glass rounded-lg px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-critical animate-pulse-glow" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button onClick={() => setConfirm("Approve")} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald text-background font-semibold hover:opacity-90"><Check className="h-4 w-4" /> Approve</button>
              <button onClick={() => setConfirm("Modify")} className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border font-semibold"><Pencil className="h-4 w-4" /> Modify</button>
              <button onClick={() => setConfirm("Override")} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-critical/50 text-critical font-semibold hover:bg-critical/10"><X className="h-4 w-4" /> Override</button>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col items-center justify-center">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Current CRI</div>
          <RiskGauge value={0.81} />
          <div className="mt-4 text-center text-xs text-muted-foreground">
            After recommended action: <span className="text-emerald font-semibold">0.32</span>
          </div>
        </GlassCard>
      </div>

      {/* Five questions */}
      <div>
        <div className="text-xs uppercase tracking-widest text-cyan mb-3">Five Question Explanation</div>
        <div className="space-y-2">
          {qs.map((q, i) => (
            <GlassCard key={q.q} className="p-0 overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-lg bg-primary/20 border border-primary/40 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="font-semibold">{q.q}</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open === i && "rotate-180")} />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed animate-slide-up">{q.a}</div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setConfirm(null)}>
          <div className="glass-strong rounded-2xl p-6 max-w-md w-full animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold">Confirm: {confirm}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              You are about to <span className="text-foreground font-semibold">{confirm.toLowerCase()}</span> the AI recommendation to delay hot work in Zone C. This action will be recorded in the audit log and mapped to OISD-STD-105.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setConfirm(null)} className="px-4 py-2 rounded-lg glass border border-border text-sm">Cancel</button>
              <button onClick={() => setConfirm(null)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold glow-primary">Confirm {confirm}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
