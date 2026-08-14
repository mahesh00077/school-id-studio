import { Outlet, createFileRoute } from "@tanstack/react-router";

import { PortalLayout } from "@/components/layouts/PortalLayout";
import { OWNER_NAV } from "@/components/layouts/nav-config";
import { SessionProvider } from "@/hooks/useSession";

export const Route = createFileRoute("/owner")({
  component: OwnerLayout,
});

function OwnerLayout() {
  return (
    <SessionProvider initialRole="OWNER">
      <PortalLayout title="Owner portal" nav={OWNER_NAV}>
        <Outlet />
      </PortalLayout>
    </SessionProvider>
  );
}
