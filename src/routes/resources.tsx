import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Footer } from "@/components/site/Footer";
import { FinalCTA } from "@/components/site/FinalCTA";
import { articles } from "@/lib/resources";
import { useEffect } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Business Automation Articles & Blog — AI CheckPoint" },
      {
        name: "description",
        content: "Read articles and guides on implementing artificial intelligence, cost models, operational audits, and workflow automation for small businesses in India.",
      },
      { property: "og:title", content: "Business Automation Articles & Blog — AI CheckPoint" },
      { property: "og:description", content: "Expert guides and resources on business automation, ROI audits, and custom AI tools." },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.aicheckpoint.in/resources",
      },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
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
        "name": "Resources",
        "item": "https://www.aicheckpoint.in/resources"
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
      <Breadcrumbs items={[{ label: "Resources", to: "/resources" }]} />

      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Insights & Resources
            </h1>
            <p className="text-base sm:text-lg text-soft/65 leading-relaxed">
              Step-by-step guides, pricing models, and operational frameworks to help you implement custom AI workflows and save costs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((art) => (
              <div
                key={art.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-surface/30 p-6 hover:border-cyan/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-4 text-xs font-mono-acc text-cyan mb-4">
                    <span className="bg-cyan/5 px-2.5 py-0.5 rounded-full border border-cyan/15">
                      {art.category}
                    </span>
                    <span className="flex items-center gap-1 text-soft/40">
                      <Clock size={12} /> {art.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-display font-bold text-white group-hover:text-cyan transition-colors mb-3 leading-tight">
                    {art.title}
                  </h2>

                  <p className="text-sm text-soft/60 leading-relaxed mb-6">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-soft/40">
                    <Calendar size={12} />
                    <span>{art.date}</span>
                  </div>

                  <Link
                    to={`/resources/${art.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono-acc text-cyan tracking-wider hover:text-white transition-colors"
                  >
                    <span>READ ARTICLE</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
