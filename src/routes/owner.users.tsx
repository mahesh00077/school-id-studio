import { createFileRoute } from "@tanstack/react-router";

import { UsersTablePage } from "@/pages/shared/UsersTablePage";

function RouteComponent() {
  return (
    <UsersTablePage
      title="Users"
      description="All platform users and their assigned roles."
    />
  );
}

export const Route = createFileRoute("/owner/users")({
  head: () => ({
    meta: [
      { title: "Users — IDSuite Owner Portal" },
      { name: "description", content: "Owner, school admin and school staff accounts across all schools." },
      { property: "og:title", content: "Users — IDSuite Owner Portal" },
      { property: "og:description", content: "Owner, school admin and school staff accounts across all schools." },
    ],
  }),
  component: RouteComponent,
});
