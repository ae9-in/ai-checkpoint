import Ribbons from "./Ribbons";

export function CustomCursor() {
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
