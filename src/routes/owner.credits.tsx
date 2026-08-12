import { createFileRoute } from "@tanstack/react-router";

import { OwnerCreditsPage } from "@/pages/owner/OwnerCreditsPage";

const RouteComponent = OwnerCreditsPage;

export const Route = createFileRoute("/owner/credits")({
  head: () => ({
    meta: [
      { title: "Credits — IDSuite Owner Portal" },
      { name: "description", content: "Credit balances per school and the full allocation and deduction ledger." },
      { property: "og:title", content: "Credits — IDSuite Owner Portal" },
      { property: "og:description", content: "Credit balances per school and the full allocation and deduction ledger." },
    ],
  }),
  component: RouteComponent,
});
