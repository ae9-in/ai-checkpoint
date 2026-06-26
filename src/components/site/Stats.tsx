import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Settings2, Clock, Wallet, TrendingUp, CheckCircle2, type LucideIcon } from "lucide-react";
import { CountUp } from "@/components/fx/CountUp";
import { SectionLabel } from "./SectionLabel";
import { RollingText } from "@/components/fx/RollingText";

const stats: Array<{
  Icon: LucideIcon;
  label: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  custom?: string;
  body: string;
  color: "indigo" | "cyan" | "gold";
}> = [
  { Icon: Settings2, label: "Labor", value: 40, suffix: "%", body: "reduction in manual hours", color: "indigo" },
  { Icon: Clock, label: "Time", value: 3, suffix: "x", body: "faster daily operations", color: "cyan" },
  { Icon: Wallet, label: "Cost", value: 60, prefix: "₹", suffix: "K+", body: "saved per year on average", color: "gold" },
  { Icon: TrendingUp, label: "Efficiency", value: 98, suffix: "%", body: "process accuracy rate", color: "indigo" },
  { Icon: CheckCircle2, label: "Perfection", custom: "Zero", body: "operational headaches", color: "cyan" },
];

const quotes = [
  { q: "We reduced billing errors by 90% in the first month.", a: "Priya R., Clinic Owner" },
  { q: "Inventory used to take 3 hours. Now it's 10 minutes.", a: "Arjun M., Supermarket Owner" },
  { q: "I never thought AI was for small businesses. AI CheckPoint changed that.", a: "Sana K., Cafe Owner" },
];

const colorMap = {
  indigo: "from-indigo to-indigo/0",
  cyan: "from-cyan to-cyan/0",
  gold: "from-gold to-gold/0",
};

export function Stats() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % quotes.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-mid py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>The numbers</SectionLabel>
        <RollingText
          as="h2"
          className="font-display mt-4 text-center text-4xl font-bold text-soft sm:text-5xl"
          stagger={0.025}
        >
          What AI optimizes for you
        </RollingText>
        <p className="mt-3 text-center text-soft/60">Real results, real businesses.</p>

        <div className="mt-14 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative min-w-[240px] flex-shrink-0 snap-start overflow-hidden rounded-[20px] border border-indigo/20 bg-surface p-6 pt-8 md:min-w-0"
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${colorMap[s.color]}`} />
              <div className={`absolute -top-px left-1/2 h-[2px] w-16 -translate-x-1/2 bg-${s.color}`} />
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-soft/15 bg-soft/[0.03] text-soft/80">
                <s.Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="font-mono-acc mt-6 text-[11px] uppercase tracking-wider text-soft/50">{s.label}</div>
              <div className="font-display mt-1 text-5xl font-bold text-soft">
                {s.custom ? (
                  <span className="text-cyan">{s.custom}</span>
                ) : (
                  <CountUp
                    to={s.value!}
                    prefix={s.prefix ?? ""}
                    suffix={s.suffix ?? ""}
                    className={s.color === "gold" ? "text-gold" : s.color === "cyan" ? "text-cyan" : "text-indigo"}
                  />
                )}
              </div>
              <p className="mt-3 text-sm text-soft/60">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative mx-auto mt-16 h-24 max-w-3xl text-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
              className="text-xl italic text-soft sm:text-2xl"
              style={{ fontFamily: "Georgia, serif" }}
            >
              "{quotes[idx].q}"
              <footer className="font-mono-acc mt-3 text-xs not-italic text-soft/50">— {quotes[idx].a}</footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}