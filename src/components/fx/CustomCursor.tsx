import { useState, useEffect } from "react";
import Ribbons from "./Ribbons";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      setEnabled(mq.matches && !motionMq.matches);
    };

    apply();
    mq.addEventListener("change", apply);
    motionMq.addEventListener("change", apply);

    return () => {
      mq.removeEventListener("change", apply);
      motionMq.removeEventListener("change", apply);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none w-screen h-screen z-[9999]">
      <Ribbons
        baseThickness={12}
        colors={["#ffffff"]}
        speedMultiplier={0.6}
        maxAge={800}
        enableFade={true}
        enableShaderEffect={true}
        effectAmplitude={2.5}
      />
    </div>
  );
}
