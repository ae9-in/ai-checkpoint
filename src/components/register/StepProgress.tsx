import { motion } from "framer-motion";

const labels = ["About You", "Your Business", "Your Goals"];

export function StepProgress({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-3">
      {labels.map((label, i) => {
        const idx = i + 1;
        const active = idx === step;
        const done = idx < step;
        return (
          <div key={label} className="flex flex-1 items-center gap-3">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  backgroundColor: done || active ? "#5C3BFF" : "rgba(92,59,255,0.15)",
                  scale: active ? 1.1 : 1,
                }}
                className="grid h-8 w-8 place-items-center rounded-full font-mono-acc text-xs font-semibold text-soft"
              >
                {done ? "✓" : idx}
              </motion.div>
              <span className={`hidden text-xs uppercase tracking-wider sm:inline ${active ? "text-soft" : "text-soft/45"}`}>
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div className="relative h-px flex-1 bg-indigo/15">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: done ? 1 : 0 }}
                  className="h-full origin-left bg-gradient-primary"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}