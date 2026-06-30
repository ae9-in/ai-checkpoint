const ITEMS = [
  "Audit",
  "Automate",
  "Integrate",
  "Deploy",
  "Measure",
  "Scale",
  "Optimize",
  "Checkpoint",
];

export function LogoLoop() {
  // Duplicate items for seamless loop
  const loop = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <section className="relative bg-black border-y border-white/10 overflow-hidden py-8">
      <div className="flex w-max animate-[logoloop_38s_linear_infinite] gap-12 whitespace-nowrap">
        {loop.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-6 text-white/70">
            <span className="text-2xl md:text-3xl font-medium tracking-tight">{item}</span>
            <span className="text-2xl md:text-3xl text-white/40 leading-none">
              <span className="text-accent">✱</span>
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes logoloop {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
