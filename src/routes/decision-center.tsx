import { createFileRoute } from "@tanstack/react-router";
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
  component: Recommendations,
});
