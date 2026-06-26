import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SectionLabel } from "./SectionLabel";

const faqs = [
  { q: "What exactly does AI CheckPoint do for my business?", a: "We audit your current operations, identify bottlenecks and waste, then implement AI tools tailored to your workflow — from inventory to billing to customer service." },
  { q: "Do I need any tech knowledge or team?", a: "Not at all. We handle setup end-to-end and train your existing staff. You don't need to hire anyone or learn anything technical." },
  { q: "How long does setup take?", a: "Most businesses are fully running within 48 hours of approving the AI roadmap. Complex industries (manufacturing, logistics) can take up to a week." },
  { q: "What industries do you serve?", a: "Retail, healthcare, real estate, restaurants, gyms, schools, logistics, manufacturing, corporate — and any business with operations that can be optimized." },
  { q: "How will my staff be trained?", a: "We provide both in-person sessions and recorded video walkthroughs. Staff usually feel comfortable with the new tools within 2-3 days." },
  { q: "Is ₹2,500 a one-time or recurring cost?", a: "₹2,500 is a one-time setup cost. Optional monthly maintenance subscriptions are available if you want continuous optimization and support." },
  { q: "What happens if AI updates change my tools?", a: "We monitor updates and roll them in safely. If you're on a maintenance plan, this is included. Otherwise we offer affordable update sessions." },
  { q: "Can I cancel or get a refund?", a: "If we can't deliver value during the audit, we refund 100%. After implementation, we work with you until the agreed outcomes are met." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative bg-mid py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionLabel>FAQ</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display mt-4 text-center text-3xl font-bold text-soft sm:text-4xl"
        >
          Common <span className="text-gradient">questions</span>
        </motion.h2>

        <div className="mt-12 divide-y divide-indigo/15 border-y border-indigo/15">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`relative transition-colors ${isOpen ? "bg-indigo/5" : ""}`}
              >
                <span
                  className={`absolute left-0 top-0 h-full w-[2px] bg-indigo transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
                />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-[15px] font-medium text-soft hover:text-soft"
                  data-cursor="link"
                >
                  {f.q}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="ml-4 text-cyan">
                    <Plus className="h-5 w-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[15px] leading-relaxed text-soft/65">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}