import { createFileRoute } from "@tanstack/react-router";

import { LoginPage } from "@/pages/auth/LoginPage";

const RouteComponent = LoginPage;

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Sign In — IDSuite ID Card Manager" },
      { name: "description", content: "Sign in to the school photo ID card management system." },
      { property: "og:title", content: "Sign In — IDSuite ID Card Manager" },
      { property: "og:description", content: "Sign in to the school photo ID card management system." },
    ],
  }),
  component: RouteComponent,
});
