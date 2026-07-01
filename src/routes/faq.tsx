import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { FAQ } from "@/components/site/FAQ";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { useEffect } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — AI CheckPoint" },
      {
        name: "description",
        content: "Find answers to common questions about our AI audits, setup process, pricing (₹2,500 package), staff training, maintenance, and cancellation policies.",
      },
      { property: "og:title", content: "Frequently Asked Questions — AI CheckPoint" },
      { property: "og:description", content: "How AI CheckPoint works, integration time, staff training, and pricing details." },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.aicheckpoint.in/faq",
      },
    ],
  }),
  component: FAQPage,
});

const faqs = [
  {
    q: "What exactly does AI CheckPoint do for my business?",
    a: "We audit your current operations, identify bottlenecks and waste, then implement AI tools tailored to your workflow — from inventory to billing to customer service.",
  },
  {
    q: "Do I need any tech knowledge or team?",
    a: "Not at all. We handle setup end-to-end and train your existing staff. You don't need to hire anyone or learn anything technical.",
  },
  {
    q: "How long does setup take?",
    a: "Most businesses are fully running within 48 hours of approving the AI roadmap. Complex industries (manufacturing, logistics) can take up to a week.",
  },
  {
    q: "What industries do you serve?",
    a: "Retail, healthcare, real estate, restaurants, gyms, schools, logistics, manufacturing, corporate — and any business with operations that can be optimized.",
  },
  {
    q: "How will my staff be trained?",
    a: "We provide both in-person sessions and recorded video walkthroughs. Staff usually feel comfortable with the new tools within 2-3 days.",
  },
  {
    q: "Is ₹2,500 a one-time or recurring cost?",
    a: "₹2,500 is a one-time setup cost. Optional monthly maintenance subscriptions are available if you want continuous optimization and support.",
  },
  {
    q: "What happens if AI updates change my tools?",
    a: "We monitor updates and roll them in safely. If you're on a maintenance plan, this is included. Otherwise we offer affordable update sessions.",
  },
  {
    q: "Can I cancel or get a refund?",
    a: "If we can't deliver value during the audit, we refund 100%. After implementation, we work with you until the agreed outcomes are met.",
  },
];

function FAQPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
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
        "name": "FAQ",
        "item": "https://www.aicheckpoint.in/faq"
      }
    ]
  };

  return (
    <main className="relative bg-black text-white font-geist pt-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />
      <Breadcrumbs items={[{ label: "FAQ", to: "/faq" }]} />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
