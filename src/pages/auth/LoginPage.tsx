import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginPage() {
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
              Authentication is handled by the FastAPI backend. This screen is UI structure only.
            </p>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                toast.info("Authentication not connected", {
                  description: "Sign-in will call the FastAPI auth endpoint in the next phase.",
                });
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" autoComplete="current-password" required />
              </div>
              <Button type="submit">Sign in</Button>
            </form>

            <div className="mt-6 grid gap-2 border-t pt-4">
              <p className="text-xs text-muted-foreground">Preview the portals without auth:</p>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link to="/owner/dashboard">Owner portal</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link to="/school/dashboard">School portal</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
