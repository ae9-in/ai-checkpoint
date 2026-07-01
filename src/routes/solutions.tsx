import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Benefits } from "@/components/site/Benefits";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { useEffect } from "react";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "AI Automation Solutions for Businesses — AI CheckPoint" },
      {
        name: "description",
        content: "Discover how AI CheckPoint eliminates operational waste, automates repetitive workflows, and reduces costs for Indian businesses. Secure your custom AI roadmap.",
      },
      { property: "og:title", content: "AI Automation Solutions for Businesses — AI CheckPoint" },
      { property: "og:description", content: "Cut costs, increase accuracy, and outpace competition with tailored AI solutions." },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.aicheckpoint.in/solutions",
      },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Implementation and Operations Optimization",
    "provider": {
      "@type": "Organization",
      "name": "AI CheckPoint",
      "url": "https://www.aicheckpoint.in/"
    },
    "description": "We audit your business processes and deploy automated custom AI systems to cut operational costs and labor waste.",
    "areaServed": "IN"
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
        "name": "Solutions",
        "item": "https://www.aicheckpoint.in/solutions"
      }
    ]
  };

  return (
    <main className="relative bg-black text-white font-geist pt-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />
      <Breadcrumbs items={[{ label: "Solutions", to: "/solutions" }]} />
      <Benefits />
      <FinalCTA />
      <Footer />
    </main>
  );
}
