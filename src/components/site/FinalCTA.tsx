import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

const headlineA = "Ready to Transform";
const headlineB = "Your Business?";

function SplitChars({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split("").map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: delay + i * 0.025, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-32 sm:py-40"
      style={{
        background:
          "linear-gradient(180deg, #06070C 0%, #0B0C12 60%, #101117 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl">
          <span className="block overflow-hidden text-soft">
            <SplitChars text={headlineA} />
          </span>
          <span className="text-gradient block overflow-hidden">
            <SplitChars text={headlineB} delay={0.4} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="mx-auto mt-8 max-w-xl text-base text-soft/70 sm:text-lg"
        >
          Join the businesses already using AI to save costs, save time, and stay ahead of the
          competition. Book your free audit today — no commitment, no tech knowledge required.
        </motion.p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/register" data-cursor="cta">
            <span className="pulse-glow inline-flex h-14 items-center justify-center rounded-full bg-gradient-primary px-8 font-semibold text-void">
              Register & Book Your Audit →
            </span>
          </Link>
          <a
            href="#industries"
            data-cursor="link"
            className="inline-flex h-14 items-center justify-center rounded-full border border-soft/30 px-8 text-soft transition-colors hover:border-soft hover:bg-soft hover:text-void"
          >
            See Industries We Serve
          </a>
        </div>
      </div>
    </section>
  );
}