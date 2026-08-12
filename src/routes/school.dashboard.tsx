import { createFileRoute } from "@tanstack/react-router";

import { SchoolDashboardPage } from "@/pages/school/SchoolDashboardPage";

const RouteComponent = SchoolDashboardPage;

export const Route = createFileRoute("/school/dashboard")({
  head: () => ({
    meta: [
      { title: "School Dashboard — IDSuite ID Card Manager" },
      { name: "description", content: "Credits, assigned designs and recent student ID card generation for your school." },
      { property: "og:title", content: "School Dashboard — IDSuite ID Card Manager" },
      { property: "og:description", content: "Credits, assigned designs and recent student ID card generation for your school." },
    ],
  }),
  component: RouteComponent,
});
