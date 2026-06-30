import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X, Cpu } from "lucide-react";
import { ScrollProgress } from "@/components/fx/ScrollProgress";

const links = [
  { label: "Benefits", to: "/", hash: "benefits" },
  { label: "Industries", to: "/", hash: "industries" },
  { label: "Pricing", to: "/", hash: "pricing" },
  { label: "About", to: "/", hash: "about" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 60], ["rgba(4,5,15,0)", "rgba(4,5,15,0.72)"]);
  const blur = useTransform(scrollY, [0, 60], ["blur(0px)", "blur(16px)"]);
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 0.25]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        style={{
          backgroundColor: bg,
          backdropFilter: blur,
          WebkitBackdropFilter: blur as unknown as string,
        }}
        className="fixed inset-x-0 top-0 z-50 h-[72px]"
      >
        <motion.div
          style={{ opacity: borderOpacity }}
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo to-transparent"
        />
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 group" data-cursor="link">
            <motion.span
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-void glow-indigo"
            >
              <Cpu className="h-4 w-4" />
            </motion.span>
            <span className="font-display text-lg font-bold text-soft">
              AI<span className="text-indigo">.</span>CheckPoint
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={`#${l.hash}`}
                data-cursor="link"
                className="group relative text-sm text-soft/80 transition-colors hover:text-soft"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cyan transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link to="/register" data-cursor="cta">
              <span className="group relative inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium text-soft transition-transform hover:scale-[1.04]">
                <span className="absolute inset-0 rounded-full bg-gradient-primary opacity-100 transition-opacity" />
                <span className="absolute inset-[1.5px] rounded-full bg-void transition-opacity group-hover:opacity-0" />
                <span className="relative">Get Started</span>
              </span>
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden text-soft"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 top-full mx-4 mt-2 rounded-2xl border border-indigo/30 bg-mid/95 p-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={`#${l.hash}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-soft/85 hover:bg-indigo/10 hover:text-soft"
                >
                  {l.label}
                </motion.a>
              ))}
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex h-12 items-center justify-center rounded-full bg-gradient-primary px-6 font-medium text-void"
              >
                Get Started →
              </Link>
            </div>
          </motion.div>
        )}
      </motion.header>
      <ScrollProgress />
    </>
  );
}
