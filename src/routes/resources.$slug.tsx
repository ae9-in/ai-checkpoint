import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Footer } from "@/components/site/Footer";
import { FinalCTA } from "@/components/site/FinalCTA";
import { articles } from "@/lib/resources";
import { useEffect } from "react";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) {
      throw notFound();
    }
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} — AI CheckPoint` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://www.aicheckpoint.in/resources/${article.slug}`,
        },
      ],
    };
  },
  component: ArticleDetailPage,
});

function ArticleDetailPage() {
  const { article } = Route.useLoaderData();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [article.slug]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": new Date(article.date).toISOString().split('T')[0],
    "author": {
      "@type": "Organization",
      "name": "AI CheckPoint",
      "url": "https://www.aicheckpoint.in/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI CheckPoint",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.aicheckpoint.in/favicon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.aicheckpoint.in/resources/${article.slug}`
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
        "name": "Resources",
        "item": "https://www.aicheckpoint.in/resources"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://www.aicheckpoint.in/resources/${article.slug}`
      }
    ]
  };

  return (
    <main className="relative bg-black text-white font-geist pt-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />
      <Breadcrumbs
        items={[
          { label: "Resources", to: "/resources" },
          { label: article.title, to: `/resources/${article.slug}` }
        ]}
      />

      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-xs font-mono-acc text-soft/40 hover:text-cyan transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            <span>BACK TO RESOURCES</span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-mono-acc text-cyan mb-6">
            <span className="bg-cyan/5 px-2.5 py-0.5 rounded-full border border-cyan/15">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-soft/40">
              <Clock size={12} /> {article.readTime}
            </span>
            <span className="flex items-center gap-1 text-soft/40">
              <Calendar size={12} /> {article.date}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-10 leading-tight">
            {article.title}
          </h1>

          <article className="space-y-6 text-base sm:text-lg text-soft/65 leading-relaxed prose prose-invert max-w-none">
            {article.content.map((p, index) => (
              <p key={index} className="mb-6">
                {p}
              </p>
            ))}
          </article>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
