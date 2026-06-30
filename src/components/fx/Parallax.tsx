import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxProps {
  children?: ReactNode; // Distance in pixels to move
  offset?: number;
  className?: string;
  springConfig?: { stiffness: number; damping: number; mass?: number };
}

export function Parallax({
  children,
  offset = 50,
  className = "",
  springConfig = { stiffness: 100, damping: 30, mass: 0.5 },
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const y = useSpring(yRaw, springConfig);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
