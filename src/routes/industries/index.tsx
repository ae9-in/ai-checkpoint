import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Footer } from "@/components/site/Footer";
import { FinalCTA } from "@/components/site/FinalCTA";
import { industries } from "@/lib/industries";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "AI Solutions by Industry — AI CheckPoint" },
      {
        name: "description",
        content: "Explore tailored AI solutions for Indian businesses across retail, restaurants, medical, spas, gyms, education, real estate, logistics, and manufacturing.",
      },
      { property: "og:title", content: "AI Solutions by Industry — AI CheckPoint" },
      { property: "og:description", content: "Custom operational audits and AI automation engineered specifically for your industry vertical." },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.aicheckpoint.in/industries",
      },
    ],
  }),
  component: IndustriesIndexPage,
});

// Map industry name to url slug
export function getIndustrySlug(name: string): string {
  const mapping: Record<string, string> = {
    "Retail & Supermarkets": "retail",
    "Cafes & Restaurants": "restaurants",
    "Medical & Diagnostics": "healthcare",
    "Salons & Spas": "salons",
    "Gyms & Fitness": "gyms",
    "Schools & Coaching": "education",
    "Real Estate": "real-estate",
    "Logistics & Delivery": "logistics",
    "Manufacturing": "manufacturing",
    "Corporate Companies": "corporate",
  };
  return mapping[name] || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function IndustriesIndexPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

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
        "name": "Industries",
        "item": "https://www.aicheckpoint.in/industries"
      }
    ]
  };

  return (
    <main className="relative bg-black text-white font-geist pt-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />
      <Breadcrumbs items={[{ label: "Industries", to: "/industries" }]} />

      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              AI Solutions Custom Built for <span className="bg-gradient-to-r from-cyan via-indigo to-gold bg-clip-text text-transparent">Your Industry</span>
            </h1>
            <p className="text-base sm:text-lg text-soft/65 leading-relaxed">
              Generic tools fail. We design, audit, and deploy custom artificial intelligence integrations that respect the unique constraints and operations of your specific business vertical.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => {
              const Icon = ind.icon;
              const slug = getIndustrySlug(ind.name);
              return (
                <Link
                  key={ind.name}
                  to={`/industries/${slug}`}
                  className="group relative overflow-hidden rounded-3xl border border-white/5 bg-surface/40 p-8 hover:border-cyan/30 transition-all duration-300 flex flex-col justify-between min-h-[280px]"
                >
                  {/* Subtle Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-cyan group-hover:bg-white group-hover:text-black transition-colors duration-300 flex items-center justify-center">
                        <Icon size={22} />
                      </div>
                      <h2 className="text-xl font-display font-bold text-white group-hover:text-cyan transition-colors">
                        {ind.name}
                      </h2>
                    </div>
                    <p className="text-sm text-soft/60 leading-relaxed mb-6">
                      {ind.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono-acc text-cyan tracking-wider">
                    <span>EXPLORE SOLUTIONS</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
