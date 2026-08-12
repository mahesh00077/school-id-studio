import { createFileRoute } from "@tanstack/react-router";

import { OwnerDashboardPage } from "@/pages/owner/OwnerDashboardPage";

const RouteComponent = OwnerDashboardPage;

export const Route = createFileRoute("/owner/dashboard")({
  head: () => ({
    meta: [
      { title: "Owner Dashboard — IDSuite ID Card Manager" },
      { name: "description", content: "Platform overview of schools, users, credits and generated student photo ID cards." },
      { property: "og:title", content: "Owner Dashboard — IDSuite ID Card Manager" },
      { property: "og:description", content: "Platform overview of schools, users, credits and generated student photo ID cards." },
    ],
  }),
  component: RouteComponent,
});
