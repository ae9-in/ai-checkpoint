import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Search, Map, Wrench, RefreshCw } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { SectionLabel } from "./SectionLabel";
import { RollingText } from "@/components/fx/RollingText";

const steps = [
  { icon: Search, title: "Free AI Audit", body: "We spend 2 hours studying your business operations — manually and digitally." },
  { icon: Map, title: "Custom AI Roadmap", body: "We present a tailored AI plan with specific tools, timelines, and cost savings." },
  { icon: Wrench, title: "Implementation & Training", body: "Our team sets everything up and trains your staff — in-person or online." },
  { icon: RefreshCw, title: "Ongoing Optimization", body: "Monthly check-ins, updates, and reviews. We don't disappear after setup." },
];

export function Timeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [scrollIdx, setScrollIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 40%"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["6%", "88%"]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      // map progress (0..1) across 4 steps
      const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
      setScrollIdx(idx);
    });
  }, [scrollYProgress]);

  const active = hovered ?? scrollIdx;

  return (
    <section
      id="how"
      className="relative overflow-hidden py-28 sm:py-32"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #0a1a3a 0%, #060b1f 45%, #03060f 100%)",
      }}
    >
      {/* subtle blue glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 30% at 15% 30%, rgba(59,108,200,0.18), transparent 70%), radial-gradient(40% 30% at 85% 70%, rgba(30,60,140,0.18), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionLabel>How it works</SectionLabel>
        <RollingText
          as="h2"
          className="font-display mt-4 text-center text-4xl font-bold text-soft sm:text-5xl"
          stagger={0.028}
        >
          From Audit to Automation
        </RollingText>
        <p className="mt-3 text-center text-soft/60">Our proven 4-step process.</p>

        <div ref={trackRef} className="relative mt-20">
          {/* horizontal cream connecting line (desktop) */}
          {/* horizontal connecting rail (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden md:block">
            {/* dim base rail */}
            <div
              className="absolute left-[6%] right-[6%] top-0 h-px"
              style={{ background: "rgba(255,255,255,0.18)" }}
            />
            {/* bright progress rail with glow */}
            <motion.div
              className="absolute left-0 top-[-1px] h-[3px] rounded-full"
              style={{
                width: progressWidth,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, #ffffff 12%, #ffffff 100%)",
                boxShadow:
                  "0 0 12px rgba(255,255,255,0.55), 0 0 28px rgba(160,190,255,0.35)",
              }}
            />
          </div>
          {/* vertical cream connector (mobile) */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 md:hidden"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.85), transparent)",
            }}
          />

          <div className="grid gap-12 md:grid-cols-4 md:gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = i <= active;
              const isCurrent = i === active;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="group flex cursor-default flex-col items-center text-center"
                >
                  <div className="relative">
                    {/* outer dark ring to mask the connecting line */}
                    <motion.span
                      animate={{
                        scale: isCurrent ? 1.08 : 1,
                        borderColor: isActive ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.1)",
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="relative grid h-24 w-24 place-items-center rounded-full border"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 40%, #1a2240 0%, #0a0f24 70%)",
                        boxShadow: isCurrent
                          ? "0 0 0 6px rgba(6,9,20,0.95), 0 0 0 8px rgba(255,255,255,0.35), 0 0 40px rgba(255,255,255,0.25)"
                          : isActive
                            ? "0 0 0 6px rgba(6,9,20,0.95), 0 0 24px rgba(255,255,255,0.18)"
                            : "0 0 0 6px rgba(6,9,20,0.95), 0 10px 40px -10px rgba(80,120,220,0.25)",
                      }}
                    >
                      <span
                        className="grid h-16 w-16 place-items-center rounded-full text-[#1a1207]"
                        style={{
                          background:
                            "radial-gradient(circle at 35% 30%, #f1dcb1 0%, #d8b785 55%, #b8915a 100%)",
                          boxShadow:
                            "inset 0 1px 2px rgba(255,255,255,0.4), 0 4px 14px rgba(201,162,107,0.35)",
                        }}
                      >
                        <Icon className="h-7 w-7" strokeWidth={1.8} />
                      </span>
                      <span
                        className="font-mono-acc absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full border bg-[#06091a] text-xs transition-colors"
                        style={{
                          borderColor: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)",
                          color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)",
                        }}
                      >
                        {i + 1}
                      </span>
                    </motion.span>
                  </div>
                  <h3
                    className="font-display mt-6 text-lg font-semibold transition-colors"
                    style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.75)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-2 max-w-xs text-sm transition-colors"
                    style={{ color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)" }}
                  >
                    {s.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center gap-6 text-center"
        >
          <p className="max-w-2xl text-soft/70">
            All of this in your <span className="text-cyan font-semibold">₹2,500 package</span> — with{" "}
            <span className="text-gold font-semibold">₹1,000 of digital marketing</span> and FREE tools included.
          </p>
          <Link to="/register" data-cursor="cta">
            <span className="pulse-glow inline-flex h-14 items-center justify-center rounded-full bg-gradient-primary px-8 font-semibold text-void">
              Start with a Free Audit →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}