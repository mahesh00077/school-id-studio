import { createFileRoute } from "@tanstack/react-router";

import { OwnerSettingsPage } from "@/pages/owner/OwnerSettingsPage";

const RouteComponent = OwnerSettingsPage;

export const Route = createFileRoute("/owner/settings")({
  head: () => ({
    meta: [
      { title: "Settings — IDSuite Owner Portal" },
      { name: "description", content: "Platform configuration and API connection details for the ID card system." },
      { property: "og:title", content: "Settings — IDSuite Owner Portal" },
      { property: "og:description", content: "Platform configuration and API connection details for the ID card system." },
    ],
  }),
  component: RouteComponent,
});
