import { createFileRoute } from "@tanstack/react-router";
import { MainframeHero } from "@/components/site/MainframeHero";
import { Loader } from "@/components/fx/Loader";
import { CheckpointIntro } from "@/components/site/CheckpointIntro";
import { LogoLoop } from "@/components/site/LogoLoop";
import { Benefits } from "@/components/site/Benefits";
import { Transformation } from "@/components/site/Transformation";
import { Industries } from "@/components/site/Industries";
import { Timeline } from "@/components/site/Timeline";
import { Stats } from "@/components/site/Stats";
import { Services } from "@/components/site/Services";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Automation & Business Audits for Indian SMBs | AI CheckPoint" },
      {
        name: "description",
        content:
          "AI CheckPoint audits operations and deploys custom AI tools for Indian small businesses. Eliminate operational waste, cut costs, and scale in 48 hours.",
      },
      {
        property: "og:title",
        content: "AI Automation & Business Audits for Indian SMBs | AI CheckPoint",
      },
      {
        property: "og:description",
        content: "Book a free AI operations audit. Founders package setup for ₹2,500.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-black font-geist text-white">
      <Loader />
      <MainframeHero />
      <LogoLoop />
      <CheckpointIntro />
      <Benefits />
      <Transformation />
      <Industries />
      <Timeline />
      <Stats />
      <Services />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
