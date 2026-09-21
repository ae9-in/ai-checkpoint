import { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

const industries = [
  "Retail & Supermarkets",
  "Medical Clinics",
  "Real Estate",
  "Logistics",
  "Manufacturing",
  "Cafes & Restaurants",
  "Schools",
  "Corporate",
  "Salons & Spas",
  "Gyms & Fitness",
];
const benefits = [
  "Save Costs",
  "Automate Labor",
  "Boost Accuracy",
  "Seamless Processes",
  "Time Optimization",
  "Stay Ahead",
  "Smarter Decisions",
  "Zero Headaches",
];

function Row({ items, dir }: { items: string[]; dir: "left" | "right" }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="flex w-max gap-8 whitespace-nowrap will-change-transform" data-dir={dir}>
      {tripled.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="flex items-center gap-8 text-sm font-medium tracking-wider text-soft"
        >
          <span>{item}</span>
          <span className="h-1 w-1 rounded-full bg-soft/30" aria-hidden />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playState = inView && !reduceMotion ? "running" : "paused";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/10 bg-black"
    >
      <div className="overflow-hidden py-4">
        <div className="marquee-left" style={{ animationPlayState: playState }}>
          <Row items={industries} dir="left" />
        </div>
      </div>
      <div className="border-t border-white/10" />
      <div className="overflow-hidden py-4">
        <div className="marquee-right" style={{ animationPlayState: playState }}>
          <Row items={benefits} dir="right" />
        </div>
      </div>
    </section>
  );
}
