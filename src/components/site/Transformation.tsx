import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { Sparkles, AlertTriangle } from "lucide-react";

export function Transformation() {
  return (
    <section className="relative bg-black py-28 sm:py-32 overflow-hidden border-y border-white/5">
      {/* Background radial effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-red-950/5 blur-[120px]" />
        <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <SectionLabel>The Transformation</SectionLabel>
        <h2 className="font-display mt-4 text-center text-4xl font-bold text-soft sm:text-5xl mb-16">
          A Paradigm Shift
        </h2>

        <div className="relative grid gap-8 md:grid-cols-2 items-stretch mt-12">
          {/* Middle "VS" Circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:grid h-12 w-12 place-items-center rounded-full bg-void border border-indigo/35 text-[11px] font-mono-acc font-semibold text-cyan z-20 shadow-[0_0_20px_rgba(92,59,255,0.25)]">
            VS
          </div>

          {/* Left Column: Manual (The Old Way) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-red-500/10 bg-gradient-to-br from-red-950/10 via-void to-void p-8 sm:p-10 flex flex-col justify-between overflow-hidden group hover:border-red-500/20 transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono-acc text-[10px] uppercase tracking-widest text-red-500">
                  THE OLD WAY
                </span>
              </div>

              <h3 className="font-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500/30 via-red-500/70 to-red-500/30 tracking-tight uppercase mb-2 select-none select-none">
                MANUAL
              </h3>
              
              <div className="font-mono-acc text-[11px] tracking-wider text-red-500/60 uppercase mb-8 border-b border-white/5 pb-4">
                SLOW · EXPENSIVE · EXHAUSTING
              </div>

              <ul className="space-y-4 text-[15px] text-soft/75">
                <li className="flex gap-3 items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/40 mt-2 flex-shrink-0" />
                  <span>Hours lost to repetitive manual workflows</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/40 mt-2 flex-shrink-0" />
                  <span>Fragmented spreadsheets & zero live visibility</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/40 mt-2 flex-shrink-0" />
                  <span>Teams facing friction & operational exhaustion</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/40 mt-2 flex-shrink-0" />
                  <span>Missed strategic compounding scale opportunities</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 flex items-center gap-2 text-[10px] font-mono-acc text-red-500/40 uppercase tracking-widest">
              <AlertTriangle size={12} className="text-red-500/50" />
              <span>SYSTEM_WARNING: RESOURCE_DEPLETION_ACTIVE</span>
            </div>
          </motion.div>

          {/* Right Column: AI-Powered (The Next Paradigm) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-cyan/15 bg-gradient-to-br from-cyan/5 via-void to-void p-8 sm:p-10 flex flex-col justify-between overflow-hidden group hover:border-cyan/35 transition-all duration-300 shadow-[0_0_30px_rgba(0,245,212,0.03)]"
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
              
              <div className="font-mono-acc text-[11px] tracking-wider text-cyan/80 uppercase mb-8 border-b border-white/5 pb-4">
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

            <div className="mt-8 border-t border-white/5 pt-4 flex items-center gap-2 text-[10px] font-mono-acc text-cyan/50 uppercase tracking-widest">
              <Sparkles size={12} className="text-cyan" />
              <span>AUTO_OPTIMIZATION: SECURE_INTEGRATION_ENGAGED</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
