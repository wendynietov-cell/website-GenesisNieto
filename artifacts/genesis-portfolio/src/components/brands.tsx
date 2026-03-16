import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Sparkles, Star, Zap, Heart, Coffee, Leaf, Sun, Droplets, ShoppingBag, Flower } from "lucide-react";
import { useContent } from "@/context/content-context";

const ICONS = [Zap, Coffee, Sparkles, Star, Heart, Leaf, Sun, Droplets, ShoppingBag, Flower];

export function Brands() {
  const { content } = useContent();
  const { sectionTitle, sectionSubtitle, items } = content.brands;

  return (
    <section id="marcas" className="py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-heading mb-4">{sectionTitle}</h2>
          <p className="text-foreground/70 text-lg">{sectionSubtitle}</p>
        </motion.div>
      </div>

      <div className="w-full relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-x-auto pb-8 pt-4 px-6 md:px-32 gap-6 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
          {items.map((brand, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="snap-center shrink-0"
              >
                <GlassCard className="w-52 h-28 flex flex-col items-center justify-center gap-3 group cursor-default">
                  <Icon className="w-7 h-7 text-foreground/35 group-hover:text-primary transition-colors" />
                  <span className="font-medium text-foreground/75 tracking-wide text-sm text-center">{brand.name}</span>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
