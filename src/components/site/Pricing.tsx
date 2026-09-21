import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Check, Sparkles, ShieldCheck } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { RollingText } from "@/components/fx/RollingText";

const includes = [
  "Comprehensive AI Operations Audit of your business",
  "Tailored AI implementation & automation roadmap",
  "End-to-end setup & database integration",
  "Staff training (in-person & video guides)",
  "Automated WhatsApp & CRM workflows",
  "Dedicated onboarding tools & resources",
  "30-day post-setup support included",
  "Optional continuous maintenance & model tuning",
];

const steps = [
  { step: "Phase 1", label: "Operations Audit", value: "100% FREE", highlight: true },
  { step: "Phase 2", label: "AI Roadmap & Architecture", value: "Included", highlight: false },
  { step: "Phase 3", label: "Custom Setup & Integration", value: "Custom Scoped Quote", highlight: false },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-void py-28 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionLabel>Pricing & Engagement</SectionLabel>
        <RollingText
          as="h2"
          className="font-display mt-4 text-center text-4xl font-bold text-soft sm:text-5xl"
          stagger={0.03}
        >
          Transparent. Value-Driven.
        </RollingText>
        <p className="mt-3 text-center text-soft/60">
          We audit your workflows first — zero risk, guaranteed clarity.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="glow-indigo-lg relative mx-auto mt-14 max-w-2xl overflow-hidden rounded-[28px] border border-indigo/50 bg-surface p-10 sm:p-12"
        >
          <div className="font-mono-acc mb-6 inline-flex items-center gap-1.5 rounded-full bg-cyan/15 px-3 py-1.5 text-[11px] uppercase tracking-wider text-cyan">
            <Sparkles className="h-3 w-3" />
            Audit-First Approach
          </div>

          <div className="mt-2">
            <h3 className="font-display text-4xl font-extrabold text-white sm:text-5xl">
              Free Initial Audit
            </h3>
            <p className="mt-2 text-sm text-soft/70">
              Zero upfront commitment. Get a 48-hour diagnostic of your operations with tailored AI recommendations.
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {includes.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.05 }}
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

          <div className="font-mono-acc space-y-2.5 text-sm">
            {steps.map((s) => (
              <div key={s.label} className="flex items-center justify-between text-soft/80">
                <span className="flex items-center gap-2">
                  <span className="text-[11px] text-cyan/70 font-semibold">{s.step}:</span>
                  <span>{s.label}</span>
                </span>
                <span className={s.highlight ? "text-cyan font-bold" : "text-soft/60"}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          <Link to="/register" data-cursor="cta" className="mt-8 block">
            <span className="pulse-glow flex h-14 w-full items-center justify-center rounded-full bg-gradient-primary font-semibold text-void transition-transform hover:scale-[1.01]">
              Book Your Free AI Audit →
            </span>
          </Link>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-soft/55">
            <ShieldCheck className="h-3.5 w-3.5 text-cyan" />
            Clear, transparent implementation scope provided before any commitment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
