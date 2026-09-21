import { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

const ITEMS = [
  "Audit",
  "Automate",
  "Integrate",
  "Deploy",
  "Measure",
  "Scale",
  "Optimize",
  "Checkpoint",
];

export function LogoLoop() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const reduceMotion = useReducedMotion();

  // Duplicate items for seamless loop
  const loop = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

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

  return (
    <section
      ref={sectionRef}
      className="relative bg-black border-y border-white/10 overflow-hidden py-8"
    >
      <div
        style={{
          animationPlayState: inView && !reduceMotion ? "running" : "paused",
        }}
        className="flex w-max animate-[logoloop_38s_linear_infinite] gap-12 whitespace-nowrap"
      >
        {loop.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-6 text-white/70">
            <span className="text-2xl md:text-3xl font-medium tracking-tight">{item}</span>
            <span className="text-2xl md:text-3xl text-white/40 leading-none">
              <span className="text-accent">✱</span>
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes logoloop {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
