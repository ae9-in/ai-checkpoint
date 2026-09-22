import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

const HeroScene = lazy(() =>
  import("@/components/site/HeroScene").then((m) => ({ default: m.HeroScene })),
);

const checks = [
  "Free 2-hour business audit",
  "Custom AI roadmap",
  "No tech skills required",
  "Results in 48 hours",
];

export function RegisterLeft() {
  return (
    <aside
      className="relative isolate overflow-hidden p-10 md:sticky md:top-0 md:h-screen md:p-14"
      style={{
        background: "linear-gradient(135deg, #5C3BFF 0%, #0D0E1F 100%)",
      }}
    >
      <Suspense fallback={null}>
        <HeroScene className="absolute inset-0 -z-10 opacity-60" />
      </Suspense>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(0,245,212,0.18), transparent 55%)",
        }}
      />

      <a href="/" className="font-display text-lg font-bold text-soft">
        AI<span className="text-cyan">.</span>CheckPoint
      </a>

      <h1 className="font-display mt-14 text-3xl font-extrabold leading-tight text-soft sm:text-4xl">
        Let's transform <br /> your business.
      </h1>
      <p className="mt-4 max-w-md text-soft/75">
        Fill in your details and our AI specialist will contact you within 24 hours for a FREE
        audit.
      </p>

      <ul className="mt-8 space-y-3">
        {checks.map((c, i) => (
          <motion.li
            key={c}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-3 text-soft/90"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <motion.path
                d="M5 12 l5 5 l9 -11"
                fill="none"
                stroke="#00F5D4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              />
            </svg>
            {c}
          </motion.li>
        ))}
      </ul>

      <div className="mt-10 rounded-2xl border border-soft/15 bg-void/40 p-5 backdrop-blur-md">
        <div className="font-mono-acc text-[11px] uppercase tracking-wider text-cyan">
          Free Operations Audit
        </div>
        <div className="mt-2">
          <span className="font-display text-2xl font-bold text-soft">100% Free Initial Audit</span>
        </div>
        <p className="mt-1 text-sm text-soft/70">
          Custom AI roadmap + workflow analysis with zero upfront commitment.
        </p>
      </div>

      <div className="font-mono-acc mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-wider text-soft/55">
        <span>500+ consulted</span>
        <span className="text-soft/30">/</span>
        <span>India-wide</span>
        <span className="text-soft/30">/</span>
        <span>4.9 rating</span>
      </div>
    </aside>
  );
}
