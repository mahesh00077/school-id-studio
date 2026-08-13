import { createFileRoute, redirect } from "@tanstack/react-router";

/** Convenience alias: /login always resolves to the canonical sign-in route. */
export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    throw redirect({ to: "/auth/login", replace: true });
  },
});
