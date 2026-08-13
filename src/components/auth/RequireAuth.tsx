/**
 * Client-side route guard.
 *
 * The route itself verifies the session (from GET /api/auth/me) before any
 * protected UI renders. Navigation hiding is cosmetic only — this component is
 * the frontend enforcement point. The backend remains the real authority.
 */

import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, type ReactNode } from "react";

import { useSession } from "@/hooks/useSession";
import { dashboardPathForRole, type BackendRole } from "@/services/auth";

export function AuthLoading({ label = "Checking your session…" }: { label?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        {label}
      </div>
    </div>
  );
}

export function RequireAuth({
  roles,
  children,
}: {
  roles: BackendRole[];
  children: ReactNode;
}) {
  const { user, loading } = useSession();
  const navigate = useNavigate();

  const allowed = user !== null && roles.includes(user.role);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      void navigate({ to: "/auth/login", replace: true });
      return;
    }
    if (!allowed) {
      // Authenticated but wrong role — send to their own dashboard, never loop.
      void navigate({ to: dashboardPathForRole(user.role), replace: true });
    }
  }, [loading, user, allowed, navigate]);

  if (loading) return <AuthLoading />;
  if (!allowed) return <AuthLoading label="Redirecting…" />;

  return <>{children}</>;
}
