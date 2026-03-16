import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { useContent } from "@/context/content-context";

export function Testimonials() {
  const { content } = useContent();
  const { sectionTitle, sectionSubtitle, items } = content.testimonials;

  return (
    <section id="testimonios" className="py-32 bg-background/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading mb-4">{sectionTitle}</h2>
          <p className="text-foreground/70 text-lg">{sectionSubtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <GlassCard className="h-full flex flex-col relative pt-12 pb-10 px-8 rounded-3xl group">
                <span className="absolute top-4 left-6 text-9xl font-heading leading-none select-none pointer-events-none transition-colors duration-500" style={{ color: "rgba(92,60,44,0.06)" }}>
                  "
                </span>
                <p className="text-xl font-heading italic text-foreground/80 leading-relaxed flex-grow relative z-10">
                  {t.quote || "Este espacio está reservado para tu próximo testimonio de marca."}
                </p>
                <div className="mt-8 pt-6 border-t border-foreground/10 relative z-10 flex flex-col">
                  <span className="font-medium text-foreground">{t.brand || "Marca"}</span>
                  <span className="text-sm text-foreground/60">{t.author || "Rol"}</span>
                </div>
                <div className="absolute -bottom-3 left-12 w-6 h-6 bg-[rgba(255,255,255,0.35)] border-b border-r border-[rgba(255,255,255,0.5)] transform rotate-45" />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
