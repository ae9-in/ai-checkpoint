import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = ["Home", "Projects", "Studio", "Reach Us"];

export function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-geist">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "70% center" }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-8">
          <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            AI CheckPoint
          </span>
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        <button className="hidden rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:scale-105 md:inline-flex">
          Let's Talk
        </button>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="relative z-50 grid h-10 w-10 place-items-center text-white active:scale-90 md:hidden"
        >
          <Menu
            className={`absolute h-6 w-6 transition-all duration-300 ${
              mobileMenuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            className={`absolute h-6 w-6 transition-all duration-300 ${
              mobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
            }`}
          />
        </button>
      </nav>

      <div
        className={`absolute inset-x-0 top-0 z-20 overflow-hidden bg-black/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileMenuOpen ? "h-screen opacity-100" : "pointer-events-none h-0 opacity-0"
        }`}
      >
        <div
          className={`flex h-full flex-col justify-center px-8 transition-all delay-100 duration-500 ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((l) => (
              <a
                key={l}
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-medium text-white/90 hover:text-white"
              >
                {l}
              </a>
            ))}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 w-fit rounded-full bg-white px-8 py-3.5 text-base font-medium text-black transition-transform hover:scale-105"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        <div className="max-w-3xl">
          <div
            className="mb-4 text-xs text-white/90 sm:mb-6 sm:text-sm"
            style={{ animation: "fadeSlideUp 0.8s ease 0.2s both" }}
          >
            Brand & Visual Storytelling
          </div>
          <h1
            className="text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animation: "fadeSlideUp 0.8s ease 0.4s both" }}
          >
            Shaping visual <br /> narratives, <br /> one pixel at a time.
          </h1>
        </div>

        <div>
          <p
            className="mb-5 max-w-sm text-sm leading-relaxed text-white/60 sm:mb-6 sm:max-w-lg sm:text-base md:text-lg"
            style={{ animation: "fadeSlideUp 0.8s ease 0.7s both" }}
          >
            Turning vision into reality through craft, motion, and an endless pursuit of beauty.
          </p>
          <button
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105 sm:px-6 sm:py-3"
            style={{ animation: "fadeSlideUp 0.8s ease 0.9s both" }}
          >
            Explore Work
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
