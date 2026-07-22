import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, GlassCard, StatusPill } from "@/components/klythra/shared";
import { PlantMap } from "@/components/klythra/PlantMap";
import { LiveSignals } from "@/components/klythra/LiveSignals";
import { useState } from "react";

export const Route = createFileRoute("/live-plant")({
  head: () => ({
    meta: [
      { title: "Live Plant · Klythra" },
      { name: "description", content: "Interactive plant floorplan with live sensors, workers, permits and heatmap overlays." },
      { property: "og:title", content: "Klythra Live Plant" },
      { property: "og:description", content: "Real-time plant floorplan." },
    ],
  }),
  component: LivePlant,
});

function LivePlant() {
  const [zone, setZone] = useState("C");
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Real-Time · Sector 4" title="Live Plant" description="Click any zone to open situational context." actions={<StatusPill status="info">8 Zones · 42 Sensors</StatusPill>} />
      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <PlantMap onSelectZone={setZone} />
        </GlassCard>
        <div className="space-y-4">
          <GlassCard>
            <div className="text-xs uppercase tracking-widest text-cyan">Selected</div>
            <h3 className="text-2xl font-bold mt-1">Zone {zone}</h3>
            <div className="mt-2 flex items-center gap-2">
              <StatusPill status={zone === "C" ? "critical" : "warn"}>{zone === "C" ? "Critical" : "Elevated"}</StatusPill>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <Row l="Workers on site" v="4" />
              <Row l="Active permits" v="2 (1 hot work)" />
              <Row l="Gas concentration" v="47 ppm" critical />
              <Row l="Ventilation" v="52%" critical />
              <Row l="Temperature" v="71°C" />
            </div>
          </GlassCard>
          <GlassCard>
            <div className="text-xs uppercase tracking-widest text-cyan mb-2">Live Signals</div>
            <LiveSignals />
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Row({ l, v, critical }: { l: string; v: string; critical?: boolean }) {
  return (
    <div className="flex justify-between items-center border-b border-border/40 pb-1.5 last:border-0">
      <span className="text-muted-foreground">{l}</span>
      <span className={critical ? "text-critical font-semibold font-mono" : "font-mono"}>{v}</span>
    </div>
  );
}
