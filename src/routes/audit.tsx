import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, GlassCard, StatusPill } from "@/components/klythra/shared";
import { Search, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit Logs · Klythra" },
      { name: "description", content: "Enterprise audit trail of every AI recommendation, human decision and compliance mapping." },
      { property: "og:title", content: "Klythra Audit Logs" },
      { property: "og:description", content: "Full decision audit trail." },
    ],
  }),
  component: Audit,
});

const rows = [
  { t: "14:32:04", d: "Delay Hot Work · Zone C", s: "A. Rao", c: 94, st: "Pending", tone: "warn", r: "Gas + permit overlap" },
  { t: "13:58:12", d: "Approve Maintenance M-882", s: "S. Iyer", c: 91, st: "Approved", tone: "safe", r: "Wear detected on bearing" },
  { t: "12:44:39", d: "Override Ventilation boost", s: "A. Rao", c: 88, st: "Overridden", tone: "critical", r: "Manual field call" },
  { t: "11:20:11", d: "Approve Shift Extension", s: "R. Verma", c: 82, st: "Approved", tone: "safe", r: "Coverage gap" },
  { t: "09:12:07", d: "Reject Permit HW-4468", s: "A. Rao", c: 96, st: "Rejected", tone: "critical", r: "Conflicting maintenance" },
] as const;

const toneClass: Record<string, string> = {
  safe: "bg-emerald/15 text-emerald border-emerald/30",
  warn: "bg-amber/15 text-amber border-amber/30",
  critical: "bg-critical/15 text-critical border-critical/30",
};

function Audit() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Records · Immutable" title="Audit Log" description="Every AI-assisted decision is signed, timestamped and mapped to regulation." actions={
        <>
          <button className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg glass border border-border"><Download className="h-3.5 w-3.5" /> CSV</button>
          <button className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg glass border border-border"><FileText className="h-3.5 w-3.5" /> PDF</button>
        </>
      } />
      <GlassCard>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search decisions, supervisors…" className="w-full h-10 pl-10 pr-4 rounded-lg bg-input/40 border border-border focus:outline-none focus:border-primary/60" />
          </div>
          <select className="h-10 px-3 rounded-lg bg-input/40 border border-border text-sm">
            <option>All statuses</option><option>Pending</option><option>Approved</option><option>Overridden</option><option>Rejected</option>
          </select>
          <select className="h-10 px-3 rounded-lg bg-input/40 border border-border text-sm">
            <option>Last 24 hours</option><option>Last 7 days</option><option>Last 30 days</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="py-3 pr-4">Timestamp</th>
                <th className="pr-4">Decision</th>
                <th className="pr-4">Supervisor</th>
                <th className="pr-4">Confidence</th>
                <th className="pr-4">Status</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.t} className="border-b border-border/40 hover:bg-accent/30 transition">
                  <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{r.t}</td>
                  <td className="pr-4 font-medium">{r.d}</td>
                  <td className="pr-4 text-muted-foreground">{r.s}</td>
                  <td className="pr-4 font-mono">{r.c}%</td>
                  <td className="pr-4"><span className={cn("text-[11px] px-2 py-1 rounded-full border", toneClass[r.tone])}>{r.st}</span></td>
                  <td className="text-muted-foreground text-xs">{r.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
