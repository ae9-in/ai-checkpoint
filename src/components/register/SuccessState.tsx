import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import confetti from "canvas-confetti";

export function SuccessState() {
  useEffect(() => {
    const fire = () => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.4 },
        colors: ["#5C3BFF", "#00F5D4", "#FFD166", "#F0EFFF"],
      });
    };
    fire();
    const t = setTimeout(fire, 400);
    return () => clearTimeout(t);
  }, []);

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(
    "Check out AI CheckPoint — free AI audit + ₹2,500 founders package for Indian businesses. https://aicheckpoint.in",
  )}`;

  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-cyan/15"
      >
        <svg viewBox="0 0 52 52" className="h-14 w-14">
          <motion.circle
            cx="26"
            cy="26"
            r="22"
            fill="none"
            stroke="#00F5D4"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.path
            d="M14 27 l9 9 l16 -18"
            fill="none"
            stroke="#00F5D4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
        </svg>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="font-display mt-6 text-center text-4xl font-bold text-cyan"
      >
        You're in
      </motion.h2>
      <p className="mt-3 text-center text-soft/70">
        Our AI specialist will call you within 24 hours. Check your email for confirmation.
      </p>

      <div className="mt-8 rounded-2xl border border-indigo/30 bg-surface p-6">
        <h3 className="font-display text-lg font-semibold text-soft">What happens next</h3>
        <ol className="mt-4 space-y-3 text-sm text-soft/75">
          <li className="flex gap-3">
            <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-indigo/30 text-cyan">
              1
            </span>{" "}
            Confirmation email lands in your inbox
          </li>
          <li className="flex gap-3">
            <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-indigo/30 text-cyan">
              2
            </span>{" "}
            Specialist calls to schedule your free 2-hour audit
          </li>
          <li className="flex gap-3">
            <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-indigo/30 text-cyan">
              3
            </span>{" "}
            You receive your custom AI roadmap within 48 hours
          </li>
        </ol>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Link
          to="/"
          className="inline-flex h-11 items-center rounded-full border border-soft/30 px-6 text-sm text-soft hover:border-cyan hover:text-cyan"
        >
          Back to home
        </Link>
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-cyan hover:underline"
        >
          Know another business owner who'd benefit? Share AI CheckPoint →
        </a>
      </div>
    </div>
  );
}
