import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import "./PillNav.css";

interface PillNavItem {
  label: string;
  to: string;
  hash?: string;
  ariaLabel?: string;
}

interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
}

const PillNav = ({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#fff",
  pillColor = "#120F17",
  hoveredPillTextColor = "#120F17",
  pillTextColor,
  initialLoadAnimation = true,
}: PillNavProps) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<gsap.core.Timeline[]>([]);
  const activeTweenRefs = useRef<gsap.core.Tween[]>([]);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement | HTMLSpanElement>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label");
        const white = pill.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.4, ease, overwrite: "auto" }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.4, ease, overwrite: "auto" }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 12), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 0.4, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    // Run layout again once fonts are loaded to prevent layout shifts
    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;

      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, {
          scale: 1,
          duration: 0.6,
          ease,
        });
      }

      if (navItems) {
        gsap.set(navItems, { opacity: 0, y: -10 });
        gsap.to(navItems, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease,
        });
      }
    }

    return () => window.removeEventListener("resize", onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.5,
      ease,
      overwrite: "auto",
    });
  };

  const cssVars = {
    ["--base" as any]: baseColor,
    ["--pill-bg" as any]: pillColor,
    ["--hover-text" as any]: hoveredPillTextColor,
    ["--pill-text" as any]: resolvedPillTextColor,
  };

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        {logo && (
          <Link
            className="pill-logo"
            to="/"
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            ref={logoRef as any}
          >
            <img src={logo} alt={logoAlt} ref={logoImgRef} />
          </Link>
        )}

        <div className="pill-nav-items" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.to + (item.hash || "")} role="none">
                <Link
                  role="menuitem"
                  to={item.to as any}
                  hash={item.hash}
                  className={`pill${activeHref === item.to ? " is-active" : ""}`}
                  aria-label={item.ariaLabel || item.label}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default PillNav;
