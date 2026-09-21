import { GraduationCap, Globe, Workflow, Users, Sparkles, type LucideIcon } from "lucide-react";

export type Service = {
  id: string; // stable slug, used for DOM ids / aria-controls
  index: string; // "01".."05"
  icon: LucideIcon;
  title: string;
  description: string;
  chips: string[];
  image: string; // verified Unsplash URL or local SVG
  alt: string;
  imagePosition?: string; // e.g. "50% 22%" for dashboard focal alignment
  dimClosed?: number; // custom brightness for closed state (e.g. 0.62 for vector UI)
  accent?: "gold"; // panel 05 only
  cta?: { label: string; to: string };
};

export const services: Service[] = [
  {
    id: "ai-courses",
    index: "01",
    icon: GraduationCap,
    title: "AI Courses",
    description:
      "Practical, business-first AI training for you and your team — no jargon, no theory detours.",
    chips: ["Team workshops", "Self-paced modules", "Hands-on projects"],
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern collaborative training workshop with laptops and ambient lighting",
  },
  {
    id: "websites",
    index: "02",
    icon: Globe,
    title: "Websites",
    description: "Fast, search-ready websites that are built to convert, not just to look good.",
    chips: ["Design to launch", "SEO built in", "Performance tuned"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern workspace with code editor and website development setup",
  },
  {
    id: "ai-automations",
    index: "03",
    icon: Workflow,
    title: "AI Automations",
    description:
      "We find the repetitive work inside your business and hand it to AI that actually runs.",
    chips: ["Workflow automation", "Chat & voice agents", "Document processing"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    alt: "Dark futuristic computing hardware and automated circuit processing",
  },
  {
    id: "crms",
    index: "04",
    icon: Users,
    title: "CRMs",
    description: "Lead capture to closed deal, in one system your sales team will actually open.",
    chips: ["Lead pipelines", "Dashboards", "Integrations"],
    image: "/services/crm-dashboard.svg",
    alt: "A dark CRM dashboard showing pipeline value, deal stages and a revenue trend",
    imagePosition: "50% 22%",
    dimClosed: 0.62,
  },
  {
    id: "anything-else",
    index: "05",
    icon: Sparkles,
    title: "Anything Else in Tech",
    description:
      "Got a requirement that doesn't fit a box? Tell us what you need and we will build it.",
    chips: ["Custom builds", "Integrations", "Tell us your idea"],
    accent: "gold",
    cta: {
      label: "Tell us what you need →",
      to: "/register",
    },
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    alt: "Abstract glowing digital network connectivity and custom technology infrastructure",
  },
];
