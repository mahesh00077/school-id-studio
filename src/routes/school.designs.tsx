import { createFileRoute } from "@tanstack/react-router";

import { DesignsPage } from "@/pages/shared/DesignsPage";

function RouteComponent() {
  return (
    <DesignsPage
      title="Assigned designs"
      description="Designs your school can use when generating ID cards."
      schoolId="sch_001"
    />
  );
}

export const Route = createFileRoute("/school/designs")({
  head: () => ({
    meta: [
      { title: "Assigned Designs — IDSuite School Portal" },
      { name: "description", content: "Card design templates assigned to your school for student ID generation." },
      { property: "og:title", content: "Assigned Designs — IDSuite School Portal" },
      { property: "og:description", content: "Card design templates assigned to your school for student ID generation." },
    ],
  }),
  component: RouteComponent,
});
