import { useNavigate } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AuthLoading } from "@/components/auth/RequireAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/hooks/useSession";
import { ApiError } from "@/services/api";
import { dashboardPathForRole, login as loginRequest } from "@/services/auth";

export function LoginPage() {
  const { user, loading, refreshSession } = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already signed in? Go straight to the dashboard for the backend role.
  useEffect(() => {
    if (!loading && user) {
      void navigate({ to: dashboardPathForRole(user.role), replace: true });
    }
  }, [loading, user, navigate]);

  if (loading || user) return <AuthLoading />;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const authenticated = await loginRequest(email, password);
      // Re-read the session from the backend so state always mirrors /auth/me.
      await refreshSession();
      await navigate({ to: dashboardPathForRole(authenticated.role), replace: true });
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Unable to reach the server. Try again.";
      toast.error("Sign in failed", { description: message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2">
          <ShieldCheck className="size-5 text-primary" />
          <span className="text-base font-semibold tracking-tight">IDSuite</span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sign in</CardTitle>
            <p className="text-sm text-muted-foreground">
              Use your IDSuite account. Your session is kept in a secure cookie.
            </p>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={submitting}>
                {submitting ? <Loader2 className="size-4 animate-spin" /> : null}
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
