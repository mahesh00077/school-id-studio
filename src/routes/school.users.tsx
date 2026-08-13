import { createFileRoute } from "@tanstack/react-router";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { UsersTablePage } from "@/pages/shared/UsersTablePage";

function RouteComponent() {
  return (
    <RequireAuth roles={["SCHOOL_ADMIN"]}>
      <UsersTablePage
        title="School users"
        description="Admins and staff who can access this school portal."
        schoolId="sch_001"
      />
    </RequireAuth>
  );
}


export const Route = createFileRoute("/school/users")({
  head: () => ({
    meta: [
      { title: "School Users — IDSuite School Portal" },
      { name: "description", content: "School admin and staff accounts with access to ID card generation." },
      { property: "og:title", content: "School Users — IDSuite School Portal" },
      { property: "og:description", content: "School admin and staff accounts with access to ID card generation." },
    ],
  }),
  component: RouteComponent,
});
