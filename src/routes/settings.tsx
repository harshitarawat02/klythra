import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, GlassCard } from "@/components/klythra/shared";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · Klythra" },
      { name: "description", content: "Configure thresholds, notifications, integrations and roles." },
      { property: "og:title", content: "Klythra Settings" },
      { property: "og:description", content: "Configure the platform." },
    ],
  }),
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Configuration" title="Settings" description="Configure risk thresholds, notifications and integrations." />
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="font-semibold mb-3">Risk Thresholds</h3>
          {["Compound Risk trigger", "Gas concentration (ppm)", "Ventilation floor (%)", "Confidence minimum"].map((l, i) => (
            <div key={l} className="flex items-center justify-between border-b border-border/40 py-2.5 last:border-0">
              <span className="text-sm text-muted-foreground">{l}</span>
              <input defaultValue={[0.7, 40, 65, 85][i]} className="w-24 h-8 px-2 rounded-md bg-input/40 border border-border text-right font-mono text-sm" />
            </div>
          ))}
        </GlassCard>
        <GlassCard>
          <h3 className="font-semibold mb-3">Integrations</h3>
          {[
            { n: "SCADA · Honeywell", s: "Connected" },
            { n: "Permit-to-Work System", s: "Connected" },
            { n: "Maintenance CMMS", s: "Connected" },
            { n: "IoT Gas Sensors (12)", s: "Streaming" },
          ].map((i) => (
            <div key={i.n} className="flex items-center justify-between border-b border-border/40 py-2.5 last:border-0">
              <span className="text-sm">{i.n}</span>
              <span className="text-xs text-emerald flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-glow" /> {i.s}
              </span>
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
