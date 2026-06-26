import { motion } from "framer-motion";
import { Zap, Target, TrendingUp, RefreshCw, Shield, Brain, Sparkles, ArrowUpRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { SectionLabel } from "./SectionLabel";

const cards = [
  { icon: Zap, title: "Cut Costs Instantly", body: "AI identifies waste in your processes — labor, time, and materials — and eliminates it automatically." },
  { icon: Target, title: "Pinpoint Accuracy", body: "Remove human error from data entry, inventory, billing, and reporting. Decisions backed by real numbers." },
  { icon: TrendingUp, title: "Edge Over Competitors", body: "While they operate manually, you operate with AI. Faster, smarter, and cheaper, every day." },
  { icon: RefreshCw, title: "Always Up to Date", body: "AI tools evolve with your business. Regular updates keep you ahead — no manual upgrades needed." },
  { icon: Shield, title: "Seamless Integration", body: "We handle setup end-to-end. Your team gets trained. You get results. Zero technical headache." },
  { icon: Brain, title: "Smarter Decisions", body: "Real-time dashboards and AI insights so you always know what's working and what needs attention." },
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
        const rx = ((y / r.height) - 0.5) * -6;
        const ry = ((x / r.width) - 0.5) * 6;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        el.style.setProperty("--rx", `${rx}deg`);
        el.style.setProperty("--ry", `${ry}deg`);
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--rx", `0deg`);
        el.style.setProperty("--ry", `0deg`);
      }}
      className="group/spot relative h-full [perspective:1000px]"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%", ["--rx" as string]: "0deg", ["--ry" as string]: "0deg" }}
    >
      {children}
    </div>
  );
}

export function Benefits() {
  return (
    <section id="benefits" className="relative bg-void py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Why choose us</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="font-display mt-4 text-center text-4xl font-bold text-soft sm:text-5xl"
        >
          What we bring to{" "}
          <span className="relative inline-block">
            <span className="text-gradient">your business</span>
            <svg
              viewBox="0 0 220 12"
              className="absolute -bottom-2 left-0 h-3 w-full"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M2 6 Q 55 0 110 6 T 218 6"
                fill="none"
                stroke="url(#wave)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
              <defs>
                <linearGradient id="wave" x1="0" x2="1">
                  <stop offset="0%" stopColor="#5C3BFF" />
                  <stop offset="100%" stopColor="#00F5D4" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </motion.h2>

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
                <TiltCard>
                  <div
                    className="group relative h-full overflow-hidden rounded-[22px] border border-soft/[0.06] bg-gradient-to-b from-surface/90 to-mid/90 p-7 transition-all duration-500 will-change-transform hover:-translate-y-1 hover:border-cyan/30"
                    style={{ transform: "rotateX(var(--rx)) rotateY(var(--ry))", transformStyle: "preserve-3d" }}
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
                    {/* Conic accent line */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-px rounded-[22px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "conic-gradient(from var(--ry, 0deg) at var(--mx) var(--my), rgba(92,59,255,0.5), rgba(0,245,212,0.5), transparent 30%)",
                        WebkitMask:
                          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        padding: "1px",
                      }}
                    />

                    <div className="relative flex items-start justify-between">
                      <div className="relative grid h-12 w-12 place-items-center rounded-xl border border-indigo/40 bg-indigo/10 text-cyan transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                        <span className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-70" />
                      </div>
                      <span className="font-mono-acc text-[11px] tracking-[0.2em] text-soft/30">{num}</span>
                    </div>

                    <h3 className="font-display relative mt-6 text-[22px] font-semibold leading-tight text-soft">
                      {c.title}
                    </h3>
                    <p className="relative mt-2.5 text-[14.5px] leading-relaxed text-soft/60">{c.body}</p>

                    <div className="relative mt-6 flex items-center gap-2 text-[13px] text-cyan opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <span className="font-mono-acc tracking-wide">EXPLORE</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}

          {/* Hero card — full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:col-span-2 lg:col-span-3"
          >
            <div
              className="grid items-center gap-8 rounded-[24px] border border-indigo/40 p-8 sm:p-12 md:grid-cols-[auto_1fr]"
              style={{
                background:
                  "linear-gradient(135deg, #0D0E1F 0%, rgba(92,59,255,0.15) 100%)",
              }}
            >
              <div className="float-y grid h-20 w-20 place-items-center rounded-2xl bg-gradient-primary text-void glow-indigo-lg">
                <Sparkles className="h-9 w-9" />
              </div>
              <div>
                <h3 className="font-display text-3xl font-bold text-soft sm:text-4xl">
                  Save Time. Save Money. Stay Ahead.
                </h3>
                <p className="mt-3 max-w-2xl text-soft/65">
                  One package, everything included — audit, setup, training, and a month of support so AI lands
                  in your business without friction.
                </p>
                <div className="font-mono-acc mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                  <span className="rounded-full border border-cyan/40 bg-cyan/5 px-3 py-1 text-cyan">48 hr setup</span>
                  <span className="rounded-full border border-indigo/40 bg-indigo/10 px-3 py-1 text-soft">₹2,500 package</span>
                  <span className="rounded-full border border-gold/40 bg-gold/5 px-3 py-1 text-gold">₹1,000 marketing included</span>
                  <span className="rounded-full border border-soft/20 bg-soft/5 px-3 py-1 text-soft">FREE onboarding</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}