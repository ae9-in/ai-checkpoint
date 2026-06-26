import { motion } from "framer-motion";
import { industries } from "@/lib/industries";
import { SectionLabel } from "./SectionLabel";
import { ImageGallery } from "@/components/ui/carousel-circular-image-gallery";

export function Industries() {
  const title = "Every Business";
  return (
    <section id="industries" className="relative bg-mid py-28 sm:py-32">
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
          <span className="text-soft/55">{title}</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <ImageGallery
            images={industries.map((i) => ({ title: i.name, url: i.image }))}
          />
        </motion.div>
      </div>
    </section>
  );
}