import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export interface GalleryItem {
  title: string;
  url: string;
}

interface ImageGalleryProps {
  images: GalleryItem[];
  width?: number;
  height?: number;
}

export function ImageGallery({ images, width = 600, height = 480 }: ImageGalleryProps) {
  const [opened, setOpened] = useState(0);
  const [, setInPlace] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const autoplayTimer = useRef<number | null>(null);

  const onSelect = (i: number) => {
    if (!disabled) setOpened(i);
  };
  const onInPlace = (i: number) => setInPlace(i);

  const next = useCallback(() => {
    setOpened((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setOpened((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    setDisabled(true);
    const t = window.setTimeout(() => setDisabled(false), 900);
    return () => clearTimeout(t);
  }, [opened]);

  useEffect(() => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = window.setInterval(next, 4500);
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [opened, next]);

  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: width }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
        <defs>
          {images.map((_, i) => (
            <clipPath key={i} id={`clip-${i}`}>
              <circle id={`circle-${i}`} cx={width / 2} cy={height - 40} r={7} />
            </clipPath>
          ))}
        </defs>

        {images.map((img, i) => (
          <GalleryImage
            key={i}
            id={i}
            total={images.length}
            url={img.url}
            title={img.title}
            open={opened === i}
            onInPlace={onInPlace}
            width={width}
            height={height}
          />
        ))}

        <Tabs images={images} onSelect={onSelect} active={opened} width={width} height={height} />
      </svg>

      {/* Title */}
      <div className="mt-6 text-center">
        <p className="font-mono-acc text-[10px] uppercase tracking-[0.3em] text-accent">
          {String(opened + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </p>
        <h3 className="font-display mt-2 text-2xl font-semibold text-fg sm:text-3xl">
          {images[opened]?.title}
        </h3>
      </div>

      {/* Prev / Next */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous"
        className="absolute left-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-base-elevated/60 text-fg backdrop-blur transition-colors hover:border-accent hover:text-accent"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next"
        className="absolute right-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-base-elevated/60 text-fg backdrop-blur transition-colors hover:border-accent hover:text-accent"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}

interface GalleryImageProps {
  url: string;
  title: string;
  open: boolean;
  id: number;
  onInPlace: (id: number) => void;
  total: number;
  width: number;
  height: number;
}

function GalleryImage({ url, title, open, id, onInPlace, total, width, height }: GalleryImageProps) {
  const firstLoad = useRef(true);

  const gap = 14;
  const circleRadius = 7;
  const defaults = { transformOrigin: "center center" };
  const duration = 0.45;
  const scale = Math.min(width, height) * 0.55;
  const bigSize = scale;

  const getPosSmall = () => ({
    attr: {
      cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap) + circleRadius,
      cy: height - 40,
      r: circleRadius,
    },
  });
  const getPosSmallAbove = () => ({
    attr: {
      cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap) + circleRadius,
      cy: height / 2,
      r: circleRadius * 2,
    },
  });
  const getPosCenter = () => ({ attr: { cx: width / 2, cy: height / 2 - 20, r: circleRadius * 6 } });
  const fullR = Math.hypot(width, height - 80) / 2;
  const getPosEnd = () => ({ attr: { cx: width / 2, cy: (height - 80) / 2, r: fullR } });
  const getPosStart = () => ({ attr: { cx: width / 2, cy: (height - 80) / 2, r: fullR } });

  useEffect(() => {
    const target = `#circle-${id}`;
    const isFirst = firstLoad.current;
    firstLoad.current = false;

    const flipDuration = isFirst ? 0 : duration;
    const upDuration = isFirst ? 0 : 0.2;
    const bounceDuration = isFirst ? 0.01 : 0.9;
    const delay = isFirst ? 0 : flipDuration + upDuration;

    if (open) {
      gsap
        .timeline()
        .set(target, { ...defaults, ...getPosSmall() })
        .to(target, { ...defaults, ...getPosCenter(), duration: upDuration, ease: "power3.inOut" })
        .to(target, {
          ...defaults,
          ...getPosEnd(),
          duration: flipDuration,
          ease: "power4.in",
          onComplete: () => onInPlace(id),
        });
    } else {
      gsap
        .timeline({ overwrite: true })
        .set(target, { ...defaults, ...getPosStart() })
        .to(target, {
          ...defaults,
          ...getPosCenter(),
          delay,
          duration: flipDuration,
          ease: "power4.out",
        })
        .to(target, {
          ...defaults,
          attr: getPosSmall().attr,
          duration: bounceDuration,
          ease: "bounce.out",
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <g clipPath={`url(#clip-${id})`}>
      <image
        href={url}
        x={0}
        y={0}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
      >
        <title>{title}</title>
      </image>
    </g>
  );
}

interface TabsProps {
  images: GalleryItem[];
  onSelect: (i: number) => void;
  active: number;
  width: number;
  height: number;
}

function Tabs({ images, onSelect, active, width, height }: TabsProps) {
  const gap = 14;
  const circleRadius = 7;
  const getPosX = (i: number) =>
    width / 2 - (images.length * (circleRadius * 2 + gap) - gap) / 2 + i * (circleRadius * 2 + gap) + circleRadius;
  const cy = height - 40;

  return (
    <g>
      {images.map((_, i) => (
        <circle
          key={i}
          onClick={() => onSelect(i)}
          className="cursor-pointer transition-all"
          fill="transparent"
          stroke={i === active ? "rgb(201,162,107)" : "rgba(255,255,255,0.35)"}
          strokeWidth={1.5}
          cx={getPosX(i)}
          cy={cy}
          r={circleRadius + 4}
        />
      ))}
    </g>
  );
}