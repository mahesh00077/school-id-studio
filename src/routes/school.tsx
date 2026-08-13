import { Outlet, createFileRoute } from "@tanstack/react-router";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { PortalLayout } from "@/components/layouts/PortalLayout";
import { SCHOOL_NAV } from "@/components/layouts/nav-config";
import { useSession } from "@/hooks/useSession";

export const Route = createFileRoute("/school")({
  component: SchoolLayout,
});

function SchoolNav() {
  const { user } = useSession();
  const nav = SCHOOL_NAV.filter((item) => (user ? item.roles.includes(user.role) : false));
  return (
    <PortalLayout title="School portal" nav={nav}>
      <Outlet />
    </PortalLayout>
  );
}

function SchoolLayout() {
  return (
    <RequireAuth roles={["SCHOOL_ADMIN", "SCHOOL_STAFF"]}>
      <SchoolNav />
    </RequireAuth>
  );
}
