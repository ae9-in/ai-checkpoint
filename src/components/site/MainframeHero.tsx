import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Star,
  Clock,
  Calendar,
  Play,
  ChevronLeft,
  ChevronRight,
  User,
  Menu,
  X,
} from "lucide-react";
import logoImage from "@/assets/logo.png";
import heroImage from "@/assets/hero-image.jpg";
import { Parallax } from "@/components/fx/Parallax";
import DecryptedText from "@/components/fx/DecryptedText";
import PillNav from "@/components/fx/PillNav";

export function MainframeHero() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Audit", to: "/register" },
    { label: "Solutions", to: "/", hash: "benefits" },
    { label: "Industries", to: "/", hash: "industries" },
    { label: "Services", to: "/", hash: "services" },
  ];

  return (
    <div className="relative bg-black text-white font-inter overflow-hidden flex flex-col h-[100dvh]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <Parallax offset={100} className="absolute inset-x-0 h-[120%] -top-[10%]">
          <video
            src="/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={heroImage}
            className="w-full h-full object-cover"
          />
        </Parallax>
      </div>

      {/* Bottom Blur Overlay */}
      <div
        className="absolute inset-0 z-[1] backdrop-blur-xl pointer-events-none"
        style={{
          maskImage: "linear-gradient(to top, black 0%, transparent 45%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 45%)",
        }}
      />

      {/* Navbar */}
      <header className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group animate-blur-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          <img
            src={logoImage}
            alt="AI CheckPoint Logo"
            className="h-8 md:h-10 w-auto mix-blend-screen"
          />
          <span className="font-display text-[20px] sm:text-[25px] font-bold tracking-tight text-white transition-colors group-hover:text-cyan select-none">
            <DecryptedText text="AI CheckPoint" animateOn="hover" />
          </span>
        </Link>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:block animate-blur-fade-up" style={{ animationDelay: "150ms" }}>
          <PillNav
            items={navLinks}
            baseColor="#ffffff"
            pillColor="transparent"
            hoveredPillTextColor="#000000"
            pillTextColor="#ffffff"
            initialLoadAnimation={false}
          />
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-gradient-primary px-5 py-2 text-xs font-semibold text-void animate-blur-fade-up shadow-md shadow-indigo/20 hover:scale-[1.04] transition-transform"
            style={{ animationDelay: "400ms" }}
          >
            Book Free Audit
          </Link>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full liquid-glass animate-blur-fade-up relative text-white"
            style={{ animationDelay: "350ms" }}
            aria-label="Toggle menu"
          >
            <Menu
              size={18}
              className={`absolute transition-all duration-500 ease-out ${isMobileMenuOpen ? "rotate-180 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}`}
            />
            <X
              size={18}
              className={`absolute transition-all duration-500 ease-out ${isMobileMenuOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-180 opacity-0 scale-50"}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-[72px] inset-x-0 z-40 bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl transition-all duration-500 ease-out lg:hidden ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-4 gap-2">
          {navLinks.map((link, i) => {
            const isReg = link.to === "/register";
            return (
              <Link
                key={link.label}
                to={isReg ? "/register" : "/"}
                hash={isReg ? undefined : link.hash}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-3 rounded-lg hover:bg-gray-800/50 transition-colors font-medium text-white"
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : "0ms",
                  transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-10px)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transition:
                    "transform 0.5s ease-out, opacity 0.5s ease-out, background-color 0.2s",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="sm:hidden flex items-center justify-center mt-4 pt-4 border-t border-gray-800">
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-gradient-primary py-2.5 text-xs font-semibold text-void"
            >
              Book Free Audit
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16">
        <div className="flex flex-col md:flex-row items-end gap-8">
          {/* Left Side */}
          <div className="flex-1 w-full">
            {/* Metadata row */}
            <div
              className="flex flex-wrap gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm animate-blur-fade-up text-white"
              style={{ animationDelay: "300ms" }}
            >
              <span className="flex items-center gap-1 font-medium">
                <Star size={16} className="fill-white w-4 h-4 sm:w-5 sm:h-5" /> 5.0/5 Rating
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> Setup in 48h
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} /> Enterprise Grade
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 md:mb-6 animate-blur-fade-up whitespace-pre-line text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
              style={{ animationDelay: "400ms", letterSpacing: "-0.04em" }}
            >
              The{" "}
              <span className="text-white font-semibold bg-gradient-to-r from-[#8B7CFF] via-[#C9A26B] to-[#E8D3A8] bg-clip-text text-transparent">
                <DecryptedText
                  text="AI"
                  animateOn="view"
                  speed={100}
                  sequential={true}
                  delay={1800}
                />
              </span>{" "}
              <DecryptedText
                text="Checkpoint"
                animateOn="view"
                speed={60}
                sequential={true}
                delay={1800}
              />
              <br />
              built to outpace tomorrow.
            </h1>

            {/* Description */}
            <p
              className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-12 max-w-2xl animate-blur-fade-up drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
              style={{ animationDelay: "500ms" }}
            >
              <span className="text-white font-semibold">
                Smarter decisions. Sharper margins. Zero guesswork.
              </span>{" "}
              We audit, automate, and engineer{" "}
              <span className="font-semibold bg-gradient-to-r from-[#8B7CFF] via-[#C9A26B] to-[#E8D3A8] bg-clip-text text-transparent">
                AI that earns its keep
              </span>{" "}
              — your unfair advantage for the next decade.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-gray-200 transition-colors animate-blur-fade-up"
                style={{ animationDelay: "600ms" }}
              >
                <Play size={18} className="fill-black" />
                Get Started
              </Link>
              <Link
                to="/"
                hash="benefits"
                className="inline-flex items-center justify-center rounded-full font-medium liquid-glass px-6 sm:px-8 py-2.5 sm:py-3 animate-blur-fade-up transition-opacity hover:opacity-80 text-white"
                style={{ animationDelay: "700ms" }}
              >
                Our Solutions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
