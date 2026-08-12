import { Outlet, createFileRoute } from "@tanstack/react-router";

import { PortalLayout } from "@/components/layouts/PortalLayout";
import { SCHOOL_NAV } from "@/components/layouts/nav-config";
import { SessionProvider } from "@/hooks/useSession";

export const Route = createFileRoute("/school")({
  component: SchoolLayout,
});

function SchoolLayout() {
  return (
    <SessionProvider initialRole="SCHOOL_ADMIN">
      <PortalLayout title="School portal" nav={SCHOOL_NAV}>
        <Outlet />
      </PortalLayout>
    </SessionProvider>
  );
}
