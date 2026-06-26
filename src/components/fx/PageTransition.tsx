import { motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [show, setShow] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setShow(true);
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      {children}
      {show && (
        <motion.div
          key={pathname}
          className="pointer-events-none fixed inset-0 z-[90] origin-top bg-gradient-primary"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 0.65, times: [0, 0.5, 1], ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "top" }}
          aria-hidden
        />
      )}
    </>
  );
}