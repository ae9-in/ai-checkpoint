import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import logoImage from "@/assets/logo.png";
import { Link } from "@tanstack/react-router";

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

const SERVICE_OPTIONS = ["Brand", "Digital", "Campaign", "Other"] as const;

export function MainframeHero() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [services, setServices] = useState<string[]>([]);

  const { displayed, done } = useTypewriter("The AI Checkpoint\nbuilt to outpace tomorrow.", 38, 600);

  const toggleService = (s: string) => {
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  return (
    <div className="relative bg-base text-fg font-sans selection:bg-base-elevated selection:text-fg antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      {/* Background image */}
      <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-base">
        <img
          src={heroImage}
          alt="AI CheckPoint — custom AI deployment"
          className="w-full h-full object-contain object-center lg:object-right opacity-95"
          loading="eager"
        />
        {/* Dark gradient veil for readability of left-side copy */}
        <div className="absolute inset-0 bg-gradient-to-r from-base via-base/70 to-transparent lg:via-base/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent" />
      </div>

      {/* Navbar */}
      <header className="relative lg:absolute lg:top-0 lg:inset-x-0 z-10 px-6 sm:px-10 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logoImage} alt="AI CheckPoint Logo" className="h-10 sm:h-12 w-auto" style={{ mixBlendMode: "screen" }} />
            <span className="font-display text-[20px] sm:text-[25px] font-bold tracking-tight text-white transition-colors group-hover:text-cyan select-none">
              AI CheckPoint
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-[18px] text-fg/85">
            {[
              { label: "Audit", to: "/register" },
              { label: "Solutions", to: "/", hash: "benefits" },
              { label: "Industries", to: "/", hash: "industries" },
              { label: "Pricing", to: "/", hash: "pricing" }
            ].map((link, i, arr) => (
              <span key={link.label} className="flex items-center gap-2">
                {link.to === "/register" ? (
                  <Link to="/register" className="hover:opacity-60 transition-opacity">
                    {link.label}
                  </Link>
                ) : (
                  <Link to="/" hash={link.hash} className="hover:opacity-60 transition-opacity">
                    {link.label}
                  </Link>
                )}
                {i < arr.length - 1 && <span className="opacity-60">,</span>}
              </span>
            ))}
          </div>

          <Link to="/register" className="hidden md:inline-block text-[18px] text-fg underline underline-offset-4 hover:opacity-60 transition-opacity">
            Get in touch
          </Link>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden relative z-[10] w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`w-6 h-[2px] bg-fg transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-fg transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-fg transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[9] md:hidden bg-base/95 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex h-full flex-col justify-center px-10 gap-8">
          {[
            { label: "Audit", to: "/register" },
            { label: "Solutions", to: "/", hash: "benefits" },
            { label: "Industries", to: "/", hash: "industries" },
            { label: "Pricing", to: "/", hash: "pricing" },
            { label: "Get in touch", to: "/register" }
          ].map((link) => {
            const isReg = link.to === "/register";
            return (
              <Link
                key={link.label}
                to={isReg ? "/register" : "/"}
                hash={isReg ? undefined : link.hash}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl text-fg font-medium"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Content layer */}
      <div className="relative z-[1] px-6 sm:px-10 lg:px-14 pt-10 lg:pt-32 pb-16 lg:pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-medium tracking-tight leading-[1.08] whitespace-pre-line mb-7">
              {(() => {
                const highlights = ["AI", "Checkpoint"];
                const parts = displayed.split(/(\s+)/);
                return parts.map((tok, i) => {
                  if (/^\s+$/.test(tok)) return tok;
                  const clean = tok.replace(/[.,]/g, "");
                  if (highlights.includes(clean)) {
                    return (
                      <span
                        key={i}
                        className="bg-gradient-to-r from-[#8B7CFF] via-[#C9A26B] to-[#E8D3A8] bg-clip-text text-transparent"
                      >
                        {tok}
                      </span>
                    );
                  }
                  return <span key={i} className="text-fg">{tok}</span>;
                });
              })()}
              {!done && (
                <span className="inline-block w-[0.08em] h-[0.9em] bg-accent align-[-0.1em] ml-1 animate-blink" />
              )}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-base md:text-lg text-fg-muted leading-relaxed font-normal mb-12 max-w-2xl">
              Smarter decisions. Sharper margins. Zero guesswork. We audit, automate, and engineer AI that earns its keep — your unfair advantage for the next decade.
            </p>
          </motion.div>

          <div className="max-w-xl">
            <h3 className="text-xl font-medium tracking-tight mb-2 text-fg">
              Where do you need a checkpoint?
            </h3>
            <p className="text-sm text-fg-subtle mb-7">Select all that apply</p>

            <div className="flex flex-wrap gap-3 mb-6">
              {SERVICE_OPTIONS.map((opt) => {
                const active = services.includes(opt);
                return (
                  <motion.button
                    key={opt}
                    type="button"
                    onClick={() => toggleService(opt)}
                    whileTap={{ scale: 0.96 }}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-base transition-colors ${
                      active
                        ? "bg-accent text-accent-foreground shadow-md shadow-black/40"
                        : "bg-fg/[0.04] text-fg border border-line-strong hover:bg-fg/[0.08]"
                    }`}
                  >
                    <AnimatePresence>
                      {active && (
                        <motion.span
                          key="check"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="inline-flex"
                        >
                          <Check size={16} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {services.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="italic text-xs text-fg/60"
                >
                  Please click to select services above.
                </motion.p>
              ) : (
                <motion.div
                  key="active"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  className="overflow-hidden"
                >
                  <div className="bg-fg text-base border border-line rounded-2xl p-5 flex items-center justify-between gap-4">
                    <p className="text-sm md:text-base text-base/90">
                      <span className="text-base/70">Ready to inquire about:</span>{" "}
                      <span className="font-medium text-base">{services.join(", ")}</span>
                    </p>
                    <Link
                      to="/register"
                      search={{ services: services.join(", ") } as any}
                      className="inline-flex items-center gap-1 text-base uppercase text-xs tracking-wider font-medium hover:opacity-60 transition-opacity text-base/90 hover:text-white"
                    >
                      Let's Go
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}