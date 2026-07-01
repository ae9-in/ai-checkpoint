import { motion } from "framer-motion";
import {
  Zap,
  Target,
  TrendingUp,
  RefreshCw,
  Shield,
  Brain,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useRef, type ReactNode } from "react";
import { SectionLabel } from "./SectionLabel";
import { RollingText } from "@/components/fx/RollingText";
import { Parallax } from "@/components/fx/Parallax";

const cards = [
  {
    icon: Zap,
    title: "Cut Costs Instantly",
    body: "AI identifies waste in your processes — labor, time, and materials — and eliminates it automatically.",
  },
  {
    icon: Target,
    title: "Pinpoint Accuracy",
    body: "Remove human error from data entry, inventory, billing, and reporting. Decisions backed by real numbers.",
  },
  {
    icon: TrendingUp,
    title: "Edge Over Competitors",
    body: "While they operate manually, you operate with AI. Faster, smarter, and cheaper, every day.",
  },
  {
    icon: RefreshCw,
    title: "Always Up to Date",
    body: "AI tools evolve with your business. Regular updates keep you ahead — no manual upgrades needed.",
  },
  {
    icon: Shield,
    title: "Seamless Integration",
    body: "We handle setup end-to-end. Your team gets trained. You get results. Zero technical headache.",
  },
  {
    icon: Brain,
    title: "Smarter Decisions",
    body: "Real-time dashboards and AI insights so you always know what's working and what needs attention.",
  },
];

function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const rx = (y / r.height - 0.5) * -6;
        const ry = (x / r.width - 0.5) * 6;

        // Angle for cursor-reactive-border
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const angleRad = Math.atan2(dy, dx);
        let angleDeg = angleRad * (180 / Math.PI);
        angleDeg = (angleDeg + 360) % 360;

        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        el.style.setProperty("--rx", `${rx}deg`);
        el.style.setProperty("--ry", `${ry}deg`);
        el.style.setProperty("--rotation", `${angleDeg}deg`);
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--rx", `0deg`);
        el.style.setProperty("--ry", `0deg`);
      }}
      className="group/spot relative h-full [perspective:1000px]"
      style={{
        ["--mx" as string]: "50%",
        ["--my" as string]: "50%",
        ["--rx" as string]: "0deg",
        ["--ry" as string]: "0deg",
        ["--rotation" as string]: "0deg",
      }}
    >
      {children}
    </div>
  );
}

export function Benefits() {
  return (
    <section id="benefits" className="relative bg-void py-28 sm:py-32 overflow-hidden">
      {/* Floating parallax blur circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <Parallax offset={80} className="absolute top-[20%] -left-48 w-96 h-96 rounded-full bg-cyan/5 blur-3xl" />
        <Parallax offset={-80} className="absolute bottom-[20%] -right-48 w-96 h-96 rounded-full bg-indigo/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <SectionLabel>Why choose us</SectionLabel>
        <RollingText
          as="h2"
          className="font-display mt-4 text-center text-4xl font-bold text-soft sm:text-5xl"
          stagger={0.022}
        >
          What we bring to your business
        </RollingText>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Parallax offset={[-30, 5, 40][i % 3]} className="h-full">
                  <TiltCard>
                    <div
                      className="group relative h-full overflow-hidden rounded-[22px] border border-transparent cursor-reactive-border p-7 transition-all duration-500 will-change-transform hover:-translate-y-1"
                      style={{
                        transform: "rotateX(var(--rx)) rotateY(var(--ry))",
                        transformStyle: "preserve-3d",
                        "--border-glow": "rgba(201, 162, 107, 0.45)",
                        "--border-dim": "rgba(255, 255, 255, 0.05)",
                        "--card-bg": "rgba(16, 17, 23, 0.85)"
                      } as React.CSSProperties}
                    >
                      {/* Gradient border halo on hover */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(500px circle at var(--mx) var(--my), rgba(0,245,212,0.18), transparent 45%)",
                        }}
                      />

                      <div className="relative flex items-start justify-between">
                        <div className="relative grid h-12 w-12 place-items-center rounded-xl border border-indigo/40 bg-indigo/10 text-cyan transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                          <Icon className="h-5 w-5" />
                          <span className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-70" />
                        </div>
                        <span className="font-mono-acc text-[11px] tracking-[0.2em] text-soft/30">
                          {num}
                        </span>
                      </div>

                      <h3 className="font-display relative mt-6 text-[22px] font-semibold leading-tight text-soft">
                        {c.title}
                      </h3>
                      <p className="relative mt-2.5 text-[14.5px] leading-relaxed text-soft/60">
                        {c.body}
                      </p>

                      <div className="relative mt-6 flex items-center gap-2 text-[13px] text-cyan opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <span className="font-mono-acc tracking-wide">EXPLORE</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </TiltCard>
                </Parallax>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
