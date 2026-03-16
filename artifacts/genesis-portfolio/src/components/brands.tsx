import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Sparkles, Star, Zap, Heart, Coffee, Leaf, Sun, Droplets } from "lucide-react";

const placeholders = [
  { id: 1, name: "Aesthetic Active", icon: Zap },
  { id: 2, name: "Pure Matcha", icon: Coffee },
  { id: 3, name: "Glow Skincare", icon: Sparkles },
  { id: 4, name: "Aura Supplements", icon: Star },
  { id: 5, name: "Zen Wear", icon: Heart },
  { id: 6, name: "Nourish Foods", icon: Leaf },
  { id: 7, name: "Lumina Beauty", icon: Sun },
  { id: 8, name: "Hydra Labs", icon: Droplets },
];

export function Brands() {
  return (
    <section id="marcas" className="py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-heading mb-4">Marcas & Colaboraciones</h2>
          <p className="text-foreground/70 text-lg">Con quienes colaboro o aspiro colaborar</p>
        </motion.div>
      </div>

      {/* Infinite scrolling marquee effect using CSS/Framer motion is tricky to make perfect without extra libs, 
          so we'll use a styled horizontal scroll container with hidden scrollbars for a clean look */}
      <div className="w-full relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex overflow-x-auto pb-8 pt-4 px-6 md:px-32 gap-6 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {placeholders.map((brand, i) => {
            const Icon = brand.icon;
            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="snap-center shrink-0"
              >
                <GlassCard className="w-64 h-32 flex flex-col items-center justify-center gap-3 group cursor-default">
                  <Icon className="w-8 h-8 text-foreground/40 group-hover:text-primary transition-colors" />
                  <span className="font-medium text-foreground/80 tracking-wide">{brand.name}</span>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
