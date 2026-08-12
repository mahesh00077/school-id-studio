import { createFileRoute } from "@tanstack/react-router";

import { OwnerSchoolsPage } from "@/pages/owner/OwnerSchoolsPage";

const RouteComponent = OwnerSchoolsPage;

export const Route = createFileRoute("/owner/schools")({
  head: () => ({
    meta: [
      { title: "Schools — IDSuite Owner Portal" },
      { name: "description", content: "Manage every school onboarded to the ID card platform, with credits and status." },
      { property: "og:title", content: "Schools — IDSuite Owner Portal" },
      { property: "og:description", content: "Manage every school onboarded to the ID card platform, with credits and status." },
    ],
  }),
  component: RouteComponent,
});
