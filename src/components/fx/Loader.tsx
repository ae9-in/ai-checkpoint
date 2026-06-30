import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-base text-fg flex flex-col items-center justify-center"
        >
          <div className="text-2xl md:text-3xl font-medium tracking-tight mb-8">
            AI CheckPoint<span className="text-accent ml-1">✱</span>
          </div>
          <div className="w-56 h-[2px] bg-line overflow-hidden rounded">
            <div
              className="h-full bg-accent transition-[width] duration-100 ease-linear"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <div className="mt-3 text-xs tabular-nums opacity-60">
            {Math.round(progress * 100)
              .toString()
              .padStart(3, "0")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
