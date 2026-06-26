import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/ui/footer-section";

export const Route = createFileRoute("/demo")({
  component: DemoPage,
});

function DemoPage() {
  return (
    <div className="relative flex min-h-svh flex-col bg-black text-white">
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="font-mono text-2xl font-bold text-cyan animate-pulse">Scroll Down!</h1>
      </div>
      <Footer />
    </div>
  );
}
