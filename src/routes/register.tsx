import { createFileRoute, Link } from "@tanstack/react-router";
import { RegisterForm } from "@/components/register/RegisterForm";
import { Typewriter } from "@/components/ui/auth-fuse";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import logoImage from "@/assets/logo.png";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — AI CheckPoint" },
      {
        name: "description",
        content: "Book your free AI audit. Our specialist will contact you within 24 hours.",
      },
      { property: "og:title", content: "Register — AI CheckPoint" },
      {
        property: "og:description",
        content: "Free AI audit and custom AI automation for Indian businesses.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-void text-soft relative selection:bg-cyan/20 selection:text-white"
    >
      {/* Left Column: Register Form */}
      <div className="flex min-h-screen flex-col justify-between p-6 md:p-12 lg:p-16">
        {/* Top Header */}
        <div className="flex items-center justify-between w-full mb-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logoImage}
              alt="AI CheckPoint Logo"
              className="h-10 w-auto transition-transform group-hover:scale-105"
              style={{ mixBlendMode: "screen" }}
            />
            <span className="font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-cyan">
              AI.CheckPoint
            </span>
          </Link>

          {/* Elegant Badge for Free Audit */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/5 px-3.5 py-1 text-xs font-medium text-cyan shadow-sm">
            <span>Free Operations Audit</span>
          </div>
        </div>

        {/* Centralized Form Container */}
        <div className="my-auto w-full max-w-lg mx-auto">
          {/* Small mobile package notice */}
          <div className="flex sm:hidden items-center justify-center gap-2 rounded-full border border-cyan/25 bg-cyan/5 px-3 py-1 mb-6 text-xs text-cyan w-fit mx-auto">
            <span>Free Operations Audit</span>
          </div>
          <RegisterForm />
        </div>

        {/* Bottom helper info */}
        <div className="mt-8 text-center text-xs text-soft/40 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-cyan" /> Secure Neon DB
          </span>
          <span>·</span>
          <span>4.9★ Developer Rating</span>
        </div>
      </div>

      {/* Right Column: Visual Split Pane */}
      <div className="hidden md:flex relative flex-col justify-between p-12 overflow-hidden bg-void border-l border-white/5">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,162,107,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-void via-transparent to-transparent opacity-80" />
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-void to-transparent z-10" />

        {/* Floating Astronaut Image */}
        <div className="absolute inset-0 flex items-center justify-center p-16 pb-36 z-0">
          <motion.img
            src="https://i.ibb.co/HTZ6DPsS/original-33b8479c324a5448d6145b3cad7c51e7-removebg-preview.png"
            alt="AI CheckPoint Astronaut"
            className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(201,162,107,0.2)]"
            initial={{ y: 0 }}
            animate={{ y: [-12, 12, -12] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Floating Key Features */}
        <div className="relative z-20 flex flex-col gap-3 self-end max-w-xs bg-void/75 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
          <h4 className="font-mono-acc text-[10px] uppercase tracking-wider text-cyan">
            Audit Benefits
          </h4>
          <ul className="space-y-2.5 text-xs text-soft/85">
            <li className="flex items-center gap-2">
              <span className="text-cyan font-bold">✓</span> Free 2-hour business audit
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan font-bold">✓</span> Custom AI roadmap
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan font-bold">✓</span> No tech skills required
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan font-bold">✓</span> Results in 48 hours
            </li>
          </ul>
        </div>

        {/* Typewriter Quotes Block */}
        <div className="relative z-20 flex flex-col items-center justify-end flex-grow pb-8">
          <blockquote className="space-y-3 text-center text-white backdrop-blur-sm bg-black/45 p-8 rounded-2xl border border-white/10 max-w-lg">
            <p className="text-lg font-medium leading-relaxed font-display">
              “
              <Typewriter
                text={[
                  "Transform your business workflow. A customized AI roadmap and audit awaits.",
                  "Save hours of manual effort by automating your repetitive processes.",
                  "Deploy cutting-edge AI agents tailored specifically for your operational needs.",
                  "Get a complete operations audit and tailored AI implementation roadmap.",
                ]}
                speed={55}
                loop={true}
                delay={3000}
                deleteSpeed={35}
              />
              ”
            </p>
            <cite className="block text-xs font-mono-acc text-cyan uppercase tracking-wider not-italic">
              — AI CheckPoint
            </cite>
          </blockquote>
        </div>
      </div>
    </motion.main>
  );
}
