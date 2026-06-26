# AI CheckPoint — Build Plan

A premium dark-themed marketing site + 3-step registration flow, built on the existing TanStack Start + Tailwind v4 stack.

## Stack alignment (deviations from your spec)

Your spec lists Vite + React Router. This project is **TanStack Start** (Vite under the hood, file-based routing). I'll keep all visuals/animations 1:1 and only adapt:

- Routing: TanStack Router file routes (`/` and `/register`) instead of React Router DOM.
- Smooth scroll: **Lenis** (the spec's first choice; Locomotive is heavier and dated).
- 3D hero: **@react-three/fiber + drei** (matches "Three.js or R3F" in spec).
- Form: **react-hook-form + zod + shadcn/ui** (already partially installed).
- Fonts: load via `<link>` in `__root.tsx` head (Tailwind v4 rule — no `@import` URLs in CSS). Clash Display from Fontshare, Space Grotesk/Inter/JetBrains Mono from Google Fonts.
- Confetti: `canvas-confetti`. Lottie: `lottie-react` with a small inline check JSON (no external asset fetch).
- All colors registered as semantic tokens in `src/styles.css` `@theme inline` — no hardcoded hex in components.

## File structure

```text
src/
  styles.css                         # extend with palette tokens, fonts, grain, scanline utilities
  routes/
    __root.tsx                       # add font <link>s, page transition wrapper, cursor, grain overlay
    index.tsx                        # Landing (sections 1–11)
    register.tsx                     # Registration split-screen
  components/
    site/
      Navbar.tsx
      Hero.tsx
      HeroScene.tsx                  # R3F brain mesh + particles
      Marquee.tsx
      Benefits.tsx
      Industries.tsx
      Timeline.tsx
      Stats.tsx
      Pricing.tsx
      FAQ.tsx
      FinalCTA.tsx
      Footer.tsx
    fx/
      CustomCursor.tsx
      GrainOverlay.tsx
      ScrollProgress.tsx
      PageTransition.tsx
      SmoothScroll.tsx               # Lenis provider
      MagneticButton.tsx
      CountUp.tsx
    register/
      RegisterLeft.tsx
      RegisterForm.tsx               # 3-step wizard
      StepProgress.tsx
      SuccessState.tsx
  lib/
    registration-schema.ts           # zod schemas per step
    industries.ts                    # shared industry data
```

## Design tokens (added to `src/styles.css`)

```text
--void: #04050F
--mid: #0D0E1F
--card: #12132A
--indigo: #5C3BFF
--cyan: #00F5D4
--soft: #F0EFFF
--gold: #FFD166
--border-glow: rgb(92 59 255 / 0.3)
--gradient-primary: linear-gradient(135deg, var(--indigo), var(--cyan))
--shadow-glow: 0 0 32px rgb(92 59 255 / 0.5)
```

Mapped via `@theme inline` so utilities `bg-void`, `text-cyan`, `border-indigo`, etc. work. Force dark by default (no light theme needed for this brief).

## Sections — implementation notes

1. **Navbar** — `useScroll` from framer-motion for blur transition; scroll progress bar uses `motion.div` width tied to `scrollYProgress`. Mobile slide-down menu with stagger.
2. **Hero** — R3F canvas: low-poly icosahedron wireframe + `Points` particle field with `LineSegments` for close-neighbor connections; mouse parallax via `useFrame`. Headline uses clip-path stagger; "Supercharged" gets gradient text + shimmer keyframe.
3. **Marquee** — pure CSS `@keyframes` translateX; two rows opposing directions; diamond separators.
4. **Benefits** — 6 standard cards + 1 hero card in grid; spotlight via CSS mask radial-gradient tracking `mousemove` (CSS var update). Framer `whileInView` stagger.
5. **Industries bento** — grid-template-areas asymmetric layout; hover overlay reveals 3 use cases with stagger; 11th card is wildcard CTA.
6. **Timeline** — SVG path with `strokeDasharray`/`strokeDashoffset` driven by GSAP ScrollTrigger; 4 nodes with pulsing rings.
7. **Stats** — IntersectionObserver triggers `CountUp` (rAF easing); rotating testimonial via AnimatePresence cross-fade.
8. **Pricing** — Scroll-triggered sequence: strike-through draw → spring price → savings pill → checklist stagger with animated check-draw SVGs.
9. **FAQ** — Custom accordion (`framer-motion` height auto with `AnimatePresence`); + rotates to ×; left indigo border when open.
10. **Final CTA** — GSAP SplitText-style character stagger (manual span split, no paid plugin); floating emojis via `motion.div` keyframes; blurred radial bg blobs.
11. **Footer** — 4-column grid, newsletter mock input, compact pricing reminder.

## Registration page

- Split screen, sticky left panel with mini R3F scene (reuses HeroScene at 0.4 scale).
- Right panel: 3-step wizard. Each step in its own component; step transitions slide-left/right with AnimatePresence.
- Validation: zod schema per step; can't advance until valid.
- Submit: store payload in `localStorage` (no backend in this build), show success state with `canvas-confetti` burst + Lottie check + WhatsApp share link (`https://wa.me/?text=...`).
- Page transition: indigo curtain wipe wrapping outlet, triggered on route change via `useRouterState`.

## Global FX

- **CustomCursor** — fixed 48px ring following mouse with spring; morphs to pill on `[data-cursor="cta"]` hover. Disabled on touch devices (`matchMedia('(pointer: coarse)')`).
- **GrainOverlay** — fixed full-screen SVG noise, 3% opacity, `pointer-events-none`, `mix-blend-overlay`.
- **SmoothScroll** — Lenis instance in root effect; rAF loop; respects `prefers-reduced-motion`.
- **Reduced motion** — disables Lenis, cursor, 3D auto-rotation, marquee.

## Packages to add

`framer-motion`, `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `lenis`, `lottie-react`, `canvas-confetti`, `react-hook-form`, `@hookform/resolvers`, `zod` (some may already be present — will check before adding).

## Out of scope (call out)

- No real backend submission — form persists to localStorage and shows success. Wire to Lovable Cloud later if needed.
- No paid GSAP plugins (SplitText/ScrollSmoother) — using free equivalents.
- Lottie animation is a small inline JSON checkmark, not a designer file.

## Build order

1. Tokens + fonts + global FX shell (cursor, grain, smooth scroll, page transition).
2. Navbar + Hero + 3D scene.
3. Sections 3–7.
4. Pricing + FAQ + Final CTA + Footer.
5. Register route + form wizard + success state.
6. Responsive pass + reduced-motion pass.
