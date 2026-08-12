import { createFileRoute } from "@tanstack/react-router";

import { CreateIdCardPage } from "@/pages/school/CreateIdCardPage";

const RouteComponent = CreateIdCardPage;

export const Route = createFileRoute("/school/id-cards/create")({
  head: () => ({
    meta: [
      { title: "Generate ID Card — IDSuite School Portal" },
      { name: "description", content: "Guided flow to select a design, add student details and generate a photo ID card." },
      { property: "og:title", content: "Generate ID Card — IDSuite School Portal" },
      { property: "og:description", content: "Guided flow to select a design, add student details and generate a photo ID card." },
    ],
  }),
  component: RouteComponent,
});
