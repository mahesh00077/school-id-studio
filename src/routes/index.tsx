import { Link, createFileRoute } from "@tanstack/react-router";
import { Building2, IdCard, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TITLE = "IDSuite — School Photo ID Card Management System";
const DESCRIPTION =
  "Manage schools, users, credits and card designs, and generate student photo ID cards from one lightweight admin platform.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-16">
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            Secure sign-in · FastAPI session authentication
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            School Photo ID Card Management System
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            {DESCRIPTION}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <Building2 className="size-5 text-primary" />
              <h2 className="mt-3 text-base font-semibold">Owner portal</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Schools, users, designs, credits, history and platform settings.
              </p>
              <Button asChild className="mt-4 w-full">
                <Link to="/auth/login">Sign in to owner portal</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <IdCard className="size-5 text-primary" />
              <h2 className="mt-3 text-base font-semibold">School portal</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Credits, assigned designs, ID card generation and history.
              </p>
              <Button asChild className="mt-4 w-full">
                <Link to="/auth/login">Sign in to school portal</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/auth/login" className="underline underline-offset-4">
            Go to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
