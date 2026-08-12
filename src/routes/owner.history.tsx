import { createFileRoute } from "@tanstack/react-router";

import { IdCardsTablePage } from "@/pages/shared/IdCardsTablePage";

function RouteComponent() {
  return (
    <IdCardsTablePage
      title="Generation history"
      description="All ID cards generated across the platform."
      showSchoolColumn
    />
  );
}

export const Route = createFileRoute("/owner/history")({
  head: () => ({
    meta: [
      { title: "Generation History — IDSuite Owner Portal" },
      { name: "description", content: "Every student photo ID card generated across all schools on the platform." },
      { property: "og:title", content: "Generation History — IDSuite Owner Portal" },
      { property: "og:description", content: "Every student photo ID card generated across all schools on the platform." },
    ],
  }),
  component: RouteComponent,
});
