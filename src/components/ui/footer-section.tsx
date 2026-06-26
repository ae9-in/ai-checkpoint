'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { Link } from "@tanstack/react-router";
import logoImage from "@/assets/logo.png";

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full max-w-7xl mx-auto flex flex-col items-stretch justify-center border-t border-indigo/10 bg-black px-6 py-16 lg:py-20 overflow-hidden">
      {/* Ambient top glowing line from template */}
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur z-0" />
      
      {/* Rise ambient radial glow */}
      <div className="pointer-events-none absolute -bottom-48 left-1/2 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo/20 via-cyan/15 to-transparent blur-[120px] z-0" />

      <div className="relative z-10 grid w-full gap-12 sm:grid-cols-3 lg:gap-16">
        {/* Column 1: Brand & Status */}
        <AnimatedContainer className="flex flex-col gap-4" delay={0.1}>
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="AI CheckPoint Logo" className="h-12 w-auto" style={{ mixBlendMode: "screen" }} />
            <span className="font-display text-xl font-bold tracking-tight text-white">
              AI<span className="bg-gradient-to-r from-cyan to-indigo bg-clip-text text-transparent">.</span>CheckPoint
            </span>
          </div>
          <p className="text-sm text-soft/65 max-w-xs leading-relaxed">
            Democratizing AI for Indian enterprises. Auditing operations, automating workloads, and accelerating growth.
          </p>

          {/* Pulsing Status Indicator */}
          <div className="mt-2 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono-acc text-[11px] uppercase tracking-wider text-soft/50">
              Status: Fully Operational
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            {[{ icon: Instagram, href: "#" }, { icon: Linkedin, href: "#" }, { icon: MessageCircle, href: "#" }].map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo/20 bg-surface/30 text-soft/55 transition-all hover:border-cyan hover:bg-cyan/10 hover:text-cyan"
              >
                <s.icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </AnimatedContainer>

        {/* Column 2: Explore links */}
        <AnimatedContainer delay={0.2}>
          <h4 className="font-mono-acc text-xs uppercase tracking-widest text-cyan/70">Explore</h4>
          <ul className="mt-6 space-y-3.5 text-sm">
            {[
              { label: "Industries", href: "#industries" },
              { label: "Our Benefits", href: "#benefits" },
              { label: "Founders' Pricing", href: "#pricing" },
              { label: "How It Works", href: "#how" }
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group flex items-center gap-1 text-soft/65 transition-colors hover:text-white"
                >
                  <span className="h-1 w-0 bg-cyan transition-all duration-300 group-hover:w-2 group-hover:mr-1.5 rounded-full" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </AnimatedContainer>

        {/* Column 3: Premium Founders Card */}
        <AnimatedContainer delay={0.3}>
          <div className="relative overflow-hidden rounded-2xl border border-indigo/40 bg-surface/30 p-6 backdrop-blur-sm shadow-xl shadow-black/20">
            {/* Glow effect inside card */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gold/15 blur-2xl" />

            <div className="flex items-center gap-2">
              <span className="font-mono-acc text-[10px] font-semibold uppercase tracking-widest text-gold border border-gold/30 bg-gold/5 px-2 py-0.5 rounded-full">
                Limited Founders' Offer
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-extrabold text-white">₹2,500</span>
              <span className="text-xs text-soft/45 font-mono-acc line-through">₹5,000</span>
            </div>

            <p className="mt-2 text-xs text-soft/70 leading-relaxed">
              Full custom AI implementation setup + ₹1,000 digital marketing credit completely free.
            </p>

            <Link
              to="/register"
              data-cursor="cta"
              className="pulse-glow mt-5 flex w-full items-center justify-center rounded-full bg-gradient-primary py-2.5 text-xs font-bold text-void transition-all hover:scale-[1.02]"
            >
              Claim Now →
            </Link>
          </div>
        </AnimatedContainer>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mt-16 border-t border-indigo/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-soft/40">
        <div>
          © {new Date().getFullYear()} AI CheckPoint. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-soft/65 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-soft/65 transition-colors">Terms of Service</a>
          <Link to="/admin" className="hover:text-cyan transition-colors font-mono-acc uppercase text-[9px] tracking-wider border border-white/5 bg-white/5 px-2 py-0.5 rounded">Admin Portal</Link>
          <span className="text-cyan/60 font-mono-acc">Made in India 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
}
