import { createFileRoute } from "@tanstack/react-router";

import { DesignsPage } from "@/pages/shared/DesignsPage";

function RouteComponent() {
  return (
    <DesignsPage
      title="Card designs"
      description="Design templates available for assignment to schools."
    />
  );
}

export const Route = createFileRoute("/owner/designs")({
  head: () => ({
    meta: [
      { title: "ID Card Designs — IDSuite Owner Portal" },
      { name: "description", content: "Card design library and the schools each design is assigned to." },
      { property: "og:title", content: "ID Card Designs — IDSuite Owner Portal" },
      { property: "og:description", content: "Card design library and the schools each design is assigned to." },
    ],
  }),
  component: RouteComponent,
});
