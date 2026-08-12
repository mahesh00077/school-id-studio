import { createFileRoute } from "@tanstack/react-router";

import { IdCardsTablePage } from "@/pages/shared/IdCardsTablePage";

function RouteComponent() {
  return (
    <IdCardsTablePage
      title="Generation history"
      description="Every generation attempt made by your school."
      schoolId="sch_001"
    />
  );
}

export const Route = createFileRoute("/school/history")({
  head: () => ({
    meta: [
      { title: "Generation History — IDSuite School Portal" },
      { name: "description", content: "Chronological record of every ID card your school has generated." },
      { property: "og:title", content: "Generation History — IDSuite School Portal" },
      { property: "og:description", content: "Chronological record of every ID card your school has generated." },
    ],
  }),
  component: RouteComponent,
});
