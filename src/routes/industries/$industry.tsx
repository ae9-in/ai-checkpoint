import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Footer } from "@/components/site/Footer";
import { FinalCTA } from "@/components/site/FinalCTA";
import { useEffect } from "react";
import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import { industries } from "@/lib/industries";
import { getIndustrySlug } from "./index";

// Industry details interface for custom copy
interface IndustryDetail {
  title: string;
  name: string;
  metaTitle: string;
  metaDesc: string;
  primaryKeyword: string;
  paragraphs: string[];
  features: string[];
  valueProp: string;
}

const industryDetails: Record<string, IndustryDetail> = {
  retail: {
    name: "Retail & Supermarkets",
    title: "AI Inventory & Checkout Automation for Retail",
    metaTitle: "AI Solutions for Retail & Supermarkets India | AI CheckPoint",
    metaDesc:
      "Automate retail checkout, inventory management, and predict customer demand. Get a customized retail AI operations audit from AI CheckPoint.",
    primaryKeyword: "AI for retail and supermarkets in India",
    valueProp: "Improve stock accuracy, speed up checkouts, and eliminate lost sales.",
    paragraphs: [
      "Artificial Intelligence is revolutionizing retail and supermarkets across India. With manual inventory counts and stock tracking consuming valuable daily business hours, our specialized AI solutions automate shelf tracking, prevent costly stockouts, and analyze sales patterns to predict customer demand in real-time.",
      "Stop losing customers to slow checkout lines or out-of-stock items. Our automation pipelines integrate directly with standard retail POS systems to streamline operational accuracy, giving your store the same competitive edge as modern ecommerce giants. By deploying automated inventory intelligence, you reduce manual labor and optimize your supply chain.",
    ],
    features: [
      "Real-time AI inventory tracking and automatic low-stock alerts",
      "Automated checkout pipelines to reduce customer wait time",
      "Demand forecasting to buy only what sells and avoid dead stock",
      "Customer purchase pattern analysis for custom promotions",
    ],
  },
  restaurants: {
    name: "Cafes & Restaurants",
    title: "AI Demand Forecasting & Margin Management for Restaurants",
    metaTitle: "AI Solutions for Cafes & Restaurants India | AI CheckPoint",
    metaDesc:
      "Slash food waste and manage recipe margins. Deploy custom order prediction and guest preference AI with AI CheckPoint in 48 hours.",
    primaryKeyword: "AI for cafes and restaurants in India",
    valueProp: "Predict raw ingredient usage, slash food waste, and increase customer retention.",
    paragraphs: [
      "High operational waste and fluctuating ingredient prices eat into cafe and restaurant margins daily. Our custom AI implementation for restaurants automates ingredient forecasting, tracks kitchen waste, and predicts order volumes based on local holidays, weather patterns, and historical sales.",
      "Never run out of bestsellers or overbuy perishable items. We implement customer preference AI to deliver personalized loyalty offers, increase average order value (AOV), and automate bookings and billing, enabling your waitstaff to focus purely on hospitality.",
    ],
    features: [
      "AI-powered ingredient usage and wastage forecasting",
      "Dynamic order prediction models based on trends and events",
      "WhatsApp automated table reservations and menu billing",
      "Customer taste profile tracking to increase repeat visits",
    ],
  },
  healthcare: {
    name: "Medical & Diagnostics",
    title: "AI Administrative Automation for Medical Practices",
    metaTitle: "AI for Medical Clinics & Diagnostics India | AI CheckPoint",
    metaDesc:
      "Automate patient appointments, diagnostic reports, and medical billing. Compliant and secure AI solutions for clinics by AI CheckPoint.",
    primaryKeyword: "AI for clinics and medical centers in India",
    valueProp: "Free up doctors from administrative paperwork and reduce booking errors.",
    paragraphs: [
      "Clerical overhead and administrative friction are major contributors to burnout in diagnostics clinics and medical centers. We deploy custom artificial intelligence solutions that automate patient appointment flows, answer inquiries via voice or text agents, and compile patient records.",
      "By reducing manual data entry, your clinical staff saves hours daily while medical records remain secure and free of human transcription errors. Our tools help diagnostic labs parse and summarize reports automatically, speeding up delivery times.",
    ],
    features: [
      "24/7 AI WhatsApp and voice appointment booking system",
      "Diagnostic report analysis and patient summary generation",
      "Automated insurance verification and billing code check",
      "Patient follow-up and prescription reminder schedules",
    ],
  },
  salons: {
    name: "Salons & Spas",
    title: "AI Booking Agents & Retention Systems for Salons",
    metaTitle: "AI Solutions for Salons & Spas India | AI CheckPoint",
    metaDesc:
      "Automate salon bookings and client retention. Deploy 24/7 WhatsApp AI schedulers and automated marketing campaigns with AI CheckPoint.",
    primaryKeyword: "AI for salons and spas in India",
    valueProp: "Maximize chair occupancy and automate client rebook reminders.",
    paragraphs: [
      "Salons and spas run on client retention and optimal appointment book density. Our AI systems deploy conversational booking agents that handle customer scheduling 24/7 across WhatsApp, social media, and web portals.",
      "We build smart retention pipelines that automatically follow up with past clients, suggest product recommendations based on service histories, and maximize seat occupancy without manual marketing labor. Bring your salon into the digital age.",
    ],
    features: [
      "24/7 conversational AI booking agents for WhatsApp",
      "Automated rebooking reminders sent to past clients",
      "Dynamic pricing models for off-peak hours optimization",
      "AI product recommendation engine for retail items",
    ],
  },
  gyms: {
    name: "Gyms & Fitness",
    title: "AI Membership Retention & Trainer Scheduling for Gyms",
    metaTitle: "AI Solutions for Gyms & Fitness Centers India | AI CheckPoint",
    metaDesc:
      "Spot gym membership churn early. Deploy automated trainer scheduling and membership reactivation campaigns with AI CheckPoint.",
    primaryKeyword: "AI for gyms and fitness centers in India",
    valueProp: "Reduce membership cancellation rates and optimize trainer utility.",
    paragraphs: [
      "Member retention is the single most critical health metric for any Indian gym or fitness studio. Our custom membership AI analyzes gym check-in patterns, detects members at risk of churning, and triggers automated reactivation campaigns before they cancel.",
      "Additionally, automated trainer scheduling tools balance client bookings with trainer availability, reducing administrative overhead and maximizing monthly recurring revenues from personal training packages.",
    ],
    features: [
      "AI churn prediction analytics based on attendance frequency",
      "Automated WhatsApp member check-ins and motivation messages",
      "Smart trainer scheduling to minimize empty class slots",
      "Automated fee payment reminders and subscription renewals",
    ],
  },
  education: {
    name: "Schools & Coaching",
    title: "AI Student Analytics & Administration for Education",
    metaTitle: "AI for Schools & Coaching Institutes India | AI CheckPoint",
    metaDesc:
      "Reduce teacher administrative burden. Automate school attendance, student performance analytics, and fee collections using AI.",
    primaryKeyword: "AI for schools and coaching institutes in India",
    valueProp: "Automate fee collections, student performance tracking, and grading admin.",
    paragraphs: [
      "Educational institutions spend too much time managing fees, grading papers, and recording attendance. Our educational AI implementations automate attendance tracking using smart scanning, provide performance analytics for teachers to identify struggling students, and manage automated fee collection reminders.",
      "Free your teachers to focus on student mentorship instead of spreadsheet management. We help coaching centers automate query responses for prospective students, improving admissions conversions.",
    ],
    features: [
      "Automated student attendance tracking via facial scan",
      "AI performance analytics to highlight learning gaps",
      "Automated fee collection reminders and payment receipts",
      "Instant WhatsApp query answering for admissions leads",
    ],
  },
  "real-estate": {
    name: "Real Estate",
    title: "AI Lead Scoring & Automated Document Flow for Real Estate",
    metaTitle: "AI Solutions for Real Estate Agents India | AI CheckPoint",
    metaDesc:
      "Score real estate leads, match property listings, and automate agreement drafting with custom AI systems from AI CheckPoint.",
    primaryKeyword: "AI for real estate agents in India",
    valueProp: "Score hot leads instantly and automate property match documents.",
    paragraphs: [
      "Real estate agents spend hours sorting cold leads and drafting paperwork. Our real estate AI solutions score incoming leads automatically based on buyer intent, match client requirements with available property databases instantly, and generate legal draft agreements using automated document pipelines.",
      "Close deals faster and never miss a follow-up. Our conversational bots pre-qualify house hunters, setting up physical tours only for high-intent buyers, freeing up broker time.",
    ],
    features: [
      "AI lead qualification and automated buyer profiling",
      "Instant property-to-client matching recommendation engines",
      "Automated contract and draft agreement generation",
      "Smart follow-up follow scheduling for site visits",
    ],
  },
  logistics: {
    name: "Logistics & Delivery",
    title: "AI Route Optimization & Dispatch for Logistics",
    metaTitle: "AI for Logistics & Delivery Companies India | AI CheckPoint",
    metaDesc:
      "Optimize delivery routes, automate dispatching, and compute accurate ETAs. Reduce logistics overhead with AI CheckPoint systems.",
    primaryKeyword: "AI for logistics and delivery in India",
    valueProp: "Reduce fuel costs, optimize delivery routes, and automate dispatch.",
    paragraphs: [
      "Inefficiency in routing and dispatch is costly. Our AI logistics platforms optimize delivery routes in real-time, matching traffic patterns and package weights to reduce fuel costs.",
      "Automated dispatch systems match drivers with optimal cargo configurations, calculating precise ETA updates for customers and eliminating logistics friction completely. Maximize fleet utility and lower turnaround times.",
    ],
    features: [
      "Real-time dynamic route optimization engines",
      "Automated fleet dispatching and driver allocation",
      "Precise predictive ETA calculators for end-clients",
      "AI inventory and warehouse asset allocation tools",
    ],
  },
  manufacturing: {
    name: "Manufacturing",
    title: "AI Predictive Maintenance & Quality Control for Factories",
    metaTitle: "AI for Manufacturing & Factories India | AI CheckPoint",
    metaDesc:
      "Deploy computer vision quality control and predictive maintenance models on your factory floor with AI CheckPoint.",
    primaryKeyword: "AI for manufacturing plants and factories in India",
    valueProp: "Minimize assembly line downtime and catch material defects early.",
    paragraphs: [
      "Factory downtime and manufacturing defects can cost lakhs in seconds. We deploy computer vision AI for automated quality control on assembly lines, and predictive maintenance models that alert operators before equipment failures occur.",
      "Keep your factory running at maximum throughput with data-driven supply chain tracking. Our integrations help track raw material levels and automate restocking orders.",
    ],
    features: [
      "Computer vision systems for instant defect detection",
      "Predictive analytics to estimate machine maintenance cycles",
      "Automated raw material supply chain monitoring",
      "Factory floor safety compliance monitoring via AI",
    ],
  },
  corporate: {
    name: "Corporate Companies",
    title: "AI Process Optimization & HR Automation for Corporates",
    metaTitle: "Corporate AI & HR Process Automation India | AI CheckPoint",
    metaDesc:
      "Automate HR tasks, route support tickets, and build custom data analytics dashboards with AI CheckPoint corporate systems.",
    primaryKeyword: "AI for corporate offices and enterprises in India",
    valueProp: "Automate internal employee ticketing and simplify financial reporting.",
    paragraphs: [
      "Administrative silos slow down corporate productivity. Our custom AI agents automate routine HR operations, generate real-time financial reporting dashboards, and route internal support tickets to the appropriate teams.",
      "Scale your corporate operations without linearly increasing headcounts. We implement smart email-sorting algorithms and document summaries to streamline executive decisions.",
    ],
    features: [
      "Automated HR ticket answering and onboarding flows",
      "AI financial data extraction and reporting dashboards",
      "Smart email parsing and automated meeting transcripts",
      "Internal ticket routing and escalation systems",
    ],
  },
};

export const Route = createFileRoute("/industries/$industry")({
  loader: ({ params }) => {
    const details = industryDetails[params.industry];
    if (!details) {
      throw notFound();
    }
    return { details, slug: params.industry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { details } = loaderData;
    return {
      meta: [
        { title: details.metaTitle },
        { name: "description", content: details.metaDesc },
        { property: "og:title", content: details.metaTitle },
        { property: "og:description", content: details.valueProp },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://www.aicheckpoint.in/industries/${loaderData.slug}`,
        },
      ],
    };
  },
  component: IndustryDetailPage,
});

function IndustryDetailPage() {
  const { details, slug } = Route.useLoaderData();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: details.title,
    provider: {
      "@type": "Organization",
      name: "AI CheckPoint",
      url: "https://www.aicheckpoint.in/",
    },
    description: details.valueProp,
    serviceType: details.name,
    areaServed: "IN",
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
        name: "Industries",
        item: "https://www.aicheckpoint.in/industries",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: details.name,
        item: `https://www.aicheckpoint.in/industries/${slug}`,
      },
    ],
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
      <Breadcrumbs
        items={[
          { label: "Industries", to: "/industries" },
          { label: details.name, to: `/industries/${slug}` },
        ]}
      />

      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Glow ambient background elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo/5 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-cyan/5 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-4xl px-6 relative z-10">
          <div className="mb-8">
            <span className="font-mono-acc text-xs uppercase tracking-widest text-cyan px-3 py-1 rounded-full bg-cyan/5 border border-cyan/15">
              Industry Vertical Solutions
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            {details.title}
          </h1>

          <p className="text-xl text-soft/80 font-medium mb-12 border-l-2 border-cyan pl-6 italic">
            "{details.valueProp}"
          </p>

          <div className="space-y-8 text-base sm:text-lg text-soft/65 leading-relaxed">
            {details.paragraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>

          <div className="my-16 bg-surface/30 border border-white/5 rounded-3xl p-8 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-white mb-6">
              Key Automation Offerings
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {details.features.map((feat) => (
                <div key={feat} className="flex gap-3 items-start text-sm text-soft/80">
                  <CheckCircle2 size={18} className="text-cyan mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-8">
            <h3 className="text-xl font-display font-semibold text-white mb-4">
              Ready to automate your {details.name.toLowerCase()} operations?
            </h3>
            <p className="text-sm text-soft/50 mb-8 max-w-lg mx-auto">
              Schedule your free operations audit today. We'll identify bottlenecks and design your
              custom AI integration.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-gradient-primary text-void font-semibold rounded-full px-8 py-4 hover:scale-[1.03] transition-transform text-base shadow-lg shadow-indigo/25"
            >
              Book Free AI Audit Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
