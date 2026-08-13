import { Outlet, createFileRoute } from "@tanstack/react-router";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { PortalLayout } from "@/components/layouts/PortalLayout";
import { OWNER_NAV } from "@/components/layouts/nav-config";

export const Route = createFileRoute("/owner")({
  component: OwnerLayout,
});

function OwnerLayout() {
  return (
    <RequireAuth roles={["OWNER"]}>
      <PortalLayout title="Owner portal" nav={OWNER_NAV}>
        <Outlet />
      </PortalLayout>
    </RequireAuth>
  );
}
