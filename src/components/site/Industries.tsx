import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { industries } from "@/lib/industries";
import { SectionLabel } from "./SectionLabel";

export function Industries() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="industries" className="relative bg-mid py-28 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Industries</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display mt-4 text-center text-4xl font-bold text-soft sm:text-5xl"
        >
          AI works for
          <br />
          <span className="text-soft/55">Every Business</span>
        </motion.h2>

        <div className="mt-16 relative w-full">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              loop: true,
              align: "center",
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent className="flex h-[460px] sm:h-[500px] lg:h-[560px] w-full -ml-4">
              {industries.map((industry, index) => {
                const isActive = current === index;
                const Icon = industry.icon;

                return (
                  <CarouselItem
                    key={industry.name}
                    className="relative pl-4 flex h-full basis-[85%] sm:basis-[55%] md:basis-[45%] lg:basis-[35%] xl:basis-[30%] items-center justify-center cursor-pointer select-none"
                    onClick={() => api?.scrollTo(index)}
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        clipPath: !isActive
                          ? "inset(12% 0 12% 0 round 2.5rem)"
                          : "inset(0% 0 0% 0 round 2.5rem)",
                      }}
                      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                      className="relative h-[85%] w-full overflow-hidden rounded-[2.5rem] bg-surface border border-white/5"
                    >
                      {/* Background Image */}
                      <img
                        src={industry.image}
                        alt={industry.name}
                        className={cn(
                          "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out z-0",
                          isActive
                            ? "scale-105"
                            : "scale-100 filter brightness-[0.6] saturate-[0.8]",
                        )}
                      />

                      {/* Gradient Overlay */}
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 transition-opacity duration-500",
                          isActive ? "opacity-95" : "opacity-75",
                        )}
                      />

                      {/* Content Overlay */}
                      <motion.div
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-20 pointer-events-none"
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            className={cn(
                              "p-2.5 rounded-full backdrop-blur-md text-white transition-colors duration-300 flex items-center justify-center",
                              isActive ? "bg-white text-black" : "bg-white/10",
                            )}
                          >
                            <Icon size={20} />
                          </motion.div>
                          <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                            {industry.name}
                          </h3>
                        </div>

                        {/* Expandable description and use cases for the active card */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: isActive ? "auto" : 0,
                            opacity: isActive ? 1 : 0,
                            marginTop: isActive ? 12 : 0,
                          }}
                          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/85 text-xs sm:text-sm leading-relaxed mb-4">
                            {industry.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {industry.useCases.map((uc, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-semibold bg-white/15 border border-white/10 text-white px-2.5 py-1 rounded-full backdrop-blur-md"
                              >
                                {uc}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Navigation Controls */}
            <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-between px-4 sm:px-12 z-30">
              <button
                aria-label="Previous slide"
                onClick={() => api?.scrollPrev()}
                className="rounded-full w-10 h-10 border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Pagination indicators */}
              <div className="flex items-center gap-1.5">
                {industries.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                      current === index ? "w-6 bg-white" : "w-1.5 bg-white/20",
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                aria-label="Next slide"
                onClick={() => api?.scrollNext()}
                className="rounded-full w-10 h-10 border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
