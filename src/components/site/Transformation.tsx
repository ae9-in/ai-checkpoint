import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { Sparkles, AlertTriangle } from "lucide-react";

export function Transformation() {
  return (
    <section className="relative bg-black py-28 sm:py-32 overflow-hidden border-y border-white/5">
      {/* Background image with blur and low opacity */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/transformation_bg.png"
          alt=""
          className="w-full h-full object-cover opacity-25 filter blur-sm scale-105"
        />
        {/* Dark overlays to maintain readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-red-950/10 blur-[120px]" />
        <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <SectionLabel>The Transformation</SectionLabel>
        <h2 className="font-display mt-4 text-center text-4xl font-bold text-soft sm:text-5xl mb-16">
          A Paradigm Shift
        </h2>

        <div className="relative grid gap-8 md:grid-cols-2 items-stretch mt-12">
          {/* Left Column: Manual (The Old Way) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-red-500/15 bg-[#06070c]/55 backdrop-blur-md p-8 sm:p-10 flex flex-col justify-between overflow-hidden group hover:border-red-500/30 transition-all duration-300 shadow-[0_4px_30px_rgba(239,68,68,0.03)]"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono-acc text-[10px] uppercase tracking-widest text-red-500">
                  THE OLD WAY
                </span>
              </div>

              <h3 className="font-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500/40 via-red-500/80 to-red-500/40 tracking-tight uppercase mb-2 select-none">
                MANUAL
              </h3>
              
              <div className="font-mono-acc text-[11px] tracking-wider text-red-400/80 uppercase mb-8 border-b border-white/10 pb-4">
                SLOW · EXPENSIVE · EXHAUSTING
              </div>

              <ul className="space-y-4 text-[15px] text-soft/85">
                <li className="flex gap-3 items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/60 mt-2 flex-shrink-0" />
                  <span>Hours lost to repetitive manual workflows</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/60 mt-2 flex-shrink-0" />
                  <span>Fragmented spreadsheets & zero live visibility</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/60 mt-2 flex-shrink-0" />
                  <span>Teams facing friction & operational exhaustion</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/60 mt-2 flex-shrink-0" />
                  <span>Missed strategic compounding scale opportunities</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-white/10 pt-4 flex items-center gap-2 text-[10px] font-mono-acc text-red-400/50 uppercase tracking-widest">
              <AlertTriangle size={12} className="text-red-500/70" />
              <span>SYSTEM_WARNING: RESOURCE_DEPLETION_ACTIVE</span>
            </div>
          </motion.div>

          {/* Middle "VS" Circle */}
          <div className="flex md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 my-2 md:my-0 mx-auto h-12 w-12 items-center justify-center rounded-full bg-void border border-indigo/35 text-[11px] font-mono-acc font-semibold text-cyan z-20 shadow-[0_0_20px_rgba(92,59,255,0.25)] select-none">
            VS
          </div>

          {/* Right Column: AI-Powered (The Next Paradigm) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-cyan/25 bg-[#06070c]/55 backdrop-blur-md p-8 sm:p-10 flex flex-col justify-between overflow-hidden group hover:border-cyan/45 transition-all duration-300 shadow-[0_0_30px_rgba(0,245,212,0.05)]"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                <span className="font-mono-acc text-[10px] uppercase tracking-widest text-cyan">
                  THE NEXT PARADIGM
                </span>
              </div>

              <h3 className="font-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-soft to-cyan tracking-tight uppercase mb-2">
                AI-POWERED
              </h3>
              
              <div className="font-mono-acc text-[11px] tracking-wider text-cyan/90 uppercase mb-8 border-b border-white/10 pb-4">
                FAST · INTELLIGENT · INFINITE
              </div>

              <ul className="space-y-4 text-[15px] text-white">
                <li className="flex gap-3 items-start">
                  <span className="text-cyan text-sm leading-none mt-0.5 flex-shrink-0">✦</span>
                  <span>Fully automated pipelines & system synchronization</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-cyan text-sm leading-none mt-0.5 flex-shrink-0">✦</span>
                  <span>Instant, actionable data streams on elegant displays</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-cyan text-sm leading-none mt-0.5 flex-shrink-0">✦</span>
                  <span>Liberated bandwidth allowing high-leverage focus</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-cyan text-sm leading-none mt-0.5 flex-shrink-0">✦</span>
                  <span>Autonomous agents absorbing operational friction</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-white/10 pt-4 flex items-center gap-2 text-[10px] font-mono-acc text-cyan/70 uppercase tracking-widest">
              <Sparkles size={12} className="text-cyan" />
              <span>AUTO_OPTIMIZATION: SECURE_INTEGRATION_ENGAGED</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
