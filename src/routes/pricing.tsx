import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Pricing } from "@/components/site/Pricing";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { useEffect } from "react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Engagement — AI CheckPoint" },
      {
        name: "description",
        content:
          "Transparent, value-driven AI implementation for Indian SMBs. Start with a free operations audit and get started in 48 hours.",
      },
      { property: "og:title", content: "Pricing & Engagement — AI CheckPoint" },
      {
        property: "og:description",
        content: "Audit-first AI implementation tailored to your operational scale.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.aicheckpoint.in/pricing",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Audit & Implementation Services",
    image: "https://www.aicheckpoint.in/favicon.png",
    description: "Comprehensive AI audit, custom roadmap, setup, training, and ongoing support.",
    provider: {
      "@type": "Organization",
      name: "AI CheckPoint",
      url: "https://www.aicheckpoint.in/",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.aicheckpoint.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pricing",
        item: "https://www.aicheckpoint.in/pricing",
      },
    ],
  };

  return (
    <main className="relative bg-black text-white font-geist pt-[72px]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />
      <Breadcrumbs items={[{ label: "Pricing", to: "/pricing" }]} />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
