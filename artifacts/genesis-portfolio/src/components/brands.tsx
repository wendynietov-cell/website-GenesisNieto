import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Sparkles, Star, Zap, Heart, Coffee, Leaf, Sun, Droplets, ShoppingBag, Flower } from "lucide-react";
import { useContent } from "@/context/content-context";

const ICONS = [Star, Sparkles, Heart, ShoppingBag, Leaf, Sun, Droplets, Flower];

export function Brands() {
  const { content } = useContent();
  const { sectionTitle, sectionSubtitle, items } = content.brands;

  return (
    <section id="marcas" className="py-28 relative overflow-hidden" style={{ backgroundColor: "#2E1608" }}>
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.3), transparent)" }} />
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.3), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(195,162,122,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-semibold mb-6" style={{ color: "#C3A27A" }}>
            Colaboraciones
          </span>
          <h2
            className="text-4xl md:text-5xl mb-4 tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EDE0", fontWeight: 600 }}
          >
            {sectionTitle || "Marcas & Colaboraciones"}
          </h2>
          <p className="text-xl max-w-2xl mx-auto font-light italic" style={{ color: "rgba(245,237,224,0.45)" }}>
            {sectionSubtitle || "Con quienes colaboro o aspiro colaborar"}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {items.map((brand, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={i % 2 === 0 ? "md:translate-y-4" : "md:-translate-y-4"}
              >
                <GlassCard dark className="relative overflow-hidden group flex flex-col items-center justify-center gap-4 p-8 h-40 w-full transition-all duration-500 hover:-translate-y-2">
                  <div
                    className="relative z-10 p-3 rounded-full transition-all duration-500 group-hover:scale-110"
                    style={{ background: "rgba(195,162,122,0.15)" }}
                  >
                    <Icon className="w-7 h-7" style={{ color: "#C3A27A" }} />
                  </div>
                  <span className="relative z-10 font-medium text-sm tracking-wide transition-colors" style={{ color: "rgba(245,237,224,0.7)" }}>
                    {brand.name}
                  </span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px group-hover:w-full transition-all duration-700" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.5), transparent)" }} />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
