import { createFileRoute } from "@tanstack/react-router";
import { AuthUI } from "@/components/ui/auth-fuse";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign In — AI CheckPoint" },
      { name: "description", content: "Access your AI CheckPoint dashboard or create a new account to book audits." },
    ],
  }),
});

function LoginPage() {
  return <AuthUI />;
}
