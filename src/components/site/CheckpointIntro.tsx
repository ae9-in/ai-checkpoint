import { motion } from "framer-motion";
import { Parallax } from "@/components/fx/Parallax";

export function CheckpointIntro() {
  return (
    <section className="relative bg-base text-fg overflow-hidden isolate">
      {/* Background video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Parallax offset={80} className="absolute inset-x-0 h-[120%] -top-[10%]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ objectPosition: "70% center" }}
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
              type="video/mp4"
            />
          </video>
        </Parallax>
      </div>
      {/* Readability veil */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 pt-32 pb-28 lg:pt-40 lg:pb-36">
        {/* Logo lockup, kept after the hero with deliberate distance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end gap-3 mb-14"
        >
          <span className="text-3xl md:text-4xl tracking-tight font-medium">AI CheckPoint</span>
          <span className="text-3xl md:text-4xl text-accent leading-none mb-1">✱</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 text-sm uppercase tracking-[0.18em] text-white/45"
          >
            What is a checkpoint?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 space-y-8"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl leading-[1.25] tracking-tight text-white">
              A <span className="text-white/55">checkpoint</span> is the moment your business stops,
              looks at every workflow, and asks one question —
              <span className="text-white"> where can AI do this better?</span>
            </p>
            <p className="text-base md:text-lg text-white/55 leading-relaxed max-w-2xl">
              We sit with your team, map the bottlenecks, and ship AI that quietly removes the work
              no one should be doing. No buzzwords. No bloated dashboards. Just measurable hours
              back, every week.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="h-px w-full bg-white/10" />
    </section>
  );
}
