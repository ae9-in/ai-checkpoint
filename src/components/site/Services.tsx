/* Expand-on-hover interaction adapted from Skiper UI (HoverExpand_001) — https://skiper-ui.com */

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { Pause, Play, ChevronDown } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { RollingText } from "@/components/fx/RollingText";
import { Parallax } from "@/components/fx/Parallax";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 3500;

// JSON-LD ItemList Schema for Services
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI CheckPoint Services",
  description: "AI Courses, Custom Websites, AI Automations, CRMs, and Custom Tech Solutions.",
  itemListElement: services.map((service, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: {
        "@type": "Organization",
        name: "AI CheckPoint",
        url: "https://www.aicheckpoint.in/",
      },
      areaServed: "IN",
    },
  })),
};

export function Services() {
  const railRef = useRef<HTMLUListElement>(null);
  const panelButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  const [openIndex, setOpenIndex] = useState(0);
  const [stopped, setStopped] = useState(false); // terminal — set by click / arrow key
  const [userPaused, setUserPaused] = useState(false); // user manual pause toggle
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [willChangeIndices, setWillChangeIndices] = useState<Record<number, boolean>>({});

  const handleImageError = useCallback((id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  }, []);

  // Pointer type check (SSR safe)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsFinePointer(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Viewport intersection gate for autoplay
  useEffect(() => {
    const el = railRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Tab visibility gate for autoplay
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVis = () => setTabVisible(!document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const paused = hovering || focusWithin || userPaused || !inView || !tabVisible || !!reduceMotion;
  const running = !stopped && !paused;

  // Autoplay loop: re-arms whenever openIndex or running state changes
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => {
      setOpenIndex((i) => (i + 1) % services.length);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [running, openIndex]);

  const select = useCallback((i: number, commit: boolean) => {
    setOpenIndex(i);
    if (commit) {
      setStopped(true); // User made an explicit interaction
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % services.length;
      select(nextIndex, true);
      panelButtonRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + services.length) % services.length;
      select(prevIndex, true);
      panelButtonRefs.current[prevIndex]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0, true);
      panelButtonRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const lastIndex = services.length - 1;
      select(lastIndex, true);
      panelButtonRefs.current[lastIndex]?.focus();
    }
  };

  return (
    <section
      id="services"
      className="relative bg-void py-28 sm:py-32 overflow-hidden scroll-mt-[88px]"
      aria-labelledby="services-heading"
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      {/* Ambient background blur blobs */}
      <Parallax
        offset={30}
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-soft/[0.03] blur-3xl z-0"
      />
      <Parallax
        offset={-20}
        className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-gold/[0.04] blur-3xl z-0"
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <SectionLabel>Services</SectionLabel>
        <RollingText
          as="h2"
          stagger={0.025}
          className="font-display mt-4 text-center text-4xl font-bold text-soft sm:text-5xl"
        >
          What we build for you
        </RollingText>
        <p className="mx-auto mt-3 max-w-2xl text-center text-soft/60 text-base sm:text-lg leading-relaxed">
          Courses, websites, automations, CRMs — and anything else your business needs on the tech
          side.
        </p>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP EXPANDING PHOTO RAIL (>= 1024px)                     */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-14 hidden lg:block relative">
          <ul
            ref={railRef}
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => {
              setHovering(false);
              if (!stopped) {
                setOpenIndex(0);
              }
            }}
            onFocusCapture={() => setFocusWithin(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setFocusWithin(false);
              }
            }}
            className="flex gap-3 h-[520px] w-full"
            role="tablist"
            aria-label="Services expanding rail"
          >
            {services.map((service, idx) => {
              const isOpen = reduceMotion ? true : openIndex === idx;
              const isGold = service.accent === "gold";
              const hasError = imageErrors[service.id];
              const isWillChange = !!willChangeIndices[idx];

              return (
                <motion.li
                  key={service.id}
                  style={{
                    flex: "0 0 auto",
                    contain: "layout paint",
                    willChange: isWillChange ? "width" : "auto",
                  }}
                  animate={{
                    width: reduceMotion ? "20%" : isOpen ? "44%" : "14%",
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          duration: isOpen ? 0.55 : 0.38,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                  onAnimationComplete={() => {
                    setWillChangeIndices((prev) => ({ ...prev, [idx]: false }));
                  }}
                  onPointerEnter={() => {
                    setWillChangeIndices((prev) => ({ ...prev, [idx]: true }));
                    if (isFinePointer) {
                      select(idx, false);
                    }
                  }}
                  className={cn(
                    "relative overflow-hidden rounded-[28px] border transition-colors duration-300",
                    isGold
                      ? "border-gold/45 shadow-[0_0_24px_rgba(201,162,107,0.12)]"
                      : "border-line hover:border-line-strong shadow-lg shadow-black/40",
                  )}
                >
                  <button
                    ref={(el) => {
                      panelButtonRefs.current[idx] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`service-tab-${service.id}`}
                    aria-selected={isOpen}
                    aria-expanded={isOpen}
                    aria-controls={`${service.id}-panel`}
                    tabIndex={0}
                    onClick={() => select(idx, true)}
                    onFocus={() => select(idx, false)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    data-cursor="link"
                    className="group relative flex h-full w-full flex-col justify-between p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-[28px]"
                  >
                    {/* Background Two-Layer Opacity Crossfade (Zero Filter Animation) */}
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-[28px]">
                      {!hasError ? (
                        <>
                          {/* Dimmed Base Layer: static filter rasterized once */}
                          <img
                            src={service.image}
                            alt=""
                            aria-hidden
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            onError={() => handleImageError(service.id)}
                            style={{
                              objectPosition: service.imagePosition || "center center",
                              filter: service.dimClosed
                                ? `brightness(${service.dimClosed})`
                                : "grayscale(1) brightness(0.48)",
                            }}
                            className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
                          />

                          {/* Full-Color Layer: only opacity transitions (GPU composited) */}
                          <motion.img
                            src={service.image}
                            alt={service.alt}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            style={{
                              objectPosition: service.imagePosition || "center center",
                            }}
                            animate={{ opacity: isOpen ? 1 : 0 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
                          />
                        </>
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-surface to-void" />
                      )}

                      {/* Scrim: Multi-stop gradient for text legibility */}
                      <div
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                          background:
                            "linear-gradient(to top, rgb(6 7 12 / 0.94) 0%, rgb(6 7 12 / 0.62) 38%, rgb(6 7 12 / 0.12) 72%, transparent 100%)",
                        }}
                      />

                      {/* Flat wash for closed state */}
                      <div
                        className={cn(
                          "absolute inset-0 bg-void/25 transition-opacity duration-500 z-10",
                          isOpen ? "opacity-0" : "opacity-100",
                        )}
                      />
                    </div>

                    {/* Top row: Numeral */}
                    <div className="relative z-20 flex items-start justify-between w-full">
                      <span className="font-mono-acc text-xs tracking-wider text-soft/40 select-none">
                        {service.index}
                      </span>
                    </div>

                    {/* Middle: Vertical title in closed state */}
                    <div
                      className={cn(
                        "absolute inset-x-0 top-24 bottom-16 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-200",
                        isOpen ? "opacity-0 invisible" : "opacity-100 visible",
                      )}
                    >
                      <span
                        className="font-display text-lg font-bold text-soft/80 whitespace-nowrap tracking-tight select-none"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {service.title}
                      </span>
                    </div>

                    {/* Bottom: Unfolded Content in open state */}
                    <div
                      id={`${service.id}-panel`}
                      role="tabpanel"
                      aria-labelledby={`service-tab-${service.id}`}
                      className={cn(
                        "relative z-20 mt-auto w-full transition-all duration-300",
                        isOpen
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-3 pointer-events-none",
                      )}
                    >
                      <h3 className="font-display text-2xl xl:text-3xl font-bold text-soft tracking-tight">
                        {service.title}
                      </h3>

                      <p className="mt-2 text-sm text-soft/75 max-w-[44ch] leading-relaxed line-clamp-3">
                        {service.description}
                      </p>

                      {/* Chips row */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {service.chips.map((chip) => (
                          <span
                            key={chip}
                            className={cn(
                              "font-mono-acc text-[11px] px-2.5 py-1 rounded-full border transition-colors select-none",
                              isGold
                                ? "border-gold/35 bg-gold/10 text-gold/90"
                                : "border-line bg-soft/5 text-soft/75 hover:bg-soft/12 hover:border-line-strong",
                            )}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      {/* CTA for panel 05 */}
                      {service.cta && (
                        <div className="mt-5">
                          <Link
                            to={service.cta.to}
                            data-cursor="cta"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-xs font-semibold text-void transition-transform hover:scale-105 shadow-md shadow-gold/20"
                          >
                            <span>{service.cta.label}</span>
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Bottom Autoplay Progress Bar on Open Panel */}
                    {isOpen && running && (
                      <div className="absolute inset-x-0 bottom-0 h-[2px] z-30 overflow-hidden rounded-b-[28px] pointer-events-none">
                        <motion.div
                          key={`progress-${openIndex}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: AUTOPLAY_MS / 1000,
                            ease: "linear",
                          }}
                          style={{ transformOrigin: "left" }}
                          className={cn("h-full w-full", isGold ? "bg-gold/70" : "bg-soft/45")}
                        />
                      </div>
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>

          {/* Autoplay Pause / Play Control (WCAG 2.2.2) */}
          {!stopped && !reduceMotion && (
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setUserPaused((v) => !v)}
                aria-label={userPaused ? "Resume automatic rotation" : "Pause automatic rotation"}
                className="flex h-8 w-8 min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px] items-center justify-center rounded-full border border-line bg-void/70 backdrop-blur text-soft/70 hover:text-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft"
              >
                {userPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              </button>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TABLET 2-COLUMN GRID (640px - 1023px)                         */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-12 hidden sm:grid lg:hidden grid-cols-2 gap-4">
          {services.map((service, idx) => {
            const isLast = idx === services.length - 1;
            const isGold = service.accent === "gold";
            const hasError = imageErrors[service.id];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={cn(
                  "relative overflow-hidden rounded-[24px] border p-6 flex flex-col justify-between",
                  isLast ? "col-span-2 aspect-[16/9]" : "aspect-[4/5]",
                  isGold
                    ? "border-gold/45 shadow-[0_0_20px_rgba(201,162,107,0.1)]"
                    : "border-line bg-surface/40",
                )}
              >
                {/* Background photo & Scrim */}
                <div className="absolute inset-0 z-0">
                  {!hasError ? (
                    <img
                      src={service.image}
                      alt={service.alt}
                      loading="lazy"
                      onError={() => handleImageError(service.id)}
                      style={{ objectPosition: service.imagePosition || "center center" }}
                      className="h-full w-full object-cover grayscale-[0.3] brightness-[0.75]"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-surface to-void" />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgb(6 7 12 / 0.96) 0%, rgb(6 7 12 / 0.65) 45%, rgb(6 7 12 / 0.2) 100%)",
                    }}
                  />
                </div>

                {/* Top: Numeral */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono-acc text-xs tracking-wider text-soft/40">
                    {service.index}
                  </span>
                </div>

                {/* Bottom: Copy & Chips */}
                <div className="relative z-10 mt-auto">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-soft">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-soft/75 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Show chips on panel 05 */}
                  {isLast && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {service.chips.map((chip) => (
                        <span
                          key={chip}
                          className="font-mono-acc text-[10px] px-2 py-0.5 rounded-full border border-gold/30 bg-gold/10 text-gold/90"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}

                  {service.cta && (
                    <div className="mt-4">
                      <Link
                        to={service.cta.to}
                        data-cursor="cta"
                        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-xs font-semibold text-void"
                      >
                        <span>{service.cta.label}</span>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MOBILE STACK (< 640px)                                        */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-10 sm:hidden flex flex-col gap-3.5">
          {services.map((service, idx) => {
            const isGold = service.accent === "gold";
            const isExpanded = mobileExpandedIndex === idx;
            const hasError = imageErrors[service.id];

            return (
              <div
                key={service.id}
                className={cn(
                  "relative overflow-hidden rounded-2xl border transition-all duration-300",
                  isGold ? "border-gold/45 shadow-md shadow-gold/10" : "border-line bg-surface/50",
                )}
              >
                {/* Background image & Scrim */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {!hasError ? (
                    <img
                      src={service.image}
                      alt={service.alt}
                      loading="lazy"
                      onError={() => handleImageError(service.id)}
                      style={{ objectPosition: service.imagePosition || "center center" }}
                      className="h-full w-full object-cover grayscale-[0.4] brightness-[0.65]"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-surface to-void" />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgb(6 7 12 / 0.96) 0%, rgb(6 7 12 / 0.7) 50%, rgb(6 7 12 / 0.3) 100%)",
                    }}
                  />
                </div>

                <div className="relative z-10 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono-acc text-xs tracking-wider text-soft/40">
                        {service.index}
                      </span>
                      <h3 className="font-display text-lg font-bold text-soft">{service.title}</h3>
                    </div>

                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-label={`Toggle details for ${service.title}`}
                      onClick={() => setMobileExpandedIndex(isExpanded ? null : idx)}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
                        isGold
                          ? "border-gold/40 bg-gold/10 text-gold"
                          : "border-line bg-surface/60 text-soft",
                      )}
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          isExpanded && "rotate-180",
                        )}
                      />
                    </button>
                  </div>

                  <p className="mt-2.5 text-xs text-soft/80 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Expandable chips & CTA */}
                  {isExpanded && (
                    <div className="mt-3.5 pt-3 border-t border-line/60">
                      <div className="flex flex-wrap gap-1.5">
                        {service.chips.map((chip) => (
                          <span
                            key={chip}
                            className={cn(
                              "font-mono-acc text-[10px] px-2 py-0.5 rounded-full border",
                              isGold
                                ? "border-gold/35 bg-gold/10 text-gold/90"
                                : "border-line bg-soft/5 text-soft/75",
                            )}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      {service.cta && (
                        <div className="mt-3.5">
                          <Link
                            to={service.cta.to}
                            data-cursor="cta"
                            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-primary py-2 text-xs font-semibold text-void"
                          >
                            {service.cta.label}
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* FOOTER AUDIT CONVERSION LINE                                  */}
        {/* ------------------------------------------------------------- */}
        <p className="mt-12 text-center text-sm text-soft/55">
          Not sure which one you need? Start with a free AI audit —{" "}
          <Link
            to="/register"
            data-cursor="cta"
            className="inline-flex items-center text-cyan hover:text-white transition-colors underline underline-offset-4 ml-1"
          >
            talk to us →
          </Link>
        </p>
      </div>
    </section>
  );
}
