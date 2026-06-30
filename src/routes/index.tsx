import { createFileRoute } from "@tanstack/react-router";
import { MainframeHero } from "@/components/site/MainframeHero";
import { Loader } from "@/components/fx/Loader";
import { CheckpointIntro } from "@/components/site/CheckpointIntro";
import { LogoLoop } from "@/components/site/LogoLoop";
import { Benefits } from "@/components/site/Benefits";
import { Industries } from "@/components/site/Industries";
import { Timeline } from "@/components/site/Timeline";
import { Stats } from "@/components/site/Stats";
import { Pricing } from "@/components/site/Pricing";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI CheckPoint — AI for Every Indian Business" },
      {
        name: "description",
        content:
          "We audit your operations and deploy custom AI — save costs, eliminate inefficiency, and stay ahead of the competition. Founders package ₹2,500.",
      },
      { property: "og:title", content: "AI CheckPoint — AI for Every Indian Business" },
      {
        property: "og:description",
        content: "Free AI audit + ₹2,500 founders package. Setup in 48 hours.",
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
      <Industries />
      <Timeline />
      <Stats />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
