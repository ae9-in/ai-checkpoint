import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const includes = [
  "Full AI Audit of your business (worth ₹5,000)",
  "Custom AI implementation plan",
  "End-to-end setup & integration",
  "Staff training (online or in-person)",
  "₹1,000 worth of Digital Marketing — FREE",
  "Onboarding tools & resources — FREE (worth ₹1,500)",
  "1 month post-setup support included",
  "Monthly maintenance subscription available",
];

const lineItems = [
  { label: "AI Implementation", value: "₹2,500", free: false },
  { label: "Digital Marketing", value: "₹1,000", free: true },
  { label: "Other Tools & Resources", value: "₹1,500", free: true },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-void py-28 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionLabel>Pricing</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display mt-4 text-center text-4xl font-bold text-soft sm:text-5xl"
        >
          One package. <span className="text-gradient">Maximum value.</span>
        </motion.h2>
        <p className="mt-3 text-center text-soft/60">
          Everything your business needs, at a price that makes sense.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="glow-indigo-lg relative mx-auto mt-14 max-w-2xl overflow-hidden rounded-[28px] border border-indigo/50 bg-surface p-10 sm:p-12"
        >
          <div className="font-mono-acc mb-6 inline-flex rounded-full bg-indigo px-3 py-1.5 text-[11px] uppercase tracking-wider text-void">
            Founders' Special Offer
          </div>

          <div className="flex items-end gap-4">
            <div className="relative">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-mono-acc relative text-2xl text-soft/40"
              >
                ₹5,000
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-soft/50"
                />
              </motion.span>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-end gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, type: "spring", stiffness: 220, damping: 14 }}
              className="font-display text-6xl font-extrabold text-cyan sm:text-7xl"
            >
              ₹2,500
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
              className="font-mono-acc mb-3 inline-flex rounded-full border border-gold/60 bg-gold/15 px-3 py-1 text-xs uppercase tracking-wider text-gold"
            >
              Save ₹2,500
            </motion.span>
          </div>

          <ul className="mt-8 space-y-3">
            {includes.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="flex items-start gap-3 text-[15px] text-soft/85"
              >
                <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {item}
              </motion.li>
            ))}
          </ul>

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-indigo to-transparent" />

          <div className="font-mono-acc space-y-2 text-sm">
            {lineItems.map((li) => (
              <div key={li.label} className="flex items-center justify-between text-soft/70">
                <span>{li.label}</span>
                <span className={li.free ? "text-cyan" : "text-soft"}>
                  {li.value} {li.free && <span className="text-cyan/80">(FREE)</span>}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-indigo/20 pt-3 text-base">
              <span className="text-soft/70">Total value <span className="text-soft/40">₹5,000</span> · You pay</span>
              <span className="text-cyan font-bold">₹2,500</span>
            </div>
          </div>

          <Link to="/register" data-cursor="cta" className="mt-8 block">
            <span className="pulse-glow flex h-14 w-full items-center justify-center rounded-full bg-gradient-primary font-semibold text-void transition-transform hover:scale-[1.01]">
              Claim this offer — Register Now →
            </span>
          </Link>

          <p className="mt-4 text-center text-xs text-soft/55">
            <span className="blink-soft text-gold">Limited</span> founder slots available. Price increases after launch.
          </p>
        </motion.div>
      </div>
    </section>
  );
}