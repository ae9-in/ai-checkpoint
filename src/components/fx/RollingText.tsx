import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface RollingTextProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds before the animation starts */
  delay?: number;
  /** Stagger duration between each character */
  stagger?: number;
  /** The HTML tag to render */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

/**
 * RollingText — animates each character sliding up from below with a stagger.
 * Plain text children work best. Triggered once when the element enters the viewport.
 */
export function RollingText({
  children,
  className,
  delay = 0,
  stagger = 0.025,
  as: Tag = "div",
}: RollingTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-60px",
  });

  // Flatten children into individual character items
  const chunks = Array.isArray(children) ? children : [children];
  const items: Array<{ content: ReactNode; key: string }> = [];

  chunks.forEach((chunk, ci) => {
    if (typeof chunk === "string") {
      chunk.split("").forEach((char, charI) => {
        items.push({
          content: char === " " ? "\u00a0" : char,
          key: `${ci}-${charI}`,
        });
      });
    } else {
      items.push({ content: chunk, key: `chunk-${ci}` });
    }
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const inner = (
    <>
      {items.map(({ content, key }) => (
        <span
          key={key}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span style={{ display: "inline-block" }} variants={charVariants}>
            {content}
          </motion.span>
        </span>
      ))}
    </>
  );

  // Render a motion wrapper div that drives the stagger, then style it as the desired tag
  // We use motion.div but apply Tag for semantic HTML via a wrapper approach.
  return (
    <motion.div
      ref={ref}
      className={className}
      role={Tag === "h1" || Tag === "h2" || Tag === "h3" ? "heading" : undefined}
      aria-level={
        Tag === "h1" ? 1 : Tag === "h2" ? 2 : Tag === "h3" ? 3 : undefined
      }
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {inner}
    </motion.div>
  );
}
