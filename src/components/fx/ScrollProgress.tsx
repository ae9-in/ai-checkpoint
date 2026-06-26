import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="pointer-events-none fixed left-0 right-0 top-[71px] z-50 h-[2px] origin-left bg-gradient-primary"
      aria-hidden
    />
  );
}