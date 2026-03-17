import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { useContent } from "@/context/content-context";

export function Testimonials() {
  const { content } = useContent();
  const { sectionTitle, sectionSubtitle, items } = content.testimonials;

  return (
    <section
      id="testimonios"
      className="py-12 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #140C06, #1C1008)" }}
    >
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.3), transparent)" }} />
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(195,162,122,0.3), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(195,162,122,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-semibold mb-6" style={{ color: "#C3A27A" }}>
            Testimonios
          </span>
          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EDE0", fontWeight: 600 }}
          >
            {sectionTitle}
          </h2>
          <p className="text-lg font-light" style={{ color: "rgba(245,237,224,0.5)" }}>
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* ── Mobile: carrusel ── */}
        <div className="flex md:hidden gap-4 overflow-x-auto -mx-6 px-6 pb-4 snap-x snap-mandatory scrollbar-hide">
          {items.map((t, i) => (
            <div key={i} className="shrink-0 w-[80vw] snap-center">
              <GlassCard dark className="h-full flex flex-col relative pt-10 pb-7 px-6 rounded-3xl">
                <span
                  className="absolute top-2 left-5 text-8xl leading-none select-none pointer-events-none"
                  style={{ color: "rgba(195,162,122,0.12)", fontFamily: "'Cormorant Garamond', serif" }}
                >
                  "
                </span>
                <p className="text-lg italic leading-relaxed grow relative z-10"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(245,237,224,0.85)" }}>
                  {t.quote || "Este espacio está reservado para tu próximo testimonio de marca."}
                </p>
                <div className="mt-5 pt-4 relative z-10 flex flex-col" style={{ borderTop: "1px solid rgba(195,162,122,0.2)" }}>
                  <span className="font-semibold text-sm" style={{ color: "#F5EDE0" }}>{t.brand || "Marca"}</span>
                  <span className="text-xs mt-0.5" style={{ color: "rgba(195,162,122,0.7)" }}>{t.author || "Rol"}</span>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* ── Desktop: grid ── */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <GlassCard dark className="h-full flex flex-col relative pt-12 pb-10 px-8 rounded-3xl group">
                <span
                  className="absolute top-4 left-6 text-9xl font-heading leading-none select-none pointer-events-none"
                  style={{ color: "rgba(195,162,122,0.12)", fontFamily: "'Cormorant Garamond', serif" }}
                >
                  "
                </span>
                <p className="text-xl italic leading-relaxed grow relative z-10"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(245,237,224,0.85)" }}>
                  {t.quote || "Este espacio está reservado para tu próximo testimonio de marca."}
                </p>
                <div className="mt-8 pt-6 relative z-10 flex flex-col" style={{ borderTop: "1px solid rgba(195,162,122,0.2)" }}>
                  <span className="font-semibold text-sm" style={{ color: "#F5EDE0" }}>{t.brand || "Marca"}</span>
                  <span className="text-xs mt-0.5" style={{ color: "rgba(195,162,122,0.7)" }}>{t.author || "Rol"}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
