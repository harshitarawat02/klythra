import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, GlassCard, StatusPill } from "@/components/klythra/shared";
import { Recommendations } from "./recommendations";

export const Route = createFileRoute("/decision-center")({
  head: () => ({
    meta: [
      { title: "Decision Center · Klythra" },
      { name: "description", content: "Central console for reviewing, approving and simulating AI-recommended operational decisions." },
      { property: "og:title", content: "Klythra Decision Center" },
      { property: "og:description", content: "Approve, modify or override AI recommendations." },
    ],
  }),
  component: () => (
    <div className="space-y-6">
      <PageHeader eyebrow="Command" title="Decision Center" description="Approve, modify or override AI recommendations. All decisions are audited against OISD, Factory Act and DGMS." actions={<StatusPill status="warn">1 Pending</StatusPill>} />
      <GlassCard><Recommendations /></GlassCard>
    </div>
  ),
});
