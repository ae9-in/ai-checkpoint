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
      { title: "Pricing & Founders Package — AI CheckPoint" },
      {
        name: "description",
        content: "Transparent pricing for Indian SMBs. Grab our Founders Special Offer at ₹2,500 (Value ₹5,000). Get started with an operations audit in 48 hours.",
      },
      { property: "og:title", content: "Pricing & Founders Package — AI CheckPoint" },
      { property: "og:description", content: "₹2,500 Founders Special Offer (Value ₹5,000). Save ₹2,500 today." },
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
    "@type": "Product",
    "name": "AI Audit & Implementation Package - Founders Offer",
    "image": "https://www.aicheckpoint.in/favicon.png",
    "description": "Comprehensive AI audit, custom roadmap, setup, training, and 1 month of support.",
    "offers": {
      "@type": "Offer",
      "price": "2500",
      "priceCurrency": "INR",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "url": "https://www.aicheckpoint.in/pricing"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.aicheckpoint.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Pricing",
        "item": "https://www.aicheckpoint.in/pricing"
      }
    ]
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
